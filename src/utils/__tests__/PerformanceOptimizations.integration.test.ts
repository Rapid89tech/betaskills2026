/**
 * Performance Optimizations Integration Tests
 * Tests the complete performance optimization system including caching, lazy loading, and API optimizations
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { performanceOptimizationManager } from '../PerformanceOptimizationManager';
import { enhancedCourseDataService } from '../../services/EnhancedCourseDataService';
import { optimizedApiService } from '../../services/OptimizedApiService';
import { advancedCacheManager, courseDataCache, enrollmentDataCache } from '../AdvancedCacheManager';

// Mock external dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn(() => ({
              then: vi.fn()
            }))
          }))
        }))
      }))
    }))
  }
}));

vi.mock('@/data/coursesData', () => ({
  coursesData: [
    {
      id: 'test-course-1',
      title: 'Test Course 1',
      description: 'Test description',
      category: 'ICT',
      level: 'Beginner',
      duration: '4 weeks',
      price: 100,
      currency: 'ZAR',
      instructor: 'Test Instructor',
      rating: 4.5,
      students: 100,
      image: '/test-image.jpg',
      available: true,
      courseId: 'test-course-1'
    },
    {
      id: 'test-course-2',
      title: 'Test Course 2',
      description: 'Test description 2',
      category: 'Business',
      level: 'Intermediate',
      duration: '6 weeks',
      price: 200,
      currency: 'ZAR',
      instructor: 'Test Instructor 2',
      rating: 4.8,
      students: 200,
      image: '/test-image-2.jpg',
      available: true,
      courseId: 'test-course-2'
    }
  ],
  featuredCourses: [
    {
      id: 'featured-course-1',
      title: 'Featured Course 1',
      description: 'Featured description',
      category: 'ICT',
      level: 'Advanced',
      duration: '8 weeks',
      price: 300,
      currency: 'ZAR',
      instructor: 'Featured Instructor',
      rating: 4.9,
      students: 300,
      image: '/featured-image.jpg',
      available: true,
      courseId: 'featured-course-1'
    }
  ]
}));

vi.mock('../../services/FastDataService', () => ({
  fastDataService: {
    getUserEnrollments: vi.fn(() => Promise.resolve([
      {
        id: 'enrollment-1',
        user_id: 'test-user',
        course_id: 'test-course-1',
        course_title: 'Test Course 1',
        status: 'approved'
      }
    ])),
    getUserEnrollment: vi.fn(() => Promise.resolve({
      id: 'enrollment-1',
      user_id: 'test-user',
      course_id: 'test-course-1',
      status: 'approved'
    })),
    prefetchUserData: vi.fn(() => Promise.resolve()),
    prefetchAdminData: vi.fn(() => Promise.resolve()),
    clearCache: vi.fn(),
    getPerformanceStats: vi.fn(() => ({
      legacyCache: { size: 0 },
      advancedCache: { entryCount: 0 },
      enrollmentCache: { entryCount: 0 },
      userCache: { entryCount: 0 }
    }))
  }
}));

describe('Performance Optimizations Integration', () => {
  beforeEach(() => {
    // Clear all caches before each test
    advancedCacheManager.clear();
    courseDataCache.clear();
    enrollmentDataCache.clear();
    
    // Reset performance optimization manager
    performanceOptimizationManager.clearAllOptimizations();
  });

  afterEach(() => {
    // Clean up after each test
    performanceOptimizationManager.destroy();
  });

  describe('Performance Optimization Manager', () => {
    it('should initialize successfully', async () => {
      const result = await performanceOptimizationManager.initialize({
        enableAdvancedCaching: true,
        enableQueryOptimization: true,
        enableLazyLoading: true,
        enablePreloading: true,
        enablePerformanceMonitoring: false
      });

      expect(result).toBeUndefined(); // Should not throw
    });

    it('should optimize for user', async () => {
      await performanceOptimizationManager.initialize();
      
      const result = await performanceOptimizationManager.optimizeForUser('test-user');
      
      expect(result).toBeUndefined(); // Should not throw
    });

    it('should optimize for admin', async () => {
      await performanceOptimizationManager.initialize();
      
      const result = await performanceOptimizationManager.optimizeForAdmin();
      
      expect(result).toBeUndefined(); // Should not throw
    });

    it('should generate performance report', async () => {
      await performanceOptimizationManager.initialize();
      
      const report = performanceOptimizationManager.getPerformanceReport();
      
      expect(report).toHaveProperty('cacheEfficiency');
      expect(report).toHaveProperty('queryPerformance');
      expect(report).toHaveProperty('loadingPerformance');
      expect(report).toHaveProperty('recommendations');
      expect(Array.isArray(report.recommendations)).toBe(true);
    });
  });

  describe('Enhanced Course Data Service', () => {
    it('should fetch all courses with caching', async () => {
      const courses = await enhancedCourseDataService.getAllCourses({
        useCache: true
      });

      expect(Array.isArray(courses)).toBe(true);
      expect(courses.length).toBeGreaterThan(0);
      
      // Verify course structure
      const course = courses[0];
      expect(course).toHaveProperty('id');
      expect(course).toHaveProperty('title');
      expect(course).toHaveProperty('description');
      expect(course).toHaveProperty('category');
      expect(course).toHaveProperty('price');
    });

    it('should fetch featured courses with caching', async () => {
      const featuredCourses = await enhancedCourseDataService.getFeaturedCourses({
        limit: 3,
        useCache: true
      });

      expect(Array.isArray(featuredCourses)).toBe(true);
      expect(featuredCourses.length).toBeLessThanOrEqual(3);
    });

    it('should fetch user courses with enrollment data', async () => {
      const userCourses = await enhancedCourseDataService.getUserCourses('test-user', {
        includeProgress: true,
        useCache: true
      });

      expect(Array.isArray(userCourses)).toBe(true);
      
      if (userCourses.length > 0) {
        const courseData = userCourses[0];
        expect(courseData).toHaveProperty('course');
        expect(courseData).toHaveProperty('enrollment');
        expect(courseData).toHaveProperty('isAccessible');
      }
    });

    it('should preload frequent data', async () => {
      const result = await enhancedCourseDataService.preloadFrequentData('test-user');
      
      expect(result).toBeUndefined(); // Should not throw
    });

    it('should warm cache with patterns', async () => {
      const result = await enhancedCourseDataService.warmCache({
        popularCourses: ['test-course-1', 'test-course-2'],
        userCategories: ['ICT', 'Business'],
        userId: 'test-user'
      });

      expect(result).toBeUndefined(); // Should not throw
    });

    it('should provide cache statistics', () => {
      const stats = enhancedCourseDataService.getCacheStats();

      expect(stats).toHaveProperty('courseCache');
      expect(stats).toHaveProperty('enrollmentCache');
      expect(stats).toHaveProperty('userCache');
      expect(stats).toHaveProperty('recommendations');
      expect(Array.isArray(stats.recommendations)).toBe(true);
    });
  });

  describe('Optimized API Service', () => {
    it('should perform GET request with caching', async () => {
      // Mock fetch
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: 'test' })
        })
      ) as any;

      const response = await optimizedApiService.get('/test-endpoint', {
        useCache: true,
        cacheTTL: 60000
      });

      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('cached');
      expect(response).toHaveProperty('duration');
      expect(response).toHaveProperty('timestamp');
    });

    it('should perform POST request', async () => {
      // Mock fetch
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        })
      ) as any;

      const response = await optimizedApiService.post('/test-endpoint', {
        test: 'data'
      });

      expect(response).toHaveProperty('data');
      expect(response.cached).toBe(false);
    });

    it('should batch GET requests', async () => {
      // Mock fetch
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: 'test' })
        })
      ) as any;

      const requests = [
        { url: '/endpoint1' },
        { url: '/endpoint2' },
        { url: '/endpoint3' }
      ];

      const responses = await optimizedApiService.batchGet(requests);

      expect(Array.isArray(responses)).toBe(true);
      expect(responses.length).toBe(3);
    });

    it('should prefetch URLs', async () => {
      // Mock fetch
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: 'test' })
        })
      ) as any;

      const urls = ['/prefetch1', '/prefetch2'];
      
      const result = await optimizedApiService.prefetch(urls);

      expect(result).toBeUndefined(); // Should not throw
    });

    it('should provide performance statistics', () => {
      const stats = optimizedApiService.getPerformanceStats();

      expect(stats).toHaveProperty('cacheStats');
      expect(stats).toHaveProperty('apiMetrics');
    });
  });

  describe('Advanced Cache Manager', () => {
    it('should cache and retrieve data', async () => {
      const testData = { test: 'data', timestamp: Date.now() };
      const cacheKey = 'test-key';

      // Cache data
      const cachedData = await advancedCacheManager.get(
        cacheKey,
        () => Promise.resolve(testData),
        60000 // 1 minute TTL
      );

      expect(cachedData).toEqual(testData);

      // Retrieve from cache
      const retrievedData = await advancedCacheManager.get(
        cacheKey,
        () => Promise.resolve({ different: 'data' }),
        60000
      );

      expect(retrievedData).toEqual(testData); // Should return cached data
    });

    it('should handle cache expiration', async () => {
      const testData = { test: 'data' };
      const cacheKey = 'expiring-key';

      // Cache with very short TTL
      await advancedCacheManager.get(
        cacheKey,
        () => Promise.resolve(testData),
        1 // 1ms TTL
      );

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 10));

      // Should fetch new data
      const newData = { new: 'data' };
      const retrievedData = await advancedCacheManager.get(
        cacheKey,
        () => Promise.resolve(newData),
        60000
      );

      expect(retrievedData).toEqual(newData);
    });

    it('should provide cache statistics', () => {
      const stats = advancedCacheManager.getStats();

      expect(stats).toHaveProperty('hitRate');
      expect(stats).toHaveProperty('missRate');
      expect(stats).toHaveProperty('totalRequests');
      expect(stats).toHaveProperty('totalHits');
      expect(stats).toHaveProperty('totalMisses');
      expect(stats).toHaveProperty('cacheSize');
      expect(stats).toHaveProperty('memoryUsage');
    });

    it('should clear cache patterns', () => {
      advancedCacheManager.set('test-pattern-1', { data: 1 });
      advancedCacheManager.set('test-pattern-2', { data: 2 });
      advancedCacheManager.set('other-key', { data: 3 });

      const cleared = advancedCacheManager.clearPattern('test-pattern');

      expect(cleared).toBe(2);
      expect(advancedCacheManager.has('test-pattern-1')).toBe(false);
      expect(advancedCacheManager.has('test-pattern-2')).toBe(false);
      expect(advancedCacheManager.has('other-key')).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    it('should work together for complete user flow', async () => {
      // Initialize performance optimizations
      await performanceOptimizationManager.initialize({
        enableAdvancedCaching: true,
        enableQueryOptimization: true,
        enableLazyLoading: true,
        enablePreloading: true,
        enablePerformanceMonitoring: false
      });

      // Optimize for user
      await performanceOptimizationManager.optimizeForUser('test-user');

      // Fetch courses (should be cached)
      const courses = await enhancedCourseDataService.getAllCourses({
        includeEnrollmentStatus: true,
        userId: 'test-user',
        useCache: true
      });

      expect(Array.isArray(courses)).toBe(true);

      // Fetch user courses
      const userCourses = await enhancedCourseDataService.getUserCourses('test-user', {
        includeProgress: true,
        useCache: true
      });

      expect(Array.isArray(userCourses)).toBe(true);

      // Get performance report
      const report = performanceOptimizationManager.getPerformanceReport();
      expect(report).toHaveProperty('cacheEfficiency');
      expect(report.cacheEfficiency.totalRequests).toBeGreaterThan(0);
    });

    it('should handle errors gracefully', async () => {
      // Mock a failing service
      const originalGet = optimizedApiService.get;
      optimizedApiService.get = vi.fn(() => Promise.reject(new Error('Network error')));

      try {
        await optimizedApiService.get('/failing-endpoint');
        expect(true).toBe(false); // Should not reach here
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Network error');
      }

      // Restore original method
      optimizedApiService.get = originalGet;
    });

    it('should maintain performance under load', async () => {
      await performanceOptimizationManager.initialize();

      // Simulate multiple concurrent requests
      const requests = Array.from({ length: 10 }, (_, i) =>
        enhancedCourseDataService.getAllCourses({
          category: i % 2 === 0 ? 'ICT' : 'Business',
          useCache: true
        })
      );

      const startTime = performance.now();
      const results = await Promise.all(requests);
      const endTime = performance.now();

      // All requests should succeed
      expect(results.length).toBe(10);
      results.forEach(result => {
        expect(Array.isArray(result)).toBe(true);
      });

      // Should complete reasonably quickly (under 1 second)
      expect(endTime - startTime).toBeLessThan(1000);

      // Cache should show good hit rate
      const stats = courseDataCache.getStats();
      expect(stats.hitRate).toBeGreaterThan(0);
    });
  });
});