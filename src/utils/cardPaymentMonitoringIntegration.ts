import { 
  cardPaymentMonitoring,
  ProcessingStage,
  ProcessingContext,
  ProcessingPerformance,
  ProcessingError,
  ErrorType,
  ErrorSeverity,
  BusinessMetrics
} from '@/services/CardPaymentMonitoringService';

/**
 * Integration utilities for connecting monitoring service with existing payment processing
 */

export interface MonitoringTimer {
  start: () => void;
  end: () => number;
  getDuration: () => number;
}

export interface ProcessingStageTimer {
  webhookValidation: MonitoringTimer;
  paymentDetection: MonitoringTimer;
  approvalProcessing: MonitoringTimer;
  uiUpdate: MonitoringTimer;
  persistence: MonitoringTimer;
  total: MonitoringTimer;
}

/**
 * Create a monitoring timer for measuring processing durations
 */
export function createMonitoringTimer(): MonitoringTimer {
  let startTime: number | null = null;
  let endTime: number | null = null;

  return {
    start: () => {
      startTime = performance.now();
      endTime = null;
    },
    end: () => {
      if (startTime === null) {
        throw new Error('Timer not started');
      }
      endTime = performance.now();
      return endTime - startTime;
    },
    getDuration: () => {
      if (startTime === null) return 0;
      const currentEnd = endTime || performance.now();
      return currentEnd - startTime;
    }
  };
}

/**
 * Create a complete set of processing stage timers
 */
export function createProcessingStageTimers(): ProcessingStageTimer {
  return {
    webhookValidation: createMonitoringTimer(),
    paymentDetection: createMonitoringTimer(),
    approvalProcessing: createMonitoringTimer(),
    uiUpdate: createMonitoringTimer(),
    persistence: createMonitoringTimer(),
    total: createMonitoringTimer()
  };
}

/**
 * Log the start of a processing stage
 */
export async function logProcessingStageStart(
  stage: ProcessingStage,
  context: ProcessingContext,
  additionalInfo?: Record<string, any>
): Promise<void> {
  await cardPaymentMonitoring.logCardPaymentStep(
    stage,
    context,
    `Started ${stage} processing`,
    {
      stage_start: true,
      ...additionalInfo
    }
  );
}

/**
 * Log the completion of a processing stage
 */
export async function logProcessingStageComplete(
  stage: ProcessingStage,
  context: ProcessingContext,
  duration: number,
  success: boolean = true,
  additionalInfo?: Record<string, any>
): Promise<void> {
  await cardPaymentMonitoring.logCardPaymentStep(
    stage,
    context,
    `Completed ${stage} processing ${success ? 'successfully' : 'with errors'}`,
    {
      stage_complete: true,
      success,
      ...additionalInfo
    },
    duration
  );
}

/**
 * Log an error during processing
 */
export async function logProcessingError(
  context: ProcessingContext,
  error: Error,
  errorType: ErrorType = ErrorType.BUSINESS_LOGIC_ERROR,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  recoverable: boolean = true
): Promise<void> {
  const processingError: ProcessingError = {
    id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: errorType,
    message: error.message,
    stack: error.stack || 'No stack trace available',
    context,
    timestamp: new Date(),
    severity,
    recoverable
  };

  await cardPaymentMonitoring.trackProcessingError(processingError, context);
}

/**
 * Create processing context from webhook data
 */
export function createProcessingContext(
  webhookId: string,
  enrollmentId: string,
  userId: string,
  courseId: string,
  paymentReference: string,
  stage: ProcessingStage = ProcessingStage.WEBHOOK_VALIDATION,
  attemptNumber: number = 1
): ProcessingContext {
  return {
    webhookId,
    enrollmentId,
    userId,
    courseId,
    paymentReference,
    processingStage: stage,
    attemptNumber,
    startTime: new Date()
  };
}

/**
 * Track complete processing performance
 */
export async function trackProcessingPerformance(
  timers: ProcessingStageTimer,
  context: ProcessingContext
): Promise<void> {
  const performance: ProcessingPerformance = {
    webhookProcessingTime: Math.round(timers.webhookValidation.getDuration()),
    paymentDetectionTime: Math.round(timers.paymentDetection.getDuration()),
    approvalProcessingTime: Math.round(timers.approvalProcessing.getDuration()),
    uiUpdateTime: Math.round(timers.uiUpdate.getDuration()),
    persistenceTime: Math.round(timers.persistence.getDuration()),
    totalEndToEndTime: Math.round(timers.total.getDuration())
  };

  await cardPaymentMonitoring.trackProcessingPerformance(performance, context);
}

/**
 * Calculate and track business metrics
 */
export async function trackBusinessMetrics(
  context: ProcessingContext,
  paymentAmount: number,
  approvalSuccess: boolean,
  immediateAccess: boolean,
  processingTime: number
): Promise<void> {
  // In a real implementation, these would be calculated from historical data
  // For now, we'll use simplified calculations
  const metrics: BusinessMetrics = {
    cardPaymentVolume: 1, // This payment
    approvalSuccessRate: approvalSuccess ? 1.0 : 0.0,
    averageApprovalTime: processingTime,
    immediateAccessRate: immediateAccess ? 1.0 : 0.0,
    revenueImpact: approvalSuccess ? paymentAmount : 0
  };

  await cardPaymentMonitoring.trackBusinessMetrics(metrics, context);
}

/**
 * Wrapper function for monitoring webhook processing
 */
export async function monitorWebhookProcessing<T>(
  webhookId: string,
  enrollmentId: string,
  userId: string,
  courseId: string,
  paymentReference: string,
  processingFunction: (context: ProcessingContext, timers: ProcessingStageTimer) => Promise<T>
): Promise<T> {
  const context = createProcessingContext(
    webhookId,
    enrollmentId,
    userId,
    courseId,
    paymentReference
  );
  
  const timers = createProcessingStageTimers();
  timers.total.start();

  try {
    await logProcessingStageStart(ProcessingStage.WEBHOOK_VALIDATION, context);
    
    const result = await processingFunction(context, timers);
    
    timers.total.end();
    await trackProcessingPerformance(timers, context);
    
    await logProcessingStageComplete(
      ProcessingStage.WEBHOOK_VALIDATION,
      context,
      timers.total.getDuration(),
      true,
      { result_type: typeof result }
    );

    return result;
  } catch (error) {
    timers.total.end();
    
    await logProcessingError(
      context,
      error as Error,
      ErrorType.BUSINESS_LOGIC_ERROR,
      ErrorSeverity.HIGH,
      false
    );

    throw error;
  }
}

/**
 * Monitor a specific processing stage
 */
export async function monitorProcessingStage<T>(
  stage: ProcessingStage,
  context: ProcessingContext,
  timer: MonitoringTimer,
  processingFunction: () => Promise<T>,
  additionalInfo?: Record<string, any>
): Promise<T> {
  timer.start();
  
  try {
    await logProcessingStageStart(stage, { ...context, processingStage: stage }, additionalInfo);
    
    const result = await processingFunction();
    
    const duration = timer.end();
    await logProcessingStageComplete(
      stage,
      { ...context, processingStage: stage },
      duration,
      true,
      { ...additionalInfo, result_type: typeof result }
    );

    return result;
  } catch (error) {
    const duration = timer.getDuration();
    
    await logProcessingError(
      { ...context, processingStage: stage },
      error as Error
    );

    await logProcessingStageComplete(
      stage,
      { ...context, processingStage: stage },
      duration,
      false,
      { ...additionalInfo, error_message: (error as Error).message }
    );

    throw error;
  }
}

/**
 * Create a monitoring decorator for existing functions
 */
export function withMonitoring<T extends any[], R>(
  stage: ProcessingStage,
  originalFunction: (...args: T) => Promise<R>
) {
  return async function monitoredFunction(
    context: ProcessingContext,
    timer: MonitoringTimer,
    ...args: T
  ): Promise<R> {
    return monitorProcessingStage(
      stage,
      context,
      timer,
      () => originalFunction(...args)
    );
  };
}

/**
 * Utility to check if monitoring is healthy
 */
export async function checkMonitoringHealth(): Promise<{
  healthy: boolean;
  issues: string[];
  metrics: any;
}> {
  try {
    const metrics = await cardPaymentMonitoring.getCardPaymentMetrics();
    const performanceStats = await cardPaymentMonitoring.getProcessingPerformanceStats();
    
    const issues: string[] = [];
    
    // Check for performance issues
    if (performanceStats.averageTotalTime > 5000) {
      issues.push('Average processing time exceeds 5 seconds');
    }
    
    // Check for high error rates
    if (metrics.totalCardPayments > 0) {
      const errorRate = metrics.failedApprovals / metrics.totalCardPayments;
      if (errorRate > 0.05) { // More than 5% error rate
        issues.push(`High error rate: ${(errorRate * 100).toFixed(1)}%`);
      }
    }
    
    // Check for low immediate access rate
    if (metrics.totalCardPayments > 0) {
      const immediateAccessRate = metrics.immediateAccessGranted / metrics.totalCardPayments;
      if (immediateAccessRate < 0.95) { // Less than 95% immediate access
        issues.push(`Low immediate access rate: ${(immediateAccessRate * 100).toFixed(1)}%`);
      }
    }

    return {
      healthy: issues.length === 0,
      issues,
      metrics: {
        ...metrics,
        ...performanceStats
      }
    };
  } catch (error) {
    return {
      healthy: false,
      issues: [`Monitoring system error: ${(error as Error).message}`],
      metrics: null
    };
  }
}