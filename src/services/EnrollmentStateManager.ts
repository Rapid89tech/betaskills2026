/**
 * EnrollmentStateManager - Centralized enrollment logic and state management
 * 
 * This service manages enrollment status transitions, business rule enforcement,
 * enrollment persistence, and audit capabilities for the production iKhokha integration.
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import { supabase } from '@/integrations/supabase/client';
import { 
  EnrollmentStatus, 
  PaymentType, 
  PaymentStatus,
  Enrollment
} from '@/types/enrollment';

// Production enrollment interface
export interface ProductionEnrollment extends Enrollment {
  proofOfPaymentUrl?: string;
  rejectionReason?: string;
}

// Enrollment status update interface
export interface EnrollmentStatusUpdate {
  enrollmentId: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  paymentStatus?: PaymentStatus;
  timestamp: Date;
}
import { logger } from '@/utils/logger';

export interface EnrollmentState {
  enrollmentId?: string;
  status: EnrollmentStatus;
  paymentType?: PaymentType;
  paymentStatus?: PaymentStatus;
  requiresApproval: boolean;
  hasAccess: boolean;
  canEnroll: boolean;
  buttonText: string;
  buttonAction: ButtonAction;
  isDisabled: boolean;
}

export enum ButtonAction {
  REDIRECT_TO_AUTH = 'redirect_to_auth',
  INITIATE_ENROLLMENT = 'initiate_enrollment',
  SHOW_PENDING = 'show_pending',
  CONTINUE_COURSE = 'continue_course',
  RETRY_PAYMENT = 'retry_payment'
}

export interface EnrollmentHistoryEntry {
  id: string;
  enrollment_id: string;
  previous_status: EnrollmentStatus;
  new_status: EnrollmentStatus;
  changed_by: string;
  change_reason?: string;
  metadata?: Record<string, any>;
  created_at: Date;
}

export interface ManualApprovalData {
  reason: string;
  originalPaymentError?: any;
  retryAttempts?: number;
  failureReason?: string;
  [key: string]: any;
}

export interface BusinessRuleValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class EnrollmentStateManager {
  private static instance: EnrollmentStateManager;
  private enrollmentCache = new Map<string, ProductionEnrollment>();
  private statusUpdateCallbacks = new Set<(update: EnrollmentStatusUpdate) => void>();

  private constructor() {
    this.initializeEventListeners();
  }

  public static getInstance(): EnrollmentStateManager {
    if (!EnrollmentStateManager.instance) {
      EnrollmentStateManager.instance = new EnrollmentStateManager();
    }
    return EnrollmentStateManager.instance;
  }

  /**
   * Create a new pending enrollment with proper business logic validation
   * Requirement 6.1: Proper enrollment creation based on login status
   */
  public async createPendingEnrollment(
    courseId: string, 
    userId: string,
    userEmail: string,
    courseTitle: string,
    paymentType: PaymentType = PaymentType.CARD
  ): Promise<ProductionEnrollment> {
    try {
      // Validate business rules before creating enrollment
      const validation = await this.validateEnrollmentCreation(courseId, userId);
      if (!validation.isValid) {
        throw new Error(`Enrollment validation failed: ${validation.errors.join(', ')}`);
      }

      // Check for existing enrollment
      const existingEnrollment = await this.getEnrollmentByUserAndCourse(userId, courseId);
      if (existingEnrollment) {
        logger.info(`Existing enrollment found for user ${userId} and course ${courseId}`);
        return existingEnrollment;
      }

      const enrollment: ProductionEnrollment = {
        id: `enrollment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        user_id: userId,
        user_email: userEmail,
        course_id: courseId,
        course_title: courseTitle,
        status: EnrollmentStatus.PENDING,
        payment_type: paymentType,
        payment_status: PaymentStatus.PENDING,
        requires_approval: this.shouldRequireApproval(paymentType),
        course_access_granted: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      // Save to database
      await this.persistEnrollment(enrollment);

      // Cache the enrollment
      this.enrollmentCache.set(this.getCacheKey(userId, courseId), enrollment);

      // Create audit trail
      await this.createHistoryEntry(enrollment.id, EnrollmentStatus.PENDING, EnrollmentStatus.PENDING, userId, 'Enrollment created');

      // Dispatch status update
      this.dispatchStatusUpdate({
        enrollmentId: enrollment.id,
        userId,
        courseId,
        status: EnrollmentStatus.PENDING,
        eventType: 'enrollment_created',
        timestamp: new Date()
      });

      logger.info(`✅ Created pending enrollment: ${enrollment.id} for course ${courseId}`);
      return enrollment;

    } catch (error) {
      logger.error('❌ Error creating pending enrollment:', error);
      throw error;
    }
  }

  /**
   * Approve an enrollment and grant course access
   * Requirement 6.2: Proper state transitions for approved enrollments
   */
  public async approveEnrollment(
    enrollmentId: string, 
    approvedBy: string,
    reason?: string
  ): Promise<void> {
    try {
      const enrollment = await this.getEnrollmentById(enrollmentId);
      if (!enrollment) {
        throw new Error(`Enrollment not found: ${enrollmentId}`);
      }

      // Validate state transition
      const canApprove = this.canTransitionTo(enrollment.status, EnrollmentStatus.APPROVED);
      if (!canApprove) {
        throw new Error(`Cannot approve enrollment from status: ${enrollment.status}`);
      }

      const previousStatus = enrollment.status;

      // Update enrollment
      enrollment.status = EnrollmentStatus.APPROVED;
      enrollment.course_access_granted = true;
      enrollment.approved_by = approvedBy;
      enrollment.approved_at = new Date();
      enrollment.access_granted_at = new Date();
      enrollment.updated_at = new Date();

      // Persist changes
      await this.persistEnrollment(enrollment);

      // Update cache
      this.enrollmentCache.set(this.getCacheKey(enrollment.user_id, enrollment.course_id), enrollment);

      // Create audit trail
      await this.createHistoryEntry(enrollmentId, previousStatus, EnrollmentStatus.APPROVED, approvedBy, reason || 'Enrollment approved');

      // Dispatch status update
      this.dispatchStatusUpdate({
        enrollmentId,
        userId: enrollment.user_id,
        courseId: enrollment.course_id,
        status: EnrollmentStatus.APPROVED,
        eventType: 'admin_approved',
        timestamp: new Date(),
        metadata: { approvedBy, reason }
      });

      logger.info(`✅ Approved enrollment: ${enrollmentId} by ${approvedBy}`);

    } catch (error) {
      logger.error('❌ Error approving enrollment:', error);
      throw error;
    }
  }

  /**
   * Reject an enrollment with reason
   * Requirement 6.3: Proper handling of rejected enrollments
   */
  public async rejectEnrollment(
    enrollmentId: string, 
    reason: string,
    rejectedBy: string
  ): Promise<void> {
    try {
      const enrollment = await this.getEnrollmentById(enrollmentId);
      if (!enrollment) {
        throw new Error(`Enrollment not found: ${enrollmentId}`);
      }

      // Validate state transition
      const canReject = this.canTransitionTo(enrollment.status, EnrollmentStatus.REJECTED);
      if (!canReject) {
        throw new Error(`Cannot reject enrollment from status: ${enrollment.status}`);
      }

      const previousStatus = enrollment.status;

      // Update enrollment
      enrollment.status = EnrollmentStatus.REJECTED;
      enrollment.rejection_reason = reason;
      enrollment.course_access_granted = false;
      enrollment.updated_at = new Date();

      // Persist changes
      await this.persistEnrollment(enrollment);

      // Update cache
      this.enrollmentCache.set(this.getCacheKey(enrollment.user_id, enrollment.course_id), enrollment);

      // Create audit trail
      await this.createHistoryEntry(enrollmentId, previousStatus, EnrollmentStatus.REJECTED, rejectedBy, reason);

      // Dispatch status update
      this.dispatchStatusUpdate({
        enrollmentId,
        userId: enrollment.user_id,
        courseId: enrollment.course_id,
        status: EnrollmentStatus.REJECTED,
        eventType: 'enrollment_updated',
        timestamp: new Date(),
        metadata: { rejectedBy, reason }
      });

      logger.info(`✅ Rejected enrollment: ${enrollmentId} by ${rejectedBy}. Reason: ${reason}`);

    } catch (error) {
      logger.error('❌ Error rejecting enrollment:', error);
      throw error;
    }
  }

  /**
   * Get enrollment state for UI rendering
   * Requirement 6.4: Proper button states based on enrollment status
   */
  public async getEnrollmentState(
    courseId: string, 
    userId?: string,
    isLoggedIn: boolean = false
  ): Promise<EnrollmentState> {
    try {
      // Handle not logged in state
      if (!isLoggedIn || !userId) {
        return {
          status: EnrollmentStatus.PENDING,
          requiresApproval: false,
          hasAccess: false,
          canEnroll: false,
          buttonText: "Register To Enroll",
          buttonAction: ButtonAction.REDIRECT_TO_AUTH,
          isDisabled: false
        };
      }

      // Get enrollment if exists
      const enrollment = await this.getEnrollmentByUserAndCourse(userId, courseId);

      if (!enrollment) {
        // No enrollment - show enroll button
        return {
          status: EnrollmentStatus.PENDING,
          requiresApproval: false,
          hasAccess: false,
          canEnroll: true,
          buttonText: "Enroll Now",
          buttonAction: ButtonAction.INITIATE_ENROLLMENT,
          isDisabled: false
        };
      }

      // Return state based on enrollment status
      return this.mapEnrollmentToState(enrollment);

    } catch (error) {
      logger.error('❌ Error getting enrollment state:', error);
      // Return safe default state
      return {
        status: EnrollmentStatus.FAILED,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: false,
        buttonText: "Error",
        buttonAction: ButtonAction.RETRY_PAYMENT,
        isDisabled: true
      };
    }
  }

  /**
   * Check if user can access course content
   * Requirement 6.4: Proper access control based on enrollment status
   */
  public async canAccessCourse(courseId: string, userId: string): Promise<boolean> {
    try {
      const enrollment = await this.getEnrollmentByUserAndCourse(userId, courseId);
      return enrollment?.course_access_granted === true && enrollment?.status === EnrollmentStatus.APPROVED;
    } catch (error) {
      logger.error('❌ Error checking course access:', error);
      return false;
    }
  }

  /**
   * Determine payment type based on payment method
   */
  public determinePaymentType(paymentMethod: string): PaymentType {
    const method = paymentMethod.toLowerCase();
    
    if (method.includes('card') || method.includes('credit') || method.includes('debit')) {
      return PaymentType.CARD;
    } else if (method.includes('eft') || method.includes('bank') || method.includes('transfer')) {
      return PaymentType.EFT;
    } else {
      return PaymentType.MANUAL;
    }
  }

  /**
   * Check if payment type requires admin approval
   */
  public shouldRequireApproval(paymentType: PaymentType): boolean {
    return paymentType === PaymentType.EFT || paymentType === PaymentType.MANUAL;
  }

  /**
   * Update enrollment payment status
   */
  public async updatePaymentStatus(
    enrollmentId: string,
    paymentStatus: PaymentStatus,
    transactionId?: string
  ): Promise<void> {
    try {
      const enrollment = await this.getEnrollmentById(enrollmentId);
      if (!enrollment) {
        throw new Error(`Enrollment not found: ${enrollmentId}`);
      }

      const previousStatus = enrollment.status;
      enrollment.payment_status = paymentStatus;
      enrollment.updated_at = new Date();

      if (transactionId) {
        enrollment.ikhokha_transaction_id = transactionId;
      }

      // Auto-approve card payments that are completed
      if (paymentStatus === PaymentStatus.COMPLETED && 
          enrollment.payment_type === PaymentType.CARD &&
          enrollment.status === EnrollmentStatus.PENDING) {
        
        enrollment.status = EnrollmentStatus.APPROVED;
        enrollment.course_access_granted = true;
        enrollment.approved_at = new Date();
        enrollment.access_granted_at = new Date();
      }

      // Persist changes
      await this.persistEnrollment(enrollment);

      // Update cache
      this.enrollmentCache.set(this.getCacheKey(enrollment.user_id, enrollment.course_id), enrollment);

      // Create audit trail if status changed
      if (previousStatus !== enrollment.status) {
        await this.createHistoryEntry(
          enrollmentId, 
          previousStatus, 
          enrollment.status, 
          'system', 
          `Payment status updated to ${paymentStatus}`
        );
      }

      // Dispatch status update
      this.dispatchStatusUpdate({
        enrollmentId,
        userId: enrollment.user_id,
        courseId: enrollment.course_id,
        status: enrollment.status,
        eventType: 'payment_completed',
        timestamp: new Date(),
        metadata: { paymentStatus, transactionId }
      });

      logger.info(`✅ Updated payment status for enrollment ${enrollmentId}: ${paymentStatus}`);

    } catch (error) {
      logger.error('❌ Error updating payment status:', error);
      throw error;
    }
  }

  /**
   * Get enrollment history for audit purposes
   */
  public async getEnrollmentHistory(enrollmentId: string): Promise<EnrollmentHistoryEntry[]> {
    try {
      const { data, error } = await supabase
        .from('enrollment_history')
        .select('*')
        .eq('enrollment_id', enrollmentId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      logger.error('❌ Error getting enrollment history:', error);
      return [];
    }
  }

  /**
   * Subscribe to enrollment status updates
   */
  public subscribeToStatusUpdates(callback: (update: EnrollmentStatusUpdate) => void): () => void {
    this.statusUpdateCallbacks.add(callback);
    
    return () => {
      this.statusUpdateCallbacks.delete(callback);
    };
  }

  // Private helper methods

  private async getEnrollmentById(enrollmentId: string): Promise<ProductionEnrollment | null> {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('id', enrollmentId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data ? this.mapDatabaseToEnrollment(data) : null;
    } catch (error) {
      logger.error('❌ Error getting enrollment by ID:', error);
      return null;
    }
  }

  private async getEnrollmentByUserAndCourse(userId: string, courseId: string): Promise<ProductionEnrollment | null> {
    try {
      // Check cache first
      const cacheKey = this.getCacheKey(userId, courseId);
      const cached = this.enrollmentCache.get(cacheKey);
      if (cached) {
        return cached;
      }

      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      const enrollment = data ? this.mapDatabaseToEnrollment(data) : null;
      
      if (enrollment) {
        this.enrollmentCache.set(cacheKey, enrollment);
      }

      return enrollment;
    } catch (error) {
      logger.error('❌ Error getting enrollment by user and course:', error);
      return null;
    }
  }

  private async persistEnrollment(enrollment: ProductionEnrollment): Promise<void> {
    try {
      const { error } = await supabase
        .from('enrollments')
        .upsert({
          id: enrollment.id,
          user_id: enrollment.user_id,
          user_email: enrollment.user_email,
          course_id: enrollment.course_id,
          course_title: enrollment.course_title,
          status: enrollment.status,
          payment_type: enrollment.payment_type,
          payment_status: enrollment.payment_status,
          payment_reference: enrollment.payment_reference,
          ikhokha_transaction_id: enrollment.ikhokha_transaction_id,
          requires_approval: enrollment.requires_approval,
          approved_by: enrollment.approved_by,
          approved_at: enrollment.approved_at?.toISOString(),
          rejection_reason: enrollment.rejection_reason,
          created_at: enrollment.created_at.toISOString(),
          updated_at: enrollment.updated_at.toISOString(),
          course_access_granted: enrollment.course_access_granted,
          access_granted_at: enrollment.access_granted_at?.toISOString()
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      logger.error('❌ Error persisting enrollment:', error);
      throw error;
    }
  }

  private async createHistoryEntry(
    enrollmentId: string,
    previousStatus: EnrollmentStatus,
    newStatus: EnrollmentStatus,
    changedBy: string,
    reason?: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('enrollment_history')
        .insert({
          id: `history_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          enrollment_id: enrollmentId,
          previous_status: previousStatus,
          new_status: newStatus,
          changed_by: changedBy,
          change_reason: reason,
          created_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      logger.error('❌ Error creating history entry:', error);
      // Don't throw - history is not critical
    }
  }

  private async validateEnrollmentCreation(courseId: string, userId: string): Promise<BusinessRuleValidation> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if user already has an active enrollment
    const existingEnrollment = await this.getEnrollmentByUserAndCourse(userId, courseId);
    if (existingEnrollment && existingEnrollment.status !== EnrollmentStatus.REJECTED) {
      warnings.push('User already has an enrollment for this course');
    }

    // Add more business rule validations as needed
    if (!courseId || !userId) {
      errors.push('Course ID and User ID are required');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private canTransitionTo(currentStatus: EnrollmentStatus, newStatus: EnrollmentStatus): boolean {
    const validTransitions: Record<EnrollmentStatus, EnrollmentStatus[]> = {
      [EnrollmentStatus.PENDING]: [EnrollmentStatus.APPROVED, EnrollmentStatus.REJECTED, EnrollmentStatus.PAYMENT_REQUIRED],
      [EnrollmentStatus.PAYMENT_REQUIRED]: [EnrollmentStatus.PAYMENT_PROCESSING, EnrollmentStatus.REJECTED],
      [EnrollmentStatus.PAYMENT_PROCESSING]: [EnrollmentStatus.PENDING_APPROVAL, EnrollmentStatus.APPROVED, EnrollmentStatus.FAILED],
      [EnrollmentStatus.PENDING_APPROVAL]: [EnrollmentStatus.APPROVED, EnrollmentStatus.REJECTED],
      [EnrollmentStatus.APPROVED]: [EnrollmentStatus.COMPLETED],
      [EnrollmentStatus.REJECTED]: [EnrollmentStatus.PENDING], // Allow re-enrollment
      [EnrollmentStatus.COMPLETED]: [],
      [EnrollmentStatus.FAILED]: [EnrollmentStatus.PENDING] // Allow retry
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }

  private mapEnrollmentToState(enrollment: ProductionEnrollment): EnrollmentState {
    const baseState = {
      enrollmentId: enrollment.id,
      status: enrollment.status,
      paymentType: enrollment.payment_type,
      paymentStatus: enrollment.payment_status,
      requiresApproval: enrollment.requires_approval,
      hasAccess: enrollment.course_access_granted,
      canEnroll: false,
      buttonText: '',
      buttonAction: ButtonAction.SHOW_PENDING,
      isDisabled: false
    };

    switch (enrollment.status) {
      case EnrollmentStatus.PENDING:
        if (enrollment.payment_type === PaymentType.EFT) {
          return {
            ...baseState,
            buttonText: "Pending Approval",
            buttonAction: ButtonAction.SHOW_PENDING,
            isDisabled: true
          };
        } else {
          return {
            ...baseState,
            buttonText: "Payment Processing",
            buttonAction: ButtonAction.SHOW_PENDING,
            isDisabled: true
          };
        }

      case EnrollmentStatus.APPROVED:
        return {
          ...baseState,
          buttonText: "Continue Course",
          buttonAction: ButtonAction.CONTINUE_COURSE,
          isDisabled: false
        };

      case EnrollmentStatus.REJECTED:
        return {
          ...baseState,
          canEnroll: true,
          buttonText: "Enroll Now",
          buttonAction: ButtonAction.INITIATE_ENROLLMENT,
          isDisabled: false
        };

      case EnrollmentStatus.FAILED:
        return {
          ...baseState,
          canEnroll: true,
          buttonText: "Retry Payment",
          buttonAction: ButtonAction.RETRY_PAYMENT,
          isDisabled: false
        };

      default:
        return {
          ...baseState,
          buttonText: "Pending",
          buttonAction: ButtonAction.SHOW_PENDING,
          isDisabled: true
        };
    }
  }

  private mapDatabaseToEnrollment(data: any): ProductionEnrollment {
    return {
      id: data.id,
      user_id: data.user_id,
      user_email: data.user_email,
      course_id: data.course_id,
      course_title: data.course_title,
      status: data.status,
      payment_type: data.payment_type,
      payment_status: data.payment_status,
      payment_reference: data.payment_reference,
      ikhokha_transaction_id: data.ikhokha_transaction_id,
      requires_approval: data.requires_approval,
      approved_by: data.approved_by,
      approved_at: data.approved_at ? new Date(data.approved_at) : undefined,
      rejection_reason: data.rejection_reason,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      course_access_granted: data.course_access_granted,
      access_granted_at: data.access_granted_at ? new Date(data.access_granted_at) : undefined
    };
  }

  private getCacheKey(userId: string, courseId: string): string {
    return `${userId}:${courseId}`;
  }

  private dispatchStatusUpdate(update: EnrollmentStatusUpdate): void {
    // Notify all subscribers
    this.statusUpdateCallbacks.forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        logger.error('❌ Error in status update callback:', error);
      }
    });

    // Dispatch DOM event for backward compatibility
    window.dispatchEvent(new CustomEvent('enrollment-status-updated', {
      detail: update
    }));
  }

  /**
   * Update enrollment status with metadata
   */
  public async updateEnrollmentStatus(
    enrollmentId: string,
    status: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const enrollment = await this.getEnrollmentById(enrollmentId);
      if (!enrollment) {
        throw new Error(`Enrollment not found: ${enrollmentId}`);
      }

      const previousStatus = enrollment.status;
      enrollment.status = status as EnrollmentStatus;
      enrollment.updated_at = new Date();

      // Persist changes
      await this.persistEnrollment(enrollment);

      // Update cache
      this.enrollmentCache.set(this.getCacheKey(enrollment.user_id, enrollment.course_id), enrollment);

      // Create audit trail
      await this.createHistoryEntry(
        enrollmentId, 
        previousStatus, 
        enrollment.status, 
        'system', 
        `Status updated to ${status}`
      );

      // Dispatch status update
      this.dispatchStatusUpdate({
        enrollmentId,
        userId: enrollment.user_id,
        courseId: enrollment.course_id,
        status: enrollment.status,
        eventType: 'enrollment_updated',
        timestamp: new Date(),
        metadata
      });

      logger.info(`✅ Updated enrollment status ${enrollmentId}: ${status}`);

    } catch (error) {
      logger.error('❌ Error updating enrollment status:', error);
      throw error;
    }
  }

  /**
   * Mark enrollment for manual approval
   */
  public async markForManualApproval(
    enrollmentId: string,
    reason: string,
    data?: ManualApprovalData
  ): Promise<void> {
    try {
      const enrollment = await this.getEnrollmentById(enrollmentId);
      if (!enrollment) {
        throw new Error(`Enrollment not found: ${enrollmentId}`);
      }

      const previousStatus = enrollment.status;
      enrollment.status = EnrollmentStatus.PENDING_APPROVAL;
      enrollment.requires_approval = true;
      enrollment.updated_at = new Date();

      // Persist changes
      await this.persistEnrollment(enrollment);

      // Update cache
      this.enrollmentCache.set(this.getCacheKey(enrollment.user_id, enrollment.course_id), enrollment);

      // Create audit trail
      await this.createHistoryEntry(
        enrollmentId, 
        previousStatus, 
        EnrollmentStatus.PENDING_APPROVAL, 
        'system', 
        reason
      );

      // Dispatch status update
      this.dispatchStatusUpdate({
        enrollmentId,
        userId: enrollment.user_id,
        courseId: enrollment.course_id,
        status: EnrollmentStatus.PENDING_APPROVAL,
        eventType: 'manual_approval_required',
        timestamp: new Date(),
        metadata: { reason, ...data }
      });

      logger.info(`✅ Marked enrollment for manual approval ${enrollmentId}: ${reason}`);

    } catch (error) {
      logger.error('❌ Error marking enrollment for manual approval:', error);
      throw error;
    }
  }

  private initializeEventListeners(): void {
    // Listen for payment webhook events
    window.addEventListener('payment-webhook-received', (event: any) => {
      const { enrollmentId, paymentStatus, transactionId } = event.detail;
      if (enrollmentId && paymentStatus) {
        this.updatePaymentStatus(enrollmentId, paymentStatus, transactionId).catch(error => {
          logger.error('❌ Error handling payment webhook:', error);
        });
      }
    });
  }
}

// Export singleton instance
export const enrollmentStateManager = EnrollmentStateManager.getInstance();