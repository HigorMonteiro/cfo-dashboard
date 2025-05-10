import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '../toaster';

describe('Toast Components', () => {
  const TestComponent = () => {
    const { toast } = useToast();

    return (
      <button
        onClick={() =>
          toast({
            title: 'Test Title',
            description: 'Test Description',
          })
        }
      >
        Show Toast
      </button>
    );
  };

  it('should render toast with title and description', () => {
    // Arrange
    render(
      <>
        <TestComponent />
        <Toaster />
      </>
    );

    // Act
    const button = screen.getByText('Show Toast');
    fireEvent.click(button);

    // Assert
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should close toast when clicking close button', () => {
    // Arrange
    render(
      <>
        <TestComponent />
        <Toaster />
      </>
    );

    // Act
    const button = screen.getByText('Show Toast');
    fireEvent.click(button);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Assert
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('should render toast with action button', () => {
    // Arrange
    const TestComponentWithAction = () => {
      const { toast } = useToast();

      return (
        <button
          onClick={() =>
            toast({
              title: 'Test Title',
              description: 'Test Description',
              action: <button>Action</button>,
            })
          }
        >
          Show Toast
        </button>
      );
    };

    // Act
    render(
      <>
        <TestComponentWithAction />
        <Toaster />
      </>
    );

    const button = screen.getByText('Show Toast');
    fireEvent.click(button);

    // Assert
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should render toast with destructive variant', () => {
    // Arrange
    const TestComponentWithVariant = () => {
      const { toast } = useToast();

      return (
        <button
          onClick={() =>
            toast({
              title: 'Test Title',
              description: 'Test Description',
              variant: 'destructive',
            })
          }
        >
          Show Toast
        </button>
      );
    };

    // Act
    render(
      <>
        <TestComponentWithVariant />
        <Toaster />
      </>
    );

    const button = screen.getByText('Show Toast');
    fireEvent.click(button);

    // Assert
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('destructive');
  });
}); 