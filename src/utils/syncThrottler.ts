/**
 * Sync Throttler - Prevents infinite sync loops
 * This utility throttles and debounces sync operations to prevent
 * the application from getting overwhelmed and stopping
 */
import { logger } from './logger';

interface SyncOperation {
  id: string;
  timestamp: number;
  operation: () => Promise<void>;
}

class SyncThrottler {
  private static instance: SyncThrottler;
  private activeSyncs = new Map<string, SyncOperation>();
  private syncQueue: SyncOperation[] = [];
  private isProcessing = false;
  private lastSyncTime = 0;
  private readonly MIN_SYNC_INTERVAL = 5000; // 5 seconds minimum between syncs
  private readonly MAX_CONCURRENT_SYNCS = 2;
  private readonly SYNC_TIMEOUT = 30000; // 30 seconds timeout per sync

  private constructor() {
    this.startQueueProcessor();
  }

  public static getInstance(): SyncThrottler {
    if (!SyncThrottler.instance) {
      SyncThrottler.instance = new SyncThrottler();
    }
    return SyncThrottler.instance;
  }

  public async throttleSync(
    id: string, 
    operation: () => Promise<void>,
    force: boolean = false
  ): Promise<void> {
    // DISABLED: This throttler was causing form submissions to hang
    logger.warn(`Sync throttler disabled for: ${id}`);
    return;
  }

  private async executeSync(id: string, operation: () => Promise<void>): Promise<void> {
    const now = Date.now();
    this.lastSyncTime = now;
    
    const syncOp: SyncOperation = {
      id,
      timestamp: now,
      operation
    };

    this.activeSyncs.set(id, syncOp);
    
    try {
      logger.info(`Starting throttled sync: ${id}`);
      
      // Set a timeout for the sync operation
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`Sync timeout: ${id}`)), this.SYNC_TIMEOUT);
      });

      await Promise.race([operation(), timeoutPromise]);
      
      logger.info(`Completed throttled sync: ${id}`);
    } catch (error) {
      logger.error(`Throttled sync failed: ${id}`, error);
    } finally {
      this.activeSyncs.delete(id);
    }
  }

  private startQueueProcessor(): void {
    setInterval(() => {
      if (!this.isProcessing && this.syncQueue.length > 0 && this.activeSyncs.size < this.MAX_CONCURRENT_SYNCS) {
        this.processQueue();
      }
    }, 1000); // Check queue every second
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.syncQueue.length === 0) return;
    
    this.isProcessing = true;
    
    try {
      // Process up to MAX_CONCURRENT_SYNCS operations from queue
      const operationsToProcess = this.syncQueue.splice(0, this.MAX_CONCURRENT_SYNCS - this.activeSyncs.size);
      
      for (const syncOp of operationsToProcess) {
        await this.executeSync(syncOp.id, syncOp.operation);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  public getStatus(): {
    activeSyncs: number;
    queuedSyncs: number;
    lastSyncTime: number;
  } {
    return {
      activeSyncs: this.activeSyncs.size,
      queuedSyncs: this.syncQueue.length,
      lastSyncTime: this.lastSyncTime
    };
  }

  public clearQueue(): void {
    this.syncQueue = [];
    logger.info('Cleared sync queue');
  }

  public forceStopAll(): void {
    this.activeSyncs.clear();
    this.syncQueue = [];
    logger.info('Force stopped all sync operations');
  }
}

export const syncThrottler = SyncThrottler.getInstance();
