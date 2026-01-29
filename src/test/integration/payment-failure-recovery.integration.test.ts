/**
 * Payment Failure Recovery Integration Tests
 * 
 * End-to-end integration tests for the complete payment failure recovery system.
 * Tests the interaction between services, hooks, and components.
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import React from 'react';

import { PaymentFailureRecoveryService } from '../../services/PaymentFailureRecoveryService';
import { EnrollmentStateManager } from '../../services/EnrollmentStateManager';
import { RealTimePaymentSync } from '../../services/RealTimePaymentSync';
import { usePaymentFailureRecovery } from '../../hooks/usePaymentFailureRecovery';
import { PaymentFailureRecovery } from '../../components/PaymentFailureRecovery';

import { 
  PaymentData, 
  IkhokhaError, 
  NetworkError, 
  PaymentValidationError,
  PaymentStatus 
} from '../../types/ikhokha';

// Mock external dependencies
vi.mock('../../services/PaymentLoggingService', () => ({
  paymentLoggingService: {
    logPaymentError: vi.fn().mockResolvedValue(undefined),
    logPaymentProcessingStart: vi.fn().mockResolvedValue('timer-id'),
    logPaymentProcessingComplete: vi.fn().mockResolvedValue(undefined),
    logWebhookReceived: vi.fn().mockResolvedValue(undefined),
    logWebhookProcessing: vi.fn().mockResolvedValue(undefined)
  }
}));

vi.mock('../../hooks/useRealTimePaymentSync', () => ({
  useRealTimePaymentSync: () => ({
    subscribeToPaymentUpdates: vi.fn(() => () => {}),
    broadcastToUser: vi.fn(),
    broadcastToAdmins: vi.fn(),
    syncEnrollmentStatus: vi.fn()
  })
}));

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled, className }: any) => (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={className}
      data-testid="button"
    >
      {children}
    </button>
  )
}));

vi.mock('@/components/ui/alert', () => ({
  Alert: ({ children, variant, className }: any) => (
    <div className={`alert ${variant} ${className}`} data-testid="alert">
      {children}
    </div>
  ),
  AlertTitle: ({ children }: any) => <h3 data-testid="alert-title">{children}</h3>,
  AlertDescription: ({ children }: any) => <div data-testid="alert-description">{children}</div>
}));

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: any) => <div className={className} data-testid="card">{children}</div>,
  CardHeader: ({ children }: any) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: any) => <h2 data-testid="card-title">{children}</h2>,
  CardDescription: ({ children }: any) => <p data-testid="card-description">{children}</p>,
  CardContent: ({ children }: any) => <div data-testid="card-content">{children}</div>
}));

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, variant }: any) => (
    <span className={`badge ${variant}`} data-testid="badge">{children}</span>
  )
}));

vi.mock('@/components/ui/progress', () => ({
  Progress: ({ value, className }: any) => (
    <div className={className} data-testid="progress" data-value={value}></div>
  )
}));

describe('Payment Failure Recovery Integration', () => {
  let enrollmentStateManager: EnrollmentStateManager;
  let realTimeSync: RealTimePaymentSync;
  let paymentFailureService: PaymentFailureRecoveryService;

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
      courseName: 'Advanced React Development'
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    enrollmentStateManager = new EnrollmentStateManager();
    realTimeSync = new RealTimePaymentSync();
    paymentFailureService = new PaymentFailureRecoveryService(
      enrollmentStateManager,
      realTimeSync
    );

    // Mock enrollment state manager methods
    vi.spyOn(enrollmentStateManager, 'updateEnrollmentStatus').mockResolvedValue(undefined);
    vi.spyOn(enrollmentStateManager, 'markForManualApproval').mockResolvedValue(undefined);
    vi.spyOn(enrollmentStateManager, 'approveEnrollment').mockResolvedValue(undefined);
    vi.spyOn(enrollmentStateManager, 'rejectEnrollment').mockResolvedValue(undefined);

    // Mock real-time sync methods
    vi.spyOn(realTimeSync, 'broadcastToUser').mockResolvedValue(undefined);
    vi.spyOn(realTimeSync, 'broadcastToAdmins').mockResolvedValue(undefined);
    vi.spyOn(realTimeSync, 'syncEnrollmentStatus').mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Complete Payment Failure Recovery Flow', () => {
    it('should handle network error with automatic retry and eventual success', async () => {
      // Requirement 7.1: Display clear error message with retry option
      // Requirement 7.3: Implement payment retry mechanism for failed transactions
      
      const networkError = new NetworkError('Connection timeout', { timeout: 30000 });
      const enrollmentId = 'enrollment-123';

      // Mock retry attempts - first fails, second succeeds
      let retryCount = 0;
      vi.spyOn(paymentFailureService as any, 'attemptPaymentRetry').mockImplementation(async () => {
        retryCount++;
        if (retryCount === 1) {
          return {
            success: false,
            status: PaymentStatus.FAILED,
            message: 'Network error persists'
          };
        } else {
          return {
            success: true,
            status: PaymentStatus.COMPLETED,
            message: 'Payment completed successfully',
            payment_id: 'payment-success-123',
            transaction_id: 'txn-success-123'
          };
        }
      });

      // Step 1: Handle initial payment failure
      const initialResult = await paymentFailureService.handlePaymentFailure(
        networkError,
        mockPaymentData,
        enrollmentId
      );

      expect(initialResult.success).toBe(false);
      expect(initialResult.action).toBe('retry');
      expect(initialResult.canRetry).toBe(true);
      expect(initialResult.message).toContain('Connection error');

      // Verify enrollment status updated to pending retry
      expect(enrollmentStateManager.updateEnrollmentStatus).toHaveBeenCalledWith(
        enrollmentId,
        'pending_payment_retry',
        expect.any(Object)
      );

      // Verify real-time update sent to user
      expect(realTimeSync.broadcastToUser).toHaveBeenCalledWith(
        'user-123',
        expect.objectContaining({
          type: 'payment_failure',
          enrollmentId,
          action: 'retry'
        })
      );

      // Step 2: First retry attempt (fails)
      const firstRetryResult = await paymentFailureService.retryFailedPayment(enrollmentId);

      expect(firstRetryResult.success).toBe(false);
      expect(firstRetryResult.canRetry).toBe(true);

      // Step 3: Second retry attempt (succeeds)
      const secondRetryResult = await paymentFailureService.retryFailedPayment(enrollmentId);

      expect(secondRetryResult.success).toBe(true);
      expect(secondRetryResult.action).toBe('retry');

      // Verify enrollment approved after successful retry
      expect(enrollmentStateManager.approveEnrollment).toHaveBeenCalledWith(
        enrollmentId,
        'system_retry'
      );

      // Verify real-time success update
      expect(realTimeSync.syncEnrollmentStatus).toHaveBeenCalledWith(
        enrollmentId,
        'approved'
      );
    });

    it('should fallback to manual approval after max retry attempts', async () => {
      // Requirement 7.4: Add fallback to manual approval for persistent payment failures
      
      const paymentError = new IkhokhaError('Payment declined', 'PAYMENT_DECLINED');
      const enrollmentId = 'enrollment-456';

      // Mock all retry attempts to fail
      vi.spyOn(paymentFailureService as any, 'attemptPaymentRetry').mockResolvedValue({
        success: false,
        status: PaymentStatus.FAILED,
        message: 'Payment declined'
      });

      // Mock failure context with max retries
      vi.spyOn(paymentFailureService as any, 'getFailureContext').mockResolvedValue({
        enrollmentId,
        courseId: 'course-456',
        userId: 'user-123',
        paymentData: mockPaymentData,
        originalError: paymentError,
        retryAttempts: [
          { attemptNumber: 1, timestamp: new Date(), error: { code: 'RETRY_1', message: 'Retry 1' }, canRetry: true },
          { attemptNumber: 2, timestamp: new Date(), error: { code: 'RETRY_2', message: 'Retry 2' }, canRetry: true },
          { attemptNumber: 3, timestamp: new Date(), error: { code: 'RETRY_3', message: 'Retry 3' }, canRetry: true }
        ],
        failureReason: 'Payment declined',
        requiresManualApproval: false
      });

      // Step 1: Handle initial failure
      const initialResult = await paymentFailureService.handlePaymentFailure(
        paymentError,
        mockPaymentData,
        enrollmentId,
        { maxRetryAttempts: 3, enableManualFallback: true }
      );

      // Step 2: Exhaust all retry attempts
      for (let i = 0; i < 3; i++) {
        await paymentFailureService.retryFailedPayment(enrollmentId, {
          maxRetryAttempts: 3,
          enableManualFallback: true
        });
      }

      // Step 3: Final retry should trigger manual approval fallback
      const finalResult = await paymentFailureService.retryFailedPayment(enrollmentId, {
        maxRetryAttempts: 3,
        enableManualFallback: true
      });

      expect(finalResult.action).toBe('manual_approval');
      expect(finalResult.adminNotified).toBe(true);

      // Verify enrollment marked for manual approval
      expect(enrollmentStateManager.markForManualApproval).toHaveBeenCalledWith(
        enrollmentId,
        'payment_failure_fallback',
        expect.any(Object)
      );

      // Verify admin notification
      expect(realTimeSync.broadcastToAdmins).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'manual_approval_required',
          enrollmentId,
          reason: 'payment_failure_fallback'
        })
      );
    });

    it('should preserve enrollment status during failure recovery', async () => {
      // Requirement 7.2: Enrollment status remains pending until successful payment
      
      const validationError = new PaymentValidationError('Invalid card number');
      const enrollmentId = 'enrollment-789';

      const result = await paymentFailureService.handlePaymentFailure(
        validationError,
        mockPaymentData,
        enrollmentId,
        { preserveEnrollmentOnFailure: true }
      );

      // Validation errors should not be retryable, so should go to manual approval
      expect(result.action).toBe('manual_approval');
      
      // Verify enrollment is preserved and marked for manual approval
      expect(enrollmentStateManager.markForManualApproval).toHaveBeenCalledWith(
        enrollmentId,
        'payment_failure_fallback',
        expect.any(Object)
      );

      // Enrollment should not be rejected
      expect(enrollmentStateManager.rejectEnrollment).not.toHaveBeenCalled();
    });
  });

  describe('React Hook Integration', () => {
    it('should manage UI state correctly through failure and recovery', async () => {
      const onRecoveryComplete = vi.fn();
      const onManualApprovalRequired = vi.fn();

      const { result } = renderHook(() => 
        usePaymentFailureRecovery({
          maxRetryAttempts: 2,
          onRecoveryComplete,
          onManualApprovalRequired
        })
      );

      // Mock service responses
      vi.spyOn(paymentFailureService, 'handlePaymentFailure').mockResolvedValue({
        success: false,
        action: 'retry',
        message: 'Payment failed, will retry',
        canRetry: true,
        requiresUserAction: false,
        adminNotified: false,
        nextRetryAt: new Date(Date.now() + 5000)
      });

      vi.spyOn(paymentFailureService, 'generateUserFriendlyErrorMessage').mockReturnValue({
        title: 'Payment Failed',
        message: 'Your payment could not be processed. Please try again.',
        actionText: 'Retry Payment',
        actionType: 'retry',
        showRetryButton: true,
        showChangeMethodButton: false,
        showContactSupport: false
      });

      const [initialState, actions] = result.current;

      // Initial state should be clean
      expect(initialState.hasFailure).toBe(false);
      expect(initialState.isRecovering).toBe(false);

      // Handle payment failure
      await act(async () => {
        await actions.handlePaymentFailure(
          new IkhokhaError('Payment declined', 'PAYMENT_DECLINED'),
          mockPaymentData,
          'enrollment-123'
        );
      });

      const [failureState] = result.current;

      // State should reflect failure
      expect(failureState.hasFailure).toBe(true);
      expect(failureState.canRetry).toBe(true);
      expect(failureState.errorMessage?.title).toBe('Payment Failed');
      expect(failureState.nextRetryAt).toBeInstanceOf(Date);

      // Mock successful retry
      vi.spyOn(paymentFailureService, 'retryFailedPayment').mockResolvedValue({
        success: true,
        action: 'retry',
        message: 'Payment completed successfully',
        canRetry: false,
        requiresUserAction: false,
        adminNotified: false
      });

      // Retry payment
      await act(async () => {
        await actions.retryPayment('enrollment-123');
      });

      const [successState] = result.current;

      // State should reflect success
      expect(successState.hasFailure).toBe(false);
      expect(successState.isRecovering).toBe(false);
      expect(successState.errorMessage).toBeNull();

      // Callbacks should be called
      expect(onRecoveryComplete).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
  });

  describe('UI Component Integration', () => {
    it('should render payment failure recovery component with correct states', async () => {
      const onRetrySuccess = vi.fn();
      const onContactSupport = vi.fn();

      // Mock the hook to return failure state
      const mockHookReturn: [any, any] = [
        {
          hasFailure: true,
          isRecovering: false,
          canRetry: true,
          retryAttempts: 1,
          errorMessage: {
            title: 'Payment Declined',
            message: 'Your card was declined. Please try a different payment method.',
            actionText: 'Try Again',
            actionType: 'change_method',
            showRetryButton: true,
            showChangeMethodButton: true,
            showContactSupport: false,
            additionalInfo: '(Attempt 2)'
          },
          recoveryResult: {
            success: false,
            action: 'retry',
            message: 'Payment declined',
            canRetry: true,
            requiresUserAction: false,
            adminNotified: false
          },
          nextRetryAt: null,
          isRetryScheduled: false
        },
        {
          handlePaymentFailure: vi.fn(),
          retryPayment: vi.fn(),
          clearFailure: vi.fn(),
          generateErrorMessage: vi.fn()
        }
      ];

      vi.mocked(usePaymentFailureRecovery).mockReturnValue(mockHookReturn);

      render(
        <PaymentFailureRecovery
          enrollmentId="enrollment-123"
          courseTitle="Advanced React Development"
          paymentAmount={299.99}
          currency="ZAR"
          onRetrySuccess={onRetrySuccess}
          onContactSupport={onContactSupport}
        />
      );

      // Verify error message is displayed
      expect(screen.getByTestId('alert-title')).toHaveTextContent('Payment Issue');
      expect(screen.getByTestId('alert-description')).toHaveTextContent('Your card was declined');

      // Verify retry button is present
      const retryButton = screen.getByText('Try Again');
      expect(retryButton).toBeInTheDocument();

      // Verify retry attempts progress
      expect(screen.getByTestId('progress')).toHaveAttribute('data-value', '33.333333333333336'); // 1/3 * 100

      // Test retry button click
      fireEvent.click(retryButton);
      expect(mockHookReturn[1].retryPayment).toHaveBeenCalledWith('enrollment-123');
    });

    it('should show manual approval state correctly', () => {
      const mockHookReturn: [any, any] = [
        {
          hasFailure: true,
          isRecovering: false,
          canRetry: false,
          retryAttempts: 3,
          errorMessage: {
            title: 'Payment Processing',
            message: 'Your payment is being reviewed by our team.',
            actionText: 'OK',
            actionType: 'wait',
            showRetryButton: false,
            showChangeMethodButton: false,
            showContactSupport: true
          },
          recoveryResult: {
            success: true,
            action: 'manual_approval',
            message: 'Submitted for manual review',
            canRetry: false,
            requiresUserAction: false,
            adminNotified: true,
            userInstructions: 'An administrator will review your enrollment and contact you within 24 hours.'
          },
          nextRetryAt: null,
          isRetryScheduled: false
        },
        {
          handlePaymentFailure: vi.fn(),
          retryPayment: vi.fn(),
          clearFailure: vi.fn(),
          generateErrorMessage: vi.fn()
        }
      ];

      vi.mocked(usePaymentFailureRecovery).mockReturnValue(mockHookReturn);

      render(
        <PaymentFailureRecovery
          enrollmentId="enrollment-123"
          courseTitle="Advanced React Development"
          paymentAmount={299.99}
          currency="ZAR"
        />
      );

      // Verify manual approval notice
      expect(screen.getByText('Submitted for Review')).toBeInTheDocument();
      expect(screen.getByText(/administrator will process your request within 24 hours/)).toBeInTheDocument();

      // Verify status badge shows pending review
      expect(screen.getByTestId('badge')).toHaveTextContent('Pending Review');

      // Verify no retry button is shown
      expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
    });
  });

  describe('Error Classification and Handling', () => {
    it('should classify different error types correctly', async () => {
      const testCases = [
        {
          error: new NetworkError('Connection timeout'),
          expectedAction: 'retry',
          expectedRetryable: true,
          description: 'Network errors should be retryable'
        },
        {
          error: new PaymentValidationError('Invalid card number'),
          expectedAction: 'manual_approval',
          expectedRetryable: false,
          description: 'Validation errors should not be retryable'
        },
        {
          error: new IkhokhaError('Payment declined', 'PAYMENT_DECLINED'),
          expectedAction: 'retry',
          expectedRetryable: true,
          description: 'Payment declined should be retryable'
        },
        {
          error: new IkhokhaError('Authentication failed', 'AUTHENTICATION_ERROR'),
          expectedAction: 'manual_approval',
          expectedRetryable: false,
          description: 'Authentication errors should require manual approval'
        }
      ];

      for (const testCase of testCases) {
        const result = await paymentFailureService.handlePaymentFailure(
          testCase.error,
          mockPaymentData,
          `enrollment-${Date.now()}`,
          { enableManualFallback: true }
        );

        expect(result.action).toBe(testCase.expectedAction);
        expect(result.canRetry).toBe(testCase.expectedRetryable);
      }
    });
  });

  describe('Real-time Updates Integration', () => {
    it('should broadcast updates to all relevant parties', async () => {
      const enrollmentId = 'enrollment-realtime-test';
      const error = new NetworkError('Connection failed');

      await paymentFailureService.handlePaymentFailure(
        error,
        mockPaymentData,
        enrollmentId
      );

      // Verify user notification
      expect(realTimeSync.broadcastToUser).toHaveBeenCalledWith(
        'user-123',
        expect.objectContaining({
          type: 'payment_failure',
          enrollmentId,
          courseId: 'course-456'
        })
      );

      // Test manual approval scenario
      const criticalError = new IkhokhaError('Critical system error', 'SYSTEM_ERROR');
      
      await paymentFailureService.handlePaymentFailure(
        criticalError,
        mockPaymentData,
        enrollmentId,
        { enableManualFallback: true }
      );

      // Should notify admins for manual approval
      expect(realTimeSync.broadcastToAdmins).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'manual_approval_required',
          enrollmentId
        })
      );
    });
  });
});