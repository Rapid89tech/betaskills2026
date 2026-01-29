import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/AuthContext';

/**
 * 🚨 SENIOR DEVELOPER SOLUTION: Real-Time Enrollment Status Sync
 * This component listens for enrollment approval events and updates the UI in real-time
 * to show approved enrollments with "Continue" buttons instead of "Pending"
 */
export const RealTimeEnrollmentSync = () => {
  const { user } = useAuth();
  const [enrollmentUpdates, setEnrollmentUpdates] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    console.log('🚀 RealTimeEnrollmentSync: Setting up event listeners for user:', user.email);

    // 1. Listen for enrollment status changes (Pending -> Approved)
    const handleEnrollmentStatusChange = (event: CustomEvent) => {
      console.log('🔄 RealTimeEnrollmentSync: Received enrollment status change:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        console.log('✅ Status change is for current user, updating UI...');
        
        // Update localStorage enrollment status
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
        console.log('💾 Updated localStorage enrollment status');
        
        // Force UI refresh by dispatching a custom event
        window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: event.detail.courseId,
            newStatus: event.detail.newStatus,
            timestamp: new Date().toISOString()
          }
        }));
        
        setEnrollmentUpdates(prev => [...prev, event.detail]);
      }
    };

    // 2. Listen for course access granted events
    const handleCourseAccessGranted = (event: CustomEvent) => {
      console.log('🔄 RealTimeEnrollmentSync: Received course access granted:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        console.log('✅ Course access granted for current user, updating UI...');
        
        // Update localStorage with approved status
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
        console.log('💾 Updated localStorage with course access');
        
        // Force course card refresh
        window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: event.detail.courseId,
            newStatus: 'approved',
            accessLevel: event.detail.accessLevel,
            timestamp: new Date().toISOString()
          }
        }));
        
        setEnrollmentUpdates(prev => [...prev, event.detail]);
      }
    };

    // 3. Listen for real-time sync events
    const handleRealtimeSync = (event: CustomEvent) => {
      console.log('🔄 RealTimeEnrollmentSync: Received real-time sync:', event.detail);
      
      if (event.detail.userEmail === user.email && event.detail.type === 'approval') {
        console.log('✅ Real-time approval sync for current user, updating UI...');
        
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
        console.log('💾 Updated localStorage with real-time sync');
        
        // Force refresh
        window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: event.detail.courseId,
            newStatus: 'approved',
            timestamp: new Date().toISOString()
          }
        }));
        
        setEnrollmentUpdates(prev => [...prev, event.detail]);
      }
    };

    // 4. Listen for admin approval events
    const handleAdminApproval = (event: CustomEvent) => {
      console.log('🔄 RealTimeEnrollmentSync: Received admin approval:', event.detail);
      
      if (event.detail.userEmail === user.email) {
        console.log('✅ Admin approval for current user, updating UI...');
        
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
        console.log('💾 Updated localStorage with admin approval');
        
        // Force refresh
        window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: event.detail.courseId,
            newStatus: 'approved',
            timestamp: new Date().toISOString()
          }
        }));
        
        setEnrollmentUpdates(prev => [...prev, event.detail]);
      }
    };

    // Add event listeners
    window.addEventListener('enrollment-status-changed', handleEnrollmentStatusChange as EventListener);
    window.addEventListener('course-access-granted', handleCourseAccessGranted as EventListener);
    window.addEventListener('realtime-enrollment-sync', handleRealtimeSync as EventListener);
    window.addEventListener('admin-approval', handleAdminApproval as EventListener);

    console.log('✅ RealTimeEnrollmentSync: Event listeners set up successfully');

    // Cleanup function
    return () => {
      window.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChange as EventListener);
      window.removeEventListener('course-access-granted', handleCourseAccessGranted as EventListener);
      window.removeEventListener('realtime-enrollment-sync', handleRealtimeSync as EventListener);
      window.removeEventListener('admin-approval', handleAdminApproval as EventListener);
      console.log('🧹 RealTimeEnrollmentSync: Event listeners cleaned up');
    };
  }, [user]);

  // This component doesn't render anything, it just listens for events
  return null;
};

export default RealTimeEnrollmentSync;
