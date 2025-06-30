import { useState, useEffect, useCallback, useRef } from "react";
import {
  ProjectInput,
  FeasibilityAnalysis,
  FeasibilityMode,
  projectInputs as mockProjects,
  mockAnalyses,
  generateFeasibilityAnalysis,
} from "@/lib/feasibility-data";

interface FeasibilityDataState {
  projects: ProjectInput[];
  analyses: FeasibilityAnalysis[];
  selectedProject: string | null;
  selectedMode: FeasibilityMode;
  lastUpdated: Date;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  isCalculating: boolean;
}

export function useFeasibilityData() {
  const [state, setState] = useState<FeasibilityDataState>({
    projects: mockProjects,
    analyses: mockAnalyses,
    selectedProject: mockProjects[0]?.id || null,
    selectedMode: "safe",
    lastUpdated: new Date(),
    isLoading: false,
    error: null,
    isConnected: false,
    isCalculating: false,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout>();

  // Fetch feasibility data
  const fetchFeasibilityData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000),
      );

      // Simulate market data updates that affect projections
      const updatedProjects = mockProjects.map((project) => ({
        ...project,
        industryGrowthRate: Math.max(
          5,
          Math.min(50, project.industryGrowthRate + (Math.random() - 0.5) * 2),
        ),
        marketSize: project.marketSize * (0.99 + Math.random() * 0.02),
        lastUpdated: new Date(),
      }));

      // Regenerate analyses with updated data
      const updatedAnalyses = updatedProjects.flatMap((project) =>
        (["conservative", "safe", "wild"] as FeasibilityMode[]).map((mode) =>
          generateFeasibilityAnalysis(project, mode),
        ),
      );

      setState((prev) => ({
        ...prev,
        projects: updatedProjects,
        analyses: updatedAnalyses,
        lastUpdated: new Date(),
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch feasibility data",
        isLoading: false,
      }));
    }
  }, []);

  // Real-time feasibility updates simulation
  const connectFeasibilityWebSocket = useCallback(() => {
    setState((prev) => ({ ...prev, isConnected: true }));

    const simulateFeasibilityUpdates = () => {
      const updateType = Math.random();

      if (updateType < 0.4) {
        // Update market conditions
        setState((prev) => ({
          ...prev,
          projects: prev.projects.map((project) => ({
            ...project,
            industryGrowthRate: Math.max(
              5,
              Math.min(
                50,
                project.industryGrowthRate + (Math.random() - 0.5) * 0.5,
              ),
            ),
            competitorCount: Math.max(
              1,
              Math.min(
                25,
                project.competitorCount + Math.floor((Math.random() - 0.5) * 2),
              ),
            ),
            lastUpdated: new Date(),
          })),
          lastUpdated: new Date(),
        }));
      } else if (updateType < 0.7) {
        // Update risk scores in real-time
        setState((prev) => ({
          ...prev,
          analyses: prev.analyses.map((analysis) => ({
            ...analysis,
            risk: {
              ...analysis.risk,
              overallRiskScore: Math.max(
                5,
                Math.min(
                  95,
                  analysis.risk.overallRiskScore + (Math.random() - 0.5) * 3,
                ),
              ),
              marketRisk: Math.max(
                5,
                Math.min(
                  95,
                  analysis.risk.marketRisk + (Math.random() - 0.5) * 2,
                ),
              ),
            },
            result: {
              ...analysis.result,
              confidenceLevel: Math.max(
                50,
                Math.min(
                  95,
                  analysis.result.confidenceLevel + (Math.random() - 0.5) * 2,
                ),
              ),
            },
            lastUpdated: new Date(),
          })),
          lastUpdated: new Date(),
        }));
      } else {
        // Update financial projections
        setState((prev) => ({
          ...prev,
          analyses: prev.analyses.map((analysis) => ({
            ...analysis,
            timeValue: {
              ...analysis.timeValue,
              npv: analysis.timeValue.npv * (0.98 + Math.random() * 0.04),
              irr: Math.max(
                -0.5,
                Math.min(
                  1.0,
                  analysis.timeValue.irr + (Math.random() - 0.5) * 0.02,
                ),
              ),
            },
            lastUpdated: new Date(),
          })),
          lastUpdated: new Date(),
        }));
      }
    };

    // Simulate updates every 12-25 seconds for feasibility data
    const updateInterval = setInterval(
      simulateFeasibilityUpdates,
      12000 + Math.random() * 13000,
    );

    wsRef.current = {
      readyState: WebSocket.OPEN,
      close: () => clearInterval(updateInterval),
    } as WebSocket;

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  // Manual refresh
  const refreshData = useCallback(async () => {
    await fetchFeasibilityData();
  }, [fetchFeasibilityData]);

  // Select project
  const selectProject = useCallback((projectId: string) => {
    setState((prev) => ({ ...prev, selectedProject: projectId }));
  }, []);

  // Select mode
  const selectMode = useCallback((mode: FeasibilityMode) => {
    setState((prev) => ({ ...prev, selectedMode: mode }));
  }, []);

  // Run new analysis
  const runAnalysis = useCallback(
    async (projectId: string, mode: FeasibilityMode) => {
      setState((prev) => ({ ...prev, isCalculating: true }));

      try {
        // Simulate analysis calculation time
        await new Promise((resolve) =>
          setTimeout(resolve, 3000 + Math.random() * 2000),
        );

        const project = state.projects.find((p) => p.id === projectId);
        if (!project) throw new Error("Project not found");

        const newAnalysis = generateFeasibilityAnalysis(project, mode);

        setState((prev) => ({
          ...prev,
          analyses: [
            ...prev.analyses.filter(
              (a) => !(a.projectId === projectId && a.mode === mode),
            ),
            newAnalysis,
          ],
          lastUpdated: new Date(),
          isCalculating: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "Failed to run analysis",
          isCalculating: false,
        }));
      }
    },
    [state.projects],
  );

  // Update project inputs
  const updateProject = useCallback(
    (projectId: string, updates: Partial<ProjectInput>) => {
      setState((prev) => ({
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === projectId
            ? { ...project, ...updates, lastUpdated: new Date() }
            : project,
        ),
        lastUpdated: new Date(),
      }));
    },
    [],
  );

  // Get analyses for selected project and mode
  const getAnalysis = useCallback(
    (projectId: string, mode: FeasibilityMode) => {
      return state.analyses.find(
        (a) => a.projectId === projectId && a.mode === mode,
      );
    },
    [state.analyses],
  );

  // Get all analyses for a project
  const getProjectAnalyses = useCallback(
    (projectId: string) => {
      return state.analyses.filter((a) => a.projectId === projectId);
    },
    [state.analyses],
  );

  // Initialize
  useEffect(() => {
    connectFeasibilityWebSocket();
    fetchFeasibilityData();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [connectFeasibilityWebSocket, fetchFeasibilityData]);

  return {
    ...state,
    refreshData,
    selectProject,
    selectMode,
    runAnalysis,
    updateProject,
    getAnalysis,
    getProjectAnalyses,
    reconnect: connectFeasibilityWebSocket,
  };
}
