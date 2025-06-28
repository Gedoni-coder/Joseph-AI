import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PolicyItem, PolicyAnalysis } from "@/lib/policy-economic-data";
import {
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Scale,
  FileText,
  TrendingUp,
  Shield,
} from "lucide-react";

interface ExternalPolicyAnalysisProps {
  policies: PolicyItem[];
  analyses: PolicyAnalysis[];
  onRunAnalysis: (policyId: string) => void;
  isAnalyzing: boolean;
}

export const ExternalPolicyAnalysisComponent = ({
  policies,
  analyses,
  onRunAnalysis,
  isAnalyzing,
}: ExternalPolicyAnalysisProps) => {
  const externalPolicies = policies.filter(
    (policy) => policy.category === "external",
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
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
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
      case "government":
        return <Scale className="h-4 w-4" />;
      case "international":
        return <Globe className="h-4 w-4" />;
      case "trade":
        return <TrendingUp className="h-4 w-4" />;
      case "regulatory":
        return <Shield className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            External Policy Analysis
          </h2>
          <p className="text-gray-600">
            Government laws, international regulations, and trade policies
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Globe className="h-3 w-3" />
          {externalPolicies.length} External Policies
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-purple-700">Critical Policies</div>
                <div className="text-lg font-bold text-purple-900">
                  {
                    externalPolicies.filter((p) => p.impactLevel === "critical")
                      .length
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-indigo-700">Active Policies</div>
                <div className="text-lg font-bold text-indigo-900">
                  {externalPolicies.filter((p) => p.status === "active").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-600 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-amber-700">
                  Total Compliance Cost
                </div>
                <div className="text-lg font-bold text-amber-900">
                  {formatCurrency(
                    externalPolicies.reduce(
                      (sum, p) => sum + p.complianceCost,
                      0,
                    ),
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-200 bg-teal-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-600 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-teal-700">Avg Implementation</div>
                <div className="text-lg font-bold text-teal-900">
                  {Math.round(
                    externalPolicies.reduce(
                      (sum, p) => sum + p.implementationTimeline,
                      0,
                    ) / externalPolicies.length,
                  )}{" "}
                  months
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {externalPolicies.map((policy) => {
          const analysis = getAnalysisForPolicy(policy.id);

          return (
            <Card key={policy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
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
                    <div className="text-gray-500">Compliance Cost</div>
                    <div className="font-semibold">
                      {formatCurrency(policy.complianceCost)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Implementation</div>
                    <div className="font-semibold">
                      {policy.implementationTimeline} months
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Risk Score</div>
                    <div className="font-semibold">{policy.riskScore}%</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Effective Date</div>
                    <div className="font-semibold">
                      {new Date(policy.effectiveDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Analysis Section */}
                {analysis ? (
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Compliance Analysis
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {new Date(analysis.analysisDate).toLocaleDateString()}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current Compliance Level</span>
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

                    {analysis.gapAssessment.identifiedGaps.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-orange-700">
                          Key Gaps Identified
                        </div>
                        <ul className="text-xs space-y-1">
                          {analysis.gapAssessment.identifiedGaps
                            .slice(0, 2)
                            .map((gap, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-1"
                              >
                                <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600">{gap}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-red-50 p-2 rounded">
                        <div className="text-red-700 font-medium">Gap Cost</div>
                        <div className="text-red-900 font-semibold">
                          {formatCurrency(analysis.gapAssessment.estimatedCost)}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="text-blue-700 font-medium">
                          Time to Comply
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
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {isAnalyzing ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Running Analysis...
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          Run Compliance Analysis
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Requirements Preview */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Requirements</div>
                  <div className="flex flex-wrap gap-1">
                    {policy.requirements.slice(0, 3).map((req, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {req}
                      </Badge>
                    ))}
                    {policy.requirements.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{policy.requirements.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {externalPolicies.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No External Policies Found
            </h3>
            <p className="text-gray-600">
              External policies will appear here when they are added to the
              system.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
