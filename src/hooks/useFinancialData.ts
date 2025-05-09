// src/hooks/useFinancialData.ts
import { useState, useEffect } from 'react';
import { FinancialSummary, Transaction } from '@/types/finance';

/**
 * Custom hook to manage financial data
 * Handles data fetching, processing, and state management
 */
export function useFinancialData(period: string = 'thisMonth') {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // TODO: Implement actual API call
        // For now, using mock data
        const mockData: FinancialSummary = {
          totalExpenses: 8234.00,
          totalIncome: 12234.00,
          balance: 45231.89,
          categorySummaries: [
            {
              category: 'Housing',
              amount: 2500,
              percentage: 35,
              trend: -5,
            },
            {
              category: 'Food',
              amount: 1200,
              percentage: 15,
              trend: 10,
            },
            // Add more categories...
          ],
          monthlyComparison: [
            { month: 'Jan', expenses: 7500 },
            { month: 'Feb', expenses: 8200 },
            { month: 'Mar', expenses: 7800 },
            // Add more months...
          ],
        };

        setSummary(mockData);
      } catch (err) {
        setError('Failed to fetch financial data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [period]);

  return {
    summary,
    isLoading,
    error,
  };
}