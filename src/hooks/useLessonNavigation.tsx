
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Lesson } from '@/types/course';

export const useLessonNavigation = (allLessons: Lesson[], completedLessons: number[]) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  // Safety check: ensure allLessons is an array and has items
  const safeLessons = Array.isArray(allLessons) ? allLessons : [];
  const currentLessonData: Lesson | undefined = safeLessons[currentLesson];

  const canAccessLesson = (lessonIndex: number): boolean => {
    // Always allow access to first lesson
    if (lessonIndex === 0) return true;
    
    // Always allow access to certificate lessons
    const lesson = safeLessons[lessonIndex];
    if (lesson?.type === 'certificate') return true;
    
    // For other lessons, require previous lesson completion
    return completedLessons.includes(lessonIndex - 1);
  };

  const handleSetCurrentLesson = (lessonIndex: number) => {
    if (!canAccessLesson(lessonIndex)) {
      toast({
        title: "Lesson Locked",
        description: "Please complete the previous lesson before accessing this one.",
        variant: "destructive",
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentLesson(lessonIndex);
    setIsPlaying(false);
  };

  const nextLesson = () => {
    if (currentLesson < safeLessons.length - 1) {
      // If current lesson is completed OR user can access next lesson, allow navigation
      if (completedLessons.includes(currentLesson) || canAccessLesson(currentLesson + 1)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentLesson(currentLesson + 1);
        setIsPlaying(false);
      } else {
        toast({
          title: "Complete Current Lesson",
          description: "Please complete the current lesson before moving to the next one.",
          variant: "destructive",
        });
      }
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setIsPlaying(false);
    }
  };

  return {
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
  };
};
