import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { unifiedEnrollmentManager, EnrollmentData } from '@/services/UnifiedEnrollmentManager';
import { useDataManager } from './useDataManager';
import { logger } from '@/utils/logger';

// Maintain backward compatibility with existing interface
interface Enrollment extends EnrollmentData {
  // Support alternative field names for compatibility
  userId?: string;
  courseId?: string;
}

export const useEnrollmentData = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // 🚨 MIGRATED: Use unified enrollment system exclusively
  const { loading: dataManagerLoading } = useDataManager();

  // 🚨 MIGRATED: Load enrollments using UnifiedEnrollmentManager exclusively
  useEffect(() => {
    const loadEnrollments = async () => {
      if (!user) {
        setEnrollments([]);
        setLoading(false);
        return;
      }

      try {
        logger.info('🚀 Loading enrollments via UnifiedEnrollmentManager for user:', user.email);
        setLoading(true);
        
        // Use UnifiedEnrollmentManager to get all enrollments
        const userEnrollments = await unifiedEnrollmentManager.getUserEnrollments(user.email || '');
        
        // Convert to legacy format for backward compatibility
        const legacyEnrollments = userEnrollments.map((enrollment: any) => ({
          ...enrollment,
          userId: enrollment.user_id,
          courseId: enrollment.course_id,
        }));
        
        logger.info('✅ Loaded enrollments via UnifiedEnrollmentManager:', legacyEnrollments.length);
        setEnrollments(legacyEnrollments);
      } catch (error) {
        logger.error('❌ Error loading enrollments via UnifiedEnrollmentManager:', error);
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, [user]);

  // 🚨 MIGRATED: Listen to UnifiedEnrollmentManager events for real-time updates
  useEffect(() => {
    if (!user) return;

    const handleEnrollmentCreated = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment.user_email === user.email) {
        logger.info('🔄 Received enrollment created event, refreshing data...');
        // Refresh enrollments
      setTimeout(() => {
          loadEnrollments();
      }, 100);
      }
    };

    const handleEnrollmentUpdated = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment.user_email === user.email) {
        logger.info('🔄 Received enrollment updated event, refreshing data...');
        // Refresh enrollments
        setTimeout(() => {
          loadEnrollments();
        }, 100);
      }
    };

    const handleEnrollmentDeleted = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment.user_email === user.email) {
        logger.info('🔄 Received enrollment deleted event, refreshing data...');
        // Refresh enrollments
      setTimeout(() => {
          loadEnrollments();
      }, 100);
      }
    };

    const handleEnrollmentStatusChanged = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment.user_email === user.email) {
        logger.info('🔄 Received enrollment status changed event, refreshing data...');
        // Refresh enrollments
      setTimeout(() => {
          loadEnrollments();
      }, 100);
      }
    };

    // Add event listeners for UnifiedEnrollmentManager events
    unifiedEnrollmentManager.addEventListener('enrollment-created', handleEnrollmentCreated);
    unifiedEnrollmentManager.addEventListener('enrollment-updated', handleEnrollmentUpdated);
    unifiedEnrollmentManager.addEventListener('enrollment-deleted', handleEnrollmentDeleted);
    unifiedEnrollmentManager.addEventListener('enrollment-status-changed', handleEnrollmentStatusChanged);

    logger.info('✅ useEnrollmentData: UnifiedEnrollmentManager event listeners set up for user:', user.email);
    
    return () => {
      unifiedEnrollmentManager.removeEventListener('enrollment-created', handleEnrollmentCreated);
      unifiedEnrollmentManager.removeEventListener('enrollment-updated', handleEnrollmentUpdated);
      unifiedEnrollmentManager.removeEventListener('enrollment-deleted', handleEnrollmentDeleted);
      unifiedEnrollmentManager.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChanged);
      logger.info('🧹 useEnrollmentData: Event listeners cleaned up');
    };
  }, [user]);

  // Helper function to reload enrollments
  const loadEnrollments = useCallback(async () => {
    if (!user) {
      setEnrollments([]);
      setLoading(false);
      return;
    }

    try {
      logger.info('🔄 Refreshing enrollments via UnifiedEnrollmentManager for user:', user.email);
      setLoading(true);
      
      // Use UnifiedEnrollmentManager to get all enrollments
      const userEnrollments = await unifiedEnrollmentManager.getUserEnrollments(user.email || '');
      
      // Convert to legacy format for backward compatibility
      const legacyEnrollments = userEnrollments.map((enrollment: any) => ({
        ...enrollment,
        userId: enrollment.user_id,
        courseId: enrollment.course_id,
      }));
      
      logger.info('✅ Refreshed enrollments via UnifiedEnrollmentManager:', legacyEnrollments.length);
      setEnrollments(legacyEnrollments);
    } catch (error) {
      logger.error('❌ Error refreshing enrollments via UnifiedEnrollmentManager:', error);
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Check if user is enrolled in a specific course
  const isEnrolled = useCallback((courseId: string): boolean => {
    if (!user || !courseId) return false;
    
    const enrollment = enrollments.find(e => 
      (e.course_id === courseId || e.courseId === courseId) && 
      e.user_email === user.email && 
      e.status === 'approved'
    );
    
    logger.info(`🔍 isEnrolled check for ${courseId}: ${!!enrollment}`);
    return !!enrollment;
  }, [enrollments, user]);

  // Check if user has any enrollment for a specific course (any status)
  const hasAnyEnrollment = useCallback((courseId: string): boolean => {
    if (!user || !courseId) return false;
    
    const enrollment = enrollments.find(e => 
      (e.course_id === courseId || e.courseId === courseId) && 
      e.user_email === user.email
    );
    
    logger.info(`🔍 hasAnyEnrollment check for ${courseId}: ${!!enrollment}`);
    return !!enrollment;
  }, [enrollments, user]);

  // Check if user has a pending enrollment for a specific course
  const hasPendingEnrollment = useCallback((courseId: string): boolean => {
    if (!user || !courseId) return false;
    
    const enrollment = enrollments.find(e => 
      (e.course_id === courseId || e.courseId === courseId) && 
      e.user_email === user.email && 
      e.status === 'pending'
    );
    
    logger.info(`🔍 hasPendingEnrollment check for ${courseId}: ${!!enrollment}`);
    return !!enrollment;
  }, [enrollments, user]);

  // Get enrollment details for a specific course
  const getEnrollment = useCallback((courseId: string) => {
    if (!courseId) return null;
    
    const enrollment = enrollments.find(e => 
      (e.course_id === courseId || e.courseId === courseId) && 
      e.user_email === user?.email
    );
    
    return enrollment || null;
  }, [enrollments, user]);

  return {
    enrollments,
    loading: loading || dataManagerLoading,
    isEnrolled,
    hasAnyEnrollment,
    hasPendingEnrollment,
    getEnrollment,
    refetch: loadEnrollments,
  };
};