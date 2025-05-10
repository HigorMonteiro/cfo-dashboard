'use client';

import { useState } from 'react';
import { Expense, ExpenseFilters } from '@/types/expense';
import { ExpenseService } from '@/services/expense.service';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, BarChart } from '@/components/ui/charts';
import { useToast } from '@/hooks/use-toast';

/**
 * Main expense management page component
 */
export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const expenseService = new ExpenseService();

  /**
   * Handles the creation of a new expense
   */
  const handleCreateExpense = async () => {
    // TODO: Implement expense creation modal/form
  };

  /**
   * Handles the editing of an existing expense
   * @param expense - The expense to edit
   */
  const handleEditExpense = async (expense: Expense) => {
    // TODO: Implement expense editing modal/form
  };

  /**
   * Handles the deletion of an expense
   * @param id - The ID of the expense to delete
   */
  const handleDeleteExpense = async (id: string) => {
    try {
      await expenseService.deleteExpense(id);
      toast({
        title: 'Success',
        description: 'Expense deleted successfully',
      });
      // Refresh expenses list
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete expense',
        variant: 'destructive',
      });
    }
  };

  /**
   * Handles the application of filters
   * @param newFilters - The new filters to apply
   */
  const handleFilterChange = async (newFilters: ExpenseFilters) => {
    setFilters(newFilters);
    // Refresh expenses list with new filters
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Button onClick={handleCreateExpense}>Add Expense</Button>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input
            placeholder="Search expenses..."
            onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
          />
          <Select
            placeholder="Category"
            onChange={(value) => handleFilterChange({ ...filters, category: value })}
          />
          <Select
            placeholder="Payment Method"
            onChange={(value) => handleFilterChange({ ...filters, paymentMethod: value })}
          />
        </div>

        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="location">By Location</TabsTrigger>
            <TabsTrigger value="payment">By Payment Method</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <DataTable
              data={expenses}
              columns={[
                { header: 'Date', accessorKey: 'date' },
                { header: 'Category', accessorKey: 'category' },
                { header: 'Location', accessorKey: 'location' },
                { header: 'Installment', accessorKey: 'installment' },
                { header: 'Value', accessorKey: 'value' },
                {
                  header: 'Actions',
                  cell: ({ row }) => (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditExpense(row.original)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteExpense(row.original.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          </TabsContent>

          <TabsContent value="category">
            <PieChart
              data={expenses}
              category="category"
              value="value"
              title="Expenses by Category"
            />
          </TabsContent>

          <TabsContent value="location">
            <BarChart
              data={expenses}
              category="location"
              value="value"
              title="Expenses by Location"
            />
          </TabsContent>

          <TabsContent value="payment">
            <PieChart
              data={expenses}
              category="paymentMethod"
              value="value"
              title="Expenses by Payment Method"
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
} 