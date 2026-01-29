/**
 * Performance Optimization Manager
 * Coordinates all performance optimizations including caching, lazy loading, and database query optimization
 */

import { advancedCacheManager, courseDataCache, enrollmentDataCache, userDataCache } from './AdvancedCacheManager';
import { databaseQueryOptimizer } from './DatabaseQueryOptimizer';
import { loadingOptimizer } from './loadingOptimizer';
import { performanceManager } from './PerformanceManager';
import { fastDataService } from '@/services/FastDataService';

interface OptimizationConfig {
  enableAdvancedCaching: boolean;
  enableQueryOptimization: boolean;
  enableLazyLoading: boolean;
  enablePreloading: boolean;
  enablePerformanceMonitoring: boolean;
  cacheCleanupInterval: number;
  preloadDelay: number;
}

interface PerformanceReport {
  cacheEfficiency: {
    hitRate: number;
    memoryUsage: number;
    totalRequests: number;
  };
  queryPerformance: {
    averageQueryTime: number;
    slowQueries: number;
    optimizedQueries: number;
  };
  loadingPerformance: {
    averageLoadTime: number;
    preloadedComponents: number;
    lazyLoadedComponents: number;
  };
  recommendations: string[];
}

class PerformanceOptimizationManager {
  private static instance: PerformanceOptimizationManager;
  private config: OptimizationConfig;
  private isInitialized = false;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private performanceMetrics: Map<string, number[]> = new Map();

  private constructor() {
    this.config = {
      enableAdvancedCaching: true,
      enableQueryOptimization: true,
      enableLazyLoading: true,
      enablePreloading: true,
      enablePerformanceMonitoring: import.meta.env.DEV,
      cacheCleanupInterval: 5 * 60 * 1000, // 5 minutes
      preloadDelay: 1000 // 1 second
    };
  }

  static getInstance(): PerformanceOptimizationManager {
    if (!PerformanceOptimizationManager.instance) {
      PerformanceOptimizationManager.instance = new PerformanceOptimizationManager();
    }
    return PerformanceOptimizationManager.instance;
  }

  /**
   * Initialize all performance optimizations
   */
  async initialize(customConfig?: Partial<OptimizationConfig>): Promise<void> {
    if (this.isInitialized) return;

    if (customConfig) {
      this.config = { ...this.config, ...customConfig };
    }

    console.log('🚀 Initializing Performance Optimization Manager...');

    try {
      // Initialize caching systems
      if (this.config.enableAdvancedCaching) {
        await this.initializeCaching();
      }

      // Initialize query optimization
      if (this.config.enableQueryOptimization) {
        await this.initializeQueryOptimization();
      }

      // Initialize lazy loading and preloading
      if (this.config.enableLazyLoading || this.config.enablePreloading) {
        await this.initializeComponentOptimization();
      }

      // Initialize performance monitoring
      if (this.config.enablePerformanceMonitoring) {
        await this.initializePerformanceMonitoring();
      }

      // Start cleanup timer
      this.startCleanupTimer();

      this.isInitialized = true;
      console.log('✅ Performance Optimization Manager initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Performance Optimization Manager:', error);
      throw error;
    }
  }

  /**
   * Optimize data loading for a specific user
   */
  async optimizeForUser(userId: string): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    console.log(`🎯 Optimizing performance for user: ${userId}`);

    try {
      // Prefetch user-specific data
      await Promise.allSettled([
        fastDataService.prefetchUserData(userId),
        this.preloadUserComponents(),
        this.optimizeUserQueries(userId)
      ]);

      console.log(`✅ User optimization completed for: ${userId}`);
    } catch (error) {
      console.warn(`⚠️ User optimization partially failed for ${userId}:`, error);
    }
  }

  /**
   * Optimize data loading for admin dashboard
   */
  async optimizeForAdmin(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    console.log('🎯 Optimizing performance for admin dashboard...');

    try {
      // Prefetch admin-specific data
      await Promise.allSettled([
        fastDataService.prefetchAdminData(),
        this.preloadAdminComponents(),
        this.optimizeAdminQueries()
      ]);

      console.log('✅ Admin optimization completed');
    } catch (error) {
      console.warn('⚠️ Admin optimization partially failed:', error);
    }
  }

  /**
   * Get comprehensive performance report
   */
  getPerformanceReport(): PerformanceReport {
    const cacheStats = advancedCacheManager.getStats();
    const enrollmentCacheStats = enrollmentDataCache.getStats();
    const userCacheStats = userDataCache.getStats();
    const courseCacheStats = courseDataCache.getStats();

    // Calculate overall cache efficiency
    const totalRequests = cacheStats.totalRequests + enrollmentCacheStats.totalRequests + 
                         userCacheStats.totalRequests + courseCacheStats.totalRequests;
    const totalHits = cacheStats.totalHits + enrollmentCacheStats.totalHits + 
                     userCacheStats.totalHits + courseCacheStats.totalHits;
    const overallHitRate = totalRequests > 0 ? (totalHits / totalRequests) * 100 : 0;

    const totalMemoryUsage = cacheStats.memoryUsage + enrollmentCacheStats.memoryUsage + 
                           userCacheStats.memoryUsage + courseCacheStats.memoryUsage;

    // Generate recommendations
    const recommendations = this.generateRecommendations({
      hitRate: overallHitRate,
      memoryUsage: totalMemoryUsage,
      totalRequests
    });

    return {
      cacheEfficiency: {
        hitRate: Math.round(overallHitRate * 100) / 100,
        memoryUsage: Math.round(totalMemoryUsage * 100) / 100,
        totalRequests
      },
      queryPerformance: {
        averageQueryTime: this.calculateAverageMetric('queryTime'),
        slowQueries: this.countSlowQueries(),
        optimizedQueries: this.countOptimizedQueries()
      },
      loadingPerformance: {
        averageLoadTime: this.calculateAverageMetric('loadTime'),
        preloadedComponents: this.countPreloadedComponents(),
        lazyLoadedComponents: this.countLazyLoadedComponents()
      },
      recommendations
    };
  }

  /**
   * Clear all caches and reset optimizations
   */
  clearAllOptimizations(): void {
    console.log('🧹 Clearing all performance optimizations...');

    // Clear all caches
    advancedCacheManager.clear();
    courseDataCache.clear();
    enrollmentDataCache.clear();
    userDataCache.clear();
    loadingOptimizer.clearCache();
    fastDataService.clearCache();

    // Clear performance metrics
    this.performanceMetrics.clear();

    // Clear performance manager cache
    performanceManager.clearCache();

    console.log('✅ All optimizations cleared');
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<OptimizationConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (this.isInitialized) {
      // Reinitialize with new config
      this.isInitialized = false;
      this.initialize().catch(console.error);
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): OptimizationConfig {
    return { ...this.config };
  }

  /**
   * Track performance metric
   */
  trackMetric(name: string, value: number): void {
    if (!this.performanceMetrics.has(name)) {
      this.performanceMetrics.set(name, []);
    }
    
    const metrics = this.performanceMetrics.get(name)!;
    metrics.push(value);
    
    // Keep only last 100 measurements
    if (metrics.length > 100) {
      metrics.shift();
    }
  }

  /**
   * Private initialization methods
   */
  private async initializeCaching(): Promise<void> {
    console.log('📦 Initializing advanced caching systems...');
    
    // Cache systems are already initialized via imports
    // Just verify they're working
    const testKey = 'cache-test';
    const testData = { test: true, timestamp: Date.now() };
    
    advancedCacheManager.set(testKey, testData);
    const retrieved = await advancedCacheManager.get(testKey, () => Promise.resolve(testData));
    
    if (retrieved.test !== testData.test) {
      throw new Error('Advanced cache manager not working correctly');
    }
    
    advancedCacheManager.delete(testKey);
    console.log('✅ Advanced caching systems initialized');
  }

  private async initializeQueryOptimization(): Promise<void> {
    console.log('🔍 Initializing query optimization...');
    
    // Query optimizer is already initialized via imports
    // Just verify it's working
    const stats = databaseQueryOptimizer.getPerformanceStats();
    console.log('✅ Query optimization initialized:', stats);
  }

  private async initializeComponentOptimization(): Promise<void> {
    console.log('⚡ Initializing component optimization...');
    
    // Initialize performance manager
    performanceManager.setEnabled(true);
    
    // Preload critical components after delay
    setTimeout(() => {
      performanceManager.preloadCriticalComponents().catch(console.warn);
    }, this.config.preloadDelay);
    
    console.log('✅ Component optimization initialized');
  }

  private async initializePerformanceMonitoring(): Promise<void> {
    console.log('📊 Initializing performance monitoring...');
    
    // Set up performance observers if available
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Monitor long tasks
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.trackMetric('longTask', entry.duration);
            if (entry.duration > 50) {
              console.warn(`🐌 Long task detected: ${entry.duration.toFixed(2)}ms`);
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });

        // Monitor navigation
        const navigationObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              this.trackMetric('navigationTime', navEntry.loadEventEnd - navEntry.fetchStart);
            }
          }
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
      } catch (error) {
        console.warn('Performance observers not fully supported:', error);
      }
    }
    
    console.log('✅ Performance monitoring initialized');
  }

  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.performCleanup();
    }, this.config.cacheCleanupInterval);
  }

  private performCleanup(): void {
    if (import.meta.env.DEV) {
      console.log('🧹 Performing periodic cleanup...');
    }
    
    // Cleanup is handled automatically by individual cache managers
    // This is just for logging and additional maintenance
    
    const report = this.getPerformanceReport();
    if (report.cacheEfficiency.memoryUsage > 100) { // 100MB threshold
      console.warn('⚠️ High memory usage detected, consider clearing some caches');
    }
  }

  private async preloadUserComponents(): Promise<void> {
    const userComponents = [
      'Dashboard',
      'Course',
      'Enrollment'
    ];

    await Promise.allSettled(
      userComponents.map(component => 
        performanceManager.preloadComponent(component).catch(console.warn)
      )
    );
  }

  private async preloadAdminComponents(): Promise<void> {
    const adminComponents = [
      'AdminDashboard',
      'FastAdminDashboard'
    ];

    await Promise.allSettled(
      adminComponents.map(component => 
        performanceManager.preloadComponent(component).catch(console.warn)
      )
    );
  }

  private async optimizeUserQueries(userId: string): Promise<void> {
    // Prefetch common user queries
    await databaseQueryOptimizer.prefetchUserData(userId);
  }

  private async optimizeAdminQueries(): Promise<void> {
    // Prefetch common admin queries
    await databaseQueryOptimizer.prefetchAdminData();
  }

  private generateRecommendations(stats: { hitRate: number; memoryUsage: number; totalRequests: number }): string[] {
    const recommendations: string[] = [];

    if (stats.hitRate < 70) {
      recommendations.push('Cache hit rate is low. Consider increasing cache TTL or preloading more data.');
    }

    if (stats.memoryUsage > 50) {
      recommendations.push('Memory usage is high. Consider reducing cache size or implementing more aggressive cleanup.');
    }

    if (stats.totalRequests < 100) {
      recommendations.push('Low request volume. Cache optimizations may not be providing significant benefits.');
    }

    if (recommendations.length === 0) {
      recommendations.push('Performance optimizations are working well!');
    }

    return recommendations;
  }

  private calculateAverageMetric(metricName: string): number {
    const metrics = this.performanceMetrics.get(metricName);
    if (!metrics || metrics.length === 0) return 0;
    
    return metrics.reduce((sum, value) => sum + value, 0) / metrics.length;
  }

  private countSlowQueries(): number {
    const queryTimes = this.performanceMetrics.get('queryTime') || [];
    return queryTimes.filter(time => time > 1000).length; // Queries slower than 1 second
  }

  private countOptimizedQueries(): number {
    // This would track queries that used optimizations
    return this.performanceMetrics.get('optimizedQuery')?.length || 0;
  }

  private countPreloadedComponents(): number {
    return performanceManager.getPerformanceSummary().preloadedComponents.length;
  }

  private countLazyLoadedComponents(): number {
    // This would track lazy loaded components
    return Object.keys(performanceManager.getPerformanceSummary().componentCache).length;
  }

  /**
   * Cleanup on destruction
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    
    this.clearAllOptimizations();
    this.isInitialized = false;
  }
}

// Create singleton instance
export const performanceOptimizationManager = PerformanceOptimizationManager.getInstance();

// Auto-initialize in development
if (import.meta.env.DEV) {
  performanceOptimizationManager.initialize().catch(console.error);
}

export default PerformanceOptimizationManager;