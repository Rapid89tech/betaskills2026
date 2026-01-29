import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCourseContent } from '../useCourseContent';
import { courseContentManager } from '@/services/CourseContentManager';
import { useAuth } from '../AuthContext';

// Mock dependencies
vi.mock('@/services/CourseContentManager');
vi.mock('../AuthContext');
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useCourseContent', () => {
  const mockCourseId = 'test-course-123';
  const mockUserEmail = 'test@example.com';
  const mockUser = { id: 'user-123', email: mockUserEmail };

  const mockCourseState = {
    course: {
      id: mockCourseId,
      title: 'Test Course',
      description: 'A test course',
      category: 'Technology',
      level: 'Beginner',
      duration: '4 weeks',
      is_free: true,
      price: 0,
      currency: 'USD',
      students: 100,
      rating: 4.5,
      instructor: {
        id: 'instructor-1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'instructor@example.com',
      },
      status: 'active',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      available: true,
    },
    modules: [
      {
        id: 1,
        title: 'Module 1',
        description: 'First module',
        lessons: [
          {
            id: 1,
            title: 'Lesson 1',
            duration: '10 min',
            type: 'video' as const,
            content: {
              videoUrl: 'https://example.com/video1.mp4',
              textContent: 'Lesson content',
            },
          },
        ],
      },
    ],
    currentModule: null,
    currentLesson: null,
    loading: false,
    error: null,
    progress: 0,
    enrollmentStatus: 'approved' as const,
    offlineContent: new Map(),
    lastSyncTime: Date.now(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock useAuth
    (useAuth as Mock).mockReturnValue({
      user: mockUser,
    });

    // Mock courseContentManager
    (courseContentManager.loadCourseContent as Mock).mockResolvedValue(mockCourseState);
    (courseContentManager.updateProgress as Mock).mockResolvedValue(true);
    (courseContentManager.syncAllProgress as Mock).mockResolvedValue(true);
    (courseContentManager.clearCache as Mock).mockImplementation(() => {});
    (courseContentManager.getCourseState as Mock).mockReturnValue(null);
    (courseContentManager.addEventListener as Mock).mockImplementation(() => {});
    (courseContentManager.removeEventListener as Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useCourseContent());

      expect(result.current.state).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should auto-load course when courseId is provided', async () => {
      renderHook(() => useCourseContent(mockCourseId));

      await waitFor(() => {
        expect(courseContentManager.loadCourseContent).toHaveBeenCalledWith(
          mockCourseId,
          mockUserEmail,
          {}
        );
      });
    });

    it('should not auto-load when user is not authenticated', () => {
      (useAuth as Mock).mockReturnValue({ user: null });

      renderHook(() => useCourseContent(mockCourseId));

      expect(courseContentManager.loadCourseContent).not.toHaveBeenCalled();
    });
  });

  describe('loadCourse', () => {
    it('should load course content successfully', async () => {
      const { result } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      expect(result.current.state).toEqual(mockCourseState);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle loading errors', async () => {
      const errorMessage = 'Failed to load course';
      (courseContentManager.loadCourseContent as Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const { result } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.loading).toBe(false);
    });

    it('should handle unauthenticated user', async () => {
      (useAuth as Mock).mockReturnValue({ user: null });

      const { result } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      expect(result.current.error).toBe('User not authenticated');
      expect(courseContentManager.loadCourseContent).not.toHaveBeenCalled();
    });

    it('should pass options to courseContentManager', async () => {
      const options = { enableOfflineCache: false, retryAttempts: 5 };
      const { result } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.loadCourse(mockCourseId, options);
      });

      expect(courseContentManager.loadCourseContent).toHaveBeenCalledWith(
        mockCourseId,
        mockUserEmail,
        options
      );
    });
  });

  describe('updateProgress', () => {
    it('should update progress successfully', async () => {
      const { result } = renderHook(() => useCourseContent());

      // Load course first
      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      let success: boolean = false;
      await act(async () => {
        success = await result.current.updateProgress('1', '1', 50, { timeSpent: 300 });
      });

      expect(success).toBe(true);
      expect(courseContentManager.updateProgress).toHaveBeenCalledWith(
        mockCourseId,
        mockUserEmail,
        '1',
        '1',
        50,
        { timeSpent: 300 }
      );
      expect(result.current.state?.progress).toBe(50);
    });

    it('should handle progress update failure', async () => {
      (courseContentManager.updateProgress as Mock).mockResolvedValue(false);

      const { result } = renderHook(() => useCourseContent());

      // Load course first
      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      let success: boolean = true;
      await act(async () => {
        success = await result.current.updateProgress('1', '1', 50);
      });

      expect(success).toBe(false);
    });

    it('should not update progress without course loaded', async () => {
      const { result } = renderHook(() => useCourseContent());

      let success: boolean = true;
      await act(async () => {
        success = await result.current.updateProgress('1', '1', 50);
      });

      expect(success).toBe(false);
      expect(courseContentManager.updateProgress).not.toHaveBeenCalled();
    });

    it('should not update progress without authenticated user', async () => {
      (useAuth as Mock).mockReturnValue({ user: null });

      const { result } = renderHook(() => useCourseContent());

      let success: boolean = true;
      await act(async () => {
        success = await result.current.updateProgress('1', '1', 50);
      });

      expect(success).toBe(false);
      expect(courseContentManager.updateProgress).not.toHaveBeenCalled();
    });
  });

  describe('syncProgress', () => {
    it('should sync progress successfully', async () => {
      const { result } = renderHook(() => useCourseContent());

      let success: boolean = false;
      await act(async () => {
        success = await result.current.syncProgress();
      });

      expect(success).toBe(true);
      expect(courseContentManager.syncAllProgress).toHaveBeenCalledWith(mockUserEmail);
    });

    it('should handle sync failure', async () => {
      (courseContentManager.syncAllProgress as Mock).mockResolvedValue(false);

      const { result } = renderHook(() => useCourseContent());

      let success: boolean = true;
      await act(async () => {
        success = await result.current.syncProgress();
      });

      expect(success).toBe(false);
    });

    it('should not sync without authenticated user', async () => {
      (useAuth as Mock).mockReturnValue({ user: null });

      const { result } = renderHook(() => useCourseContent());

      let success: boolean = true;
      await act(async () => {
        success = await result.current.syncProgress();
      });

      expect(success).toBe(false);
      expect(courseContentManager.syncAllProgress).not.toHaveBeenCalled();
    });
  });

  describe('clearCache', () => {
    it('should clear cache for loaded course', async () => {
      const { result } = renderHook(() => useCourseContent());

      // Load course first
      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      act(() => {
        result.current.clearCache();
      });

      expect(courseContentManager.clearCache).toHaveBeenCalledWith(mockCourseId);
    });

    it('should not clear cache without loaded course', () => {
      const { result } = renderHook(() => useCourseContent());

      act(() => {
        result.current.clearCache();
      });

      expect(courseContentManager.clearCache).not.toHaveBeenCalled();
    });
  });

  describe('refreshContent', () => {
    it('should refresh content for loaded course', async () => {
      const { result } = renderHook(() => useCourseContent());

      // Load course first
      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      await act(async () => {
        await result.current.refreshContent();
      });

      expect(courseContentManager.loadCourseContent).toHaveBeenCalledWith(
        mockCourseId,
        mockUserEmail,
        { enableOfflineCache: false }
      );
    });

    it('should not refresh without loaded course', async () => {
      const { result } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.refreshContent();
      });

      // Should only be called once during auto-load, not for refresh
      expect(courseContentManager.loadCourseContent).toHaveBeenCalledTimes(0);
    });
  });

  describe('event listeners', () => {
    it('should setup event listeners when course is loaded', async () => {
      const { result } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      expect(courseContentManager.addEventListener).toHaveBeenCalledWith(
        'content-loaded',
        expect.any(Function)
      );
      expect(courseContentManager.addEventListener).toHaveBeenCalledWith(
        'progress-updated',
        expect.any(Function)
      );
      expect(courseContentManager.addEventListener).toHaveBeenCalledWith(
        'enrollment-status-changed',
        expect.any(Function)
      );
      expect(courseContentManager.addEventListener).toHaveBeenCalledWith(
        'enrollment-approved',
        expect.any(Function)
      );
    });

    it('should cleanup event listeners on unmount', async () => {
      const { result, unmount } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      unmount();

      expect(courseContentManager.removeEventListener).toHaveBeenCalledWith(
        'content-loaded',
        expect.any(Function)
      );
      expect(courseContentManager.removeEventListener).toHaveBeenCalledWith(
        'progress-updated',
        expect.any(Function)
      );
      expect(courseContentManager.removeEventListener).toHaveBeenCalledWith(
        'enrollment-status-changed',
        expect.any(Function)
      );
      expect(courseContentManager.removeEventListener).toHaveBeenCalledWith(
        'enrollment-approved',
        expect.any(Function)
      );
    });

    it('should handle content-loaded events', async () => {
      let contentLoadedCallback: Function | undefined;
      (courseContentManager.addEventListener as Mock).mockImplementation((event, callback) => {
        if (event === 'content-loaded') {
          contentLoadedCallback = callback;
        }
      });

      const { result } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      // Simulate content-loaded event
      const newState = { ...mockCourseState, progress: 25 };
      act(() => {
        contentLoadedCallback?.(new CustomEvent('content-loaded', {
          detail: { courseId: mockCourseId, state: newState }
        }));
      });

      expect(result.current.state).toEqual(newState);
    });

    it('should handle progress-updated events', async () => {
      let progressUpdatedCallback: Function | undefined;
      (courseContentManager.addEventListener as Mock).mockImplementation((event, callback) => {
        if (event === 'progress-updated') {
          progressUpdatedCallback = callback;
        }
      });

      const { result } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      // Simulate progress-updated event
      act(() => {
        progressUpdatedCallback?.(new CustomEvent('progress-updated', {
          detail: { courseId: mockCourseId, progress: 75 }
        }));
      });

      expect(result.current.state?.progress).toBe(75);
    });

    it('should handle enrollment-status-changed events', async () => {
      let enrollmentStatusCallback: Function | undefined;
      (courseContentManager.addEventListener as Mock).mockImplementation((event, callback) => {
        if (event === 'enrollment-status-changed') {
          enrollmentStatusCallback = callback;
        }
      });

      const { result } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      // Simulate enrollment-status-changed event
      act(() => {
        enrollmentStatusCallback?.(new CustomEvent('enrollment-status-changed', {
          detail: { courseId: mockCourseId, status: 'pending' }
        }));
      });

      expect(result.current.state?.enrollmentStatus).toBe('pending');
    });

    it('should handle enrollment-approved events', async () => {
      let enrollmentApprovedCallback: Function | undefined;
      (courseContentManager.addEventListener as Mock).mockImplementation((event, callback) => {
        if (event === 'enrollment-approved') {
          enrollmentApprovedCallback = callback;
        }
      });

      const { result } = renderHook(() => useCourseContent());

      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      // Simulate enrollment-approved event
      act(() => {
        enrollmentApprovedCallback?.(new CustomEvent('enrollment-approved', {
          detail: { courseId: mockCourseId }
        }));
      });

      // Should trigger refreshContent
      expect(courseContentManager.loadCourseContent).toHaveBeenCalledWith(
        mockCourseId,
        mockUserEmail,
        { enableOfflineCache: false }
      );
    });
  });

  describe('state management', () => {
    it('should get current state from manager if not loaded', () => {
      const existingState = { ...mockCourseState, progress: 30 };
      (courseContentManager.getCourseState as Mock).mockReturnValue(existingState);

      const { result } = renderHook(() => useCourseContent(mockCourseId));

      expect(result.current.state).toEqual(existingState);
    });

    it('should not override loaded state with manager state', async () => {
      const existingState = { ...mockCourseState, progress: 30 };
      (courseContentManager.getCourseState as Mock).mockReturnValue(existingState);

      const { result } = renderHook(() => useCourseContent());

      // Load course first
      await act(async () => {
        await result.current.loadCourse(mockCourseId);
      });

      // State should be from loadCourse, not from getCourseState
      expect(result.current.state).toEqual(mockCourseState);
    });
  });

  describe('loading states', () => {
    it('should show loading state during course load', async () => {
      let resolveLoad: (value: any) => void;
      const loadPromise = new Promise(resolve => {
        resolveLoad = resolve;
      });
      (courseContentManager.loadCourseContent as Mock).mockReturnValue(loadPromise);

      const { result } = renderHook(() => useCourseContent());

      act(() => {
        result.current.loadCourse(mockCourseId);
      });

      expect(result.current.loading).toBe(true);

      await act(async () => {
        resolveLoad!(mockCourseState);
        await loadPromise;
      });

      expect(result.current.loading).toBe(false);
    });
  });
});