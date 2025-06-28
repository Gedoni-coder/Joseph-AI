import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RiskAnalysis } from "@/lib/feasibility-data";
import {
  AlertTriangle,
  TrendingDown,
  Shield,
  Activity,
  Users,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskAnalysisProps {
  riskData: RiskAnalysis;
  title?: string;
}

export function RiskAnalysisComponent({
  riskData,
  title = "Risk Analysis",
}: RiskAnalysisProps) {
  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-red-600 bg-red-100";
    if (score >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return "High Risk";
    if (score >= 40) return "Medium Risk";
    return "Low Risk";
  };

  const getRiskIcon = (type: string) => {
    switch (type) {
      case "market":
        return <Activity className="h-4 w-4" />;
      case "technical":
        return <Shield className="h-4 w-4" />;
      case "financial":
        return <DollarSign className="h-4 w-4" />;
      case "operational":
        return <Users className="h-4 w-4" />;
      case "competitive":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const riskCategories = [
    { name: "Market Risk", score: riskData.marketRisk, type: "market" },
    {
      name: "Technical Risk",
      score: riskData.technicalRisk,
      type: "technical",
    },
    {
      name: "Financial Risk",
      score: riskData.financialRisk,
      type: "financial",
    },
    {
      name: "Operational Risk",
      score: riskData.operationalRisk,
      type: "operational",
    },
    {
      name: "Competitive Risk",
      score: riskData.competitiveRisk,
      type: "competitive",
    },
  ];

  const getModeColor = (mode: string) => {
    switch (mode) {
      case "conservative":
        return "bg-red-100 text-red-800 border-red-200";
      case "safe":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "wild":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Badge className={cn("text-xs", getModeColor(riskData.mode))}>
            {riskData.mode} mode
          </Badge>
          <Badge
            className={cn(
              "text-xs",
              getRiskColor(riskData.overallRiskScore),
              "border",
            )}
          >
            {getRiskLevel(riskData.overallRiskScore)}
          </Badge>
        </div>
      </div>

      {/* Overall Risk Score */}
      <Card className="border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Overall Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {riskData.overallRiskScore.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Risk Score</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">
                  {getRiskLevel(riskData.overallRiskScore)}
                </div>
                <div className="text-sm text-gray-600">Risk Level</div>
              </div>
            </div>
            <Progress
              value={riskData.overallRiskScore}
              className={cn(
                "h-3",
                riskData.overallRiskScore >= 70
                  ? "[&>div]:bg-red-500"
                  : riskData.overallRiskScore >= 40
                    ? "[&>div]:bg-yellow-500"
                    : "[&>div]:bg-green-500",
              )}
            />
            <div className="text-xs text-gray-600">
              Risk score based on {riskData.mode} analysis assumptions
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {riskCategories.map((category) => (
          <Card
            key={category.type}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      getRiskColor(category.score),
                    )}
                  >
                    {getRiskIcon(category.type)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-gray-600">
                      {getRiskLevel(category.score)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Risk Level</span>
                    <span className="font-semibold">
                      {category.score.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={category.score}
                    className={cn(
                      "h-2",
                      category.score >= 70
                        ? "[&>div]:bg-red-500"
                        : category.score >= 40
                          ? "[&>div]:bg-yellow-500"
                          : "[&>div]:bg-green-500",
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Risk Factors and Mitigation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-base text-red-800">
              Key Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-2">
              {riskData.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{factor}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-base text-green-800">
              Mitigation Strategies
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-2">
              {riskData.mitigationStrategies.map((strategy, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{strategy}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Risk Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Risk Impact Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-2 text-xs">
              <div></div>
              <div className="text-center font-medium">Very Low</div>
              <div className="text-center font-medium">Low</div>
              <div className="text-center font-medium">Medium</div>
              <div className="text-center font-medium">High</div>
              <div className="text-center font-medium">Very High</div>

              {["Very High", "High", "Medium", "Low", "Very Low"].map(
                (probability, rowIndex) => (
                  <div key={probability} className="contents">
                    <div className="font-medium text-xs py-2">
                      {probability}
                    </div>
                    {[1, 2, 3, 4, 5].map((impact) => {
                      const riskLevel = (5 - rowIndex) * impact;
                      const bgColor =
                        riskLevel >= 20
                          ? "bg-red-200"
                          : riskLevel >= 12
                            ? "bg-yellow-200"
                            : riskLevel >= 6
                              ? "bg-green-200"
                              : "bg-gray-100";
                      return (
                        <div
                          key={impact}
                          className={cn(
                            "h-8 border border-gray-300 rounded",
                            bgColor,
                          )}
                        />
                      );
                    })}
                  </div>
                ),
              )}
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-200 border border-gray-300 rounded" />
                <span>High Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-200 border border-gray-300 rounded" />
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-200 border border-gray-300 rounded" />
                <span>Low Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded" />
                <span>Minimal Risk</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
