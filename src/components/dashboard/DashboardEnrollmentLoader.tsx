import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { filterRealEnrollments, clearFakeEnrollmentData } from '@/utils/clearFakeData';
import EnrolledCoursesList from './EnrolledCoursesList';
import RecentActivities from './RecentActivities';

interface DashboardEnrollmentLoaderProps {
  courses: any[];
}

const DashboardEnrollmentLoader = ({ courses }: DashboardEnrollmentLoaderProps) => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRealEnrollmentData = () => {
      if (!user) {
        setEnrollments([]);
        setLoading(false);
        return;
      }

      console.log('🔍 Loading real enrollment data for user:', user.id);
      
      const allEnrollments: any[] = [];
      
      // Source 1: User-specific cache (most reliable)
      try {
        const userCache = localStorage.getItem(`user-enrollments-${user.id}`);
        if (userCache) {
          const parsed = JSON.parse(userCache);
          console.log('👤 Found user-specific enrollments:', parsed);
          allEnrollments.push(...parsed);
        }
      } catch (error) {
        console.warn('Error loading user-specific enrollments:', error);
      }
      
      // Source 2: General localStorage enrollments (filter for this user only)
      try {
        const localEnrollments = localStorage.getItem('enrollments');
        if (localEnrollments) {
          const parsed = JSON.parse(localEnrollments);
          console.log('📦 Found localStorage enrollments:', parsed);
          // Only include enrollments for this user
          const userEnrollments = parsed.filter((enrollment: any) => 
            enrollment && enrollment.user_id === user.id
          );
          allEnrollments.push(...userEnrollments);
        }
      } catch (error) {
        console.warn('Error loading localStorage enrollments:', error);
      }
      
      // Filter out fake/sample data but preserve real enrollments
      const realEnrollments = filterRealEnrollments(allEnrollments);
      
      // Remove duplicates based on course_id
      const uniqueEnrollments = realEnrollments.filter((enrollment, index, self) => {
        const courseId = enrollment.course_id || enrollment.courseId;
        return index === self.findIndex(e => (e.course_id || e.courseId) === courseId);
      });
      
      console.log('📊 Final real enrollments for student dashboard:', uniqueEnrollments);
      setEnrollments(uniqueEnrollments);
      setLoading(false);
    };

    loadRealEnrollmentData();
    
    // Listen for new enrollment events
    const handleEnrollmentSubmitted = (event: CustomEvent) => {
      console.log('🔄 New enrollment submitted, refreshing data...');
      setTimeout(loadRealEnrollmentData, 100); // Small delay to ensure data is saved
    };

    window.addEventListener('enrollment-submitted', handleEnrollmentSubmitted);
    
    return () => {
      window.removeEventListener('enrollment-submitted', handleEnrollmentSubmitted);
    };
  }, [user, courses]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-lg mb-4">Enrolled Courses</h3>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading your courses...</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Recent Activities</h3>
          <div className="text-center py-6">
            <div className="animate-pulse bg-gray-200 h-4 rounded mb-2"></div>
            <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-lg mb-4">Enrolled Courses</h3>
        <EnrolledCoursesList 
          enrollments={enrollments}
          courses={courses}
        />
      </div>
      
      <div>
        <h3 className="font-bold text-lg mb-4">Recent Activities</h3>
        <RecentActivities 
          enrollments={enrollments}
          courses={courses}
        />
      </div>
    </div>
  );
};

export default DashboardEnrollmentLoader;
