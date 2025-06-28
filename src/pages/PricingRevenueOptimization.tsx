import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DollarSign,
  TrendingUp,
  Target,
  Percent,
  Users,
  BarChart3,
  AlertTriangle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  PieChart,
} from "lucide-react";
import { PricingStrategy } from "@/components/pricing/pricing-strategy";
import { RevenueStrategy } from "@/components/pricing/revenue-strategy";
import { usePricingRevenueData } from "@/hooks/usePricingRevenueData";

export default function PricingRevenueOptimization() {
  const { pricingInsights, revenueInsights, loading, lastUpdated } =
    usePricingRevenueData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">
            Loading pricing and revenue optimization data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-lg">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                Pricing & Revenue Optimization
              </h1>
              <p className="text-gray-600 mt-2">
                Intelligent pricing strategies and revenue growth optimization
                platform
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="font-medium">{lastUpdated.toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">
                      Total Revenue
                    </p>
                    <p className="text-xl font-bold text-orange-700">
                      ${(pricingInsights.totalRevenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <DollarSign className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-orange-500 mr-1" />
                  <span className="text-orange-600">
                    +{pricingInsights.revenueGrowth}% vs last year
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">
                      Avg Margin
                    </p>
                    <p className="text-xl font-bold text-yellow-700">
                      {pricingInsights.avgMargin}%
                    </p>
                  </div>
                  <Percent className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-yellow-500 mr-1" />
                  <span className="text-yellow-600">+3.2% improvement</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Customer LTV
                    </p>
                    <p className="text-xl font-bold text-green-700">
                      $
                      {(pricingInsights.customerLifetimeValue / 1000).toFixed(
                        1,
                      )}
                      K
                    </p>
                  </div>
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">+12.8% increase</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Churn Rate
                    </p>
                    <p className="text-xl font-bold text-blue-700">
                      {pricingInsights.churnRate}%
                    </p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowDownRight className="h-3 w-3 text-blue-500 mr-1" />
                  <span className="text-blue-600">-0.8% improvement</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">
                      Price Optimization
                    </p>
                    <p className="text-xl font-bold text-purple-700">
                      {pricingInsights.priceOptimizationPotential}%
                    </p>
                  </div>
                  <Target className="h-6 w-6 text-purple-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <Zap className="h-3 w-3 text-purple-500 mr-1" />
                  <span className="text-purple-600">
                    Revenue uplift potential
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">
                      Revenue Leakage
                    </p>
                    <p className="text-xl font-bold text-red-700">
                      ${(pricingInsights.revenueLeakage / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-red-600">Requires attention</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Revenue Leakage Alert */}
        {pricingInsights.revenueLeakage > 100000 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Revenue Leakage Detected:</strong> Potential monthly
              revenue loss of ${pricingInsights.revenueLeakage.toLocaleString()}
              . Critical billing and process issues require immediate attention.
            </AlertDescription>
          </Alert>
        )}

        {/* Executive Summary */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-orange-600" />
                  Pricing & Revenue Executive Summary
                </CardTitle>
                <CardDescription>
                  Key performance indicators and strategic optimization
                  opportunities
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="bg-orange-100 text-orange-800"
              >
                Revenue Optimization
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">
                  Pricing Performance
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price Strategies:</span>
                    <span className="font-medium text-orange-600">
                      {pricingInsights.activePricingStrategies || 5} active
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Effectiveness:</span>
                    <span className="font-medium text-blue-600">
                      {pricingInsights.avgEffectiveness || 78}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Optimization Potential:
                    </span>
                    <span className="font-medium text-purple-600">
                      {pricingInsights.priceOptimizationPotential}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Revenue Health</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Growth Rate:</span>
                    <span className="font-medium text-green-600">
                      +{pricingInsights.revenueGrowth}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Recurring Revenue:</span>
                    <span className="font-medium text-blue-600">
                      $
                      {(pricingInsights.subscriptionRevenue / 1000000).toFixed(
                        1,
                      )}
                      M
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">One-time Revenue:</span>
                    <span className="font-medium text-purple-600">
                      ${(pricingInsights.oneTimeRevenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Customer Metrics</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lifetime Value:</span>
                    <span className="font-medium text-green-600">
                      ${pricingInsights.customerLifetimeValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Churn Rate:</span>
                    <span className="font-medium text-orange-600">
                      {pricingInsights.churnRate}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Profitability Score:</span>
                    <span className="font-medium text-blue-600">
                      {pricingInsights.profitabilityScore}/100
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Risk Assessment</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revenue Leakage:</span>
                    <span
                      className={`font-medium ${pricingInsights.revenueLeakage > 100000 ? "text-red-600" : "text-green-600"}`}
                    >
                      ${(pricingInsights.revenueLeakage / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price Elasticity:</span>
                    <span className="font-medium text-blue-600">Moderate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Market Position:</span>
                    <span className="font-medium text-purple-600">Strong</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-900">
                      Revenue Opportunities
                    </span>
                  </div>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Price optimization potential: 15.8%</li>
                    <li>• Cross-sell opportunities identified</li>
                    <li>• Subscription growth momentum</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium text-yellow-900">
                      Action Items
                    </span>
                  </div>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Implement dynamic pricing</li>
                    <li>• Address revenue leakage</li>
                    <li>• Optimize tiered pricing</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-blue-900">
                      Strategic Focus
                    </span>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Value-based pricing strategy</li>
                    <li>• Customer retention programs</li>
                    <li>• Margin optimization initiatives</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pricing" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              🎯 Pricing Strategy
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              📈 Revenue Strategy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pricing" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Pricing Strategy & Analysis
                </CardTitle>
                <CardDescription>
                  Comprehensive pricing optimization with value-based pricing,
                  competitive benchmarking, dynamic pricing algorithms, tiered
                  models, market strategies, customer segmentation, and
                  AI-powered analytics with continuous A/B testing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PricingStrategy />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Revenue Strategy & Analysis
                </CardTitle>
                <CardDescription>
                  Advanced revenue optimization covering forecasting,
                  segmentation, subscription models, promotion analysis, churn
                  tracking, cross-selling, leakage detection, profitability
                  analysis, cash flow alignment, and margin optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueStrategy />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Pricing & Revenue Optimization Platform • Intelligent strategies and
            real-time insights
          </p>
          <p className="mt-1">Last updated: {lastUpdated.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
