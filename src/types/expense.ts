/**
 * Represents the payment method for an expense
 */
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BANK_SLIP';

/**
 * Represents the category of an expense
 */
export type ExpenseCategory = 
  | 'SHOPPING'
  | 'TRANSPORT'
  | 'FEES'
  | 'LOAN'
  | 'FOOD'
  | 'ENTERTAINMENT'
  | 'HEALTH'
  | 'EDUCATION'
  | 'OTHER';

/**
 * Represents a single expense entry
 */
export interface Expense {
  id: string;
  date: Date;
  category: ExpenseCategory;
  location: string;
  installment?: {
    current: number;
    total: number;
  };
  value: number;
  description: string;
  paymentMethod: PaymentMethod;
  creditCardId?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents the filters that can be applied to the expense list
 */
export interface ExpenseFilters {
  category?: ExpenseCategory;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  paymentMethod?: PaymentMethod;
  creditCardId?: string;
  installment?: number;
  search?: string;
}

/**
 * Represents the summary data for expenses
 */
export interface ExpenseSummary {
  totalExpenses: number;
  totalInstallments: number;
  expensesByCategory: Record<ExpenseCategory, number>;
  expensesByLocation: Record<string, number>;
  expensesByPaymentMethod: Record<PaymentMethod, number>;
  expensesByCreditCard: Record<string, number>;
  expensesByInstallment: Record<number, number>;
} 