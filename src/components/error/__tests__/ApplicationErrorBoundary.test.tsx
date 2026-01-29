/**
 * Tests for Application Error Boundary System
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ApplicationErrorBoundary from '../ApplicationErrorBoundary';

// Mock components for testing
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div data-testid="working-component">Component works!</div>;
};

const MockFallback = () => <div data-testid="custom-fallback">Custom fallback</div>;

// Mock utilities
vi.mock('@/utils/ErrorHandler', () => ({
  errorHandler: {
    handleError: vi.fn(() => ({
      message: 'Test error message',
      severity: 'medium',
      category: 'component',
      actions: []
    })),
    clearErrors: vi.fn()
  }
}));

vi.mock('@/utils/FallbackManager', () => ({
  fallbackManager: {
    getCacheStats: vi.fn(() => ({ size: 0 })),
    clearCache: vi.fn()
  }
}));

describe('ApplicationErrorBoundary', () => {
  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (consoleErrorSpy.mockRestore) {
      consoleErrorSpy.mockRestore();
    }
  });

  describe('Normal Operation', () => {
    it('renders children when no error occurs', () => {
      render(
        <ApplicationErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ApplicationErrorBoundary>
      );

      expect(screen.getByTestId('working-component')).toBeInTheDocument();
      expect(screen.getByText('Component works!')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('catches and displays component errors', () => {
      render(
        <ApplicationErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ApplicationErrorBoundary>
      );

      expect(screen.getByText('Application Error')).toBeInTheDocument();
    });

    it('uses custom fallback component when provided', () => {
      render(
        <ApplicationErrorBoundary fallbackComponent={<MockFallback />}>
          <ThrowError shouldThrow={true} />
        </ApplicationErrorBoundary>
      );

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('Custom fallback')).toBeInTheDocument();
    });

    it('calls onError callback when provided', () => {
      const onErrorMock = vi.fn();

      render(
        <ApplicationErrorBoundary onError={onErrorMock}>
          <ThrowError shouldThrow={true} />
        </ApplicationErrorBoundary>
      );

      expect(onErrorMock).toHaveBeenCalled();
    });
  });

  describe('Recovery Mechanisms', () => {
    it('shows retry button for errors', () => {
      render(
        <ApplicationErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ApplicationErrorBoundary>
      );

      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('handles manual retry', async () => {
      const { rerender } = render(
        <ApplicationErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ApplicationErrorBoundary>
      );

      const retryButton = screen.getByRole('button', { name: /try again/i });
      fireEvent.click(retryButton);

      // After retry, render working component
      rerender(
        <ApplicationErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ApplicationErrorBoundary>
      );

      await waitFor(() => {
        expect(screen.getByTestId('working-component')).toBeInTheDocument();
      });
    });
  });

  describe('User Interface', () => {
    it('shows appropriate action buttons', () => {
      render(
        <ApplicationErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ApplicationErrorBoundary>
      );

      expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
      const { container } = render(
        <ApplicationErrorBoundary className="custom-error-class">
          <ThrowError shouldThrow={true} />
        </ApplicationErrorBoundary>
      );

      expect(container.firstChild).toHaveClass('custom-error-class');
    });
  });
});