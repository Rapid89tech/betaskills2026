import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useEnrollments } from './useEnrollments';
import { supabase } from '@/integrations/supabase/client';

// Debounced progress hook to prevent excessive re-renders and flashing
export const useStableProgress = (courseId?: string) => {
  const { user } = useAuth();
  const { getEnrollment, updateProgress } = useEnrollments();
  const [progress, setProgress] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastSyncedProgressRef = useRef<number>(-1);
  const lastSyncedToDbAtRef = useRef<number>(0);
  
  // Use refs to prevent unnecessary re-renders
  const progressRef = useRef(progress);
  const completedLessonsRef = useRef(completedLessons);
  const debounceRef = useRef<NodeJS.Timeout>();
  
  // Debounced update function
  const debouncedUpdate = useCallback((newProgress: number, newCompletedLessons: number[]) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      // Only update if values actually changed
      if (progressRef.current !== newProgress || 
          JSON.stringify(completedLessonsRef.current) !== JSON.stringify(newCompletedLessons)) {
        
        progressRef.current = newProgress;
        completedLessonsRef.current = newCompletedLessons;
        
        setProgress(newProgress);
        setCompletedLessons(newCompletedLessons);
      }
    }, 100); // 100ms debounce
  }, []);
  
  // Load progress from localStorage immediately (synchronous)
  useEffect(() => {
    if (!user || !courseId) return;
    
    setIsLoading(true);
    
    try {
      // Get from localStorage first (instant)
      const progressKey = `course-progress-${courseId}`;
      const completedKey = `completed-lessons-${courseId}`;
      
      const savedProgress = localStorage.getItem(progressKey);
      const savedCompleted = localStorage.getItem(completedKey);
      
      if (savedProgress && savedCompleted) {
        const parsedProgress = parseInt(savedProgress);
        const parsedCompleted = JSON.parse(savedCompleted);
        
        debouncedUpdate(parsedProgress, parsedCompleted);

        // Best-effort backend sync so admin can see progress.
        try {
          const enrollment = getEnrollment(courseId);
          const enrollmentProgress = Number((enrollment as any)?.progress ?? 0);
          if (
            Number.isFinite(parsedProgress) &&
            parsedProgress >= 0 &&
            parsedProgress !== lastSyncedProgressRef.current &&
            (parsedProgress > 0 || enrollmentProgress > 0) &&
            parsedProgress > enrollmentProgress
          ) {
            lastSyncedProgressRef.current = parsedProgress;
            void updateProgress(courseId, parsedProgress);
          }
        } catch {
          // ignore
        }

        // Best-effort DB sync to user_progress (admin uses this as authoritative source)
        try {
          const now = Date.now();
          if (user?.id && Number.isFinite(parsedProgress) && parsedProgress >= 0 && now - (lastSyncedToDbAtRef.current || 0) > 5000) {
            lastSyncedToDbAtRef.current = now;
            // Service-role persistence path (bypasses RLS issues)
            try {
              void supabase.functions.invoke('get-admin-dashboard-data', {
                body: {
                  courseId,
                  progress: Math.max(0, Math.min(100, Math.round(parsedProgress))),
                }
              } as any);
            } catch {
              // ignore
            }
            void supabase
              .from('user_progress')
              .upsert(
                {
                  user_id: user.id,
                  course_id: courseId,
                  progress_percentage: Math.max(0, Math.min(100, Math.round(parsedProgress))),
                  last_visited: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                } as any,
                { onConflict: 'user_id,course_id' } as any
              );
          }
        } catch {
          // ignore
        }
      } else {
        // Fallback to enrollment data if no local storage
        const enrollment = getEnrollment(courseId);
        if (enrollment && enrollment.progress > 0) {
          console.log('Using enrollment progress as fallback:', enrollment.progress);
          // Convert progress percentage to completed lessons count (estimate)
          const totalLessons = 20; // Rough estimate, will be updated by actual lesson count
          const completedCount = Math.floor((enrollment.progress / 100) * totalLessons);
          const estimatedCompleted = Array.from({ length: completedCount }, (_, i) => i);
          debouncedUpdate(enrollment.progress, estimatedCompleted);
        }
        
        // Also check for legacy progress data formats
        const legacyProgressKey = `progress-${courseId}`;
        const legacyCompletedKey = `completedLessons-${courseId}`;
        // Legacy progress migration removed - using unified enrollment system
        // Progress data is now managed through UnifiedEnrollmentManager
      }
    } catch (error) {
      console.error('Error loading stable progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, courseId, debouncedUpdate]);
  
  // Save progress function (also debounced)
  const saveProgress = useCallback((newProgress: number, newCompletedLessons: number[]) => {
    if (!courseId) return;
    
    try {
      const progressKey = `course-progress-${courseId}`;
      const completedKey = `completed-lessons-${courseId}`;
      
      localStorage.setItem(progressKey, newProgress.toString());
      localStorage.setItem(completedKey, JSON.stringify(newCompletedLessons));
      
      // 🛡️ Trigger bulletproof backup for progress
      window.dispatchEvent(new CustomEvent('progress-updated', {
        detail: { courseId, progress: newProgress, completedLessons: newCompletedLessons }
      }));
      
      debouncedUpdate(newProgress, newCompletedLessons);

      // Best-effort backend sync so admin can see progress.
      if (
        user &&
        Number.isFinite(newProgress) &&
        newProgress >= 0 &&
        newProgress !== lastSyncedProgressRef.current
      ) {
        lastSyncedProgressRef.current = newProgress;
        void updateProgress(courseId, Math.round(newProgress));
      }

      // Best-effort DB sync to user_progress (admin uses this as authoritative source)
      try {
        const now = Date.now();
        if (user?.id && now - (lastSyncedToDbAtRef.current || 0) > 5000) {
          lastSyncedToDbAtRef.current = now;
          // Service-role persistence path (bypasses RLS issues)
          try {
            void supabase.functions.invoke('get-admin-dashboard-data', {
              body: {
                courseId,
                progress: Math.max(0, Math.min(100, Math.round(newProgress))),
              }
            } as any);
          } catch {
            // ignore
          }
          void supabase
            .from('user_progress')
            .upsert(
              {
                user_id: user.id,
                course_id: courseId,
                progress_percentage: Math.max(0, Math.min(100, Math.round(newProgress))),
                last_visited: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              } as any,
              { onConflict: 'user_id,course_id' } as any
            );
        }
      } catch {
        // ignore
      }
    } catch (error) {
      console.error('Error saving stable progress:', error);
    }
  }, [courseId, debouncedUpdate, updateProgress, user]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);
  
  return {
    progress,
    completedLessons,
    isLoading,
    saveProgress
  };
};
