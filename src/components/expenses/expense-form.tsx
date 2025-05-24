'use client';

import { useState } from 'react';
import { Expense, ExpenseCategory, PaymentMethod } from '@/types/expense';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface ExpenseFormProps {
  expense?: Expense;
  open: boolean;
  onClose: () => void;
  onSubmit: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

/**
 * Form component for creating and editing expenses
 */
export function ExpenseForm({ expense, open, onClose, onSubmit }: ExpenseFormProps) {
  const [formData, setFormData] = useState<Partial<Expense>>(
    expense || {
      date: new Date(),
      category: 'OTHER' as ExpenseCategory,
      location: '',
      value: 0,
      description: '',
      paymentMethod: 'CREDIT_CARD' as PaymentMethod,
    }
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData as Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>);
      toast({
        title: 'Success',
        description: `Expense ${expense ? 'updated' : 'created'} successfully`,
      });
      onClose();
    } catch (err) {
      console.error('Error submitting expense:', err);
      toast({
        title: 'Error',
        description: `Failed to ${expense ? 'update' : 'create'} expense: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Date</label>
              <Input
                type="date"
                value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <label>Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as ExpenseCategory })}
              >
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
            </div>
          </div>

          <div className="space-y-2">
            <label>Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter location"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Value</label>
              <Input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                placeholder="Enter value"
              />
            </div>

            <div className="space-y-2">
              <label>Payment Method</label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value as PaymentMethod })}
              >
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
          </div>

          {formData.paymentMethod === 'CREDIT_CARD' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label>Current Installment</label>
                <Input
                  type="number"
                  value={formData.installment?.current}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      installment: {
                        current: Number(e.target.value),
                        total: formData.installment?.total ?? 1,
                      },
                    })
                  }
                  placeholder="Current installment"
                />
              </div>

              <div className="space-y-2">
                <label>Total Installments</label>
                <Input
                  type="number"
                  value={formData.installment?.total}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      installment: {
                        current: formData.installment?.current ?? 1,
                        total: Number(e.target.value),
                      },
                    })
                  }
                  placeholder="Total installments"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label>Description</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : expense ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 