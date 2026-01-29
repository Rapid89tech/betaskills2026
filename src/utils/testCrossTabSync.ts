/**
 * Simple test script to verify cross-tab synchronization functionality
 * This can be run in the browser console to test the implementation
 */

import { CrossTabSyncUtils } from './crossTabSyncTest';
import { dataManager } from '@/services/DataManager';
import { logger } from './logger';

// Make utilities available globally for testing
(window as any).CrossTabSyncUtils = CrossTabSyncUtils;
(window as any).dataManager = dataManager;
(window as any).testCrossTabSync = async () => {
  logger.info('Starting cross-tab synchronization test...');
  
  try {
    // Test BroadcastChannel
    const broadcastResult = await CrossTabSyncUtils.testCrossTabSync();
    logger.info('BroadcastChannel test result:', broadcastResult);
    
    // Test offline queue
    const offlineResult = await CrossTabSyncUtils.testOfflineQueue();
    logger.info('Offline queue test result:', offlineResult);
    
    // Get queue status
    const queueStatus = CrossTabSyncUtils.getOfflineQueueStatus();
    logger.info('Current queue status:', queueStatus);
    
    return {
      broadcastChannel: broadcastResult,
      offlineQueue: offlineResult,
      queueStatus
    };
  } catch (error) {
    logger.error('Test failed:', error);
    return { error: error.message };
  }
};

// Log instructions for manual testing
logger.info(`
Cross-Tab Synchronization Test Instructions:
1. Open browser console
2. Run: testCrossTabSync()
3. Open multiple tabs to test cross-tab sync
4. Use CrossTabSyncUtils.requestCrossTabSync() to trigger sync
5. Use dataManager.getOfflineQueueStatus() to check queue
6. Simulate offline: navigator.onLine = false; window.dispatchEvent(new Event('offline'))
7. Simulate online: navigator.onLine = true; window.dispatchEvent(new Event('online'))
`);

export {};