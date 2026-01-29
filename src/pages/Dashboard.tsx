import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthContext';
import { useUserRouter } from '@/hooks/useUserRouter';
import { useFastDashboard } from '@/hooks/useFastDashboard';
import { useFastCourses } from '@/hooks/useFastCourses';
import { useToast } from '@/hooks/use-toast';
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import AdminInstructorDashboard from '@/components/dashboard/AdminInstructorDashboard';
import TutorDashboard from '@/components/dashboard/TutorDashboard';
import FastAdminDashboard from '@/components/admin/FastAdminDashboard';
import CriticalSectionErrorBoundary from '@/components/CriticalSectionErrorBoundary';
import { useState } from 'react';

const Dashboard = () => {
  const { user, loading: authLoading, profile } = useAuth();
  const { userEnrollments, loading: enrollmentsLoading, isEnrolled, getEnrollment, refresh } = useFastDashboard();
  const { courses, loading: coursesLoading } = useFastCourses();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { validateRouteAccess, handleRoleDetectionFailure } = useUserRouter();

  // Listen for enrollment changes and refresh dashboard data
  useEffect(() => {
    const handleEnrollmentSuccess = () => {
      console.log('Dashboard: Enrollment success event received, refreshing data');
      refresh();
    };

    window.addEventListener('enrollment-success', handleEnrollmentSuccess);
    
    return () => {
      window.removeEventListener('enrollment-success', handleEnrollmentSuccess);
    };
  }, [refresh]);

  // Show loading while auth is loading
  if (authLoading) {
    return <DashboardSkeleton />;
  }

  // If no user, return null (ProtectedRoute should handle this)
  if (!user) {
    return null;
  }

  // Validate route access for current user
  useEffect(() => {
    if (profile && !validateRouteAccess('/dashboard', profile.role)) {
      console.warn('User does not have access to dashboard, handling role detection failure');
      handleRoleDetectionFailure();
    }
  }, [profile, validateRouteAccess, handleRoleDetectionFailure]);

  // Create a more meaningful default profile if none exists
  const defaultProfile = profile || {
    id: user.id,
    email: user.email,
    first_name: user.user_metadata?.first_name || user.email?.split('@')[0] || 'Student',
    last_name: user.user_metadata?.last_name || '',
    role: 'student',
    approved: true,
    approval_status: 'approved'
  };

  // Wait for enrollments/courses to load before showing content
  // Add timeout to prevent infinite loading
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (enrollmentsLoading || coursesLoading) {
        console.warn('Dashboard loading timeout - proceeding with available data');
        setLoadingTimeout(true);
      }
    }, 8000); // 8 second timeout

    return () => clearTimeout(timeout);
  }, [enrollmentsLoading, coursesLoading]);

  // Show loading skeleton unless timeout has occurred
  if ((enrollmentsLoading || coursesLoading) && !loadingTimeout) {
    return <DashboardSkeleton />;
  }

  // Role-based dashboard rendering
  if (defaultProfile.role === 'student') {
    return (
      <CriticalSectionErrorBoundary 
        section="dashboard"
        allowRetry={true}
        maxRetries={3}
        showFallback={true}
        requiresAuth={true}
        criticalData={['user-enrollments', 'user-courses']}
      >
        <StudentDashboard
          profile={defaultProfile}
          enrollments={userEnrollments || []}
          courses={courses || []}
          userId={user.id}
        />
      </CriticalSectionErrorBoundary>
    );
  }
  
  if (defaultProfile.role === 'instructor') {
    return (
      <CriticalSectionErrorBoundary 
        section="dashboard"
        allowRetry={true}
        maxRetries={3}
        showFallback={true}
        requiresAuth={true}
        criticalData={['instructor-courses', 'instructor-students']}
      >
        <TutorDashboard
          profile={defaultProfile}
          enrollments={userEnrollments || []}
          courses={courses || []}
          userId={user.id}
        />
      </CriticalSectionErrorBoundary>
    );
  }
  
  if (defaultProfile.role === 'admin') {
    return <FastAdminDashboard />;
  }

  // Default to student dashboard for any other case
  return (
    <CriticalSectionErrorBoundary 
      section="dashboard"
      allowRetry={true}
      maxRetries={3}
      showFallback={true}
      requiresAuth={true}
      criticalData={['user-enrollments', 'user-courses']}
    >
      <StudentDashboard
        profile={defaultProfile}
        enrollments={userEnrollments || []}
        courses={courses || []}
        userId={user.id}
      />
    </CriticalSectionErrorBoundary>
  );
};

export default Dashboard;
