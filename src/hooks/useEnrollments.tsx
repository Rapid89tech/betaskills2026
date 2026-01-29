
import { useDataManager } from './useDataManager';
import { useAuth } from '@/hooks/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { logger } from '@/utils/logger';
import { saveEnrollmentStatus } from '@/utils/enrollmentStatusSaver';

export const useEnrollments = () => {
  const { 
    enrollments, 
    loading, 
    error,
    createEnrollment,
    updateEnrollmentProgress,
    isEnrolled: dataManagerIsEnrolled,
    hasPendingEnrollment: dataManagerHasPendingEnrollment,
    getEnrollment: dataManagerGetEnrollment,
    refresh
  } = useDataManager();
  const { user } = useAuth();

  // 🚨 MIGRATED: Real-time enrollment status sync using UnifiedEnrollmentManager
  useEffect(() => {
    if (!user) return;

    logger.info('🚀 useEnrollments: Setting up UnifiedEnrollmentManager event listeners for user:', user.email);

    // Listen for enrollment status changes from UnifiedEnrollmentManager
    const handleEnrollmentStatusChange = (event: CustomEvent) => {
      logger.info('🔄 useEnrollments: Received enrollment status change from UnifiedEnrollmentManager:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        logger.info('✅ useEnrollments: Status change is for current user, data will be updated automatically via useDataManager');
        // No need to manually update localStorage - useDataManager handles this automatically
        // The UnifiedEnrollmentManager will trigger the appropriate events that useDataManager listens to
      }
    };

    // Listen for course access granted events
    const handleCourseAccessGranted = (event: CustomEvent) => {
      logger.info('🔄 useEnrollments: Received course access granted:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        logger.info('✅ useEnrollments: Course access granted for current user, refreshing data...');
        
        // Use UnifiedEnrollmentManager to update the enrollment status
        if (event.detail.enrollmentId) {
          unifiedEnrollmentManager.updateEnrollmentStatus(
            event.detail.enrollmentId, 
            'approved', 
            user.email || ''
          ).catch(error => {
            logger.error('Failed to update enrollment status via UnifiedEnrollmentManager:', error);
          });
        }
        
        // Refresh data through useDataManager
        setTimeout(() => {
          refresh();
        }, 100);
      }
    };

    // Listen for admin approval events
    const handleAdminApproval = (event: CustomEvent) => {
      logger.info('🔄 useEnrollments: Received admin approval:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        logger.info('✅ useEnrollments: Admin approval for current user, updating via UnifiedEnrollmentManager...');
        
        // Use UnifiedEnrollmentManager instead of direct localStorage manipulation
        if (event.detail.enrollmentId) {
          unifiedEnrollmentManager.updateEnrollmentStatus(
            event.detail.enrollmentId, 
            'approved', 
            user.email || ''
          ).catch(error => {
            logger.error('Failed to update enrollment status via UnifiedEnrollmentManager:', error);
          });
        }
        
        // Refresh data through useDataManager
        setTimeout(() => {
          refresh();
        }, 100);
      }
    };

    // Add event listeners - using both window events (for backward compatibility) and UnifiedEnrollmentManager events
    window.addEventListener('enrollment-status-changed', handleEnrollmentStatusChange as EventListener);
    window.addEventListener('course-access-granted', handleCourseAccessGranted as EventListener);
    window.addEventListener('admin-approval', handleAdminApproval as EventListener);

    // Also listen to UnifiedEnrollmentManager events directly
    const handleUnifiedEnrollmentUpdate = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment && enrollment.user_id === user.id) {
        logger.info('🔄 useEnrollments: Received enrollment update from UnifiedEnrollmentManager:', enrollment);
        // useDataManager will handle the state update automatically
      }
    };

    const handleUnifiedStatusChange = (event: CustomEvent) => {
      const { enrollment, userEmail } = event.detail;
      if (userEmail === user.email || (enrollment && enrollment.user_id === user.id)) {
        logger.info('🔄 useEnrollments: Received status change from UnifiedEnrollmentManager:', event.detail);
        // useDataManager will handle the state update automatically
      }
    };

    unifiedEnrollmentManager.addEventListener('enrollment-updated', handleUnifiedEnrollmentUpdate);
    unifiedEnrollmentManager.addEventListener('enrollment-status-changed', handleUnifiedStatusChange);

    logger.info('✅ useEnrollments: UnifiedEnrollmentManager event listeners set up successfully');

    // Cleanup function
    return () => {
      window.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChange as EventListener);
      window.removeEventListener('course-access-granted', handleCourseAccessGranted as EventListener);
      window.removeEventListener('admin-approval', handleAdminApproval as EventListener);
      
      unifiedEnrollmentManager.removeEventListener('enrollment-updated', handleUnifiedEnrollmentUpdate);
      unifiedEnrollmentManager.removeEventListener('enrollment-status-changed', handleUnifiedStatusChange);
      
      logger.info('🧹 useEnrollments: Event listeners cleaned up');
    };
  }, [user, refresh]);

  // Create a new enrollment request using UnifiedEnrollmentManager
  const requestEnrollment = async (courseId: string, courseTitle: string) => {
    if (!user) return;
    
    const enrollmentData = {
      user_id: user.id,
      user_email: user.email || '',
      course_id: courseId,
      course_title: courseTitle,
      status: 'pending' as const,
      progress: 0
    };

    // Use UnifiedEnrollmentManager instead of direct Supabase function call
    const newEnrollment = await createEnrollment(enrollmentData);

    // 🛡️ Immediately save enrollment status to localStorage for persistence
    saveEnrollmentStatus({
      ...enrollmentData,
      id: newEnrollment?.id || `enrollment_${Date.now()}`
    });

    // Also create notification via Supabase function for backward compatibility
    const notificationData = {
      type: 'NEW_ENROLLMENT',
      courseTitle,
      userEmail: user.email,
      read: false,
    };

    try {
      const { error } = await supabase.functions.invoke('create-enrollment', {
        body: { enrollmentData: {
          userId: user.id,
          userEmail: user.email,
          courseId,
          courseTitle,
          proofOfPayment: '',
          paymentRef: '',
          paymentDate: '',
        }, notificationData },
      });

      if (error) {
        logger.warn('Failed to create notification via Supabase function:', error);
        // Don't throw - the enrollment was created successfully via UnifiedEnrollmentManager
      }
    } catch (error) {
      logger.warn('Failed to invoke Supabase function for notification:', error);
      // Don't throw - the enrollment was created successfully
    }

    return newEnrollment;
  };

  const handleEnrollInCourse = async (courseId: string, courseTitle: string) => {
    try {
      const newEnrollment = await requestEnrollment(courseId, courseTitle);
      
      // Dispatch instructor dashboard refresh event
      window.dispatchEvent(new CustomEvent('refresh-instructor-dashboard', {
        detail: { 
          newEnrollment: {
            id: newEnrollment?.id || `enrollment_${Date.now()}`,
            user_id: user?.id || '',
            user_email: user?.email || '',
            course_id: courseId,
            course_title: courseTitle,
            status: 'pending', // ALWAYS pending for instructor approval
            enrolled_at: new Date().toISOString(),
            progress: 0
          },
          type: 'use_enrollments',
          timestamp: new Date().toISOString()
        }
      }));
      
      return true;
    } catch (error) {
      logger.error('Error enrolling in course via UnifiedEnrollmentManager:', error);
      return false;
    }
  };

  const handleUpdateProgress = async (courseId: string, progress: number) => {
    if (!user) return false;
    
    logger.info(`useEnrollments: Updating progress via UnifiedEnrollmentManager for ${courseId} to ${progress}`);
    
    try {
      await updateEnrollmentProgress(user.id, courseId, progress);
      logger.info("useEnrollments: Progress updated successfully via UnifiedEnrollmentManager");
      
      // Refresh data to ensure UI is updated
      setTimeout(() => {
        refresh();
      }, 100);
      
      return true;
    } catch (error) {
      logger.error("useEnrollments: Failed to update progress via UnifiedEnrollmentManager:", error);
      return false;
    }
  };

  // Check if user is enrolled in a specific course (approved only) - using useDataManager
  const isEnrolled = (courseId: string) => {
    if (!user || !courseId) return false;
    
    logger.info(`🔍 isEnrolled check for ${courseId} via useDataManager:`, {
      user: user.email,
      totalEnrollments: enrollments.length,
      enrollments: enrollments.map(e => ({ 
        courseId: e.course_id, 
        status: e.status, 
        userId: e.user_id,
        userEmail: e.user_email
      }))
    });
    
    // Use the dataManager's isEnrolled function which handles special access and approved status
    const result = dataManagerIsEnrolled(courseId);
    
    logger.info(`🔍 isEnrolled result for ${courseId}: ${result}`);
    return result;
  };

  // Check if user has any enrollment for a specific course (any status) - using useDataManager
  const hasAnyEnrollment = (courseId: string) => {
    if (!user || !courseId) return false;
    
    // Check current enrollments array from useDataManager (any status)
    const enrollmentMatch = enrollments.some(enrollment => {
      const enrollmentCourseId = enrollment.course_id;
      const userMatches = enrollment.user_id === user.id;
      return enrollmentCourseId === courseId && userMatches;
    });
    
    return enrollmentMatch;
  };

  // Check if user has a pending enrollment for a specific course - using useDataManager
  const hasPendingEnrollment = (courseId: string) => {
    if (!user || !courseId) return false;
    
    // Use the dataManager's hasPendingEnrollment function which handles admin users and pending status
    const result = dataManagerHasPendingEnrollment(courseId);
    
    logger.info(`🔍 hasPendingEnrollment check for ${courseId}: ${result}`);
    return result;
  };

  // Get enrollment details for a specific course - using useDataManager
  const getEnrollment = (courseId: string) => {
    if (!courseId) {
      return null;
    }

    // Use the dataManager's getEnrollment function which handles sorting and prioritization
    const result = dataManagerGetEnrollment(courseId);
    
    logger.info(`🔍 useEnrollments: Selected enrollment for "${courseId}" via useDataManager:`, result);
    return result;
  };

  // Real-time hook for instructor dashboard
  const usePendingEnrollments = () => {
    const [pending, setPending] = useState<any[]>([]);
    
    useEffect(() => {
      const fetchPendingEnrollments = async () => {
        const { data, error } = await supabase
          .from('Enrollment')
          .select('*')
          .eq('status', 'pending');
        
        if (!error && data) {
          setPending(data);
        }
      };

      fetchPendingEnrollments();

      // Set up real-time subscription
      const channel = supabase
        .channel('pending-enrollments')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'Enrollment' }, 
          (payload) => {
            if (payload.new.status === 'pending') {
              setPending(current => [...current, payload.new as any]);
            }
          }
        )
        .on('postgres_changes', 
          { event: 'UPDATE', schema: 'public', table: 'Enrollment' }, 
          (payload) => {
            setPending(current => 
              current.map(item => 
                item.id === payload.new.id ? payload.new as any : item
              ).filter(item => item.status === 'pending')
            );
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }, []);

    return pending;
  };

  return {
    enrollments,
    loading,
    error, // Now includes error handling from useDataManager
    enrollInCourse: handleEnrollInCourse,
    updateProgress: handleUpdateProgress,
    isEnrolled,
    hasPendingEnrollment,
    hasAnyEnrollment,
    getEnrollment,
    refetch: refresh, // Use refresh from useDataManager instead of refetch
    usePendingEnrollments,
  };
};

// Re-export the Enrollment type for backward compatibility
export type { Enrollment } from '@/types/enrollment';
