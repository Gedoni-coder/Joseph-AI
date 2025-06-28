import { useState, useEffect, useMemo } from "react";
import {
  InventoryItem,
  StockLevel,
  DemandForecast,
  ReorderAlert,
  InventoryValuation,
  DeadStockAnalysis,
  BatchTracking,
  LocationInventory,
  InventoryAudit,
  TurnoverAnalysis,
  SupplierProfile,
  ProcurementData,
  ProductionPlan,
  WarehouseMetrics,
  LogisticsTracking,
  SupplierPerformance,
  MarketVolatility,
  ComplianceUpdate,
  DisruptionRisk,
  SustainabilityMetrics,
  SupplyChainStrategy,
  CostToServeAnalysis,
  InventoryModel,
  mockInventoryData,
  inventoryMetrics,
  supplyChainMetrics,
  generateMockReorderAlerts,
  generateMockTurnoverAnalysis,
  calculateTurnoverRatio,
  calculateReorderPoint,
  calculateEOQ,
  calculateSafetyStock,
  getStockStatus,
  calculateInventoryValue,
} from //"../lib/inventory-supply-chain-data";

// Main hook for inventory and supply chain data
export function useInventorySupplyChainData() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierProfile[]>([]);
  const [reorderAlerts, setReorderAlerts] = useState<ReorderAlert[]>([]);
  const [strategies, setStrategies] = useState<SupplyChainStrategy[]>([]);
  const [turnoverAnalysis, setTurnoverAnalysis] = useState<TurnoverAnalysis[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Initialize data
  useEffect(() => {
    const initializeData = () => {
      setLoading(true);

      // Simulate loading delay
      setTimeout(() => {
        const inventoryItems = mockInventoryData.items;
        setItems(inventoryItems);
        setSuppliers(mockInventoryData.suppliers);
        setReorderAlerts(generateMockReorderAlerts(inventoryItems));
        setStrategies(mockInventoryData.strategies);
        setTurnoverAnalysis(generateMockTurnoverAnalysis(inventoryItems));
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
  const inventoryInsights = useMemo(() => {
    if (items.length === 0) return inventoryMetrics;

    const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0);
    const lowStockItems = items.filter(
      (item) => item.status === "low-stock",
    ).length;
    const outOfStockItems = items.filter(
      (item) => item.status === "out-of-stock",
    ).length;
    const overstockItems = items.filter(
      (item) => item.status === "overstock",
    ).length;
    const averageTurnover =
      turnoverAnalysis.length > 0
        ? turnoverAnalysis.reduce(
            (sum, analysis) => sum + analysis.turnoverRatio,
            0,
          ) / turnoverAnalysis.length
        : 0;

    return {
      totalItems: items.length,
      totalValue,
      lowStockItems,
      outOfStockItems,
      overstockItems,
      averageTurnover,
      fillRate: ((items.length - outOfStockItems) / items.length) * 100,
      stockAccuracy: 98.7,
      monthlyGrowth: 12.5,
    };
  }, [items, turnoverAnalysis]);

  const supplyChainInsights = useMemo(() => {
    if (suppliers.length === 0) return supplyChainMetrics;

    const avgOnTimeDelivery =
      suppliers.reduce((sum, supplier) => sum + supplier.deliveryScore, 0) /
      suppliers.length;
    const avgQualityScore =
      suppliers.reduce((sum, supplier) => sum + supplier.qualityScore, 0) /
      suppliers.length;
    const avgRating =
      suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) /
      suppliers.length;

    return {
      totalSuppliers: suppliers.length,
      onTimeDelivery: avgOnTimeDelivery,
      qualityScore: avgQualityScore,
      costSavings: 156789,
      riskScore: 100 - avgRating,
      sustainabilityScore: 78,
      diversificationIndex: 0.82,
      resilienceScore: avgRating,
    };
  }, [suppliers]);

  return {
    // Data
    items,
    suppliers,
    reorderAlerts,
    strategies,
    turnoverAnalysis,

    // Metrics
    inventoryInsights,
    supplyChainInsights,

    // State
    loading,
    lastUpdated,

    // Actions
    setItems,
    setSuppliers,
    setReorderAlerts,
    setStrategies,
  };
}

// Hook for inventory management features
export function useInventoryManagement() {
  const { items, reorderAlerts, turnoverAnalysis, inventoryInsights } =
    useInventorySupplyChainData();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");

  // Filtered items based on current filters
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch =
        selectedCategory === "all" || item.category === selectedCategory;
      const locationMatch =
        selectedLocation === "all" || item.location === selectedLocation;
      const stockMatch = stockFilter === "all" || item.status === stockFilter;

      return categoryMatch && locationMatch && stockMatch;
    });
  }, [items, selectedCategory, selectedLocation, stockFilter]);

  // Get unique categories and locations for filters
  const categories = useMemo(() => {
    const unique = [...new Set(items.map((item) => item.category))];
    return ["all", ...unique];
  }, [items]);

  const locations = useMemo(() => {
    const unique = [...new Set(items.map((item) => item.location))];
    return ["all", ...unique];
  }, [items]);

  // Dead stock analysis
  const deadStockItems = useMemo(() => {
    return items
      .filter((item) => {
        const daysSinceLastSale = Math.floor(
          (Date.now() - item.lastSold.getTime()) / (1000 * 60 * 60 * 24),
        );
        return daysSinceLastSale > 90 || item.velocity < 1;
      })
      .map((item) => {
        const daysSinceLastSale = Math.floor(
          (Date.now() - item.lastSold.getTime()) / (1000 * 60 * 60 * 24),
        );
        const monthlyCarryingCost = item.totalValue * 0.02; // 2% monthly carrying cost

        let recommendedAction: DeadStockAnalysis["recommendedAction"];
        let riskLevel: DeadStockAnalysis["riskLevel"];

        if (daysSinceLastSale > 180) {
          recommendedAction = "liquidate";
          riskLevel = "high";
        } else if (daysSinceLastSale > 120) {
          recommendedAction = "discount";
          riskLevel = "medium";
        } else {
          recommendedAction = "bundle";
          riskLevel = "low";
        }

        return {
          itemId: item.id,
          itemName: item.name,
          category: item.category,
          currentStock: item.currentStock,
          daysSinceLastSale,
          investmentValue: item.totalValue,
          monthlyCarryingCost,
          recommendedAction,
          potentialLoss: monthlyCarryingCost * 6, // 6 months carrying cost
          riskLevel,
        };
      });
  }, [items]);

  // Batch tracking data
  const batchTracking = useMemo(() => {
    return items
      .filter((item) => item.batchNumber)
      .map((item) => ({
        batchNumber: item.batchNumber!,
        itemId: item.id,
        productionDate: new Date(
          item.lastRestocked.getTime() - 30 * 24 * 60 * 60 * 1000,
        ),
        expiryDate: item.expiryDate,
        supplier: item.supplier,
        quantity: item.currentStock + Math.floor(Math.random() * 100),
        remainingQuantity: item.currentStock,
        locations: [item.location],
        status:
          item.expiryDate && item.expiryDate < new Date()
            ? "expired"
            : ("active" as const),
        qualityTests: [
          {
            testType: "Quality Check",
            result: "pass" as const,
            date: item.lastRestocked,
            tester: "QA Team",
          },
        ],
      }));
  }, [items]);

  // Multi-location inventory
  const locationInventory = useMemo(() => {
    const locationGroups = items.reduce(
      (acc, item) => {
        if (!acc[item.location]) {
          acc[item.location] = [];
        }
        acc[item.location].push(item);
        return acc;
      },
      {} as Record<string, InventoryItem[]>,
    );

    return Object.entries(locationGroups).map(
      ([location, locationItems], index) => ({
        locationId: `loc-${index + 1}`,
        locationName: location,
        type: location.includes("Warehouse")
          ? "warehouse"
          : location.includes("Store")
            ? "store"
            : ("distribution-center" as const),
        address: `${Math.floor(Math.random() * 9999) + 1} ${location} St, City, State 12345`,
        manager: `Manager ${index + 1}`,
        totalItems: locationItems.length,
        totalValue: locationItems.reduce(
          (sum, item) => sum + item.totalValue,
          0,
        ),
        capacityUtilization: Math.floor(Math.random() * 40) + 60,
        items: locationItems,
        lastSyncDate: new Date(),
      }),
    );
  }, [items]);

  // Inventory audit data
  const inventoryAudits = useMemo(() => {
    return [
      {
        id: "audit-1",
        auditDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        auditor: "John Smith",
        location: "Warehouse A",
        type: "cycle" as const,
        status: "completed" as const,
        discrepancies: [
          {
            itemId: items[0]?.id || "item-1",
            itemName: items[0]?.name || "Sample Item",
            systemCount: 100,
            physicalCount: 98,
            variance: -2,
            varianceValue: -50,
            reason: "Damage during handling",
            action: "adjust" as const,
          },
        ],
        totalItemsCount: Math.floor(items.length * 0.3),
        discrepancyRate: 2.1,
        adjustmentValue: -150,
      },
    ];
  }, [items]);

  return {
    // Filtered data
    filteredItems,
    categories,
    locations,

    // Filters
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    stockFilter,
    setStockFilter,

    // Analysis data
    deadStockItems,
    batchTracking,
    locationInventory,
    inventoryAudits,

    // Alerts and analysis
    reorderAlerts,
    turnoverAnalysis,
    inventoryInsights,
  };
}

// Hook for supply chain management features
export function useSupplyChainManagement() {
  const { suppliers, strategies, supplyChainInsights } =
    useInventorySupplyChainData();
  const [selectedSupplierType, setSelectedSupplierType] =
    useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");

  // Filtered suppliers
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const typeMatch =
        selectedSupplierType === "all" ||
        supplier.type === selectedSupplierType;
      const riskMatch =
        riskFilter === "all" || supplier.riskLevel === riskFilter;
      return typeMatch && riskMatch;
    });
  }, [suppliers, selectedSupplierType, riskFilter]);

  // Procurement efficiency data
  const procurementData = useMemo(() => {
    return suppliers.map((supplier) => ({
      id: `proc-${supplier.id}`,
      supplierId: supplier.id,
      category: supplier.categories[0] || "General",
      itemCount: Math.floor(Math.random() * 50) + 10,
      totalValue: supplier.totalSpend,
      avgLeadTime: supplier.leadTime,
      onTimeDeliveryRate: supplier.deliveryScore,
      qualityRejectionRate: Math.max(0, 100 - supplier.qualityScore) / 10,
      costSavings: Math.floor(supplier.totalSpend * 0.1),
      processEfficiency: supplier.rating,
      negotiationCycle: "Annual",
      contractExpiryDate: new Date(
        Date.now() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000,
      ),
      riskFactors:
        supplier.riskLevel === "high"
          ? ["Single source", "Geographic concentration"]
          : [],
    }));
  }, [suppliers]);

  // Production planning data
  const productionPlans = useMemo(() => {
    return [
      {
        id: "prod-1",
        productId: "product-1",
        productName: "Electronics Component A",
        plannedQuantity: 1000,
        actualQuantity: 950,
        startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: "in-progress" as const,
        efficiency: 95,
        bottlenecks: ["Material delay", "Equipment maintenance"],
        resourceUtilization: 88,
        qualityRate: 98.5,
        dependencies: ["Raw material delivery", "Quality inspection"],
      },
      {
        id: "prod-2",
        productId: "product-2",
        productName: "Textile Product B",
        plannedQuantity: 500,
        actualQuantity: 500,
        startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: "completed" as const,
        efficiency: 102,
        bottlenecks: [],
        resourceUtilization: 95,
        qualityRate: 99.2,
        dependencies: [],
      },
    ];
  }, []);

  // Warehouse metrics
  const warehouseMetrics = useMemo(() => {
    return [
      {
        locationId: "wh-1",
        locationName: "Main Warehouse",
        totalCapacity: 10000,
        usedCapacity: 7500,
        utilizationRate: 75,
        throughputDaily: 850,
        pickingAccuracy: 99.2,
        cycleTime: 24,
        laborProductivity: 92,
        storageEfficiency: 88,
        orderFulfillmentRate: 96.5,
        shippingAccuracy: 98.8,
      },
    ];
  }, []);

  // Logistics tracking
  const logisticsTracking = useMemo(() => {
    return [
      {
        shipmentId: "ship-1",
        orderId: "order-1",
        carrier: "FastShip Express",
        trackingNumber: "FS123456789",
        origin: "Warehouse A",
        destination: "Customer Location",
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: "in-transit" as const,
        deliveryTime: 48,
        cost: 25.5,
        customerSatisfaction: 4.5,
      },
    ];
  }, []);

  // Supplier performance
  const supplierPerformance = useMemo(() => {
    return suppliers.map((supplier) => ({
      supplierId: supplier.id,
      supplierName: supplier.name,
      evaluationPeriod: "Q4 2024",
      onTimeDelivery: supplier.deliveryScore,
      qualityScore: supplier.qualityScore,
      priceVariance: Math.floor(Math.random() * 10) - 5,
      responsiveness: Math.floor(Math.random() * 20) + 80,
      flexibility: Math.floor(Math.random() * 20) + 75,
      innovation: Math.floor(Math.random() * 30) + 60,
      sustainability: Math.floor(Math.random() * 25) + 70,
      overallScore: supplier.rating,
      issues: [],
      improvements: ["Reduce lead time", "Improve packaging"],
    }));
  }, [suppliers]);

  // Market volatility data
  const marketVolatility = useMemo(() => {
    return [
      {
        commodity: "Steel",
        currentPrice: 650,
        volatilityIndex: 0.25,
        priceChange30d: 5.2,
        priceChange90d: -2.8,
        forecastTrend: "stable" as const,
        riskLevel: "medium" as const,
        hedgingRecommendation: "Consider forward contracts for Q2",
        impactedSuppliers: suppliers.slice(0, 3).map((s) => s.id),
      },
      {
        commodity: "Electronics Components",
        currentPrice: 125,
        volatilityIndex: 0.35,
        priceChange30d: -8.5,
        priceChange90d: 12.3,
        forecastTrend: "volatile" as const,
        riskLevel: "high" as const,
        hedgingRecommendation: "Diversify supplier base",
        impactedSuppliers: suppliers.slice(3, 6).map((s) => s.id),
      },
    ];
  }, [suppliers]);

  // Compliance updates
  const complianceUpdates = useMemo(() => {
    return [
      {
        id: "comp-1",
        type: "regulation" as const,
        title: "New Environmental Packaging Standards",
        description: "Updated requirements for sustainable packaging materials",
        effectiveDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        impactLevel: "medium" as const,
        affectedRegions: ["EU", "California"],
        requiredActions: ["Update packaging specs", "Supplier audit"],
        compliance_status: "pending" as const,
        deadlineDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    ];
  }, []);

  // Disruption risks
  const disruptionRisks = useMemo(() => {
    return [
      {
        id: "risk-1",
        type: "geopolitical" as const,
        description: "Trade tensions affecting Asian supply routes",
        probability: 0.3,
        impact: 0.7,
        riskScore: 0.21,
        affectedSuppliers: suppliers
          .filter((s) => s.country === "China")
          .map((s) => s.id),
        affectedRoutes: ["Asia-Pacific", "Trans-Pacific"],
        mitigationStrategies: [
          "Supplier diversification",
          "Alternative routing",
        ],
        contingencyPlans: ["Backup suppliers activated", "Inventory buildup"],
        monitoringStatus: "active" as const,
      },
    ];
  }, [suppliers]);

  // Sustainability metrics
  const sustainabilityMetrics = useMemo(() => {
    return suppliers.map((supplier) => ({
      supplierId: supplier.id,
      supplierName: supplier.name,
      carbonFootprint: Math.floor(Math.random() * 500) + 100,
      renewableEnergyUsage: Math.floor(Math.random() * 80) + 20,
      wasteReduction: Math.floor(Math.random() * 60) + 30,
      waterEfficiency: Math.floor(Math.random() * 70) + 25,
      socialImpactScore: Math.floor(Math.random() * 40) + 60,
      certifications: supplier.certifications,
      improvementGoals: [
        "Reduce carbon emissions by 20%",
        "Increase renewable energy to 80%",
      ],
      sustainabilityRank: Math.floor(Math.random() * suppliers.length) + 1,
      greenSourcingScore: Math.floor(Math.random() * 30) + 70,
    }));
  }, [suppliers]);

  // Cost-to-serve analysis
  const costToServeAnalysis = useMemo(() => {
    return [
      {
        customerId: "cust-1",
        customerName: "Enterprise Customer A",
        customerType: "Enterprise",
        revenue: 250000,
        directCosts: 150000,
        indirectCosts: 35000,
        fulfillmentCosts: 15000,
        shippingCosts: 8000,
        totalCostToServe: 208000,
        profitMargin: 16.8,
        profitability: "medium" as const,
        recommendations: ["Optimize shipping routes", "Negotiate better terms"],
      },
    ];
  }, []);

  // Inventory model recommendation
  const inventoryModelRecommendation = useMemo(() => {
    return {
      modelType: "hybrid" as const,
      riskTolerance: "medium" as const,
      demandStability: "seasonal" as const,
      supplierReliability: 85,
      storageCosts: 50000,
      stockoutCosts: 75000,
      recommendation:
        "Implement JIT for fast-moving items, JIC for critical components",
      confidence: 78,
      benefits: [
        "Reduced carrying costs",
        "Improved cash flow",
        "Better service levels",
      ],
      risks: ["Supplier dependency", "Demand volatility"],
    };
  }, []);

  return {
    // Filtered data
    filteredSuppliers,

    // Filters
    selectedSupplierType,
    setSelectedSupplierType,
    riskFilter,
    setRiskFilter,

    // Internal factors
    procurementData,
    productionPlans,
    warehouseMetrics,
    logisticsTracking,
    supplierPerformance,

    // External factors
    marketVolatility,
    complianceUpdates,
    disruptionRisks,
    sustainabilityMetrics,

    // Strategy
    strategies,
    costToServeAnalysis,
    inventoryModelRecommendation,

    // Insights
    supplyChainInsights,
  };
}

// Hook for demand forecasting
export function useDemandForecasting() {
  const { items } = useInventorySupplyChainData();

  const demandForecasts = useMemo(() => {
    return items.slice(0, 10).map((item) => {
      const baselineVolatility = Math.random() * 0.3 + 0.1;
      const seasonalFactor =
        1 + Math.sin(Date.now() / (30 * 24 * 60 * 60 * 1000)) * 0.2;
      const trendFactor = 1.05; // 5% growth trend

      return {
        itemId: item.id,
        period: "Next 30 days",
        predictedDemand: Math.floor(
          item.velocity * seasonalFactor * trendFactor,
        ),
        confidenceLevel: Math.floor((1 - baselineVolatility) * 100),
        seasonalFactor,
        trendFactor,
        forecastAccuracy: Math.floor(Math.random() * 20) + 80,
        forecastMethod: "exponential-smoothing" as const,
        dataPoints: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
          predictedDemand: Math.floor(
            item.velocity * (1 + Math.random() * 0.2 - 0.1),
          ),
        })),
      };
    });
  }, [items]);

  return {
    demandForecasts,
    generateForecast: (itemId: string, method: string) => {
      // Implementation for generating custom forecasts
      console.log(`Generating forecast for ${itemId} using ${method}`);
    },
  };
}

// Utility functions for inventory calculations
export function useInventoryCalculations() {
  return {
    calculateTurnoverRatio,
    calculateReorderPoint,
    calculateEOQ,
    calculateSafetyStock,
    getStockStatus,
    calculateInventoryValue,

    // Advanced calculations
    calculateServiceLevel: (stockouts: number, totalDemand: number) => {
      return ((totalDemand - stockouts) / totalDemand) * 100;
    },

    calculateCarryingCost: (inventoryValue: number, rate: number = 0.25) => {
      return inventoryValue * rate;
    },

    calculateStockoutCost: (
      demand: number,
      unitPrice: number,
      stockoutRate: number = 0.1,
    ) => {
      return demand * unitPrice * stockoutRate;
    },
  };
}
