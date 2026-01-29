/**
 * Payment Failure Recovery Hook Tests
 * 
 * Tests for the usePaymentFailureRecovery React hook.
 * Verifies UI state management and user interaction handling.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { usePaymentFailureRecovery } from '../usePaymentFailureRecovery';
import { PaymentData, IkhokhaError, NetworkError } from '../../types/ikhokha';

// Mock the payment failure recovery service
vi.mock('../../services/PaymentFailureRecoveryService', () => ({
  paymentFailureRecoveryService: {
    handlePaymentFailure: vi.fn(),
    retryFailedPayment: vi.fn(),
    generateUserFriendlyErrorMessage: vi.fn(),
    getPaymentFailureStats: vi.fn()
  }
}));

// Mock the real-time payment sync hook
vi.mock('../useRealTimePaymentSync', () => ({
  useRealTimePaymentSync: () => ({
    subscribeToPaymentUpdates: vi.fn(() => () => {})
  })
}));

import { paymentFailureRecoveryService } from '../../services/PaymentFailureRecoveryService';

describe('usePaymentFailureRecovery', () => {
  const mockPaymentData: PaymentData = {
    sessionId: 'test-session-123',
    amount: 299.99,
    currency: 'ZAR',
    reference: 'test-ref-123',
    customer: {
      email: 'test@example.com',
      name: 'Test User'
    },
    metadata: {
      userId: 'user-123',
      courseId: 'course-456',
      courseName: 'Test Course'
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('should initialize with no failure state', () => {
      const { result } = renderHook(() => usePaymentFailureRecovery());
      const [failureState] = result.current;

      expect(failureState.hasFailure).toBe(false);
      expect(failureState.isRecovering).toBe(false);
      expect(failureState.canRetry).toBe(false);
      expect(failureState.retryAttempts).toBe(0);
      expect(failureState.errorMessage).toBeNull();
      expect(failureState.recoveryResult).toBeNull();
    });
  });

  describe('handlePaymentFailure', () => {
    it('should handle payment failure and update state', async () => {
      const mockRecoveryResult = {
        success: false,
        action: 'retry' as const,
        message: 'Payment failed. Will retry automatically.',
        canRetry: true,
        requiresUserAction: false,
        adminNotified: false,
        nextRetryAt: new Date(Date.now() + 5000)
      };

      const mockErrorMessage = {
        title: 'Payment Failed',
        message: 'Your payment could not be processed.',
        actionText: 'Try Again',
        actionType: 'retry' as const,
        showRetryButton: true,
        showChangeMethodButton: false,
        showContactSupport: false
      };

      vi.mocked(paymentFailureRecoveryService.handlePaymentFailure).mockResolvedValue(mockRecoveryResult);
      vi.mocked(paymentFailureRecoveryService.generateUserFriendlyErrorMessage).mockReturnValue(mockErrorMessage);

      const { result } = renderHook(() => usePaymentFailureRecovery());
      const [, actions] = result.current;

      const error = new IkhokhaError('Payment declined', 'PAYMENT_DECLINED');

      await act(async () => {
        await actions.handlePaymentFailure(error, mockPaymentData, 'enrollment-123');
      });

      const [failureState] = result.current;

      expect(failureState.hasFailure).toBe(true);
      expect(failureState.isRecovering).toBe(false);
      expect(failureState.canRetry).toBe(true);
      expect(failureState.errorMessage).toEqual(mockErrorMessage);
      expect(failureState.recoveryResult).toEqual(mockRecoveryResult);
      expect(failureState.nextRetryAt).toEqual(mockRecoveryResult.nextRetryAt);
    });

    it('should set recovering state during failure handling', async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise(resolve => {
        resolvePromise = resolve;
      });

      vi.mocked(paymentFailureRecoveryService.handlePaymentFailure).mockReturnValue(promise);

      const { result } = renderHook(() => usePaymentFailureRecovery());
      const [, actions] = result.current;

      const error = new NetworkError('Connection timeout');

      act(() => {
        actions.handlePaymentFailure(error, mockPaymentData, 'enrollment-123');
      });

      // Should be in recovering state
      expect(result.current[0].isRecovering).toBe(true);

      // Resolve the promise
      act(() => {
        resolvePromise!({
          success: false,
          action: 'retry',
          message: 'Network error',
          canRetry: true,
          requiresUserAction: false,
          adminNotified: false
        });
      });

      await waitFor(() => {
        expect(result.current[0].isRecovering).toBe(false);
      });
    });

    it('should call onManualApprovalRequired callback when appropriate', async () => {
      const onManualApprovalRequired = vi.fn();
      
      const mockRecoveryResult = {
        success: true,
        action: 'manual_approval' as const,
        message: 'Submitted for manual review',
        canRetry: false,
        requiresUserAction: false,
        adminNotified: true
      };

      vi.mocked(paymentFailureRecoveryService.handlePaymentFailure).mockResolvedValue(mockRecoveryResult);
      vi.mocked(paymentFailureRecoveryService.generateUserFriendlyErrorMessage).mockReturnValue({
        title: 'Payment Failed',
        message: 'Submitted for review',
        actionText: 'OK',
        actionType: 'wait',
        showRetryButton: false,
        showChangeMethodButton: false,
        showContactSupport: false
      });

      const { result } = renderHook(() => 
        usePaymentFailureRecovery({ onManualApprovalRequired })
      );
      const [, actions] = result.current;

      await act(async () => {
        await actions.handlePaymentFailure(
          new IkhokhaError('Critical error', 'AUTHENTICATION_ERROR'),
          mockPaymentData,
          'enrollment-123'
        );
      });

      expect(onManualApprovalRequired).toHaveBeenCalledWith('enrollment-123');
    });

    it('should handle recovery service errors gracefully', async () => {
      vi.mocked(paymentFailureRecoveryService.handlePaymentFailure).mockRejectedValue(
        new Error('Recovery service failed')
      );

      const { result } = renderHook(() => usePaymentFailureRecovery());
      const [, actions] = result.current;

      await act(async () => {
        await actions.handlePaymentFailure(
          new Error('Payment error'),
          mockPaymentData,
          'enrollment-123'
        );
      });

      const [failureState] = result.current;

      expect(failureState.hasFailure).toBe(true);
      expect(failureState.isRecovering).toBe(false);
      expect(failureState.canRetry).toBe(false);
      expect(failureState.errorMessage?.showContactSupport).toBe(true);
    });
  });

  describe('retryPayment', () => {
    it('should retry payment and update state on success', async () => {
      const mockRetryResult = {
        success: true,
        action: 'retry' as const,
        message: 'Payment completed successfully',
        canRetry: false,
        requiresUserAction: false,
        adminNotified: false
      };

      vi.mocked(paymentFailureRecoveryService.retryFailedPayment).mockResolvedValue(mockRetryResult);

      const { result } = renderHook(() => usePaymentFailureRecovery());
      
      // Set initial failure state
      act(() => {
        result.current[1].handlePaymentFailure(
          new Error('Initial failure'),
          mockPaymentData,
          'enrollment-123'
        );
      });

      const [, actions] = result.current;

      await act(async () => {
        await actions.retryPayment('enrollment-123');
      });

      const [failureState] = result.current;

      expect(failureState.hasFailure).toBe(false);
      expect(failureState.isRecovering).toBe(false);
      expect(failureState.errorMessage).toBeNull();
      expect(failureState.recoveryResult).toEqual(mockRetryResult);
    });

    it('should update retry attempts on failed retry', async () => {
      const mockRetryResult = {
        success: false,
        action: 'retry' as const,
        message: 'Retry failed',
        canRetry: true,
        requiresUserAction: false,
        adminNotified: false,
        nextRetryAt: new Date(Date.now() + 10000)
      };

      vi.mocked(paymentFailureRecoveryService.retryFailedPayment).mockResolvedValue(mockRetryResult);
      vi.mocked(paymentFailureRecoveryService.generateUserFriendlyErrorMessage).mockReturnValue({
        title: 'Retry Failed',
        message: 'Payment retry was unsuccessful',
        actionText: 'Try Again',
        actionType: 'retry',
        showRetryButton: true,
        showChangeMethodButton: false,
        showContactSupport: false,
        additionalInfo: '(Attempt 2)'
      });

      const { result } = renderHook(() => usePaymentFailureRecovery());
      
      // Set initial failure state with 1 retry attempt
      act(() => {
        (result.current[0] as any).retryAttempts = 1;
      });

      const [, actions] = result.current;

      await act(async () => {
        await actions.retryPayment('enrollment-123');
      });

      const [failureState] = result.current;

      expect(failureState.retryAttempts).toBe(2);
      expect(failureState.canRetry).toBe(true);
      expect(failureState.errorMessage?.additionalInfo).toContain('(Attempt 2)');
    });

    it('should set recovering state during retry', async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise(resolve => {
        resolvePromise = resolve;
      });

      vi.mocked(paymentFailureRecoveryService.retryFailedPayment).mockReturnValue(promise);

      const { result } = renderHook(() => usePaymentFailureRecovery());
      const [, actions] = result.current;

      act(() => {
        actions.retryPayment('enrollment-123');
      });

      expect(result.current[0].isRecovering).toBe(true);

      act(() => {
        resolvePromise!({
          success: true,
          action: 'retry',
          message: 'Success',
          canRetry: false,
          requiresUserAction: false,
          adminNotified: false
        });
      });

      await waitFor(() => {
        expect(result.current[0].isRecovering).toBe(false);
      });
    });
  });

  describe('clearFailure', () => {
    it('should reset failure state', async () => {
      const { result } = renderHook(() => usePaymentFailureRecovery());
      
      // Set failure state first
      vi.mocked(paymentFailureRecoveryService.handlePaymentFailure).mockResolvedValue({
        success: false,
        action: 'retry',
        message: 'Payment failed',
        canRetry: true,
        requiresUserAction: false,
        adminNotified: false
      });

      vi.mocked(paymentFailureRecoveryService.generateUserFriendlyErrorMessage).mockReturnValue({
        title: 'Payment Failed',
        message: 'Error occurred',
        actionText: 'Retry',
        actionType: 'retry',
        showRetryButton: true,
        showChangeMethodButton: false,
        showContactSupport: false
      });

      const [, actions] = result.current;

      await act(async () => {
        await actions.handlePaymentFailure(
          new Error('Test error'),
          mockPaymentData,
          'enrollment-123'
        );
      });

      // Verify failure state is set
      expect(result.current[0].hasFailure).toBe(true);

      // Clear failure
      act(() => {
        actions.clearFailure();
      });

      const [failureState] = result.current;

      expect(failureState.hasFailure).toBe(false);
      expect(failureState.isRecovering).toBe(false);
      expect(failureState.canRetry).toBe(false);
      expect(failureState.retryAttempts).toBe(0);
      expect(failureState.errorMessage).toBeNull();
      expect(failureState.recoveryResult).toBeNull();
      expect(failureState.nextRetryAt).toBeNull();
      expect(failureState.isRetryScheduled).toBe(false);
    });
  });

  describe('generateErrorMessage', () => {
    it('should generate error message with current retry attempts', () => {
      const mockErrorMessage = {
        title: 'Payment Failed',
        message: 'Error with retry info',
        actionText: 'Retry',
        actionType: 'retry' as const,
        showRetryButton: true,
        showChangeMethodButton: false,
        showContactSupport: false,
        additionalInfo: '(Attempt 3)'
      };

      vi.mocked(paymentFailureRecoveryService.generateUserFriendlyErrorMessage).mockReturnValue(mockErrorMessage);

      const { result } = renderHook(() => usePaymentFailureRecovery());
      
      // Set retry attempts
      act(() => {
        (result.current[0] as any).retryAttempts = 2;
      });

      const [, actions] = result.current;
      const errorMessage = actions.generateErrorMessage(new Error('Test error'), true);

      expect(paymentFailureRecoveryService.generateUserFriendlyErrorMessage).toHaveBeenCalledWith(
        expect.any(Error),
        true,
        2
      );
      expect(errorMessage).toEqual(mockErrorMessage);
    });
  });

  describe('auto-retry functionality', () => {
    it('should schedule auto-retry when enabled', async () => {
      vi.useFakeTimers();

      const mockRecoveryResult = {
        success: false,
        action: 'retry' as const,
        message: 'Will retry automatically',
        canRetry: true,
        requiresUserAction: false,
        adminNotified: false,
        nextRetryAt: new Date(Date.now() + 5000)
      };

      vi.mocked(paymentFailureRecoveryService.handlePaymentFailure).mockResolvedValue(mockRecoveryResult);
      vi.mocked(paymentFailureRecoveryService.generateUserFriendlyErrorMessage).mockReturnValue({
        title: 'Payment Failed',
        message: 'Auto-retry scheduled',
        actionText: 'Retry',
        actionType: 'retry',
        showRetryButton: true,
        showChangeMethodButton: false,
        showContactSupport: false
      });

      const { result } = renderHook(() => 
        usePaymentFailureRecovery({ autoRetry: true })
      );
      const [, actions] = result.current;

      await act(async () => {
        await actions.handlePaymentFailure(
          new Error('Test error'),
          mockPaymentData,
          'enrollment-123'
        );
      });

      expect(result.current[0].isRetryScheduled).toBe(true);

      // Mock successful retry
      vi.mocked(paymentFailureRecoveryService.retryFailedPayment).mockResolvedValue({
        success: true,
        action: 'retry',
        message: 'Success',
        canRetry: false,
        requiresUserAction: false,
        adminNotified: false
      });

      // Fast-forward time to trigger auto-retry
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      await waitFor(() => {
        expect(result.current[0].hasFailure).toBe(false);
      });

      vi.useRealTimers();
    });
  });

  describe('callback handling', () => {
    it('should call onRecoveryComplete callback', async () => {
      const onRecoveryComplete = vi.fn();
      
      const mockRecoveryResult = {
        success: false,
        action: 'retry' as const,
        message: 'Recovery handled',
        canRetry: true,
        requiresUserAction: false,
        adminNotified: false
      };

      vi.mocked(paymentFailureRecoveryService.handlePaymentFailure).mockResolvedValue(mockRecoveryResult);
      vi.mocked(paymentFailureRecoveryService.generateUserFriendlyErrorMessage).mockReturnValue({
        title: 'Payment Failed',
        message: 'Error',
        actionText: 'Retry',
        actionType: 'retry',
        showRetryButton: true,
        showChangeMethodButton: false,
        showContactSupport: false
      });

      const { result } = renderHook(() => 
        usePaymentFailureRecovery({ onRecoveryComplete })
      );
      const [, actions] = result.current;

      await act(async () => {
        await actions.handlePaymentFailure(
          new Error('Test error'),
          mockPaymentData,
          'enrollment-123'
        );
      });

      expect(onRecoveryComplete).toHaveBeenCalledWith(mockRecoveryResult);
    });
  });
});