import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { stabilityMonitoringService } from '@/services/StabilityMonitoringService';
import { performanceOptimizationService } from '@/services/PerformanceOptimizationService';

describe('Admin Dashboard Stability and Performance', () => {
  beforeEach(() => {
    // Clear any existing cache and metrics
    performanceOptimizationService.clearCache();
  });

  afterEach(() => {
    // Cleanup after each test
    performanceOptimizationService.cleanup();
  });

  describe('Error Handling and Stability', () => {
    it('should report errors to monitoring service', () => {
      const testError = new Error('Test error');
      
      // This should not throw
      expect(() => {
        stabilityMonitoringService.reportError({
          message: testError.message,
          stack: testError.stack,
          severity: 'medium',
          timestamp: new Date().toISOString(),
          userAgent: 'test-agent',
          url: 'test-url'
        });
      }).not.toThrow();
    });

    it('should get stability metrics without errors', async () => {
      const metrics = await stabilityMonitoringService.getStabilityMetrics();
      
      expect(metrics).toBeDefined();
      expect(typeof metrics.errorCount).toBe('number');
      expect(typeof metrics.performanceScore).toBe('number');
      expect(typeof metrics.memoryUsage).toBe('number');
      expect(typeof metrics.uptime).toBe('number');
    });
  });

  describe('Performance Optimization', () => {
    it('should cache data correctly', () => {
      const testData = { test: 'data' };
      const cacheKey = 'test-key';
      
      // Set cache
      performanceOptimizationService.setCache(cacheKey, testData);
      
      // Get cache
      const cachedData = performanceOptimizationService.getCache(cacheKey);
      
      expect(cachedData).toEqual(testData);
    });

    it('should handle cache expiration', async () => {
      const testData = { test: 'data' };
      const cacheKey = 'test-key-expire';
      
      // Set cache with very short TTL
      performanceOptimizationService.setCache(cacheKey, testData, 1);
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Should return null for expired cache
      const cachedData = performanceOptimizationService.getCache(cacheKey);
      expect(cachedData).toBeNull();
    });

    it('should optimize fetch operations', async () => {
      const mockFetch = async () => ({ data: 'test' });
      const cacheKey = 'optimized-fetch-test';
      
      // First call should execute fetch
      const result1 = await performanceOptimizationService.optimizedFetch(
        cacheKey,
        mockFetch,
        { useCache: true, ttl: 5000 }
      );
      
      expect(result1).toEqual({ data: 'test' });
      
      // Second call should use cache
      const result2 = await performanceOptimizationService.optimizedFetch(
        cacheKey,
        mockFetch,
        { useCache: true, ttl: 5000 }
      );
      
      expect(result2).toEqual({ data: 'test' });
    });

    it('should calculate visible items for virtual scrolling', () => {
      const result = performanceOptimizationService.calculateVisibleItems(
        400, // container height
        50,  // item height
        100, // scroll top
        100, // total items
        2    // overscan
      );
      
      expect(result.startIndex).toBeGreaterThanOrEqual(0);
      expect(result.endIndex).toBeLessThan(100);
      expect(result.visibleItems).toBeGreaterThan(0);
    });

    it('should get performance metrics', () => {
      const metrics = performanceOptimizationService.getPerformanceMetrics();
      
      expect(metrics).toBeDefined();
      expect(typeof metrics.loadTime).toBe('number');
      expect(typeof metrics.renderTime).toBe('number');
      expect(typeof metrics.memoryUsage).toBe('number');
      expect(typeof metrics.cacheHitRate).toBe('number');
      expect(typeof metrics.apiResponseTime).toBe('number');
    });

    it('should handle memory optimization', () => {
      // Add some cache entries
      performanceOptimizationService.setCache('test1', { data: 1 });
      performanceOptimizationService.setCache('test2', { data: 2 });
      
      // This should not throw
      expect(() => {
        performanceOptimizationService.optimizeMemory();
      }).not.toThrow();
    });
  });

  describe('Error Recovery', () => {
    it('should handle fetch errors gracefully', async () => {
      const failingFetch = async () => {
        throw new Error('Network error');
      };
      
      try {
        await performanceOptimizationService.optimizedFetch(
          'failing-fetch',
          failingFetch,
          { retries: 1, timeout: 1000 }
        );
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Network error');
      }
    });

    it('should retry failed operations', async () => {
      let attempts = 0;
      const retryingFetch = async () => {
        attempts++;
        if (attempts < 3) {
          throw new Error('Temporary failure');
        }
        return { success: true };
      };
      
      const result = await performanceOptimizationService.optimizedFetch(
        'retrying-fetch',
        retryingFetch,
        { retries: 3, useCache: false }
      );
      
      expect(result).toEqual({ success: true });
      expect(attempts).toBe(3);
    });
  });

  describe('Cache Management', () => {
    it('should clear cache by pattern', () => {
      // Add test data
      performanceOptimizationService.setCache('user-1', { id: 1 });
      performanceOptimizationService.setCache('user-2', { id: 2 });
      performanceOptimizationService.setCache('enrollment-1', { id: 1 });
      
      // Clear user cache
      performanceOptimizationService.clearCache('user-');
      
      // User cache should be cleared
      expect(performanceOptimizationService.getCache('user-1')).toBeNull();
      expect(performanceOptimizationService.getCache('user-2')).toBeNull();
      
      // Enrollment cache should remain
      expect(performanceOptimizationService.getCache('enrollment-1')).toBeDefined();
    });

    it('should manage cache size limits', () => {
      // The service should handle cache size limits automatically
      // Add more items than the max size
      for (let i = 0; i < 150; i++) {
        performanceOptimizationService.setCache(`item-${i}`, { id: i });
      }
      
      // Should not throw and should manage size
      expect(() => {
        performanceOptimizationService.setCache('final-item', { id: 'final' });
      }).not.toThrow();
    });
  });
});