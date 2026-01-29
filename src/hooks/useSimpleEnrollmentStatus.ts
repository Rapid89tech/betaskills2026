// Simple, reliable enrollment status hook
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { enrollmentService } from '@/services/enrollmentService';

export const useSimpleEnrollmentStatus = (courseId: string) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<'not_enrolled' | 'pending' | 'approved' | 'rejected'>('not_enrolled');
  const [loading, setLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    if (!user || !courseId) {
      setStatus('not_enrolled');
      setLoading(false);
      return;
    }

    try {
      console.log(`🔍 SIMPLE CHECK: ${courseId} for ${user.email}`);
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Status check timeout')), 5000)
      );

      const fetchPromise = enrollmentService.getUserEnrollments(user.id);
      
      const userEnrollments = await Promise.race([fetchPromise, timeoutPromise]) as any[];
      const enrollment = userEnrollments.find((e: any) => e.course_id === courseId);
      const newStatus = enrollment ? enrollment.status : 'not_enrolled';
      
      console.log(`✅ SIMPLE CHECK RESULT: ${courseId} = ${newStatus}`, { enrollment, userEnrollments });
      
      // Always update status to force re-render
      setStatus(newStatus);
      
    } catch (error) {
      console.error('❌ SIMPLE CHECK ERROR:', error);
      // Set to not_enrolled on error to prevent stuck loading
      setStatus('not_enrolled');
    } finally {
      setLoading(false);
    }
  }, [user, courseId]);

  useEffect(() => {
    // Initial check
    checkStatus();

    // Use a more resilient polling approach that works even when intervals are blocked
    let intervalId: number | null = null;
    
    const startPolling = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(checkStatus, 10000);
    };

    // Try to start polling, but don't fail if intervals are blocked
    try {
      startPolling();
    } catch (error) {
      console.warn('⚠️ Polling blocked, using event-based updates only');
    }

    // Listen for approval events
    const handleApproval = (event: CustomEvent) => {
      console.log('🔔 APPROVAL EVENT:', event.detail);
      if (event.detail.courseId === courseId || event.detail.course_id === courseId) {
        console.log('✅ APPROVAL FOR OUR COURSE - REFRESHING');
        // Use a more resilient timeout approach
        try {
          setTimeout(checkStatus, 100);
        } catch (error) {
          // If timeout is blocked, just call directly
          checkStatus();
        }
      }
    };

    window.addEventListener('admin-approval', handleApproval as EventListener);
    window.addEventListener('enrollment-approved', handleApproval as EventListener);

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener('admin-approval', handleApproval as EventListener);
      window.removeEventListener('enrollment-approved', handleApproval as EventListener);
    };
  }, [checkStatus, courseId]);

  return { status, loading, checkStatus };
};
