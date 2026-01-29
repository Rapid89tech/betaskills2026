import { useEffect, useCallback, useRef } from 'react';
import { monitoringService } from '@/services/MonitoringService';
import { performanceMonitoring } from '@/utils/performanceMonitoring';
import { paymentLoggingService, PaymentLogContext } from '@/services/PaymentLoggingService';

export interface UseMonitoringOptions {
  pageName?: string;
  enablePerformanceMonitoring?: boolean;
  enableErrorBoundary?: boolean;
}

export function useMonitoring(options: UseMonitoringOptions = {}) {
  const {
    pageName,
    enablePerformanceMonitoring = true,
    enableErrorBoundary = true
  } = options;

  const pageLoadTimerRef = useRef<string | null>(null);
  const componentMountTimeRef = useRef<number>(performance.now());

  // Initialize page monitoring
  useEffect(() => {
    if (pageName && enablePerformanceMonitoring) {
      // Start page load timer
      pageLoadTimerRef.current = performanceMonitoring.startTimer(
        `page_load_${pageName}`,
        'page_load_time',
        { pageName }
      );

      // Monitor page load performance
      performanceMonitoring.monitorPageLoad(pageName);

      // Log page visit
      monitoringService.log({
        level: 'info',
        category: 'system',
        message: `Page visited: ${pageName}`,
        metadata: { pageName }
      });
    }

    return () => {
      // End page load timer on unmount
      if (pageLoadTimerRef.current) {
        performanceMonitoring.endTimer(pageLoadTimerRef.current, {
          componentLifecycle: 'unmount'
        });
      }
    };
  }, [pageName, enablePerformanceMonitoring]);

  // Log component mount/unmount
  useEffect(() => {
    const mountTime = performance.now() - componentMountTimeRef.current;
    
    if (pageName) {
      monitoringService.log({
        level: 'debug',
        category: 'performance',
        message: `Component mounted: ${pageName}`,
        metadata: {
          pageName,
          mountTime: Math.round(mountTime)
        }
      });
    }

    return () => {
      if (pageName) {
        const totalTime = performance.now() - componentMountTimeRef.current;
        monitoringService.log({
          level: 'debug',
          category: 'performance',
          message: `Component unmounted: ${pageName}`,
          metadata: {
            pageName,
            totalTime: Math.round(totalTime)
          }
        });
      }
    };
  }, [pageName]);

  // Error boundary integration
  useEffect(() => {
    if (!enableErrorBoundary) return;

    const handleError = (event: ErrorEvent) => {
      monitoringService.reportError(event.error, {
        pageName,
        errorSource: 'window_error_handler',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      monitoringService.reportError(
        new Error(`Unhandled Promise Rejection: ${event.reason}`),
        {
          pageName,
          errorSource: 'unhandled_promise_rejection',
          reason: event.reason
        }
      );
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [enableErrorBoundary, pageName]);

  // Logging functions
  const logInfo = useCallback((message: string, metadata?: Record<string, any>) => {
    monitoringService.log({
      level: 'info',
      category: 'system',
      message,
      metadata: { ...metadata, pageName }
    });
  }, [pageName]);

  const logWarning = useCallback((message: string, metadata?: Record<string, any>) => {
    monitoringService.log({
      level: 'warn',
      category: 'system',
      message,
      metadata: { ...metadata, pageName }
    });
  }, [pageName]);

  const logError = useCallback((message: string, error?: Error, metadata?: Record<string, any>) => {
    if (error) {
      monitoringService.reportError(error, { ...metadata, pageName, customMessage: message });
    } else {
      monitoringService.log({
        level: 'error',
        category: 'system',
        message,
        metadata: { ...metadata, pageName }
      });
    }
  }, [pageName]);

  // Performance tracking functions
  const startTimer = useCallback((name: string, metadata?: Record<string, any>) => {
    return performanceMonitoring.startTimer(name, 'function_execution', {
      ...metadata,
      pageName
    });
  }, [pageName]);

  const endTimer = useCallback(async (timerId: string, metadata?: Record<string, any>) => {
    return await performanceMonitoring.endTimer(timerId, {
      ...metadata,
      pageName
    });
  }, [pageName]);

  const measureFunction = useCallback(async <T>(
    name: string,
    fn: () => Promise<T> | T,
    metadata?: Record<string, any>
  ): Promise<T> => {
    return await performanceMonitoring.measureFunction(
      name,
      fn,
      'function_execution',
      { ...metadata, pageName }
    );
  }, [pageName]);

  const measureApiCall = useCallback(async <T>(
    endpoint: string,
    method: string,
    apiCall: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> => {
    return await performanceMonitoring.measureApiCall(
      endpoint,
      method,
      apiCall,
      { ...metadata, pageName }
    );
  }, [pageName]);

  // Payment logging functions
  const logPaymentEvent = useCallback((
    message: string,
    context: PaymentLogContext,
    level: 'info' | 'warn' | 'error' = 'info'
  ) => {
    monitoringService.logPayment(message, { ...context, pageName }, level);
  }, [pageName]);

  const trackPaymentFlow = useCallback(() => {
    return {
      logInitiated: (context: PaymentLogContext) => 
        paymentLoggingService.logPaymentInitiated({ ...context, pageName }),
      
      logProcessingStart: (context: PaymentLogContext) => 
        paymentLoggingService.logPaymentProcessingStart({ ...context, pageName }),
      
      logProcessingComplete: (context: PaymentLogContext, timerId: string, success: boolean, transactionId?: string) =>
        paymentLoggingService.logPaymentProcessingComplete({ ...context, pageName }, timerId, success, transactionId),
      
      logError: (context: PaymentLogContext, error: any, stage: string) =>
        paymentLoggingService.logPaymentError({ ...context, pageName }, error, stage)
    };
  }, [pageName]);

  // Admin logging functions
  const logAdminAction = useCallback((
    action: string,
    metadata?: Record<string, any>,
    level: 'info' | 'warn' | 'error' = 'info'
  ) => {
    monitoringService.logAdmin(`Admin action: ${action}`, { ...metadata, pageName }, level);
  }, [pageName]);

  // Enrollment logging functions
  const logEnrollmentEvent = useCallback((
    message: string,
    metadata?: Record<string, any>,
    level: 'info' | 'warn' | 'error' = 'info'
  ) => {
    monitoringService.logEnrollment(message, { ...metadata, pageName }, level);
  }, [pageName]);

  return {
    // Basic logging
    logInfo,
    logWarning,
    logError,
    
    // Performance tracking
    startTimer,
    endTimer,
    measureFunction,
    measureApiCall,
    
    // Specialized logging
    logPaymentEvent,
    trackPaymentFlow,
    logAdminAction,
    logEnrollmentEvent,
    
    // Monitoring service access
    monitoringService,
    performanceMonitoring,
    paymentLoggingService
  };
}

export default useMonitoring;