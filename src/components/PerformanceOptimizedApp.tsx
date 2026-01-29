/**
 * Performance Optimized App Wrapper
 * Integrates all performance optimizations including caching, lazy loading, and monitoring
 */

import React, { useEffect, useState } from 'react';
import { performanceOptimizationManager } from '@/utils/PerformanceOptimizationManager';
import { enhancedCourseDataService } from '@/services/EnhancedCourseDataService';
import { optimizedApiService } from '@/services/OptimizedApiService';
import { performanceMonitor } from '@/utils/performanceMonitor';
import PerformanceOptimizationMonitor from './PerformanceOptimizationMonitor';

interface PerformanceOptimizedAppProps {
  children: React.ReactNode;
  userId?: string;
  userRole?: 'admin' | 'user';
  enableMonitoring?: boolean;
}

export const PerformanceOptimizedApp: React.FC<PerformanceOptimizedAppProps> = ({
  children,
  userId,
  userRole,
  enableMonitoring = import.meta.env.DEV
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  useEffect(() => {
    const initializePerformanceOptimizations = async () => {
      try {
        console.log('🚀 Initializing performance optimizations...');
        
        // Initialize performance optimization manager
        await performanceOptimizationManager.initialize({
          enableAdvancedCaching: true,
          enableQueryOptimization: true,
          enableLazyLoading: true,
          enablePreloading: true,
          enablePerformanceMonitoring: enableMonitoring
        });

        // Optimize for specific user context
        if (userId) {
          if (userRole === 'admin') {
            await performanceOptimizationManager.optimizeForAdmin();
          } else {
            await performanceOptimizationManager.optimizeForUser(userId);
          }
        }

        // Preload frequently accessed data
        await enhancedCourseDataService.preloadFrequentData(userId);

        // Prefetch critical API endpoints
        const criticalEndpoints = [
          '/api/courses',
          '/api/featured-courses'
        ];
        
        if (userId) {
          criticalEndpoints.push(`/api/users/${userId}/enrollments`);
        }

        await optimizedApiService.prefetch(criticalEndpoints, {
          priority: 'high',
          useCache: true
        });

        // Track page load performance
        performanceMonitor.trackPageLoad('app-initialization');

        setIsInitialized(true);
        console.log('✅ Performance optimizations initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize performance optimizations:', error);
        setInitializationError(error instanceof Error ? error.message : 'Unknown error');
        setIsInitialized(true); // Still render the app even if optimizations fail
      }
    };

    initializePerformanceOptimizations();

    // Cleanup on unmount
    return () => {
      performanceOptimizationManager.destroy();
    };
  }, [userId, userRole, enableMonitoring]);

  // Show loading state during initialization
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Optimizing performance...</p>
        </div>
      </div>
    );
  }

  // Show error state if initialization failed
  if (initializationError) {
    console.warn('Performance optimizations failed, continuing without optimizations:', initializationError);
  }

  return (
    <>
      {children}
      {enableMonitoring && <PerformanceOptimizationMonitor />}
    </>
  );
};

/**
 * Hook for accessing performance optimization features
 */
export const usePerformanceOptimizations = () => {
  const clearCache = (patterns?: string[]) => {
    optimizedApiService.clearCache(patterns);
    enhancedCourseDataService.invalidateCache({});
  };

  const getPerformanceStats = () => {
    return {
      optimizationManager: performanceOptimizationManager.getPerformanceReport(),
      courseDataService: enhancedCourseDataService.getCacheStats(),
      apiService: optimizedApiService.getPerformanceStats(),
      monitor: performanceMonitor.getSummary()
    };
  };

  const preloadUserData = async (userId: string) => {
    await enhancedCourseDataService.preloadFrequentData(userId);
    await performanceOptimizationManager.optimizeForUser(userId);
  };

  const preloadAdminData = async () => {
    await performanceOptimizationManager.optimizeForAdmin();
  };

  return {
    clearCache,
    getPerformanceStats,
    preloadUserData,
    preloadAdminData
  };
};

export default PerformanceOptimizedApp;