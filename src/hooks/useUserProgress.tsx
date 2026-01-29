import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface UserProgress {
  id?: string;
  user_id: string;
  course_id: string;
  current_module: number;
  current_lesson: number;
  completed_lessons: string[]; // Array of "module-lesson" strings
  quiz_scores: Record<string, number>; // "module-lesson" -> score
  last_visited: string;
  progress_percentage: number;
  total_time_spent: number; // in minutes
  created_at?: string;
  updated_at?: string;
}

export interface UserState {
  user_id: string;
  current_course?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    auto_save: boolean;
    notifications: boolean;
    language: string;
  };
  last_activity: string;
  created_at?: string;
  updated_at?: string;
}

export const useUserProgress = (courseId?: string) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [userState, setUserState] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user progress from database
  const loadProgress = useCallback(async () => {
    if (!user || !courseId) return;

    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Loading user progress for:', { userId: user.id, courseId });

      // Load course-specific progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();

      if (progressError && progressError.code !== 'PGRST116') {
        console.error('Error loading progress:', progressError);
        setError('Failed to load progress');
        return;
      }

      if (progressData) {
        console.log('✅ Progress loaded from database:', progressData);
        setProgress(progressData);
      } else {
        // Create initial progress record
        const initialProgress: UserProgress = {
          user_id: user.id,
          course_id: courseId,
          current_module: 1,
          current_lesson: 1,
          completed_lessons: [],
          quiz_scores: {},
          last_visited: new Date().toISOString(),
          progress_percentage: 0,
          total_time_spent: 0
        };
        setProgress(initialProgress);
      }

      // Load global user state
      const { data: stateData, error: stateError } = await supabase
        .from('user_state')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (stateError && stateError.code !== 'PGRST116') {
        console.error('Error loading user state:', stateError);
      }

      if (stateData) {
        console.log('✅ User state loaded from database:', stateData);
        setUserState(stateData);
      } else {
        // Create initial user state
        const initialState: UserState = {
          user_id: user.id,
          current_course: courseId,
          preferences: {
            theme: 'system',
            auto_save: true,
            notifications: true,
            language: 'en'
          },
          last_activity: new Date().toISOString()
        };
        setUserState(initialState);
      }

    } catch (err) {
      console.error('Error in loadProgress:', err);
      setError('Failed to load user progress');
    } finally {
      setLoading(false);
    }
  }, [user, courseId]);

  // Save progress to database
  const saveProgress = useCallback(async (updates: Partial<UserProgress>) => {
    if (!user || !courseId || !progress) return;

    try {
      const updatedProgress = {
        ...progress,
        ...updates,
        updated_at: new Date().toISOString()
      };

      console.log('💾 Saving progress to database:', updatedProgress);

      const { data, error } = await supabase
        .from('user_progress')
        .upsert(updatedProgress, {
          onConflict: 'user_id,course_id'
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving progress:', error);
        setError('Failed to save progress');
        return false;
      }

      console.log('✅ Progress saved successfully:', data);
      setProgress(data);
      return true;
    } catch (err) {
      console.error('Error in saveProgress:', err);
      setError('Failed to save progress');
      return false;
    }
  }, [user, courseId, progress]);

  // Save user state to database
  const saveUserState = useCallback(async (updates: Partial<UserState>) => {
    if (!user || !userState) return;

    try {
      const updatedState = {
        ...userState,
        ...updates,
        updated_at: new Date().toISOString()
      };

      console.log('💾 Saving user state to database:', updatedState);

      const { data, error } = await supabase
        .from('user_state')
        .upsert(updatedState, {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving user state:', error);
        setError('Failed to save user state');
        return false;
      }

      console.log('✅ User state saved successfully:', data);
      setUserState(data);
      return true;
    } catch (err) {
      console.error('Error in saveUserState:', err);
      setError('Failed to save user state');
      return false;
    }
  }, [user, userState]);

  // Mark lesson as completed
  const markLessonCompleted = useCallback(async (moduleId: number, lessonId: number) => {
    if (!progress) return false;

    const lessonKey = `${moduleId}-${lessonId}`;
    const completedLessons = [...progress.completed_lessons];
    
    if (!completedLessons.includes(lessonKey)) {
      completedLessons.push(lessonKey);
    }

    const success = await saveProgress({
      completed_lessons: completedLessons,
      last_visited: new Date().toISOString()
    });

    if (success) {
      console.log('✅ Lesson marked as completed:', lessonKey);
    }

    return success;
  }, [progress, saveProgress]);

  // Save quiz score
  const saveQuizScore = useCallback(async (moduleId: number, lessonId: number, score: number) => {
    if (!progress) return false;

    const lessonKey = `${moduleId}-${lessonId}`;
    const quizScores = { ...progress.quiz_scores, [lessonKey]: score };

    const success = await saveProgress({
      quiz_scores: quizScores,
      last_visited: new Date().toISOString()
    });

    if (success) {
      console.log('✅ Quiz score saved:', { lessonKey, score });
    }

    return success;
  }, [progress, saveProgress]);

  // Update current position
  const updateCurrentPosition = useCallback(async (moduleId: number, lessonId: number) => {
    if (!progress) return false;

    const success = await saveProgress({
      current_module: moduleId,
      current_lesson: lessonId,
      last_visited: new Date().toISOString()
    });

    if (success) {
      console.log('✅ Current position updated:', { moduleId, lessonId });
    }

    return success;
  }, [progress, saveProgress]);

  // Check if lesson is completed
  const isLessonCompleted = useCallback((moduleId: number, lessonId: number) => {
    if (!progress) return false;
    const lessonKey = `${moduleId}-${lessonId}`;
    return progress.completed_lessons.includes(lessonKey);
  }, [progress]);

  // Get quiz score for lesson
  const getQuizScore = useCallback((moduleId: number, lessonId: number) => {
    if (!progress) return null;
    const lessonKey = `${moduleId}-${lessonId}`;
    return progress.quiz_scores[lessonKey] || null;
  }, [progress]);

  // Calculate progress percentage
  const calculateProgressPercentage = useCallback((totalLessons: number) => {
    if (!progress) return 0;
    return Math.round((progress.completed_lessons.length / totalLessons) * 100);
  }, [progress]);

  // Load progress on mount
  useEffect(() => {
    if (user && courseId) {
      loadProgress();
    }
  }, [user, courseId, loadProgress]);

  // Disabled auto-save interval to prevent excessive re-renders and flashing
  // Progress is now saved on specific events only (lesson completion, navigation, etc.)
  // useEffect(() => {
  //   if (!user || !courseId || !progress) return;
  //   const interval = setInterval(() => {
  //     saveProgress({ last_visited: new Date().toISOString() });
  //   }, 30000);
  //   return () => clearInterval(interval);
  // }, [user, courseId, progress, saveProgress]);

  return {
    progress,
    userState,
    loading,
    error,
    loadProgress,
    saveProgress,
    saveUserState,
    markLessonCompleted,
    saveQuizScore,
    updateCurrentPosition,
    isLessonCompleted,
    getQuizScore,
    calculateProgressPercentage
  };
}; 