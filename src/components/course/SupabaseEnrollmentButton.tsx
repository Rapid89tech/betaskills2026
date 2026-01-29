// SUPABASE-ONLY Enrollment Button - No localStorage dependency
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/AuthContext';
import { enrollmentService } from '@/services/enrollmentService';

interface SupabaseEnrollmentButtonProps {
  courseId: string;
  courseTitle: string;
  onEnrollClick: () => void;
  className?: string;
}

/**
 * Supabase-only enrollment button that fetches status directly from database
 */
export const SupabaseEnrollmentButton: React.FC<SupabaseEnrollmentButtonProps> = ({
  courseId,
  courseTitle,
  onEnrollClick,
  className = ""
}) => {
  const { user } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check enrollment status from Supabase only
  const checkEnrollmentStatus = async () => {
    if (!user || !courseId) {
      setIsEnrolled(false);
      setIsPending(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`🔍 SupabaseButton: Checking enrollment for ${courseId} and user ${user.email}...`);
      
      // Get user enrollments from Supabase
      const userEnrollments = await enrollmentService.getUserEnrollments(user.id);
      const enrollment = userEnrollments.find(e => e.course_id === courseId);
      
      if (enrollment) {
        console.log(`🔍 SupabaseButton: Found enrollment for ${courseId}:`, enrollment);
        
        if (enrollment.status === 'approved') {
          setIsEnrolled(true);
          setIsPending(false);
          console.log(`✅ SupabaseButton: Enrollment approved for ${courseId}`);
        } else if (enrollment.status === 'pending') {
          setIsEnrolled(false);
          setIsPending(true);
          console.log(`⏳ SupabaseButton: Enrollment pending for ${courseId}`);
        } else if (enrollment.status === 'rejected') {
          setIsEnrolled(false);
          setIsPending(false);
          console.log(`❌ SupabaseButton: Enrollment rejected for ${courseId}`);
        }
      } else {
        setIsEnrolled(false);
        setIsPending(false);
        console.log(`❌ SupabaseButton: No enrollment found for ${courseId}`);
      }
    } catch (err: any) {
      console.error('❌ SupabaseButton: Error checking enrollment status:', err);
      setError(err.message || 'Failed to check enrollment status');
      setIsEnrolled(false);
      setIsPending(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle enrollment
  const handleEnroll = async () => {
    if (!user) {
      console.error('❌ Cannot enroll: User not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`📝 SupabaseButton: Enrolling in course ${courseId}...`);
      
      const success = await enrollmentService.createEnrollment({
        user_id: user.id,
        user_email: user.email || '',
        course_id: courseId,
        course_title: courseTitle,
        status: 'pending',
        progress: 0,
        enrolled_at: new Date().toISOString()
      });

      if (success) {
        console.log(`✅ SupabaseButton: Successfully enrolled in ${courseId}`);
        setIsPending(true);
        setIsEnrolled(false);
        
        // Dispatch enrollment success event
        window.dispatchEvent(new CustomEvent('enrollment-created', {
          detail: {
            courseId,
            courseTitle,
            userEmail: user.email,
            status: 'pending'
          }
        }));
      }
    } catch (err: any) {
      console.error('❌ SupabaseButton: Error enrolling in course:', err);
      setError(err.message || 'Failed to enroll in course');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkEnrollmentStatus();

    // Listen for real-time updates
    const handleEnrollmentStatusChange = (event: CustomEvent) => {
      console.log('🔄 SupabaseButton: Received enrollment status change:', event.detail);
      
      if (event.detail.userEmail === user?.email && event.detail.courseId === courseId) {
        console.log('✅ SupabaseButton: Status change is for current course, refreshing...');
        checkEnrollmentStatus();
      }
    };

    const handleAdminApproval = (event: CustomEvent) => {
      console.log('🔄 SupabaseButton: Received admin approval:', event.detail);
      
      if (event.detail.userEmail === user?.email && event.detail.courseId === courseId) {
        console.log('✅ SupabaseButton: Admin approval for current course, refreshing...');
        checkEnrollmentStatus();
      }
    };

    const handleForceRefresh = (event: CustomEvent) => {
      console.log('🔄 SupabaseButton: Received force refresh:', event.detail);
      
      if (event.detail.courseId === courseId) {
        console.log('✅ SupabaseButton: Force refresh for current course, refreshing...');
        checkEnrollmentStatus();
      }
    };

    // Add event listeners
    window.addEventListener('enrollment-status-changed', handleEnrollmentStatusChange as EventListener);
    window.addEventListener('admin-approval', handleAdminApproval as EventListener);
    window.addEventListener('force-course-card-refresh', handleForceRefresh as EventListener);

    // Polling for updates (every 5 seconds)
    const interval = setInterval(() => {
      checkEnrollmentStatus();
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChange as EventListener);
      window.removeEventListener('admin-approval', handleAdminApproval as EventListener);
      window.removeEventListener('force-course-card-refresh', handleForceRefresh as EventListener);
    };
  }, [user, courseId]);

  if (loading) {
    return (
      <Button disabled className={className}>
        Loading...
      </Button>
    );
  }

  if (error) {
    return (
      <Button 
        onClick={checkEnrollmentStatus}
        className={`bg-orange-600 hover:bg-orange-700 text-white ${className}`}
      >
        ⚠️ Retry
      </Button>
    );
  }

  if (isEnrolled) {
    return (
      <Button 
        className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
        onClick={() => window.location.href = `/course/${courseId}`}
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
        ⏳ Pending Approval
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleEnroll}
      className={`bg-red-600 hover:bg-red-700 text-white ${className}`}
    >
      Enroll Now
    </Button>
  );
};

export default SupabaseEnrollmentButton;
