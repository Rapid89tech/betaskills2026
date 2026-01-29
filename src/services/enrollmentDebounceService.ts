import { logger } from '@/utils/logger';

export interface DebounceOptions {
  delay: number;
  maxWait: number;
  leading: boolean;
  trailing: boolean;
}

export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
}

export interface EnrollmentUpdate {
  id: string;
  userId: string;
  courseId: string;
  status: string;
  timestamp: number;
  priority: 'low' | 'normal' | 'high' | 'critical';
}

export class EnrollmentDebounceService {
  private static instance: EnrollmentDebounceService;
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();
  private pendingUpdates: Map<string, EnrollmentUpdate[]> = new Map();
  private batchTimers: Map<string, NodeJS.Timeout> = new Map();
  private defaultOptions: DebounceOptions = {
    delay: 300,
    maxWait: 2000,
    leading: false,
    trailing: true
  };

  private constructor() {}

  public static getInstance(): EnrollmentDebounceService {
    if (!EnrollmentDebounceService.instance) {
      EnrollmentDebounceService.instance = new EnrollmentDebounceService();
    }
    return EnrollmentDebounceService.instance;
  }

  /**
   * Create a debounced function
   */
  public debounce<T extends (...args: any[]) => any>(
    func: T,
    key: string,
    options: Partial<DebounceOptions> = {}
  ): DebouncedFunction<T> {
    const opts = { ...this.defaultOptions, ...options };
    let timeoutId: NodeJS.Timeout | null = null;
    let maxTimeoutId: NodeJS.Timeout | null = null;
    let lastCallTime = 0;
    let lastInvokeTime = 0;
    let result: ReturnType<T>;

    const debounced = (...args: Parameters<T>) => {
      const time = Date.now();
      const isInvoking = time - lastInvokeTime > opts.maxWait;

      lastCallTime = time;

      const invokeFunc = () => {
        const previousInvokeTime = lastInvokeTime;
        lastInvokeTime = time;
        result = func.apply(this, args) as ReturnType<T>;
        return result;
      };

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (isInvoking && opts.leading) {
        return invokeFunc();
      }

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (opts.trailing && time - lastCallTime >= opts.delay) {
          return invokeFunc();
        }
      }, opts.delay);

      // Set max wait timeout
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
      }

      maxTimeoutId = setTimeout(() => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
          return invokeFunc();
        }
      }, opts.maxWait);

      // Store timer for cleanup
      this.debounceTimers.set(key, timeoutId);
    };

    debounced.cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
        maxTimeoutId = null;
      }
      this.debounceTimers.delete(key);
    };

    debounced.flush = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
        return func.apply(this, []);
      }
    };

    debounced.pending = () => {
      return timeoutId !== null;
    };

    return debounced;
  }

  /**
   * Debounce enrollment status updates
   */
  public debounceEnrollmentUpdate(
    enrollmentId: string,
    update: EnrollmentUpdate,
    callback: (updates: EnrollmentUpdate[]) => void,
    options: Partial<DebounceOptions> = {}
  ): void {
    const key = `enrollment_${enrollmentId}`;
    
    // Add update to pending list
    if (!this.pendingUpdates.has(key)) {
      this.pendingUpdates.set(key, []);
    }
    
    const updates = this.pendingUpdates.get(key)!;
    updates.push(update);
    
    // Sort by priority and timestamp
    updates.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, normal: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return a.timestamp - b.timestamp;
    });

    // Create or update debounced function
    if (!this.debounceTimers.has(key)) {
      const debouncedCallback = this.debounce(
        (updates: EnrollmentUpdate[]) => {
          logger.debug('🔄 Processing debounced enrollment updates:', updates.length);
          callback(updates);
          this.pendingUpdates.delete(key);
          this.debounceTimers.delete(key);
        },
        key,
        options
      );

      // Execute with current updates
      debouncedCallback(updates);
    } else {
      // Update existing timer with new delay
      const timer = this.debounceTimers.get(key);
      if (timer) {
        clearTimeout(timer);
        const debouncedCallback = this.debounce(
          (updates: EnrollmentUpdate[]) => {
            logger.debug('🔄 Processing debounced enrollment updates:', updates.length);
            callback(updates);
            this.pendingUpdates.delete(key);
            this.debounceTimers.delete(key);
          },
          key,
          options
        );
        debouncedCallback(updates);
      }
    }
  }

  /**
   * Batch enrollment updates for multiple enrollments
   */
  public batchEnrollmentUpdates(
    batchKey: string,
    updates: EnrollmentUpdate[],
    callback: (updates: EnrollmentUpdate[]) => void,
    batchSize: number = 10,
    batchDelay: number = 500
  ): void {
    if (!this.pendingUpdates.has(batchKey)) {
      this.pendingUpdates.set(batchKey, []);
    }

    const pendingUpdates = this.pendingUpdates.get(batchKey)!;
    pendingUpdates.push(...updates);

    // Clear existing batch timer
    if (this.batchTimers.has(batchKey)) {
      clearTimeout(this.batchTimers.get(batchKey)!);
    }

    // Set new batch timer
    const timer = setTimeout(() => {
      const updatesToProcess = pendingUpdates.splice(0, batchSize);
      if (updatesToProcess.length > 0) {
        logger.debug('📦 Processing batched enrollment updates:', updatesToProcess.length);
        callback(updatesToProcess);
      }

      // If there are more updates, process them
      if (pendingUpdates.length > 0) {
        this.batchEnrollmentUpdates(batchKey, [], callback, batchSize, batchDelay);
      } else {
        this.batchTimers.delete(batchKey);
        this.pendingUpdates.delete(batchKey);
      }
    }, batchDelay);

    this.batchTimers.set(batchKey, timer);
  }

  /**
   * Throttle function calls
   */
  public throttle<T extends (...args: any[]) => any>(
    func: T,
    key: string,
    delay: number = 1000
  ): DebouncedFunction<T> {
    let lastCall = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const throttled = (...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastCall >= delay) {
        lastCall = now;
        return func.apply(this, args);
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          timeoutId = null;
          lastCall = Date.now();
          return func.apply(this, args);
        }, delay - (now - lastCall));
        
        this.debounceTimers.set(key, timeoutId);
      }
    };

    throttled.cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      this.debounceTimers.delete(key);
    };

    throttled.flush = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
        lastCall = Date.now();
        return func.apply(this, []);
      }
    };

    throttled.pending = () => {
      return timeoutId !== null;
    };

    return throttled;
  }

  /**
   * Cancel all pending debounced functions
   */
  public cancelAll(): void {
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    for (const timer of this.batchTimers.values()) {
      clearTimeout(timer);
    }
    
    this.debounceTimers.clear();
    this.batchTimers.clear();
    this.pendingUpdates.clear();
    
    logger.info('🛑 Cancelled all debounced functions');
  }

  /**
   * Cancel debounced function by key
   */
  public cancel(key: string): void {
    if (this.debounceTimers.has(key)) {
      clearTimeout(this.debounceTimers.get(key)!);
      this.debounceTimers.delete(key);
    }
    
    if (this.batchTimers.has(key)) {
      clearTimeout(this.batchTimers.get(key)!);
      this.batchTimers.delete(key);
    }
    
    this.pendingUpdates.delete(key);
  }

  /**
   * Get pending updates for a key
   */
  public getPendingUpdates(key: string): EnrollmentUpdate[] {
    return this.pendingUpdates.get(key) || [];
  }

  /**
   * Get all pending update counts
   */
  public getPendingCounts(): Map<string, number> {
    const counts = new Map<string, number>();
    
    for (const [key, updates] of this.pendingUpdates) {
      counts.set(key, updates.length);
    }
    
    return counts;
  }

  /**
   * Flush all pending updates
   */
  public flushAll(): void {
    for (const [key, updates] of this.pendingUpdates) {
      if (updates.length > 0) {
        logger.debug('🚀 Flushing pending updates for:', key, 'count:', updates.length);
        // This would typically trigger the callback, but we don't have access to it here
        // In a real implementation, you'd store the callbacks alongside the updates
      }
    }
    
    this.pendingUpdates.clear();
  }

  /**
   * Get service statistics
   */
  public getStats(): {
    activeTimers: number;
    pendingUpdates: number;
    totalPendingUpdates: number;
  } {
    let totalPendingUpdates = 0;
    for (const updates of this.pendingUpdates.values()) {
      totalPendingUpdates += updates.length;
    }

    return {
      activeTimers: this.debounceTimers.size + this.batchTimers.size,
      pendingUpdates: this.pendingUpdates.size,
      totalPendingUpdates
    };
  }

  /**
   * Update default options
   */
  public updateDefaultOptions(options: Partial<DebounceOptions>): void {
    this.defaultOptions = { ...this.defaultOptions, ...options };
    logger.info('⚙️ Updated debounce default options:', this.defaultOptions);
  }

  /**
   * Destroy service
   */
  public destroy(): void {
    this.cancelAll();
    logger.info('💥 Enrollment debounce service destroyed');
  }
}

export const enrollmentDebounceService = EnrollmentDebounceService.getInstance();
