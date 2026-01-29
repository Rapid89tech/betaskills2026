import { dataManager, EnrollmentData } from '@/services/DataManager';
import { logger } from './logger';

/**
 * Integration utilities for testing and verifying DataManager functionality
 */
export class DataManagerIntegration {
  /**
   * Test the unified data management layer functionality
   */
  static async testDataManagerIntegration(): Promise<boolean> {
    try {
      logger.info('🧪 Testing DataManager integration...');

      // Test 1: Create a test enrollment
      const testEnrollment: EnrollmentData = {
        id: `test-enrollment-${Date.now()}`,
        user_id: 'test-user-123',
        user_email: 'test@example.com',
        course_id: 'test-course-456',
        course_title: 'Test Course',
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0,
        sync_version: 1
      };

      // Test 2: Update enrollment through DataManager
      await dataManager.updateEnrollment(testEnrollment);
      logger.info('✅ Test enrollment created successfully');

      // Test 3: Retrieve enrollment
      const retrievedEnrollments = await dataManager.getEnrollments('test-user-123');
      const foundEnrollment = retrievedEnrollments.find(e => e.id === testEnrollment.id);
      
      if (!foundEnrollment) {
        throw new Error('Test enrollment not found after creation');
      }
      logger.info('✅ Test enrollment retrieved successfully');

      // Test 4: Update enrollment
      const updatedEnrollment = {
        ...foundEnrollment,
        progress: 50,
        status: 'approved' as const
      };
      
      await dataManager.updateEnrollment(updatedEnrollment);
      logger.info('✅ Test enrollment updated successfully');

      // Test 5: Verify update
      const updatedEnrollments = await dataManager.getEnrollments('test-user-123');
      const verifyEnrollment = updatedEnrollments.find(e => e.id === testEnrollment.id);
      
      if (!verifyEnrollment || verifyEnrollment.progress !== 50 || verifyEnrollment.status !== 'approved') {
        throw new Error('Enrollment update verification failed');
      }
      logger.info('✅ Test enrollment update verified successfully');

      // Test 6: Test conflict resolution
      const localEnrollment: EnrollmentData = {
        ...testEnrollment,
        updated_at: new Date(Date.now() + 1000).toISOString(), // Newer timestamp
        progress: 75,
        sync_version: 2
      };

      const remoteEnrollment: EnrollmentData = {
        ...testEnrollment,
        updated_at: new Date().toISOString(), // Older timestamp
        progress: 25,
        sync_version: 1
      };

      const resolved = dataManager.resolveConflicts([localEnrollment], [remoteEnrollment]);
      
      if (resolved.length !== 1 || resolved[0].progress !== 75) {
        throw new Error('Conflict resolution test failed');
      }
      logger.info('✅ Conflict resolution test passed');

      // Cleanup test data
      await this.cleanupTestData('test-user-123');
      
      logger.info('🎉 All DataManager integration tests passed!');
      return true;
    } catch (error) {
      logger.error('❌ DataManager integration test failed:', error);
      return false;
    }
  }

  /**
   * Verify that DataManager is properly integrated into the application
   */
  static async verifyIntegration(): Promise<{
    isIntegrated: boolean;
    issues: string[];
    recommendations: string[];
  }> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    try {
      // Check if DataManager singleton is available
      if (!dataManager) {
        issues.push('DataManager singleton not available');
      }

      // Check if migration has been completed
      const migrationCompleted = localStorage.getItem('enrollment-migration-completed');
      if (!migrationCompleted) {
        issues.push('Enrollment data migration not completed');
        recommendations.push('Run enrollmentMigrationManager.startMigration() to migrate existing data');
      }

      // Check for direct localStorage usage (potential issues)
      const hasDirectLocalStorageUsage = this.checkForDirectLocalStorageUsage();
      if (hasDirectLocalStorageUsage.length > 0) {
        issues.push('Components still using direct localStorage access');
        recommendations.push('Update components to use useDataManager hook instead of direct localStorage');
      }

      // Check if cross-tab synchronization is working
      const hasBroadcastChannel = typeof BroadcastChannel !== 'undefined';
      if (!hasBroadcastChannel) {
        issues.push('BroadcastChannel not supported - cross-tab sync unavailable');
        recommendations.push('Consider polyfill for older browsers');
      }

      // Check offline queue functionality
      const offlineQueue = localStorage.getItem('enrollment-offline-queue');
      const hasOfflineQueue = offlineQueue !== null;
      
      logger.info('DataManager integration verification:', {
        migrationCompleted: !!migrationCompleted,
        hasBroadcastChannel,
        hasOfflineQueue,
        issuesCount: issues.length
      });

      return {
        isIntegrated: issues.length === 0,
        issues,
        recommendations
      };
    } catch (error) {
      logger.error('Failed to verify DataManager integration:', error);
      return {
        isIntegrated: false,
        issues: ['Failed to verify integration'],
        recommendations: ['Check console for detailed error information']
      };
    }
  }

  /**
   * Check for components that might still be using direct localStorage access
   */
  private static checkForDirectLocalStorageUsage(): string[] {
    // This is a runtime check - in a real implementation, this would be done via static analysis
    const potentialIssues: string[] = [];
    
    // Check if there are any enrollment-related localStorage keys that suggest direct usage
    const enrollmentKeys = Object.keys(localStorage).filter(key => 
      key.includes('enrollment') && 
      !key.includes('enrollment-migration-completed') &&
      !key.includes('enrollment-offline-queue')
    );

    if (enrollmentKeys.length > 0) {
      potentialIssues.push(`Found ${enrollmentKeys.length} enrollment-related localStorage keys`);
    }

    return potentialIssues;
  }

  /**
   * Clean up test data
   */
  private static async cleanupTestData(userId: string): Promise<void> {
    try {
      // Get all enrollments for the test user
      const enrollments = await dataManager.getEnrollments(userId);
      
      // Remove test enrollments from localStorage
      const allEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const filteredEnrollments = allEnrollments.filter((e: any) => e.user_id !== userId);
      localStorage.setItem('enrollments', JSON.stringify(filteredEnrollments));
      
      // Remove user-specific cache
      localStorage.removeItem(`user-enrollments-${userId}`);
      localStorage.removeItem(`user-enrollments-${userId}-timestamp`);
      
      logger.info(`🧹 Cleaned up test data for user ${userId}`);
    } catch (error) {
      logger.warn('Failed to cleanup test data:', error);
    }
  }

  /**
   * Force synchronization of all enrollment data
   */
  static async forceSynchronization(): Promise<void> {
    try {
      logger.info('🔄 Forcing enrollment data synchronization...');
      await dataManager.syncEnrollments();
      logger.info('✅ Enrollment data synchronization completed');
    } catch (error) {
      logger.error('❌ Failed to synchronize enrollment data:', error);
      throw error;
    }
  }

  /**
   * Get statistics about the current data management state
   */
  static async getDataManagerStats(): Promise<{
    totalEnrollments: number;
    userCount: number;
    offlineQueueSize: number;
    lastSyncTime: string | null;
    migrationCompleted: boolean;
  }> {
    try {
      // Get all enrollments from localStorage
      const allEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const userIds = new Set(allEnrollments.map((e: any) => e.user_id || e.userId));
      
      // Get offline queue
      const offlineQueue = JSON.parse(localStorage.getItem('enrollment-offline-queue') || '[]');
      
      // Check migration status
      const migrationCompleted = localStorage.getItem('enrollment-migration-completed') !== null;
      
      // Get last sync time (approximate)
      const lastSyncTime = localStorage.getItem('enrollment-last-sync') || null;

      return {
        totalEnrollments: allEnrollments.length,
        userCount: userIds.size,
        offlineQueueSize: offlineQueue.length,
        lastSyncTime,
        migrationCompleted
      };
    } catch (error) {
      logger.error('Failed to get DataManager stats:', error);
      return {
        totalEnrollments: 0,
        userCount: 0,
        offlineQueueSize: 0,
        lastSyncTime: null,
        migrationCompleted: false
      };
    }
  }
}

/**
 * Development helper to test DataManager integration
 */
export const testDataManagerIntegration = async (): Promise<void> => {
  if (import.meta.env.DEV) {
    const result = await DataManagerIntegration.testDataManagerIntegration();
    if (result) {
      console.log('🎉 DataManager integration test passed!');
    } else {
      console.error('❌ DataManager integration test failed!');
    }
  }
};

/**
 * Development helper to verify DataManager integration
 */
export const verifyDataManagerIntegration = async (): Promise<void> => {
  if (import.meta.env.DEV) {
    const verification = await DataManagerIntegration.verifyIntegration();
    console.log('DataManager Integration Verification:', verification);
    
    if (!verification.isIntegrated) {
      console.warn('⚠️ DataManager integration issues found:', verification.issues);
      console.info('💡 Recommendations:', verification.recommendations);
    } else {
      console.log('✅ DataManager integration verified successfully!');
    }
  }
};

// Make utilities available in development
if (import.meta.env.DEV) {
  (window as any).testDataManagerIntegration = testDataManagerIntegration;
  (window as any).verifyDataManagerIntegration = verifyDataManagerIntegration;
  (window as any).dataManagerStats = () => DataManagerIntegration.getDataManagerStats();
  (window as any).forceSyncEnrollments = () => DataManagerIntegration.forceSynchronization();
}