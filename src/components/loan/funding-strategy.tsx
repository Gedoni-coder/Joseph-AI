import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FundingStrategy } from "@/lib/loan-funding-data";
import {
  PieChart,
  TrendingUp,
  Shield,
  AlertTriangle,
  Target,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  Zap,
  CheckCircle,
  Calendar,
  RefreshCw,
} from "lucide-react";

interface FundingStrategyProps {
  strategy: FundingStrategy | null;
  onAnalyzeStrategy: () => void;
  isProcessing: boolean;
}

export const FundingStrategyComponent = ({
  strategy,
  onAnalyzeStrategy,
  isProcessing,
}: FundingStrategyProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReadinessColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  if (!strategy) {
    return (
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-12 text-center">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Funding Strategy Analysis
          </h3>
          <p className="text-gray-600 mb-4">
            Run a comprehensive analysis to get personalized funding strategy
            recommendations.
          </p>
          <Button onClick={onAnalyzeStrategy} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Target className="h-4 w-4 mr-2" />
                Analyze Funding Strategy
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Funding Strategy & Readiness Analysis
          </h2>
          <p className="text-gray-600">
            Strategic guidance on optimal funding mix and readiness assessment
          </p>
        </div>
        <Button
          onClick={onAnalyzeStrategy}
          disabled={isProcessing}
          variant="outline"
          size="sm"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Re-analyzing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Analysis
            </>
          )}
        </Button>
      </div>

      {/* Funding Readiness Score */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Funding Readiness Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl font-bold text-blue-600">
              {strategy.readinessScore}
            </div>
            <Badge className={getReadinessColor(strategy.readinessScore)}>
              {strategy.readinessScore >= 80
                ? "Ready"
                : strategy.readinessScore >= 60
                  ? "Nearly Ready"
                  : "Needs Improvement"}
            </Badge>
          </div>
          <Progress value={strategy.readinessScore} className="h-3 mb-4" />
          <div className="text-sm text-gray-600">
            Based on creditworthiness, financial health, and business viability
          </div>
        </CardContent>
      </Card>

      {/* Recommended Funding Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              Recommended Funding Mix
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Equity Funding</span>
                  <span className="font-bold text-green-600">
                    {formatPercentage(strategy.recommendedMix.equity)}
                  </span>
                </div>
                <Progress
                  value={strategy.recommendedMix.equity}
                  className="h-3"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Debt Funding</span>
                  <span className="font-bold text-blue-600">
                    {formatPercentage(strategy.recommendedMix.debt)}
                  </span>
                </div>
                <Progress
                  value={strategy.recommendedMix.debt}
                  className="h-3"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium mb-2">
                Strategic Rationale
              </div>
              <p className="text-sm text-gray-600">
                This mix balances growth capital needs with control retention,
                optimized for your business stage and financial position.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Funding Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-800">
                    Immediate (0-30 days)
                  </span>
                </div>
                <div className="text-sm text-red-700">
                  {strategy.fundingTimeline.immediate.length} options available
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">
                    Short-term (1-6 months)
                  </span>
                </div>
                <div className="text-sm text-yellow-700">
                  {strategy.fundingTimeline.shortTerm.length} options available
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">
                    Long-term (6+ months)
                  </span>
                </div>
                <div className="text-sm text-green-700">
                  {strategy.fundingTimeline.longTerm.length} options available
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equity vs Debt Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equity Analysis */}
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Equity Funding Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-green-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-green-700">
                  {formatPercentage(strategy.dilutionAnalysis.equityDilution)}
                </div>
                <div className="text-xs text-green-600">Expected Dilution</div>
              </div>
              <div className="text-center bg-blue-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-blue-700">
                  {formatPercentage(
                    strategy.dilutionAnalysis.retainedOwnership,
                  )}
                </div>
                <div className="text-xs text-blue-600">Retained Ownership</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Valuation Estimate</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(strategy.dilutionAnalysis.valuation)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Investor Rights</div>
              <ul className="text-sm space-y-1">
                {strategy.dilutionAnalysis.investorRights.map(
                  (right, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-green-600" />
                      <span className="text-gray-600">{right}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Debt Analysis */}
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Debt Funding Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-blue-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-blue-700">
                  {strategy.debtAnalysis.debtServiceCoverage.toFixed(2)}x
                </div>
                <div className="text-xs text-blue-600">
                  Debt Service Coverage
                </div>
              </div>
              <div className="text-center bg-purple-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-purple-700">
                  {formatPercentage(strategy.debtAnalysis.impactOnCashFlow)}
                </div>
                <div className="text-xs text-purple-600">Cash Flow Impact</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Monthly Payments</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(strategy.debtAnalysis.monthlyPayments)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Total Interest Cost</div>
              <div className="text-xl font-bold text-orange-600">
                {formatCurrency(strategy.debtAnalysis.totalInterestCost)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-600" />
            Risk Assessment & Mitigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="text-sm font-medium text-red-700">
                Equity Risks
              </div>
              <ul className="space-y-2">
                {strategy.riskAssessment.equityRisks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-blue-700">
                Debt Risks
              </div>
              <ul className="space-y-2">
                {strategy.riskAssessment.debtRisks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-green-700">
                Mitigation Strategies
              </div>
              <ul className="space-y-2">
                {strategy.riskAssessment.mitigationStrategies.map(
                  (strategy, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{strategy}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Readiness Improvement Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategy.improvementPlan.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.action}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Expected Impact: {item.expectedImpact}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Timeframe: {item.timeframe}
                    </div>
                  </div>
                </div>
                <Badge className={getPriorityColor(item.priority)}>
                  {item.priority}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="text-sm text-gray-600">
              💡 <strong>Pro Tip:</strong> Implementing high-priority actions
              first can significantly improve your funding terms and approval
              rates.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
