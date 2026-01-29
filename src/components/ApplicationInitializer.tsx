import React from 'react';
import { useApplicationInitializer } from '../hooks/useApplicationInitializer';
import { InitializationProgress } from '../types/initialization';

interface ApplicationInitializerProps {
  children: React.ReactNode;
  showProgress?: boolean;
  fallbackComponent?: React.ComponentType<{ error: Error }>;
  loadingComponent?: React.ComponentType<{ 
    progress: number; 
    currentStep: string | null;
    message?: string;
  }>;
  onInitializationComplete?: () => void;
}

export function ApplicationInitializer({
  children,
  showProgress = true,
  fallbackComponent: FallbackComponent,
  loadingComponent: LoadingComponent,
  onInitializationComplete
}: ApplicationInitializerProps) {
  const [progressMessage, setProgressMessage] = React.useState<string>('');

  const {
    status,
    result,
    error,
    isInitializing,
    isComplete,
    isSuccess,
    initialize,
    reset,
    progress,
    currentStep,
    hasErrors,
    getErrorMessage
  } = useApplicationInitializer({
    autoStart: true,
    onProgress: (progressInfo: InitializationProgress) => {
      setProgressMessage(progressInfo.message);
    },
    onComplete: () => {
      if (onInitializationComplete) {
        onInitializationComplete();
      }
    }
  });

  // Show loading state during initialization
  if (isInitializing) {
    if (LoadingComponent) {
      return (
        <LoadingComponent 
          progress={progress} 
          currentStep={currentStep}
          message={progressMessage}
        />
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800">Initializing Application</h2>
            <p className="text-gray-600 mt-2">Please wait while we set up your experience...</p>
          </div>

          {showProgress && (
            <div className="space-y-4">
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Current step */}
              {currentStep && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Current step:</span> {currentStep}
                </div>
              )}

              {/* Progress message */}
              {progressMessage && (
                <div className="text-sm text-gray-500">
                  {progressMessage}
                </div>
              )}

              {/* Step counter */}
              <div className="text-xs text-gray-400">
                {status.completedSteps.length} of {status.totalSteps} steps completed
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show error state if initialization failed
  if (hasErrors) {
    if (FallbackComponent && error) {
      return <FallbackComponent error={error} />;
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Initialization Failed</h2>
            <p className="text-gray-600 mb-4">
              {getErrorMessage() || 'An error occurred while initializing the application.'}
            </p>

            {result && result.failedSteps.length > 0 && (
              <div className="text-left mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Failed steps:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {result.failedSteps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-red-500 mr-2">•</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={() => initialize()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Retry Initialization
              </button>
              <button
                onClick={reset}
                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show success state briefly before rendering children
  if (isComplete && isSuccess) {
    return <>{children}</>;
  }

  // Fallback loading state
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}