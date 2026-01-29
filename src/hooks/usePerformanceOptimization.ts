import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { performanceOptimizationService, PerformanceMetrics } from '@/services/PerformanceOptimizationService';

export interface UseOptimizedFetchOptions {
  useCache?: boolean;
  ttl?: number;
  retries?: number;
  timeout?: number;
  dependencies?: any[];
}

export const useOptimizedFetch = <T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: UseOptimizedFetchOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { dependencies = [], ...fetchOptions } = options;

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await performanceOptimizationService.optimizedFetch(
        key,
        fetchFn,
        fetchOptions
      );
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFn, ...dependencies]);

  useEffect(() => {
    execute();
  }, [execute]);

  const refetch = useCallback(() => {
    // Clear cache for this key and refetch
    performanceOptimizationService.clearCache(key);
    execute();
  }, [key, execute]);

  return { data, loading, error, refetch };
};

export const useDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  key?: string
): ((...args: Parameters<T>) => void) => {
  const fnKey = key || `debounce_${Math.random().toString(36).substr(2, 9)}`;
  
  return useMemo(() => {
    return performanceOptimizationService.debounce(fnKey, fn, delay);
  }, [fn, delay, fnKey]);
};

export const useThrottle = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  key?: string
): ((...args: Parameters<T>) => void) => {
  const fnKey = key || `throttle_${Math.random().toString(36).substr(2, 9)}`;
  
  return useMemo(() => {
    return performanceOptimizationService.throttle(fnKey, fn, delay);
  }, [fn, delay, fnKey]);
};

export const useVirtualScrolling = (
  items: any[],
  containerHeight: number,
  itemHeight: number,
  overscan: number = 5
) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleRange = useMemo(() => {
    return performanceOptimizationService.calculateVisibleItems(
      containerHeight,
      itemHeight,
      scrollTop,
      items.length,
      overscan
    );
  }, [containerHeight, itemHeight, scrollTop, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange.startIndex, visibleRange.endIndex]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    visibleRange
  };
};

export const useBatchFetch = <T>() => {
  const [results, setResults] = useState<Array<{ key: string; result: T | null; error?: Error }>>([]);
  const [loading, setLoading] = useState(false);

  const executeBatch = useCallback(async (
    requests: Array<{ key: string; fetchFn: () => Promise<T>; options?: any }>,
    concurrency: number = 5
  ) => {
    setLoading(true);
    try {
      const batchResults = await performanceOptimizationService.batchFetch(requests, concurrency);
      setResults(batchResults);
    } catch (error) {
      console.error('Batch fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, executeBatch };
};

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      const currentMetrics = performanceOptimizationService.getPerformanceMetrics();
      setMetrics(currentMetrics);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return metrics;
};

export const useRenderPerformance = (componentName: string) => {
  const renderStartTime = useRef<number>(0);

  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current;
    performanceOptimizationService.measureRenderTime(componentName, () => renderTime);
  });

  const measureOperation = useCallback(<T>(operationName: string, operation: () => T): T => {
    return performanceOptimizationService.measureRenderTime(
      `${componentName}_${operationName}`,
      operation
    );
  }, [componentName]);

  return { measureOperation };
};

export const useMemoryOptimization = () => {
  const optimizeMemory = useCallback(() => {
    performanceOptimizationService.optimizeMemory();
  }, []);

  const getCacheStats = useCallback(() => {
    return performanceOptimizationService.getCacheStats();
  }, []);

  const clearCache = useCallback((pattern?: string) => {
    performanceOptimizationService.clearCache(pattern);
  }, []);

  return {
    optimizeMemory,
    getCacheStats,
    clearCache
  };
};

// Hook for optimizing large lists with pagination and search
export const useOptimizedList = <T>(
  items: T[],
  options: {
    pageSize?: number;
    searchFn?: (item: T, query: string) => boolean;
    sortFn?: (a: T, b: T) => number;
  } = {}
) => {
  const { pageSize = 50, searchFn, sortFn } = options;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const processedItems = useMemo(() => {
    let result = [...items];

    // Apply search filter
    if (searchQuery && searchFn) {
      result = result.filter(item => searchFn(item, searchQuery));
    }

    // Apply sorting
    if (sortFn) {
      result.sort(sortFn);
    }

    return result;
  }, [items, searchQuery, searchFn, sortFn]);

  const paginatedItems = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return processedItems.slice(startIndex, endIndex);
  }, [processedItems, currentPage, pageSize]);

  const totalPages = Math.ceil(processedItems.length / pageSize);

  const debouncedSetSearchQuery = useDebounce(setSearchQuery, 300, 'list-search');

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    items: paginatedItems,
    totalItems: processedItems.length,
    currentPage,
    totalPages,
    searchQuery,
    setSearchQuery: debouncedSetSearchQuery,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages - 1,
    hasPrevPage: currentPage > 0
  };
};

export default {
  useOptimizedFetch,
  useDebounce,
  useThrottle,
  useVirtualScrolling,
  useBatchFetch,
  usePerformanceMetrics,
  useRenderPerformance,
  useMemoryOptimization,
  useOptimizedList
};