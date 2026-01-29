import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import {
  createMonitoringTimer,
  createProcessingStageTimers,
  logProcessingStageStart,
  logProcessingStageComplete,
  logProcessingError,
  createProcessingContext,
  trackProcessingPerformance,
  trackBusinessMetrics,
  monitorWebhookProcessing,
  monitorProcessingStage,
  withMonitoring,
  checkMonitoringHealth
} from '../cardPaymentMonitoringIntegration';
import {
  ProcessingStage,
  ErrorType,
  ErrorSeverity
} from '@/services/CardPaymentMonitoringService';

// Mock the monitoring service
vi.mock('@/services/CardPaymentMonitoringService', () => ({
  cardPaymentMonitoring: {
    logCardPaymentStep: vi.fn().mockResolvedValue(undefined),
    trackProcessingPerformance: vi.fn().mockResolvedValue(undefined),
    trackBusinessMetrics: vi.fn().mockResolvedValue(undefined),
    trackProcessingError: vi.fn().mockResolvedValue(undefined),
    getCardPaymentMetrics: vi.fn().mockResolvedValue({
      totalCardPayments: 10,
      successfulApprovals: 9,
      failedApprovals: 1,
      averageProcessingTime: 1500,
      immediateAccessGranted: 9,
      uiUpdateSuccessRate: 0.9
    }),
    getProcessingPerformanceStats: vi.fn().mockResolvedValue({
      averageWebhookTime: 100,
      averageDetectionTime: 50,
      averageApprovalTime: 200,
      averageUIUpdateTime: 75,
      averagePersistenceTime: 25,
      averageTotalTime: 450
    })
  },
  ProcessingStage: {
    WEBHOOK_VALIDATION: 'webhook_validation',
    PAYMENT_DETECTION: 'payment_detection',
    APPROVAL_PROCESSING: 'approval_processing',
    UI_NOTIFICATION: 'ui_notification',
    PERSISTENCE: 'persistence'
  },
  ErrorType: {
    NETWORK_ERROR: 'network_error',
    DATABASE_ERROR: 'database_error',
    VALIDATION_ERROR: 'validation_error',
    BUSINESS_LOGIC_ERROR: 'business_logic_error',
    TIMEOUT_ERROR: 'timeout_error',
    AUTHENTICATION_ERROR: 'authentication_error'
  },
  ErrorSeverity: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    INFO: 'info'
  }
}));

describe('cardPaymentMonitoringIntegration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock performance.now() for consistent timing
    vi.spyOn(performance, 'now')
      .mockReturnValueOnce(1000) // start time
      .mockReturnValueOnce(1150); // end time
  });

  describe('createMonitoringTimer', () => {
    it('should create a timer that measures duration correctly', () => {
      const timer = createMonitoringTimer();
      
      timer.start();
      const duration = timer.end();
      
      expect(duration).toBe(150); // 1150 - 1000
    });

    it('should throw error if end is called before start', () => {
      const timer = createMonitoringTimer();
      
      expect(() => timer.end()).toThrow('Timer not started');
    });

    it('should return current duration without ending timer', () => {
      const timer = createMonitoringTimer();
      
      timer.start();
      const currentDuration = timer.getDuration();
      
      expect(currentDuration).toBe(150);
    });

    it('should return 0 duration if timer not started', () => {
      const timer = createMonitoringTimer();
      
      const duration = timer.getDuration();
      
      expect(duration).toBe(0);
    });
  });

  describe('createProcessingStageTimers', () => {
    it('should create timers for all processing stages', () => {
      const timers = createProcessingStageTimers();
      
      expect(timers).toHaveProperty('webhookValidation');
      expect(timers).toHaveProperty('paymentDetection');
      expect(timers).toHaveProperty('approvalProcessing');
      expect(timers).toHaveProperty('uiUpdate');
      expect(timers).toHaveProperty('persistence');
      expect(timers).toHaveProperty('total');
      
      // Each timer should have the expected methods
      Object.values(timers).forEach(timer => {
        expect(timer).toHaveProperty('start');
        expect(timer).toHaveProperty('end');
        expect(timer).toHaveProperty('getDuration');
      });
    });
  });

  describe('logProcessingStageStart', () => {
    it('should log stage start with correct parameters', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );

      await logProcessingStageStart(
        ProcessingStage.PAYMENT_DETECTION,
        context,
        { paymentType: 'card' }
      );

      expect(cardPaymentMonitoring.logCardPaymentStep).toHaveBeenCalledWith(
        ProcessingStage.PAYMENT_DETECTION,
        context,
        'Started payment_detection processing',
        {
          stage_start: true,
          paymentType: 'card'
        }
      );
    });
  });

  describe('logProcessingStageComplete', () => {
    it('should log successful stage completion', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );

      await logProcessingStageComplete(
        ProcessingStage.APPROVAL_PROCESSING,
        context,
        250,
        true,
        { approvalType: 'automatic' }
      );

      expect(cardPaymentMonitoring.logCardPaymentStep).toHaveBeenCalledWith(
        ProcessingStage.APPROVAL_PROCESSING,
        context,
        'Completed approval_processing processing successfully',
        {
          stage_complete: true,
          success: true,
          approvalType: 'automatic'
        },
        250
      );
    });

    it('should log failed stage completion', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );

      await logProcessingStageComplete(
        ProcessingStage.UI_NOTIFICATION,
        context,
        100,
        false,
        { error: 'UI update failed' }
      );

      expect(cardPaymentMonitoring.logCardPaymentStep).toHaveBeenCalledWith(
        ProcessingStage.UI_NOTIFICATION,
        context,
        'Completed ui_notification processing with errors',
        {
          stage_complete: true,
          success: false,
          error: 'UI update failed'
        },
        100
      );
    });
  });

  describe('logProcessingError', () => {
    it('should log processing error with correct details', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );
      const error = new Error('Test error message');
      error.stack = 'Error stack trace...';

      await logProcessingError(
        context,
        error,
        ErrorType.VALIDATION_ERROR,
        ErrorSeverity.HIGH,
        false
      );

      expect(cardPaymentMonitoring.trackProcessingError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: ErrorType.VALIDATION_ERROR,
          message: 'Test error message',
          stack: 'Error stack trace...',
          context,
          severity: ErrorSeverity.HIGH,
          recoverable: false
        }),
        context
      );
    });
  });

  describe('createProcessingContext', () => {
    it('should create processing context with correct structure', () => {
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123',
        ProcessingStage.PAYMENT_DETECTION,
        2
      );

      expect(context).toEqual({
        webhookId: 'webhook_123',
        enrollmentId: 'enrollment_456',
        userId: 'user_789',
        courseId: 'course_101',
        paymentReference: 'payment_ref_123',
        processingStage: ProcessingStage.PAYMENT_DETECTION,
        attemptNumber: 2,
        startTime: expect.any(Date)
      });
    });

    it('should use default values for optional parameters', () => {
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );

      expect(context.processingStage).toBe(ProcessingStage.WEBHOOK_VALIDATION);
      expect(context.attemptNumber).toBe(1);
    });
  });

  describe('trackProcessingPerformance', () => {
    it('should track performance with timer data', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const timers = createProcessingStageTimers();
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );

      // Mock timer durations
      vi.spyOn(timers.webhookValidation, 'getDuration').mockReturnValue(100);
      vi.spyOn(timers.paymentDetection, 'getDuration').mockReturnValue(50);
      vi.spyOn(timers.approvalProcessing, 'getDuration').mockReturnValue(200);
      vi.spyOn(timers.uiUpdate, 'getDuration').mockReturnValue(75);
      vi.spyOn(timers.persistence, 'getDuration').mockReturnValue(25);
      vi.spyOn(timers.total, 'getDuration').mockReturnValue(450);

      await trackProcessingPerformance(timers, context);

      expect(cardPaymentMonitoring.trackProcessingPerformance).toHaveBeenCalledWith(
        {
          webhookProcessingTime: 100,
          paymentDetectionTime: 50,
          approvalProcessingTime: 200,
          uiUpdateTime: 75,
          persistenceTime: 25,
          totalEndToEndTime: 450
        },
        context
      );
    });
  });

  describe('trackBusinessMetrics', () => {
    it('should track business metrics correctly', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );

      await trackBusinessMetrics(context, 299.99, true, true, 1500);

      expect(cardPaymentMonitoring.trackBusinessMetrics).toHaveBeenCalledWith(
        {
          cardPaymentVolume: 1,
          approvalSuccessRate: 1.0,
          averageApprovalTime: 1500,
          immediateAccessRate: 1.0,
          revenueImpact: 299.99
        },
        context
      );
    });

    it('should track failed payment metrics', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );

      await trackBusinessMetrics(context, 299.99, false, false, 2000);

      expect(cardPaymentMonitoring.trackBusinessMetrics).toHaveBeenCalledWith(
        {
          cardPaymentVolume: 1,
          approvalSuccessRate: 0.0,
          averageApprovalTime: 2000,
          immediateAccessRate: 0.0,
          revenueImpact: 0
        },
        context
      );
    });
  });

  describe('monitorWebhookProcessing', () => {
    it('should monitor complete webhook processing successfully', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const mockProcessingFunction = vi.fn().mockResolvedValue('success');

      const result = await monitorWebhookProcessing(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123',
        mockProcessingFunction
      );

      expect(result).toBe('success');
      expect(mockProcessingFunction).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object)
      );
      expect(cardPaymentMonitoring.logCardPaymentStep).toHaveBeenCalledTimes(2); // start and complete
      expect(cardPaymentMonitoring.trackProcessingPerformance).toHaveBeenCalled();
    });

    it('should handle processing errors and still track performance', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const mockProcessingFunction = vi.fn().mockRejectedValue(new Error('Processing failed'));

      await expect(
        monitorWebhookProcessing(
          'webhook_123',
          'enrollment_456',
          'user_789',
          'course_101',
          'payment_ref_123',
          mockProcessingFunction
        )
      ).rejects.toThrow('Processing failed');

      expect(cardPaymentMonitoring.trackProcessingError).toHaveBeenCalled();
    });
  });

  describe('monitorProcessingStage', () => {
    it('should monitor individual processing stage successfully', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );
      const timer = createMonitoringTimer();
      const mockFunction = vi.fn().mockResolvedValue('stage result');

      const result = await monitorProcessingStage(
        ProcessingStage.PAYMENT_DETECTION,
        context,
        timer,
        mockFunction,
        { additionalData: 'test' }
      );

      expect(result).toBe('stage result');
      expect(cardPaymentMonitoring.logCardPaymentStep).toHaveBeenCalledTimes(2); // start and complete
    });

    it('should handle stage errors correctly', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );
      const timer = createMonitoringTimer();
      const mockFunction = vi.fn().mockRejectedValue(new Error('Stage failed'));

      await expect(
        monitorProcessingStage(
          ProcessingStage.APPROVAL_PROCESSING,
          context,
          timer,
          mockFunction
        )
      ).rejects.toThrow('Stage failed');

      expect(cardPaymentMonitoring.trackProcessingError).toHaveBeenCalled();
      expect(cardPaymentMonitoring.logCardPaymentStep).toHaveBeenCalledWith(
        ProcessingStage.APPROVAL_PROCESSING,
        expect.objectContaining({ processingStage: ProcessingStage.APPROVAL_PROCESSING }),
        expect.stringContaining('with errors'),
        expect.objectContaining({ success: false }),
        expect.any(Number)
      );
    });
  });

  describe('withMonitoring', () => {
    it('should create a monitored version of a function', async () => {
      const originalFunction = vi.fn().mockResolvedValue('original result');
      const monitoredFunction = withMonitoring(ProcessingStage.UI_NOTIFICATION, originalFunction);
      
      const context = createProcessingContext(
        'webhook_123',
        'enrollment_456',
        'user_789',
        'course_101',
        'payment_ref_123'
      );
      const timer = createMonitoringTimer();

      const result = await monitoredFunction(context, timer, 'arg1', 'arg2');

      expect(result).toBe('original result');
      expect(originalFunction).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('checkMonitoringHealth', () => {
    it('should return healthy status when all metrics are good', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      // Reset mocks to return good metrics
      (cardPaymentMonitoring.getCardPaymentMetrics as Mock).mockResolvedValue({
        totalCardPayments: 10,
        successfulApprovals: 10,
        failedApprovals: 0,
        averageProcessingTime: 1500,
        immediateAccessGranted: 10,
        uiUpdateSuccessRate: 1.0
      });
      (cardPaymentMonitoring.getProcessingPerformanceStats as Mock).mockResolvedValue({
        averageWebhookTime: 100,
        averageDetectionTime: 50,
        averageApprovalTime: 200,
        averageUIUpdateTime: 75,
        averagePersistenceTime: 25,
        averageTotalTime: 450
      });

      const health = await checkMonitoringHealth();

      expect(health.healthy).toBe(true);
      expect(health.issues).toHaveLength(0);
      expect(health.metrics).toBeDefined();
    });

    it('should detect performance issues', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      (cardPaymentMonitoring.getProcessingPerformanceStats as Mock).mockResolvedValue({
        averageWebhookTime: 1000,
        averageDetectionTime: 500,
        averageApprovalTime: 2000,
        averageUIUpdateTime: 750,
        averagePersistenceTime: 250,
        averageTotalTime: 6000 // Exceeds 5 second threshold
      });

      const health = await checkMonitoringHealth();

      expect(health.healthy).toBe(false);
      expect(health.issues).toContain('Average processing time exceeds 5 seconds');
    });

    it('should detect high error rates', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      (cardPaymentMonitoring.getCardPaymentMetrics as Mock).mockResolvedValue({
        totalCardPayments: 100,
        successfulApprovals: 90,
        failedApprovals: 10, // 10% error rate
        averageProcessingTime: 1500,
        immediateAccessGranted: 90,
        uiUpdateSuccessRate: 0.9
      });

      const health = await checkMonitoringHealth();

      expect(health.healthy).toBe(false);
      expect(health.issues).toContain('High error rate: 10.0%');
    });

    it('should detect low immediate access rates', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      (cardPaymentMonitoring.getCardPaymentMetrics as Mock).mockResolvedValue({
        totalCardPayments: 100,
        successfulApprovals: 95,
        failedApprovals: 5,
        averageProcessingTime: 1500,
        immediateAccessGranted: 85, // 85% immediate access rate
        uiUpdateSuccessRate: 0.9
      });

      const health = await checkMonitoringHealth();

      expect(health.healthy).toBe(false);
      expect(health.issues).toContain('Low immediate access rate: 85.0%');
    });

    it('should handle monitoring system errors', async () => {
      const { cardPaymentMonitoring } = await import('@/services/CardPaymentMonitoringService');
      (cardPaymentMonitoring.getCardPaymentMetrics as Mock).mockRejectedValue(
        new Error('Monitoring system failure')
      );

      const health = await checkMonitoringHealth();

      expect(health.healthy).toBe(false);
      expect(health.issues).toContain('Monitoring system error: Monitoring system failure');
      expect(health.metrics).toBeNull();
    });
  });
});