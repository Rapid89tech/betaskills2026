/**
 * Cross-Tab Synchronization and Offline Support Test Utility
 * 
 * This utility provides methods to test the enhanced cross-tab synchronization
 * and offline support features implemented in the DataManager.
 */

import { dataManager, EnrollmentData } from '@/services/DataManager';
import { logger } from '@/utils/logger';

export class CrossTabSyncTest {
  private testEnrollments: EnrollmentData[] = [];
  private eventListeners: Map<string, EventListener> = new Map();

  /**
   * Initialize test environment
   */
  async initialize(): Promise<void> {
    logger.info('Initializing Cross-Tab Sync Test...');
    
    // Set up event listeners for testing
    this.setupTestEventListeners();
    
    // Create test enrollments
    await this.createTestEnrollments();
    
    logger.info('Cross-Tab Sync Test initialized successfully');
  }

  /**
   * Test cross-tab data synchronization
   */
  async testCrossTabSync(): Promise<boolean> {
    logger.info('Testing cross-tab synchronization...');
    
    try {
      // Create a test enrollment
      const testEnrollment: EnrollmentData = {
        id: `test_enrollment_${Date.now()}`,
        user_id: 'test_user_cross_tab',
        user_email: 'test@crosstab.com',
        course_id: 'test_course_cross_tab',
        course_title: 'Cross-Tab Test Course',
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0,
        sync_version: 1,
        conflict_resolution: 'local'
      };

      // Update enrollment through DataManager
      await dataManager.updateEnrollment(testEnrollment);
      
      // Wait for cross-tab events
      await this.waitForCrossTabEvent('enrollment-updated-cross-tab', 2000);
      
      // Verify the enrollment was synchronized
      const enrollments = await dataManager.getEnrollments('test_user_cross_tab');
      const syncedEnrollment = enrollments.find(e => e.id === testEnrollment.id);
      
      if (syncedEnrollment) {
        logger.info('Cross-tab synchronization test passed');
        return true;
      } else {
        logger.error('Cross-tab synchronization test failed: enrollment not found');
        return false;
      }
    } catch (error) {
      logger.error('Cross-tab synchronization test failed:', error);
      return false;
    }
  }

  /**
   * Test offline operation queuing
   */
  async testOfflineQueue(): Promise<boolean> {
    logger.info('Testing offline operation queuing...');
    
    try {
      // Simulate offline mode
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });
      
      // Trigger offline event
      window.dispatchEvent(new Event('offline'));
      
      // Create enrollment while offline
      const offlineEnrollment: EnrollmentData = {
        id: `offline_enrollment_${Date.now()}`,
        user_id: 'test_user_offline',
        user_email: 'test@offline.com',
        course_id: 'test_course_offline',
        course_title: 'Offline Test Course',
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0,
        sync_version: 1,
        conflict_resolution: 'local'
      };

      await dataManager.createEnrollment(offlineEnrollment);
      
      // Check if operation was queued
      const queueStatus = dataManager.getOfflineQueueStatus();
      
      if (queueStatus.length === 0) {
        logger.error('Offline queue test failed: operation not queued');
        return false;
      }
      
      // Simulate going back online
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true
      });
      
      // Trigger online event
      window.dispatchEvent(new Event('online'));
      
      // Wait for queue processing
      await this.waitForCrossTabEvent('queue-completed', 5000);
      
      // Check if queue was processed
      const finalQueueStatus = dataManager.getOfflineQueueStatus();
      
      if (finalQueueStatus.length === 0) {
        logger.info('Offline queue test passed');
        return true;
      } else {
        logger.error('Offline queue test failed: queue not processed');
        return false;
      }
    } catch (error) {
      logger.error('Offline queue test failed:', error);
      return false;
    }
  }

  /**
   * Test localStorage event handling for cross-tab consistency
   */
  async testLocalStorageEvents(): Promise<boolean> {
    logger.info('Testing localStorage event handling...');
    
    try {
      // Create test data
      const testEnrollments = [
        {
          id: 'storage_test_1',
          user_id: 'test_user_storage',
          course_id: 'test_course_1',
          status: 'approved',
          enrolled_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          progress: 50
        }
      ];

      // Simulate storage event from another tab
      const storageEvent = new StorageEvent('storage', {
        key: 'enrollments',
        newValue: JSON.stringify(testEnrollments),
        oldValue: '[]',
        storageArea: localStorage
      });

      // Dispatch the event
      window.dispatchEvent(storageEvent);
      
      // Wait for storage update event
      await this.waitForCrossTabEvent('enrollment-storage-update', 2000);
      
      logger.info('localStorage event handling test passed');
      return true;
    } catch (error) {
      logger.error('localStorage event handling test failed:', error);
      return false;
    }
  }

  /**
   * Test BroadcastChannel messaging
   */
  async testBroadcastChannel(): Promise<boolean> {
    logger.info('Testing BroadcastChannel messaging...');
    
    try {
      // Create a test broadcast channel
      const testChannel = new BroadcastChannel('enrollment-sync');
      let messageReceived = false;

      // Listen for messages
      testChannel.addEventListener('message', (event) => {
        if (event.data.type === 'test-message') {
          messageReceived = true;
          logger.info('BroadcastChannel test message received');
        }
      });

      // Send test message
      testChannel.postMessage({
        type: 'test-message',
        data: 'test-data',
        timestamp: new Date().toISOString()
      });

      // Wait for message
      await new Promise(resolve => setTimeout(resolve, 100));
      
      testChannel.close();
      
      if (messageReceived) {
        logger.info('BroadcastChannel messaging test passed');
        return true;
      } else {
        logger.error('BroadcastChannel messaging test failed: message not received');
        return false;
      }
    } catch (error) {
      logger.error('BroadcastChannel messaging test failed:', error);
      return false;
    }
  }

  /**
   * Run all cross-tab synchronization and offline support tests
   */
  async runAllTests(): Promise<{
    crossTabSync: boolean;
    offlineQueue: boolean;
    localStorageEvents: boolean;
    broadcastChannel: boolean;
    overall: boolean;
  }> {
    logger.info('Running all cross-tab synchronization and offline support tests...');
    
    const results = {
      crossTabSync: await this.testCrossTabSync(),
      offlineQueue: await this.testOfflineQueue(),
      localStorageEvents: await this.testLocalStorageEvents(),
      broadcastChannel: await this.testBroadcastChannel(),
      overall: false
    };

    results.overall = Object.values(results).every(result => result === true);
    
    logger.info('Test Results:', results);
    
    if (results.overall) {
      logger.info('All cross-tab synchronization and offline support tests passed! ✅');
    } else {
      logger.error('Some cross-tab synchronization and offline support tests failed! ❌');
    }
    
    return results;
  }

  /**
   * Clean up test environment
   */
  async cleanup(): Promise<void> {
    logger.info('Cleaning up Cross-Tab Sync Test...');
    
    // Remove event listeners
    this.eventListeners.forEach((listener, event) => {
      window.removeEventListener(event, listener);
    });
    this.eventListeners.clear();
    
    // Clean up test enrollments
    for (const enrollment of this.testEnrollments) {
      try {
        await dataManager.deleteEnrollment(enrollment.id);
      } catch (error) {
        logger.warn(`Failed to clean up test enrollment ${enrollment.id}:`, error);
      }
    }
    
    // Clear offline queue
    dataManager.clearOfflineQueue();
    
    logger.info('Cross-Tab Sync Test cleanup completed');
  }

  /**
   * Set up event listeners for testing
   */
  private setupTestEventListeners(): void {
    const events = [
      'enrollment-created-cross-tab',
      'enrollment-updated-cross-tab',
      'enrollment-deleted-cross-tab',
      'enrollment-storage-update',
      'user-enrollment-storage-update',
      'queue-completed',
      'queue-processed'
    ];

    events.forEach(eventName => {
      const listener = (event: Event) => {
        logger.info(`Test event received: ${eventName}`, (event as CustomEvent).detail);
      };
      
      window.addEventListener(eventName, listener);
      this.eventListeners.set(eventName, listener);
    });
  }

  /**
   * Create test enrollments
   */
  private async createTestEnrollments(): Promise<void> {
    const testEnrollments: EnrollmentData[] = [
      {
        id: 'test_enrollment_1',
        user_id: 'test_user_1',
        user_email: 'test1@example.com',
        course_id: 'test_course_1',
        course_title: 'Test Course 1',
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 25,
        sync_version: 1,
        conflict_resolution: 'local'
      },
      {
        id: 'test_enrollment_2',
        user_id: 'test_user_2',
        user_email: 'test2@example.com',
        course_id: 'test_course_2',
        course_title: 'Test Course 2',
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0,
        sync_version: 1,
        conflict_resolution: 'local'
      }
    ];

    for (const enrollment of testEnrollments) {
      await dataManager.createEnrollment(enrollment);
      this.testEnrollments.push(enrollment);
    }
  }

  /**
   * Wait for a specific cross-tab event
   */
  private waitForCrossTabEvent(eventName: string, timeout: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        window.removeEventListener(eventName, listener);
        reject(new Error(`Timeout waiting for event: ${eventName}`));
      }, timeout);

      const listener = () => {
        clearTimeout(timeoutId);
        window.removeEventListener(eventName, listener);
        resolve();
      };

      window.addEventListener(eventName, listener);
    });
  }

  /**
   * Get current queue status for debugging
   */
  getQueueStatus() {
    return dataManager.getOfflineQueueStatus();
  }

  /**
   * Manually trigger sync for testing
   */
  async triggerSync(): Promise<void> {
    await dataManager.syncEnrollments();
  }

  /**
   * Request cross-tab sync for testing
   */
  requestCrossTabSync(): void {
    dataManager.requestCrossTabSync();
  }
}

// Export singleton instance for easy testing
export const crossTabSyncTest = new CrossTabSyncTest();

// Export utility functions for component testing
export const CrossTabSyncUtils = {
  /**
   * Test if cross-tab synchronization is working
   */
  async testCrossTabSync(): Promise<boolean> {
    const test = new CrossTabSyncTest();
    await test.initialize();
    const result = await test.testCrossTabSync();
    await test.cleanup();
    return result;
  },

  /**
   * Test if offline queue is working
   */
  async testOfflineQueue(): Promise<boolean> {
    const test = new CrossTabSyncTest();
    await test.initialize();
    const result = await test.testOfflineQueue();
    await test.cleanup();
    return result;
  },

  /**
   * Get current offline queue status
   */
  getOfflineQueueStatus() {
    return dataManager.getOfflineQueueStatus();
  },

  /**
   * Clear offline queue (for debugging)
   */
  clearOfflineQueue(): void {
    dataManager.clearOfflineQueue();
  },

  /**
   * Request cross-tab synchronization
   */
  requestCrossTabSync(): void {
    dataManager.requestCrossTabSync();
  }
};