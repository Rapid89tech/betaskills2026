import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { triggerConfetti } from '@/utils/confetti';
import { useProgressPersistence } from '@/hooks/useProgressPersistence';
import type { Course, Lesson } from '@/types/course';

export const useLessonCompletion = (
  allLessons: Lesson[],
  course: Course | null,
  isEnrolled: boolean,
  progress: number,
  updateProgress: (courseId: string, progress: number) => Promise<boolean>
) => {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [lessonContentCompleted, setLessonContentCompleted] = useState<Record<number, boolean>>({});
  const { toast } = useToast();
  const { saveProgress, getProgress } = useProgressPersistence();

  // Load persisted progress on mount (memoized to prevent excessive loads)
  useEffect(() => {
    if (isEnrolled && course && allLessons.length > 0) {
      const persistedProgress = getProgress(course.id);
      if (persistedProgress.completedLessons.length > 0) {
        setCompletedLessons(persistedProgress.completedLessons);
      } else {
        // Fallback to calculating from progress percentage
        const completedCount = Math.floor((progress / 100) * allLessons.length);
        const newCompletedLessons = Array.from({ length: completedCount }, (_, i) => i);
        setCompletedLessons(newCompletedLessons);
      }
    }
  }, [isEnrolled, course?.id, allLessons.length]); // Removed progress dependency to prevent loops

  // Only recalculate when completedLessons actually changes (debounced)
  useEffect(() => {
    if (isEnrolled && course && allLessons.length > 0 && completedLessons.length > 0) {
      const timeoutId = setTimeout(() => {
        const newProgress = Math.min(100, (completedLessons.length / allLessons.length) * 100);
        saveProgress(course.id, newProgress, completedLessons);
        updateProgress(course.id, newProgress);
      }, 200); // 200ms debounce
      
      return () => clearTimeout(timeoutId);
    }
  }, [completedLessons, isEnrolled, course?.id, allLessons.length]);

  const markLessonContentComplete = (lessonIndex: number) => {
    setLessonContentCompleted(prev => ({
      ...prev,
      [lessonIndex]: true
    }));
  };

  const markComplete = async (
    currentLesson: number,
    currentLessonData: Lesson | undefined,
    quizAttempts: Record<number, boolean>,
    saveQuizAttempts: (attempts: Record<number, boolean>) => void,
    setCurrentLesson: (lesson: number) => void
  ) => {
    if (!isEnrolled || !course || !currentLessonData) return;

    // Check if lesson is already completed
    if (completedLessons.includes(currentLesson)) {
      // If already completed, just move to next lesson
      if (currentLesson < allLessons.length - 1) {
        setCurrentLesson(currentLesson + 1);
      }
      return;
    }

    const isQuizLesson = currentLessonData.type === 'quiz';
    
    if (isQuizLesson) {
      const newAttempts = { ...quizAttempts, [currentLesson]: true };
      saveQuizAttempts(newAttempts);
      
      // Trigger confetti for quiz completion
      triggerConfetti({ colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'] });
    }
    
    // Add current lesson to completed lessons (avoid duplicates)
    const newCompletedLessons = [...new Set([...completedLessons, currentLesson])];
    setCompletedLessons(newCompletedLessons);
    
    const newProgress = Math.min(100, (newCompletedLessons.length / allLessons.length) * 100);
    
    // Save to persistent storage immediately
    saveProgress(course.id, newProgress, newCompletedLessons);
    
    try {
      await updateProgress(course.id, newProgress);
      
      // Check if course is completed or if this is the last non-certificate lesson
      const isLastNonCertificateLesson = currentLesson === allLessons.length - 1 || 
        (currentLesson === allLessons.length - 2 && allLessons[allLessons.length - 1]?.type === 'certificate');
      
      if (newProgress >= 100 || isLastNonCertificateLesson) {
        // Trigger celebration confetti for course completion
        triggerConfetti({ 
          duration: 5000, 
          colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'] 
        });
        
        toast({
          title: "🎉 Course Completed!",
          description: "Congratulations! You've completed the entire course and can now download your certificate!",
          duration: 5000,
        });
      } else {
        toast({
          title: "Lesson Completed! 🎉",
          description: `Great job! You've completed "${currentLessonData.title}"`,
        });
      }
      
      // Auto-advance to next lesson or certificate after a short delay and scroll to top
      if (currentLesson < allLessons.length - 1) {
        // Check if the next lesson is a certificate
        const nextLesson = allLessons[currentLesson + 1];
        const delay = nextLesson?.type === 'certificate' ? 3000 : 1500; // Longer delay before certificate
        
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentLesson(currentLesson + 1);
        }, delay);
      } else if (newProgress >= 100) {
        // Navigate to certificate lesson if course is completed
        const certificateIndex = allLessons.findIndex(lesson => lesson.type === 'certificate');
        if (certificateIndex !== -1) {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentLesson(certificateIndex);
          }, 3000);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    completedLessons,
    lessonContentCompleted,
    markComplete,
    markLessonContentComplete
  };
};
