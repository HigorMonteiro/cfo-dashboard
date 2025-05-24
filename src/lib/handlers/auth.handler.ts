import { authService } from "@/services/auth.service";
import { LoginDTO, User } from "@/types/auth";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";

/**
 * Authentication handler for managing login operations
 */
export class AuthHandler {
  /**
   * Handles user login
   * @param {LoginDTO} credentials - User login credentials
   * @returns {Promise<boolean>} Success status
   */
  static async handleLogin(credentials: LoginDTO): Promise<boolean> {
    try {
      const response = await authService.login(credentials);
      
      // Store tokens
      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);
      
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle specific error cases
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
   * Handles user logout
   */
  static handleLogout(): void {
    try {
      // Clear local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      
      // Call logout service
      authService.logout();
      
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
  static isAuthenticated(): boolean {
    return !!localStorage.getItem("access_token");
  }

  /**
   * Gets current user data
   * @returns {User | null} User data or null
   */
  static getCurrentUser(): User | null {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }
} 