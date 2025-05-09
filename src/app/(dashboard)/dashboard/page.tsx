import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";

/**
 * Dashboard page component that displays various charts and data
 * @returns {JSX.Element} Dashboard page component
 */
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Revenue</h2>
          <AppAreaChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Profit</h2>
          <AppBarChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <AppPieChart />
        </div>
      </div>
      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg">
          <CardList title="Latest Transactions" />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <TodoList />
        </div>
      </div>
    </div>
  );
} 