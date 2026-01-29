/**
 * Optimized API Service
 * Implements intelligent caching, request batching, and performance optimizations for API calls
 */

import { advancedCacheManager, courseDataCache, enrollmentDataCache, userDataCache } from '@/utils/AdvancedCacheManager';
import { databaseQueryOptimizer } from '@/utils/DatabaseQueryOptimizer';
import { performanceMonitor } from '@/utils/performanceMonitor';
import { supabase } from '@/integrations/supabase/client';

interface ApiRequestConfig {
  useCache?: boolean;
  cacheTTL?: number;
  retryAttempts?: number;
  timeout?: number;
  priority?: 'high' | 'medium' | 'low';
}

interface BatchRequest {
  id: string;
  url: string;
  method: string;
  data?: any;
  config: ApiRequestConfig;
  resolve: (data: any) => void;
  reject: (error: any) => void;
}

interface ApiResponse<T = any> {
  data: T;
  cached: boolean;
  duration: number;
  timestamp: number;
}

class OptimizedApiService {
  private static instance: OptimizedApiService;
  private requestQueue: BatchRequest[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private readonly BATCH_DELAY = 50; // 50ms batch delay
  private readonly MAX_BATCH_SIZE = 10;
  private readonly DEFAULT_TIMEOUT = 10000; // 10 seconds

  static getInstance(): OptimizedApiService {
    if (!OptimizedApiService.instance) {
      OptimizedApiService.instance = new OptimizedApiService();
    }
    return OptimizedApiService.instance;
  }

  /**
   * Optimized GET request with intelligent caching
   */
  async get<T>(
    url: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      useCache = true,
      cacheTTL = 5 * 60 * 1000, // 5 minutes default
      retryAttempts = 3,
      timeout = this.DEFAULT_TIMEOUT,
      priority = 'medium'
    } = config;

    const cacheKey = `api-get-${url}`;
    const startTime = performance.now();

    // Try cache first if enabled
    if (useCache) {
      try {
        const cachedData = await advancedCacheManager.get(
          cacheKey,
          () => this.performRequest<T>('GET', url, undefined, { timeout, retryAttempts }),
          cacheTTL
        );

        const duration = performance.now() - startTime;
        performanceMonitor.trackApiCall(url, 'GET', startTime);

        return {
          data: cachedData,
          cached: true,
          duration,
          timestamp: Date.now()
        };
      } catch (error) {
        console.warn(`Cached API request failed for ${url}:`, error);
        // Fall through to direct request
      }
    }

    // Direct request
    try {
      const data = await this.performRequest<T>('GET', url, undefined, { timeout, retryAttempts });
      const duration = performance.now() - startTime;
      
      performanceMonitor.trackApiCall(url, 'GET', startTime);

      return {
        data,
        cached: false,
        duration,
        timestamp: Date.now()
      };
    } catch (error) {
      performanceMonitor.trackApiCall(url, 'GET', startTime, undefined, error as Error);
      throw error;
    }
  }

  /**
   * Optimized POST request with retry logic
   */
  async post<T>(
    url: string,
    data?: any,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      retryAttempts = 1, // POST requests typically shouldn't be retried
      timeout = this.DEFAULT_TIMEOUT
    } = config;

    const startTime = performance.now();

    try {
      const responseData = await this.performRequest<T>('POST', url, data, { timeout, retryAttempts });
      const duration = performance.now() - startTime;
      
      performanceMonitor.trackApiCall(url, 'POST', startTime);

      // Invalidate related cache entries
      this.invalidateRelatedCache(url, 'POST');

      return {
        data: responseData,
        cached: false,
        duration,
        timestamp: Date.now()
      };
    } catch (error) {
      performanceMonitor.trackApiCall(url, 'POST', startTime, undefined, error as Error);
      throw error;
    }
  }

  /**
   * Optimized PUT request
   */
  async put<T>(
    url: string,
    data?: any,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      retryAttempts = 1,
      timeout = this.DEFAULT_TIMEOUT
    } = config;

    const startTime = performance.now();

    try {
      const responseData = await this.performRequest<T>('PUT', url, data, { timeout, retryAttempts });
      const duration = performance.now() - startTime;
      
      performanceMonitor.trackApiCall(url, 'PUT', startTime);

      // Invalidate related cache entries
      this.invalidateRelatedCache(url, 'PUT');

      return {
        data: responseData,
        cached: false,
        duration,
        timestamp: Date.now()
      };
    } catch (error) {
      performanceMonitor.trackApiCall(url, 'PUT', startTime, undefined, error as Error);
      throw error;
    }
  }

  /**
   * Batch multiple GET requests for better performance
   */
  async batchGet<T>(
    requests: Array<{
      url: string;
      config?: ApiRequestConfig;
    }>
  ): Promise<Array<ApiResponse<T> | Error>> {
    const batchPromises = requests.map(({ url, config }) =>
      this.get<T>(url, config).catch(error => error)
    );

    return Promise.all(batchPromises);
  }

  /**
   * Prefetch data for better user experience
   */
  async prefetch(
    urls: string[],
    config: ApiRequestConfig = {}
  ): Promise<void> {
    const prefetchPromises = urls.map(url =>
      this.get(url, { ...config, priority: 'low' }).catch(error => {
        console.warn(`Prefetch failed for ${url}:`, error);
        return null;
      })
    );

    await Promise.allSettled(prefetchPromises);
  }

  /**
   * Optimized course data fetching
   */
  async getCourses(options: {
    category?: string;
    featured?: boolean;
    limit?: number;
    useCache?: boolean;
  } = {}): Promise<ApiResponse<any[]>> {
    const { category, featured, limit, useCache = true } = options;
    const cacheKey = `courses-${category || 'all'}-${featured ? 'featured' : 'all'}-${limit || 'unlimited'}`;
    
    if (useCache) {
      return courseDataCache.get(
        cacheKey,
        () => this.fetchCoursesFromSupabase(options),
        10 * 60 * 1000 // 10 minutes for course data
      ).then(data => ({
        data,
        cached: true,
        duration: 0,
        timestamp: Date.now()
      }));
    }

    const data = await this.fetchCoursesFromSupabase(options);
    return {
      data,
      cached: false,
      duration: 0,
      timestamp: Date.now()
    };
  }

  /**
   * Optimized enrollment data fetching
   */
  async getEnrollments(options: {
    userId?: string;
    status?: string;
    limit?: number;
    useCache?: boolean;
  } = {}): Promise<ApiResponse<any[]>> {
    const { userId, status, limit, useCache = true } = options;
    
    if (userId) {
      return databaseQueryOptimizer.getUserEnrollments(userId, { status, limit, useCache })
        .then(data => ({
          data,
          cached: useCache,
          duration: 0,
          timestamp: Date.now()
        }));
    }

    return databaseQueryOptimizer.getAllEnrollments({ status, limit, useCache })
      .then(result => ({
        data: result.data,
        cached: useCache,
        duration: 0,
        timestamp: Date.now()
      }));
  }

  /**
   * Clear cache for specific patterns
   */
  clearCache(patterns?: string[]): void {
    if (patterns) {
      patterns.forEach(pattern => {
        advancedCacheManager.clearPattern(pattern);
        courseDataCache.clearPattern(pattern);
        enrollmentDataCache.clearPattern(pattern);
        userDataCache.clearPattern(pattern);
      });
    } else {
      advancedCacheManager.clear();
      courseDataCache.clear();
      enrollmentDataCache.clear();
      userDataCache.clear();
    }
  }

  /**
   * Get API performance statistics
   */
  getPerformanceStats(): {
    cacheStats: any;
    apiMetrics: any;
  } {
    return {
      cacheStats: {
        advanced: advancedCacheManager.getStats(),
        course: courseDataCache.getStats(),
        enrollment: enrollmentDataCache.getStats(),
        user: userDataCache.getStats()
      },
      apiMetrics: performanceMonitor.getApiPerformanceSummary()
    };
  }

  /**
   * Private helper methods
   */
  private async performRequest<T>(
    method: string,
    url: string,
    data?: any,
    options: { timeout: number; retryAttempts: number }
  ): Promise<T> {
    const { timeout, retryAttempts } = options;
    let lastError: Error;

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const requestOptions: RequestInit = {
          method,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        };

        if (data && (method === 'POST' || method === 'PUT')) {
          requestOptions.body = JSON.stringify(data);
        }

        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < retryAttempts) {
          // Exponential backoff
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          await new Promise(resolve => setTimeout(resolve, delay));
          console.warn(`Request attempt ${attempt} failed, retrying in ${delay}ms:`, error);
        }
      }
    }

    throw lastError!;
  }

  private async fetchCoursesFromSupabase(options: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<any[]> {
    // This would typically fetch from Supabase courses table
    // For now, return mock data or use existing courses data
    const { coursesData, featuredCourses } = await import('@/data/coursesData');
    
    let courses = options.featured ? featuredCourses : coursesData;
    
    if (options.category) {
      courses = courses.filter((course: any) => course.category === options.category);
    }
    
    if (options.limit) {
      courses = courses.slice(0, options.limit);
    }
    
    return courses;
  }

  private invalidateRelatedCache(url: string, method: string): void {
    // Invalidate cache based on URL patterns
    if (url.includes('/enrollments')) {
      enrollmentDataCache.clearPattern('enrollment');
      enrollmentDataCache.clearPattern('user-courses');
    }
    
    if (url.includes('/courses')) {
      courseDataCache.clearPattern('courses');
      courseDataCache.clearPattern('featured');
    }
    
    if (url.includes('/users') || url.includes('/profiles')) {
      userDataCache.clearPattern('user');
      userDataCache.clearPattern('profile');
    }

    // Clear API cache for GET requests to the same endpoint
    advancedCacheManager.clearPattern(`api-get-${url.split('?')[0]}`);
  }
}

export const optimizedApiService = OptimizedApiService.getInstance();
export default OptimizedApiService;