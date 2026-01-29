import { useState, useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  searchTime: number;
  filterTime: number;
  renderTime: number;
  cacheHitRate: number;
  memoryUsage: number;
}

interface PerformanceHookReturn {
  metrics: PerformanceMetrics;
  startTiming: (operation: string) => void;
  endTiming: (operation: string) => void;
  recordCacheHit: () => void;
  recordCacheMiss: () => void;
  getPerformanceReport: () => string;
}

export const useAdminPerformance = (): PerformanceHookReturn => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    searchTime: 0,
    filterTime: 0,
    renderTime: 0,
    cacheHitRate: 0,
    memoryUsage: 0
  });

  const timingRef = useRef<Map<string, number>>(new Map());
  const cacheStatsRef = useRef({ hits: 0, misses: 0 });

  // Start timing an operation
  const startTiming = useCallback((operation: string) => {
    timingRef.current.set(operation, performance.now());
  }, []);

  // End timing an operation and update metrics
  const endTiming = useCallback((operation: string) => {
    const startTime = timingRef.current.get(operation);
    if (startTime) {
      const duration = performance.now() - startTime;
      timingRef.current.delete(operation);
      
      setMetrics(prev => ({
        ...prev,
        [operation + 'Time']: duration
      }));
    }
  }, []);

  // Record cache hit
  const recordCacheHit = useCallback(() => {
    cacheStatsRef.current.hits++;
    updateCacheHitRate();
  }, []);

  // Record cache miss
  const recordCacheMiss = useCallback(() => {
    cacheStatsRef.current.misses++;
    updateCacheHitRate();
  }, []);

  // Update cache hit rate
  const updateCacheHitRate = useCallback(() => {
    const { hits, misses } = cacheStatsRef.current;
    const total = hits + misses;
    const rate = total > 0 ? (hits / total) * 100 : 0;
    
    setMetrics(prev => ({
      ...prev,
      cacheHitRate: rate
    }));
  }, []);

  // Monitor memory usage
  useEffect(() => {
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memInfo.usedJSHeapSize / 1024 / 1024 // Convert to MB
        }));
      }
    };

    // Update memory usage every 5 seconds
    const interval = setInterval(updateMemoryUsage, 5000);
    updateMemoryUsage(); // Initial update

    return () => clearInterval(interval);
  }, []);

  // Generate performance report
  const getPerformanceReport = useCallback(() => {
    const report = `
Admin Dashboard Performance Report
================================
Load Time: ${metrics.loadTime.toFixed(2)}ms
Search Time: ${metrics.searchTime.toFixed(2)}ms
Filter Time: ${metrics.filterTime.toFixed(2)}ms
Render Time: ${metrics.renderTime.toFixed(2)}ms
Cache Hit Rate: ${metrics.cacheHitRate.toFixed(1)}%
Memory Usage: ${metrics.memoryUsage.toFixed(2)}MB

Performance Status: ${getPerformanceStatus()}
Recommendations: ${getRecommendations()}
    `.trim();
    
    return report;
  }, [metrics]);

  // Determine performance status
  const getPerformanceStatus = useCallback(() => {
    const { loadTime, searchTime, cacheHitRate } = metrics;
    
    if (loadTime > 2000 || searchTime > 1000 || cacheHitRate < 50) {
      return 'Poor - Optimization needed';
    } else if (loadTime > 1000 || searchTime > 500 || cacheHitRate < 70) {
      return 'Fair - Some improvements possible';
    } else {
      return 'Good - Performance is optimal';
    }
  }, [metrics]);

  // Generate recommendations
  const getRecommendations = useCallback(() => {
    const recommendations: string[] = [];
    const { loadTime, searchTime, cacheHitRate, memoryUsage } = metrics;
    
    if (loadTime > 2000) {
      recommendations.push('Consider implementing pagination or reducing initial data load');
    }
    
    if (searchTime > 1000) {
      recommendations.push('Implement server-side search or optimize search algorithm');
    }
    
    if (cacheHitRate < 70) {
      recommendations.push('Improve caching strategy to reduce API calls');
    }
    
    if (memoryUsage > 100) {
      recommendations.push('Monitor memory usage - consider implementing data cleanup');
    }
    
    return recommendations.length > 0 ? recommendations.join('; ') : 'No specific recommendations';
  }, [metrics]);

  return {
    metrics,
    startTiming,
    endTiming,
    recordCacheHit,
    recordCacheMiss,
    getPerformanceReport
  };
};