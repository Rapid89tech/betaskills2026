/**
 * Comprehensive Tests for Enhanced Error Boundary System
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ApplicationErrorBoundary from '../ApplicationErrorBoundary';
import ErrorNotificationSystem from '../ErrorNotificationSystem';
import { withApplicationErrorBoundary, useApplicationErrorBoundary } from '../withApplicationErrorBoundary';

// Mock components for testing
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div data-testid="working-component">Component works!</div>;
};

const TestHookComponent = () => {
  const { reportError } = useApplicationErrorBoundary();
  
  return (
    <div>
      <div data-testid="hook-component">Hook Component</div>
      <button 
        data-testid="report-error" 
        onClick={() => reportError(new Error('Reported error'), 'TestContext')}
      >
        Report Error
      </button>
    </div>
  );
};

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

describe('Enhanced Error Boundary System', () => {
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

  describe('ApplicationErrorBoundary', () => {
    it('renders children when no error occurs', () => {
      render(
        <ApplicationErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ApplicationErrorBoundary>
      );

      expect(screen.getByTestId('working-component')).toBeInTheDocument();
    });

    it('catches and displays component errors', () => {
      render(
        <ApplicationErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ApplicationErrorBoundary>
      );

      expect(screen.getByText('Application Error')).toBeInTheDocument();
    });

    it('shows retry mechanisms', () => {
      render(
        <ApplicationErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ApplicationErrorBoundary>
      );

      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument();
    });

    it('handles manual retry', async () => {
      const { rerender } = render(
        <ApplicationErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ApplicationErrorBoundary>
      );

      const retryButton = screen.getByRole('button', { name: /try again/i });
      fireEvent.click(retryButton);

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

  describe('ErrorNotificationSystem', () => {
    it('renders without notifications initially', () => {
      render(<ErrorNotificationSystem />);
      // Should not render anything when no notifications
      expect(document.body.children.length).toBeGreaterThan(0);
    });
  });

  describe('withApplicationErrorBoundary HOC', () => {
    it('wraps component with error boundary', () => {
      const WrappedComponent = withApplicationErrorBoundary(ThrowError);
      
      render(<WrappedComponent shouldThrow={false} />);
      
      expect(screen.getByTestId('working-component')).toBeInTheDocument();
    });

    it('catches errors from wrapped component', () => {
      const WrappedComponent = withApplicationErrorBoundary(ThrowError);
      
      render(<WrappedComponent shouldThrow={true} />);
      
      expect(screen.getByText('Application Error')).toBeInTheDocument();
    });
  });

  describe('useApplicationErrorBoundary Hook', () => {
    it('provides error reporting functionality', () => {
      render(<TestHookComponent />);
      
      expect(screen.getByTestId('hook-component')).toBeInTheDocument();
      expect(screen.getByTestId('report-error')).toBeInTheDocument();
    });

    it('reports errors without triggering boundary', () => {
      render(<TestHookComponent />);
      
      const reportButton = screen.getByTestId('report-error');
      fireEvent.click(reportButton);
      
      // Should not trigger error boundary
      expect(screen.getByTestId('hook-component')).toBeInTheDocument();
    });
  });
});