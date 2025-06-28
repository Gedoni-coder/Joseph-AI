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
import {
  TrendingUp,
  BarChart3,
  RepeatIcon,
  Percent,
  Users,
  ArrowUpCircle,
  AlertTriangle,
  DollarSign,
  Target,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Equal,
  Clock,
  Calendar,
  CreditCard,
  PieChart,
} from "lucide-react";
import { useRevenueStrategy } from "@/hooks/usePricingRevenueData";

export function RevenueStrategy() {
  const {
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
    selectedForecastScenario,
    setSelectedForecastScenario,
    selectedTimeframe,
    setSelectedTimeframe,
    revenueInsights,
  } = useRevenueStrategy();

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "up":
        return <ChevronUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ChevronDown className="h-4 w-4 text-red-500" />;
      default:
        return <Equal className="h-4 w-4 text-gray-500" />;
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
      case "critical":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "identified":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-purple-100 text-purple-800";
      case "negotiating":
        return "bg-orange-100 text-orange-800";
      case "closed":
        return "bg-green-100 text-green-800";
      case "lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  ${(revenueInsights.totalRevenue / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Annual recurring</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Revenue Growth
                </p>
                <p className="text-2xl font-bold">
                  {revenueInsights.revenueGrowth}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Year over year</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                <p className="text-2xl font-bold">
                  {revenueInsights.churnRate}%
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Monthly average</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Customer LTV
                </p>
                <p className="text-2xl font-bold">
                  ${revenueInsights.customerLifetimeValue.toLocaleString()}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Average lifetime value</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Leakage Alert */}
      {revenueLeakage.filter((leak) => leak.priority === "critical").length >
        0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Revenue Leakage Detected:</strong> Critical issues
            identified with potential monthly impact of $
            {revenueLeakage
              .filter((leak) => leak.priority === "critical")
              .reduce((sum, leak) => sum + leak.monthlyImpact, 0)
              .toLocaleString()}
            . Immediate action required.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="forecasting" className="space-y-4">
        <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full">
          <TabsTrigger value="forecasting" className="text-xs">
            Forecasting
          </TabsTrigger>
          <TabsTrigger value="segmentation" className="text-xs">
            Segmentation
          </TabsTrigger>
          <TabsTrigger value="subscription" className="text-xs">
            Subscription
          </TabsTrigger>
          <TabsTrigger value="promotions" className="text-xs">
            Promotions
          </TabsTrigger>
          <TabsTrigger value="churn" className="text-xs">
            Churn & Retention
          </TabsTrigger>
          <TabsTrigger value="cross-sell" className="text-xs">
            Cross-Selling
          </TabsTrigger>
          <TabsTrigger value="leakage" className="text-xs">
            Revenue Leakage
          </TabsTrigger>
          <TabsTrigger value="profitability" className="text-xs">
            Profitability
          </TabsTrigger>
          <TabsTrigger value="cash-flow" className="text-xs">
            Cash Flow
          </TabsTrigger>
          <TabsTrigger value="margin" className="text-xs">
            Margin Optimization
          </TabsTrigger>
        </TabsList>

        {/* Revenue Forecasting */}
        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Revenue Forecasting
                  </CardTitle>
                  <CardDescription>
                    Best/Base/Worst case revenue projections with scenario
                    analysis
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedForecastScenario}
                    onValueChange={(value) =>
                      setSelectedForecastScenario(
                        value as "best-case" | "base-case" | "worst-case",
                      )
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Scenario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="best-case">Best Case</SelectItem>
                      <SelectItem value="base-case">Base Case</SelectItem>
                      <SelectItem value="worst-case">Worst Case</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {revenueForecast
                .filter(
                  (forecast) => forecast.scenario === selectedForecastScenario,
                )
                .map((forecast) => (
                  <div key={forecast.id} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-900">
                          Total Revenue
                        </h3>
                        <p className="text-2xl font-bold text-blue-700">
                          ${forecast.totalRevenue.toLocaleString()}
                        </p>
                        <p className="text-sm text-blue-600">
                          {forecast.period}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-medium text-green-900">
                          Confidence Level
                        </h3>
                        <p className="text-2xl font-bold text-green-700">
                          {forecast.confidence}%
                        </p>
                        <p className="text-sm text-green-600">
                          Statistical confidence
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-medium text-purple-900">
                          Scenario
                        </h3>
                        <p className="text-2xl font-bold text-purple-700 capitalize">
                          {forecast.scenario.replace("-", " ")}
                        </p>
                        <p className="text-sm text-purple-600">
                          Planning scenario
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Revenue by Segment
                      </h4>
                      <div className="space-y-3">
                        {forecast.revenueBySegment.map((segment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <h5 className="font-medium">
                                {segment.segmentName}
                              </h5>
                              <p className="text-sm text-gray-600 capitalize">
                                {segment.segmentType}
                              </p>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <p className="font-medium">
                                  ${segment.revenue.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {segment.percentage}% of total
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-green-600">
                                  +{segment.growthRate}%
                                </p>
                                <p className="text-sm text-gray-600">Growth</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-blue-600">
                                  {segment.profitability}%
                                </p>
                                <p className="text-sm text-gray-600">Margin</p>
                              </div>
                              <Progress
                                value={segment.percentage}
                                className="w-20 h-2"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Key Assumptions
                        </h4>
                        <ul className="space-y-2">
                          {forecast.keyAssumptions.map((assumption, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                              {assumption}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Risk Factors
                        </h4>
                        <ul className="space-y-2">
                          {forecast.riskFactors.map((risk, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Sensitivity Analysis
                        </h4>
                        <div className="space-y-3">
                          {forecast.sensitivityAnalysis.map((factor, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {factor.factor}
                                </span>
                                <span className="text-sm text-gray-600">
                                  {(factor.impact * 100).toFixed(0)}% impact
                                </span>
                              </div>
                              <Progress
                                value={factor.probability * 100}
                                className="h-2"
                              />
                              <p className="text-xs text-gray-500">
                                {factor.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Segmentation */}
        <TabsContent value="segmentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Revenue Segmentation
              </CardTitle>
              <CardDescription>
                Analyze revenue by product, customer, and channel segments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {revenueStreams.map((stream) => (
                  <div key={stream.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{stream.streamName}</h3>
                      <Badge variant="outline" className="capitalize">
                        {stream.type.replace("-", " ")}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Current Revenue:
                        </span>
                        <span className="font-medium">
                          ${(stream.currentRevenue / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Forecasted Revenue:
                        </span>
                        <span className="font-medium">
                          ${(stream.forecastedRevenue / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Growth Rate:
                        </span>
                        <span className="font-medium text-green-600">
                          +{stream.growthRate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Profit Margin:
                        </span>
                        <span className="font-medium text-blue-600">
                          {stream.profitMargin}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Market Share:
                        </span>
                        <span className="font-medium">
                          {stream.marketShare}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Growth Progress:</span>
                        <span className="font-medium">
                          {(
                            ((stream.forecastedRevenue -
                              stream.currentRevenue) /
                              stream.currentRevenue) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (stream.forecastedRevenue / stream.currentRevenue -
                            1) *
                          100
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <p className="text-xs text-gray-600 mb-1">
                        Seasonality Pattern:
                      </p>
                      <div className="grid grid-cols-4 gap-1 text-xs">
                        <div className="text-center">
                          <p className="font-medium">Q1</p>
                          <p>{stream.seasonality.q1}x</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Q2</p>
                          <p>{stream.seasonality.q2}x</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Q3</p>
                          <p>{stream.seasonality.q3}x</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Q4</p>
                          <p>{stream.seasonality.q4}x</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription & Recurring Revenue Models */}
        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RepeatIcon className="h-5 w-5" />
                Subscription & Recurring Revenue Models
              </CardTitle>
              <CardDescription>
                Track MRR, ARR, churn, and subscription health metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscriptionMetrics.map((metrics) => (
                  <div key={metrics.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">
                        {metrics.planName}
                      </h3>
                      <Badge variant="outline" className="capitalize">
                        {metrics.planType.replace("-", " ")}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          ${(metrics.monthlyRecurringRevenue / 1000).toFixed(0)}
                          K
                        </p>
                        <p className="text-sm text-gray-600">MRR</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          $
                          {(metrics.annualRecurringRevenue / 1000000).toFixed(
                            1,
                          )}
                          M
                        </p>
                        <p className="text-sm text-gray-600">ARR</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {metrics.activeSubscribers.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Active Subscribers
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          ${metrics.customerLifetimeValue.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">CLV</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Churn Rate</p>
                        <p className="text-lg font-medium text-red-600">
                          {metrics.churnRate}%
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Retention Rate</p>
                        <p className="text-lg font-medium text-green-600">
                          {metrics.retentionRate}%
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">ARPU</p>
                        <p className="text-lg font-medium">
                          ${metrics.averageRevenuePerUser}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          Net Revenue Retention
                        </p>
                        <p className="text-lg font-medium text-blue-600">
                          {metrics.netRevenueRetention}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          New Subscribers:
                        </span>
                        <span className="font-medium text-green-600">
                          +{metrics.newSubscribers}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Churned Subscribers:
                        </span>
                        <span className="font-medium text-red-600">
                          -{metrics.churnedSubscribers}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Upgrades:</span>
                        <span className="font-medium text-blue-600">
                          +{metrics.upgrades}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Downgrades:
                        </span>
                        <span className="font-medium text-orange-600">
                          -{metrics.downgrades}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          Expansion Revenue:
                        </span>
                        <span className="font-medium text-green-600">
                          ${metrics.expansionRevenue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Contraction Revenue:
                        </span>
                        <span className="font-medium text-red-600">
                          -${metrics.contractionRevenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Discount & Promotion Impact Analysis */}
        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Discount & Promotion Impact Analysis
              </CardTitle>
              <CardDescription>
                Measure effectiveness of promotional campaigns and discounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {promotionAnalysis.map((promo) => (
                <div key={promo.id} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        {promo.promotionName}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {promo.promotionType.replace("-", " ")} •{" "}
                        {promo.discountPercentage}% discount
                      </p>
                    </div>
                    <Badge
                      className={
                        promo.roi > 200
                          ? "bg-green-100 text-green-800"
                          : promo.roi > 100
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {promo.roi}% ROI
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-xl font-bold text-blue-600">
                        ${promo.revenueGenerated.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Revenue Generated</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-green-600">
                        ${promo.incrementalRevenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Incremental Revenue
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-purple-600">
                        {promo.unitsSold}
                      </p>
                      <p className="text-sm text-gray-600">Units Sold</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-orange-600">
                        ${promo.totalCost.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Total Cost</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Effectiveness Score
                      </p>
                      <p className="text-lg font-medium">
                        {promo.effectivenesScore}/100
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Customer Acquisition
                      </p>
                      <p className="text-lg font-medium text-green-600">
                        +{promo.customerAcquisition}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Customer Retention
                      </p>
                      <p className="text-lg font-medium text-blue-600">
                        {promo.customerRetention}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Cannibalized Sales
                      </p>
                      <p className="text-lg font-medium text-red-600">
                        -${promo.cannibalizedSales.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Campaign Period:
                      </p>
                      <p className="text-sm text-gray-600">
                        {promo.startDate.toLocaleDateString()} -{" "}
                        {promo.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Target Customers:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {promo.targetCustomers.map((customer, index) => (
                          <Badge key={index} variant="outline">
                            {customer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Churn Rate & Retention Tracking */}
        <TabsContent value="churn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Churn Rate & Retention Tracking
              </CardTitle>
              <CardDescription>
                Monitor customer churn and implement retention strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900">High Risk</h3>
                  <p className="text-2xl font-bold text-red-700">
                    {customerChurn.filter((c) => c.riskLevel === "high").length}
                  </p>
                  <p className="text-sm text-red-600">Customers at risk</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-900">Medium Risk</h3>
                  <p className="text-2xl font-bold text-yellow-700">
                    {
                      customerChurn.filter((c) => c.riskLevel === "medium")
                        .length
                    }
                  </p>
                  <p className="text-sm text-yellow-600">Monitoring required</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">Low Risk</h3>
                  <p className="text-2xl font-bold text-green-700">
                    {customerChurn.filter((c) => c.riskLevel === "low").length}
                  </p>
                  <p className="text-sm text-green-600">Stable customers</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">
                    Avg Churn Probability
                  </h3>
                  <p className="text-2xl font-bold text-blue-700">
                    {(
                      customerChurn.reduce(
                        (sum, c) => sum + c.churnProbability,
                        0,
                      ) / customerChurn.length
                    ).toFixed(1)}
                    %
                  </p>
                  <p className="text-sm text-blue-600">Predicted churn</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Customer
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Segment
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Lifetime Value
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Churn Probability
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Risk Level
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Last Purchase
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Retention Efforts
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {customerChurn.map((customer) => (
                        <tr
                          key={customer.customerId}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {customer.customerId}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {customer.customerSegment}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            ${customer.lifetimeValue.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={customer.churnProbability}
                                className="w-16 h-2"
                              />
                              <span className="text-sm font-medium">
                                {customer.churnProbability}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge className={getRiskColor(customer.riskLevel)}>
                              {customer.riskLevel}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {customer.lastPurchaseDate.toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {customer.retentionEfforts
                                .slice(0, 2)
                                .map((effort, index) => (
                                  <Badge
                                    key={index}
                                    className={getStatusColor(effort.outcome)}
                                  >
                                    {effort.activityType}
                                  </Badge>
                                ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upselling & Cross-Selling Tactics */}
        <TabsContent value="cross-sell" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpCircle className="h-5 w-5" />
                Upselling & Cross-Selling Tactics
              </CardTitle>
              <CardDescription>
                Identify and pursue revenue expansion opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">
                    Total Opportunities
                  </h3>
                  <p className="text-2xl font-bold text-blue-700">
                    {crossSellOpportunities.length}
                  </p>
                  <p className="text-sm text-blue-600">Active prospects</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">
                    Potential Revenue
                  </h3>
                  <p className="text-2xl font-bold text-green-700">
                    $
                    {crossSellOpportunities
                      .reduce((sum, opp) => sum + opp.potentialRevenue, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">Revenue potential</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900">
                    Avg Success Rate
                  </h3>
                  <p className="text-2xl font-bold text-purple-700">
                    {(
                      crossSellOpportunities.reduce(
                        (sum, opp) => sum + opp.crossSellProbability,
                        0,
                      ) / crossSellOpportunities.length
                    ).toFixed(1)}
                    %
                  </p>
                  <p className="text-sm text-purple-600">Probability</p>
                </div>
              </div>

              <div className="space-y-4">
                {crossSellOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.customerId}
                    className="border rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium">
                          {opportunity.customerName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {opportunity.customerId}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            opportunity.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : opportunity.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {opportunity.priority} priority
                        </Badge>
                        <Badge className={getStageColor(opportunity.stage)}>
                          {opportunity.stage.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          Potential Revenue
                        </p>
                        <p className="text-lg font-medium text-green-600">
                          ${opportunity.potentialRevenue.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Success Probability
                        </p>
                        <p className="text-lg font-medium text-blue-600">
                          {opportunity.crossSellProbability}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Confidence</p>
                        <p className="text-lg font-medium text-purple-600">
                          {opportunity.confidence}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Expected Close</p>
                        <p className="text-lg font-medium">
                          {opportunity.expectedCloseDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">
                          Current Products:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.currentProducts.map((product, index) => (
                            <Badge key={index} variant="outline">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">
                          Recommended Products:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.recommendedProducts.map(
                            (product, index) => (
                              <Badge
                                key={index}
                                className="bg-green-100 text-green-800"
                              >
                                {product}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Reason:</span>
                        <span className="text-sm font-medium">
                          {opportunity.reason}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Action Required:
                        </span>
                        <span className="text-sm font-medium">
                          {opportunity.actionRequired}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1">
                        Contact Customer
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Leakage Detection */}
        <TabsContent value="leakage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Revenue Leakage Detection
              </CardTitle>
              <CardDescription>
                Identify and fix revenue losses from billing errors and process
                inefficiencies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900">Critical Issues</h3>
                  <p className="text-2xl font-bold text-red-700">
                    {
                      revenueLeakage.filter(
                        (leak) => leak.priority === "critical",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-red-600">Immediate attention</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-900">High Priority</h3>
                  <p className="text-2xl font-bold text-orange-700">
                    {
                      revenueLeakage.filter((leak) => leak.priority === "high")
                        .length
                    }
                  </p>
                  <p className="text-sm text-orange-600">Quick wins</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-900">
                    Total Monthly Impact
                  </h3>
                  <p className="text-2xl font-bold text-yellow-700">
                    $
                    {revenueLeakage
                      .reduce((sum, leak) => sum + leak.monthlyImpact, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-yellow-600">Lost revenue</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">Fix Investment</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    $
                    {revenueLeakage
                      .reduce((sum, leak) => sum + leak.fixCost, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600">Total fix cost</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Issue
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Monthly Impact
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Affected Customers
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Priority
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Time to Fix
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {revenueLeakage.map((leak) => (
                        <tr key={leak.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium text-gray-900">
                                {leak.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                Detected:{" "}
                                {leak.detectedDate.toLocaleDateString()}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="capitalize">
                              {leak.leakageType.replace("-", " ")}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-red-600">
                            ${leak.monthlyImpact.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {leak.affectedCustomers}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                leak.priority === "critical"
                                  ? "bg-red-100 text-red-800"
                                  : leak.priority === "high"
                                    ? "bg-orange-100 text-orange-800"
                                    : leak.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                              }
                            >
                              {leak.priority}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                leak.status === "resolved"
                                  ? "bg-green-100 text-green-800"
                                  : leak.status === "fixing"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {leak.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {leak.timeToFix}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product/Channel Profitability Analysis */}
        <TabsContent value="profitability" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Product Profitability
                </CardTitle>
                <CardDescription>
                  Analyze profit margins and performance by product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productProfitability.slice(0, 5).map((product) => (
                    <div
                      key={product.productId}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{product.productName}</h4>
                          <p className="text-sm text-gray-600">
                            {product.productCategory}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(product.trendDirection)}
                          <span className="text-sm font-medium">
                            Rank #{product.profitabilityRank}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Revenue:</span>
                          <p className="font-medium">
                            ${product.revenue.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Gross Margin:</span>
                          <p className="font-medium text-green-600">
                            {product.grossMargin.toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Net Profit:</span>
                          <p className="font-medium">
                            ${product.netProfit.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Volume Sold:</span>
                          <p className="font-medium">
                            {product.volumeSold.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Profit per Unit:</span>
                          <span>${product.profitPerUnit}</span>
                        </div>
                        <Progress value={product.netMargin} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Channel Profitability
                </CardTitle>
                <CardDescription>
                  Compare performance across sales channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channelProfitability.map((channel) => (
                    <div
                      key={channel.channelId}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{channel.channelName}</h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {channel.channelType.replace("-", " ")}
                          </p>
                        </div>
                        <Badge
                          className={
                            channel.profitabilityScore >= 90
                              ? "bg-green-100 text-green-800"
                              : channel.profitabilityScore >= 70
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {channel.profitabilityScore}/100
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-600">Revenue:</span>
                          <p className="font-medium">
                            ${(channel.revenue / 1000000).toFixed(1)}M
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Margin:</span>
                          <p className="font-medium text-green-600">
                            {channel.margin}%
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">CAC:</span>
                          <p className="font-medium">
                            ${channel.customerAcquisitionCost}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">CLV:</span>
                          <p className="font-medium">
                            ${channel.customerLifetimeValue.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Conversion:</span>
                          <p className="font-medium">
                            {channel.conversionRate}%
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Growth Rate:</span>
                          <p className="font-medium text-blue-600">
                            +{channel.growthRate}%
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Efficiency Score:</span>
                          <span>{channel.efficiency}%</span>
                        </div>
                        <Progress value={channel.efficiency} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cash Flow Alignment */}
        <TabsContent value="cash-flow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Revenue & Cash Flow Alignment
              </CardTitle>
              <CardDescription>
                Monitor cash flow patterns and collection efficiency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Month
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Projected Revenue
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actual Revenue
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Variance
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Net Cash Flow
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Days to Collection
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Collection Efficiency
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cashFlowAlignment.map((cashFlow, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">
                            {cashFlow.month}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            ${(cashFlow.projectedRevenue / 1000).toFixed(0)}K
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {cashFlow.actualRevenue
                              ? `$${(cashFlow.actualRevenue / 1000).toFixed(0)}K`
                              : "TBD"}
                          </td>
                          <td className="px-4 py-3">
                            {cashFlow.actualRevenue && (
                              <span
                                className={`text-sm font-medium ${cashFlow.variance >= 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {cashFlow.variance >= 0 ? "+" : ""}$
                                {(cashFlow.variance / 1000).toFixed(0)}K
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-sm font-medium ${cashFlow.netCashFlow >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              ${(cashFlow.netCashFlow / 1000).toFixed(0)}K
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {cashFlow.daysToCollection.toFixed(0)} days
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={cashFlow.collectionEfficiency}
                                className="w-16 h-2"
                              />
                              <span className="text-sm">
                                {cashFlow.collectionEfficiency.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">
                    Avg Collection Days
                  </h3>
                  <p className="text-2xl font-bold text-blue-700">
                    {(
                      cashFlowAlignment.reduce(
                        (sum, cf) => sum + cf.daysToCollection,
                        0,
                      ) / cashFlowAlignment.length
                    ).toFixed(0)}
                  </p>
                  <p className="text-sm text-blue-600">Days</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">
                    Collection Efficiency
                  </h3>
                  <p className="text-2xl font-bold text-green-700">
                    {(
                      cashFlowAlignment.reduce(
                        (sum, cf) => sum + cf.collectionEfficiency,
                        0,
                      ) / cashFlowAlignment.length
                    ).toFixed(1)}
                    %
                  </p>
                  <p className="text-sm text-green-600">Average rate</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900">
                    Working Capital
                  </h3>
                  <p className="text-2xl font-bold text-purple-700">
                    $
                    {(cashFlowAlignment[0]?.workingCapital / 1000 || 0).toFixed(
                      0,
                    )}
                    K
                  </p>
                  <p className="text-sm text-purple-600">Current level</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-900">
                    Conversion Cycle
                  </h3>
                  <p className="text-2xl font-bold text-orange-700">
                    {cashFlowAlignment[0]?.cashConversionCycle.toFixed(0) || 0}
                  </p>
                  <p className="text-sm text-orange-600">Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Margin Optimization */}
        <TabsContent value="margin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Margin Optimization
              </CardTitle>
              <CardDescription>
                Identify opportunities to improve profit margins across products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {marginOptimization.map((optimization) => (
                <div
                  key={optimization.productId}
                  className="border rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        {optimization.productName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Feasibility Score: {optimization.feasibilityScore}/100
                      </p>
                    </div>
                    <Badge
                      className={
                        optimization.roi > 300
                          ? "bg-green-100 text-green-800"
                          : optimization.roi > 200
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {optimization.roi}% ROI
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-xl font-bold text-blue-600">
                        {optimization.currentMargin.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600">Current Margin</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-green-600">
                        {optimization.targetMargin.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600">Target Margin</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-purple-600">
                        +{optimization.marginGap.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600">Improvement Gap</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-orange-600">
                        ${optimization.expectedImpact.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Expected Impact</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Cost Reduction Opportunities
                      </h4>
                      <div className="space-y-2">
                        {optimization.costReductionOpportunities.map(
                          (cost, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div>
                                <span className="font-medium">{cost.area}</span>
                                <p className="text-sm text-gray-600">
                                  {cost.timeline}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-green-600">
                                  ${cost.savings.toLocaleString()}
                                </p>
                                <div className="flex gap-1">
                                  <Badge
                                    variant="outline"
                                    className={
                                      cost.difficulty === "low"
                                        ? "bg-green-100 text-green-800"
                                        : cost.difficulty === "medium"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {cost.difficulty}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={
                                      cost.impact === "high"
                                        ? "bg-green-100 text-green-800"
                                        : cost.impact === "medium"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {cost.impact}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Price Increase Opportunities
                      </h4>
                      <div className="space-y-2">
                        {optimization.priceIncreaseOpportunities.map(
                          (price, index) => (
                            <div
                              key={index}
                              className="p-3 bg-blue-50 rounded-lg"
                            >
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">
                                  {price.strategy}
                                </span>
                                <Badge
                                  className={getRiskColor(price.riskLevel)}
                                >
                                  {price.riskLevel} risk
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-600">
                                    Price Increase:
                                  </span>
                                  <p className="font-medium">
                                    +${price.priceIncrease.toFixed(0)}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    Volume Impact:
                                  </span>
                                  <p className="font-medium text-red-600">
                                    {price.volumeImpact.toFixed(1)}%
                                  </p>
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    Revenue Impact:
                                  </span>
                                  <p className="font-medium text-green-600">
                                    +{price.revenueImpact.toFixed(1)}%
                                  </p>
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    Elasticity:
                                  </span>
                                  <p className="font-medium">
                                    {price.elasticityImpact.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Recommended Actions
                      </h4>
                      <ul className="space-y-2">
                        {optimization.recommendedActions.map(
                          (action, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {action}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Implementation Plan
                      </h4>
                      <div className="space-y-2">
                        {optimization.implementationPlan.map((phase, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                          >
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium flex items-center justify-center">
                              {index + 1}
                            </div>
                            <span className="text-sm">{phase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          Investment Required
                        </p>
                        <p className="text-lg font-medium">
                          ${optimization.investmentRequired.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Timeframe</p>
                        <p className="text-lg font-medium">
                          {optimization.timeframe}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Expected ROI</p>
                        <p className="text-lg font-medium text-green-600">
                          {optimization.roi}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
