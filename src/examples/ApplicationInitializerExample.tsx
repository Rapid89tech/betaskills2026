import React from 'react';
import { ApplicationInitializer } from '../components/ApplicationInitializer';
import { useApplicationInitializer } from '../hooks/useApplicationInitializer';
import { InitializationSteps } from '../services/InitializationSteps';

// Example of a custom loading component
const CustomLoadingComponent: React.FC<{
  progress: number;
  currentStep: string | null;
  message?: string;
}> = ({ progress, currentStep, message }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
          <div 
            className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
            style={{ 
              transform: `rotate(${(progress / 100) * 360}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Setting Up Your Experience
        </h2>
        <p className="text-gray-600">
          Please wait while we prepare everything for you...
        </p>
      </div>

      <div className="space-y-4">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Current step */}
        {currentStep && (
          <div className="text-sm text-gray-700">
            <span className="font-medium">Current step:</span>
            <span className="ml-2 capitalize">{currentStep.replace('-', ' ')}</span>
          </div>
        )}

        {/* Progress message */}
        {message && (
          <div className="text-sm text-gray-500 italic">
            {message}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Example of a custom error fallback component
const CustomErrorComponent: React.FC<{ error: Error }> = ({ error }) => (
  <div className="min-h-screen bg-red-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4 border-l-4 border-red-500">
      <div className="text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Initialization Failed
        </h2>
        <p className="text-gray-600 mb-4">
          We encountered an issue while setting up the application.
        </p>
        <div className="bg-red-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-red-700 font-mono">
            {error.message}
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Reload Application
        </button>
      </div>
    </div>
  </div>
);

// Example of using the ApplicationInitializer with custom configuration
export const ApplicationInitializerExample: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ApplicationInitializer
      showProgress={true}
      loadingComponent={CustomLoadingComponent}
      fallbackComponent={CustomErrorComponent}
      onInitializationComplete={() => {
        console.log('Application initialization completed successfully!');
      }}
    >
      {children}
    </ApplicationInitializer>
  );
};

// Example of using the hook directly for more control
export const ManualInitializationExample: React.FC = () => {
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
    autoStart: false, // Don't auto-start, we'll control it manually
    onProgress: (progressInfo) => {
      console.log('Initialization progress:', progressInfo);
    },
    onComplete: (result) => {
      console.log('Initialization completed:', result);
    },
    onError: (error) => {
      console.error('Initialization error:', error);
    }
  });

  const handleInitialize = async () => {
    try {
      // Use custom configuration
      const customConfig = {
        steps: InitializationSteps.getDefaultSteps(),
        maxTimeout: 10000, // 10 seconds
        enableFallbacks: true,
        retryFailedSteps: true
      };
      
      await initialize(customConfig);
    } catch (err) {
      console.error('Failed to initialize:', err);
    }
  };

  if (isInitializing) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Initializing Application...</h2>
        <div className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>Current step: {currentStep || 'Starting...'}</p>
          <p>Progress: {Math.round(progress)}%</p>
          <div className="text-sm text-gray-600">
            <p>Completed: {status.completedSteps.length} steps</p>
            <p>Failed: {status.failedSteps.length} steps</p>
            <p>Total: {status.totalSteps} steps</p>
          </div>
        </div>
      </div>
    );
  }

  if (hasErrors) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Initialization Failed</h2>
        <p className="text-red-700 mb-4">{getErrorMessage()}</p>
        {result && (
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Details:</h3>
            <p>Completed steps: {result.completedSteps.join(', ') || 'None'}</p>
            <p>Failed steps: {result.failedSteps.join(', ') || 'None'}</p>
            <p>Fallbacks used: {result.fallbacksUsed.join(', ') || 'None'}</p>
            <p>Total time: {result.totalTime}ms</p>
          </div>
        )}
        <div className="space-x-2">
          <button
            onClick={handleInitialize}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
          <button
            onClick={reset}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }

  if (isComplete && isSuccess) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold text-green-600 mb-4">
          ✅ Application Initialized Successfully!
        </h2>
        {result && (
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Summary:</h3>
            <p>Completed steps: {result.completedSteps.join(', ')}</p>
            <p>Fallbacks used: {result.fallbacksUsed.join(', ') || 'None'}</p>
            <p>Total time: {result.totalTime}ms</p>
          </div>
        )}
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Reset for Demo
        </button>
      </div>
    );
  }

  // Not initialized yet
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Application Initializer Demo</h2>
      <p className="text-gray-600 mb-4">
        Click the button below to start the application initialization process.
      </p>
      <button
        onClick={handleInitialize}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Initialize Application
      </button>
    </div>
  );
};