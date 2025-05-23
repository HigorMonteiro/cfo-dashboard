import { AuthService } from '../auth.service';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('js-cookie', () => ({
  remove: jest.fn()
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset localStorage
    localStorage.clear();
    
    // Get fresh instance
    authService = AuthService.getInstance();
  });

  describe('logout', () => {
    it('should successfully logout user and clear all auth data', async () => {
      // Arrange
      localStorage.setItem('access_token', 'test-token');
      localStorage.setItem('refresh_token', 'refresh-token');
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));

      // Act
      const result = await authService.logout();

      // Assert
      expect(result).toBe(true);
      expect(localStorage.getItem('access_token')).toBeNull();
      expect(localStorage.getItem('refresh_token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      expect(Cookies.remove).toHaveBeenCalledWith('access_token', expect.any(Object));
      expect(Cookies.remove).toHaveBeenCalledWith('refresh_token', expect.any(Object));
      expect(toast.success).toHaveBeenCalledWith('Logged out successfully');
    });

    it('should handle errors during logout', async () => {
      // Arrange
      const mockError = new Error('Storage error');
      jest.spyOn(localStorage, 'removeItem').mockImplementation(() => {
        throw mockError;
      });

      // Act & Assert
      await expect(authService.logout()).rejects.toThrow('Failed to logout');
      expect(toast.error).toHaveBeenCalledWith('Error during logout');
    });
  });
}); 