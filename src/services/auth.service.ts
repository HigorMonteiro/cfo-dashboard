import { api } from '@/lib/api';
import { LoginDTO, AuthResponseDTO, UserDTO } from '@/types/auth';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

/**
 * Authentication Service
 * 
 * @description Handles all authentication related operations including API calls and state management
 */
export class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {
    // Initialize token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Handles user login process
   * @param {LoginDTO} credentials - User login credentials
   * @returns {Promise<boolean>} Success status
   */
  public async login(credentials: LoginDTO): Promise<boolean> {
    try {
      const response = await fetch(`${api.baseURL}/token/`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AuthResponseDTO = await response.json();
      
      // Store tokens in both localStorage and cookies
      this.setToken(data.access);
      if (typeof window !== 'undefined') {
        // Store in localStorage
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Store in cookies
        Cookies.set('access_token', data.access, { 
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        Cookies.set('refresh_token', data.refresh, {
          expires: 30, // 30 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }

      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      
      if (error instanceof Error) {
        if (error.message.includes("401")) {
          toast.error("Invalid email or password");
        } else if (error.message.includes("network")) {
          toast.error("Network error. Please check your connection");
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
      
      return false;
    }
  }

  /**
   * Fetches current user data
   * @returns {Promise<UserDTO>} User data
   */
  public async getCurrentUser(): Promise<UserDTO> {
    try {
      if (!this.token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(`${api.baseURL}/users/users/`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          throw new Error('Authentication token expired or invalid');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data[0] : data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  }

  /**
   * Handles user logout
   */
  public logout(): void {
    try {
      this.token = null;
      if (typeof window !== 'undefined') {
        // Clear localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        // Clear cookies
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
      }
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");
    }
  }

  /**
   * Checks if user is authenticated
   * @returns {boolean} Authentication status
   */
  public isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Gets current user data from storage
   * @returns {UserDTO | null} User data or null
   */
  public getStoredUser(): UserDTO | null {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Sets authentication token
   * @param {string} token - Authentication token
   */
  private setToken(token: string) {
    this.token = token;
  }
}

export const authService = AuthService.getInstance();