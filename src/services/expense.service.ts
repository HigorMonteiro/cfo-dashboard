import { Expense, ExpenseFilters, ExpenseSummary, ExpenseCategory, PaymentMethod } from '@/types/expense';

/**
 * Service responsible for handling expense-related operations
 */
export class ExpenseService {
  /**
   * Retrieves all expenses for the current user with optional filters
   * @param filters - Optional filters to apply to the expense list
   * @returns Promise with the list of expenses
   */
  async getExpenses(filters?: ExpenseFilters): Promise<Expense[]> {
    console.log('Fetching expenses with filters:', filters);
    // TODO: Implement API call to fetch expenses
    return [];
  }

  /**
   * Retrieves a single expense by its ID
   * @param id - The ID of the expense to retrieve
   * @returns Promise with the expense details
   */
  async getExpenseById(id: string): Promise<Expense | null> {
    console.log('Fetching expense with ID:', id);
    // TODO: Implement API call to fetch single expense
    return null;
  }

  /**
   * Creates a new expense
   * @param expense - The expense data to create
   * @returns Promise with the created expense
   */
  async createExpense(expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Promise<Expense> {
    console.log('Creating new expense:', expense);
    // TODO: Implement API call to create expense
    return {} as Expense;
  }

  /**
   * Updates an existing expense
   * @param id - The ID of the expense to update
   * @param expense - The updated expense data
   * @returns Promise with the updated expense
   */
  async updateExpense(id: string, expense: Partial<Expense>): Promise<Expense> {
    console.log('Updating expense:', { id, expense });
    // TODO: Implement API call to update expense
    return {} as Expense;
  }

  /**
   * Deletes an expense
   * @param id - The ID of the expense to delete
   * @returns Promise indicating success
   */
  async deleteExpense(id: string): Promise<void> {
    console.log('Deleting expense with ID:', id);
    // TODO: Implement API call to delete expense
  }

  /**
   * Retrieves expense summary data
   * @param filters - Optional filters to apply to the summary
   * @returns Promise with the expense summary
   */
  async getExpenseSummary(filters?: ExpenseFilters): Promise<ExpenseSummary> {
    console.log('Fetching expense summary with filters:', filters);
    // TODO: Implement API call to fetch expense summary
    const initialExpensesByCategory: Record<ExpenseCategory, number> = {
      SHOPPING: 0,
      TRANSPORT: 0,
      FEES: 0,
      LOAN: 0,
      FOOD: 0,
      ENTERTAINMENT: 0,
      HEALTH: 0,
      EDUCATION: 0,
      OTHER: 0,
    };

    const initialExpensesByPaymentMethod: Record<PaymentMethod, number> = {
      CREDIT_CARD: 0,
      DEBIT_CARD: 0,
      PIX: 0,
      BANK_SLIP: 0,
    };

    return {
      totalExpenses: 0,
      totalInstallments: 0,
      expensesByCategory: initialExpensesByCategory,
      expensesByLocation: {},
      expensesByPaymentMethod: initialExpensesByPaymentMethod,
      expensesByCreditCard: {},
      expensesByInstallment: {},
    };
  }
} 