import { ExpenseService } from '../expense.service';
import { Expense, ExpenseCategory, PaymentMethod } from '@/types/expense';

// Mock data
const mockExpense: Expense = {
  id: '1',
  date: new Date('2024-03-25'),
  category: 'SHOPPING' as ExpenseCategory,
  location: 'CP PARC SHOPPING INTER',
  installment: {
    current: 6,
    total: 10,
  },
  value: 479.83,
  description: 'Shopping at Inter',
  paymentMethod: 'CREDIT_CARD' as PaymentMethod,
  userId: 'user1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ExpenseService', () => {
  let expenseService: ExpenseService;

  beforeEach(() => {
    expenseService = new ExpenseService();
  });

  describe('getExpenses', () => {
    it('should return an array of expenses', async () => {
      // Arrange
      const mockExpenses = [mockExpense];
      jest.spyOn(expenseService, 'getExpenses').mockResolvedValue(mockExpenses);

      // Act
      const result = await expenseService.getExpenses();

      // Assert
      expect(result).toEqual(mockExpenses);
      expect(result).toHaveLength(1);
    });
  });

  describe('getExpenseById', () => {
    it('should return an expense when found', async () => {
      // Arrange
      jest.spyOn(expenseService, 'getExpenseById').mockResolvedValue(mockExpense);

      // Act
      const result = await expenseService.getExpenseById('1');

      // Assert
      expect(result).toEqual(mockExpense);
    });

    it('should return null when expense is not found', async () => {
      // Arrange
      jest.spyOn(expenseService, 'getExpenseById').mockResolvedValue(null);

      // Act
      const result = await expenseService.getExpenseById('999');

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('createExpense', () => {
    it('should create a new expense', async () => {
      // Arrange
      const newExpense = {
        ...mockExpense,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
      jest.spyOn(expenseService, 'createExpense').mockResolvedValue(mockExpense);

      // Act
      const result = await expenseService.createExpense(newExpense);

      // Assert
      expect(result).toEqual(mockExpense);
    });
  });

  describe('updateExpense', () => {
    it('should update an existing expense', async () => {
      // Arrange
      const updatedExpense = {
        ...mockExpense,
        value: 500,
      };
      jest.spyOn(expenseService, 'updateExpense').mockResolvedValue(updatedExpense);

      // Act
      const result = await expenseService.updateExpense('1', { value: 500 });

      // Assert
      expect(result).toEqual(updatedExpense);
      expect(result.value).toBe(500);
    });
  });

  describe('deleteExpense', () => {
    it('should delete an expense', async () => {
      // Arrange
      const deleteSpy = jest.spyOn(expenseService, 'deleteExpense').mockResolvedValue();

      // Act
      await expenseService.deleteExpense('1');

      // Assert
      expect(deleteSpy).toHaveBeenCalledWith('1');
    });
  });

  describe('getExpenseSummary', () => {
    it('should return expense summary data', async () => {
      // Arrange
      const mockSummary = {
        totalExpenses: 479.83,
        totalInstallments: 1,
        expensesByCategory: {
          SHOPPING: 479.83,
          TRANSPORT: 0,
          FEES: 0,
          LOAN: 0,
          FOOD: 0,
          ENTERTAINMENT: 0,
          HEALTH: 0,
          EDUCATION: 0,
          OTHER: 0,
        },
        expensesByLocation: {
          'CP PARC SHOPPING INTER': 479.83,
        },
        expensesByPaymentMethod: {
          CREDIT_CARD: 479.83,
          DEBIT_CARD: 0,
          PIX: 0,
          BANK_SLIP: 0,
        },
        expensesByCreditCard: {},
        expensesByInstallment: {
          6: 479.83,
        },
      };
      jest.spyOn(expenseService, 'getExpenseSummary').mockResolvedValue(mockSummary);

      // Act
      const result = await expenseService.getExpenseSummary();

      // Assert
      expect(result).toEqual(mockSummary);
      expect(result.totalExpenses).toBe(479.83);
    });
  });
}); 