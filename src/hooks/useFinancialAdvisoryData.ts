import { useState, useEffect, useMemo } from "react";
//import {
  StrategicBudget,
  BudgetForecast,
  CashFlowProjection,
  LiquidityAnalysis,
  BudgetValidation,
  ScenarioPlanning,
  StressTesting,
  RiskAssessment,
  PerformanceAlignment,
  AdvisoryInsight,
  DecisionSupport,
  mockFinancialAdvisoryData,
  financialAdvisoryMetrics,
  calculateBudgetVariance,
  calculateLiquidityRatio,
  calculateCashBurnRate,
  calculateDaysOfCash,
  calculateRiskScore,
  calculateWorkingCapital,
  calculateCashConversionCycle,
}//from "../lib/financial-advisory-data";

// Main hook for financial advisory and planning data
export function useFinancialAdvisoryData() {
  const [strategicBudgets, setStrategicBudgets] = useState<StrategicBudget[]>(
    [],
  );
  const [cashFlowProjections, setCashFlowProjections] = useState<
    CashFlowProjection[]
  >([]);
  const [budgetValidations, setBudgetValidations] = useState<
    BudgetValidation[]
  >([]);
  const [scenarios, setScenarios] = useState<ScenarioPlanning[]>([]);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Initialize data
  useEffect(() => {
    const initializeData = () => {
      setLoading(true);

      // Simulate loading delay
      setTimeout(() => {
        setStrategicBudgets(mockFinancialAdvisoryData.strategicBudgets);
        setCashFlowProjections(mockFinancialAdvisoryData.cashFlowProjections);
        setBudgetValidations(mockFinancialAdvisoryData.budgetValidations);
        setScenarios(mockFinancialAdvisoryData.scenarios);
        setRiskAssessments(mockFinancialAdvisoryData.riskAssessments);
        setLastUpdated(new Date());
        setLoading(false);
      }, 1000);
    };

    initializeData();

    // Set up real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Computed metrics
  const financialInsights = useMemo(() => {
    if (strategicBudgets.length === 0) return financialAdvisoryMetrics;

    const totalPlanned = strategicBudgets.reduce(
      (sum, budget) => sum + budget.plannedAmount,
      0,
    );
    const totalSpent = strategicBudgets.reduce(
      (sum, budget) => sum + budget.spentAmount,
      0,
    );
    const budgetUtilization = (totalSpent / totalPlanned) * 100;
    const avgVariance =
      strategicBudgets.reduce(
        (sum, budget) => sum + budget.variancePercent,
        0,
      ) / strategicBudgets.length;
    const overBudgetCount = strategicBudgets.filter(
      (b) => b.status === "over-budget",
    ).length;
    const atRiskCount = strategicBudgets.filter(
      (b) => b.status === "at-risk",
    ).length;

    return {
      ...financialAdvisoryMetrics,
      totalBudget: totalPlanned,
      budgetUtilization,
      budgetVariance: avgVariance,
      overBudgetCount,
      atRiskCount,
    };
  }, [strategicBudgets]);

  const cashFlowInsights = useMemo(() => {
    if (cashFlowProjections.length === 0) return financialAdvisoryMetrics;

    const latestProjection =
      cashFlowProjections[cashFlowProjections.length - 1];
    const avgCashFlow =
      cashFlowProjections.reduce((sum, cf) => sum + cf.netCashFlow, 0) /
      cashFlowProjections.length;
    const cashTrend =
      cashFlowProjections.length > 1
        ? latestProjection.netCashFlow > cashFlowProjections[0].netCashFlow
          ? "positive"
          : "negative"
        : "stable";

    return {
      ...financialAdvisoryMetrics,
      cashPosition: latestProjection?.closingBalance || 2450000,
      liquidityRatio: latestProjection?.liquidityRatio || 2.8,
      avgCashFlow,
      cashTrend,
      daysOfCash: latestProjection?.daysOfCash || 90,
    };
  }, [cashFlowProjections]);

  const riskInsights = useMemo(() => {
    if (riskAssessments.length === 0) return financialAdvisoryMetrics;

    const avgRiskScore =
      riskAssessments.reduce((sum, risk) => sum + risk.riskScore, 0) /
      riskAssessments.length;
    const highRiskCount = riskAssessments.filter(
      (r) => r.riskLevel === "high" || r.riskLevel === "critical",
    ).length;
    const totalExposure = riskAssessments.reduce(
      (sum, risk) => sum + risk.financialExposure,
      0,
    );

    return {
      ...financialAdvisoryMetrics,
      riskScore: avgRiskScore,
      highRiskCount,
      totalExposure,
    };
  }, [riskAssessments]);

  return {
    // Data
    strategicBudgets,
    cashFlowProjections,
    budgetValidations,
    scenarios,
    riskAssessments,

    // Insights
    financialInsights,
    cashFlowInsights,
    riskInsights,

    // State
    loading,
    lastUpdated,

    // Actions
    setStrategicBudgets,
    setCashFlowProjections,
    setBudgetValidations,
    setScenarios,
    setRiskAssessments,
  };
}

// Hook for strategic budgeting and forecasting
export function useStrategicBudgeting() {
  const { strategicBudgets, financialInsights } = useFinancialAdvisoryData();
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Q1 2025");
  const [budgetFilter, setBudgetFilter] = useState<string>("all");

  // Filtered budgets
  const filteredBudgets = useMemo(() => {
    return strategicBudgets.filter((budget) => {
      const departmentMatch =
        selectedDepartment === "all" ||
        budget.department === selectedDepartment;
      const periodMatch = budget.period === selectedPeriod;
      const statusMatch =
        budgetFilter === "all" || budget.status === budgetFilter;
      return departmentMatch && periodMatch && statusMatch;
    });
  }, [strategicBudgets, selectedDepartment, selectedPeriod, budgetFilter]);

  // Department options
  const departments = useMemo(() => {
    const unique = [
      ...new Set(strategicBudgets.map((budget) => budget.department)),
    ];
    return ["all", ...unique];
  }, [strategicBudgets]);

  // Budget forecasts
  const budgetForecasts = useMemo<BudgetForecast[]>(() => {
    return [
      {
        id: "forecast-1",
        forecastPeriod: "Q2 2025",
        forecastType: "quarterly",
        totalBudget: 3200000,
        projectedSpend: 2950000,
        varianceForecast: -250000,
        confidenceLevel: 85,
        keyAssumptions: [
          "Market conditions remain stable",
          "No major strategic initiatives",
          "Current spending patterns continue",
          "Inflation rate at 3-4%",
        ],
        riskFactors: [
          "Economic uncertainty",
          "Supply chain disruptions",
          "Currency fluctuations",
          "Regulatory changes",
        ],
        forecastAccuracy: 87,
        methodology: "driver-based",
        lastUpdateDate: new Date(),
        nextReviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        departments: [
          {
            departmentName: "Marketing",
            currentBudget: 800000,
            forecastedSpend: 750000,
            variance: -50000,
            confidence: 88,
            keyDrivers: ["Campaign performance", "Lead generation costs"],
            risks: ["Market saturation", "Competition increase"],
          },
          {
            departmentName: "Sales",
            currentBudget: 600000,
            forecastedSpend: 580000,
            variance: -20000,
            confidence: 92,
            keyDrivers: ["Sales team performance", "Commission structure"],
            risks: ["Market downturn", "Customer churn"],
          },
        ],
      },
    ];
  }, []);

  return {
    // Data
    filteredBudgets,
    budgetForecasts,
    departments,

    // Filters
    selectedDepartment,
    setSelectedDepartment,
    selectedPeriod,
    setSelectedPeriod,
    budgetFilter,
    setBudgetFilter,

    // Insights
    financialInsights,
  };
}

// Hook for cash flow and liquidity planning
export function useCashFlowPlanning() {
  const { cashFlowProjections, cashFlowInsights } = useFinancialAdvisoryData();
  const [selectedScenario, setSelectedScenario] = useState<string>("base");
  const [forecastPeriod, setForecastPeriod] = useState<string>("6-months");

  // Filtered projections
  const filteredProjections = useMemo(() => {
    return cashFlowProjections.filter(
      (projection) =>
        selectedScenario === "all" || projection.scenario === selectedScenario,
    );
  }, [cashFlowProjections, selectedScenario]);

  // Liquidity analysis
  const liquidityAnalysis = useMemo<LiquidityAnalysis[]>(() => {
    const latestProjection =
      cashFlowProjections[cashFlowProjections.length - 1];
    if (!latestProjection) return [];

    return [
      {
        id: "liquidity-1",
        analysisDate: new Date(),
        currentRatio: latestProjection.liquidityRatio,
        quickRatio: latestProjection.liquidityRatio * 0.8,
        cashRatio: 0.6,
        operatingCashFlowRatio: 1.2,
        workingCapitalRatio: 0.25,
        liquidAssets: latestProjection.closingBalance,
        currentLiabilities: latestProjection.closingBalance * 0.3,
        liquidityGap: 0,
        liquidityScore: 85,
        recommendedCashReserve: 1500000,
        actualCashReserve: latestProjection.closingBalance,
        reserveAdequacy: (latestProjection.closingBalance / 1500000) * 100,
        liquidityRisk:
          latestProjection.liquidityRatio > 2
            ? "low"
            : latestProjection.liquidityRatio > 1.5
              ? "medium"
              : "high",
        recommendations: [
          "Maintain minimum cash reserve of $1.5M",
          "Establish backup credit facilities",
          "Optimize working capital management",
          "Implement cash flow forecasting automation",
        ],
      },
    ];
  }, [cashFlowProjections]);

  // Cash flow metrics
  const cashFlowMetrics = useMemo(() => {
    if (cashFlowProjections.length === 0) return {};

    const totalInflow = cashFlowProjections.reduce(
      (sum, cf) => sum + cf.operatingCashInflow,
      0,
    );
    const totalOutflow = cashFlowProjections.reduce(
      (sum, cf) => sum + cf.operatingCashOutflow,
      0,
    );
    const netCashFlow = totalInflow - totalOutflow;
    const avgBurnRate =
      cashFlowProjections.reduce((sum, cf) => sum + cf.cashBurnRate, 0) /
      cashFlowProjections.length;

    return {
      totalInflow,
      totalOutflow,
      netCashFlow,
      avgBurnRate,
      cashFlowVolatility: (Math.abs(netCashFlow) / totalInflow) * 100,
      operatingEfficiency: ((totalInflow - totalOutflow) / totalInflow) * 100,
    };
  }, [cashFlowProjections]);

  return {
    // Data
    filteredProjections,
    liquidityAnalysis,
    cashFlowMetrics,

    // Filters
    selectedScenario,
    setSelectedScenario,
    forecastPeriod,
    setForecastPeriod,

    // Insights
    cashFlowInsights,
  };
}

// Hook for budget validation (special feature)
export function useBudgetValidation() {
  const { budgetValidations } = useFinancialAdvisoryData();
  const [validationFilter, setValidationFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  // Filtered validations
  const filteredValidations = useMemo(() => {
    return budgetValidations.filter((validation) => {
      const statusMatch =
        validationFilter === "all" ||
        validation.validationStatus === validationFilter;
      const departmentMatch =
        departmentFilter === "all" ||
        validation.department === departmentFilter;
      return statusMatch && departmentMatch;
    });
  }, [budgetValidations, validationFilter, departmentFilter]);

  // Validation insights
  const validationInsights = useMemo(() => {
    if (budgetValidations.length === 0) return {};

    const validatedCount = budgetValidations.filter(
      (v) => v.validationStatus === "validated",
    ).length;
    const flaggedCount = budgetValidations.filter(
      (v) => v.validationStatus === "flagged",
    ).length;
    const needsRevisionCount = budgetValidations.filter(
      (v) => v.validationStatus === "requires-revision",
    ).length;
    const avgConfidence =
      budgetValidations.reduce((sum, v) => sum + v.confidenceScore, 0) /
      budgetValidations.length;

    const totalPlanned = budgetValidations.reduce(
      (sum, v) => sum + v.plannedAmount,
      0,
    );
    const totalForecast = budgetValidations.reduce(
      (sum, v) => sum + v.forecastedAmount,
      0,
    );
    const overallVariance =
      ((totalForecast - totalPlanned) / totalPlanned) * 100;

    return {
      validatedCount,
      flaggedCount,
      needsRevisionCount,
      avgConfidence,
      overallVariance,
      validationRate: (validatedCount / budgetValidations.length) * 100,
      totalVariance: totalForecast - totalPlanned,
    };
  }, [budgetValidations]);

  // Validation automation features
  const automationFeatures = useMemo(() => {
    return {
      autoValidationRules: [
        {
          rule: "Historical Variance Check",
          description:
            "Flag budgets with >15% variance from historical spending",
          enabled: true,
          threshold: 15,
          action: "flag-for-review",
        },
        {
          rule: "Market Benchmark Validation",
          description: "Compare against industry benchmarks",
          enabled: true,
          threshold: 20,
          action: "request-justification",
        },
        {
          rule: "Strategic Alignment Check",
          description: "Ensure budget aligns with strategic priorities",
          enabled: true,
          threshold: 70,
          action: "escalate-approval",
        },
      ],
      validationWorkflow: [
        "Initial forecast submission",
        "Automated validation checks",
        "Risk assessment scoring",
        "Management review (if flagged)",
        "Final approval/revision",
        "Budget lock and monitoring",
      ],
      realTimeValidation: true,
      mlPoweredForecasts: true,
      benchmarkIntegration: true,
    };
  }, []);

  return {
    // Data
    filteredValidations,
    validationInsights,
    automationFeatures,

    // Filters
    validationFilter,
    setValidationFilter,
    departmentFilter,
    setDepartmentFilter,

    // Validation methods
    validateBudget: (
      budgetItem: string,
      plannedAmount: number,
      forecastedAmount: number,
    ) => {
      const variance =
        ((forecastedAmount - plannedAmount) / plannedAmount) * 100;

      return {
        variance,
        status: Math.abs(variance) > 15 ? "flagged" : "validated",
        confidence: Math.max(60, 100 - Math.abs(variance) * 2),
        recommendations:
          variance > 15
            ? ["Review budget assumptions", "Justify increase"]
            : ["Budget approved"],
      };
    },
  };
}

// Hook for scenario planning and stress testing
export function useScenarioPlanning() {
  const { scenarios, riskInsights } = useFinancialAdvisoryData();
  const [selectedScenario, setSelectedScenario] = useState<string>("base-case");

  // Stress testing data
  const stressTests = useMemo<StressTesting[]>(() => {
    return [
      {
        id: "stress-1",
        testName: "Liquidity Stress Test",
        testType: "liquidity",
        stressLevel: "severe",
        testParameters: [
          {
            parameter: "Customer Payment Delays",
            baselineValue: 30,
            stressedValue: 90,
            stressLevel: 200,
            description: "Average days to payment increases to 90 days",
          },
          {
            parameter: "Revenue Decline",
            baselineValue: 0,
            stressedValue: -25,
            stressLevel: 25,
            description: "25% revenue decline over 6 months",
          },
        ],
        baselineMetrics: {
          revenue: 10000000,
          expenses: 8000000,
          netIncome: 2000000,
          cashFlow: 1500000,
          liquidity: 2.5,
          debtToEquity: 0.3,
          currentRatio: 2.8,
          roi: 20,
        },
        stressedMetrics: {
          revenue: 7500000,
          expenses: 8200000,
          netIncome: -700000,
          cashFlow: -500000,
          liquidity: 1.2,
          debtToEquity: 0.8,
          currentRatio: 1.5,
          roi: -7,
        },
        impactAnalysis: {
          revenueDecline: 25,
          marginCompression: 35,
          liquidityReduction: 52,
          capitalRequirement: 2000000,
          recoveryTime: "12-18 months",
          criticalThresholds: [
            {
              metric: "Cash Position",
              warningLevel: 1000000,
              criticalLevel: 500000,
              currentLevel: 800000,
              status: "warning",
            },
          ],
        },
        passingCriteria: [
          {
            criterion: "Minimum Cash Reserve",
            threshold: 500000,
            actualValue: 800000,
            status: "pass",
            importance: "high",
          },
          {
            criterion: "Debt Service Coverage",
            threshold: 1.2,
            actualValue: 0.9,
            status: "fail",
            importance: "high",
          },
        ],
        testResult: "conditional-pass",
        recommendations: [
          "Establish additional credit facilities",
          "Implement aggressive collection procedures",
          "Reduce discretionary spending by 15%",
        ],
        actionPlan: [
          "Negotiate $2M credit line within 30 days",
          "Implement weekly cash flow monitoring",
          "Prepare contingency cost reduction plan",
        ],
        testDate: new Date(),
        nextTestDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    ];
  }, []);

  return {
    // Data
    scenarios,
    stressTests,

    // Filters
    selectedScenario,
    setSelectedScenario,

    // Insights
    riskInsights,

    // Stress testing utilities
    runStressTest: (parameters: any[]) => {
      // Mock stress test execution
      return {
        testId: `stress-${Date.now()}`,
        result: "conditional-pass",
        criticalFindings: 2,
        recommendations: 5,
        executionTime: "2.3 seconds",
      };
    },
  };
}

// Hook for risk assessment
export function useRiskAssessment() {
  const { riskAssessments, riskInsights } = useFinancialAdvisoryData();
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Filtered risks
  const filteredRisks = useMemo(() => {
    return riskAssessments.filter((risk) => {
      const levelMatch = riskFilter === "all" || risk.riskLevel === riskFilter;
      const categoryMatch =
        categoryFilter === "all" || risk.riskCategory === categoryFilter;
      return levelMatch && categoryMatch;
    });
  }, [riskAssessments, riskFilter, categoryFilter]);

  // Risk categories
  const riskCategories = useMemo(() => {
    const unique = [
      ...new Set(riskAssessments.map((risk) => risk.riskCategory)),
    ];
    return ["all", ...unique];
  }, [riskAssessments]);

  return {
    // Data
    filteredRisks,
    riskCategories,

    // Filters
    riskFilter,
    setRiskFilter,
    categoryFilter,
    setCategoryFilter,

    // Insights
    riskInsights,
  };
}

// Hook for performance alignment and advisory insights
export function useAdvisoryInsights() {
  const { financialInsights } = useFinancialAdvisoryData();

  // Performance metrics
  const performanceMetrics = useMemo<PerformanceAlignment[]>(() => {
    return [
      {
        id: "perf-1",
        metricName: "Budget Variance",
        category: "financial",
        currentValue: -5.3,
        targetValue: 0,
        benchmarkValue: -3.0,
        variance: -5.3,
        variancePercent: -5.3,
        performanceRating: "fair",
        trend: "improving",
        alignmentScore: 72,
        strategicImportance: 95,
        actionableInsights: [
          "Marketing budget overrun needs immediate attention",
          "R&D spending ahead of schedule but within strategic limits",
          "Cost optimization opportunities in operations",
        ],
        recommendedActions: [
          "Implement monthly budget reviews",
          "Establish spending approval thresholds",
          "Create variance alert system",
        ],
        lastMeasured: new Date(),
        measurementFrequency: "Monthly",
        dataSource: "Financial System",
      },
    ];
  }, []);

  // Advisory insights
  const advisoryInsights = useMemo<AdvisoryInsight[]>(() => {
    return [
      {
        id: "insight-1",
        insightType: "optimization",
        title: "Cash Flow Optimization Opportunity",
        description:
          "Analysis reveals potential to improve cash conversion cycle by 15 days",
        priority: "high",
        confidence: 87,
        potentialImpact: 450000,
        timeframe: "short-term",
        category: "Cash Management",
        keyFindings: [
          "Customer payment terms can be shortened",
          "Supplier payment timing can be optimized",
          "Inventory turnover can be improved",
        ],
        recommendations: [
          {
            action: "Implement early payment discounts",
            rationale: "Encourage faster customer payments",
            priority: "high",
            timeline: "30 days",
            resource_requirements: ["Finance team", "Customer service"],
            expectedOutcome: "7-day reduction in DSO",
            successMetrics: ["DSO", "Cash flow improvement"],
            dependencies: ["Customer communication", "System updates"],
          },
        ],
        supportingData: [
          {
            dataPoint: "Current DSO",
            value: 45,
            source: "AR System",
            relevance: "high",
            lastUpdated: new Date(),
          },
        ],
        implementationComplexity: "medium",
        investmentRequired: 25000,
        expectedROI: 1800,
        riskLevel: "low",
        createdDate: new Date(),
        relevantUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        actionTaken: false,
      },
    ];
  }, []);

  // Decision support
  const decisionSupport = useMemo<DecisionSupport[]>(() => {
    return [
      {
        id: "decision-1",
        decisionContext: "Budget Reallocation for Q2",
        decisionType: "financial",
        options: [
          {
            optionId: "opt-1",
            optionName: "Maintain Current Allocation",
            description: "Keep existing budget distribution",
            investmentRequired: 0,
            expectedReturn: 0,
            timeToValue: "Immediate",
            riskLevel: "low",
            strategicFit: 60,
            feasibilityScore: 95,
            overallScore: 65,
          },
          {
            optionId: "opt-2",
            optionName: "Increase Marketing Budget",
            description: "Reallocate 15% from operations to marketing",
            investmentRequired: 200000,
            expectedReturn: 350000,
            timeToValue: "3 months",
            riskLevel: "medium",
            strategicFit: 85,
            feasibilityScore: 80,
            overallScore: 82,
          },
        ],
        criteria: [
          {
            criteriaId: "crit-1",
            criteriaName: "ROI Potential",
            weight: 0.4,
            description: "Expected return on investment",
            measurementMethod: "Financial analysis",
          },
          {
            criteriaId: "crit-2",
            criteriaName: "Strategic Alignment",
            weight: 0.3,
            description: "Alignment with business strategy",
            measurementMethod: "Strategic assessment",
          },
        ],
        weightedScores: [
          {
            optionId: "opt-2",
            criteriaId: "crit-1",
            rawScore: 85,
            weightedScore: 34,
            justification: "High ROI potential from marketing investment",
          },
        ],
        recommendedOption: "opt-2",
        confidenceLevel: 78,
        keyAssumptions: [
          "Market conditions remain favorable",
          "Marketing team can execute efficiently",
        ],
        sensitivityAnalysis: [
          {
            variable: "Market Response Rate",
            baseValue: 12,
            lowValue: 8,
            highValue: 18,
            impactOnRecommendation: "high",
            description: "Customer response to marketing campaigns",
          },
        ],
        riskConsiderations: [
          "Marketing execution risk",
          "Market saturation potential",
          "Competitive response",
        ],
        implementationRoadmap: [
          "Approval and communication (Week 1)",
          "Budget transfer and setup (Week 2)",
          "Campaign launch (Week 3-4)",
          "Performance monitoring (Ongoing)",
        ],
        monitoringMetrics: [
          "Marketing ROI",
          "Lead generation",
          "Customer acquisition cost",
          "Revenue impact",
        ],
        decisionDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        stakeholders: ["CMO", "CFO", "CEO", "Operations Director"],
      },
    ];
  }, []);

  return {
    // Data
    performanceMetrics,
    advisoryInsights,
    decisionSupport,

    // Insights
    financialInsights,
  };
}

// Utility functions for financial calculations
export function useFinancialCalculations() {
  return {
    calculateBudgetVariance,
    calculateLiquidityRatio,
    calculateCashBurnRate,
    calculateDaysOfCash,
    calculateRiskScore,
    calculateWorkingCapital,
    calculateCashConversionCycle,

    // Advanced calculations
    calculateROI: (gain: number, investment: number) => {
      return investment === 0 ? 0 : ((gain - investment) / investment) * 100;
    },

    calculatePaybackPeriod: (investment: number, cashFlow: number) => {
      return cashFlow === 0 ? Infinity : investment / cashFlow;
    },

    calculateNPV: (cashFlows: number[], discountRate: number) => {
      return cashFlows.reduce((npv, cashFlow, period) => {
        return npv + cashFlow / Math.pow(1 + discountRate, period);
      }, 0);
    },

    calculateIRR: (cashFlows: number[]) => {
      // Simplified IRR calculation - in practice would use numerical methods
      let rate = 0.1;
      let npv = cashFlows.reduce(
        (sum, cf, period) => sum + cf / Math.pow(1 + rate, period),
        0,
      );

      // Basic iteration to find IRR (simplified)
      for (let i = 0; i < 100 && Math.abs(npv) > 0.01; i++) {
        rate += npv > 0 ? 0.01 : -0.01;
        npv = cashFlows.reduce(
          (sum, cf, period) => sum + cf / Math.pow(1 + rate, period),
          0,
        );
      }

      return rate * 100;
    },
  };
}
