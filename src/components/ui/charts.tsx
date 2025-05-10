'use client';

import { Expense } from '@/types/expense';
import { Card } from '@/components/ui/card';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface ChartProps {
  data: Expense[];
  category: keyof Expense;
  value: keyof Expense;
  title: string;
}

/**
 * Pie chart component for visualizing expense data
 */
export function PieChart({ data, category, value, title }: ChartProps) {
  const chartData = {
    labels: data.map((item) => String(item[category])),
    datasets: [
      {
        data: data.map((item) => Number(item[value])),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <Card className="p-4">
      <Pie data={chartData} options={options} />
    </Card>
  );
}

/**
 * Bar chart component for visualizing expense data
 */
export function BarChart({ data, category, value, title }: ChartProps) {
  const chartData = {
    labels: data.map((item) => String(item[category])),
    datasets: [
      {
        label: 'Value',
        data: data.map((item) => Number(item[value])),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="p-4">
      <Bar data={chartData} options={options} />
    </Card>
  );
} 