/**
 * useEnrollmentNotifications Hook
 * 
 * Handles enrollment-related notifications using unified enrollment system
 * Integrates with NotificationService and UnifiedEnrollmentManager for data access
 * Maintains backward compatibility while using modern data access patterns
 */

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationType } from '@/services/NotificationService';
import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { logger } from '@/utils/logger';

export const useEnrollmentNotifications = (userEmail?: string, userId?: string) => {
  const { toast } = useToast();
  
  // Use new notification system (only if userId is provided)
  const notificationsOptions = userId ? {
    userId,
    autoInitialize: true,
    showToasts: false // We'll handle toasts manually for backward compatibility
  } : {
    autoInitialize: false, // Don't auto-initialize if no userId
    showToasts: false
  };
  
  const { notifications } = useNotifications(notificationsOptions);

  // Handle new notification system notifications
  useEffect(() => {
    if (!userEmail && !userId) return;

    // Filter enrollment-related notifications
    const enrollmentNotifications = notifications.filter(notification => 
      !notification.read && 
      (notification.type === 'enrollment_approved' || 
       notification.type === 'enrollment_rejected' ||
       notification.type === 'payment_received')
    );

    // Show toast for new enrollment notifications
    enrollmentNotifications.forEach(notification => {
      if (notification.type === 'enrollment_approved') {
        toast({
          title: "🎉 Enrollment Approved!",
          description: `Your enrollment for "${notification.courseTitle}" has been approved. You can now access the course content.`,
          duration: 8000,
        });
      } else if (notification.type === 'enrollment_rejected') {
        toast({
          title: "❌ Enrollment Rejected",
          description: `Your enrollment for "${notification.courseTitle}" has been rejected. ${notification.metadata?.rejectionReason ? `Reason: ${notification.metadata.rejectionReason}` : 'Please contact support for more information.'}`,
          variant: "destructive",
          duration: 8000,
        });
      } else if (notification.type === 'payment_received') {
        toast({
          title: "🎉 Payment Successful!",
          description: `Your enrollment for "${notification.courseTitle}" has been processed. You now have access to the course content.`,
          duration: 8000,
        });
      }
    });
  }, [notifications, userEmail, userId, toast]);

  // 🚨 MIGRATED: Updated event listener using UnifiedEnrollmentManager
  useEffect(() => {
    if (!userEmail && !userId) return;

    const handleEnrollmentStatusUpdate = async (event: Event) => {
      const customEvent = event as CustomEvent;
      const { enrollmentId, status, userEmail: eventUserEmail, enrollment } = customEvent.detail;
      
      // Check if this event is for the current user
      const isForCurrentUser = eventUserEmail === userEmail || 
                              (enrollment && enrollment.user_email === userEmail) ||
                              (enrollment && enrollment.user_id === userId);
      
      if (!isForCurrentUser) return;

      try {
        logger.info('🔄 useEnrollmentNotifications: Processing enrollment status update:', { enrollmentId, status, userEmail });

        let enrollmentData = enrollment;

        // If enrollment data is not provided in the event, fetch it from UnifiedEnrollmentManager
        if (!enrollmentData && enrollmentId) {
          try {
            // Try to get enrollment from UnifiedEnrollmentManager
            const allEnrollments = await unifiedEnrollmentManager.getAllEnrollments();
            enrollmentData = allEnrollments.find((e: any) => e.id === enrollmentId);
            
            if (!enrollmentData) {
              logger.warn('⚠️ Enrollment not found in UnifiedEnrollmentManager:', enrollmentId);
              return;
            }
          } catch (error) {
            logger.error('❌ Failed to fetch enrollment from UnifiedEnrollmentManager:', error);
            return;
          }
        }

        // Show appropriate notification based on status
        if (enrollmentData) {
          if (status === 'approved') {
            toast({
              title: "🎉 Enrollment Approved!",
              description: `Your enrollment for "${enrollmentData.course_title || enrollmentData.title}" has been approved. You can now access the course content.`,
              duration: 8000,
            });
            logger.info('✅ Showed enrollment approval notification for:', enrollmentData.course_title);
          } else if (status === 'rejected') {
            toast({
              title: "❌ Enrollment Rejected",
              description: `Your enrollment for "${enrollmentData.course_title || enrollmentData.title}" has been rejected. Please contact the instructor for more information.`,
              variant: "destructive",
              duration: 8000,
            });
            logger.info('❌ Showed enrollment rejection notification for:', enrollmentData.course_title);
          }
        }
      } catch (error) {
        logger.error('❌ Error processing enrollment status update:', error);
      }
    };

    // Listen for UnifiedEnrollmentManager enrollment status changes
    const handleUnifiedEnrollmentStatusChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { enrollment, newStatus, userEmail: eventUserEmail } = customEvent.detail;
      
      // Check if this event is for the current user
      const isForCurrentUser = eventUserEmail === userEmail || 
                              (enrollment && enrollment.user_email === userEmail) ||
                              (enrollment && enrollment.user_id === userId);
      
      if (!isForCurrentUser) return;

      logger.info('🔄 useEnrollmentNotifications: Received UnifiedEnrollmentManager status change:', { enrollment, newStatus });

      // Show notification based on the new status
      if (enrollment) {
        if (newStatus === 'approved') {
          toast({
            title: "🎉 Enrollment Approved!",
            description: `Your enrollment for "${enrollment.course_title}" has been approved. You can now access the course content.`,
            duration: 8000,
          });
          logger.info('✅ Showed UnifiedEnrollmentManager approval notification for:', enrollment.course_title);
        } else if (newStatus === 'rejected') {
          toast({
            title: "❌ Enrollment Rejected",
            description: `Your enrollment for "${enrollment.course_title}" has been rejected. Please contact the instructor for more information.`,
            variant: "destructive",
            duration: 8000,
          });
          logger.info('❌ Showed UnifiedEnrollmentManager rejection notification for:', enrollment.course_title);
        }
      }
    };

    // Add event listeners for both legacy and UnifiedEnrollmentManager events
    window.addEventListener('enrollment-status-updated', handleEnrollmentStatusUpdate);
    unifiedEnrollmentManager.addEventListener('enrollment-status-changed', handleUnifiedEnrollmentStatusChange);

    logger.info('✅ useEnrollmentNotifications: Event listeners set up for user:', userEmail || userId);

    return () => {
      window.removeEventListener('enrollment-status-updated', handleEnrollmentStatusUpdate);
      unifiedEnrollmentManager.removeEventListener('enrollment-status-changed', handleUnifiedEnrollmentStatusChange);
      logger.info('🧹 useEnrollmentNotifications: Event listeners cleaned up');
    };
  }, [userEmail, userId, toast]);
};
