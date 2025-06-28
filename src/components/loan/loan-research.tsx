import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoanUpdate, FundingWatchlist } from "@/lib/loan-funding-data";
import {
  Bell,
  Clock,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Calendar,
  Star,
  Eye,
  Heart,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  Globe,
  Settings,
} from "lucide-react";

interface LoanResearchProps {
  updates: LoanUpdate[];
  watchlist: FundingWatchlist | null;
  onAddToWatchlist: (optionId: string) => void;
  onRemoveFromWatchlist: (optionId: string) => void;
}

export const LoanResearchComponent = ({
  updates,
  watchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
}: LoanResearchProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedUrgency, setSelectedUrgency] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getTypeColor = (type: string) => {
    switch (type) {
      case "new_program":
        return "bg-green-100 text-green-800 border-green-200";
      case "rate_change":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "policy_update":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "deadline_alert":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      case "neutral":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "new_program":
        return <Zap className="h-4 w-4" />;
      case "rate_change":
        return <TrendingUp className="h-4 w-4" />;
      case "policy_update":
        return <Settings className="h-4 w-4" />;
      case "deadline_alert":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "government_grants":
        return <Globe className="h-4 w-4" />;
      case "bank_loans":
        return <DollarSign className="h-4 w-4" />;
      case "interest_rates":
        return <TrendingUp className="h-4 w-4" />;
      case "regulations":
        return <Settings className="h-4 w-4" />;
      case "new_products":
        return <Star className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const filteredUpdates = updates.filter((update) => {
    if (
      searchTerm &&
      !update.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !update.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !update.provider.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (selectedCategory !== "all" && update.category !== selectedCategory) {
      return false;
    }

    if (selectedUrgency !== "all" && update.urgency !== selectedUrgency) {
      return false;
    }

    return true;
  });

  const urgentUpdates = updates.filter(
    (update) => update.urgency === "critical" || update.urgency === "high",
  );

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "government_grants", label: "Government Grants" },
    { value: "bank_loans", label: "Bank Loans" },
    { value: "interest_rates", label: "Interest Rates" },
    { value: "regulations", label: "Regulations" },
    { value: "new_products", label: "New Products" },
  ];

  const urgencyLevels = [
    { value: "all", label: "All Urgency" },
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Loan Research & Updates
          </h2>
          <p className="text-gray-600">
            Stay informed about new programs, rate changes, and funding
            opportunities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Bell className="h-3 w-3" />
            {urgentUpdates.length} Urgent
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {filteredUpdates.length} Updates
          </Badge>
        </div>
      </div>

      {/* Alert Bar for Urgent Updates */}
      {urgentUpdates.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <div className="font-medium text-red-800">
                  {urgentUpdates.length} Urgent Update
                  {urgentUpdates.length > 1 ? "s" : ""} Require Attention
                </div>
                <div className="text-sm text-red-700">
                  {urgentUpdates[0].title}
                  {urgentUpdates.length > 1 &&
                    ` and ${urgentUpdates.length - 1} more`}
                </div>
              </div>
              <Button size="sm" className="ml-auto">
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search updates, programs, or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency</label>
                <select
                  value={selectedUrgency}
                  onChange={(e) => setSelectedUrgency(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {urgencyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Watchlist Summary */}
      {watchlist && watchlist.watchedPrograms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600" />
              Your Watchlist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {watchlist.watchedPrograms.slice(0, 3).map((program, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getPriorityColor(program.priority)}>
                      {program.priority}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onRemoveFromWatchlist(program.fundingOptionId)
                      }
                      className="p-1"
                    >
                      <XCircle className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                  <div className="text-sm font-medium mb-1">
                    Program ID: {program.fundingOptionId}
                  </div>
                  <div className="text-xs text-gray-600">
                    Added: {new Date(program.addedDate).toLocaleDateString()}
                  </div>
                  {program.notes && (
                    <div className="text-xs text-gray-500 mt-1">
                      {program.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {watchlist.watchedPrograms.length > 3 && (
              <div className="mt-3 text-center">
                <Button variant="outline" size="sm">
                  View All {watchlist.watchedPrograms.length} Programs
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Updates List */}
      <div className="space-y-4">
        {filteredUpdates.map((update) => (
          <Card
            key={update.id}
            className={`hover:shadow-md transition-shadow ${
              update.urgency === "critical" || update.urgency === "high"
                ? "border-l-4 border-l-red-500"
                : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${getTypeColor(update.type)}`}
                  >
                    {getTypeIcon(update.type)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{update.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {update.provider}
                      </Badge>
                      <Badge className={getTypeColor(update.type)}>
                        {update.type.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={getUrgencyColor(update.urgency)}>
                    {update.urgency}
                  </Badge>
                  {update.relevanceScore > 80 && (
                    <Badge className="bg-blue-100 text-blue-800">
                      <Star className="h-3 w-3 mr-1" />
                      High Match
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{update.description}</p>

              {/* Key Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-gray-600">Effective Date</div>
                    <div className="font-medium">
                      {new Date(update.effectiveDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {update.expirationDate && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <div>
                      <div className="text-gray-600">Expires</div>
                      <div className="font-medium">
                        {new Date(update.expirationDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {getCategoryIcon(update.category)}
                  <div>
                    <div className="text-gray-600">Category</div>
                    <div className="font-medium capitalize">
                      {update.category.replace("_", " ")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Badge */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Impact:</span>
                <Badge className={getImpactColor(update.impact)}>
                  {update.impact === "positive" && (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  )}
                  {update.impact === "negative" && (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  {update.impact === "neutral" && (
                    <Info className="h-3 w-3 mr-1" />
                  )}
                  {update.impact}
                </Badge>
              </div>

              {/* Affected Programs */}
              {update.affectedPrograms.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Affected Programs</div>
                  <div className="flex flex-wrap gap-1">
                    {update.affectedPrograms.map((program, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Items */}
              {update.actionRequired && update.actionItems.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-orange-700">
                    Action Required
                  </div>
                  <ul className="space-y-1">
                    {update.actionItems.map((action, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Relevance Score */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Relevance Score: {update.relevanceScore}%
                </span>
                <span className="text-gray-500">
                  Published:{" "}
                  {new Date(update.datePublished).toLocaleDateString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAddToWatchlist(update.id)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Watch
                </Button>
                {update.actionRequired && (
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Take Action
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredUpdates.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Updates Found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more
              updates.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedUrgency("all");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {watchlist && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="text-sm font-medium">Alert Preferences</div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={watchlist.alerts.rateChanges}
                      onChange={() => {}} // Add empty onChange to prevent warning
                      className="rounded"
                    />
                    <span className="text-sm">Interest rate changes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={watchlist.alerts.newPrograms}
                      onChange={() => {}} // Add empty onChange to prevent warning
                      className="rounded"
                    />
                    <span className="text-sm">New funding programs</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={watchlist.alerts.deadlineReminders}
                      onChange={() => {}} // Add empty onChange to prevent warning
                      className="rounded"
                    />
                    <span className="text-sm">Application deadlines</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={watchlist.alerts.eligibilityChanges}
                      onChange={() => {}} // Add empty onChange to prevent warning
                      className="rounded"
                    />
                    <span className="text-sm">Eligibility changes</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium">Keywords</div>
                <div className="flex flex-wrap gap-1">
                  {watchlist.customKeywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Keywords
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
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
