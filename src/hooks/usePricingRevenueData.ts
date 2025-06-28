import { useState, useEffect, useMemo } from "react";
import {
  PricingStrategy,
  ValueBasedPricing,
  CompetitiveBenchmark,
  DynamicPricing,
  TieredPricing,
  PricingTest,
  RevenueStream,
  RevenueForecast,
  SubscriptionMetrics,
  PromotionAnalysis,
  CustomerChurn,
  CrossSellOpportunity,
  RevenueLeakage,
  ProductProfitability,
  ChannelProfitability,
  CashFlowAlignment,
  MarginOptimization,
  mockPricingRevenueData,
  pricingRevenueMetrics,
  calculatePriceElasticity,
  calculateOptimalPrice,
  calculateCustomerLifetimeValue,
  calculateChurnRate,
  calculateNetRevenueRetention,
  calculateBreakEvenPoint,
  calculateROI,
} //from "../lib/pricing-revenue-data";

// Main hook for pricing and revenue optimization data
export function usePricingRevenueData() {
  const [pricingStrategies, setPricingStrategies] = useState<PricingStrategy[]>(
    [],
  );
  const [valueBasedPricing, setValueBasedPricing] = useState<
    ValueBasedPricing[]
  >([]);
  const [revenueForecast, setRevenueForecast] = useState<RevenueForecast[]>([]);
  const [subscriptionMetrics, setSubscriptionMetrics] = useState<
    SubscriptionMetrics[]
  >([]);
  const [productProfitability, setProductProfitability] = useState<
    ProductProfitability[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Initialize data
  useEffect(() => {
    const initializeData = () => {
      setLoading(true);

      // Simulate loading delay
      setTimeout(() => {
        setPricingStrategies(mockPricingRevenueData.pricingStrategies);
        setValueBasedPricing(mockPricingRevenueData.valueBasedPricing);
        setRevenueForecast(mockPricingRevenueData.revenueForecast);
        setSubscriptionMetrics(mockPricingRevenueData.subscriptionMetrics);
        setProductProfitability(mockPricingRevenueData.productProfitability);
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
  const pricingInsights = useMemo(() => {
    if (pricingStrategies.length === 0) return pricingRevenueMetrics;

    const avgEffectiveness =
      pricingStrategies.reduce(
        (sum, strategy) => sum + strategy.effectiveness,
        0,
      ) / pricingStrategies.length;

    const activePricingStrategies = pricingStrategies.filter(
      (s) => s.status === "active",
    ).length;

    return {
      ...pricingRevenueMetrics,
      avgEffectiveness,
      activePricingStrategies,
    };
  }, [pricingStrategies]);

  const revenueInsights = useMemo(() => {
    if (subscriptionMetrics.length === 0) return pricingRevenueMetrics;

    const totalMRR = subscriptionMetrics.reduce(
      (sum, metric) => sum + metric.monthlyRecurringRevenue,
      0,
    );
    const avgChurnRate =
      subscriptionMetrics.reduce((sum, metric) => sum + metric.churnRate, 0) /
      subscriptionMetrics.length;
    const avgCLV =
      subscriptionMetrics.reduce(
        (sum, metric) => sum + metric.customerLifetimeValue,
        0,
      ) / subscriptionMetrics.length;

    return {
      ...pricingRevenueMetrics,
      totalMRR,
      avgChurnRate,
      avgCLV,
    };
  }, [subscriptionMetrics]);

  return {
    // Data
    pricingStrategies,
    valueBasedPricing,
    revenueForecast,
    subscriptionMetrics,
    productProfitability,

    // Insights
    pricingInsights,
    revenueInsights,

    // State
    loading,
    lastUpdated,

    // Actions
    setPricingStrategies,
    setValueBasedPricing,
    setRevenueForecast,
    setSubscriptionMetrics,
    setProductProfitability,
  };
}

// Hook for pricing strategy features
export function usePricingStrategy() {
  const { pricingStrategies, valueBasedPricing, pricingInsights } =
    usePricingRevenueData();
  const [selectedStrategy, setSelectedStrategy] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Competitive benchmarking data
  const competitiveBenchmarks = useMemo<CompetitiveBenchmark[]>(() => {
    return [
      {
        competitorId: "comp-1",
        competitorName: "TechRival Corp",
        productCategory: "Analytics Software",
        theirPrice: 299,
        ourPrice: 349,
        priceDifference: -50,
        priceDifferencePercent: -14.3,
        featureComparison: [
          {
            feature: "Real-time Analytics",
            ourFeature: "better",
            competitorFeature: "same",
            importance: 0.9,
          },
          {
            feature: "Custom Dashboards",
            ourFeature: "same",
            competitorFeature: "same",
            importance: 0.8,
          },
          {
            feature: "API Access",
            ourFeature: "better",
            competitorFeature: "worse",
            importance: 0.7,
          },
        ],
        valueProposition: "Premium features with superior performance",
        marketPosition: "premium",
        priceAdvantage: "higher",
        lastUpdated: new Date(),
      },
      {
        competitorId: "comp-2",
        competitorName: "DataMax Solutions",
        productCategory: "Analytics Software",
        theirPrice: 199,
        ourPrice: 349,
        priceDifference: -150,
        priceDifferencePercent: -42.9,
        featureComparison: [
          {
            feature: "Data Processing Speed",
            ourFeature: "better",
            competitorFeature: "worse",
            importance: 0.85,
          },
          {
            feature: "User Interface",
            ourFeature: "better",
            competitorFeature: "same",
            importance: 0.6,
          },
          {
            feature: "Support Quality",
            ourFeature: "better",
            competitorFeature: "worse",
            importance: 0.75,
          },
        ],
        valueProposition: "Superior technology justifies premium pricing",
        marketPosition: "premium",
        priceAdvantage: "higher",
        lastUpdated: new Date(),
      },
    ];
  }, []);

  // Dynamic pricing data
  const dynamicPricing = useMemo<DynamicPricing[]>(() => {
    return [
      {
        productId: "prod-1",
        productName: "Analytics Pro",
        basePrice: 299,
        currentPrice: 329,
        priceFloor: 249,
        priceCeiling: 399,
        demandLevel: "high",
        inventoryLevel: 150,
        seasonalFactor: 1.1,
        competitiveAdjustment: 1.05,
        algorithmicPrice: 329,
        priceHistory: [
          {
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            price: 299,
            demand: 45,
            revenue: 13455,
            reason: "Base pricing",
          },
          {
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
            price: 319,
            demand: 52,
            revenue: 16588,
            reason: "High demand detected",
          },
          {
            timestamp: new Date(),
            price: 329,
            demand: 48,
            revenue: 15792,
            reason: "Competitor price increase",
          },
        ],
        elasticity: -1.2,
        optimizationGoal: "revenue",
      },
    ];
  }, []);

  // Tiered pricing data
  const tieredPricing = useMemo<TieredPricing[]>(() => {
    return [
      {
        id: "tier-1",
        productName: "Analytics Platform",
        tierName: "Starter",
        tierLevel: 1,
        price: 99,
        features: ["Basic Analytics", "5 Dashboards", "Email Support"],
        limitations: ["Limited to 1,000 records", "Basic reporting only"],
        targetCustomer: "Small businesses",
        popularTier: false,
        conversionRate: 12.5,
        averageRevenuePerTier: 2475,
        customerCountInTier: 450,
        upgradePath: ["Professional", "Enterprise"],
      },
      {
        id: "tier-2",
        productName: "Analytics Platform",
        tierName: "Professional",
        tierLevel: 2,
        price: 299,
        features: [
          "Advanced Analytics",
          "Unlimited Dashboards",
          "API Access",
          "Phone Support",
        ],
        limitations: ["Limited to 100,000 records"],
        targetCustomer: "Growing businesses",
        popularTier: true,
        conversionRate: 18.7,
        averageRevenuePerTier: 8970,
        customerCountInTier: 320,
        upgradePath: ["Enterprise"],
      },
      {
        id: "tier-3",
        productName: "Analytics Platform",
        tierName: "Enterprise",
        tierLevel: 3,
        price: 799,
        features: [
          "Full Analytics Suite",
          "Custom Integrations",
          "Dedicated Support",
          "SLA Guarantee",
        ],
        limitations: [],
        targetCustomer: "Large enterprises",
        popularTier: false,
        conversionRate: 8.2,
        averageRevenuePerTier: 15180,
        customerCountInTier: 95,
        upgradePath: [],
      },
    ];
  }, []);

  // A/B testing data
  const pricingTests = useMemo<PricingTest[]>(() => {
    return [
      {
        id: "test-1",
        testName: "Professional Plan Price Test",
        testType: "a-b",
        productId: "prod-2",
        productName: "Professional Plan",
        variants: [
          {
            variantId: "variant-a",
            variantName: "Current Price ($299)",
            price: 299,
            conversionRate: 18.5,
            revenue: 55350,
            visits: 1000,
            purchases: 185,
            confidenceInterval: [16.2, 20.8],
          },
          {
            variantId: "variant-b",
            variantName: "Test Price ($349)",
            price: 349,
            conversionRate: 15.2,
            revenue: 53048,
            visits: 1000,
            purchases: 152,
            confidenceInterval: [13.1, 17.3],
          },
        ],
        status: "running",
        startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        sampleSize: 2000,
        confidenceLevel: 95,
        winningVariant: undefined,
        liftPercent: undefined,
        statisticalSignificance: false,
        insights: [
          "Higher price reduces conversion but may increase overall revenue",
          "Need larger sample size for statistical significance",
          "Consider testing intermediate price points",
        ],
      },
    ];
  }, []);

  return {
    // Data
    pricingStrategies,
    valueBasedPricing,
    competitiveBenchmarks,
    dynamicPricing,
    tieredPricing,
    pricingTests,

    // Filters
    selectedStrategy,
    setSelectedStrategy,
    priceRange,
    setPriceRange,

    // Insights
    pricingInsights,
  };
}

// Hook for revenue strategy features
export function useRevenueStrategy() {
  const {
    revenueForecast,
    subscriptionMetrics,
    productProfitability,
    revenueInsights,
  } = usePricingRevenueData();
  const [selectedForecastScenario, setSelectedForecastScenario] = useState<
    "best-case" | "base-case" | "worst-case"
  >("base-case");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("quarter");

  // Revenue streams data
  const revenueStreams = useMemo<RevenueStream[]>(() => {
    return [
      {
        id: "stream-1",
        streamName: "Software Subscriptions",
        type: "subscription",
        currentRevenue: 8900000,
        forecastedRevenue: 10680000,
        growthRate: 20,
        marketShare: 12.5,
        profitMargin: 78,
        customerLifetimeValue: 4750,
        churnRate: 2.3,
        acquisitionCost: 450,
        recurring: true,
        seasonality: {
          q1: 0.95,
          q2: 1.1,
          q3: 0.9,
          q4: 1.05,
          peakMonth: "June",
          lowMonth: "August",
        },
      },
      {
        id: "stream-2",
        streamName: "Professional Services",
        type: "service",
        currentRevenue: 2400000,
        forecastedRevenue: 2880000,
        growthRate: 15,
        marketShare: 8.3,
        profitMargin: 45,
        customerLifetimeValue: 12000,
        acquisitionCost: 800,
        recurring: false,
        seasonality: {
          q1: 1.05,
          q2: 1.0,
          q3: 0.85,
          q4: 1.1,
          peakMonth: "November",
          lowMonth: "July",
        },
      },
      {
        id: "stream-3",
        streamName: "Training & Certification",
        type: "product-sales",
        currentRevenue: 1200000,
        forecastedRevenue: 1560000,
        growthRate: 30,
        marketShare: 15.2,
        profitMargin: 65,
        customerLifetimeValue: 2500,
        acquisitionCost: 200,
        recurring: false,
        seasonality: {
          q1: 1.2,
          q2: 1.0,
          q3: 0.8,
          q4: 1.0,
          peakMonth: "January",
          lowMonth: "July",
        },
      },
    ];
  }, []);

  // Promotion analysis data
  const promotionAnalysis = useMemo<PromotionAnalysis[]>(() => {
    return [
      {
        id: "promo-1",
        promotionName: "Q4 Year-End Sale",
        promotionType: "discount",
        discountPercentage: 25,
        startDate: new Date(2024, 11, 1),
        endDate: new Date(2024, 11, 31),
        targetCustomers: ["Enterprise", "Mid-market"],
        productsIncluded: ["Professional Plan", "Enterprise Plan"],
        totalCost: 156000,
        revenueGenerated: 890000,
        unitsSold: 245,
        incrementalRevenue: 320000,
        roi: 205,
        effectivenesScore: 85,
        customerAcquisition: 78,
        customerRetention: 92,
        cannibalizedSales: 45000,
      },
    ];
  }, []);

  // Customer churn data
  const customerChurn = useMemo<CustomerChurn[]>(() => {
    return [
      {
        customerId: "cust-1",
        customerSegment: "Enterprise",
        joinDate: new Date(2023, 5, 15),
        isChurned: false,
        lastPurchaseDate: new Date(2024, 10, 20),
        totalRevenue: 15600,
        purchaseFrequency: 12,
        averageOrderValue: 1300,
        lifetimeValue: 18500,
        churnProbability: 15,
        riskLevel: "low",
        retentionEfforts: [
          {
            activityType: "email",
            date: new Date(2024, 10, 1),
            description: "Quarterly business review invitation",
            outcome: "successful",
            cost: 50,
          },
        ],
        predictedChurnDate: new Date(2025, 8, 15),
      },
      {
        customerId: "cust-2",
        customerSegment: "SMB",
        joinDate: new Date(2024, 1, 10),
        isChurned: false,
        lastPurchaseDate: new Date(2024, 7, 5),
        totalRevenue: 2400,
        purchaseFrequency: 4,
        averageOrderValue: 600,
        lifetimeValue: 3200,
        churnProbability: 75,
        riskLevel: "high",
        retentionEfforts: [
          {
            activityType: "discount",
            date: new Date(2024, 11, 15),
            description: "20% retention discount offer",
            outcome: "pending",
            cost: 120,
          },
        ],
        predictedChurnDate: new Date(2025, 0, 20),
      },
    ];
  }, []);

  // Cross-sell opportunities
  const crossSellOpportunities = useMemo<CrossSellOpportunity[]>(() => {
    return [
      {
        customerId: "cust-3",
        customerName: "TechCorp Inc",
        currentProducts: ["Professional Plan"],
        recommendedProducts: ["API Add-on", "Premium Support"],
        crossSellProbability: 78,
        potentialRevenue: 8400,
        confidence: 85,
        reason: "High API usage indicates need for expanded limits",
        priority: "high",
        actionRequired: "Schedule product demo",
        expectedCloseDate: new Date(2025, 1, 15),
        stage: "identified",
      },
    ];
  }, []);

  // Revenue leakage data
  const revenueLeakage = useMemo<RevenueLeakage[]>(() => {
    return [
      {
        id: "leak-1",
        leakageType: "billing-errors",
        description: "Incorrect discount applications in billing system",
        detectedDate: new Date(2024, 10, 15),
        estimatedImpact: 45000,
        monthlyImpact: 15000,
        affectedCustomers: 78,
        rootCause: "Manual discount approval process",
        status: "fixing",
        fixCost: 8000,
        timeToFix: "2 weeks",
        responsible: "Billing Team",
        priority: "high",
      },
      {
        id: "leak-2",
        leakageType: "contract-compliance",
        description: "Customers not using full contracted services",
        detectedDate: new Date(2024, 9, 20),
        estimatedImpact: 120000,
        monthlyImpact: 30000,
        affectedCustomers: 45,
        rootCause: "Poor onboarding and adoption tracking",
        status: "investigating",
        fixCost: 25000,
        timeToFix: "6 weeks",
        responsible: "Customer Success",
        priority: "critical",
      },
    ];
  }, []);

  // Channel profitability data
  const channelProfitability = useMemo<ChannelProfitability[]>(() => {
    return [
      {
        channelId: "channel-1",
        channelName: "Direct Sales",
        channelType: "direct",
        revenue: 7500000,
        costs: 2250000,
        profit: 5250000,
        margin: 70,
        customerAcquisitionCost: 450,
        customerLifetimeValue: 4750,
        conversionRate: 12.5,
        averageOrderValue: 3200,
        customerSatisfaction: 4.6,
        marketShare: 65,
        growthRate: 18,
        profitabilityScore: 92,
        efficiency: 88,
        recommendations: [
          "Invest in sales automation",
          "Expand enterprise sales team",
          "Improve lead qualification",
        ],
      },
      {
        channelId: "channel-2",
        channelName: "Partner Channel",
        channelType: "partner",
        revenue: 3200000,
        costs: 1280000,
        profit: 1920000,
        margin: 60,
        customerAcquisitionCost: 320,
        customerLifetimeValue: 3800,
        conversionRate: 8.5,
        averageOrderValue: 2400,
        customerSatisfaction: 4.2,
        marketShare: 28,
        growthRate: 25,
        profitabilityScore: 78,
        efficiency: 72,
        recommendations: [
          "Better partner training",
          "Improve partner incentives",
          "Streamline partner onboarding",
        ],
      },
    ];
  }, []);

  // Cash flow alignment data
  const cashFlowAlignment = useMemo<CashFlowAlignment[]>(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month, index) => ({
      month,
      projectedRevenue: 1000000 + Math.random() * 200000,
      actualRevenue: index < 3 ? 950000 + Math.random() * 300000 : undefined,
      variance: index < 3 ? Math.random() * 100000 - 50000 : 0,
      cashInflow: 900000 + Math.random() * 150000,
      cashOutflow: 650000 + Math.random() * 100000,
      netCashFlow: 250000 + Math.random() * 100000,
      cumulativeCashFlow: (index + 1) * 250000 + Math.random() * 200000,
      daysToCollection: 32 + Math.random() * 10,
      receivablesAge: [
        {
          ageRange: "0-30 days",
          amount: 450000,
          percentage: 65,
          collectionProbability: 98,
        },
        {
          ageRange: "31-60 days",
          amount: 180000,
          percentage: 26,
          collectionProbability: 92,
        },
        {
          ageRange: "61-90 days",
          amount: 45000,
          percentage: 6.5,
          collectionProbability: 75,
        },
        {
          ageRange: "90+ days",
          amount: 17500,
          percentage: 2.5,
          collectionProbability: 45,
        },
      ],
      paymentTerms: "Net 30",
      collectionEfficiency: 94 + Math.random() * 4,
      workingCapital: 850000 + Math.random() * 200000,
      cashConversionCycle: 45 + Math.random() * 15,
    }));
  }, []);

  // Margin optimization data
  const marginOptimization = useMemo<MarginOptimization[]>(() => {
    return productProfitability.slice(0, 3).map((product) => ({
      productId: product.productId,
      productName: product.productName,
      currentMargin: product.grossMargin,
      targetMargin: product.grossMargin + 10,
      marginGap: 10,
      costReductionOpportunities: [
        {
          area: "Cloud Infrastructure",
          currentCost: 45000,
          targetCost: 38000,
          savings: 7000,
          difficulty: "medium" as const,
          impact: "medium" as const,
          timeline: "3 months",
        },
        {
          area: "Third-party Licenses",
          currentCost: 25000,
          targetCost: 20000,
          savings: 5000,
          difficulty: "low" as const,
          impact: "low" as const,
          timeline: "1 month",
        },
      ],
      priceIncreaseOpportunities: [
        {
          strategy: "Value-based adjustment",
          currentPrice: product.pricePerUnit,
          proposedPrice: product.pricePerUnit * 1.15,
          priceIncrease: product.pricePerUnit * 0.15,
          elasticityImpact: -0.08,
          volumeImpact: -5.2,
          revenueImpact: 8.7,
          riskLevel: "medium" as const,
        },
      ],
      recommendedActions: [
        "Negotiate better cloud pricing",
        "Implement tiered pricing model",
        "Focus on premium features",
      ],
      implementationPlan: [
        "Phase 1: Cost optimization (Month 1-2)",
        "Phase 2: Price testing (Month 3-4)",
        "Phase 3: Full rollout (Month 5-6)",
      ],
      expectedImpact: 145000,
      feasibilityScore: 78,
      timeframe: "6 months",
      investmentRequired: 25000,
      roi: 480,
    }));
  }, [productProfitability]);

  return {
    // Data
    revenueForecast,
    revenueStreams,
    subscriptionMetrics,
    promotionAnalysis,
    customerChurn,
    crossSellOpportunities,
    revenueLeakage,
    productProfitability,
    channelProfitability,
    cashFlowAlignment,
    marginOptimization,

    // Filters
    selectedForecastScenario,
    setSelectedForecastScenario,
    selectedTimeframe,
    setSelectedTimeframe,

    // Insights
    revenueInsights,
  };
}

// Utility functions for calculations
export function usePricingCalculations() {
  return {
    calculatePriceElasticity,
    calculateOptimalPrice,
    calculateCustomerLifetimeValue,
    calculateChurnRate,
    calculateNetRevenueRetention,
    calculateBreakEvenPoint,
    calculateROI,

    // Advanced calculations
    calculateProfitMaximizingPrice: (
      demand: number,
      elasticity: number,
      marginalCost: number,
    ) => {
      return marginalCost / (1 + 1 / elasticity);
    },

    calculateRevenueImpact: (
      currentPrice: number,
      newPrice: number,
      currentVolume: number,
      elasticity: number,
    ) => {
      const priceChange = (newPrice - currentPrice) / currentPrice;
      const volumeChange = elasticity * priceChange;
      const newVolume = currentVolume * (1 + volumeChange);
      return newPrice * newVolume - currentPrice * currentVolume;
    },

    calculateCustomerPaybackPeriod: (
      acquisitionCost: number,
      monthlyRevenue: number,
      monthlyChurn: number,
    ) => {
      return acquisitionCost / (monthlyRevenue * (1 - monthlyChurn));
    },
  };
}
