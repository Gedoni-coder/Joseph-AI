import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LoadingOverlay } from "@/components/ui/loading-spinner";
import {
  ConnectionStatus,
  DataFreshness,
} from "@/components/ui/connection-status";
import { useFeasibilityData } from "@/hooks/useFeasibilityData";
import { ModeSelector } from "@/components/feasibility/mode-selector";
import { RiskAnalysisComponent } from "@/components/feasibility/risk-analysis";
import { TimeValueAnalysisComponent } from "@/components/feasibility/time-value-analysis";
import {
  Calculator,
  RefreshCw,
  Calendar,
  TrendingUp,
  DollarSign,
  Target,
  AlertTriangle,
  Activity,
  BarChart3,
  Wifi,
  Clock,
  Zap,
} from "lucide-react";

const FeasibilityAnalysis = () => {
  const {
    projects,
    analyses,
    selectedProject,
    selectedMode,
    lastUpdated,
    isLoading,
    error,
    isConnected,
    isCalculating,
    refreshData,
    selectProject,
    selectMode,
    runAnalysis,
    getAnalysis,
    reconnect,
  } = useFeasibilityData();

  const handleRefresh = async () => {
    await refreshData();
  };

  const handleRunAnalysis = async () => {
    if (selectedProject) {
      await runAnalysis(selectedProject, selectedMode);
    }
  };

  const currentProject = projects.find((p) => p.id === selectedProject);
  const currentAnalysis = selectedProject
    ? getAnalysis(selectedProject, selectedMode)
    : null;

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

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "highly_recommended":
        return "bg-green-100 text-green-800 border-green-200";
      case "recommended":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "proceed_with_caution":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "not_recommended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 text-white">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance text-gray-900">
                    Business Feasibility Analysis
                  </h1>
                  <p className="text-sm text-gray-600">
                    Comprehensive project viability assessment with risk
                    modeling
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
        {/* Project Selection & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Project Selector */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Select Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedProject === project.id
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => selectProject(project.id)}
                >
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">{project.name}</h4>
                      <div className="text-xs text-gray-600">
                        Investment: {formatCurrency(project.initialInvestment)}
                      </div>
                      <div className="text-xs text-gray-600">
                        Industry Growth:{" "}
                        {formatPercentage(project.industryGrowthRate)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700">
                      Initial Investment
                    </div>
                    <div className="text-lg font-bold text-blue-900">
                      {currentProject
                        ? formatCurrency(currentProject.initialInvestment)
                        : "--"}
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
                    <div className="text-sm text-green-700">NPV</div>
                    <div className="text-lg font-bold text-green-900">
                      {currentAnalysis
                        ? formatCurrency(currentAnalysis.timeValue.npv)
                        : "--"}
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
                    <div className="text-sm text-orange-700">Risk Score</div>
                    <div className="text-lg font-bold text-orange-900">
                      {currentAnalysis
                        ? `${currentAnalysis.risk.overallRiskScore.toFixed(1)}%`
                        : "--"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mode Selection */}
        <section>
          <LoadingOverlay
            isLoading={isLoading}
            loadingText="Updating analysis modes..."
          >
            <ModeSelector
              selectedMode={selectedMode}
              onModeChange={selectMode}
            />
          </LoadingOverlay>
        </section>

        {/* Analysis Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Analysis for {currentProject?.name || "No Project Selected"}
                </h3>
                <p className="text-sm text-gray-600">
                  Mode: <strong className="capitalize">{selectedMode}</strong> •{" "}
                  {currentAnalysis
                    ? "Analysis Complete"
                    : "No Analysis Available"}
                </p>
              </div>
              <Button
                onClick={handleRunAnalysis}
                disabled={!selectedProject || isCalculating}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Run Analysis
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {currentAnalysis && (
          <>
            {/* Final Result Summary */}
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
              <CardHeader>
                <CardTitle className="text-lg">
                  Final Feasibility Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {currentAnalysis.result.overallScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>

                  <div className="text-center">
                    <Badge
                      className={`text-sm px-3 py-1 ${getRecommendationColor(
                        currentAnalysis.result.recommendation,
                      )}`}
                    >
                      {currentAnalysis.result.recommendation
                        .replace("_", " ")
                        .toUpperCase()}
                    </Badge>
                    <div className="text-sm text-gray-600 mt-1">
                      Recommendation
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {currentAnalysis.result.confidenceLevel.toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-600">Confidence</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {currentAnalysis.roi.paybackPeriod.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Payback (Years)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Tabs */}
            <Tabs defaultValue="risk" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <TabsList className="grid grid-cols-6 w-full sm:w-auto">
                  <TabsTrigger value="risk">Risk</TabsTrigger>
                  <TabsTrigger value="timevalue">Time Value</TabsTrigger>
                  <TabsTrigger value="roi">ROI Time</TabsTrigger>
                  <TabsTrigger value="length">Length Time</TabsTrigger>
                  <TabsTrigger value="interest">Interest Rate</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={isConnected ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {isConnected ? (
                      <Wifi className="h-3 w-3" />
                    ) : (
                      <Activity className="h-3 w-3" />
                    )}
                    {isConnected ? "Live Data" : "Offline Mode"}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Analysis Active
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

              <TabsContent value="risk" className="space-y-8">
                <section>
                  <LoadingOverlay
                    isLoading={isCalculating}
                    loadingText="Analyzing risk factors..."
                  >
                    <RiskAnalysisComponent riskData={currentAnalysis.risk} />
                  </LoadingOverlay>
                </section>
              </TabsContent>

              <TabsContent value="timevalue" className="space-y-8">
                <section>
                  <LoadingOverlay
                    isLoading={isCalculating}
                    loadingText="Calculating NPV and time value..."
                  >
                    <TimeValueAnalysisComponent
                      timeValueData={currentAnalysis.timeValue}
                    />
                  </LoadingOverlay>
                </section>
              </TabsContent>

              <TabsContent value="roi" className="space-y-8">
                <section>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        ROI Time Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            Payback Period
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            {currentAnalysis.roi.paybackPeriod.toFixed(1)} years
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            Simple ROI
                          </div>
                          <div className="text-2xl font-bold text-blue-600">
                            {currentAnalysis.roi.simpleROI.toFixed(1)}%
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            Annualized ROI
                          </div>
                          <div className="text-2xl font-bold text-purple-600">
                            {currentAnalysis.roi.annualizedROI.toFixed(1)}%
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            Return Multiple
                          </div>
                          <div className="text-2xl font-bold text-orange-600">
                            {currentAnalysis.roi.returnMultiple.toFixed(1)}x
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            Profitability Index
                          </div>
                          <div className="text-2xl font-bold text-indigo-600">
                            {currentAnalysis.roi.profitabilityIndex.toFixed(2)}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            Cash Flow Breakeven
                          </div>
                          <div className="text-2xl font-bold text-teal-600">
                            {currentAnalysis.roi.cashFlowBreakeven.toFixed(0)}{" "}
                            months
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </TabsContent>

              <TabsContent value="length" className="space-y-8">
                <section>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Length Time Factor Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-600">
                              Project Lifespan
                            </div>
                            <div className="text-xl font-bold">
                              {currentAnalysis.lengthTime.projectLifespan.toFixed(
                                1,
                              )}{" "}
                              years
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">
                              Optimal Exit Time
                            </div>
                            <div className="text-xl font-bold text-green-600">
                              {currentAnalysis.lengthTime.optimalExitTime.toFixed(
                                1,
                              )}{" "}
                              years
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">
                              Market Maturity Stage
                            </div>
                            <Badge className="capitalize">
                              {currentAnalysis.lengthTime.marketMaturityStage}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-600">
                              Sustainability Score
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-xl font-bold">
                                {currentAnalysis.lengthTime.sustainabilityScore.toFixed(
                                  0,
                                )}
                                %
                              </div>
                              <Progress
                                value={
                                  currentAnalysis.lengthTime.sustainabilityScore
                                }
                                className="flex-1 h-2"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">
                              Scalability Potential
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-xl font-bold">
                                {currentAnalysis.lengthTime.scalabilityPotential.toFixed(
                                  0,
                                )}
                                %
                              </div>
                              <Progress
                                value={
                                  currentAnalysis.lengthTime
                                    .scalabilityPotential
                                }
                                className="flex-1 h-2"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">
                              Business Cycle Impact
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-xl font-bold">
                                {currentAnalysis.lengthTime.businessCycleImpact.toFixed(
                                  0,
                                )}
                                %
                              </div>
                              <Progress
                                value={
                                  currentAnalysis.lengthTime.businessCycleImpact
                                }
                                className="flex-1 h-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </TabsContent>

              <TabsContent value="interest" className="space-y-8">
                <section>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        Interest Rate Impact Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-600">
                              Current Rate
                            </div>
                            <div className="text-2xl font-bold text-purple-600">
                              {currentAnalysis.interestRate.currentRate.toFixed(
                                1,
                              )}
                              %
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">
                              Cost of Capital
                            </div>
                            <div className="text-2xl font-bold text-blue-600">
                              {currentAnalysis.interestRate.costOfCapital.toFixed(
                                1,
                              )}
                              %
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">
                              Required Return
                            </div>
                            <div className="text-2xl font-bold text-green-600">
                              {currentAnalysis.interestRate.requiredReturn.toFixed(
                                1,
                              )}
                              %
                            </div>
                          </div>
                        </div>

                        <Card className="bg-gray-50">
                          <CardHeader>
                            <CardTitle className="text-base">
                              Interest Rate Scenarios
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-sm text-green-600">
                                  Optimistic
                                </div>
                                <div className="font-bold">
                                  {currentAnalysis.interestRate.rateScenarios.optimistic.toFixed(
                                    1,
                                  )}
                                  %
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-blue-600">
                                  Base Case
                                </div>
                                <div className="font-bold">
                                  {currentAnalysis.interestRate.rateScenarios.base.toFixed(
                                    1,
                                  )}
                                  %
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-red-600">
                                  Pessimistic
                                </div>
                                <div className="font-bold">
                                  {currentAnalysis.interestRate.rateScenarios.pessimistic.toFixed(
                                    1,
                                  )}
                                  %
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </TabsContent>

              <TabsContent value="summary" className="space-y-8">
                <section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-green-200">
                      <CardHeader className="bg-green-50">
                        <CardTitle className="text-base text-green-800">
                          Key Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <ul className="space-y-2">
                          {currentAnalysis.result.keyStrengths.map(
                            (strength, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{strength}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200">
                      <CardHeader className="bg-red-50">
                        <CardTitle className="text-base text-red-800">
                          Key Weaknesses
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <ul className="space-y-2">
                          {currentAnalysis.result.keyWeaknesses.map(
                            (weakness, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{weakness}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Alternative Scenarios
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentAnalysis.result.alternativeScenarios.map(
                          (scenario, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div>
                                <div className="font-medium text-sm">
                                  {scenario.scenario}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {scenario.outcome}
                                </div>
                              </div>
                              <Badge variant="outline">
                                {scenario.probability}% probability
                              </Badge>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </TabsContent>
            </Tabs>
          </>
        )}

        {!currentAnalysis && selectedProject && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-12 text-center">
              <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No Analysis Available
              </h3>
              <p className="text-gray-600 mb-4">
                Run a feasibility analysis for "{currentProject?.name}" in{" "}
                <strong className="capitalize">{selectedMode}</strong> mode to
                see detailed results.
              </p>
              <Button
                onClick={handleRunAnalysis}
                disabled={isCalculating}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Run Analysis
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>© 2024 Business Feasibility Platform</span>
              <span>•</span>
              <span>Advanced financial modeling and risk analysis</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Methods: NPV, IRR, Monte Carlo, Sensitivity Analysis</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeasibilityAnalysis;
