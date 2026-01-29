import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface OptimizedLoadingSpinnerProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
  timeout?: number;
  onTimeout?: () => void;
  onRetry?: () => void;
  className?: string;
}

const OptimizedLoadingSpinner: React.FC<OptimizedLoadingSpinnerProps> = ({
  message = 'Loading...',
  showProgress = false,
  progress = 0,
  timeout = 15000, // 15 seconds default timeout
  onTimeout,
  onRetry,
  className = ''
}) => {
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);
      
      if (elapsed >= timeout) {
        setHasTimedOut(true);
        clearInterval(timer);
        onTimeout?.();
      }
    }, 100);

    return () => clearInterval(timer);
  }, [timeout, onTimeout]);

  if (hasTimedOut) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
        <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Loading is taking longer than expected
        </h3>
        <p className="text-gray-600 text-center mb-4 max-w-md">
          This might be due to a slow connection or server issues. 
          You can wait a bit longer or try refreshing.
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Page
          </Button>
          {onRetry && (
            <Button
              onClick={() => {
                setHasTimedOut(false);
                setElapsedTime(0);
                onRetry();
              }}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      {/* Optimized spinner with CSS animation */}
      <div className="relative mb-4">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        {showProgress && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs font-medium text-blue-600">
              {Math.round(progress)}%
            </div>
          </div>
        )}
      </div>

      {/* Loading message */}
      <p className="text-gray-600 text-center mb-2 font-medium">
        {message}
      </p>

      {/* Progress bar */}
      {showProgress && (
        <div className="w-64 bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}

      {/* Elapsed time indicator */}
      <div className="text-xs text-gray-400 mt-2">
        {elapsedTime > 3000 && (
          <span>
            {Math.round(elapsedTime / 1000)}s elapsed
          </span>
        )}
      </div>

      {/* Tips for slow loading */}
      {elapsedTime > 5000 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg max-w-md">
          <p className="text-sm text-blue-700 text-center">
            💡 Tip: Check your internet connection or try refreshing the page
          </p>
        </div>
      )}
    </div>
  );
};

export default OptimizedLoadingSpinner;