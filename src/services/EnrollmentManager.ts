/**
 * EnrollmentManager Service
 * 
 * Central service for managing all enrollment operations with real-time updates,
 * EFT and card payment processing, and admin approval workflows.
 * 
 * This service implements the EnrollmentManager interface from the design document
 * and provides the core functionality for the real-time enrollment system.
 */

import { supabase } from '@/integrations/supabase/client';
import { 
  Enrollment, 
  EnrollmentStatus, 
  PaymentType, 
  PaymentStatus,
  EnrollmentResult,
  EnrollmentUpdate,
  EnrollmentUpdateType,
  PaymentDetails,
  PaymentResult
} from '@/types/enrollment';
import { 
  ENROLLMENT_CONFIG, 
  ENROLLMENT_ERROR_CODES, 
  ENROLLMENT_SUCCESS_MESSAGES,
  ENROLLMENT_ERROR_MESSAGES,
  WEBSOCKET_EVENTS
} from '@/constants/enrollment';
import { 
  createEnrollmentUpdate,
  needsAdminAttention,
  hasAccessToContent
} from '@/utils/enrollment';
import { paymentHandler } from './PaymentHandler';

// Callback types for subscriptions
export type EnrollmentUpdateCallback = (update: EnrollmentUpdate) => void;
export type AdminUpdateCallback = (update: EnrollmentUpdate) => void;

/**
 * EnrollmentManager Interface
 */
export interface IEnrollmentManager {
  processEFTEnrollment(userId: string, courseId: string, paymentDetails?: PaymentDetails): Promise<EnrollmentResult>;
  processCardEnrollment(userId: string, courseId: string, paymentDetails: PaymentDetails): Promise<EnrollmentResult>;
  approveEnrollment(enrollmentId: string, adminId: string): Promise<void>;
  rejectEnrollment(enrollmentId: string, adminId: string, reason: string): Promise<void>;
  getEnrollmentStatus(userId: string, courseId: string): Promise<Enrollment | null>;
  subscribeToEnrollmentUpdates(callback: EnrollmentUpdateCallback): () => void;
  subscribeToAdminUpdates(callback: AdminUpdateCallback): () => void;
}

/**
 * EnrollmentManager Implementation
 */
export class EnrollmentManager implements IEnrollmentManager {
  private static instance: EnrollmentManager;
  private updateCallbacks: Set<EnrollmentUpdateCallback> = new Set();
  private adminCallbacks: Set<AdminUpdateCallback> = new Set();
  private realtimeChannel: any = null;
  private isInitialized = false;

  private constructor() {
    this.initializeRealtimeSubscription();
  }

  static getInstance(): EnrollmentManager {
    if (!EnrollmentManager.instance) {
      EnrollmentManager.instance = new EnrollmentManager();
    }
    return EnrollmentManager.instance;
  }

  /**
   * Initialize real-time subscription for enrollment updates
   */
  private async initializeRealtimeSubscription(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.realtimeChannel = supabase
        .channel('enrollment_updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'enrollments'
          },
          (payload) => {
            this.handleRealtimeUpdate(payload);
          }
        )
        .subscribe();

      this.isInitialized = true;
      console.log('✅ EnrollmentManager real-time subscription initialized');
    } catch (error) {
      console.error('❌ Failed to initialize real-time subscription:', error);
    }
  }

  /**
   * Handle real-time database updates
   */
  private handleRealtimeUpdate(payload: any): void {
    try {
      let updateType: EnrollmentUpdateType;
      let enrollment: Enrollment;

      switch (payload.eventType) {
        case 'INSERT':
          updateType = EnrollmentUpdateType.ENROLLMENT_CREATED;
          enrollment = this.mapDatabaseToEnrollment(payload.new);
          break;
        case 'UPDATE':
          const oldEnrollment = this.mapDatabaseToEnrollment(payload.old);
          const newEnrollment = this.mapDatabaseToEnrollment(payload.new);
          
          if (oldEnrollment.status !== newEnrollment.status) {
            if (newEnrollment.status === EnrollmentStatus.APPROVED) {
              updateType = EnrollmentUpdateType.ENROLLMENT_APPROVED;
            } else if (newEnrollment.status === EnrollmentStatus.REJECTED) {
              updateType = EnrollmentUpdateType.ENROLLMENT_REJECTED;
            } else {
              return; // Skip other status changes
            }
          } else {
            return; // Skip non-status updates
          }
          
          enrollment = newEnrollment;
          break;
        default:
          return; // Skip DELETE and other events
      }

      const update = createEnrollmentUpdate(updateType, enrollment);
      this.broadcastUpdate(update);

      // Dispatch browser events for cross-tab synchronization
      this.dispatchBrowserEvent(update);

    } catch (error) {
      console.error('❌ Error handling real-time update:', error);
    }
  }

  /**
   * Process EFT enrollment - creates pending enrollment for admin approval
   */
  async processEFTEnrollment(
    userId: string, 
    courseId: string, 
    paymentDetails?: PaymentDetails
  ): Promise<EnrollmentResult> {
    try {
      console.log('📝 Processing EFT enrollment:', { userId, courseId });

      // Check for existing enrollment
      const existingEnrollment = await this.getEnrollmentStatus(userId, courseId);
      if (existingEnrollment) {
        return {
          success: false,
          error: ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.DUPLICATE_ENROLLMENT],
          errorCode: ENROLLMENT_ERROR_CODES.DUPLICATE_ENROLLMENT
        };
      }

      // Create enrollment with pending status
      const enrollmentData = {
        id: `enrollment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        userId,
        courseId,
        paymentType: PaymentType.EFT,
        status: EnrollmentStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const { data, error } = await supabase
        .from('enrollments')
        .insert([{
          id: enrollmentData.id,
          user_id: enrollmentData.userId,
          course_id: enrollmentData.courseId,
          payment_type: enrollmentData.paymentType,
          status: enrollmentData.status,
          payment_status: enrollmentData.paymentStatus,
          created_at: enrollmentData.createdAt.toISOString(),
          updated_at: enrollmentData.updatedAt.toISOString(),
          payment_reference: paymentDetails?.reference || null,
          payment_amount: paymentDetails?.amount || null,
          payment_currency: paymentDetails?.currency || 'ZAR'
        }])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating EFT enrollment:', error);
        return {
          success: false,
          error: ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED],
          errorCode: ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED
        };
      }

      const enrollment = this.mapDatabaseToEnrollment(data);
      
      console.log('✅ EFT enrollment created successfully:', enrollment);
      
      return {
        success: true,
        enrollment
      };

    } catch (error: any) {
      console.error('❌ Error in processEFTEnrollment:', error);
      return {
        success: false,
        error: error.message || ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.NETWORK_ERROR],
        errorCode: ENROLLMENT_ERROR_CODES.NETWORK_ERROR
      };
    }
  }

  /**
   * Process card enrollment - provides immediate access on successful payment
   */
  async processCardEnrollment(
    userId: string, 
    courseId: string, 
    paymentDetails: PaymentDetails
  ): Promise<EnrollmentResult> {
    try {
      console.log('💳 Processing card enrollment:', { userId, courseId });

      // Check for existing enrollment
      const existingEnrollment = await this.getEnrollmentStatus(userId, courseId);
      if (existingEnrollment) {
        return {
          success: false,
          error: ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.DUPLICATE_ENROLLMENT],
          errorCode: ENROLLMENT_ERROR_CODES.DUPLICATE_ENROLLMENT
        };
      }

      // Simulate card payment processing
      const paymentResult = await this.processCardPayment(paymentDetails);
      
      if (!paymentResult.success) {
        return {
          success: false,
          error: paymentResult.error || ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED],
          errorCode: ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED
        };
      }

      // Create enrollment with approved status for successful card payment
      const enrollmentData = {
        id: `enrollment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        userId,
        courseId,
        paymentType: PaymentType.CARD,
        status: EnrollmentStatus.APPROVED,
        paymentStatus: PaymentStatus.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date(),
        approvedAt: new Date()
      };

      const { data, error } = await supabase
        .from('enrollments')
        .insert([{
          id: enrollmentData.id,
          user_id: enrollmentData.userId,
          course_id: enrollmentData.courseId,
          payment_type: enrollmentData.paymentType,
          status: enrollmentData.status,
          payment_status: enrollmentData.paymentStatus,
          created_at: enrollmentData.createdAt.toISOString(),
          updated_at: enrollmentData.updatedAt.toISOString(),
          approved_at: enrollmentData.approvedAt?.toISOString(),
          payment_id: paymentResult.paymentId,
          payment_amount: paymentDetails.amount,
          payment_currency: paymentDetails.currency
        }])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating card enrollment:', error);
        return {
          success: false,
          error: ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED],
          errorCode: ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED
        };
      }

      const enrollment = this.mapDatabaseToEnrollment(data);
      
      console.log('✅ Card enrollment created successfully:', enrollment);
      
      return {
        success: true,
        enrollment
      };

    } catch (error: any) {
      console.error('❌ Error in processCardEnrollment:', error);
      return {
        success: false,
        error: error.message || ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.NETWORK_ERROR],
        errorCode: ENROLLMENT_ERROR_CODES.NETWORK_ERROR
      };
    }
  }

  /**
   * Approve enrollment (admin operation)
   */
  async approveEnrollment(enrollmentId: string, adminId: string): Promise<void> {
    try {
      console.log('✅ Approving enrollment:', { enrollmentId, adminId });

      const { data, error } = await supabase
        .from('enrollments')
        .update({
          status: EnrollmentStatus.APPROVED,
          payment_status: PaymentStatus.COMPLETED,
          approved_by: adminId,
          approved_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error approving enrollment:', error);
        throw new Error(ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.ENROLLMENT_NOT_FOUND]);
      }

      console.log('✅ Enrollment approved successfully:', data);

    } catch (error: any) {
      console.error('❌ Error in approveEnrollment:', error);
      throw error;
    }
  }

  /**
   * Reject enrollment (admin operation)
   */
  async rejectEnrollment(enrollmentId: string, adminId: string, reason: string): Promise<void> {
    try {
      console.log('❌ Rejecting enrollment:', { enrollmentId, adminId, reason });

      const { data, error } = await supabase
        .from('enrollments')
        .update({
          status: EnrollmentStatus.REJECTED,
          approved_by: adminId,
          rejection_reason: reason,
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error rejecting enrollment:', error);
        throw new Error(ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.ENROLLMENT_NOT_FOUND]);
      }

      console.log('✅ Enrollment rejected successfully:', data);

    } catch (error: any) {
      console.error('❌ Error in rejectEnrollment:', error);
      throw error;
    }
  }

  /**
   * Get enrollment status for a user and course
   */
  async getEnrollmentStatus(userId: string, courseId: string): Promise<Enrollment | null> {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No enrollment found
          return null;
        }
        console.error('❌ Error getting enrollment status:', error);
        throw error;
      }

      return this.mapDatabaseToEnrollment(data);

    } catch (error: any) {
      console.error('❌ Error in getEnrollmentStatus:', error);
      return null;
    }
  }

  /**
   * Subscribe to enrollment updates
   */
  subscribeToEnrollmentUpdates(callback: EnrollmentUpdateCallback): () => void {
    this.updateCallbacks.add(callback);
    
    return () => {
      this.updateCallbacks.delete(callback);
    };
  }

  /**
   * Subscribe to admin updates
   */
  subscribeToAdminUpdates(callback: AdminUpdateCallback): () => void {
    this.adminCallbacks.add(callback);
    
    return () => {
      this.adminCallbacks.delete(callback);
    };
  }

  /**
   * Get all pending EFT enrollments (admin function)
   */
  async getPendingEFTEnrollments(): Promise<Enrollment[]> {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('payment_type', PaymentType.EFT)
        .eq('status', EnrollmentStatus.PENDING)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error getting pending EFT enrollments:', error);
        throw error;
      }

      return (data || []).map(item => this.mapDatabaseToEnrollment(item));

    } catch (error: any) {
      console.error('❌ Error in getPendingEFTEnrollments:', error);
      throw error;
    }
  }

  /**
   * Get user enrollments
   */
  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error getting user enrollments:', error);
        throw error;
      }

      return (data || []).map(item => this.mapDatabaseToEnrollment(item));

    } catch (error: any) {
      console.error('❌ Error in getUserEnrollments:', error);
      throw error;
    }
  }

  /**
   * Private helper methods
   */

  private async processCardPayment(paymentDetails: PaymentDetails): Promise<PaymentResult> {
    // Use the PaymentHandler for card payment processing
    return await paymentHandler.processPayment(PaymentType.CARD, paymentDetails);
  }

  private mapDatabaseToEnrollment(data: any): Enrollment {
    return {
      id: data.id,
      userId: data.user_id,
      courseId: data.course_id,
      paymentType: data.payment_type as PaymentType,
      status: data.status as EnrollmentStatus,
      paymentStatus: data.payment_status as PaymentStatus,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      approvedBy: data.approved_by || undefined,
      approvedAt: data.approved_at ? new Date(data.approved_at) : undefined,
      rejectionReason: data.rejection_reason || undefined,
      // Legacy fields for backward compatibility
      user_id: data.user_id,
      user_email: data.user_email,
      course_id: data.course_id,
      course_title: data.course_title,
      enrolled_at: data.created_at,
      completed_at: data.completed_at,
      progress: data.progress || 0
    };
  }

  private broadcastUpdate(update: EnrollmentUpdate): void {
    // Notify enrollment update subscribers
    this.updateCallbacks.forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        console.error('❌ Error in enrollment update callback:', error);
      }
    });

    // Notify admin update subscribers if enrollment needs admin attention
    if (update.type === EnrollmentUpdateType.ENROLLMENT_CREATED) {
      this.adminCallbacks.forEach(callback => {
        try {
          callback(update);
        } catch (error) {
          console.error('❌ Error in admin update callback:', error);
        }
      });
    }
  }

  private dispatchBrowserEvent(update: EnrollmentUpdate): void {
    // Dispatch custom events for cross-tab synchronization
    const eventType = update.type.toLowerCase().replace('_', '-');
    
    window.dispatchEvent(new CustomEvent(eventType, {
      detail: update
    }));

    // Also dispatch generic enrollment update event
    window.dispatchEvent(new CustomEvent('enrollment-update', {
      detail: update
    }));
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.realtimeChannel) {
      this.realtimeChannel.unsubscribe();
      this.realtimeChannel = null;
    }
    
    this.updateCallbacks.clear();
    this.adminCallbacks.clear();
    this.isInitialized = false;
  }
}

// Export singleton instance
export const enrollmentManager = EnrollmentManager.getInstance();

// Export types
export type { IEnrollmentManager, EnrollmentUpdateCallback, AdminUpdateCallback };