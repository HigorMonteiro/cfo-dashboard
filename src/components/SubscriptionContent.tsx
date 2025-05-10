import { ReactNode } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface SubscriptionContentProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component that handles subscription-based content access
 * @param {SubscriptionContentProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export function SubscriptionContent({ children, fallback }: SubscriptionContentProps) {
  const { hasActiveSubscription, isLoading } = useSubscription();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hasActiveSubscription) {
    return fallback || (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Subscription Required</CardTitle>
          <CardDescription>
            You need an active subscription to access this content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => router.push('/subscription/plans')}
            className="w-full"
          >
            View Subscription Plans
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
} 