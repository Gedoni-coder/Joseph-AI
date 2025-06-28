import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  TrendingUp,
  Target,
  BarChart3,
  Zap,
  Layers,
  Users,
  Percent,
  FlaskConical,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Filter,
} from "lucide-react";
import { usePricingStrategy } from "@/hooks/usePricingRevenueData";

export function PricingStrategy() {
  const {
    pricingStrategies,
    valueBasedPricing,
    competitiveBenchmarks,
    dynamicPricing,
    tieredPricing,
    pricingTests,
    selectedStrategy,
    setSelectedStrategy,
    priceRange,
    setPriceRange,
    pricingInsights,
  } = usePricingStrategy();

  const getStrategyIcon = (strategyType: string) => {
    switch (strategyType) {
      case "value-based":
        return <Target className="h-4 w-4" />;
      case "competitive":
        return <BarChart3 className="h-4 w-4" />;
      case "dynamic":
        return <Zap className="h-4 w-4" />;
      case "tiered":
        return <Layers className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "testing":
        return "bg-blue-100 text-blue-800";
      case "planned":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCompetitiveAdvantage = (advantage: string) => {
    switch (advantage) {
      case "higher":
        return { color: "text-red-600", icon: ArrowUpRight };
      case "competitive":
        return { color: "text-green-600", icon: CheckCircle };
      case "lower":
        return { color: "text-blue-600", icon: ArrowDownRight };
      default:
        return { color: "text-gray-600", icon: CheckCircle };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Strategies
                </p>
                <p className="text-2xl font-bold">{pricingStrategies.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Active pricing models</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Effectiveness
                </p>
                <p className="text-2xl font-bold">
                  {(
                    pricingStrategies.reduce(
                      (sum, s) => sum + s.effectiveness,
                      0,
                    ) / pricingStrategies.length || 0
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Performance score</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Price Range</p>
                <p className="text-2xl font-bold">
                  ${Math.min(...pricingStrategies.map((s) => s.pricePoint))}-$
                  {Math.max(...pricingStrategies.map((s) => s.pricePoint))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Current pricing span</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Optimization Potential
                </p>
                <p className="text-2xl font-bold">
                  {pricingInsights.priceOptimizationPotential}%
                </p>
              </div>
              <Percent className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Revenue uplift possible
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="value-based" className="space-y-4">
        <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full">
          <TabsTrigger value="value-based" className="text-xs">
            Value-Based
          </TabsTrigger>
          <TabsTrigger value="competitive" className="text-xs">
            Competitive
          </TabsTrigger>
          <TabsTrigger value="dynamic" className="text-xs">
            Dynamic
          </TabsTrigger>
          <TabsTrigger value="tiered" className="text-xs">
            Tiered
          </TabsTrigger>
          <TabsTrigger value="penetration" className="text-xs">
            Penetration
          </TabsTrigger>
          <TabsTrigger value="discrimination" className="text-xs">
            Discrimination
          </TabsTrigger>
          <TabsTrigger value="partitioned" className="text-xs">
            Partitioned
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="text-xs">
            Monitoring
          </TabsTrigger>
          <TabsTrigger value="ai-analytics" className="text-xs">
            AI Analytics
          </TabsTrigger>
          <TabsTrigger value="ab-testing" className="text-xs">
            A/B Testing
          </TabsTrigger>
        </TabsList>

        {/* Value-Based Pricing */}
        <TabsContent value="value-based" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Value-Based Pricing
                  </CardTitle>
                  <CardDescription>
                    Price based on customer perceived value and willingness to
                    pay
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recalculate
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {valueBasedPricing.map((pricing) => (
                <div key={pricing.productId} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">
                      {pricing.productName}
                    </h3>
                    <Badge variant="outline">
                      {pricing.confidence}% confidence
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        ${pricing.perceivedValue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Perceived Value</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        ${pricing.willingsnessToPay.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Willingness to Pay
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        ${pricing.recommendedPrice.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Recommended Price</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">
                        {pricing.priceElasticity.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">Price Elasticity</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Value Drivers</h4>
                    {pricing.valueDrivers.map((driver, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{driver.driver}</span>
                          {driver.differentiator && (
                            <Badge variant="outline" className="text-xs">
                              Differentiator
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium">
                            ${driver.impact.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={driver.importance * 100}
                              className="w-16 h-2"
                            />
                            <span>{(driver.importance * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-900">
                        Competitor Price Range:
                      </span>
                      <span className="font-medium text-blue-900">
                        $
                        {Math.min(...pricing.competitorPrices).toLocaleString()}{" "}
                        - $
                        {Math.max(...pricing.competitorPrices).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitive Benchmarking */}
        <TabsContent value="competitive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Competitive Benchmarking
              </CardTitle>
              <CardDescription>
                Compare your pricing against key competitors in the market
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Competitor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Their Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Our Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Difference
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Market Position
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Price Advantage
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Last Updated
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {competitiveBenchmarks.map((benchmark) => {
                        const { color, icon: Icon } = getCompetitiveAdvantage(
                          benchmark.priceAdvantage,
                        );
                        return (
                          <tr key={benchmark.competitorId}>
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {benchmark.competitorName}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {benchmark.productCategory}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              ${benchmark.theirPrice}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              ${benchmark.ourPrice}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-sm font-medium ${benchmark.priceDifference < 0 ? "text-red-600" : "text-green-600"}`}
                                >
                                  {benchmark.priceDifference > 0 ? "+" : ""}$
                                  {benchmark.priceDifference}
                                </span>
                                <span
                                  className={`text-xs ${benchmark.priceDifferencePercent < 0 ? "text-red-600" : "text-green-600"}`}
                                >
                                  ({benchmark.priceDifferencePercent.toFixed(1)}
                                  %)
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="capitalize">
                                {benchmark.marketPosition}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 ${color}`} />
                                <span
                                  className={`text-sm font-medium ${color}`}
                                >
                                  {benchmark.priceAdvantage}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {benchmark.lastUpdated.toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competitiveBenchmarks.map((benchmark) => (
                  <div
                    key={benchmark.competitorId}
                    className="border rounded-lg p-4"
                  >
                    <h4 className="font-medium mb-3">
                      Feature Comparison vs {benchmark.competitorName}
                    </h4>
                    <div className="space-y-2">
                      {benchmark.featureComparison.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <span className="text-sm font-medium">
                            {feature.feature}
                          </span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">Us:</span>
                              <Badge
                                className={
                                  feature.ourFeature === "better"
                                    ? "bg-green-100 text-green-800"
                                    : feature.ourFeature === "same"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {feature.ourFeature}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">
                                Them:
                              </span>
                              <Badge
                                className={
                                  feature.competitorFeature === "better"
                                    ? "bg-green-100 text-green-800"
                                    : feature.competitorFeature === "same"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {feature.competitorFeature}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded">
                      <p className="text-sm text-blue-900">
                        <strong>Value Proposition:</strong>{" "}
                        {benchmark.valueProposition}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dynamic/Algorithmic Pricing */}
        <TabsContent value="dynamic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Dynamic/Algorithmic Pricing
              </CardTitle>
              <CardDescription>
                Real-time pricing adjustments based on market conditions and
                demand
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dynamicPricing.map((pricing) => (
                <div key={pricing.productId} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">
                      {pricing.productName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          pricing.demandLevel === "high"
                            ? "bg-red-100 text-red-800"
                            : pricing.demandLevel === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {pricing.demandLevel} demand
                      </Badge>
                      <Badge variant="outline">
                        Goal: {pricing.optimizationGoal}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-600">
                        ${pricing.basePrice}
                      </p>
                      <p className="text-xs text-gray-500">Base Price</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-blue-600">
                        ${pricing.currentPrice}
                      </p>
                      <p className="text-xs text-gray-500">Current Price</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-green-600">
                        ${pricing.algorithmicPrice}
                      </p>
                      <p className="text-xs text-gray-500">AI Suggested</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-red-600">
                        ${pricing.priceFloor}
                      </p>
                      <p className="text-xs text-gray-500">Floor</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-purple-600">
                        ${pricing.priceCeiling}
                      </p>
                      <p className="text-xs text-gray-500">Ceiling</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Inventory Level</p>
                      <p className="text-lg font-medium">
                        {pricing.inventoryLevel}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Seasonal Factor</p>
                      <p className="text-lg font-medium">
                        {pricing.seasonalFactor.toFixed(2)}x
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Competitive Adjustment
                      </p>
                      <p className="text-lg font-medium">
                        {pricing.competitiveAdjustment.toFixed(2)}x
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Price Elasticity</p>
                      <p className="text-lg font-medium">
                        {pricing.elasticity.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Recent Price History</h4>
                    <div className="space-y-2">
                      {pricing.priceHistory.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">
                              {point.timestamp.toLocaleDateString()}
                            </span>
                            <span className="font-medium">${point.price}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span>Demand: {point.demand}</span>
                            <span>
                              Revenue: ${point.revenue.toLocaleString()}
                            </span>
                            <span className="text-gray-600">
                              {point.reason}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tiered & Bundle Pricing */}
        <TabsContent value="tiered" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Tiered & Bundle Pricing
              </CardTitle>
              <CardDescription>
                Multiple pricing tiers with different feature sets and value
                propositions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tieredPricing.map((tier) => (
                  <div
                    key={tier.id}
                    className={`border rounded-lg p-6 ${tier.popularTier ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">{tier.tierName}</h3>
                      {tier.popularTier && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Most Popular
                        </Badge>
                      )}
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-3xl font-bold text-blue-600">
                        ${tier.price}
                      </p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">
                          Features:
                        </p>
                        <ul className="space-y-1">
                          {tier.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {tier.limitations.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">
                            Limitations:
                          </p>
                          <ul className="space-y-1">
                            {tier.limitations.map((limitation, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-sm text-gray-600"
                              >
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target:</span>
                        <span className="font-medium">
                          {tier.targetCustomer}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conversion:</span>
                        <span className="font-medium">
                          {tier.conversionRate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customers:</span>
                        <span className="font-medium">
                          {tier.customerCountInTier}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Revenue:</span>
                        <span className="font-medium">
                          ${tier.averageRevenuePerTier.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {tier.upgradePath.length > 0 && (
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600 mb-1">
                          Upgrade Path:
                        </p>
                        <p className="text-sm font-medium">
                          {tier.upgradePath.join(" → ")}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* A/B Testing & Continuous Optimization */}
        <TabsContent value="ab-testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5" />
                A/B Testing & Continuous Optimization
              </CardTitle>
              <CardDescription>
                Test different pricing strategies to optimize conversion and
                revenue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pricingTests.map((test) => (
                <div key={test.id} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{test.testName}</h3>
                      <p className="text-sm text-gray-600">
                        {test.productName} • {test.testType.toUpperCase()} Test
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          test.status === "running"
                            ? "bg-blue-100 text-blue-800"
                            : test.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {test.status}
                      </Badge>
                      {test.statisticalSignificance && (
                        <Badge className="bg-green-100 text-green-800">
                          Significant
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-xl font-bold text-blue-600">
                        {test.sampleSize.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Sample Size</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-green-600">
                        {test.confidenceLevel}%
                      </p>
                      <p className="text-xs text-gray-500">Confidence</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-purple-600">
                        {test.startDate.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">Start Date</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-orange-600">
                        {test.liftPercent ? `${test.liftPercent}%` : "TBD"}
                      </p>
                      <p className="text-xs text-gray-500">Lift</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {test.variants.map((variant) => (
                      <div
                        key={variant.variantId}
                        className={`border rounded-lg p-4 ${test.winningVariant === variant.variantId ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{variant.variantName}</h4>
                          {test.winningVariant === variant.variantId && (
                            <Badge className="bg-green-100 text-green-800">
                              Winner
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Price:</span>
                            <p className="font-medium">${variant.price}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Conversion:</span>
                            <p className="font-medium">
                              {variant.conversionRate}%
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Revenue:</span>
                            <p className="font-medium">
                              ${variant.revenue.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Purchases:</span>
                            <p className="font-medium">{variant.purchases}</p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Confidence Interval:</span>
                            <span>
                              {variant.confidenceInterval[0]}% -{" "}
                              {variant.confidenceInterval[1]}%
                            </span>
                          </div>
                          <Progress
                            value={variant.conversionRate}
                            className="mt-1 h-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Key Insights:</h4>
                    <ul className="space-y-1">
                      {test.insights.map((insight, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder tabs for remaining sections */}
        <TabsContent value="penetration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Penetration/Skimming Strategies
              </CardTitle>
              <CardDescription>
                Market entry pricing strategies for new products and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Penetration & Skimming Analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Analyze market entry strategies and pricing approaches for new
                  product launches.
                </p>
                <Button>Configure Strategy</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discrimination" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Price Discrimination (by customer type)
              </CardTitle>
              <CardDescription>
                Different pricing for different customer segments and use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Customer Segmentation Pricing
                </h3>
                <p className="text-gray-600 mb-4">
                  Optimize pricing based on customer segments, usage patterns,
                  and value delivery.
                </p>
                <Button>Set Up Segmentation</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partitioned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Partitioned (Drip) Pricing
              </CardTitle>
              <CardDescription>
                Break down pricing into smaller, more palatable components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Layers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drip Pricing Strategy
                </h3>
                <p className="text-gray-600 mb-4">
                  Structure pricing to appear lower initially with additional
                  fees and charges.
                </p>
                <Button>Design Pricing Structure</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Real-Time Price Monitoring & Repricing
              </CardTitle>
              <CardDescription>
                Monitor competitor prices and automatically adjust pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Price Monitoring Dashboard
                </h3>
                <p className="text-gray-600 mb-4">
                  Real-time competitor tracking and automated repricing rules.
                </p>
                <Button>Configure Monitoring</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI-Powered Pricing Analytics
              </CardTitle>
              <CardDescription>
                Machine learning algorithms for optimal pricing decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  AI Pricing Engine
                </h3>
                <p className="text-gray-600 mb-4">
                  Advanced analytics and machine learning for pricing
                  optimization.
                </p>
                <Button>Enable AI Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
