/**
 * Performance Optimizations Hook
 * Provides easy access to all performance optimization features
 */

import { useState, useEffect, useCallback } from 'react';
import { performanceOptimizationManager } from '@/utils/PerformanceOptimizationManager';
import { enhancedCourseDataService } from '@/services/EnhancedCourseDataService';
import { optimizedApiService } from '@/services/OptimizedApiService';
import { performanceMonitor } from '@/utils/performanceMonitor';

interface PerformanceStats {
  cacheEfficiency: {
    hitRate: number;
    memoryUsage: number;
    totalRequests: number;
  };
  apiPerformance: {
    averageResponseTime: number;
    errorRate: number;
    cacheHitRate: number;
  };
  loadingPerformance: {
    averageLoadTime: number;
    preloadedComponents: number;
  };
  recommendations: string[];
}

interface UsePerformanceOptimizationsOptions {
  enableAutoOptimization?: boolean;
  enableMonitoring?: boolean;
  userId?: string;
  userRole?: 'admin' | 'user';
}

export const usePerformanceOptimizations = (options: UsePerformanceOptimizationsOptions = {}) => {
  const {
    enableAutoOptimization = true,
    enableMonitoring = import.meta.env.DEV,
    userId,
    userRole
  } = options;

  const [isOptimized, setIsOptimized] = useState(false);
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize optimizations
  useEffect(() => {
    if (enableAutoOptimization) {
      initializeOptimizations();
    }
  }, [enableAutoOptimization, userId, userRole]);

  // Update stats periodically if monitoring is enabled
  useEffect(() => {
    if (enableMonitoring) {
      const interval = setInterval(() => {
        updateStats();
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [enableMonitoring]);

  const initializeOptimizations = useCallback(async () => {
    if (isOptimized) return;

    setIsLoading(true);
    try {
      // Initialize performance optimization manager
      await performanceOptimizationManager.initialize({
        enableAdvancedCaching: true,
        enableQueryOptimization: true,
        enableLazyLoading: true,
        enablePreloading: true,
        enablePerformanceMonitoring: enableMonitoring
      });

      // Optimize for user context
      if (userId) {
        if (userRole === 'admin') {
          await performanceOptimizationManager.optimizeForAdmin();
        } else {
          await performanceOptimizationManager.optimizeForUser(userId);
        }
      }

      // Preload frequently accessed data
      await enhancedCourseDataService.preloadFrequentData(userId);

      setIsOptimized(true);
      console.log('✅ Performance optimizations initialized');
    } catch (error) {
      console.error('❌ Failed to initialize performance optimizations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isOptimized, userId, userRole, enableMonitoring]);

  const updateStats = useCallback(() => {
    try {
      const optimizationReport = performanceOptimizationManager.getPerformanceReport();
      const courseStats = enhancedCourseDataService.getCacheStats();
      const apiStats = optimizedApiService.getPerformanceStats();
      const monitorStats = performanceMonitor.getSummary();

      const combinedStats: PerformanceStats = {
        cacheEfficiency: optimizationReport.cacheEfficiency,
        apiPerformance: {
          averageResponseTime: monitorStats.apiPerformanceSummary.averageResponseTime,
          errorRate: monitorStats.apiPerformanceSummary.errorRate,
          cacheHitRate: monitorStats.apiPerformanceSummary.cacheHitRate
        },
        loadingPerformance: optimizationReport.loadingPerformance,
        recommendations: [
          ...optimizationReport.recommendations,
          ...courseStats.recommendations
        ]
      };

      setStats(combinedStats);
    } catch (error) {
      console.warn('Failed to update performance stats:', error);
    }
  }, []);

  const clearAllCaches = useCallback(() => {
    performanceOptimizationManager.clearAllOptimizations();
    optimizedApiService.clearCache();
    enhancedCourseDataService.invalidateCache({});
    console.log('🧹 All caches cleared');
  }, []);

  const clearCacheByPattern = useCallback((patterns: string[]) => {
    optimizedApiService.clearCache(patterns);
    patterns.forEach(pattern => {
      enhancedCourseDataService.invalidateCache({ type: 'all' });
    });
    console.log('🧹 Cache cleared for patterns:', patterns);
  }, []);

  const preloadCourseData = useCallback(async (courseIds: string[]) => {
    const preloadPromises = courseIds.map(courseId =>
      enhancedCourseDataService.getCourseDetails(courseId, {
        userId,
        includeEnrollment: true,
        useCache: true
      }).catch(error => {
        console.warn(`Failed to preload course ${courseId}:`, error);
        return null;
      })
    );

    await Promise.allSettled(preloadPromises);
    console.log(`📦 Preloaded ${courseIds.length} courses`);
  }, [userId]);

  const preloadUserEnrollments = useCallback(async (targetUserId?: string) => {
    const userIdToUse = targetUserId || userId;
    if (!userIdToUse) return;

    try {
      await enhancedCourseDataService.getUserCourses(userIdToUse, {
        includeProgress: true,
        useCache: true
      });
      console.log(`📦 Preloaded enrollments for user ${userIdToUse}`);
    } catch (error) {
      console.warn('Failed to preload user enrollments:', error);
    }
  }, [userId]);

  const warmCache = useCallback(async (patterns: {
    popularCourses?: string[];
    userCategories?: string[];
    userId?: string;
  }) => {
    await enhancedCourseDataService.warmCache(patterns);
    console.log('🔥 Cache warmed with patterns:', patterns);
  }, []);

  const measureOperation = useCallback(<T,>(
    name: string,
    operation: () => Promise<T>
  ): Promise<T> => {
    return performanceMonitor.measureAsync(name, operation);
  }, []);

  const trackUserInteraction = useCallback((action: string, element?: string) => {
    performanceMonitor.trackUserInteraction(action, element);
  }, []);

  const getDetailedStats = useCallback(() => {
    return {
      optimizationManager: performanceOptimizationManager.getPerformanceReport(),
      courseDataService: enhancedCourseDataService.getCacheStats(),
      apiService: optimizedApiService.getPerformanceStats(),
      monitor: performanceMonitor.getSummary()
    };
  }, []);

  const optimizeForPage = useCallback(async (pageName: string) => {
    performanceMonitor.measurePageLoad(pageName);
    
    // Page-specific optimizations
    switch (pageName) {
      case 'courses':
        await enhancedCourseDataService.preloadFrequentData(userId);
        break;
      case 'dashboard':
        if (userId) {
          await preloadUserEnrollments(userId);
        }
        break;
      case 'admin':
        if (userRole === 'admin') {
          await performanceOptimizationManager.optimizeForAdmin();
        }
        break;
    }
  }, [userId, userRole, preloadUserEnrollments]);

  return {
    // State
    isOptimized,
    isLoading,
    stats,

    // Actions
    initializeOptimizations,
    clearAllCaches,
    clearCacheByPattern,
    preloadCourseData,
    preloadUserEnrollments,
    warmCache,
    optimizeForPage,

    // Monitoring
    measureOperation,
    trackUserInteraction,
    updateStats,
    getDetailedStats
  };
};

export default usePerformanceOptimizations;