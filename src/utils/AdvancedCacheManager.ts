/**
 * Advanced Cache Manager for Course and Enrollment Data
 * Implements intelligent caching strategies with TTL, invalidation, and memory management
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
  size: number;
}

interface CacheConfig {
  maxSize: number; // Maximum cache size in MB
  defaultTTL: number; // Default TTL in milliseconds
  maxEntries: number; // Maximum number of cache entries
  cleanupInterval: number; // Cleanup interval in milliseconds
}

interface CacheStats {
  hitRate: number;
  missRate: number;
  totalRequests: number;
  totalHits: number;
  totalMisses: number;
  cacheSize: number;
  entryCount: number;
  memoryUsage: number;
}

class AdvancedCacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  private stats = {
    totalRequests: 0,
    totalHits: 0,
    totalMisses: 0
  };
  
  private config: CacheConfig = {
    maxSize: 50, // 50MB
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    maxEntries: 1000,
    cleanupInterval: 60 * 1000 // 1 minute
  };

  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(config?: Partial<CacheConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
    
    this.startCleanupTimer();
    this.setupMemoryPressureHandling();
  }

  /**
   * Get data from cache or execute fetch function
   */
  async get<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    this.stats.totalRequests++;

    const entry = this.cache.get(key);
    const now = Date.now();

    // Check if entry exists and is still valid
    if (entry && (now - entry.timestamp) < entry.ttl) {
      entry.accessCount++;
      entry.lastAccessed = now;
      this.stats.totalHits++;
      return entry.data;
    }

    // Cache miss - fetch new data
    this.stats.totalMisses++;
    
    try {
      const data = await fetchFn();
      const entryTTL = ttl || this.config.defaultTTL;
      
      // Calculate approximate size
      const size = this.calculateSize(data);
      
      // Store in cache
      this.set(key, data, entryTTL, size);
      
      return data;
    } catch (error) {
      // Return stale data if available on error
      if (entry) {
        console.warn(`Fetch failed for ${key}, returning stale data`);
        return entry.data;
      }
      throw error;
    }
  }

  /**
   * Set data in cache
   */
  set<T>(key: string, data: T, ttl?: number, size?: number): void {
    const now = Date.now();
    const entryTTL = ttl || this.config.defaultTTL;
    const entrySize = size || this.calculateSize(data);

    // Check if we need to make space
    this.ensureSpace(entrySize);

    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      ttl: entryTTL,
      accessCount: 1,
      lastAccessed: now,
      size: entrySize
    };

    this.cache.set(key, entry);
  }

  /**
   * Remove specific key from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear cache entries matching pattern
   */
  clearPattern(pattern: string | RegExp): number {
    let cleared = 0;
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
        cleared++;
      }
    }

    return cleared;
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    this.resetStats();
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const hitRate = this.stats.totalRequests > 0 
      ? (this.stats.totalHits / this.stats.totalRequests) * 100 
      : 0;
    
    const missRate = 100 - hitRate;
    const memoryUsage = this.calculateTotalSize();

    return {
      hitRate: Math.round(hitRate * 100) / 100,
      missRate: Math.round(missRate * 100) / 100,
      totalRequests: this.stats.totalRequests,
      totalHits: this.stats.totalHits,
      totalMisses: this.stats.totalMisses,
      cacheSize: this.cache.size,
      entryCount: this.cache.size,
      memoryUsage: Math.round(memoryUsage * 100) / 100
    };
  }

  /**
   * Prefetch data for future use
   */
  async prefetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl?: number
  ): Promise<void> {
    // Only prefetch if not already cached
    if (!this.cache.has(key)) {
      try {
        await this.get(key, fetchFn, ttl);
      } catch (error) {
        console.warn(`Prefetch failed for ${key}:`, error);
      }
    }
  }

  /**
   * Batch prefetch multiple keys
   */
  async batchPrefetch<T>(
    requests: Array<{
      key: string;
      fetchFn: () => Promise<T>;
      ttl?: number;
    }>
  ): Promise<void> {
    const prefetchPromises = requests
      .filter(req => !this.cache.has(req.key))
      .map(req => this.prefetch(req.key, req.fetchFn, req.ttl));

    await Promise.allSettled(prefetchPromises);
  }

  /**
   * Invalidate cache entries based on tags or patterns
   */
  invalidate(tags: string[]): number {
    let invalidated = 0;

    for (const tag of tags) {
      for (const key of this.cache.keys()) {
        if (key.includes(tag)) {
          this.cache.delete(key);
          invalidated++;
        }
      }
    }

    return invalidated;
  }

  /**
   * Get cache keys matching pattern
   */
  getKeys(pattern?: string | RegExp): string[] {
    const keys = Array.from(this.cache.keys());
    
    if (!pattern) return keys;
    
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    return keys.filter(key => regex.test(key));
  }

  /**
   * Check if key exists in cache and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    const now = Date.now();
    return (now - entry.timestamp) < entry.ttl;
  }

  /**
   * Update TTL for existing cache entry
   */
  updateTTL(key: string, newTTL: number): boolean {
    const entry = this.cache.get(key);
    if (entry) {
      entry.ttl = newTTL;
      entry.timestamp = Date.now(); // Reset timestamp
      return true;
    }
    return false;
  }

  /**
   * Private methods
   */
  private calculateSize(data: any): number {
    try {
      // Rough estimation of object size in bytes
      const jsonString = JSON.stringify(data);
      return new Blob([jsonString]).size / (1024 * 1024); // Convert to MB
    } catch {
      return 0.001; // Default small size if calculation fails
    }
  }

  private calculateTotalSize(): number {
    let totalSize = 0;
    for (const entry of this.cache.values()) {
      totalSize += entry.size;
    }
    return totalSize;
  }

  private ensureSpace(requiredSize: number): void {
    const currentSize = this.calculateTotalSize();
    
    // Check size limit
    if (currentSize + requiredSize > this.config.maxSize) {
      this.evictLRU(requiredSize);
    }
    
    // Check entry count limit
    if (this.cache.size >= this.config.maxEntries) {
      this.evictLRU(0);
    }
  }

  private evictLRU(requiredSize: number): void {
    // Sort entries by last accessed time (LRU)
    const entries = Array.from(this.cache.entries())
      .sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed);

    let freedSize = 0;
    let evicted = 0;

    for (const [key, entry] of entries) {
      this.cache.delete(key);
      freedSize += entry.size;
      evicted++;

      // Stop if we've freed enough space or removed enough entries
      if (freedSize >= requiredSize || evicted >= 10) {
        break;
      }
    }

    if (import.meta.env.DEV) {
      console.log(`Evicted ${evicted} cache entries, freed ${freedSize.toFixed(2)}MB`);
    }
  }

  private cleanup(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if ((now - entry.timestamp) >= entry.ttl) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (import.meta.env.DEV && cleaned > 0) {
      console.log(`Cleaned up ${cleaned} expired cache entries`);
    }
  }

  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  private setupMemoryPressureHandling(): void {
    // Handle memory pressure events if available
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        
        // If memory usage is high, aggressively clean cache
        if (memoryUsage > 0.8) {
          const beforeSize = this.cache.size;
          this.evictLRU(this.config.maxSize * 0.3); // Free 30% of max size
          
          if (import.meta.env.DEV) {
            console.warn(`High memory pressure detected, evicted ${beforeSize - this.cache.size} cache entries`);
          }
        }
      }, 30000); // Check every 30 seconds
    }
  }

  private resetStats(): void {
    this.stats = {
      totalRequests: 0,
      totalHits: 0,
      totalMisses: 0
    };
  }

  /**
   * Cleanup on destruction
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    this.clear();
  }
}

// Create singleton instance with optimized config for course/enrollment data
export const advancedCacheManager = new AdvancedCacheManager({
  maxSize: 30, // 30MB for course and enrollment data
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  maxEntries: 500,
  cleanupInterval: 2 * 60 * 1000 // 2 minutes
});

// Specialized cache instances for different data types
export const courseDataCache = new AdvancedCacheManager({
  maxSize: 15, // 15MB for course data
  defaultTTL: 10 * 60 * 1000, // 10 minutes (courses change less frequently)
  maxEntries: 200,
  cleanupInterval: 5 * 60 * 1000 // 5 minutes
});

export const enrollmentDataCache = new AdvancedCacheManager({
  maxSize: 10, // 10MB for enrollment data
  defaultTTL: 2 * 60 * 1000, // 2 minutes (enrollments change more frequently)
  maxEntries: 300,
  cleanupInterval: 60 * 1000 // 1 minute
});

export const userDataCache = new AdvancedCacheManager({
  maxSize: 5, // 5MB for user data
  defaultTTL: 15 * 60 * 1000, // 15 minutes (user data changes less frequently)
  maxEntries: 100,
  cleanupInterval: 10 * 60 * 1000 // 10 minutes
});

export default AdvancedCacheManager;