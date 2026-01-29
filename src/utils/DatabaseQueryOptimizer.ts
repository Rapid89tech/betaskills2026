/**
 * Database Query Optimizer
 * Optimizes Supabase queries for better performance with batching, pagination, and intelligent filtering
 */

import { supabase } from '@/integrations/supabase/client';
import { advancedCacheManager } from './AdvancedCacheManager';

interface QueryConfig {
  enableCaching: boolean;
  cacheTTL: number;
  enableBatching: boolean;
  batchSize: number;
  enablePagination: boolean;
  pageSize: number;
  enableIndexHints: boolean;
}

interface BatchQuery {
  id: string;
  table: string;
  query: any;
  resolve: (data: any) => void;
  reject: (error: any) => void;
}

interface PaginatedResult<T> {
  data: T[];
  count: number;
  hasMore: boolean;
  nextPage: number;
}

class DatabaseQueryOptimizer {
  private config: QueryConfig = {
    enableCaching: true,
    cacheTTL: 5 * 60 * 1000, // 5 minutes
    enableBatching: true,
    batchSize: 10,
    enablePagination: true,
    pageSize: 50,
    enableIndexHints: true
  };

  private batchQueue: BatchQuery[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private readonly BATCH_DELAY = 50; // 50ms batch delay

  constructor(config?: Partial<QueryConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  /**
   * Optimized query for user enrollments with caching and filtering
   */
  async getUserEnrollments(
    userId: string,
    options: {
      status?: 'pending' | 'approved' | 'rejected';
      limit?: number;
      useCache?: boolean;
    } = {}
  ): Promise<any[]> {
    const { status, limit = 100, useCache = true } = options;
    const cacheKey = `user-enrollments-${userId}-${status || 'all'}-${limit}`;

    if (useCache && this.config.enableCaching) {
      return advancedCacheManager.get(
        cacheKey,
        () => this.fetchUserEnrollments(userId, status, limit),
        this.config.cacheTTL
      );
    }

    return this.fetchUserEnrollments(userId, status, limit);
  }

  /**
   * Optimized query for all enrollments with pagination and filtering
   */
  async getAllEnrollments(
    options: {
      status?: 'pending' | 'approved' | 'rejected';
      page?: number;
      pageSize?: number;
      useCache?: boolean;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    } = {}
  ): Promise<PaginatedResult<any>> {
    const {
      status,
      page = 1,
      pageSize = this.config.pageSize,
      useCache = true,
      sortBy = 'enrolled_at',
      sortOrder = 'desc'
    } = options;

    const cacheKey = `all-enrollments-${status || 'all'}-${page}-${pageSize}-${sortBy}-${sortOrder}`;

    if (useCache && this.config.enableCaching) {
      return advancedCacheManager.get(
        cacheKey,
        () => this.fetchAllEnrollments(status, page, pageSize, sortBy, sortOrder),
        this.config.cacheTTL
      );
    }

    return this.fetchAllEnrollments(status, page, pageSize, sortBy, sortOrder);
  }

  /**
   * Optimized query for user profiles with selective field loading
   */
  async getAllUsers(
    options: {
      role?: string;
      approvalStatus?: string;
      fields?: string[];
      limit?: number;
      useCache?: boolean;
    } = {}
  ): Promise<any[]> {
    const {
      role,
      approvalStatus,
      fields = ['id', 'email', 'first_name', 'last_name', 'role', 'approval_status', 'created_at'],
      limit = 100,
      useCache = true
    } = options;

    const cacheKey = `all-users-${role || 'all'}-${approvalStatus || 'all'}-${limit}`;

    if (useCache && this.config.enableCaching) {
      return advancedCacheManager.get(
        cacheKey,
        () => this.fetchAllUsers(role, approvalStatus, fields, limit),
        this.config.cacheTTL * 2 // User data changes less frequently
      );
    }

    return this.fetchAllUsers(role, approvalStatus, fields, limit);
  }

  /**
   * Batch multiple enrollment status updates
   */
  async batchUpdateEnrollmentStatus(
    updates: Array<{
      enrollmentId: string;
      status: 'approved' | 'rejected';
    }>
  ): Promise<{ success: boolean; results: any[] }> {
    if (!this.config.enableBatching || updates.length === 1) {
      // Single update or batching disabled
      const results = await Promise.allSettled(
        updates.map(update => this.updateSingleEnrollmentStatus(update.enrollmentId, update.status))
      );
      
      return {
        success: results.every(r => r.status === 'fulfilled'),
        results: results.map(r => r.status === 'fulfilled' ? r.value : r.reason)
      };
    }

    // Batch update using RPC or multiple queries
    const batches = this.chunkArray(updates, this.config.batchSize);
    const allResults: any[] = [];

    for (const batch of batches) {
      try {
        const batchResults = await Promise.allSettled(
          batch.map(update => this.updateSingleEnrollmentStatus(update.enrollmentId, update.status))
        );
        
        allResults.push(...batchResults.map(r => 
          r.status === 'fulfilled' ? r.value : r.reason
        ));
      } catch (error) {
        console.error('Batch update failed:', error);
        allResults.push(...batch.map(() => error));
      }

      // Small delay between batches to prevent overwhelming the database
      if (batches.length > 1) {
        await this.delay(10);
      }
    }

    // Invalidate related cache entries
    this.invalidateEnrollmentCache();

    return {
      success: allResults.every(r => r !== null && typeof r === 'object'),
      results: allResults
    };
  }

  /**
   * Optimized course data fetching with relationship loading
   */
  async getCourseData(
    courseId: string,
    options: {
      includeEnrollments?: boolean;
      includeProgress?: boolean;
      userId?: string;
      useCache?: boolean;
    } = {}
  ): Promise<any> {
    const { includeEnrollments = false, includeProgress = false, userId, useCache = true } = options;
    const cacheKey = `course-data-${courseId}-${includeEnrollments}-${includeProgress}-${userId || 'none'}`;

    if (useCache && this.config.enableCaching) {
      return advancedCacheManager.get(
        cacheKey,
        () => this.fetchCourseData(courseId, includeEnrollments, includeProgress, userId),
        this.config.cacheTTL * 3 // Course data changes less frequently
      );
    }

    return this.fetchCourseData(courseId, includeEnrollments, includeProgress, userId);
  }

  /**
   * Optimized search with full-text search and filtering
   */
  async searchEnrollments(
    searchTerm: string,
    options: {
      status?: string;
      limit?: number;
      useCache?: boolean;
    } = {}
  ): Promise<any[]> {
    const { status, limit = 50, useCache = true } = options;
    const cacheKey = `search-enrollments-${searchTerm}-${status || 'all'}-${limit}`;

    if (useCache && this.config.enableCaching) {
      return advancedCacheManager.get(
        cacheKey,
        () => this.performEnrollmentSearch(searchTerm, status, limit),
        this.config.cacheTTL / 2 // Search results have shorter TTL
      );
    }

    return this.performEnrollmentSearch(searchTerm, status, limit);
  }

  /**
   * Prefetch related data for better performance
   */
  async prefetchUserData(userId: string): Promise<void> {
    const prefetchPromises = [
      this.getUserEnrollments(userId, { useCache: true }),
      // Prefetch user profile if not already cached
      advancedCacheManager.prefetch(
        `user-profile-${userId}`,
        () => this.fetchUserProfile(userId)
      )
    ];

    await Promise.allSettled(prefetchPromises);
  }

  /**
   * Prefetch admin dashboard data
   */
  async prefetchAdminData(): Promise<void> {
    const prefetchPromises = [
      this.getAllEnrollments({ status: 'pending', useCache: true }),
      this.getAllUsers({ limit: 50, useCache: true }),
      // Prefetch enrollment statistics
      advancedCacheManager.prefetch(
        'enrollment-stats',
        () => this.fetchEnrollmentStats()
      )
    ];

    await Promise.allSettled(prefetchPromises);
  }

  /**
   * Clear cache for specific patterns
   */
  invalidateCache(patterns: string[]): void {
    patterns.forEach(pattern => {
      advancedCacheManager.clearPattern(pattern);
    });
  }

  /**
   * Clear enrollment-related cache
   */
  invalidateEnrollmentCache(): void {
    this.invalidateCache([
      'user-enrollments-',
      'all-enrollments-',
      'enrollment-stats',
      'search-enrollments-'
    ]);
  }

  /**
   * Clear user-related cache
   */
  invalidateUserCache(): void {
    this.invalidateCache([
      'all-users-',
      'user-profile-'
    ]);
  }

  /**
   * Get query performance statistics
   */
  getPerformanceStats(): any {
    return {
      cache: advancedCacheManager.getStats(),
      config: this.config
    };
  }

  /**
   * Private helper methods
   */
  private async fetchUserEnrollments(
    userId: string,
    status?: string,
    limit: number = 100
  ): Promise<any[]> {
    let query = supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .order('enrolled_at', { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch user enrollments: ${error.message}`);
    }

    return data || [];
  }

  private async fetchAllEnrollments(
    status?: string,
    page: number = 1,
    pageSize: number = 50,
    sortBy: string = 'enrolled_at',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<PaginatedResult<any>> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('enrollments')
      .select('*', { count: 'exact' })
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(from, to);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch enrollments: ${error.message}`);
    }

    return {
      data: data || [],
      count: count || 0,
      hasMore: (count || 0) > page * pageSize,
      nextPage: page + 1
    };
  }

  private async fetchAllUsers(
    role?: string,
    approvalStatus?: string,
    fields: string[] = ['*'],
    limit: number = 100
  ): Promise<any[]> {
    let query = supabase
      .from('profiles')
      .select(fields.join(', '))
      .order('created_at', { ascending: false })
      .limit(limit);

    if (role) {
      query = query.eq('role', role);
    }

    if (approvalStatus) {
      query = query.eq('approval_status', approvalStatus);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    return data || [];
  }

  private async updateSingleEnrollmentStatus(
    enrollmentId: string,
    status: 'approved' | 'rejected'
  ): Promise<any> {
    const { data, error } = await supabase
      .from('enrollments')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', enrollmentId)
      .select('id, status, updated_at')
      .single();

    if (error) {
      throw new Error(`Failed to update enrollment ${enrollmentId}: ${error.message}`);
    }

    return data;
  }

  private async fetchCourseData(
    courseId: string,
    includeEnrollments: boolean,
    includeProgress: boolean,
    userId?: string
  ): Promise<any> {
    // This would typically fetch from a courses table
    // For now, return mock data structure
    const courseData: any = {
      id: courseId,
      // Course data would be fetched here
    };

    if (includeEnrollments && userId) {
      courseData.enrollment = await this.getUserEnrollments(userId, { useCache: true });
    }

    if (includeProgress && userId) {
      // Fetch progress data
      courseData.progress = await this.fetchUserProgress(userId, courseId);
    }

    return courseData;
  }

  private async performEnrollmentSearch(
    searchTerm: string,
    status?: string,
    limit: number = 50
  ): Promise<any[]> {
    let query = supabase
      .from('enrollments')
      .select('*')
      .or(`user_email.ilike.%${searchTerm}%,course_title.ilike.%${searchTerm}%`)
      .order('enrolled_at', { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Search failed: ${error.message}`);
    }

    return data || [];
  }

  private async fetchUserProfile(userId: string): Promise<any> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch user profile: ${error.message}`);
    }

    return data;
  }

  private async fetchUserProgress(userId: string, courseId: string): Promise<any> {
    // Mock implementation - would fetch from progress table
    return {
      userId,
      courseId,
      progress: 0,
      completedLessons: []
    };
  }

  private async fetchEnrollmentStats(): Promise<any> {
    const { data, error } = await supabase
      .from('enrollments')
      .select('status')
      .then(result => {
        if (result.error) throw result.error;
        
        const stats = (result.data || []).reduce((acc: any, enrollment: any) => {
          acc[enrollment.status] = (acc[enrollment.status] || 0) + 1;
          return acc;
        }, {});

        return { data: stats, error: null };
      });

    if (error) {
      throw new Error(`Failed to fetch enrollment stats: ${error.message}`);
    }

    return data;
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Create singleton instance
export const databaseQueryOptimizer = new DatabaseQueryOptimizer();

export default DatabaseQueryOptimizer;