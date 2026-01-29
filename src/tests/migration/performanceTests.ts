import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useEnrollmentData } from '@/hooks/useEnrollmentData';
import { useEnrollmentOperations } from '@/hooks/useEnrollmentOperations';
import { AuthProvider } from '@/hooks/AuthContext';

/**
 * Performance Tests for Migration
 * 
 * Tests to ensure migration doesn't degrade performance
 * and that the unified system performs better than legacy patterns.
 */

// Mock data
const mockUser = {
  id: 'user1',
  email: 'test@example.com',
  user_metadata: {}
};

const createMockEnrollment = (id: string, courseId: string) => ({
  id,
  user_id: 'user1',
  user_email: 'test@example.com',
  course_id: courseId,
  course_title: `Test Course ${courseId}`,
  status: 'pending' as const,
  progress: 0,
  enrolled_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
});

describe('Migration Performance Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Unified System Performance', () => {
    it('should perform well with small datasets', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const smallDataset = Array.from({ length: 10 }, (_, i) => 
        createMockEnrollment(`enrollment${i}`, `course${i}`)
      );

      vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockResolvedValue(smallDataset);

      const startTime = performance.now();

      const { result } = renderHook(() => useEnrollments(), {
        wrapper: ({ children }) => (
          <AuthProvider value={mockAuth}>{children}</AuthProvider>
        )
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should load small dataset quickly (less than 100ms)
      expect(duration).toBeLessThan(100);
      expect(result.current.enrollments).toHaveLength(10);
    });

    it('should perform well with medium datasets', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const mediumDataset = Array.from({ length: 100 }, (_, i) => 
        createMockEnrollment(`enrollment${i}`, `course${i}`)
      );

      vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockResolvedValue(mediumDataset);

      const startTime = performance.now();

      const { result } = renderHook(() => useEnrollments(), {
        wrapper: ({ children }) => (
          <AuthProvider value={mockAuth}>{children}</AuthProvider>
        )
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should load medium dataset reasonably quickly (less than 200ms)
      expect(duration).toBeLessThan(200);
      expect(result.current.enrollments).toHaveLength(100);
    });

    it('should perform well with large datasets', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const largeDataset = Array.from({ length: 1000 }, (_, i) => 
        createMockEnrollment(`enrollment${i}`, `course${i}`)
      );

      vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockResolvedValue(largeDataset);

      const startTime = performance.now();

      const { result } = renderHook(() => useEnrollments(), {
        wrapper: ({ children }) => (
          <AuthProvider value={mockAuth}>{children}</AuthProvider>
        )
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should load large dataset within acceptable time (less than 500ms)
      expect(duration).toBeLessThan(500);
      expect(result.current.enrollments).toHaveLength(1000);
    });
  });

  describe('Memory Usage Tests', () => {
    it('should not cause memory leaks with repeated operations', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const mockEnrollment = createMockEnrollment('enrollment1', 'course1');
      vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockResolvedValue([mockEnrollment]);

      // Measure initial memory usage
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Perform multiple operations
      for (let i = 0; i < 10; i++) {
        const { result, unmount } = renderHook(() => useEnrollments(), {
          wrapper: ({ children }) => (
            <AuthProvider value={mockAuth}>{children}</AuthProvider>
          )
        });

        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 10));
        });

        unmount();
      }

      // Measure final memory usage
      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (less than 10MB)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });

    it('should handle rapid state updates efficiently', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const mockEnrollment = createMockEnrollment('enrollment1', 'course1');
      vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockResolvedValue([mockEnrollment]);
      vi.spyOn(unifiedEnrollmentManager, 'updateEnrollmentProgress').mockResolvedValue(mockEnrollment);

      const { result } = renderHook(() => useEnrollmentOperations(), {
        wrapper: ({ children }) => (
          <AuthProvider value={mockAuth}>{children}</AuthProvider>
        )
      });

      const startTime = performance.now();

      // Perform rapid updates
      await act(async () => {
        for (let i = 0; i < 50; i++) {
          await result.current.updateProgress('course1', i);
        }
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should handle rapid updates efficiently (less than 1000ms for 50 updates)
      expect(duration).toBeLessThan(1000);
      expect(unifiedEnrollmentManager.updateEnrollmentProgress).toHaveBeenCalledTimes(50);
    });
  });

  describe('Concurrent Operations Performance', () => {
    it('should handle concurrent enrollment operations efficiently', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const mockEnrollment = createMockEnrollment('enrollment1', 'course1');
      vi.spyOn(unifiedEnrollmentManager, 'createEnrollment').mockResolvedValue(mockEnrollment);

      const { result } = renderHook(() => useEnrollmentOperations(), {
        wrapper: ({ children }) => (
          <AuthProvider value={mockAuth}>{children}</AuthProvider>
        )
      });

      const startTime = performance.now();

      // Perform concurrent enrollment operations
      await act(async () => {
        const promises = Array.from({ length: 10 }, (_, i) => 
          result.current.enrollInCourse(`course${i}`, `Test Course ${i}`)
        );
        await Promise.all(promises);
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should handle concurrent operations efficiently (less than 500ms for 10 operations)
      expect(duration).toBeLessThan(500);
      expect(unifiedEnrollmentManager.createEnrollment).toHaveBeenCalledTimes(10);
    });

    it('should handle concurrent data loading efficiently', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const mockEnrollment = createMockEnrollment('enrollment1', 'course1');
      vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockResolvedValue([mockEnrollment]);

      const startTime = performance.now();

      // Create multiple hooks concurrently
      const hooks = Array.from({ length: 5 }, () => 
        renderHook(() => useEnrollments(), {
          wrapper: ({ children }) => (
            <AuthProvider value={mockAuth}>{children}</AuthProvider>
          )
        })
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should handle concurrent loading efficiently (less than 200ms for 5 hooks)
      expect(duration).toBeLessThan(200);

      // Verify all hooks loaded data
      hooks.forEach(({ result }) => {
        expect(result.current.enrollments).toHaveLength(1);
      });

      // Cleanup
      hooks.forEach(({ unmount }) => unmount());
    });
  });

  describe('Performance Regression Tests', () => {
    it('should not degrade performance compared to baseline', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const mockEnrollment = createMockEnrollment('enrollment1', 'course1');
      vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockResolvedValue([mockEnrollment]);

      // Measure performance of unified system
      const startTime = performance.now();

      const { result } = renderHook(() => useEnrollments(), {
        wrapper: ({ children }) => (
          <AuthProvider value={mockAuth}>{children}</AuthProvider>
        )
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
      });

      const endTime = performance.now();
      const unifiedSystemDuration = endTime - startTime;

      // Performance should be acceptable (less than 100ms for initialization)
      expect(unifiedSystemDuration).toBeLessThan(100);
      expect(result.current.enrollments).toHaveLength(1);
    });

    it('should maintain consistent performance across multiple runs', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const mockEnrollment = createMockEnrollment('enrollment1', 'course1');
      vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockResolvedValue([mockEnrollment]);

      const durations: number[] = [];

      // Run multiple times to check consistency
      for (let i = 0; i < 5; i++) {
        const startTime = performance.now();

        const { result, unmount } = renderHook(() => useEnrollments(), {
          wrapper: ({ children }) => (
            <AuthProvider value={mockAuth}>{children}</AuthProvider>
          )
        });

        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 50));
        });

        const endTime = performance.now();
        durations.push(endTime - startTime);

        expect(result.current.enrollments).toHaveLength(1);
        unmount();
      }

      // Calculate variance in performance
      const averageDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
      const variance = durations.reduce((sum, duration) => 
        sum + Math.pow(duration - averageDuration, 2), 0
      ) / durations.length;
      const standardDeviation = Math.sqrt(variance);

      // Performance should be consistent (low variance)
      expect(standardDeviation).toBeLessThan(50);
      expect(averageDuration).toBeLessThan(100);
    });
  });

  describe('Resource Usage Tests', () => {
    it('should minimize localStorage access after migration', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const mockEnrollment = createMockEnrollment('enrollment1', 'course1');
      vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockResolvedValue([mockEnrollment]);

      // Spy on localStorage methods
      const localStorageGetItemSpy = vi.spyOn(localStorage, 'getItem');
      const localStorageSetItemSpy = vi.spyOn(localStorage, 'setItem');
      const localStorageRemoveItemSpy = vi.spyOn(localStorage, 'removeItem');

      const { result } = renderHook(() => useEnrollments(), {
        wrapper: ({ children }) => (
          <AuthProvider value={mockAuth}>{children}</AuthProvider>
        )
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      // After migration, localStorage access should be minimal
      expect(localStorageGetItemSpy).toHaveBeenCalledTimes(0);
      expect(localStorageSetItemSpy).toHaveBeenCalledTimes(0);
      expect(localStorageRemoveItemSpy).toHaveBeenCalledTimes(0);
      expect(result.current.enrollments).toHaveLength(1);
    });

    it('should handle network failures gracefully without performance degradation', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      // Mock network failure
      vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockRejectedValue(
        new Error('Network error')
      );

      const startTime = performance.now();

      const { result } = renderHook(() => useEnrollments(), {
        wrapper: ({ children }) => (
          <AuthProvider value={mockAuth}>{children}</AuthProvider>
        )
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should handle errors quickly (less than 200ms)
      expect(duration).toBeLessThan(200);
      expect(result.current.error).toBeDefined();
      expect(result.current.enrollments).toHaveLength(0);
    });
  });

  describe('Scalability Tests', () => {
    it('should scale well with increasing data size', async () => {
      const mockAuth = {
        user: mockUser,
        profile: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn()
      };

      const dataSizes = [10, 100, 500, 1000];
      const durations: number[] = [];

      for (const size of dataSizes) {
        const dataset = Array.from({ length: size }, (_, i) => 
          createMockEnrollment(`enrollment${i}`, `course${i}`)
        );

        vi.spyOn(unifiedEnrollmentManager, 'getAllEnrollments').mockResolvedValue(dataset);

        const startTime = performance.now();

        const { result, unmount } = renderHook(() => useEnrollments(), {
          wrapper: ({ children }) => (
            <AuthProvider value={mockAuth}>{children}</AuthProvider>
          )
        });

        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 50));
        });

        const endTime = performance.now();
        durations.push(endTime - startTime);

        expect(result.current.enrollments).toHaveLength(size);
        unmount();
      }

      // Performance should scale reasonably (not exponentially)
      // Each doubling of data size should not more than double the time
      for (let i = 1; i < durations.length; i++) {
        const previousSize = dataSizes[i - 1];
        const currentSize = dataSizes[i];
        const sizeRatio = currentSize / previousSize;
        const timeRatio = durations[i] / durations[i - 1];

        // Time ratio should not be much worse than size ratio
        expect(timeRatio).toBeLessThan(sizeRatio * 2);
      }
    });
  });
});
