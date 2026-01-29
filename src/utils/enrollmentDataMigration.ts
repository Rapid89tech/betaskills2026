import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { logger } from './logger';

/**
 * Enrollment Data Migration Utility
 * 
 * This utility helps migrate existing components from direct localStorage access
 * to using the UnifiedEnrollmentManager as the single source of truth.
 */

/**
 * Legacy localStorage access patterns that should be replaced
 */
export class LegacyEnrollmentAccess {
  /**
   * @deprecated Use unifiedEnrollmentManager.getUserEnrollments() instead
   */
  static getEnrollmentsFromLocalStorage(userId?: string): any[] {
    logger.warn('DEPRECATED: Direct localStorage access detected. Use unifiedEnrollmentManager instead.');
    
    try {
      if (userId) {
        // Try user-specific cache first
        const userCache = localStorage.getItem(`user-enrollments-${userId}`);
        if (userCache) {
          return JSON.parse(userCache);
        }
      }

      // Fallback to global enrollments
      const globalEnrollments = localStorage.getItem('enrollments');
      if (globalEnrollments) {
        const parsed = JSON.parse(globalEnrollments);
        return userId ? parsed.filter((e: any) => e.user_id === userId || e.userId === userId) : parsed;
      }

      return [];
    } catch (error) {
      logger.error('Failed to get enrollments from localStorage:', error);
      return [];
    }
  }

  /**
   * @deprecated Use unifiedEnrollmentManager.updateEnrollment() instead
   */
  static updateEnrollmentInLocalStorage(enrollmentId: string, updates: any): void {
    logger.warn('DEPRECATED: Direct localStorage update detected. Use unifiedEnrollmentManager instead.');
    
    try {
      const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const updatedEnrollments = enrollments.map((e: any) => 
        e.id === enrollmentId ? { ...e, ...updates, updated_at: new Date().toISOString() } : e
      );
      
      localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
      
      // Also update user-specific cache if available
      const enrollment = updatedEnrollments.find((e: any) => e.id === enrollmentId);
      if (enrollment) {
        const userId = enrollment.user_id || enrollment.userId;
        if (userId) {
          const userEnrollments = updatedEnrollments.filter((e: any) => 
            (e.user_id === userId || e.userId === userId)
          );
          localStorage.setItem(`user-enrollments-${userId}`, JSON.stringify(userEnrollments));
        }
      }
    } catch (error) {
      logger.error('Failed to update enrollment in localStorage:', error);
    }
  }

  /**
   * @deprecated Use unifiedEnrollmentManager.createEnrollment() instead
   */
  static addEnrollmentToLocalStorage(enrollment: any): void {
    logger.warn('DEPRECATED: Direct localStorage addition detected. Use unifiedEnrollmentManager instead.');
    
    try {
      const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const newEnrollment = {
        ...enrollment,
        id: enrollment.id || `enrollment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        enrolled_at: enrollment.enrolled_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      enrollments.push(newEnrollment);
      localStorage.setItem('enrollments', JSON.stringify(enrollments));
      
      // Update user-specific cache
      const userId = newEnrollment.user_id || newEnrollment.userId;
      if (userId) {
        const userEnrollments = enrollments.filter((e: any) => 
          (e.user_id === userId || e.userId === userId)
        );
        localStorage.setItem(`user-enrollments-${userId}`, JSON.stringify(userEnrollments));
      }
    } catch (error) {
      logger.error('Failed to add enrollment to localStorage:', error);
    }
  }
}

/**
 * Migration helpers for components
 */
export class EnrollmentMigrationHelpers {
  /**
   * Migrate a component from localStorage access to UnifiedEnrollmentManager
   */
  static async migrateComponentToUnifiedManager(componentName: string): Promise<void> {
    try {
      logger.info(`Migrating component ${componentName} to use UnifiedEnrollmentManager...`);
      
      // Initialize the unified manager if not already done
      await unifiedEnrollmentManager.initialize();
      
      logger.info(`Component ${componentName} migration completed`);
    } catch (error) {
      logger.error(`Failed to migrate component ${componentName}:`, error);
      throw error;
    }
  }

  /**
   * Wrapper function to help components transition gradually
   */
  static async getEnrollmentsWithFallback(userId: string): Promise<any[]> {
    try {
      // Try to use the unified manager first
      const enrollments = await unifiedEnrollmentManager.getUserEnrollments(userId);
      return enrollments;
    } catch (error) {
      logger.warn('UnifiedEnrollmentManager failed, falling back to localStorage:', error);
      // Fallback to legacy access
      return LegacyEnrollmentAccess.getEnrollmentsFromLocalStorage(userId);
    }
  }

  /**
   * Wrapper function for enrollment updates with fallback
   */
  static async updateEnrollmentWithFallback(
    enrollmentId: string, 
    updates: any
  ): Promise<void> {
    try {
      // Try to use the unified manager first
      await unifiedEnrollmentManager.updateEnrollment(enrollmentId, updates);
    } catch (error) {
      logger.warn('UnifiedEnrollmentManager update failed, falling back to localStorage:', error);
      // Fallback to legacy access
      LegacyEnrollmentAccess.updateEnrollmentInLocalStorage(enrollmentId, updates);
    }
  }

  /**
   * Check if a component should use the new unified manager
   */
  static shouldUseUnifiedManager(): boolean {
    // Check if the unified manager is available and initialized
    try {
      return unifiedEnrollmentManager !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get enrollment statistics with fallback
   */
  static async getEnrollmentStatisticsWithFallback(): Promise<any> {
    try {
      return await unifiedEnrollmentManager.getEnrollmentStatistics();
    } catch (error) {
      logger.warn('Failed to get statistics from UnifiedEnrollmentManager, using fallback');
      
      // Fallback calculation
      const allEnrollments = LegacyEnrollmentAccess.getEnrollmentsFromLocalStorage();
      const stats = {
        total: allEnrollments.length,
        pending: 0,
        approved: 0,
        rejected: 0,
        byStatus: {} as Record<string, number>
      };

      allEnrollments.forEach((enrollment: any) => {
        const status = enrollment.status || 'pending';
        stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
        
        switch (status) {
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
    }
  }
}

/**
 * Auto-initialization function to be called on app startup
 */
export const initializeUnifiedEnrollmentSystem = async (): Promise<void> => {
  try {
    logger.info('Initializing unified enrollment system...');
    
    // Initialize the unified enrollment manager
    await unifiedEnrollmentManager.initialize();
    
    // Set up global event listeners for backward compatibility
    setupBackwardCompatibilityEvents();
    
    logger.info('Unified enrollment system initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize unified enrollment system:', error);
    // Don't throw - let the app continue with fallback mechanisms
  }
};

/**
 * Set up events for backward compatibility with existing components
 */
function setupBackwardCompatibilityEvents(): void {
  // Listen for unified manager events and dispatch legacy events
  unifiedEnrollmentManager.addEventListener('enrollment-updated', (event) => {
    const { enrollment, previousStatus, newStatus } = event.detail;
    
    // Dispatch legacy events that existing components might be listening for
    if (previousStatus !== newStatus) {
      window.dispatchEvent(new CustomEvent('enrollment-status-changed', {
        detail: {
          enrollmentId: enrollment.id,
          newStatus: newStatus,
          userEmail: enrollment.user_email,
          enrollment: enrollment
        }
      }));
    }
    
    // Generic enrollment update event
    window.dispatchEvent(new CustomEvent('enrollment-data-updated', {
      detail: { enrollment }
    }));
  });

  unifiedEnrollmentManager.addEventListener('enrollment-created', (event) => {
    const { enrollment } = event.detail;
    
    window.dispatchEvent(new CustomEvent('enrollment-added', {
      detail: { enrollment }
    }));
  });

  unifiedEnrollmentManager.addEventListener('sync-completed', () => {
    window.dispatchEvent(new CustomEvent('enrollments-synced', {
      detail: { timestamp: new Date().toISOString() }
    }));
  });
}

/**
 * Development helper to detect components still using direct localStorage access
 */
export const detectLegacyEnrollmentAccess = (): void => {
  if (import.meta.env.DEV) {
    // Override localStorage methods to detect direct enrollment access
    const originalGetItem = localStorage.getItem;
    const originalSetItem = localStorage.setItem;

    localStorage.getItem = function(key: string) {
      if (key.includes('enrollment')) {
        console.warn(`🚨 LEGACY ACCESS DETECTED: Component accessing localStorage key "${key}" directly. Consider using UnifiedEnrollmentManager.`);
        console.trace('Call stack:');
      }
      return originalGetItem.call(this, key);
    };

    localStorage.setItem = function(key: string, value: string) {
      if (key.includes('enrollment')) {
        console.warn(`🚨 LEGACY WRITE DETECTED: Component writing to localStorage key "${key}" directly. Consider using UnifiedEnrollmentManager.`);
        console.trace('Call stack:');
      }
      return originalSetItem.call(this, key, value);
    };
  }
};