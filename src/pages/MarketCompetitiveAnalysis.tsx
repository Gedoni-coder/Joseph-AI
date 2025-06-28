import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingOverlay } from "@/components/ui/loading-spinner";
import {
  ConnectionStatus,
  DataFreshness,
} from "@/components/ui/connection-status";
import { useMarketCompetitiveData } from "@/hooks/useMarketCompetitiveData";
import { MarketAnalysisComponent } from "@/components/market/market-analysis";
import { CompetitiveAnalysisComponent } from "@/components/market/competitive-analysis";
import {
  Globe,
  Building,
  TrendingUp,
  Target,
  RefreshCw,
  BarChart3,
  Activity,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  PieChart,
  Crown,
  Zap,
  FileText,
} from "lucide-react";

const MarketCompetitiveAnalysis = () => {
  const {
    marketSizes,
    customerSegments,
    marketTrends,
    demandForecasts,
    industryChallenges,
    competitors,
    swotAnalyses,
    competitiveComparisons,
    marketPositioning,
    strategyRecommendations,
    reports,
    selectedCompetitorType,
    selectedTrendCategory,
    selectedTrendImpact,
    selectedRecommendationCategory,
    isLoading,
    isConnected,
    error,
    lastUpdated,
    isAnalyzing,
    refreshData,
    reconnect,
    selectCompetitorType,
    selectTrendCategory,
    selectTrendImpact,
    selectRecommendationCategory,
    runCompetitiveAnalysis,
    generateMarketReport,
    getFilteredCompetitors,
    getFilteredTrends,
    getFilteredRecommendations,
    getMarketOverview,
    getCompetitiveStrength,
    getLatestReport,
  } = useMarketCompetitiveData();

  const handleRefresh = async () => {
    await refreshData();
  };

  const handleRunAnalysis = async (competitorId: string) => {
    await runCompetitiveAnalysis(competitorId);
  };

  const handleGenerateReport = async () => {
    await generateMarketReport("comprehensive");
  };

  const marketOverview = getMarketOverview();
  const competitiveStrength = getCompetitiveStrength();
  const latestReport = getLatestReport();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance text-gray-900">
                    Market & Competitive Analysis
                  </h1>
                  <p className="text-sm text-gray-600">
                    Market intelligence, competitive positioning, and strategic
                    insights
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ConnectionStatus
                isConnected={isConnected}
                lastUpdated={lastUpdated}
                onReconnect={reconnect}
                error={error}
              />
              <DataFreshness
                lastUpdated={lastUpdated}
                isLoading={isLoading}
                autoRefresh={true}
              />
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Activity className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Executive Summary */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Market Overview */}
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-600" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-emerald-700">
                      {formatCurrency(marketOverview.totalMarketSize)}
                    </div>
                    <div className="text-xs text-emerald-600">Total Market</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-700">
                      {marketOverview.marketGrowth.toFixed(1)}%
                    </div>
                    <div className="text-xs text-green-600">Growth Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-700">
                      {formatNumber(marketOverview.customerCount)}
                    </div>
                    <div className="text-xs text-blue-600">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-700">
                      {marketOverview.competitorCount}
                    </div>
                    <div className="text-xs text-purple-600">Competitors</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Competitive Strength */}
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Crown className="h-5 w-5 text-teal-600" />
                  Competitive Strength
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-teal-700">
                      {competitiveStrength.ourMarketShare.toFixed(1)}%
                    </div>
                    <div className="text-xs text-teal-600">Market Share</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-700">
                      #{competitiveStrength.competitiveRank}
                    </div>
                    <div className="text-xs text-orange-600">Market Rank</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-700">
                      {competitiveStrength.brandStrength}%
                    </div>
                    <div className="text-xs text-blue-600">Brand Strength</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-700">
                      {competitiveStrength.innovationScore}%
                    </div>
                    <div className="text-xs text-purple-600">Innovation</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Center */}
            <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-cyan-600" />
                  Intelligence Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleGenerateReport}
                  disabled={isAnalyzing}
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                  size="sm"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>

                {latestReport && (
                  <div className="space-y-2">
                    <div className="text-xs text-cyan-700 font-medium">
                      Latest Report
                    </div>
                    <div className="bg-white/50 p-2 rounded text-xs">
                      <div className="font-medium">
                        {latestReport.reportType
                          .replace("_", " ")
                          .toUpperCase()}
                      </div>
                      <div className="text-gray-600">
                        {new Date(latestReport.reportDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Health: {latestReport.marketHealthScore}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Strength: {latestReport.competitiveStrength}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs">
                  <Badge
                    variant={isConnected ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {isConnected ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    {isConnected ? "Live Intel" : "Offline"}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    {marketTrends.length} Trends
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Metrics Dashboard */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700">Markets Tracked</div>
                    <div className="text-lg font-bold text-blue-900">
                      {marketSizes.length}
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
                    <div className="text-sm text-green-700">
                      High Impact Trends
                    </div>
                    <div className="text-lg font-bold text-green-900">
                      {
                        marketTrends.filter(
                          (t) =>
                            t.impact === "high" ||
                            t.impact === "transformative",
                        ).length
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-600 rounded-lg">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-red-700">
                      Direct Competitors
                    </div>
                    <div className="text-lg font-bold text-red-900">
                      {competitors.filter((c) => c.type === "direct").length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-purple-700">
                      Strategy Recommendations
                    </div>
                    <div className="text-lg font-bold text-purple-900">
                      {strategyRecommendations.length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Analysis Tabs */}
        <section>
          <Tabs defaultValue="market-analysis" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="grid grid-cols-2 w-full sm:w-auto">
                <TabsTrigger
                  value="market-analysis"
                  className="flex items-center gap-2"
                >
                  <PieChart className="h-4 w-4" />
                  Market Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="competitive-analysis"
                  className="flex items-center gap-2"
                >
                  <Building className="h-4 w-4" />
                  Competitive Analysis
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Badge
                  variant={isConnected ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {isConnected ? (
                    <Zap className="h-3 w-3" />
                  ) : (
                    <AlertTriangle className="h-3 w-3" />
                  )}
                  {isConnected ? "Real-time Intel" : "Offline Mode"}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  Last Update: {lastUpdated.toLocaleTimeString()}
                </Badge>
                {error && (
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    Sync Issue
                  </Badge>
                )}
              </div>
            </div>

            <TabsContent value="market-analysis" className="space-y-8">
              <LoadingOverlay
                isLoading={isLoading && !marketSizes.length}
                loadingText="Loading market intelligence..."
              >
                <MarketAnalysisComponent
                  marketSizes={marketSizes}
                  customerSegments={customerSegments}
                  marketTrends={getFilteredTrends()}
                  demandForecasts={demandForecasts}
                  industryChallenges={industryChallenges}
                />
              </LoadingOverlay>
            </TabsContent>

            <TabsContent value="competitive-analysis" className="space-y-8">
              <LoadingOverlay
                isLoading={isLoading && !competitors.length}
                loadingText="Analyzing competitive landscape..."
              >
                <CompetitiveAnalysisComponent
                  competitors={getFilteredCompetitors()}
                  swotAnalyses={swotAnalyses}
                  competitiveComparisons={competitiveComparisons}
                  marketPositioning={marketPositioning}
                  onRunAnalysis={handleRunAnalysis}
                  isAnalyzing={isAnalyzing}
                />
              </LoadingOverlay>
            </TabsContent>
          </Tabs>
        </section>

        {/* Strategic Insights Summary */}
        {latestReport && (
          <section>
            <Card className="border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                  Strategic Insights Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-emerald-700">
                      Key Insights
                    </div>
                    <ul className="space-y-2">
                      {latestReport.keyInsights
                        .slice(0, 4)
                        .map((insight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {insight}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm font-medium text-teal-700">
                      Growth Opportunities
                    </div>
                    <ul className="space-y-2">
                      {latestReport.growthOpportunities
                        .slice(0, 4)
                        .map((opportunity, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Zap className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {opportunity}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Report generated on{" "}
                      {new Date(latestReport.reportDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-700">
                          {latestReport.marketHealthScore}%
                        </div>
                        <div className="text-xs text-emerald-600">
                          Market Health
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-teal-700">
                          {latestReport.competitiveStrength}%
                        </div>
                        <div className="text-xs text-teal-600">
                          Competitive Strength
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>© 2024 Market Intelligence Platform</span>
              <span>•</span>
              <span>Advanced market research and competitive analysis</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                Methods: Market Sizing, SWOT Analysis, Competitive Benchmarking
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketCompetitiveAnalysis;
