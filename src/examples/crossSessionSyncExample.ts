/**
 * Cross-Session Enrollment Sync Example
 * 
 * Demonstrates how to use the cross-session enrollment synchronization
 * system for real-time updates across multiple admin sessions.
 * 
 * Requirements: 1.1, 1.2, 2.1, 2.2, 7.3
 */

import { crossSessionEnrollmentSync } from '@/services/CrossSessionEnrollmentSync';
import { logger } from '@/utils/logger';

/**
 * Example: Setting up cross-session sync for enrollment management
 */
export function setupCrossSessionSync() {
  logger.info('🔄 Setting up cross-session enrollment sync example');

  // Subscribe to enrollment updates across all sessions
  const unsubscribeEnrollmentUpdate = crossSessionEnrollmentSync.subscribe(
    'enrollment-update', 
    (update) => {
      logger.info('📥 Enrollment update received:', {
        enrollmentId: update.enrollmentId,
        status: update.status,
        paymentType: update.paymentType,
        source: update.metadata?.source
      });

      // Update UI components
      updateEnrollmentUI(update);
    }
  );

  // Subscribe to card payment approvals
  const unsubscribeCardPayment = crossSessionEnrollmentSync.subscribe(
    'card-payment-approved',
    (update) => {
      logger.info('💳 Card payment approved across sessions:', {
        enrollmentId: update.enrollmentId,
        courseId: update.courseId
      });

      // Show success notification
      showNotification('Card Payment Approved!', 'success');
      
      // Update enrollment display
      moveEnrollmentToApproved(update.enrollmentId);
    }
  );

  // Subscribe to EFT payment submissions
  const unsubscribeEFTPayment = crossSessionEnrollmentSync.subscribe(
    'eft-payment-submitted',
    (update) => {
      logger.info('🏦 EFT payment submitted across sessions:', {
        enrollmentId: update.enrollmentId,
        courseId: update.courseId
      });

      // Show notification
      showNotification('New EFT Payment Received!', 'info');
      
      // Update enrollment display
      moveEnrollmentToPending(update.enrollmentId);
    }
  );

  // Subscribe to admin actions
  const unsubscribeApproval = crossSessionEnrollmentSync.subscribe(
    'enrollment_approved',
    (update) => {
      logger.info('✅ Enrollment approved by admin in another session:', {
        enrollmentId: update.enrollmentId,
        adminId: update.adminId
      });

      // Show notification
      showNotification('Enrollment Approved by Admin!', 'success');
      
      // Update enrollment status
      updateEnrollmentStatus(update.enrollmentId, 'approved');
    }
  );

  const unsubscribeRejection = crossSessionEnrollmentSync.subscribe(
    'enrollment_rejected',
    (update) => {
      logger.info('❌ Enrollment rejected by admin in another session:', {
        enrollmentId: update.enrollmentId,
        adminId: update.adminId
      });

      // Show notification
      showNotification('Enrollment Rejected by Admin', 'warning');
      
      // Update enrollment status
      updateEnrollmentStatus(update.enrollmentId, 'rejected');
    }
  );

  // Return cleanup function
  return () => {
    unsubscribeEnrollmentUpdate();
    unsubscribeCardPayment();
    unsubscribeEFTPayment();
    unsubscribeApproval();
    unsubscribeRejection();
  };
}

/**
 * Example: Admin approving an enrollment with cross-session sync
 */
export async function approveEnrollmentWithSync(enrollmentId: string, adminId: string) {
  try {
    logger.info('👨‍💼 Admin approving enrollment with cross-session sync:', {
      enrollmentId,
      adminId
    });

    // Force sync the approval across all admin sessions
    await crossSessionEnrollmentSync.forceSyncEnrollmentStatus(
      enrollmentId, 
      'approved', 
      adminId
    );

    logger.info('✅ Enrollment approval synced across all sessions');
    
    return { success: true };
  } catch (error) {
    logger.error('❌ Failed to approve enrollment with sync:', error);
    return { success: false, error };
  }
}

/**
 * Example: Admin rejecting an enrollment with cross-session sync
 */
export async function rejectEnrollmentWithSync(enrollmentId: string, adminId: string) {
  try {
    logger.info('👨‍💼 Admin rejecting enrollment with cross-session sync:', {
      enrollmentId,
      adminId
    });

    // Force sync the rejection across all admin sessions
    await crossSessionEnrollmentSync.forceSyncEnrollmentStatus(
      enrollmentId, 
      'rejected', 
      adminId
    );

    logger.info('✅ Enrollment rejection synced across all sessions');
    
    return { success: true };
  } catch (error) {
    logger.error('❌ Failed to reject enrollment with sync:', error);
    return { success: false, error };
  }
}

/**
 * Example: Getting sync health and statistics
 */
export function getSyncHealthExample() {
  const stats = crossSessionEnrollmentSync.getSyncStats();
  const isHealthy = crossSessionEnrollmentSync.isSyncHealthy();
  const activeSessions = crossSessionEnrollmentSync.getActiveSessions();

  logger.info('📊 Cross-session sync health check:', {
    isHealthy,
    stats: {
      activeSessions: stats.activeSessions,
      totalUpdates: stats.totalUpdates,
      syncLatency: stats.syncLatency,
      errors: stats.errors,
      uptime: Math.round(stats.uptime / 1000) + 's'
    },
    sessions: activeSessions.map(session => ({
      id: session.id,
      tabId: session.tabId,
      isActive: session.isActive,
      lastHeartbeat: session.lastHeartbeat
    }))
  });

  return {
    isHealthy,
    stats,
    activeSessions
  };
}

/**
 * Example: Monitoring sync performance
 */
export function monitorSyncPerformance() {
  const startTime = Date.now();
  let updateCount = 0;

  const unsubscribe = crossSessionEnrollmentSync.subscribe(
    'enrollment-update',
    (update) => {
      updateCount++;
      const latency = Date.now() - update.timestamp.getTime();
      
      logger.info('⚡ Sync performance metrics:', {
        updateCount,
        latency: `${latency}ms`,
        updateType: update.type,
        source: update.metadata?.source
      });
    }
  );

  // Monitor for 1 minute then report
  setTimeout(() => {
    const totalTime = Date.now() - startTime;
    const avgUpdatesPerSecond = updateCount / (totalTime / 1000);
    
    logger.info('📈 Sync performance report:', {
      duration: `${Math.round(totalTime / 1000)}s`,
      totalUpdates: updateCount,
      avgUpdatesPerSecond: avgUpdatesPerSecond.toFixed(2),
      syncHealth: crossSessionEnrollmentSync.isSyncHealthy()
    });
    
    unsubscribe();
  }, 60000);

  return unsubscribe;
}

// Mock UI update functions for the example
function updateEnrollmentUI(update: any) {
  // This would update the actual UI components
  logger.debug('🎨 Updating enrollment UI:', update);
}

function showNotification(message: string, type: 'success' | 'info' | 'warning' | 'error') {
  // This would show a toast notification
  logger.info(`🔔 Notification [${type}]: ${message}`);
}

function moveEnrollmentToApproved(enrollmentId: string) {
  // This would move the enrollment to the approved section
  logger.debug('✅ Moving enrollment to approved section:', enrollmentId);
}

function moveEnrollmentToPending(enrollmentId: string) {
  // This would move the enrollment to the pending section
  logger.debug('⏳ Moving enrollment to pending section:', enrollmentId);
}

function updateEnrollmentStatus(enrollmentId: string, status: string) {
  // This would update the enrollment status in the UI
  logger.debug('🔄 Updating enrollment status:', { enrollmentId, status });
}

/**
 * Example usage:
 * 
 * // Set up cross-session sync
 * const cleanup = setupCrossSessionSync();
 * 
 * // Admin actions with sync
 * await approveEnrollmentWithSync('enrollment-123', 'admin-456');
 * await rejectEnrollmentWithSync('enrollment-789', 'admin-456');
 * 
 * // Monitor sync health
 * const health = getSyncHealthExample();
 * 
 * // Monitor performance
 * const stopMonitoring = monitorSyncPerformance();
 * 
 * // Cleanup when done
 * cleanup();
 * stopMonitoring();
 */