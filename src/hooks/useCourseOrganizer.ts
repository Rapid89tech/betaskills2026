/**
 * useCourseOrganizer Hook
 * 
 * React hook that integrates CourseOrganizer service with React components
 * to provide real-time course prioritization and organization functionality.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Course } from '@/types/course';
import { CoursePriority } from '@/types/enrollment';
import { courseOrganizer, CourseListUpdateCallback, CoursePriorityUpdateCallback } from '@/services/CourseOrganizer';
import { useAuth } from '@/hooks/AuthContext';

interface UseCourseOrganizerOptions {
  autoUpdate?: boolean;
  enableCaching?: boolean;
}

interface UseCourseOrganizerReturn {
  organizedCourses: Course[];
  coursePriorities: CoursePriority[];
  isLoading: boolean;
  error: string | null;
  organizeCourses: (courses: Course[]) => Promise<void>;
  refreshPriorities: () => Promise<void>;
  clearCache: () => void;
  updateCoursePriority: (courseId: string, status: 'ENROLLED' | 'PENDING' | 'NONE') => Promise<void>;
}

/**
 * Hook for managing course organization and prioritization
 */
export const useCourseOrganizer = (
  options: UseCourseOrganizerOptions = {}
): UseCourseOrganizerReturn => {
  const { autoUpdate = true, enableCaching = true } = options;
  const { user } = useAuth();
  
  // State
  const [organizedCourses, setOrganizedCourses] = useState<Course[]>([]);
  const [coursePriorities, setCoursePriorities] = useState<CoursePriority[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for cleanup
  const courseUpdateUnsubscribe = useRef<(() => void) | null>(null);
  const priorityUpdateUnsubscribe = useRef<(() => void) | null>(null);
  const isMounted = useRef(true);

  /**
   * Organize courses using CourseOrganizer service
   */
  const organizeCourses = useCallback(async (courses: Course[]) => {
    if (!user?.id || !courses.length) {
      setOrganizedCourses(courses);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🎯 Organizing courses with CourseOrganizer:', courses.length);
      
      const organized = await courseOrganizer.organizeCourses(courses, user.id);
      
      if (isMounted.current) {
        setOrganizedCourses(organized);
        console.log('✅ Courses organized successfully:', {
          total: organized.length,
          user: user.id
        });
      }
    } catch (err: any) {
      console.error('❌ Error organizing courses:', err);
      
      if (isMounted.current) {
        setError(err.message || 'Failed to organize courses');
        // Fallback to original courses
        setOrganizedCourses(courses);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [user?.id]);

  /**
   * Refresh course priorities
   */
  const refreshPriorities = useCallback(async () => {
    if (!user?.id) {
      setCoursePriorities([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🔄 Refreshing course priorities for user:', user.id);
      
      const priorities = await courseOrganizer.getCoursePriorities(user.id);
      
      if (isMounted.current) {
        setCoursePriorities(priorities);
        console.log('✅ Course priorities refreshed:', priorities.length);
      }
    } catch (err: any) {
      console.error('❌ Error refreshing priorities:', err);
      
      if (isMounted.current) {
        setError(err.message || 'Failed to refresh priorities');
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [user?.id]);

  /**
   * Update course priority
   */
  const updateCoursePriority = useCallback(async (
    courseId: string, 
    status: 'ENROLLED' | 'PENDING' | 'NONE'
  ) => {
    if (!user?.id) {
      console.warn('Cannot update course priority: no user logged in');
      return;
    }

    try {
      console.log('📝 Updating course priority:', { courseId, status, userId: user.id });
      
      await courseOrganizer.updateCoursePriority(user.id, courseId, status);
      
      // Refresh priorities after update
      await refreshPriorities();
      
      console.log('✅ Course priority updated successfully');
    } catch (err: any) {
      console.error('❌ Error updating course priority:', err);
      setError(err.message || 'Failed to update course priority');
    }
  }, [user?.id, refreshPriorities]);

  /**
   * Clear cache
   */
  const clearCache = useCallback(() => {
    if (enableCaching) {
      courseOrganizer.clearCache(user?.id);
      console.log('🗑️ Course organizer cache cleared');
    }
  }, [user?.id, enableCaching]);

  /**
   * Handle real-time course list updates
   */
  const handleCourseListUpdate: CourseListUpdateCallback = useCallback((updatedCourses) => {
    if (isMounted.current) {
      console.log('🔄 Real-time course list update received:', updatedCourses.length);
      setOrganizedCourses(updatedCourses);
    }
  }, []);

  /**
   * Handle real-time priority updates
   */
  const handlePriorityUpdate: CoursePriorityUpdateCallback = useCallback((updatedPriorities) => {
    if (isMounted.current) {
      console.log('🔄 Real-time priority update received:', updatedPriorities.length);
      setCoursePriorities(updatedPriorities);
    }
  }, []);

  /**
   * Setup real-time subscriptions
   */
  useEffect(() => {
    if (!autoUpdate || !user?.id) {
      return;
    }

    console.log('🔗 Setting up CourseOrganizer real-time subscriptions');

    // Subscribe to course list updates
    courseUpdateUnsubscribe.current = courseOrganizer.subscribeToRealtimeUpdates(
      handleCourseListUpdate
    );

    // Subscribe to priority updates
    priorityUpdateUnsubscribe.current = courseOrganizer.subscribeToPriorityUpdates(
      handlePriorityUpdate
    );

    return () => {
      if (courseUpdateUnsubscribe.current) {
        courseUpdateUnsubscribe.current();
        courseUpdateUnsubscribe.current = null;
      }
      
      if (priorityUpdateUnsubscribe.current) {
        priorityUpdateUnsubscribe.current();
        priorityUpdateUnsubscribe.current = null;
      }
      
      console.log('🔌 CourseOrganizer subscriptions cleaned up');
    };
  }, [autoUpdate, user?.id, handleCourseListUpdate, handlePriorityUpdate]);

  /**
   * Load initial priorities when user changes
   */
  useEffect(() => {
    if (user?.id) {
      refreshPriorities();
    } else {
      setCoursePriorities([]);
    }
  }, [user?.id, refreshPriorities]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    organizedCourses,
    coursePriorities,
    isLoading,
    error,
    organizeCourses,
    refreshPriorities,
    clearCache,
    updateCoursePriority
  };
};

export default useCourseOrganizer;