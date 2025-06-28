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
  Calculator,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
  BarChart3,
  Shield,
  Lightbulb,
  RefreshCw,
  Calendar,
  Users,
  FileText,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Equal,
  Clock,
  CreditCard,
  PieChart,
  Activity,
} from "lucide-react";
import {
  useStrategicBudgeting,
  useCashFlowPlanning,
  useBudgetValidation,
  useScenarioPlanning,
  useRiskAssessment,
  useAdvisoryInsights,
} from "@/hooks/useFinancialAdvisoryData";

export function FinancialAdvisory() {
  const {
    filteredBudgets,
    budgetForecasts,
    departments,
    selectedDepartment,
    setSelectedDepartment,
    budgetFilter,
    setBudgetFilter,
    financialInsights,
  } = useStrategicBudgeting();

  const {
    filteredProjections,
    liquidityAnalysis,
    selectedScenario,
    setSelectedScenario,
    cashFlowInsights,
  } = useCashFlowPlanning();

  const {
    filteredValidations,
    validationInsights,
    automationFeatures,
    validationFilter,
    setValidationFilter,
    validateBudget,
  } = useBudgetValidation();

  const {
    scenarios,
    stressTests,
    selectedScenario: selectedStressScenario,
    setSelectedScenario: setSelectedStressScenario,
    riskInsights,
  } = useScenarioPlanning();

  const {
    filteredRisks,
    riskCategories,
    riskFilter,
    setRiskFilter,
    categoryFilter,
    setCategoryFilter,
  } = useRiskAssessment();

  const { performanceMetrics, advisoryInsights, decisionSupport } =
    useAdvisoryInsights();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
      case "validated":
      case "approved":
      case "pass":
        return "bg-green-100 text-green-800";
      case "at-risk":
      case "flagged":
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "over-budget":
      case "requires-revision":
      case "fail":
      case "critical":
        return "bg-red-100 text-red-800";
      case "under-budget":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
      case "positive":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case "declining":
      case "negative":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      default:
        return <Equal className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Budget
                </p>
                <p className="text-2xl font-bold">
                  ${(financialInsights.totalBudget / 1000000).toFixed(1)}M
                </p>
              </div>
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Fiscal year 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilization</p>
                <p className="text-2xl font-bold">
                  {financialInsights.budgetUtilization.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Budget spent to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Cash Position
                </p>
                <p className="text-2xl font-bold">
                  ${(cashFlowInsights.cashPosition / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Current liquidity</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Risk Score</p>
                <p className="text-2xl font-bold">
                  {riskInsights.riskScore.toFixed(0)}/100
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Overall risk level</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Forecast Accuracy
                </p>
                <p className="text-2xl font-bold">
                  {financialInsights.forecastAccuracy}%
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Prediction quality</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      {(financialInsights.overBudgetCount > 0 ||
        riskInsights.highRiskCount > 0) && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Attention Required:</strong>{" "}
            {financialInsights.overBudgetCount > 0 && (
              <span>
                {financialInsights.overBudgetCount} budgets are over limit.{" "}
              </span>
            )}
            {riskInsights.highRiskCount > 0 && (
              <span>
                {riskInsights.highRiskCount} high-risk items identified.
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="strategic-budgeting" className="space-y-4">
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="strategic-budgeting" className="text-xs">
            Strategic Budgeting
          </TabsTrigger>
          <TabsTrigger value="cash-flow" className="text-xs">
            Cash Flow
          </TabsTrigger>
          <TabsTrigger value="budget-validation" className="text-xs">
            Budget Validation ✅
          </TabsTrigger>
          <TabsTrigger value="scenario-planning" className="text-xs">
            Scenario Planning
          </TabsTrigger>
          <TabsTrigger value="risk-assessment" className="text-xs">
            Risk Assessment
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-xs">
            Performance
          </TabsTrigger>
          <TabsTrigger value="advisory" className="text-xs">
            Advisory Insights
          </TabsTrigger>
        </TabsList>

        {/* Strategic Budgeting & Forecasting */}
        <TabsContent value="strategic-budgeting" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Strategic Budgeting & Forecasting
                  </CardTitle>
                  <CardDescription>
                    Comprehensive budget planning with strategic alignment and
                    performance tracking
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept === "all" ? "All Departments" : dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="on-track">On Track</SelectItem>
                      <SelectItem value="over-budget">Over Budget</SelectItem>
                      <SelectItem value="under-budget">Under Budget</SelectItem>
                      <SelectItem value="at-risk">At Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Budget Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">Total Planned</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    $
                    {(
                      filteredBudgets.reduce(
                        (sum, b) => sum + b.plannedAmount,
                        0,
                      ) / 1000000
                    ).toFixed(1)}
                    M
                  </p>
                  <p className="text-sm text-blue-600">Approved budgets</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">Total Spent</h3>
                  <p className="text-2xl font-bold text-green-700">
                    $
                    {(
                      filteredBudgets.reduce(
                        (sum, b) => sum + b.spentAmount,
                        0,
                      ) / 1000000
                    ).toFixed(1)}
                    M
                  </p>
                  <p className="text-sm text-green-600">Actual spending</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-900">Variance</h3>
                  <p
                    className={`text-2xl font-bold ${
                      filteredBudgets.reduce((sum, b) => sum + b.variance, 0) <
                      0
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {filteredBudgets.reduce((sum, b) => sum + b.variance, 0) < 0
                      ? "-"
                      : "+"}
                    $
                    {Math.abs(
                      filteredBudgets.reduce((sum, b) => sum + b.variance, 0) /
                        1000,
                    ).toFixed(0)}
                    K
                  </p>
                  <p className="text-sm text-yellow-600">Budget variance</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900">
                    Strategic Alignment
                  </h3>
                  <p className="text-2xl font-bold text-purple-700">
                    {(
                      filteredBudgets.reduce(
                        (sum, b) => sum + b.strategicAlignment,
                        0,
                      ) / filteredBudgets.length || 0
                    ).toFixed(0)}
                    %
                  </p>
                  <p className="text-sm text-purple-600">Average score</p>
                </div>
              </div>

              {/* Budget Details Table */}
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Budget Item
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Department
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Planned
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Spent
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Remaining
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Utilization
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Priority
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredBudgets.slice(0, 10).map((budget) => (
                        <tr key={budget.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium text-gray-900">
                                {budget.budgetName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {budget.category}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {budget.department}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            ${budget.plannedAmount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            ${budget.spentAmount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            ${budget.remainingAmount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={budget.utilizationRate}
                                className="w-16 h-2"
                              />
                              <span className="text-sm">
                                {budget.utilizationRate.toFixed(0)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge className={getStatusColor(budget.status)}>
                              {budget.status.replace("-", " ")}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={getPriorityColor(budget.priority)}
                            >
                              {budget.priority}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Budget Forecasts */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Budget Forecasts
                </h3>
                {budgetForecasts.map((forecast) => (
                  <div
                    key={forecast.id}
                    className="border rounded-lg p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {forecast.forecastPeriod} Forecast
                        </h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {forecast.forecastType} • {forecast.methodology}{" "}
                          methodology
                        </p>
                      </div>
                      <Badge variant="outline">
                        {forecast.confidenceLevel}% confidence
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Total Budget</p>
                        <p className="text-lg font-medium">
                          ${forecast.totalBudget.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Projected Spend</p>
                        <p className="text-lg font-medium">
                          ${forecast.projectedSpend.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          Variance Forecast
                        </p>
                        <p
                          className={`text-lg font-medium ${
                            forecast.varianceForecast < 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {forecast.varianceForecast < 0 ? "" : "+"}$
                          {forecast.varianceForecast.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          Key Assumptions
                        </h5>
                        <ul className="space-y-1">
                          {forecast.keyAssumptions.map((assumption, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {assumption}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          Risk Factors
                        </h5>
                        <ul className="space-y-1">
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow & Liquidity Planning */}
        <TabsContent value="cash-flow" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Cash Flow & Liquidity Planning
                  </CardTitle>
                  <CardDescription>
                    Real-time cash flow projections and liquidity analysis
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedScenario}
                    onValueChange={setSelectedScenario}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Scenario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Scenarios</SelectItem>
                      <SelectItem value="optimistic">Optimistic</SelectItem>
                      <SelectItem value="base">Base Case</SelectItem>
                      <SelectItem value="pessimistic">Pessimistic</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Liquidity Summary */}
              {liquidityAnalysis.map((analysis) => (
                <div key={analysis.id} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900">
                        Current Ratio
                      </h3>
                      <p className="text-2xl font-bold text-blue-700">
                        {analysis.currentRatio.toFixed(2)}
                      </p>
                      <p className="text-sm text-blue-600">
                        Liquidity strength
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-900">
                        Cash Reserve
                      </h3>
                      <p className="text-2xl font-bold text-green-700">
                        ${(analysis.actualCashReserve / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-sm text-green-600">Available cash</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-medium text-yellow-900">
                        Reserve Adequacy
                      </h3>
                      <p className="text-2xl font-bold text-yellow-700">
                        {analysis.reserveAdequacy.toFixed(0)}%
                      </p>
                      <p className="text-sm text-yellow-600">vs recommended</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-medium text-purple-900">
                        Liquidity Score
                      </h3>
                      <p className="text-2xl font-bold text-purple-700">
                        {analysis.liquidityScore}/100
                      </p>
                      <p className="text-sm text-purple-600">Overall rating</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        Liquidity Risk Assessment
                      </h4>
                      <Badge className={getRiskColor(analysis.liquidityRisk)}>
                        {analysis.liquidityRisk} risk
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Quick Ratio:</span>
                        <p className="font-medium">
                          {analysis.quickRatio.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Cash Ratio:</span>
                        <p className="font-medium">
                          {analysis.cashRatio.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Working Capital:</span>
                        <p className="font-medium">
                          ${(analysis.workingCapitalRatio * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Liquidity Recommendations
                    </h4>
                    <div className="space-y-2">
                      {analysis.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg"
                        >
                          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-blue-800">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Cash Flow Projections */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Cash Flow Projections
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Period
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Opening Balance
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Operating Inflow
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Operating Outflow
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Net Cash Flow
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Closing Balance
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Days of Cash
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Scenario
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredProjections.map((projection) => (
                          <tr key={projection.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">
                              {projection.period}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              ${(projection.openingBalance / 1000).toFixed(0)}K
                            </td>
                            <td className="px-4 py-3 text-sm text-green-600">
                              +$
                              {(projection.operatingCashInflow / 1000).toFixed(
                                0,
                              )}
                              K
                            </td>
                            <td className="px-4 py-3 text-sm text-red-600">
                              -$
                              {(projection.operatingCashOutflow / 1000).toFixed(
                                0,
                              )}
                              K
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-sm font-medium ${
                                  projection.netCashFlow >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {projection.netCashFlow >= 0 ? "+" : ""}$
                                {(projection.netCashFlow / 1000).toFixed(0)}K
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              ${(projection.closingBalance / 1000).toFixed(0)}K
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {projection.daysOfCash} days
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="capitalize">
                                {projection.scenario}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forecast-Driven Budget Validation (Special Feature) */}
        <TabsContent value="budget-validation" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Forecast-Driven Budget Validation ✅
                  </CardTitle>
                  <CardDescription>
                    Advanced AI-powered budget validation with real-time
                    forecast analysis and automated approval workflows
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={validationFilter}
                    onValueChange={setValidationFilter}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="validated">Validated</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                      <SelectItem value="requires-revision">
                        Needs Revision
                      </SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Zap className="h-4 w-4 mr-2" />
                    Auto-Validate
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Validation Insights Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">Validated</h3>
                  <p className="text-2xl font-bold text-green-700">
                    {validationInsights.validatedCount || 0}
                  </p>
                  <p className="text-sm text-green-600">
                    {(validationInsights.validationRate || 0).toFixed(1)}%
                    approval rate
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-900">Flagged</h3>
                  <p className="text-2xl font-bold text-yellow-700">
                    {validationInsights.flaggedCount || 0}
                  </p>
                  <p className="text-sm text-yellow-600">Need attention</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">Avg Confidence</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    {(validationInsights.avgConfidence || 0).toFixed(0)}%
                  </p>
                  <p className="text-sm text-blue-600">Validation quality</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900">
                    Total Variance
                  </h3>
                  <p
                    className={`text-2xl font-bold ${
                      (validationInsights.overallVariance || 0) < 0
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {(validationInsights.overallVariance || 0) < 0 ? "" : "+"}
                    {(validationInsights.overallVariance || 0).toFixed(1)}%
                  </p>
                  <p className="text-sm text-purple-600">vs planned</p>
                </div>
              </div>

              {/* Automation Features */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    AI-Powered Validation Engine
                  </h3>
                  <Badge className="bg-green-100 text-green-800">
                    <Zap className="h-3 w-3 mr-1" />
                    ML Enhanced
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {automationFeatures.autoValidationRules.map((rule, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">
                          {rule.rule}
                        </h4>
                        <Badge variant={rule.enabled ? "default" : "secondary"}>
                          {rule.enabled ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {rule.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Threshold:</span>
                        <span className="font-medium">{rule.threshold}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Action:</span>
                        <span className="font-medium capitalize">
                          {rule.action.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-3">
                    Validation Workflow
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {automationFeatures.validationWorkflow.map(
                      (step, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-medium flex items-center justify-center">
                            {index + 1}
                          </div>
                          <span className="text-sm text-blue-800">{step}</span>
                          {index <
                            automationFeatures.validationWorkflow.length -
                              1 && (
                            <ArrowUpRight className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Validation Results */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Budget Validation Results
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Budget Item
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Department
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Planned
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Forecasted
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Variance
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Confidence
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Method
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredValidations.slice(0, 10).map((validation) => (
                          <tr key={validation.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <p className="font-medium text-gray-900">
                                {validation.budgetItem}
                              </p>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {validation.department}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              ${validation.plannedAmount.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              ${validation.forecastedAmount.toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-sm font-medium ${
                                  validation.varianceToPlanned < 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {validation.varianceToPlanned >= 0 ? "+" : ""}
                                {validation.varianceToPlanned.toFixed(1)}%
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={validation.confidenceScore}
                                  className="w-16 h-2"
                                />
                                <span className="text-sm">
                                  {validation.confidenceScore}%
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                className={getStatusColor(
                                  validation.validationStatus,
                                )}
                              >
                                {validation.validationStatus.replace("-", " ")}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                              >
                                {validation.validationMethod.replace("-", " ")}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  View
                                </Button>
                                {validation.validationStatus === "flagged" && (
                                  <Button size="sm">Review</Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Validation Points Detail */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Detailed Validation Analysis
                </h3>
                {filteredValidations.slice(0, 3).map((validation) => (
                  <div
                    key={validation.id}
                    className="border rounded-lg p-6 mb-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        {validation.budgetItem} - {validation.department}
                      </h4>
                      <Badge
                        className={getStatusColor(validation.validationStatus)}
                      >
                        {validation.validationStatus.replace("-", " ")}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">
                          Validation Points
                        </h5>
                        <div className="space-y-3">
                          {validation.keyValidationPoints.map(
                            (point, index) => (
                              <div
                                key={index}
                                className="border rounded-lg p-3"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-sm">
                                    {point.criteria}
                                  </span>
                                  <Badge
                                    className={getStatusColor(point.status)}
                                  >
                                    {point.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600">
                                  <div className="flex justify-between">
                                    <span>Expected:</span>
                                    <span>
                                      ${point.expectedValue.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Actual:</span>
                                    <span>
                                      ${point.actualValue.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Variance:</span>
                                    <span
                                      className={
                                        point.variance < 0
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }
                                    >
                                      {point.variance.toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                  {point.explanation}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">
                          Recommended Adjustments
                        </h5>
                        <div className="space-y-3">
                          {validation.recommendedAdjustments.map(
                            (adjustment, index) => (
                              <div
                                key={index}
                                className="border rounded-lg p-3"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-sm capitalize">
                                    {adjustment.adjustmentType} to{" "}
                                    {adjustment.toCategory}
                                  </span>
                                  <Badge
                                    className={getPriorityColor(
                                      adjustment.recommendationStrength,
                                    )}
                                  >
                                    {adjustment.recommendationStrength}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                  <div className="flex justify-between">
                                    <span>Amount:</span>
                                    <span className="font-medium">
                                      ${adjustment.amount.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Complexity:</span>
                                    <span className="capitalize">
                                      {adjustment.implementationComplexity}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500">
                                  <strong>Reason:</strong> {adjustment.reason}
                                </p>
                                <p className="text-xs text-gray-500">
                                  <strong>Impact:</strong> {adjustment.impact}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scenario Planning & Stress Testing */}
        <TabsContent value="scenario-planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Scenario Planning & Stress Testing
              </CardTitle>
              <CardDescription>
                Comprehensive scenario analysis with stress testing and
                contingency planning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scenario Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className="border rounded-lg p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {scenario.scenarioName}
                      </h3>
                      <Badge
                        variant="outline"
                        className={
                          scenario.scenarioType === "best-case"
                            ? "bg-green-100 text-green-800"
                            : scenario.scenarioType === "worst-case"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {scenario.scenarioType.replace("-", " ")}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600">
                      {scenario.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Probability:</span>
                        <p className="font-medium">{scenario.probability}%</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Impact:</span>
                        <Badge className={getRiskColor(scenario.impactLevel)}>
                          {scenario.impactLevel}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-gray-500">Time Horizon:</span>
                        <p className="font-medium">{scenario.timeHorizon}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Risk Score:</span>
                        <p className="font-medium">
                          {scenario.financialImpact.overallRiskScore}/100
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Revenue Impact:</span>
                        <p
                          className={`font-medium ${
                            scenario.financialImpact.revenueImpactPercent >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {scenario.financialImpact.revenueImpactPercent >= 0
                            ? "+"
                            : ""}
                          {scenario.financialImpact.revenueImpactPercent}%
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Cash Flow Impact:</span>
                        <p
                          className={`font-medium ${
                            scenario.financialImpact.cashFlowImpact >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {scenario.financialImpact.cashFlowImpact >= 0
                            ? "+"
                            : ""}
                          $
                          {(
                            scenario.financialImpact.cashFlowImpact / 1000000
                          ).toFixed(1)}
                          M
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stress Testing Results */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Stress Testing Results
                </h3>
                {stressTests.map((test) => (
                  <div
                    key={test.id}
                    className="border rounded-lg p-6 space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {test.testName}
                        </h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {test.testType} stress test • {test.stressLevel}{" "}
                          scenario
                        </p>
                      </div>
                      <Badge className={getStatusColor(test.testResult)}>
                        {test.testResult.replace("-", " ")}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">
                          Baseline vs Stressed Metrics
                        </h5>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-600">
                              Revenue:
                            </span>
                            <div className="text-right">
                              <p className="text-sm">
                                $
                                {(
                                  test.baselineMetrics.revenue / 1000000
                                ).toFixed(1)}
                                M → $
                                {(
                                  test.stressedMetrics.revenue / 1000000
                                ).toFixed(1)}
                                M
                              </p>
                              <p className="text-xs text-red-600">
                                {(
                                  ((test.stressedMetrics.revenue -
                                    test.baselineMetrics.revenue) /
                                    test.baselineMetrics.revenue) *
                                  100
                                ).toFixed(1)}
                                %
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-600">
                              Cash Flow:
                            </span>
                            <div className="text-right">
                              <p className="text-sm">
                                $
                                {(
                                  test.baselineMetrics.cashFlow / 1000000
                                ).toFixed(1)}
                                M → $
                                {(
                                  test.stressedMetrics.cashFlow / 1000000
                                ).toFixed(1)}
                                M
                              </p>
                              <p className="text-xs text-red-600">
                                {(
                                  ((test.stressedMetrics.cashFlow -
                                    test.baselineMetrics.cashFlow) /
                                    test.baselineMetrics.cashFlow) *
                                  100
                                ).toFixed(1)}
                                %
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-600">
                              Liquidity Ratio:
                            </span>
                            <div className="text-right">
                              <p className="text-sm">
                                {test.baselineMetrics.liquidity.toFixed(2)} →{" "}
                                {test.stressedMetrics.liquidity.toFixed(2)}
                              </p>
                              <p className="text-xs text-red-600">
                                {(
                                  ((test.stressedMetrics.liquidity -
                                    test.baselineMetrics.liquidity) /
                                    test.baselineMetrics.liquidity) *
                                  100
                                ).toFixed(1)}
                                %
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">
                          Critical Thresholds
                        </h5>
                        <div className="space-y-3">
                          {test.impactAnalysis.criticalThresholds.map(
                            (threshold, index) => (
                              <div
                                key={index}
                                className="border rounded-lg p-3"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-sm">
                                    {threshold.metric}
                                  </span>
                                  <Badge
                                    className={getStatusColor(threshold.status)}
                                  >
                                    {threshold.status}
                                  </Badge>
                                </div>
                                <div className="text-xs text-gray-600">
                                  <div className="flex justify-between">
                                    <span>Warning Level:</span>
                                    <span>
                                      ${threshold.warningLevel.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Critical Level:</span>
                                    <span>
                                      $
                                      {threshold.criticalLevel.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Current Level:</span>
                                    <span className="font-medium">
                                      ${threshold.currentLevel.toLocaleString()}
                                    </span>
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
                        <h5 className="font-medium text-gray-900 mb-3">
                          Recommendations
                        </h5>
                        <ul className="space-y-2">
                          {test.recommendations.map((rec, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">
                          Action Plan
                        </h5>
                        <ul className="space-y-2">
                          {test.actionPlan.map((action, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Assessment */}
        <TabsContent value="risk-assessment" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Risk Assessment
                  </CardTitle>
                  <CardDescription>
                    Comprehensive financial risk analysis and mitigation
                    planning
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {riskCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all"
                            ? "All Categories"
                            : category.charAt(0).toUpperCase() +
                              category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900">Critical Risks</h3>
                  <p className="text-2xl font-bold text-red-700">
                    {
                      filteredRisks.filter((r) => r.riskLevel === "critical")
                        .length
                    }
                  </p>
                  <p className="text-sm text-red-600">Immediate action</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-900">High Risks</h3>
                  <p className="text-2xl font-bold text-orange-700">
                    {filteredRisks.filter((r) => r.riskLevel === "high").length}
                  </p>
                  <p className="text-sm text-orange-600">Priority review</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">Total Exposure</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    ${((riskInsights.totalExposure || 0) / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-blue-600">Financial exposure</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">Avg Risk Score</h3>
                  <p className="text-2xl font-bold text-green-700">
                    {(riskInsights.riskScore || 0).toFixed(0)}/100
                  </p>
                  <p className="text-sm text-green-600">Overall rating</p>
                </div>
              </div>

              {/* Risk Details */}
              <div className="space-y-4">
                {filteredRisks.map((risk) => (
                  <div key={risk.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {risk.riskName}
                        </h3>
                        <p className="text-sm text-gray-600 capitalize">
                          {risk.riskCategory.replace("-", " ")} risk
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getRiskColor(risk.riskLevel)}>
                          {risk.riskLevel} risk
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(risk.trend)}
                          <span className="text-sm text-gray-600 capitalize">
                            {risk.trend}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      {risk.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Probability</p>
                        <p className="text-lg font-medium">
                          {risk.probability}%
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Impact</p>
                        <p className="text-lg font-medium">{risk.impact}/100</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Risk Score</p>
                        <p className="text-lg font-medium">
                          {risk.riskScore.toFixed(0)}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          Financial Exposure
                        </p>
                        <p className="text-lg font-medium">
                          ${(risk.financialExposure / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Current Controls
                        </h4>
                        <ul className="space-y-1">
                          {risk.currentControls.map((control, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {control}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Mitigation Actions
                        </h4>
                        <div className="space-y-2">
                          {risk.mitigationActions.map((action, index) => (
                            <div key={index} className="border rounded-lg p-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">
                                  {action.action}
                                </span>
                                <Badge
                                  className={getPriorityColor(action.priority)}
                                >
                                  {action.priority}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600">
                                <div className="flex justify-between">
                                  <span>Timeline:</span>
                                  <span>{action.timeline}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Cost:</span>
                                  <span>${action.cost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Risk Reduction:</span>
                                  <span>{action.expectedRiskReduction}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Early Warning Signals
                        </h4>
                        <ul className="space-y-1">
                          {risk.earlyWarningSignals.map((signal, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              {signal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span>Owner: {risk.riskOwner}</span> •{" "}
                        <span>
                          Next Review: {risk.nextReview.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Update Assessment
                        </Button>
                        <Button size="sm">View Action Plan</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Alignment */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Performance Alignment
              </CardTitle>
              <CardDescription>
                Track performance against targets and strategic objectives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Performance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">
                    Excellent Performance
                  </h3>
                  <p className="text-2xl font-bold text-green-700">
                    {
                      performanceMetrics.filter(
                        (m) => m.performanceRating === "excellent",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-green-600">Metrics on target</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">
                    Good Performance
                  </h3>
                  <p className="text-2xl font-bold text-blue-700">
                    {
                      performanceMetrics.filter(
                        (m) => m.performanceRating === "good",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-blue-600">Above average</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-900">
                    Fair Performance
                  </h3>
                  <p className="text-2xl font-bold text-yellow-700">
                    {
                      performanceMetrics.filter(
                        (m) => m.performanceRating === "fair",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-yellow-600">Needs improvement</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900">Poor Performance</h3>
                  <p className="text-2xl font-bold text-red-700">
                    {
                      performanceMetrics.filter(
                        (m) => m.performanceRating === "poor",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-red-600">Action required</p>
                </div>
              </div>

              {/* Performance Details */}
              <div className="space-y-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {metric.metricName}
                        </h3>
                        <p className="text-sm text-gray-600 capitalize">
                          {metric.category} metric
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={getStatusColor(metric.performanceRating)}
                        >
                          {metric.performanceRating}
                        </Badge>
                        {getTrendIcon(metric.trend)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Current Value</p>
                        <p className="text-lg font-medium">
                          {metric.currentValue.toFixed(1)}
                          {metric.category === "financial" ? "%" : ""}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Target Value</p>
                        <p className="text-lg font-medium">
                          {metric.targetValue.toFixed(1)}
                          {metric.category === "financial" ? "%" : ""}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Variance</p>
                        <p
                          className={`text-lg font-medium ${
                            metric.variance < 0
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {metric.variance >= 0 ? "+" : ""}
                          {metric.variance.toFixed(1)}
                          {metric.category === "financial" ? "%" : ""}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Alignment Score</p>
                        <p className="text-lg font-medium">
                          {metric.alignmentScore}/100
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Actionable Insights
                        </h4>
                        <ul className="space-y-1">
                          {metric.actionableInsights.map((insight, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Recommended Actions
                        </h4>
                        <ul className="space-y-1">
                          {metric.recommendedActions.map((action, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div>
                          <span>
                            Strategic Importance: {metric.strategicImportance}%
                          </span>{" "}
                          • <span>Measured: {metric.measurementFrequency}</span>{" "}
                          • <span>Source: {metric.dataSource}</span>
                        </div>
                        <Badge variant="outline">
                          Last Updated:{" "}
                          {metric.lastMeasured.toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advisory Insights & Decision Support */}
        <TabsContent value="advisory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Advisory Insights & Decision Support
              </CardTitle>
              <CardDescription>
                AI-powered insights and decision support recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Advisory Insights */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Strategic Insights
                </h3>
                {advisoryInsights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {insight.insightType} • {insight.timeframe}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(insight.priority)}>
                          {insight.priority}
                        </Badge>
                        <Badge variant="outline">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      {insight.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          Potential Impact
                        </p>
                        <p className="text-lg font-medium text-green-600">
                          ${insight.potentialImpact.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          Investment Required
                        </p>
                        <p className="text-lg font-medium">
                          ${insight.investmentRequired.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Expected ROI</p>
                        <p className="text-lg font-medium text-green-600">
                          {insight.expectedROI}%
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          Key Findings
                        </h5>
                        <ul className="space-y-1">
                          {insight.keyFindings.map((finding, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <Activity className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              {finding}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          Recommendations
                        </h5>
                        <div className="space-y-2">
                          {insight.recommendations.map((rec, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">
                                  {rec.action}
                                </span>
                                <Badge
                                  className={getPriorityColor(rec.priority)}
                                >
                                  {rec.priority}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">
                                {rec.rationale}
                              </p>
                              <div className="text-xs text-gray-500">
                                <div className="flex justify-between">
                                  <span>Timeline:</span>
                                  <span>{rec.timeline}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Expected Outcome:</span>
                                  <span>{rec.expectedOutcome}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span>Category: {insight.category}</span> •{" "}
                        <span>
                          Complexity: {insight.implementationComplexity}
                        </span>{" "}
                        • <span>Risk: {insight.riskLevel}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">Implement</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decision Support */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Decision Support
                </h3>
                {decisionSupport.map((decision) => (
                  <div key={decision.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {decision.decisionContext}
                        </h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {decision.decisionType} decision
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {decision.confidenceLevel}% confidence
                        </Badge>
                        <Badge variant="outline">
                          Due: {decision.decisionDeadline.toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">
                        Recommended Option: {decision.recommendedOption}
                      </h5>
                      {decision.options
                        .filter(
                          (opt) => opt.optionId === decision.recommendedOption,
                        )
                        .map((option) => (
                          <div
                            key={option.optionId}
                            className="bg-green-50 p-4 rounded-lg"
                          >
                            <h6 className="font-medium text-green-900 mb-2">
                              {option.optionName}
                            </h6>
                            <p className="text-sm text-green-800 mb-3">
                              {option.description}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div>
                                <span className="text-green-600">
                                  Investment:
                                </span>
                                <p className="font-medium">
                                  ${option.investmentRequired.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <span className="text-green-600">
                                  Expected Return:
                                </span>
                                <p className="font-medium">
                                  ${option.expectedReturn.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <span className="text-green-600">
                                  Time to Value:
                                </span>
                                <p className="font-medium">
                                  {option.timeToValue}
                                </p>
                              </div>
                              <div>
                                <span className="text-green-600">
                                  Overall Score:
                                </span>
                                <p className="font-medium">
                                  {option.overallScore}/100
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          Key Assumptions
                        </h5>
                        <ul className="space-y-1">
                          {decision.keyAssumptions.map((assumption, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {assumption}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          Risk Considerations
                        </h5>
                        <ul className="space-y-1">
                          {decision.riskConsiderations.map((risk, index) => (
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
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span>
                            Stakeholders: {decision.stakeholders.join(", ")}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Compare Options
                          </Button>
                          <Button size="sm">Approve Decision</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
