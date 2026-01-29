import { useState, useEffect, useCallback } from 'react';
import { applicationInitializer } from '../services/ApplicationInitializer';
import { InitializationSteps } from '../services/InitializationSteps';
import {
  InitializationConfig,
  InitializationResult,
  InitializationStatus,
  InitializationProgress
} from '../types/initialization';

interface UseApplicationInitializerOptions {
  autoStart?: boolean;
  customSteps?: InitializationConfig;
  onProgress?: (progress: InitializationProgress) => void;
  onComplete?: (result: InitializationResult) => void;
  onError?: (error: Error) => void;
}

export function useApplicationInitializer(options: UseApplicationInitializerOptions = {}) {
  const [status, setStatus] = useState<InitializationStatus>(
    applicationInitializer.getInitializationStatus()
  );
  const [result, setResult] = useState<InitializationResult | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Initialize the application
  const initialize = useCallback(async (customConfig?: InitializationConfig) => {
    try {
      setError(null);
      setResult(null);

      const config = customConfig || options.customSteps || {
        steps: InitializationSteps.getDefaultSteps(),
        maxTimeout: 15000,
        enableFallbacks: true,
        retryFailedSteps: true
      };

      const initResult = await applicationInitializer.initialize(config);
      setResult(initResult);
      
      if (options.onComplete) {
        options.onComplete(initResult);
      }

      if (!initResult.success) {
        const error = new Error(
          `Initialization failed. Failed steps: ${initResult.failedSteps.join(', ')}`
        );
        setError(error);
        if (options.onError) {
          options.onError(error);
        }
      }

      return initResult;
    } catch (err) {
      const error = err as Error;
      setError(error);
      if (options.onError) {
        options.onError(error);
      }
      throw error;
    }
  }, [options]);

  // Reset the initializer
  const reset = useCallback(() => {
    applicationInitializer.reset();
    setStatus(applicationInitializer.getInitializationStatus());
    setResult(null);
    setError(null);
  }, []);

  // Set up progress monitoring
  useEffect(() => {
    const unsubscribeProgress = applicationInitializer.onProgress((progress) => {
      setStatus(applicationInitializer.getInitializationStatus());
      if (options.onProgress) {
        options.onProgress(progress);
      }
    });

    // Update status periodically during initialization
    const statusInterval = setInterval(() => {
      if (applicationInitializer.isInitializing()) {
        setStatus(applicationInitializer.getInitializationStatus());
      }
    }, 100);

    return () => {
      unsubscribeProgress();
      clearInterval(statusInterval);
    };
  }, [options.onProgress]);

  // Auto-start initialization if requested
  useEffect(() => {
    if (options.autoStart && !status.isInitializing && !result) {
      initialize();
    }
  }, [options.autoStart, status.isInitializing, result, initialize]);

  return {
    // State
    status,
    result,
    error,
    isInitializing: status.isInitializing,
    isComplete: result !== null,
    isSuccess: result?.success ?? false,
    
    // Actions
    initialize,
    reset,
    
    // Computed values
    progress: status.progress,
    currentStep: status.currentStep,
    completedSteps: status.completedSteps,
    failedSteps: status.failedSteps,
    totalSteps: status.totalSteps,
    
    // Helper functions
    hasErrors: error !== null || (result && !result.success),
    getErrorMessage: () => {
      if (error) return error.message;
      if (result && !result.success) {
        return `Initialization failed: ${result.errors.map(e => e.message).join(', ')}`;
      }
      return null;
    }
  };
}