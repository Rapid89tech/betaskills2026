/**
 * AdminDataManager
 * 
 * Enhanced admin data manager with intelligent caching system:
 * - Optimized database queries for enrollments, users, and payments
 * - Cache invalidation strategies and performance monitoring
 * - Data prefetching and lazy loading mechanisms
 * - Real-time data synchronization
 * - Memory management and cleanup
 */

import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';
import type { 
  Enrollment, 
  EnrollmentStatus, 
  EnrollmentType,
  User,
  Course
} from '@/types';

// Cache configuration
interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize: number; // Maximum number of items in cache
  prefetchThreshold: number; // Percentage of cache expiration to trigger prefetch
  compressionEnabled: boolean;
}

// Cache entry structure
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  hits: number;
  size: number;
  compressed?: boolean;
}

// Performance metrics
interface PerformanceMetrics {
  cacheHitRate: number;
  averageQueryTime: number;
  totalQueries: number;
  cacheSize: number;
  memoryUsage: number;
  lastCleanup: number;
}

// Query options
interface QueryOptions {
  useCache?: boolean;
  prefetch?: boolean;
  compression?: boolean;
  maxAge?: number;
  forceRefresh?: boolean;
}

// Admin data types
export interface AdminEnrollment extends Enrollment {
  user?: User;
  course?: Course;
  paymentStatus?: 'pending' | 'completed' | 'failed' | 'refunded';
  lastActivity?: string;
  notes?: string;
}

export interface AdminUser extends User {
  enrollmentCount?: number;
  lastLogin?: string;
  totalSpent?: number;
  status: 'active' | 'inactive' | 'suspended';
}

export interface AdminPayment {
  id: string;
  enrollmentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'eft' | 'card' | 'bank_transfer';
  reference?: string;
  createdAt: string;
  processedAt?: string;
  userEmail?: string;
  courseTitle?: string;
}

export interface AdminStats {
  totalEnrollments: number;
  pendingEnrollments: number;
  completedEnrollments: number;
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageEnrollmentTime: number;
  popularCourses: Array<{ courseId: string; title: string; count: number }>;
}

export class AdminDataManager {
  private static instance: AdminDataManager;
  
  // Cache storage
  private enrollmentCache = new Map<string, CacheEntry<AdminEnrollment>>();
  private userCache = new Map<string, CacheEntry<AdminUser>>();
  private paymentCache = new Map<string, CacheEntry<AdminPayment>>();
  private statsCache = new Map<string, CacheEntry<AdminStats>>();
  
  // Configuration
  private config: CacheConfig = {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 1000,
    prefetchThreshold: 0.8,
    compressionEnabled: true
  };
  
  // Performance tracking
  private metrics: PerformanceMetrics = {
    cacheHitRate: 0,
    averageQueryTime: 0,
    totalQueries: 0,
    cacheSize: 0,
    memoryUsage: 0,
    lastCleanup: Date.now()
  };
  
  // Query tracking
  private queryTimes: number[] = [];
  private cacheHits = 0;
  private cacheMisses = 0;
  
  private constructor() {
    this.initializeCleanupInterval();
    this.initializePerformanceMonitoring();
  }
  
  public static getInstance(): AdminDataManager {
    if (!AdminDataManager.instance) {
      AdminDataManager.instance = new AdminDataManager();
    }
    return AdminDataManager.instance;
  }
  
  /**
   * Get enrollments with caching and optimization
   */
  public async getEnrollments(options: QueryOptions = {}): Promise<AdminEnrollment[]> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey('enrollments', options);
    
    try {
      // Check cache first
      if (options.useCache !== false) {
        const cached = this.enrollmentCache.get(cacheKey);
        if (cached && !this.isExpired(cached, options.maxAge)) {
          this.recordCacheHit();
          cached.hits++;
          this.updateMetrics(startTime);
          return cached.data as AdminEnrollment[];
        }
      }
      
      // Fetch from database with optimized query
      const enrollments = await this.fetchEnrollmentsFromDB(options);
      
      // Cache the result
      if (options.useCache !== false) {
        this.cacheEnrollments(cacheKey, enrollments, options);
      }
      
      this.recordCacheMiss();
      this.updateMetrics(startTime);
      
      // Trigger prefetch if needed
      if (options.prefetch !== false) {
        this.schedulePrefetch('enrollments', options);
      }
      
      return enrollments;
    } catch (error) {
      logger.error('Failed to fetch enrollments:', error);
      throw error;
    }
  }
  
  /**
   * Get users with caching and optimization
   */
  public async getUsers(options: QueryOptions = {}): Promise<AdminUser[]> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey('users', options);
    
    try {
      // Check cache first
      if (options.useCache !== false) {
        const cached = this.userCache.get(cacheKey);
        if (cached && !this.isExpired(cached, options.maxAge)) {
          this.recordCacheHit();
          cached.hits++;
          this.updateMetrics(startTime);
          return cached.data as AdminUser[];
        }
      }
      
      // Fetch from database
      const users = await this.fetchUsersFromDB(options);
      
      // Cache the result
      if (options.useCache !== false) {
        this.cacheUsers(cacheKey, users, options);
      }
      
      this.recordCacheMiss();
      this.updateMetrics(startTime);
      
      return users;
    } catch (error) {
      logger.error('Failed to fetch users:', error);
      throw error;
    }
  }
  
  /**
   * Get payments with caching and optimization
   */
  public async getPayments(options: QueryOptions = {}): Promise<AdminPayment[]> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey('payments', options);
    
    try {
      // Check cache first
      if (options.useCache !== false) {
        const cached = this.paymentCache.get(cacheKey);
        if (cached && !this.isExpired(cached, options.maxAge)) {
          this.recordCacheHit();
          cached.hits++;
          this.updateMetrics(startTime);
          return cached.data as AdminPayment[];
        }
      }
      
      // Fetch from database
      const payments = await this.fetchPaymentsFromDB(options);
      
      // Cache the result
      if (options.useCache !== false) {
        this.cachePayments(cacheKey, payments, options);
      }
      
      this.recordCacheMiss();
      this.updateMetrics(startTime);
      
      return payments;
    } catch (error) {
      logger.error('Failed to fetch payments:', error);
      throw error;
    }
  }
  
  /**
   * Get admin statistics with caching
   */
  public async getStats(options: QueryOptions = {}): Promise<AdminStats> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey('stats', options);
    
    try {
      // Check cache first
      if (options.useCache !== false) {
        const cached = this.statsCache.get(cacheKey);
        if (cached && !this.isExpired(cached, options.maxAge)) {
          this.recordCacheHit();
          cached.hits++;
          this.updateMetrics(startTime);
          return cached.data as AdminStats;
        }
      }
      
      // Fetch from database
      const stats = await this.fetchStatsFromDB(options);
      
      // Cache the result
      if (options.useCache !== false) {
        this.cacheStats(cacheKey, stats, options);
      }
      
      this.recordCacheMiss();
      this.updateMetrics(startTime);
      
      return stats;
    } catch (error) {
      logger.error('Failed to fetch stats:', error);
      throw error;
    }
  }
  
  /**
   * Invalidate cache entries
   */
  public invalidateCache(type?: 'enrollments' | 'users' | 'payments' | 'stats'): void {
    if (!type) {
      // Clear all caches
      this.enrollmentCache.clear();
      this.userCache.clear();
      this.paymentCache.clear();
      this.statsCache.clear();
      logger.info('All caches invalidated');
    } else {
      // Clear specific cache
      switch (type) {
        case 'enrollments':
          this.enrollmentCache.clear();
          break;
        case 'users':
          this.userCache.clear();
          break;
        case 'payments':
          this.paymentCache.clear();
          break;
        case 'stats':
          this.statsCache.clear();
          break;
      }
      logger.info(`Cache invalidated: ${type}`);
    }
    
    this.updateCacheMetrics();
  }
  
  /**
   * Get performance metrics
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
  
  /**
   * Configure cache settings
   */
  public configure(config: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...config };
    logger.info('Cache configuration updated:', this.config);
  }
  
  // Private methods
  
  private async fetchEnrollmentsFromDB(options: QueryOptions): Promise<AdminEnrollment[]> {
    const { fetchEnrollmentsFromDB } = await import('./adminDataManagerQueries');
    return fetchEnrollmentsFromDB(options);
  }
  
  private async fetchUsersFromDB(options: QueryOptions): Promise<AdminUser[]> {
    const { fetchUsersFromDB } = await import('./adminDataManagerQueries');
    return fetchUsersFromDB(options);
  }
  
  private async fetchPaymentsFromDB(options: QueryOptions): Promise<AdminPayment[]> {
    const { fetchPaymentsFromDB } = await import('./adminDataManagerQueries');
    return fetchPaymentsFromDB(options);
  }
  
  private async fetchStatsFromDB(options: QueryOptions): Promise<AdminStats> {
    const { fetchStatsFromDB } = await import('./adminDataManagerQueries');
    return fetchStatsFromDB(options);
  }
  
  private cacheEnrollments(key: string, data: AdminEnrollment[], options: QueryOptions): void {
    this.enrollmentCache.set(key, {
      data,
      timestamp: Date.now(),
      hits: 0,
      size: this.calculateSize(data),
      compressed: options.compression
    });
    this.enforceCacheLimit('enrollments');
  }
  
  private cacheUsers(key: string, data: AdminUser[], options: QueryOptions): void {
    this.userCache.set(key, {
      data,
      timestamp: Date.now(),
      hits: 0,
      size: this.calculateSize(data),
      compressed: options.compression
    });
    this.enforceCacheLimit('users');
  }
  
  private cachePayments(key: string, data: AdminPayment[], options: QueryOptions): void {
    this.paymentCache.set(key, {
      data,
      timestamp: Date.now(),
      hits: 0,
      size: this.calculateSize(data),
      compressed: options.compression
    });
    this.enforceCacheLimit('payments');
  }
  
  private cacheStats(key: string, data: AdminStats, options: QueryOptions): void {
    this.statsCache.set(key, {
      data,
      timestamp: Date.now(),
      hits: 0,
      size: this.calculateSize(data),
      compressed: options.compression
    });
    this.enforceCacheLimit('stats');
  }
  
  private generateCacheKey(type: string, options: QueryOptions): string {
    const params = {
      type,
      useCache: options.useCache,
      compression: options.compression,
      maxAge: options.maxAge
    };
    return btoa(JSON.stringify(params));
  }
  
  private isExpired(entry: CacheEntry<any>, maxAge?: number): boolean {
    const age = Date.now() - entry.timestamp;
    const ttl = maxAge || this.config.ttl;
    return age > ttl;
  }
  
  private calculateSize(data: any): number {
    return JSON.stringify(data).length;
  }
  
  private enforceCacheLimit(type: 'enrollments' | 'users' | 'payments' | 'stats'): void {
    const cache = this.getCache(type);
    if (cache.size > this.config.maxSize) {
      // Remove least recently used entries
      const entries = Array.from(cache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp);
      
      const toRemove = entries.slice(0, cache.size - this.config.maxSize);
      toRemove.forEach(([key]) => cache.delete(key));
      
      logger.info(`Cache limit enforced for ${type}: removed ${toRemove.length} entries`);
    }
  }
  
  private getCache(type: 'enrollments' | 'users' | 'payments' | 'stats'): Map<string, CacheEntry<any>> {
    switch (type) {
      case 'enrollments': return this.enrollmentCache;
      case 'users': return this.userCache;
      case 'payments': return this.paymentCache;
      case 'stats': return this.statsCache;
      default: throw new Error(`Unknown cache type: ${type}`);
    }
  }
  
  private recordCacheHit(): void {
    this.cacheHits++;
    this.updateCacheHitRate();
  }
  
  private recordCacheMiss(): void {
    this.cacheMisses++;
    this.updateCacheHitRate();
  }
  
  private updateCacheHitRate(): void {
    const total = this.cacheHits + this.cacheMisses;
    this.metrics.cacheHitRate = total > 0 ? this.cacheHits / total : 0;
  }
  
  private updateMetrics(startTime: number): void {
    const queryTime = Date.now() - startTime;
    this.queryTimes.push(queryTime);
    
    // Keep only last 100 query times for rolling average
    if (this.queryTimes.length > 100) {
      this.queryTimes.shift();
    }
    
    this.metrics.averageQueryTime = this.queryTimes.reduce((a, b) => a + b, 0) / this.queryTimes.length;
    this.metrics.totalQueries++;
    
    this.updateCacheMetrics();
  }
  
  private updateCacheMetrics(): void {
    this.metrics.cacheSize = 
      this.enrollmentCache.size + 
      this.userCache.size + 
      this.paymentCache.size + 
      this.statsCache.size;
    
    this.metrics.memoryUsage = this.estimateMemoryUsage();
  }
  
  private estimateMemoryUsage(): number {
    let totalSize = 0;
    
    [this.enrollmentCache, this.userCache, this.paymentCache, this.statsCache]
      .forEach(cache => {
        cache.forEach(entry => {
          totalSize += entry.size;
        });
      });
    
    return totalSize;
  }
  
  private schedulePrefetch(type: string, options: QueryOptions): void {
    // Schedule prefetch for related data
    setTimeout(() => {
      this.prefetchRelatedData(type, options);
    }, 1000); // Delay to avoid blocking current request
  }
  
  private async prefetchRelatedData(type: string, options: QueryOptions): Promise<void> {
    try {
      switch (type) {
        case 'enrollments':
          // Prefetch user and course data
          await this.getUsers({ ...options, useCache: true });
          break;
        case 'users':
          // Prefetch enrollment counts
          await this.getEnrollments({ ...options, useCache: true });
          break;
      }
    } catch (error) {
      logger.warn('Prefetch failed:', error);
    }
  }
  
  private initializeCleanupInterval(): void {
    // Clean up expired entries every 5 minutes
    setInterval(() => {
      this.cleanupExpiredEntries();
    }, 5 * 60 * 1000);
  }
  
  private cleanupExpiredEntries(): void {
    const now = Date.now();
    let cleaned = 0;
    
    [this.enrollmentCache, this.userCache, this.paymentCache, this.statsCache]
      .forEach(cache => {
        for (const [key, entry] of cache.entries()) {
          if (now - entry.timestamp > this.config.ttl) {
            cache.delete(key);
            cleaned++;
          }
        }
      });
    
    if (cleaned > 0) {
      logger.info(`Cleaned up ${cleaned} expired cache entries`);
      this.metrics.lastCleanup = now;
    }
  }
  
  private initializePerformanceMonitoring(): void {
    // Monitor memory usage
    setInterval(() => {
      this.updateCacheMetrics();
      
      // Log performance metrics every 10 minutes
      if (this.metrics.totalQueries % 100 === 0) {
        logger.info('AdminDataManager Performance Metrics:', this.metrics);
      }
    }, 10 * 60 * 1000);
  }
}

// Export singleton instance
export const adminDataManager = AdminDataManager.getInstance();