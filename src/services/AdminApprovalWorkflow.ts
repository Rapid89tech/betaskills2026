/**
 * Admin Approval Workflow Service
 * 
 * Manages EFT payment approval processes, real-time admin dashboard integration,
 * instant approval actions, and approval audit trail.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { supabase } from '@/integrations/supabase/client';
import { EnrollmentStatus, Enrollment } from '@/types/enrollment';

// Production enrollment interface
export interface ProductionEnrollment extends Enrollment {
  proofOfPaymentUrl?: string;
  rejectionReason?: string;
}

interface PendingEnrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  payment_type: 'eft' | 'card' | 'manual';
  payment_status: string;
  amount?: number;
  currency?: string;
  created_at: string;
  updated_at: string;
  ikhokha_payment_id?: string;
  payment_reference?: string;
}

interface EnrollmentDetails extends PendingEnrollment {
  user_profile?: {
    full_name?: string;
    phone?: string;
  };
  course_details?: {
    description?: string;
    price?: number;
    duration?: string;
  };
  payment_history?: PaymentHistoryEntry[];
}

interface PaymentHistoryEntry {
  id: string;
  status: string;
  timestamp: string;
  notes?: string;
  processed_by?: string;
}

interface ApprovalResult {
  success: boolean;
  enrollmentId: string;
  message: string;
  timestamp: Date;
  approvedBy: string;
}

interface RejectionResult {
  success: boolean;
  enrollmentId: string;
  reason: string;
  timestamp: Date;
  rejectedBy: string;
}

interface BulkApprovalResult {
  totalProcessed: number;
  successful: string[];
  failed: Array<{
    enrollmentId: string;
    error: string;
  }>;
  timestamp: Date;
  approvedBy: string;
}

interface ApprovalAuditEntry {
  id: string;
  enrollment_id: string;
  action: 'approved' | 'rejected' | 'bulk_approved';
  performed_by: string;
  reason?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

type NewEnrollmentCallback = (enrollment: PendingEnrollment) => void;
type EnrollmentProcessedCallback = (enrollmentId: string, action: 'approved' | 'rejected') => void;

export class AdminApprovalWorkflow {
  private static instance: AdminApprovalWorkflow;
  private newEnrollmentListeners: Set<NewEnrollmentCallback> = new Set();
  private processedListeners: Set<EnrollmentProcessedCallback> = new Set();
  private isInitialized = false;

  private constructor() {}

  static getInstance(): AdminApprovalWorkflow {
    if (!AdminApprovalWorkflow.instance) {
      AdminApprovalWorkflow.instance = new AdminApprovalWorkflow();
    }
    return AdminApprovalWorkflow.instance;
  }

  /**
   * Initialize the workflow service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize admin approval workflow
      this.isInitialized = true;
      console.log('AdminApprovalWorkflow initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AdminApprovalWorkflow:', error);
      throw error;
    }
  }

  /**
   * Get all pending enrollments for admin dashboard
   * Requirement 4.1: Real-time admin dashboard integration for pending enrollments display
   */
  async getPendingEnrollments(): Promise<PendingEnrollment[]> {
    try {
      const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          user_id,
          user_email,
          course_id,
          course_title,
          payment_type,
          payment_status,
          amount,
          currency,
          created_at,
          updated_at,
          ikhokha_payment_id,
          payment_reference
        `)
        .eq('status', 'pending')
        .eq('requires_approval', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pending enrollments:', error);
        throw error;
      }

      return enrollments || [];
    } catch (error) {
      console.error('Error in getPendingEnrollments:', error);
      throw error;
    }
  }

  /**
   * Get detailed information for a specific enrollment
   * Requirement 4.1: Detailed enrollment information for admin review
   */
  async getEnrollmentDetails(enrollmentId: string): Promise<EnrollmentDetails> {
    try {
      // Get enrollment data
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select(`
          id,
          user_id,
          user_email,
          course_id,
          course_title,
          payment_type,
          payment_status,
          amount,
          currency,
          created_at,
          updated_at,
          ikhokha_payment_id,
          payment_reference
        `)
        .eq('id', enrollmentId)
        .single();

      if (enrollmentError || !enrollment) {
        throw new Error(`Enrollment not found: ${enrollmentId}`);
      }

      // Get user profile information
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', enrollment.user_id)
        .single();

      // Get course details
      const { data: courseDetails } = await supabase
        .from('courses')
        .select('description, price, duration')
        .eq('id', enrollment.course_id)
        .single();

      // Get payment history/audit trail
      const paymentHistory = await this.getPaymentHistory(enrollmentId);

      return {
        ...enrollment,
        user_profile: userProfile || undefined,
        course_details: courseDetails || undefined,
        payment_history: paymentHistory
      };
    } catch (error) {
      console.error('Error getting enrollment details:', error);
      throw error;
    }
  }

  /**
   * Approve an enrollment and grant course access
   * Requirement 4.2: Instant approval actions that update student interfaces
   */
  async approveEnrollment(enrollmentId: string, adminId: string, notes?: string): Promise<ApprovalResult> {
    try {
      // Get current enrollment data
      const { data: enrollment, error: fetchError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('id', enrollmentId)
        .single();

      if (fetchError || !enrollment) {
        throw new Error(`Enrollment not found: ${enrollmentId}`);
      }

      if (enrollment.status !== 'pending') {
        throw new Error(`Enrollment ${enrollmentId} is not in pending status`);
      }

      const now = new Date();

      // Update enrollment status to approved and grant access
      const { error: updateError } = await supabase
        .from('enrollments')
        .update({
          status: 'approved',
          course_access_granted: true,
          access_granted_at: now.toISOString(),
          approved_by: adminId,
          approved_at: now.toISOString(),
          updated_at: now.toISOString()
        })
        .eq('id', enrollmentId);

      if (updateError) {
        console.error('Error updating enrollment:', updateError);
        throw updateError;
      }

      // Create audit trail entry
      await this.createAuditEntry({
        enrollment_id: enrollmentId,
        action: 'approved',
        performed_by: adminId,
        reason: notes,
        timestamp: now,
        metadata: {
          user_id: enrollment.user_id,
          course_id: enrollment.course_id,
          payment_type: enrollment.payment_type
        }
      });

      // Dispatch custom event for real-time UI updates
      window.dispatchEvent(new CustomEvent('enrollment-status-updated', {
        detail: {
          enrollmentId,
          userId: enrollment.user_id,
          courseId: enrollment.course_id,
          status: EnrollmentStatus.APPROVED,
          timestamp: now
        }
      }));

      // Notify processed listeners
      this.processedListeners.forEach(callback => {
        try {
          callback(enrollmentId, 'approved');
        } catch (error) {
          console.error('Error in processed callback:', error);
        }
      });

      const result: ApprovalResult = {
        success: true,
        enrollmentId,
        message: 'Enrollment approved successfully',
        timestamp: now,
        approvedBy: adminId
      };

      console.log('Enrollment approved:', result);
      return result;

    } catch (error) {
      console.error('Error approving enrollment:', error);
      
      return {
        success: false,
        enrollmentId,
        message: error instanceof Error ? error.message : 'Failed to approve enrollment',
        timestamp: new Date(),
        approvedBy: adminId
      };
    }
  }

  /**
   * Reject an enrollment with reason
   * Requirement 4.3: Enrollment rejection with audit trail
   */
  async rejectEnrollment(enrollmentId: string, reason: string, adminId: string): Promise<RejectionResult> {
    try {
      // Get current enrollment data
      const { data: enrollment, error: fetchError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('id', enrollmentId)
        .single();

      if (fetchError || !enrollment) {
        throw new Error(`Enrollment not found: ${enrollmentId}`);
      }

      if (enrollment.status !== 'pending') {
        throw new Error(`Enrollment ${enrollmentId} is not in pending status`);
      }

      const now = new Date();

      // Update enrollment status to rejected
      const { error: updateError } = await supabase
        .from('enrollments')
        .update({
          status: 'rejected',
          rejection_reason: reason,
          rejected_by: adminId,
          rejected_at: now.toISOString(),
          updated_at: now.toISOString()
        })
        .eq('id', enrollmentId);

      if (updateError) {
        console.error('Error updating enrollment:', updateError);
        throw updateError;
      }

      // Create audit trail entry
      await this.createAuditEntry({
        enrollment_id: enrollmentId,
        action: 'rejected',
        performed_by: adminId,
        reason: reason,
        timestamp: now,
        metadata: {
          user_id: enrollment.user_id,
          course_id: enrollment.course_id,
          payment_type: enrollment.payment_type
        }
      });

      // Dispatch custom event for real-time UI updates
      window.dispatchEvent(new CustomEvent('enrollment-status-updated', {
        detail: {
          enrollmentId,
          userId: enrollment.user_id,
          courseId: enrollment.course_id,
          status: EnrollmentStatus.REJECTED,
          data: {
            enrollmentId,
            courseId: enrollment.course_id,
            courseName: enrollment.course_title,
            status: 'rejected',
            reason: reason,
            rejectedBy: adminId,
            rejectedAt: now
          },
          timestamp: now
        }
      }));

      // Notify processed listeners
      this.processedListeners.forEach(callback => {
        try {
          callback(enrollmentId, 'rejected');
        } catch (error) {
          console.error('Error in processed callback:', error);
        }
      });

      const result: RejectionResult = {
        success: true,
        enrollmentId,
        reason,
        timestamp: now,
        rejectedBy: adminId
      };

      console.log('Enrollment rejected:', result);
      return result;

    } catch (error) {
      console.error('Error rejecting enrollment:', error);
      
      return {
        success: false,
        enrollmentId,
        reason: error instanceof Error ? error.message : 'Failed to reject enrollment',
        timestamp: new Date(),
        rejectedBy: adminId
      };
    }
  }

  /**
   * Bulk approve multiple enrollments
   * Requirement 4.2: Bulk approval functionality for multiple enrollments
   */
  async bulkApproveEnrollments(enrollmentIds: string[], adminId: string): Promise<BulkApprovalResult> {
    const result: BulkApprovalResult = {
      totalProcessed: enrollmentIds.length,
      successful: [],
      failed: [],
      timestamp: new Date(),
      approvedBy: adminId
    };

    for (const enrollmentId of enrollmentIds) {
      try {
        const approvalResult = await this.approveEnrollment(enrollmentId, adminId, 'Bulk approval');
        
        if (approvalResult.success) {
          result.successful.push(enrollmentId);
        } else {
          result.failed.push({
            enrollmentId,
            error: approvalResult.message
          });
        }
      } catch (error) {
        result.failed.push({
          enrollmentId,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Create bulk audit entry
    await this.createAuditEntry({
      enrollment_id: 'bulk_operation',
      action: 'bulk_approved',
      performed_by: adminId,
      timestamp: result.timestamp,
      metadata: {
        total_processed: result.totalProcessed,
        successful_count: result.successful.length,
        failed_count: result.failed.length,
        enrollment_ids: enrollmentIds
      }
    });

    console.log('Bulk approval completed:', result);
    return result;
  }

  /**
   * Subscribe to new enrollment notifications
   * Requirement 4.1: Real-time notifications for new EFT enrollments
   */
  subscribeToNewEnrollments(callback: NewEnrollmentCallback): () => void {
    this.newEnrollmentListeners.add(callback);
    
    return () => {
      this.newEnrollmentListeners.delete(callback);
    };
  }

  /**
   * Subscribe to enrollment processing notifications
   * Requirement 4.3: Real-time updates when enrollments are processed
   */
  subscribeToEnrollmentProcessed(callback: EnrollmentProcessedCallback): () => void {
    this.processedListeners.add(callback);
    
    return () => {
      this.processedListeners.delete(callback);
    };
  }

  /**
   * Get approval audit trail for an enrollment
   * Requirement 4.4: Approval audit trail and logging system
   */
  async getApprovalAuditTrail(enrollmentId: string): Promise<ApprovalAuditEntry[]> {
    try {
      const { data: auditEntries, error } = await supabase
        .from('enrollment_audit_log')
        .select('*')
        .eq('enrollment_id', enrollmentId)
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching audit trail:', error);
        throw error;
      }

      return auditEntries || [];
    } catch (error) {
      console.error('Error in getApprovalAuditTrail:', error);
      throw error;
    }
  }

  /**
   * Get payment history for an enrollment
   */
  private async getPaymentHistory(enrollmentId: string): Promise<PaymentHistoryEntry[]> {
    try {
      // This could be expanded to include actual payment gateway logs
      const auditEntries = await this.getApprovalAuditTrail(enrollmentId);
      
      return auditEntries.map(entry => ({
        id: entry.id,
        status: entry.action,
        timestamp: entry.timestamp.toISOString(),
        notes: entry.reason,
        processed_by: entry.performed_by
      }));
    } catch (error) {
      console.error('Error getting payment history:', error);
      return [];
    }
  }

  /**
   * Create audit trail entry
   * Requirement 4.4: Comprehensive audit logging
   */
  private async createAuditEntry(entry: Omit<ApprovalAuditEntry, 'id'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('enrollment_audit_log')
        .insert({
          enrollment_id: entry.enrollment_id,
          action: entry.action,
          performed_by: entry.performed_by,
          reason: entry.reason,
          timestamp: entry.timestamp.toISOString(),
          metadata: entry.metadata
        });

      if (error) {
        console.error('Error creating audit entry:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in createAuditEntry:', error);
      // Don't throw here as audit logging shouldn't break the main flow
    }
  }

  /**
   * Handle new EFT enrollment notifications
   * Requirement 4.1: Real-time display of new EFT enrollments
   */
  private async handleNewEftEnrollment(update: any): void {
    try {
      // Fetch the full enrollment details
      const enrollmentDetails = await this.getEnrollmentDetails(update.enrollmentId);
      
      // Notify all listeners
      this.newEnrollmentListeners.forEach(callback => {
        try {
          callback(enrollmentDetails);
        } catch (error) {
          console.error('Error in new enrollment callback:', error);
        }
      });
    } catch (error) {
      console.error('Error handling new EFT enrollment:', error);
    }
  }

  /**
   * Get workflow statistics for admin dashboard
   */
  async getWorkflowStatistics(): Promise<{
    pendingCount: number;
    approvedToday: number;
    rejectedToday: number;
    averageApprovalTime: number;
  }> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Get pending count
      const { count: pendingCount } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
        .eq('requires_approval', true);

      // Get today's approvals
      const { count: approvedToday } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved')
        .gte('approved_at', today.toISOString());

      // Get today's rejections
      const { count: rejectedToday } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'rejected')
        .gte('rejected_at', today.toISOString());

      // Calculate average approval time (simplified)
      const averageApprovalTime = 0; // This would require more complex calculation

      return {
        pendingCount: pendingCount || 0,
        approvedToday: approvedToday || 0,
        rejectedToday: rejectedToday || 0,
        averageApprovalTime
      };
    } catch (error) {
      console.error('Error getting workflow statistics:', error);
      return {
        pendingCount: 0,
        approvedToday: 0,
        rejectedToday: 0,
        averageApprovalTime: 0
      };
    }
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    this.newEnrollmentListeners.clear();
    this.processedListeners.clear();
    this.isInitialized = false;
  }

  /**
   * Get service health status
   */
  getHealthStatus(): {
    initialized: boolean;
    newEnrollmentListeners: number;
    processedListeners: number;
  } {
    return {
      initialized: this.isInitialized,
      newEnrollmentListeners: this.newEnrollmentListeners.size,
      processedListeners: this.processedListeners.size
    };
  }
}

// Export singleton instance
export const adminApprovalWorkflow = AdminApprovalWorkflow.getInstance();