import React, { useState } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useCourses } from '@/hooks/useCourses';
import InstructorDashboard from '@/components/dashboard/InstructorDashboard';
import InstructorDashboardSimple from '@/components/dashboard/InstructorDashboardSimple';
import JohnDoeAdminDashboard from '@/components/dashboard/JohnDoeAdminDashboard';
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton';
import { GraduationCap } from 'lucide-react';

const InstructorDashboardPage = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { courses, loading: coursesLoading } = useCourses();
  
  // For instructor dashboard, we need ALL enrollments, not just current user's
  // So we'll load enrollments directly from localStorage instead of using useEnrollments hook
  const [allEnrollments, setAllEnrollments] = useState<any[]>([]);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  
  React.useEffect(() => {
    // Load ALL enrollments from localStorage for instructor dashboard
    const loadAllEnrollments = () => {
      setEnrollmentsLoading(true);
      let allEnrollmentsFromStorage: any[] = [];
      
      // Check main enrollments key
      const mainEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      allEnrollmentsFromStorage.push(...mainEnrollments);
      
      // Check user-specific enrollment keys
      const allKeys = Object.keys(localStorage);
      const userEnrollmentKeys = allKeys.filter(key => key.startsWith('user-enrollments-'));
      
      userEnrollmentKeys.forEach(key => {
        try {
          const userEnrollments = JSON.parse(localStorage.getItem(key) || '[]');
          allEnrollmentsFromStorage.push(...userEnrollments);
        } catch (error) {
          console.error(`Error parsing ${key}:`, error);
        }
      });
      
      // Remove duplicates based on id
      const uniqueEnrollments = allEnrollmentsFromStorage.filter((enrollment, index, self) => 
        index === self.findIndex(e => e.id === enrollment.id)
      );
      
      setAllEnrollments(uniqueEnrollments);
      setEnrollmentsLoading(false);
    };
    
    loadAllEnrollments();
    
    // Listen for enrollment changes
    const handleStorageChange = () => {
      loadAllEnrollments();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('refresh-instructor-dashboard', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('refresh-instructor-dashboard', handleStorageChange);
    };
  }, []);
  const [renderError, setRenderError] = useState<string | null>(null);

  // Error boundary for rendering errors
  React.useEffect(() => {
    window.onerror = (msg, url, line, col, error) => {
      setRenderError(error ? error.toString() : String(msg));
      return false;
    };
    return () => {
      window.onerror = null;
    };
  }, []);

  if (renderError) {
    return (
      <div style={{ color: 'red', padding: 32, fontWeight: 'bold', fontSize: 18 }}>
        Dashboard Error: {renderError}
      </div>
    );
  }

  // Show loading while auth is loading, but with a timeout
  const [authTimeout, setAuthTimeout] = useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAuthTimeout(true);
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show loading only if auth is loading and we haven't timed out
  if (authLoading && !authTimeout) {
    return <DashboardSkeleton />;
  }

  // If no user, return null (ProtectedRoute should handle this)
  if (!user) {
    return null;
  }

  // Create a default profile if none exists
  const defaultProfile = profile || {
    id: user.id,
    email: user.email,
    first_name: 'Instructor',
    last_name: 'User',
    role: 'instructor',
    approved: true,
    approval_status: 'approved'
  };

  // Don't wait for enrollments/courses to load - show dashboard immediately
  // The dashboard will handle empty data gracefully

  // Check if user wants to try full dashboard
  const useFullDashboard = localStorage.getItem('use-full-dashboard') === 'true';
  
  // Legacy debug logging removed - using unified enrollment system
  console.log('🔍 DEBUG: useFullDashboard:', useFullDashboard);
  
  // If user is john.doe@gmail.com, show the admin dashboard
  if (user.email === 'john.doe@gmail.com') {
    return <JohnDoeAdminDashboard />;
  }

  // Use full dashboard with fallback to simple version
  if (useFullDashboard) {
    try {
      return (
        <InstructorDashboard
          profile={defaultProfile}
          enrollments={allEnrollments || []}
          courses={courses || []}
          userId={user.id}
        />
      );
    } catch (error) {
      console.error('Error loading full dashboard, falling back to simple version:', error);
      localStorage.removeItem('use-full-dashboard');
      return <InstructorDashboardSimple />;
    }
  }
  
  // Show a loading state with option to force load
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <GraduationCap className="w-12 h-12 text-red-600 mr-4" />
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Instructor Dashboard Ready
        </h2>
        
        <p className="text-gray-600 mb-6">
          Choose your dashboard experience
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={() => {
              localStorage.setItem('use-full-dashboard', 'true');
              window.location.reload();
            }}
            className="block w-full max-w-xs mx-auto bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Load Full Dashboard
          </button>
          
          <button 
            onClick={() => {
              // Force load full dashboard immediately
              localStorage.setItem('use-full-dashboard', 'true');
              // Show debug info
              const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
              alert(`Enrollments in localStorage: ${enrollments.length}\nClick OK to load dashboard`);
              window.location.reload();
            }}
            className="block w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Load Full Dashboard (Debug)
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="block w-full max-w-xs mx-auto bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Load Simple Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardPage; 