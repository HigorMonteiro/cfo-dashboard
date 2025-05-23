import { Subscription, SubscriptionStatus } from '@/types/auth';
import { api } from '@/lib/api';

/**
 * Service for handling subscription-related operations
 */
class SubscriptionService {
  /**
   * Get user's subscription details
   * @param userId - The ID of the user
   * @returns Promise with subscription details
   */
  async getUserSubscription(userId: string): Promise<Subscription> {
    const response = await api.get(`/subscriptions/${userId}`);
    return response.data;
  }

  /**
   * Create a new subscription for a user
   * @param userId - The ID of the user
   * @param planId - The ID of the subscription plan
   * @returns Promise with created subscription details
   */
  async createSubscription(userId: string, planId: string): Promise<Subscription> {
    const response = await api.post('/subscriptions', {
      userId,
      planId,
    });
    return response.data;
  }

  /**
   * Update subscription status
   * @param subscriptionId - The ID of the subscription
   * @param status - The new status
   * @returns Promise with updated subscription details
   */
  async updateSubscriptionStatus(
    subscriptionId: string,
    status: SubscriptionStatus
  ): Promise<Subscription> {
    const response = await api.patch(`/subscriptions/${subscriptionId}/status`, {
      status,
    });
    return response.data;
  }

  /**
   * Check if user has active subscription
   * @param userId - The ID of the user
   * @returns Promise with boolean indicating if user has active subscription
   */
  async hasActiveSubscription(userId: string): Promise<boolean> {
    try {
      const subscription = await this.getUserSubscription(userId);
      return subscription.status === SubscriptionStatus.ACTIVE;
    } catch (err) {
      console.error('Error checking active subscription:', err);
      return false;
    }
  }
}

export const subscriptionService = new SubscriptionService(); 