import { useCallback, useEffect } from 'react';
import { errorHandler, type ApiError, type UserFriendlyError } from '@/utils/ErrorHandler';

interface UseErrorHandlerOptions {
  onError?: (error: Error, context: string) => void;
  context?: string;
}

interface UseErrorHandlerReturn {
  handleError: (error: Error, context?: string) => void;
  handleApiError: (error: ApiError) => UserFriendlyError;
  showErrorMessage: (message: string, actions?: Array<{ label: string; action: () => void; primary?: boolean }>) => void;
}

/**
 * Hook for handling errors in functional components
 */
export const useErrorHandler = (options: UseErrorHandlerOptions = {}): UseErrorHandlerReturn => {
  const { onError, context = 'Component' } = options;

  // Register error listener on mount
  useEffect(() => {
    if (onError) {
      errorHandler.addErrorListener(onError);
      
      return () => {
        errorHandler.removeErrorListener(onError);
      };
    }
  }, [onError]);

  const handleError = useCallback((error: Error, errorContext?: string) => {
    const finalContext = errorContext || context;
    errorHandler.handleError(error, finalContext);
  }, [context]);

  const handleApiError = useCallback((error: ApiError) => {
    return errorHandler.handleApiError(error);
  }, []);

  const showErrorMessage = useCallback((message: string, actions = []) => {
    errorHandler.showErrorMessage(message, actions);
  }, []);

  return {
    handleError,
    handleApiError,
    showErrorMessage
  };
};

/**
 * Hook for handling async operations with automatic error handling
 */
export const useAsyncErrorHandler = (context = 'AsyncOperation') => {
  const { handleError } = useErrorHandler({ context });

  const executeWithErrorHandling = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    errorContext?: string
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error as Error, errorContext);
      return null;
    }
  }, [handleError]);

  return { executeWithErrorHandling };
};

export default useErrorHandler;