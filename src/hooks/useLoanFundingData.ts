import { useState, useEffect, useCallback } from "react";
import {
  BusinessProfile,
  EligibilityAssessment,
  FundingOption,
  LoanComparison,
  ApplicationDocument,
  ApplicationAssistance,
  FundingStrategy,
  InvestorProfile,
  MatchingResult,
  LoanUpdate,
  FundingWatchlist,
  generateMockBusinessProfile,
  generateMockEligibilityAssessment,
  generateMockFundingOptions,
  generateMockLoanUpdates,
  calculateLoanPayment,
  calculateTotalInterest,
  calculateAPR,
  getEligibilityScore,
} from "@/lib/loan-funding-data";

interface UseLoanFundingDataReturn {
  // Data States
  businessProfile: BusinessProfile | null;
  eligibilityAssessment: EligibilityAssessment | null;
  fundingOptions: FundingOption[];
  loanComparisons: LoanComparison[];
  applicationAssistance: ApplicationAssistance | null;
  fundingStrategy: FundingStrategy | null;
  investorProfiles: InvestorProfile[];
  matchingResults: MatchingResult[];
  loanUpdates: LoanUpdate[];
  watchlist: FundingWatchlist | null;

  // Filter States
  selectedFundingTypes: string[];
  maxLoanAmount: number;
  maxInterestRate: number;
  minCreditScore: number;
  selectedComparisonOptions: string[];

  // UI States
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
  lastUpdated: Date;
  isProcessing: boolean;

  // Actions
  refreshData: () => Promise<void>;
  reconnect: () => void;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => Promise<void>;
  runEligibilityAssessment: () => Promise<void>;
  setFundingTypeFilter: (types: string[]) => void;
  setLoanAmountFilter: (amount: number) => void;
  setInterestRateFilter: (rate: number) => void;
  setCreditScoreFilter: (score: number) => void;
  compareLoans: (
    optionIds: string[],
    amount: number,
    term: number,
  ) => Promise<void>;
  generateBusinessPlan: () => Promise<void>;
  generateFinancialProjections: () => Promise<void>;
  submitLoanApplication: (optionId: string) => Promise<void>;
  analyzeFundingStrategy: () => Promise<void>;
  findInvestorMatches: () => Promise<void>;
  addToWatchlist: (optionId: string) => Promise<void>;
  removeFromWatchlist: (optionId: string) => Promise<void>;

  // Computed Data
  getFilteredFundingOptions: () => FundingOption[];
  getEligibleOptions: () => FundingOption[];
  getBestLoanOptions: (count?: number) => FundingOption[];
  getUrgentUpdates: () => LoanUpdate[];
  getMatchScore: (optionId: string) => number;
  getLoanCalculations: (
    optionId: string,
    amount: number,
    term: number,
  ) => {
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    apr: number;
  };
}

export const useLoanFundingData = (): UseLoanFundingDataReturn => {
  // Data States
  const [businessProfile, setBusinessProfile] =
    useState<BusinessProfile | null>(null);
  const [eligibilityAssessment, setEligibilityAssessment] =
    useState<EligibilityAssessment | null>(null);
  const [fundingOptions, setFundingOptions] = useState<FundingOption[]>([]);
  const [loanComparisons, setLoanComparisons] = useState<LoanComparison[]>([]);
  const [applicationAssistance, setApplicationAssistance] =
    useState<ApplicationAssistance | null>(null);
  const [fundingStrategy, setFundingStrategy] =
    useState<FundingStrategy | null>(null);
  const [investorProfiles, setInvestorProfiles] = useState<InvestorProfile[]>(
    [],
  );
  const [matchingResults, setMatchingResults] = useState<MatchingResult[]>([]);
  const [loanUpdates, setLoanUpdates] = useState<LoanUpdate[]>([]);
  const [watchlist, setWatchlist] = useState<FundingWatchlist | null>(null);

  // Filter States
  const [selectedFundingTypes, setSelectedFundingTypes] = useState<string[]>(
    [],
  );
  const [maxLoanAmount, setMaxLoanAmount] = useState<number>(10000000);
  const [maxInterestRate, setMaxInterestRate] = useState<number>(25);
  const [minCreditScore, setMinCreditScore] = useState<number>(500);
  const [selectedComparisonOptions, setSelectedComparisonOptions] = useState<
    string[]
  >([]);

  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize data
  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API calls with realistic delays
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setBusinessProfile(generateMockBusinessProfile());
      setEligibilityAssessment(generateMockEligibilityAssessment());
      setFundingOptions(generateMockFundingOptions());
      setLoanUpdates(generateMockLoanUpdates());

      // Initialize watchlist
      setWatchlist({
        id: "wl-001",
        businessProfileId: "bp-001",
        watchedPrograms: [],
        alerts: {
          rateChanges: true,
          newPrograms: true,
          deadlineReminders: true,
          eligibilityChanges: true,
        },
        customKeywords: ["SBA", "technology", "growth"],
        lastUpdated: new Date().toISOString(),
      });

      setLastUpdated(new Date());
      setIsConnected(true);
    } catch (err) {
      setError("Failed to load loan and funding data");
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
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Update funding options with slight rate changes
      setFundingOptions((prev) =>
        prev.map((option) => ({
          ...option,
          interestRate: {
            ...option.interestRate,
            min: Math.max(
              0.5,
              option.interestRate.min + (Math.random() - 0.5) * 0.5,
            ),
            max: Math.max(
              1,
              option.interestRate.max + (Math.random() - 0.5) * 0.5,
            ),
          },
          popularity: Math.max(
            10,
            Math.min(100, option.popularity + (Math.random() - 0.5) * 10),
          ),
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

  // Update business profile
  const updateBusinessProfile = useCallback(
    async (updates: Partial<BusinessProfile>) => {
      try {
        setIsProcessing(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        setBusinessProfile((prev) => (prev ? { ...prev, ...updates } : null));

        // Trigger new eligibility assessment
        await runEligibilityAssessment();
      } catch (err) {
        setError("Failed to update business profile");
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  // Run eligibility assessment
  const runEligibilityAssessment = useCallback(async () => {
    if (!businessProfile) return;

    try {
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate new assessment based on current profile
      const newAssessment: EligibilityAssessment = {
        id: `ea-${Date.now()}`,
        businessProfileId: businessProfile.id,
        overallScore: Math.max(
          40,
          Math.min(95, 50 + businessProfile.creditScore / 10),
        ),
        eligibleLoanTypes: fundingOptions
          .filter(
            (option) => getEligibilityScore(businessProfile, option) >= 70,
          )
          .map((option) => option.name),
        assessmentDate: new Date().toISOString().split("T")[0],
        criteria: {
          creditworthiness: {
            score: Math.max(
              30,
              Math.min(100, businessProfile.creditScore / 8.5),
            ),
            status:
              businessProfile.creditScore >= 750
                ? "excellent"
                : businessProfile.creditScore >= 700
                  ? "good"
                  : businessProfile.creditScore >= 650
                    ? "fair"
                    : "poor",
            factors: [
              `Credit score: ${businessProfile.creditScore}`,
              "Payment history analysis",
              "Credit utilization review",
            ],
          },
          financialHealth: {
            score: Math.max(
              30,
              Math.min(
                100,
                (businessProfile.annualRevenue / 1000000) * 30 + 40,
              ),
            ),
            status:
              businessProfile.annualRevenue >= 2000000
                ? "strong"
                : businessProfile.annualRevenue >= 1000000
                  ? "stable"
                  : businessProfile.annualRevenue >= 500000
                    ? "moderate"
                    : "weak",
            metrics: {
              revenueStability: Math.min(
                100,
                (businessProfile.annualRevenue / 1000000) * 40 + 40,
              ),
              profitability: Math.min(
                100,
                businessProfile.cashFlow / 10000 + 50,
              ),
              cashFlowStrength: Math.min(
                100,
                businessProfile.cashFlow / 10000 + 60,
              ),
              debtRatio: Math.max(
                0,
                100 - businessProfile.debtToIncomeRatio * 100,
              ),
            },
          },
          businessViability: {
            score: Math.max(
              50,
              Math.min(100, businessProfile.yearsInBusiness * 15 + 40),
            ),
            status:
              businessProfile.yearsInBusiness >= 5
                ? "high"
                : businessProfile.yearsInBusiness >= 2
                  ? "medium"
                  : "low",
            factors: [
              `${businessProfile.yearsInBusiness} years in business`,
              "Industry growth potential",
              "Market position strength",
            ],
          },
          industryRisk: {
            score: 70,
            riskLevel: "medium",
            factors: [
              "Industry volatility assessment",
              "Market competition analysis",
              "Economic sensitivity review",
            ],
          },
        },
        recommendations: [
          "Consider SBA loans for favorable terms",
          "Explore equipment financing for expansion",
          "Build stronger cash reserves",
        ],
        improvementAreas: [
          "Increase profit margins",
          "Diversify revenue streams",
          "Reduce debt obligations",
        ],
      };

      setEligibilityAssessment(newAssessment);
    } catch (err) {
      setError("Failed to run eligibility assessment");
    } finally {
      setIsProcessing(false);
    }
  }, [businessProfile, fundingOptions]);

  // Filter Actions
  const setFundingTypeFilter = useCallback((types: string[]) => {
    setSelectedFundingTypes(types);
  }, []);

  const setLoanAmountFilter = useCallback((amount: number) => {
    setMaxLoanAmount(amount);
  }, []);

  const setInterestRateFilter = useCallback((rate: number) => {
    setMaxInterestRate(rate);
  }, []);

  const setCreditScoreFilter = useCallback((score: number) => {
    setMinCreditScore(score);
  }, []);

  // Compare loans
  const compareLoans = useCallback(
    async (optionIds: string[], amount: number, term: number) => {
      try {
        setIsProcessing(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const comparisons = optionIds
          .map((optionId) => {
            const option = fundingOptions.find((o) => o.id === optionId);
            if (!option) return null;

            const avgRate =
              (option.interestRate.min + option.interestRate.max) / 2;
            const monthlyPayment = calculateLoanPayment(amount, avgRate, term);
            const totalInterest = calculateTotalInterest(
              amount,
              monthlyPayment,
              term,
            );
            const totalFees =
              option.fees.applicationFee +
              option.fees.processingFee +
              option.fees.maintenanceFee * term;
            const totalCost = amount + totalInterest + totalFees;
            const apr = calculateAPR(amount, totalInterest, totalFees, term);

            return {
              optionId,
              monthlyPayment,
              totalInterest,
              totalCost,
              apr,
              totalFees,
              recommendation:
                monthlyPayment ===
                Math.min(
                  ...optionIds.map((id) => {
                    const opt = fundingOptions.find((o) => o.id === id);
                    return opt
                      ? calculateLoanPayment(
                          amount,
                          (opt.interestRate.min + opt.interestRate.max) / 2,
                          term,
                        )
                      : Infinity;
                  }),
                )
                  ? "best_rate"
                  : ("most_flexible" as const),
            };
          })
          .filter(Boolean);

        const newComparison: LoanComparison = {
          id: `lc-${Date.now()}`,
          selectedOptions: optionIds,
          comparisonDate: new Date().toISOString().split("T")[0],
          loanAmount: amount,
          repaymentTerm: term,
          comparisons: comparisons as any,
          bestOverall:
            comparisons.reduce((best, current) =>
              current && (!best || current.totalCost < best.totalCost)
                ? current
                : best,
            )?.optionId || "",
        };

        setLoanComparisons((prev) => [newComparison, ...prev.slice(0, 4)]);
      } catch (err) {
        setError("Failed to compare loans");
      } finally {
        setIsProcessing(false);
      }
    },
    [fundingOptions],
  );

  // Generate business plan
  const generateBusinessPlan = useCallback(async () => {
    try {
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate business plan generation
      setApplicationAssistance((prev) =>
        prev
          ? {
              ...prev,
              generatedContent: {
                ...prev.generatedContent,
                businessPlan: {
                  status: "completed",
                  content: "Generated comprehensive business plan...",
                  lastUpdated: new Date().toISOString(),
                },
              },
              progress: Math.min(100, prev.progress + 25),
            }
          : null,
      );
    } catch (err) {
      setError("Failed to generate business plan");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Generate financial projections
  const generateFinancialProjections = useCallback(async () => {
    try {
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 2500));

      setApplicationAssistance((prev) =>
        prev
          ? {
              ...prev,
              generatedContent: {
                ...prev.generatedContent,
                financialProjections: {
                  status: "completed",
                  projections: { revenue: [], expenses: [], cashFlow: [] },
                  lastUpdated: new Date().toISOString(),
                },
              },
              progress: Math.min(100, prev.progress + 20),
            }
          : null,
      );
    } catch (err) {
      setError("Failed to generate financial projections");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Submit loan application
  const submitLoanApplication = useCallback(async (optionId: string) => {
    try {
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate application submission
      console.log(`Application submitted for option: ${optionId}`);
    } catch (err) {
      setError("Failed to submit loan application");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Analyze funding strategy
  const analyzeFundingStrategy = useCallback(async () => {
    if (!businessProfile) return;

    try {
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const newStrategy: FundingStrategy = {
        id: `fs-${Date.now()}`,
        businessProfileId: businessProfile.id,
        recommendedMix: {
          equity:
            businessProfile.businessStage === "startup"
              ? 70
              : businessProfile.businessStage === "growth"
                ? 40
                : 20,
          debt:
            businessProfile.businessStage === "startup"
              ? 30
              : businessProfile.businessStage === "growth"
                ? 60
                : 80,
        },
        fundingTimeline: {
          immediate: fundingOptions.filter(
            (o) => o.applicationProcess.timeToFunding <= 14,
          ),
          shortTerm: fundingOptions.filter(
            (o) =>
              o.applicationProcess.timeToFunding > 14 &&
              o.applicationProcess.timeToFunding <= 60,
          ),
          longTerm: fundingOptions.filter(
            (o) => o.applicationProcess.timeToFunding > 60,
          ),
        },
        dilutionAnalysis: {
          equityDilution: 15,
          retainedOwnership: 85,
          valuation: businessProfile.annualRevenue * 3,
          investorRights: ["Board seat", "Veto rights", "Anti-dilution"],
        },
        debtAnalysis: {
          debtServiceCoverage: businessProfile.cashFlow / 5000,
          monthlyPayments: businessProfile.cashFlow * 0.3,
          totalInterestCost: 150000,
          impactOnCashFlow: 30,
        },
        riskAssessment: {
          equityRisks: [
            "Loss of control",
            "Dilution of ownership",
            "Investor pressure",
          ],
          debtRisks: [
            "Fixed payment obligations",
            "Collateral requirements",
            "Personal guarantees",
          ],
          mitigationStrategies: [
            "Maintain strong cash flow",
            "Diversify funding sources",
            "Build reserves",
          ],
        },
        readinessScore: eligibilityAssessment?.overallScore || 70,
        improvementPlan: [
          {
            priority: "high",
            action: "Improve credit score",
            timeframe: "3-6 months",
            expectedImpact: "Better loan terms and rates",
          },
          {
            priority: "medium",
            action: "Increase monthly revenue",
            timeframe: "6-12 months",
            expectedImpact: "Higher loan amounts available",
          },
        ],
      };

      setFundingStrategy(newStrategy);
    } catch (err) {
      setError("Failed to analyze funding strategy");
    } finally {
      setIsProcessing(false);
    }
  }, [businessProfile, fundingOptions, eligibilityAssessment]);

  // Find investor matches
  const findInvestorMatches = useCallback(async () => {
    try {
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate investor matching
      console.log("Finding investor matches...");
    } catch (err) {
      setError("Failed to find investor matches");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Watchlist management
  const addToWatchlist = useCallback(async (optionId: string) => {
    try {
      setWatchlist((prev) =>
        prev
          ? {
              ...prev,
              watchedPrograms: [
                ...prev.watchedPrograms,
                {
                  fundingOptionId: optionId,
                  addedDate: new Date().toISOString(),
                  notifications: true,
                  priority: "medium",
                  notes: "",
                },
              ],
              lastUpdated: new Date().toISOString(),
            }
          : null,
      );
    } catch (err) {
      setError("Failed to add to watchlist");
    }
  }, []);

  const removeFromWatchlist = useCallback(async (optionId: string) => {
    try {
      setWatchlist((prev) =>
        prev
          ? {
              ...prev,
              watchedPrograms: prev.watchedPrograms.filter(
                (program) => program.fundingOptionId !== optionId,
              ),
              lastUpdated: new Date().toISOString(),
            }
          : null,
      );
    } catch (err) {
      setError("Failed to remove from watchlist");
    }
  }, []);

  // Computed Data
  const getFilteredFundingOptions = useCallback(() => {
    let filtered = fundingOptions;

    if (selectedFundingTypes.length > 0) {
      filtered = filtered.filter((option) =>
        selectedFundingTypes.includes(option.type),
      );
    }

    filtered = filtered.filter(
      (option) =>
        option.maxAmount >= maxLoanAmount / 10 &&
        option.interestRate.max <= maxInterestRate &&
        option.eligibilityRequirements.minCreditScore <= minCreditScore + 50,
    );

    return filtered;
  }, [
    fundingOptions,
    selectedFundingTypes,
    maxLoanAmount,
    maxInterestRate,
    minCreditScore,
  ]);

  const getEligibleOptions = useCallback(() => {
    if (!businessProfile) return [];

    return fundingOptions.filter(
      (option) => getEligibilityScore(businessProfile, option) >= 60,
    );
  }, [fundingOptions, businessProfile]);

  const getBestLoanOptions = useCallback(
    (count: number = 3) => {
      return getEligibleOptions()
        .sort((a, b) => {
          const scoreA = a.rating * a.popularity;
          const scoreB = b.rating * b.popularity;
          return scoreB - scoreA;
        })
        .slice(0, count);
    },
    [getEligibleOptions],
  );

  const getUrgentUpdates = useCallback(() => {
    return loanUpdates.filter(
      (update) => update.urgency === "high" || update.urgency === "critical",
    );
  }, [loanUpdates]);

  const getMatchScore = useCallback(
    (optionId: string) => {
      if (!businessProfile) return 0;

      const option = fundingOptions.find((o) => o.id === optionId);
      return option ? getEligibilityScore(businessProfile, option) : 0;
    },
    [fundingOptions, businessProfile],
  );

  const getLoanCalculations = useCallback(
    (optionId: string, amount: number, term: number) => {
      const option = fundingOptions.find((o) => o.id === optionId);
      if (!option) {
        return { monthlyPayment: 0, totalInterest: 0, totalCost: 0, apr: 0 };
      }

      const avgRate = (option.interestRate.min + option.interestRate.max) / 2;
      const monthlyPayment = calculateLoanPayment(amount, avgRate, term);
      const totalInterest = calculateTotalInterest(
        amount,
        monthlyPayment,
        term,
      );
      const totalFees =
        option.fees.applicationFee +
        option.fees.processingFee +
        option.fees.maintenanceFee * term;
      const totalCost = amount + totalInterest + totalFees;
      const apr = calculateAPR(amount, totalInterest, totalFees, term);

      return { monthlyPayment, totalInterest, totalCost, apr };
    },
    [fundingOptions],
  );

  // Initialize data on mount
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected && !isLoading) {
        // Update interest rates periodically
        setFundingOptions((prev) =>
          prev.map((option) => {
            if (Math.random() > 0.9) {
              // 10% chance to update each option
              return {
                ...option,
                interestRate: {
                  ...option.interestRate,
                  min: Math.max(
                    0.5,
                    option.interestRate.min + (Math.random() - 0.5) * 0.1,
                  ),
                  max: Math.max(
                    1,
                    option.interestRate.max + (Math.random() - 0.5) * 0.1,
                  ),
                },
              };
            }
            return option;
          }),
        );

        setLastUpdated(new Date());
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isConnected, isLoading]);

  return {
    // Data States
    businessProfile,
    eligibilityAssessment,
    fundingOptions,
    loanComparisons,
    applicationAssistance,
    fundingStrategy,
    investorProfiles,
    matchingResults,
    loanUpdates,
    watchlist,

    // Filter States
    selectedFundingTypes,
    maxLoanAmount,
    maxInterestRate,
    minCreditScore,
    selectedComparisonOptions,

    // UI States
    isLoading,
    isConnected,
    error,
    lastUpdated,
    isProcessing,

    // Actions
    refreshData,
    reconnect,
    updateBusinessProfile,
    runEligibilityAssessment,
    setFundingTypeFilter,
    setLoanAmountFilter,
    setInterestRateFilter,
    setCreditScoreFilter,
    compareLoans,
    generateBusinessPlan,
    generateFinancialProjections,
    submitLoanApplication,
    analyzeFundingStrategy,
    findInvestorMatches,
    addToWatchlist,
    removeFromWatchlist,

    // Computed Data
    getFilteredFundingOptions,
    getEligibleOptions,
    getBestLoanOptions,
    getUrgentUpdates,
    getMatchScore,
    getLoanCalculations,
  };
};
