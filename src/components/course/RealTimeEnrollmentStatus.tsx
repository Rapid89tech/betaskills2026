// Real-time enrollment status component that polls Supabase directly
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { enrollmentService } from '@/services/enrollmentService';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';

interface RealTimeEnrollmentStatusProps {
  courseId: string;
  onStatusChange: (status: 'not_enrolled' | 'pending' | 'approved' | 'rejected') => void;
  children: (status: 'not_enrolled' | 'pending' | 'approved' | 'rejected', loading: boolean) => React.ReactNode;
}

export const RealTimeEnrollmentStatus: React.FC<RealTimeEnrollmentStatusProps> = ({
  courseId,
  onStatusChange,
  children
}) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<'not_enrolled' | 'pending' | 'approved' | 'rejected'>('not_enrolled');
  const [loading, setLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState<number>(0);
  
  // Set up Supabase Realtime subscription
  useSupabaseRealtime();

  // Check enrollment status from Supabase
  const checkStatus = useCallback(async () => {
    if (!user || !courseId) {
      setStatus('not_enrolled');
      setLoading(false);
      return;
    }

    try {
      console.log(`🔍 RealTimeStatus: Checking status for course ${courseId} and user ${user.email}`);
      
      const userEnrollments = await enrollmentService.getUserEnrollments(user.id);
      const enrollment = userEnrollments.find(e => e.course_id === courseId);
      
      let newStatus: 'not_enrolled' | 'pending' | 'approved' | 'rejected' = 'not_enrolled';
      
      if (enrollment) {
        newStatus = enrollment.status;
        console.log(`✅ RealTimeStatus: Found enrollment for ${courseId} with status: ${newStatus}`);
      } else {
        console.log(`❌ RealTimeStatus: No enrollment found for ${courseId}`);
      }
      
      // Only update if status changed
      if (newStatus !== status) {
        console.log(`🔄 RealTimeStatus: Status changed from ${status} to ${newStatus} for ${courseId}`);
        setStatus(newStatus);
        onStatusChange(newStatus);
      }
      
      setLastCheck(Date.now());
    } catch (error) {
      console.error('❌ RealTimeStatus: Error checking status:', error);
    } finally {
      setLoading(false);
    }
  }, [user, courseId, status, onStatusChange]);

  useEffect(() => {
    // Initial check
    checkStatus();

    // Aggressive polling every 2 seconds for real-time updates
    const interval = setInterval(() => {
      checkStatus();
    }, 2000);

    // Also listen for any custom events as backup
    const handleCustomEvent = (event: CustomEvent) => {
      console.log('🔄 RealTimeStatus: Received custom event:', event.detail);
      
      // Check if this event is relevant to our course
      if (event.detail.courseId === courseId || event.detail.course_id === courseId) {
        console.log('✅ RealTimeStatus: Event is for our course, checking status...');
        setTimeout(checkStatus, 100); // Small delay to ensure database is updated
      }
    };

    // Listen for various event types
    const eventTypes = [
      'admin-approval',
      'enrollment-status-changed',
      'course-access-granted',
      'force-course-card-refresh',
      'enrollment-created',
      'enrollment-updated'
    ];

    eventTypes.forEach(eventType => {
      window.addEventListener(eventType, handleCustomEvent as EventListener);
    });

    // Listen for Supabase realtime events
    const handleSupabaseRealtimeEvent = (event: CustomEvent) => {
      console.log('🔔 RealTimeStatus: Received Supabase realtime event:', event.detail);
      
      if (event.detail.enrollment?.course_id === courseId) {
        console.log('✅ RealTimeStatus: Supabase realtime event is for our course, checking status...');
        setTimeout(checkStatus, 100);
      }
    };

    window.addEventListener('supabase-enrollment-change', handleSupabaseRealtimeEvent as EventListener);
    window.addEventListener('enrollment-approved', handleSupabaseRealtimeEvent as EventListener);

    return () => {
      clearInterval(interval);
      eventTypes.forEach(eventType => {
        window.removeEventListener(eventType, handleCustomEvent as EventListener);
      });
      window.removeEventListener('supabase-enrollment-change', handleSupabaseRealtimeEvent as EventListener);
      window.removeEventListener('enrollment-approved', handleSupabaseRealtimeEvent as EventListener);
    };
  }, [checkStatus]);

  return <>{children(status, loading)}</>;
};

export default RealTimeEnrollmentStatus;
