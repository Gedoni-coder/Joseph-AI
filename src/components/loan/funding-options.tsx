import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FundingOption } from "@/lib/loan-funding-data";
import {
  Building,
  Clock,
  DollarSign,
  Percent,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  Shield,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  Filter,
  Heart,
  Search,
} from "lucide-react";

interface FundingOptionsProps {
  fundingOptions: FundingOption[];
  selectedTypes: string[];
  maxAmount: number;
  maxRate: number;
  onTypeFilter: (types: string[]) => void;
  onAmountFilter: (amount: number) => void;
  onRateFilter: (rate: number) => void;
  onAddToWatchlist: (optionId: string) => void;
  watchlist: string[];
  getMatchScore: (optionId: string) => number;
}

export const FundingOptionsComponent = ({
  fundingOptions,
  selectedTypes,
  maxAmount,
  maxRate,
  onTypeFilter,
  onAmountFilter,
  onRateFilter,
  onAddToWatchlist,
  watchlist,
  getMatchScore,
}: FundingOptionsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const getFundingTypeColor = (type: string) => {
    switch (type) {
      case "bank_loan":
        return "bg-blue-100 text-blue-800";
      case "government_grant":
        return "bg-green-100 text-green-800";
      case "microfinance":
        return "bg-purple-100 text-purple-800";
      case "angel_investment":
        return "bg-orange-100 text-orange-800";
      case "venture_capital":
        return "bg-red-100 text-red-800";
      case "crowdfunding":
        return "bg-pink-100 text-pink-800";
      case "cooperative":
        return "bg-yellow-100 text-yellow-800";
      case "equipment_finance":
        return "bg-indigo-100 text-indigo-800";
      case "invoice_factoring":
        return "bg-teal-100 text-teal-800";
      case "revenue_based":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-200 text-yellow-400" />,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const fundingTypes = [
    { value: "bank_loan", label: "Bank Loans" },
    { value: "government_grant", label: "Government Grants" },
    { value: "microfinance", label: "Microfinance" },
    { value: "angel_investment", label: "Angel Investment" },
    { value: "venture_capital", label: "Venture Capital" },
    { value: "crowdfunding", label: "Crowdfunding" },
    { value: "cooperative", label: "Cooperatives" },
    { value: "equipment_finance", label: "Equipment Finance" },
    { value: "invoice_factoring", label: "Invoice Factoring" },
    { value: "revenue_based", label: "Revenue-Based" },
  ];

  const filteredOptions = fundingOptions.filter((option) => {
    if (
      searchTerm &&
      !option.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !option.provider.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !option.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (selectedTypes.length > 0 && !selectedTypes.includes(option.type)) {
      return false;
    }

    if (option.minAmount > maxAmount) {
      return false;
    }

    if (option.interestRate.min > maxRate) {
      return false;
    }

    return true;
  });

  const handleTypeToggle = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onTypeFilter(newTypes);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Funding Options Explorer
          </h2>
          <p className="text-gray-600">
            Discover and compare funding sources tailored to your business needs
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Search className="h-3 w-3" />
          {filteredOptions.length} Options Available
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search funding options, providers, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {(selectedTypes.length > 0 ||
                  maxAmount < 10000000 ||
                  maxRate < 25) && (
                  <Badge
                    variant="destructive"
                    className="ml-1 px-1 py-0 text-xs"
                  >
                    {selectedTypes.length +
                      (maxAmount < 10000000 ? 1 : 0) +
                      (maxRate < 25 ? 1 : 0)}
                  </Badge>
                )}
              </Button>

              {(selectedTypes.length > 0 ||
                maxAmount < 10000000 ||
                maxRate < 25) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onTypeFilter([]);
                    onAmountFilter(10000000);
                    onRateFilter(25);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="space-y-4 border-t pt-4">
                {/* Funding Types */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Funding Types</div>
                  <div className="flex flex-wrap gap-2">
                    {fundingTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant={
                          selectedTypes.includes(type.value)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => handleTypeToggle(type.value)}
                        className="text-xs"
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Amount Filter */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Max Loan Amount: {formatCurrency(maxAmount)}
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="10000000"
                      step="50000"
                      value={maxAmount}
                      onChange={(e) => onAmountFilter(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Max Interest Rate: {maxRate}%
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="0.5"
                      value={maxRate}
                      onChange={(e) => onRateFilter(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Funding Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOptions.map((option) => {
          const matchScore = getMatchScore(option.id);
          const isWatched = watchlist.includes(option.id);

          return (
            <Card key={option.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{option.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getFundingTypeColor(option.type)}>
                          {option.type.replace("_", " ")}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          by {option.provider}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {matchScore > 0 && (
                      <Badge
                        className={`text-xs ${getMatchScoreColor(matchScore)}`}
                      >
                        {matchScore}% match
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddToWatchlist(option.id)}
                      className="p-1"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isWatched
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {option.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Loan Amount</div>
                    <div className="font-semibold">
                      {formatCurrency(option.minAmount)} -{" "}
                      {formatCurrency(option.maxAmount)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Interest Rate</div>
                    <div className="font-semibold">
                      {option.interestRate.min}% - {option.interestRate.max}%
                      {option.interestRate.type === "variable" && (
                        <span className="text-xs text-gray-500 ml-1">
                          (variable)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      Repayment Period
                    </div>
                    <div className="font-semibold">
                      {option.repaymentPeriod.min} -{" "}
                      {option.repaymentPeriod.max} months
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Processing Time</div>
                    <div className="font-semibold">
                      {option.applicationProcess.timeToFunding} days
                    </div>
                  </div>
                </div>

                {/* Rating and Popularity */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {getRatingStars(option.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({option.rating})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600">Popularity:</div>
                    <Progress value={option.popularity} className="w-16 h-2" />
                  </div>
                </div>

                {/* Eligibility Requirements */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Requirements</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-blue-500" />
                      Min Credit:{" "}
                      {option.eligibilityRequirements.minCreditScore}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-green-500" />
                      Min Revenue:{" "}
                      {formatCurrency(
                        option.eligibilityRequirements.minRevenue,
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-purple-500" />
                      Min Age: {
                        option.eligibilityRequirements.minBusinessAge
                      }{" "}
                      months
                    </div>
                    <div className="flex items-center gap-1">
                      {option.eligibilityRequirements.collateralRequired ? (
                        <Shield className="h-3 w-3 text-orange-500" />
                      ) : (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      )}
                      {option.eligibilityRequirements.collateralRequired
                        ? "Collateral Required"
                        : "No Collateral"}
                    </div>
                  </div>
                </div>

                {/* Fees */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Fees</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      Application: {formatCurrency(option.fees.applicationFee)}
                    </div>
                    <div>
                      Processing: {formatCurrency(option.fees.processingFee)}
                    </div>
                    <div>
                      Maintenance: {formatCurrency(option.fees.maintenanceFee)}
                      /mo
                    </div>
                    <div>Early Payment: {option.fees.earlyPaymentPenalty}%</div>
                  </div>
                </div>

                {/* Advantages and Disadvantages */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-green-700">
                      Advantages
                    </div>
                    <ul className="text-xs space-y-1">
                      {option.advantages.slice(0, 2).map((advantage, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-red-700">
                      Considerations
                    </div>
                    <ul className="text-xs space-y-1">
                      {option.disadvantages
                        .slice(0, 2)
                        .map((disadvantage, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">
                              {disadvantage}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* Best For */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Best For</div>
                  <div className="flex flex-wrap gap-1">
                    {option.bestFor.map((use, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {use}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <Button className="flex-1" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                  <Button variant="outline" size="sm">
                    Compare
                  </Button>
                  {option.applicationProcess.onlineApplication && (
                    <Button variant="outline" size="sm">
                      Apply Online
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOptions.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Funding Options Found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more
              options.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                onTypeFilter([]);
                onAmountFilter(10000000);
                onRateFilter(25);
              }}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
