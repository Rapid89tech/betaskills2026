import React, { useState, useEffect } from 'react';
import { Loader2, Wifi, WifiOff } from 'lucide-react';
import { performanceMonitor } from '@/utils/performanceMonitor';

interface EnhancedLoadingSpinnerProps {
  message?: string;
  showProgress?: boolean;
  timeout?: number;
}

/**
 * Enhanced loading spinner with performance monitoring and better UX
 */
const EnhancedLoadingSpinner: React.FC<EnhancedLoadingSpinnerProps> = ({
  message = "Loading...",
  showProgress = false,
  timeout = 10000 // 10 second timeout
}) => {
  const [loadingTime, setLoadingTime] = useState(0);
  const [isSlowLoading, setIsSlowLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const startTime = Date.now();
    
    // Track loading time
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setLoadingTime(elapsed);
      
      // Mark as slow loading after 3 seconds
      if (elapsed > 3000 && !isSlowLoading) {
        setIsSlowLoading(true);
        performanceMonitor.startMeasure('slow-loading-detected', 'component');
      }
    }, 100);

    // Handle online/offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (isSlowLoading) {
        performanceMonitor.endMeasure('slow-loading-detected');
      }
    };
  }, [isSlowLoading]);

  const getLoadingMessage = () => {
    if (isOffline) {
      return "You appear to be offline. Checking connection...";
    }
    
    if (isSlowLoading) {
      return "This is taking longer than usual. Please wait...";
    }
    
    return message;
  };

  const getProgressPercentage = () => {
    if (!showProgress) return 0;
    
    // Simulate progress based on loading time
    const maxTime = timeout;
    const progress = Math.min((loadingTime / maxTime) * 100, 90); // Cap at 90%
    return progress;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="relative">
        {/* Main spinner */}
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        
        {/* Network status indicator */}
        <div className="absolute -top-2 -right-2">
          {isOffline ? (
            <WifiOff className="h-4 w-4 text-red-500" />
          ) : (
            <Wifi className="h-4 w-4 text-green-500" />
          )}
        </div>
      </div>
      
      {/* Loading message */}
      <p className="mt-4 text-sm text-muted-foreground text-center max-w-xs">
        {getLoadingMessage()}
      </p>
      
      {/* Progress bar */}
      {showProgress && (
        <div className="w-48 mt-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Loading time indicator (development only) */}
      {import.meta.env.DEV && (
        <p className="mt-2 text-xs text-gray-400">
          {(loadingTime / 1000).toFixed(1)}s
        </p>
      )}
      
      {/* Slow loading warning */}
      {isSlowLoading && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md max-w-xs">
          <p className="text-xs text-yellow-800">
            Loading is slower than expected. This might be due to:
          </p>
          <ul className="text-xs text-yellow-700 mt-1 list-disc list-inside">
            <li>Slow network connection</li>
            <li>Large component size</li>
            <li>Server response delay</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EnhancedLoadingSpinner;