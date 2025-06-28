import { useState, useEffect, useCallback } from "react";
import {
  PolicyItem,
  PolicyAnalysis,
  EconomicIndicator,
  EconomicImpact,
  StrategyRecommendation,
  PolicyEconomicReport,
  generateMockPolicies,
  generateMockPolicyAnalyses,
  generateMockEconomicIndicators,
  generateMockEconomicImpacts,
  generateMockStrategyRecommendations,
  generateMockPolicyEconomicReports,
  getPolicyByCategory,
  getHighImpactPolicies,
  getEconomicIndicatorsByCategory,
  getHighRiskEconomicImpacts,
  getUrgentRecommendations,
} //from "@/lib/policy-economic-data";

interface UsePolicyEconomicDataReturn {
  // Data States
  policies: PolicyItem[];
  policyAnalyses: PolicyAnalysis[];
  economicIndicators: EconomicIndicator[];
  economicImpacts: EconomicImpact[];
  strategyRecommendations: StrategyRecommendation[];
  reports: PolicyEconomicReport[];

  // Filter States
  selectedPolicyCategory: "all" | "external" | "internal";
  selectedImpactSeverity: "all" | "low" | "medium" | "high" | "critical";
  selectedTimeframe:
    | "all"
    | "immediate"
    | "short_term"
    | "medium_term"
    | "long_term";

  // UI States
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
  lastUpdated: Date;
  isAnalyzing: boolean;

  // Actions
  refreshData: () => Promise<void>;
  reconnect: () => void;
  selectPolicyCategory: (category: "all" | "external" | "internal") => void;
  selectImpactSeverity: (
    severity: "all" | "low" | "medium" | "high" | "critical",
  ) => void;
  selectTimeframe: (
    timeframe: "all" | "immediate" | "short_term" | "medium_term" | "long_term",
  ) => void;
  runPolicyAnalysis: (policyId: string) => Promise<void>;
  generateReport: (
    reportType: "policy_compliance" | "economic_impact" | "comprehensive",
  ) => Promise<void>;

  // Computed Data
  getFilteredPolicies: () => PolicyItem[];
  getFilteredEconomicImpacts: () => EconomicImpact[];
  getComplianceOverview: () => {
    averageCompliance: number;
    criticalGaps: number;
    totalCost: number;
    averageRisk: number;
  };
  getEconomicOverview: () => {
    totalPositiveImpact: number;
    totalNegativeImpact: number;
    highRiskIndicators: number;
    opportunityScore: number;
  };
  getLatestReport: () => PolicyEconomicReport | null;
}

export const usePolicyEconomicData = (): UsePolicyEconomicDataReturn => {
  // Data States
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [policyAnalyses, setPolicyAnalyses] = useState<PolicyAnalysis[]>([]);
  const [economicIndicators, setEconomicIndicators] = useState<
    EconomicIndicator[]
  >([]);
  const [economicImpacts, setEconomicImpacts] = useState<EconomicImpact[]>([]);
  const [strategyRecommendations, setStrategyRecommendations] = useState<
    StrategyRecommendation[]
  >([]);
  const [reports, setReports] = useState<PolicyEconomicReport[]>([]);

  // Filter States
  const [selectedPolicyCategory, setSelectedPolicyCategory] = useState<
    "all" | "external" | "internal"
  >("all");
  const [selectedImpactSeverity, setSelectedImpactSeverity] = useState<
    "all" | "low" | "medium" | "high" | "critical"
  >("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "all" | "immediate" | "short_term" | "medium_term" | "long_term"
  >("all");

  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize data
  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API calls with realistic delays
      await new Promise((resolve) => setTimeout(resolve, 800));

      setPolicies(generateMockPolicies());
      setPolicyAnalyses(generateMockPolicyAnalyses());
      setEconomicIndicators(generateMockEconomicIndicators());
      setEconomicImpacts(generateMockEconomicImpacts());
      setStrategyRecommendations(generateMockStrategyRecommendations());
      setReports(generateMockPolicyEconomicReports());

      setLastUpdated(new Date());
      setIsConnected(true);
    } catch (err) {
      setError("Failed to load policy and economic data");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh data
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate data refresh
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Update indicators with slight variations
      setEconomicIndicators((prev) =>
        prev.map((indicator) => ({
          ...indicator,
          previousValue: indicator.currentValue,
          currentValue: indicator.currentValue * (0.95 + Math.random() * 0.1),
          trend:
            Math.random() > 0.7
              ? Math.random() > 0.5
                ? "rising"
                : "falling"
              : indicator.trend,
        })),
      );

      setLastUpdated(new Date());
      setIsConnected(true);
    } catch (err) {
      setError("Failed to refresh data");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reconnect
  const reconnect = useCallback(() => {
    setError(null);
    setIsConnected(true);
    refreshData();
  }, [refreshData]);

  // Filter Actions
  const selectPolicyCategory = useCallback(
    (category: "all" | "external" | "internal") => {
      setSelectedPolicyCategory(category);
    },
    [],
  );

  const selectImpactSeverity = useCallback(
    (severity: "all" | "low" | "medium" | "high" | "critical") => {
      setSelectedImpactSeverity(severity);
    },
    [],
  );

  const selectTimeframe = useCallback(
    (
      timeframe:
        | "all"
        | "immediate"
        | "short_term"
        | "medium_term"
        | "long_term",
    ) => {
      setSelectedTimeframe(timeframe);
    },
    [],
  );

  // Analysis Actions
  const runPolicyAnalysis = useCallback(async (policyId: string) => {
    try {
      setIsAnalyzing(true);

      // Simulate analysis process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate or update analysis for the policy
      const newAnalysis: PolicyAnalysis = {
        id: `pa-${Date.now()}`,
        policyId,
        analysisDate: new Date().toISOString().split("T")[0],
        currentComplianceLevel: 60 + Math.random() * 35,
        gapAssessment: {
          identifiedGaps: [
            "Documentation gaps identified",
            "Process improvements needed",
            "Training requirements pending",
          ],
          priorityLevel: Math.random() > 0.5 ? "high" : "medium",
          estimatedCost: Math.floor(50000 + Math.random() * 200000),
          timeToComply: Math.floor(3 + Math.random() * 12),
        },
        recommendations: {
          immediate: [
            "Update compliance procedures",
            "Complete staff training",
          ],
          shortTerm: [
            "Implement monitoring systems",
            "Establish review processes",
          ],
          longTerm: [
            "Develop automated compliance",
            "Create governance framework",
          ],
        },
        alignmentScore: 65 + Math.random() * 30,
      };

      setPolicyAnalyses((prev) => {
        const filtered = prev.filter(
          (analysis) => analysis.policyId !== policyId,
        );
        return [...filtered, newAnalysis];
      });
    } catch (err) {
      setError("Failed to run policy analysis");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  // Report Generation
  const generateReport = useCallback(
    async (
      reportType: "policy_compliance" | "economic_impact" | "comprehensive",
    ) => {
      try {
        setIsAnalyzing(true);

        // Simulate report generation
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const newReport: PolicyEconomicReport = {
          id: `per-${Date.now()}`,
          reportDate: new Date().toISOString().split("T")[0],
          reportType,
          overallRiskScore: 50 + Math.random() * 40,
          complianceScore: 60 + Math.random() * 35,
          economicResilienceScore: 55 + Math.random() * 40,
          keyFindings: [
            "Policy compliance levels vary across jurisdictions",
            "Economic indicators show mixed signals",
            "Strategic opportunities identified in key areas",
          ],
          criticalIssues: [
            "High-priority compliance gaps require immediate attention",
            "Economic volatility creating operational challenges",
          ],
          strategicRecommendations: [
            "Implement comprehensive compliance monitoring",
            "Develop economic risk mitigation strategies",
            "Establish proactive policy adaptation framework",
          ],
          actionItems: [
            {
              task: "Complete compliance gap analysis",
              deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              owner: "Compliance Team",
              priority: "high",
            },
          ],
          nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        };

        setReports((prev) => [newReport, ...prev]);
      } catch (err) {
        setError("Failed to generate report");
      } finally {
        setIsAnalyzing(false);
      }
    },
    [],
  );

  // Computed Data
  const getFilteredPolicies = useCallback(() => {
    let filtered = policies;

    if (selectedPolicyCategory !== "all") {
      filtered = getPolicyByCategory(filtered, selectedPolicyCategory);
    }

    return filtered;
  }, [policies, selectedPolicyCategory]);

  const getFilteredEconomicImpacts = useCallback(() => {
    let filtered = economicImpacts;

    if (selectedImpactSeverity !== "all") {
      filtered = filtered.filter(
        (impact) => impact.severity === selectedImpactSeverity,
      );
    }

    if (selectedTimeframe !== "all") {
      filtered = filtered.filter(
        (impact) => impact.timeframe === selectedTimeframe,
      );
    }

    return filtered;
  }, [economicImpacts, selectedImpactSeverity, selectedTimeframe]);

  const getComplianceOverview = useCallback(() => {
    const analyses = policyAnalyses;
    const totalAnalyses = analyses.length;

    if (totalAnalyses === 0) {
      return {
        averageCompliance: 0,
        criticalGaps: 0,
        totalCost: 0,
        averageRisk: 0,
      };
    }

    const averageCompliance =
      analyses.reduce(
        (sum, analysis) => sum + analysis.currentComplianceLevel,
        0,
      ) / totalAnalyses;
    const criticalGaps = analyses.filter(
      (analysis) => analysis.gapAssessment.priorityLevel === "high",
    ).length;
    const totalCost = analyses.reduce(
      (sum, analysis) => sum + analysis.gapAssessment.estimatedCost,
      0,
    );
    const averageRisk =
      policies.reduce((sum, policy) => sum + policy.riskScore, 0) /
      policies.length;

    return {
      averageCompliance: Math.round(averageCompliance),
      criticalGaps,
      totalCost,
      averageRisk: Math.round(averageRisk),
    };
  }, [policyAnalyses, policies]);

  const getEconomicOverview = useCallback(() => {
    const totalPositiveImpact = economicImpacts
      .filter((impact) => impact.estimatedFinancialImpact > 0)
      .reduce((sum, impact) => sum + impact.estimatedFinancialImpact, 0);

    const totalNegativeImpact = economicImpacts
      .filter((impact) => impact.estimatedFinancialImpact < 0)
      .reduce(
        (sum, impact) => sum + Math.abs(impact.estimatedFinancialImpact),
        0,
      );

    const highRiskIndicators = economicIndicators.filter(
      (indicator) => indicator.volatility > 60,
    ).length;

    const averageOpportunity =
      economicImpacts.reduce(
        (sum, impact) => sum + impact.opportunityPotential,
        0,
      ) / economicImpacts.length;

    return {
      totalPositiveImpact,
      totalNegativeImpact,
      highRiskIndicators,
      opportunityScore: Math.round(averageOpportunity),
    };
  }, [economicImpacts, economicIndicators]);

  const getLatestReport = useCallback(() => {
    return reports.length > 0 ? reports[0] : null;
  }, [reports]);

  // Initialize data on mount
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected && !isLoading) {
        // Update some economic indicators periodically
        setEconomicIndicators((prev) =>
          prev.map((indicator) => {
            if (Math.random() > 0.8) {
              // 20% chance to update each indicator
              return {
                ...indicator,
                previousValue: indicator.currentValue,
                currentValue:
                  indicator.currentValue * (0.98 + Math.random() * 0.04),
                volatility: Math.max(
                  10,
                  Math.min(
                    100,
                    indicator.volatility + (Math.random() - 0.5) * 10,
                  ),
                ),
              };
            }
            return indicator;
          }),
        );

        setLastUpdated(new Date());
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isConnected, isLoading]);

  return {
    // Data States
    policies,
    policyAnalyses,
    economicIndicators,
    economicImpacts,
    strategyRecommendations,
    reports,

    // Filter States
    selectedPolicyCategory,
    selectedImpactSeverity,
    selectedTimeframe,

    // UI States
    isLoading,
    isConnected,
    error,
    lastUpdated,
    isAnalyzing,

    // Actions
    refreshData,
    reconnect,
    selectPolicyCategory,
    selectImpactSeverity,
    selectTimeframe,
    runPolicyAnalysis,
    generateReport,

    // Computed Data
    getFilteredPolicies,
    getFilteredEconomicImpacts,
    getComplianceOverview,
    getEconomicOverview,
    getLatestReport,
  };
};
