import { monitoringService } from './MonitoringService';
import { performanceMonitoring } from '@/utils/performanceMonitoring';

export interface PaymentLogContext {
  paymentId?: string;
  userId?: string;
  courseId?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  transactionId?: string;
  webhookId?: string;
  enrollmentId?: string;
}

export interface PaymentError {
  code: string;
  message: string;
  details?: Record<string, any>;
  retryable?: boolean;
}

class PaymentLoggingService {
  /**
   * Log payment initiation
   */
  async logPaymentInitiated(context: PaymentLogContext): Promise<void> {
    await monitoringService.logPayment(
      `Payment initiated for course ${context.courseId}`,
      {
        ...context,
        stage: 'initiation',
        timestamp: new Date().toISOString()
      },
      'info'
    );
  }

  /**
   * Log payment processing start
   */
  async logPaymentProcessingStart(context: PaymentLogContext): Promise<string> {
    await monitoringService.logPayment(
      `Payment processing started for ${context.paymentId}`,
      {
        ...context,
        stage: 'processing_start',
        timestamp: new Date().toISOString()
      },
      'info'
    );

    // Start performance timer
    return performanceMonitoring.startTimer(
      'payment_processing',
      'payment_processing_time',
      context
    );
  }

  /**
   * Log payment processing completion
   */
  async logPaymentProcessingComplete(
    context: PaymentLogContext,
    timerId: string,
    success: boolean,
    transactionId?: string
  ): Promise<void> {
    // End performance timer
    const duration = await performanceMonitoring.endTimer(timerId, {
      success,
      transactionId
    });

    await monitoringService.logPayment(
      `Payment processing ${success ? 'completed' : 'failed'} for ${context.paymentId}`,
      {
        ...context,
        stage: 'processing_complete',
        success,
        transactionId,
        processingTime: Math.round(duration),
        timestamp: new Date().toISOString()
      },
      success ? 'info' : 'error'
    );

    // Track payment processing performance
    await monitoringService.trackPaymentProcessing(
      context.paymentId || 'unknown',
      Math.round(duration),
      success,
      {
        ...context,
        transactionId
      }
    );
  }

  /**
   * Log payment verification
   */
  async logPaymentVerification(
    context: PaymentLogContext,
    verificationResult: boolean,
    verificationDetails?: Record<string, any>
  ): Promise<void> {
    await monitoringService.logPayment(
      `Payment verification ${verificationResult ? 'successful' : 'failed'} for ${context.paymentId}`,
      {
        ...context,
        stage: 'verification',
        verificationResult,
        verificationDetails,
        timestamp: new Date().toISOString()
      },
      verificationResult ? 'info' : 'warn'
    );
  }

  /**
   * Log webhook received
   */
  async logWebhookReceived(
    webhookType: string,
    context: PaymentLogContext,
    payload?: Record<string, any>
  ): Promise<void> {
    await monitoringService.logPayment(
      `Webhook received: ${webhookType} for payment ${context.paymentId}`,
      {
        ...context,
        stage: 'webhook_received',
        webhookType,
        payloadSize: payload ? JSON.stringify(payload).length : 0,
        timestamp: new Date().toISOString()
      },
      'info'
    );
  }

  /**
   * Log webhook processing
   */
  async logWebhookProcessing(
    webhookType: string,
    context: PaymentLogContext,
    success: boolean,
    processingDetails?: Record<string, any>
  ): Promise<void> {
    await monitoringService.logPayment(
      `Webhook processing ${success ? 'completed' : 'failed'}: ${webhookType}`,
      {
        ...context,
        stage: 'webhook_processing',
        webhookType,
        success,
        processingDetails,
        timestamp: new Date().toISOString()
      },
      success ? 'info' : 'error'
    );
  }

  /**
   * Log enrollment activation
   */
  async logEnrollmentActivation(
    context: PaymentLogContext,
    success: boolean,
    activationDetails?: Record<string, any>
  ): Promise<void> {
    await monitoringService.logEnrollment(
      `Enrollment ${success ? 'activated' : 'activation failed'} for course ${context.courseId}`,
      {
        ...context,
        stage: 'enrollment_activation',
        success,
        activationDetails,
        timestamp: new Date().toISOString()
      },
      success ? 'info' : 'error'
    );
  }

  /**
   * Log payment error
   */
  async logPaymentError(
    context: PaymentLogContext,
    error: PaymentError,
    stage: string,
    additionalContext?: Record<string, any>
  ): Promise<void> {
    await monitoringService.reportError({
      timestamp: new Date(),
      errorType: 'PaymentError',
      errorMessage: `${error.code}: ${error.message}`,
      severity: error.retryable ? 'medium' : 'high',
      category: 'payment',
      metadata: {
        ...context,
        stage,
        errorCode: error.code,
        errorDetails: error.details,
        retryable: error.retryable,
        ...additionalContext
      }
    });

    await monitoringService.logPayment(
      `Payment error at ${stage}: ${error.code} - ${error.message}`,
      {
        ...context,
        stage: `${stage}_error`,
        errorCode: error.code,
        errorMessage: error.message,
        errorDetails: error.details,
        retryable: error.retryable,
        ...additionalContext,
        timestamp: new Date().toISOString()
      },
      'error'
    );
  }

  /**
   * Log payment retry attempt
   */
  async logPaymentRetry(
    context: PaymentLogContext,
    attemptNumber: number,
    reason: string,
    maxAttempts: number
  ): Promise<void> {
    await monitoringService.logPayment(
      `Payment retry attempt ${attemptNumber}/${maxAttempts} for ${context.paymentId}`,
      {
        ...context,
        stage: 'retry_attempt',
        attemptNumber,
        maxAttempts,
        reason,
        timestamp: new Date().toISOString()
      },
      'warn'
    );
  }

  /**
   * Log payment timeout
   */
  async logPaymentTimeout(
    context: PaymentLogContext,
    timeoutDuration: number,
    stage: string
  ): Promise<void> {
    await monitoringService.logPayment(
      `Payment timeout at ${stage} after ${timeoutDuration}ms for ${context.paymentId}`,
      {
        ...context,
        stage: `${stage}_timeout`,
        timeoutDuration,
        timestamp: new Date().toISOString()
      },
      'error'
    );

    await monitoringService.reportError({
      timestamp: new Date(),
      errorType: 'PaymentTimeout',
      errorMessage: `Payment timeout at ${stage} after ${timeoutDuration}ms`,
      severity: 'high',
      category: 'payment',
      metadata: {
        ...context,
        stage,
        timeoutDuration
      }
    });
  }

  /**
   * Log payment reconciliation
   */
  async logPaymentReconciliation(
    context: PaymentLogContext,
    reconciliationResult: 'matched' | 'discrepancy' | 'missing',
    details?: Record<string, any>
  ): Promise<void> {
    const level = reconciliationResult === 'matched' ? 'info' : 'warn';
    
    await monitoringService.logPayment(
      `Payment reconciliation ${reconciliationResult} for ${context.paymentId}`,
      {
        ...context,
        stage: 'reconciliation',
        reconciliationResult,
        details,
        timestamp: new Date().toISOString()
      },
      level
    );
  }

  /**
   * Log payment refund
   */
  async logPaymentRefund(
    context: PaymentLogContext,
    refundAmount: number,
    refundReason: string,
    success: boolean,
    refundId?: string
  ): Promise<void> {
    await monitoringService.logPayment(
      `Payment refund ${success ? 'processed' : 'failed'} for ${context.paymentId}`,
      {
        ...context,
        stage: 'refund',
        refundAmount,
        refundReason,
        success,
        refundId,
        timestamp: new Date().toISOString()
      },
      success ? 'info' : 'error'
    );
  }

  /**
   * Generate payment audit trail
   */
  async generatePaymentAuditTrail(paymentId: string): Promise<void> {
    await monitoringService.logPayment(
      `Payment audit trail generated for ${paymentId}`,
      {
        paymentId,
        stage: 'audit_trail',
        timestamp: new Date().toISOString()
      },
      'info'
    );
  }

  /**
   * Log payment analytics event
   */
  async logPaymentAnalytics(
    eventType: 'conversion' | 'abandonment' | 'retry_success' | 'method_change',
    context: PaymentLogContext,
    analyticsData?: Record<string, any>
  ): Promise<void> {
    await monitoringService.logPayment(
      `Payment analytics event: ${eventType}`,
      {
        ...context,
        stage: 'analytics',
        eventType,
        analyticsData,
        timestamp: new Date().toISOString()
      },
      'info'
    );
  }
}

// Export singleton instance
export const paymentLoggingService = new PaymentLoggingService();
export default PaymentLoggingService;