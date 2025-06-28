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
import { useLoanFundingData } from "@/hooks/useLoanFundingData";
import { LoanEligibilityComponent } from "@/components/loan/loan-eligibility";
import { FundingOptionsComponent } from "@/components/loan/funding-options";
import { LoanComparisonComponent } from "@/components/loan/loan-comparison";
import { ApplicationAssistanceComponent } from "@/components/loan/application-assistance";
import { FundingStrategyComponent } from "@/components/loan/funding-strategy";
import { LoanResearchComponent } from "@/components/loan/loan-research";
import {
  Calculator,
  Search,
  BarChart3,
  FileText,
  Target,
  Bell,
  RefreshCw,
  Activity,
  DollarSign,
  Users,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Award,
  Zap,
  Building,
} from "lucide-react";

const LoanFunding = () => {
  const {
    businessProfile,
    eligibilityAssessment,
    fundingOptions,
    loanComparisons,
    applicationAssistance,
    fundingStrategy,
    loanUpdates,
    watchlist,
    selectedFundingTypes,
    maxLoanAmount,
    maxInterestRate,
    minCreditScore,
    isLoading,
    isConnected,
    error,
    lastUpdated,
    isProcessing,
    refreshData,
    reconnect,
    updateBusinessProfile,
    runEligibilityAssessment,
    setFundingTypeFilter,
    setLoanAmountFilter,
    setInterestRateFilter,
    setCreditScoreFilter,
    compareLoans,
    generateBusinessPlan,
    generateFinancialProjections,
    submitLoanApplication,
    analyzeFundingStrategy,
    addToWatchlist,
    removeFromWatchlist,
    getFilteredFundingOptions,
    getEligibleOptions,
    getBestLoanOptions,
    getUrgentUpdates,
    getMatchScore,
    getLoanCalculations,
  } = useLoanFundingData();

  const handleRefresh = async () => {
    await refreshData();
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const eligibleOptions = getEligibleOptions();
  const bestOptions = getBestLoanOptions();
  const urgentUpdates = getUrgentUpdates();
  const watchedPrograms = watchlist?.watchedPrograms || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance text-gray-900">
                    Loan & Funding Platform
                  </h1>
                  <p className="text-sm text-gray-600">
                    AI-powered loan eligibility, comparison, and application
                    assistance
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Eligibility Overview */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Eligibility Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">
                    {eligibilityAssessment?.overallScore || "--"}
                  </div>
                  <div className="text-sm text-green-600">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-700">
                    {eligibleOptions.length}
                  </div>
                  <div className="text-sm text-blue-600">Eligible Options</div>
                </div>
              </CardContent>
            </Card>

            {/* Funding Options Summary */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  Available Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-700">
                    {fundingOptions.length}
                  </div>
                  <div className="text-sm text-blue-600">Total Options</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700">
                    {bestOptions.length}
                  </div>
                  <div className="text-sm text-green-600">Best Matches</div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Analysis */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  Loan Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-700">
                    {loanComparisons.length}
                  </div>
                  <div className="text-sm text-purple-600">Comparisons</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-700">
                    {businessProfile ? formatCurrency(maxLoanAmount) : "--"}
                  </div>
                  <div className="text-sm text-orange-600">Max Amount</div>
                </div>
              </CardContent>
            </Card>

            {/* Updates & Alerts */}
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  Updates & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-700">
                    {urgentUpdates.length}
                  </div>
                  <div className="text-sm text-orange-600">Urgent Updates</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-700">
                    {watchedPrograms.length}
                  </div>
                  <div className="text-sm text-red-600">Watched Programs</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Insights */}
        {businessProfile && eligibilityAssessment && (
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Quick Insights for {businessProfile.businessName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {formatCurrency(businessProfile.annualRevenue)}
                  </div>
                  <div className="text-sm text-green-700">Annual Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {businessProfile.creditScore}
                  </div>
                  <div className="text-sm text-blue-700">Credit Score</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">
                    {businessProfile.yearsInBusiness}
                  </div>
                  <div className="text-sm text-purple-700">
                    Years in Business
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">
                    {formatCurrency(businessProfile.cashFlow)}
                  </div>
                  <div className="text-sm text-orange-700">
                    Monthly Cash Flow
                  </div>
                </div>
              </div>

              {bestOptions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="text-sm font-medium text-green-700 mb-2">
                    Top Recommendations
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {bestOptions.slice(0, 3).map((option) => (
                      <div
                        key={option.id}
                        className="p-3 bg-white rounded-lg border border-green-200"
                      >
                        <div className="font-medium text-sm">{option.name}</div>
                        <div className="text-xs text-gray-600">
                          {option.provider}
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          {option.interestRate.min}% - {option.interestRate.max}
                          % APR
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Action Items */}
        {urgentUpdates.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Action Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {urgentUpdates.slice(0, 3).map((update) => (
                  <div
                    key={update.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200"
                  >
                    <div>
                      <div className="font-medium text-sm">{update.title}</div>
                      <div className="text-xs text-gray-600">
                        {update.provider} • {update.urgency.toUpperCase()}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Tabs */}
        <section>
          <Tabs defaultValue="eligibility" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full sm:w-auto">
                <TabsTrigger
                  value="eligibility"
                  className="flex items-center gap-2"
                >
                  <Award className="h-4 w-4" />
                  Eligibility
                </TabsTrigger>
                <TabsTrigger
                  value="options"
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Options
                </TabsTrigger>
                <TabsTrigger
                  value="comparison"
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Compare
                </TabsTrigger>
                <TabsTrigger
                  value="assistance"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Apply
                </TabsTrigger>
                <TabsTrigger
                  value="strategy"
                  className="flex items-center gap-2"
                >
                  <Target className="h-4 w-4" />
                  Strategy
                </TabsTrigger>
                <TabsTrigger
                  value="research"
                  className="flex items-center gap-2"
                >
                  <Bell className="h-4 w-4" />
                  Research
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
                  {isConnected ? "Live Data" : "Offline Mode"}
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

            {/* Tab Contents */}
            <TabsContent value="eligibility" className="space-y-8">
              <LoadingOverlay
                isLoading={isLoading && !businessProfile}
                loadingText="Loading eligibility assessment..."
              >
                <LoanEligibilityComponent
                  businessProfile={businessProfile}
                  eligibilityAssessment={eligibilityAssessment}
                  onRunAssessment={runEligibilityAssessment}
                  onUpdateProfile={updateBusinessProfile}
                  isProcessing={isProcessing}
                />
              </LoadingOverlay>
            </TabsContent>

            <TabsContent value="options" className="space-y-8">
              <LoadingOverlay
                isLoading={isLoading && !fundingOptions.length}
                loadingText="Loading funding options..."
              >
                <FundingOptionsComponent
                  fundingOptions={getFilteredFundingOptions()}
                  selectedTypes={selectedFundingTypes}
                  maxAmount={maxLoanAmount}
                  maxRate={maxInterestRate}
                  onTypeFilter={setFundingTypeFilter}
                  onAmountFilter={setLoanAmountFilter}
                  onRateFilter={setInterestRateFilter}
                  onAddToWatchlist={addToWatchlist}
                  watchlist={watchedPrograms.map((p) => p.fundingOptionId)}
                  getMatchScore={getMatchScore}
                />
              </LoadingOverlay>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-8">
              <LoadingOverlay
                isLoading={isProcessing}
                loadingText="Comparing loan options..."
              >
                <LoanComparisonComponent
                  fundingOptions={fundingOptions}
                  comparisons={loanComparisons}
                  onCompareLoans={compareLoans}
                  getLoanCalculations={getLoanCalculations}
                  isProcessing={isProcessing}
                />
              </LoadingOverlay>
            </TabsContent>

            <TabsContent value="assistance" className="space-y-8">
              <LoadingOverlay
                isLoading={isProcessing}
                loadingText="Preparing application assistance..."
              >
                <ApplicationAssistanceComponent
                  assistance={applicationAssistance}
                  onGenerateBusinessPlan={generateBusinessPlan}
                  onGenerateFinancialProjections={generateFinancialProjections}
                  onSubmitApplication={submitLoanApplication}
                  isProcessing={isProcessing}
                />
              </LoadingOverlay>
            </TabsContent>

            <TabsContent value="strategy" className="space-y-8">
              <LoadingOverlay
                isLoading={isProcessing}
                loadingText="Analyzing funding strategy..."
              >
                <FundingStrategyComponent
                  strategy={fundingStrategy}
                  onAnalyzeStrategy={analyzeFundingStrategy}
                  isProcessing={isProcessing}
                />
              </LoadingOverlay>
            </TabsContent>

            <TabsContent value="research" className="space-y-8">
              <LoadingOverlay
                isLoading={isLoading && !loanUpdates.length}
                loadingText="Loading market updates..."
              >
                <LoanResearchComponent
                  updates={loanUpdates}
                  watchlist={watchlist}
                  onAddToWatchlist={addToWatchlist}
                  onRemoveFromWatchlist={removeFromWatchlist}
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
              <span>© 2024 Loan & Funding Platform</span>
              <span>•</span>
              <span>AI-powered funding solutions and loan assistance</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                Features: Eligibility Assessment, Smart Comparison, Application
                Assistance
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoanFunding;
