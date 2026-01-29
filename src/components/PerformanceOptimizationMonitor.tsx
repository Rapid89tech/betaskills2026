/**
 * Performance Optimization Monitor
 * Displays real-time performance metrics and cache statistics for development
 */

import React, { useState, useEffect } from 'react';
import { advancedCacheManager, courseDataCache, enrollmentDataCache, userDataCache } from '@/utils/AdvancedCacheManager';
import { databaseQueryOptimizer } from '@/utils/DatabaseQueryOptimizer';
import { loadingOptimizer } from '@/utils/loadingOptimizer';
import { fastDataService } from '@/services/FastDataService';

interface PerformanceMetrics {
  cacheStats: {
    advanced: any;
    course: any;
    enrollment: any;
    user: any;
  };
  loadingStats: any;
  queryStats: any;
  serviceStats: any;
}

export const PerformanceOptimizationMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Only show in development
  if (!import.meta.env.DEV) {
    return null;
  }

  useEffect(() => {
    const updateMetrics = () => {
      try {
        const newMetrics: PerformanceMetrics = {
          cacheStats: {
            advanced: advancedCacheManager.getStats(),
            course: courseDataCache.getStats(),
            enrollment: enrollmentDataCache.getStats(),
            user: userDataCache.getStats()
          },
          loadingStats: loadingOptimizer.getCacheStats(),
          queryStats: databaseQueryOptimizer.getPerformanceStats(),
          serviceStats: fastDataService.getPerformanceStats()
        };
        setMetrics(newMetrics);
      } catch (error) {
        console.warn('Failed to update performance metrics:', error);
      }
    };

    // Initial load
    updateMetrics();

    // Auto-refresh if enabled
    let interval: NodeJS.Timeout | null = null;
    if (autoRefresh) {
      interval = setInterval(updateMetrics, 2000); // Update every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const handleClearCache = (cacheType: string) => {
    switch (cacheType) {
      case 'all':
        advancedCacheManager.clear();
        courseDataCache.clear();
        enrollmentDataCache.clear();
        userDataCache.clear();
        loadingOptimizer.clearCache();
        fastDataService.clearCache();
        break;
      case 'course':
        courseDataCache.clear();
        break;
      case 'enrollment':
        enrollmentDataCache.clear();
        break;
      case 'user':
        userDataCache.clear();
        break;
      case 'loading':
        loadingOptimizer.clearCache();
        break;
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm"
        >
          📊 Performance
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-xl max-w-md w-80 max-h-96 overflow-y-auto">
      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-sm">Performance Monitor</h3>
        <div className="flex items-center space-x-2">
          <label className="flex items-center text-xs">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="mr-1"
            />
            Auto
          </label>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>

      {metrics && (
        <div className="p-3 space-y-3 text-xs">
          {/* Cache Statistics */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Cache Performance</h4>
            <div className="space-y-2">
              {Object.entries(metrics.cacheStats).map(([type, stats]: [string, any]) => (
                <div key={type} className="bg-gray-50 p-2 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium capitalize">{type}</span>
                    <button
                      onClick={() => handleClearCache(type)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                    <div>Hit Rate: {stats.hitRate?.toFixed(1) || 0}%</div>
                    <div>Entries: {stats.entryCount || 0}</div>
                    <div>Memory: {stats.memoryUsage?.toFixed(1) || 0}MB</div>
                    <div>Requests: {stats.totalRequests || 0}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loading Optimizer Stats */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Loading Optimizer</h4>
            <div className="bg-gray-50 p-2 rounded">
              <div className="flex justify-between items-center mb-1">
                <span>API Cache</span>
                <button
                  onClick={() => handleClearCache('loading')}
                  className="text-red-600 hover:text-red-800 text-xs"
                >
                  Clear
                </button>
              </div>
              <div className="text-xs text-gray-600">
                <div>Size: {metrics.loadingStats.size || 0}</div>
                <div>Keys: {metrics.loadingStats.keys?.length || 0}</div>
              </div>
            </div>
          </div>

          {/* Query Optimizer Stats */}
          {metrics.queryStats && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Query Optimizer</h4>
              <div className="bg-gray-50 p-2 rounded text-xs text-gray-600">
                <div>Cache Hit Rate: {metrics.queryStats.cache?.hitRate?.toFixed(1) || 0}%</div>
                <div>Cache Size: {metrics.queryStats.cache?.cacheSize || 0}</div>
                <div>Memory Usage: {metrics.queryStats.cache?.memoryUsage?.toFixed(1) || 0}MB</div>
              </div>
            </div>
          )}

          {/* Service Stats */}
          {metrics.serviceStats && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Service Performance</h4>
              <div className="bg-gray-50 p-2 rounded text-xs text-gray-600">
                <div>Legacy Cache: {metrics.serviceStats.legacyCache?.size || 0} entries</div>
                <div>Advanced Cache: {metrics.serviceStats.advancedCache?.entryCount || 0} entries</div>
                <div>Enrollment Cache: {metrics.serviceStats.enrollmentCache?.entryCount || 0} entries</div>
                <div>User Cache: {metrics.serviceStats.userCache?.entryCount || 0} entries</div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={() => handleClearCache('all')}
              className="w-full bg-red-600 text-white py-1 px-2 rounded text-xs hover:bg-red-700 transition-colors"
            >
              Clear All Caches
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceOptimizationMonitor;