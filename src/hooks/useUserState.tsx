import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/AuthContext';

interface UserState {
  currentCourse?: string;
  currentModule?: number;
  currentLesson?: number;
  completedLessons: string[];
  courseProgress: Record<string, number>; // courseId -> progress percentage
  lastVisited: Record<string, string>; // courseId -> timestamp
  preferences: {
    theme: 'light' | 'dark' | 'system';
    autoSave: boolean;
    notifications: boolean;
  };
}

const DEFAULT_STATE: UserState = {
  completedLessons: [],
  courseProgress: {},
  lastVisited: {},
  preferences: {
    theme: 'system',
    autoSave: true,
    notifications: true,
  }
};

export const useUserState = () => {
  const { user } = useAuth();
  const [state, setState] = useState<UserState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user state from localStorage (legacy compatibility - will be migrated to unified system)
  const loadUserState = useCallback(() => {
    if (!user) return DEFAULT_STATE;
    
    try {
      const stored = localStorage.getItem(`user-state-${user.id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Reduced logging - legacy system
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (error) {
      // Silent error handling for legacy system
    }
    
    return DEFAULT_STATE;
  }, [user]);

  // Save user state to localStorage (legacy compatibility - will be migrated to unified system)
  const saveUserState = useCallback((newState: UserState) => {
    if (!user) return;
    
    try {
      localStorage.setItem(`user-state-${user.id}`, JSON.stringify(newState));
      // Reduced logging - legacy system
    } catch (error) {
      // Silent error handling for legacy system
    }
  }, [user]);

  // Initialize state on mount
  useEffect(() => {
    if (user) {
      const loadedState = loadUserState();
      setState(loadedState);
      setIsLoaded(true);
    }
  }, [user, loadUserState]);

  // Save state whenever it changes
  useEffect(() => {
    if (user && isLoaded) {
      saveUserState(state);
    }
  }, [state, user, isLoaded, saveUserState]);

  // Update current course
  const setCurrentCourse = useCallback((courseId: string) => {
    setState(prev => ({
      ...prev,
      currentCourse: courseId,
      lastVisited: {
        ...prev.lastVisited,
        [courseId]: new Date().toISOString()
      }
    }));
  }, []);

  // Update current module
  const setCurrentModule = useCallback((moduleId: number) => {
    setState(prev => ({
      ...prev,
      currentModule: moduleId
    }));
  }, []);

  // Update current lesson
  const setCurrentLesson = useCallback((lessonId: number) => {
    setState(prev => ({
      ...prev,
      currentLesson: lessonId
    }));
  }, []);

  // Mark lesson as completed
  const markLessonCompleted = useCallback((lessonId: string) => {
    setState(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId) 
        ? prev.completedLessons 
        : [...prev.completedLessons, lessonId]
    }));
  }, []);

  // Update course progress
  const updateCourseProgress = useCallback((courseId: string, progress: number) => {
    setState(prev => ({
      ...prev,
      courseProgress: {
        ...prev.courseProgress,
        [courseId]: Math.max(prev.courseProgress[courseId] || 0, progress)
      }
    }));
  }, []);

  // Update preferences
  const updatePreferences = useCallback((preferences: Partial<UserState['preferences']>) => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...preferences
      }
    }));
  }, []);

  // Get course progress
  const getCourseProgress = useCallback((courseId: string) => {
    return state.courseProgress[courseId] || 0;
  }, [state.courseProgress]);

  // Check if lesson is completed
  const isLessonCompleted = useCallback((lessonId: string) => {
    return state.completedLessons.includes(lessonId);
  }, [state.completedLessons]);

  // Get last visited timestamp
  const getLastVisited = useCallback((courseId: string) => {
    return state.lastVisited[courseId];
  }, [state.lastVisited]);

  // Clear all user data (for testing)
  const clearUserData = useCallback(() => {
    if (!user) return;
    
    // Clear all localStorage items for this user
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes(user.id)) {
        localStorage.removeItem(key);
      }
    });
    
    setState(DEFAULT_STATE);
    console.log('🗑️ Cleared all user data');
  }, [user]);

  return {
    state,
    isLoaded,
    setCurrentCourse,
    setCurrentModule,
    setCurrentLesson,
    markLessonCompleted,
    updateCourseProgress,
    updatePreferences,
    getCourseProgress,
    isLessonCompleted,
    getLastVisited,
    clearUserData
  };
}; 