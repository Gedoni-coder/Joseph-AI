import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PolicyItem, PolicyAnalysis } from "@/lib/policy-economic-data";
import {
  Building,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  FileCheck,
  Settings,
  Shield,
  Target,
} from "lucide-react";

interface InternalPolicyAnalysisProps {
  policies: PolicyItem[];
  analyses: PolicyAnalysis[];
  onRunAnalysis: (policyId: string) => void;
  isAnalyzing: boolean;
}

export const InternalPolicyAnalysisComponent = ({
  policies,
  analyses,
  onRunAnalysis,
  isAnalyzing,
}: InternalPolicyAnalysisProps) => {
  const internalPolicies = policies.filter(
    (policy) => policy.category === "internal",
  );

  const getAnalysisForPolicy = (policyId: string) => {
    return analyses.find((analysis) => analysis.policyId === policyId);
  };

  const getImpactLevelColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "proposed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getPolicyTypeIcon = (type: string) => {
    switch (type) {
      case "compliance":
        return <Shield className="h-4 w-4" />;
      case "internal":
        return <Settings className="h-4 w-4" />;
      default:
        return <FileCheck className="h-4 w-4" />;
    }
  };

  const getComplianceStatus = (complianceLevel: number) => {
    if (complianceLevel >= 90)
      return {
        status: "excellent",
        color: "text-green-600",
        icon: CheckCircle2,
      };
    if (complianceLevel >= 75)
      return { status: "good", color: "text-blue-600", icon: Target };
    if (complianceLevel >= 60)
      return {
        status: "needs improvement",
        color: "text-yellow-600",
        icon: AlertCircle,
      };
    return { status: "critical", color: "text-red-600", icon: AlertCircle };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Internal Policy Analysis
          </h2>
          <p className="text-gray-600">
            Company policies, compliance frameworks, and internal standards
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Building className="h-3 w-3" />
          {internalPolicies.length} Internal Policies
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FileCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-blue-700">Active Policies</div>
                <div className="text-lg font-bold text-blue-900">
                  {internalPolicies.filter((p) => p.status === "active").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-green-700">Avg Compliance</div>
                <div className="text-lg font-bold text-green-900">
                  {analyses.length > 0
                    ? Math.round(
                        analyses.reduce(
                          (sum, a) => sum + a.currentComplianceLevel,
                          0,
                        ) / analyses.length,
                      )
                    : 0}
                  %
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-purple-700">
                  Implementation Cost
                </div>
                <div className="text-lg font-bold text-purple-900">
                  {formatCurrency(
                    internalPolicies.reduce(
                      (sum, p) => sum + p.complianceCost,
                      0,
                    ),
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-orange-700">
                  High Priority Gaps
                </div>
                <div className="text-lg font-bold text-orange-900">
                  {
                    analyses.filter(
                      (a) => a.gapAssessment.priorityLevel === "high",
                    ).length
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {internalPolicies.map((policy) => {
          const analysis = getAnalysisForPolicy(policy.id);
          const complianceStatus = analysis
            ? getComplianceStatus(analysis.currentComplianceLevel)
            : null;

          return (
            <Card key={policy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getPolicyTypeIcon(policy.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{policy.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {policy.jurisdiction}
                        </Badge>
                        <Badge
                          className={`text-xs ${getStatusColor(policy.status)}`}
                        >
                          {policy.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={`${getImpactLevelColor(policy.impactLevel)}`}
                  >
                    {policy.impactLevel}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {policy.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Implementation Cost</div>
                    <div className="font-semibold">
                      {formatCurrency(policy.complianceCost)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Timeline</div>
                    <div className="font-semibold">
                      {policy.implementationTimeline} months
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Risk Score</div>
                    <div className="font-semibold">{policy.riskScore}%</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Effective Since</div>
                    <div className="font-semibold">
                      {new Date(policy.effectiveDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Analysis Section */}
                {analysis ? (
                  <div className="space-y-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Compliance Assessment
                      </div>
                      <div className="flex items-center gap-2">
                        {complianceStatus && (
                          <>
                            <complianceStatus.icon
                              className={`h-4 w-4 ${complianceStatus.color}`}
                            />
                            <span
                              className={`text-sm font-medium capitalize ${complianceStatus.color}`}
                            >
                              {complianceStatus.status}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Current Compliance</span>
                          <span className="font-semibold">
                            {analysis.currentComplianceLevel}%
                          </span>
                        </div>
                        <Progress
                          value={analysis.currentComplianceLevel}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Alignment Score</span>
                          <span className="font-semibold">
                            {analysis.alignmentScore}%
                          </span>
                        </div>
                        <Progress
                          value={analysis.alignmentScore}
                          className="h-2"
                        />
                      </div>
                    </div>

                    {/* Recommendations Summary */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-red-50 p-2 rounded text-center">
                        <div className="text-red-700 font-medium">
                          Immediate
                        </div>
                        <div className="text-red-900 font-semibold">
                          {analysis.recommendations.immediate.length}
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-2 rounded text-center">
                        <div className="text-yellow-700 font-medium">
                          Short Term
                        </div>
                        <div className="text-yellow-900 font-semibold">
                          {analysis.recommendations.shortTerm.length}
                        </div>
                      </div>
                      <div className="bg-green-50 p-2 rounded text-center">
                        <div className="text-green-700 font-medium">
                          Long Term
                        </div>
                        <div className="text-green-900 font-semibold">
                          {analysis.recommendations.longTerm.length}
                        </div>
                      </div>
                    </div>

                    {analysis.gapAssessment.identifiedGaps.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                          <div className="text-sm font-medium text-orange-700">
                            Priority Gaps (
                            {analysis.gapAssessment.priorityLevel})
                          </div>
                        </div>
                        <ul className="text-xs space-y-1 ml-6">
                          {analysis.gapAssessment.identifiedGaps
                            .slice(0, 2)
                            .map((gap, index) => (
                              <li key={index} className="text-gray-600">
                                • {gap}
                              </li>
                            ))}
                          {analysis.gapAssessment.identifiedGaps.length > 2 && (
                            <li className="text-gray-500 italic">
                              +
                              {analysis.gapAssessment.identifiedGaps.length - 2}{" "}
                              more gaps identified
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-red-50 p-2 rounded">
                        <div className="text-red-700 font-medium">
                          Gap Resolution Cost
                        </div>
                        <div className="text-red-900 font-semibold">
                          {formatCurrency(analysis.gapAssessment.estimatedCost)}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="text-blue-700 font-medium">
                          Time to Resolve
                        </div>
                        <div className="text-blue-900 font-semibold">
                          {analysis.gapAssessment.timeToComply} months
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-t pt-4">
                    <Button
                      onClick={() => onRunAnalysis(policy.id)}
                      disabled={isAnalyzing}
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isAnalyzing ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FileCheck className="h-4 w-4 mr-2" />
                          Run Policy Assessment
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Business Implications */}
                <div className="space-y-2">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    Business Impact
                  </div>
                  <div className="space-y-1">
                    {policy.businessImplications
                      .slice(0, 2)
                      .map((implication, index) => (
                        <div
                          key={index}
                          className="text-xs text-gray-600 flex items-start gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                          {implication}
                        </div>
                      ))}
                    {policy.businessImplications.length > 2 && (
                      <div className="text-xs text-gray-500 italic ml-3.5">
                        +{policy.businessImplications.length - 2} more
                        implications
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {internalPolicies.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Internal Policies Found
            </h3>
            <p className="text-gray-600">
              Internal policies and compliance frameworks will appear here when
              added.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
