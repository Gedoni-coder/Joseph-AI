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
import {
  Factory,
  Truck,
  Users,
  Globe,
  Shield,
  Leaf,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  MapPin,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  BarChart3,
  RefreshCw,
  ArrowUpDown,
  Network,
  Package,
} from "lucide-react";
import { useSupplyChainManagement } from "@/hooks/useInventorySupplyChainData";

export function SupplyChainManagement() {
  const {
    filteredSuppliers,
    selectedSupplierType,
    setSelectedSupplierType,
    riskFilter,
    setRiskFilter,
    procurementData,
    productionPlans,
    warehouseMetrics,
    logisticsTracking,
    supplierPerformance,
    marketVolatility,
    complianceUpdates,
    disruptionRisks,
    sustainabilityMetrics,
    strategies,
    costToServeAnalysis,
    inventoryModelRecommendation,
    supplyChainInsights,
  } = useSupplyChainManagement();

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      case "critical":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "planned":
        return "bg-yellow-100 text-yellow-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header and Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Suppliers
                </p>
                <p className="text-2xl font-bold">
                  {supplyChainInsights.totalSuppliers}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Active partnerships</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  On-Time Delivery
                </p>
                <p className="text-2xl font-bold">
                  {supplyChainInsights.onTimeDelivery.toFixed(1)}%
                </p>
              </div>
              <Truck className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Average performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Quality Score
                </p>
                <p className="text-2xl font-bold">
                  {supplyChainInsights.qualityScore.toFixed(1)}%
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Average quality rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Cost Savings
                </p>
                <p className="text-2xl font-bold">
                  ${supplyChainInsights.costSavings.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">This quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alerts */}
      {disruptionRisks.filter((risk) => risk.riskScore > 0.2).length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            High-risk supply chain disruptions detected.{" "}
            {disruptionRisks.filter((risk) => risk.riskScore > 0.2).length}{" "}
            risks require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="internal-factors" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="internal-factors">
            🏭 Internal Factors
          </TabsTrigger>
          <TabsTrigger value="external-factors">
            🌍 External Factors
          </TabsTrigger>
          <TabsTrigger value="strategy">🎯 Strategy</TabsTrigger>
        </TabsList>

        {/* Internal Factors */}
        <TabsContent value="internal-factors" className="space-y-4">
          <Tabs defaultValue="procurement" className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="procurement" className="text-xs">
                Procurement
              </TabsTrigger>
              <TabsTrigger value="production" className="text-xs">
                Production
              </TabsTrigger>
              <TabsTrigger value="warehouse" className="text-xs">
                Warehouse
              </TabsTrigger>
              <TabsTrigger value="logistics" className="text-xs">
                Logistics
              </TabsTrigger>
              <TabsTrigger value="supplier-relations" className="text-xs">
                Supplier Relations
              </TabsTrigger>
            </TabsList>

            {/* Procurement Efficiency */}
            <TabsContent value="procurement" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Procurement Efficiency
                      </CardTitle>
                      <CardDescription>
                        Evaluate and improve purchasing practices from suppliers
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Select
                        value={selectedSupplierType}
                        onValueChange={setSelectedSupplierType}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Supplier Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="manufacturer">
                            Manufacturer
                          </SelectItem>
                          <SelectItem value="distributor">
                            Distributor
                          </SelectItem>
                          <SelectItem value="wholesaler">Wholesaler</SelectItem>
                          <SelectItem value="service-provider">
                            Service Provider
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900">
                        Active Procurement
                      </h3>
                      <p className="text-2xl font-bold text-blue-700">
                        {procurementData.length}
                      </p>
                      <p className="text-sm text-blue-600">Categories</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-900">
                        Avg Lead Time
                      </h3>
                      <p className="text-2xl font-bold text-green-700">
                        {(
                          procurementData.reduce(
                            (sum, p) => sum + p.avgLeadTime,
                            0,
                          ) / procurementData.length || 0
                        ).toFixed(0)}{" "}
                        days
                      </p>
                      <p className="text-sm text-green-600">Delivery time</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-medium text-purple-900">
                        Cost Savings
                      </h3>
                      <p className="text-2xl font-bold text-purple-700">
                        $
                        {procurementData
                          .reduce((sum, p) => sum + p.costSavings, 0)
                          .toLocaleString()}
                      </p>
                      <p className="text-sm text-purple-600">This quarter</p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Category
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Supplier
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Items
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Value
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Lead Time
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Quality Rate
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Efficiency
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {procurementData.map((proc) => {
                            const supplier = filteredSuppliers.find(
                              (s) => s.id === proc.supplierId,
                            );
                            return (
                              <tr key={proc.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">
                                  {proc.category}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {supplier?.name}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {proc.itemCount}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium">
                                  ${proc.totalValue.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {proc.avgLeadTime} days
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`text-sm font-medium ${getPerformanceColor(100 - proc.qualityRejectionRate * 10)}`}
                                  >
                                    {(
                                      100 -
                                      proc.qualityRejectionRate * 10
                                    ).toFixed(1)}
                                    %
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={proc.processEfficiency}
                                      className="w-16 h-2"
                                    />
                                    <span className="text-sm">
                                      {proc.processEfficiency}%
                                    </span>
                                  </div>
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

            {/* Production Planning */}
            <TabsContent value="production" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="h-5 w-5" />
                    Production Planning
                  </CardTitle>
                  <CardDescription>
                    Align manufacturing with demand, minimize bottlenecks and
                    downtime
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900">
                        Active Plans
                      </h3>
                      <p className="text-2xl font-bold text-blue-700">
                        {productionPlans.length}
                      </p>
                      <p className="text-sm text-blue-600">In progress</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-900">
                        Avg Efficiency
                      </h3>
                      <p className="text-2xl font-bold text-green-700">
                        {(
                          productionPlans.reduce(
                            (sum, p) => sum + p.efficiency,
                            0,
                          ) / productionPlans.length || 0
                        ).toFixed(1)}
                        %
                      </p>
                      <p className="text-sm text-green-600">
                        Production efficiency
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-medium text-yellow-900">
                        Resource Utilization
                      </h3>
                      <p className="text-2xl font-bold text-yellow-700">
                        {(
                          productionPlans.reduce(
                            (sum, p) => sum + p.resourceUtilization,
                            0,
                          ) / productionPlans.length || 0
                        ).toFixed(1)}
                        %
                      </p>
                      <p className="text-sm text-yellow-600">
                        Average utilization
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-medium text-purple-900">
                        Quality Rate
                      </h3>
                      <p className="text-2xl font-bold text-purple-700">
                        {(
                          productionPlans.reduce(
                            (sum, p) => sum + p.qualityRate,
                            0,
                          ) / productionPlans.length || 0
                        ).toFixed(1)}
                        %
                      </p>
                      <p className="text-sm text-purple-600">Average quality</p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Product
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Planned Qty
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Actual Qty
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Timeline
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Efficiency
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Bottlenecks
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {productionPlans.map((plan) => (
                            <tr key={plan.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium text-gray-900">
                                {plan.productName}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {plan.plannedQuantity}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {plan.actualQuantity}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {plan.startDate.toLocaleDateString()} -{" "}
                                {plan.endDate.toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`text-sm font-medium ${getPerformanceColor(plan.efficiency)}`}
                                >
                                  {plan.efficiency}%
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <Badge className={getStatusColor(plan.status)}>
                                  {plan.status.replace("-", " ")}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {plan.bottlenecks.length > 0
                                  ? plan.bottlenecks.join(", ")
                                  : "None"}
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

            {/* Warehouse Management */}
            <TabsContent value="warehouse" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Warehouse Management
                  </CardTitle>
                  <CardDescription>
                    Optimize storage, layout, and movement within warehouses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {warehouseMetrics.map((warehouse) => (
                    <div
                      key={warehouse.locationId}
                      className="border rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">
                          {warehouse.locationName}
                        </h3>
                        <Badge variant="outline">
                          {warehouse.utilizationRate}% utilized
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {warehouse.throughputDaily}
                          </p>
                          <p className="text-sm text-gray-600">
                            Daily Throughput
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">
                            {warehouse.pickingAccuracy}%
                          </p>
                          <p className="text-sm text-gray-600">
                            Picking Accuracy
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-yellow-600">
                            {warehouse.cycleTime}h
                          </p>
                          <p className="text-sm text-gray-600">Cycle Time</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">
                            {warehouse.orderFulfillmentRate}%
                          </p>
                          <p className="text-sm text-gray-600">
                            Fulfillment Rate
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Capacity Utilization
                          </span>
                          <span className="text-sm font-medium">
                            {warehouse.utilizationRate}%
                          </span>
                        </div>
                        <Progress
                          value={warehouse.utilizationRate}
                          className="h-2"
                        />

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Labor Productivity
                          </span>
                          <span className="text-sm font-medium">
                            {warehouse.laborProductivity}%
                          </span>
                        </div>
                        <Progress
                          value={warehouse.laborProductivity}
                          className="h-2"
                        />

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Storage Efficiency
                          </span>
                          <span className="text-sm font-medium">
                            {warehouse.storageEfficiency}%
                          </span>
                        </div>
                        <Progress
                          value={warehouse.storageEfficiency}
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Logistics & Delivery Tracking */}
            <TabsContent value="logistics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Logistics & Delivery Tracking
                  </CardTitle>
                  <CardDescription>
                    Monitor delivery times, fleet efficiency, and routing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900">
                        Active Shipments
                      </h3>
                      <p className="text-2xl font-bold text-blue-700">
                        {logisticsTracking.length}
                      </p>
                      <p className="text-sm text-blue-600">In transit</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-900">
                        Avg Delivery Time
                      </h3>
                      <p className="text-2xl font-bold text-green-700">
                        {(
                          logisticsTracking.reduce(
                            (sum, l) => sum + l.deliveryTime,
                            0,
                          ) / logisticsTracking.length || 0
                        ).toFixed(0)}
                        h
                      </p>
                      <p className="text-sm text-green-600">Average time</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-medium text-purple-900">
                        Customer Satisfaction
                      </h3>
                      <p className="text-2xl font-bold text-purple-700">
                        {(
                          logisticsTracking.reduce(
                            (sum, l) => sum + (l.customerSatisfaction || 0),
                            0,
                          ) / logisticsTracking.length || 0
                        ).toFixed(1)}
                        /5
                      </p>
                      <p className="text-sm text-purple-600">Average rating</p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Shipment ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Carrier
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Route
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Est. Delivery
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Cost
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Tracking
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {logisticsTracking.map((shipment) => (
                            <tr
                              key={shipment.shipmentId}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 font-medium text-gray-900">
                                {shipment.shipmentId}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {shipment.carrier}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-gray-400" />
                                  {shipment.origin} → {shipment.destination}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {shipment.estimatedDelivery.toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3">
                                <Badge
                                  className={getStatusColor(shipment.status)}
                                >
                                  {shipment.status.replace("-", " ")}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm font-medium">
                                ${shipment.cost}
                              </td>
                              <td className="px-4 py-3 text-sm font-mono">
                                {shipment.trackingNumber}
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

            {/* Supplier Relationship Monitoring */}
            <TabsContent value="supplier-relations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Supplier Relationship Monitoring
                  </CardTitle>
                  <CardDescription>
                    Analyze vendor performance, pricing, and delivery
                    reliability
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 mb-4">
                    <Select value={riskFilter} onValueChange={setRiskFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Risk Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="critical">Critical Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Supplier
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Rating
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              On-Time Delivery
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Quality Score
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Lead Time
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Risk Level
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Spend
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredSuppliers.slice(0, 10).map((supplier) => (
                            <tr key={supplier.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {supplier.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {supplier.country}
                                  </p>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className="capitalize">
                                  {supplier.type.replace("-", " ")}
                                </Badge>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={supplier.rating}
                                    className="w-16 h-2"
                                  />
                                  <span className="text-sm">
                                    {supplier.rating}/100
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`text-sm font-medium ${getPerformanceColor(supplier.deliveryScore)}`}
                                >
                                  {supplier.deliveryScore}%
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`text-sm font-medium ${getPerformanceColor(supplier.qualityScore)}`}
                                >
                                  {supplier.qualityScore}%
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {supplier.leadTime} days
                              </td>
                              <td className="px-4 py-3">
                                <Badge
                                  className={getRiskColor(supplier.riskLevel)}
                                >
                                  {supplier.riskLevel}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm font-medium">
                                ${supplier.totalSpend.toLocaleString()}
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
        </TabsContent>

        {/* External Factors */}
        <TabsContent value="external-factors" className="space-y-4">
          <Tabs defaultValue="market-volatility" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="market-volatility" className="text-xs">
                Market Volatility
              </TabsTrigger>
              <TabsTrigger value="compliance" className="text-xs">
                Compliance
              </TabsTrigger>
              <TabsTrigger value="disruption-risks" className="text-xs">
                Disruption Risks
              </TabsTrigger>
              <TabsTrigger value="sustainability" className="text-xs">
                Sustainability
              </TabsTrigger>
            </TabsList>

            {/* Market & Price Volatility */}
            <TabsContent value="market-volatility" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Market & Price Volatility
                  </CardTitle>
                  <CardDescription>
                    Track fluctuations in raw material costs or product demand
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {marketVolatility.map((commodity) => (
                      <div
                        key={commodity.commodity}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{commodity.commodity}</h3>
                          <Badge className={getRiskColor(commodity.riskLevel)}>
                            {commodity.riskLevel} risk
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">
                              Current Price:
                            </span>
                            <p className="font-medium">
                              ${commodity.currentPrice}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">
                              Volatility Index:
                            </span>
                            <p className="font-medium">
                              {(commodity.volatilityIndex * 100).toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">30d Change:</span>
                            <p
                              className={`font-medium ${commodity.priceChange30d >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {commodity.priceChange30d >= 0 ? "+" : ""}
                              {commodity.priceChange30d}%
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">90d Change:</span>
                            <p
                              className={`font-medium ${commodity.priceChange90d >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {commodity.priceChange90d >= 0 ? "+" : ""}
                              {commodity.priceChange90d}%
                            </p>
                          </div>
                        </div>

                        <div className="text-sm">
                          <span className="text-gray-500">Forecast Trend:</span>
                          <p className="font-medium capitalize">
                            {commodity.forecastTrend}
                          </p>
                        </div>

                        <div className="mt-3 p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600">
                            Hedging Recommendation:
                          </p>
                          <p className="text-sm font-medium">
                            {commodity.hedgingRecommendation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Regulatory & Compliance Shifts */}
            <TabsContent value="compliance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Regulatory & Compliance Shifts
                  </CardTitle>
                  <CardDescription>
                    Stay ahead of import/export regulations, tariffs, and
                    environmental policies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {complianceUpdates.map((update) => (
                    <div key={update.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{update.title}</h3>
                        <div className="flex gap-2">
                          <Badge
                            className={getRiskColor(
                              update.impactLevel.replace("-", " "),
                            )}
                          >
                            {update.impactLevel.replace("-", " ")} impact
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {update.type}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        {update.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Effective Date:</span>
                          <p className="font-medium">
                            {update.effectiveDate.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Deadline:</span>
                          <p className="font-medium">
                            {update.deadlineDate?.toLocaleDateString() || "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            Affected Regions:
                          </span>
                          <p className="font-medium">
                            {update.affectedRegions.join(", ")}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <Badge
                            className={getStatusColor(update.compliance_status)}
                          >
                            {update.compliance_status.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-gray-500">Required Actions:</span>
                        <ul className="list-disc list-inside mt-1">
                          {update.requiredActions.map((action, index) => (
                            <li key={index} className="text-gray-700">
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Disruption Risk Assessment */}
            <TabsContent value="disruption-risks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Disruption Risk Assessment
                  </CardTitle>
                  <CardDescription>
                    Monitor external risks like geopolitical tensions,
                    pandemics, or shipping delays
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {disruptionRisks.map((risk) => (
                    <div key={risk.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{risk.description}</h3>
                        <div className="flex gap-2">
                          <Badge
                            className={getRiskColor(
                              risk.riskScore > 0.3
                                ? "high"
                                : risk.riskScore > 0.15
                                  ? "medium"
                                  : "low",
                            )}
                          >
                            Risk Score: {(risk.riskScore * 100).toFixed(0)}%
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {risk.type.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Probability:</span>
                          <p className="font-medium">
                            {(risk.probability * 100).toFixed(0)}%
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Impact:</span>
                          <p className="font-medium">
                            {(risk.impact * 100).toFixed(0)}%
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            Affected Suppliers:
                          </span>
                          <p className="font-medium">
                            {risk.affectedSuppliers.length}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <Badge
                            className={getStatusColor(risk.monitoringStatus)}
                          >
                            {risk.monitoringStatus}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">
                            Mitigation Strategies:
                          </span>
                          <ul className="list-disc list-inside mt-1">
                            {risk.mitigationStrategies.map(
                              (strategy, index) => (
                                <li key={index} className="text-gray-700">
                                  {strategy}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            Contingency Plans:
                          </span>
                          <ul className="list-disc list-inside mt-1">
                            {risk.contingencyPlans.map((plan, index) => (
                              <li key={index} className="text-gray-700">
                                {plan}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sustainability & Green Sourcing */}
            <TabsContent value="sustainability" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Sustainability & Green Sourcing
                  </CardTitle>
                  <CardDescription>
                    Encourage eco-friendly supplier practices and carbon
                    footprint tracking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-900">
                        Avg Carbon Footprint
                      </h3>
                      <p className="text-2xl font-bold text-green-700">
                        {(
                          sustainabilityMetrics.reduce(
                            (sum, s) => sum + s.carbonFootprint,
                            0,
                          ) / sustainabilityMetrics.length || 0
                        ).toFixed(0)}{" "}
                        tCO2
                      </p>
                      <p className="text-sm text-green-600">
                        Per supplier annually
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900">
                        Renewable Energy
                      </h3>
                      <p className="text-2xl font-bold text-blue-700">
                        {(
                          sustainabilityMetrics.reduce(
                            (sum, s) => sum + s.renewableEnergyUsage,
                            0,
                          ) / sustainabilityMetrics.length || 0
                        ).toFixed(1)}
                        %
                      </p>
                      <p className="text-sm text-blue-600">Average usage</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-medium text-purple-900">
                        Green Score
                      </h3>
                      <p className="text-2xl font-bold text-purple-700">
                        {(
                          sustainabilityMetrics.reduce(
                            (sum, s) => sum + s.greenSourcingScore,
                            0,
                          ) / sustainabilityMetrics.length || 0
                        ).toFixed(0)}
                        /100
                      </p>
                      <p className="text-sm text-purple-600">Average score</p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Supplier
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Carbon Footprint
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Renewable Energy
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Waste Reduction
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Social Impact
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Green Score
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Rank
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {sustainabilityMetrics.slice(0, 10).map((metrics) => (
                            <tr
                              key={metrics.supplierId}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 font-medium text-gray-900">
                                {metrics.supplierName}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {metrics.carbonFootprint} tCO2
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`text-sm font-medium ${getPerformanceColor(metrics.renewableEnergyUsage)}`}
                                >
                                  {metrics.renewableEnergyUsage}%
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`text-sm font-medium ${getPerformanceColor(metrics.wasteReduction)}`}
                                >
                                  {metrics.wasteReduction}%
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`text-sm font-medium ${getPerformanceColor(metrics.socialImpactScore)}`}
                                >
                                  {metrics.socialImpactScore}/100
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={metrics.greenSourcingScore}
                                    className="w-16 h-2"
                                  />
                                  <span className="text-sm">
                                    {metrics.greenSourcingScore}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                #{metrics.sustainabilityRank}
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
        </TabsContent>

        {/* Strategy */}
        <TabsContent value="strategy" className="space-y-4">
          <Tabs defaultValue="optimization" className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="optimization" className="text-xs">
                Optimization
              </TabsTrigger>
              <TabsTrigger value="diversification" className="text-xs">
                Diversification
              </TabsTrigger>
              <TabsTrigger value="resilience" className="text-xs">
                Resilience
              </TabsTrigger>
              <TabsTrigger value="cost-analysis" className="text-xs">
                Cost Analysis
              </TabsTrigger>
              <TabsTrigger value="inventory-model" className="text-xs">
                Inventory Model
              </TabsTrigger>
            </TabsList>

            {/* Supply Chain Optimization Strategy */}
            <TabsContent value="optimization" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Supply Chain Optimization Strategy
                  </CardTitle>
                  <CardDescription>
                    Recommend adjustments to sourcing, logistics, or
                    manufacturing priorities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {strategies
                      .filter((s) => s.type === "optimization")
                      .map((strategy) => (
                        <div
                          key={strategy.id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">{strategy.title}</h3>
                            <Badge
                              className={
                                strategy.priority === "critical"
                                  ? "bg-red-100 text-red-800"
                                  : strategy.priority === "high"
                                    ? "bg-orange-100 text-orange-800"
                                    : strategy.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                              }
                            >
                              {strategy.priority}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">
                            {strategy.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-gray-500">ROI:</span>
                              <p className="font-medium text-green-600">
                                {strategy.roi}%
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Investment:</span>
                              <p className="font-medium">
                                ${strategy.investmentRequired.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Timeline:</span>
                              <p className="font-medium">
                                {strategy.implementationTime}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Risk:</span>
                              <Badge
                                className={getRiskColor(strategy.riskLevel)}
                              >
                                {strategy.riskLevel}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-sm mb-3">
                            <span className="text-gray-500">
                              Expected Impact:
                            </span>
                            <p className="font-medium">
                              {strategy.expectedImpact}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              Implement
                            </Button>
                            <Button size="sm" variant="outline">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Supplier Diversification Plan */}
            <TabsContent value="diversification" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Supplier Diversification Plan
                  </CardTitle>
                  <CardDescription>
                    Reduce reliance on single suppliers by suggesting
                    alternatives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {strategies
                      .filter((s) => s.type === "diversification")
                      .map((strategy) => (
                        <div
                          key={strategy.id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">{strategy.title}</h3>
                            <Badge className={getStatusColor(strategy.status)}>
                              {strategy.status.replace("-", " ")}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">
                            {strategy.description}
                          </p>

                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">
                                Dependencies:
                              </span>
                              <ul className="list-disc list-inside mt-1">
                                {strategy.dependencies.map((dep, index) => (
                                  <li key={index} className="text-gray-700">
                                    {dep}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="text-gray-500">KPIs:</span>
                              <ul className="list-disc list-inside mt-1">
                                {strategy.kpis.map((kpi, index) => (
                                  <li key={index} className="text-gray-700">
                                    {kpi}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Progress:</span>
                              <span className="font-medium">75%</span>
                            </div>
                            <Progress value={75} className="mt-1 h-2" />
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resilience Planning */}
            <TabsContent value="resilience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Resilience Planning
                  </CardTitle>
                  <CardDescription>
                    Build contingency strategies for potential breakdowns in the
                    supply chain
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900">
                        Resilience Score
                      </h3>
                      <p className="text-2xl font-bold text-blue-700">
                        {supplyChainInsights.resilienceScore}/100
                      </p>
                      <p className="text-sm text-blue-600">Current level</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-900">
                        Diversification Index
                      </h3>
                      <p className="text-2xl font-bold text-green-700">
                        {supplyChainInsights.diversificationIndex}
                      </p>
                      <p className="text-sm text-green-600">
                        Supplier diversity
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-medium text-yellow-900">
                        Risk Coverage
                      </h3>
                      <p className="text-2xl font-bold text-yellow-700">87%</p>
                      <p className="text-sm text-yellow-600">Risks mitigated</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {strategies
                      .filter((s) => s.type === "resilience")
                      .map((strategy) => (
                        <div
                          key={strategy.id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">{strategy.title}</h3>
                            <Badge className={getRiskColor(strategy.riskLevel)}>
                              {strategy.riskLevel} risk
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">
                            {strategy.description}
                          </p>

                          <div className="text-sm mb-3">
                            <span className="text-gray-500">
                              Expected Impact:
                            </span>
                            <p className="font-medium">
                              {strategy.expectedImpact}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500">Timeline:</span>
                              <p className="font-medium">
                                {strategy.implementationTime}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Investment:</span>
                              <p className="font-medium">
                                ${strategy.investmentRequired.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cost-to-Serve Analysis */}
            <TabsContent value="cost-analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Cost-to-Serve Analysis
                  </CardTitle>
                  <CardDescription>
                    Calculate the true cost of delivering each product or
                    service to customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Customer
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Revenue
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Direct Costs
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Total Cost
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Profit Margin
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Profitability
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {costToServeAnalysis.map((analysis) => (
                            <tr
                              key={analysis.customerId}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 font-medium text-gray-900">
                                {analysis.customerName}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {analysis.customerType}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium">
                                ${analysis.revenue.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                ${analysis.directCosts.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                ${analysis.totalCostToServe.toLocaleString()}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`text-sm font-medium ${getPerformanceColor(analysis.profitMargin)}`}
                                >
                                  {analysis.profitMargin.toFixed(1)}%
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <Badge
                                  className={
                                    analysis.profitability === "high"
                                      ? "bg-green-100 text-green-800"
                                      : analysis.profitability === "medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : analysis.profitability === "low"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-red-200 text-red-900"
                                  }
                                >
                                  {analysis.profitability}
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

            {/* Just-In-Time vs Just-In-Case Strategy Selector */}
            <TabsContent value="inventory-model" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpDown className="h-5 w-5" />
                    Just-In-Time vs Just-In-Case Strategy Selector
                  </CardTitle>
                  <CardDescription>
                    Help businesses choose an inventory model based on demand
                    stability and risk tolerance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">
                        Recommended Model:{" "}
                        {inventoryModelRecommendation.modelType.toUpperCase()}
                      </h3>
                      <Badge variant="outline">
                        {inventoryModelRecommendation.confidence}% confidence
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">
                          Risk Tolerance:
                        </span>
                        <p className="font-medium capitalize">
                          {inventoryModelRecommendation.riskTolerance}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Demand Stability:
                        </span>
                        <p className="font-medium capitalize">
                          {inventoryModelRecommendation.demandStability}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Supplier Reliability:
                        </span>
                        <p className="font-medium">
                          {inventoryModelRecommendation.supplierReliability}%
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Storage Costs:
                        </span>
                        <p className="font-medium">
                          $
                          {inventoryModelRecommendation.storageCosts.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Recommendation
                      </h4>
                      <p className="text-sm text-gray-600">
                        {inventoryModelRecommendation.recommendation}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-900 mb-2">
                          Benefits
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {inventoryModelRecommendation.benefits.map(
                            (benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ),
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-900 mb-2">Risks</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {inventoryModelRecommendation.risks.map(
                            (risk, index) => (
                              <li key={index}>{risk}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">
                          Implementation Confidence:
                        </span>
                        <span className="font-medium">
                          {inventoryModelRecommendation.confidence}%
                        </span>
                      </div>
                      <Progress
                        value={inventoryModelRecommendation.confidence}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
