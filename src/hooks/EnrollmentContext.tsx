import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { enrollmentNotificationService } from '@/services/enrollmentNotificationService';
import { logger } from '@/utils/logger';
import { errorLoggingService } from '@/services/errorLoggingService';
import { crossTabSyncService } from '@/services/CrossTabSyncService';

export type EnrollmentStatus = 'enrolled' | 'pending' | 'unenrolled';

interface Enrollment {
  course_id: string;
  status: 'approved' | 'pending' | 'rejected';
}

const toEnrollmentEventStatus = (status: string) => {
  const s = String(status || '').toLowerCase();
  if (s === 'approved') return 'APPROVED';
  if (s === 'rejected') return 'REJECTED';
  if (s === 'pending') return 'PENDING_APPROVAL';
  return null;
};

interface EnrollmentContextType {
  enrollments: Record<string, EnrollmentStatus>;
  isLoading: boolean;
}

const EnrollmentContext = createContext<EnrollmentContextType>({
  enrollments: {},
  isLoading: true,
});

export const useEnrollments = () => useContext(EnrollmentContext);

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Record<string, EnrollmentStatus>>({});
  const [isLoading, setIsLoading] = useState(true);

  const buildStatusMap = (rows: Array<{ course_id?: string; courseId?: string; status?: string; user_id?: string; userId?: string }>) => {
    const statusMap: Record<string, EnrollmentStatus> = {};
    rows.forEach((row) => {
      const cid = row.course_id || (row as any).courseId;
      if (!cid) return;
      if (row.status === 'approved') statusMap[cid] = 'enrolled';
      else if (row.status === 'pending') statusMap[cid] = 'pending';
    });
    return statusMap;
  };

  const syncFromLocalStorage = () => {
    try {
      const local = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const mine = Array.isArray(local)
        ? local.filter((e: any) => e.user_id === user?.id || e.userId === user?.id)
        : [];
      const map = buildStatusMap(mine);
      
      if (Object.keys(map).length > 0) {
        setEnrollments((prev) => ({ ...prev, ...map }));
      }
    } catch (error) {
      console.error('EnrollmentContext: Error syncing from localStorage:', error);
    }
  };

  useEffect(() => {
    const fetchInitialEnrollments = async () => {
      if (!user) {
        setEnrollments({});
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const [lowerResp, upperResp] = await Promise.all([
          supabase.from('enrollments').select('course_id, status').eq('user_id', user.id),
          supabase.from('Enrollment').select('course_id, status').eq('user_id', user.id)
        ]);

        if (lowerResp.error && upperResp.error) {
          console.error('Failed to fetch enrollments:', lowerResp.error, upperResp.error);
          errorLoggingService.logNetworkError('fetch_enrollments', new Error('Failed to fetch from both tables'), {
            userId: user.id,
            lowerError: lowerResp.error.message,
            upperError: upperResp.error.message
          });
          syncFromLocalStorage();
          setIsLoading(false);
          return;
        }

        const allData = [...(lowerResp.data || []), ...(upperResp.data || [])];
        const map = buildStatusMap(allData as any[]);
        setEnrollments(map);
        
        // Broadcast enrollment state to other tabs
        if (user) {
          crossTabSyncService.broadcastEnrollmentChange(
            'enrollment_updated',
            'all',
            user.id,
            map,
            'synced'
          );
        }
      } finally {
        // Merge localStorage pending right away
        syncFromLocalStorage();
        setIsLoading(false);
      }
    };

    fetchInitialEnrollments();

    // Real-time subscriptions for both tables
    const channelLower = supabase
      .channel(`rt-enrollments-lower:${user?.id || 'guest'}`)
      .on<Enrollment>(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'enrollments', filter: `user_id=eq.${user?.id}` },
        (payload) => {
          const { new: newEnrollment, old: oldEnrollment, eventType } = payload as any;
          setEnrollments((prev) => {
            const updated = { ...prev };
            if (eventType === 'DELETE') {
              const cid = (oldEnrollment as Enrollment)?.course_id;
              if (cid) delete updated[cid];
            } else {
              const cid = newEnrollment.course_id;
              const oldStatus = prev[cid];
              
              if (newEnrollment.status === 'approved') {
                updated[cid] = 'enrolled';
                // Send notification when enrollment is approved
                if (oldStatus !== 'enrolled') {
                  enrollmentNotificationService.notifyEnrollmentApproved(
                    user?.id || '',
                    newEnrollment.course_title || 'Course',
                    cid,
                    newEnrollment.id || ''
                  ).catch(err => logger.error('Failed to send enrollment approved notification:', err));
                }
              } else if (newEnrollment.status === 'pending') {
                updated[cid] = 'pending';
              } else {
                delete updated[cid];
                // Send notification when enrollment is rejected
                if (oldStatus && oldStatus !== 'unenrolled') {
                  enrollmentNotificationService.notifyEnrollmentRejected(
                    user?.id || '',
                    newEnrollment.course_title || 'Course',
                    cid,
                    newEnrollment.id || ''
                  ).catch(err => logger.error('Failed to send enrollment rejected notification:', err));
                }
              }

              // Dispatch event for CourseCard real-time UI update
              try {
                const mapped = toEnrollmentEventStatus(newEnrollment.status);
                if (mapped && user?.id && cid) {
                  window.dispatchEvent(
                    new CustomEvent('enrollment-status-updated', {
                      detail: {
                        enrollmentId: newEnrollment.id,
                        userId: user.id,
                        courseId: cid,
                        status: mapped,
                      },
                    })
                  );
                }

                if (newEnrollment.status === 'approved' && user?.email) {
                  window.dispatchEvent(
                    new CustomEvent('admin-approval', {
                      detail: {
                        userEmail: user.email,
                        courseId: cid,
                        enrollmentId: newEnrollment.id,
                      },
                    })
                  );
                }
              } catch {}
            }
            return updated;
          });
        }
      )
      .subscribe();

    const channelUpper = supabase
      .channel(`rt-enrollments-upper:${user?.id || 'guest'}`)
      .on<Enrollment>(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Enrollment', filter: `user_id=eq.${user?.id}` },
        (payload) => {
          const { new: newEnrollment, old: oldEnrollment, eventType } = payload as any;
          setEnrollments((prev) => {
            const updated = { ...prev };
            if (eventType === 'DELETE') {
              const cid = (oldEnrollment as Enrollment)?.course_id;
              if (cid) delete updated[cid];
            } else {
              const cid = newEnrollment.course_id;
              if (newEnrollment.status === 'approved') updated[cid] = 'enrolled';
              else if (newEnrollment.status === 'pending') updated[cid] = 'pending';
              else delete updated[cid];
            }
            return updated;
          });
        }
      )
      .subscribe();

    // Listen for custom app events to refresh from localStorage immediately after EFT
    const handleForceRefresh = () => syncFromLocalStorage();
    window.addEventListener('force-course-card-refresh', handleForceRefresh);
    window.addEventListener('enrollment-success', handleForceRefresh as EventListener);

    // Also listen for localStorage changes (cross-tab or future events)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'enrollments') syncFromLocalStorage();
    };
    window.addEventListener('storage', handleStorage);

    // Listen for cross-tab sync events
    const handleCrossTabSync = (event: CustomEvent) => {
      logger.info('EnrollmentContext: Cross-tab sync event received:', event.detail);
      if (event.detail.userId === user?.id) {
        // Update enrollments from cross-tab sync
        const { enrollment, status, courseId } = event.detail;
        if (enrollment && courseId) {
          setEnrollments(prev => ({
            ...prev,
            [courseId]: status === 'approved' ? 'enrolled' : 
                       status === 'pending' ? 'pending' : 'unenrolled'
          }));
        }
      }
    };

    window.addEventListener('enrollment-sync-update', handleCrossTabSync as EventListener);

    // Listen for cross-tab sync service events
    const unsubscribeSync = crossTabSyncService.addListener('enrollment_updated', (message) => {
      if (message.data.userId === user?.id) {
        logger.info('EnrollmentContext: Cross-tab enrollment update received');
        // Trigger a refresh to get latest data
        setTimeout(syncFromLocalStorage, 100);
      }
    });

    return () => {
      supabase.removeChannel(channelLower);
      supabase.removeChannel(channelUpper);
      window.removeEventListener('force-course-card-refresh', handleForceRefresh);
      window.removeEventListener('enrollment-success', handleForceRefresh as EventListener);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('enrollment-sync-update', handleCrossTabSync as EventListener);
      unsubscribeSync();
    };
  }, [user]);

  return (
    <EnrollmentContext.Provider value={{ enrollments, isLoading }}>
      {children}
    </EnrollmentContext.Provider>
  );
};
