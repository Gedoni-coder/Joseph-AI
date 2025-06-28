import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TimeValueAnalysis } from "@/lib/feasibility-data";
import {
  Clock,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeValueAnalysisProps {
  timeValueData: TimeValueAnalysis;
  title?: string;
}

export function TimeValueAnalysisComponent({
  timeValueData,
  title = "Time Value Analysis (NPV)",
}: TimeValueAnalysisProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const getNPVColor = (npv: number) => {
    if (npv > 0) return "text-green-600 bg-green-100";
    if (npv < 0) return "text-red-600 bg-red-100";
    return "text-gray-600 bg-gray-100";
  };

  const getNPVStatus = (npv: number) => {
    if (npv > 500000) return "Highly Positive";
    if (npv > 100000) return "Positive";
    if (npv > 0) return "Marginally Positive";
    if (npv > -100000) return "Marginally Negative";
    return "Negative";
  };

  const getIRRColor = (irr: number, discountRate: number) => {
    if (irr > discountRate * 1.5) return "text-green-600 bg-green-100";
    if (irr > discountRate) return "text-blue-600 bg-blue-100";
    return "text-red-600 bg-red-100";
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case "conservative":
        return "bg-red-100 text-red-800 border-red-200";
      case "safe":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "wild":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Badge className={cn("text-xs", getModeColor(timeValueData.mode))}>
            {timeValueData.mode} mode
          </Badge>
          <Badge
            className={cn("text-xs border", getNPVColor(timeValueData.npv))}
          >
            NPV: {getNPVStatus(timeValueData.npv)}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Net Present Value</div>
                <div
                  className={cn(
                    "text-xl font-bold",
                    timeValueData.npv > 0 ? "text-green-600" : "text-red-600",
                  )}
                >
                  {formatCurrency(timeValueData.npv)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">
                  Internal Rate of Return
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {formatPercentage(timeValueData.irr)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Discount Rate</div>
                <div className="text-xl font-bold text-purple-600">
                  {formatPercentage(timeValueData.discountRate)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NPV Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">NPV Analysis & Decision</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {formatCurrency(timeValueData.npv)}
                </div>
                <div className="text-sm text-gray-600">
                  Net Present Value at{" "}
                  {formatPercentage(timeValueData.discountRate)} discount rate
                </div>
              </div>
              <div className="text-right">
                <Badge
                  className={cn(
                    "text-sm px-3 py-1",
                    timeValueData.npv > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800",
                  )}
                >
                  {timeValueData.npv > 0 ? "ACCEPT" : "REJECT"}
                </Badge>
                <div className="text-xs text-gray-600 mt-1">
                  Investment Decision
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm">
                <strong>Decision Rule:</strong> If NPV {">"} 0, the project adds
                value and should be accepted. If NPV {"<"} 0, the project
                destroys value and should be rejected.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IRR vs Discount Rate */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">IRR vs Required Return</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">
                  Internal Rate of Return (IRR)
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatPercentage(timeValueData.irr)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">
                  Required Return (Discount Rate)
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatPercentage(timeValueData.discountRate)}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>IRR Premium over Required Return</span>
                <span
                  className={cn(
                    "font-semibold",
                    timeValueData.irr > timeValueData.discountRate
                      ? "text-green-600"
                      : "text-red-600",
                  )}
                >
                  {formatPercentage(
                    timeValueData.irr - timeValueData.discountRate,
                  )}
                </span>
              </div>
              <Progress
                value={Math.min(
                  100,
                  (timeValueData.irr / (timeValueData.discountRate * 2)) * 100,
                )}
                className={cn(
                  "h-3",
                  timeValueData.irr > timeValueData.discountRate
                    ? "[&>div]:bg-green-500"
                    : "[&>div]:bg-red-500",
                )}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm">
                <strong>Decision Rule:</strong> If IRR {">"} Required Return,
                the project is acceptable. The higher the IRR premium, the more
                attractive the investment.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Present Value Cash Flow Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {timeValueData.presentValueCashFlows.map((pv, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-600 mb-1">
                    Year {index + 1}
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-lg text-sm font-semibold",
                      pv > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800",
                    )}
                  >
                    {formatCurrency(pv)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Total Present Value:
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {formatCurrency(
                    timeValueData.presentValueCashFlows.reduce(
                      (sum, pv) => sum + pv,
                      0,
                    ),
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cumulative NPV Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Cumulative NPV Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {timeValueData.cumulativeNPV.map((cumulativeNPV, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-xs text-center text-gray-600">
                    Year {index + 1}
                  </div>
                  <div className="relative">
                    <div
                      className={cn(
                        "w-full rounded text-center text-xs font-medium py-2",
                        cumulativeNPV > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800",
                      )}
                      style={{
                        height: `${Math.max(
                          30,
                          Math.min(100, Math.abs(cumulativeNPV) / 50000),
                        )}px`,
                      }}
                    >
                      {formatCurrency(cumulativeNPV)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {timeValueData.breakEvenYear && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    <strong>Break-even Year:</strong> Year{" "}
                    {timeValueData.breakEvenYear} (NPV becomes positive)
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
