import React, { useEffect, useState } from 'react';
import { smartCacheManager } from '@/utils/smartCacheManager';

interface CacheManagerProps {
  children: React.ReactNode;
}

export const CacheManager: React.FC<CacheManagerProps> = ({ children }) => {
  const [cacheStatus, setCacheStatus] = useState<'checking' | 'valid' | 'invalid' | 'clearing'>('checking');
  const [showCacheWarning, setShowCacheWarning] = useState(false);

  useEffect(() => {
    const initializeCache = async () => {
      try {
        setCacheStatus('checking');
        
        // Smart cache manager handles everything automatically
        // No need for aggressive cache clearing or warnings
        const cacheStatus = smartCacheManager.getCacheStatus();
        console.log('✅ Smart cache manager initialized:', cacheStatus);
        
        setCacheStatus('valid');
      } catch (error) {
        console.error('Cache initialization error:', error);
        setCacheStatus('valid'); // Continue anyway
      }
    };

    initializeCache();
  }, []);

  const handleClearCache = async () => {
    try {
      setCacheStatus('clearing');
      smartCacheManager.forceSmartRefresh();
    } catch (error) {
      console.error('❌ Error clearing cache:', error);
    }
  };

  const handleForceReload = () => {
    smartCacheManager.forceSmartRefresh();
  };

  // Show cache warning overlay if needed
  if (showCacheWarning && cacheStatus === 'invalid') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md mx-4">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Cache Update Available</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            A new version of the application is available. Clearing the cache will ensure you get the latest updates.
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={handleClearCache}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear Cache & Continue
            </button>
            <button
              onClick={handleForceReload}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Force Reload
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading overlay while checking/clearing cache
  if (cacheStatus === 'checking' || cacheStatus === 'clearing') {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {cacheStatus === 'checking' ? 'Checking cache...' : 'Clearing cache...'}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Cache control button component for admin use
export const CacheControlButton: React.FC = () => {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = async () => {
    try {
      setIsClearing(true);
      smartCacheManager.forceSmartRefresh();
    } catch (error) {
      console.error('Error clearing cache:', error);
      alert('Error clearing cache. Please try again.');
      setIsClearing(false);
    }
  };

  return (
    <button
      onClick={handleClearCache}
      disabled={isClearing}
      className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700 text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isClearing ? 'Clearing...' : 'Clear Cache'}
    </button>
  );
};
