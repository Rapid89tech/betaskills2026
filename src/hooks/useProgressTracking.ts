import { useState, useEffect, useCallback } from 'react';
import { progressTrackingService, type ProgressData } from '@/services/ProgressTrackingService';

export interface EnrollmentProgress {
  enrollmentId: string;
  userId: string;
  courseId: string;
  progressPercentage: number;
  progressData: ProgressData | null;
  loading: boolean;
  error: string | null;
}

export const useProgressTracking = () => {
  const [enrollmentProgress, setEnrollmentProgress] = useState<Map<string, EnrollmentProgress>>(new Map());
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize progress tracking service
  useEffect(() => {
    const initializeService = async () => {
      try {
        await progressTrackingService.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize progress tracking service:', error);
      }
    };

    initializeService();
  }, []);

  // Subscribe to progress updates
  useEffect(() => {
    if (!isInitialized) return;

    const unsubscribe = progressTrackingService.subscribeToProgressUpdates((progressData: ProgressData) => {
      setEnrollmentProgress(prev => {
        const updated = new Map(prev);
        updated.set(progressData.enrollmentId, {
          enrollmentId: progressData.enrollmentId,
          userId: progressData.userId,
          courseId: progressData.courseId,
          progressPercentage: progressData.overallProgress,
          progressData,
          loading: false,
          error: null
        });

        return updated;
      });
    });

    return unsubscribe;
  }, [isInitialized]);

  // Get progress for a specific enrollment
  const getEnrollmentProgress = useCallback(async (enrollmentId: string, userId: string, courseId: string): Promise<EnrollmentProgress> => {
    // Check if we already have this progress data
    const existing = enrollmentProgress.get(enrollmentId);
    if (existing && !existing.loading) {
      return existing;
    }

    // Set loading state
    const loadingProgress: EnrollmentProgress = {
      enrollmentId,
      userId,
      courseId,
      progressPercentage: 0,
      progressData: null,
      loading: true,
      error: null
    };

    setEnrollmentProgress(prev => {
      const updated = new Map(prev);
      updated.set(enrollmentId, loadingProgress);
      return updated;
    });

    try {
      const progressData = await progressTrackingService.getUserProgress(userId, courseId);
      
      const result: EnrollmentProgress = {
        enrollmentId,
        userId,
        courseId,
        progressPercentage: progressData?.overallProgress || 0,
        progressData,
        loading: false,
        error: null
      };

      setEnrollmentProgress(prev => {
        const updated = new Map(prev);
        updated.set(enrollmentId, result);
        return updated;
      });

      return result;
    } catch (error) {
      const errorResult: EnrollmentProgress = {
        enrollmentId,
        userId,
        courseId,
        progressPercentage: 0,
        progressData: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load progress'
      };

      setEnrollmentProgress(prev => {
        const updated = new Map(prev);
        updated.set(enrollmentId, errorResult);
        return updated;
      });

      return errorResult;
    }
  }, [enrollmentProgress]);

  // Get progress for multiple enrollments
  const getEnrollmentProgressBatch = useCallback(async (enrollments: Array<{ id: string; user_id: string; course_id: string }>): Promise<Map<string, EnrollmentProgress>> => {
    try {
      const enrollmentIds = enrollments.map(e => e.id);
      const progressMap = await progressTrackingService.getEnrollmentProgressBatch(enrollmentIds);
      
      const resultMap = new Map<string, EnrollmentProgress>();
      
      for (const enrollment of enrollments) {
        const progressData = progressMap.get(enrollment.id);
        
        const enrollmentProgress: EnrollmentProgress = {
          enrollmentId: enrollment.id,
          userId: enrollment.user_id,
          courseId: enrollment.course_id,
          progressPercentage: progressData?.overallProgress || 0,
          progressData: progressData || null,
          loading: false,
          error: null
        };
        
        resultMap.set(enrollment.id, enrollmentProgress);
      }

      // Update local state
      setEnrollmentProgress(prev => {
        const updated = new Map(prev);
        resultMap.forEach((progress, enrollmentId) => {
          updated.set(enrollmentId, progress);
        });
        return updated;
      });

      return resultMap;
    } catch (error) {
      console.error('Error getting enrollment progress batch:', error);
      
      // Return error states for all enrollments
      const errorMap = new Map<string, EnrollmentProgress>();
      for (const enrollment of enrollments) {
        errorMap.set(enrollment.id, {
          enrollmentId: enrollment.id,
          userId: enrollment.user_id,
          courseId: enrollment.course_id,
          progressPercentage: 0,
          progressData: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load progress'
        });
      }
      
      return errorMap;
    }
  }, []);

  // Get progress percentage for a specific enrollment
  const getProgressPercentage = useCallback((enrollmentId: string): number => {
    const progress = enrollmentProgress.get(enrollmentId);
    return progress?.progressPercentage || 0;
  }, [enrollmentProgress]);

  // Check if progress is loading for a specific enrollment
  const isProgressLoading = useCallback((enrollmentId: string): boolean => {
    const progress = enrollmentProgress.get(enrollmentId);
    return progress?.loading || false;
  }, [enrollmentProgress]);

  // Get progress error for a specific enrollment
  const getProgressError = useCallback((enrollmentId: string): string | null => {
    const progress = enrollmentProgress.get(enrollmentId);
    return progress?.error || null;
  }, [enrollmentProgress]);

  // Get detailed progress data for a specific enrollment
  const getDetailedProgress = useCallback((enrollmentId: string): ProgressData | null => {
    const progress = enrollmentProgress.get(enrollmentId);
    return progress?.progressData || null;
  }, [enrollmentProgress]);

  // Refresh progress for a specific enrollment
  const refreshEnrollmentProgress = useCallback(async (enrollmentId: string, userId: string, courseId: string): Promise<void> => {
    await getEnrollmentProgress(enrollmentId, userId, courseId);
  }, [getEnrollmentProgress]);

  // Clear progress data (useful for cleanup)
  const clearProgressData = useCallback(() => {
    setEnrollmentProgress(new Map());
  }, []);

  return {
    // State
    enrollmentProgress,
    isInitialized,
    
    // Methods
    getEnrollmentProgress,
    getEnrollmentProgressBatch,
    getProgressPercentage,
    isProgressLoading,
    getProgressError,
    getDetailedProgress,
    refreshEnrollmentProgress,
    clearProgressData
  };
};