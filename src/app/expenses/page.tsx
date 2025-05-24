'use client';

import { useState } from 'react';
import { Expense, ExpenseFilters, ExpenseCategory, PaymentMethod } from '@/types/expense';
import { ExpenseService } from '@/services/expense.service';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, BarChart } from '@/components/ui/charts';
import { useToast } from '@/hooks/use-toast';

/**
 * Main expense management page component
 * @returns {JSX.Element} The expenses page component
 */
export default function ExpensesPage() {
  const [expenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>({});
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
  const handleEditExpense = async () => {
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
    } catch {
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
          <Select onValueChange={(value: ExpenseCategory) => handleFilterChange({ ...filters, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SHOPPING">Shopping</SelectItem>
              <SelectItem value="TRANSPORT">Transport</SelectItem>
              <SelectItem value="FEES">Fees</SelectItem>
              <SelectItem value="LOAN">Loan</SelectItem>
              <SelectItem value="FOOD">Food</SelectItem>
              <SelectItem value="ENTERTAINMENT">Entertainment</SelectItem>
              <SelectItem value="HEALTH">Health</SelectItem>
              <SelectItem value="EDUCATION">Education</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value: PaymentMethod) => handleFilterChange({ ...filters, paymentMethod: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
              <SelectItem value="DEBIT_CARD">Debit Card</SelectItem>
              <SelectItem value="PIX">PIX</SelectItem>
              <SelectItem value="BANK_SLIP">Bank Slip</SelectItem>
            </SelectContent>
          </Select>
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
                        onClick={() => handleEditExpense()}
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