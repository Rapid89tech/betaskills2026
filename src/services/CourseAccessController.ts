import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';
import { EnrollmentStatus, PaymentStatus, PaymentType, Enrollment } from '@/types/enrollment';

// Production enrollment interface
export interface ProductionEnrollment extends Enrollment {
  proofOfPaymentUrl?: string;
  rejectionReason?: string;
}
import { getStoredEnrollments, isUserEnrolled, getEnrollmentStatus } from '@/utils/enrollmentPersistence';

export interface CourseAccessResult {
  hasAccess: boolean;
  reason?: string;
  enrollmentStatus?: EnrollmentStatus;
  paymentStatus?: PaymentStatus;
  accessLevel?: AccessLevel;
  grantedAt?: Date;
  source?: AccessSource;
}

export interface AccessValidationResult {
  isValid: boolean;
  enrollment?: ProductionEnrollment;
  error?: string;
  localEnrollment?: any;
}

export interface AccessRevocationResult {
  success: boolean;
  enrollmentId?: string;
  error?: string;
}

export interface ImmediateAccessResult {
  accessGranted: boolean;
  grantedAt: Date;
  courseId: string;
  userId: string;
  accessLevel: AccessLevel;
  source: AccessSource;
  error?: string;
}

export interface AccessCacheEntry {
  hasAccess: boolean;
  accessLevel: AccessLevel;
  timestamp: number;
  source: AccessSource;
  enrollmentStatus?: EnrollmentStatus;
  paymentStatus?: PaymentStatus;
}

export enum AccessLevel {
  FULL = 'full',
  LIMITED = 'limited',
  PREVIEW = 'preview',
  NONE = 'none'
}

export enum AccessSource {
  CARD_PAYMENT_IMMEDIATE = 'card_payment_immediate',
  ADMIN_APPROVAL = 'admin_approval',
  DATABASE_ENROLLMENT = 'database_enrollment',
  LOCAL_STORAGE = 'local_storage',
  SYSTEM_OVERRIDE = 'system_override'
}

/**
 * Enhanced CourseAccessController manages course content access with immediate card payment support
 * 
 * Key responsibilities:
 * - Validate enrollment status with card payment recognition (Requirement 7.1)
 * - Grant immediate access without page refresh requirements (Requirement 7.2)
 * - Persist access across browser sessions and devices (Requirement 7.3)
 * - Provide access validation caching for performance (Requirement 7.4)
 * - Integrate with card payment fast-track approval system
 */
export class CourseAccessController {
  private static instance: CourseAccessController;
  private accessCache: Map<string, AccessCacheEntry> = new Map();
  private cacheTimeout = 2 * 60 * 1000; // 2 minutes for faster updates
  private persistentAccessCache: Map<string, AccessCacheEntry> = new Map();

  static getInstance(): CourseAccessController {
    if (!CourseAccessController.instance) {
      CourseAccessController.instance = new CourseAccessController();
    }
    return CourseAccessController.instance;
  }

  /**
   * Enhanced course access check with card payment recognition
   * Requirements: 7.1, 7.2, 7.3, 7.4
   */
  async canAccessCourse(courseId: string, userId: string): Promise<CourseAccessResult> {
    try {
      logger.info('Checking enhanced course access', { courseId, userId });

      // Check cache first (Requirement 7.4)
      const cacheKey = `${userId}-${courseId}`;
      const cached = this.accessCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        logger.debug('Returning cached access result', { 
          courseId, 
          userId, 
          hasAccess: cached.hasAccess,
          source: cached.source 
        });
        return { 
          hasAccess: cached.hasAccess,
          accessLevel: cached.accessLevel,
          source: cached.source,
          enrollmentStatus: cached.enrollmentStatus,
          paymentStatus: cached.paymentStatus
        };
      }

      // 1. Check local storage for immediate card payment approvals (Requirement 7.1)
      const localAccessResult = await this.checkLocalStorageAccess(courseId, userId);
      if (localAccessResult.hasAccess) {
        this.cacheAccessResult(cacheKey, localAccessResult);
        return localAccessResult;
      }

      // 2. Check database enrollment with enhanced validation
      const validation = await this.validateEnrollmentAccessEnhanced(courseId, userId);
      if (!validation.isValid) {
        // If no database enrollment but local storage indicates access, trust local storage
        if (validation.localEnrollment && validation.localEnrollment.status === 'approved') {
          const localResult: CourseAccessResult = {
            hasAccess: true,
            accessLevel: AccessLevel.FULL,
            source: AccessSource.LOCAL_STORAGE,
            enrollmentStatus: EnrollmentStatus.APPROVED,
            reason: 'Access granted via local storage (card payment)'
          };
          this.cacheAccessResult(cacheKey, localResult);
          return localResult;
        }

        logger.warn('Enhanced enrollment validation failed', { courseId, userId, error: validation.error });
        const failResult: CourseAccessResult = {
          hasAccess: false,
          accessLevel: AccessLevel.NONE,
          source: AccessSource.DATABASE_ENROLLMENT,
          reason: validation.error || 'Invalid enrollment'
        };
        this.cacheAccessResult(cacheKey, failResult);
        return failResult;
      }

      const enrollment = validation.enrollment!;
      const accessResult = this.determineAccessFromEnrollmentEnhanced(enrollment);

      // Cache the result (Requirement 7.4)
      this.cacheAccessResult(cacheKey, accessResult);

      // Persist access for cross-session availability (Requirement 7.3)
      if (accessResult.hasAccess) {
        this.persistAccessAcrossSessions(userId, courseId, accessResult);
      }

      logger.info('Enhanced course access determined', {
        courseId,
        userId,
        hasAccess: accessResult.hasAccess,
        accessLevel: accessResult.accessLevel,
        source: accessResult.source,
        enrollmentStatus: enrollment.status,
        paymentStatus: enrollment.payment_status
      });

      return accessResult;
    } catch (error) {
      logger.error('Error checking enhanced course access', { courseId, userId, error });
      return {
        hasAccess: false,
        accessLevel: AccessLevel.NONE,
        source: AccessSource.DATABASE_ENROLLMENT,
        reason: 'System error checking access'
      };
    }
  }

  /**
   * Check local storage for immediate card payment access (Requirement 7.1)
   */
  private async checkLocalStorageAccess(courseId: string, userId: string): Promise<CourseAccessResult> {
    try {
      // Check if user is enrolled via local storage (card payment approvals)
      const isEnrolled = isUserEnrolled(courseId, userId);
      const enrollmentStatus = getEnrollmentStatus(courseId, userId);
      
      if (isEnrolled && enrollmentStatus === 'enrolled') {
        // Check for recent card payment approval
        const recentPaymentKey = `recent-payment-${userId}-${courseId}`;
        const recentPayment = localStorage.getItem(recentPaymentKey);
        
        if (recentPayment) {
          try {
            const paymentData = JSON.parse(recentPayment);
            const paymentTime = new Date(paymentData.timestamp).getTime();
            const now = Date.now();
            const tenMinutes = 10 * 60 * 1000; // 10 minutes
            
            if (now - paymentTime < tenMinutes) {
              logger.info('Card payment immediate access granted', { 
                courseId, 
                userId, 
                paymentReference: paymentData.paymentReference 
              });
              
              return {
                hasAccess: true,
                accessLevel: AccessLevel.FULL,
                source: AccessSource.CARD_PAYMENT_IMMEDIATE,
                enrollmentStatus: EnrollmentStatus.APPROVED,
                paymentStatus: PaymentStatus.COMPLETED,
                grantedAt: new Date(paymentData.timestamp),
                reason: 'Immediate access via card payment'
              };
            }
          } catch (error) {
            logger.warn('Error parsing recent payment data:', error);
          }
        }

        // Check for enrollment success flag
        const enrollmentSuccessKey = `enrollment-success-${userId}-${courseId}`;
        const enrollmentSuccess = localStorage.getItem(enrollmentSuccessKey);
        
        if (enrollmentSuccess) {
          try {
            const successData = JSON.parse(enrollmentSuccess);
            if (successData.status === 'approved') {
              logger.info('Local storage enrollment access granted', { courseId, userId });
              
              return {
                hasAccess: true,
                accessLevel: AccessLevel.FULL,
                source: AccessSource.LOCAL_STORAGE,
                enrollmentStatus: EnrollmentStatus.APPROVED,
                reason: 'Access granted via local enrollment data'
              };
            }
          } catch (error) {
            logger.warn('Error parsing enrollment success data:', error);
          }
        }

        // General local storage enrollment check
        logger.info('General local storage access granted', { courseId, userId });
        return {
          hasAccess: true,
          accessLevel: AccessLevel.FULL,
          source: AccessSource.LOCAL_STORAGE,
          enrollmentStatus: EnrollmentStatus.APPROVED,
          reason: 'Access granted via local enrollment status'
        };
      }

      return {
        hasAccess: false,
        accessLevel: AccessLevel.NONE,
        source: AccessSource.LOCAL_STORAGE,
        reason: 'No local enrollment found'
      };
    } catch (error) {
      logger.error('Error checking local storage access', { courseId, userId, error });
      return {
        hasAccess: false,
        accessLevel: AccessLevel.NONE,
        source: AccessSource.LOCAL_STORAGE,
        reason: 'Error checking local storage'
      };
    }
  }

  /**
   * Enhanced enrollment validation with local storage fallback
   * Requirements: 7.1, 7.3
   */
  private async validateEnrollmentAccessEnhanced(courseId: string, userId: string): Promise<AccessValidationResult> {
    try {
      // First check local storage for enrollment data
      const localEnrollments = getStoredEnrollments(userId);
      const localEnrollment = localEnrollments.find(e => 
        e.course_id === courseId && (e.user_id === userId || e.user_email === userId)
      );

      // Try database enrollment
      const { data: enrollment, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('course_id', courseId)
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No database enrollment, but check if local enrollment exists
          if (localEnrollment && localEnrollment.status === 'approved') {
            logger.info('Using local enrollment data as fallback', { courseId, userId });
            return {
              isValid: true,
              localEnrollment,
              error: 'No database enrollment, using local data'
            };
          }
          
          return {
            isValid: false,
            localEnrollment,
            error: 'No enrollment found in database or local storage'
          };
        }
        throw error;
      }

      if (!enrollment) {
        if (localEnrollment && localEnrollment.status === 'approved') {
          return {
            isValid: true,
            localEnrollment,
            error: 'No database enrollment, using local data'
          };
        }
        
        return {
          isValid: false,
          localEnrollment,
          error: 'No enrollment record found'
        };
      }

      return {
        isValid: true,
        enrollment: enrollment as ProductionEnrollment,
        localEnrollment
      };
    } catch (error) {
      logger.error('Error validating enhanced enrollment access', { courseId, userId, error });
      
      // Fallback to local enrollment if database fails
      const localEnrollments = getStoredEnrollments(userId);
      const localEnrollment = localEnrollments.find(e => 
        e.course_id === courseId && (e.user_id === userId || e.user_email === userId)
      );
      
      if (localEnrollment && localEnrollment.status === 'approved') {
        return {
          isValid: true,
          localEnrollment,
          error: 'Database error, using local enrollment data'
        };
      }
      
      return {
        isValid: false,
        localEnrollment,
        error: 'Database error during validation'
      };
    }
  }

  /**
   * Enhanced access determination with card payment recognition
   * Requirements: 7.1, 7.2
   */
  private determineAccessFromEnrollmentEnhanced(enrollment: ProductionEnrollment): CourseAccessResult {
    // Check if access is explicitly granted
    if (enrollment.course_access_granted) {
      return {
        hasAccess: true,
        accessLevel: AccessLevel.FULL,
        source: AccessSource.DATABASE_ENROLLMENT,
        enrollmentStatus: enrollment.status,
        paymentStatus: enrollment.payment_status,
        grantedAt: enrollment.access_granted_at ? new Date(enrollment.access_granted_at) : undefined
      };
    }

    // Enhanced card payment recognition (Requirement 7.1)
    if (enrollment.status === EnrollmentStatus.APPROVED) {
      // Check for card payment type - immediate access
      if (enrollment.payment_type === PaymentType.CARD && enrollment.payment_status === PaymentStatus.COMPLETED) {
        return {
          hasAccess: true,
          accessLevel: AccessLevel.FULL,
          source: AccessSource.CARD_PAYMENT_IMMEDIATE,
          enrollmentStatus: enrollment.status,
          paymentStatus: enrollment.payment_status,
          grantedAt: enrollment.approved_at ? new Date(enrollment.approved_at) : new Date(),
          reason: 'Immediate access via card payment'
        };
      }

      // Regular approved enrollment with completed payment
      if (enrollment.payment_status === PaymentStatus.COMPLETED) {
        return {
          hasAccess: true,
          accessLevel: AccessLevel.FULL,
          source: AccessSource.ADMIN_APPROVAL,
          enrollmentStatus: enrollment.status,
          paymentStatus: enrollment.payment_status,
          grantedAt: enrollment.approved_at ? new Date(enrollment.approved_at) : undefined
        };
      } else {
        return {
          hasAccess: false,
          accessLevel: AccessLevel.NONE,
          source: AccessSource.DATABASE_ENROLLMENT,
          reason: 'Payment not completed',
          enrollmentStatus: enrollment.status,
          paymentStatus: enrollment.payment_status
        };
      }
    }

    // Handle other enrollment statuses
    switch (enrollment.status) {
      case EnrollmentStatus.PENDING:
        // Check if it's a card payment that should have immediate access
        if (enrollment.payment_type === PaymentType.CARD && enrollment.payment_status === PaymentStatus.COMPLETED) {
          logger.warn('Card payment completed but enrollment still pending - granting access', {
            enrollmentId: enrollment.id,
            paymentType: enrollment.payment_type
          });
          
          return {
            hasAccess: true,
            accessLevel: AccessLevel.FULL,
            source: AccessSource.CARD_PAYMENT_IMMEDIATE,
            enrollmentStatus: enrollment.status,
            paymentStatus: enrollment.payment_status,
            reason: 'Card payment completed - immediate access granted'
          };
        }
        
        return {
          hasAccess: false,
          accessLevel: AccessLevel.NONE,
          source: AccessSource.DATABASE_ENROLLMENT,
          reason: 'Enrollment pending approval',
          enrollmentStatus: enrollment.status,
          paymentStatus: enrollment.payment_status
        };

      case EnrollmentStatus.REJECTED:
        return {
          hasAccess: false,
          accessLevel: AccessLevel.NONE,
          source: AccessSource.DATABASE_ENROLLMENT,
          reason: enrollment.rejection_reason || 'Enrollment rejected',
          enrollmentStatus: enrollment.status,
          paymentStatus: enrollment.payment_status
        };

      default:
        return {
          hasAccess: false,
          accessLevel: AccessLevel.NONE,
          source: AccessSource.DATABASE_ENROLLMENT,
          reason: 'Invalid enrollment status',
          enrollmentStatus: enrollment.status,
          paymentStatus: enrollment.payment_status
        };
    }
  }

  /**
   * Grant immediate course access without page refresh (Requirement 7.2)
   */
  async grantImmediateAccess(
    userId: string,
    courseId: string,
    source: AccessSource = AccessSource.CARD_PAYMENT_IMMEDIATE
  ): Promise<ImmediateAccessResult> {
    try {
      logger.info('Granting immediate course access', { userId, courseId, source });

      const grantedAt = new Date();
      const accessResult: ImmediateAccessResult = {
        accessGranted: true,
        grantedAt,
        courseId,
        userId,
        accessLevel: AccessLevel.FULL,
        source
      };

      // Update cache immediately (Requirement 7.2)
      const cacheKey = `${userId}-${courseId}`;
      const cacheEntry: AccessCacheEntry = {
        hasAccess: true,
        accessLevel: AccessLevel.FULL,
        timestamp: Date.now(),
        source,
        enrollmentStatus: EnrollmentStatus.APPROVED,
        paymentStatus: PaymentStatus.COMPLETED
      };
      
      this.accessCache.set(cacheKey, cacheEntry);

      // Persist across sessions (Requirement 7.3)
      this.persistAccessAcrossSessions(userId, courseId, {
        hasAccess: true,
        accessLevel: AccessLevel.FULL,
        source,
        enrollmentStatus: EnrollmentStatus.APPROVED,
        paymentStatus: PaymentStatus.COMPLETED,
        grantedAt
      });

      // Store immediate access flag in localStorage
      const immediateAccessKey = `immediate-access-${userId}-${courseId}`;
      const immediateAccessData = {
        granted: true,
        grantedAt: grantedAt.toISOString(),
        source,
        accessLevel: AccessLevel.FULL
      };
      localStorage.setItem(immediateAccessKey, JSON.stringify(immediateAccessData));

      // Broadcast access granted event for real-time UI updates
      this.broadcastAccessUpdate(userId, courseId, true, source);

      logger.info('Immediate course access granted successfully', { 
        userId, 
        courseId, 
        source,
        grantedAt: grantedAt.toISOString()
      });

      return accessResult;
    } catch (error) {
      logger.error('Error granting immediate access', { userId, courseId, source, error });
      return {
        accessGranted: false,
        grantedAt: new Date(),
        courseId,
        userId,
        accessLevel: AccessLevel.NONE,
        source,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Persist access across browser sessions and devices (Requirement 7.3)
   */
  private persistAccessAcrossSessions(
    userId: string, 
    courseId: string, 
    accessResult: CourseAccessResult
  ): void {
    try {
      // Store in persistent cache
      const persistentKey = `${userId}-${courseId}`;
      const persistentEntry: AccessCacheEntry = {
        hasAccess: accessResult.hasAccess,
        accessLevel: accessResult.accessLevel || AccessLevel.NONE,
        timestamp: Date.now(),
        source: accessResult.source || AccessSource.DATABASE_ENROLLMENT,
        enrollmentStatus: accessResult.enrollmentStatus,
        paymentStatus: accessResult.paymentStatus
      };
      
      this.persistentAccessCache.set(persistentKey, persistentEntry);

      // Store in localStorage for cross-session persistence
      const persistentAccessKey = `persistent-access-${userId}-${courseId}`;
      const persistentData = {
        hasAccess: accessResult.hasAccess,
        accessLevel: accessResult.accessLevel,
        source: accessResult.source,
        enrollmentStatus: accessResult.enrollmentStatus,
        paymentStatus: accessResult.paymentStatus,
        grantedAt: accessResult.grantedAt?.toISOString(),
        persistedAt: new Date().toISOString()
      };
      
      localStorage.setItem(persistentAccessKey, JSON.stringify(persistentData));

      // Also store in sessionStorage as backup
      sessionStorage.setItem(persistentAccessKey, JSON.stringify(persistentData));

      logger.debug('Access persisted across sessions', { userId, courseId, hasAccess: accessResult.hasAccess });
    } catch (error) {
      logger.error('Error persisting access across sessions', { userId, courseId, error });
    }
  }

  /**
   * Broadcast access update for real-time UI updates
   */
  private broadcastAccessUpdate(
    userId: string, 
    courseId: string, 
    hasAccess: boolean, 
    source: AccessSource
  ): void {
    try {
      // Dispatch custom event for real-time updates
      const event = new CustomEvent('course-access-updated', {
        detail: {
          userId,
          courseId,
          hasAccess,
          source,
          timestamp: new Date().toISOString()
        }
      });
      
      window.dispatchEvent(event);

      // Also dispatch legacy events for backward compatibility
      window.dispatchEvent(new CustomEvent('enrollment-status-refresh', {
        detail: { 
          courseId, 
          timestamp: new Date().toISOString() 
        }
      }));

      if (hasAccess) {
        window.dispatchEvent(new CustomEvent('course-access-granted', {
          detail: { 
            userId,
            courseId, 
            source,
            timestamp: new Date().toISOString() 
          }
        }));
      }

      logger.debug('Broadcasted access update', { userId, courseId, hasAccess, source });
    } catch (error) {
      logger.error('Error broadcasting access update', { userId, courseId, error });
    }
  }

  /**
   * Cache access result with performance optimization (Requirement 7.4)
   */
  private cacheAccessResult(cacheKey: string, accessResult: CourseAccessResult): void {
    try {
      const cacheEntry: AccessCacheEntry = {
        hasAccess: accessResult.hasAccess,
        accessLevel: accessResult.accessLevel || AccessLevel.NONE,
        timestamp: Date.now(),
        source: accessResult.source || AccessSource.DATABASE_ENROLLMENT,
        enrollmentStatus: accessResult.enrollmentStatus,
        paymentStatus: accessResult.paymentStatus
      };
      
      this.accessCache.set(cacheKey, cacheEntry);
      
      // Also cache in persistent storage for longer retention
      if (accessResult.hasAccess) {
        this.persistentAccessCache.set(cacheKey, cacheEntry);
      }

      logger.debug('Access result cached', { cacheKey, hasAccess: accessResult.hasAccess });
    } catch (error) {
      logger.error('Error caching access result', { cacheKey, error });
    }
  }

  /**
   * Automatically grant access for approved enrollments
   * Requirements: 2.2, 3.4, 7.1, 7.2
   */
  async grantCourseAccess(enrollmentId: string): Promise<AccessRevocationResult> {
    try {
      logger.info('Granting course access', { enrollmentId });

      const { data: enrollment, error: fetchError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('id', enrollmentId)
        .single();

      if (fetchError || !enrollment) {
        logger.error('Error fetching enrollment for access grant', { enrollmentId, error: fetchError });
        return {
          success: false,
          error: 'Enrollment not found'
        };
      }

      // Verify enrollment is approved and payment is completed
      if (enrollment.status !== EnrollmentStatus.APPROVED) {
        logger.warn('Cannot grant access to non-approved enrollment', { enrollmentId, status: enrollment.status });
        return {
          success: false,
          error: 'Enrollment not approved'
        };
      }

      if (enrollment.payment_status !== PaymentStatus.COMPLETED) {
        logger.warn('Cannot grant access without completed payment', { enrollmentId, paymentStatus: enrollment.payment_status });
        return {
          success: false,
          error: 'Payment not completed'
        };
      }

      // Grant access
      const { error: updateError } = await supabase
        .from('enrollments')
        .update({
          course_access_granted: true,
          access_granted_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId);

      if (updateError) {
        logger.error('Error granting course access', { enrollmentId, error: updateError });
        return {
          success: false,
          error: 'Database error granting access'
        };
      }

      // Clear cache for this user-course combination
      this.clearAccessCache(enrollment.user_id, enrollment.course_id);

      // Grant immediate access for card payments
      if (enrollment.payment_type === PaymentType.CARD) {
        await this.grantImmediateAccess(
          enrollment.user_id, 
          enrollment.course_id, 
          AccessSource.CARD_PAYMENT_IMMEDIATE
        );
      }

      logger.info('Course access granted successfully', { enrollmentId });
      return {
        success: true,
        enrollmentId
      };
    } catch (error) {
      logger.error('Error in grantCourseAccess', { enrollmentId, error });
      return {
        success: false,
        error: 'System error granting access'
      };
    }
  }

  /**
   * Revoke access for rejected or expired enrollments
   * Requirements: 2.2, 6.4
   */
  async revokeCourseAccess(enrollmentId: string, reason?: string): Promise<AccessRevocationResult> {
    try {
      logger.info('Revoking course access', { enrollmentId, reason });

      const { data: enrollment, error: fetchError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('id', enrollmentId)
        .single();

      if (fetchError || !enrollment) {
        logger.error('Error fetching enrollment for access revocation', { enrollmentId, error: fetchError });
        return {
          success: false,
          error: 'Enrollment not found'
        };
      }

      // Revoke access
      const { error: updateError } = await supabase
        .from('enrollments')
        .update({
          course_access_granted: false,
          access_granted_at: null,
          updated_at: new Date().toISOString(),
          ...(reason && { rejection_reason: reason })
        })
        .eq('id', enrollmentId);

      if (updateError) {
        logger.error('Error revoking course access', { enrollmentId, error: updateError });
        return {
          success: false,
          error: 'Database error revoking access'
        };
      }

      // Clear cache for this user-course combination
      this.clearAccessCache(enrollment.user_id, enrollment.course_id);

      logger.info('Course access revoked successfully', { enrollmentId, reason });
      return {
        success: true,
        enrollmentId
      };
    } catch (error) {
      logger.error('Error in revokeCourseAccess', { enrollmentId, error });
      return {
        success: false,
        error: 'System error revoking access'
      };
    }
  }

  /**
   * Bulk grant access for multiple approved enrollments
   * Requirements: 2.2, 3.4
   */
  async bulkGrantAccess(enrollmentIds: string[]): Promise<{ success: string[]; failed: { id: string; error: string }[] }> {
    logger.info('Bulk granting course access', { count: enrollmentIds.length });

    const results = await Promise.allSettled(
      enrollmentIds.map(id => this.grantCourseAccess(id))
    );

    const success: string[] = [];
    const failed: { id: string; error: string }[] = [];

    results.forEach((result, index) => {
      const enrollmentId = enrollmentIds[index];
      if (result.status === 'fulfilled' && result.value.success) {
        success.push(enrollmentId);
      } else {
        const error = result.status === 'fulfilled' 
          ? result.value.error || 'Unknown error'
          : 'Promise rejected';
        failed.push({ id: enrollmentId, error });
      }
    });

    logger.info('Bulk access grant completed', { 
      total: enrollmentIds.length, 
      success: success.length, 
      failed: failed.length 
    });

    return { success, failed };
  }

  /**
   * Check if enrollment has expired and should lose access
   * Requirements: 6.4
   */
  async checkEnrollmentExpiry(enrollmentId: string, expiryDays: number = 365): Promise<boolean> {
    try {
      const { data: enrollment, error } = await supabase
        .from('enrollments')
        .select('created_at, access_granted_at')
        .eq('id', enrollmentId)
        .single();

      if (error || !enrollment) {
        logger.error('Error checking enrollment expiry', { enrollmentId, error });
        return false;
      }

      const grantedAt = enrollment.access_granted_at || enrollment.created_at;
      const expiryDate = new Date(grantedAt);
      expiryDate.setDate(expiryDate.getDate() + expiryDays);

      const isExpired = new Date() > expiryDate;
      
      if (isExpired) {
        logger.info('Enrollment has expired', { enrollmentId, grantedAt, expiryDate });
        // Automatically revoke access for expired enrollments
        await this.revokeCourseAccess(enrollmentId, 'Enrollment expired');
      }

      return isExpired;
    } catch (error) {
      logger.error('Error in checkEnrollmentExpiry', { enrollmentId, error });
      return false;
    }
  }

  /**
   * Get access status for multiple courses for a user
   * Requirements: 3.4, 6.4
   */
  async getUserCourseAccess(userId: string, courseIds: string[]): Promise<Record<string, CourseAccessResult>> {
    logger.info('Getting user course access for multiple courses', { userId, courseCount: courseIds.length });

    const results = await Promise.allSettled(
      courseIds.map(courseId => 
        this.canAccessCourse(courseId, userId).then(result => ({ courseId, result }))
      )
    );

    const accessMap: Record<string, CourseAccessResult> = {};

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        const { courseId, result: accessResult } = result.value;
        accessMap[courseId] = accessResult;
      }
    });

    return accessMap;
  }

  /**
   * Clear access cache for specific user-course combination
   */
  private clearAccessCache(userId: string, courseId: string): void {
    const cacheKey = `${userId}-${courseId}`;
    this.accessCache.delete(cacheKey);
    this.persistentAccessCache.delete(cacheKey);
    
    // Also clear localStorage cache
    try {
      localStorage.removeItem(`persistent-access-${userId}-${courseId}`);
      sessionStorage.removeItem(`persistent-access-${userId}-${courseId}`);
    } catch (error) {
      logger.warn('Error clearing localStorage cache', { userId, courseId, error });
    }
    
    logger.debug('Cleared access cache', { userId, courseId });
  }

  /**
   * Clear all access cache
   */
  clearAllCache(): void {
    this.accessCache.clear();
    this.persistentAccessCache.clear();
    logger.info('Cleared all access cache');
  }

  /**
   * Refresh access cache from persistent storage (Requirement 7.3)
   */
  refreshCacheFromPersistentStorage(userId: string, courseId: string): boolean {
    try {
      const persistentAccessKey = `persistent-access-${userId}-${courseId}`;
      const persistentData = localStorage.getItem(persistentAccessKey);
      
      if (persistentData) {
        const accessData = JSON.parse(persistentData);
        const cacheKey = `${userId}-${courseId}`;
        
        const cacheEntry: AccessCacheEntry = {
          hasAccess: accessData.hasAccess,
          accessLevel: accessData.accessLevel || AccessLevel.NONE,
          timestamp: Date.now(), // Refresh timestamp
          source: accessData.source || AccessSource.LOCAL_STORAGE,
          enrollmentStatus: accessData.enrollmentStatus,
          paymentStatus: accessData.paymentStatus
        };
        
        this.accessCache.set(cacheKey, cacheEntry);
        this.persistentAccessCache.set(cacheKey, cacheEntry);
        
        logger.debug('Refreshed cache from persistent storage', { userId, courseId, hasAccess: accessData.hasAccess });
        return true;
      }
      
      return false;
    } catch (error) {
      logger.error('Error refreshing cache from persistent storage', { userId, courseId, error });
      return false;
    }
  }

  /**
   * Get cache statistics for monitoring (Requirement 7.4)
   */
  getCacheStats(): { 
    size: number; 
    keys: string[]; 
    persistentSize: number;
    persistentKeys: string[];
    hitRate?: number;
  } {
    return {
      size: this.accessCache.size,
      keys: Array.from(this.accessCache.keys()),
      persistentSize: this.persistentAccessCache.size,
      persistentKeys: Array.from(this.persistentAccessCache.keys())
    };
  }

  /**
   * Validate and clean expired cache entries (Requirement 7.4)
   */
  cleanExpiredCache(): void {
    const now = Date.now();
    let cleanedCount = 0;
    
    // Clean regular cache
    for (const [key, entry] of this.accessCache.entries()) {
      if (now - entry.timestamp > this.cacheTimeout) {
        this.accessCache.delete(key);
        cleanedCount++;
      }
    }
    
    // Clean persistent cache (longer timeout)
    const persistentTimeout = 24 * 60 * 60 * 1000; // 24 hours
    for (const [key, entry] of this.persistentAccessCache.entries()) {
      if (now - entry.timestamp > persistentTimeout) {
        this.persistentAccessCache.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      logger.info(`Cleaned ${cleanedCount} expired cache entries`);
    }
  }
}

export const courseAccessController = CourseAccessController.getInstance();