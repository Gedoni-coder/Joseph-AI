import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StrategyRecommendation } from "@/lib/policy-economic-data";
import {
  Target,
  TrendingUp,
  Shield,
  Zap,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  BarChart3,
  Settings,
  Star,
  ArrowRight,
  Calendar,
  Award,
} from "lucide-react";

interface StrategyRecommendationsProps {
  recommendations: StrategyRecommendation[];
}

export const StrategyRecommendationsComponent = ({
  recommendations,
}: StrategyRecommendationsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "policy_adaptation":
        return <Settings className="h-4 w-4" />;
      case "economic_mitigation":
        return <Shield className="h-4 w-4" />;
      case "opportunity_capture":
        return <Target className="h-4 w-4" />;
      case "risk_management":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "policy_adaptation":
        return "bg-purple-100 text-purple-800";
      case "economic_mitigation":
        return "bg-blue-100 text-blue-800";
      case "opportunity_capture":
        return "bg-green-100 text-green-800";
      case "risk_management":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getROI = (benefit: number, cost: number) => {
    if (cost === 0) return 0;
    return ((benefit - cost) / cost) * 100;
  };

  const getRiskLevel = (probability: number) => {
    if (probability >= 80)
      return { level: "Low Risk", color: "text-green-600" };
    if (probability >= 60)
      return { level: "Medium Risk", color: "text-yellow-600" };
    return { level: "High Risk", color: "text-red-600" };
  };

  // Group recommendations by priority
  const urgentRecs = recommendations.filter((r) => r.priority === "urgent");
  const highRecs = recommendations.filter((r) => r.priority === "high");
  const mediumRecs = recommendations.filter((r) => r.priority === "medium");
  const lowRecs = recommendations.filter((r) => r.priority === "low");

  // Calculate totals
  const totalBenefit = recommendations.reduce(
    (sum, r) => sum + r.expectedBenefit,
    0,
  );
  const totalCost = recommendations.reduce(
    (sum, r) => sum + r.implementationCost,
    0,
  );
  const avgROI =
    recommendations.length > 0 ? getROI(totalBenefit, totalCost) : 0;
  const avgSuccessRate =
    recommendations.length > 0
      ? recommendations.reduce((sum, r) => sum + r.successProbability, 0) /
        recommendations.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Strategy Recommendations
          </h2>
          <p className="text-gray-600">
            Actionable strategies for policy adaptation and economic resilience
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          {recommendations.length} Recommendations
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-green-700">Expected Benefit</div>
                <div className="text-lg font-bold text-green-900">
                  {formatCurrency(totalBenefit)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-blue-700">Implementation Cost</div>
                <div className="text-lg font-bold text-blue-900">
                  {formatCurrency(totalCost)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-purple-700">Average ROI</div>
                <div className="text-lg font-bold text-purple-900">
                  {avgROI.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-orange-700">Success Rate</div>
                <div className="text-lg font-bold text-orange-900">
                  {avgSuccessRate.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Sections */}
      {urgentRecs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h3 className="text-xl font-semibold text-red-900">
              Urgent Recommendations
            </h3>
            <Badge className="bg-red-100 text-red-800">
              {urgentRecs.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {urgentRecs.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </section>
      )}

      {highRecs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-orange-600" />
            <h3 className="text-xl font-semibold text-orange-900">
              High Priority Recommendations
            </h3>
            <Badge className="bg-orange-100 text-orange-800">
              {highRecs.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {highRecs.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </section>
      )}

      {mediumRecs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-900">
              Medium Priority Recommendations
            </h3>
            <Badge className="bg-blue-100 text-blue-800">
              {mediumRecs.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mediumRecs.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </section>
      )}

      {lowRecs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="text-xl font-semibold text-green-900">
              Low Priority Recommendations
            </h3>
            <Badge className="bg-green-100 text-green-800">
              {lowRecs.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {lowRecs.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </section>
      )}

      {recommendations.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Recommendations Available
            </h3>
            <p className="text-gray-600">
              Strategy recommendations will appear here based on policy and
              economic analysis.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Recommendation Card Component
const RecommendationCard = ({
  recommendation,
}: {
  recommendation: StrategyRecommendation;
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "policy_adaptation":
        return <Settings className="h-4 w-4" />;
      case "economic_mitigation":
        return <Shield className="h-4 w-4" />;
      case "opportunity_capture":
        return <Target className="h-4 w-4" />;
      case "risk_management":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "policy_adaptation":
        return "bg-purple-100 text-purple-800";
      case "economic_mitigation":
        return "bg-blue-100 text-blue-800";
      case "opportunity_capture":
        return "bg-green-100 text-green-800";
      case "risk_management":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getROI = (benefit: number, cost: number) => {
    if (cost === 0) return 0;
    return ((benefit - cost) / cost) * 100;
  };

  const getRiskLevel = (probability: number) => {
    if (probability >= 80)
      return { level: "Low Risk", color: "text-green-600" };
    if (probability >= 60)
      return { level: "Medium Risk", color: "text-yellow-600" };
    return { level: "High Risk", color: "text-red-600" };
  };

  const roi = getROI(
    recommendation.expectedBenefit,
    recommendation.implementationCost,
  );
  const riskLevel = getRiskLevel(recommendation.successProbability);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg ${getTypeColor(recommendation.type)}`}
            >
              {getTypeIcon(recommendation.type)}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{recommendation.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  className={`text-xs ${getTypeColor(recommendation.type)}`}
                >
                  {recommendation.type.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </div>
          <Badge className={`${getPriorityColor(recommendation.priority)}`}>
            {recommendation.priority}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{recommendation.description}</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm text-green-700">Expected Benefit</div>
              <div className="text-lg font-bold text-green-900">
                {formatCurrency(recommendation.expectedBenefit)}
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-blue-700">Implementation Cost</div>
              <div className="text-lg font-bold text-blue-900">
                {formatCurrency(recommendation.implementationCost)}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm text-purple-700">ROI</div>
              <div className="text-lg font-bold text-purple-900">
                {roi.toFixed(1)}%
              </div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-sm text-orange-700">Timeline</div>
              <div className="text-lg font-bold text-orange-900">
                {recommendation.timeToImplement} months
              </div>
            </div>
          </div>
        </div>

        {/* Success Probability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Success Probability</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {recommendation.successProbability}%
              </span>
              <span className={`text-xs ${riskLevel.color}`}>
                {riskLevel.level}
              </span>
            </div>
          </div>
          <Progress value={recommendation.successProbability} className="h-2" />
        </div>

        {/* Required Resources */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Required Resources</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {recommendation.requiredResources
              .slice(0, 3)
              .map((resource, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {resource}
                </Badge>
              ))}
            {recommendation.requiredResources.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{recommendation.requiredResources.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Success Metrics</span>
          </div>
          <ul className="text-xs space-y-1">
            {recommendation.keyMetrics.slice(0, 3).map((metric, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                <span className="text-gray-600">{metric}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Factors */}
        {recommendation.riskFactors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">
                Risk Factors
              </span>
            </div>
            <ul className="text-xs space-y-1">
              {recommendation.riskFactors.slice(0, 2).map((risk, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-gray-600">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Dependencies */}
        {recommendation.dependencies.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Dependencies</span>
            </div>
            <ul className="text-xs space-y-1">
              {recommendation.dependencies
                .slice(0, 2)
                .map((dependency, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{dependency}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <Button className="w-full" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Implement Strategy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
