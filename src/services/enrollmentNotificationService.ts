import { notificationService } from './simpleNotificationService';
import type { 
  NotificationPriority, 
  NotificationData
} from '@/types/notification';
import { logger } from '@/utils/logger';

export class EnrollmentNotificationService {
  private static instance: EnrollmentNotificationService;

  private constructor() {}

  public static getInstance(): EnrollmentNotificationService {
    if (!EnrollmentNotificationService.instance) {
      EnrollmentNotificationService.instance = new EnrollmentNotificationService();
    }
    return EnrollmentNotificationService.instance;
  }

  // Student notification: Enrollment approved
  public async notifyEnrollmentApproved(
    studentId: string,
    courseTitle: string,
    courseId: string,
    enrollmentId: string
  ): Promise<void> {
    try {
      const data: NotificationData = {
        courseId,
        courseTitle,
        enrollmentId,
        studentEmail: studentId
      };

      await notificationService.createNotification(
        studentId,
        'enrollment_approved',
        '🎉 Enrollment Approved!',
        `Your enrollment for "${courseTitle}" has been approved. You can now access the course content.`,
        data,
        'high',
        'enrollment'
      );

      logger.info('✅ Enrollment approved notification sent to student:', studentId);
    } catch (error) {
      logger.error('❌ Failed to send enrollment approved notification:', error);
    }
  }

  // Student notification: Enrollment rejected
  public async notifyEnrollmentRejected(
    studentId: string,
    courseTitle: string,
    courseId: string,
    enrollmentId: string,
    reason?: string
  ): Promise<void> {
    try {
      const data: NotificationData = {
        courseId,
        courseTitle,
        enrollmentId,
        studentEmail: studentId
      };

      const message = reason 
        ? `Your enrollment for "${courseTitle}" was not approved. Reason: ${reason}`
        : `Your enrollment for "${courseTitle}" was not approved. Please contact support for more information.`;

      await notificationService.createNotification(
        studentId,
        'enrollment_rejected',
        '❌ Enrollment Not Approved',
        message,
        data,
        'high',
        'enrollment'
      );

      logger.info('✅ Enrollment rejected notification sent to student:', studentId);
    } catch (error) {
      logger.error('❌ Failed to send enrollment rejected notification:', error);
    }
  }

  // Student notification: Enrollment pending
  public async notifyEnrollmentPending(
    studentId: string,
    courseTitle: string,
    courseId: string,
    enrollmentId: string
  ): Promise<void> {
    try {
      const data: NotificationData = {
        courseId,
        courseTitle,
        enrollmentId,
        studentEmail: studentId
      };

      await notificationService.createNotification(
        studentId,
        'enrollment_pending',
        '⏳ Enrollment Submitted',
        `Your enrollment for "${courseTitle}" has been submitted and is pending admin approval. You'll be notified once approved.`,
        data,
        'medium',
        'enrollment'
      );

      logger.info('✅ Enrollment pending notification sent to student:', studentId);
    } catch (error) {
      logger.error('❌ Failed to send enrollment pending notification:', error);
    }
  }

  // Admin notification: New EFT enrollment
  public async notifyAdminNewEFTEnrollment(
    adminIds: string[],
    studentEmail: string,
    courseTitle: string,
    courseId: string,
    enrollmentId: string,
    paymentReference?: string,
    amount?: number,
    currency?: string
  ): Promise<void> {
    try {
      const data: NotificationData = {
        courseId,
        courseTitle,
        enrollmentId,
        studentEmail,
        ...(paymentReference && { paymentReference }),
        ...(amount && { amount }),
        ...(currency && { currency })
      };

      const message = `New EFT enrollment from ${studentEmail} for "${courseTitle}"${paymentReference ? ` (Ref: ${paymentReference})` : ''}${amount ? ` - R${amount}` : ''}`;

      // Send to all admins
      const promises = adminIds.map(adminId =>
        notificationService.createNotification(
          adminId,
          'new_eft_enrollment',
          '💰 New EFT Enrollment',
          message,
          data,
          'high',
          'admin'
        )
      );

      await Promise.all(promises);

      logger.info('✅ New EFT enrollment notification sent to admins:', adminIds);
    } catch (error) {
      logger.error('❌ Failed to send new EFT enrollment notification to admins:', error);
    }
  }

  // Student notification: Payment received
  public async notifyPaymentReceived(
    studentId: string,
    courseTitle: string,
    courseId: string,
    amount: number,
    currency: string = 'ZAR',
    paymentReference?: string
  ): Promise<void> {
    try {
      const data: NotificationData = {
        courseId,
        courseTitle,
        amount,
        currency,
        ...(paymentReference && { paymentReference })
      };

      await notificationService.createNotification(
        studentId,
        'payment_received',
        '💳 Payment Received',
        `Your payment of ${currency} ${amount} for "${courseTitle}" has been received${paymentReference ? ` (Ref: ${paymentReference})` : ''}.`,
        data,
        'medium',
        'payment'
      );

      logger.info('✅ Payment received notification sent to student:', studentId);
    } catch (error) {
      logger.error('❌ Failed to send payment received notification:', error);
    }
  }

  // Student notification: Course access granted
  public async notifyCourseAccessGranted(
    studentId: string,
    courseTitle: string,
    courseId: string
  ): Promise<void> {
    try {
      const data: NotificationData = {
        courseId,
        courseTitle
      };

      await notificationService.createNotification(
        studentId,
        'course_access_granted',
        '🎓 Course Access Granted',
        `You now have access to "${courseTitle}". Start learning today!`,
        data,
        'high',
        'course'
      );

      logger.info('✅ Course access granted notification sent to student:', studentId);
    } catch (error) {
      logger.error('❌ Failed to send course access granted notification:', error);
    }
  }

  // Student notification: Course access revoked
  public async notifyCourseAccessRevoked(
    studentId: string,
    courseTitle: string,
    courseId: string,
    reason?: string
  ): Promise<void> {
    try {
      const data: NotificationData = {
        courseId,
        courseTitle
      };

      const message = reason 
        ? `Your access to "${courseTitle}" has been revoked. Reason: ${reason}`
        : `Your access to "${courseTitle}" has been revoked. Please contact support for more information.`;

      await notificationService.createNotification(
        studentId,
        'course_access_revoked',
        '🚫 Course Access Revoked',
        message,
        data,
        'high',
        'course'
      );

      logger.info('✅ Course access revoked notification sent to student:', studentId);
    } catch (error) {
      logger.error('❌ Failed to send course access revoked notification:', error);
    }
  }

  // Bulk notification for system announcements
  public async notifySystemAnnouncement(
    userIds: string[],
    title: string,
    message: string,
    priority: NotificationPriority = 'medium'
  ): Promise<void> {
    try {
      const promises = userIds.map(userId =>
        notificationService.createNotification(
          userId,
          'general_announcement',
          title,
          message,
          undefined,
          priority,
          'system'
        )
      );

      await Promise.all(promises);

      logger.info('✅ System announcement notification sent to users:', userIds.length);
    } catch (error) {
      logger.error('❌ Failed to send system announcement notification:', error);
    }
  }
}

export const enrollmentNotificationService = EnrollmentNotificationService.getInstance();
