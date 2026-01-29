import { dataManager, EnrollmentData } from './DataManager';
import { logger } from '@/utils/logger';

/**
 * Unified Enrollment Manager
 * 
 * This service acts as the single source of truth for all enrollment operations.
 * It ensures all components use the DataManager instead of directly accessing localStorage.
 * 
 * Key features:
 * - Centralized enrollment data access
 * - Automatic conflict resolution
 * - Cross-tab synchronization
 * - Offline operation queuing
 * - Event-driven updates for UI components
 */
export class UnifiedEnrollmentManager {
  private static instance: UnifiedEnrollmentManager;
  private eventTarget: EventTarget;
  private isInitialized: boolean = false;

  private constructor() {
    this.eventTarget = new EventTarget();
    this.setupEventListeners();
  }

  static getInstance(): UnifiedEnrollmentManager {
    if (!UnifiedEnrollmentManager.instance) {
      UnifiedEnrollmentManager.instance = new UnifiedEnrollmentManager();
    }
    return UnifiedEnrollmentManager.instance;
  }

  /**
   * Initialize the unified enrollment manager
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      logger.info('Initializing Unified Enrollment Manager...');
      
      // Perform initial sync to ensure data consistency
      await dataManager.syncEnrollments();
      
      this.isInitialized = true;
      logger.info('Unified Enrollment Manager initialized successfully');
      
      // Notify components that the manager is ready
      this.dispatchEvent('manager-initialized', {});
    } catch (error) {
      logger.error('Failed to initialize Unified Enrollment Manager:', error);
      throw error;
    }
  }

  /**
   * Get enrollments for a specific user
   * This replaces direct localStorage access
   */
  async getUserEnrollments(userId: string): Promise<EnrollmentData[]> {
    try {
      const enrollments = await dataManager.getEnrollments(userId);
      logger.info(`Retrieved ${enrollments.length} enrollments for user ${userId}`);
      return enrollments;
    } catch (error) {
      logger.error(`Failed to get enrollments for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get all enrollments (admin function)
   */
  async getAllEnrollments(): Promise<EnrollmentData[]> {
    try {
      // Get all unique user IDs from localStorage as fallback
      const allLocalEnrollments = this.getAllLocalEnrollments();
      const userIds = [...new Set(allLocalEnrollments.map(e => e.user_id))];
      
      const allEnrollments: EnrollmentData[] = [];
      
      for (const userId of userIds) {
        if (userId && userId !== 'unknown') {
          const userEnrollments = await dataManager.getEnrollments(userId);
          allEnrollments.push(...userEnrollments);
        }
      }
      
      logger.info(`Retrieved ${allEnrollments.length} total enrollments`);
      return allEnrollments;
    } catch (error) {
      logger.error('Failed to get all enrollments:', error);
      throw error;
    }
  }

  /**
   * Create a new enrollment with enhanced cross-tab sync
   */
  async createEnrollment(enrollmentData: Partial<EnrollmentData>): Promise<EnrollmentData> {
    try {
      const newEnrollment: EnrollmentData = {
        id: enrollmentData.id || `enrollment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        user_id: enrollmentData.user_id!,
        user_email: enrollmentData.user_email,
        course_id: enrollmentData.course_id!,
        course_title: enrollmentData.course_title,
        status: enrollmentData.status || 'pending',
        enrolled_at: enrollmentData.enrolled_at || new Date().toISOString(),
        approved_at: enrollmentData.approved_at,
        updated_at: new Date().toISOString(),
        progress: enrollmentData.progress || 0,
        sync_version: 1,
        conflict_resolution: 'local'
      };

      // Use enhanced DataManager create method
      await dataManager.createEnrollment(newEnrollment);
      
      // Notify components of the new enrollment
      this.dispatchEvent('enrollment-created', { enrollment: newEnrollment });
      
      logger.info(`Created new enrollment with enhanced sync: ${newEnrollment.id}`);
      return newEnrollment;
    } catch (error) {
      logger.error('Failed to create enrollment:', error);
      throw error;
    }
  }

  /**
   * Update an existing enrollment
   */
  async updateEnrollment(enrollmentId: string, updates: Partial<EnrollmentData>): Promise<EnrollmentData> {
    try {
      // Find the existing enrollment
      const existingEnrollment = await this.findEnrollmentById(enrollmentId);
      if (!existingEnrollment) {
        throw new Error(`Enrollment not found: ${enrollmentId}`);
      }

      const updatedEnrollment: EnrollmentData = {
        ...existingEnrollment,
        ...updates,
        updated_at: new Date().toISOString(),
        sync_version: (existingEnrollment.sync_version || 0) + 1
      };

      await dataManager.updateEnrollment(updatedEnrollment);
      
      // Notify components of the update
      this.dispatchEvent('enrollment-updated', { 
        enrollment: updatedEnrollment,
        previousStatus: existingEnrollment.status,
        newStatus: updatedEnrollment.status
      });
      
      logger.info(`Updated enrollment: ${enrollmentId}`);
      return updatedEnrollment;
    } catch (error) {
      logger.error(`Failed to update enrollment ${enrollmentId}:`, error);
      throw error;
    }
  }

  /**
   * Update enrollment status (common operation)
   */
  async updateEnrollmentStatus(
    enrollmentId: string, 
    newStatus: 'pending' | 'approved' | 'rejected',
    userEmail?: string
  ): Promise<EnrollmentData> {
    try {
      const updates: Partial<EnrollmentData> = {
        status: newStatus
      };

      if (newStatus === 'approved') {
        updates.approved_at = new Date().toISOString();
      }

      const updatedEnrollment = await this.updateEnrollment(enrollmentId, updates);
      
      // Dispatch specific status change event for backward compatibility
      this.dispatchEvent('enrollment-status-changed', {
        enrollmentId,
        newStatus,
        userEmail: userEmail || updatedEnrollment.user_email,
        enrollment: updatedEnrollment
      });
      
      return updatedEnrollment;
    } catch (error) {
      logger.error(`Failed to update enrollment status for ${enrollmentId}:`, error);
      throw error;
    }
  }

  /**
   * Check if user is enrolled in a course
   */
  async isUserEnrolledInCourse(userId: string, courseId: string): Promise<boolean> {
    try {
      const userEnrollments = await dataManager.getEnrollments(userId);
      return userEnrollments.some(enrollment => 
        enrollment.course_id === courseId && enrollment.status === 'approved'
      );
    } catch (error) {
      logger.error(`Failed to check enrollment for user ${userId} in course ${courseId}:`, error);
      return false;
    }
  }

  /**
   * Get enrollment by course ID for a user
   */
  async getUserEnrollmentForCourse(userId: string, courseId: string): Promise<EnrollmentData | null> {
    try {
      const userEnrollments = await dataManager.getEnrollments(userId);
      return userEnrollments.find(enrollment => enrollment.course_id === courseId) || null;
    } catch (error) {
      logger.error(`Failed to get enrollment for user ${userId} in course ${courseId}:`, error);
      return null;
    }
  }

  /**
   * Update enrollment progress
   */
  async updateEnrollmentProgress(userId: string, courseId: string, progress: number): Promise<void> {
    try {
      const enrollment = await this.getUserEnrollmentForCourse(userId, courseId);
      if (enrollment) {
        await this.updateEnrollment(enrollment.id, { progress });
        logger.info(`Updated progress for enrollment ${enrollment.id}: ${progress}%`);
      }
    } catch (error) {
      logger.error(`Failed to update progress for user ${userId} in course ${courseId}:`, error);
    }
  }

  /**
   * Delete an enrollment with enhanced cross-tab sync
   */
  async deleteEnrollment(enrollmentId: string): Promise<void> {
    try {
      // Use enhanced DataManager delete method
      await dataManager.deleteEnrollment(enrollmentId);
      
      // Notify components of the deletion
      this.dispatchEvent('enrollment-deleted', { enrollmentId });
      
      logger.info(`Deleted enrollment with enhanced sync: ${enrollmentId}`);
    } catch (error) {
      logger.error('Failed to delete enrollment:', error);
      throw error;
    }
  }

  /**
   * Force synchronization with remote data
   */
  async forceSynchronization(): Promise<void> {
    try {
      logger.info('Forcing enrollment synchronization...');
      await dataManager.syncEnrollments();
      
      // Notify components that sync is complete
      this.dispatchEvent('sync-completed', {});
      
      logger.info('Enrollment synchronization completed');
    } catch (error) {
      logger.error('Failed to force synchronization:', error);
      throw error;
    }
  }

  /**
   * Get offline queue status for monitoring
   */
  getOfflineQueueStatus() {
    return dataManager.getOfflineQueueStatus();
  }

  /**
   * Request cross-tab synchronization
   */
  requestCrossTabSync(): void {
    dataManager.requestCrossTabSync();
  }

  /**
   * Clear offline queue (for debugging/testing)
   */
  clearOfflineQueue(): void {
    dataManager.clearOfflineQueue();
  }

  /**
   * Get enrollment statistics for admin dashboard
   */
  async getEnrollmentStatistics(): Promise<{
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    byStatus: Record<string, number>;
  }> {
    try {
      const allEnrollments = await this.getAllEnrollments();
      
      const stats = {
        total: allEnrollments.length,
        pending: 0,
        approved: 0,
        rejected: 0,
        byStatus: {} as Record<string, number>
      };

      allEnrollments.forEach(enrollment => {
        stats.byStatus[enrollment.status] = (stats.byStatus[enrollment.status] || 0) + 1;
        
        switch (enrollment.status) {
          case 'pending':
            stats.pending++;
            break;
          case 'approved':
            stats.approved++;
            break;
          case 'rejected':
            stats.rejected++;
            break;
        }
      });

      return stats;
    } catch (error) {
      logger.error('Failed to get enrollment statistics:', error);
      throw error;
    }
  }

  /**
   * Event subscription for components
   */
  addEventListener(eventType: string, callback: (event: CustomEvent) => void): void {
    this.eventTarget.addEventListener(eventType, callback as EventListener);
  }

  /**
   * Remove event listener
   */
  removeEventListener(eventType: string, callback: (event: CustomEvent) => void): void {
    this.eventTarget.removeEventListener(eventType, callback as EventListener);
  }

  /**
   * Private helper methods
   */
  private async findEnrollmentById(enrollmentId: string): Promise<EnrollmentData | null> {
    try {
      const allEnrollments = await this.getAllEnrollments();
      return allEnrollments.find(e => e.id === enrollmentId) || null;
    } catch (error) {
      logger.error(`Failed to find enrollment by ID ${enrollmentId}:`, error);
      return null;
    }
  }

  private getAllLocalEnrollments(): any[] {
    try {
      const globalEnrollments = localStorage.getItem('enrollments');
      if (globalEnrollments) {
        return JSON.parse(globalEnrollments);
      }
      return [];
    } catch (error) {
      logger.error('Failed to get local enrollments:', error);
      return [];
    }
  }

  private dispatchEvent(eventType: string, detail: any): void {
    const event = new CustomEvent(eventType, { detail });
    this.eventTarget.dispatchEvent(event);
    
    // Also dispatch on window for backward compatibility
    window.dispatchEvent(event);
  }

  private setupEventListeners(): void {
    // Listen for enhanced cross-tab updates from DataManager
    window.addEventListener('enrollment-created-cross-tab', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.dispatchEvent('enrollment-created', customEvent.detail);
    });

    window.addEventListener('enrollment-updated-cross-tab', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.dispatchEvent('enrollment-updated', customEvent.detail);
    });

    window.addEventListener('enrollment-deleted-cross-tab', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.dispatchEvent('enrollment-deleted', customEvent.detail);
    });

    // Listen for storage updates from DataManager
    window.addEventListener('enrollment-storage-update', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.dispatchEvent('enrollments-refreshed', customEvent.detail);
    });

    window.addEventListener('user-enrollment-storage-update', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.dispatchEvent('user-enrollments-updated', customEvent.detail);
    });

    // Listen for queue processing events
    window.addEventListener('queue-completed', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.dispatchEvent('sync-completed', customEvent.detail);
    });

    window.addEventListener('queue-processed', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.dispatchEvent('sync-progress', customEvent.detail);
    });

    // Legacy support for backward compatibility
    window.addEventListener('enrollment-cross-tab-update', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.dispatchEvent('enrollment-updated', customEvent.detail);
    });
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    // Clean up event listeners and resources
    this.isInitialized = false;
  }
}

// Export singleton instance
export const unifiedEnrollmentManager = UnifiedEnrollmentManager.getInstance();

// Export types for components
export type { EnrollmentData };