import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { 
  CardPaymentMonitoringService,
  ProcessingStage,
  ProcessingContext,
  ProcessingPerformance,
  ProcessingError,
  ErrorType,
  ErrorSeverity,
  BusinessMetrics,
  AlertType,
  AlertSeverity
} from '../CardPaymentMonitoringService';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      select: vi.fn(() => ({
        gte: vi.fn(() => ({
          data: [],
          error: null
        })),
        order: vi.fn(() => ({
          limit: vi.fn().mockResolvedValue({ data: [], error: null })
        }))
      }))
    }))
  }
}));

describe('CardPaymentMonitoringService', () => {
  let monitoringService: CardPaymentMonitoringService;
  let mockContext: ProcessingContext;

  beforeEach(() => {
    vi.clearAllMocks();
    monitoringService = CardPaymentMonitoringService.getInstance();
    
    mockContext = {
      webhookId: 'webhook_123',
      enrollmentId: 'enrollment_456',
      userId: 'user_789',
      courseId: 'course_101',
      paymentReference: 'payment_ref_123',
      processingStage: ProcessingStage.WEBHOOK_VALIDATION,
      attemptNumber: 1,
      startTime: new Date()
    };
  });

  afterEach(() => {
    monitoringService.destroy();
  });

  describe('logCardPaymentStep', () => {
    it('should log card payment step with all details', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockFrom = vi.fn(() => ({ insert: mockInsert }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      await monitoringService.logCardPaymentStep(
        ProcessingStage.PAYMENT_DETECTION,
        mockContext,
        'Payment type detected as card',
        { paymentType: 'card', confidence: 0.95 },
        150
      );

      expect(mockFrom).toHaveBeenCalledWith('card_payment_logs');
      expect(mockInsert).toHaveBeenCalledWith({
        stage: ProcessingStage.PAYMENT_DETECTION,
        webhook_id: mockContext.webhookId,
        enrollment_id: mockContext.enrollmentId,
        user_id: mockContext.userId,
        course_id: mockContext.courseId,
        payment_reference: mockContext.paymentReference,
        processing_stage: mockContext.processingStage,
        attempt_number: mockContext.attemptNumber,
        message: 'Payment type detected as card',
        metadata: { paymentType: 'card', confidence: 0.95 },
        duration: 150,
        created_at: expect.any(String)
      });
    });

    it('should handle database errors gracefully', async () => {
      const mockInsert = vi.fn().mockRejectedValue(new Error('Database error'));
      const mockFrom = vi.fn(() => ({ insert: mockInsert }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(
        monitoringService.logCardPaymentStep(
          ProcessingStage.WEBHOOK_VALIDATION,
          mockContext,
          'Test message'
        )
      ).resolves.not.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith('Failed to store card payment log:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('trackProcessingPerformance', () => {
    it('should track performance metrics correctly', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockFrom = vi.fn(() => ({ insert: mockInsert }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const performance: ProcessingPerformance = {
        webhookProcessingTime: 100,
        paymentDetectionTime: 50,
        approvalProcessingTime: 200,
        uiUpdateTime: 75,
        persistenceTime: 25,
        totalEndToEndTime: 450
      };

      await monitoringService.trackProcessingPerformance(performance, mockContext);

      expect(mockFrom).toHaveBeenCalledWith('card_payment_performance');
      expect(mockInsert).toHaveBeenCalledWith({
        webhook_id: mockContext.webhookId,
        enrollment_id: mockContext.enrollmentId,
        webhook_processing_time: 100,
        payment_detection_time: 50,
        approval_processing_time: 200,
        ui_update_time: 75,
        persistence_time: 25,
        total_end_to_end_time: 450,
        created_at: expect.any(String)
      });
    });

    it('should trigger performance degradation alert for slow processing', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockFrom = vi.fn(() => ({ insert: mockInsert }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const slowPerformance: ProcessingPerformance = {
        webhookProcessingTime: 1000,
        paymentDetectionTime: 500,
        approvalProcessingTime: 2000,
        uiUpdateTime: 750,
        persistenceTime: 250,
        totalEndToEndTime: 6000 // Exceeds 5 second threshold
      };

      await monitoringService.trackProcessingPerformance(slowPerformance, mockContext);

      // Should have called insert for both performance and alert tables
      expect(mockFrom).toHaveBeenCalledWith('card_payment_performance');
      expect(mockFrom).toHaveBeenCalledWith('card_payment_alerts');
    });
  });

  describe('trackBusinessMetrics', () => {
    it('should track business metrics correctly', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockFrom = vi.fn(() => ({ insert: mockInsert }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const metrics: BusinessMetrics = {
        cardPaymentVolume: 10,
        approvalSuccessRate: 0.98,
        averageApprovalTime: 1500,
        immediateAccessRate: 0.96,
        revenueImpact: 2500.00,
        userSatisfactionScore: 4.5
      };

      await monitoringService.trackBusinessMetrics(metrics, mockContext);

      expect(mockFrom).toHaveBeenCalledWith('card_payment_business_metrics');
      expect(mockInsert).toHaveBeenCalledWith({
        card_payment_volume: 10,
        approval_success_rate: 0.98,
        average_approval_time: 1500,
        immediate_access_rate: 0.96,
        revenue_impact: 2500.00,
        user_satisfaction_score: 4.5,
        created_at: expect.any(String)
      });
    });

    it('should trigger alert for low success rate', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockFrom = vi.fn(() => ({ insert: mockInsert }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const lowSuccessMetrics: BusinessMetrics = {
        cardPaymentVolume: 10,
        approvalSuccessRate: 0.90, // Below 95% threshold
        averageApprovalTime: 1500,
        immediateAccessRate: 0.96,
        revenueImpact: 2500.00
      };

      await monitoringService.trackBusinessMetrics(lowSuccessMetrics, mockContext);

      // Should have called insert for both business metrics and alert tables
      expect(mockFrom).toHaveBeenCalledWith('card_payment_business_metrics');
      expect(mockFrom).toHaveBeenCalledWith('card_payment_alerts');
    });
  });

  describe('trackProcessingError', () => {
    it('should track processing errors with full context', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockFrom = vi.fn(() => ({ insert: mockInsert }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const error: ProcessingError = {
        id: 'error_123',
        type: ErrorType.VALIDATION_ERROR,
        message: 'Invalid webhook signature',
        stack: 'Error stack trace...',
        context: mockContext,
        timestamp: new Date(),
        severity: ErrorSeverity.HIGH,
        recoverable: false
      };

      await monitoringService.trackProcessingError(error, mockContext);

      expect(mockFrom).toHaveBeenCalledWith('card_payment_errors');
      expect(mockInsert).toHaveBeenCalledWith({
        error_id: 'error_123',
        error_type: ErrorType.VALIDATION_ERROR,
        message: 'Invalid webhook signature',
        stack: 'Error stack trace...',
        webhook_id: mockContext.webhookId,
        enrollment_id: mockContext.enrollmentId,
        user_id: mockContext.userId,
        course_id: mockContext.courseId,
        processing_stage: mockContext.processingStage,
        severity: ErrorSeverity.HIGH,
        recoverable: false,
        created_at: expect.any(String)
      });
    });

    it('should trigger alert for critical errors', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockFrom = vi.fn(() => ({ insert: mockInsert }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const criticalError: ProcessingError = {
        id: 'error_critical',
        type: ErrorType.DATABASE_ERROR,
        message: 'Database connection failed',
        context: mockContext,
        timestamp: new Date(),
        severity: ErrorSeverity.CRITICAL,
        recoverable: false
      };

      await monitoringService.trackProcessingError(criticalError, mockContext);

      // Should have called insert for both error and alert tables
      expect(mockFrom).toHaveBeenCalledWith('card_payment_errors');
      expect(mockFrom).toHaveBeenCalledWith('card_payment_alerts');
    });
  });

  describe('triggerAlert', () => {
    it('should trigger and store alerts correctly', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockFrom = vi.fn(() => ({ insert: mockInsert }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const alert = {
        type: AlertType.PROCESSING_FAILURE,
        severity: AlertSeverity.HIGH,
        message: 'Card payment processing failed',
        context: mockContext,
        timestamp: new Date(),
        requiresImmediate: true
      };

      await monitoringService.triggerAlert(alert);

      expect(mockFrom).toHaveBeenCalledWith('card_payment_alerts');
      expect(mockInsert).toHaveBeenCalledWith({
        alert_type: AlertType.PROCESSING_FAILURE,
        severity: AlertSeverity.HIGH,
        message: 'Card payment processing failed',
        webhook_id: mockContext.webhookId,
        enrollment_id: mockContext.enrollmentId,
        user_id: mockContext.userId,
        course_id: mockContext.courseId,
        requires_immediate: true,
        created_at: expect.any(String)
      });
    });

    it('should send immediate notification for critical alerts', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockFrom = vi.fn(() => ({ insert: mockInsert }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const criticalAlert = {
        type: AlertType.PROCESSING_FAILURE,
        severity: AlertSeverity.CRITICAL,
        message: 'Critical system failure',
        context: mockContext,
        timestamp: new Date(),
        requiresImmediate: true
      };

      await monitoringService.triggerAlert(criticalAlert);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🚨 IMMEDIATE ALERT'),
        expect.any(Object)
      );
      expect(consoleSpy).toHaveBeenCalledWith('CRITICAL ALERT - Immediate intervention required');

      consoleSpy.mockRestore();
    });
  });

  describe('getCardPaymentMetrics', () => {
    it('should retrieve and calculate metrics correctly', async () => {
      const mockLogs = [
        { processing_stage: ProcessingStage.WEBHOOK_VALIDATION, message: 'webhook processed' },
        { processing_stage: ProcessingStage.APPROVAL_PROCESSING, message: 'approved' },
        { processing_stage: ProcessingStage.UI_NOTIFICATION, message: 'success' },
        { message: 'immediate access granted' }
      ];

      const mockPerformance = [
        { total_end_to_end_time: 1000 },
        { total_end_to_end_time: 1500 }
      ];

      const mockSelect = vi.fn(() => ({
        gte: vi.fn().mockResolvedValue({ data: mockLogs, error: null })
      }));
      const mockFrom = vi.fn(() => ({ select: mockSelect }));
      (supabase.from as Mock).mockImplementation((table) => {
        if (table === 'card_payment_logs') {
          return { select: () => ({ gte: () => ({ data: mockLogs, error: null }) }) };
        }
        if (table === 'card_payment_performance') {
          return { select: () => ({ gte: () => ({ data: mockPerformance, error: null }) }) };
        }
        return { select: mockSelect };
      });

      const metrics = await monitoringService.getCardPaymentMetrics();

      expect(metrics).toEqual({
        totalCardPayments: 1,
        successfulApprovals: 1,
        failedApprovals: 0,
        averageProcessingTime: 1250,
        immediateAccessGranted: 1,
        uiUpdateSuccessRate: 1
      });
    });

    it('should handle database errors gracefully', async () => {
      const mockSelect = vi.fn(() => ({
        gte: vi.fn().mockRejectedValue(new Error('Database error'))
      }));
      const mockFrom = vi.fn(() => ({ select: mockSelect }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const metrics = await monitoringService.getCardPaymentMetrics();

      expect(metrics).toEqual({
        totalCardPayments: 0,
        successfulApprovals: 0,
        failedApprovals: 0,
        averageProcessingTime: 0,
        immediateAccessGranted: 0,
        uiUpdateSuccessRate: 0
      });

      expect(consoleSpy).toHaveBeenCalledWith('Failed to get card payment metrics:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('getProcessingPerformanceStats', () => {
    it('should calculate performance statistics correctly', async () => {
      const mockPerformance = [
        {
          webhook_processing_time: 100,
          payment_detection_time: 50,
          approval_processing_time: 200,
          ui_update_time: 75,
          persistence_time: 25,
          total_end_to_end_time: 450
        },
        {
          webhook_processing_time: 120,
          payment_detection_time: 60,
          approval_processing_time: 180,
          ui_update_time: 85,
          persistence_time: 35,
          total_end_to_end_time: 480
        }
      ];

      const mockSelect = vi.fn(() => ({
        gte: vi.fn().mockResolvedValue({ data: mockPerformance, error: null })
      }));
      const mockFrom = vi.fn(() => ({ select: mockSelect }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const stats = await monitoringService.getProcessingPerformanceStats();

      expect(stats).toEqual({
        averageWebhookTime: 110,
        averageDetectionTime: 55,
        averageApprovalTime: 190,
        averageUIUpdateTime: 80,
        averagePersistenceTime: 30,
        averageTotalTime: 465
      });
    });

    it('should return zero stats when no data available', async () => {
      const mockSelect = vi.fn(() => ({
        gte: vi.fn().mockResolvedValue({ data: [], error: null })
      }));
      const mockFrom = vi.fn(() => ({ select: mockSelect }));
      (supabase.from as Mock).mockImplementation(mockFrom);

      const stats = await monitoringService.getProcessingPerformanceStats();

      expect(stats).toEqual({
        averageWebhookTime: 0,
        averageDetectionTime: 0,
        averageApprovalTime: 0,
        averageUIUpdateTime: 0,
        averagePersistenceTime: 0,
        averageTotalTime: 0
      });
    });
  });

  describe('singleton pattern', () => {
    it('should return the same instance', () => {
      const instance1 = CardPaymentMonitoringService.getInstance();
      const instance2 = CardPaymentMonitoringService.getInstance();
      
      expect(instance1).toBe(instance2);
    });
  });
});