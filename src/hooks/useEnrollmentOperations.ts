
import { useState } from 'react';
import { getCourseTitle } from '@/utils/courseMapping';
import { useDataManager } from './useDataManager';
import { useAuth } from './AuthContext';
import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { logger } from '@/utils/logger';

interface Enrollment {
  course_id: string;
  user_id: string;
  user_email?: string;
  course_title?: string;
  enrollment_date?: string;
  enrolled_at?: string;
  progress: number;
  status?: string;
}

interface UseEnrollmentOperationsResult {
  enrollments: Enrollment[];
  enrollInCourse: (courseId: string) => Promise<boolean>;
  updateProgress: (courseId: string, progress: number) => Promise<boolean>;
  isLoading: boolean;
}

export const useEnrollmentOperations = (): UseEnrollmentOperationsResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  
  // 🚨 MIGRATED: Use unified enrollment system exclusively
  const { 
    enrollments, 
    createEnrollment, 
    updateEnrollmentProgress 
  } = useDataManager();

  const enrollInCourse = async (courseId: string): Promise<boolean> => {
    if (!user) {
      logger.warn('❌ Cannot enroll: No user authenticated');
      return false;
    }

    logger.info('🚀 Starting enrollment for course:', courseId);
    setIsLoading(true);
    
    try {
      // Check if already enrolled using UnifiedEnrollmentManager
      const existingEnrollment = await unifiedEnrollmentManager.getUserEnrollments(user.email!);
      const alreadyEnrolled = existingEnrollment.some(e => e.course_id === courseId);
      
      if (alreadyEnrolled) {
        logger.info('✅ User already enrolled in course:', courseId);
      setIsLoading(false);
      return true;
    }
    
      // Create enrollment using UnifiedEnrollmentManager
      const enrollmentData = {
        user_id: user.id,
        user_email: user.email!,
            course_id: courseId,
        course_title: getCourseTitle(courseId),
        status: 'pending' as const,
        progress: 0
      };

      logger.info('📝 Creating enrollment via UnifiedEnrollmentManager:', enrollmentData);
      const newEnrollment = await createEnrollment(enrollmentData);

      if (newEnrollment) {
        logger.info('✅ Enrollment successful via UnifiedEnrollmentManager:', newEnrollment);

            // Dispatch instructor dashboard refresh event
            window.dispatchEvent(new CustomEvent('refresh-instructor-dashboard', {
              detail: { 
                newEnrollment: {
              id: newEnrollment.id || `enrollment_${Date.now()}`,
              user_id: user.id,
              user_email: user.email,
              course_id: courseId,
              course_title: getCourseTitle(courseId),
                  status: 'pending',
              enrolled_at: new Date().toISOString(),
              progress: 0
                },
            type: 'enrollment_operations_unified',
                timestamp: new Date().toISOString()
              }
            }));

        // Dispatch enrollment success event
        window.dispatchEvent(new CustomEvent('enrollment-success', {
          detail: { courseId, enrollment: newEnrollment }
        }));
            
            setIsLoading(false);
        return true;
          } else {
        logger.error('❌ Failed to create enrollment via UnifiedEnrollmentManager');
            setIsLoading(false);
        return false;
          }
        } catch (error) {
      logger.error('❌ Error enrolling in course:', error);
          setIsLoading(false);
      return false;
        }
  };

  const updateProgress = async (courseId: string, progress: number): Promise<boolean> => {
    if (!user) {
      logger.warn('❌ Cannot update progress: No user authenticated');
      return false;
    }

      console.log(`🔄 Updating progress for course: ${courseId} to ${progress}%`);
    setIsLoading(true);
      
      try {
        // Use UnifiedEnrollmentManager to update progress
        await updateEnrollmentProgress(user.id, courseId, Math.min(100, Math.max(0, progress)));
        
        logger.info('✅ Progress updated successfully via UnifiedEnrollmentManager');
        
        // Dispatch progress updated event
        window.dispatchEvent(new CustomEvent('progress-updated', {
          detail: { courseId, progress: Math.min(100, Math.max(0, progress)) }
        }));
        
            setIsLoading(false);
        return true;
        } catch (error) {
      logger.error('❌ Error updating progress:', error);
          setIsLoading(false);
      return false;
        }
  };

  return { enrollments, enrollInCourse, updateProgress, isLoading };
};
