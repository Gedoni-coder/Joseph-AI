import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EconomicIndicator, EconomicImpact } from "@/lib/policy-economic-data";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
} from "lucide-react";

interface EconomicImpactAnalysisProps {
  indicators: EconomicIndicator[];
  impacts: EconomicImpact[];
  selectedSeverity: "all" | "low" | "medium" | "high" | "critical";
  selectedTimeframe:
    | "all"
    | "immediate"
    | "short_term"
    | "medium_term"
    | "long_term";
  onSeverityChange: (
    severity: "all" | "low" | "medium" | "high" | "critical",
  ) => void;
  onTimeframeChange: (
    timeframe: "all" | "immediate" | "short_term" | "medium_term" | "long_term",
  ) => void;
}

export const EconomicImpactAnalysisComponent = ({
  indicators,
  impacts,
  selectedSeverity,
  selectedTimeframe,
  onSeverityChange,
  onTimeframeChange,
}: EconomicImpactAnalysisProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "rising":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "falling":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "stable":
        return <Minus className="h-4 w-4 text-gray-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "rising":
        return "text-green-600 bg-green-50";
      case "falling":
        return "text-red-600 bg-red-50";
      case "stable":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case "immediate":
        return "bg-red-100 text-red-800";
      case "short_term":
        return "bg-orange-100 text-orange-800";
      case "medium_term":
        return "bg-blue-100 text-blue-800";
      case "long_term":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactTypeIcon = (type: string) => {
    switch (type) {
      case "revenue":
        return <DollarSign className="h-4 w-4" />;
      case "costs":
        return <TrendingUp className="h-4 w-4" />;
      case "operations":
        return <Activity className="h-4 w-4" />;
      case "investment":
        return <Target className="h-4 w-4" />;
      case "strategy":
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <LineChart className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "macro":
        return <BarChart3 className="h-4 w-4" />;
      case "sector":
        return <PieChart className="h-4 w-4" />;
      case "market":
        return <LineChart className="h-4 w-4" />;
      case "financial":
        return <DollarSign className="h-4 w-4" />;
      case "operational":
        return <Activity className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getImpactDirection = (value: number) => {
    if (value > 0) {
      return {
        icon: ArrowUpRight,
        color: "text-green-600",
        label: "Positive Impact",
      };
    }
    return {
      icon: ArrowDownRight,
      color: "text-red-600",
      label: "Negative Impact",
    };
  };

  // Calculate overview metrics
  const totalPositiveImpact = impacts
    .filter((impact) => impact.estimatedFinancialImpact > 0)
    .reduce((sum, impact) => sum + impact.estimatedFinancialImpact, 0);

  const totalNegativeImpact = impacts
    .filter((impact) => impact.estimatedFinancialImpact < 0)
    .reduce(
      (sum, impact) => sum + Math.abs(impact.estimatedFinancialImpact),
      0,
    );

  const highRiskImpacts = impacts.filter(
    (impact) => impact.severity === "high" || impact.severity === "critical",
  ).length;

  const immediateImpacts = impacts.filter(
    (impact) => impact.timeframe === "immediate",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Economic Impact Analysis
          </h2>
          <p className="text-gray-600">
            Market forces, economic trends, and business impact assessment
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Activity className="h-3 w-3" />
          {indicators.length} Indicators Tracked
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Severity:</span>
          <div className="flex gap-1">
            {["all", "low", "medium", "high", "critical"].map((severity) => (
              <Button
                key={severity}
                variant={selectedSeverity === severity ? "default" : "outline"}
                size="sm"
                onClick={() => onSeverityChange(severity as any)}
                className="capitalize"
              >
                {severity}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Timeframe:</span>
          <div className="flex gap-1">
            {["all", "immediate", "short_term", "medium_term", "long_term"].map(
              (timeframe) => (
                <Button
                  key={timeframe}
                  variant={
                    selectedTimeframe === timeframe ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => onTimeframeChange(timeframe as any)}
                  className="capitalize"
                >
                  {timeframe.replace("_", " ")}
                </Button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-green-700">Positive Impact</div>
                <div className="text-lg font-bold text-green-900">
                  {formatCurrency(totalPositiveImpact)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <ArrowDownRight className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-red-700">Negative Impact</div>
                <div className="text-lg font-bold text-red-900">
                  {formatCurrency(totalNegativeImpact)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-orange-700">High Risk Impacts</div>
                <div className="text-lg font-bold text-orange-900">
                  {highRiskImpacts}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-purple-700">Immediate Impacts</div>
                <div className="text-lg font-bold text-purple-900">
                  {immediateImpacts}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Economic Indicators */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Economic Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {indicators.map((indicator) => (
            <Card
              key={indicator.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 rounded">
                      {getCategoryIcon(indicator.category)}
                    </div>
                    <div>
                      <CardTitle className="text-sm">
                        {indicator.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs capitalize">
                        {indicator.category}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className={`p-1 rounded ${getTrendColor(indicator.trend)}`}
                  >
                    {getTrendIcon(indicator.trend)}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Value</span>
                    <span className="font-semibold">
                      {indicator.currentValue.toFixed(2)} {indicator.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Previous Value
                    </span>
                    <span className="text-sm">
                      {indicator.previousValue.toFixed(2)} {indicator.unit}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Volatility</span>
                    <span className="font-semibold">
                      {indicator.volatility}%
                    </span>
                  </div>
                  <Progress value={indicator.volatility} className="h-1.5" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Confidence Level</span>
                    <span className="font-semibold">
                      {indicator.confidenceLevel}%
                    </span>
                  </div>
                  <Progress
                    value={indicator.confidenceLevel}
                    className="h-1.5"
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Source: {indicator.source}
                  </span>
                  <Badge
                    variant="outline"
                    className={`${
                      indicator.impactDirection === "positive"
                        ? "text-green-600"
                        : indicator.impactDirection === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {indicator.impactDirection}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Economic Impacts */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Business Impact Assessment
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {impacts.map((impact) => {
            const impactDirection = getImpactDirection(
              impact.estimatedFinancialImpact,
            );

            return (
              <Card
                key={impact.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        {getImpactTypeIcon(impact.impactType)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {impact.businessArea}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {impact.impactType}
                          </Badge>
                          <Badge
                            className={`text-xs ${getTimeframeColor(impact.timeframe)}`}
                          >
                            {impact.timeframe.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getSeverityColor(impact.severity)}`}>
                      {impact.severity}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{impact.description}</p>

                  {/* Financial Impact */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                      <impactDirection.icon
                        className={`h-5 w-5 ${impactDirection.color}`}
                      />
                      <span className="text-sm font-medium">
                        {impactDirection.label}
                      </span>
                    </div>
                    <div
                      className={`text-lg font-bold ${impactDirection.color}`}
                    >
                      {impact.estimatedFinancialImpact < 0 ? "-" : "+"}
                      {formatCurrency(impact.estimatedFinancialImpact)}
                    </div>
                  </div>

                  {/* Probability and Opportunity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Probability</span>
                        <span className="font-semibold">
                          {impact.probabilityOfOccurrence}%
                        </span>
                      </div>
                      <Progress
                        value={impact.probabilityOfOccurrence}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Opportunity</span>
                        <span className="font-semibold">
                          {impact.opportunityPotential}%
                        </span>
                      </div>
                      <Progress
                        value={impact.opportunityPotential}
                        className="h-2"
                      />
                    </div>
                  </div>

                  {/* Mitigation Strategies */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">
                        Mitigation Strategies
                      </span>
                    </div>
                    <ul className="text-xs space-y-1">
                      {impact.mitigationStrategies
                        .slice(0, 3)
                        .map((strategy, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Zap className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{strategy}</span>
                          </li>
                        ))}
                      {impact.mitigationStrategies.length > 3 && (
                        <li className="text-gray-500 italic ml-5">
                          +{impact.mitigationStrategies.length - 3} more
                          strategies
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {impacts.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Economic Impacts Found
            </h3>
            <p className="text-gray-600">
              Economic impacts matching your filters will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
