/**
 * useCourseOrganizer Hook Tests
 * 
 * Tests for the useCourseOrganizer React hook including:
 * - Course organization functionality
 * - Real-time updates and subscriptions
 * - Error handling and loading states
 * - Cache management
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCourseOrganizer } from '../useCourseOrganizer';
import { courseOrganizer } from '@/services/CourseOrganizer';
import { Course } from '@/types/course';
import { CoursePriority } from '@/types/enrollment';

// Mock the CourseOrganizer service
vi.mock('@/services/CourseOrganizer', () => ({
  courseOrganizer: {
    organizeCourses: vi.fn(),
    getCoursePriorities: vi.fn(),
    updateCoursePriority: vi.fn(),
    subscribeToRealtimeUpdates: vi.fn(),
    subscribeToPriorityUpdates: vi.fn(),
    clearCache: vi.fn()
  }
}));

// Mock the useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn()
}));

import { useAuth } from '@/hooks/useAuth';

describe('useCourseOrganizer', () => {
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com'
  };

  const sampleCourses: Course[] = [
    {
      id: 'course-1',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics',
      category: 'Programming',
      level: 'Beginner',
      duration: '4 weeks',
      is_free: false,
      price: 99,
      currency: 'USD',
      students: 150,
      rating: 4.5,
      instructor: {
        id: 'instructor-1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com'
      },
      status: 'active',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      available: true
    },
    {
      id: 'course-2',
      title: 'React Advanced',
      description: 'Advanced React concepts',
      category: 'Programming',
      level: 'Advanced',
      duration: '6 weeks',
      is_free: false,
      price: 149,
      currency: 'USD',
      students: 89,
      rating: 4.8,
      instructor: {
        id: 'instructor-2',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com'
      },
      status: 'active',
      created_at: '2024-01-02T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
      available: true
    }
  ];

  const samplePriorities: CoursePriority[] = [
    {
      courseId: 'course-1',
      userId: 'user-1',
      priority: 100,
      enrollmentStatus: 'ENROLLED',
      lastUpdated: new Date('2024-01-10T10:00:00Z')
    },
    {
      courseId: 'course-2',
      userId: 'user-1',
      priority: 50,
      enrollmentStatus: 'PENDING',
      lastUpdated: new Date('2024-01-11T10:00:00Z')
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mocks
    (useAuth as any).mockReturnValue({ user: mockUser });
    (courseOrganizer.organizeCourses as any).mockResolvedValue(sampleCourses);
    (courseOrganizer.getCoursePriorities as any).mockResolvedValue(samplePriorities);
    (courseOrganizer.updateCoursePriority as any).mockResolvedValue(undefined);
    (courseOrganizer.subscribeToRealtimeUpdates as any).mockReturnValue(() => {});
    (courseOrganizer.subscribeToPriorityUpdates as any).mockReturnValue(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useCourseOrganizer());

      expect(result.current.organizedCourses).toEqual([]);
      expect(result.current.coursePriorities).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('should load priorities on mount when user is available', async () => {
      renderHook(() => useCourseOrganizer());

      await waitFor(() => {
        expect(courseOrganizer.getCoursePriorities).toHaveBeenCalledWith('user-1');
      });
    });

    it('should not load priorities when no user is available', () => {
      (useAuth as any).mockReturnValue({ user: null });

      renderHook(() => useCourseOrganizer());

      expect(courseOrganizer.getCoursePriorities).not.toHaveBeenCalled();
    });
  });

  describe('Course Organization', () => {
    it('should organize courses successfully', async () => {
      const { result } = renderHook(() => useCourseOrganizer());

      await act(async () => {
        await result.current.organizeCourses(sampleCourses);
      });

      expect(courseOrganizer.organizeCourses).toHaveBeenCalledWith(sampleCourses, 'user-1');
      expect(result.current.organizedCourses).toEqual(sampleCourses);
      expect(result.current.error).toBe(null);
    });

    it('should handle empty course list', async () => {
      const { result } = renderHook(() => useCourseOrganizer());

      await act(async () => {
        await result.current.organizeCourses([]);
      });

      expect(result.current.organizedCourses).toEqual([]);
      expect(courseOrganizer.organizeCourses).not.toHaveBeenCalled();
    });

    it('should handle organization errors gracefully', async () => {
      const error = new Error('Organization failed');
      (courseOrganizer.organizeCourses as any).mockRejectedValue(error);

      const { result } = renderHook(() => useCourseOrganizer());

      await act(async () => {
        await result.current.organizeCourses(sampleCourses);
      });

      expect(result.current.error).toBe('Organization failed');
      expect(result.current.organizedCourses).toEqual(sampleCourses); // Fallback to original
    });

    it('should show loading state during organization', async () => {
      let resolvePromise: (value: Course[]) => void;
      const promise = new Promise<Course[]>((resolve) => {
        resolvePromise = resolve;
      });
      (courseOrganizer.organizeCourses as any).mockReturnValue(promise);

      const { result } = renderHook(() => useCourseOrganizer());

      // Start organization
      act(() => {
        result.current.organizeCourses(sampleCourses);
      });

      // Should be loading
      expect(result.current.isLoading).toBe(true);

      // Resolve promise
      await act(async () => {
        resolvePromise!(sampleCourses);
        await promise;
      });

      // Should not be loading anymore
      expect(result.current.isLoading).toBe(false);
    });

    it('should not organize when no user is logged in', async () => {
      (useAuth as any).mockReturnValue({ user: null });

      const { result } = renderHook(() => useCourseOrganizer());

      await act(async () => {
        await result.current.organizeCourses(sampleCourses);
      });

      expect(courseOrganizer.organizeCourses).not.toHaveBeenCalled();
      expect(result.current.organizedCourses).toEqual(sampleCourses);
    });
  });

  describe('Priority Management', () => {
    it('should refresh priorities successfully', async () => {
      const { result } = renderHook(() => useCourseOrganizer());

      await act(async () => {
        await result.current.refreshPriorities();
      });

      expect(courseOrganizer.getCoursePriorities).toHaveBeenCalledWith('user-1');
      expect(result.current.coursePriorities).toEqual(samplePriorities);
    });

    it('should handle priority refresh errors', async () => {
      const error = new Error('Priority fetch failed');
      (courseOrganizer.getCoursePriorities as any).mockRejectedValue(error);

      const { result } = renderHook(() => useCourseOrganizer());

      await act(async () => {
        await result.current.refreshPriorities();
      });

      expect(result.current.error).toBe('Priority fetch failed');
    });

    it('should update course priority successfully', async () => {
      const { result } = renderHook(() => useCourseOrganizer());

      await act(async () => {
        await result.current.updateCoursePriority('course-1', 'ENROLLED');
      });

      expect(courseOrganizer.updateCoursePriority).toHaveBeenCalledWith('user-1', 'course-1', 'ENROLLED');
      expect(courseOrganizer.getCoursePriorities).toHaveBeenCalledWith('user-1'); // Should refresh after update
    });

    it('should handle priority update errors', async () => {
      const error = new Error('Priority update failed');
      (courseOrganizer.updateCoursePriority as any).mockRejectedValue(error);

      const { result } = renderHook(() => useCourseOrganizer());

      await act(async () => {
        await result.current.updateCoursePriority('course-1', 'ENROLLED');
      });

      expect(result.current.error).toBe('Priority update failed');
    });

    it('should not update priority when no user is logged in', async () => {
      (useAuth as any).mockReturnValue({ user: null });

      const { result } = renderHook(() => useCourseOrganizer());

      await act(async () => {
        await result.current.updateCoursePriority('course-1', 'ENROLLED');
      });

      expect(courseOrganizer.updateCoursePriority).not.toHaveBeenCalled();
    });
  });

  describe('Real-time Subscriptions', () => {
    it('should setup subscriptions when autoUpdate is enabled', () => {
      renderHook(() => useCourseOrganizer({ autoUpdate: true }));

      expect(courseOrganizer.subscribeToRealtimeUpdates).toHaveBeenCalled();
      expect(courseOrganizer.subscribeToPriorityUpdates).toHaveBeenCalled();
    });

    it('should not setup subscriptions when autoUpdate is disabled', () => {
      renderHook(() => useCourseOrganizer({ autoUpdate: false }));

      expect(courseOrganizer.subscribeToRealtimeUpdates).not.toHaveBeenCalled();
      expect(courseOrganizer.subscribeToPriorityUpdates).not.toHaveBeenCalled();
    });

    it('should not setup subscriptions when no user is available', () => {
      (useAuth as any).mockReturnValue({ user: null });

      renderHook(() => useCourseOrganizer({ autoUpdate: true }));

      expect(courseOrganizer.subscribeToRealtimeUpdates).not.toHaveBeenCalled();
      expect(courseOrganizer.subscribeToPriorityUpdates).not.toHaveBeenCalled();
    });

    it('should cleanup subscriptions on unmount', () => {
      const unsubscribeMock = vi.fn();
      (courseOrganizer.subscribeToRealtimeUpdates as any).mockReturnValue(unsubscribeMock);
      (courseOrganizer.subscribeToPriorityUpdates as any).mockReturnValue(unsubscribeMock);

      const { unmount } = renderHook(() => useCourseOrganizer({ autoUpdate: true }));

      unmount();

      expect(unsubscribeMock).toHaveBeenCalledTimes(2); // Once for each subscription
    });

    it('should handle real-time course list updates', () => {
      let courseUpdateCallback: any;
      (courseOrganizer.subscribeToRealtimeUpdates as any).mockImplementation((callback) => {
        courseUpdateCallback = callback;
        return () => {};
      });

      const { result } = renderHook(() => useCourseOrganizer({ autoUpdate: true }));

      // Simulate real-time update
      const updatedCourses = [...sampleCourses, { ...sampleCourses[0], id: 'course-3' }];
      
      act(() => {
        courseUpdateCallback(updatedCourses);
      });

      expect(result.current.organizedCourses).toEqual(updatedCourses);
    });

    it('should handle real-time priority updates', () => {
      let priorityUpdateCallback: any;
      (courseOrganizer.subscribeToPriorityUpdates as any).mockImplementation((callback) => {
        priorityUpdateCallback = callback;
        return () => {};
      });

      const { result } = renderHook(() => useCourseOrganizer({ autoUpdate: true }));

      // Simulate real-time update
      const updatedPriorities = [...samplePriorities, {
        courseId: 'course-3',
        userId: 'user-1',
        priority: 75,
        enrollmentStatus: 'PENDING' as const,
        lastUpdated: new Date()
      }];
      
      act(() => {
        priorityUpdateCallback(updatedPriorities);
      });

      expect(result.current.coursePriorities).toEqual(updatedPriorities);
    });
  });

  describe('Cache Management', () => {
    it('should clear cache when enabled', () => {
      const { result } = renderHook(() => useCourseOrganizer({ enableCaching: true }));

      act(() => {
        result.current.clearCache();
      });

      expect(courseOrganizer.clearCache).toHaveBeenCalledWith('user-1');
    });

    it('should not clear cache when disabled', () => {
      const { result } = renderHook(() => useCourseOrganizer({ enableCaching: false }));

      act(() => {
        result.current.clearCache();
      });

      expect(courseOrganizer.clearCache).not.toHaveBeenCalled();
    });
  });

  describe('User Changes', () => {
    it('should refresh priorities when user changes', async () => {
      const { rerender } = renderHook(
        ({ user }) => {
          (useAuth as any).mockReturnValue({ user });
          return useCourseOrganizer();
        },
        { initialProps: { user: mockUser } }
      );

      // Clear the initial call
      vi.clearAllMocks();

      // Change user
      const newUser = { id: 'user-2', email: 'user2@example.com' };
      rerender({ user: newUser });

      await waitFor(() => {
        expect(courseOrganizer.getCoursePriorities).toHaveBeenCalledWith('user-2');
      });
    });

    it('should clear priorities when user logs out', () => {
      const { rerender, result } = renderHook(
        ({ user }) => {
          (useAuth as any).mockReturnValue({ user });
          return useCourseOrganizer();
        },
        { initialProps: { user: mockUser } }
      );

      // User logs out
      rerender({ user: null });

      expect(result.current.coursePriorities).toEqual([]);
    });
  });

  describe('Error Handling', () => {
    it('should handle component unmount during async operations', async () => {
      let resolvePromise: (value: CoursePriority[]) => void;
      const promise = new Promise<CoursePriority[]>((resolve) => {
        resolvePromise = resolve;
      });
      (courseOrganizer.getCoursePriorities as any).mockReturnValue(promise);

      const { result, unmount } = renderHook(() => useCourseOrganizer());

      // Start async operation
      act(() => {
        result.current.refreshPriorities();
      });

      // Unmount before completion
      unmount();

      // Resolve promise after unmount
      await act(async () => {
        resolvePromise!(samplePriorities);
        await promise;
      });

      // Should not cause any errors or state updates
      // (This test mainly ensures no memory leaks or errors occur)
    });

    it('should reset error state on successful operations', async () => {
      // First, cause an error
      (courseOrganizer.organizeCourses as any).mockRejectedValue(new Error('First error'));

      const { result } = renderHook(() => useCourseOrganizer());

      await act(async () => {
        await result.current.organizeCourses(sampleCourses);
      });

      expect(result.current.error).toBe('First error');

      // Then, make it succeed
      (courseOrganizer.organizeCourses as any).mockResolvedValue(sampleCourses);

      await act(async () => {
        await result.current.organizeCourses(sampleCourses);
      });

      expect(result.current.error).toBe(null);
    });
  });
});