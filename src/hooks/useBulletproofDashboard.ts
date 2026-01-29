import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { bulletproofDataPersistence, UserDataState } from '@/utils/bulletproofDataPersistence';
import { useCourses } from './useCourses';
import { useEnrollments } from './useEnrollments';

export const useBulletproofDashboard = () => {
  const { user, profile } = useAuth();
  const { courses } = useCourses();
  const { enrollments: realEnrollments } = useEnrollments();
  
  const [dashboardData, setDashboardData] = useState<UserDataState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize bulletproof data persistence when user changes
  useEffect(() => {
    if (user?.id) {
      initializeUserData();
    } else {
      setDashboardData(null);
      setLoading(false);
    }
  }, [user?.id]);

  const initializeUserData = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      console.log('🛡️ Initializing bulletproof dashboard for user:', user.id);
      
      // Initialize the bulletproof data persistence system
      await bulletproofDataPersistence.initializeUser(user.id);
      
      // Get the current data state
      const data = bulletproofDataPersistence.getData();
      
      if (data) {
        // Update profile with current auth data if needed
        if (profile && (!data.profile.email || data.profile.email !== profile.email)) {
          await bulletproofDataPersistence.updateProfile({
            id: profile.id,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            role: profile.role,
            contact_number: profile.contact_number,
            approved: profile.approved,
            approval_status: profile.approval_status,
            updated_at: new Date().toISOString(),
          });
        }

        // Sync enrollments with real data
        if (realEnrollments && realEnrollments.length > 0) {
          await syncEnrollments(realEnrollments);
        }

        // Update session data
        await bulletproofDataPersistence.updateProfile({
          ...data.profile,
          updated_at: new Date().toISOString(),
        });

        // Get updated data
        const updatedData = bulletproofDataPersistence.getData();
        setDashboardData(updatedData);
        
        console.log('✅ Bulletproof dashboard initialized successfully');
      } else {
        throw new Error('Failed to initialize user data');
      }
      
    } catch (err) {
      console.error('❌ Error initializing bulletproof dashboard:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize dashboard');
    } finally {
      setLoading(false);
    }
  };

  const syncEnrollments = async (enrollments: any[]) => {
    if (!bulletproofDataPersistence.getData()) return;

    try {
      const currentData = bulletproofDataPersistence.getData();
      if (!currentData) return;

      // Only sync REAL enrollments from the database - filter out any mock/fake data
      const realEnrollments = enrollments.filter(enrollment => {
        return enrollment && 
               enrollment.id && 
               enrollment.course_id && 
               enrollment.status && 
               enrollment.status !== 'mock' && 
               enrollment.status !== 'fake';
      });

      // Convert enrollments to the format expected by the persistence system
      const formattedEnrollments = realEnrollments.map(enrollment => ({
        id: enrollment.id,
        course_id: enrollment.course_id || enrollment.courseId,
        course_title: enrollment.course_title || enrollment.courseTitle || 'Untitled Course',
        status: enrollment.status,
        progress: enrollment.progress || 0,
        enrolled_at: enrollment.enrolled_at || enrollment.enrolledAt || new Date().toISOString(),
        approved_at: enrollment.approved_at || enrollment.approvedAt,
        certificate_url: enrollment.certificate_url || enrollment.certificateUrl,
        last_accessed: new Date().toISOString(),
      }));

      // Update enrollments in the persistence system
      currentData.enrollments = formattedEnrollments;
      // Use the public API instead of private method
      await bulletproofDataPersistence.updateProfile(currentData.profile);
      
      console.log(`✅ ${formattedEnrollments.length} real enrollments synced with persistence system`);
      
    } catch (error) {
      console.error('❌ Error syncing enrollments:', error);
    }
  };

  // Get enriched course data with real progress - ONLY from real enrollments
  const getEnrichedCourses = useCallback(() => {
    if (!dashboardData || !courses) return [];

    // Only return courses that are actually enrolled in the database
    return dashboardData.enrollments.filter(enrollment => {
      // Ensure this is a real enrollment from the database
      return enrollment.id && enrollment.course_id && enrollment.status;
    }).map(enrollment => {
      const course = courses.find(c => c.id === enrollment.course_id);
      const progress = dashboardData.courseProgress[enrollment.course_id];
      
      return {
        id: enrollment.course_id,
        title: course?.title || enrollment.course_title,
        description: course?.description || '',
        category: course?.category || '',
        level: course?.level || 'Beginner',
        duration: course?.duration || 'Unknown',
        thumbnail: course?.thumbnail || '',
        progress: progress?.progress || enrollment.progress || 0,
        completed: (progress?.progress || enrollment.progress || 0) >= 100,
        status: enrollment.status,
        enrolled_at: enrollment.enrolled_at,
        last_accessed: enrollment.last_accessed,
        certificate_url: enrollment.certificate_url,
        completedLessons: progress?.completedLessons || [],
        timeSpent: progress?.timeSpent || 0,
        quizScores: progress?.quizScores || {},
      };
    });
  }, [dashboardData, courses]);

  // Get recent activities
  const getRecentActivities = useCallback(() => {
    if (!dashboardData) return [];

    return dashboardData.activityHistory
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)
      .map(activity => ({
        id: activity.id,
        type: activity.type,
        title: getActivityTitle(activity),
        description: getActivityDescription(activity),
        timestamp: activity.timestamp,
        icon: getActivityIcon(activity.type),
        color: getActivityColor(activity.type),
      }));
  }, [dashboardData]);

  const getActivityTitle = (activity: UserDataState['activityHistory'][0]) => {
    switch (activity.type) {
      case 'course_started':
        return 'Started Course';
      case 'lesson_completed':
        return 'Completed Lesson';
      case 'quiz_taken':
        return 'Took Quiz';
      case 'certificate_earned':
        return 'Earned Certificate';
      case 'enrollment_created':
        return 'Enrolled in Course';
      default:
        return 'Activity';
    }
  };

  const getActivityDescription = (activity: UserDataState['activityHistory'][0]) => {
    const course = courses?.find(c => c.id === activity.courseId);
    const courseTitle = course?.title || 'Unknown Course';
    
    switch (activity.type) {
      case 'course_started':
        return `Started learning ${courseTitle}`;
      case 'lesson_completed':
        return `Completed a lesson in ${courseTitle}`;
      case 'quiz_taken':
        return `Took a quiz in ${courseTitle}`;
      case 'certificate_earned':
        return `Earned certificate for ${courseTitle}`;
      case 'enrollment_created':
        return `Enrolled in ${courseTitle}`;
      default:
        return 'Activity completed';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_started':
        return '🎯';
      case 'lesson_completed':
        return '✅';
      case 'quiz_taken':
        return '📝';
      case 'certificate_earned':
        return '🏆';
      case 'enrollment_created':
        return '📚';
      default:
        return '📊';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'course_started':
        return 'text-blue-600';
      case 'lesson_completed':
        return 'text-green-600';
      case 'quiz_taken':
        return 'text-purple-600';
      case 'certificate_earned':
        return 'text-yellow-600';
      case 'enrollment_created':
        return 'text-indigo-600';
      default:
        return 'text-gray-600';
    }
  };

  // Get dashboard statistics
  const getDashboardStats = useCallback(() => {
    if (!dashboardData) return null;

    const enrichedCourses = getEnrichedCourses();
    const totalCourses = enrichedCourses.length;
    const completedCourses = enrichedCourses.filter(course => course.completed).length;
    const inProgressCourses = enrichedCourses.filter(course => !course.completed && course.progress > 0).length;
    const totalProgress = enrichedCourses.reduce((acc, course) => acc + course.progress, 0);
    const averageProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;
    const totalTimeSpent = enrichedCourses.reduce((acc, course) => acc + course.timeSpent, 0);
    const totalActivities = dashboardData.activityHistory.length;

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      averageProgress,
      totalTimeSpent,
      totalActivities,
      lastLogin: dashboardData.session.lastLogin,
      totalSessions: dashboardData.session.totalSessions,
    };
  }, [dashboardData, getEnrichedCourses]);

  // Update course progress
  const updateCourseProgress = useCallback(async (courseId: string, progress: number, completedLessons: string[] = []) => {
    if (!dashboardData) return;

    try {
      await bulletproofDataPersistence.updateCourseProgress(courseId, {
        progress,
        completedLessons,
        lastLesson: completedLessons[completedLessons.length - 1] || '',
        timeSpent: (dashboardData.courseProgress[courseId]?.timeSpent || 0) + 1,
        quizScores: dashboardData.courseProgress[courseId]?.quizScores || {},
        lastUpdated: new Date().toISOString(),
      });

      // Add activity
      await addActivity({
        type: 'lesson_completed',
        courseId,
        lessonId: completedLessons[completedLessons.length - 1],
        details: { progress, completedLessons },
      });

      // Refresh dashboard data
      const updatedData = bulletproofDataPersistence.getData();
      setDashboardData(updatedData);
      
      console.log(`✅ Course progress updated for ${courseId}`);
      
    } catch (error) {
      console.error('❌ Error updating course progress:', error);
    }
  }, [dashboardData]);

  // Add activity
  const addActivity = useCallback(async (activity: Omit<UserDataState['activityHistory'][0], 'id' | 'timestamp'>) => {
    try {
      // Create complete activity object with id and timestamp
      const completeActivity: UserDataState['activityHistory'][0] = {
        ...activity,
        id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
      };
      
      await bulletproofDataPersistence.addActivity(completeActivity);
      
      // Refresh dashboard data
      const updatedData = bulletproofDataPersistence.getData();
      setDashboardData(updatedData);
      
    } catch (error) {
      console.error('❌ Error adding activity:', error);
    }
  }, []);

  // Update preferences
  const updatePreferences = useCallback(async (preferences: Partial<UserDataState['preferences']>) => {
    try {
      await bulletproofDataPersistence.updatePreferences(preferences);
      
      // Refresh dashboard data
      const updatedData = bulletproofDataPersistence.getData();
      setDashboardData(updatedData);
      
    } catch (error) {
      console.error('❌ Error updating preferences:', error);
    }
  }, []);

  // Export user data
  const exportUserData = useCallback(async () => {
    try {
      return await bulletproofDataPersistence.exportUserData();
    } catch (error) {
      console.error('❌ Error exporting user data:', error);
      return '';
    }
  }, []);

  // Import user data
  const importUserData = useCallback(async (dataString: string) => {
    try {
      const success = await bulletproofDataPersistence.importUserData(dataString);
      if (success) {
        const updatedData = bulletproofDataPersistence.getData();
        setDashboardData(updatedData);
      }
      return success;
    } catch (error) {
      console.error('❌ Error importing user data:', error);
      return false;
    }
  }, []);

  return {
    // Data
    dashboardData,
    enrichedCourses: getEnrichedCourses(),
    recentActivities: getRecentActivities(),
    dashboardStats: getDashboardStats(),
    
    // State
    loading,
    error,
    isInitialized: bulletproofDataPersistence.isUserInitialized(),
    
    // Actions
    updateCourseProgress,
    addActivity,
    updatePreferences,
    exportUserData,
    importUserData,
    refreshData: initializeUserData,
  };
};
