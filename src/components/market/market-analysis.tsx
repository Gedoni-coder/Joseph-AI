import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MarketSize,
  CustomerSegment,
  MarketTrend,
  DemandForecast,
  IndustryChallenge,
} from "@/lib/market-competitive-data";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Globe,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Clock,
} from "lucide-react";

interface MarketAnalysisProps {
  marketSizes: MarketSize[];
  customerSegments: CustomerSegment[];
  marketTrends: MarketTrend[];
  demandForecasts: DemandForecast[];
  industryChallenges: IndustryChallenge[];
}

export const MarketAnalysisComponent = ({
  marketSizes,
  customerSegments,
  marketTrends,
  demandForecasts,
  industryChallenges,
}: MarketAnalysisProps) => {
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

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case "emerging":
        return "bg-blue-100 text-blue-800";
      case "growth":
        return "bg-green-100 text-green-800";
      case "mature":
        return "bg-yellow-100 text-yellow-800";
      case "declining":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "transformative":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTrendIcon = (status: string) => {
    switch (status) {
      case "emerging":
        return <Sparkles className="h-4 w-4 text-blue-600" />;
      case "accelerating":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "peaking":
        return <ArrowUpRight className="h-4 w-4 text-orange-600" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChallengeTypeIcon = (type: string) => {
    switch (type) {
      case "challenge":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "opportunity":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  // Calculate totals
  const totalTAM = marketSizes.reduce(
    (sum, market) => sum + market.totalAddressableMarket,
    0,
  );
  const totalCustomers = customerSegments.reduce(
    (sum, segment) => sum + segment.size,
    0,
  );
  const totalRevenue = customerSegments.reduce(
    (sum, segment) => sum + segment.revenue,
    0,
  );
  const avgGrowthRate =
    marketSizes.length > 0
      ? marketSizes.reduce((sum, market) => sum + market.growthRate, 0) /
        marketSizes.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Market Analysis</h2>
          <p className="text-gray-600">
            Market size, growth rates, customer segments, and demand forecasting
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Globe className="h-3 w-3" />
          {marketSizes.length} Markets Tracked
        </Badge>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-blue-700">Total TAM</div>
                <div className="text-lg font-bold text-blue-900">
                  {formatCurrency(totalTAM)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-green-700">Avg Growth Rate</div>
                <div className="text-lg font-bold text-green-900">
                  {avgGrowthRate.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-purple-700">Total Customers</div>
                <div className="text-lg font-bold text-purple-900">
                  {formatNumber(totalCustomers)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-orange-700">Total Revenue</div>
                <div className="text-lg font-bold text-orange-900">
                  {formatCurrency(totalRevenue)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Sizes */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Market Size & Growth</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {marketSizes.map((market) => (
            <Card key={market.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{market.market}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getMaturityColor(market.marketMaturity)}>
                      {market.marketMaturity}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {market.geographicScope}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">TAM</span>
                    <span className="font-semibold">
                      {formatCurrency(market.totalAddressableMarket)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SAM</span>
                    <span className="font-semibold">
                      {formatCurrency(market.serviceableMarket)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Size</span>
                    <span className="font-semibold">
                      {formatCurrency(market.currentMarketSize)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Growth Rate</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-green-600">
                        {market.growthRate.toFixed(1)}%
                      </span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <Progress value={market.growthRate} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="font-semibold">{market.confidence}%</span>
                  </div>
                  <Progress value={market.confidence} className="h-2" />
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <div>Timeframe: {market.timeframe}</div>
                  <div>Source: {market.dataSource}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Customer Segments */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Customer Segments</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {customerSegments.map((segment) => (
            <Card
              key={segment.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{segment.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {formatNumber(segment.size)} customers
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {segment.growthRate.toFixed(1)}% growth
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-700">Revenue</div>
                    <div className="text-lg font-bold text-green-900">
                      {formatCurrency(segment.revenue)}
                    </div>
                  </div>
                  <div className="text-center bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-blue-700">LTV</div>
                    <div className="text-lg font-bold text-blue-900">
                      {formatCurrency(segment.lifetimeValue)}
                    </div>
                  </div>
                  <div className="text-center bg-orange-50 p-3 rounded-lg">
                    <div className="text-sm text-orange-700">CAC</div>
                    <div className="text-lg font-bold text-orange-900">
                      {formatCurrency(segment.acquisitionCost)}
                    </div>
                  </div>
                  <div className="text-center bg-purple-50 p-3 rounded-lg">
                    <div className="text-sm text-purple-700">Loyalty</div>
                    <div className="text-lg font-bold text-purple-900">
                      {segment.loyaltyScore}%
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Demographics</div>
                  <div className="text-xs space-y-1">
                    <div>
                      <strong>Age:</strong> {segment.demographics.ageRange}
                    </div>
                    <div>
                      <strong>Income:</strong> {segment.demographics.income}
                    </div>
                    <div>
                      <strong>Location:</strong> {segment.demographics.location}
                    </div>
                    <div>
                      <strong>Behavior:</strong> {segment.demographics.behavior}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Metrics</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">Conversion:</span>
                      <span className="ml-1 font-semibold">
                        {segment.conversionRate}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Churn:</span>
                      <span className="ml-1 font-semibold">
                        {segment.churnRate}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Preferred Channels</div>
                  <div className="flex flex-wrap gap-1">
                    {segment.preferredChannels
                      .slice(0, 3)
                      .map((channel, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {channel}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Market Trends */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Market Trends & Dynamics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {marketTrends.map((trend) => (
            <Card key={trend.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      {getTrendIcon(trend.trendStatus)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{trend.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {trend.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {trend.timeframe.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className={getImpactColor(trend.impact)}>
                    {trend.impact}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{trend.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Adoption Rate</span>
                    <span className="font-semibold">{trend.adoptionRate}%</span>
                  </div>
                  <Progress value={trend.adoptionRate} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="font-semibold">{trend.confidence}%</span>
                  </div>
                  <Progress value={trend.confidence} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Opportunities
                  </div>
                  <ul className="text-xs space-y-1">
                    {trend.businessOpportunities
                      .slice(0, 3)
                      .map((opportunity, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-gray-600">{opportunity}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Threats
                  </div>
                  <ul className="text-xs space-y-1">
                    {trend.threats.slice(0, 2).map((threat, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-gray-600">{threat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Demand Forecasts */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Demand Forecasting</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {demandForecasts.map((forecast) => (
            <Card
              key={forecast.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{forecast.product}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {forecast.forecastMethod.replace("_", " ")}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {forecast.timeframe}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-700">Optimistic</div>
                    <div className="text-lg font-bold text-green-900">
                      {formatNumber(forecast.demandScenarios.optimistic)}
                    </div>
                  </div>
                  <div className="text-center bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-blue-700">Base Case</div>
                    <div className="text-lg font-bold text-blue-900">
                      {formatNumber(forecast.demandScenarios.base)}
                    </div>
                  </div>
                  <div className="text-center bg-orange-50 p-3 rounded-lg">
                    <div className="text-sm text-orange-700">Pessimistic</div>
                    <div className="text-lg font-bold text-orange-900">
                      {formatNumber(forecast.demandScenarios.pessimistic)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Forecast Accuracy
                    </span>
                    <span className="font-semibold">{forecast.accuracy}%</span>
                  </div>
                  <Progress value={forecast.accuracy} className="h-2" />
                </div>

                {forecast.seasonality.hasSeasonality && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Seasonality ({forecast.seasonality.variance}% variance)
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-green-600 font-medium">
                          Peak:
                        </span>
                        <span className="ml-1">
                          {forecast.seasonality.peakMonths.join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-red-600 font-medium">Low:</span>
                        <span className="ml-1">
                          {forecast.seasonality.lowMonths.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Drivers</div>
                  <div className="flex flex-wrap gap-1">
                    {forecast.keyDrivers.slice(0, 3).map((driver, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {driver}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Last updated:{" "}
                  {new Date(forecast.lastUpdated).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Industry Challenges & Opportunities */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Industry Challenges & Opportunities
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {industryChallenges.map((challenge) => (
            <Card
              key={challenge.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        challenge.type === "opportunity"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {getChallengeTypeIcon(challenge.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {challenge.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="text-xs capitalize mt-1"
                      >
                        {challenge.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={getImpactColor(challenge.severity)}>
                    {challenge.severity}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{challenge.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Probability</span>
                      <span className="font-semibold">
                        {challenge.probability}%
                      </span>
                    </div>
                    <Progress value={challenge.probability} className="h-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Time to Impact</div>
                    <div className="text-lg font-bold flex items-center justify-center gap-1">
                      <Clock className="h-4 w-4" />
                      {challenge.timeToImpact} months
                    </div>
                  </div>
                </div>

                {challenge.type === "opportunity" &&
                  challenge.opportunityValue > 0 && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm text-green-700">
                        Opportunity Value
                      </div>
                      <div className="text-xl font-bold text-green-900">
                        {formatCurrency(challenge.opportunityValue)}
                      </div>
                    </div>
                  )}

                {challenge.type === "challenge" && challenge.riskValue > 0 && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-sm text-red-700">Risk Value</div>
                    <div className="text-xl font-bold text-red-900">
                      {formatCurrency(challenge.riskValue)}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    Mitigation Strategies
                  </div>
                  <ul className="text-xs space-y-1">
                    {challenge.mitigationStrategies
                      .slice(0, 3)
                      .map((strategy, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-gray-600">{strategy}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    Affected Stakeholders
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {challenge.affectedStakeholders
                      .slice(0, 3)
                      .map((stakeholder, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {stakeholder}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
