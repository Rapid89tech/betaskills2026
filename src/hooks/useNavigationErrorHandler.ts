/**
 * React Hook for Navigation Error Handling
 * Provides easy access to navigation error handling in React components
 */

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  NavigationError, 
  NavigationErrorType, 
  NavigationContext,
  ErrorRecoveryAction,
  NavigationErrorResult
} from '../types/navigationError';
import { navigationErrorHandler } from '../services/NavigationErrorHandler';

interface UseNavigationErrorHandlerReturn {
  error: NavigationError | null;
  recoveryActions: ErrorRecoveryAction[];
  isRetrying: boolean;
  canRetry: boolean;
  handleError: (error: NavigationError) => void;
  createError: (type: NavigationErrorType, message: string, details?: Record<string, any>) => NavigationError;
  clearError: () => void;
  retry: () => Promise<void>;
  executeRecoveryAction: (action: ErrorRecoveryAction) => Promise<void>;
  // Convenience methods
  createCourseNotFoundError: (courseId: string) => NavigationError;
  createAccessDeniedError: (courseId: string, userId: string) => NavigationError;
  createEnrollmentInvalidError: (courseId: string, userId: string) => NavigationError;
  createContentUnavailableError: (courseId: string) => NavigationError;
  createLoadingFailedError: (courseId: string, originalError?: Error) => NavigationError;
  createNetworkError: (originalError?: Error) => NavigationError;
}

export const useNavigationErrorHandler = (
  componentName: string,
  currentRoute?: string
): UseNavigationErrorHandlerReturn => {
  const navigate = useNavigate();
  const [errorResult, setErrorResult] = useState<NavigationErrorResult | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  /**
   * Create navigation context for current component
   */
  const createContext = useCallback((): NavigationContext => {
    return {
      route: currentRoute || window.location.pathname,
      component: componentName,
      userAgent: navigator.userAgent,
      sessionId: sessionStorage.getItem('sessionId') || undefined,
      previousRoute: document.referrer || undefined,
      timestamp: new Date()
    };
  }, [componentName, currentRoute]);

  /**
   * Handle navigation error
   */
  const handleError = useCallback((error: NavigationError) => {
    const result = navigationErrorHandler.handleError(error);
    setErrorResult(result);
  }, []);

  /**
   * Create navigation error with current context
   */
  const createError = useCallback((
    type: NavigationErrorType,
    message: string,
    details: Record<string, any> = {}
  ): NavigationError => {
    const context = createContext();
    return navigationErrorHandler.createError(type, message, context, details);
  }, [createContext]);

  /**
   * Clear current error
   */
  const clearError = useCallback(() => {
    setErrorResult(null);
    setIsRetrying(false);
  }, []);

  /**
   * Retry the failed operation
   */
  const retry = useCallback(async () => {
    if (!errorResult?.canRetry) return;

    setIsRetrying(true);
    
    try {
      // Find and execute retry action
      const retryAction = errorResult.recoveryActions.find(
        action => action.type === 'retry'
      );
      
      if (retryAction) {
        await retryAction.action();
        navigationErrorHandler.recordSuccessfulRecovery(errorResult.error.type);
        clearError();
      }
    } catch (retryError) {
      navigationErrorHandler.recordFailedRecovery(errorResult.error.type);
      console.error('❌ Retry failed:', retryError);
    } finally {
      setIsRetrying(false);
    }
  }, [errorResult, clearError]);

  /**
   * Execute a specific recovery action
   */
  const executeRecoveryAction = useCallback(async (action: ErrorRecoveryAction) => {
    try {
      await action.action();
      
      if (errorResult) {
        navigationErrorHandler.recordSuccessfulRecovery(errorResult.error.type);
      }
      
      // Clear error after successful recovery action
      if (action.type !== 'retry') {
        clearError();
      }
    } catch (actionError) {
      if (errorResult) {
        navigationErrorHandler.recordFailedRecovery(errorResult.error.type);
      }
      console.error('❌ Recovery action failed:', actionError);
    }
  }, [errorResult, clearError]);

  /**
   * Enhanced error creation methods for common scenarios
   */
  const createCourseNotFoundError = useCallback((courseId: string) => {
    const context = createContext();
    return navigationErrorHandler.createCourseNotFoundError(courseId, context);
  }, [createContext]);

  const createAccessDeniedError = useCallback((courseId: string, userId: string) => {
    const context = createContext();
    return navigationErrorHandler.createAccessDeniedError(courseId, userId, context);
  }, [createContext]);

  const createEnrollmentInvalidError = useCallback((courseId: string, userId: string) => {
    const context = createContext();
    return navigationErrorHandler.createEnrollmentInvalidError(courseId, userId, context);
  }, [createContext]);

  const createContentUnavailableError = useCallback((courseId: string) => {
    const context = createContext();
    return navigationErrorHandler.createContentUnavailableError(courseId, context);
  }, [createContext]);

  const createLoadingFailedError = useCallback((courseId: string, originalError?: Error) => {
    const context = createContext();
    return navigationErrorHandler.createLoadingFailedError(courseId, context, originalError);
  }, [createContext]);

  const createNetworkError = useCallback((originalError?: Error) => {
    const context = createContext();
    return navigationErrorHandler.createNetworkError(context, originalError);
  }, [createContext]);

  return {
    error: errorResult?.error || null,
    recoveryActions: errorResult?.recoveryActions || [],
    isRetrying,
    canRetry: errorResult?.canRetry || false,
    handleError,
    createError,
    clearError,
    retry,
    executeRecoveryAction,
    // Convenience methods
    createCourseNotFoundError,
    createAccessDeniedError,
    createEnrollmentInvalidError,
    createContentUnavailableError,
    createLoadingFailedError,
    createNetworkError
  };
};

export default useNavigationErrorHandler;