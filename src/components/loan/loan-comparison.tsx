import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FundingOption, LoanComparison } from "@/lib/loan-funding-data";
import {
  Calculator,
  DollarSign,
  Percent,
  Calendar,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Target,
  RefreshCw,
  Plus,
  X,
} from "lucide-react";

interface LoanComparisonProps {
  fundingOptions: FundingOption[];
  comparisons: LoanComparison[];
  onCompareLoans: (
    optionIds: string[],
    amount: number,
    term: number,
  ) => Promise<void>;
  getLoanCalculations: (
    optionId: string,
    amount: number,
    term: number,
  ) => {
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    apr: number;
  };
  isProcessing: boolean;
}

export const LoanComparisonComponent = ({
  fundingOptions,
  comparisons,
  onCompareLoans,
  getLoanCalculations,
  isProcessing,
}: LoanComparisonProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [loanAmount, setLoanAmount] = useState(250000);
  const [repaymentTerm, setRepaymentTerm] = useState(60);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "best_rate":
        return "bg-green-100 text-green-800 border-green-200";
      case "best_terms":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "fastest_approval":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "most_flexible":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "best_rate":
        return <DollarSign className="h-4 w-4" />;
      case "best_terms":
        return <CheckCircle className="h-4 w-4" />;
      case "fastest_approval":
        return <Calendar className="h-4 w-4" />;
      case "most_flexible":
        return <Target className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      }
      if (prev.length >= 4) {
        return prev; // Max 4 options
      }
      return [...prev, optionId];
    });
  };

  const handleCompare = async () => {
    if (selectedOptions.length >= 2) {
      await onCompareLoans(selectedOptions, loanAmount, repaymentTerm);
    }
  };

  const latestComparison = comparisons.length > 0 ? comparisons[0] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Smart Loan Comparison Tool
          </h2>
          <p className="text-gray-600">
            Compare funding options side-by-side with detailed cost analysis
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Calculator className="h-3 w-3" />
          {selectedOptions.length} Selected
        </Badge>
      </div>

      {/* Selection and Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Comparison Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Loan Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Loan Amount: {formatCurrency(loanAmount)}
              </label>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$10K</span>
                <span>$5M</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Repayment Term: {repaymentTerm} months
              </label>
              <input
                type="range"
                min="12"
                max="300"
                step="6"
                value={repaymentTerm}
                onChange={(e) => setRepaymentTerm(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 year</span>
                <span>25 years</span>
              </div>
            </div>
          </div>

          {/* Option Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                Select Funding Options to Compare (Max 4)
              </div>
              <div className="text-xs text-gray-500">
                {selectedOptions.length}/4 selected
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {fundingOptions.slice(0, 12).map((option) => {
                const isSelected = selectedOptions.includes(option.id);
                const calculations = getLoanCalculations(
                  option.id,
                  loanAmount,
                  repaymentTerm,
                );

                return (
                  <div
                    key={option.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleOptionToggle(option.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{option.name}</div>
                        <div className="text-xs text-gray-600">
                          {option.provider}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatCurrency(calculations.monthlyPayment)}/month
                        </div>
                      </div>
                      <div className="ml-2">
                        {isSelected ? (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                            <Plus className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compare Button */}
          <div className="flex items-center justify-center">
            <Button
              onClick={handleCompare}
              disabled={selectedOptions.length < 2 || isProcessing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Compare Selected Options
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {latestComparison && (
        <>
          {/* Comparison Summary */}
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Comparison Results
              </CardTitle>
              <div className="text-sm text-gray-600">
                {formatCurrency(latestComparison.loanAmount)} over{" "}
                {latestComparison.repaymentTerm} months
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {latestComparison.comparisons.length}
                  </div>
                  <div className="text-sm text-gray-600">Options Compared</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(
                      Math.min(
                        ...latestComparison.comparisons.map(
                          (c) => c.monthlyPayment,
                        ),
                      ),
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Lowest Monthly Payment
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatPercentage(
                      Math.min(
                        ...latestComparison.comparisons.map((c) => c.apr),
                      ),
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Best APR</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {formatCurrency(
                      Math.min(
                        ...latestComparison.comparisons.map((c) => c.totalCost),
                      ),
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Lowest Total Cost</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {latestComparison.comparisons.map((comparison) => {
              const option = fundingOptions.find(
                (o) => o.id === comparison.optionId,
              );
              if (!option) return null;

              const isBest =
                comparison.optionId === latestComparison.bestOverall;

              return (
                <Card
                  key={comparison.optionId}
                  className={`hover:shadow-lg transition-shadow ${
                    isBest ? "border-2 border-green-400 bg-green-50" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{option.name}</CardTitle>
                        <div className="text-sm text-gray-600">
                          {option.provider}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {isBest && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <Award className="h-3 w-3 mr-1" />
                            Best Overall
                          </Badge>
                        )}
                        <Badge
                          className={getRecommendationColor(
                            comparison.recommendation,
                          )}
                        >
                          {getRecommendationIcon(comparison.recommendation)}
                          <span className="ml-1 capitalize">
                            {comparison.recommendation.replace("_", " ")}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="h-4 w-4 text-blue-600" />
                          <div className="text-sm text-blue-700">
                            Monthly Payment
                          </div>
                        </div>
                        <div className="text-xl font-bold text-blue-900">
                          {formatCurrency(comparison.monthlyPayment)}
                        </div>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Percent className="h-4 w-4 text-purple-600" />
                          <div className="text-sm text-purple-700">APR</div>
                        </div>
                        <div className="text-xl font-bold text-purple-900">
                          {formatPercentage(comparison.apr)}
                        </div>
                      </div>

                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-orange-600" />
                          <div className="text-sm text-orange-700">
                            Total Interest
                          </div>
                        </div>
                        <div className="text-xl font-bold text-orange-900">
                          {formatCurrency(comparison.totalInterest)}
                        </div>
                      </div>

                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <BarChart3 className="h-4 w-4 text-red-600" />
                          <div className="text-sm text-red-700">Total Cost</div>
                        </div>
                        <div className="text-xl font-bold text-red-900">
                          {formatCurrency(comparison.totalCost)}
                        </div>
                      </div>
                    </div>

                    {/* Fees Breakdown */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Fees Breakdown</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Application:</span>
                          <span className="font-medium">
                            {formatCurrency(option.fees.applicationFee)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Processing:</span>
                          <span className="font-medium">
                            {formatCurrency(option.fees.processingFee)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Maintenance:</span>
                          <span className="font-medium">
                            {formatCurrency(option.fees.maintenanceFee)}/mo
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Fees:</span>
                          <span className="font-medium">
                            {formatCurrency(comparison.totalFees)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Processing Time */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">
                            Processing Time
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {option.applicationProcess.timeToFunding} days
                          </div>
                          <div className="text-xs text-gray-600">
                            to funding
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Key Features</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          {option.eligibilityRequirements.collateralRequired ? (
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                          ) : (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          )}
                          {option.eligibilityRequirements.collateralRequired
                            ? "Collateral Required"
                            : "No Collateral"}
                        </div>
                        <div className="flex items-center gap-1">
                          {option.applicationProcess.onlineApplication ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-500" />
                          )}
                          {option.applicationProcess.onlineApplication
                            ? "Online Application"
                            : "Paper Application"}
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-blue-500" />
                          Rate: {option.interestRate.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-purple-500" />
                          {option.repaymentPeriod.min}-
                          {option.repaymentPeriod.max} months
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full" size="sm">
                      Apply for This Option
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Empty State */}
      {!latestComparison && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Comparisons Yet
            </h3>
            <p className="text-gray-600 mb-4">
              Select at least 2 funding options and set your loan parameters to
              compare costs and terms.
            </p>
            <div className="text-sm text-gray-500">
              💡 Tip: Compare different loan types to find the best fit for your
              business needs
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous Comparisons */}
      {comparisons.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Previous Comparisons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {comparisons.slice(1, 4).map((comparison, index) => (
                <div
                  key={comparison.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium">
                      {formatCurrency(comparison.loanAmount)} over{" "}
                      {comparison.repaymentTerm} months
                    </div>
                    <div className="text-sm text-gray-600">
                      {comparison.comparisons.length} options compared on{" "}
                      {new Date(comparison.comparisonDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
