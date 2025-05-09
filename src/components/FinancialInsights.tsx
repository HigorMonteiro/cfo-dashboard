import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CategorySummary } from "@/types/finance";
import { TrendingDown, TrendingUp, AlertCircle } from "lucide-react";

interface FinancialInsightsProps {
  categorySummaries: CategorySummary[];
}

/**
 * Component that displays financial insights and recommendations
 */
export function FinancialInsights({ categorySummaries }: FinancialInsightsProps) {
  const significantChanges = categorySummaries.filter(
    (cat) => Math.abs(cat.trend) > 10
  );

  return (
    <div className="space-y-4">
      {significantChanges.map((category) => (
        <Alert
          key={category.category}
          variant={category.trend > 0 ? "destructive" : "default"}
        >
          {category.trend > 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <AlertTitle>Significant Change in {category.category}</AlertTitle>
          <AlertDescription>
            Your spending in {category.category} has{" "}
            {category.trend > 0 ? "increased" : "decreased"} by{" "}
            {Math.abs(category.trend)}% compared to last month.
            {category.trend > 0 &&
              " Consider reviewing your expenses in this category."}
          </AlertDescription>
        </Alert>
      ))}

      {significantChanges.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Significant Changes</AlertTitle>
          <AlertDescription>
            Your spending patterns remain consistent with previous periods.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}