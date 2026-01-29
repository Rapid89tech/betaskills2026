import { useEnrollments } from '@/hooks/useEnrollments';
import { useCourseData } from '@/hooks/useCourseData';
import { useEnhancedCourseNavigation } from '@/hooks/useEnhancedCourseNavigation';
import { useQuizState } from '@/hooks/useQuizState';
import { useCourseEnrollment } from '@/hooks/useCourseEnrollment';
import { useAuth } from '@/hooks/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCallback } from 'react';

export const useEnhancedCourseLogic = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { enrollments, enrollInCourse, updateProgress, isEnrolled, getEnrollment } = useEnrollments();
  const { course, allLessons, isLoading } = useCourseData();
  
  // Enhanced navigation with automatic progress saving and conflict resolution
  const {
    currentModule,
    currentLesson,
    currentLessonData,
    progress,
    completedLessons,
    isLoading: navigationLoading,
    isTransitioning,
    lastSaved,
    sidebarOpen,
    setSidebarOpen,
    isPlaying,
    setIsPlaying,
    navigateToLesson,
    nextLesson,
    prevLesson,
    canAccessLesson,
    markLessonCompleted,
    saveProgress,
    restoreProgress,
    setCurrentLesson,
    handleSetCurrentLesson
  } = useEnhancedCourseNavigation(course, allLessons, {
    autoSave: true,
    preloadNext: true,
    smoothTransitions: true,
    conflictResolution: 'merge'
  });

  // Use the enrollment helper functions
  const enrolled = course ? isEnrolled(course.id) : false;
  const enrollment = course ? getEnrollment(course.id) : null;

  const { quizAttempts, saveQuizAttempts } = useQuizState(course, enrolled);
  const { 
    enrolling, 
    showEnrollmentForm, 
    handleEnroll, 
    handleEnrollmentFormClose, 
    handleEnrollmentSuccess 
  } = useCourseEnrollment(course, enrollInCourse);

  // Enhanced lesson completion with automatic progress sync
  const handleMarkComplete = useCallback(async () => {
    if (!course || !user || !currentLessonData) return false;

    try {
      // Mark lesson as completed in enhanced progress manager
      const success = await markLessonCompleted(currentLesson);
      
      if (success) {
        // Update quiz attempts if it's a quiz lesson
        if (currentLessonData.type === 'quiz') {
          const updatedAttempts = { ...quizAttempts, [currentLesson]: true };
          saveQuizAttempts(updatedAttempts);
        }

        // Sync with enrollment progress (non-blocking)
        try {
          const newProgress = Math.round(((completedLessons.length + 1) / allLessons.length) * 100);
          await updateProgress(course.id, newProgress);
        } catch (error) {
          console.warn('Failed to sync with enrollment progress (non-critical):', error);
        }

        // Show success message
        toast({
          title: "Lesson Completed! 🎉",
          description: `You've successfully completed "${currentLessonData.title}". Keep up the great work!`,
        });

        return true;
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      toast({
        title: "Completion Error",
        description: "Failed to mark lesson as complete. Please try again.",
        variant: "destructive",
      });
    }

    return false;
  }, [
    course,
    user,
    currentLessonData,
    currentLesson,
    markLessonCompleted,
    quizAttempts,
    saveQuizAttempts,
    completedLessons.length,
    allLessons.length,
    updateProgress,
    toast
  ]);

  // Enhanced navigation with preloading and smooth transitions
  const handleNextLesson = useCallback(async () => {
    const success = await nextLesson();
    if (success) {
      toast({
        title: "Moving Forward! 🚀",
        description: "Loading next lesson...",
      });
    }
    return success;
  }, [nextLesson, toast]);

  const handlePrevLesson = useCallback(async () => {
    const success = await prevLesson();
    if (success) {
      toast({
        title: "Going Back",
        description: "Loading previous lesson...",
      });
    }
    return success;
  }, [prevLesson, toast]);

  const handleNavigateToLesson = useCallback(async (lessonIndex: number) => {
    const success = await navigateToLesson(lessonIndex);
    if (success) {
      const lesson = allLessons[lessonIndex];
      toast({
        title: "Navigating",
        description: `Loading "${lesson?.title || `Lesson ${lessonIndex + 1}`}"...`,
      });
    }
    return success;
  }, [navigateToLesson, allLessons, toast]);

  // Progress recovery function
  const handleProgressRecovery = useCallback(async () => {
    if (!course || !user) return false;

    try {
      // Try to restore from the most recent backup
      const progressData = await saveProgress();
      if (progressData) {
        toast({
          title: "Progress Recovered",
          description: "Your progress has been successfully recovered from backup.",
        });
        return true;
      }
    } catch (error) {
      console.error('Error recovering progress:', error);
      toast({
        title: "Recovery Failed",
        description: "Unable to recover progress. Please contact support if this persists.",
        variant: "destructive",
      });
    }

    return false;
  }, [course, user, saveProgress, toast]);

  // Get progress statistics
  const getProgressStats = useCallback(() => {
    const totalLessons = allLessons.length;
    const completedCount = completedLessons.length;
    const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    
    return {
      totalLessons,
      completedCount,
      progressPercentage,
      currentModule,
      currentLesson: currentLesson + 1, // Display as 1-based
      lastSaved,
      isUpToDate: Boolean(lastSaved && new Date(lastSaved).getTime() > Date.now() - 60000) // Within last minute
    };
  }, [allLessons.length, completedLessons.length, currentModule, currentLesson, lastSaved]);

  return {
    // Course data
    course,
    enrollment,
    isEnrolled: enrolled,
    allLessons,
    isLoading: isLoading || navigationLoading,

    // Navigation state
    currentModule,
    currentLesson,
    currentLessonData,
    progress,
    completedLessons,
    isTransitioning,
    lastSaved,

    // UI state
    sidebarOpen,
    setSidebarOpen,
    isPlaying,
    setIsPlaying,

    // Quiz state
    quizAttempts,

    // Enrollment state
    enrolling,
    showEnrollmentForm,

    // Navigation functions
    canAccessLesson,
    setCurrentLesson: handleNavigateToLesson,
    handleSetCurrentLesson: handleNavigateToLesson,
    nextLesson: handleNextLesson,
    prevLesson: handlePrevLesson,

    // Progress functions
    markComplete: handleMarkComplete,
    saveProgress,
    restoreProgress,
    handleProgressRecovery,

    // Enrollment functions
    handleEnroll,
    handleEnrollmentFormClose,
    handleEnrollmentSuccess,

    // Utility functions
    getProgressStats
  };
};