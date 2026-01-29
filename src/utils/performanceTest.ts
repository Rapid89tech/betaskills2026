/**
 * Performance testing utilities for admin dashboard optimization
 */

interface PerformanceTestResult {
  testName: string;
  duration: number;
  memoryUsage: number;
  cacheHits: number;
  cacheMisses: number;
  itemsProcessed: number;
}

export class AdminPerformanceTester {
  private results: PerformanceTestResult[] = [];

  /**
   * Test pagination performance vs loading all items
   */
  async testPaginationPerformance(totalItems: number, pageSize: number): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();

    // Simulate paginated loading
    const pages = Math.ceil(totalItems / pageSize);
    let processedItems = 0;

    for (let page = 0; page < pages; page++) {
      const pageItems = Math.min(pageSize, totalItems - processedItems);
      // Simulate processing page items
      await this.simulateItemProcessing(pageItems);
      processedItems += pageItems;
    }

    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();

    const result: PerformanceTestResult = {
      testName: 'Pagination Performance',
      duration: endTime - startTime,
      memoryUsage: endMemory - startMemory,
      cacheHits: 0,
      cacheMisses: 0,
      itemsProcessed: processedItems
    };

    this.results.push(result);
    return result;
  }

  /**
   * Test virtual scrolling performance
   */
  async testVirtualScrollingPerformance(totalItems: number, visibleItems: number): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();

    // Simulate virtual scrolling - only render visible items
    await this.simulateItemProcessing(visibleItems);

    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();

    const result: PerformanceTestResult = {
      testName: 'Virtual Scrolling Performance',
      duration: endTime - startTime,
      memoryUsage: endMemory - startMemory,
      cacheHits: 0,
      cacheMisses: 0,
      itemsProcessed: visibleItems
    };

    this.results.push(result);
    return result;
  }

  /**
   * Test debounced search performance
   */
  async testDebouncedSearchPerformance(searchQueries: string[], debounceMs: number): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();

    let actualSearches = 0;
    let lastSearchTime = 0;

    for (const query of searchQueries) {
      const currentTime = Date.now();
      
      // Simulate typing delay
      await this.delay(50);
      
      // Only execute search if debounce period has passed
      if (currentTime - lastSearchTime >= debounceMs) {
        await this.simulateSearch(query);
        actualSearches++;
        lastSearchTime = currentTime;
      }
    }

    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();

    const result: PerformanceTestResult = {
      testName: 'Debounced Search Performance',
      duration: endTime - startTime,
      memoryUsage: endMemory - startMemory,
      cacheHits: 0,
      cacheMisses: 0,
      itemsProcessed: actualSearches
    };

    this.results.push(result);
    return result;
  }

  /**
   * Test caching performance
   */
  async testCachingPerformance(requests: number, cacheHitRate: number): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();

    let cacheHits = 0;
    let cacheMisses = 0;

    for (let i = 0; i < requests; i++) {
      if (Math.random() < cacheHitRate) {
        // Cache hit - fast response
        await this.delay(10);
        cacheHits++;
      } else {
        // Cache miss - slower response
        await this.delay(100);
        cacheMisses++;
      }
    }

    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();

    const result: PerformanceTestResult = {
      testName: 'Caching Performance',
      duration: endTime - startTime,
      memoryUsage: endMemory - startMemory,
      cacheHits,
      cacheMisses,
      itemsProcessed: requests
    };

    this.results.push(result);
    return result;
  }

  /**
   * Compare optimized vs unoptimized performance
   */
  async runComparisonTest(): Promise<{
    optimized: PerformanceTestResult[];
    unoptimized: PerformanceTestResult[];
    improvement: {
      speedImprovement: number;
      memoryImprovement: number;
      cacheEfficiency: number;
    };
  }> {
    console.log('🚀 Running admin dashboard performance comparison...');

    // Test optimized implementation
    const optimizedResults = await this.runOptimizedTests();
    
    // Test unoptimized implementation
    const unoptimizedResults = await this.runUnoptimizedTests();

    // Calculate improvements
    const avgOptimizedTime = optimizedResults.reduce((sum, r) => sum + r.duration, 0) / optimizedResults.length;
    const avgUnoptimizedTime = unoptimizedResults.reduce((sum, r) => sum + r.duration, 0) / unoptimizedResults.length;
    
    const avgOptimizedMemory = optimizedResults.reduce((sum, r) => sum + r.memoryUsage, 0) / optimizedResults.length;
    const avgUnoptimizedMemory = unoptimizedResults.reduce((sum, r) => sum + r.memoryUsage, 0) / unoptimizedResults.length;

    const totalCacheHits = optimizedResults.reduce((sum, r) => sum + r.cacheHits, 0);
    const totalCacheRequests = optimizedResults.reduce((sum, r) => sum + r.cacheHits + r.cacheMisses, 0);

    const improvement = {
      speedImprovement: ((avgUnoptimizedTime - avgOptimizedTime) / avgUnoptimizedTime) * 100,
      memoryImprovement: ((avgUnoptimizedMemory - avgOptimizedMemory) / avgUnoptimizedMemory) * 100,
      cacheEfficiency: totalCacheRequests > 0 ? (totalCacheHits / totalCacheRequests) * 100 : 0
    };

    return {
      optimized: optimizedResults,
      unoptimized: unoptimizedResults,
      improvement
    };
  }

  /**
   * Run optimized implementation tests
   */
  private async runOptimizedTests(): Promise<PerformanceTestResult[]> {
    const results: PerformanceTestResult[] = [];

    // Test pagination (20 items per page)
    results.push(await this.testPaginationPerformance(1000, 20));

    // Test virtual scrolling (render only 10 visible items)
    results.push(await this.testVirtualScrollingPerformance(1000, 10));

    // Test debounced search (300ms debounce)
    const searchQueries = ['a', 'ad', 'adm', 'admin', 'admin@'];
    results.push(await this.testDebouncedSearchPerformance(searchQueries, 300));

    // Test caching (85% hit rate)
    results.push(await this.testCachingPerformance(100, 0.85));

    return results;
  }

  /**
   * Run unoptimized implementation tests
   */
  private async runUnoptimizedTests(): Promise<PerformanceTestResult[]> {
    const results: PerformanceTestResult[] = [];

    // Test no pagination (load all items)
    results.push(await this.testPaginationPerformance(1000, 1000));

    // Test no virtual scrolling (render all items)
    results.push(await this.testVirtualScrollingPerformance(1000, 1000));

    // Test no debounced search (immediate search)
    const searchQueries = ['a', 'ad', 'adm', 'admin', 'admin@'];
    results.push(await this.testDebouncedSearchPerformance(searchQueries, 0));

    // Test no caching (0% hit rate)
    results.push(await this.testCachingPerformance(100, 0));

    return results;
  }

  /**
   * Generate performance report
   */
  generateReport(): string {
    if (this.results.length === 0) {
      return 'No performance tests have been run yet.';
    }

    let report = '\n📊 Admin Dashboard Performance Report\n';
    report += '=====================================\n\n';

    this.results.forEach((result, index) => {
      report += `${index + 1}. ${result.testName}\n`;
      report += `   Duration: ${result.duration.toFixed(2)}ms\n`;
      report += `   Memory Usage: ${result.memoryUsage.toFixed(2)}MB\n`;
      report += `   Items Processed: ${result.itemsProcessed}\n`;
      
      if (result.cacheHits > 0 || result.cacheMisses > 0) {
        const hitRate = (result.cacheHits / (result.cacheHits + result.cacheMisses)) * 100;
        report += `   Cache Hit Rate: ${hitRate.toFixed(1)}%\n`;
      }
      
      report += '\n';
    });

    return report;
  }

  /**
   * Clear test results
   */
  clearResults(): void {
    this.results = [];
  }

  // Helper methods
  private async simulateItemProcessing(itemCount: number): Promise<void> {
    // Simulate DOM manipulation and data processing
    const processingTime = itemCount * 0.1; // 0.1ms per item
    await this.delay(processingTime);
  }

  private async simulateSearch(query: string): Promise<void> {
    // Simulate search operation
    const searchTime = query.length * 10 + Math.random() * 50;
    await this.delay(searchTime);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return 0;
  }
}

// Export singleton instance
export const adminPerformanceTester = new AdminPerformanceTester();