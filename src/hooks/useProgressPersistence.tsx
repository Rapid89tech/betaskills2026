import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface ProgressState {
  [courseId: string]: {
    progress: number;
    completedLessons: number[];
    lastUpdated: string;
  };
}

export const useProgressPersistence = () => {
  const { user } = useAuth();
  const [progressState, setProgressState] = useState<ProgressState>({});

  // Load progress from localStorage
  const loadProgress = useCallback(() => {
    if (!user) return;
    
    try {
      const stored = localStorage.getItem(`course_progress_${user.id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgressState(parsed);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  }, [user]);

  // Save progress to localStorage
  const saveProgress = useCallback((courseId: string, progress: number, completedLessons: number[]) => {
    if (!user) return;

    setProgressState(prev => {
      const newState = {
        ...prev,
        [courseId]: {
          progress,
          completedLessons,
          lastUpdated: new Date().toISOString()
        }
      };

      // Persist to localStorage
      try {
        localStorage.setItem(`course_progress_${user.id}`, JSON.stringify(newState));
      } catch (error) {
        console.error('Error saving progress:', error);
      }

      return newState;
    });
  }, [user]);

  // Get progress for a specific course
  const getProgress = useCallback((courseId: string) => {
    return progressState[courseId] || { progress: 0, completedLessons: [], lastUpdated: '' };
  }, [progressState]);

  // Load progress on mount and user change
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return {
    saveProgress,
    getProgress,
    loadProgress
  };
};