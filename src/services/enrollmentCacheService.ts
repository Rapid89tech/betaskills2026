import { logger } from '@/utils/logger';

export interface CachedEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  enrolled_at: string;
  progress: number;
  last_updated: string;
  version: number;
}

export interface EnrollmentCacheOptions {
  ttl: number; // Time to live in milliseconds
  maxSize: number; // Maximum number of cached items
  enableCompression: boolean; // Enable data compression
  enablePersistence: boolean; // Persist to localStorage
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
  lastCleanup: string;
  memoryUsage: number;
}

export class EnrollmentCacheService {
  private static instance: EnrollmentCacheService;
  private cache: Map<string, CachedEnrollment> = new Map();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    size: 0,
    hitRate: 0,
    lastCleanup: new Date().toISOString(),
    memoryUsage: 0
  };
  private options: EnrollmentCacheOptions = {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 1000,
    enableCompression: true,
    enablePersistence: true
  };
  private cleanupInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.loadPersistedCache();
    this.startCleanupTimer();
  }

  public static getInstance(): EnrollmentCacheService {
    if (!EnrollmentCacheService.instance) {
      EnrollmentCacheService.instance = new EnrollmentCacheService();
    }
    return EnrollmentCacheService.instance;
  }

  /**
   * Get enrollment from cache
   */
  public get(key: string): CachedEnrollment | null {
    const cached = this.cache.get(key);
    
    if (!cached) {
      this.stats.misses++;
      this.updateStats();
      return null;
    }

    // Check if cache entry is expired
    const now = Date.now();
    const cacheTime = new Date(cached.last_updated).getTime();
    
    if (now - cacheTime > this.options.ttl) {
      this.cache.delete(key);
      this.stats.misses++;
      this.updateStats();
      return null;
    }

    this.stats.hits++;
    this.updateStats();
    
    logger.debug('📦 Cache hit for enrollment:', key);
    return cached;
  }

  /**
   * Set enrollment in cache
   */
  public set(key: string, enrollment: CachedEnrollment): void {
    const now = new Date().toISOString();
    const version = this.getVersion(key) + 1;
    
    const cachedEnrollment: CachedEnrollment = {
      ...enrollment,
      last_updated: now,
      version
    };

    // Check cache size limit
    if (this.cache.size >= this.options.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, cachedEnrollment);
    this.updateStats();

    // Persist to localStorage if enabled
    if (this.options.enablePersistence) {
      this.persistToStorage(key, cachedEnrollment);
    }

    logger.debug('💾 Cached enrollment:', key, 'version:', version);
  }

  /**
   * Get multiple enrollments from cache
   */
  public getMultiple(keys: string[]): Map<string, CachedEnrollment> {
    const results = new Map<string, CachedEnrollment>();
    
    for (const key of keys) {
      const cached = this.get(key);
      if (cached) {
        results.set(key, cached);
      }
    }

    return results;
  }

  /**
   * Set multiple enrollments in cache
   */
  public setMultiple(enrollments: Map<string, CachedEnrollment>): void {
    for (const [key, enrollment] of enrollments) {
      this.set(key, enrollment);
    }
  }

  /**
   * Invalidate cache entry
   */
  public invalidate(key: string): void {
    this.cache.delete(key);
    this.removeFromStorage(key);
    this.updateStats();
    
    logger.debug('🗑️ Invalidated cache for enrollment:', key);
  }

  /**
   * Invalidate multiple cache entries
   */
  public invalidateMultiple(keys: string[]): void {
    for (const key of keys) {
      this.invalidate(key);
    }
  }

  /**
   * Invalidate cache entries by pattern
   */
  public invalidateByPattern(pattern: string): void {
    const regex = new RegExp(pattern);
    const keysToInvalidate: string[] = [];
    
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        keysToInvalidate.push(key);
      }
    }
    
    this.invalidateMultiple(keysToInvalidate);
  }

  /**
   * Clear all cache entries
   */
  public clear(): void {
    this.cache.clear();
    this.clearStorage();
    this.updateStats();
    
    logger.info('🧹 Cleared all enrollment cache');
  }

  /**
   * Get cache statistics
   */
  public getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Get cache size
   */
  public getSize(): number {
    return this.cache.size;
  }

  /**
   * Check if cache contains key
   */
  public has(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    
    // Check if expired
    const now = Date.now();
    const cacheTime = new Date(cached.last_updated).getTime();
    return now - cacheTime <= this.options.ttl;
  }

  /**
   * Get all cache keys
   */
  public getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache entries by user ID
   */
  public getByUserId(userId: string): CachedEnrollment[] {
    const results: CachedEnrollment[] = [];
    
    for (const enrollment of this.cache.values()) {
      if (enrollment.user_id === userId) {
        results.push(enrollment);
      }
    }
    
    return results;
  }

  /**
   * Get cache entries by course ID
   */
  public getByCourseId(courseId: string): CachedEnrollment[] {
    const results: CachedEnrollment[] = [];
    
    for (const enrollment of this.cache.values()) {
      if (enrollment.course_id === courseId) {
        results.push(enrollment);
      }
    }
    
    return results;
  }

  /**
   * Update cache options
   */
  public updateOptions(options: Partial<EnrollmentCacheOptions>): void {
    this.options = { ...this.options, ...options };
    logger.info('⚙️ Updated cache options:', this.options);
  }

  /**
   * Force cache cleanup
   */
  public cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    for (const [key, enrollment] of this.cache) {
      const cacheTime = new Date(enrollment.last_updated).getTime();
      if (now - cacheTime > this.options.ttl) {
        keysToDelete.push(key);
      }
    }
    
    for (const key of keysToDelete) {
      this.cache.delete(key);
    }
    
    this.stats.lastCleanup = new Date().toISOString();
    this.updateStats();
    
    logger.info('🧹 Cache cleanup completed, removed:', keysToDelete.length, 'expired entries');
  }

  /**
   * Get version for cache key
   */
  private getVersion(key: string): number {
    const cached = this.cache.get(key);
    return cached ? cached.version : 0;
  }

  /**
   * Evict oldest cache entry
   */
  private evictOldest(): void {
    let oldestKey = '';
    let oldestTime = Date.now();
    
    for (const [key, enrollment] of this.cache) {
      const cacheTime = new Date(enrollment.last_updated).getTime();
      if (cacheTime < oldestTime) {
        oldestTime = cacheTime;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.removeFromStorage(oldestKey);
    }
  }

  /**
   * Update cache statistics
   */
  private updateStats(): void {
    this.stats.size = this.cache.size;
    this.stats.hitRate = this.stats.hits / (this.stats.hits + this.stats.misses) || 0;
    
    // Calculate memory usage (approximate)
    let memoryUsage = 0;
    for (const enrollment of this.cache.values()) {
      memoryUsage += JSON.stringify(enrollment).length * 2; // Rough estimate
    }
    this.stats.memoryUsage = memoryUsage;
  }

  /**
   * Start cleanup timer
   */
  private startCleanupTimer(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.options.ttl); // Cleanup every TTL period
  }

  /**
   * Persist cache entry to localStorage
   */
  private persistToStorage(key: string, enrollment: CachedEnrollment): void {
    try {
      const storageKey = `enrollment_cache_${key}`;
      localStorage.setItem(storageKey, JSON.stringify(enrollment));
    } catch (error) {
      logger.warn('⚠️ Failed to persist cache entry:', error);
    }
  }

  /**
   * Remove cache entry from localStorage
   */
  private removeFromStorage(key: string): void {
    try {
      const storageKey = `enrollment_cache_${key}`;
      localStorage.removeItem(storageKey);
    } catch (error) {
      logger.warn('⚠️ Failed to remove cache entry from storage:', error);
    }
  }

  /**
   * Load persisted cache from localStorage
   */
  private loadPersistedCache(): void {
    if (!this.options.enablePersistence) return;

    try {
      const now = Date.now();
      let loadedCount = 0;
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('enrollment_cache_')) {
          const enrollmentData = localStorage.getItem(key);
          if (enrollmentData) {
            const enrollment: CachedEnrollment = JSON.parse(enrollmentData);
            const cacheTime = new Date(enrollment.last_updated).getTime();
            
            // Only load if not expired
            if (now - cacheTime <= this.options.ttl) {
              const cacheKey = key.replace('enrollment_cache_', '');
              this.cache.set(cacheKey, enrollment);
              loadedCount++;
            } else {
              localStorage.removeItem(key);
            }
          }
        }
      }
      
      this.updateStats();
      logger.info('📂 Loaded', loadedCount, 'cached enrollments from localStorage');
    } catch (error) {
      logger.error('❌ Failed to load persisted cache:', error);
    }
  }

  /**
   * Clear localStorage cache
   */
  private clearStorage(): void {
    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('enrollment_cache_')) {
          keysToRemove.push(key);
        }
      }
      
      for (const key of keysToRemove) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      logger.warn('⚠️ Failed to clear storage cache:', error);
    }
  }

  /**
   * Destroy cache service
   */
  public destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
    logger.info('💥 Enrollment cache service destroyed');
  }
}

export const enrollmentCacheService = EnrollmentCacheService.getInstance();
