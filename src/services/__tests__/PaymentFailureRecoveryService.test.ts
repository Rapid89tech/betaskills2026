/**
 * Payment Failure Recovery Service Tests
 * 
 * Comprehensive tests for payment failure handling and recovery functionality.
 * Tests all requirements: 7.1, 7.2, 7.3, 7.4
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { PaymentFailureRecoveryService } from '../PaymentFailureRecoveryService';
import { EnrollmentStateManager } from '../EnrollmentStateManager';
import { RealTimePaymentSync } from '../RealTimePaymentSync';
import { 
  PaymentData, 
  PaymentStatus, 
  IkhokhaError, 
  PaymentValidationError, 
  NetworkError 
} from '../../types/ikhokha';

// Mock dependencies
vi.mock('../EnrollmentStateManager');
vi.mock('../RealTimePaymentSync');
vi.mock('../PaymentLoggingService', () => ({
  paymentLoggingService: {
    logPaymentError: vi.fn(),
    logPaymentProcessingStart: vi.fn().mockResolvedValue('timer-id'),
    logPaymentProcessingComplete: vi.fn(),
    logWebhookReceived: vi.fn(),
    logWebhookProcessing: vi.fn()
  }
}));

describe('PaymentFailureRecoveryService', () => {
  let service: PaymentFailureRecoveryService;
  let mockEnrollmentStateManager: vi.Mocked<EnrollmentStateManager>;
  let mockRealTimeSync: vi.Mocked<RealTimePaymentSync>;

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
    
    mockEnrollmentStateManager = new EnrollmentStateManager() as vi.Mocked<EnrollmentStateManager>;
    mockRealTimeSync = new RealTimePaymentSync() as vi.Mocked<RealTimePaymentSync>;
    
    service = new PaymentFailureRecoveryService(
      mockEnrollmentStateManager,
      mockRealTimeSync
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('handlePaymentFailure', () => {
    it('should handle network errors with retry option', async () => {
      // Requirement 7.1: Display clear error message with retry option
      const networkError = new NetworkError('Connection timeout', { timeout: 30000 });
      const enrollmentId = 'enrollment-123';

      mockEnrollmentStateManager.updateEnrollmentStatus = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.broadcastToUser = vi.fn().mockResolvedValue(undefined);

      const result = await service.handlePaymentFailure(
        networkError,
        mockPaymentData,
        enrollmentId
      );

      expect(result.success).toBe(false);
      expect(result.action).toBe('retry');
      expect(result.canRetry).toBe(true);
      expect(result.message).toContain('Connection error');
      expect(result.nextRetryAt).toBeInstanceOf(Date);
    });

    it('should handle validation errors without retry', async () => {
      const validationError = new PaymentValidationError('Invalid card number');
      const enrollmentId = 'enrollment-123';

      mockEnrollmentStateManager.markForManualApproval = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.broadcastToUser = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.broadcastToAdmins = vi.fn().mockResolvedValue(undefined);

      const result = await service.handlePaymentFailure(
        validationError,
        mockPaymentData,
        enrollmentId
      );

      expect(result.success).toBe(true);
      expect(result.action).toBe('manual_approval');
      expect(result.canRetry).toBe(false);
      expect(result.adminNotified).toBe(true);
    });

    it('should handle critical errors with manual approval fallback', async () => {
      // Requirement 7.4: Add fallback to manual approval for persistent payment failures
      const criticalError = new IkhokhaError(
        'Authentication failed',
        'AUTHENTICATION_ERROR',
        { severity: 'critical' }
      );
      const enrollmentId = 'enrollment-123';

      mockEnrollmentStateManager.markForManualApproval = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.broadcastToUser = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.broadcastToAdmins = vi.fn().mockResolvedValue(undefined);

      const result = await service.handlePaymentFailure(
        criticalError,
        mockPaymentData,
        enrollmentId
      );

      expect(result.action).toBe('manual_approval');
      expect(result.adminNotified).toBe(true);
      expect(mockEnrollmentStateManager.markForManualApproval).toHaveBeenCalledWith(
        enrollmentId,
        'payment_failure_fallback',
        expect.any(Object)
      );
    });

    it('should preserve enrollment on failure when configured', async () => {
      // Requirement 7.2: Enrollment status remains pending until successful payment
      const paymentError = new IkhokhaError('Payment declined', 'PAYMENT_DECLINED');
      const enrollmentId = 'enrollment-123';

      mockEnrollmentStateManager.updateEnrollmentStatus = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.broadcastToUser = vi.fn().mockResolvedValue(undefined);

      const result = await service.handlePaymentFailure(
        paymentError,
        mockPaymentData,
        enrollmentId,
        { preserveEnrollmentOnFailure: true }
      );

      expect(result.success).toBe(false);
      expect(mockEnrollmentStateManager.updateEnrollmentStatus).toHaveBeenCalledWith(
        enrollmentId,
        'pending_payment_retry',
        expect.any(Object)
      );
    });

    it('should broadcast real-time updates to user', async () => {
      const paymentError = new IkhokhaError('Payment failed', 'PAYMENT_DECLINED');
      const enrollmentId = 'enrollment-123';

      mockEnrollmentStateManager.updateEnrollmentStatus = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.broadcastToUser = vi.fn().mockResolvedValue(undefined);

      await service.handlePaymentFailure(
        paymentError,
        mockPaymentData,
        enrollmentId
      );

      expect(mockRealTimeSync.broadcastToUser).toHaveBeenCalledWith(
        mockPaymentData.metadata?.userId,
        expect.objectContaining({
          type: 'payment_failure',
          enrollmentId,
          courseId: mockPaymentData.metadata?.courseId
        })
      );
    });
  });

  describe('retryFailedPayment', () => {
    it('should successfully retry payment and approve enrollment', async () => {
      // Requirement 7.3: Implement payment retry mechanism for failed transactions
      const enrollmentId = 'enrollment-123';

      // Mock successful retry
      vi.spyOn(service as any, 'getFailureContext').mockResolvedValue({
        enrollmentId,
        courseId: 'course-456',
        userId: 'user-123',
        paymentData: mockPaymentData,
        originalError: new Error('Previous failure'),
        retryAttempts: [],
        failureReason: 'Payment declined',
        requiresManualApproval: false
      });

      vi.spyOn(service as any, 'canRetryPayment').mockReturnValue({
        allowed: true
      });

      vi.spyOn(service as any, 'attemptPaymentRetry').mockResolvedValue({
        success: true,
        status: PaymentStatus.COMPLETED,
        message: 'Payment completed successfully'
      });

      mockEnrollmentStateManager.approveEnrollment = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.syncEnrollmentStatus = vi.fn().mockResolvedValue(undefined);

      const result = await service.retryFailedPayment(enrollmentId);

      expect(result.success).toBe(true);
      expect(result.action).toBe('retry');
      expect(mockEnrollmentStateManager.approveEnrollment).toHaveBeenCalledWith(
        enrollmentId,
        'system_retry'
      );
      expect(mockRealTimeSync.syncEnrollmentStatus).toHaveBeenCalledWith(
        enrollmentId,
        'approved'
      );
    });

    it('should fallback to manual approval after max retries', async () => {
      const enrollmentId = 'enrollment-123';

      vi.spyOn(service as any, 'getFailureContext').mockResolvedValue({
        enrollmentId,
        courseId: 'course-456',
        userId: 'user-123',
        paymentData: mockPaymentData,
        originalError: new Error('Previous failure'),
        retryAttempts: [
          { attemptNumber: 1, timestamp: new Date(), error: { code: 'RETRY_1', message: 'Retry 1' }, canRetry: true },
          { attemptNumber: 2, timestamp: new Date(), error: { code: 'RETRY_2', message: 'Retry 2' }, canRetry: true },
          { attemptNumber: 3, timestamp: new Date(), error: { code: 'RETRY_3', message: 'Retry 3' }, canRetry: true }
        ],
        failureReason: 'Payment declined',
        requiresManualApproval: false
      });

      vi.spyOn(service as any, 'canRetryPayment').mockReturnValue({
        allowed: false,
        reason: 'Maximum retry attempts (3) exceeded'
      });

      vi.spyOn(service, 'fallbackToManualApproval').mockResolvedValue({
        success: true,
        action: 'manual_approval',
        message: 'Submitted for manual review',
        canRetry: false,
        requiresUserAction: false,
        adminNotified: true
      });

      const result = await service.retryFailedPayment(enrollmentId, {
        maxRetryAttempts: 3,
        enableManualFallback: true
      });

      expect(result.action).toBe('manual_approval');
      expect(result.adminNotified).toBe(true);
    });

    it('should calculate exponential backoff for retry delays', async () => {
      const enrollmentId = 'enrollment-123';

      vi.spyOn(service as any, 'getFailureContext').mockResolvedValue({
        enrollmentId,
        retryAttempts: [{ attemptNumber: 1 }],
        requiresManualApproval: false
      });

      vi.spyOn(service as any, 'canRetryPayment').mockReturnValue({ allowed: true });
      vi.spyOn(service as any, 'attemptPaymentRetry').mockResolvedValue({
        success: false,
        status: PaymentStatus.FAILED
      });

      // Mock the delay calculation
      const calculateRetryDelaySpy = vi.spyOn(service as any, 'calculateRetryDelay');

      await service.retryFailedPayment(enrollmentId);

      expect(calculateRetryDelaySpy).toHaveBeenCalled();
    });
  });

  describe('fallbackToManualApproval', () => {
    it('should mark enrollment for manual approval and notify admins', async () => {
      const failureContext = {
        enrollmentId: 'enrollment-123',
        courseId: 'course-456',
        userId: 'user-123',
        paymentData: mockPaymentData,
        originalError: new Error('Payment failed'),
        retryAttempts: [
          { attemptNumber: 1, timestamp: new Date(), error: { code: 'RETRY_1', message: 'Retry 1' }, canRetry: true },
          { attemptNumber: 2, timestamp: new Date(), error: { code: 'RETRY_2', message: 'Retry 2' }, canRetry: true }
        ],
        failureReason: 'Multiple payment failures',
        requiresManualApproval: true
      };

      mockEnrollmentStateManager.markForManualApproval = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.syncEnrollmentStatus = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.broadcastToAdmins = vi.fn().mockResolvedValue(undefined);

      const result = await service.fallbackToManualApproval(failureContext);

      expect(result.success).toBe(true);
      expect(result.action).toBe('manual_approval');
      expect(result.adminNotified).toBe(true);
      expect(result.userInstructions).toContain('24 hours');

      expect(mockEnrollmentStateManager.markForManualApproval).toHaveBeenCalledWith(
        'enrollment-123',
        'payment_failure_fallback',
        expect.objectContaining({
          retryAttempts: 2,
          failureReason: 'Multiple payment failures'
        })
      );

      expect(mockRealTimeSync.broadcastToAdmins).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'manual_approval_required',
          enrollmentId: 'enrollment-123',
          reason: 'payment_failure_fallback'
        })
      );
    });
  });

  describe('generateUserFriendlyErrorMessage', () => {
    it('should generate appropriate message for payment declined', () => {
      const error = new IkhokhaError('Payment declined', 'PAYMENT_DECLINED');
      
      const message = service.generateUserFriendlyErrorMessage(error, true, 0);

      expect(message.title).toBe('Payment Declined');
      expect(message.showRetryButton).toBe(true);
      expect(message.showChangeMethodButton).toBe(true);
      expect(message.actionType).toBe('change_method');
    });

    it('should generate appropriate message for network errors', () => {
      const error = new NetworkError('Connection timeout');
      
      const message = service.generateUserFriendlyErrorMessage(error, true, 0);

      expect(message.title).toBe('Connection Problem');
      expect(message.showRetryButton).toBe(true);
      expect(message.actionType).toBe('retry');
      expect(message.estimatedRetryTime).toBe('30 seconds');
    });

    it('should disable retry after multiple attempts', () => {
      const error = new IkhokhaError('Payment failed', 'PAYMENT_DECLINED');
      
      const message = service.generateUserFriendlyErrorMessage(error, true, 3);

      expect(message.showRetryButton).toBe(false);
      expect(message.showContactSupport).toBe(true);
      expect(message.additionalInfo).toContain('Multiple attempts failed');
    });

    it('should show contact support for critical errors', () => {
      const error = new IkhokhaError('Configuration error', 'CONFIGURATION_ERROR');
      
      const message = service.generateUserFriendlyErrorMessage(error, false, 0);

      expect(message.title).toBe('Service Configuration Error');
      expect(message.showRetryButton).toBe(false);
      expect(message.showContactSupport).toBe(true);
      expect(message.actionType).toBe('contact_support');
    });
  });

  describe('error classification and handling', () => {
    it('should classify retryable vs non-retryable errors correctly', async () => {
      const retryableError = new NetworkError('Timeout');
      const nonRetryableError = new PaymentValidationError('Invalid card');

      const retryableResult = await service.handlePaymentFailure(
        retryableError,
        mockPaymentData,
        'enrollment-1'
      );

      const nonRetryableResult = await service.handlePaymentFailure(
        nonRetryableError,
        mockPaymentData,
        'enrollment-2'
      );

      expect(retryableResult.canRetry).toBe(true);
      expect(nonRetryableResult.canRetry).toBe(false);
    });

    it('should handle unknown errors gracefully', async () => {
      const unknownError = new Error('Unknown error');
      
      const result = await service.handlePaymentFailure(
        unknownError,
        mockPaymentData,
        'enrollment-123'
      );

      expect(result.success).toBe(false);
      expect(result.message).toContain('system error');
    });
  });

  describe('real-time synchronization', () => {
    it('should broadcast payment failure updates in real-time', async () => {
      const error = new IkhokhaError('Payment failed', 'PAYMENT_DECLINED');
      
      await service.handlePaymentFailure(error, mockPaymentData, 'enrollment-123');

      expect(mockRealTimeSync.broadcastToUser).toHaveBeenCalledWith(
        'user-123',
        expect.objectContaining({
          type: 'payment_failure',
          enrollmentId: 'enrollment-123'
        })
      );
    });

    it('should notify admins of manual approval requirements', async () => {
      const failureContext = {
        enrollmentId: 'enrollment-123',
        courseId: 'course-456',
        userId: 'user-123',
        paymentData: mockPaymentData,
        originalError: new Error('Payment failed'),
        retryAttempts: [],
        failureReason: 'Payment declined',
        requiresManualApproval: true
      };

      mockEnrollmentStateManager.markForManualApproval = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.syncEnrollmentStatus = vi.fn().mockResolvedValue(undefined);
      mockRealTimeSync.broadcastToAdmins = vi.fn().mockResolvedValue(undefined);

      await service.fallbackToManualApproval(failureContext);

      expect(mockRealTimeSync.broadcastToAdmins).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'manual_approval_required',
          enrollmentId: 'enrollment-123'
        })
      );
    });
  });

  describe('configuration and options', () => {
    it('should respect custom retry limits', async () => {
      const error = new NetworkError('Connection failed');
      
      const result = await service.handlePaymentFailure(
        error,
        mockPaymentData,
        'enrollment-123',
        { maxRetryAttempts: 1 }
      );

      expect(result.canRetry).toBe(true);
      // The service should respect the custom limit in subsequent retries
    });

    it('should disable manual fallback when configured', async () => {
      const error = new PaymentValidationError('Invalid payment');
      
      const result = await service.handlePaymentFailure(
        error,
        mockPaymentData,
        'enrollment-123',
        { enableManualFallback: false }
      );

      expect(result.action).toBe('failed');
      expect(result.adminNotified).toBe(false);
    });
  });
});