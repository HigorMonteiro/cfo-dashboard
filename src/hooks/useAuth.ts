import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { LoginDTO } from '@/types/auth';

/**
 * Safe storage utility to handle localStorage access
 * @description Provides safe access to localStorage with fallback for SSR
 */
const safeStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

/**
 * Authentication Hook
 * 
 * @description Custom hook for handling authentication state and operations
 */
export function useAuth() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: (credentials: LoginDTO) => authService.login(credentials),
    onSuccess: (data) => {
      // Store tokens using safe storage
      safeStorage.setItem('access_token', data.access);
      safeStorage.setItem('refresh_token', data.refresh);
      
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const user = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser(),
    enabled: !!safeStorage.getItem('access_token'),
  });

  const logout = () => {
    authService.logout();
    safeStorage.removeItem('access_token');
    safeStorage.removeItem('refresh_token');
    queryClient.clear();
  };

  return {
    login,
    user,
    logout,
    isAuthenticated: !!safeStorage.getItem('access_token'),
  };
}