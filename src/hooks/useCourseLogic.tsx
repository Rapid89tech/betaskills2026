import { useEnrollments } from '@/hooks/useEnrollments';
import { useCourseData } from '@/hooks/useCourseData';
import { useLessonNavigation } from '@/hooks/useLessonNavigation';
import { useQuizState } from '@/hooks/useQuizState';
import { useLessonCompletion } from '@/hooks/useLessonCompletion';
import { useCourseEnrollment } from '@/hooks/useCourseEnrollment';
import { useStableProgress } from '@/hooks/useStableProgress';

export const useCourseLogic = () => {
  const { enrollments, enrollInCourse, updateProgress, isEnrolled, getEnrollment } = useEnrollments();
  const { course, allLessons, isLoading } = useCourseData();
  
  // Use stable progress to prevent flashing/glitching
  const { progress: stableProgress, completedLessons: stableCompletedLessons, saveProgress: saveStableProgress } = useStableProgress(course?.id);
  
  // Use the new helper functions
  const enrolled = course ? isEnrolled(course.id) : false;
  const enrollment = course ? getEnrollment(course.id) : null;
  
  // Use stable progress as single source of truth
  const progress = stableProgress;
  const completedLessons = stableCompletedLessons;

  // Simplified lesson completion without multiple progress sources
  const { lessonContentCompleted, markComplete, markLessonContentComplete } = useLessonCompletion(
    allLessons,
    course,
    enrolled,
    progress,
    async (courseId: string, newProgress: number) => {
      // Calculate completed lessons from progress
      const newCompletedCount = Math.floor((newProgress / 100) * allLessons.length);
      const newCompletedLessons = Array.from({ length: newCompletedCount }, (_, i) => i);
      
      // Save to stable progress (localStorage)
      saveStableProgress(newProgress, newCompletedLessons);
      
      // Also update enrollment progress (non-blocking)
      try {
        await updateProgress(courseId, newProgress);
      } catch (error) {
        console.warn('Failed to update enrollment progress (non-critical):', error);
      }
      
      return true;
    }
  );

  const {
    currentLesson,
    setCurrentLesson,
    currentLessonData,
    isPlaying,
    setIsPlaying,
    sidebarOpen,
    setSidebarOpen,
    canAccessLesson,
    handleSetCurrentLesson,
    nextLesson,
    prevLesson
  } = useLessonNavigation(allLessons, completedLessons);

  const { quizAttempts, saveQuizAttempts } = useQuizState(course, enrolled);
  const { 
    enrolling, 
    showEnrollmentForm, 
    handleEnroll, 
    handleEnrollmentFormClose, 
    handleEnrollmentSuccess 
  } = useCourseEnrollment(course, enrollInCourse);

  const handleMarkComplete = async () => {
    await markComplete(
      currentLesson,
      currentLessonData,
      quizAttempts,
      saveQuizAttempts,
      setCurrentLesson
    );
  };

  return {
    course,
    enrollment,
    isEnrolled: enrolled,
    progress,
    allLessons,
    currentLesson,
    currentLessonData,
    completedLessons,
    lessonContentCompleted,
    quizAttempts,
    isPlaying,
    setIsPlaying,
    sidebarOpen,
    setSidebarOpen,
    enrolling,
    showEnrollmentForm,
    isLoading,
    canAccessLesson,
    handleEnroll,
    handleEnrollmentFormClose,
    handleEnrollmentSuccess,
    handleSetCurrentLesson,
    nextLesson,
    prevLesson,
    markComplete: handleMarkComplete,
    markLessonContentComplete
  };
};
