/**
 * Example demonstrating how to integrate the Card Payment Monitoring System
 * with existing payment processing workflows
 */

import { 
  cardPaymentMonitoring,
  ProcessingStage,
  ErrorType,
  ErrorSeverity
} from '@/services/CardPaymentMonitoringService';
import {
  createProcessingContext,
  monitorWebhookProcessing,
  monitorProcessingStage,
  trackBusinessMetrics,
  logProcessingError,
  checkMonitoringHealth
} from '@/utils/cardPaymentMonitoringIntegration';
import { PaymentTypeDetector } from '@/services/PaymentTypeDetector';
import { CardPaymentFastTrack } from '@/services/CardPaymentFastTrack';
import { EnhancedRealTimeSync } from '@/services/EnhancedRealTimeSync';

// Example webhook data structure
interface IkhokhaWebhookData {
  id: string;
  amount: number;
  reference: string;
  status: string;
  payment_method: string;
  user_email: string;
  course_id: string;
  metadata: Record<string, any>;
}

/**
 * Example 1: Basic monitoring integration with webhook processing
 */
export async function processWebhookWithMonitoring(
  webhookData: IkhokhaWebhookData,
  signature: string
): Promise<{ success: boolean; enrollmentApproved: boolean }> {
  // Create processing context
  // Create processing context for monitoring

  // Use the monitoring wrapper for complete webhook processing
  return await monitorWebhookProcessing(
    webhookData.id,
    `enrollment_${webhookData.reference}`,
    `user_${webhookData.user_email}`,
    webhookData.course_id,
    webhookData.reference,
    async (context, timers) => {
      // Start total processing timer
      timers.total.start();

      try {
        // Stage 1: Webhook Validation
        await monitorProcessingStage(
          ProcessingStage.WEBHOOK_VALIDATION,
          context,
          timers.webhookValidation,
          async () => {
            // Validate webhook signature and data
            if (!signature || signature.length < 10) {
              throw new Error('Invalid webhook signature');
            }
            
            if (!webhookData.amount || webhookData.amount <= 0) {
              throw new Error('Invalid payment amount');
            }

            return { valid: true, amount: webhookData.amount };
          },
          { webhookId: webhookData.id, amount: webhookData.amount }
        );

        // Stage 2: Payment Type Detection
        const paymentType = await monitorProcessingStage(
          ProcessingStage.PAYMENT_DETECTION,
          context,
          timers.paymentDetection,
          async () => {
            const detector = PaymentTypeDetector.getInstance();
            const result = detector.detectPaymentType(webhookData as any);
            
            if (result.confidence < 0.8) {
              throw new Error(`Low confidence payment type detection: ${result.confidence}`);
            }

            return result;
          },
          { paymentMethod: webhookData.payment_method }
        );

        // Stage 3: Approval Processing (only for card payments)
        let approvalResult = null;
        if (paymentType.type === 'card') {
          approvalResult = await monitorProcessingStage(
            ProcessingStage.APPROVAL_PROCESSING,
            context,
            timers.approvalProcessing,
            async () => {
              const fastTrack = CardPaymentFastTrack.getInstance();
              return await fastTrack.processCardPayment(
                webhookData as any,
                {
                  id: `enrollment_${webhookData.reference}`,
                  user_id: `user_${webhookData.user_email}`,
                  course_id: webhookData.course_id,
                  status: 'pending'
                } as any
              );
            },
            { paymentType: paymentType.type, fastTrack: true }
          );
        }

        // Stage 4: UI Updates
        await monitorProcessingStage(
          ProcessingStage.UI_NOTIFICATION,
          context,
          timers.uiUpdate,
          async () => {
            const realTimeSync = EnhancedRealTimeSync.getInstance();
            
            if (approvalResult?.success) {
              await realTimeSync.broadcastImmediateApproval({
                enrollmentId: `enrollment_${webhookData.reference}`,
                userId: `user_${webhookData.user_email}`,
                courseId: webhookData.course_id,
                approvalType: 'card_payment_automatic',
                timestamp: new Date(),
                paymentReference: webhookData.reference,
                accessGranted: true,
                source: 'webhook_card_payment'
              });
            }

            return { updated: true, immediate: approvalResult?.success || false };
          },
          { approvalSuccess: approvalResult?.success || false }
        );

        // Stage 5: Persistence
        await monitorProcessingStage(
          ProcessingStage.PERSISTENCE,
          context,
          timers.persistence,
          async () => {
            // Persist enrollment status and access grants
            // This would typically involve database updates
            console.log('Persisting enrollment status and access grants');
            return { persisted: true };
          }
        );

        // End total processing timer
        timers.total.end();

        // Track business metrics
        await trackBusinessMetrics(
          context,
          webhookData.amount,
          approvalResult?.success || false,
          approvalResult?.accessGranted || false,
          timers.total.getDuration()
        );

        return {
          success: true,
          enrollmentApproved: approvalResult?.success || false
        };

      } catch (error) {
        // Log the error with appropriate context
        await logProcessingError(
          context,
          error as Error,
          ErrorType.BUSINESS_LOGIC_ERROR,
          ErrorSeverity.HIGH,
          true
        );

        throw error;
      }
    }
  );
}

/**
 * Example 2: Monitoring individual payment processing steps
 */
export async function processCardPaymentWithDetailedMonitoring(
  paymentData: IkhokhaWebhookData
): Promise<void> {
  const context = createProcessingContext(
    paymentData.id,
    `enrollment_${paymentData.reference}`,
    `user_${paymentData.user_email}`,
    paymentData.course_id,
    paymentData.reference
  );

  // Log the start of processing
  await cardPaymentMonitoring.logCardPaymentStep(
    ProcessingStage.WEBHOOK_VALIDATION,
    context,
    'Starting card payment processing',
    {
      paymentAmount: paymentData.amount,
      paymentMethod: paymentData.payment_method,
      userEmail: paymentData.user_email
    }
  );

  try {
    // Step 1: Validate payment data
    await cardPaymentMonitoring.logCardPaymentStep(
      ProcessingStage.WEBHOOK_VALIDATION,
      context,
      'Validating payment data',
      { validationStep: 'data_validation' }
    );

    if (!paymentData.amount || paymentData.amount <= 0) {
      throw new Error('Invalid payment amount');
    }

    // Step 2: Detect payment type
    await cardPaymentMonitoring.logCardPaymentStep(
      ProcessingStage.PAYMENT_DETECTION,
      context,
      'Detecting payment type',
      { paymentMethod: paymentData.payment_method }
    );

    const detector = PaymentTypeDetector.getInstance();
    const paymentType = detector.detectPaymentType(paymentData as any);

    await cardPaymentMonitoring.logCardPaymentStep(
      ProcessingStage.PAYMENT_DETECTION,
      context,
      `Payment type detected: ${paymentType.type}`,
      {
        paymentType: paymentType.type,
        confidence: paymentType.confidence,
        indicators: paymentType.indicators
      }
    );

    // Step 3: Process approval if card payment
    if (paymentType.type === 'card') {
      await cardPaymentMonitoring.logCardPaymentStep(
        ProcessingStage.APPROVAL_PROCESSING,
        context,
        'Processing card payment for immediate approval',
        { fastTrack: true }
      );

      const fastTrack = CardPaymentFastTrack.getInstance();
      const approvalResult = await fastTrack.processCardPayment(
        paymentData as any,
        {
          id: `enrollment_${paymentData.reference}`,
          user_id: `user_${paymentData.user_email}`,
          course_id: paymentData.course_id,
          status: 'pending'
        } as any
      );

      await cardPaymentMonitoring.logCardPaymentStep(
        ProcessingStage.APPROVAL_PROCESSING,
        context,
        `Card payment approval ${approvalResult.success ? 'successful' : 'failed'}`,
        {
          approvalSuccess: approvalResult.success,
          accessGranted: approvalResult.accessGranted,
          processingTime: approvalResult.processingTimeMs
        },
        approvalResult.processingTimeMs
      );

      // Step 4: Update UI in real-time
      if (approvalResult.success) {
        await cardPaymentMonitoring.logCardPaymentStep(
          ProcessingStage.UI_NOTIFICATION,
          context,
          'Broadcasting immediate access to UI',
          { accessGranted: true }
        );

        const realTimeSync = EnhancedRealTimeSync.getInstance();
        await realTimeSync.broadcastImmediateApproval({
          enrollmentId: `enrollment_${paymentData.reference}`,
          userId: `user_${paymentData.user_email}`,
          courseId: paymentData.course_id,
          approvalType: 'card_payment_automatic',
          timestamp: new Date(),
          paymentReference: paymentData.reference,
          accessGranted: true,
          source: 'webhook_card_payment'
        });

        await cardPaymentMonitoring.logCardPaymentStep(
          ProcessingStage.UI_NOTIFICATION,
          context,
          'UI update broadcast completed',
          { broadcastSuccess: true }
        );
      }
    }

    // Final success log
    await cardPaymentMonitoring.logCardPaymentStep(
      ProcessingStage.PERSISTENCE,
      context,
      'Card payment processing completed successfully',
      {
        finalStatus: 'success',
        paymentType: paymentType.type,
        immediateAccess: paymentType.type === 'card'
      }
    );

  } catch (error) {
    // Log detailed error information
    await cardPaymentMonitoring.trackProcessingError(
      {
        id: `error_${Date.now()}`,
        type: ErrorType.BUSINESS_LOGIC_ERROR,
        message: (error as Error).message,
        stack: (error as Error).stack || 'No stack trace available',
        context,
        timestamp: new Date(),
        severity: ErrorSeverity.HIGH,
        recoverable: true
      },
      context
    );

    throw error;
  }
}

/**
 * Example 3: Performance monitoring for batch processing
 */
export async function processBatchPaymentsWithMonitoring(
  payments: IkhokhaWebhookData[]
): Promise<{ processed: number; successful: number; failed: number }> {
  const batchStartTime = performance.now();
  let processed = 0;
  let successful = 0;
  let failed = 0;

  for (const payment of payments) {
    const context = createProcessingContext(
      payment.id,
      `enrollment_${payment.reference}`,
      `user_${payment.user_email}`,
      payment.course_id,
      payment.reference
    );

    try {
      await processCardPaymentWithDetailedMonitoring(payment);
      successful++;
    } catch (error) {
      failed++;
      
      await cardPaymentMonitoring.logCardPaymentStep(
        ProcessingStage.WEBHOOK_VALIDATION,
        context,
        `Batch processing failed for payment ${payment.id}`,
        {
          batchProcessing: true,
          error: (error as Error).message
        }
      );
    }
    
    processed++;
  }

  const batchEndTime = performance.now();
  const batchDuration = batchEndTime - batchStartTime;

  // Log batch processing summary
  await cardPaymentMonitoring.logCardPaymentStep(
    ProcessingStage.WEBHOOK_VALIDATION,
    {
      webhookId: 'batch_processing',
      enrollmentId: 'batch',
      userId: 'system',
      courseId: 'multiple',
      paymentReference: 'batch',
      processingStage: ProcessingStage.WEBHOOK_VALIDATION,
      attemptNumber: 1,
      startTime: new Date()
    },
    'Batch payment processing completed',
    {
      totalPayments: payments.length,
      processed,
      successful,
      failed,
      batchDuration,
      averageTimePerPayment: batchDuration / processed
    },
    batchDuration
  );

  return { processed, successful, failed };
}

/**
 * Example 4: Health monitoring and alerting
 */
export async function monitorSystemHealth(): Promise<void> {
  try {
    // Check overall monitoring health
    const health = await checkMonitoringHealth();
    
    if (!health.healthy) {
      console.warn('⚠️ Card payment monitoring system health issues detected:');
      health.issues.forEach(issue => {
        console.warn(`  - ${issue}`);
      });

      // Trigger alert for health issues
      await cardPaymentMonitoring.triggerAlert({
        type: 'processing_failure' as any,
        severity: 'high' as any,
        message: `System health issues: ${health.issues.join(', ')}`,
        context: {
          webhookId: 'health_check',
          enrollmentId: 'system',
          userId: 'monitoring',
          courseId: 'system',
          paymentReference: 'health_check',
          processingStage: ProcessingStage.WEBHOOK_VALIDATION,
          attemptNumber: 1,
          startTime: new Date()
        },
        timestamp: new Date(),
        requiresImmediate: health.issues.some(issue => 
          issue.includes('Critical') || issue.includes('exceeds')
        )
      });
    } else {
      console.log('✅ Card payment monitoring system is healthy');
    }

    // Get and display current metrics
    const metrics = await cardPaymentMonitoring.getCardPaymentMetrics();
    const performanceStats = await cardPaymentMonitoring.getProcessingPerformanceStats();

    console.log('📊 Current Metrics:');
    console.log(`  Total Payments: ${metrics.totalCardPayments}`);
    console.log(`  Success Rate: ${((metrics.successfulApprovals / Math.max(metrics.totalCardPayments, 1)) * 100).toFixed(1)}%`);
    console.log(`  Average Processing Time: ${performanceStats.averageTotalTime.toFixed(0)}ms`);
    console.log(`  Immediate Access Rate: ${((metrics.immediateAccessGranted / Math.max(metrics.totalCardPayments, 1)) * 100).toFixed(1)}%`);

  } catch (error) {
    console.error('❌ Failed to check system health:', error);
    
    // Log health check failure
    await cardPaymentMonitoring.logCardPaymentStep(
      ProcessingStage.WEBHOOK_VALIDATION,
      {
        webhookId: 'health_check_error',
        enrollmentId: 'system',
        userId: 'monitoring',
        courseId: 'system',
        paymentReference: 'health_check',
        processingStage: ProcessingStage.WEBHOOK_VALIDATION,
        attemptNumber: 1,
        startTime: new Date()
      },
      'Health check failed',
      {
        error: (error as Error).message,
        healthCheckFailed: true
      }
    );
  }
}

/**
 * Example 5: Custom monitoring for specific business scenarios
 */
export async function monitorHighValuePayments(
  payment: IkhokhaWebhookData,
  threshold: number = 1000
): Promise<void> {
  if (payment.amount >= threshold) {
    const context = createProcessingContext(
      payment.id,
      `enrollment_${payment.reference}`,
      `user_${payment.user_email}`,
      payment.course_id,
      payment.reference
    );

    // Special monitoring for high-value payments
    await cardPaymentMonitoring.logCardPaymentStep(
      ProcessingStage.WEBHOOK_VALIDATION,
      context,
      'High-value payment detected - enhanced monitoring enabled',
      {
        highValue: true,
        amount: payment.amount,
        threshold,
        specialHandling: true
      }
    );

    // Track business impact
    await cardPaymentMonitoring.trackBusinessMetrics(
      {
        cardPaymentVolume: 1,
        approvalSuccessRate: 1.0, // Assume success for this example
        averageApprovalTime: 0, // Will be updated during processing
        immediateAccessRate: 1.0,
        revenueImpact: payment.amount,
        userSatisfactionScore: 5.0 // High-value customers get priority
      },
      context
    );

    // Trigger alert for high-value payment processing
    await cardPaymentMonitoring.triggerAlert({
      type: 'processing_failure' as any, // Using as info alert
      severity: 'info' as any,
      message: `High-value payment processing: $${payment.amount}`,
      context,
      timestamp: new Date(),
      requiresImmediate: false
    });
  }
}

// Export example usage
export const cardPaymentMonitoringExamples = {
  processWebhookWithMonitoring,
  processCardPaymentWithDetailedMonitoring,
  processBatchPaymentsWithMonitoring,
  monitorSystemHealth,
  monitorHighValuePayments
};