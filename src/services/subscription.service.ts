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
    const response = await fetch(`${api.baseURL}/subscriptions/${userId}`, {
      headers: api.headers,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch subscription');
    }
    const data = await response.json();
    return data;
  }

  /**
   * Create a new subscription for a user
   * @param userId - The ID of the user
   * @param planId - The ID of the subscription plan
   * @returns Promise with created subscription details
   */
  async createSubscription(userId: string, planId: string): Promise<Subscription> {
    const response = await fetch(`${api.baseURL}/subscriptions`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify({ userId, planId }),
    });
    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }
    const data = await response.json();
    return data;
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
    const response = await fetch(`${api.baseURL}/subscriptions/${subscriptionId}/status`, {
      method: 'PATCH',
      headers: api.headers,
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update subscription status');
    }
    const data = await response.json();
    return data;
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