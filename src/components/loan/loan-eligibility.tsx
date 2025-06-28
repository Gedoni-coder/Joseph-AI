import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BusinessProfile,
  EligibilityAssessment,
} from "@/lib/loan-funding-data";
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Shield,
  DollarSign,
  Building,
  Calendar,
  Award,
  BarChart3,
  Target,
  Zap,
  RefreshCw,
  Star,
} from "lucide-react";

interface LoanEligibilityProps {
  businessProfile: BusinessProfile | null;
  eligibilityAssessment: EligibilityAssessment | null;
  onRunAssessment: () => void;
  onUpdateProfile: (updates: Partial<BusinessProfile>) => void;
  isProcessing: boolean;
}

export const LoanEligibilityComponent = ({
  businessProfile,
  eligibilityAssessment,
  onRunAssessment,
  onUpdateProfile,
  isProcessing,
}: LoanEligibilityProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
      case "strong":
      case "high":
        return "bg-green-100 text-green-800";
      case "good":
      case "stable":
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "fair":
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "poor":
      case "weak":
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "very_high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!businessProfile) {
    return (
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-12 text-center">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Business Profile Found
          </h3>
          <p className="text-gray-600 mb-4">
            Please complete your business profile to run eligibility assessment.
          </p>
          <Button>Complete Business Profile</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Loan Eligibility & Assessment
          </h2>
          <p className="text-gray-600">
            AI-powered assessment of your loan eligibility and creditworthiness
          </p>
        </div>
        <Button
          onClick={onRunAssessment}
          disabled={isProcessing}
          className="flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Target className="h-4 w-4" />
              Run Assessment
            </>
          )}
        </Button>
      </div>

      {/* Business Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Business Profile Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Business Name</div>
              <div className="font-semibold">
                {businessProfile.businessName}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Industry</div>
              <div className="font-semibold">{businessProfile.industry}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Business Stage</div>
              <Badge className="capitalize">
                {businessProfile.businessStage.replace("_", " ")}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Years in Business</div>
              <div className="font-semibold">
                {businessProfile.yearsInBusiness}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Annual Revenue</div>
              <div className="font-semibold">
                {formatCurrency(businessProfile.annualRevenue)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Monthly Revenue</div>
              <div className="font-semibold">
                {formatCurrency(businessProfile.monthlyRevenue)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Credit Score</div>
              <div
                className={`font-semibold ${getScoreColor(businessProfile.creditScore)}`}
              >
                {businessProfile.creditScore}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Employees</div>
              <div className="font-semibold">
                {businessProfile.employeeCount}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div className="text-sm font-medium text-green-700">Assets</div>
              </div>
              <div className="text-lg font-bold text-green-900">
                {formatCurrency(businessProfile.assets)}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div className="text-sm font-medium text-blue-700">
                  Cash Flow
                </div>
              </div>
              <div className="text-lg font-bold text-blue-900">
                {formatCurrency(businessProfile.cashFlow)}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-purple-600" />
                <div className="text-sm font-medium text-purple-700">
                  Collateral
                </div>
              </div>
              <div className="text-lg font-bold text-purple-900">
                {businessProfile.hasCollateral
                  ? formatCurrency(businessProfile.collateralValue)
                  : "None"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eligibility Assessment Results */}
      {eligibilityAssessment && (
        <>
          {/* Overall Score */}
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Overall Eligibility Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl font-bold text-blue-600">
                  {eligibilityAssessment.overallScore}
                </div>
                <Badge
                  className={getScoreBadgeColor(
                    eligibilityAssessment.overallScore,
                  )}
                >
                  {eligibilityAssessment.overallScore >= 80
                    ? "Excellent"
                    : eligibilityAssessment.overallScore >= 60
                      ? "Good"
                      : "Needs Improvement"}
                </Badge>
              </div>
              <Progress
                value={eligibilityAssessment.overallScore}
                className="h-3 mb-4"
              />
              <div className="text-sm text-gray-600">
                Assessment completed on{" "}
                {new Date(
                  eligibilityAssessment.assessmentDate,
                ).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          {/* Eligible Loan Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Eligible Loan Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {eligibilityAssessment.eligibleLoanTypes.map(
                  (loanType, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-green-50 rounded-lg"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">
                        {loanType}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Criteria Assessment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Creditworthiness */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Creditworthiness
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Score</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold ${getScoreColor(eligibilityAssessment.criteria.creditworthiness.score)}`}
                    >
                      {eligibilityAssessment.criteria.creditworthiness.score}%
                    </span>
                    <Badge
                      className={getStatusColor(
                        eligibilityAssessment.criteria.creditworthiness.status,
                      )}
                    >
                      {eligibilityAssessment.criteria.creditworthiness.status}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={eligibilityAssessment.criteria.creditworthiness.score}
                  className="h-2"
                />
                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Factors:</div>
                  <ul className="text-sm space-y-1">
                    {eligibilityAssessment.criteria.creditworthiness.factors.map(
                      (factor, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600">{factor}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Financial Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Financial Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Score</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold ${getScoreColor(eligibilityAssessment.criteria.financialHealth.score)}`}
                    >
                      {eligibilityAssessment.criteria.financialHealth.score}%
                    </span>
                    <Badge
                      className={getStatusColor(
                        eligibilityAssessment.criteria.financialHealth.status,
                      )}
                    >
                      {eligibilityAssessment.criteria.financialHealth.status}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={eligibilityAssessment.criteria.financialHealth.score}
                  className="h-2"
                />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-50 p-2 rounded">
                    <div className="text-green-700">Revenue Stability</div>
                    <div className="font-semibold text-green-900">
                      {
                        eligibilityAssessment.criteria.financialHealth.metrics
                          .revenueStability
                      }
                      %
                    </div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="text-blue-700">Profitability</div>
                    <div className="font-semibold text-blue-900">
                      {
                        eligibilityAssessment.criteria.financialHealth.metrics
                          .profitability
                      }
                      %
                    </div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <div className="text-purple-700">Cash Flow</div>
                    <div className="font-semibold text-purple-900">
                      {
                        eligibilityAssessment.criteria.financialHealth.metrics
                          .cashFlowStrength
                      }
                      %
                    </div>
                  </div>
                  <div className="bg-orange-50 p-2 rounded">
                    <div className="text-orange-700">Debt Ratio</div>
                    <div className="font-semibold text-orange-900">
                      {
                        eligibilityAssessment.criteria.financialHealth.metrics
                          .debtRatio
                      }
                      %
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Viability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Business Viability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Score</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold ${getScoreColor(eligibilityAssessment.criteria.businessViability.score)}`}
                    >
                      {eligibilityAssessment.criteria.businessViability.score}%
                    </span>
                    <Badge
                      className={getStatusColor(
                        eligibilityAssessment.criteria.businessViability.status,
                      )}
                    >
                      {eligibilityAssessment.criteria.businessViability.status}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={eligibilityAssessment.criteria.businessViability.score}
                  className="h-2"
                />
                <div className="space-y-2">
                  <div className="text-sm font-medium">Strength Factors:</div>
                  <ul className="text-sm space-y-1">
                    {eligibilityAssessment.criteria.businessViability.factors.map(
                      (factor, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{factor}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Industry Risk */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  Industry Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Risk Score</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold ${getScoreColor(eligibilityAssessment.criteria.industryRisk.score)}`}
                    >
                      {eligibilityAssessment.criteria.industryRisk.score}%
                    </span>
                    <Badge
                      className={getRiskColor(
                        eligibilityAssessment.criteria.industryRisk.riskLevel,
                      )}
                    >
                      {eligibilityAssessment.criteria.industryRisk.riskLevel.replace(
                        "_",
                        " ",
                      )}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={eligibilityAssessment.criteria.industryRisk.score}
                  className="h-2"
                />
                <div className="space-y-2">
                  <div className="text-sm font-medium">Risk Factors:</div>
                  <ul className="text-sm space-y-1">
                    {eligibilityAssessment.criteria.industryRisk.factors.map(
                      (factor, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{factor}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations & Improvement Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-3">
                  {eligibilityAssessment.recommendations.map(
                    (recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">
                          {recommendation}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Improvement Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-3">
                  {eligibilityAssessment.improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {!eligibilityAssessment && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Run Eligibility Assessment
            </h3>
            <p className="text-gray-600 mb-4">
              Get a comprehensive analysis of your loan eligibility based on
              your business profile and financial health.
            </p>
            <Button onClick={onRunAssessment} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Start Assessment
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
