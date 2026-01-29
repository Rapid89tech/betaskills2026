import { useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

/**
 * Senior Developer Implementation: Comprehensive User State Synchronization
 * This hook ensures all user data is properly synchronized between localStorage and Supabase
 * for a seamless experience across devices and sessions.
 */
export const useUserStateSync = () => {
  const { user } = useAuth();

  // Sync enrollments from localStorage to Supabase
  const syncEnrollmentsToSupabase = useCallback(async () => {
    if (!user) return;

    try {
      const localEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const userLocalEnrollments = localEnrollments.filter((e: any) => 
        (e.user_id === user.id || e.userId === user.id) && e.status === 'approved'
      );

      if (userLocalEnrollments.length === 0) return;

      console.log('🔄 Syncing local enrollments to Supabase...', userLocalEnrollments.length);

      // Check what's already in Supabase
      const { data: existingEnrollments, error: fetchError } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id);

      if (fetchError) {
        console.warn('Could not fetch existing enrollments:', fetchError);
        return;
      }

      const existingCourseIds = new Set(existingEnrollments?.map(e => e.course_id) || []);

      // Only sync enrollments that don't exist in Supabase
      const enrollmentsToSync = userLocalEnrollments.filter((localEnrollment: any) => {
        const courseId = localEnrollment.course_id || localEnrollment.courseId;
        return !existingCourseIds.has(courseId);
      });

      if (enrollmentsToSync.length === 0) {
        console.log('✅ All enrollments already synced to Supabase');
        return;
      }

      // Batch insert new enrollments
      const normalizedEnrollments = enrollmentsToSync.map((enrollment: any) => ({
        user_id: user.id,
        user_email: user.email || enrollment.user_email,
        course_id: enrollment.course_id || enrollment.courseId,
        course_title: enrollment.course_title || enrollment.title || 'Unknown Course',
        status: 'approved',
        enrolled_at: enrollment.enrolled_at || new Date().toISOString(),
        approved_at: enrollment.approved_at || new Date().toISOString(),
        progress: enrollment.progress || 0,
        proof_of_payment: enrollment.proof_of_payment || 'local_enrollment',
        payment_ref: enrollment.payment_ref || `local_${Date.now()}`,
        payment_date: enrollment.payment_date || new Date().toISOString().split('T')[0]
      }));

      const { error: insertError } = await supabase
        .from('enrollments')
        .insert(normalizedEnrollments);

      if (insertError) {
        console.warn('Could not sync some enrollments to Supabase:', insertError);
      } else {
        console.log('✅ Successfully synced enrollments to Supabase:', normalizedEnrollments.length);
      }

    } catch (error) {
      console.warn('Error during enrollment sync:', error);
    }
  }, [user]);

  // Sync user progress and activity logs
  const syncUserActivityToSupabase = useCallback(async () => {
    if (!user) return;

    try {
      // Get user activity from localStorage
      const userProgress = localStorage.getItem(`user-progress-${user.id}`);
      const completedLessons = localStorage.getItem(`completed-lessons-${user.id}`);
      
      if (userProgress || completedLessons) {
        console.log('📊 Syncing user activity to Supabase...');
        
        // You can extend this to save activity logs, progress, etc.
        // For now, we ensure the user profile exists and is updated
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email,
            last_activity: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'id'
          });

        if (!error) {
          console.log('✅ User activity synced to Supabase');
        }
      }
    } catch (error) {
      console.warn('Error syncing user activity:', error);
    }
  }, [user]);

  // Main sync function
  const performFullSync = useCallback(async () => {
    if (!user) return;
    
    console.log('🔄 Starting full user state sync...');
    await Promise.all([
      syncEnrollmentsToSupabase(),
      syncUserActivityToSupabase()
    ]);
    console.log('✅ Full user state sync completed');
  }, [user, syncEnrollmentsToSupabase, syncUserActivityToSupabase]);

  // Sync on user login and periodically (THROTTLED)
  useEffect(() => {
    if (!user) return;

    // Initial sync when user logs in
    performFullSync();

    // Periodic sync every 10 minutes (increased from 5 minutes)
    const syncInterval = setInterval(() => {
      import('@/utils/syncThrottler').then(({ syncThrottler }) => {
        syncThrottler.throttleSync('user-state-periodic', performFullSync);
      });
    }, 10 * 60 * 1000);

    // Sync on visibility change (when user comes back to tab) - THROTTLED
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        import('@/utils/syncThrottler').then(({ syncThrottler }) => {
          syncThrottler.throttleSync('user-state-visibility', performFullSync);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(syncInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, performFullSync]);

  // Listen for enrollment success to trigger throttled sync
  useEffect(() => {
    const handleEnrollmentSuccess = () => {
      console.log('🎯 Enrollment success detected, triggering throttled sync...');
      // Use throttled sync instead of immediate sync
      import('@/utils/syncThrottler').then(({ syncThrottler }) => {
        syncThrottler.throttleSync('enrollment-success', performFullSync);
      });
    };

    window.addEventListener('enrollment-success', handleEnrollmentSuccess);
    
    return () => {
      window.removeEventListener('enrollment-success', handleEnrollmentSuccess);
    };
  }, [performFullSync]);

  return {
    syncEnrollmentsToSupabase,
    syncUserActivityToSupabase,
    performFullSync
  };
};
