import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Activity,
  TrendingUp,
  BarChart3,
  Scale,
  DollarSign,
  Package,
  Target,
  Calculator,
  Brain,
  LineChart,
  PieChart,
  ChevronRight,
} from "lucide-react";

const Index = () => {
  const modules = [
    {
      name: "Economic Forecasting",
      description: "Economic predictions and market analysis",
      icon: TrendingUp,
      route: "/economic-forecasting",
    },
    {
      name: "Business Forecast",
      description: "Business planning and revenue projections",
      icon: BarChart3,
      route: "/business-forecast",
    },
    {
      name: "Tax & Compliance",
      description: "Tax optimization and regulatory compliance",
      icon: Activity,
      route: "/tax-compliance",
    },
    {
      name: "Feasibility Analysis",
      description: "Project viability and investment analysis",
      icon: LineChart,
      route: "/feasibility-analysis",
    },
    {
      name: "Policy & Economic Impact",
      description: "Policy analysis and economic impact assessment",
      icon: Scale,
      route: "/policy-economic-analysis",
    },
    {
      name: "Market & Competitive Analysis",
      description: "Market insights and competitive intelligence",
      icon: PieChart,
      route: "/market-competitive-analysis",
    },
    {
      name: "Loan & Funding Platform",
      description: "Financing solutions and funding optimization",
      icon: DollarSign,
      route: "/loan-funding",
    },
    {
      name: "Inventory & Supply Chain",
      description: "Inventory management and supply chain optimization",
      icon: Package,
      route: "/inventory-supply-chain",
    },
    {
      name: "Pricing & Revenue Optimization",
      description: "Pricing strategies and revenue optimization",
      icon: Target,
      route: "/pricing-revenue-optimization",
    },
    {
      name: "Financial Advisory & Planning",
      description: "Financial planning and advisory services",
      icon: Calculator,
      route: "/financial-advisory-planning",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  JOSEPH AI
                </h1>
                <p className="text-xs text-muted-foreground">
                  Business Intelligence Platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Company Information */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Business Intelligence Platform
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Comprehensive business analysis and decision support tools.
              </p>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                2 Months Free Trial Available
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src="/api/placeholder/64/64"
                  alt="Gideon Ikebudeh"
                />
                <AvatarFallback className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  GI
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Gideon Ikebudeh</h3>
                <p className="text-sm text-muted-foreground">
                  Chief Executive Officer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Modules */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Platform Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link key={index} to={module.route} className="group">
                <Card className="h-full transition-all duration-200 hover:shadow-md border-0 bg-white/70 backdrop-blur">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <module.icon className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {module.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-3">
                      {module.description}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                      Access Module
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Trial Information */}
        <div className="bg-white/70 backdrop-blur rounded-lg border p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Free Trial</h3>
          <p className="text-muted-foreground mb-4">
            Experience the full platform capabilities with our 2-month free
            trial. No credit card required.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Start Free Trial
          </Button>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t bg-white/50 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <Brain className="h-3 w-3" />
            </div>
            <span className="font-semibold">JOSEPH AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 JOSEPH AI. Business Intelligence Platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
