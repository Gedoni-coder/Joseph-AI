// src/lib/financial-advisory-data.ts

export interface FinancialAdvice {
  stage: "Startup" | "Growth" | "Scaling" | "Decline";
  cashFlowTip: string;
  fundingAdvice: string;
  expenseManagement: string;
  investmentStrategy: string;
}

const financialAdvisoryData: FinancialAdvice[] = [
  {
    stage: "Startup",
    cashFlowTip: "Maintain at least 3 months of runway in your cash reserves.",
    fundingAdvice: "Start with bootstrapping or small grants before seeking equity funding.",
    expenseManagement: "Keep operational costs lean. Avoid renting large office space early.",
    investmentStrategy: "Reinvest profits into customer acquisition and product improvement.",
  },
  {
    stage: "Growth",
    cashFlowTip: "Implement invoice factoring to smooth cash flow from receivables.",
    fundingAdvice: "Seek angel investors or venture capital to fuel rapid expansion.",
    expenseManagement: "Automate repetitive tasks to reduce salary overhead.",
    investmentStrategy: "Diversify into new customer segments or product lines.",
  },
  {
    stage: "Scaling",
    cashFlowTip: "Build a real-time cash flow dashboard using accounting tools.",
    fundingAdvice: "Use a mix of debt and equity financing to optimize capital structure.",
    expenseManagement: "Negotiate long-term supplier contracts for cost efficiency.",
    investmentStrategy: "Invest in infrastructure, staff training, and technology upgrades.",
  },
  {
    stage: "Decline",
    cashFlowTip: "Cut non-essential spending immediately to preserve cash.",
    fundingAdvice: "Avoid taking on new debt unless it leads to a turnaround.",
    expenseManagement: "Outsource services instead of hiring full-time staff.",
    investmentStrategy: "Evaluate pivot opportunities or consider mergers/acquisitions.",
  }
];

export default financialAdvisoryData;
