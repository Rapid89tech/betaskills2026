import { useState, useCallback, useEffect, useRef } from 'react';
import { stabilityMonitoringService } from '@/services/StabilityMonitoringService';

export interface ErrorRecoveryState {
  hasError: boolean;
  error: Error | null;
  errorCount: number;
  isRecovering: boolean;
  canRetry: boolean;
}

export interface ErrorRecoveryOptions {
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: Error) => void;
  onRecovery?: () => void;
  autoRetry?: boolean;
}

export const useErrorRecovery = (options: ErrorRecoveryOptions = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    onError,
    onRecovery,
    autoRetry = false
  } = options;

  const [state, setState] = useState<ErrorRecoveryState>({
    hasError: false,
    error: null,
    errorCount: 0,
    isRecovering: false,
    canRetry: true
  });

  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);

  const reportError = useCallback((error: Error) => {
    // Report to monitoring service
    stabilityMonitoringService.reportError({
      message: error.message,
      stack: error.stack,
      severity: 'medium',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    setState(prev => ({
      ...prev,
      hasError: true,
      error,
      errorCount: prev.errorCount + 1,
      canRetry: retryCountRef.current < maxRetries
    }));

    onError?.(error);

    // Auto retry if enabled and retries available
    if (autoRetry && retryCountRef.current < maxRetries) {
      retryCountRef.current++;
      retryTimeoutRef.current = setTimeout(() => {
        retry();
      }, retryDelay * retryCountRef.current); // Exponential backoff
    }
  }, [maxRetries, retryDelay, onError, autoRetry]);

  const retry = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRecovering: true
    }));

    // Simulate recovery process
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        hasError: false,
        error: null,
        isRecovering: false,
        canRetry: retryCountRef.current < maxRetries
      }));

      onRecovery?.();
    }, 500);
  }, [maxRetries, onRecovery]);

  const reset = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    retryCountRef.current = 0;
    setState({
      hasError: false,
      error: null,
      errorCount: 0,
      isRecovering: false,
      canRetry: true
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      hasError: false,
      error: null,
      isRecovering: false
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return {
    ...state,
    reportError,
    retry,
    reset,
    clearError
  };
};

// Hook for wrapping async operations with error recovery
export const useAsyncErrorRecovery = <T extends any[], R>(
  asyncFn: (...args: T) => Promise<R>,
  options: ErrorRecoveryOptions = {}
) => {
  const errorRecovery = useErrorRecovery(options);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<R | null>(null);

  const execute = useCallback(async (...args: T): Promise<R | null> => {
    setIsLoading(true);
    errorRecovery.clearError();

    try {
      const result = await asyncFn(...args);
      setData(result);
      errorRecovery.reset();
      return result;
    } catch (error) {
      errorRecovery.reportError(error as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [asyncFn, errorRecovery]);

  const retryExecution = useCallback(async (...args: T): Promise<R | null> => {
    if (!errorRecovery.canRetry) return null;
    
    errorRecovery.retry();
    return execute(...args);
  }, [execute, errorRecovery]);

  return {
    ...errorRecovery,
    isLoading,
    data,
    execute,
    retryExecution
  };
};

export default useErrorRecovery;