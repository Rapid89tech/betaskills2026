// SUPABASE-ONLY Enrollment Hook - No localStorage dependency
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { enrollmentService } from '@/services/enrollmentService';

export interface Enrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  progress: number;
  enrolled_at: string;
  updated_at?: string;
  payment_ref?: string;
  proof_of_payment?: string;
  payment_date?: string;
}

export const useEnrollmentsSupabase = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch enrollments from Supabase only
  const fetchEnrollments = useCallback(async () => {
    if (!user) {
      setEnrollments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Fetching enrollments from Supabase for user:', user.email);
      const userEnrollments = await enrollmentService.getUserEnrollments(user.id);
      console.log('✅ Enrollments fetched from Supabase:', userEnrollments);
      setEnrollments(userEnrollments);
    } catch (err: any) {
      console.error('❌ Error fetching enrollments:', err);
      setError(err.message || 'Failed to fetch enrollments');
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Check if user is enrolled in a specific course
  const isEnrolled = useCallback((courseId: string): boolean => {
    return enrollments.some(enrollment => 
      enrollment.course_id === courseId && enrollment.status === 'approved'
    );
  }, [enrollments]);

  // Check if user has pending enrollment for a course
  const isPending = useCallback((courseId: string): boolean => {
    return enrollments.some(enrollment => 
      enrollment.course_id === courseId && enrollment.status === 'pending'
    );
  }, [enrollments]);

  // Get enrollment for a specific course
  const getEnrollment = useCallback((courseId: string): Enrollment | null => {
    return enrollments.find(enrollment => enrollment.course_id === courseId) || null;
  }, [enrollments]);

  // Get enrollment status for a course
  const getEnrollmentStatus = useCallback((courseId: string): 'not_enrolled' | 'pending' | 'approved' | 'rejected' => {
    const enrollment = getEnrollment(courseId);
    if (!enrollment) return 'not_enrolled';
    return enrollment.status;
  }, [getEnrollment]);

  // Enroll in a course
  const enrollInCourse = useCallback(async (courseId: string, courseTitle: string): Promise<boolean> => {
    if (!user) {
      console.error('❌ Cannot enroll: User not authenticated');
      return false;
    }

    // Check if already enrolled
    if (isEnrolled(courseId)) {
      console.log('ℹ️ User already enrolled in course:', courseId);
      return true;
    }

    if (isPending(courseId)) {
      console.log('ℹ️ User already has pending enrollment for course:', courseId);
      return true;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('📝 Creating enrollment for course:', courseId);
      const enrollmentData = {
        user_id: user.id,
        user_email: user.email || '',
        course_id: courseId,
        course_title: courseTitle,
        status: 'pending' as const,
        progress: 0,
        enrolled_at: new Date().toISOString()
      };

      const newEnrollment = await enrollmentService.createEnrollment(enrollmentData);
      console.log('✅ Enrollment created successfully:', newEnrollment);

      // Refresh enrollments list
      await fetchEnrollments();

      return true;
    } catch (err: any) {
      console.error('❌ Error enrolling in course:', err);
      setError(err.message || 'Failed to enroll in course');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, isEnrolled, isPending, fetchEnrollments]);

  // Update course progress
  const updateProgress = useCallback(async (courseId: string, progress: number): Promise<boolean> => {
    if (!user) return false;

    try {
      const enrollment = getEnrollment(courseId);
      if (!enrollment) {
        console.error('❌ Cannot update progress: Enrollment not found');
        return false;
      }

      console.log('📝 Updating progress for course:', courseId, 'to', progress);
      
      // Update enrollment progress
      await enrollmentService.updateEnrollmentProgress(enrollment.id, progress);
      
      // Update user progress table
      await enrollmentService.saveUserProgress({
        user_id: user.id,
        course_id: courseId,
        current_module: Math.ceil(progress / 10), // Estimate module based on progress
        current_lesson: Math.ceil(progress / 5), // Estimate lesson based on progress
        completed_lessons: [], // This would need to be tracked separately
        quiz_scores: {},
        progress_percentage: progress,
        total_time_spent: 0,
        last_visited: new Date().toISOString()
      });

      // Refresh enrollments
      await fetchEnrollments();
      
      return true;
    } catch (err: any) {
      console.error('❌ Error updating progress:', err);
      return false;
    }
  }, [user, getEnrollment, fetchEnrollments]);

  // Listen for real-time updates
  useEffect(() => {
    if (!user) return;

    console.log('🚀 Setting up real-time enrollment listeners for user:', user.email);

    // Listen for enrollment status changes
    const handleEnrollmentStatusChange = (event: CustomEvent) => {
      console.log('🔄 Received enrollment status change:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        console.log('✅ Status change is for current user, refreshing enrollments...');
        fetchEnrollments();
      }
    };

    // Listen for admin approval events
    const handleAdminApproval = (event: CustomEvent) => {
      console.log('🔄 Received admin approval:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        console.log('✅ Admin approval for current user, refreshing enrollments...');
        fetchEnrollments();
      }
    };

    // Listen for course access granted events
    const handleCourseAccessGranted = (event: CustomEvent) => {
      console.log('🔄 Received course access granted:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        console.log('✅ Course access granted for current user, refreshing enrollments...');
        fetchEnrollments();
      }
    };

    // Listen for force refresh events
    const handleForceRefresh = (event: CustomEvent) => {
      console.log('🔄 Received force refresh event:', event.detail);
      fetchEnrollments();
    };

    // Add event listeners
    window.addEventListener('enrollment-status-changed', handleEnrollmentStatusChange as EventListener);
    window.addEventListener('admin-approval', handleAdminApproval as EventListener);
    window.addEventListener('course-access-granted', handleCourseAccessGranted as EventListener);
    window.addEventListener('force-course-card-refresh', handleForceRefresh as EventListener);

    // Initial fetch
    fetchEnrollments();

    // Cleanup
    return () => {
      window.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChange as EventListener);
      window.removeEventListener('admin-approval', handleAdminApproval as EventListener);
      window.removeEventListener('course-access-granted', handleCourseAccessGranted as EventListener);
      window.removeEventListener('force-course-card-refresh', handleForceRefresh as EventListener);
    };
  }, [user, fetchEnrollments]);

  return {
    enrollments,
    loading,
    error,
    isEnrolled,
    isPending,
    getEnrollment,
    getEnrollmentStatus,
    enrollInCourse,
    updateProgress,
    refetch: fetchEnrollments
  };
};
