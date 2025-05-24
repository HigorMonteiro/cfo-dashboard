import { z } from "zod";
import { loginSchema } from "../validations/auth";

/**
 * Interface for authentication service
 */
interface IAuthService {
  login(credentials: z.infer<typeof loginSchema>): Promise<{ access: string; refresh: string }>;
}

/**
 * Authentication service implementation
 * Handles user authentication operations
 */
export class AuthService implements IAuthService {
  /**
   * Base API URL for authentication requests
   */
  private apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

  /**
   * Authenticates a user with their credentials
   * @param {z.infer<typeof loginSchema>} credentials - User credentials
   * @returns {Promise<{ access: string; refresh: string }>} Authentication response
   */
  async login(credentials: z.infer<typeof loginSchema>): Promise<{ access: string; refresh: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return { access: data.access, refresh: data.refresh };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const authService = new AuthService(); 