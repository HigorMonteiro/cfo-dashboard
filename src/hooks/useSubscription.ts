import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionService } from '@/services/subscription.service';
import { SubscriptionStatus } from '@/types/auth';
import { useAuth } from './useAuth';

/**
 * Hook for managing subscription state and operations
 * @returns Object containing subscription data and operations
 */
export function useSubscription() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const subscription = useQuery({
    queryKey: ['subscription', user.data?.id],
    queryFn: () => subscriptionService.getUserSubscription(user.data!.id),
    enabled: !!user.data?.id,
  });

  const createSubscription = useMutation({
    mutationFn: ({ planId }: { planId: string }) =>
      subscriptionService.createSubscription(user.data!.id, planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
  });

  const updateStatus = useMutation({
    mutationFn: ({ status }: { status: SubscriptionStatus }) =>
      subscriptionService.updateSubscriptionStatus(subscription.data!.id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
  });

  const hasActiveSubscription = useQuery({
    queryKey: ['hasActiveSubscription', user.data?.id],
    queryFn: () => subscriptionService.hasActiveSubscription(user.data!.id),
    enabled: !!user.data?.id,
  });

  return {
    subscription: subscription.data,
    isLoading: subscription.isLoading,
    isError: subscription.isError,
    createSubscription,
    updateStatus,
    hasActiveSubscription: hasActiveSubscription.data,
  };
} 