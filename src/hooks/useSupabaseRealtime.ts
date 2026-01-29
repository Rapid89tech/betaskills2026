// Supabase Realtime Hook for instant enrollment updates
import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useSupabaseRealtime = () => {
  const { user } = useAuth();
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!user) return;

    console.log('🚀 Setting up Supabase Realtime subscription for user:', user.email);

    // Subscribe to enrollment changes for this user
    subscriptionRef.current = supabase
      .channel('enrollment-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'enrollments',
          filter: `user_email=eq.${user.email}`
        },
        (payload) => {
          console.log('🔔 Supabase Realtime: Enrollment change received:', payload);
          
          // Dispatch custom event for components to listen to
          window.dispatchEvent(new CustomEvent('supabase-enrollment-change', {
            detail: {
              eventType: payload.eventType,
              enrollment: payload.new || payload.old,
              userEmail: user.email
            }
          }));

          // Also dispatch specific events based on the change
          if (payload.eventType === 'UPDATE' && payload.new) {
            const enrollment = payload.new;
            
            if (enrollment.status === 'approved') {
              window.dispatchEvent(new CustomEvent('enrollment-approved', {
                detail: {
                  enrollmentId: enrollment.id,
                  courseId: enrollment.course_id,
                  courseTitle: enrollment.course_title,
                  userEmail: enrollment.user_email,
                  status: enrollment.status
                }
              }));
            }
          }
        }
      )
      .subscribe((status) => {
        console.log('📡 Supabase Realtime subscription status:', status);
      });

    return () => {
      if (subscriptionRef.current) {
        console.log('🧹 Cleaning up Supabase Realtime subscription');
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, [user]);

  return {
    isConnected: subscriptionRef.current !== null
  };
};
