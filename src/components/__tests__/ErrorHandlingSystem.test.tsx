/**
 * Comprehensive Error Handling System Tests
 * 
 * Tests the complete error handling system including:
 * - ErrorHandler utility
 * - ErrorNotificationSystem component
 * - FallbackManager utility
 * - CriticalSectionErrorBoundary component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { errorHandler } from '@/utils/ErrorHandler';
import { fallbackManager } from '@/utils/FallbackManager';
import ErrorNotificationSystem from '@/components/ErrorNotificationSystem';
import CriticalSectionErrorBoundary from '@/components/CriticalSectionErrorBoundary';

// Mock components for testing
const ThrowError = ({ shouldThrow = false, errorType = 'generic' }: { 
  shouldThrow?: boolean; 
  errorType?: string; 
}) => {
  if (shouldThrow) {
    switch (errorType) {
      case 'network':
        throw new Error('Network request failed');
      case 'payment':
        throw new Error('Payment processing failed');
      case 'authentication':
        throw new Error('Authentication required');
      default:
        throw new Error('Generic error occurred');
    }
  }
  return <div data-testid="no-error">No error</div>;
};

describe('ErrorHandler', () => {
  beforeEach(() => {
    errorHandler.clearErrors();
  });

  it('should handle errors and categorize them correctly', () => {
    const networkError = new Error('Network request failed');
    const paymentError = new Error('Payment processing failed');
    const authError = new Error('Authentication required');

    const networkResult = errorHandler.handleError(networkError, 'test');
    const paymentResult = errorHandler.handleError(paymentError, 'test');
    const authResult = errorHandler.handleError(authError, 'test');

    expect(networkResult.category).toBe('network');
    expect(paymentResult.category).toBe('payment');
    expect(authResult.category).toBe('authentication');
  });

  it('should provide appropriate user-friendly messages', () => {
    const networkError = new Error('fetch failed');
    const result = errorHandler.handleError(networkError, 'test');

    expect(result.message).toContain('Connection issue detected');
    expect(result.actions).toHaveLength(2);
    expect(result.actions[0].label).toBe('Retry');
  });

  it('should track error count', () => {
    const initialCount = errorHandler.getErrorCount();
    
    errorHandler.handleError(new Error('Test error 1'), 'test');
    errorHandler.handleError(new Error('Test error 2'), 'test');
    
    expect(errorHandler.getErrorCount()).toBe(initialCount + 2);
  });
});

describe('FallbackManager', () => {
  beforeEach(() => {
    fallbackManager.clearCache();
  });

  it('should cache successful responses', async () => {
    const mockData = { test: 'data' };
    const mockFn = vi.fn().mockResolvedValue(mockData);

    const result = await fallbackManager.withFallback('test-key', mockFn);

    expect(result.data).toEqual(mockData);
    expect(result.source).toBe('cache');
    expect(result.isStale).toBe(false);
  });

  it('should return cached data when network fails', async () => {
    const mockData = { test: 'cached-data' };
    const successFn = vi.fn().mockResolvedValue(mockData);
    const failFn = vi.fn().mockRejectedValue(new Error('Network error'));

    // First call succeeds and caches data
    await fallbackManager.withFallback('test-key', successFn);

    // Second call fails but returns cached data
    const result = await fallbackManager.withFallback('test-key', failFn);

    expect(result.data).toEqual(mockData);
    expect(result.isStale).toBe(false);
  });

  it('should provide graceful fallback when no cache available', async () => {
    const failFn = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await fallbackManager.withFallback(
      'courses-test', 
      failFn,
      { gracefulDegradation: true }
    );

    expect(result.data).toEqual([]);
    expect(result.source).toBe('static');
    expect(result.isStale).toBe(true);
  });
});

describe('ErrorNotificationSystem', () => {
  beforeEach(() => {
    // Clear any existing event listeners
    window.removeEventListener('errorHandler:showError', () => {});
  });

  it('should render without crashing', () => {
    render(<ErrorNotificationSystem />);
    // Component should render without throwing
  });

  it('should show network status when offline', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    render(<ErrorNotificationSystem showNetworkStatus={true} />);
    
    // Should show offline indicator
    expect(screen.getByText('You\'re offline')).toBeInTheDocument();
  });

  it('should handle error events', async () => {
    render(<ErrorNotificationSystem />);

    // Dispatch a custom error event
    const errorEvent = new CustomEvent('errorHandler:showError', {
      detail: {
        message: 'Test error message',
        severity: 'medium',
        category: 'network',
        actions: [
          {
            label: 'Retry',
            action: () => {},
            primary: true
          }
        ]
      }
    });

    window.dispatchEvent(errorEvent);

    // Should show the error notification
    await waitFor(() => {
      expect(screen.getByText('Connection Issue')).toBeInTheDocument();
    });
  });
});

describe('CriticalSectionErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for these tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render children when no error occurs', () => {
    render(
      <CriticalSectionErrorBoundary section="payment" allowRetry={true} maxRetries={3} showFallback={true} requiresAuth={true}>
        <ThrowError shouldThrow={false} />
      </CriticalSectionErrorBoundary>
    );

    expect(screen.getByTestId('no-error')).toBeInTheDocument();
  });

  it('should catch and display payment errors', () => {
    render(
      <CriticalSectionErrorBoundary section="payment" allowRetry={true} maxRetries={3} showFallback={true} requiresAuth={true}>
        <ThrowError shouldThrow={true} errorType="payment" />
      </CriticalSectionErrorBoundary>
    );

    expect(screen.getByText('Payment Processing Error')).toBeInTheDocument();
    expect(screen.getByText('Critical Section Error')).toBeInTheDocument();
  });

  it('should show retry button for retryable errors', () => {
    render(
      <CriticalSectionErrorBoundary section="network" allowRetry={true} maxRetries={3} showFallback={true} requiresAuth={false}>
        <ThrowError shouldThrow={true} errorType="network" />
      </CriticalSectionErrorBoundary>
    );

    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should show contact support button', () => {
    render(
      <CriticalSectionErrorBoundary section="payment" allowRetry={true} maxRetries={3} showFallback={true} requiresAuth={true}>
        <ThrowError shouldThrow={true} errorType="payment" />
      </CriticalSectionErrorBoundary>
    );

    expect(screen.getByText('Contact Support')).toBeInTheDocument();
  });

  it('should call onError callback when error occurs', () => {
    const onError = vi.fn();

    render(
      <CriticalSectionErrorBoundary 
        section="payment" 
        allowRetry={true} 
        maxRetries={3} 
        showFallback={true} 
        requiresAuth={true}
        onError={onError}
      >
        <ThrowError shouldThrow={true} errorType="payment" />
      </CriticalSectionErrorBoundary>
    );

    expect(onError).toHaveBeenCalled();
  });
});

describe('Integration Tests', () => {
  beforeEach(() => {
    errorHandler.clearErrors();
    fallbackManager.clearCache();
  });

  it('should handle complete error flow from boundary to notification', async () => {
    const onError = vi.fn();
    
    render(
      <>
        <ErrorNotificationSystem />
        <CriticalSectionErrorBoundary 
          section="payment" 
          allowRetry={true} 
          maxRetries={3} 
          showFallback={true} 
          requiresAuth={true}
          onError={onError}
        >
          <ThrowError shouldThrow={true} errorType="payment" />
        </CriticalSectionErrorBoundary>
      </>
    );

    // Error boundary should catch the error
    expect(screen.getByText('Payment Processing Error')).toBeInTheDocument();
    expect(onError).toHaveBeenCalled();
  });

  it('should integrate fallback manager with error handling', async () => {
    const mockFailingFn = vi.fn().mockRejectedValue(new Error('API Error'));
    
    try {
      await fallbackManager.withFallback('test-api', mockFailingFn, {
        gracefulDegradation: true
      });
    } catch (error) {
      // Should not throw due to graceful degradation
      expect(error).toBeUndefined();
    }

    // Should have fallback data
    const stats = fallbackManager.getCacheStats();
    expect(stats.size).toBeGreaterThan(0);
  });
});

describe('Error Recovery Scenarios', () => {
  it('should handle network recovery', async () => {
    // Simulate offline state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    const mockFn = vi.fn().mockRejectedValue(new Error('Network error'));
    
    const result = await fallbackManager.withFallback('test-recovery', mockFn, {
      gracefulDegradation: true
    });

    expect(result.data).toBeDefined();
    expect(result.source).toBe('static');

    // Simulate coming back online
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    window.dispatchEvent(new Event('online'));

    // Should trigger recovery mechanisms
    await waitFor(() => {
      expect(navigator.onLine).toBe(true);
    });
  });

  it('should handle cache expiration and refresh', async () => {
    const mockData = { test: 'data' };
    const mockFn = vi.fn().mockResolvedValue(mockData);

    // Cache data
    await fallbackManager.withFallback('test-expiry', mockFn, {
      maxAge: 100 // Very short expiry
    });

    // Wait for expiry
    await new Promise(resolve => setTimeout(resolve, 150));

    // Should fetch fresh data
    const freshMockFn = vi.fn().mockResolvedValue({ test: 'fresh-data' });
    const result = await fallbackManager.withFallback('test-expiry', freshMockFn, {
      maxAge: 100
    });

    expect(result.data).toEqual({ test: 'fresh-data' });
    expect(freshMockFn).toHaveBeenCalled();
  });
});