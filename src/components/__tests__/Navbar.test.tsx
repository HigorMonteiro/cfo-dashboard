import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/services/auth.service', () => ({
  authService: {
    logout: jest.fn()
  }
}));

describe('Navbar', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('should handle logout successfully', async () => {
    // Arrange
    (authService.logout as jest.Mock).mockResolvedValue(true);
    render(<Navbar />);

    // Act
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // Assert
    expect(authService.logout).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('should handle logout error', async () => {
    // Arrange
    (authService.logout as jest.Mock).mockRejectedValue(new Error('Logout failed'));
    render(<Navbar />);

    // Act
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // Assert
    expect(authService.logout).toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
}); 