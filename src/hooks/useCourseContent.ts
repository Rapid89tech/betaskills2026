import { useState, useEffect, useCallback } from 'react';
import { courseContentManager, CourseContentState, ContentLoadingOptions, ProgressTrackingData } from '@/services/CourseContentManager';
import { useAuth } from './AuthContext';
import { logger } from '@/utils/logger';

export interface UseCourseContentReturn {
  state: CourseContentState | null;
  loading: boolean;
  error: string | null;
  loadCourse: (courseId: string, options?: Partial<ContentLoadingOptions>) => Promise<void>;
  updateProgress: (moduleId: string, lessonId: string, progress: number, additionalData?: Partial<ProgressTrackingData>) => Promise<boolean>;
  syncProgress: () => Promise<boolean>;
  clearCache: () => void;
  refreshContent: () => Promise<void>;
}

export const useCourseContent = (courseId?: string): UseCourseContentReturn => {
  const [state, setState] = useState<CourseContentState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load course content
  const loadCourse = useCallback(async (
    targetCourseId: string, 
    options: Partial<ContentLoadingOptions> = {}
  ) => {
    if (!user?.email) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      logger.info('🚀 useCourseContent: Loading course:', targetCourseId);
      const courseState = await courseContentManager.loadCourseContent(
        targetCourseId, 
        user.email, 
        options
      );
      
      setState(courseState);
      setError(courseState.error);
      logger.info('✅ useCourseContent: Course loaded successfully:', targetCourseId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load course content';
      setError(errorMessage);
      logger.error('❌ useCourseContent: Failed to load course:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  // Update progress
  const updateProgress = useCallback(async (
    moduleId: string,
    lessonId: string,
    progress: number,
    additionalData: Partial<ProgressTrackingData> = {}
  ): Promise<boolean> => {
    if (!user?.email || !state?.course?.id) {
      logger.warn('⚠️ Cannot update progress: missing user or course');
      return false;
    }

    try {
      logger.info('🔄 useCourseContent: Updating progress:', {
        courseId: state.course.id,
        moduleId,
        lessonId,
        progress
      });

      const success = await courseContentManager.updateProgress(
        state.course.id,
        user.email,
        moduleId,
        lessonId,
        progress,
        additionalData
      );

      if (success) {
        // Update local state
        setState(prevState => {
          if (!prevState) return prevState;
          return {
            ...prevState,
            progress,
          };
        });
      }

      return success;
    } catch (err) {
      logger.error('❌ useCourseContent: Failed to update progress:', err);
      return false;
    }
  }, [user?.email, state?.course?.id]);

  // Sync all progress
  const syncProgress = useCallback(async (): Promise<boolean> => {
    if (!user?.email) {
      return false;
    }

    try {
      logger.info('🔄 useCourseContent: Syncing all progress for user:', user.email);
      return await courseContentManager.syncAllProgress(user.email);
    } catch (err) {
      logger.error('❌ useCourseContent: Failed to sync progress:', err);
      return false;
    }
  }, [user?.email]);

  // Clear cache
  const clearCache = useCallback(() => {
    if (state?.course?.id) {
      courseContentManager.clearCache(state.course.id);
      logger.info('🧹 useCourseContent: Cache cleared for course:', state.course.id);
    }
  }, [state?.course?.id]);

  // Refresh content
  const refreshContent = useCallback(async () => {
    if (state?.course?.id) {
      await loadCourse(state.course.id, { enableOfflineCache: false });
    }
  }, [state?.course?.id, loadCourse]);

  // Auto-load course if courseId is provided
  useEffect(() => {
    if (courseId && user?.email) {
      loadCourse(courseId);
    }
  }, [courseId, user?.email, loadCourse]);

  // Setup event listeners for real-time updates
  useEffect(() => {
    if (!state?.course?.id) return;

    const courseId = state.course.id;

    const handleContentLoaded = (event: CustomEvent) => {
      if (event.detail.courseId === courseId) {
        logger.info('🔄 useCourseContent: Content loaded event received');
        setState(event.detail.state);
      }
    };

    const handleProgressUpdated = (event: CustomEvent) => {
      if (event.detail.courseId === courseId) {
        logger.info('🔄 useCourseContent: Progress updated event received');
        setState(prevState => {
          if (!prevState) return prevState;
          return {
            ...prevState,
            progress: event.detail.progress,
          };
        });
      }
    };

    const handleEnrollmentStatusChanged = (event: CustomEvent) => {
      if (event.detail.courseId === courseId) {
        logger.info('🔄 useCourseContent: Enrollment status changed:', event.detail.status);
        setState(prevState => {
          if (!prevState) return prevState;
          return {
            ...prevState,
            enrollmentStatus: event.detail.status,
          };
        });
      }
    };

    const handleEnrollmentApproved = (event: CustomEvent) => {
      if (event.detail.courseId === courseId) {
        logger.info('🎉 useCourseContent: Enrollment approved, refreshing content');
        refreshContent();
      }
    };

    // Add event listeners
    courseContentManager.addEventListener('content-loaded', handleContentLoaded);
    courseContentManager.addEventListener('progress-updated', handleProgressUpdated);
    courseContentManager.addEventListener('enrollment-status-changed', handleEnrollmentStatusChanged);
    courseContentManager.addEventListener('enrollment-approved', handleEnrollmentApproved);

    return () => {
      // Cleanup event listeners
      courseContentManager.removeEventListener('content-loaded', handleContentLoaded);
      courseContentManager.removeEventListener('progress-updated', handleProgressUpdated);
      courseContentManager.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChanged);
      courseContentManager.removeEventListener('enrollment-approved', handleEnrollmentApproved);
    };
  }, [state?.course?.id, refreshContent]);

  // Get current state from manager if not loaded yet
  useEffect(() => {
    if (courseId && !state) {
      const currentState = courseContentManager.getCourseState(courseId);
      if (currentState) {
        setState(currentState);
      }
    }
  }, [courseId, state]);

  return {
    state,
    loading,
    error,
    loadCourse,
    updateProgress,
    syncProgress,
    clearCache,
    refreshContent,
  };
};