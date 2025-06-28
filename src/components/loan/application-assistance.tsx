import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ApplicationAssistance } from "@/lib/loan-funding-data";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  Target,
  BarChart3,
  Building,
  Calculator,
  Zap,
  Users,
  Calendar,
  Star,
} from "lucide-react";

interface ApplicationAssistanceProps {
  assistance: ApplicationAssistance | null;
  onGenerateBusinessPlan: () => void;
  onGenerateFinancialProjections: () => void;
  onSubmitApplication: (optionId: string) => void;
  isProcessing: boolean;
}

export const ApplicationAssistanceComponent = ({
  assistance,
  onGenerateBusinessPlan,
  onGenerateFinancialProjections,
  onSubmitApplication,
  isProcessing,
}: ApplicationAssistanceProps) => {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "preparation":
        return "bg-blue-100 text-blue-800";
      case "document_gathering":
        return "bg-yellow-100 text-yellow-800";
      case "application_drafting":
        return "bg-orange-100 text-orange-800";
      case "review":
        return "bg-purple-100 text-purple-800";
      case "submission":
        return "bg-green-100 text-green-800";
      case "follow_up":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "not_started":
        return "bg-gray-100 text-gray-800";
      case "verified":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case "business_plan":
        return <Building className="h-4 w-4" />;
      case "financial_statements":
        return <BarChart3 className="h-4 w-4" />;
      case "tax_returns":
        return <FileText className="h-4 w-4" />;
      case "bank_statements":
        return <Calculator className="h-4 w-4" />;
      case "legal_documents":
        return <FileText className="h-4 w-4" />;
      case "personal_documents":
        return <Users className="h-4 w-4" />;
      case "collateral_documents":
        return <Star className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!assistance) {
    return (
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Application in Progress
          </h3>
          <p className="text-gray-600 mb-4">
            Start a loan application to access automated assistance tools.
          </p>
          <Button>Start New Application</Button>
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
            Automated Loan Application Assistance
          </h2>
          <p className="text-gray-600">
            AI-powered tools to streamline your loan application process
          </p>
        </div>
        <Badge className={getStageColor(assistance.stage)}>
          {assistance.stage.replace("_", " ")}
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Application Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-2xl font-bold text-blue-600">
                {assistance.progress}%
              </span>
            </div>
            <Progress value={assistance.progress} className="h-3" />
            <div className="text-sm text-gray-600">
              Estimated time to complete: {assistance.estimatedTimeToComplete}{" "}
              days
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI-Generated Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Plan */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" />
              Business Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge
                className={getStatusColor(
                  assistance.generatedContent.businessPlan.status,
                )}
              >
                {assistance.generatedContent.businessPlan.status.replace(
                  "_",
                  " ",
                )}
              </Badge>
              {assistance.generatedContent.businessPlan.lastUpdated && (
                <span className="text-xs text-gray-500">
                  {new Date(
                    assistance.generatedContent.businessPlan.lastUpdated,
                  ).toLocaleDateString()}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600">
              AI-generated comprehensive business plan with market analysis,
              financial projections, and strategy.
            </p>

            {assistance.generatedContent.businessPlan.status ===
              "completed" && (
              <div className="space-y-2">
                <div className="text-xs text-green-600 font-medium">
                  ✓ Plan Generated Successfully
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Plan
                </Button>
              </div>
            )}

            {assistance.generatedContent.businessPlan.status ===
              "generating" && (
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-sm text-blue-600">Generating...</span>
              </div>
            )}

            {assistance.generatedContent.businessPlan.status ===
              "not_generated" && (
              <Button
                onClick={onGenerateBusinessPlan}
                disabled={isProcessing}
                size="sm"
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Plan
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Financial Projections */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Financial Projections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge
                className={getStatusColor(
                  assistance.generatedContent.financialProjections.status,
                )}
              >
                {assistance.generatedContent.financialProjections.status.replace(
                  "_",
                  " ",
                )}
              </Badge>
              {assistance.generatedContent.financialProjections.lastUpdated && (
                <span className="text-xs text-gray-500">
                  {new Date(
                    assistance.generatedContent.financialProjections.lastUpdated,
                  ).toLocaleDateString()}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600">
              3-year financial forecasts including P&L, cash flow, and balance
              sheet projections.
            </p>

            {assistance.generatedContent.financialProjections.status ===
              "completed" && (
              <div className="space-y-2">
                <div className="text-xs text-green-600 font-medium">
                  ✓ Projections Generated
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Excel
                </Button>
              </div>
            )}

            {assistance.generatedContent.financialProjections.status ===
              "generating" && (
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin text-green-600" />
                <span className="text-sm text-green-600">Generating...</span>
              </div>
            )}

            {assistance.generatedContent.financialProjections.status ===
              "not_generated" && (
              <Button
                onClick={onGenerateFinancialProjections}
                disabled={isProcessing}
                size="sm"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Generate Projections
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Application Form
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge
                className={getStatusColor(
                  assistance.generatedContent.applicationForm.status,
                )}
              >
                {assistance.generatedContent.applicationForm.status.replace(
                  "_",
                  " ",
                )}
              </Badge>
              {assistance.generatedContent.applicationForm.lastUpdated && (
                <span className="text-xs text-gray-500">
                  {new Date(
                    assistance.generatedContent.applicationForm.lastUpdated,
                  ).toLocaleDateString()}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600">
              Pre-filled loan application form with your business information
              and financial data.
            </p>

            {assistance.generatedContent.applicationForm.status ===
              "completed" && (
              <div className="space-y-2">
                <div className="text-xs text-green-600 font-medium">
                  ✓ Form Pre-filled
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Review Form
                </Button>
              </div>
            )}

            {assistance.generatedContent.applicationForm.status ===
              "not_generated" && (
              <Button
                size="sm"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Zap className="h-4 w-4 mr-2" />
                Auto-Fill Form
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Document Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Document Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assistance.documents.map((document) => (
              <div
                key={document.id}
                className={`p-4 border rounded-lg ${
                  document.status === "completed"
                    ? "border-green-200 bg-green-50"
                    : document.status === "in_progress"
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getDocumentTypeIcon(document.type)}
                    <div className="font-medium text-sm">{document.name}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {document.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                    <Badge className={getStatusColor(document.status)}>
                      {document.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3">
                  {document.description}
                </p>

                <div className="space-y-2">
                  {document.fileSize && (
                    <div className="text-xs text-gray-500">
                      Size: {formatFileSize(document.fileSize)}
                    </div>
                  )}

                  {document.expirationDate && (
                    <div className="text-xs text-orange-600">
                      Expires:{" "}
                      {new Date(document.expirationDate).toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex gap-2">
                    {document.status === "not_started" && (
                      <Button size="sm" className="flex-1">
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    )}

                    {document.template && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Template
                      </Button>
                    )}

                    {document.status === "completed" && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Application Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assistance.checklist.map((task, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  task.completed ? "bg-green-50" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      task.completed
                        ? "bg-green-600"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    {task.completed && (
                      <CheckCircle className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div>
                    <div
                      className={`font-medium ${
                        task.completed ? "text-green-900" : "text-gray-900"
                      }`}
                    >
                      {task.task}
                    </div>
                    {task.dueDate && (
                      <div className="text-xs text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assistance.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              </div>
            ))}
          </div>

          {assistance.stage === "review" && (
            <div className="mt-6 pt-6 border-t">
              <Button
                onClick={() => onSubmitApplication(assistance.fundingOptionId)}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
