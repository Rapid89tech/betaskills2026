/**
 * Production Error Handling Service Tests
 * 
 * Tests for the ProductionErrorHandling service including error classification,
 * recovery strategies, and stakeholder notifications.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ProductionErrorHandling } from '../ProductionErrorHandling';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      select: vi.fn(() => ({
        gte: vi.fn(() => ({
          lte: vi.fn().mockResolvedValue({ data: [], error: null })
        })),
        eq: vi.fn().mockResolvedValue({ data: [], error: null })
      }))
    }))
  }
}));

describe('ProductionErrorHandling', () => {
  let errorHandling: ProductionErrorHandling;

  beforeEach(() => {
    errorHandling = ProductionErrorHandling.getInstance();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = ProductionErrorHandling.getInstance();
      const instance2 = ProductionErrorHandling.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Error Classification', () => {
    it('should classify payment errors correctly', async () => {
      const paymentError = new Error('Payment gateway timeout');
      
      const productionError = await errorHandling.handleError(paymentError, {
        component: 'PaymentProcessor',
        payment_reference: 'PAY_123'
      });

      expect(productionError.type).toBe('payment_processing_error');
      expect(productionError.severity).toBe('critical');
      expect(productionError.category).toBe('payment_system');
      expect(productionError.message).toBe('Payment gateway timeout');
      expect(productionError.context.payment_reference).toBe('PAY_123');
    });

    it('should classify webhook errors correctly', async () => {
      const webhookError = new Error('Invalid webhook signature');
      
      const productionError = await errorHandling.handleError(webhookError, {
        component: 'WebhookProcessor',
        action: 'validate_webhook'
      });

      expect(productionError.type).toBe('webhook_processing_error');
      expect(productionError.severity).toBe('medium');
      expect(productionError.category).toBe('integration');
    });

    it('should classify enrollment errors correctly', async () => {
      const enrollmentError = new Error('Failed to create enrollment');
      
      const productionError = await errorHandling.handleError(enrollmentError, {
        component: 'EnrollmentService',
        enrollment_id: 'ENR_456'
      });

      expect(productionError.type).toBe('enrollment_creation_error');
      expect(productionError.severity).toBe('medium');
      expect(productionError.category).toBe('enrollment_system');
    });

    it('should classify security errors correctly', async () => {
      const securityError = new Error('Potential SQL injection detected');
      
      const productionError = await errorHandling.handleError(securityError, {
        component: 'SecurityMiddleware'
      });

      expect(productionError.type).toBe('unknown_error');
      expect(productionError.severity).toBe('low');
    });

    it('should classify network errors correctly', async () => {
      const networkError = new Error('Network request failed');
      
      const productionError = await errorHandling.handleError(networkError, {
        component: 'ApiClient'
      });

      expect(productionError.type).toBe('network_error');
      expect(productionError.severity).toBe('low');
      expect(productionError.category).toBe('infrastructure');
    });

    it('should classify database errors correctly', async () => {
      const dbError = new Error('Database connection timeout');
      
      const productionError = await errorHandling.handleError(dbError, {
        component: 'DatabaseService'
      });

      expect(productionError.type).toBe('database_error');
      expect(productionError.severity).toBe('high');
      expect(productionError.category).toBe('infrastructure');
    });
  });

  describe('Error Context', () => {
    it('should capture comprehensive error context', async () => {
      const error = new Error('Test error');
      
      const productionError = await errorHandling.handleError(error, {
        component: 'TestComponent',
        action: 'test_action',
        user_id: 'user_123',
        session_id: 'session_456',
        payment_reference: 'PAY_789',
        enrollment_id: 'ENR_101',
        course_id: 'COURSE_202',
        metadata: {
          custom_field: 'custom_value',
          retry_count: 2
        }
      });

      expect(productionError.context.component).toBe('TestComponent');
      expect(productionError.context.action).toBe('test_action');
      expect(productionError.user_id).toBe('user_123');
      expect(productionError.session_id).toBe('session_456');
      expect(productionError.context.payment_reference).toBe('PAY_789');
      expect(productionError.context.enrollment_id).toBe('ENR_101');
      expect(productionError.context.course_id).toBe('COURSE_202');
      expect(productionError.context.metadata.custom_field).toBe('custom_value');
      expect(productionError.context.metadata.retry_count).toBe(2);
    });

    it('should handle missing context gracefully', async () => {
      const error = new Error('Test error');
      
      const productionError = await errorHandling.handleError(error);

      expect(productionError.context).toBeDefined();
      expect(productionError.context.metadata).toBeDefined();
      expect(productionError.source).toBe('Unknown');
    });
  });

  describe('Error Recovery', () => {
    it('should not attempt recovery for low severity errors', async () => {
      const lowSeverityError = new Error('Minor validation error');
      
      await errorHandling.handleError(lowSeverityError, {
        component: 'ValidationService'
      });

      const activeRecoveries = errorHandling.getActiveRecoveries();
      expect(activeRecoveries.size).toBe(0);
    });

    it('should attempt recovery for payment errors', async () => {
      const paymentError = new Error('Payment processing failed');
      
      const productionError = await errorHandling.handleError(paymentError, {
        component: 'PaymentProcessor',
        payment_reference: 'PAY_123'
      });

      // Wait a bit for recovery to start
      await new Promise(resolve => setTimeout(resolve, 100));

      const activeRecoveries = errorHandling.getActiveRecoveries();
      expect(activeRecoveries.size).toBeGreaterThan(0);

      const recovery = Array.from(activeRecoveries.values())[0];
      expect(recovery.error_id).toBe(productionError.id);
      expect(recovery.strategy_id).toBe('payment_retry');
    });

    it('should attempt recovery for webhook errors', async () => {
      const webhookError = new Error('Webhook processing failed');
      
      const productionError = await errorHandling.handleError(webhookError, {
        component: 'WebhookProcessor'
      });

      // Wait a bit for recovery to start
      await new Promise(resolve => setTimeout(resolve, 100));

      const activeRecoveries = errorHandling.getActiveRecoveries();
      expect(activeRecoveries.size).toBeGreaterThan(0);

      const recovery = Array.from(activeRecoveries.values())[0];
      expect(recovery.error_id).toBe(productionError.id);
      expect(recovery.strategy_id).toBe('webhook_retry');
    });
  });

  describe('Error Patterns', () => {
    it('should track error patterns', async () => {
      const error1 = new Error('Payment timeout');
      const error2 = new Error('Payment gateway error');
      
      await errorHandling.handleError(error1, {
        component: 'PaymentProcessor',
        payment_reference: 'PAY_1'
      });
      
      await errorHandling.handleError(error2, {
        component: 'PaymentProcessor',
        payment_reference: 'PAY_2'
      });

      const patterns = errorHandling.getErrorPatterns();
      expect(patterns.size).toBeGreaterThan(0);

      const paymentPattern = patterns.get('payment_processing_error_payment_system');
      expect(paymentPattern).toBeDefined();
      expect(paymentPattern?.frequency).toBe(2);
    });

    it('should generate suggested fixes for error patterns', async () => {
      const paymentError = new Error('Payment processing failed');
      
      await errorHandling.handleError(paymentError, {
        component: 'PaymentProcessor',
        payment_reference: 'PAY_123'
      });

      const patterns = errorHandling.getErrorPatterns();
      const paymentPattern = patterns.get('payment_processing_error_payment_system');
      
      expect(paymentPattern?.suggested_fixes).toContain('Verify payment gateway configuration');
      expect(paymentPattern?.suggested_fixes).toContain('Check network connectivity');
      expect(paymentPattern?.suggested_fixes).toContain('Validate payment data format');
    });
  });

  describe('Error Reporting', () => {
    it('should generate error reports', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-02');
      
      const report = await errorHandling.generateErrorReport(startDate, endDate);

      expect(report).toBeDefined();
      expect(report.report_id).toBeDefined();
      expect(report.period_start).toEqual(startDate);
      expect(report.period_end).toEqual(endDate);
      expect(report.total_errors).toBeDefined();
      expect(report.errors_by_severity).toBeDefined();
      expect(report.errors_by_category).toBeDefined();
      expect(report.recovery_success_rate).toBeDefined();
      expect(report.recommendations).toBeDefined();
    });
  });

  describe('Error Handling Resilience', () => {
    it('should handle errors in error handling gracefully', async () => {
      // Mock a failure in the error logging
      const mockSupabase = vi.mocked(require('@/integrations/supabase/client').supabase);
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockRejectedValue(new Error('Database error'))
      } as any);

      const testError = new Error('Original test error');
      
      // Should not throw even if logging fails
      const productionError = await errorHandling.handleError(testError, {
        component: 'TestComponent'
      });

      expect(productionError).toBeDefined();
      expect(productionError.message).toBe('Original test error');
    });

    it('should create fallback error when classification fails', async () => {
      // Pass invalid error object
      const invalidError = { not: 'an error object' };
      
      const productionError = await errorHandling.handleError(invalidError as any, {
        component: 'TestComponent'
      });

      expect(productionError).toBeDefined();
      expect(productionError.type).toBe('unknown_error');
      expect(productionError.severity).toBe('low');
    });
  });

  describe('Initialization', () => {
    it('should initialize successfully', async () => {
      await expect(errorHandling.initialize()).resolves.not.toThrow();
      expect(errorHandling.isInitialized()).toBe(true);
    });

    it('should handle initialization errors gracefully', async () => {
      // Mock initialization failure
      const mockSupabase = vi.mocked(require('@/integrations/supabase/client').supabase);
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockRejectedValue(new Error('Database connection failed'))
      } as any);

      await expect(errorHandling.initialize()).rejects.toThrow();
    });
  });

  describe('Utility Methods', () => {
    it('should generate unique error IDs', async () => {
      const error1 = new Error('Test error 1');
      const error2 = new Error('Test error 2');
      
      const productionError1 = await errorHandling.handleError(error1);
      const productionError2 = await errorHandling.handleError(error2);

      expect(productionError1.id).not.toBe(productionError2.id);
      expect(productionError1.id).toMatch(/^err_\d+_[a-z0-9]+$/);
      expect(productionError2.id).toMatch(/^err_\d+_[a-z0-9]+$/);
    });

    it('should set proper timestamps', async () => {
      const beforeTime = new Date();
      const error = new Error('Test error');
      
      const productionError = await errorHandling.handleError(error);
      const afterTime = new Date();

      expect(productionError.timestamp.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
      expect(productionError.timestamp.getTime()).toBeLessThanOrEqual(afterTime.getTime());
    });
  });
});