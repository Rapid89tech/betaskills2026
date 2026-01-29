import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './use-toast';
import { progressManager, ProgressData } from '@/utils/EnhancedProgressManager';
import { componentPreloader } from '@/utils/ComponentPreloader';
import type { Course, Lesson } from '@/types/course';

interface NavigationState {
  currentModule: number;
  currentLesson: number;
  progress: number;
  completedLessons: number[];
  isLoading: boolean;
  isTransitioning: boolean;
  lastSaved: string | null;
}

interface NavigationOptions {
  autoSave?: boolean;
  preloadNext?: boolean;
  smoothTransitions?: boolean;
  conflictResolution?: 'local' | 'remote' | 'merge';
}

export const useEnhancedCourseNavigation = (
  course: Course | null,
  allLessons: Lesson[],
  options: NavigationOptions = {}
) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const {
    autoSave = true,
    preloadNext = true,
    smoothTransitions = true,
    conflictResolution = 'merge'
  } = options;

  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentModule: 1,
    currentLesson: 0,
    progress: 0,
    completedLessons: [],
    isLoading: true,
    isTransitioning: false,
    lastSaved: null
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize progress data with enhanced recovery
  useEffect(() => {
    if (!course || !user) return;

    const initializeProgress = async () => {
      setNavigationState(prev => ({ ...prev, isLoading: true }));

      try {
        let progressData = await progressManager.loadProgress(course.id, user.id);
        
        // If loading fails, attempt recovery
        if (!progressData) {
          console.log('🔄 Initial load failed, attempting recovery...');
          progressData = await progressManager.recoverProgress(course.id, user.id);
        }
        
        if (progressData) {
          setNavigationState(prev => ({
            ...prev,
            currentModule: progressData.currentModule,
            currentLesson: progressData.currentLesson,
            progress: progressData.progress,
            completedLessons: progressData.completedLessons,
            isLoading: false,
            lastSaved: progressData.lastUpdated
          }));

          // Preload current and next module components
          if (preloadNext) {
            const currentModuleIndex = progressData.currentModule - 1;
            const nextModuleIndex = currentModuleIndex + 1;
            const totalModules = course.modules.length;
            
            // Preload current module immediately
            componentPreloader.preloadModuleComponents(currentModuleIndex, totalModules);
            
            // Preload next module with slight delay
            if (nextModuleIndex < totalModules) {
              setTimeout(() => {
                componentPreloader.preloadModuleComponents(nextModuleIndex, totalModules);
              }, 1000);
            }
          }

          toast({
            title: "Progress Restored",
            description: `Resumed at Module ${progressData.currentModule}, Lesson ${progressData.currentLesson + 1}`,
          });
        } else {
          // Initialize with default values
          setNavigationState(prev => ({
            ...prev,
            currentModule: 1,
            currentLesson: 0,
            progress: 0,
            completedLessons: [],
            isLoading: false,
            lastSaved: null
          }));

          // Preload first module for new users
          if (preloadNext) {
            componentPreloader.preloadModuleComponents(0, course.modules.length);
          }
        }
      } catch (error) {
        console.error('Error initializing progress:', error);
        
        // Attempt one more recovery before giving up
        try {
          const recoveredData = await progressManager.recoverProgress(course.id, user.id);
          if (recoveredData) {
            setNavigationState(prev => ({
              ...prev,
              currentModule: recoveredData.currentModule,
              currentLesson: recoveredData.currentLesson,
              progress: recoveredData.progress,
              completedLessons: recoveredData.completedLessons,
              isLoading: false,
              lastSaved: recoveredData.lastUpdated
            }));
            
            toast({
              title: "Progress Recovered",
              description: "Your progress has been recovered from backup.",
            });
          } else {
            throw new Error('Recovery failed');
          }
        } catch (recoveryError) {
          toast({
            title: "Progress Loading Error",
            description: "Failed to load progress. Starting fresh. Your previous progress may be restored later.",
            variant: "destructive",
          });
          setNavigationState(prev => ({ 
            ...prev, 
            isLoading: false,
            currentModule: 1,
            currentLesson: 0,
            progress: 0,
            completedLessons: [],
            lastSaved: null
          }));
        }
      }
    };

    initializeProgress();
  }, [course, user, preloadNext, toast]);

  // Listen for cross-tab progress updates and conflict resolution
  useEffect(() => {
    const handleProgressUpdate = (event: CustomEvent) => {
      const { progressData, source } = event.detail;
      
      if (source === 'cross-tab' && course && progressData.courseId === course.id) {
        setNavigationState(prev => ({
          ...prev,
          currentModule: progressData.currentModule,
          currentLesson: progressData.currentLesson,
          progress: progressData.progress,
          completedLessons: progressData.completedLessons,
          lastSaved: progressData.lastUpdated
        }));

        toast({
          title: "Progress Synced",
          description: "Your progress has been updated from another tab.",
        });
      }
    };

    const handleProgressRecovered = (event: CustomEvent) => {
      const { progressData } = event.detail;
      
      if (course && progressData.courseId === course.id) {
        setNavigationState(prev => ({
          ...prev,
          currentModule: progressData.currentModule,
          currentLesson: progressData.currentLesson,
          progress: progressData.progress,
          completedLessons: progressData.completedLessons,
          lastSaved: progressData.lastUpdated
        }));

        toast({
          title: "Progress Recovered",
          description: "Your progress has been successfully recovered.",
        });
      }
    };

    const handleConflictResolved = (event: CustomEvent) => {
      const { strategy, resolvedData, conflictDetails } = event.detail;
      
      if (course && resolvedData.courseId === course.id) {
        setNavigationState(prev => ({
          ...prev,
          currentModule: resolvedData.currentModule,
          currentLesson: resolvedData.currentLesson,
          progress: resolvedData.progress,
          completedLessons: resolvedData.completedLessons,
          lastSaved: resolvedData.lastUpdated
        }));

        const strategyMessages = {
          local: "Used your local progress (more recent)",
          remote: "Used cloud progress (more recent)", 
          merge: "Merged progress from multiple sources"
        };

        toast({
          title: "Progress Conflict Resolved",
          description: strategyMessages[strategy] || "Progress has been synchronized.",
        });
      }
    };

    window.addEventListener('progressUpdated', handleProgressUpdate as EventListener);
    window.addEventListener('progressRecovered', handleProgressRecovered as EventListener);
    window.addEventListener('progressConflictResolved', handleConflictResolved as EventListener);
    
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate as EventListener);
      window.removeEventListener('progressRecovered', handleProgressRecovered as EventListener);
      window.removeEventListener('progressConflictResolved', handleConflictResolved as EventListener);
    };
  }, [course, toast]);

  // Enhanced auto-save progress with backup
  const saveProgress = useCallback(async (
    moduleId?: number,
    lessonId?: number,
    completedLessons?: number[],
    progress?: number
  ) => {
    if (!course || !user) return false;

    const currentState = navigationState;
    const dataToSave = {
      moduleId: moduleId ?? currentState.currentModule,
      lessonId: lessonId ?? currentState.currentLesson,
      completedLessons: completedLessons ?? currentState.completedLessons,
      progress: progress ?? currentState.progress
    };

    try {
      // Use enhanced save with backup
      const success = await progressManager.saveProgressWithBackup(
        course.id,
        user.id,
        dataToSave.moduleId,
        dataToSave.lessonId,
        dataToSave.completedLessons,
        dataToSave.progress
      );

      if (success) {
        setNavigationState(prev => ({
          ...prev,
          lastSaved: new Date().toISOString()
        }));
        
        console.log('✅ Progress saved with backup');
      }

      return success;
    } catch (error) {
      console.error('Error saving progress:', error);
      
      // Attempt recovery if save fails
      try {
        const recovered = await progressManager.recoverProgress(course.id, user.id);
        if (recovered) {
          toast({
            title: "Save Error - Progress Recovered",
            description: "Save failed but your progress was recovered from backup.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Save Error",
            description: "Failed to save progress. Changes are stored locally and will sync when possible.",
            variant: "destructive",
          });
        }
      } catch (recoveryError) {
        toast({
          title: "Save Error",
          description: "Failed to save progress. Please try again or contact support if the issue persists.",
          variant: "destructive",
        });
      }
      
      return false;
    }
  }, [course, user, navigationState, toast]);

  // Debounced auto-save
  const debouncedSave = useCallback((
    moduleId?: number,
    lessonId?: number,
    completedLessons?: number[],
    progress?: number
  ) => {
    if (!autoSave) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveProgress(moduleId, lessonId, completedLessons, progress);
    }, 2000);
  }, [autoSave, saveProgress]);

  // Navigate to specific lesson with enhanced smooth transition
  const navigateToLesson = useCallback(async (lessonIndex: number, moduleIndex?: number) => {
    if (!course || navigationState.isTransitioning) return false;

    // Check if lesson is accessible
    if (!canAccessLesson(lessonIndex)) {
      toast({
        title: "Lesson Locked",
        description: "Please complete the previous lesson before accessing this one.",
        variant: "destructive",
      });
      return false;
    }

    // Calculate module if not provided
    const targetModule = moduleIndex ?? Math.floor(lessonIndex / 5) + 1;

    // Start transition with loading state
    setNavigationState(prev => ({ ...prev, isTransitioning: true }));

    try {
      // Enhanced preloading strategy
      if (preloadNext) {
        const preloadPromises = [];
        
        // Preload current lesson components
        preloadPromises.push(componentPreloader.preloadComponent('lesson-content'));
        
        // Preload next lesson components
        const nextLessonIndex = lessonIndex + 1;
        if (nextLessonIndex < allLessons.length) {
          const nextModuleIndex = Math.floor(nextLessonIndex / 5);
          preloadPromises.push(
            componentPreloader.preloadModuleComponents(nextModuleIndex, course.modules.length)
          );
        }
        
        // Preload previous lesson for smooth back navigation
        const prevLessonIndex = lessonIndex - 1;
        if (prevLessonIndex >= 0) {
          const prevModuleIndex = Math.floor(prevLessonIndex / 5);
          preloadPromises.push(
            componentPreloader.preloadModuleComponents(prevModuleIndex, course.modules.length)
          );
        }

        // Start preloading in background (don't wait for completion)
        Promise.allSettled(preloadPromises).then(() => {
          console.log('✅ Navigation preloading completed');
        });
      }

      // Smooth scroll to top with enhanced animation
      if (smoothTransitions) {
        // Add fade out effect
        const mainContent = document.querySelector('[data-lesson-content]');
        if (mainContent) {
          mainContent.classList.add('opacity-50', 'transition-opacity', 'duration-200');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Wait for scroll to complete
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Update state with new position
      setNavigationState(prev => ({
        ...prev,
        currentModule: targetModule,
        currentLesson: lessonIndex
      }));

      // Save current position immediately for reliability
      try {
        await progressManager.updateCurrentPosition(course.id, user!.id, targetModule, lessonIndex);
      } catch (saveError) {
        console.warn('Failed to save position immediately, will retry:', saveError);
        // Continue with navigation even if save fails
      }

      // Auto-save with backup if enabled
      if (autoSave) {
        debouncedSave(targetModule, lessonIndex);
      }

      // Enhanced transition completion
      if (smoothTransitions) {
        transitionTimeoutRef.current = setTimeout(() => {
          setNavigationState(prev => ({ ...prev, isTransitioning: false }));
          
          // Restore content opacity
          const mainContent = document.querySelector('[data-lesson-content]');
          if (mainContent) {
            mainContent.classList.remove('opacity-50');
            mainContent.classList.add('opacity-100');
          }
        }, 300);
      } else {
        setNavigationState(prev => ({ ...prev, isTransitioning: false }));
      }

      setIsPlaying(false);
      
      // Emit navigation event for other components
      window.dispatchEvent(new CustomEvent('lessonNavigated', {
        detail: { 
          courseId: course.id, 
          lessonIndex, 
          moduleIndex: targetModule,
          timestamp: new Date().toISOString()
        }
      }));
      
      return true;
    } catch (error) {
      console.error('Error navigating to lesson:', error);
      setNavigationState(prev => ({ ...prev, isTransitioning: false }));
      
      // Enhanced error handling with recovery options
      toast({
        title: "Navigation Error",
        description: "Failed to navigate to lesson. Attempting recovery...",
        variant: "destructive",
        action: {
          altText: "Retry",
          onClick: () => navigateToLesson(lessonIndex, moduleIndex)
        }
      });
      
      // Attempt to recover navigation state
      try {
        const recoveredProgress = await progressManager.recoverProgress(course.id, user!.id);
        if (recoveredProgress) {
          setNavigationState(prev => ({
            ...prev,
            currentModule: recoveredProgress.currentModule,
            currentLesson: recoveredProgress.currentLesson,
            progress: recoveredProgress.progress,
            completedLessons: recoveredProgress.completedLessons,
            isTransitioning: false
          }));
        }
      } catch (recoveryError) {
        console.error('Navigation recovery failed:', recoveryError);
      }
      
      return false;
    }
  }, [course, navigationState.isTransitioning, canAccessLesson, preloadNext, smoothTransitions, autoSave, allLessons.length, user, debouncedSave, toast]);

  // Check if lesson is accessible
  const canAccessLesson = useCallback((lessonIndex: number): boolean => {
    // Always allow access to first lesson
    if (lessonIndex === 0) return true;
    
    // Always allow access to certificate lessons
    const lesson = allLessons[lessonIndex];
    if (lesson?.type === 'certificate') return true;
    
    // For other lessons, require previous lesson completion
    return navigationState.completedLessons.includes(lessonIndex - 1);
  }, [allLessons, navigationState.completedLessons]);

  // Navigate to next lesson
  const nextLesson = useCallback(async () => {
    const nextIndex = navigationState.currentLesson + 1;
    if (nextIndex < allLessons.length) {
      // Check if current lesson is completed or user can access next lesson
      if (navigationState.completedLessons.includes(navigationState.currentLesson) || canAccessLesson(nextIndex)) {
        return await navigateToLesson(nextIndex);
      } else {
        toast({
          title: "Complete Current Lesson",
          description: "Please complete the current lesson before moving to the next one.",
          variant: "destructive",
        });
        return false;
      }
    }
    return false;
  }, [navigationState.currentLesson, navigationState.completedLessons, allLessons.length, canAccessLesson, navigateToLesson, toast]);

  // Navigate to previous lesson
  const prevLesson = useCallback(async () => {
    const prevIndex = navigationState.currentLesson - 1;
    if (prevIndex >= 0) {
      return await navigateToLesson(prevIndex);
    }
    return false;
  }, [navigationState.currentLesson, navigateToLesson]);

  // Mark lesson as completed
  const markLessonCompleted = useCallback(async (lessonIndex?: number) => {
    if (!course || !user) return false;

    const targetLessonIndex = lessonIndex ?? navigationState.currentLesson;
    
    try {
      const success = await progressManager.markLessonCompleted(
        course.id,
        user.id,
        targetLessonIndex,
        allLessons.length
      );

      if (success) {
        // Update local state
        const newCompletedLessons = [...navigationState.completedLessons];
        if (!newCompletedLessons.includes(targetLessonIndex)) {
          newCompletedLessons.push(targetLessonIndex);
          newCompletedLessons.sort((a, b) => a - b);
        }

        const newProgress = Math.round((newCompletedLessons.length / allLessons.length) * 100);

        setNavigationState(prev => ({
          ...prev,
          completedLessons: newCompletedLessons,
          progress: newProgress
        }));

        toast({
          title: "Lesson Completed!",
          description: `Great job! You've completed lesson ${targetLessonIndex + 1}.`,
        });

        return true;
      }
    } catch (error) {
      console.error('Error marking lesson completed:', error);
      toast({
        title: "Save Error",
        description: "Failed to save lesson completion. Please try again.",
        variant: "destructive",
      });
    }

    return false;
  }, [course, user, navigationState.currentLesson, navigationState.completedLessons, allLessons.length, toast]);

  // Get current lesson data
  const currentLessonData = allLessons[navigationState.currentLesson];

  // Restore progress from a specific point (for recovery)
  const restoreProgress = useCallback(async (progressData: ProgressData) => {
    if (!course || !user) return false;

    try {
      setNavigationState({
        currentModule: progressData.currentModule,
        currentLesson: progressData.currentLesson,
        progress: progressData.progress,
        completedLessons: progressData.completedLessons,
        isLoading: false,
        isTransitioning: false,
        lastSaved: progressData.lastUpdated
      });

      toast({
        title: "Progress Restored",
        description: "Your progress has been successfully restored.",
      });

      return true;
    } catch (error) {
      console.error('Error restoring progress:', error);
      toast({
        title: "Restore Error",
        description: "Failed to restore progress. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }, [course, user, toast]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return {
    // Navigation state
    currentModule: navigationState.currentModule,
    currentLesson: navigationState.currentLesson,
    currentLessonData,
    progress: navigationState.progress,
    completedLessons: navigationState.completedLessons,
    isLoading: navigationState.isLoading,
    isTransitioning: navigationState.isTransitioning,
    lastSaved: navigationState.lastSaved,

    // UI state
    sidebarOpen,
    setSidebarOpen,
    isPlaying,
    setIsPlaying,

    // Navigation functions
    navigateToLesson,
    nextLesson,
    prevLesson,
    canAccessLesson,

    // Progress functions
    markLessonCompleted,
    saveProgress,
    restoreProgress,

    // Utility functions
    setCurrentLesson: navigateToLesson,
    handleSetCurrentLesson: navigateToLesson
  };
};