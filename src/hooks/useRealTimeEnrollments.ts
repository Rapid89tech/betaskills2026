import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface Enrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  updated_at: string;
  payment_proof?: string;
  payment_reference?: string;
  payment_date?: string;
  payment_type?: 'EFT' | 'CARD';
  payment_status?: 'pending' | 'completed' | 'failed';
}

interface UseRealTimeEnrollmentsReturn {
  enrollments: Enrollment[];
  userEnrollments: Enrollment[];
  pendingCount: number;
  loading: boolean;
  error: string | null;
  approveEnrollment: (enrollmentId: string) => Promise<boolean>;
  rejectEnrollment: (enrollmentId: string) => Promise<boolean>;
  refreshEnrollments: () => Promise<void>;
}

export const useRealTimeEnrollments = (): UseRealTimeEnrollmentsReturn => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch enrollments from database
  const fetchEnrollments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setEnrollments(data || []);
    } catch (err: any) {
      console.error('Error fetching enrollments:', err);
      setError(err.message || 'Failed to fetch enrollments');
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    fetchEnrollments();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('enrollments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'enrollments'
        },
        (payload) => {
          console.log('Real-time enrollment change:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newEnrollment = payload.new as Enrollment;
            setEnrollments(prev => [newEnrollment, ...prev]);
            
            // Show notification for new enrollment (admin only)
            if (user?.role === 'admin' || user?.role === 'instructor') {
              showNewEnrollmentNotification(newEnrollment);
            }
            
            // Dispatch custom event for real-time updates
            window.dispatchEvent(new CustomEvent('enrollment-created', {
              detail: newEnrollment
            }));
          } else if (payload.eventType === 'UPDATE') {
            const updatedEnrollment = payload.new as Enrollment;
            setEnrollments(prev => 
              prev.map(enrollment => 
                enrollment.id === updatedEnrollment.id ? updatedEnrollment : enrollment
              )
            );
            
            // Dispatch custom event for status updates
            window.dispatchEvent(new CustomEvent('enrollment-updated', {
              detail: updatedEnrollment
            }));
            
            // Show notification for approval/rejection
            if (user?.email === updatedEnrollment.user_email) {
              showStatusUpdateNotification(updatedEnrollment);
            }
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old.id;
            setEnrollments(prev => prev.filter(enrollment => enrollment.id !== deletedId));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchEnrollments, user]);

  // Show notification for new enrollment (admin/instructor)
  const showNewEnrollmentNotification = (enrollment: Enrollment) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Enrollment Request', {
        body: `${enrollment.user_email} enrolled in ${enrollment.course_title}`,
        icon: '/favicon.ico',
        tag: `enrollment-${enrollment.id}`
      });
    }
    
    // Also show browser notification
    if (document.hidden) {
      document.title = `(1) New Enrollment - Admin Dashboard`;
    }
  };

  // Show notification for status update (student)
  const showStatusUpdateNotification = (enrollment: Enrollment) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const message = enrollment.status === 'approved' 
        ? `Your enrollment in ${enrollment.course_title} has been approved!`
        : `Your enrollment in ${enrollment.course_title} has been rejected.`;
        
      new Notification('Enrollment Status Update', {
        body: message,
        icon: '/favicon.ico',
        tag: `status-${enrollment.id}`
      });
    }
  };

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Approve enrollment
  const approveEnrollment = useCallback(async (enrollmentId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ 
          status: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId);

      if (error) {
        throw error;
      }

      return true;
    } catch (err: any) {
      console.error('Error approving enrollment:', err);
      setError(err.message || 'Failed to approve enrollment');
      return false;
    }
  }, []);

  // Reject enrollment
  const rejectEnrollment = useCallback(async (enrollmentId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ 
          status: 'rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId);

      if (error) {
        throw error;
      }

      return true;
    } catch (err: any) {
      console.error('Error rejecting enrollment:', err);
      setError(err.message || 'Failed to reject enrollment');
      return false;
    }
  }, []);

  // Computed values
  const userEnrollments = enrollments.filter(enrollment => 
    user?.email && enrollment.user_email === user.email
  );

  const pendingCount = enrollments.filter(enrollment => 
    enrollment.status === 'pending'
  ).length;

  return {
    enrollments,
    userEnrollments,
    pendingCount,
    loading,
    error,
    approveEnrollment,
    rejectEnrollment,
    refreshEnrollments: fetchEnrollments
  };
};

export default useRealTimeEnrollments;