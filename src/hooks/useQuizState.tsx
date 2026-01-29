
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import type { Course } from '@/types/course';

export const useQuizState = (course: Course | null, isEnrolled: boolean) => {
  const [quizAttempts, setQuizAttempts] = useState<Record<number, boolean>>({});
  const { user } = useAuth();

  // Load quiz attempts from localStorage
  useEffect(() => {
    if (user && isEnrolled && course) {
      const savedAttempts = localStorage.getItem(`quiz_attempts_${user.id}_${course.id}`);
      if (savedAttempts) {
        setQuizAttempts(JSON.parse(savedAttempts));
      }
    }
  }, [user, isEnrolled, course]);

  // Save quiz attempts to localStorage
  const saveQuizAttempts = (attempts: Record<number, boolean>) => {
    if (user && course) {
      localStorage.setItem(`quiz_attempts_${user.id}_${course.id}`, JSON.stringify(attempts));
      setQuizAttempts(attempts);
    }
  };

  return {
    quizAttempts,
    saveQuizAttempts
  };
};
