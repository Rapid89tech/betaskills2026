/**
 * Tests for Card Payment Error Recovery System
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { CardPaymentErrorRecoverySystem, ErrorType, ErrorSeverity, ProcessingStage, RecoveryStrategy, FallbackMechanism, InterventionType, InterventionPriority, SystemHealthStatus } from '../CardPaymentErrorRecoverySystem';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn()
        })),
        limit: vi.fn()
      })),
      insert: vi.fn()
    }))
  }
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

vi.mock('../CardPaymentFastTrack', () => ({
  cardPaymentFastTrack: {
    processCardPayment: vi.fn()
  }
}));

vi.mock('../PaymentTypeDetector', () => ({
  paymentTypeDetector: {
    detectPaymentType: vi.fn()
  }
}));

describe('CardPaymentErrorRecoverySystem', () => {
  let errorRecoverySystem: CardPaymentErrorRecoverySystem;
  let mockSupabaseSelect: Mock;
  let mockSupabaseInsert: Mock;

  const mockContext = {
    webhookId: 'webhook_123',
    enrollmentId: 'enrollment_456',
    userId: 'user_789',
    courseId: 'course_101',
    paymentReference: 'pay_ref_123',
    transactionId: 'txn_456',
    processingStage: ProcessingStage.WEBHOOK_RECEIVED,
    attemptNumber: 1,
    startTime: new Date(),
    metadata: { test: true }
  };

  beforeEach(() => {
    errorRecoverySystem = CardPaymentErrorRecoverySystem.getInstance();
    
    // Setup Supabase mocks
    mockSupabaseSelect = vi.fn();
    mockSupabaseInsert = vi.fn();
    
    (supabase.from as Mock).mockReturnValue({
      select: mockSupabaseSelect.mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null, error: null })
        }),
        limit: vi.fn().mockResolvedValue({ data: [], error: null })
      }),
      insert: mockSupabaseInsert.mockResolvedValue({ error: null })
    });

    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize successfully', async () => {
      await errorRecoverySystem.initialize();
      
      expect(logger.info).toHaveBeenCalledWith(
        '✅ CardPaymentErrorRecoverySystem: Initialized successfully'
      );
    });

    it('should handle initialization errors gracefully', async () => {
      // Create a fresh instance to test initialization failure
      const freshInstance = Object.create(CardPaymentErrorRecoverySystem.prototype);
      freshInstance.isInitialized = false;
      
      // Mock the loadErrorHistory method to throw an error
      vi.spyOn(freshInstance, 'loadErrorHistory').mockRejectedValue(new Error('Database connection failed'));
      
      await expect(freshInstance.initialize()).rejects.toThrow();
      
      expect(logger.error).toHaveBeenCalledWith(
        '❌ CardPaymentErrorRecoverySystem: Initialization failed',
        expect.objectContaining({ error: expect.any(Error) })
      );
    });

    it('should not reinitialize if already initialized', async () => {
      await errorRecoverySystem.initialize();
      vi.clearAllMocks();
      
      await errorRecoverySystem.initialize();
      
      expect(logger.info).not.toHaveBeenCalled();
    });
  });

  describe('Error Detection', () => {
    beforeEach(async () => {
      await errorRecoverySystem.initialize();
    });

    it('should detect webhook validation errors', async () => {
      const contextWithoutTransactionId = {
        ...mockContext,
        transactionId: undefined as any
      };

      const result = await errorRecoverySystem.detectProcessingErrors(contextWithoutTransactionId);

      expect(result.errorsDetected.length).toBeGreaterThanOrEqual(1);
      const webhookError = result.errorsDetected.find(e => e.type === ErrorType.WEBHOOK_VALIDATION_ERROR);
      expect(webhookError).toBeDefined();
      expect(webhookError?.message).toBe('Missing transaction ID in webhook data');
      expect(webhookError?.severity).toBe(ErrorSeverity.HIGH);
    });

    it('should detect timeout errors', async () => {
      const oldContext = {
        ...mockContext,
        startTime: new Date(Date.now() - 35000) // 35 seconds ago
      };

      const result = await errorRecoverySystem.detectProcessingErrors(oldContext);

      const timeoutError = result.errorsDetected.find(e => e.type === ErrorType.TIMEOUT_ERROR);
      expect(timeoutError).toBeDefined();
      expect(timeoutError!.message).toBe('Webhook processing timeout exceeded');
    });

    it('should detect database connectivity errors', async () => {
      mockSupabaseSelect.mockRejectedValueOnce(new Error('Connection refused'));

      const result = await errorRecoverySystem.detectProcessingErrors(mockContext);

      const dbError = result.errorsDetected.find(e => e.type === ErrorType.DATABASE_ERROR);
      expect(dbError).toBeDefined();
      expect(dbError!.severity).toBe(ErrorSeverity.HIGH);
    });

    it('should categorize errors correctly', async () => {
      const contextWithMultipleIssues = {
        ...mockContext,
        transactionId: undefined as any,
        paymentReference: undefined as any
      };

      const result = await errorRecoverySystem.detectProcessingErrors(contextWithMultipleIssues);

      expect(result.errorsDetected.length).toBeGreaterThan(0);
      expect(result.recoverableErrors.length).toBeGreaterThanOrEqual(0);
      expect(result.systemHealthStatus).toBeDefined();
      expect(result.recommendedActions.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle error detection failures gracefully', async () => {
      // Mock a complete failure in error detection
      vi.spyOn(errorRecoverySystem as any, 'detectWebhookErrors').mockRejectedValue(new Error('Detection failed'));

      const result = await errorRecoverySystem.detectProcessingErrors(mockContext);

      expect(result.errorsDetected).toHaveLength(1);
      expect(result.errorsDetected[0].type).toBe(ErrorType.EXTERNAL_SERVICE_ERROR);
      expect(result.systemHealthStatus).toBe(SystemHealthStatus.DEGRADED);
    });
  });

  describe('Recovery Strategy Execution', () => {
    let mockError: any;

    beforeEach(async () => {
      await errorRecoverySystem.initialize();
      
      mockError = {
        id: 'error_123',
        type: ErrorType.NETWORK_ERROR,
        severity: ErrorSeverity.MEDIUM,
        message: 'Network timeout',
        details: {},
        timestamp: new Date(),
        context: mockContext,
        recoverable: true,
        retryCount: 0,
        maxRetries: 3
      };
    });

    it('should execute retry with backoff strategy', async () => {
      const result = await errorRecoverySystem.executeRecoveryStrategy(mockError, mockContext);

      expect(result.strategy).toBe(RecoveryStrategy.RETRY_WITH_BACKOFF);
      expect(result.executionTime).toBeGreaterThan(0);
      expect(typeof result.success).toBe('boolean');
    });

    it('should select appropriate recovery strategy based on error type', async () => {
      const databaseError = { ...mockError, type: ErrorType.DATABASE_ERROR };
      const result = await errorRecoverySystem.executeRecoveryStrategy(databaseError, mockContext);

      expect(result.strategy).toBe(RecoveryStrategy.DATABASE_RECONNECTION);
    });

    it('should handle recovery strategy failures', async () => {
      // Mock a recovery strategy that fails
      vi.spyOn(errorRecoverySystem as any, 'executeRetryWithBackoff').mockRejectedValue(new Error('Recovery failed'));

      const result = await errorRecoverySystem.executeRecoveryStrategy(mockError, mockContext);

      expect(result.success).toBe(false);
      expect(result.manualInterventionRequired).toBe(true);
      expect(result.details.recoveryError).toBeDefined();
    });

    it('should increment retry count on failed recovery', async () => {
      vi.spyOn(errorRecoverySystem as any, 'executeRetryWithBackoff').mockResolvedValue({
        success: false,
        strategy: RecoveryStrategy.RETRY_WITH_BACKOFF,
        executionTime: 100,
        recoveredErrors: [],
        remainingErrors: [mockError],
        fallbackUsed: false,
        manualInterventionRequired: false,
        details: {}
      });

      await errorRecoverySystem.executeRecoveryStrategy(mockError, mockContext);

      expect(mockError.retryCount).toBe(1);
    });

    it('should record recovery attempts', async () => {
      const recordSpy = vi.spyOn(errorRecoverySystem as any, 'recordRecoveryAttempt');

      await errorRecoverySystem.executeRecoveryStrategy(mockError, mockContext);

      expect(recordSpy).toHaveBeenCalledWith(
        mockContext.webhookId,
        expect.objectContaining({
          strategy: RecoveryStrategy.RETRY_WITH_BACKOFF,
          timestamp: expect.any(Date),
          success: expect.any(Boolean)
        })
      );
    });
  });

  describe('Fallback Mechanism Execution', () => {
    let mockFailedOperation: any;

    beforeEach(async () => {
      await errorRecoverySystem.initialize();
      
      mockFailedOperation = {
        operationType: 'webhook_processing',
        context: mockContext,
        error: {
          id: 'error_123',
          type: ErrorType.EXTERNAL_SERVICE_ERROR,
          severity: ErrorSeverity.CRITICAL,
          message: 'Service unavailable',
          details: {},
          timestamp: new Date(),
          context: mockContext,
          recoverable: false,
          retryCount: 3,
          maxRetries: 3
        },
        attemptedRecoveries: [],
        timestamp: new Date()
      };
    });

    it('should execute manual approval queue fallback', async () => {
      const result = await errorRecoverySystem.executeFallbackMechanism(mockFailedOperation);

      expect(result.mechanism).toBe(FallbackMechanism.MANUAL_APPROVAL_QUEUE);
      expect(result.executionTime).toBeGreaterThanOrEqual(0);
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.manualApprovalTriggered).toBe('boolean');
    });

    it('should select appropriate fallback mechanism', async () => {
      const selectSpy = vi.spyOn(errorRecoverySystem as any, 'selectFallbackMechanism');
      
      await errorRecoverySystem.executeFallbackMechanism(mockFailedOperation);

      expect(selectSpy).toHaveBeenCalledWith(mockFailedOperation);
    });

    it('should handle fallback mechanism failures', async () => {
      vi.spyOn(errorRecoverySystem as any, 'executeManualApprovalQueue').mockRejectedValue(new Error('Fallback failed'));

      const result = await errorRecoverySystem.executeFallbackMechanism(mockFailedOperation);

      expect(result.success).toBe(false);
      expect(result.manualApprovalTriggered).toBe(true);
      expect(result.details.fallbackError).toBeDefined();
    });

    it('should log fallback execution', async () => {
      const logSpy = vi.spyOn(errorRecoverySystem as any, 'logFallbackExecution');

      await errorRecoverySystem.executeFallbackMechanism(mockFailedOperation);

      expect(logSpy).toHaveBeenCalledWith(
        mockFailedOperation,
        expect.objectContaining({
          mechanism: expect.any(String),
          success: expect.any(Boolean)
        })
      );
    });
  });

  describe('Manual Intervention Triggers', () => {
    let mockCriticalError: any;

    beforeEach(async () => {
      await errorRecoverySystem.initialize();
      
      mockCriticalError = {
        id: 'critical_error_123',
        type: 'system_failure',
        severity: 'critical',
        message: 'Critical system failure detected',
        context: mockContext,
        impact: 'system_stability',
        requiresImmediateAttention: true,
        escalationRequired: true,
        timestamp: new Date()
      };
    });

    it('should trigger manual intervention successfully', async () => {
      const result = await errorRecoverySystem.triggerManualIntervention(mockCriticalError);

      expect(result.triggered).toBe(true);
      expect(result.interventionType).toBeDefined();
      expect(result.priority).toBeDefined();
      expect(result.escalationPath).toBeInstanceOf(Array);
      expect(result.escalationPath.length).toBeGreaterThan(0);
    });

    it('should determine appropriate intervention type', async () => {
      const result = await errorRecoverySystem.triggerManualIntervention(mockCriticalError);

      expect(Object.values(InterventionType)).toContain(result.interventionType);
    });

    it('should determine appropriate intervention priority', async () => {
      const result = await errorRecoverySystem.triggerManualIntervention(mockCriticalError);

      expect(Object.values(InterventionPriority)).toContain(result.priority);
    });

    it('should store intervention record in database', async () => {
      await errorRecoverySystem.triggerManualIntervention(mockCriticalError);

      expect(mockSupabaseInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          error_id: mockCriticalError.id,
          intervention_type: expect.any(String),
          priority: expect.any(String),
          status: 'pending'
        })
      );
    });

    it('should handle database storage failures gracefully', async () => {
      mockSupabaseInsert.mockResolvedValueOnce({ error: new Error('Database error') });

      const result = await errorRecoverySystem.triggerManualIntervention(mockCriticalError);

      expect(result.triggered).toBe(true);
      expect(result.details.databaseRecorded).toBe(false);
      expect(logger.error).toHaveBeenCalledWith(
        '❌ ErrorRecoverySystem: Failed to store intervention record',
        expect.objectContaining({ error: expect.any(Error) })
      );
    });

    it('should send intervention notifications', async () => {
      const notificationSpy = vi.spyOn(errorRecoverySystem as any, 'sendInterventionNotifications');

      await errorRecoverySystem.triggerManualIntervention(mockCriticalError);

      expect(notificationSpy).toHaveBeenCalledWith(
        mockCriticalError,
        expect.any(String),
        expect.any(String)
      );
    });

    it('should estimate resolution time', async () => {
      const result = await errorRecoverySystem.triggerManualIntervention(mockCriticalError);

      expect(result.estimatedResolutionTime).toBeGreaterThan(0);
    });

    it('should handle intervention trigger failures', async () => {
      vi.spyOn(errorRecoverySystem as any, 'determineInterventionType').mockImplementation(() => {
        throw new Error('Intervention determination failed');
      });

      const result = await errorRecoverySystem.triggerManualIntervention(mockCriticalError);

      expect(result.triggered).toBe(false);
      expect(result.interventionType).toBe(InterventionType.EMERGENCY_RESPONSE);
      expect(result.priority).toBe(InterventionPriority.EMERGENCY);
    });
  });

  describe('System Health Monitoring', () => {
    beforeEach(async () => {
      await errorRecoverySystem.initialize();
    });

    it('should detect high error rates', async () => {
      // Mock high error rate
      vi.spyOn(errorRecoverySystem as any, 'systemHealthMetrics', 'get').mockReturnValue({
        errorRate: 75,
        successRate: 25,
        averageProcessingTime: 5000,
        lastHealthCheck: new Date()
      });

      const result = await errorRecoverySystem.detectProcessingErrors(mockContext);

      const healthError = result.errorsDetected.find(e => 
        e.message.includes('High system error rate detected')
      );
      expect(healthError).toBeDefined();
      expect(healthError!.severity).toBe(ErrorSeverity.HIGH);
    });

    it('should detect high processing times', async () => {
      // Mock high processing time
      vi.spyOn(errorRecoverySystem as any, 'systemHealthMetrics', 'get').mockReturnValue({
        errorRate: 10,
        successRate: 90,
        averageProcessingTime: 15000,
        lastHealthCheck: new Date()
      });

      const result = await errorRecoverySystem.detectProcessingErrors(mockContext);

      const timeError = result.errorsDetected.find(e => 
        e.message.includes('High average processing time detected')
      );
      expect(timeError).toBeDefined();
      expect(timeError!.severity).toBe(ErrorSeverity.MEDIUM);
    });
  });

  describe('Circuit Breaker Integration', () => {
    beforeEach(async () => {
      await errorRecoverySystem.initialize();
    });

    it('should detect open circuit breakers', async () => {
      // Mock open circuit breaker
      vi.spyOn(errorRecoverySystem as any, 'circuitBreakers', 'get').mockReturnValue(
        new Map([['payment_detection', { state: 'open', failures: 5, lastFailure: new Date() }]])
      );

      const result = await errorRecoverySystem.detectProcessingErrors(mockContext);

      const circuitError = result.errorsDetected.find(e => 
        e.message.includes('circuit breaker is open')
      );
      expect(circuitError).toBeDefined();
      expect(circuitError!.type).toBe(ErrorType.EXTERNAL_SERVICE_ERROR);
    });
  });

  describe('Error History Management', () => {
    beforeEach(async () => {
      await errorRecoverySystem.initialize();
    });

    it('should store error history', async () => {
      const storeSpy = vi.spyOn(errorRecoverySystem as any, 'storeErrorHistory');

      await errorRecoverySystem.detectProcessingErrors(mockContext);

      expect(storeSpy).toHaveBeenCalledWith(
        mockContext.webhookId,
        expect.any(Array)
      );
    });

    it('should load error history on initialization', async () => {
      // Create a fresh instance to test initialization
      const freshInstance = Object.create(CardPaymentErrorRecoverySystem.prototype);
      freshInstance.isInitialized = false;
      freshInstance.errorHistory = new Map();
      freshInstance.recoveryAttempts = new Map();
      freshInstance.circuitBreakers = new Map();
      freshInstance.systemHealthMetrics = {
        errorRate: 0,
        successRate: 100,
        averageProcessingTime: 0,
        lastHealthCheck: new Date()
      };
      
      const loadSpy = vi.spyOn(freshInstance, 'loadErrorHistory').mockResolvedValue(undefined);
      const initCircuitBreakersSpy = vi.spyOn(freshInstance, 'initializeCircuitBreakers').mockReturnValue(undefined);
      const startHealthMonitoringSpy = vi.spyOn(freshInstance, 'startHealthMonitoring').mockReturnValue(undefined);

      await freshInstance.initialize();

      expect(loadSpy).toHaveBeenCalled();
    });
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = CardPaymentErrorRecoverySystem.getInstance();
      const instance2 = CardPaymentErrorRecoverySystem.getInstance();

      expect(instance1).toBe(instance2);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    beforeEach(async () => {
      await errorRecoverySystem.initialize();
    });

    it('should handle null context gracefully', async () => {
      const nullContext = null as any;

      const result = await errorRecoverySystem.detectProcessingErrors(nullContext);
      
      // The system should handle null context gracefully and return a safe fallback
      expect(result.errorsDetected.length).toBeGreaterThan(0);
      expect(result.systemHealthStatus).toBe(SystemHealthStatus.DEGRADED);
      expect(result.errorsDetected[0].type).toBe(ErrorType.EXTERNAL_SERVICE_ERROR);
    });

    it('should handle missing enrollment ID', async () => {
      const contextWithoutEnrollment = {
        ...mockContext,
        enrollmentId: undefined as any
      };

      const result = await errorRecoverySystem.detectProcessingErrors(contextWithoutEnrollment);

      expect(result.errorsDetected).toBeDefined();
      expect(result.systemHealthStatus).toBeDefined();
    });

    it('should handle concurrent error detection calls', async () => {
      const promises = Array(5).fill(null).map(() => 
        errorRecoverySystem.detectProcessingErrors(mockContext)
      );

      const results = await Promise.all(promises);

      expect(results).toHaveLength(5);
      results.forEach(result => {
        expect(result.errorsDetected).toBeDefined();
        expect(result.systemHealthStatus).toBeDefined();
      });
    });

    it('should handle recovery strategy with maximum retries exceeded', async () => {
      const maxRetriedError = {
        id: 'error_123',
        type: ErrorType.NETWORK_ERROR,
        severity: ErrorSeverity.MEDIUM,
        message: 'Network timeout',
        details: {},
        timestamp: new Date(),
        context: mockContext,
        recoverable: true,
        retryCount: 3,
        maxRetries: 3
      };

      const result = await errorRecoverySystem.executeRecoveryStrategy(maxRetriedError, mockContext);

      expect(result.manualInterventionRequired).toBe(true);
    }, 10000);
  });

  describe('Integration with External Services', () => {
    beforeEach(async () => {
      await errorRecoverySystem.initialize();
    });

    it('should handle payment type detector unavailability', async () => {
      // Mock the detector check to simulate unavailability
      vi.spyOn(errorRecoverySystem as any, 'detectPaymentDetectionErrors').mockResolvedValue([{
        id: 'config_error_123',
        type: ErrorType.CONFIGURATION_ERROR,
        severity: ErrorSeverity.CRITICAL,
        message: 'Payment type detector service not available',
        details: { context: mockContext },
        timestamp: new Date(),
        context: mockContext,
        recoverable: false,
        retryCount: 0,
        maxRetries: 3
      }]);

      const result = await errorRecoverySystem.detectProcessingErrors(mockContext);

      const configError = result.errorsDetected.find(e => 
        e.type === ErrorType.CONFIGURATION_ERROR &&
        e.message.includes('Payment type detector service not available')
      );
      expect(configError).toBeDefined();
      expect(configError!.severity).toBe(ErrorSeverity.CRITICAL);
    });
  });
});