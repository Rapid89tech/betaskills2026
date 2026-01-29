import { useState, useEffect, useCallback } from 'react';
import { EnrollmentData } from '@/services/DataManager';
import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { useAuth } from './AuthContext';
import { logger } from '@/utils/logger';

// Enhanced interface with complete enrollment operations
interface UseDataManagerResult {
  // State
  enrollments: EnrollmentData[];
  loading: boolean;
  error: string | null;
  
  // Core CRUD operations
  createEnrollment: (data: CreateEnrollmentData) => Promise<EnrollmentData>;
  updateEnrollment: (id: string, updates: Partial<EnrollmentData>) => Promise<EnrollmentData>;
  deleteEnrollment: (id: string) => Promise<void>;
  
  // Query operations
  getEnrollments: () => Promise<EnrollmentData[]>;
  getUserEnrollments: (userId: string) => Promise<EnrollmentData[]>;
  getAllEnrollments: () => Promise<EnrollmentData[]>;
  getEnrollment: (courseId: string) => EnrollmentData | null;
  
  // Status operations
  updateEnrollmentStatus: (id: string, status: 'pending' | 'approved' | 'rejected', userEmail?: string) => Promise<EnrollmentData>;
  updateEnrollmentProgress: (userId: string, courseId: string, progress: number) => Promise<void>;
  
  // Utility functions
  isEnrolled: (courseId: string) => boolean;
  isUserEnrolledInCourse: (userId: string, courseId: string) => Promise<boolean>;
  hasPendingEnrollment: (courseId: string) => boolean;
  getUserEnrollmentForCourse: (userId: string, courseId: string) => Promise<EnrollmentData | null>;
  
  // Sync operations
  syncEnrollments: () => Promise<void>;
  forceSynchronization: () => Promise<void>;
  
  // Admin operations
  getEnrollmentStatistics: () => Promise<EnrollmentStatistics>;
  
  // Utility functions
  refresh: () => Promise<void>;
  forceRefresh: () => Promise<void>;
}

// Supporting interfaces
interface CreateEnrollmentData {
  user_id: string;
  user_email?: string;
  course_id: string;
  course_title?: string;
  status?: 'pending' | 'approved' | 'rejected';
  progress?: number;
}

interface EnrollmentStatistics {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  byStatus: Record<string, number>;
}

/**
 * Enhanced hook for unified enrollment data management
 * 
 * Provides a comprehensive interface to the UnifiedEnrollmentManager with:
 * - Complete CRUD operations for enrollments
 * - Automatic data loading and caching
 * - Real-time cross-tab synchronization
 * - Conflict resolution
 * - Offline support
 * - Comprehensive error handling and loading states
 * - Integration with UnifiedEnrollmentManager for all data operations
 */
export const useDataManager = (): UseDataManagerResult => {
  const [enrollments, setEnrollments] = useState<EnrollmentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load enrollments for the current user using UnifiedEnrollmentManager
  const loadEnrollments = useCallback(async () => {
    // CRITICAL: Clear enrollments immediately when user is not logged in
    if (!user) {
      logger.info('loadEnrollments: No user logged in, clearing enrollments');
      setEnrollments([]);
      setLoading(false);
      setError(null);
      return [];
    }

    // Ensure user has valid identifier
    const userId = user.id || (user as any)?.user_id || user.email;
    if (!userId) {
      logger.warn('loadEnrollments: User has no valid identifier, clearing enrollments');
      setEnrollments([]);
      setLoading(false);
      setError('Invalid user session');
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      // Use UnifiedEnrollmentManager instead of direct DataManager access
      // Query by both user ID and email to ensure cross-device access
      let userEnrollments = await unifiedEnrollmentManager.getUserEnrollments(userId);
      
      // If no enrollments found and user has email, also try querying by email
      if (userEnrollments.length === 0 && user.email && user.email !== userId) {
        logger.info(`No enrollments found by ID, trying by email: ${user.email}`);
        const emailEnrollments = await unifiedEnrollmentManager.getUserEnrollments(user.email);
        userEnrollments = emailEnrollments;
      }
      
      setEnrollments(userEnrollments);
      logger.info(`Loaded ${userEnrollments.length} enrollments for user ${userId} via UnifiedEnrollmentManager`);
      return userEnrollments;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load enrollments';
      setError(errorMessage);
      logger.error('Failed to load enrollments via UnifiedEnrollmentManager:', err);
      // Clear enrollments on error to prevent showing stale data
      setEnrollments([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initialize data loading
  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments]);

  // Fallback polling: while user has pending enrollments, periodically refresh to pick up admin approvals.
  useEffect(() => {
    if (!user) return;

    const currentUserId = user.id || (user as any)?.user_id || user.email;
    const currentEmail = user.email;

    const hasPending = enrollments.some((e) => {
      const matchesUser =
        (!!currentUserId && e.user_id === currentUserId) ||
        (!!currentEmail && (e as any)?.user_email === currentEmail) ||
        (!!currentUserId && (e as any)?.user_email === currentUserId);
      if (!matchesUser) return false;
      const s = String((e as any)?.status || '').toLowerCase();
      return s === 'pending' || s.includes('pending');
    });
    if (!hasPending) return;

    const id = window.setInterval(() => {
      loadEnrollments();
    }, 5000);

    return () => {
      window.clearInterval(id);
    };
  }, [user, enrollments, loadEnrollments]);

  // Set up event listeners for real-time updates using UnifiedEnrollmentManager
  useEffect(() => {
    const handleEnrollmentCreated = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment.user_id === user?.id) {
        setEnrollments(prev => {
          const exists = prev.find(e => e.id === enrollment.id);
          if (!exists) {
            return [...prev, enrollment];
          }
          return prev.map(e => e.id === enrollment.id ? enrollment : e);
        });
      }
    };

    const handleEnrollmentUpdated = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment.user_id === user?.id) {
        setEnrollments(prev => {
          const updated = prev.map(e => e.id === enrollment.id ? enrollment : e);
          if (!prev.find(e => e.id === enrollment.id)) {
            updated.push(enrollment);
          }
          return updated;
        });
      }
    };

    const handleEnrollmentDeleted = (event: CustomEvent) => {
      const { enrollmentId } = event.detail;
      setEnrollments(prev => prev.filter(e => e.id !== enrollmentId));
    };

    const handleEnrollmentStatusChanged = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment && enrollment.user_id === user?.id) {
        setEnrollments(prev => prev.map(e => e.id === enrollment.id ? enrollment : e));
      }
    };

    const handleSyncCompleted = () => {
      // Refresh data when sync completes
      loadEnrollments();
    };

    const handleUserEnrollmentsUpdated = (event: CustomEvent) => {
      const { userId, enrollments: updatedEnrollments } = event.detail;
      if (userId === user?.id) {
        setEnrollments(updatedEnrollments);
      }
    };

    // Handle payment success events to immediately refresh enrollment data
    const handleEnrollmentSuccess = (event: CustomEvent) => {
      console.log('🎯 useDataManager: Received enrollment success event:', event.detail);
      // Force reload enrollments to get latest data
      loadEnrollments();
    };

    const handleForceRefresh = (event: CustomEvent) => {
      console.log('🎯 useDataManager: Received force refresh event:', event.detail);
      // Force reload enrollments to get latest data
      loadEnrollments();
    };

    const handleEnrollmentStatusRefresh = (event: CustomEvent) => {
      console.log('🎯 useDataManager: Received enrollment status refresh event:', event.detail);
      // Force reload enrollments to get latest data
      loadEnrollments();
    };

    // Add UnifiedEnrollmentManager event listeners
    unifiedEnrollmentManager.addEventListener('enrollment-created', handleEnrollmentCreated);
    unifiedEnrollmentManager.addEventListener('enrollment-updated', handleEnrollmentUpdated);
    unifiedEnrollmentManager.addEventListener('enrollment-deleted', handleEnrollmentDeleted);
    unifiedEnrollmentManager.addEventListener('enrollment-status-changed', handleEnrollmentStatusChanged);
    unifiedEnrollmentManager.addEventListener('sync-completed', handleSyncCompleted);
    unifiedEnrollmentManager.addEventListener('user-enrollments-updated', handleUserEnrollmentsUpdated);

    // Add window event listeners for payment success
    window.addEventListener('enrollment-success', handleEnrollmentSuccess as EventListener);
    window.addEventListener('force-course-card-refresh', handleForceRefresh as EventListener);
    window.addEventListener('enrollment-status-refresh', handleEnrollmentStatusRefresh as EventListener);

    return () => {
      unifiedEnrollmentManager.removeEventListener('enrollment-created', handleEnrollmentCreated);
      unifiedEnrollmentManager.removeEventListener('enrollment-updated', handleEnrollmentUpdated);
      unifiedEnrollmentManager.removeEventListener('enrollment-deleted', handleEnrollmentDeleted);
      unifiedEnrollmentManager.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChanged);
      unifiedEnrollmentManager.removeEventListener('sync-completed', handleSyncCompleted);
      unifiedEnrollmentManager.removeEventListener('user-enrollments-updated', handleUserEnrollmentsUpdated);

      window.removeEventListener('enrollment-success', handleEnrollmentSuccess as EventListener);
      window.removeEventListener('force-course-card-refresh', handleForceRefresh as EventListener);
      window.removeEventListener('enrollment-status-refresh', handleEnrollmentStatusRefresh as EventListener);
    };
  }, [user, loadEnrollments]);

  // Create enrollment using UnifiedEnrollmentManager
  const createEnrollment = useCallback(async (data: CreateEnrollmentData): Promise<EnrollmentData> => {
    setLoading(true);
    setError(null);
    
    try {
      const newEnrollment = await unifiedEnrollmentManager.createEnrollment(data);
      
      // Update local state immediately
      setEnrollments(prev => [...prev, newEnrollment]);
      
      logger.info(`Created enrollment: ${newEnrollment.id}`);
      return newEnrollment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create enrollment';
      setError(errorMessage);
      logger.error('Failed to create enrollment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update enrollment using UnifiedEnrollmentManager
  const updateEnrollment = useCallback(async (id: string, updates: Partial<EnrollmentData>): Promise<EnrollmentData> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedEnrollment = await unifiedEnrollmentManager.updateEnrollment(id, updates);
      
      // Update local state immediately
      setEnrollments(prev => prev.map(e => e.id === id ? updatedEnrollment : e));
      
      logger.info(`Updated enrollment: ${id}`);
      return updatedEnrollment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update enrollment';
      setError(errorMessage);
      logger.error('Failed to update enrollment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete enrollment using UnifiedEnrollmentManager
  const deleteEnrollment = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await unifiedEnrollmentManager.deleteEnrollment(id);
      
      // Update local state immediately
      setEnrollments(prev => prev.filter(e => e.id !== id));
      
      logger.info(`Deleted enrollment: ${id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete enrollment';
      setError(errorMessage);
      logger.error('Failed to delete enrollment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get enrollments (with caching) using UnifiedEnrollmentManager
  const getEnrollments = useCallback(async (): Promise<EnrollmentData[]> => {
    if (!user) return [];
    
    setLoading(true);
    setError(null);
    
    try {
      const userEnrollments = await unifiedEnrollmentManager.getUserEnrollments(user.id);
      setEnrollments(userEnrollments);
      return userEnrollments;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get enrollments';
      setError(errorMessage);
      logger.error('Failed to get enrollments:', err);
      return enrollments; // Return cached data on error
    } finally {
      setLoading(false);
    }
  }, [user, enrollments]);

  // Get enrollments for a specific user using UnifiedEnrollmentManager
  const getUserEnrollments = useCallback(async (userId: string): Promise<EnrollmentData[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const userEnrollments = await unifiedEnrollmentManager.getUserEnrollments(userId);
      logger.info(`Retrieved ${userEnrollments.length} enrollments for user ${userId}`);
      return userEnrollments;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get user enrollments';
      setError(errorMessage);
      logger.error('Failed to get user enrollments:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all enrollments (admin function) using UnifiedEnrollmentManager
  const getAllEnrollments = useCallback(async (): Promise<EnrollmentData[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const allEnrollments = await unifiedEnrollmentManager.getAllEnrollments();
      logger.info(`Retrieved ${allEnrollments.length} total enrollments`);
      return allEnrollments;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get all enrollments';
      setError(errorMessage);
      logger.error('Failed to get all enrollments:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Update enrollment status using UnifiedEnrollmentManager
  const updateEnrollmentStatus = useCallback(async (
    id: string, 
    status: 'pending' | 'approved' | 'rejected',
    userEmail?: string
  ): Promise<EnrollmentData> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedEnrollment = await unifiedEnrollmentManager.updateEnrollmentStatus(id, status, userEmail);
      
      // Update local state immediately
      setEnrollments(prev => prev.map(e => e.id === id ? updatedEnrollment : e));
      
      logger.info(`Updated enrollment status: ${id} -> ${status}`);
      return updatedEnrollment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update enrollment status';
      setError(errorMessage);
      logger.error('Failed to update enrollment status:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update enrollment progress using UnifiedEnrollmentManager
  const updateEnrollmentProgress = useCallback(async (userId: string, courseId: string, progress: number): Promise<void> => {
    setError(null);
    
    try {
      await unifiedEnrollmentManager.updateEnrollmentProgress(userId, courseId, progress);
      
      // Update local state if it's the current user
      if (userId === user?.id) {
        setEnrollments(prev => prev.map(e => 
          e.user_id === userId && e.course_id === courseId 
            ? { ...e, progress, updated_at: new Date().toISOString() }
            : e
        ));
      }
      
      logger.info(`Updated enrollment progress: ${userId}/${courseId} -> ${progress}%`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update enrollment progress';
      setError(errorMessage);
      logger.error('Failed to update enrollment progress:', err);
      throw err;
    }
  }, [user]);

  // Sync enrollments using UnifiedEnrollmentManager
  const syncEnrollments = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await unifiedEnrollmentManager.forceSynchronization();
      // Refresh local data after sync
      await loadEnrollments();
      logger.info('Enrollment synchronization completed');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sync enrollments';
      setError(errorMessage);
      logger.error('Failed to sync enrollments:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadEnrollments]);

  // Force synchronization using UnifiedEnrollmentManager
  const forceSynchronization = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await unifiedEnrollmentManager.forceSynchronization();
      await loadEnrollments();
      logger.info('Force synchronization completed');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to force synchronization';
      setError(errorMessage);
      logger.error('Failed to force synchronization:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadEnrollments]);

  // Check if user is enrolled in a course using UnifiedEnrollmentManager
  const isUserEnrolledInCourse = useCallback(async (userId: string, courseId: string): Promise<boolean> => {
    setError(null);
    
    try {
      return await unifiedEnrollmentManager.isUserEnrolledInCourse(userId, courseId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check enrollment status';
      setError(errorMessage);
      logger.error('Failed to check enrollment status:', err);
      return false;
    }
  }, []);

  // Get user enrollment for specific course using UnifiedEnrollmentManager
  const getUserEnrollmentForCourse = useCallback(async (userId: string, courseId: string): Promise<EnrollmentData | null> => {
    setError(null);
    
    try {
      return await unifiedEnrollmentManager.getUserEnrollmentForCourse(userId, courseId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get user enrollment for course';
      setError(errorMessage);
      logger.error('Failed to get user enrollment for course:', err);
      return null;
    }
  }, []);

  // Get enrollment statistics using UnifiedEnrollmentManager
  const getEnrollmentStatistics = useCallback(async (): Promise<EnrollmentStatistics> => {
    setLoading(true);
    setError(null);
    
    try {
      const stats = await unifiedEnrollmentManager.getEnrollmentStatistics();
      logger.info('Retrieved enrollment statistics');
      return stats;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get enrollment statistics';
      setError(errorMessage);
      logger.error('Failed to get enrollment statistics:', err);
      return {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        byStatus: {}
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if user is enrolled in a course (approved status only) - local check
  const isEnrolled = useCallback((courseId: string): boolean => {
    // CRITICAL: Always check if user is logged in first
    if (!user || !courseId) {
      logger.debug('isEnrolled: No user or courseId provided', { user: !!user, courseId });
      return false;
    }

    // Ensure user is actually authenticated (has valid session)
    const userId = user.id || (user as any)?.user_id || user.email;
    if (!userId) {
      logger.debug('isEnrolled: No valid user identifier found');
      return false;
    }

    // Special access for specific users (only when properly logged in)
    const specialAccessEmails = ['john.doe@gmail.com', 'carlowalljee@gmail.com', 'maxmon@gmail.com', 'ericmnisi007@gmail.com', 'mopalamitshepo@gmail.com'];
    if (user.email && specialAccessEmails.includes(user.email.toLowerCase())) {
      logger.debug('isEnrolled: Special access granted for user', user.email);
      return true;
    }
    
    const isEnrolledResult = enrollments.some(enrollment => {
      const s = String((enrollment as any)?.status || '').toLowerCase();
      return (
        enrollment.course_id === courseId &&
        (enrollment.user_id === userId || enrollment.user_email === userId) &&
        (s === 'approved' || s.includes('approved'))
      );
    });

    logger.debug(`isEnrolled check for ${courseId}:`, { 
      userId, 
      userEmail: user.email, 
      result: isEnrolledResult,
      enrollmentCount: enrollments.length 
    });

    return isEnrolledResult;
  }, [user, enrollments]);

  // Get enrollment details for a specific course - local check
  const getEnrollment = useCallback((courseId: string): EnrollmentData | null => {
    // CRITICAL: Always check if user is logged in first
    if (!courseId || !user) {
      logger.debug(`getEnrollment: Missing courseId or user`, { courseId, user: !!user });
      return null;
    }

    // Ensure user is actually authenticated (has valid session)
    const userId = user.id || (user as any)?.user_id || user.email;
    if (!userId) {
      logger.debug('getEnrollment: No valid user identifier found');
      return null;
    }

    logger.debug(`getEnrollment: Looking for courseId=${courseId}, userId=${userId}`, {
      totalEnrollments: enrollments.length,
      userEnrollments: enrollments.filter(e => e.user_id === userId || e.user_email === userId).length
    });

    const courseEnrollments = enrollments.filter(e => 
      e.course_id === courseId && 
      (e.user_id === userId || e.user_email === userId)
    );
    
    logger.debug(`getEnrollment: Found ${courseEnrollments.length} enrollments for courseId=${courseId}`, {
      courseEnrollments: courseEnrollments.map(e => ({ id: e.id, status: e.status, user_id: e.user_id, user_email: e.user_email }))
    });
    
    if (courseEnrollments.length === 0) return null;

    // Sort by status priority (approved > pending > rejected) and then by date
    const statusWeight = (status: string) => {
      const s = String(status || '').toLowerCase();
      if (s === 'approved' || s.includes('approved')) return 3;
      if (s === 'pending' || s.includes('pending')) return 2;
      if (s === 'rejected' || s.includes('reject')) return 1;
      return 0;
    };

    const sorted = courseEnrollments.sort((a, b) => {
      const statusDiff = statusWeight(b.status) - statusWeight(a.status);
      if (statusDiff !== 0) return statusDiff;
      
      const aTime = new Date(a.updated_at || a.enrolled_at).getTime();
      const bTime = new Date(b.updated_at || b.enrolled_at).getTime();
      return bTime - aTime;
    });

    return sorted[0] || null;
  }, [enrollments, user]);

  // Check if user has a pending enrollment - local check
  const hasPendingEnrollment = useCallback((courseId: string): boolean => {
    // CRITICAL: Always check if user is logged in first
    if (!user || !courseId) {
      logger.debug('hasPendingEnrollment: No user or courseId provided', { user: !!user, courseId });
      return false;
    }

    // Ensure user is actually authenticated (has valid session)
    const userId = user.id || (user as any)?.user_id || user.email;
    if (!userId) {
      logger.debug('hasPendingEnrollment: No valid user identifier found');
      return false;
    }

    // Special handling for admin users (only when properly logged in)
    if (user.email === 'john.doe@gmail.com') {
      const hasPending = enrollments.some(enrollment => 
        enrollment.course_id === courseId && 
        enrollment.status === 'pending'
      );
      logger.debug('hasPendingEnrollment: Admin check result', { courseId, hasPending });
      return hasPending;
    }
    
    const hasPendingResult = enrollments.some(enrollment => 
      enrollment.course_id === courseId && 
      (enrollment.user_id === userId || enrollment.user_email === userId) && 
      enrollment.status === 'pending'
    );

    logger.debug(`hasPendingEnrollment check for ${courseId}:`, { 
      userId, 
      userEmail: user.email, 
      result: hasPendingResult,
      enrollmentCount: enrollments.length 
    });

    return hasPendingResult;
  }, [user, enrollments]);

  // Refresh data
  const refresh = useCallback(async (): Promise<void> => {
    await loadEnrollments();
  }, [loadEnrollments]);

  // Force refresh data
  const forceRefresh = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await unifiedEnrollmentManager.forceSynchronization();
      await loadEnrollments();
      logger.info('Force refresh completed');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to force refresh';
      setError(errorMessage);
      logger.error('Failed to force refresh:', err);
    } finally {
      setLoading(false);
    }
  }, [loadEnrollments]);

  return {
    // State
    enrollments,
    loading,
    error,
    
    // Core CRUD operations
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    
    // Query operations
    getEnrollments,
    getUserEnrollments,
    getAllEnrollments,
    getEnrollment,
    
    // Status operations
    updateEnrollmentStatus,
    updateEnrollmentProgress,
    
    // Utility functions
    isEnrolled,
    isUserEnrolledInCourse,
    hasPendingEnrollment,
    getUserEnrollmentForCourse,
    
    // Sync operations
    syncEnrollments,
    forceSynchronization,
    
    // Admin operations
    getEnrollmentStatistics,
    
    // Utility functions
    refresh,
    forceRefresh
  };
};