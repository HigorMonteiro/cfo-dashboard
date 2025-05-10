/**
 * Authentication DTOs
 * 
 * @description Data Transfer Objects for authentication
 */
export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  access: string;
  refresh: string;
  user: UserDTO;
}

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  user_type: string;
  role: string | null;
  role_details: any | null;
  active_subscription: any | null;
  created_at: string;
  updated_at: string;
}

/**
 * User roles enum
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

/**
 * User interface representing a user in the system
 */
export interface User {
  id: string;
  username: string;
  email: string;
  user_type: string;
  role: UserRole | null;
  role_details: any | null;
  active_subscription: any | null;
  created_at: string;
  updated_at: string;
}

/**
 * Subscription interface representing a user's subscription plan
 */
export interface Subscription {
  id: string;
  planId: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
}

/**
 * Enum representing possible subscription statuses
 */
export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING'
}

/**
 * Response interface for authentication operations
 */
export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

/**
 * Error response interface
 */
export interface ErrorResponse {
  message: string;
  code: string;
}
