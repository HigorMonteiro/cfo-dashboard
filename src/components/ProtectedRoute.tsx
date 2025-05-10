import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth';
import { SubscriptionContent } from './SubscriptionContent';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireSubscription?: boolean;
  requireAdmin?: boolean;
  fallback?: ReactNode;
}

/**
 * Protected Route Component
 * Handles access control based on user role and subscription status
 * @param {ProtectedRouteProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export function ProtectedRoute({
  children,
  requireSubscription = true,
  requireAdmin = false,
  fallback,
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  // Admin users have full access
  if (user?.role === UserRole.ADMIN) {
    return <>{children}</>;
  }

  // If admin access is required but user is not admin
  if (requireAdmin && user?.role !== UserRole.ADMIN) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You don&apos;t have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  // If subscription is required, wrap with SubscriptionContent
  if (requireSubscription) {
    return <SubscriptionContent fallback={fallback}>{children}</SubscriptionContent>;
  }

  // If no special requirements, render children
  return <>{children}</>;
} 