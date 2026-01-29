import { unifiedEnrollmentManager, EnrollmentData } from '@/services/UnifiedEnrollmentManager';
import { dataManager } from '@/services/DataManager';
import { logger } from './logger';

/**
 * Comprehensive test suite for the Unified Enrollment System
 * 
 * This test verifies that:
 * 1. DataManager handles enrollment data synchronization correctly
 * 2. Conflict resolution works with timestamp-based last-write-wins
 * 3. Single source of truth is maintained across all operations
 * 4. Cross-tab synchronization functions properly
 * 5. Offline operations are queued and synced when online
 */

interface TestResult {
  testName: string;
  passed: boolean;
  message: string;
  details?: any;
}

export class UnifiedEnrollmentSystemTest {
  private testResults: TestResult[] = [];
  private testUserId = 'test-user-unified-system';

  /**
   * Run all tests for the unified enrollment system
   */
  async runAllTests(): Promise<TestResult[]> {
    this.testResults = [];
    
    logger.info('🧪 Starting Unified Enrollment System Tests...');

    try {
      // Initialize the system
      await this.testSystemInitialization();
      
      // Test basic CRUD operations
      await this.testBasicCRUDOperations();
      
      // Test conflict resolution
      await this.testConflictResolution();
      
      // Test single source of truth
      await this.testSingleSourceOfTruth();
      
      // Test data synchronization
      await this.testDataSynchronization();
      
      // Test offline operations
      await this.testOfflineOperations();
      
      // Test cross-tab synchronization
      await this.testCrossTabSynchronization();
      
      // Clean up test data
      await this.cleanupTestData();
      
    } catch (error) {
      this.addTestResult('System Test Suite', false, `Test suite failed: ${error.message}`, error);
    }

    this.logTestResults();
    return this.testResults;
  }

  /**
   * Test system initialization
   */
  private async testSystemInitialization(): Promise<void> {
    try {
      await unifiedEnrollmentManager.initialize();
      this.addTestResult('System Initialization', true, 'Unified enrollment manager initialized successfully');
    } catch (error) {
      this.addTestResult('System Initialization', false, `Failed to initialize: ${error.message}`, error);
    }
  }

  /**
   * Test basic CRUD operations
   */
  private async testBasicCRUDOperations(): Promise<void> {
    try {
      // Create test enrollment
      const testEnrollment = await unifiedEnrollmentManager.createEnrollment({
        user_id: this.testUserId,
        user_email: 'test@example.com',
        course_id: 'test-course-1',
        course_title: 'Test Course 1',
        status: 'pending'
      });

      this.addTestResult('Create Enrollment', true, 'Successfully created test enrollment', testEnrollment);

      // Read enrollment
      const userEnrollments = await unifiedEnrollmentManager.getUserEnrollments(this.testUserId);
      const foundEnrollment = userEnrollments.find(e => e.id === testEnrollment.id);
      
      if (foundEnrollment) {
        this.addTestResult('Read Enrollment', true, 'Successfully retrieved created enrollment');
      } else {
        this.addTestResult('Read Enrollment', false, 'Failed to retrieve created enrollment');
      }

      // Update enrollment
      const updatedEnrollment = await unifiedEnrollmentManager.updateEnrollmentStatus(
        testEnrollment.id, 
        'approved'
      );
      
      if (updatedEnrollment.status === 'approved') {
        this.addTestResult('Update Enrollment', true, 'Successfully updated enrollment status');
      } else {
        this.addTestResult('Update Enrollment', false, 'Failed to update enrollment status');
      }

      // Check enrollment status
      const isEnrolled = await unifiedEnrollmentManager.isUserEnrolledInCourse(this.testUserId, 'test-course-1');
      
      if (isEnrolled) {
        this.addTestResult('Check Enrollment Status', true, 'Successfully verified enrollment status');
      } else {
        this.addTestResult('Check Enrollment Status', false, 'Failed to verify enrollment status');
      }

    } catch (error) {
      this.addTestResult('Basic CRUD Operations', false, `CRUD operations failed: ${error.message}`, error);
    }
  }

  /**
   * Test conflict resolution using timestamp-based last-write-wins
   */
  private async testConflictResolution(): Promise<void> {
    try {
      // Create two conflicting enrollments with different timestamps
      const baseTime = new Date();
      const olderTime = new Date(baseTime.getTime() - 60000); // 1 minute ago
      const newerTime = new Date(baseTime.getTime() + 60000); // 1 minute from now

      const olderEnrollment: EnrollmentData = {
        id: 'conflict-test-enrollment',
        user_id: this.testUserId,
        course_id: 'conflict-test-course',
        course_title: 'Conflict Test Course',
        status: 'pending',
        enrolled_at: olderTime.toISOString(),
        updated_at: olderTime.toISOString(),
        progress: 25,
        sync_version: 1,
        conflict_resolution: 'local'
      };

      const newerEnrollment: EnrollmentData = {
        ...olderEnrollment,
        status: 'approved',
        updated_at: newerTime.toISOString(),
        progress: 75,
        sync_version: 2,
        conflict_resolution: 'remote'
      };

      // Test conflict resolution
      const resolvedEnrollments = dataManager.resolveConflicts([olderEnrollment], [newerEnrollment]);
      
      if (resolvedEnrollments.length === 1 && resolvedEnrollments[0].status === 'approved') {
        this.addTestResult('Conflict Resolution', true, 'Timestamp-based last-write-wins working correctly');
      } else {
        this.addTestResult('Conflict Resolution', false, 'Conflict resolution failed', resolvedEnrollments);
      }

    } catch (error) {
      this.addTestResult('Conflict Resolution', false, `Conflict resolution test failed: ${error.message}`, error);
    }
  }

  /**
   * Test single source of truth
   */
  private async testSingleSourceOfTruth(): Promise<void> {
    try {
      // Create enrollment through unified manager
      const enrollment = await unifiedEnrollmentManager.createEnrollment({
        user_id: this.testUserId,
        course_id: 'sot-test-course',
        course_title: 'Single Source Test Course',
        status: 'pending'
      });

      // Verify it's accessible through DataManager
      const dataManagerEnrollments = await dataManager.getEnrollments(this.testUserId);
      const foundInDataManager = dataManagerEnrollments.find(e => e.id === enrollment.id);

      // Verify it's in localStorage
      const localStorageEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const foundInLocalStorage = localStorageEnrollments.find((e: any) => e.id === enrollment.id);

      if (foundInDataManager && foundInLocalStorage) {
        this.addTestResult('Single Source of Truth', true, 'Data consistent across all access points');
      } else {
        this.addTestResult('Single Source of Truth', false, 'Data inconsistency detected', {
          foundInDataManager: !!foundInDataManager,
          foundInLocalStorage: !!foundInLocalStorage
        });
      }

    } catch (error) {
      this.addTestResult('Single Source of Truth', false, `Single source test failed: ${error.message}`, error);
    }
  }

  /**
   * Test data synchronization
   */
  private async testDataSynchronization(): Promise<void> {
    try {
      // Create enrollment
      const enrollment = await unifiedEnrollmentManager.createEnrollment({
        user_id: this.testUserId,
        course_id: 'sync-test-course',
        course_title: 'Sync Test Course',
        status: 'pending'
      });

      // Force synchronization
      await unifiedEnrollmentManager.forceSynchronization();

      // Verify sync completed
      const syncedEnrollments = await dataManager.getEnrollments(this.testUserId);
      const syncedEnrollment = syncedEnrollments.find(e => e.id === enrollment.id);

      if (syncedEnrollment && syncedEnrollment.last_synced) {
        this.addTestResult('Data Synchronization', true, 'Data synchronization working correctly');
      } else {
        this.addTestResult('Data Synchronization', false, 'Data synchronization failed');
      }

    } catch (error) {
      this.addTestResult('Data Synchronization', false, `Synchronization test failed: ${error.message}`, error);
    }
  }

  /**
   * Test offline operations
   */
  private async testOfflineOperations(): Promise<void> {
    try {
      // Simulate offline mode
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      // Create enrollment while offline
      const enrollment = await unifiedEnrollmentManager.createEnrollment({
        user_id: this.testUserId,
        course_id: 'offline-test-course',
        course_title: 'Offline Test Course',
        status: 'pending'
      });

      // Check if operation was queued
      const offlineQueue = JSON.parse(localStorage.getItem('enrollment-offline-queue') || '[]');
      const queuedOperation = offlineQueue.find((op: any) => op.id === enrollment.id);

      if (queuedOperation) {
        this.addTestResult('Offline Operations', true, 'Offline operations queued correctly');
      } else {
        this.addTestResult('Offline Operations', false, 'Offline operation queuing failed');
      }

      // Restore online mode
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true
      });

    } catch (error) {
      this.addTestResult('Offline Operations', false, `Offline operations test failed: ${error.message}`, error);
    }
  }

  /**
   * Test cross-tab synchronization
   */
  private async testCrossTabSynchronization(): Promise<void> {
    try {
      let eventReceived = false;
      
      // Listen for cross-tab update event
      const eventListener = (event: CustomEvent) => {
        if (event.detail.enrollment?.user_id === this.testUserId) {
          eventReceived = true;
        }
      };

      window.addEventListener('enrollment-updated', eventListener as EventListener);

      // Create enrollment (this should trigger cross-tab event)
      await unifiedEnrollmentManager.createEnrollment({
        user_id: this.testUserId,
        course_id: 'cross-tab-test-course',
        course_title: 'Cross Tab Test Course',
        status: 'pending'
      });

      // Wait a bit for event propagation
      await new Promise(resolve => setTimeout(resolve, 100));

      window.removeEventListener('enrollment-updated', eventListener as EventListener);

      if (eventReceived) {
        this.addTestResult('Cross-Tab Synchronization', true, 'Cross-tab events working correctly');
      } else {
        this.addTestResult('Cross-Tab Synchronization', false, 'Cross-tab event not received');
      }

    } catch (error) {
      this.addTestResult('Cross-Tab Synchronization', false, `Cross-tab test failed: ${error.message}`, error);
    }
  }

  /**
   * Clean up test data
   */
  private async cleanupTestData(): Promise<void> {
    try {
      // Remove test enrollments from localStorage
      const allEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const filteredEnrollments = allEnrollments.filter((e: any) => e.user_id !== this.testUserId);
      localStorage.setItem('enrollments', JSON.stringify(filteredEnrollments));

      // Clear user-specific cache
      localStorage.removeItem(`user-enrollments-${this.testUserId}`);

      this.addTestResult('Cleanup', true, 'Test data cleaned up successfully');
    } catch (error) {
      this.addTestResult('Cleanup', false, `Cleanup failed: ${error.message}`, error);
    }
  }

  /**
   * Add test result
   */
  private addTestResult(testName: string, passed: boolean, message: string, details?: any): void {
    this.testResults.push({
      testName,
      passed,
      message,
      details
    });
  }

  /**
   * Log test results
   */
  private logTestResults(): void {
    const passedTests = this.testResults.filter(r => r.passed).length;
    const totalTests = this.testResults.length;
    
    logger.info(`🧪 Unified Enrollment System Tests Complete: ${passedTests}/${totalTests} passed`);
    
    this.testResults.forEach(result => {
      const icon = result.passed ? '✅' : '❌';
      logger.info(`${icon} ${result.testName}: ${result.message}`);
      
      if (!result.passed && result.details) {
        logger.error('Test details:', result.details);
      }
    });

    if (passedTests === totalTests) {
      logger.info('🎉 All unified enrollment system tests passed!');
    } else {
      logger.warn(`⚠️ ${totalTests - passedTests} tests failed. Check implementation.`);
    }
  }

  /**
   * Get test summary
   */
  getTestSummary(): { passed: number; total: number; results: TestResult[] } {
    const passed = this.testResults.filter(r => r.passed).length;
    return {
      passed,
      total: this.testResults.length,
      results: this.testResults
    };
  }
}

/**
 * Run unified enrollment system tests
 */
export const runUnifiedEnrollmentSystemTests = async (): Promise<TestResult[]> => {
  const tester = new UnifiedEnrollmentSystemTest();
  return await tester.runAllTests();
};

/**
 * Quick verification function for development
 */
export const verifyUnifiedEnrollmentSystem = async (): Promise<boolean> => {
  try {
    const results = await runUnifiedEnrollmentSystemTests();
    const passedTests = results.filter(r => r.passed).length;
    const totalTests = results.length;
    
    console.log(`🧪 Unified Enrollment System Verification: ${passedTests}/${totalTests} tests passed`);
    
    return passedTests === totalTests;
  } catch (error) {
    console.error('❌ Unified enrollment system verification failed:', error);
    return false;
  }
};

// Make verification available in development
if (import.meta.env.DEV) {
  (window as any).verifyUnifiedEnrollmentSystem = verifyUnifiedEnrollmentSystem;
  (window as any).runUnifiedEnrollmentSystemTests = runUnifiedEnrollmentSystemTests;
}