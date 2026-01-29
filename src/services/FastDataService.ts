import { supabase } from '@/integrations/supabase/client';
import { databaseQueryOptimizer } from '@/utils/DatabaseQueryOptimizer';
import { advancedCacheManager, enrollmentDataCache, userDataCache } from '@/utils/AdvancedCacheManager';

export interface SimpleEnrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  updated_at: string;
}

export interface SimpleProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  approval_status: string;
  created_at: string;
}

export interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

export interface ApiError extends Error {
  code?: string;
  details?: any;
  hint?: string;
  isRetryable?: boolean;
}

/**
 * Fast, simple data service with robust error handling, retry mechanisms, and advanced caching
 * Designed for immediate loading and real-time updates with performance optimizations
 */
export class FastDataService {
  private static instance: FastDataService;
  private cache = new Map<string, any>();
  private cacheTimeout = 30000; // 30 seconds (legacy cache)
  private defaultRetryConfig: RetryConfig = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2
  };

  static getInstance(): FastDataService {
    if (!FastDataService.instance) {
      FastDataService.instance = new FastDataService();
    }
    return FastDataService.instance;
  }

  /**
   * Get user enrollments with robust error handling, retry logic, and advanced caching
   */
  async getUserEnrollments(userId: string): Promise<SimpleEnrollment[]> {
    // Use advanced cache manager for better performance
    return enrollmentDataCache.get(
      `user-enrollments-${userId}`,
      async () => {
        return this.withRetry(async () => {
          // Use database query optimizer for better performance
          return databaseQueryOptimizer.getUserEnrollments(userId, { useCache: false });
        }, `getUserEnrollments(${userId})`);
      },
      2 * 60 * 1000 // 2 minutes TTL for enrollment data
    );
  }

  /**
   * Get all enrollments for admin with robust error handling and pagination
   */
  async getAllEnrollments(): Promise<SimpleEnrollment[]> {
    // Use advanced cache manager with shorter TTL for admin data
    return enrollmentDataCache.get(
      'all-enrollments-page-1',
      async () => {
        return this.withRetry(async () => {
          // Use database query optimizer with pagination
          const result = await databaseQueryOptimizer.getAllEnrollments({ 
            page: 1, 
            pageSize: 100,
            useCache: false 
          });
          return result.data;
        }, 'getAllEnrollments');
      },
      1 * 60 * 1000 // 1 minute TTL for admin data
    );
  }

  /**
   * Get all users for admin with robust error handling and selective field loading
   */
  async getAllUsers(): Promise<SimpleProfile[]> {
    // Use user data cache with longer TTL since user data changes less frequently
    return userDataCache.get(
      'all-users-admin',
      async () => {
        return this.withRetry(async () => {
          // Use database query optimizer with selective fields for better performance
          return databaseQueryOptimizer.getAllUsers({ 
            limit: 100,
            fields: ['id', 'email', 'first_name', 'last_name', 'role', 'approval_status', 'created_at'],
            useCache: false 
          });
        }, 'getAllUsers');
      },
      5 * 60 * 1000 // 5 minutes TTL for user data
    );
  }

  /**
   * Update enrollment status with robust error handling and validation
   */
  async updateEnrollmentStatus(enrollmentId: string, status: 'approved' | 'rejected'): Promise<boolean> {
    // Input validation
    if (!enrollmentId || typeof enrollmentId !== 'string') {
      throw new Error('Invalid enrollment ID provided');
    }
    
    if (!['approved', 'rejected'].includes(status)) {
      throw new Error(`Invalid status: ${status}. Must be 'approved' or 'rejected'`);
    }

    return this.withRetry(async () => {
      // First, verify the enrollment exists and is in pending status
      const { data: existingEnrollment, error: fetchError } = await supabase
        .from('enrollments')
        .select('id, status, user_email, course_title')
        .eq('id', enrollmentId)
        .single();

      if (fetchError) {
        throw this.createApiError(fetchError, `Failed to fetch enrollment ${enrollmentId} for validation`);
      }

      if (!existingEnrollment) {
        throw new Error(`Enrollment ${enrollmentId} not found`);
      }

      if (existingEnrollment.status !== 'pending') {
        throw new Error(`Cannot update enrollment ${enrollmentId}: current status is '${existingEnrollment.status}', expected 'pending'`);
      }

      // Perform the update
      const { data, error } = await supabase
        .from('enrollments')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId)
        .select('id, status, updated_at');

      if (error) {
        throw this.createApiError(error, `Failed to update enrollment status to ${status}`);
      }

      if (!data || data.length === 0) {
        throw new Error(`No enrollment was updated. This might indicate insufficient permissions or the enrollment no longer exists.`);
      }

      // Verify the update was successful
      const updatedEnrollment = data[0];
      if (updatedEnrollment.status !== status) {
        throw new Error(`Update verification failed: expected status '${status}', but got '${updatedEnrollment.status}'`);
      }

      // Clear relevant caches using advanced cache manager
      this.clearCachePattern('enrollments');
      this.clearCachePattern('all-enrollments');
      
      // Also clear advanced cache
      enrollmentDataCache.clearPattern('enrollments');
      enrollmentDataCache.clearPattern('user-enrollments-');

      console.log(`Successfully updated enrollment ${enrollmentId} to ${status} for ${existingEnrollment.user_email} - ${existingEnrollment.course_title}`);
      return true;
      
    }, `updateEnrollmentStatus(${enrollmentId}, ${status})`)
    .catch((error) => {
      console.error('Error updating enrollment status:', error);
      
      // Add context to the error for better debugging
      const contextualError = new Error(`Failed to update enrollment ${enrollmentId} to ${status}: ${error.message}`);
      contextualError.name = error.name || 'EnrollmentUpdateError';
      contextualError.stack = error.stack;
      
      throw contextualError;
    });
  }

  /**
   * Check if user is enrolled in course
   */
  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
    try {
      const enrollments = await this.getUserEnrollments(userId);
      return enrollments.some(e => e.course_id === courseId && e.status === 'approved');
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  }

  /**
   * Get user enrollment for specific course
   */
  async getUserEnrollment(userId: string, courseId: string): Promise<SimpleEnrollment | null> {
    try {
      const enrollments = await this.getUserEnrollments(userId);
      return enrollments.find(e => e.course_id === courseId) || null;
    } catch (error) {
      console.error('Error getting user enrollment:', error);
      return null;
    }
  }

  /**
   * Simple cache management
   */
  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private clearCachePattern(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache including advanced cache managers
   */
  clearCache(): void {
    this.cache.clear();
    enrollmentDataCache.clear();
    userDataCache.clear();
    advancedCacheManager.clear();
  }

  /**
   * Prefetch data for better performance
   */
  async prefetchUserData(userId: string): Promise<void> {
    await databaseQueryOptimizer.prefetchUserData(userId);
  }

  /**
   * Prefetch admin dashboard data
   */
  async prefetchAdminData(): Promise<void> {
    await databaseQueryOptimizer.prefetchAdminData();
  }

  /**
   * Get performance statistics
   */
  getPerformanceStats(): any {
    return {
      legacyCache: {
        size: this.cache.size,
        keys: Array.from(this.cache.keys())
      },
      advancedCache: advancedCacheManager.getStats(),
      enrollmentCache: enrollmentDataCache.getStats(),
      userCache: userDataCache.getStats(),
      queryOptimizer: databaseQueryOptimizer.getPerformanceStats()
    };
  }

  /**
   * Retry mechanism with exponential backoff
   */
  private async withRetry<T>(
    operation: () => Promise<T>,
    operationName: string,
    config: Partial<RetryConfig> = {}
  ): Promise<T> {
    const retryConfig = { ...this.defaultRetryConfig, ...config };
    let lastError: ApiError;

    for (let attempt = 1; attempt <= retryConfig.maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as ApiError;
        
        // Don't retry if it's not a retryable error
        if (!this.isRetryableError(lastError)) {
          throw lastError;
        }

        // Don't retry on the last attempt
        if (attempt === retryConfig.maxAttempts) {
          break;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(
          retryConfig.baseDelay * Math.pow(retryConfig.backoffMultiplier, attempt - 1),
          retryConfig.maxDelay
        );

        console.warn(
          `${operationName} failed (attempt ${attempt}/${retryConfig.maxAttempts}). Retrying in ${delay}ms...`,
          lastError
        );

        await this.sleep(delay);
      }
    }

    // If we get here, all retries failed
    console.error(`${operationName} failed after ${retryConfig.maxAttempts} attempts:`, lastError);
    throw lastError;
  }

  /**
   * Create a standardized API error
   */
  private createApiError(supabaseError: any, message: string): ApiError {
    const error = new Error(message) as ApiError;
    error.code = supabaseError.code;
    error.details = supabaseError.details;
    error.hint = supabaseError.hint;
    error.isRetryable = this.isRetryableError(supabaseError);
    return error;
  }

  /**
   * Determine if an error is retryable
   */
  private isRetryableError(error: any): boolean {
    // Network errors are retryable
    if (error.name === 'NetworkError' || error.message?.includes('network')) {
      return true;
    }

    // Timeout errors are retryable
    if (error.name === 'TimeoutError' || error.message?.includes('timeout')) {
      return true;
    }

    // Supabase specific retryable errors
    if (error.code) {
      const retryableCodes = [
        '08000', // Connection exception
        '08003', // Connection does not exist
        '08006', // Connection failure
        '53300', // Too many connections
        '57P01', // Admin shutdown
        '57P02', // Crash shutdown
        '57P03', // Cannot connect now
      ];
      
      if (retryableCodes.includes(error.code)) {
        return true;
      }
    }

    // HTTP status codes that are retryable
    if (error.status) {
      const retryableStatuses = [408, 429, 500, 502, 503, 504];
      if (retryableStatuses.includes(error.status)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Health check for the service
   */
  async healthCheck(): Promise<{ healthy: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);

      if (error) {
        return { healthy: false, error: error.message };
      }

      return { healthy: true };
    } catch (error) {
      return { 
        healthy: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export const fastDataService = FastDataService.getInstance();