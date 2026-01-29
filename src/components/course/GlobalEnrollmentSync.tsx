import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/AuthContext';

/**
 * 🚨 SENIOR DEVELOPER SOLUTION: Global Real-Time Enrollment Sync
 * This component ensures ALL course cards update immediately when enrollments are approved
 * It listens for events from the admin panel and forces UI updates across the entire application
 */
export const GlobalEnrollmentSync = () => {
  const { user } = useAuth();
  const [syncStatus, setSyncStatus] = useState<string>('idle');

  useEffect(() => {
    if (!user) return;

    console.log('🚀 GlobalEnrollmentSync: Setting up global event listeners for user:', user.email);

    // 🚨 CRITICAL: Listen for ALL enrollment approval events
    const handleAdminApproval = (event: CustomEvent) => {
      console.log('🔄 GlobalEnrollmentSync: Received admin approval event:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        console.log('✅ Admin approval for current user, triggering global sync...');
        setSyncStatus('syncing');
        
        // Force update localStorage
        const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const updatedEnrollments = existingEnrollments.map((enrollment: any) => {
          if (enrollment.id === event.detail.enrollmentId) {
            return {
              ...enrollment,
              status: 'approved',
              approved_at: new Date().toISOString()
            };
          }
          return enrollment;
        });
        
        localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
        console.log('💾 GlobalEnrollmentSync: Updated localStorage');
        
        // Force refresh ALL course cards
        window.dispatchEvent(new CustomEvent('force-all-course-cards-refresh', {
          detail: {
            courseId: event.detail.courseId,
            newStatus: 'approved',
            userEmail: event.detail.userEmail,
            timestamp: new Date().toISOString(),
            source: 'global-sync'
          }
        }));
        
        // Also dispatch individual course card refresh
        window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: event.detail.courseId,
            newStatus: 'approved',
            userEmail: event.detail.userEmail,
            timestamp: new Date().toISOString(),
            source: 'global-sync'
          }
        }));
        
        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 2000);
      }
    };

    // Listen for enrollment status changes
    const handleEnrollmentStatusChange = (event: CustomEvent) => {
      console.log('🔄 GlobalEnrollmentSync: Received enrollment status change:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        console.log('✅ Status change for current user, triggering global sync...');
        setSyncStatus('syncing');
        
        // Update localStorage
        const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const updatedEnrollments = existingEnrollments.map((enrollment: any) => {
          if (enrollment.id === event.detail.enrollmentId) {
            return {
              ...enrollment,
              status: event.detail.newStatus,
              approved_at: event.detail.newStatus === 'approved' ? new Date().toISOString() : null
            };
          }
          return enrollment;
        });
        
        localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
        console.log('💾 GlobalEnrollmentSync: Updated localStorage with status change');
        
        // Force refresh
        window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: event.detail.courseId,
            newStatus: event.detail.newStatus,
            userEmail: event.detail.userEmail,
            timestamp: new Date().toISOString(),
            source: 'global-sync-status-change'
          }
        }));
        
        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 2000);
      }
    };

    // Listen for course access granted
    const handleCourseAccessGranted = (event: CustomEvent) => {
      console.log('🔄 GlobalEnrollmentSync: Received course access granted:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        console.log('✅ Course access granted for current user, triggering global sync...');
        setSyncStatus('syncing');
        
        // Update localStorage
        const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const updatedEnrollments = existingEnrollments.map((enrollment: any) => {
          if (enrollment.course_id === event.detail.courseId) {
            return {
              ...enrollment,
              status: 'approved',
              approved_at: new Date().toISOString(),
              accessLevel: event.detail.accessLevel
            };
          }
          return enrollment;
        });
        
        localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
        console.log('💾 GlobalEnrollmentSync: Updated localStorage with course access');
        
        // Force refresh
        window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: event.detail.courseId,
            newStatus: 'approved',
            userEmail: event.detail.userEmail,
            timestamp: new Date().toISOString(),
            source: 'global-sync-access-granted'
          }
        }));
        
        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 2000);
      }
    };

    // Listen for real-time sync events
    const handleRealtimeSync = (event: CustomEvent) => {
      console.log('🔄 GlobalEnrollmentSync: Received real-time sync:', event.detail);
      
      if (event.detail.userEmail === user.email && event.detail.type === 'approval') {
        console.log('✅ Real-time approval sync for current user, triggering global sync...');
        setSyncStatus('syncing');
        
        // Update localStorage
        const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const updatedEnrollments = existingEnrollments.map((enrollment: any) => {
          if (enrollment.id === event.detail.enrollmentId) {
            return {
              ...enrollment,
              status: 'approved',
              approved_at: new Date().toISOString()
            };
          }
          return enrollment;
        });
        
        localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
        console.log('💾 GlobalEnrollmentSync: Updated localStorage with real-time sync');
        
        // Force refresh
        window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: event.detail.courseId,
            newStatus: 'approved',
            userEmail: event.detail.userEmail,
            timestamp: new Date().toISOString(),
            source: 'global-sync-realtime'
          }
        }));
        
        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 2000);
      }
    };

    // 🚨 NEW: Listen for force-all-course-cards-refresh events
    const handleForceAllRefresh = (event: CustomEvent) => {
      console.log('🔄 GlobalEnrollmentSync: Received force all refresh:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        console.log('✅ Force all refresh for current user, triggering global sync...');
        setSyncStatus('syncing');
        
        // Force refresh ALL course cards
        window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: event.detail.courseId,
            newStatus: event.detail.newStatus,
            userEmail: event.detail.userEmail,
            timestamp: new Date().toISOString(),
            source: 'global-sync-force-all'
          }
        }));
        
        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 2000);
      }
    };

    // Add all event listeners
    window.addEventListener('admin-approval', handleAdminApproval as EventListener);
    window.addEventListener('enrollment-status-changed', handleEnrollmentStatusChange as EventListener);
    window.addEventListener('course-access-granted', handleCourseAccessGranted as EventListener);
    window.addEventListener('realtime-enrollment-sync', handleRealtimeSync as EventListener);
    window.addEventListener('force-all-course-cards-refresh', handleForceAllRefresh as EventListener);

    console.log('✅ GlobalEnrollmentSync: All event listeners set up successfully');

    // Cleanup function
    return () => {
      window.removeEventListener('admin-approval', handleAdminApproval as EventListener);
      window.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChange as EventListener);
      window.removeEventListener('course-access-granted', handleCourseAccessGranted as EventListener);
      window.removeEventListener('realtime-enrollment-sync', handleRealtimeSync as EventListener);
      window.removeEventListener('force-all-course-cards-refresh', handleForceAllRefresh as EventListener);
      console.log('🧹 GlobalEnrollmentSync: All event listeners cleaned up');
    };
  }, [user]);

  // This component doesn't render anything visible, it just syncs in the background
  return null;
};

export default GlobalEnrollmentSync;
