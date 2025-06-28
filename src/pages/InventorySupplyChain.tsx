import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Package,
  Truck,
  Users,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  RefreshCw,
  BarChart3,
  Shield,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { InventoryManagement } from "@/components/inventory/inventory-management";
import { SupplyChainManagement } from "@/components/inventory/supply-chain-management";
import { useInventorySupplyChainData } from "@/hooks/useInventorySupplyChainData";

export default function InventorySupplyChain() {
  const { inventoryInsights, supplyChainInsights, loading, lastUpdated } =
    useInventorySupplyChainData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">
            Loading inventory and supply chain data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                  <Package className="h-8 w-8 text-white" />
                </div>
                Inventory & Supply Chain Management
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive inventory tracking and supply chain optimization
                platform
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="font-medium">{lastUpdated.toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Total Items
                    </p>
                    <p className="text-xl font-bold text-green-700">
                      {inventoryInsights.totalItems.toLocaleString()}
                    </p>
                  </div>
                  <Package className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">
                    +{inventoryInsights.monthlyGrowth}% vs last month
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Inventory Value
                    </p>
                    <p className="text-xl font-bold text-blue-700">
                      ${(inventoryInsights.totalValue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <DollarSign className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-blue-500 mr-1" />
                  <span className="text-blue-600">
                    +8.3% valuation increase
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-600">
                      Fill Rate
                    </p>
                    <p className="text-xl font-bold text-emerald-700">
                      {inventoryInsights.fillRate.toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                  <span className="text-emerald-600">+2.1% improvement</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">
                      Suppliers
                    </p>
                    <p className="text-xl font-bold text-purple-700">
                      {supplyChainInsights.totalSuppliers}
                    </p>
                  </div>
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-purple-500 mr-1" />
                  <span className="text-purple-600">+5 new partnerships</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">
                      On-Time Delivery
                    </p>
                    <p className="text-xl font-bold text-orange-700">
                      {supplyChainInsights.onTimeDelivery.toFixed(1)}%
                    </p>
                  </div>
                  <Truck className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowDownRight className="h-3 w-3 text-orange-500 mr-1" />
                  <span className="text-orange-600">-1.2% vs target</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      Turnover Ratio
                    </p>
                    <p className="text-xl font-bold text-indigo-700">
                      {inventoryInsights.averageTurnover.toFixed(1)}x
                    </p>
                  </div>
                  <RefreshCw className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-indigo-500 mr-1" />
                  <span className="text-indigo-600">+0.8x improvement</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="mb-6 space-y-2">
          {inventoryInsights.outOfStockItems > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Critical:</strong> {inventoryInsights.outOfStockItems}{" "}
                items are out of stock. Immediate restocking required.
              </AlertDescription>
            </Alert>
          )}

          {inventoryInsights.lowStockItems > 10 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Warning:</strong> {inventoryInsights.lowStockItems}{" "}
                items are running low on stock. Review reorder points.
              </AlertDescription>
            </Alert>
          )}

          {supplyChainInsights.riskScore > 25 && (
            <Alert className="border-orange-200 bg-orange-50">
              <Shield className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Supply Chain Risk:</strong> Elevated risk level
                detected. Review supplier diversification strategy.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Executive Summary */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  Executive Summary
                </CardTitle>
                <CardDescription>
                  Key performance indicators and strategic insights
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Operational Excellence
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Inventory Health</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Stock Accuracy:</span>
                    <span className="font-medium text-green-600">
                      {inventoryInsights.stockAccuracy}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fill Rate:</span>
                    <span className="font-medium text-blue-600">
                      {inventoryInsights.fillRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Turnover:</span>
                    <span className="font-medium text-purple-600">
                      {inventoryInsights.averageTurnover.toFixed(1)}x
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">
                  Supply Chain Performance
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">On-Time Delivery:</span>
                    <span className="font-medium text-green-600">
                      {supplyChainInsights.onTimeDelivery.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quality Score:</span>
                    <span className="font-medium text-blue-600">
                      {supplyChainInsights.qualityScore.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Resilience:</span>
                    <span className="font-medium text-purple-600">
                      {supplyChainInsights.resilienceScore}/100
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Financial Impact</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cost Savings:</span>
                    <span className="font-medium text-green-600">
                      ${supplyChainInsights.costSavings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Inventory Value:</span>
                    <span className="font-medium text-blue-600">
                      ${(inventoryInsights.totalValue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Growth Rate:</span>
                    <span className="font-medium text-purple-600">
                      +{inventoryInsights.monthlyGrowth}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Risk Assessment</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Risk Score:</span>
                    <span
                      className={`font-medium ${supplyChainInsights.riskScore > 25 ? "text-red-600" : "text-green-600"}`}
                    >
                      {supplyChainInsights.riskScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Diversification:</span>
                    <span className="font-medium text-blue-600">
                      {supplyChainInsights.diversificationIndex}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sustainability:</span>
                    <span className="font-medium text-purple-600">
                      {supplyChainInsights.sustainabilityScore}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-900">
                      Strengths
                    </span>
                  </div>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>
                      • High stock accuracy ({inventoryInsights.stockAccuracy}%)
                    </li>
                    <li>• Strong supplier relationships</li>
                    <li>• Effective cost management</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium text-yellow-900">
                      Opportunities
                    </span>
                  </div>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Improve inventory turnover</li>
                    <li>• Enhance demand forecasting</li>
                    <li>• Increase supplier diversification</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-blue-900">
                      Recommendations
                    </span>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Implement AI demand forecasting</li>
                    <li>• Optimize reorder points</li>
                    <li>• Strengthen supply chain resilience</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              🧮 Inventory Management
            </TabsTrigger>
            <TabsTrigger
              value="supply-chain"
              className="flex items-center gap-2"
            >
              <Truck className="h-4 w-4" />
              🔗 Supply Chain Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-600" />
                  Inventory Management
                </CardTitle>
                <CardDescription>
                  Comprehensive inventory tracking with stock monitoring, demand
                  forecasting, valuation, dead stock detection, batch tracking,
                  multi-location sync, audit reporting, and turnover analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supply-chain" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Supply Chain Management
                </CardTitle>
                <CardDescription>
                  End-to-end supply chain optimization covering procurement,
                  production, logistics, supplier relations, market analysis,
                  compliance, risk assessment, sustainability, and strategic
                  planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SupplyChainManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Inventory & Supply Chain Management Platform • Real-time data and
            insights
          </p>
          <p className="mt-1">Last updated: {lastUpdated.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
