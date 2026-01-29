/**
 * PaymentEnrollmentIntegration Service Tests
 * 
 * Tests the integration between payment detection and enrollment system
 * including automatic status assignment and real-time monitoring.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { PaymentEnrollmentIntegration } from '../PaymentEnrollmentIntegration';
import { PaymentType, PaymentStatus, EnrollmentStatus } from '@/types/ikhokha';
import type { IkhokhaWebhook } from '@/types/ikhokha';

// Mock dependencies
vi.mock('../PaymentTypeDetector', () => ({
  paymentTypeDetector: {
    detectPaymentType: vi.fn()
  }
}));

vi.mock('../PaymentMethodRouter', () => ({
  paymentMethodRouter: {
    routePayment: vi.fn()
  }
}));

vi.mock('../RealTimePaymentSync', () => ({
  realTimePaymentSync: {
    initialize: vi.fn(),
    syncPaymentStatus: vi.fn(),
    syncEnrollmentStatus: vi.fn(),
    broadcastToUser: vi.fn(),
    broadcastToAdmins: vi.fn(),
    subscribeToStatusUpdates: vi.fn()
  }
}));

vi.mock('../UnifiedEnrollmentManager', () => ({
  unifiedEnrollmentManager: {
    initialize: vi.fn(),
    updateEnrollmentStatus: vi.fn(),
    getUserEnrollmentForCourse: vi.fn()
  }
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

describe('PaymentEnrollmentIntegration', () => {
  let service: PaymentEnrollmentIntegration;
  let mockWebhookData: IkhokhaWebhook;
  let mockEnrollmentData: any;

  beforeEach(async () => {
    // Clear all mocks
    vi.clearAllMocks();

    // Get fresh service instance
    service = PaymentEnrollmentIntegration.getInstance();

    // Mock successful initialization
    const { realTimePaymentSync } = await import('../RealTimePaymentSync');
    const { unifiedEnrollmentManager } = await import('../UnifiedEnrollmentManager');
    
    vi.mocked(realTimePaymentSync.initialize).mockResolvedValue(undefined);
    vi.mocked(unifiedEnrollmentManager.initialize).mockResolvedValue(undefined);

    // Setup test data
    mockWebhookData = {
      transaction_id: 'txn_123',
      reference: 'PAY_123',
      amount: 299.99,
      currency: 'ZAR',
      status: 'completed',
      timestamp: new Date().toISOString(),
      signature: 'test_signature',
      response_code: '00',
      response_message: 'Transaction approved',
      card_type: 'VISA',
      masked_card_number: '****1234'
    };

    mockEnrollmentData = {
      enrollmentId: 'enr_123',
      userId: 'user_123',
      courseId: 'course_123',
      userEmail: 'test@example.com',
      courseName: 'Test Course',
      amount: 299.99,
      currency: 'ZAR'
    };
  });

  afterEach(() => {
    service.cleanup();
  });

  describe('Initialization', () => {
    it('should initialize successfully', async () => {
      await service.initialize();

      const { realTimePaymentSync } = await import('../RealTimePaymentSync');
      const { unifiedEnrollmentManager } = await import('../UnifiedEnrollmentManager');

      expect(realTimePaymentSync.initialize).toHaveBeenCalled();
      expect(unifiedEnrollmentManager.initialize).toHaveBeenCalled();
    });

    it('should not initialize twice', async () => {
      await service.initialize();
      await service.initialize(); // Second call

      const { realTimePaymentSync } = await import('../RealTimePaymentSync');
      
      expect(realTimePaymentSync.initialize).toHaveBeenCalledTimes(1);
    });

    it('should handle initialization errors', async () => {
      const { realTimePaymentSync } = await import('../RealTimePaymentSync');
      vi.mocked(realTimePaymentSync.initialize).mockRejectedValue(new Error('Init failed'));

      await expect(service.initialize()).rejects.toThrow('Init failed');
    });
  });

  describe('Payment Webhook Processing', () => {
    beforeEach(async () => {
      await service.initialize();
    });

    it('should process card payment webhook successfully', async () => {
      // Mock payment type detection
      const { paymentTypeDetector } = await import('../PaymentTypeDetector');
      vi.mocked(paymentTypeDetector.detectPaymentType).mockReturnValue({
        type: 'card',
        confidence: 0.9,
        indicators: [
          { field: 'card_type', value: 'VISA', weight: 0.4, description: 'Card type present' }
        ],
        metadata: { cardType: 'VISA', responseCode: '00' }
      });

      // Mock payment routing
      const { paymentMethodRouter } = await import('../PaymentMethodRouter');
      vi.mocked(paymentMethodRouter.routePayment).mockResolvedValue({
        success: true,
        enrollmentId: 'enr_123',
        approved: true,
        accessGranted: true,
        message: 'Payment successful - Course access granted immediately'
      });

      // Mock enrollment update
      const { unifiedEnrollmentManager } = await import('../UnifiedEnrollmentManager');
      vi.mocked(unifiedEnrollmentManager.updateEnrollmentStatus).mockResolvedValue({
        id: 'enr_123',
        status: 'approved'
      } as any);

      const result = await service.processPaymentWebhook(mockWebhookData, mockEnrollmentData);

      expect(result.success).toBe(true);
      expect(result.paymentType).toBe(PaymentType.CARD);
      expect(result.status).toBe(EnrollmentStatus.APPROVED);
      expect(result.accessGranted).toBe(true);
      expect(result.confidence).toBe(0.9);
      expect(paymentTypeDetector.detectPaymentType).toHaveBeenCalledWith(mockWebhookData);
      expect(unifiedEnrollmentManager.updateEnrollmentStatus).toHaveBeenCalledWith(
        'enr_123',
        'approved',
        'test@example.com'
      );
    });

    it('should process EFT payment webhook successfully', async () => {
      // Mock EFT payment detection
      const { paymentTypeDetector } = await import('../PaymentTypeDetector');
      vi.mocked(paymentTypeDetector.detectPaymentType).mockReturnValue({
        type: 'eft',
        confidence: 0.8,
        indicators: [
          { field: 'reference', value: 'EFT_123', weight: 0.3, description: 'EFT reference pattern' }
        ],
        metadata: { responseCode: '000' }
      });

      // Mock EFT routing (requires approval)
      const { paymentMethodRouter } = await import('../PaymentMethodRouter');
      vi.mocked(paymentMethodRouter.routePayment).mockResolvedValue({
        success: true,
        enrollmentId: 'enr_123',
        approved: false,
        accessGranted: false,
        message: 'Payment received - Awaiting admin approval for course access'
      });

      // Mock enrollment update
      const { unifiedEnrollmentManager } = await import('../UnifiedEnrollmentManager');
      vi.mocked(unifiedEnrollmentManager.updateEnrollmentStatus).mockResolvedValue({
        id: 'enr_123',
        status: 'pending'
      } as any);

      const result = await service.processPaymentWebhook(mockWebhookData, mockEnrollmentData);

      expect(result.success).toBe(true);
      expect(result.paymentType).toBe(PaymentType.EFT);
      expect(result.status).toBe(EnrollmentStatus.PENDING);
      expect(result.accessGranted).toBe(false);
      expect(result.confidence).toBe(0.8);
    });

    it('should handle failed payments', async () => {
      // Mock failed webhook
      const failedWebhook = {
        ...mockWebhookData,
        status: 'failed',
        response_message: 'Insufficient funds'
      };

      // Mock payment type detection
      const { paymentTypeDetector } = await import('../PaymentTypeDetector');
      vi.mocked(paymentTypeDetector.detectPaymentType).mockReturnValue({
        type: 'card',
        confidence: 0.9,
        indicators: [],
        metadata: { responseCode: '51' }
      });

      // Mock failed payment routing
      const { paymentMethodRouter } = await import('../PaymentMethodRouter');
      vi.mocked(paymentMethodRouter.routePayment).mockResolvedValue({
        success: true, // Successfully handled the failure
        enrollmentId: 'enr_123',
        approved: false,
        accessGranted: false,
        message: 'Insufficient funds - Please try again'
      });

      const result = await service.processPaymentWebhook(failedWebhook, mockEnrollmentData);

      expect(result.success).toBe(true);
      expect(result.status).toBe(EnrollmentStatus.PENDING);
      expect(result.accessGranted).toBe(false);
    });

    it('should handle processing errors gracefully', async () => {
      // Mock payment type detection error
      const { paymentTypeDetector } = await import('../PaymentTypeDetector');
      vi.mocked(paymentTypeDetector.detectPaymentType).mockImplementation(() => {
        throw new Error('Detection failed');
      });

      const result = await service.processPaymentWebhook(mockWebhookData, mockEnrollmentData);

      expect(result.success).toBe(false);
      expect(result.paymentType).toBe(PaymentType.MANUAL);
      expect(result.confidence).toBe(0);
      expect(result.status).toBe(EnrollmentStatus.PENDING);
      expect(result.error).toBe('Detection failed');
    });
  });

  describe('Enrollment Status Determination', () => {
    it('should approve card payments immediately', () => {
      const status = service.determineEnrollmentStatus(PaymentType.CARD, true);
      expect(status).toBe(EnrollmentStatus.APPROVED);
    });

    it('should require approval for EFT payments', () => {
      const status = service.determineEnrollmentStatus(PaymentType.EFT, true);
      expect(status).toBe(EnrollmentStatus.PENDING);
    });

    it('should require approval for manual payments', () => {
      const status = service.determineEnrollmentStatus(PaymentType.MANUAL, true);
      expect(status).toBe(EnrollmentStatus.PENDING);
    });

    it('should keep failed payments as pending', () => {
      const cardStatus = service.determineEnrollmentStatus(PaymentType.CARD, false);
      const eftStatus = service.determineEnrollmentStatus(PaymentType.EFT, false);
      
      expect(cardStatus).toBe(EnrollmentStatus.PENDING);
      expect(eftStatus).toBe(EnrollmentStatus.PENDING);
    });
  });

  describe('Immediate Access Determination', () => {
    it('should grant immediate access for successful card payments', () => {
      const access = service.shouldGrantImmediateAccess(PaymentType.CARD, true);
      expect(access).toBe(true);
    });

    it('should not grant immediate access for EFT payments', () => {
      const access = service.shouldGrantImmediateAccess(PaymentType.EFT, true);
      expect(access).toBe(false);
    });

    it('should not grant immediate access for failed payments', () => {
      const access = service.shouldGrantImmediateAccess(PaymentType.CARD, false);
      expect(access).toBe(false);
    });
  });

  describe('Real-time Payment Monitoring', () => {
    beforeEach(async () => {
      await service.initialize();
    });

    it('should monitor payment status changes', async () => {
      const mockCallback = vi.fn();
      
      // Mock subscription
      const { realTimePaymentSync } = await import('../RealTimePaymentSync');
      const mockUnsubscribe = vi.fn();
      vi.mocked(realTimePaymentSync.subscribeToStatusUpdates).mockReturnValue(mockUnsubscribe);

      const unsubscribe = await service.monitorPaymentStatus('enr_123', mockCallback);

      expect(realTimePaymentSync.subscribeToStatusUpdates).toHaveBeenCalled();
      expect(typeof unsubscribe).toBe('function');

      // Simulate status update
      const subscribeCallback = vi.mocked(realTimePaymentSync.subscribeToStatusUpdates).mock.calls[0][0];
      subscribeCallback({
        type: 'payment',
        target_user_id: 'user_123',
        enrollment_id: 'enr_123',
        course_id: 'course_123',
        new_status: PaymentStatus.COMPLETED,
        timestamp: new Date(),
        source: 'payment_webhook'
      });

      expect(mockCallback).toHaveBeenCalledWith(PaymentStatus.COMPLETED, EnrollmentStatus.PENDING);
    });

    it('should handle monitoring errors gracefully', async () => {
      const { realTimePaymentSync } = await import('../RealTimePaymentSync');
      vi.mocked(realTimePaymentSync.subscribeToStatusUpdates).mockImplementation(() => {
        throw new Error('Subscription failed');
      });

      const mockCallback = vi.fn();
      const unsubscribe = await service.monitorPaymentStatus('enr_123', mockCallback);

      expect(typeof unsubscribe).toBe('function');
      expect(mockCallback).not.toHaveBeenCalled();
    });
  });

  describe('Payment Classification', () => {
    beforeEach(async () => {
      await service.initialize();
    });

    it('should classify approved enrollment as card payment', async () => {
      const { unifiedEnrollmentManager } = await import('../UnifiedEnrollmentManager');
      vi.mocked(unifiedEnrollmentManager.getUserEnrollmentForCourse).mockResolvedValue({
        id: 'enr_123',
        status: 'approved'
      } as any);

      const result = await service.classifyEnrollmentPayment('enr_123');

      expect(result.paymentType).toBe(PaymentType.CARD);
      expect(result.confidence).toBe(0.8);
      expect(result.requiresApproval).toBe(false);
    });

    it('should classify pending enrollment as EFT payment', async () => {
      const { unifiedEnrollmentManager } = await import('../UnifiedEnrollmentManager');
      vi.mocked(unifiedEnrollmentManager.getUserEnrollmentForCourse).mockResolvedValue({
        id: 'enr_123',
        status: 'pending'
      } as any);

      const result = await service.classifyEnrollmentPayment('enr_123');

      expect(result.paymentType).toBe(PaymentType.EFT);
      expect(result.confidence).toBe(0.7);
      expect(result.requiresApproval).toBe(true);
    });

    it('should handle classification errors', async () => {
      const { unifiedEnrollmentManager } = await import('../UnifiedEnrollmentManager');
      vi.mocked(unifiedEnrollmentManager.getUserEnrollmentForCourse).mockResolvedValue(null);

      const result = await service.classifyEnrollmentPayment('enr_123');

      expect(result.paymentType).toBe(PaymentType.MANUAL);
      expect(result.confidence).toBe(0);
      expect(result.requiresApproval).toBe(true);
    });
  });

  describe('Real-time Updates Sync', () => {
    beforeEach(async () => {
      await service.initialize();
    });

    it('should sync updates for card payments', async () => {
      // Mock successful card payment processing
      const { paymentTypeDetector } = await import('../PaymentTypeDetector');
      vi.mocked(paymentTypeDetector.detectPaymentType).mockReturnValue({
        type: 'card',
        confidence: 0.9,
        indicators: [],
        metadata: { responseCode: '00' }
      });

      const { paymentMethodRouter } = await import('../PaymentMethodRouter');
      vi.mocked(paymentMethodRouter.routePayment).mockResolvedValue({
        success: true,
        enrollmentId: 'enr_123',
        approved: true,
        accessGranted: true,
        message: 'Approved'
      });

      const { unifiedEnrollmentManager } = await import('../UnifiedEnrollmentManager');
      vi.mocked(unifiedEnrollmentManager.updateEnrollmentStatus).mockResolvedValue({} as any);

      await service.processPaymentWebhook(mockWebhookData, mockEnrollmentData);

      const { realTimePaymentSync } = await import('../RealTimePaymentSync');
      
      expect(realTimePaymentSync.syncPaymentStatus).toHaveBeenCalledWith(
        'enr_123',
        PaymentStatus.COMPLETED
      );
      expect(realTimePaymentSync.syncEnrollmentStatus).toHaveBeenCalledWith(
        'enr_123',
        EnrollmentStatus.APPROVED
      );
      expect(realTimePaymentSync.broadcastToUser).toHaveBeenCalledWith(
        'user_123',
        expect.objectContaining({
          type: 'payment_completed',
          data: expect.objectContaining({
            enrollmentId: 'enr_123',
            paymentType: 'card',
            accessGranted: true
          })
        })
      );
    });

    it('should notify admins for EFT payments', async () => {
      // Mock EFT payment processing
      const { paymentTypeDetector } = await import('../PaymentTypeDetector');
      vi.mocked(paymentTypeDetector.detectPaymentType).mockReturnValue({
        type: 'eft',
        confidence: 0.8,
        indicators: [],
        metadata: { responseCode: '000' }
      });

      const { paymentMethodRouter } = await import('../PaymentMethodRouter');
      vi.mocked(paymentMethodRouter.routePayment).mockResolvedValue({
        success: true,
        enrollmentId: 'enr_123',
        approved: false,
        accessGranted: false,
        message: 'Awaiting approval'
      });

      const { unifiedEnrollmentManager } = await import('../UnifiedEnrollmentManager');
      vi.mocked(unifiedEnrollmentManager.updateEnrollmentStatus).mockResolvedValue({} as any);

      await service.processPaymentWebhook(mockWebhookData, mockEnrollmentData);

      const { realTimePaymentSync } = await import('../RealTimePaymentSync');
      
      expect(realTimePaymentSync.broadcastToAdmins).toHaveBeenCalledWith({
        type: 'new_eft_enrollment',
        enrollmentId: 'enr_123',
        userEmail: 'test@example.com',
        courseName: 'Test Course',
        timestamp: expect.any(Date)
      });
    });
  });

  describe('Health Status', () => {
    it('should return health status', () => {
      const health = service.getHealthStatus();

      expect(health).toEqual({
        initialized: expect.any(Boolean),
        paymentDetectorAvailable: true,
        routerAvailable: true,
        realTimeSyncAvailable: true,
        enrollmentManagerAvailable: true
      });
    });
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = PaymentEnrollmentIntegration.getInstance();
      const instance2 = PaymentEnrollmentIntegration.getInstance();

      expect(instance1).toBe(instance2);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources', () => {
      service.cleanup();
      
      const health = service.getHealthStatus();
      expect(health.initialized).toBe(false);
    });
  });
});