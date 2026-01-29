import { useState, useEffect, useCallback, useRef } from 'react';
import { fastDataService, SimpleEnrollment, SimpleProfile } from '@/services/FastDataService';
import { realTimeEnrollmentService } from '@/services/RealTimeEnrollmentService';
import { useAuth } from './AuthContext';
import { fallbackManager } from '@/utils/FallbackManager';
import { errorHandler } from '@/utils/ErrorHandler';
import { databaseQueryOptimizer } from '@/utils/DatabaseQueryOptimizer';
import { loadingOptimizer } from '@/utils/loadingOptimizer';

interface UseFastDashboardReturn {
  // User data
  userEnrollments: SimpleEnrollment[];
  
  // Admin data
  allEnrollments: SimpleEnrollment[];
  allUsers: SimpleProfile[];
  pendingEnrollments: SimpleEnrollment[];
  
  // State
  loading: boolean;
  error: string | null;
  retryCount: number;
  isRetrying: boolean;
  
  // Actions
  approveEnrollment: (enrollmentId: string) => Promise<boolean>;
  rejectEnrollment: (enrollmentId: string) => Promise<boolean>;
  refresh: () => Promise<void>;
  clearError: () => void;
  
  // Utilities
  isEnrolled: (courseId: string) => boolean;
  getEnrollment: (courseId: string) => SimpleEnrollment | null;
}

export const useFastDashboard = (): UseFastDashboardReturn => {
  const { user, profile } = useAuth();
  const [userEnrollments, setUserEnrollments] = useState<SimpleEnrollment[]>([]);
  const [allEnrollments, setAllEnrollments] = useState<SimpleEnrollment[]>([]);
  const [allUsers, setAllUsers] = useState<SimpleProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  
  // Refs for cleanup and preventing stale state updates
  const mountedRef = useRef(true);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
  }, []);

  // Load user data with error handling, fallback support, and performance optimizations
  const loadUserData = useCallback(async () => {
    if (!user || !mountedRef.current) return;

    // Start loading optimization tracking
    loadingOptimizer.startLoading(`user-data-${user.id}`, 'Loading user enrollments...');

    try {
      // Prefetch related data for better performance
      fastDataService.prefetchUserData(user.id).catch(console.warn);

      const fallbackData = await fallbackManager.withFallback(
        `user-enrollments-${user.id}`,
        () => fastDataService.getUserEnrollments(user.id),
        {
          maxAge: 2 * 60 * 1000, // 2 minutes (reduced for more frequent updates)
          enableOfflineMode: true,
          showFallbackIndicator: true,
          gracefulDegradation: true
        }
      );
      
      if (mountedRef.current) {
        setUserEnrollments(fallbackData.data || []);
        loadingOptimizer.updateProgress(`user-data-${user.id}`, 100, 'User data loaded');
      }
    } catch (err: any) {
      console.error('Error loading user data:', err);
      if (mountedRef.current) {
        // Use error handler for better user experience
        errorHandler.handleError(err, 'user-data-loading');
        throw new Error(err.message || 'Failed to load user data');
      }
    } finally {
      loadingOptimizer.finishLoading(`user-data-${user.id}`);
    }
  }, [user]);

  // Load admin data with error handling, fallback support, and performance optimizations
  const loadAdminData = useCallback(async () => {
    // Check for admin access - either by role OR by hardcoded admin emails
    const adminEmails = ['ericmnisi007@gmail.com', 'john.doe@gmail.com', 'maxmon@gmail.com', 'maxmon2@gmail.com'];
    const isHardcodedAdmin = user?.email && adminEmails.some(email => user.email?.toLowerCase() === email.toLowerCase());
    const isRoleAdmin = profile && (profile.role === 'admin' || profile.role === 'instructor');
    
    if ((!isRoleAdmin && !isHardcodedAdmin) || !mountedRef.current) {
      console.log('🚫 Not loading admin data - not admin/instructor', { role: profile?.role, email: user?.email, isHardcodedAdmin });
      return;
    }
    
    console.log('✅ Loading admin data for:', user?.email);

    try {
      // Import supabase directly
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Helper function with timeout
      const fetchWithTimeout = async <T>(promise: Promise<T>, timeoutMs: number = 10000): Promise<T> => {
        const timeout = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
        );
        return Promise.race([promise, timeout]);
      };
      
      console.log('📊 Fetching enrollments...');
      const enrollResult = await fetchWithTimeout(
        supabase.from('enrollments').select('*').order('enrolled_at', { ascending: false }).limit(100)
      );
      
      console.log('📊 Enrollments:', enrollResult.data?.length, enrollResult.error);
      
      if (enrollResult.error) throw new Error(enrollResult.error.message);
      
      console.log('👥 Fetching profiles...');
      const profileResult = await fetchWithTimeout(
        supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(100)
      );
      
      console.log('👥 Profiles:', profileResult.data?.length, profileResult.error);
      
      if (profileResult.error) throw new Error(profileResult.error.message);
      
      if (mountedRef.current) {
        console.log('✅ Setting state:', enrollResult.data?.length, profileResult.data?.length);
        setAllEnrollments(enrollResult.data || []);
        setAllUsers(profileResult.data || []);
      }
    } catch (err: any) {
      console.error('Error loading admin data:', err);
      if (mountedRef.current) {
        // Use error handler for better user experience
        errorHandler.handleError(err, 'admin-data-loading');
        throw new Error(err.message || 'Failed to load admin data');
      }
    } finally {
      loadingOptimizer.finishLoading('admin-data');
    }
  }, [profile]);

  // Load all data with comprehensive error handling
  const loadData = useCallback(async (isRetry = false) => {
    if (!mountedRef.current) return;

    setLoading(true);
    if (!isRetry) {
      setError(null);
      setRetryCount(0);
    }

    try {
      await Promise.all([
        loadUserData(),
        loadAdminData()
      ]);
      
      if (mountedRef.current) {
        setError(null);
        setRetryCount(0);
      }
    } catch (err: any) {
      console.error('Error loading dashboard data:', err);
      if (mountedRef.current) {
        const errorMessage = err.message || 'Failed to load dashboard data';
        setError(errorMessage);
        
        // Auto-retry logic for retryable errors
        if (isRetry || retryCount >= 3) {
          console.error('Max retries reached or manual retry');
        } else {
          setRetryCount(prev => prev + 1);
          scheduleRetry();
        }
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
        setIsRetrying(false);
      }
    }
  }, [loadUserData, loadAdminData, retryCount]);

  // Schedule automatic retry with exponential backoff
  const scheduleRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Max 10 seconds
    
    setIsRetrying(true);
    retryTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        console.log(`Auto-retrying data load (attempt ${retryCount + 1})`);
        loadData(true);
      }
    }, delay);
  }, [retryCount, loadData]);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Set up real-time subscriptions with error handling
  useEffect(() => {
    if (!user || !mountedRef.current) return;

    let unsubscribeUser: (() => void) | null = null;
    let unsubscribeAll: (() => void) | null = null;

    try {
      // Subscribe to user-specific enrollment updates
      unsubscribeUser = realTimeEnrollmentService.subscribeToUserEnrollments(
        user.id,
        (enrollment) => {
          if (!mountedRef.current) return;
          
          console.log('Real-time user enrollment update:', enrollment);
          setUserEnrollments(prev => {
            const updated = prev.map(e => e.id === enrollment.id ? enrollment : e);
            if (!prev.find(e => e.id === enrollment.id)) {
              updated.unshift(enrollment);
            }
            return updated;
          });
        }
      );

      // Subscribe to all enrollments if admin/instructor
      if (profile && (profile.role === 'admin' || profile.role === 'instructor')) {
        unsubscribeAll = realTimeEnrollmentService.subscribeToEnrollments((enrollment) => {
          if (!mountedRef.current) return;
          
          console.log('Real-time enrollment update:', enrollment);
          setAllEnrollments(prev => {
            const updated = prev.map(e => e.id === enrollment.id ? enrollment : e);
            if (!prev.find(e => e.id === enrollment.id)) {
              updated.unshift(enrollment);
            }
            return updated;
          });
        });
      }
    } catch (error) {
      console.error('Error setting up real-time subscriptions:', error);
      // Don't set error state for subscription failures, just log them
    }

    return () => {
      try {
        if (unsubscribeUser) unsubscribeUser();
        if (unsubscribeAll) unsubscribeAll();
      } catch (error) {
        console.error('Error cleaning up subscriptions:', error);
      }
    };
  }, [user, profile]);

  // Enhanced approve enrollment with optimistic updates and comprehensive rollback
  const approveEnrollment = useCallback(async (enrollmentId: string): Promise<boolean> => {
    if (!mountedRef.current) return false;

    // Store original enrollment for rollback
    const originalEnrollment = allEnrollments.find(e => e.id === enrollmentId);
    const originalUserEnrollment = userEnrollments.find(e => e.id === enrollmentId);
    
    if (!originalEnrollment) {
      throw new Error('Enrollment not found');
    }

    // Optimistic update with timestamp
    const optimisticUpdate = (status: 'approved' | 'pending' | 'rejected') => {
      const updatedEnrollment = {
        ...originalEnrollment,
        status,
        updated_at: new Date().toISOString()
      };

      setAllEnrollments(prev => 
        prev.map(e => e.id === enrollmentId ? updatedEnrollment : e)
      );
      
      if (originalUserEnrollment) {
        setUserEnrollments(prev => 
          prev.map(e => e.id === enrollmentId ? updatedEnrollment : e)
        );
      }
    };

    // Apply optimistic update
    optimisticUpdate('approved');

    try {
      const success = await fastDataService.updateEnrollmentStatus(enrollmentId, 'approved');
      
      if (!success) {
        // Rollback to original state
        optimisticUpdate(originalEnrollment.status);
        throw new Error('Server returned false for approval operation');
      }
      
      // Success - the optimistic update was correct
      console.log(`Successfully approved enrollment ${enrollmentId}`);
      return true;
      
    } catch (err: any) {
      console.error('Error approving enrollment:', err);
      
      // Comprehensive rollback to original state
      setAllEnrollments(prev => 
        prev.map(e => e.id === enrollmentId ? originalEnrollment : e)
      );
      
      if (originalUserEnrollment) {
        setUserEnrollments(prev => 
          prev.map(e => e.id === enrollmentId ? originalUserEnrollment : e)
        );
      }
      
      // Enhance error message for better user feedback
      const enhancedError = new Error(
        err.message || 'Failed to approve enrollment. This could be due to network issues or insufficient permissions.'
      );
      enhancedError.name = err.name || 'ApprovalError';
      
      throw enhancedError;
    }
  }, [allEnrollments, userEnrollments]);

  // Enhanced reject enrollment with optimistic updates and comprehensive rollback
  const rejectEnrollment = useCallback(async (enrollmentId: string): Promise<boolean> => {
    if (!mountedRef.current) return false;

    // Store original enrollment for rollback
    const originalEnrollment = allEnrollments.find(e => e.id === enrollmentId);
    const originalUserEnrollment = userEnrollments.find(e => e.id === enrollmentId);
    
    if (!originalEnrollment) {
      throw new Error('Enrollment not found');
    }

    // Optimistic update with timestamp
    const optimisticUpdate = (status: 'approved' | 'pending' | 'rejected') => {
      const updatedEnrollment = {
        ...originalEnrollment,
        status,
        updated_at: new Date().toISOString()
      };

      setAllEnrollments(prev => 
        prev.map(e => e.id === enrollmentId ? updatedEnrollment : e)
      );
      
      if (originalUserEnrollment) {
        setUserEnrollments(prev => 
          prev.map(e => e.id === enrollmentId ? updatedEnrollment : e)
        );
      }
    };

    // Apply optimistic update
    optimisticUpdate('rejected');

    try {
      const success = await fastDataService.updateEnrollmentStatus(enrollmentId, 'rejected');
      
      if (!success) {
        // Rollback to original state
        optimisticUpdate(originalEnrollment.status);
        throw new Error('Server returned false for rejection operation');
      }
      
      // Success - the optimistic update was correct
      console.log(`Successfully rejected enrollment ${enrollmentId}`);
      return true;
      
    } catch (err: any) {
      console.error('Error rejecting enrollment:', err);
      
      // Comprehensive rollback to original state
      setAllEnrollments(prev => 
        prev.map(e => e.id === enrollmentId ? originalEnrollment : e)
      );
      
      if (originalUserEnrollment) {
        setUserEnrollments(prev => 
          prev.map(e => e.id === enrollmentId ? originalUserEnrollment : e)
        );
      }
      
      // Enhance error message for better user feedback
      const enhancedError = new Error(
        err.message || 'Failed to reject enrollment. This could be due to network issues or insufficient permissions.'
      );
      enhancedError.name = err.name || 'RejectionError';
      
      throw enhancedError;
    }
  }, [allEnrollments, userEnrollments]);

  // Refresh data with performance optimizations
  const refresh = useCallback(async () => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
    
    // Clear all caches including advanced cache managers
    fastDataService.clearCache();
    databaseQueryOptimizer.invalidateCache(['enrollments', 'users', 'profiles']);
    
    setRetryCount(0);
    setIsRetrying(false);
    await loadData();
  }, [loadData]);

  // Check if user is enrolled in course
  const isEnrolled = useCallback((courseId: string): boolean => {
    if (!user) return false;
    
    // Special access for specific users
    if (user.email === 'john.doe@gmail.com' || user.email === 'carlowalljee@gmail.com' || user.email === 'maxmon@gmail.com') {
      return true;
    }

    return userEnrollments.some(e => 
      e.course_id === courseId && e.status === 'approved'
    );
  }, [user, userEnrollments]);

  // Get enrollment for specific course
  const getEnrollment = useCallback((courseId: string): SimpleEnrollment | null => {
    if (!user) return null;
    return userEnrollments.find(e => e.course_id === courseId) || null;
  }, [user, userEnrollments]);

  // Computed values
  const pendingEnrollments = allEnrollments.filter(e => e.status === 'pending');

  return {
    userEnrollments,
    allEnrollments,
    allUsers,
    pendingEnrollments,
    loading,
    error,
    retryCount,
    isRetrying,
    approveEnrollment,
    rejectEnrollment,
    refresh,
    clearError,
    isEnrolled,
    getEnrollment
  };
};