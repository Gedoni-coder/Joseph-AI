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
import { usePolicyEconomicData } from "@/hooks/usePolicyEconomicData";
import { ExternalPolicyAnalysisComponent } from "@/components/policy/external-policy-analysis";
import { InternalPolicyAnalysisComponent } from "@/components/policy/internal-policy-analysis";
import { EconomicImpactAnalysisComponent } from "@/components/policy/economic-impact-analysis";
import { StrategyRecommendationsComponent } from "@/components/policy/strategy-recommendations";
import {
  Globe,
  Building,
  TrendingUp,
  Target,
  RefreshCw,
  Scale,
  Activity,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Clock,
  FileText,
  Shield,
  Zap,
} from "lucide-react";

const PolicyEconomicAnalysis = () => {
  const {
    policies,
    policyAnalyses,
    economicIndicators,
    economicImpacts,
    strategyRecommendations,
    reports,
    selectedPolicyCategory,
    selectedImpactSeverity,
    selectedTimeframe,
    isLoading,
    isConnected,
    error,
    lastUpdated,
    isAnalyzing,
    refreshData,
    reconnect,
    selectPolicyCategory,
    selectImpactSeverity,
    selectTimeframe,
    runPolicyAnalysis,
    generateReport,
    getFilteredPolicies,
    getFilteredEconomicImpacts,
    getComplianceOverview,
    getEconomicOverview,
    getLatestReport,
  } = usePolicyEconomicData();

  const handleRefresh = async () => {
    await refreshData();
  };

  const handleRunAnalysis = async (policyId: string) => {
    await runPolicyAnalysis(policyId);
  };

  const handleGenerateReport = async () => {
    await generateReport("comprehensive");
  };

  const complianceOverview = getComplianceOverview();
  const economicOverview = getEconomicOverview();
  const latestReport = getLatestReport();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance text-gray-900">
                    Policy & Economic Impact Analysis
                  </h1>
                  <p className="text-sm text-gray-600">
                    Comprehensive policy compliance and economic resilience
                    assessment
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
            {/* Policy Compliance Summary */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Scale className="h-5 w-5 text-purple-600" />
                  Policy Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-700">
                      {complianceOverview.averageCompliance}%
                    </div>
                    <div className="text-xs text-purple-600">
                      Avg Compliance
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-700">
                      {complianceOverview.criticalGaps}
                    </div>
                    <div className="text-xs text-red-600">Critical Gaps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-700">
                      {formatCurrency(complianceOverview.totalCost)}
                    </div>
                    <div className="text-xs text-orange-600">
                      Resolution Cost
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-700">
                      {complianceOverview.averageRisk}%
                    </div>
                    <div className="text-xs text-blue-600">Avg Risk Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Economic Impact Summary */}
            <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Economic Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">
                      {formatCurrency(economicOverview.totalPositiveImpact)}
                    </div>
                    <div className="text-xs text-green-600">
                      Positive Impact
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-700">
                      {formatCurrency(economicOverview.totalNegativeImpact)}
                    </div>
                    <div className="text-xs text-red-600">Negative Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-700">
                      {economicOverview.highRiskIndicators}
                    </div>
                    <div className="text-xs text-orange-600">
                      High Risk Indicators
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">
                      {economicOverview.opportunityScore}%
                    </div>
                    <div className="text-xs text-blue-600">
                      Opportunity Score
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Center */}
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-amber-600" />
                  Action Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleGenerateReport}
                  disabled={isAnalyzing}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  size="sm"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
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
                    <div className="text-xs text-amber-700 font-medium">
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
                          Risk: {latestReport.overallRiskScore}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Compliance: {latestReport.complianceScore}%
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
                    {isConnected ? "Real-time" : "Offline"}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    {policies.length} Policies
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Metrics Dashboard */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700">
                      Active Policies
                    </div>
                    <div className="text-lg font-bold text-green-900">
                      {policies.filter((p) => p.status === "active").length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700">
                      Economic Indicators
                    </div>
                    <div className="text-lg font-bold text-blue-900">
                      {economicIndicators.length}
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
                    <div className="text-sm text-orange-700">
                      Critical Impacts
                    </div>
                    <div className="text-lg font-bold text-orange-900">
                      {
                        economicImpacts.filter((i) => i.severity === "critical")
                          .length
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-purple-700">
                      Recommendations
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

        {/* Main Analysis Tabs */}
        <section>
          <Tabs defaultValue="external-policy" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full sm:w-auto">
                <TabsTrigger
                  value="external-policy"
                  className="flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  External Policy
                </TabsTrigger>
                <TabsTrigger
                  value="internal-policy"
                  className="flex items-center gap-2"
                >
                  <Building className="h-4 w-4" />
                  Internal Policy
                </TabsTrigger>
                <TabsTrigger
                  value="economic-impact"
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Economic Impact
                </TabsTrigger>
                <TabsTrigger
                  value="strategy"
                  className="flex items-center gap-2"
                >
                  <Target className="h-4 w-4" />
                  Strategy
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
                  {isConnected ? "Live Analysis" : "Offline Mode"}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Updated: {lastUpdated.toLocaleTimeString()}
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

            <TabsContent value="external-policy" className="space-y-8">
              <LoadingOverlay
                isLoading={isLoading && !policies.length}
                loadingText="Loading external policy data..."
              >
                <ExternalPolicyAnalysisComponent
                  policies={getFilteredPolicies()}
                  analyses={policyAnalyses}
                  onRunAnalysis={handleRunAnalysis}
                  isAnalyzing={isAnalyzing}
                />
              </LoadingOverlay>
            </TabsContent>

            <TabsContent value="internal-policy" className="space-y-8">
              <LoadingOverlay
                isLoading={isLoading && !policies.length}
                loadingText="Loading internal policy data..."
              >
                <InternalPolicyAnalysisComponent
                  policies={getFilteredPolicies()}
                  analyses={policyAnalyses}
                  onRunAnalysis={handleRunAnalysis}
                  isAnalyzing={isAnalyzing}
                />
              </LoadingOverlay>
            </TabsContent>

            <TabsContent value="economic-impact" className="space-y-8">
              <LoadingOverlay
                isLoading={isLoading && !economicIndicators.length}
                loadingText="Analyzing economic indicators..."
              >
                <EconomicImpactAnalysisComponent
                  indicators={economicIndicators}
                  impacts={getFilteredEconomicImpacts()}
                  selectedSeverity={selectedImpactSeverity}
                  selectedTimeframe={selectedTimeframe}
                  onSeverityChange={selectImpactSeverity}
                  onTimeframeChange={selectTimeframe}
                />
              </LoadingOverlay>
            </TabsContent>

            <TabsContent value="strategy" className="space-y-8">
              <LoadingOverlay
                isLoading={isLoading && !strategyRecommendations.length}
                loadingText="Generating strategy recommendations..."
              >
                <StrategyRecommendationsComponent
                  recommendations={strategyRecommendations}
                />
              </LoadingOverlay>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>© 2024 Policy & Economic Impact Platform</span>
              <span>•</span>
              <span>Advanced regulatory and economic analysis</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                Methods: Compliance Assessment, Risk Analysis, Impact Modeling
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PolicyEconomicAnalysis;
