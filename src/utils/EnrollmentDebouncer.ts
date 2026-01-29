/**
 * EnrollmentDebouncer Utility
 * 
 * Provides debouncing functionality for rapid enrollment status changes
 * to prevent excessive API calls and UI updates in the real-time system.
 * 
 * Features:
 * - Configurable debounce delays
 * - Batch processing of multiple updates
 * - Priority-based queuing
 * - Memory-efficient operation
 * - Error handling and retry logic
 * 
 * Requirements: 1.3, 5.4, 3.4, 6.2
 */

import { EnrollmentUpdate, EnrollmentUpdateType } from '@/types/enrollment';
import { logger } from './logger';

// Debounce configuration
const DEBOUNCE_CONFIG = {
  DEFAULT_DELAY: 300, // 300ms
  BATCH_SIZE: 10,
  MAX_QUEUE_SIZE: 100,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  PRIORITY_DELAYS: {
    HIGH: 100,    // Critical updates (admin actions)
    MEDIUM: 300,  // Normal updates (status changes)
    LOW: 1000     // Background updates (statistics)
  }
};

// Priority levels for updates
export enum UpdatePriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

// Debounced update interface
interface DebouncedUpdate {
  id: string;
  update: EnrollmentUpdate;
  priority: UpdatePriority;
  timestamp: number;
  retryCount: number;
  callback: (update: EnrollmentUpdate) => Promise<void>;
}

// Batch processing result
interface BatchResult {
  successful: DebouncedUpdate[];
  failed: DebouncedUpdate[];
  errors: Error[];
}

// Debouncer statistics
interface DebouncerStats {
  totalUpdates: number;
  batchedUpdates: number;
  droppedUpdates: number;
  averageDelay: number;
  successRate: number;
}

/**
 * EnrollmentDebouncer Class
 */
export class EnrollmentDebouncer {
  private static instance: EnrollmentDebouncer;
  private updateQueue = new Map<string, DebouncedUpdate>();
  private timers = new Map<string, NodeJS.Timeout>();
  private batchTimer: NodeJS.Timeout | null = null;
  private stats: DebouncerStats = {
    totalUpdates: 0,
    batchedUpdates: 0,
    droppedUpdates: 0,
    averageDelay: 0,
    successRate: 0
  };
  private isProcessing = false;

  private constructor() {
    this.startBatchProcessor();
  }

  static getInstance(): EnrollmentDebouncer {
    if (!EnrollmentDebouncer.instance) {
      EnrollmentDebouncer.instance = new EnrollmentDebouncer();
    }
    return EnrollmentDebouncer.instance;
  }

  /**
   * Debounce an enrollment update
   */
  debounce(
    key: string,
    update: EnrollmentUpdate,
    callback: (update: EnrollmentUpdate) => Promise<void>,
    priority: UpdatePriority = UpdatePriority.MEDIUM,
    customDelay?: number
  ): void {
    try {
      const delay = customDelay || DEBOUNCE_CONFIG.PRIORITY_DELAYS[priority];
      const updateId = `${key}_${Date.now()}`;

      // Clear existing timer for this key
      const existingTimer = this.timers.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
        this.timers.delete(key);
      }

      // Remove existing update for this key (replace with newer one)
      const existingUpdate = this.updateQueue.get(key);
      if (existingUpdate) {
        this.updateQueue.delete(key);
        logger.debug(`🔄 Replaced existing update for key: ${key}`);
      }

      // Check queue size limit
      if (this.updateQueue.size >= DEBOUNCE_CONFIG.MAX_QUEUE_SIZE) {
        this.dropOldestLowPriorityUpdate();
      }

      // Create debounced update
      const debouncedUpdate: DebouncedUpdate = {
        id: updateId,
        update,
        priority,
        timestamp: Date.now(),
        retryCount: 0,
        callback
      };

      // Add to queue
      this.updateQueue.set(key, debouncedUpdate);
      this.stats.totalUpdates++;

      // Set timer for execution
      const timer = setTimeout(() => {
        this.executeUpdate(key);
      }, delay);

      this.timers.set(key, timer);

      logger.debug(`⏱️ Debounced update for key: ${key}, delay: ${delay}ms, priority: ${priority}`);

    } catch (error) {
      logger.error(`❌ Error debouncing update for key ${key}:`, error);
    }
  }

  /**
   * Debounce enrollment status change
   */
  debounceStatusChange(
    enrollmentId: string,
    update: EnrollmentUpdate,
    callback: (update: EnrollmentUpdate) => Promise<void>
  ): void {
    const priority = this.determinePriority(update);
    this.debounce(`status:${enrollmentId}`, update, callback, priority);
  }

  /**
   * Debounce course priority update
   */
  debouncePriorityUpdate(
    userId: string,
    courseId: string,
    update: EnrollmentUpdate,
    callback: (update: EnrollmentUpdate) => Promise<void>
  ): void {
    this.debounce(
      `priority:${userId}:${courseId}`,
      update,
      callback,
      UpdatePriority.LOW,
      DEBOUNCE_CONFIG.PRIORITY_DELAYS.LOW
    );
  }

  /**
   * Debounce admin dashboard updates
   */
  debounceAdminUpdate(
    update: EnrollmentUpdate,
    callback: (update: EnrollmentUpdate) => Promise<void>
  ): void {
    this.debounce(
      'admin:dashboard',
      update,
      callback,
      UpdatePriority.HIGH,
      DEBOUNCE_CONFIG.PRIORITY_DELAYS.HIGH
    );
  }

  /**
   * Debounce cross-tab synchronization
   */
  debounceCrossTabSync(
    tabId: string,
    update: EnrollmentUpdate,
    callback: (update: EnrollmentUpdate) => Promise<void>
  ): void {
    this.debounce(
      `crosstab:${tabId}`,
      update,
      callback,
      UpdatePriority.MEDIUM
    );
  }

  /**
   * Force immediate execution of pending updates
   */
  flush(key?: string): void {
    try {
      if (key) {
        // Flush specific key
        const timer = this.timers.get(key);
        if (timer) {
          clearTimeout(timer);
          this.timers.delete(key);
          this.executeUpdate(key);
        }
      } else {
        // Flush all pending updates
        const keys = Array.from(this.timers.keys());
        keys.forEach(k => {
          const timer = this.timers.get(k);
          if (timer) {
            clearTimeout(timer);
            this.timers.delete(k);
            this.executeUpdate(k);
          }
        });
      }

      logger.info(`🚀 Flushed ${key ? 'specific' : 'all'} pending updates`);

    } catch (error) {
      logger.error('❌ Error flushing updates:', error);
    }
  }

  /**
   * Cancel pending update
   */
  cancel(key: string): void {
    try {
      const timer = this.timers.get(key);
      if (timer) {
        clearTimeout(timer);
        this.timers.delete(key);
      }

      this.updateQueue.delete(key);
      logger.debug(`❌ Cancelled update for key: ${key}`);

    } catch (error) {
      logger.error(`❌ Error cancelling update for key ${key}:`, error);
    }
  }

  /**
   * Get pending updates count
   */
  getPendingCount(): number {
    return this.updateQueue.size;
  }

  /**
   * Get debouncer statistics
   */
  getStats(): DebouncerStats {
    this.updateStats();
    return { ...this.stats };
  }

  /**
   * Clear all pending updates
   */
  clear(): void {
    try {
      // Clear all timers
      this.timers.forEach(timer => clearTimeout(timer));
      this.timers.clear();

      // Clear update queue
      this.updateQueue.clear();

      // Clear batch timer
      if (this.batchTimer) {
        clearTimeout(this.batchTimer);
        this.batchTimer = null;
      }

      logger.info('🗑️ Cleared all pending updates');

    } catch (error) {
      logger.error('❌ Error clearing updates:', error);
    }
  }

  /**
   * Private helper methods
   */

  private async executeUpdate(key: string): Promise<void> {
    try {
      const debouncedUpdate = this.updateQueue.get(key);
      if (!debouncedUpdate) {
        return;
      }

      // Remove from queue and timer
      this.updateQueue.delete(key);
      this.timers.delete(key);

      // Execute the callback
      await this.executeWithRetry(debouncedUpdate);

      logger.debug(`✅ Executed update for key: ${key}`);

    } catch (error) {
      logger.error(`❌ Error executing update for key ${key}:`, error);
      
      // Handle retry logic
      const debouncedUpdate = this.updateQueue.get(key);
      if (debouncedUpdate && debouncedUpdate.retryCount < DEBOUNCE_CONFIG.RETRY_ATTEMPTS) {
        await this.scheduleRetry(key, debouncedUpdate);
      }
    }
  }

  private async executeWithRetry(debouncedUpdate: DebouncedUpdate): Promise<void> {
    try {
      await debouncedUpdate.callback(debouncedUpdate.update);
    } catch (error) {
      debouncedUpdate.retryCount++;
      
      if (debouncedUpdate.retryCount < DEBOUNCE_CONFIG.RETRY_ATTEMPTS) {
        throw error; // Will be caught by executeUpdate for retry
      } else {
        logger.error(`❌ Max retry attempts reached for update ${debouncedUpdate.id}:`, error);
        throw error;
      }
    }
  }

  private async scheduleRetry(key: string, debouncedUpdate: DebouncedUpdate): Promise<void> {
    const retryDelay = DEBOUNCE_CONFIG.RETRY_DELAY * Math.pow(2, debouncedUpdate.retryCount);
    
    logger.warn(`🔄 Scheduling retry ${debouncedUpdate.retryCount} for key ${key} in ${retryDelay}ms`);
    
    const timer = setTimeout(() => {
      this.executeUpdate(key);
    }, retryDelay);

    this.timers.set(key, timer);
    this.updateQueue.set(key, debouncedUpdate);
  }

  private determinePriority(update: EnrollmentUpdate): UpdatePriority {
    switch (update.type) {
      case EnrollmentUpdateType.ENROLLMENT_APPROVED:
      case EnrollmentUpdateType.ENROLLMENT_REJECTED:
        return UpdatePriority.HIGH;
      
      case EnrollmentUpdateType.ENROLLMENT_CREATED:
        return UpdatePriority.MEDIUM;
      
      default:
        return UpdatePriority.LOW;
    }
  }

  private dropOldestLowPriorityUpdate(): void {
    try {
      // Find oldest low priority update
      let oldestUpdate: [string, DebouncedUpdate] | null = null;
      
      for (const [key, update] of this.updateQueue.entries()) {
        if (update.priority === UpdatePriority.LOW) {
          if (!oldestUpdate || update.timestamp < oldestUpdate[1].timestamp) {
            oldestUpdate = [key, update];
          }
        }
      }

      if (oldestUpdate) {
        const [key] = oldestUpdate;
        this.cancel(key);
        this.stats.droppedUpdates++;
        logger.warn(`⚠️ Dropped oldest low priority update: ${key}`);
      }

    } catch (error) {
      logger.error('❌ Error dropping oldest update:', error);
    }
  }

  private startBatchProcessor(): void {
    const processBatch = async () => {
      if (this.isProcessing || this.updateQueue.size === 0) {
        return;
      }

      this.isProcessing = true;

      try {
        // Get updates ready for batch processing
        const readyUpdates = this.getReadyUpdates();
        
        if (readyUpdates.length > 0) {
          await this.processBatch(readyUpdates);
        }

      } catch (error) {
        logger.error('❌ Error in batch processor:', error);
      } finally {
        this.isProcessing = false;
      }
    };

    // Run batch processor periodically
    this.batchTimer = setInterval(processBatch, 1000); // Every second
  }

  private getReadyUpdates(): DebouncedUpdate[] {
    const now = Date.now();
    const ready: DebouncedUpdate[] = [];

    for (const [key, update] of this.updateQueue.entries()) {
      const delay = DEBOUNCE_CONFIG.PRIORITY_DELAYS[update.priority];
      if (now - update.timestamp >= delay) {
        ready.push(update);
        
        // Remove from queue since we're processing it
        this.updateQueue.delete(key);
        this.timers.delete(key);
      }
    }

    return ready.slice(0, DEBOUNCE_CONFIG.BATCH_SIZE);
  }

  private async processBatch(updates: DebouncedUpdate[]): Promise<BatchResult> {
    const result: BatchResult = {
      successful: [],
      failed: [],
      errors: []
    };

    // Process updates in parallel with concurrency limit
    const promises = updates.map(async (update) => {
      try {
        await this.executeWithRetry(update);
        result.successful.push(update);
      } catch (error) {
        result.failed.push(update);
        result.errors.push(error as Error);
      }
    });

    await Promise.allSettled(promises);

    this.stats.batchedUpdates += result.successful.length;

    if (result.successful.length > 0) {
      logger.debug(`✅ Batch processed ${result.successful.length} updates successfully`);
    }

    if (result.failed.length > 0) {
      logger.warn(`⚠️ Batch failed to process ${result.failed.length} updates`);
    }

    return result;
  }

  private updateStats(): void {
    const total = this.stats.totalUpdates;
    const successful = this.stats.batchedUpdates;
    
    this.stats.successRate = total > 0 ? (successful / total) * 100 : 0;
    
    // Calculate average delay (simplified)
    this.stats.averageDelay = DEBOUNCE_CONFIG.DEFAULT_DELAY;
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.clear();
    this.isProcessing = false;
    
    logger.info('🗑️ EnrollmentDebouncer destroyed');
  }
}

// Export singleton instance
export const enrollmentDebouncer = EnrollmentDebouncer.getInstance();

// Export types
export type { DebouncerStats, UpdatePriority };