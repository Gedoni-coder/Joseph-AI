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
import { useTaxData } from "@/hooks/useTaxData";
import { SmartTaxCalculator } from "@/components/tax/smart-tax-calculator";
import { TaxRecommendations } from "@/components/tax/tax-recommendations";
import { ComplianceUpdates } from "@/components/tax/compliance-updates";
import {
  Calculator,
  RefreshCw,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  FileText,
  Shield,
  AlertTriangle,
  Activity,
  Scale,
  Wifi,
} from "lucide-react";

const TaxCompliance = () => {
  const {
    calculations,
    recommendations,
    complianceUpdates,
    planningScenarios,
    auditTrail,
    documents,
    reports,
    lastUpdated,
    isLoading,
    error,
    isConnected,
    refreshData,
    updateCalculation,
    implementRecommendation,
    updateComplianceStatus,
    reconnect,
  } = useTaxData();

  const handleRefresh = async () => {
    await refreshData();
  };

  const totalTaxLiability = calculations.reduce(
    (sum, calc) => sum + calc.estimatedTax,
    0,
  );
  const potentialSavings = recommendations.reduce(
    (sum, rec) => sum + rec.potentialSavings,
    0,
  );
  const implementedSavings = recommendations
    .filter((rec) => rec.implemented)
    .reduce((sum, rec) => sum + rec.potentialSavings, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance text-blue-900">
                    Tax & Compliance Module
                  </h1>
                  <p className="text-sm text-blue-600">
                    Smart tax planning and automated compliance management
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
                  className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Activity className="h-4 w-4" />
                  Economic Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
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
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-blue-700">
                    Total Tax Liability
                  </div>
                  <div className="text-lg font-bold text-blue-900">
                    {formatCurrency(totalTaxLiability)}
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
                    Potential Savings
                  </div>
                  <div className="text-lg font-bold text-green-900">
                    {formatCurrency(potentialSavings)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-600 rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-orange-700">
                    Compliance Updates
                  </div>
                  <div className="text-lg font-bold text-orange-900">
                    {complianceUpdates.length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-purple-700">Active Entities</div>
                  <div className="text-lg font-bold text-purple-900">
                    {calculations.length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="calculator" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList className="grid grid-cols-6 w-full sm:w-auto bg-blue-50 border border-blue-200">
              <TabsTrigger
                value="calculator"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Calculator
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Recommendations
              </TabsTrigger>
              <TabsTrigger
                value="compliance"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Compliance
              </TabsTrigger>
              <TabsTrigger
                value="planning"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Planning
              </TabsTrigger>
              <TabsTrigger
                value="audit"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Audit Trail
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Documents
              </TabsTrigger>
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
              <Badge
                variant="outline"
                className="flex items-center gap-1 border-blue-200 text-blue-700"
              >
                <Calculator className="h-3 w-3" />
                Tax Module Active
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

          <TabsContent value="calculator" className="space-y-8">
            <section>
              <LoadingOverlay
                isLoading={isLoading}
                loadingText="Calculating tax liabilities..."
              >
                <SmartTaxCalculator
                  calculations={calculations}
                  onUpdateCalculation={updateCalculation}
                />
              </LoadingOverlay>
            </section>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-8">
            <section>
              <LoadingOverlay
                isLoading={isLoading}
                loadingText="Analyzing tax opportunities..."
              >
                <TaxRecommendations
                  recommendations={recommendations}
                  onImplement={implementRecommendation}
                />
              </LoadingOverlay>
            </section>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-8">
            <section>
              <LoadingOverlay
                isLoading={isLoading}
                loadingText="Fetching compliance updates..."
              >
                <ComplianceUpdates
                  updates={complianceUpdates}
                  onUpdateStatus={updateComplianceStatus}
                />
              </LoadingOverlay>
            </section>
          </TabsContent>

          <TabsContent value="planning" className="space-y-8">
            <section>
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-900">
                    Tax Planning & Advisory Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {planningScenarios.map((scenario) => (
                      <Card key={scenario.id} className="border-blue-100">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">
                            {scenario.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-gray-700">
                            {scenario.description}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Current Tax:</span>
                              <span className="font-medium">
                                {formatCurrency(scenario.currentTax)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Projected Tax:</span>
                              <span className="font-medium text-blue-600">
                                {formatCurrency(scenario.projectedTax)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm border-t pt-2">
                              <span className="font-medium">Savings:</span>
                              <span className="font-bold text-green-600">
                                {formatCurrency(scenario.savings)}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-gray-600">
                              Confidence: {scenario.confidence}%
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${scenario.confidence}%` }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="audit" className="space-y-8">
            <section>
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-900">
                    Audit Trail
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {auditTrail.slice(0, 10).map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start justify-between p-3 border border-blue-100 rounded-lg"
                      >
                        <div className="space-y-1">
                          <div className="font-medium text-sm">
                            {event.action}
                          </div>
                          <div className="text-xs text-gray-600">
                            {event.entity} • {event.details}
                          </div>
                          <div className="text-xs text-gray-500">
                            {event.timestamp.toLocaleString()} • {event.user}
                          </div>
                        </div>
                        <Badge
                          className={
                            event.outcome === "success"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {event.outcome}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="documents" className="space-y-8">
            <section>
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-900">
                    Document Management & Compliance Reporting
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-blue-800">
                        Recent Documents
                      </h4>
                      <div className="space-y-2">
                        {documents.slice(0, 5).map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-2 border border-blue-100 rounded"
                          >
                            <div>
                              <div className="text-sm font-medium">
                                {doc.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                {doc.entity} • {doc.taxYear}
                              </div>
                            </div>
                            <Badge
                              className={
                                doc.status === "processed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {doc.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-blue-800">
                        Compliance Reports
                      </h4>
                      <div className="space-y-2">
                        {reports.map((report) => (
                          <div
                            key={report.id}
                            className="p-3 border border-blue-100 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="font-medium text-sm">
                                {report.title}
                              </div>
                              <Badge
                                className={
                                  report.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : report.status === "overdue"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {report.status}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-600">
                              Due: {report.dueDate.toLocaleDateString()} •{" "}
                              {report.completionRate}% complete
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-blue-50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-blue-700">
              <span>© 2024 Tax & Compliance Platform</span>
              <span>•</span>
              <span>Data secured and encrypted</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-blue-600">
              <span>Compliance: IRS, State Tax Codes, Local Regulations</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TaxCompliance;
