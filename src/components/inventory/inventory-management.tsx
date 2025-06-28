import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  MapPin,
  Calendar,
  Search,
  Filter,
  RefreshCw,
  Archive,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Truck,
} from "lucide-react";
import {
  useInventoryManagement,
  useDemandForecasting,
} from "@/hooks/useInventorySupplyChainData";

export function InventoryManagement() {
  const {
    filteredItems,
    categories,
    locations,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    stockFilter,
    setStockFilter,
    deadStockItems,
    batchTracking,
    locationInventory,
    inventoryAudits,
    reorderAlerts,
    turnoverAnalysis,
    inventoryInsights,
  } = useInventoryManagement();

  const { demandForecasts } = useDemandForecasting();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in-stock":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "low-stock":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "out-of-stock":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "overstock":
        return <Package className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      case "overstock":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">
                  {inventoryInsights.totalItems.toLocaleString()}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Across all locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">
                  ${inventoryInsights.totalValue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Current inventory value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fill Rate</p>
                <p className="text-2xl font-bold">
                  {inventoryInsights.fillRate.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Stock availability</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Turnover
                </p>
                <p className="text-2xl font-bold">
                  {inventoryInsights.averageTurnover.toFixed(1)}x
                </p>
              </div>
              <RefreshCw className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Annual turnover ratio</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      {reorderAlerts.filter((alert) => alert.status === "pending").length >
        0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have{" "}
            {reorderAlerts.filter((alert) => alert.status === "pending").length}{" "}
            pending reorder alerts requiring attention.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="stock-monitoring" className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
          <TabsTrigger value="stock-monitoring" className="text-xs">
            Stock Monitoring
          </TabsTrigger>
          <TabsTrigger value="demand-forecasting" className="text-xs">
            Demand Forecasting
          </TabsTrigger>
          <TabsTrigger value="valuation" className="text-xs">
            Valuation
          </TabsTrigger>
          <TabsTrigger value="dead-stock" className="text-xs">
            Dead Stock
          </TabsTrigger>
          <TabsTrigger value="batch-tracking" className="text-xs">
            Batch Tracking
          </TabsTrigger>
          <TabsTrigger value="multi-location" className="text-xs">
            Multi-Location
          </TabsTrigger>
          <TabsTrigger value="audit" className="text-xs">
            Audit
          </TabsTrigger>
          <TabsTrigger value="turnover" className="text-xs">
            Turnover
          </TabsTrigger>
        </TabsList>

        {/* Stock Level Monitoring */}
        <TabsContent value="stock-monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Stock Level Monitoring
                  </CardTitle>
                  <CardDescription>
                    Real-time tracking of inventory quantities across products
                    and locations
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location === "all" ? "All Locations" : location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Stock Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    <SelectItem value="overstock">Overstock</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search items..." className="pl-10" />
                  </div>
                </div>
              </div>

              {/* Stock Status Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">In Stock</span>
                  </div>
                  <p className="text-xl font-bold text-green-700">
                    {
                      filteredItems.filter((item) => item.status === "in-stock")
                        .length
                    }
                  </p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">Low Stock</span>
                  </div>
                  <p className="text-xl font-bold text-yellow-700">
                    {
                      filteredItems.filter(
                        (item) => item.status === "low-stock",
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">Out of Stock</span>
                  </div>
                  <p className="text-xl font-bold text-red-700">
                    {
                      filteredItems.filter(
                        (item) => item.status === "out-of-stock",
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Overstock</span>
                  </div>
                  <p className="text-xl font-bold text-blue-700">
                    {
                      filteredItems.filter(
                        (item) => item.status === "overstock",
                      ).length
                    }
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Item
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          SKU
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Current Stock
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Min/Max
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Location
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredItems.slice(0, 10).map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.category}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.sku}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {item.currentStock}
                              </span>
                              <Progress
                                value={
                                  (item.currentStock / item.maxStockLevel) * 100
                                }
                                className="w-16 h-2"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.minStockLevel} / {item.maxStockLevel}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(item.status)}
                              <Badge className={getStatusColor(item.status)}>
                                {item.status.replace("-", " ")}
                              </Badge>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {item.location}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            ${item.totalValue.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demand Forecasting & Reorder Alerts */}
        <TabsContent value="demand-forecasting" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Demand Forecasting
                </CardTitle>
                <CardDescription>
                  Predict product demand based on historical data and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demandForecasts.slice(0, 5).map((forecast) => {
                    const item = filteredItems.find(
                      (i) => i.id === forecast.itemId,
                    );
                    return (
                      <div
                        key={forecast.itemId}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{item?.name}</h4>
                          <Badge variant="outline">
                            {forecast.confidenceLevel}% confidence
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">
                              Predicted Demand:
                            </span>
                            <p className="font-medium">
                              {forecast.predictedDemand} units
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Method:</span>
                            <p className="font-medium">
                              {forecast.forecastMethod.replace("-", " ")}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">
                              Seasonal Factor:
                            </span>
                            <p className="font-medium">
                              {forecast.seasonalFactor.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Accuracy:</span>
                            <p className="font-medium">
                              {forecast.forecastAccuracy}%
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Reorder Alerts
                </CardTitle>
                <CardDescription>
                  Notifications for restocking before shortages occur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reorderAlerts.slice(0, 6).map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{alert.itemName}</h4>
                        <Badge className={getPriorityColor(alert.priority)}>
                          {alert.priority}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Current Stock:</span>
                          <p className="font-medium">{alert.currentStock}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Suggested Qty:</span>
                          <p className="font-medium">
                            {alert.suggestedQuantity}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Supplier:</span>
                          <p className="font-medium">{alert.supplier}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Lead Time:</span>
                          <p className="font-medium">{alert.leadTime} days</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Create Order
                        </Button>
                        <Button size="sm" variant="outline">
                          Snooze
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inventory Valuation & Cost Tracking */}
        <TabsContent value="valuation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Inventory Valuation & Cost Tracking
              </CardTitle>
              <CardDescription>
                Track inventory costs using FIFO, LIFO, or weighted average
                methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">FIFO Method</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    $
                    {filteredItems
                      .filter((i) => i.valuationMethod === "FIFO")
                      .reduce((sum, i) => sum + i.totalValue, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600">
                    {
                      filteredItems.filter((i) => i.valuationMethod === "FIFO")
                        .length
                    }{" "}
                    items
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">LIFO Method</h3>
                  <p className="text-2xl font-bold text-green-700">
                    $
                    {filteredItems
                      .filter((i) => i.valuationMethod === "LIFO")
                      .reduce((sum, i) => sum + i.totalValue, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    {
                      filteredItems.filter((i) => i.valuationMethod === "LIFO")
                        .length
                    }{" "}
                    items
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900">
                    Weighted Average
                  </h3>
                  <p className="text-2xl font-bold text-purple-700">
                    $
                    {filteredItems
                      .filter((i) => i.valuationMethod === "weighted-average")
                      .reduce((sum, i) => sum + i.totalValue, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-purple-600">
                    {
                      filteredItems.filter(
                        (i) => i.valuationMethod === "weighted-average",
                      ).length
                    }{" "}
                    items
                  </p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Item
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Method
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Unit Cost
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total Value
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Margin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredItems.slice(0, 10).map((item) => {
                        const margin =
                          ((item.unitPrice - item.costPrice) / item.unitPrice) *
                          100;
                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <p className="font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.sku}
                              </p>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline">
                                {item.valuationMethod}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              ${item.costPrice}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {item.currentStock}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              ${item.totalValue.toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-sm font-medium ${margin > 30 ? "text-green-600" : margin > 15 ? "text-yellow-600" : "text-red-600"}`}
                              >
                                {margin.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dead Stock & Overstock Detection */}
        <TabsContent value="dead-stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Dead Stock & Overstock Detection
              </CardTitle>
              <CardDescription>
                Identify slow-moving or obsolete items to reduce waste
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900">High Risk Items</h3>
                  <p className="text-2xl font-bold text-red-700">
                    {
                      deadStockItems.filter((item) => item.riskLevel === "high")
                        .length
                    }
                  </p>
                  <p className="text-sm text-red-600">
                    Immediate attention needed
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-900">
                    Medium Risk Items
                  </h3>
                  <p className="text-2xl font-bold text-yellow-700">
                    {
                      deadStockItems.filter(
                        (item) => item.riskLevel === "medium",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-yellow-600">Monitor closely</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">
                    Total Value at Risk
                  </h3>
                  <p className="text-2xl font-bold text-green-700">
                    $
                    {deadStockItems
                      .reduce((sum, item) => sum + item.investmentValue, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">Potential loss</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Item
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Days Since Sale
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Investment
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Carrying Cost
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Risk Level
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {deadStockItems.map((item) => (
                        <tr key={item.itemId} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">
                              {item.itemName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.category}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {item.daysSinceLastSale} days
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            ${item.investmentValue.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            ${item.monthlyCarryingCost.toFixed(0)}/mo
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                item.riskLevel === "high"
                                  ? "bg-red-100 text-red-800"
                                  : item.riskLevel === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {item.riskLevel}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button size="sm" variant="outline">
                              {item.recommendedAction.replace("-", " ")}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Batch/Serial Number Tracking */}
        <TabsContent value="batch-tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Batch/Serial Number Tracking
              </CardTitle>
              <CardDescription>
                For traceability, warranty validation, and recall management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Batch Number
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Item
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Supplier
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Production Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Expiry Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Remaining Qty
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {batchTracking.slice(0, 10).map((batch) => {
                        const item = filteredItems.find(
                          (i) => i.id === batch.itemId,
                        );
                        return (
                          <tr
                            key={batch.batchNumber}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {batch.batchNumber}
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-medium">{item?.name}</p>
                              <p className="text-sm text-gray-500">
                                {item?.sku}
                              </p>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {batch.supplier}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {batch.productionDate.toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {batch.expiryDate
                                ? batch.expiryDate.toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              {batch.remainingQuantity}
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                className={
                                  batch.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : batch.status === "expired"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                }
                              >
                                {batch.status}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Multi-Location Inventory Sync */}
        <TabsContent value="multi-location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Multi-Location Inventory Sync
              </CardTitle>
              <CardDescription>
                Manage inventory across warehouses, shops, or sales channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locationInventory.map((location) => (
                  <div
                    key={location.locationId}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{location.locationName}</h3>
                      <Badge variant="outline" className="capitalize">
                        {location.type.replace("-", " ")}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Items:</span>
                        <span className="font-medium">
                          {location.totalItems}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Value:</span>
                        <span className="font-medium">
                          ${location.totalValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Capacity:</span>
                        <span className="font-medium">
                          {location.capacityUtilization}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Manager:</span>
                        <span className="font-medium">{location.manager}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Progress
                        value={location.capacityUtilization}
                        className="h-2"
                      />
                    </div>

                    <div className="mt-3 text-xs text-gray-500">
                      Last sync: {location.lastSyncDate.toLocaleDateString()}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Audit & Reporting */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Inventory Audit & Reporting
              </CardTitle>
              <CardDescription>
                Generate stock reports, detect mismatches, and optimize
                purchasing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">Total Audits</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    {inventoryAudits.length}
                  </p>
                  <p className="text-sm text-blue-600">This quarter</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">Accuracy Rate</h3>
                  <p className="text-2xl font-bold text-green-700">98.7%</p>
                  <p className="text-sm text-green-600">Average accuracy</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-900">Discrepancies</h3>
                  <p className="text-2xl font-bold text-yellow-700">
                    {inventoryAudits.reduce(
                      (sum, audit) => sum + audit.discrepancies.length,
                      0,
                    )}
                  </p>
                  <p className="text-sm text-yellow-600">
                    Items requiring adjustment
                  </p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Audit Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Location
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Auditor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Items Count
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Discrepancy Rate
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {inventoryAudits.map((audit) => (
                        <tr key={audit.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">
                            {audit.auditDate.toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            {audit.location}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="capitalize">
                              {audit.type}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{audit.auditor}</td>
                          <td className="px-4 py-3 text-sm">
                            {audit.totalItemsCount}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {audit.discrepancyRate}%
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                audit.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : audit.status === "in-progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {audit.status.replace("-", " ")}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Turnover Ratio Insights */}
        <TabsContent value="turnover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Inventory Turnover Ratio Insights
              </CardTitle>
              <CardDescription>
                Understand how fast inventory is sold and replaced—improves
                efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">Grade A (≥12x)</h3>
                  <p className="text-2xl font-bold text-green-700">
                    {
                      turnoverAnalysis.filter(
                        (item) => item.performanceGrade === "A",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-green-600">
                    Excellent performance
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">Grade B (6-12x)</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    {
                      turnoverAnalysis.filter(
                        (item) => item.performanceGrade === "B",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-blue-600">Good performance</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-900">
                    Grade C (3-6x)
                  </h3>
                  <p className="text-2xl font-bold text-yellow-700">
                    {
                      turnoverAnalysis.filter(
                        (item) => item.performanceGrade === "C",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-yellow-600">Needs improvement</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900">Grade D (&lt;3x)</h3>
                  <p className="text-2xl font-bold text-red-700">
                    {
                      turnoverAnalysis.filter(
                        (item) => item.performanceGrade === "D",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-red-600">Poor performance</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Item
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Turnover Ratio
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Days in Inventory
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Sales Velocity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Grade
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Avg Inventory Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {turnoverAnalysis.slice(0, 10).map((analysis) => (
                        <tr key={analysis.itemId} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">
                              {analysis.itemName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {analysis.category}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            {analysis.turnoverRatio.toFixed(1)}x
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {analysis.daysInInventory.toFixed(0)} days
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {analysis.salesVelocity}/month
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                analysis.performanceGrade === "A"
                                  ? "bg-green-100 text-green-800"
                                  : analysis.performanceGrade === "B"
                                    ? "bg-blue-100 text-blue-800"
                                    : analysis.performanceGrade === "C"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                              }
                            >
                              Grade {analysis.performanceGrade}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            ${analysis.avgInventoryValue.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
