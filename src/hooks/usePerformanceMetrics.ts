import { useEffect, useState, useCallback } from 'react';
import { performanceMonitor } from '../utils/performanceMonitor';
import { performanceOptimizer } from '../utils/performanceOptimizer';

/**
 * Hook for collecting and monitoring performance metrics
 */

interface PerformanceMetrics {
  pageLoadTime: number | null;
  apiResponseTime: number | null;
  componentRenderTime: number | null;
  memoryUsage: number | null;
  performanceScore: number | null;
  isLoading: boolean;
}

interface UsePerformanceMetricsOptions {
  trackPageLoad?: boolean;
  trackApiCalls?: boolean;
  trackComponentRender?: boolean;
  trackMemoryUsage?: boolean;
  autoOptimize?: boolean;
  componentName?: string;
}

export const usePerformanceMetrics = (options: UsePerformanceMetricsOptions = {}) => {
  const {
    trackPageLoad = true,
    trackApiCalls = true,
    trackComponentRender = false,
    trackMemoryUsage = false,
    autoOptimize = false,
    componentName = 'UnknownComponent'
  } = options;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: null,
    apiResponseTime: null,
    componentRenderTime: null,
    memoryUsage: null,
    performanceScore: null,
    isLoading: true
  });

  const [optimizationSuggestions, setOptimizationSuggestions] = useState<any[]>([]);

  // Track component render performance
  useEffect(() => {
    if (!trackComponentRender) return;

    const startTime = performance.now();
    performanceMonitor.startMeasure(`${componentName}-render`, 'component');

    return () => {
      const renderTime = performance.now() - startTime;
      performanceMonitor.endMeasure(`${componentName}-render`);
      
      setMetrics(prev => ({
        ...prev,
        componentRenderTime: renderTime
      }));
    };
  }, [trackComponentRender, componentName]);

  // Track page load performance
  useEffect(() => {
    if (!trackPageLoad) return;

    const measurePageLoad = () => {
      if (document.readyState === 'complete') {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.navigationStart;
          setMetrics(prev => ({
            ...prev,
            pageLoadTime: loadTime
          }));
        }
      }
    };

    if (document.readyState === 'complete') {
      measurePageLoad();
    } else {
      window.addEventListener('load', measurePageLoad);
      return () => window.removeEventListener('load', measurePageLoad);
    }
  }, [trackPageLoad]);

  // Track memory usage
  useEffect(() => {
    if (!trackMemoryUsage || !('memory' in performance)) return;

    const measureMemory = () => {
      const memory = (performance as any).memory;
      const memoryUsage = memory.usedJSHeapSize / (1024 * 1024); // Convert to MB
      
      setMetrics(prev => ({
        ...prev,
        memoryUsage
      }));
    };

    measureMemory();
    const interval = setInterval(measureMemory, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [trackMemoryUsage]);

  // Update performance score periodically
  useEffect(() => {
    const updatePerformanceScore = async () => {
      try {
        const health = performanceMonitor.getPerformanceHealth();
        const suggestions = performanceOptimizer.getOptimizationSuggestions();
        
        setMetrics(prev => ({
          ...prev,
          performanceScore: health.score,
          isLoading: false
        }));
        
        setOptimizationSuggestions(suggestions);

        // Apply automatic optimizations if enabled
        if (autoOptimize && health.score < 70) {
          await performanceOptimizer.applyAutomaticOptimizations();
        }
      } catch (error) {
        console.warn('Failed to update performance metrics:', error);
        setMetrics(prev => ({ ...prev, isLoading: false }));
      }
    };

    updatePerformanceScore();
    const interval = setInterval(updatePerformanceScore, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [autoOptimize]);

  // Measure API call performance
  const measureApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    callName: string = 'api-call'
  ): Promise<T> => {
    if (!trackApiCalls) return apiCall();

    const startTime = performance.now();
    performanceMonitor.startMeasure(callName, 'api');

    try {
      const result = await apiCall();
      const responseTime = performance.now() - startTime;
      
      performanceMonitor.endMeasure(callName);
      
      setMetrics(prev => ({
        ...prev,
        apiResponseTime: responseTime
      }));

      return result;
    } catch (error) {
      performanceMonitor.endMeasure(callName);
      throw error;
    }
  }, [trackApiCalls]);

  // Measure user interaction performance
  const measureUserInteraction = useCallback((
    interactionName: string,
    callback: () => void
  ) => {
    const startTime = performance.now();
    performanceMonitor.startMeasure(`interaction-${interactionName}`, 'user-interaction');

    callback();

    requestAnimationFrame(() => {
      const interactionTime = performance.now() - startTime;
      performanceMonitor.endMeasure(`interaction-${interactionName}`);
      
      // Log slow interactions
      if (interactionTime > 100) {
        console.warn(`Slow interaction detected: ${interactionName} took ${interactionTime.toFixed(2)}ms`);
      }
    });
  }, []);

  // Get performance summary
  const getPerformanceSummary = useCallback(() => {
    return {
      metrics,
      optimizationSuggestions,
      performanceHealth: performanceMonitor.getPerformanceHealth(),
      apiSummary: performanceMonitor.getApiPerformanceSummary(),
      pageLoadSummary: performanceMonitor.getPageLoadSummary()
    };
  }, [metrics, optimizationSuggestions]);

  // Apply specific optimization
  const applyOptimization = useCallback(async (optimizationId: string) => {
    try {
      const success = await performanceOptimizer.applyOptimization(optimizationId);
      if (success) {
        // Update suggestions after applying optimization
        const newSuggestions = performanceOptimizer.getOptimizationSuggestions();
        setOptimizationSuggestions(newSuggestions);
      }
      return success;
    } catch (error) {
      console.error('Failed to apply optimization:', error);
      return false;
    }
  }, []);

  // Clear performance metrics
  const clearMetrics = useCallback(() => {
    performanceMonitor.clear();
    setMetrics({
      pageLoadTime: null,
      apiResponseTime: null,
      componentRenderTime: null,
      memoryUsage: null,
      performanceScore: null,
      isLoading: false
    });
  }, []);

  return {
    metrics,
    optimizationSuggestions,
    measureApiCall,
    measureUserInteraction,
    getPerformanceSummary,
    applyOptimization,
    clearMetrics,
    isEnabled: import.meta.env.DEV || localStorage.getItem('enablePerformanceMonitoring') === 'true'
  };
};

/**
 * Hook for tracking component performance specifically
 */
export const useComponentPerformance = (componentName: string) => {
  return usePerformanceMetrics({
    trackComponentRender: true,
    trackPageLoad: false,
    trackApiCalls: false,
    componentName
  });
};

/**
 * Hook for tracking API performance specifically
 */
export const useApiPerformance = () => {
  return usePerformanceMetrics({
    trackApiCalls: true,
    trackPageLoad: false,
    trackComponentRender: false
  });
};

/**
 * Hook for comprehensive performance monitoring with auto-optimization
 */
export const useAutoPerformanceOptimization = () => {
  return usePerformanceMetrics({
    trackPageLoad: true,
    trackApiCalls: true,
    trackMemoryUsage: true,
    autoOptimize: true
  });
};

export default usePerformanceMetrics;