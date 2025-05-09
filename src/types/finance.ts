export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
  }
  
  export interface CategorySummary {
    category: string;
    amount: number;
    percentage: number;
    trend: number;
  }
  
  export interface FinancialSummary {
    totalExpenses: number;
    totalIncome: number;
    balance: number;
    categorySummaries: CategorySummary[];
    monthlyComparison: {
      month: string;
      expenses: number;
    }[];
  }