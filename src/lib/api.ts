import env from '@/config/env';

/**
 * API Configuration
 * 
 * @description Centralized API configuration and base URL
 */
export const API_BASE_URL = env.api.baseUrl;

export const api = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};