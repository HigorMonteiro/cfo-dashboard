'use client';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface FinancialEvent {
  id: string;
  date: Date;
  type: 'payment' | 'receipt';
  description: string;
  amount: number;
}

/**
 * Calendar page component for visualizing financial events
 */
export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  // Mock data - In a real application, this would come from an API
  const mockEvents: FinancialEvent[] = [
    {
      id: '1',
      date: new Date(2024, 2, 15),
      type: 'payment',
      description: 'Aluguel',
      amount: 1500,
    },
    {
      id: '2',
      date: new Date(2024, 2, 20),
      type: 'receipt',
      description: 'Salário',
      amount: 5000,
    },
    {
      id: '3',
      date: new Date(2024, 2, 25),
      type: 'payment',
      description: 'Conta de Luz',
      amount: 200,
    },
  ];

  // Mock data for charts
  const weeklyData = [
    { name: 'Seg', payments: 1200, receipts: 0 },
    { name: 'Ter', payments: 800, receipts: 0 },
    { name: 'Qua', payments: 1500, receipts: 0 },
    { name: 'Qui', payments: 0, receipts: 5000 },
    { name: 'Sex', payments: 300, receipts: 0 },
    { name: 'Sáb', payments: 0, receipts: 0 },
    { name: 'Dom', payments: 0, receipts: 0 },
  ];

  const monthlyData = [
    { name: 'Jan', payments: 4500, receipts: 10000 },
    { name: 'Fev', payments: 3800, receipts: 10000 },
    { name: 'Mar', payments: 4200, receipts: 10000 },
    { name: 'Abr', payments: 3900, receipts: 10000 },
    { name: 'Mai', payments: 4100, receipts: 10000 },
    { name: 'Jun', payments: 4300, receipts: 10000 },
  ];

  const quarterlyData = [
    { name: 'Q1', payments: 12500, receipts: 30000 },
    { name: 'Q2', payments: 12300, receipts: 30000 },
    { name: 'Q3', payments: 11800, receipts: 30000 },
    { name: 'Q4', payments: 13200, receipts: 30000 },
  ];

  const yearlyData = [
    { name: '2020', payments: 48000, receipts: 120000 },
    { name: '2021', payments: 52000, receipts: 120000 },
    { name: '2022', payments: 49000, receipts: 120000 },
    { name: '2023', payments: 51000, receipts: 120000 },
    { name: '2024', payments: 49800, receipts: 120000 },
  ];

  const categoryData = [
    { name: 'Moradia', value: 1800 },
    { name: 'Alimentação', value: 1200 },
    { name: 'Transporte', value: 800 },
    { name: 'Lazer', value: 600 },
    { name: 'Outros', value: 400 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      const events = getEventsForDate(date);
      if (events.length > 0) {
        toast({
          title: `Eventos para ${format(date, "dd 'de' MMMM", { locale: ptBR })}`,
          description: events
            .map(
              (event) =>
                `${event.type === 'payment' ? 'Pagamento' : 'Recebimento'}: ${
                  event.description
                } - R$ ${event.amount.toFixed(2)}`
            )
            .join('\n'),
        });
      }
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Calendário Financeiro</h1>
      
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
              locale={ptBR}
              modifiers={{
                payment: (date) =>
                  mockEvents.some(
                    (event) =>
                      event.type === 'payment' &&
                      event.date.getDate() === date.getDate() &&
                      event.date.getMonth() === date.getMonth() &&
                      event.date.getFullYear() === date.getFullYear()
                  ),
                receipt: (date) =>
                  mockEvents.some(
                    (event) =>
                      event.type === 'receipt' &&
                      event.date.getDate() === date.getDate() &&
                      event.date.getMonth() === date.getMonth() &&
                      event.date.getFullYear() === date.getFullYear()
                  ),
              }}
              modifiersStyles={{
                payment: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
                receipt: { backgroundColor: 'rgba(34, 197, 94, 0.2)' },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eventos do Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="payments">Pagamentos</TabsTrigger>
                <TabsTrigger value="receipts">Recebimentos</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                {date && getEventsForDate(date).length > 0 ? (
                  <div className="space-y-4">
                    {getEventsForDate(date).map((event) => (
                      <div
                        key={event.id}
                        className={`p-4 rounded-lg ${
                          event.type === 'payment'
                            ? 'bg-red-100'
                            : 'bg-green-100'
                        }`}
                      >
                        <p className="font-semibold">
                          {event.type === 'payment' ? 'Pagamento' : 'Recebimento'}
                        </p>
                        <p>{event.description}</p>
                        <p className="font-bold">
                          R$ {event.amount.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Nenhum evento para esta data
                  </p>
                )}
              </TabsContent>
              <TabsContent value="payments">
                {date &&
                  getEventsForDate(date)
                    .filter((event) => event.type === 'payment')
                    .map((event) => (
                      <div
                        key={event.id}
                        className="p-4 rounded-lg bg-red-100 mb-4"
                      >
                        <p className="font-semibold">Pagamento</p>
                        <p>{event.description}</p>
                        <p className="font-bold">
                          R$ {event.amount.toFixed(2)}
                        </p>
                      </div>
                    ))}
              </TabsContent>
              <TabsContent value="receipts">
                {date &&
                  getEventsForDate(date)
                    .filter((event) => event.type === 'receipt')
                    .map((event) => (
                      <div
                        key={event.id}
                        className="p-4 rounded-lg bg-green-100 mb-4"
                      >
                        <p className="font-semibold">Recebimento</p>
                        <p>{event.description}</p>
                        <p className="font-bold">
                          R$ {event.amount.toFixed(2)}
                        </p>
                      </div>
                    ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Análise Financeira</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly">
            <TabsList className="mb-4">
              <TabsTrigger value="weekly">Semanal</TabsTrigger>
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
              <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
              <TabsTrigger value="categories">Categorias</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="payments" fill="#ef4444" name="Pagamentos" />
                    <Bar dataKey="receipts" fill="#22c55e" name="Recebimentos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="monthly">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="payments"
                      stroke="#ef4444"
                      name="Pagamentos"
                    />
                    <Line
                      type="monotone"
                      dataKey="receipts"
                      stroke="#22c55e"
                      name="Recebimentos"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="quarterly">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={quarterlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="payments" fill="#ef4444" name="Pagamentos" />
                    <Bar dataKey="receipts" fill="#22c55e" name="Recebimentos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="yearly">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="payments"
                      stroke="#ef4444"
                      name="Pagamentos"
                    />
                    <Line
                      type="monotone"
                      dataKey="receipts"
                      stroke="#22c55e"
                      name="Recebimentos"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
