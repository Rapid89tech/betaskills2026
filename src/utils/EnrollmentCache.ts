/**
 * EnrollmentCache Utility
 * 
 * Provides intelligent caching for enrollment data to reduce API calls
 * and improve performance of the real-time enrollment system.
 * 
 * Features:
 * - Multi-level caching (memory + localStorage)
 * - TTL-based cache invalidation
 * - Cache warming and preloading
 * - Memory usage optimization
 * - Cache statistics and monitoring
 * 
 * Requirements: 1.3, 5.4, 3.4, 6.2
 */

import { Enrollment, EnrollmentStatus, CoursePriority } from '@/types/enrollment';
import { logger } from './logger';

// Cache configuration
const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  MAX_MEMORY_ITEMS: 1000,
  MAX_STORAGE_SIZE: 5 * 1024 * 1024, // 5MB
  CLEANUP_INTERVAL: 60 * 1000, // 1 minute
  PRELOAD_BATCH_SIZE: 50
};

// Cache entry interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
}

// Cache statistics interface
interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  memoryUsage: number;
  storageUsage: number;
  hitRate: number;
}

// Cache key types
type CacheKey = 
  | `user-enrollments:${string}`
  | `enrollment:${string}`
  | `course-priorities:${string}`
  | `pending-enrollments`
  | `enrollment-stats`
  | `user-course:${string}:${string}`;

/**
 * EnrollmentCache Class
 */
export class EnrollmentCache {
  private static instance: EnrollmentCache;
  private memoryCache = new Map<CacheKey, CacheEntry<any>>();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    evictions: 0,
    memoryUsage: 0,
    storageUsage: 0,
    hitRate: 0
  };
  private cleanupTimer: NodeJS.Timeout | null = null;
  private isInitialized = false;

  private constructor() {
    this.initializeCache();
  }

  static getInstance(): EnrollmentCache {
    if (!EnrollmentCache.instance) {
      EnrollmentCache.instance = new EnrollmentCache();
    }
    return EnrollmentCache.instance;
  }

  /**
   * Initialize cache system
   */
  private initializeCache(): void {
    if (this.isInitialized) return;

    try {
      // Load cache statistics from localStorage
      this.loadStatsFromStorage();
      
      // Start cleanup timer
      this.startCleanupTimer();
      
      // Warm up cache with frequently accessed data
      this.warmUpCache();
      
      this.isInitialized = true;
      logger.info('✅ EnrollmentCache initialized successfully');
      
    } catch (error) {
      logger.error('❌ Failed to initialize EnrollmentCache:', error);
    }
  }

  /**
   * Get data from cache
   */
  get<T>(key: CacheKey): T | null {
    try {
      // Check memory cache first
      const memoryEntry = this.memoryCache.get(key);
      if (memoryEntry && this.isEntryValid(memoryEntry)) {
        this.recordHit();
        this.updateAccessStats(memoryEntry);
        return memoryEntry.data;
      }

      // Check localStorage cache
      const storageEntry = this.getFromStorage<T>(key);
      if (storageEntry && this.isEntryValid(storageEntry)) {
        // Promote to memory cache
        this.memoryCache.set(key, storageEntry);
        this.recordHit();
        this.updateAccessStats(storageEntry);
        return storageEntry.data;
      }

      this.recordMiss();
      return null;

    } catch (error) {
      logger.error(`❌ Error getting cache entry for key ${key}:`, error);
      this.recordMiss();
      return null;
    }
  }

  /**
   * Set data in cache
   */
  set<T>(key: CacheKey, data: T, ttl: number = CACHE_CONFIG.DEFAULT_TTL): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl,
        accessCount: 1,
        lastAccessed: Date.now()
      };

      // Store in memory cache
      this.memoryCache.set(key, entry);
      
      // Store in localStorage for persistence
      this.setInStorage(key, entry);
      
      // Cleanup if memory cache is too large
      this.enforceMemoryLimit();
      
      logger.debug(`📦 Cached data for key: ${key}`);
      
    } catch (error) {
      logger.error(`❌ Error setting cache entry for key ${key}:`, error);
    }
  }

  /**
   * Get user enrollments with caching
   */
  async getUserEnrollments(userId: string, fetcher: () => Promise<Enrollment[]>): Promise<Enrollment[]> {
    const key: CacheKey = `user-enrollments:${userId}`;
    
    // Try cache first
    const cached = this.get<Enrollment[]>(key);
    if (cached) {
      logger.debug(`📦 Cache hit for user enrollments: ${userId}`);
      return cached;
    }

    // Fetch from source
    try {
      const enrollments = await fetcher();
      this.set(key, enrollments);
      logger.debug(`🔄 Fetched and cached user enrollments: ${userId}`);
      return enrollments;
    } catch (error) {
      logger.error(`❌ Error fetching user enrollments for ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get single enrollment with caching
   */
  async getEnrollment(enrollmentId: string, fetcher: () => Promise<Enrollment | null>): Promise<Enrollment | null> {
    const key: CacheKey = `enrollment:${enrollmentId}`;
    
    // Try cache first
    const cached = this.get<Enrollment>(key);
    if (cached) {
      logger.debug(`📦 Cache hit for enrollment: ${enrollmentId}`);
      return cached;
    }

    // Fetch from source
    try {
      const enrollment = await fetcher();
      if (enrollment) {
        this.set(key, enrollment);
        logger.debug(`🔄 Fetched and cached enrollment: ${enrollmentId}`);
      }
      return enrollment;
    } catch (error) {
      logger.error(`❌ Error fetching enrollment ${enrollmentId}:`, error);
      throw error;
    }
  }

  /**
   * Get course priorities with caching
   */
  async getCoursePriorities(userId: string, fetcher: () => Promise<CoursePriority[]>): Promise<CoursePriority[]> {
    const key: CacheKey = `course-priorities:${userId}`;
    
    // Try cache first
    const cached = this.get<CoursePriority[]>(key);
    if (cached) {
      logger.debug(`📦 Cache hit for course priorities: ${userId}`);
      return cached;
    }

    // Fetch from source
    try {
      const priorities = await fetcher();
      this.set(key, priorities);
      logger.debug(`🔄 Fetched and cached course priorities: ${userId}`);
      return priorities;
    } catch (error) {
      logger.error(`❌ Error fetching course priorities for ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get pending enrollments with caching
   */
  async getPendingEnrollments(fetcher: () => Promise<Enrollment[]>): Promise<Enrollment[]> {
    const key: CacheKey = 'pending-enrollments';
    
    // Try cache first (shorter TTL for admin data)
    const cached = this.get<Enrollment[]>(key);
    if (cached) {
      logger.debug('📦 Cache hit for pending enrollments');
      return cached;
    }

    // Fetch from source
    try {
      const enrollments = await fetcher();
      // Use shorter TTL for admin data that changes frequently
      this.set(key, enrollments, 2 * 60 * 1000); // 2 minutes
      logger.debug('🔄 Fetched and cached pending enrollments');
      return enrollments;
    } catch (error) {
      logger.error('❌ Error fetching pending enrollments:', error);
      throw error;
    }
  }

  /**
   * Invalidate cache entries
   */
  invalidate(pattern?: string): void {
    try {
      if (!pattern) {
        // Clear all cache
        this.memoryCache.clear();
        this.clearStorage();
        logger.info('🗑️ Cleared all cache entries');
        return;
      }

      // Clear entries matching pattern
      const keysToDelete: CacheKey[] = [];
      
      for (const key of this.memoryCache.keys()) {
        if (key.includes(pattern)) {
          keysToDelete.push(key);
        }
      }

      keysToDelete.forEach(key => {
        this.memoryCache.delete(key);
        this.removeFromStorage(key);
      });

      logger.info(`🗑️ Invalidated ${keysToDelete.length} cache entries matching pattern: ${pattern}`);
      
    } catch (error) {
      logger.error('❌ Error invalidating cache:', error);
    }
  }

  /**
   * Invalidate user-specific cache
   */
  invalidateUser(userId: string): void {
    this.invalidate(userId);
  }

  /**
   * Invalidate enrollment-specific cache
   */
  invalidateEnrollment(enrollmentId: string): void {
    this.invalidate(enrollmentId);
  }

  /**
   * Preload frequently accessed data
   */
  async preloadData(userId: string, courseIds: string[]): Promise<void> {
    try {
      logger.info(`🔄 Preloading data for user ${userId} and ${courseIds.length} courses`);
      
      // Preload in batches to avoid overwhelming the system
      const batches = this.createBatches(courseIds, CACHE_CONFIG.PRELOAD_BATCH_SIZE);
      
      for (const batch of batches) {
        await Promise.all(
          batch.map(async (courseId) => {
            const key: CacheKey = `user-course:${userId}:${courseId}`;
            // Only preload if not already cached
            if (!this.get(key)) {
              // This would typically call the actual fetcher
              // For now, we'll just mark the intent to preload
              logger.debug(`📋 Marked for preload: ${key}`);
            }
          })
        );
      }
      
    } catch (error) {
      logger.error('❌ Error preloading data:', error);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    this.updateStats();
    return { ...this.stats };
  }

  /**
   * Clear all cache data
   */
  clear(): void {
    this.memoryCache.clear();
    this.clearStorage();
    this.resetStats();
    logger.info('🗑️ Cache cleared completely');
  }

  /**
   * Private helper methods
   */

  private isEntryValid(entry: CacheEntry<any>): boolean {
    return Date.now() - entry.timestamp < entry.ttl;
  }

  private recordHit(): void {
    this.stats.hits++;
    this.updateHitRate();
  }

  private recordMiss(): void {
    this.stats.misses++;
    this.updateHitRate();
  }

  private updateAccessStats(entry: CacheEntry<any>): void {
    entry.accessCount++;
    entry.lastAccessed = Date.now();
  }

  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;
  }

  private enforceMemoryLimit(): void {
    if (this.memoryCache.size <= CACHE_CONFIG.MAX_MEMORY_ITEMS) {
      return;
    }

    // Remove least recently used entries
    const entries = Array.from(this.memoryCache.entries())
      .sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed);

    const toRemove = entries.slice(0, entries.length - CACHE_CONFIG.MAX_MEMORY_ITEMS);
    
    toRemove.forEach(([key]) => {
      this.memoryCache.delete(key);
      this.stats.evictions++;
    });

    logger.debug(`🗑️ Evicted ${toRemove.length} entries from memory cache`);
  }

  private getFromStorage<T>(key: CacheKey): CacheEntry<T> | null {
    try {
      const stored = localStorage.getItem(`enrollment-cache:${key}`);
      if (!stored) return null;

      return JSON.parse(stored);
    } catch (error) {
      logger.error(`❌ Error reading from storage for key ${key}:`, error);
      return null;
    }
  }

  private setInStorage<T>(key: CacheKey, entry: CacheEntry<T>): void {
    try {
      const serialized = JSON.stringify(entry);
      
      // Check storage size limit
      if (this.getStorageSize() + serialized.length > CACHE_CONFIG.MAX_STORAGE_SIZE) {
        this.cleanupStorage();
      }
      
      localStorage.setItem(`enrollment-cache:${key}`, serialized);
    } catch (error) {
      logger.error(`❌ Error writing to storage for key ${key}:`, error);
    }
  }

  private removeFromStorage(key: CacheKey): void {
    try {
      localStorage.removeItem(`enrollment-cache:${key}`);
    } catch (error) {
      logger.error(`❌ Error removing from storage for key ${key}:`, error);
    }
  }

  private clearStorage(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('enrollment-cache:')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      logger.error('❌ Error clearing storage:', error);
    }
  }

  private getStorageSize(): number {
    try {
      let size = 0;
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('enrollment-cache:')) {
          size += localStorage.getItem(key)?.length || 0;
        }
      });
      return size;
    } catch (error) {
      return 0;
    }
  }

  private cleanupStorage(): void {
    try {
      const entries: Array<[string, CacheEntry<any>]> = [];
      const keys = Object.keys(localStorage);
      
      keys.forEach(key => {
        if (key.startsWith('enrollment-cache:')) {
          try {
            const entry = JSON.parse(localStorage.getItem(key) || '');
            entries.push([key, entry]);
          } catch (error) {
            // Remove invalid entries
            localStorage.removeItem(key);
          }
        }
      });

      // Sort by last accessed and remove oldest entries
      entries.sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed);
      
      const toRemove = Math.ceil(entries.length * 0.3); // Remove 30% of entries
      entries.slice(0, toRemove).forEach(([key]) => {
        localStorage.removeItem(key);
      });

      logger.debug(`🗑️ Cleaned up ${toRemove} entries from storage`);
    } catch (error) {
      logger.error('❌ Error cleaning up storage:', error);
    }
  }

  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.performCleanup();
    }, CACHE_CONFIG.CLEANUP_INTERVAL);
  }

  private performCleanup(): void {
    try {
      // Remove expired entries from memory cache
      const expiredKeys: CacheKey[] = [];
      
      for (const [key, entry] of this.memoryCache.entries()) {
        if (!this.isEntryValid(entry)) {
          expiredKeys.push(key);
        }
      }

      expiredKeys.forEach(key => {
        this.memoryCache.delete(key);
        this.removeFromStorage(key);
      });

      if (expiredKeys.length > 0) {
        logger.debug(`🗑️ Cleaned up ${expiredKeys.length} expired entries`);
      }

      // Update statistics
      this.updateStats();
      
    } catch (error) {
      logger.error('❌ Error during cache cleanup:', error);
    }
  }

  private warmUpCache(): void {
    try {
      // This would typically preload frequently accessed data
      // For now, we'll just log the intent
      logger.info('🔥 Cache warm-up initiated');
    } catch (error) {
      logger.error('❌ Error warming up cache:', error);
    }
  }

  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  private updateStats(): void {
    this.stats.memoryUsage = this.memoryCache.size;
    this.stats.storageUsage = this.getStorageSize();
  }

  private loadStatsFromStorage(): void {
    try {
      const stored = localStorage.getItem('enrollment-cache:stats');
      if (stored) {
        const savedStats = JSON.parse(stored);
        this.stats = { ...this.stats, ...savedStats };
      }
    } catch (error) {
      logger.error('❌ Error loading stats from storage:', error);
    }
  }

  private saveStatsToStorage(): void {
    try {
      localStorage.setItem('enrollment-cache:stats', JSON.stringify(this.stats));
    } catch (error) {
      logger.error('❌ Error saving stats to storage:', error);
    }
  }

  private resetStats(): void {
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      memoryUsage: 0,
      storageUsage: 0,
      hitRate: 0
    };
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    
    this.saveStatsToStorage();
    this.memoryCache.clear();
    this.isInitialized = false;
    
    logger.info('🗑️ EnrollmentCache destroyed');
  }
}

// Export singleton instance
export const enrollmentCache = EnrollmentCache.getInstance();

// Export types
export type { CacheStats, CacheKey };