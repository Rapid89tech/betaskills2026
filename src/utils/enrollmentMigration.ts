import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { logger } from '@/utils/logger';
import { legacyAccessMonitor } from '@/utils/legacyAccessMonitor';

// Migration status tracking
export interface MigrationStatus {
  isRunning: boolean;
  progress: number;
  currentStep: string;
  totalSteps: number;
  completedSteps: number;
  errors: MigrationError[];
  startTime?: Date;
  endTime?: Date;
}

export interface MigrationError {
  step: string;
  error: string;
  timestamp: Date;
  retryable: boolean;
}

export interface MigrationResult {
  success: boolean;
  migratedCount: number;
  skippedCount: number;
  errorCount: number;
  duration: number;
  errors: MigrationError[];
}

// Legacy enrollment data structure (from localStorage)
interface LegacyEnrollment {
  id?: string;
  course_id?: string;
  courseId?: string;
  user_id?: string;
  userId?: string;
  user_email?: string;
  userEmail?: string;
  course_title?: string;
  courseTitle?: string;
  status?: string;
  progress?: number;
  enrollment_date?: string;
  enrolled_at?: string;
  created_at?: string;
  updated_at?: string;
  payment_proof?: string;
  payment_reference?: string;
  payment_date?: string;
}

class EnrollmentMigrationManager {
  private status: MigrationStatus = {
    isRunning: false,
    progress: 0,
    currentStep: '',
    totalSteps: 5,
    completedSteps: 0,
    errors: []
  };

  private statusListeners: ((status: MigrationStatus) => void)[] = [];

  // Subscribe to migration status updates
  public onStatusUpdate(callback: (status: MigrationStatus) => void): () => void {
    this.statusListeners.push(callback);
    return () => {
      const index = this.statusListeners.indexOf(callback);
      if (index > -1) {
        this.statusListeners.splice(index, 1);
      }
    };
  }

  // Get current migration status
  public getStatus(): MigrationStatus {
    return { ...this.status };
  }

  // Update status and notify listeners
  private updateStatus(updates: Partial<MigrationStatus>): void {
    this.status = { ...this.status, ...updates };
    this.statusListeners.forEach(callback => callback(this.status));
  }

  // Add error to migration status
  private addError(step: string, error: string, retryable: boolean = true): void {
    const migrationError: MigrationError = {
      step,
      error,
      timestamp: new Date(),
      retryable
    };
    
    this.updateStatus({
      errors: [...this.status.errors, migrationError]
    });
  }

  // Check if migration is needed
  public async isMigrationNeeded(): Promise<boolean> {
    try {
      logger.info('🔍 Checking if enrollment migration is needed...');

      // Check for legacy localStorage data
      const hasLegacyData = this.hasLegacyLocalStorageData();
      
      if (!hasLegacyData) {
        logger.info('✅ No legacy localStorage data found, migration not needed');
        return false;
      }

      // Check if data has already been migrated
      const migrationMarker = localStorage.getItem('enrollment_migration_completed');
      if (migrationMarker) {
        logger.info('✅ Enrollment migration already completed');
        return false;
      }

      logger.info('🔄 Enrollment migration needed');
      return true;
    } catch (error) {
      logger.error('❌ Error checking migration status:', error);
      return false;
    }
  }

  // Check for legacy localStorage data
  private hasLegacyLocalStorageData(): boolean {
    const enrollmentKeys = [
      'enrollments',
      'user-enrollments',
      'emergency-restored-enrollments'
    ];

    for (const key of enrollmentKeys) {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            logger.info(`📦 Found legacy data in localStorage key: ${key}`);
            return true;
          }
        } catch (error) {
          logger.warn(`⚠️ Failed to parse localStorage key ${key}:`, error);
        }
      }
    }

    // Check for user-specific enrollment data
    const userId = this.getCurrentUserId();
    if (userId) {
      const userEnrollmentKey = `user-enrollments-${userId}`;
      const userData = localStorage.getItem(userEnrollmentKey);
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            logger.info(`📦 Found user-specific legacy data: ${userEnrollmentKey}`);
            return true;
          }
        } catch (error) {
          logger.warn(`⚠️ Failed to parse user enrollment data:`, error);
        }
      }
    }

    return false;
  }

  // Get current user ID from auth context or localStorage
  private getCurrentUserId(): string | null {
    // Try to get from localStorage first
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return parsed.id || parsed.user_id;
      } catch (error) {
        logger.warn('⚠️ Failed to parse user data from localStorage:', error);
      }
    }

    return null;
  }

  // Get current user email
  private getCurrentUserEmail(): string | null {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return parsed.email || parsed.user_email;
      } catch (error) {
        logger.warn('⚠️ Failed to parse user email from localStorage:', error);
      }
    }

    return null;
  }

  // Start migration process
  public async startMigration(): Promise<MigrationResult> {
    if (this.status.isRunning) {
      logger.warn('⚠️ Migration already running');
      return {
        success: false,
        migratedCount: 0,
        skippedCount: 0,
        errorCount: 0,
        duration: 0,
        errors: this.status.errors
      };
    }

    logger.info('🚀 Starting enrollment data migration...');
    
    this.updateStatus({
      isRunning: true,
      progress: 0,
      currentStep: 'Initializing migration...',
      completedSteps: 0,
      errors: [],
      startTime: new Date()
    });

    const startTime = Date.now();
    let migratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    try {
      // Step 1: Collect all legacy enrollment data
      this.updateStatus({
        currentStep: 'Collecting legacy enrollment data...',
        progress: 20
      });

      const legacyEnrollments = await this.collectLegacyEnrollments();
      logger.info(`📦 Collected ${legacyEnrollments.length} legacy enrollments`);

      if (legacyEnrollments.length === 0) {
        logger.info('✅ No legacy enrollments to migrate');
        await this.completeMigration(true, 0, 0, 0, Date.now() - startTime);
        return {
          success: true,
          migratedCount: 0,
          skippedCount: 0,
          errorCount: 0,
          duration: Date.now() - startTime,
          errors: []
        };
      }

      // Step 2: Validate and normalize enrollment data
      this.updateStatus({
        currentStep: 'Validating enrollment data...',
        progress: 40
      });

      const validatedEnrollments = this.validateEnrollments(legacyEnrollments);
      logger.info(`✅ Validated ${validatedEnrollments.length} enrollments`);

      // Step 3: Migrate enrollments to unified system
      this.updateStatus({
        currentStep: 'Migrating to unified system...',
        progress: 60
      });

      const migrationResults = await this.migrateEnrollments(validatedEnrollments);
      migratedCount = migrationResults.migratedCount;
      skippedCount = migrationResults.skippedCount;
      errorCount = migrationResults.errorCount;

      // Step 4: Clean up legacy data
      this.updateStatus({
        currentStep: 'Cleaning up legacy data...',
        progress: 80
      });

      await this.cleanupLegacyData();

      // Step 5: Mark migration as complete
      this.updateStatus({
        currentStep: 'Finalizing migration...',
        progress: 100,
        completedSteps: this.status.totalSteps
      });

      await this.completeMigration(true, migratedCount, skippedCount, errorCount, Date.now() - startTime);

      logger.info(`✅ Migration completed: ${migratedCount} migrated, ${skippedCount} skipped, ${errorCount} errors`);
      
      // Mark all components as migrated after successful migration
      this.markComponentsAsMigrated();

      return {
        success: true,
        migratedCount,
        skippedCount,
        errorCount,
        duration: Date.now() - startTime,
        errors: this.status.errors
      };

    } catch (error) {
      logger.error('❌ Migration failed:', error);
      this.addError('migration', `Migration failed: ${error}`, false);
      
      await this.completeMigration(false, migratedCount, skippedCount, errorCount, Date.now() - startTime);
      
      return {
        success: false,
        migratedCount,
        skippedCount,
        errorCount,
        duration: Date.now() - startTime,
        errors: this.status.errors
      };
    }
  }

  // Collect all legacy enrollment data from localStorage
  private async collectLegacyEnrollments(): Promise<LegacyEnrollment[]> {
    const enrollments: LegacyEnrollment[] = [];
    const userId = this.getCurrentUserId();
    const userEmail = this.getCurrentUserEmail();

    // Collect from main enrollments key
    const mainEnrollments = localStorage.getItem('enrollments');
    if (mainEnrollments) {
      try {
        const parsed = JSON.parse(mainEnrollments);
        if (Array.isArray(parsed)) {
          enrollments.push(...parsed);
        }
      } catch (error) {
        this.addError('collect_main', `Failed to parse main enrollments: ${error}`);
      }
    }

    // Collect user-specific enrollments
    if (userId) {
      const userEnrollmentKeys = [
        `user-enrollments-${userId}`,
        `emergency-restored-enrollments-${userId}`
      ];

      for (const key of userEnrollmentKeys) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
              enrollments.push(...parsed);
            }
          } catch (error) {
            this.addError('collect_user', `Failed to parse user enrollments from ${key}: ${error}`);
          }
        }
      }
    }

    // Filter for current user's enrollments
    const userEnrollments = enrollments.filter(enrollment => {
      return (
        enrollment.user_id === userId ||
        enrollment.userId === userId ||
        enrollment.user_email === userEmail ||
        enrollment.userEmail === userEmail
      );
    });

    // Remove duplicates based on course_id
    const uniqueEnrollments = userEnrollments.reduce((acc, enrollment) => {
      const courseId = enrollment.course_id || enrollment.courseId;
      if (courseId && !acc.find(e => (e.course_id || e.courseId) === courseId)) {
        acc.push(enrollment);
      }
      return acc;
    }, [] as LegacyEnrollment[]);

    return uniqueEnrollments;
  }

  // Validate and normalize enrollment data
  private validateEnrollments(enrollments: LegacyEnrollment[]): LegacyEnrollment[] {
    return enrollments.filter(enrollment => {
      // Must have course_id
      if (!enrollment.course_id && !enrollment.courseId) {
        this.addError('validate', `Enrollment missing course_id: ${JSON.stringify(enrollment)}`);
        return false;
      }

      // Must have user_id
      if (!enrollment.user_id && !enrollment.userId) {
        this.addError('validate', `Enrollment missing user_id: ${JSON.stringify(enrollment)}`);
        return false;
      }

      return true;
    });
  }

  // Migrate enrollments to unified system
  private async migrateEnrollments(enrollments: LegacyEnrollment[]): Promise<{
    migratedCount: number;
    skippedCount: number;
    errorCount: number;
  }> {
    let migratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const enrollment of enrollments) {
      try {
        // Check if enrollment already exists in unified system
        const existingEnrollments = await unifiedEnrollmentManager.getUserEnrollments(
          enrollment.user_email || enrollment.userEmail || ''
        );
        
        const courseId = enrollment.course_id || enrollment.courseId;
        const alreadyExists = existingEnrollments.some(e => e.course_id === courseId);
        
        if (alreadyExists) {
          logger.info(`⏭️ Skipping duplicate enrollment for course ${courseId}`);
          skippedCount++;
          continue;
        }

        // Create normalized enrollment data
        const normalizedEnrollment = {
          user_id: enrollment.user_id || enrollment.userId || '',
          user_email: enrollment.user_email || enrollment.userEmail || '',
          course_id: courseId || '',
          course_title: enrollment.course_title || enrollment.courseTitle || '',
          status: (enrollment.status as 'pending' | 'approved' | 'rejected') || 'pending',
          progress: enrollment.progress || 0,
          enrolled_at: enrollment.enrolled_at || enrollment.enrollment_date || enrollment.created_at || new Date().toISOString(),
          updated_at: enrollment.updated_at || new Date().toISOString()
        };

        // Migrate to unified system
        await unifiedEnrollmentManager.createEnrollment(normalizedEnrollment);
        
        logger.info(`✅ Migrated enrollment for course ${courseId}`);
        migratedCount++;

      } catch (error) {
        logger.error(`❌ Failed to migrate enrollment:`, error);
        this.addError('migrate', `Failed to migrate enrollment: ${error}`);
        errorCount++;
      }
    }

    return { migratedCount, skippedCount, errorCount };
  }

  // Clean up legacy data
  private async cleanupLegacyData(): Promise<void> {
    const userId = this.getCurrentUserId();
    
    // Remove legacy enrollment keys
    const keysToRemove = [
      'enrollments',
      `user-enrollments-${userId}`,
      `emergency-restored-enrollments-${userId}`
    ];

    for (const key of keysToRemove) {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        logger.info(`🗑️ Removed legacy data: ${key}`);
      }
    }
  }

  // Complete migration process
  private async completeMigration(
    success: boolean, 
    migratedCount: number, 
    skippedCount: number, 
    errorCount: number, 
    duration: number
  ): Promise<void> {
    this.updateStatus({
      isRunning: false,
      currentStep: success ? 'Migration completed successfully!' : 'Migration failed',
      endTime: new Date()
    });

    if (success) {
      // Mark migration as complete
      localStorage.setItem('enrollment_migration_completed', JSON.stringify({
        timestamp: new Date().toISOString(),
        migratedCount,
        skippedCount,
        errorCount,
        duration
      }));
      
      logger.info(`✅ Migration completed successfully in ${duration}ms`);
    }
  }

  // Retry failed migration
  public async retryMigration(): Promise<MigrationResult> {
    logger.info('🔄 Retrying enrollment migration...');
    
    // Clear previous errors
    this.updateStatus({ errors: [] });
    
    return await this.startMigration();
  }

  // Mark all components as migrated
  private markComponentsAsMigrated(): void {
    const migratedComponents = [
      'InstructorDashboard',
      'InstructorDashboardPage', 
      'useStableProgress',
      'useUserState',
      'DataRecovery',
      'progressCleanup',
      'useEnrollments',
      'useBulletproofPersistence',
      'useEnrollmentNotifications',
      'useEnrollmentOperations',
      'useEnrollmentData',
      'EnrollmentPage'
    ];

    migratedComponents.forEach(component => {
      legacyAccessMonitor.markComponentMigrated(component);
    });

    logger.info('✅ All components marked as migrated to unified system');
    legacyAccessMonitor.logMigrationStatus();
  }

  // Reset migration status (for testing)
  public resetMigration(): void {
    localStorage.removeItem('enrollment_migration_completed');
    this.updateStatus({
      isRunning: false,
      progress: 0,
      currentStep: '',
      completedSteps: 0,
      errors: []
    });
    logger.info('🔄 Migration status reset');
  }
}

// Export singleton instance
export const enrollmentMigrationManager = new EnrollmentMigrationManager();