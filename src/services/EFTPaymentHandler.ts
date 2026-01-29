/**
 * EFT Payment Handler Service
 * 
 * Specialized service for handling EFT payment enrollments with proper
 * real-time synchronization and pending status management.
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */

import { logger } from '@/utils/logger';
import { realTimeEnrollmentSync } from './RealTimeEnrollmentSync';

export interface EFTPaymentData {
  enrollmentId: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  bankReference?: string;
  proofOfPayment?: string;
  paymentDate?: Date;
  userEmail: string;
  courseTitle: string;
  metadata?: any;
}

export interface EFTPaymentStatus {
  id: string;
  status: 'submitted' | 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  processedAt?: Date;
  approvedBy?: string;
  rejectionReason?: string;
}

/**
 * EFT Payment Handler for managing EFT payment enrollments
 */
export class EFTPaymentHandler {
  private static instance: EFTPaymentHandler;

  constructor() {}

  static getInstance(): EFTPaymentHandler {
    if (!EFTPaymentHandler.instance) {
      EFTPaymentHandler.instance = new EFTPaymentHandler();
    }
    return EFTPaymentHandler.instance;
  }

  /**
   * Process new EFT payment enrollment submission
   * Requirement 2.1: EFT payments show in pending tab with real-time updates
   */
  async processEFTPaymentSubmission(paymentData: EFTPaymentData): Promise<void> {
    logger.info('🏦 Processing EFT payment submission', {
      enrollmentId: paymentData.enrollmentId,
      userId: paymentData.userId,
      courseId: paymentData.courseId,
      amount: paymentData.amount
    });

    try {
      // Create enrollment update for real-time sync
      const enrollmentUpdate = {
        id: paymentData.enrollmentId,
        userId: paymentData.userId,
        courseId: paymentData.courseId,
        status: 'pending' as const,
        paymentType: 'eft' as const,
        timestamp: new Date(),
        source: 'webhook' as const,
        metadata: {
          paymentAmount: paymentData.amount,
          currency: paymentData.currency,
          bankReference: paymentData.bankReference,
          proofOfPayment: paymentData.proofOfPayment,
          paymentDate: paymentData.paymentDate,
          userEmail: paymentData.userEmail,
          courseTitle: paymentData.courseTitle,
          requiresApproval: true,
          ...paymentData.metadata
        }
      };

      // Broadcast to all admin sessions
      await realTimeEnrollmentSync.handleEFTPaymentEnrollment({
        id: paymentData.enrollmentId,
        user_id: paymentData.userId,
        course_id: paymentData.courseId,
        user_email: paymentData.userEmail,
        course_title: paymentData.courseTitle,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        proof_of_payment: paymentData.proofOfPayment,
        payment_ref: paymentData.bankReference,
        payment_date: paymentData.paymentDate?.toISOString(),
        metadata: paymentData.metadata
      });

      // Dispatch specific EFT events
      this.dispatchEFTEvents('eft-payment-submitted', {
        ...enrollmentUpdate,
        paymentData
      });

      logger.info('✅ EFT payment submission processed successfully');

    } catch (error) {
      logger.error('❌ Failed to process EFT payment submission:', error);
      throw error;
    }
  }

  /**
   * Handle EFT payment approval by admin
   * Requirement 2.3: EFT payments move from pending to approved with real-time sync
   */
  async approveEFTPayment(
    enrollmentId: string,
    adminId: string,
    approvalNotes?: string
  ): Promise<void> {
    logger.info('✅ Approving EFT payment', {
      enrollmentId,
      adminId,
      approvalNotes
    });

    try {
      // Update enrollment status in database (this would be actual DB call)
      await this.updateEnrollmentStatus(enrollmentId, 'approved', adminId);

      // Broadcast real-time update
      await realTimeEnrollmentSync.handleAdminStatusChange(enrollmentId, 'approved', adminId);

      // Dispatch EFT-specific approval events
      this.dispatchEFTEvents('eft-payment-approved', {
        enrollmentId,
        adminId,
        approvalNotes,
        approvedAt: new Date(),
        status: 'approved'
      });

      // Grant course access
      await this.grantCourseAccess(enrollmentId);

      logger.info('✅ EFT payment approved successfully');

    } catch (error) {
      logger.error('❌ Failed to approve EFT payment:', error);
      throw error;
    }
  }

  /**
   * Handle EFT payment rejection by admin
   * Requirement 2.4: EFT payments can be rejected with proper notification
   */
  async rejectEFTPayment(
    enrollmentId: string,
    adminId: string,
    rejectionReason: string
  ): Promise<void> {
    logger.info('❌ Rejecting EFT payment', {
      enrollmentId,
      adminId,
      rejectionReason
    });

    try {
      // Update enrollment status in database
      await this.updateEnrollmentStatus(enrollmentId, 'rejected', adminId, rejectionReason);

      // Broadcast real-time update
      await realTimeEnrollmentSync.handleAdminStatusChange(enrollmentId, 'rejected', adminId);

      // Dispatch EFT-specific rejection events
      this.dispatchEFTEvents('eft-payment-rejected', {
        enrollmentId,
        adminId,
        rejectionReason,
        rejectedAt: new Date(),
        status: 'rejected'
      });

      // Send rejection notification to user
      await this.sendRejectionNotification(enrollmentId, rejectionReason);

      logger.info('✅ EFT payment rejected successfully');

    } catch (error) {
      logger.error('❌ Failed to reject EFT payment:', error);
      throw error;
    }
  }

  /**
   * Get EFT payment status with real-time updates
   * Requirement 2.2: Real-time synchronization for EFT enrollment submissions
   */
  async getEFTPaymentStatus(enrollmentId: string): Promise<EFTPaymentStatus | null> {
    try {
      // This would typically query the database
      // For now, return mock data based on localStorage
      const statusKey = `eft-status-${enrollmentId}`;
      const storedStatus = localStorage.getItem(statusKey);
      
      if (storedStatus) {
        const status = JSON.parse(storedStatus);
        return {
          ...status,
          submittedAt: new Date(status.submittedAt),
          processedAt: status.processedAt ? new Date(status.processedAt) : undefined
        };
      }

      return null;
    } catch (error) {
      logger.error('❌ Failed to get EFT payment status:', error);
      return null;
    }
  }

  /**
   * Monitor EFT payment processing times
   */
  async monitorEFTProcessingTimes(): Promise<void> {
    logger.info('📊 Monitoring EFT payment processing times');

    try {
      // Get all pending EFT payments
      const pendingPayments = await this.getPendingEFTPayments();
      
      for (const payment of pendingPayments) {
        const processingTime = Date.now() - new Date(payment.submittedAt).getTime();
        const hoursWaiting = processingTime / (1000 * 60 * 60);

        // Alert if payment has been waiting too long
        if (hoursWaiting > 24) {
          this.dispatchEFTEvents('eft-payment-overdue', {
            enrollmentId: payment.id,
            hoursWaiting: Math.round(hoursWaiting),
            submittedAt: payment.submittedAt
          });
        }
      }
    } catch (error) {
      logger.error('❌ Failed to monitor EFT processing times:', error);
    }
  }

  /**
   * Get pending EFT payments for admin dashboard
   */
  async getPendingEFTPayments(): Promise<EFTPaymentStatus[]> {
    try {
      // This would typically query the database
      // For now, return mock data
      const pendingKey = 'pending-eft-payments';
      const storedPending = localStorage.getItem(pendingKey);
      
      if (storedPending) {
        const payments = JSON.parse(storedPending);
        return payments.map((payment: any) => ({
          ...payment,
          submittedAt: new Date(payment.submittedAt),
          processedAt: payment.processedAt ? new Date(payment.processedAt) : undefined
        }));
      }

      return [];
    } catch (error) {
      logger.error('❌ Failed to get pending EFT payments:', error);
      return [];
    }
  }

  /**
   * Update enrollment status in database
   */
  private async updateEnrollmentStatus(
    enrollmentId: string,
    status: 'approved' | 'rejected',
    adminId: string,
    notes?: string
  ): Promise<void> {
    // This would be actual database update
    // For now, simulate with localStorage
    const statusKey = `eft-status-${enrollmentId}`;
    const currentStatus = await this.getEFTPaymentStatus(enrollmentId);
    
    const updatedStatus: EFTPaymentStatus = {
      id: enrollmentId,
      status,
      submittedAt: currentStatus?.submittedAt || new Date(),
      processedAt: new Date(),
      approvedBy: status === 'approved' ? adminId : undefined,
      rejectionReason: status === 'rejected' ? notes : undefined
    };

    localStorage.setItem(statusKey, JSON.stringify(updatedStatus));
  }

  /**
   * Grant course access after EFT approval
   */
  private async grantCourseAccess(enrollmentId: string): Promise<void> {
    logger.info('🎓 Granting course access for approved EFT payment', { enrollmentId });

    // Dispatch course access event
    window.dispatchEvent(new CustomEvent('course-access-granted', {
      detail: {
        enrollmentId,
        accessLevel: 'granted',
        grantedAt: new Date(),
        source: 'eft_approval'
      }
    }));
  }

  /**
   * Send rejection notification to user
   */
  private async sendRejectionNotification(
    enrollmentId: string,
    rejectionReason: string
  ): Promise<void> {
    logger.info('📧 Sending rejection notification', { enrollmentId, rejectionReason });

    // Dispatch notification event
    window.dispatchEvent(new CustomEvent('eft-payment-rejection-notification', {
      detail: {
        enrollmentId,
        rejectionReason,
        notificationSent: true,
        sentAt: new Date()
      }
    }));
  }

  /**
   * Dispatch EFT-specific events
   */
  private dispatchEFTEvents(eventType: string, data: any): void {
    // Dispatch to window for global listeners
    window.dispatchEvent(new CustomEvent(eventType, {
      detail: data
    }));

    // Also dispatch generic EFT event
    window.dispatchEvent(new CustomEvent('eft-payment-event', {
      detail: {
        type: eventType,
        data,
        timestamp: new Date()
      }
    }));
  }

  /**
   * Get EFT payment statistics for admin dashboard
   */
  async getEFTPaymentStats(): Promise<any> {
    try {
      const pendingPayments = await this.getPendingEFTPayments();
      
      return {
        totalPending: pendingPayments.length,
        averageProcessingTime: this.calculateAverageProcessingTime(pendingPayments),
        oldestPending: this.getOldestPendingPayment(pendingPayments),
        processingQueue: pendingPayments.sort((a, b) => 
          a.submittedAt.getTime() - b.submittedAt.getTime()
        )
      };
    } catch (error) {
      logger.error('❌ Failed to get EFT payment stats:', error);
      return {
        totalPending: 0,
        averageProcessingTime: 0,
        oldestPending: null,
        processingQueue: []
      };
    }
  }

  /**
   * Calculate average processing time for EFT payments
   */
  private calculateAverageProcessingTime(payments: EFTPaymentStatus[]): number {
    const processedPayments = payments.filter(p => p.processedAt);
    
    if (processedPayments.length === 0) return 0;

    const totalTime = processedPayments.reduce((sum, payment) => {
      const processingTime = payment.processedAt!.getTime() - payment.submittedAt.getTime();
      return sum + processingTime;
    }, 0);

    return totalTime / processedPayments.length;
  }

  /**
   * Get oldest pending payment
   */
  private getOldestPendingPayment(payments: EFTPaymentStatus[]): EFTPaymentStatus | null {
    const pendingPayments = payments.filter(p => p.status === 'pending');
    
    if (pendingPayments.length === 0) return null;

    return pendingPayments.reduce((oldest, current) => 
      current.submittedAt < oldest.submittedAt ? current : oldest
    );
  }
}

// Export singleton instance
export const eftPaymentHandler = EFTPaymentHandler.getInstance();