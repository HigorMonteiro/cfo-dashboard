"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart, TrendingUp } from "lucide-react";

/**
 * Expense Modal Component
 * 
 * @description Modal for adding new expenses with category selection and amount
 * @component
 */
export function ExpenseModal() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de salvamento
    console.log({ amount, category, description });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-5 w-5" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Expense description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Save Expense
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function FinanceDashboard() {
  return (
    <div className="relative min-h-screen">
      {/* ... código anterior ... */}

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full grid grid-cols-3 gap-4 rounded-xl bg-muted p-1">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg py-2.5 text-sm font-medium transition-all"
          >
            <div className="flex items-center space-x-2">
              <BarChart className="h-4 w-4" />
              <span>Overview</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="categories"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg py-2.5 text-sm font-medium transition-all"
          >
            <div className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Categories</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="trends"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg py-2.5 text-sm font-medium transition-all"
          >
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trends</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* ... resto do conteúdo dos tabs ... */}
      </Tabs>
    </div>
  );
}
