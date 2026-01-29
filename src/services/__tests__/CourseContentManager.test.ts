import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import CourseContentManager, { courseContentManager } from '../CourseContentManager';
import { unifiedEnrollmentManager } from '../UnifiedEnrollmentManager';
import { supabase } from '@/integrations/supabase/client';
import * as courseProgressSync from '@/utils/courseProgressSync';

// Mock dependencies
vi.mock('../UnifiedEnrollmentManager');
vi.mock('@/integrations/supabase/client');
vi.mock('@/utils/courseProgressSync');
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('CourseContentManager', () => {
  let manager: CourseContentManager;
  const mockCourseId = 'test-course-123';
  const mockUserEmail = 'test@example.com';
  const mockUserId = 'user-123';

  const mockCourse = {
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
  };

  const mockEnrollment = {
    id: 'enrollment-123',
    user_id: mockUserId,
    user_email: mockUserEmail,
    course_id: mockCourseId,
    course_title: 'Test Course',
    status: 'approved',
    progress: 0,
    enrolled_at: '2024-01-01',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    
    // Mock Supabase auth
    (supabase.auth.getUser as Mock).mockResolvedValue({
      data: { user: { id: mockUserId, email: mockUserEmail } },
      error: null,
    });

    // Mock UnifiedEnrollmentManager
    (unifiedEnrollmentManager.getUserEnrollments as Mock).mockResolvedValue([mockEnrollment]);
    (unifiedEnrollmentManager.addEventListener as Mock).mockImplementation(() => {});
    (unifiedEnrollmentManager.removeEventListener as Mock).mockImplementation(() => {});

    // Mock course progress sync
    (courseProgressSync.loadCourseProgress as Mock).mockResolvedValue(null);
    (courseProgressSync.saveCourseProgress as Mock).mockResolvedValue(true);
    (courseProgressSync.syncAllCourseProgress as Mock).mockResolvedValue(true);

    manager = new CourseContentManager();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('loadCourseContent', () => {
    it('should load course content successfully for enrolled user', async () => {
      // Mock dynamic import for course module
      vi.doMock('@/data/entrepreneurshipCourse', () => ({
        default: mockCourse,
      }));

      const state = await manager.loadCourseContent(mockCourseId, mockUserEmail);

      expect(state).toBeDefined();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.enrollmentStatus).toBe('approved');
      expect(state.course).toBeDefined();
      expect(state.modules).toHaveLength(1);
    });

    it('should handle non-enrolled user', async () => {
      (unifiedEnrollmentManager.getUserEnrollments as Mock).mockResolvedValue([]);

      const state = await manager.loadCourseContent(mockCourseId, mockUserEmail);

      expect(state.enrollmentStatus).toBe('not_enrolled');
      expect(state.loading).toBe(false);
      expect(state.course).toBeNull();
    });

    it('should use cached content when available and fresh', async () => {
      const cachedContent = {
        course: mockCourse,
        modules: mockCourse.modules,
        timestamp: Date.now() - 30000, // 30 seconds ago (fresh)
        version: '1.0',
      };

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify([[mockCourseId, cachedContent]])
      );

      const state = await manager.loadCourseContent(mockCourseId, mockUserEmail);

      expect(state.course).toEqual(mockCourse);
      expect(state.modules).toEqual(mockCourse.modules);
    });

    it('should retry on failure with exponential backoff', async () => {
      (unifiedEnrollmentManager.getUserEnrollments as Mock)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce([mockEnrollment]);

      const state = await manager.loadCourseContent(mockCourseId, mockUserEmail, {
        retryAttempts: 3,
      });

      expect(unifiedEnrollmentManager.getUserEnrollments).toHaveBeenCalledTimes(3);
      expect(state.enrollmentStatus).toBe('approved');
    });

    it('should use offline content as fallback when server fails', async () => {
      const offlineContent = {
        course: mockCourse,
        modules: mockCourse.modules,
        timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago (stale)
        version: '1.0',
      };

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify([[mockCourseId, offlineContent]])
      );

      (unifiedEnrollmentManager.getUserEnrollments as Mock).mockRejectedValue(
        new Error('Network error')
      );

      const state = await manager.loadCourseContent(mockCourseId, mockUserEmail, {
        retryAttempts: 1,
      });

      expect(state.course).toEqual(mockCourse);
      expect(state.error).toContain('offline content');
    });
  });

  describe('updateProgress', () => {
    beforeEach(async () => {
      // Load course first
      vi.doMock('@/data/entrepreneurshipCourse', () => ({
        default: mockCourse,
      }));
      await manager.loadCourseContent(mockCourseId, mockUserEmail);
    });

    it('should update progress successfully', async () => {
      const success = await manager.updateProgress(
        mockCourseId,
        mockUserEmail,
        '1',
        '1',
        50,
        { timeSpent: 300 }
      );

      expect(success).toBe(true);
      expect(courseProgressSync.saveCourseProgress).toHaveBeenCalledWith(
        mockUserId,
        mockUserEmail,
        mockCourseId,
        50,
        expect.objectContaining({
          moduleId: '1',
          lessonId: '1',
          timeSpent: 300,
        })
      );
    });

    it('should handle progress save failure and add to sync queue', async () => {
      (courseProgressSync.saveCourseProgress as Mock).mockResolvedValue(false);

      const success = await manager.updateProgress(
        mockCourseId,
        mockUserEmail,
        '1',
        '1',
        50
      );

      expect(success).toBe(true); // Still returns true as it's queued for retry
    });

    it('should update enrollment progress via UnifiedEnrollmentManager', async () => {
      (unifiedEnrollmentManager.updateEnrollmentProgress as Mock).mockResolvedValue(true);

      await manager.updateProgress(mockCourseId, mockUserEmail, '1', '1', 75);

      expect(unifiedEnrollmentManager.updateEnrollmentProgress).toHaveBeenCalledWith(
        mockCourseId,
        mockUserEmail,
        75
      );
    });
  });

  describe('enrollment status synchronization', () => {
    it('should sync enrollment status across application areas', async () => {
      const state = await manager.loadCourseContent(mockCourseId, mockUserEmail);
      expect(state.enrollmentStatus).toBe('approved');

      // Simulate enrollment status change
      const newEnrollment = { ...mockEnrollment, status: 'pending' };
      (unifiedEnrollmentManager.getUserEnrollments as Mock).mockResolvedValue([newEnrollment]);

      // Trigger sync (this would normally be called by event listener)
      await manager.loadCourseContent(mockCourseId, mockUserEmail);
      const updatedState = manager.getCourseState(mockCourseId);

      expect(updatedState?.enrollmentStatus).toBe('pending');
    });

    it('should handle enrollment approval events', async () => {
      await manager.loadCourseContent(mockCourseId, mockUserEmail);

      // Simulate enrollment approval event
      const eventCallback = (unifiedEnrollmentManager.addEventListener as Mock).mock.calls
        .find(call => call[0] === 'enrollment-status-changed')?.[1];

      if (eventCallback) {
        eventCallback(new CustomEvent('enrollment-status-changed', {
          detail: { enrollment: { course_id: mockCourseId, status: 'approved' } }
        }));
      }

      const state = manager.getCourseState(mockCourseId);
      expect(state?.enrollmentStatus).toBe('approved');
    });
  });

  describe('offline content caching', () => {
    it('should cache content for offline use', async () => {
      await manager.loadCourseContent(mockCourseId, mockUserEmail, {
        enableOfflineCache: true,
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'course-content-cache',
        expect.stringContaining(mockCourseId)
      );
    });

    it('should load from cache when offline', async () => {
      const cachedContent = {
        course: mockCourse,
        modules: mockCourse.modules,
        timestamp: Date.now(),
        version: '1.0',
      };

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify([[mockCourseId, cachedContent]])
      );

      const state = await manager.loadCourseContent(mockCourseId, mockUserEmail);

      expect(state.course).toEqual(mockCourse);
      expect(state.modules).toEqual(mockCourse.modules);
    });

    it('should clear cache when requested', () => {
      manager.clearCache(mockCourseId);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'course-content-cache',
        '[]'
      );
    });
  });

  describe('progress tracking reliability', () => {
    it('should load existing progress data', async () => {
      const progressData = {
        courseId: mockCourseId,
        moduleId: '1',
        lessonId: '1',
        progress: 75,
        completed: false,
        lastAccessed: '2024-01-01T00:00:00Z',
      };

      (courseProgressSync.loadCourseProgress as Mock).mockResolvedValue(progressData);

      const state = await manager.loadCourseContent(mockCourseId, mockUserEmail);

      expect(state.progress).toBe(75);
      expect(courseProgressSync.loadCourseProgress).toHaveBeenCalledWith(
        mockUserId,
        mockCourseId
      );
    });

    it('should sync all progress for user', async () => {
      const success = await manager.syncAllProgress(mockUserEmail);

      expect(success).toBe(true);
      expect(courseProgressSync.syncAllCourseProgress).toHaveBeenCalledWith(
        mockUserId,
        mockUserEmail
      );
    });

    it('should handle progress sync failures gracefully', async () => {
      (courseProgressSync.syncAllCourseProgress as Mock).mockResolvedValue(false);

      const success = await manager.syncAllProgress(mockUserEmail);

      expect(success).toBe(false);
    });
  });

  describe('event system', () => {
    it('should emit events for content loading', async () => {
      const eventCallback = vi.fn();
      manager.addEventListener('content-loaded', eventCallback);

      await manager.loadCourseContent(mockCourseId, mockUserEmail);

      expect(eventCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'content-loaded',
          detail: expect.objectContaining({
            courseId: mockCourseId,
          }),
        })
      );
    });

    it('should emit events for progress updates', async () => {
      const eventCallback = vi.fn();
      manager.addEventListener('progress-updated', eventCallback);

      await manager.loadCourseContent(mockCourseId, mockUserEmail);
      await manager.updateProgress(mockCourseId, mockUserEmail, '1', '1', 50);

      expect(eventCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'progress-updated',
          detail: expect.objectContaining({
            courseId: mockCourseId,
            progress: 50,
          }),
        })
      );
    });

    it('should remove event listeners properly', () => {
      const eventCallback = vi.fn();
      manager.addEventListener('content-loaded', eventCallback);
      manager.removeEventListener('content-loaded', eventCallback);

      // Event should not be called after removal
      manager.loadCourseContent(mockCourseId, mockUserEmail);
      expect(eventCallback).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle authentication errors', async () => {
      (supabase.auth.getUser as Mock).mockResolvedValue({
        data: { user: null },
        error: new Error('Not authenticated'),
      });

      const success = await manager.updateProgress(
        mockCourseId,
        mockUserEmail,
        '1',
        '1',
        50
      );

      expect(success).toBe(false);
    });

    it('should handle network errors gracefully', async () => {
      (unifiedEnrollmentManager.getUserEnrollments as Mock).mockRejectedValue(
        new Error('Network error')
      );

      const state = await manager.loadCourseContent(mockCourseId, mockUserEmail, {
        retryAttempts: 1,
      });

      expect(state.error).toContain('Network error');
    });

    it('should handle malformed cached data', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      // Should not throw and should initialize empty cache
      const newManager = new CourseContentManager();
      expect(newManager).toBeDefined();
    });
  });

  describe('singleton instance', () => {
    it('should export a singleton instance', () => {
      expect(courseContentManager).toBeInstanceOf(CourseContentManager);
    });

    it('should maintain state across multiple calls', async () => {
      await courseContentManager.loadCourseContent(mockCourseId, mockUserEmail);
      const state1 = courseContentManager.getCourseState(mockCourseId);
      const state2 = courseContentManager.getCourseState(mockCourseId);

      expect(state1).toBe(state2); // Same reference
    });
  });
});