/**
 * Automatic Enrollment Data Migration Utility
 * 
 * This utility automatically migrates existing localStorage enrollment data to the
 * UnifiedEnrollmentManager on application startup. It provides progress indicators,
 * error handling, and retry mechanisms for failed migrations.
 */

import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { logger } from '@/utils/logger';

export interface MigrationProgress {
  total: number;
  completed: number;
  failed: number;
  percentage: number;
  currentItem?: string;
  errors: string[];
}

export interface MigrationResult {
  success: boolean;
  migratedCount: number;
  failedCount: number;
  errors: string[];
  duration: number;
  timestamp: string;
}

class AutomaticEnrollmentMigration {
  private static instance: AutomaticEnrollmentMigration;
  private migrationInProgress = false;
  private migrationCompleted = false;
  private progressCallbacks: ((progress: MigrationProgress) => void)[] = [];

  public static getInstance(): AutomaticEnrollmentMigration {
    if (!AutomaticEnrollmentMigration.instance) {
      AutomaticEnrollmentMigration.instance = new AutomaticEnrollmentMigration();
    }
    return AutomaticEnrollmentMigration.instance;
  }

  /**
   * Check if migration has already been completed
   */
  public isMigrationCompleted(): boolean {
    const migrationFlag = localStorage.getItem('enrollment-migration-completed');
    return migrationFlag === 'true' || this.migrationCompleted;
  }

  /**
   * Check if migration is currently in progress
   */
  public isMigrationInProgress(): boolean {
    return this.migrationInProgress;
  }

  /**
   * Add progress callback
   */
  public onProgress(callback: (progress: MigrationProgress) => void): void {
    this.progressCallbacks.push(callback);
  }

  /**
   * Remove progress callback
   */
  public removeProgressCallback(callback: (progress: MigrationProgress) => void): void {
    const index = this.progressCallbacks.indexOf(callback);
    if (index > -1) {
      this.progressCallbacks.splice(index, 1);
    }
  }

  /**
   * Trigger automatic migration on application startup
   */
  public async triggerAutomaticMigration(): Promise<MigrationResult> {
    // Skip if already completed or in progress
    if (this.isMigrationCompleted()) {
      logger.info('✅ Enrollment migration already completed, skipping...');
      return {
        success: true,
        migratedCount: 0,
        failedCount: 0,
        errors: [],
        duration: 0,
        timestamp: new Date().toISOString()
      };
    }

    if (this.migrationInProgress) {
      logger.warn('⚠️ Migration already in progress, skipping...');
      throw new Error('Migration already in progress');
    }

    logger.info('🚀 Starting automatic enrollment data migration...');
    
    const startTime = Date.now();
    this.migrationInProgress = true;

    try {
      // Collect all legacy enrollment data
      const legacyData = await this.collectLegacyEnrollmentData();
      
      if (legacyData.length === 0) {
        logger.info('ℹ️ No legacy enrollment data found to migrate');
        await this.markMigrationCompleted();
        return {
          success: true,
          migratedCount: 0,
          failedCount: 0,
          errors: [],
          duration: Date.now() - startTime,
          timestamp: new Date().toISOString()
        };
      }

      logger.info(`📦 Found ${legacyData.length} legacy enrollment records to migrate`);

      // Migrate data with progress tracking
      const result = await this.migrateEnrollmentData(legacyData);

      // Mark migration as completed if successful
      if (result.success && result.failedCount === 0) {
        await this.markMigrationCompleted();
        await this.cleanupLegacyData();
      }

      const duration = Date.now() - startTime;
      logger.info(`✅ Automatic migration completed in ${duration}ms`);
      logger.info(`   Migrated: ${result.migratedCount}`);
      logger.info(`   Failed: ${result.failedCount}`);

      return {
        ...result,
        duration,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error('❌ Automatic migration failed:', error);
      throw error;
    } finally {
      this.migrationInProgress = false;
    }
  }

  /**
   * Collect all legacy enrollment data from localStorage
   */
  private async collectLegacyEnrollmentData(): Promise<any[]> {
    const legacyData: any[] = [];
    const processedIds = new Set<string>();

    try {
      // Check various localStorage keys for enrollment data
      const enrollmentKeys = [
        'enrollments',
        'user-enrollments',
        'cached-enrollments',
        'emergency-restored-enrollments'
      ];

      // Also check for user-specific keys
      const allKeys = Object.keys(localStorage);
      const userEnrollmentKeys = allKeys.filter(key => 
        key.startsWith('user-enrollments-') || 
        key.startsWith('emergency-restored-enrollments-')
      );

      const allKeysToCheck = [...enrollmentKeys, ...userEnrollmentKeys];

      for (const key of allKeysToCheck) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            const enrollments = Array.isArray(parsed) ? parsed : [parsed];

            // Add unique enrollments
            enrollments.forEach(enrollment => {
              if (enrollment && typeof enrollment === 'object') {
                const id = enrollment.id || `${enrollment.user_id}_${enrollment.course_id}`;
                if (!processedIds.has(id)) {
                  processedIds.add(id);
                  legacyData.push({
                    ...enrollment,
                    _sourceKey: key,
                    _migrationId: id
                  });
                }
              }
            });
          }
        } catch (parseError) {
          logger.warn(`⚠️ Failed to parse data from ${key}:`, parseError);
        }
      }

      logger.info(`📊 Collected ${legacyData.length} unique enrollment records from ${allKeysToCheck.length} localStorage keys`);
      return legacyData;

    } catch (error) {
      logger.error('❌ Failed to collect legacy enrollment data:', error);
      return [];
    }
  }

  /**
   * Migrate enrollment data to UnifiedEnrollmentManager
   */
  private async migrateEnrollmentData(legacyData: any[]): Promise<{
    success: boolean;
    migratedCount: number;
    failedCount: number;
    errors: string[];
  }> {
    let migratedCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    const progress: MigrationProgress = {
      total: legacyData.length,
      completed: 0,
      failed: 0,
      percentage: 0,
      errors: []
    };

    // Notify progress callbacks
    this.notifyProgress(progress);

    for (let i = 0; i < legacyData.length; i++) {
      const legacyEnrollment = legacyData[i];
      
      try {
        progress.currentItem = `${legacyEnrollment.course_title || legacyEnrollment.title || 'Unknown Course'}`;
        this.notifyProgress(progress);

        // Check if enrollment already exists in UnifiedEnrollmentManager
        const existingEnrollment = await this.checkExistingEnrollment(legacyEnrollment);
        
        if (existingEnrollment) {
          logger.info(`ℹ️ Enrollment already exists for course ${legacyEnrollment.course_id}, skipping...`);
          migratedCount++; // Count as migrated since it already exists
        } else {
          // Transform legacy data to UnifiedEnrollmentManager format
          const enrollmentData = this.transformLegacyData(legacyEnrollment);
          
          // Create enrollment in UnifiedEnrollmentManager
          await unifiedEnrollmentManager.createEnrollment(enrollmentData);
          
          logger.info(`✅ Migrated enrollment: ${enrollmentData.course_title}`);
          migratedCount++;
        }

        progress.completed = migratedCount;
        progress.percentage = Math.round((progress.completed / progress.total) * 100);
        this.notifyProgress(progress);

        // Small delay to prevent overwhelming the system
        if (i < legacyData.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }

      } catch (error) {
        const errorMessage = `Failed to migrate enrollment ${legacyEnrollment._migrationId}: ${error}`;
        logger.error('❌', errorMessage);
        errors.push(errorMessage);
        failedCount++;
        
        progress.failed = failedCount;
        progress.errors.push(errorMessage);
        this.notifyProgress(progress);
      }
    }

    const success = failedCount === 0;
    
    logger.info(`📊 Migration summary:`);
    logger.info(`   Total: ${legacyData.length}`);
    logger.info(`   Migrated: ${migratedCount}`);
    logger.info(`   Failed: ${failedCount}`);
    logger.info(`   Success: ${success}`);

    return {
      success,
      migratedCount,
      failedCount,
      errors
    };
  }

  /**
   * Check if enrollment already exists in UnifiedEnrollmentManager
   */
  private async checkExistingEnrollment(legacyEnrollment: any): Promise<boolean> {
    try {
      const userId = legacyEnrollment.user_id;
      const courseId = legacyEnrollment.course_id || legacyEnrollment.courseId;
      
      if (!userId || !courseId) {
        return false;
      }

      const existingEnrollment = await unifiedEnrollmentManager.getUserEnrollmentForCourse(userId, courseId);
      return !!existingEnrollment;
    } catch (error) {
      logger.warn('⚠️ Failed to check existing enrollment:', error);
      return false; // Assume it doesn't exist if we can't check
    }
  }

  /**
   * Transform legacy enrollment data to UnifiedEnrollmentManager format
   */
  private transformLegacyData(legacyEnrollment: any): any {
    return {
      id: legacyEnrollment.id || `migrated_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      user_id: legacyEnrollment.user_id,
      user_email: legacyEnrollment.user_email || legacyEnrollment.userEmail,
      course_id: legacyEnrollment.course_id || legacyEnrollment.courseId,
      course_title: legacyEnrollment.course_title || legacyEnrollment.title || 'Migrated Course',
      status: legacyEnrollment.status || 'approved', // Default to approved for legacy data
      enrolled_at: legacyEnrollment.enrolled_at || legacyEnrollment.enrolledAt || new Date().toISOString(),
      approved_at: legacyEnrollment.approved_at || legacyEnrollment.approvedAt || (legacyEnrollment.status === 'approved' ? new Date().toISOString() : undefined),
      progress: legacyEnrollment.progress || 0,
      proof_of_payment: legacyEnrollment.proof_of_payment || legacyEnrollment.proofOfPayment || 'migrated_from_legacy',
      payment_ref: legacyEnrollment.payment_ref || legacyEnrollment.paymentRef || `migrated_${Date.now()}`,
      payment_date: legacyEnrollment.payment_date || legacyEnrollment.paymentDate || new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Mark migration as completed
   */
  private async markMigrationCompleted(): Promise<void> {
    try {
      localStorage.setItem('enrollment-migration-completed', 'true');
      localStorage.setItem('enrollment-migration-timestamp', new Date().toISOString());
      this.migrationCompleted = true;
      
      logger.info('✅ Migration marked as completed');
    } catch (error) {
      logger.error('❌ Failed to mark migration as completed:', error);
    }
  }

  /**
   * Clean up legacy data after successful migration
   */
  private async cleanupLegacyData(): Promise<void> {
    try {
      logger.info('🧹 Cleaning up legacy enrollment data...');
      
      const keysToRemove = [
        'enrollments',
        'user-enrollments',
        'cached-enrollments'
      ];

      // Also remove user-specific keys (but keep emergency restored ones as backup)
      const allKeys = Object.keys(localStorage);
      const userEnrollmentKeys = allKeys.filter(key => 
        key.startsWith('user-enrollments-') && 
        !key.includes('emergency-restored')
      );

      const allKeysToRemove = [...keysToRemove, ...userEnrollmentKeys];

      for (const key of allKeysToRemove) {
        try {
          localStorage.removeItem(key);
          logger.info(`🗑️ Removed legacy key: ${key}`);
        } catch (error) {
          logger.warn(`⚠️ Failed to remove key ${key}:`, error);
        }
      }

      logger.info('✅ Legacy data cleanup completed');
    } catch (error) {
      logger.error('❌ Failed to cleanup legacy data:', error);
    }
  }

  /**
   * Notify progress callbacks
   */
  private notifyProgress(progress: MigrationProgress): void {
    this.progressCallbacks.forEach(callback => {
      try {
        callback(progress);
      } catch (error) {
        logger.warn('⚠️ Progress callback error:', error);
      }
    });
  }

  /**
   * Force retry migration (for failed migrations)
   */
  public async retryMigration(): Promise<MigrationResult> {
    logger.info('🔄 Retrying enrollment data migration...');
    
    // Reset completion flag
    localStorage.removeItem('enrollment-migration-completed');
    this.migrationCompleted = false;
    
    // Trigger migration again
    return await this.triggerAutomaticMigration();
  }

  /**
   * Get migration status
   */
  public getMigrationStatus(): {
    completed: boolean;
    inProgress: boolean;
    timestamp?: string;
  } {
    const timestamp = localStorage.getItem('enrollment-migration-timestamp');
    
    return {
      completed: this.isMigrationCompleted(),
      inProgress: this.isMigrationInProgress(),
      timestamp: timestamp || undefined
    };
  }

  /**
   * Reset migration state (for testing/debugging)
   */
  public resetMigrationState(): void {
    localStorage.removeItem('enrollment-migration-completed');
    localStorage.removeItem('enrollment-migration-timestamp');
    this.migrationCompleted = false;
    this.migrationInProgress = false;
    
    logger.info('🔄 Migration state reset');
  }
}

// Export singleton instance
export const automaticEnrollmentMigration = AutomaticEnrollmentMigration.getInstance();

// Export types
export type { MigrationProgress, MigrationResult };