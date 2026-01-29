/**
 * Direct Supabase Enrollment Hook - No localStorage, No Sync
 * This hook provides enrollment status directly from Supabase without any complications
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { directSupabaseService } from '@/services/directSupabaseService';

export const useDirectSupabaseEnrollment = (courseId: string) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<'not_enrolled' | 'pending' | 'approved' | 'rejected'>('not_enrolled');
  const [loading, setLoading] = useState(true);

  const checkEnrollmentStatus = useCallback(async () => {
    if (!user || !courseId) {
      setStatus('not_enrolled');
      setLoading(false);
      return;
    }

    try {
      console.log(`🔍 Direct Supabase: Checking enrollment for ${courseId}`);
      
      const enrollmentStatus = await directSupabaseService.getUserEnrollmentStatus(user.id, courseId);
      setStatus(enrollmentStatus as any);
      
    } catch (error) {
      console.error('❌ Direct Supabase: Error checking enrollment status:', error);
      setStatus('not_enrolled');
    } finally {
      setLoading(false);
    }
  }, [user, courseId]);

  const enrollInCourse = useCallback(async () => {
    if (!user || !courseId) {
      throw new Error('User or course ID not available');
    }

    try {
      console.log(`📝 Direct Supabase: Enrolling in ${courseId}`);
      
      const enrollmentData = {
        user_id: user.id,
        user_email: user.email,
        course_id: courseId,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await directSupabaseService.createEnrollment(enrollmentData);
      
      // Refresh status after enrollment
      await checkEnrollmentStatus();
      
    } catch (error) {
      console.error('❌ Direct Supabase: Error enrolling in course:', error);
      throw error;
    }
  }, [user, courseId, checkEnrollmentStatus]);

  useEffect(() => {
    // Initial check
    checkEnrollmentStatus();

    // Listen for approval events (admin approval)
    const handleApproval = (event: CustomEvent) => {
      if (event.detail.courseId === courseId || event.detail.course_id === courseId) {
        console.log('🔔 Direct Supabase: Approval event received, refreshing status');
        checkEnrollmentStatus();
      }
    };

    window.addEventListener('admin-approval', handleApproval as EventListener);
    window.addEventListener('enrollment-approved', handleApproval as EventListener);

    return () => {
      window.removeEventListener('admin-approval', handleApproval as EventListener);
      window.removeEventListener('enrollment-approved', handleApproval as EventListener);
    };
  }, [checkEnrollmentStatus, courseId]);

  return { 
    status, 
    loading, 
    checkEnrollmentStatus,
    enrollInCourse,
    isEnrolled: status === 'approved',
    isPending: status === 'pending'
  };
};
