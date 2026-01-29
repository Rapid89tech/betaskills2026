import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { monitoringService } from '../MonitoringService';
import { paymentLoggingService } from '../PaymentLoggingService';
import { performanceMonitoring } from '@/utils/performanceMonitoring';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      select: vi.fn(() => ({
        gte: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn().mockResolvedValue({ data: [], error: null })
          }))
        }))
      }))
    })),
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-id' } } })
    }
  }
}));

// Mock console methods
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
  debug: vi.spyOn(console, 'debug').mockImplementation(() => {})
};

describe('MonitoringService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock production environment
    vi.stubEnv('PROD', false);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  describe('Basic Logging', () => {
    it('should log info messages correctly', async () => {
      await monitoringService.log({
        level: 'info',
        category: 'system',
        message: 'Test info message',
        metadata: { test: 'data' }
      });

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[SYSTEM] Test info message',
        { test: 'data' }
      );
    });

    it('should log error messages correctly', async () => {
      await monitoringService.log({
        level: 'error',
        category: 'payment',
        message: 'Test error message',
        metadata: { error: 'details' }
      });

      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[PAYMENT] Test error message',
        { error: 'details' }
      );
    });

    it('should log warning messages correctly', async () => {
      await monitoringService.log({
        level: 'warn',
        category: 'enrollment',
        message: 'Test warning message'
      });

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        '[ENROLLMENT] Test warning message',
        undefined
      );
    });

    it('should log debug messages correctly', async () => {
      await monitoringService.log({
        level: 'debug',
        category: 'admin',
        message: 'Test debug message'
      });

      expect(consoleSpy.debug).toHaveBeenCalledWith(
        '[ADMIN] Test debug message',
        undefined
      );
    });
  });

  describe('Specialized Logging Methods', () => {
    it('should log payment events', async () => {
      await monitoringService.logPayment('Payment initiated', { paymentId: 'test-123' });

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PAYMENT] Payment initiated',
        expect.objectContaining({
          paymentId: 'test-123',
          sessionId: expect.any(String)
        })
      );
    });

    it('should log enrollment events', async () => {
      await monitoringService.logEnrollment('Enrollment created', { courseId: 'course-123' });

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[ENROLLMENT] Enrollment created',
        expect.objectContaining({
          courseId: 'course-123',
          sessionId: expect.any(String)
        })
      );
    });

    it('should log admin events', async () => {
      await monitoringService.logAdmin('User approved', { userId: 'user-123' }, 'warn');

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        '[ADMIN] User approved',
        expect.objectContaining({
          userId: 'user-123',
          sessionId: expect.any(String)
        })
      );
    });
  });

  describe('Performance Metrics', () => {
    it('should record performance metrics', async () => {
      await monitoringService.recordMetric({
        metricName: 'api_response_time',
        value: 150,
        unit: 'ms',
        category: 'api_response_time',
        metadata: { endpoint: '/api/test' }
      });

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PERFORMANCE] api_response_time: 150ms',
        expect.objectContaining({
          endpoint: '/api/test',
          sessionId: expect.any(String)
        })
      );
    });

    it('should track API calls', async () => {
      await monitoringService.trackApiCall('/api/payments', 'POST', 250, 200, { userId: 'test' });

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PERFORMANCE] api_post__api_payments: 250ms',
        expect.objectContaining({
          endpoint: '/api/payments',
          method: 'POST',
          status: 200,
          userId: 'test'
        })
      );
    });

    it('should warn about slow API calls', async () => {
      await monitoringService.trackApiCall('/api/slow', 'GET', 3000, 200);

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        '[PERFORMANCE] Slow API call detected: GET /api/slow',
        expect.objectContaining({
          duration: 3000,
          status: 200
        })
      );
    });

    it('should track page load performance', async () => {
      await monitoringService.trackPageLoad('dashboard', 1200, { userId: 'test' });

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PERFORMANCE] page_load_dashboard: 1200ms',
        expect.objectContaining({
          pageName: 'dashboard',
          userId: 'test'
        })
      );
    });

    it('should track payment processing performance', async () => {
      await monitoringService.trackPaymentProcessing('pay-123', 800, true, { gateway: 'ikhokha' });

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PERFORMANCE] payment_processing_time: 800ms',
        expect.objectContaining({
          paymentId: 'pay-123',
          success: true,
          gateway: 'ikhokha'
        })
      );

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PAYMENT] Payment processing completed for pay-123',
        expect.objectContaining({
          paymentId: 'pay-123',
          duration: 800,
          success: true
        })
      );
    });
  });

  describe('Error Reporting', () => {
    it('should report JavaScript errors', async () => {
      const testError = new Error('Test error message');
      testError.stack = 'Error: Test error message\n    at test.js:1:1';

      await monitoringService.reportError(testError, { context: 'test' });

      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[ERROR] Error: Test error message',
        expect.objectContaining({
          stackTrace: expect.stringContaining('Error: Test error message'),
          metadata: expect.objectContaining({
            context: 'test'
          })
        })
      );
    });

    it('should report custom error reports', async () => {
      await monitoringService.reportError({
        timestamp: new Date(),
        errorType: 'PaymentError',
        errorMessage: 'Payment failed',
        severity: 'high',
        category: 'payment',
        metadata: { paymentId: 'pay-123' }
      });

      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[ERROR] PaymentError: Payment failed',
        expect.objectContaining({
          stackTrace: undefined,
          metadata: expect.objectContaining({
            paymentId: 'pay-123'
          })
        })
      );
    });
  });

  describe('Session Management', () => {
    it('should generate unique session IDs', () => {
      const sessionId1 = monitoringService.getSessionId();
      const sessionId2 = new (monitoringService.constructor as any)().getSessionId();

      expect(sessionId1).toMatch(/^session_\d+_[a-z0-9]+$/);
      expect(sessionId2).toMatch(/^session_\d+_[a-z0-9]+$/);
      expect(sessionId1).not.toBe(sessionId2);
    });

    it('should maintain consistent session ID', () => {
      const sessionId1 = monitoringService.getSessionId();
      const sessionId2 = monitoringService.getSessionId();

      expect(sessionId1).toBe(sessionId2);
    });
  });

  describe('Production Mode', () => {
    it('should not log to console in production', async () => {
      vi.stubEnv('PROD', true);
      
      // Create new instance to pick up environment change
      const { MonitoringService } = await import('../MonitoringService');
      const prodMonitoringService = new MonitoringService();

      await prodMonitoringService.log({
        level: 'info',
        category: 'system',
        message: 'Production test message'
      });

      // Should not log to console in production
      expect(consoleSpy.log).not.toHaveBeenCalledWith(
        '[SYSTEM] Production test message',
        undefined
      );
    });
  });
});

describe('PaymentLoggingService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Payment Flow Logging', () => {
    it('should log payment initiation', async () => {
      const context = {
        paymentId: 'pay-123',
        userId: 'user-123',
        courseId: 'course-123',
        amount: 100,
        currency: 'ZAR'
      };

      await paymentLoggingService.logPaymentInitiated(context);

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PAYMENT] Payment initiated for course course-123',
        expect.objectContaining({
          ...context,
          stage: 'initiation'
        })
      );
    });

    it('should log payment processing start and return timer ID', async () => {
      const context = { paymentId: 'pay-123', amount: 100 };
      
      const timerId = await paymentLoggingService.logPaymentProcessingStart(context);

      expect(typeof timerId).toBe('string');
      expect(timerId).toMatch(/^payment_processing_\d+_[a-z0-9]+$/);
      
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PAYMENT] Payment processing started for pay-123',
        expect.objectContaining({
          ...context,
          stage: 'processing_start'
        })
      );
    });

    it('should log payment processing completion', async () => {
      const context = { paymentId: 'pay-123', amount: 100 };
      const timerId = 'test-timer-id';
      
      await paymentLoggingService.logPaymentProcessingComplete(
        context,
        timerId,
        true,
        'txn-123'
      );

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PAYMENT] Payment processing completed for pay-123',
        expect.objectContaining({
          ...context,
          stage: 'processing_complete',
          success: true,
          transactionId: 'txn-123'
        })
      );
    });

    it('should log payment verification', async () => {
      const context = { paymentId: 'pay-123' };
      
      await paymentLoggingService.logPaymentVerification(
        context,
        true,
        { verificationCode: 'verified' }
      );

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PAYMENT] Payment verification successful for pay-123',
        expect.objectContaining({
          ...context,
          stage: 'verification',
          verificationResult: true,
          verificationDetails: { verificationCode: 'verified' }
        })
      );
    });
  });

  describe('Webhook Logging', () => {
    it('should log webhook received', async () => {
      const context = { paymentId: 'pay-123', webhookId: 'hook-123' };
      const payload = { status: 'completed', amount: 100 };
      
      await paymentLoggingService.logWebhookReceived('payment_status', context, payload);

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PAYMENT] Webhook received: payment_status for payment pay-123',
        expect.objectContaining({
          ...context,
          stage: 'webhook_received',
          webhookType: 'payment_status',
          payloadSize: JSON.stringify(payload).length
        })
      );
    });

    it('should log webhook processing', async () => {
      const context = { paymentId: 'pay-123' };
      
      await paymentLoggingService.logWebhookProcessing(
        'payment_status',
        context,
        true,
        { enrollmentUpdated: true }
      );

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PAYMENT] Webhook processing completed: payment_status',
        expect.objectContaining({
          ...context,
          stage: 'webhook_processing',
          webhookType: 'payment_status',
          success: true,
          processingDetails: { enrollmentUpdated: true }
        })
      );
    });
  });

  describe('Error Logging', () => {
    it('should log payment errors', async () => {
      const context = { paymentId: 'pay-123' };
      const error = {
        code: 'PAYMENT_FAILED',
        message: 'Payment processing failed',
        details: { reason: 'insufficient_funds' },
        retryable: true
      };
      
      await paymentLoggingService.logPaymentError(context, error, 'processing');

      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[PAYMENT] Payment error at processing: PAYMENT_FAILED - Payment processing failed',
        expect.objectContaining({
          ...context,
          stage: 'processing_error',
          errorCode: 'PAYMENT_FAILED',
          errorMessage: 'Payment processing failed',
          retryable: true
        })
      );
    });

    it('should log payment timeouts', async () => {
      const context = { paymentId: 'pay-123' };
      
      await paymentLoggingService.logPaymentTimeout(context, 30000, 'processing');

      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[PAYMENT] Payment timeout at processing after 30000ms for pay-123',
        expect.objectContaining({
          ...context,
          stage: 'processing_timeout',
          timeoutDuration: 30000
        })
      );
    });

    it('should log payment retries', async () => {
      const context = { paymentId: 'pay-123' };
      
      await paymentLoggingService.logPaymentRetry(context, 2, 'network_error', 3);

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        '[PAYMENT] Payment retry attempt 2/3 for pay-123',
        expect.objectContaining({
          ...context,
          stage: 'retry_attempt',
          attemptNumber: 2,
          maxAttempts: 3,
          reason: 'network_error'
        })
      );
    });
  });

  describe('Enrollment Logging', () => {
    it('should log enrollment activation success', async () => {
      const context = { paymentId: 'pay-123', courseId: 'course-123' };
      
      await paymentLoggingService.logEnrollmentActivation(
        context,
        true,
        { enrollmentId: 'enroll-123' }
      );

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[ENROLLMENT] Enrollment activated for course course-123',
        expect.objectContaining({
          ...context,
          stage: 'enrollment_activation',
          success: true,
          activationDetails: { enrollmentId: 'enroll-123' }
        })
      );
    });

    it('should log enrollment activation failure', async () => {
      const context = { paymentId: 'pay-123', courseId: 'course-123' };
      
      await paymentLoggingService.logEnrollmentActivation(context, false);

      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[ENROLLMENT] Enrollment activation failed for course course-123',
        expect.objectContaining({
          ...context,
          stage: 'enrollment_activation',
          success: false
        })
      );
    });
  });
});

describe('PerformanceMonitoring', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Timer Management', () => {
    it('should start and end timers correctly', async () => {
      const timerId = performanceMonitoring.startTimer('test_operation', 'function_execution');
      
      expect(typeof timerId).toBe('string');
      expect(timerId).toMatch(/^test_operation_\d+_[a-z0-9]+$/);

      // Wait a bit to ensure measurable duration
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const duration = await performanceMonitoring.endTimer(timerId);
      
      expect(duration).toBeGreaterThan(0);
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PERFORMANCE] test_operation: expect.any(Number)ms',
        expect.objectContaining({
          sessionId: expect.any(String)
        })
      );
    });

    it('should handle invalid timer IDs gracefully', async () => {
      const duration = await performanceMonitoring.endTimer('invalid-timer-id');
      
      expect(duration).toBe(0);
      expect(consoleSpy.warn).toHaveBeenCalledWith('Timer invalid-timer-id not found');
    });
  });

  describe('Function Measurement', () => {
    it('should measure synchronous functions', async () => {
      const testFunction = () => {
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return sum;
      };

      const result = await performanceMonitoring.measureFunction(
        'sync_calculation',
        testFunction,
        'function_execution',
        { type: 'calculation' }
      );

      expect(result).toBe(499500); // Sum of 0 to 999
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PERFORMANCE] sync_calculation: expect.any(Number)ms',
        expect.objectContaining({
          type: 'calculation',
          success: true
        })
      );
    });

    it('should measure asynchronous functions', async () => {
      const asyncFunction = async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return 'async result';
      };

      const result = await performanceMonitoring.measureFunction(
        'async_operation',
        asyncFunction,
        'function_execution'
      );

      expect(result).toBe('async result');
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PERFORMANCE] async_operation: expect.any(Number)ms',
        expect.objectContaining({
          success: true
        })
      );
    });

    it('should handle function errors correctly', async () => {
      const errorFunction = () => {
        throw new Error('Test error');
      };

      await expect(
        performanceMonitoring.measureFunction('error_function', errorFunction)
      ).rejects.toThrow('Test error');

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PERFORMANCE] error_function: expect.any(Number)ms',
        expect.objectContaining({
          success: false,
          error: 'Test error'
        })
      );
    });
  });

  describe('API Call Measurement', () => {
    it('should measure successful API calls', async () => {
      const mockApiCall = async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return { data: 'success' };
      };

      const result = await performanceMonitoring.measureApiCall(
        '/api/test',
        'GET',
        mockApiCall,
        { userId: 'test' }
      );

      expect(result).toEqual({ data: 'success' });
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PERFORMANCE] api_get__api_test: expect.any(Number)ms',
        expect.objectContaining({
          endpoint: '/api/test',
          method: 'GET',
          status: 200,
          success: true,
          userId: 'test'
        })
      );
    });

    it('should measure failed API calls', async () => {
      const mockApiCall = async () => {
        const error = new Error('API Error') as any;
        error.status = 500;
        throw error;
      };

      await expect(
        performanceMonitoring.measureApiCall('/api/error', 'POST', mockApiCall)
      ).rejects.toThrow('API Error');

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[PERFORMANCE] api_post__api_error: expect.any(Number)ms',
        expect.objectContaining({
          endpoint: '/api/error',
          method: 'POST',
          status: 500,
          success: false
        })
      );
    });
  });
});