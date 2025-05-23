/**
 * Environment Configuration
 * 
 * @description Centralized environment variables configuration
 */

const env = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  },
  auth: {
    tokenKey: process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || 'auth_token',
    userKey: process.env.NEXT_PUBLIC_AUTH_USER_KEY || 'auth_user',
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'CFO Web',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
} as const;

export default env; 