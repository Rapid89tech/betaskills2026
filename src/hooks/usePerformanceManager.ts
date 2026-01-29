import { useEffect, useCallback, useState } from 'react';
import { performanceManager } from '../utils/PerformanceManager';

/**
 * React hook for integrating with the PerformanceManager
 * Provides easy access to performance tracking and component loading
 */

interface UsePerformanceManagerOptions {
  trackMount?: boolean;
  trackInteractions?: boolean;
  preloadComponents?: string[];
  componentName?: string;
}

interface PerformanceHookReturn {
  loadComponent: (componentName: string) => Promise<React.ComponentType<any>>;
  preloadComponent: (componentName: string) => Promise<void>;
  trackInteraction: (action: string, element?: string) => void;
  measurePageLoad: (pageName: string) => void;
  isLoading: boolean;
  performanceSummary: any;
}

export const usePerformanceManager = (
  options: UsePerformanceManagerOptions = {}
): PerformanceHookReturn => {
  const {
    trackMount = true,
    trackInteractions = true,
    preloadComponents = [],
    componentName = 'unknown-component'
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [performanceSummary, setPerformanceSummary] = useState(null);

  // Track component mount/unmount
  useEffect(() => {
    if (trackMount) {
      performanceManager.trackUserInteraction('component-mount', componentName);
      
      return () => {
        performanceManager.trackUserInteraction('component-unmount', componentName);
      };
    }
  }, [trackMount, componentName]);

  // Preload specified components on mount
  useEffect(() => {
    if (preloadComponents.length > 0) {
      preloadComponents.forEach(component => {
        performanceManager.preloadComponent(component).catch(console.warn);
      });
    }
  }, [preloadComponents]);

  // Load component with loading state management
  const loadComponent = useCallback(async (componentName: string) => {
    setIsLoading(true);
    try {
      const component = await performanceManager.loadComponent(componentName);
      return component;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Preload component
  const preloadComponent = useCallback(async (componentName: string) => {
    return performanceManager.preloadComponent(componentName);
  }, []);

  // Track user interactions
  const trackInteraction = useCallback((action: string, element?: string) => {
    if (trackInteractions) {
      performanceManager.trackUserInteraction(action, element);
    }
  }, [trackInteractions]);

  // Measure page load
  const measurePageLoad = useCallback((pageName: string) => {
    performanceManager.measurePageLoad(pageName);
  }, []);

  // Get performance summary
  useEffect(() => {
    const updateSummary = () => {
      setPerformanceSummary(performanceManager.getPerformanceSummary());
    };

    // Update summary periodically
    const interval = setInterval(updateSummary, 5000);
    updateSummary(); // Initial update

    return () => clearInterval(interval);
  }, []);

  return {
    loadComponent,
    preloadComponent,
    trackInteraction,
    measurePageLoad,
    isLoading,
    performanceSummary
  };
};

/**
 * Hook specifically for tracking page performance
 */
export const usePagePerformance = (pageName: string) => {
  const { measurePageLoad, trackInteraction } = usePerformanceManager({
    componentName: `page-${pageName}`
  });

  useEffect(() => {
    measurePageLoad(pageName);
  }, [pageName, measurePageLoad]);

  return { trackInteraction };
};

/**
 * Hook for preloading components based on user behavior
 */
export const useSmartPreloading = () => {
  const [preloadQueue, setPreloadQueue] = useState<string[]>([]);

  const addToPreloadQueue = useCallback((componentName: string) => {
    setPreloadQueue(prev => {
      if (!prev.includes(componentName)) {
        return [...prev, componentName];
      }
      return prev;
    });
  }, []);

  const processPreloadQueue = useCallback(async () => {
    for (const componentName of preloadQueue) {
      try {
        await performanceManager.preloadComponent(componentName);
      } catch (error) {
        console.warn(`Failed to preload ${componentName}:`, error);
      }
    }
    setPreloadQueue([]);
  }, [preloadQueue]);

  // Process queue when it changes
  useEffect(() => {
    if (preloadQueue.length > 0) {
      const timeoutId = setTimeout(processPreloadQueue, 1000); // Debounce preloading
      return () => clearTimeout(timeoutId);
    }
  }, [preloadQueue, processPreloadQueue]);

  return { addToPreloadQueue };
};

/**
 * Hook for monitoring component performance
 */
export const useComponentPerformance = (componentName: string) => {
  const [renderCount, setRenderCount] = useState(0);
  const [lastRenderTime, setLastRenderTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    setRenderCount(prev => prev + 1);

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      setLastRenderTime(renderTime);

      // Track render performance
      performanceManager.trackUserInteraction('component-render', componentName);

      // Warn about slow renders
      if (renderTime > 16) { // More than one frame at 60fps
        console.warn(`Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  return {
    renderCount,
    lastRenderTime
  };
};

export default usePerformanceManager;