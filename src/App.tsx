import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BusinessForecast from "./pages/BusinessForecast";
import TaxCompliance from "./pages/TaxCompliance";
import FeasibilityAnalysis from "./pages/FeasibilityAnalysis";
import PolicyEconomicAnalysis from "./pages/PolicyEconomicAnalysis";
import MarketCompetitiveAnalysis from "./pages/MarketCompetitiveAnalysis";
import LoanFunding from "./pages/LoanFunding";
import InventorySupplyChain from "./pages/InventorySupplyChain";
import PricingRevenueOptimization from "./pages/PricingRevenueOptimization";
import FinancialAdvisoryPlanning from "./pages/FinancialAdvisoryPlanning";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/business-forecast" element={<BusinessForecast />} />
          <Route path="/tax-compliance" element={<TaxCompliance />} />
          <Route
            path="/feasibility-analysis"
            element={<FeasibilityAnalysis />}
          />
          <Route
            path="/policy-economic-analysis"
            element={<PolicyEconomicAnalysis />}
          />
          <Route
            path="/market-competitive-analysis"
            element={<MarketCompetitiveAnalysis />}
          />
          <Route path="/loan-funding" element={<LoanFunding />} />
          <Route
            path="/inventory-supply-chain"
            element={<InventorySupplyChain />}
          />
          <Route
            path="/pricing-revenue-optimization"
            element={<PricingRevenueOptimization />}
          />
          <Route
            path="/financial-advisory-planning"
            element={<FinancialAdvisoryPlanning />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
