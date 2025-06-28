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
  Calculator,
  DollarSign,
  TrendingUp,
  Shield,
  Target,
  Lightbulb,
  AlertTriangle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  BarChart3,
  Activity,
  PieChart,
} from "lucide-react";
import { FinancialAdvisory } from "@/components/financial/financial-advisory";
import { useFinancialAdvisoryData } from "@/hooks/useFinancialAdvisoryData";

export default function FinancialAdvisoryPlanning() {
  const {
    financialInsights,
    cashFlowInsights,
    riskInsights,
    loading,
    lastUpdated,
  } = useFinancialAdvisoryData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">
            Loading financial advisory and planning data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                Financial Advisory & Planning
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive financial planning with strategic budgeting, cash
                flow management, and advisory insights
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="font-medium">{lastUpdated.toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Total Budget
                    </p>
                    <p className="text-xl font-bold text-blue-700">
                      ${(financialInsights.totalBudget / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <Calculator className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-blue-500 mr-1" />
                  <span className="text-blue-600">FY 2025 allocation</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      Budget Utilization
                    </p>
                    <p className="text-xl font-bold text-indigo-700">
                      {financialInsights.budgetUtilization.toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-indigo-500 mr-1" />
                  <span className="text-indigo-600">On track performance</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">
                      Cash Position
                    </p>
                    <p className="text-xl font-bold text-purple-700">
                      ${(cashFlowInsights.cashPosition / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <DollarSign className="h-6 w-6 text-purple-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <CheckCircle className="h-3 w-3 text-purple-500 mr-1" />
                  <span className="text-purple-600">Strong liquidity</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Liquidity Ratio
                    </p>
                    <p className="text-xl font-bold text-green-700">
                      {cashFlowInsights.liquidityRatio.toFixed(1)}
                    </p>
                  </div>
                  <Activity className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">Above target (2.0)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">
                      Risk Score
                    </p>
                    <p className="text-xl font-bold text-orange-700">
                      {riskInsights.riskScore.toFixed(0)}/100
                    </p>
                  </div>
                  <Shield className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowDownRight className="h-3 w-3 text-orange-500 mr-1" />
                  <span className="text-orange-600">
                    {riskInsights.riskScore < 40 ? "Low risk" : "Moderate risk"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-600">
                      Forecast Accuracy
                    </p>
                    <p className="text-xl font-bold text-emerald-700">
                      {financialInsights.forecastAccuracy}%
                    </p>
                  </div>
                  <Target className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <CheckCircle className="h-3 w-3 text-emerald-500 mr-1" />
                  <span className="text-emerald-600">Excellent quality</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Critical Alerts */}
        {(financialInsights.overBudgetCount > 0 ||
          financialInsights.budgetVariance < -10 ||
          riskInsights.highRiskCount > 0) && (
          <div className="mb-6 space-y-2">
            {financialInsights.overBudgetCount > 0 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Budget Alert:</strong>{" "}
                  {financialInsights.overBudgetCount}
                  budget categories are exceeding planned limits. Review and
                  adjustment required.
                </AlertDescription>
              </Alert>
            )}

            {financialInsights.budgetVariance < -10 && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Variance Alert:</strong> Overall budget variance of{" "}
                  {financialInsights.budgetVariance.toFixed(1)}% detected.
                  Forecast validation recommended.
                </AlertDescription>
              </Alert>
            )}

            {riskInsights.highRiskCount > 0 && (
              <Alert className="border-orange-200 bg-orange-50">
                <Shield className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>Risk Alert:</strong> {riskInsights.highRiskCount}
                  high-priority risks identified. Review mitigation strategies.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Executive Summary */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  Financial Advisory Executive Summary
                </CardTitle>
                <CardDescription>
                  Strategic financial insights and performance overview
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                Strategic Planning
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">
                  Budget Performance
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Utilization Rate:</span>
                    <span className="font-medium text-blue-600">
                      {financialInsights.budgetUtilization.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Variance:</span>
                    <span
                      className={`font-medium ${
                        financialInsights.budgetVariance < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {financialInsights.budgetVariance.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Strategic Alignment:</span>
                    <span className="font-medium text-purple-600">
                      {financialInsights.strategicAlignment}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Cash Flow Health</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Liquidity Ratio:</span>
                    <span className="font-medium text-green-600">
                      {cashFlowInsights.liquidityRatio.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Days of Cash:</span>
                    <span className="font-medium text-blue-600">
                      {cashFlowInsights.daysOfCash || 90} days
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cash Trend:</span>
                    <span
                      className={`font-medium ${
                        cashFlowInsights.cashTrend === "positive"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {(cashFlowInsights.cashTrend || "stable")
                        .charAt(0)
                        .toUpperCase() +
                        (cashFlowInsights.cashTrend || "stable").slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Risk Management</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Overall Risk Score:</span>
                    <span
                      className={`font-medium ${
                        riskInsights.riskScore < 40
                          ? "text-green-600"
                          : riskInsights.riskScore < 70
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {riskInsights.riskScore.toFixed(0)}/100
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">High Risk Items:</span>
                    <span className="font-medium text-orange-600">
                      {riskInsights.highRiskCount || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Financial Exposure:</span>
                    <span className="font-medium text-red-600">
                      $
                      {((riskInsights.totalExposure || 0) / 1000000).toFixed(1)}
                      M
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Planning Quality</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Forecast Accuracy:</span>
                    <span className="font-medium text-green-600">
                      {financialInsights.forecastAccuracy}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Performance Score:</span>
                    <span className="font-medium text-blue-600">
                      {financialInsights.performanceScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Advisory Insights:</span>
                    <span className="font-medium text-purple-600">
                      {financialInsights.advisoryInsights} active
                    </span>
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
                      Financial Strengths
                    </span>
                  </div>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Strong liquidity position (2.8x ratio)</li>
                    <li>• High forecast accuracy (87.5%)</li>
                    <li>• Strategic budget alignment (82%)</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium text-yellow-900">
                      Areas for Improvement
                    </span>
                  </div>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Budget variance optimization</li>
                    <li>• Risk mitigation enhancement</li>
                    <li>• Cash flow timing optimization</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-blue-900">
                      Strategic Priorities
                    </span>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Implement AI budget validation</li>
                    <li>• Enhance scenario planning</li>
                    <li>• Strengthen risk frameworks</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Financial Advisory Component */}
        <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              Financial Advisory & Planning Tools
            </CardTitle>
            <CardDescription>
              Comprehensive financial planning suite with strategic budgeting,
              cash flow management, forecast-driven budget validation, scenario
              planning, risk assessment, performance alignment, and AI-powered
              advisory insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FinancialAdvisory />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Financial Advisory & Planning Platform • Strategic insights and
            intelligent recommendations
          </p>
          <p className="mt-1">Last updated: {lastUpdated.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
