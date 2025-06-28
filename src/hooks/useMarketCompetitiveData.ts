import { useState, useEffect, useCallback } from "react";
import {
  MarketSize,
  CustomerSegment,
  MarketTrend,
  DemandForecast,
  IndustryChallenge,
  Competitor,
  SWOTAnalysis,
  CompetitiveComparison,
  MarketPositioning,
  StrategyRecommendation,
  MarketReport,
  generateMockMarketSizes,
  generateMockCustomerSegments,
  generateMockMarketTrends,
  generateMockDemandForecasts,
  generateMockIndustryChallenges,
  generateMockCompetitors,
  generateMockSWOTAnalyses,
  generateMockCompetitiveComparisons,
  generateMockMarketPositioning,
  generateMockStrategyRecommendations,
  generateMockMarketReports,
  getCompetitorsByType,
  getTopCompetitors,
  getMarketTrendsByCategory,
  getHighImpactTrends,
  getCustomerSegmentsByRevenue,
  getUrgentRecommendations,
} from "@/lib/market-competitive-data";

interface UseMarketCompetitiveDataReturn {
  // Data States
  marketSizes: MarketSize[];
  customerSegments: CustomerSegment[];
  marketTrends: MarketTrend[];
  demandForecasts: DemandForecast[];
  industryChallenges: IndustryChallenge[];
  competitors: Competitor[];
  swotAnalyses: SWOTAnalysis[];
  competitiveComparisons: CompetitiveComparison[];
  marketPositioning: MarketPositioning[];
  strategyRecommendations: StrategyRecommendation[];
  reports: MarketReport[];

  // Filter States
  selectedCompetitorType: "all" | "direct" | "indirect" | "substitute";
  selectedTrendCategory:
    | "all"
    | "technology"
    | "regulatory"
    | "economic"
    | "social"
    | "seasonal";
  selectedTrendImpact: "all" | "low" | "medium" | "high" | "transformative";
  selectedRecommendationCategory:
    | "all"
    | "positioning"
    | "pricing"
    | "product"
    | "marketing"
    | "expansion";

  // UI States
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
  lastUpdated: Date;
  isAnalyzing: boolean;

  // Actions
  refreshData: () => Promise<void>;
  reconnect: () => void;
  selectCompetitorType: (
    type: "all" | "direct" | "indirect" | "substitute",
  ) => void;
  selectTrendCategory: (
    category:
      | "all"
      | "technology"
      | "regulatory"
      | "economic"
      | "social"
      | "seasonal",
  ) => void;
  selectTrendImpact: (
    impact: "all" | "low" | "medium" | "high" | "transformative",
  ) => void;
  selectRecommendationCategory: (
    category:
      | "all"
      | "positioning"
      | "pricing"
      | "product"
      | "marketing"
      | "expansion",
  ) => void;
  runCompetitiveAnalysis: (competitorId: string) => Promise<void>;
  generateMarketReport: (
    reportType:
      | "market_analysis"
      | "competitive_intelligence"
      | "comprehensive",
  ) => Promise<void>;

  // Computed Data
  getFilteredCompetitors: () => Competitor[];
  getFilteredTrends: () => MarketTrend[];
  getFilteredRecommendations: () => StrategyRecommendation[];
  getMarketOverview: () => {
    totalMarketSize: number;
    marketGrowth: number;
    customerCount: number;
    competitorCount: number;
  };
  getCompetitiveStrength: () => {
    ourMarketShare: number;
    competitiveRank: number;
    brandStrength: number;
    innovationScore: number;
  };
  getLatestReport: () => MarketReport | null;
}

export const useMarketCompetitiveData = (): UseMarketCompetitiveDataReturn => {
  // Data States
  const [marketSizes, setMarketSizes] = useState<MarketSize[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>(
    [],
  );
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [demandForecasts, setDemandForecasts] = useState<DemandForecast[]>([]);
  const [industryChallenges, setIndustryChallenges] = useState<
    IndustryChallenge[]
  >([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [swotAnalyses, setSWOTAnalyses] = useState<SWOTAnalysis[]>([]);
  const [competitiveComparisons, setCompetitiveComparisons] = useState<
    CompetitiveComparison[]
  >([]);
  const [marketPositioning, setMarketPositioning] = useState<
    MarketPositioning[]
  >([]);
  const [strategyRecommendations, setStrategyRecommendations] = useState<
    StrategyRecommendation[]
  >([]);
  const [reports, setReports] = useState<MarketReport[]>([]);

  // Filter States
  const [selectedCompetitorType, setSelectedCompetitorType] = useState<
    "all" | "direct" | "indirect" | "substitute"
  >("all");
  const [selectedTrendCategory, setSelectedTrendCategory] = useState<
    "all" | "technology" | "regulatory" | "economic" | "social" | "seasonal"
  >("all");
  const [selectedTrendImpact, setSelectedTrendImpact] = useState<
    "all" | "low" | "medium" | "high" | "transformative"
  >("all");
  const [selectedRecommendationCategory, setSelectedRecommendationCategory] =
    useState<
      "all" | "positioning" | "pricing" | "product" | "marketing" | "expansion"
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMarketSizes(generateMockMarketSizes());
      setCustomerSegments(generateMockCustomerSegments());
      setMarketTrends(generateMockMarketTrends());
      setDemandForecasts(generateMockDemandForecasts());
      setIndustryChallenges(generateMockIndustryChallenges());
      setCompetitors(generateMockCompetitors());
      setSWOTAnalyses(generateMockSWOTAnalyses());
      setCompetitiveComparisons(generateMockCompetitiveComparisons());
      setMarketPositioning(generateMockMarketPositioning());
      setStrategyRecommendations(generateMockStrategyRecommendations());
      setReports(generateMockMarketReports());

      setLastUpdated(new Date());
      setIsConnected(true);
    } catch (err) {
      setError("Failed to load market and competitive data");
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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update market data with slight variations
      setMarketSizes((prev) =>
        prev.map((market) => ({
          ...market,
          currentMarketSize:
            market.currentMarketSize * (0.98 + Math.random() * 0.04),
          growthRate: market.growthRate * (0.95 + Math.random() * 0.1),
        })),
      );

      // Update competitor data
      setCompetitors((prev) =>
        prev.map((competitor) => ({
          ...competitor,
          marketShare: competitor.marketShare * (0.95 + Math.random() * 0.1),
          revenue: competitor.revenue * (0.98 + Math.random() * 0.04),
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
  const selectCompetitorType = useCallback(
    (type: "all" | "direct" | "indirect" | "substitute") => {
      setSelectedCompetitorType(type);
    },
    [],
  );

  const selectTrendCategory = useCallback(
    (
      category:
        | "all"
        | "technology"
        | "regulatory"
        | "economic"
        | "social"
        | "seasonal",
    ) => {
      setSelectedTrendCategory(category);
    },
    [],
  );

  const selectTrendImpact = useCallback(
    (impact: "all" | "low" | "medium" | "high" | "transformative") => {
      setSelectedTrendImpact(impact);
    },
    [],
  );

  const selectRecommendationCategory = useCallback(
    (
      category:
        | "all"
        | "positioning"
        | "pricing"
        | "product"
        | "marketing"
        | "expansion",
    ) => {
      setSelectedRecommendationCategory(category);
    },
    [],
  );

  // Analysis Actions
  const runCompetitiveAnalysis = useCallback(
    async (competitorId: string) => {
      try {
        setIsAnalyzing(true);

        // Simulate competitive analysis process
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Generate new SWOT analysis for the competitor
        const newSWOT: SWOTAnalysis = {
          id: `swot-${Date.now()}`,
          companyId: competitorId,
          companyName:
            competitors.find((c) => c.id === competitorId)?.name ||
            "Unknown Competitor",
          analysisDate: new Date().toISOString().split("T")[0],
          strengths: [
            {
              category: "product",
              description: "Strong product portfolio",
              impact: 7 + Math.floor(Math.random() * 3),
            },
            {
              category: "brand",
              description: "Market recognition",
              impact: 6 + Math.floor(Math.random() * 4),
            },
          ],
          weaknesses: [
            {
              category: "operations",
              description: "Operational inefficiencies identified",
              impact: 5 + Math.floor(Math.random() * 3),
            },
          ],
          opportunities: [
            {
              category: "market",
              description: "New market segments available",
              potential: 6 + Math.floor(Math.random() * 4),
              timeframe: "medium_term",
            },
          ],
          threats: [
            {
              category: "competitive",
              description: "Increased competition",
              severity: 5 + Math.floor(Math.random() * 3),
              probability: 60 + Math.floor(Math.random() * 30),
            },
          ],
        };

        setSWOTAnalyses((prev) => {
          const filtered = prev.filter(
            (analysis) => analysis.companyId !== competitorId,
          );
          return [...filtered, newSWOT];
        });
      } catch (err) {
        setError("Failed to run competitive analysis");
      } finally {
        setIsAnalyzing(false);
      }
    },
    [competitors],
  );

  // Report Generation
  const generateMarketReport = useCallback(
    async (
      reportType:
        | "market_analysis"
        | "competitive_intelligence"
        | "comprehensive",
    ) => {
      try {
        setIsAnalyzing(true);

        // Simulate report generation
        await new Promise((resolve) => setTimeout(resolve, 4000));

        const newReport: MarketReport = {
          id: `mr-${Date.now()}`,
          reportDate: new Date().toISOString().split("T")[0],
          reportType,
          executiveSummary:
            "Market conditions show continued growth with evolving competitive landscape. Strategic opportunities identified in key segments.",
          keyInsights: [
            "Market growth accelerating in target segments",
            "Competitive positioning strengthening",
            "Customer satisfaction trending upward",
            "New opportunities emerging in adjacent markets",
          ],
          marketHealthScore: 70 + Math.floor(Math.random() * 25),
          competitiveStrength: 65 + Math.floor(Math.random() * 30),
          growthOpportunities: [
            "Expand into underserved segments",
            "Enhance competitive positioning",
            "Develop strategic partnerships",
            "Improve customer retention strategies",
          ],
          strategicRecommendations: [
            "Focus on high-growth market segments",
            "Strengthen competitive advantages",
            "Implement customer-centric strategies",
            "Explore strategic expansion opportunities",
          ],
          actionItems: [
            {
              task: "Complete market segment analysis",
              owner: "Strategy Team",
              deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              priority: "high",
            },
            {
              task: "Conduct competitive benchmarking",
              owner: "Marketing Team",
              deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              priority: "medium",
            },
          ],
          nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        };

        setReports((prev) => [newReport, ...prev]);
      } catch (err) {
        setError("Failed to generate market report");
      } finally {
        setIsAnalyzing(false);
      }
    },
    [],
  );

  // Computed Data
  const getFilteredCompetitors = useCallback(() => {
    let filtered = competitors;

    if (selectedCompetitorType !== "all") {
      filtered = getCompetitorsByType(filtered, selectedCompetitorType);
    }

    return filtered;
  }, [competitors, selectedCompetitorType]);

  const getFilteredTrends = useCallback(() => {
    let filtered = marketTrends;

    if (selectedTrendCategory !== "all") {
      filtered = getMarketTrendsByCategory(filtered, selectedTrendCategory);
    }

    if (selectedTrendImpact !== "all") {
      filtered = filtered.filter(
        (trend) => trend.impact === selectedTrendImpact,
      );
    }

    return filtered;
  }, [marketTrends, selectedTrendCategory, selectedTrendImpact]);

  const getFilteredRecommendations = useCallback(() => {
    let filtered = strategyRecommendations;

    if (selectedRecommendationCategory !== "all") {
      filtered = filtered.filter(
        (rec) => rec.category === selectedRecommendationCategory,
      );
    }

    return filtered;
  }, [strategyRecommendations, selectedRecommendationCategory]);

  const getMarketOverview = useCallback(() => {
    const totalMarketSize = marketSizes.reduce(
      (sum, market) => sum + market.currentMarketSize,
      0,
    );

    const marketGrowth =
      marketSizes.length > 0
        ? marketSizes.reduce((sum, market) => sum + market.growthRate, 0) /
          marketSizes.length
        : 0;

    const customerCount = customerSegments.reduce(
      (sum, segment) => sum + segment.size,
      0,
    );

    const competitorCount = competitors.length;

    return {
      totalMarketSize,
      marketGrowth,
      customerCount,
      competitorCount,
    };
  }, [marketSizes, customerSegments, competitors]);

  const getCompetitiveStrength = useCallback(() => {
    const ourPosition = marketPositioning.find(
      (pos) => pos.companyId === "own",
    );

    return {
      ourMarketShare: ourPosition?.marketShare || 0,
      competitiveRank: 4, // Assume we're 4th in the market
      brandStrength: ourPosition?.brandStrength || 0,
      innovationScore: ourPosition?.innovationScore || 0,
    };
  }, [marketPositioning]);

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
        // Update market sizes periodically
        setMarketSizes((prev) =>
          prev.map((market) => {
            if (Math.random() > 0.8) {
              // 20% chance to update each market
              return {
                ...market,
                currentMarketSize:
                  market.currentMarketSize * (0.999 + Math.random() * 0.002),
                growthRate: market.growthRate * (0.98 + Math.random() * 0.04),
              };
            }
            return market;
          }),
        );

        // Update competitor market shares
        setCompetitors((prev) =>
          prev.map((competitor) => {
            if (Math.random() > 0.9) {
              // 10% chance to update each competitor
              return {
                ...competitor,
                marketShare:
                  competitor.marketShare * (0.995 + Math.random() * 0.01),
              };
            }
            return competitor;
          }),
        );

        setLastUpdated(new Date());
      }
    }, 45000); // Update every 45 seconds

    return () => clearInterval(interval);
  }, [isConnected, isLoading]);

  return {
    // Data States
    marketSizes,
    customerSegments,
    marketTrends,
    demandForecasts,
    industryChallenges,
    competitors,
    swotAnalyses,
    competitiveComparisons,
    marketPositioning,
    strategyRecommendations,
    reports,

    // Filter States
    selectedCompetitorType,
    selectedTrendCategory,
    selectedTrendImpact,
    selectedRecommendationCategory,

    // UI States
    isLoading,
    isConnected,
    error,
    lastUpdated,
    isAnalyzing,

    // Actions
    refreshData,
    reconnect,
    selectCompetitorType,
    selectTrendCategory,
    selectTrendImpact,
    selectRecommendationCategory,
    runCompetitiveAnalysis,
    generateMarketReport,

    // Computed Data
    getFilteredCompetitors,
    getFilteredTrends,
    getFilteredRecommendations,
    getMarketOverview,
    getCompetitiveStrength,
    getLatestReport,
  };
};
