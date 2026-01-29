import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/AuthContext';
import { useRealTimeEnrollments } from '@/hooks/useRealTimeEnrollments';
import { Clock, CheckCircle, BookOpen } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface RealTimeEnrollmentButtonProps {
  courseId: string;
  onEnrollClick: () => void;
  className?: string;
}

/**
 * Simplified enrollment button that works without problematic sync operations
 */
export const RealTimeEnrollmentButton: React.FC<RealTimeEnrollmentButtonProps> = ({
  courseId,
  onEnrollClick,
  className = ""
}) => {
  const { user } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [loading, setLoading] = useState(false); // Start with false to prevent stuck loading

  // Create Supabase client
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jpafcmixtchvtrkhltst.supabase.co';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYWZjbWl4dGNodnRya2hsdHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MzIzODYsImV4cCI6MjA2OTEwODM4Nn0.dR0-DW8_ekftD9DZjGutGuyh4kiPG338NQ367tC8Pcw';
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // 🚨 SENIOR DEVELOPER: Direct force refresh mechanism
  const forceRefreshStatus = async () => {
    if (!user || !courseId) return;
    
    console.log(`🔄 RealTime: Force refreshing status for course ${courseId}...`);
    
    try {
      // Check database directly
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_email', user.email)
        .eq('course_id', courseId)
        .order('enrolled_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error in force refresh:', error);
        return;
      }

      if (data && data.length > 0) {
        const enrollment = data[0];
        console.log(`🔄 RealTime: Force refresh found enrollment:`, enrollment);
        
        if (enrollment.status === 'approved') {
          setIsEnrolled(true);
          setIsPending(false);
          console.log(`✅ RealTime: Force refresh - Enrollment approved for ${courseId}`);
        } else if (enrollment.status === 'pending') {
          setIsEnrolled(false);
          setIsPending(true);
          console.log(`⏳ RealTime: Force refresh - Enrollment pending for ${courseId}`);
        } else {
          setIsEnrolled(false);
          setIsPending(false);
          console.log(`❌ RealTime: Force refresh - Enrollment status unknown for ${courseId}: ${enrollment.status}`);
        }
      } else {
        // Check localStorage as fallback
        const localEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const localEnrollment = localEnrollments.find((e: any) => 
          e.user_email === user.email && e.course_id === courseId
        );
        
        if (localEnrollment) {
          console.log(`🔄 RealTime: Force refresh found localStorage enrollment:`, localEnrollment);
          
          if (localEnrollment.status === 'approved') {
            setIsEnrolled(true);
            setIsPending(false);
            console.log(`✅ RealTime: Force refresh localStorage - Enrollment approved for ${courseId}`);
          } else if (localEnrollment.status === 'pending') {
            setIsEnrolled(false);
            setIsPending(true);
            console.log(`⏳ RealTime: Force refresh localStorage - Enrollment pending for ${courseId}`);
          } else {
            setIsEnrolled(false);
            setIsPending(false);
            console.log(`❌ RealTime: Force refresh localStorage - Enrollment status unknown for ${courseId}: ${localEnrollment.status}`);
          }
        } else {
          setIsEnrolled(false);
          setIsPending(false);
          console.log(`❌ RealTime: Force refresh - No enrollment found for ${courseId}`);
        }
      }
    } catch (error) {
      console.error('Error in force refresh:', error);
    }
  };

  // 🚨 SENIOR DEVELOPER: Enhanced enrollment status check
  const checkEnrollmentStatus = async () => {
    if (!user || !courseId) {
      setIsEnrolled(false);
      setIsPending(false);
      setLoading(false);
      return;
    }

    try {
      console.log(`🔍 RealTime: Checking enrollment for ${courseId} and user ${user.email}...`);
      
      // Check database directly for enrollment status
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_email', user.email)
        .eq('course_id', courseId)
        .order('enrolled_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching enrollment from database:', error);
        // Fallback to localStorage
        const localEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const localEnrollment = localEnrollments.find((e: any) => 
          e.user_email === user.email && e.course_id === courseId
        );
        
        if (localEnrollment) {
          console.log(`🔍 RealTime: Found localStorage enrollment for ${courseId}:`, localEnrollment);
          
          if (localEnrollment.status === 'approved') {
            setIsEnrolled(true);
            setIsPending(false);
            console.log(`✅ RealTime: localStorage enrollment approved for ${courseId}`);
          } else if (localEnrollment.status === 'pending') {
            setIsEnrolled(false);
            setIsPending(true);
            console.log(`⏳ RealTime: localStorage enrollment pending for ${courseId}`);
          } else {
            setIsEnrolled(false);
            setIsPending(false);
            console.log(`❌ RealTime: localStorage enrollment status unknown for ${courseId}: ${localEnrollment.status}`);
          }
        } else {
          setIsEnrolled(false);
          setIsPending(false);
          console.log(`❌ RealTime: No enrollment found in database or localStorage for ${courseId}`);
        }
        
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const enrollment = data[0];
        console.log(`🔍 RealTime: Found enrollment for ${courseId}:`, enrollment);
        
        if (enrollment.status === 'approved') {
          setIsEnrolled(true);
          setIsPending(false);
          console.log(`✅ RealTime: Enrollment approved for ${courseId}`);
        } else if (enrollment.status === 'pending') {
          setIsEnrolled(false);
          setIsPending(true);
          console.log(`⏳ RealTime: Enrollment pending for ${courseId}`);
        } else {
          setIsEnrolled(false);
          setIsPending(false);
          console.log(`❌ RealTime: Enrollment status unknown for ${courseId}: ${enrollment.status}`);
        }
      } else {
        // Check localStorage as fallback
        console.log(`🔍 RealTime: Checking localStorage for enrollment ${courseId}...`);
        const localEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const localEnrollment = localEnrollments.find((e: any) => 
          e.user_email === user.email && e.course_id === courseId
        );
        
        if (localEnrollment) {
          console.log(`🔍 RealTime: Found localStorage enrollment for ${courseId}:`, localEnrollment);
          
          if (localEnrollment.status === 'approved') {
            setIsEnrolled(true);
            setIsPending(false);
            console.log(`✅ RealTime: localStorage enrollment approved for ${courseId}`);
          } else if (localEnrollment.status === 'pending') {
            setIsEnrolled(false);
            setIsPending(true);
            console.log(`⏳ RealTime: localStorage enrollment pending for ${courseId}`);
          } else {
            setIsEnrolled(false);
            setIsPending(false);
            console.log(`❌ RealTime: localStorage enrollment status unknown for ${courseId}: ${localEnrollment.status}`);
          }
        } else {
          setIsEnrolled(false);
          setIsPending(false);
          console.log(`❌ RealTime: No enrollment found in database or localStorage for ${courseId}`);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error checking enrollment status:', error);
      setIsEnrolled(false);
      setIsPending(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkEnrollmentStatus();

    // 🚨 SENIOR DEVELOPER: Listen for real-time course card refresh events
    const handleForceRefresh = (event: CustomEvent) => {
      console.log(`🔄 RealTime: Received force-course-card-refresh for course ${courseId}:`, event.detail);
      
      if (event.detail.courseId === courseId) {
        console.log(`✅ RealTime: Force refresh matches current course ${courseId}, updating status...`);
        
        // Update status based on event
        if (event.detail.newStatus === 'approved') {
          setIsEnrolled(true);
          setIsPending(false);
          console.log(`✅ RealTime: Course ${courseId} status updated to approved via force refresh`);
        } else if (event.detail.newStatus === 'pending') {
          setIsEnrolled(false);
          setIsPending(true);
          console.log(`⏳ RealTime: Course ${courseId} status updated to pending via force refresh`);
        }
        
        // Also update localStorage to keep it in sync
        const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const updatedEnrollments = existingEnrollments.map((enrollment: any) => {
          if (enrollment.course_id === courseId && enrollment.user_email === user?.email) {
            return {
              ...enrollment,
              status: event.detail.newStatus,
              approved_at: event.detail.newStatus === 'approved' ? new Date().toISOString() : null
            };
          }
          return enrollment;
        });
        localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
        console.log(`💾 RealTime: Updated localStorage for course ${courseId} via force refresh`);
      }
    };

    // Add event listener for force refresh
    window.addEventListener('force-course-card-refresh', handleForceRefresh as EventListener);
    console.log(`✅ RealTime: Added force-course-card-refresh listener for course ${courseId}`);

    // 🚨 SENIOR DEVELOPER: Aggressive polling for immediate updates (every 2 seconds)
    const interval = setInterval(() => {
      forceRefreshStatus();
    }, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('force-course-card-refresh', handleForceRefresh as EventListener);
      console.log(`🧹 RealTime: Cleaned up event listeners and interval for course ${courseId}`);
    };
  }, [user, courseId]);

  if (loading) {
    return (
      <Button disabled className={className}>
        Loading...
      </Button>
    );
  }

  if (isEnrolled) {
    return (
      <Button 
        className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
        onClick={() => {
          // Navigate directly to course lessons for approved users
          console.log('🎯 Continue Course clicked for course:', courseId);
          window.location.href = `/course/${courseId}`;
        }}
      >
        ✅ Continue Course
      </Button>
    );
  }

  if (isPending) {
    return (
      <Button 
        disabled
        className={`bg-yellow-500 hover:bg-yellow-600 text-white cursor-not-allowed ${className}`}
      >
        ⏳ Pending
      </Button>
    );
  }

  return (
    <Button 
      onClick={onEnrollClick}
      className={`bg-red-600 hover:bg-red-700 text-white ${className}`}
    >
      Enroll Now
    </Button>
  );
};

export default RealTimeEnrollmentButton;
