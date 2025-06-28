import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Competitor,
  SWOTAnalysis,
  CompetitiveComparison,
  MarketPositioning,
} from "@/lib/market-competitive-data";
import {
  Building,
  Users,
  DollarSign,
  TrendingUp,
  Shield,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Award,
  Calendar,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Crown,
  Briefcase,
} from "lucide-react";

interface CompetitiveAnalysisProps {
  competitors: Competitor[];
  swotAnalyses: SWOTAnalysis[];
  competitiveComparisons: CompetitiveComparison[];
  marketPositioning: MarketPositioning[];
  onRunAnalysis: (competitorId: string) => void;
  isAnalyzing: boolean;
}

export const CompetitiveAnalysisComponent = ({
  competitors,
  swotAnalyses,
  competitiveComparisons,
  marketPositioning,
  onRunAnalysis,
  isAnalyzing,
}: CompetitiveAnalysisProps) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(
    null,
  );

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  const getCompetitorTypeColor = (type: string) => {
    switch (type) {
      case "direct":
        return "bg-red-100 text-red-800 border-red-200";
      case "indirect":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "substitute":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getFundingStageColor = (stage: string) => {
    switch (stage) {
      case "startup":
        return "bg-blue-100 text-blue-800";
      case "growth":
        return "bg-green-100 text-green-800";
      case "mature":
        return "bg-yellow-100 text-yellow-800";
      case "public":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case "leader":
        return "bg-green-100 text-green-800 border-green-200";
      case "challenger":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "follower":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "niche":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getQuadrantIcon = (quadrant: string) => {
    switch (quadrant) {
      case "leader":
        return <Crown className="h-4 w-4" />;
      case "challenger":
        return <Zap className="h-4 w-4" />;
      case "follower":
        return <Users className="h-4 w-4" />;
      case "niche":
        return <Target className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getCompetitiveRankColor = (rank: number) => {
    if (rank >= 8) return "text-green-600";
    if (rank >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getAdvantageColor = (advantage: string) => {
    switch (advantage) {
      case "us":
        return "text-green-600 bg-green-50";
      case "them":
        return "text-red-600 bg-red-50";
      case "neutral":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getSWOTForCompetitor = (competitorId: string) => {
    return swotAnalyses.find((swot) => swot.companyId === competitorId);
  };

  const topCompetitors = competitors
    .sort((a, b) => b.marketShare - a.marketShare)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Competitive Analysis
          </h2>
          <p className="text-gray-600">
            Competitor identification, SWOT analysis, and market positioning
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Building className="h-3 w-3" />
          {competitors.length} Competitors Tracked
        </Badge>
      </div>

      {/* Competitive Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-red-700">Direct Competitors</div>
                <div className="text-lg font-bold text-red-900">
                  {competitors.filter((c) => c.type === "direct").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-green-700">
                  Market Leader Share
                </div>
                <div className="text-lg font-bold text-green-900">
                  {Math.max(...competitors.map((c) => c.marketShare)).toFixed(
                    1,
                  )}
                  %
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
                <div className="text-sm text-blue-700">
                  Total Market Revenue
                </div>
                <div className="text-lg font-bold text-blue-900">
                  {formatCurrency(
                    competitors.reduce((sum, c) => sum + c.revenue, 0),
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-purple-700">
                  Avg Competitive Rank
                </div>
                <div className="text-lg font-bold text-purple-900">
                  {(
                    competitors.reduce((sum, c) => sum + c.competitiveRank, 0) /
                    competitors.length
                  ).toFixed(1)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Competitors */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Key Competitors</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {topCompetitors.map((competitor) => {
            const swot = getSWOTForCompetitor(competitor.id);
            const positioning = marketPositioning.find(
              (p) => p.companyId === competitor.id,
            );

            return (
              <Card
                key={competitor.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {competitor.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={getCompetitorTypeColor(competitor.type)}
                          >
                            {competitor.type}
                          </Badge>
                          <Badge
                            className={getFundingStageColor(
                              competitor.fundingStage,
                            )}
                          >
                            {competitor.fundingStage}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-lg font-bold ${getCompetitiveRankColor(competitor.competitiveRank)}`}
                      >
                        {competitor.competitiveRank}/10
                      </div>
                      <div className="text-xs text-gray-600">Rank</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Market Share</div>
                      <div className="text-xl font-bold">
                        {competitor.marketShare.toFixed(1)}%
                      </div>
                      <Progress
                        value={competitor.marketShare}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Revenue</div>
                      <div className="text-xl font-bold">
                        {formatCurrency(competitor.revenue)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="font-semibold">
                        {formatNumber(competitor.employees)}
                      </div>
                      <div className="text-gray-600">Employees</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">
                        {new Date().getFullYear() - competitor.foundedYear}
                      </div>
                      <div className="text-gray-600">Years Old</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">
                        {competitor.geographicPresence.length}
                      </div>
                      <div className="text-gray-600">Regions</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Key Products</div>
                    <div className="flex flex-wrap gap-1">
                      {competitor.keyProducts
                        .slice(0, 3)
                        .map((product, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {product}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Target Segments</div>
                    <div className="flex flex-wrap gap-1">
                      {competitor.targetSegments.map((segment, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {segment}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {positioning && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">
                          Market Position
                        </div>
                        <Badge
                          className={getQuadrantColor(positioning.quadrant)}
                        >
                          {getQuadrantIcon(positioning.quadrant)}
                          <span className="ml-1 capitalize">
                            {positioning.quadrant}
                          </span>
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-semibold">
                            {positioning.brandStrength}%
                          </div>
                          <div className="text-gray-600">Brand</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">
                            {positioning.customerLoyalty}%
                          </div>
                          <div className="text-gray-600">Loyalty</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">
                            {positioning.innovationScore}%
                          </div>
                          <div className="text-gray-600">Innovation</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => onRunAnalysis(competitor.id)}
                      disabled={isAnalyzing}
                      size="sm"
                      className="flex-1"
                    >
                      {isAnalyzing ? (
                        <>
                          <Activity className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Run Analysis
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedCompetitor(
                          selectedCompetitor === competitor.id
                            ? null
                            : competitor.id,
                        )
                      }
                    >
                      {selectedCompetitor === competitor.id
                        ? "Hide"
                        : "Details"}
                    </Button>
                  </div>

                  {selectedCompetitor === competitor.id && swot && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="space-y-3">
                        <div className="text-sm font-medium">SWOT Analysis</div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-green-700 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Strengths ({swot.strengths.length})
                            </div>
                            <ul className="space-y-1">
                              {swot.strengths
                                .slice(0, 2)
                                .map((strength, index) => (
                                  <li
                                    key={index}
                                    className="text-xs text-gray-600 flex items-start gap-1"
                                  >
                                    <Star className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                    {strength.description}
                                  </li>
                                ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <div className="text-xs font-medium text-red-700 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Weaknesses ({swot.weaknesses.length})
                            </div>
                            <ul className="space-y-1">
                              {swot.weaknesses
                                .slice(0, 2)
                                .map((weakness, index) => (
                                  <li
                                    key={index}
                                    className="text-xs text-gray-600 flex items-start gap-1"
                                  >
                                    <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                    {weakness.description}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-blue-700 flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              Opportunities ({swot.opportunities.length})
                            </div>
                            <ul className="space-y-1">
                              {swot.opportunities
                                .slice(0, 2)
                                .map((opportunity, index) => (
                                  <li
                                    key={index}
                                    className="text-xs text-gray-600 flex items-start gap-1"
                                  >
                                    <Zap className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                    {opportunity.description}
                                  </li>
                                ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <div className="text-xs font-medium text-orange-700 flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              Threats ({swot.threats.length})
                            </div>
                            <ul className="space-y-1">
                              {swot.threats.slice(0, 2).map((threat, index) => (
                                <li
                                  key={index}
                                  className="text-xs text-gray-600 flex items-start gap-1"
                                >
                                  <Shield className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                                  {threat.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Competitive Comparisons */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Competitive Benchmarking</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {competitiveComparisons.map((comparison) => (
            <Card
              key={comparison.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{comparison.metric}</CardTitle>
                  <Badge variant="outline" className="text-xs capitalize">
                    {comparison.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium">Our Value</div>
                    <div className="text-lg font-bold text-blue-900">
                      {typeof comparison.ourValue === "number"
                        ? comparison.ourValue.toLocaleString()
                        : comparison.ourValue}
                    </div>
                  </div>

                  {comparison.competitors.map((comp, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded ${getAdvantageColor(comp.advantage)}`}
                    >
                      <div className="text-sm font-medium">
                        {comp.competitorName}
                      </div>
                      <div className="font-semibold">
                        {typeof comp.value === "number"
                          ? comp.value.toLocaleString()
                          : comp.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Customer Satisfaction</span>
                      <span className="font-semibold">
                        {comparison.customerSatisfaction}%
                      </span>
                    </div>
                    <Progress
                      value={comparison.customerSatisfaction}
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Differentiation</span>
                      <span className="font-semibold">
                        {comparison.differentiationPotential}%
                      </span>
                    </div>
                    <Progress
                      value={comparison.differentiationPotential}
                      className="h-2"
                    />
                  </div>
                </div>

                <Badge
                  className={`w-full justify-center ${
                    comparison.importance === "critical"
                      ? "bg-red-100 text-red-800"
                      : comparison.importance === "high"
                        ? "bg-orange-100 text-orange-800"
                        : comparison.importance === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                  }`}
                >
                  {comparison.importance.toUpperCase()} IMPORTANCE
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Market Positioning Map */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Market Positioning</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Competitive Positioning Matrix
            </CardTitle>
            <p className="text-sm text-gray-600">
              Position based on value proposition (x-axis) and pricing (y-axis)
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
              {/* Axis Labels */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium">
                Value Proposition →
              </div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium">
                ← Pricing
              </div>

              {/* Quadrant Labels */}
              <div className="absolute top-4 left-4 text-xs text-gray-500 font-medium">
                High Price, Low Value
              </div>
              <div className="absolute top-4 right-4 text-xs text-gray-500 font-medium">
                High Price, High Value
              </div>
              <div className="absolute bottom-8 left-4 text-xs text-gray-500 font-medium">
                Low Price, Low Value
              </div>
              <div className="absolute bottom-8 right-4 text-xs text-gray-500 font-medium">
                Low Price, High Value
              </div>

              {/* Center Lines */}
              <div className="absolute top-6 bottom-6 left-1/2 w-px bg-gray-300"></div>
              <div className="absolute left-6 right-6 top-1/2 h-px bg-gray-300"></div>

              {/* Positioning Points */}
              {marketPositioning.map((position) => (
                <div
                  key={position.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${6 + (position.position.x / 100) * 88}%`,
                    top: `${6 + ((100 - position.position.y) / 100) * 76}%`,
                  }}
                >
                  <div
                    className={`p-2 rounded-lg border-2 ${
                      position.companyId === "own"
                        ? "bg-blue-600 text-white border-blue-700"
                        : "bg-white text-gray-800 border-gray-300"
                    } shadow-md`}
                  >
                    <div className="text-xs font-medium">
                      {position.company}
                    </div>
                    <div className="text-xs opacity-75">
                      {position.marketShare.toFixed(1)}% share
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {marketPositioning.map((position) => (
                <div key={position.id} className="text-center">
                  <div
                    className={`p-2 rounded-lg ${
                      position.companyId === "own"
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="font-medium text-sm">
                      {position.company}
                    </div>
                    <Badge
                      className={getQuadrantColor(position.quadrant)}
                      size="sm"
                    >
                      {position.quadrant}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
