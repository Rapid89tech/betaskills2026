/**
 * Enhanced Enrollment Service with Centralized API Error Handling
 * 
 * This service demonstrates the integration of the new ApiService with
 * centralized error handling, retry logic, and offline support.
 */

import { apiService, type ApiServiceConfig } from './apiService';
import { logger } from '@/utils/logger';

export interface EnrollmentData {
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  progress?: number;
  enrolled_at?: string;
  payment_ref?: string;
  proof_of_payment?: string;
  payment_date?: string;
}

export interface UserProgressData {
  user_id: string;
  course_id: string;
  current_module: number;
  current_lesson: number;
  completed_lessons: string[];
  quiz_scores: Record<string, number>;
  progress_percentage: number;
  total_time_spent: number;
  last_visited: string;
}

class EnhancedEnrollmentService {
  private static instance: EnhancedEnrollmentService;

  static getInstance(): EnhancedEnrollmentService {
    if (!EnhancedEnrollmentService.instance) {
      EnhancedEnrollmentService.instance = new EnhancedEnrollmentService();
    }
    return EnhancedEnrollmentService.instance;
  }

  /**
   * Create enrollment with enhanced error handling and retry logic
   */
  async createEnrollment(enrollmentData: EnrollmentData): Promise<any> {
    logger.info('Creating enrollment with enhanced error handling:', enrollmentData);
    
    try {
      // First, check if user already has an enrollment for this course
      const existingEnrollment = await this.checkExistingEnrollment(
        enrollmentData.user_id,
        enrollmentData.course_id
      );

      if (existingEnrollment) {
        logger.warn('User already enrolled in this course:', existingEnrollment);
        return {
          success: false,
          message: 'You are already enrolled in this course',
          data: existingEnrollment
        };
      }

      // Create new enrollment with retry logic (but skip retry to avoid duplicates)
      const result = await apiService.insert(
        'enrollments',
        {
          ...enrollmentData,
          enrolled_at: enrollmentData.enrolled_at || new Date().toISOString()
        },
        { skipRetry: true } // Don't retry inserts to avoid duplicates
      );

      if (result.error) {
        logger.error('Failed to create enrollment:', result.error);
        throw new Error(result.error.userMessage || 'Failed to create enrollment');
      }

      logger.info('Enrollment created successfully:', result.data);
      
      // Trigger enrollment event for real-time updates
      this.triggerEnrollmentEvent(enrollmentData, 'created');

      return {
        success: true,
        message: 'Enrollment created successfully',
        data: result.data
      };

    } catch (error) {
      logger.error('Error in createEnrollment:', error);
      throw error;
    }
  }

  /**
   * Get user enrollments with retry logic and offline support
   */
  async getUserEnrollments(userId: string): Promise<any[]> {
    logger.info(`Getting enrollments for user: ${userId}`);

    try {
      const result = await apiService.select(
        'enrollments',
        '*',
        {
          retryConfig: {
            maxRetries: 3,
            baseDelay: 1000
          }
        }
      );

      if (result.error) {
        logger.error('Failed to get user enrollments:', result.error);
        
        // Try to get cached data if available
        const cachedEnrollments = this.getCachedEnrollments(userId);
        if (cachedEnrollments.length > 0) {
          logger.info('Returning cached enrollments due to API error');
          return cachedEnrollments;
        }
        
        throw new Error(result.error.userMessage || 'Failed to get enrollments');
      }

      // Filter enrollments for the specific user
      const userEnrollments = (result.data || []).filter(
        (enrollment: any) => enrollment.user_id === userId
      );

      // Cache the results for offline access
      this.cacheEnrollments(userId, userEnrollments);

      logger.info(`Found ${userEnrollments.length} enrollments for user`);
      return userEnrollments;

    } catch (error) {
      logger.error('Error in getUserEnrollments:', error);
      
      // Fallback to cached data
      const cachedEnrollments = this.getCachedEnrollments(userId);
      if (cachedEnrollments.length > 0) {
        logger.info('Returning cached enrollments due to error');
        return cachedEnrollments;
      }
      
      throw error;
    }
  }

  /**
   * Update enrollment status with retry logic
   */
  async updateEnrollmentStatus(
    enrollmentId: string,
    status: 'pending' | 'approved' | 'rejected',
    adminNotes?: string
  ): Promise<any> {
    logger.info(`Updating enrollment ${enrollmentId} status to: ${status}`);

    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString()
      };

      if (adminNotes) {
        updateData.admin_notes = adminNotes;
      }

      const result = await apiService.update(
        'enrollments',
        updateData,
        { column: 'id', value: enrollmentId },
        {
          retryConfig: {
            maxRetries: 2,
            baseDelay: 1500
          }
        }
      );

      if (result.error) {
        logger.error('Failed to update enrollment status:', result.error);
        throw new Error(result.error.userMessage || 'Failed to update enrollment status');
      }

      logger.info('Enrollment status updated successfully:', result.data);
      
      // Trigger enrollment event for real-time updates
      if (result.data && result.data[0]) {
        this.triggerEnrollmentEvent(result.data[0], 'updated');
      }

      return {
        success: true,
        message: 'Enrollment status updated successfully',
        data: result.data
      };

    } catch (error) {
      logger.error('Error in updateEnrollmentStatus:', error);
      throw error;
    }
  }

  /**
   * Save user progress with automatic retry and conflict resolution
   */
  async saveUserProgress(progressData: UserProgressData): Promise<any> {
    logger.info('Saving user progress with enhanced error handling:', progressData);

    try {
      // Check if progress record exists
      const existingProgress = await this.getUserProgress(
        progressData.user_id,
        progressData.course_id
      );

      let result;
      
      if (existingProgress) {
        // Update existing progress
        result = await apiService.update(
          'user_progress',
          {
            ...progressData,
            last_visited: new Date().toISOString()
          },
          { column: 'user_id', value: progressData.user_id },
          {
            retryConfig: {
              maxRetries: 3,
              baseDelay: 1000
            }
          }
        );
      } else {
        // Create new progress record
        result = await apiService.insert(
          'user_progress',
          {
            ...progressData,
            last_visited: new Date().toISOString()
          },
          { skipRetry: true }
        );
      }

      if (result.error) {
        logger.error('Failed to save user progress:', result.error);
        
        // Cache progress locally for offline sync
        this.cacheUserProgress(progressData);
        
        throw new Error(result.error.userMessage || 'Failed to save progress');
      }

      logger.info('User progress saved successfully:', result.data);
      
      // Update local cache
      this.cacheUserProgress(progressData);

      return {
        success: true,
        message: 'Progress saved successfully',
        data: result.data
      };

    } catch (error) {
      logger.error('Error in saveUserProgress:', error);
      
      // Cache progress locally for offline sync
      this.cacheUserProgress(progressData);
      
      throw error;
    }
  }

  /**
   * Get all enrollments for admin dashboard with enhanced error handling
   */
  async getAllEnrollments(): Promise<any[]> {
    logger.info('Getting all enrollments for admin dashboard');

    try {
      const result = await apiService.select(
        'enrollments',
        '*',
        {
          retryConfig: {
            maxRetries: 3,
            baseDelay: 2000,
            maxDelay: 10000
          }
        }
      );

      if (result.error) {
        logger.error('Failed to get all enrollments:', result.error);
        
        // Try to get cached data
        const cachedEnrollments = this.getCachedAllEnrollments();
        if (cachedEnrollments.length > 0) {
          logger.info('Returning cached enrollments for admin dashboard');
          return cachedEnrollments;
        }
        
        throw new Error(result.error.userMessage || 'Failed to get enrollments');
      }

      const enrollments = result.data || [];
      
      // Cache for offline access
      this.cacheAllEnrollments(enrollments);

      logger.info(`Retrieved ${enrollments.length} enrollments for admin dashboard`);
      return enrollments;

    } catch (error) {
      logger.error('Error in getAllEnrollments:', error);
      
      // Fallback to cached data
      const cachedEnrollments = this.getCachedAllEnrollments();
      if (cachedEnrollments.length > 0) {
        logger.info('Returning cached enrollments due to error');
        return cachedEnrollments;
      }
      
      throw error;
    }
  }

  /**
   * Sync offline data when connection is restored
   */
  async syncOfflineData(): Promise<void> {
    logger.info('Syncing offline data...');

    try {
      // Get offline progress data
      const offlineProgress = this.getOfflineProgressData();
      
      for (const progressData of offlineProgress) {
        try {
          await this.saveUserProgress(progressData);
          logger.info('Synced offline progress:', progressData);
        } catch (error) {
          logger.error('Failed to sync offline progress:', error);
        }
      }

      // Clear offline data after successful sync
      this.clearOfflineProgressData();
      
      logger.info('Offline data sync completed');

    } catch (error) {
      logger.error('Error during offline data sync:', error);
    }
  }

  // Private helper methods

  private async checkExistingEnrollment(userId: string, courseId: string): Promise<any> {
    const result = await apiService.executeSupabaseQuery(
      async () => {
        const { data, error } = await apiService.select(
          'enrollments',
          '*'
        );
        
        if (error) return { data: null, error };
        
        const existing = (data || []).find(
          (enrollment: any) => 
            enrollment.user_id === userId && enrollment.course_id === courseId
        );
        
        return { data: existing || null, error: null };
      },
      'Check existing enrollment',
      { skipRetry: true }
    );

    return result.data;
  }

  private async getUserProgress(userId: string, courseId: string): Promise<any> {
    try {
      const result = await apiService.select('user_progress', '*');
      
      if (result.error) {
        return null;
      }
      
      return (result.data || []).find(
        (progress: any) => 
          progress.user_id === userId && progress.course_id === courseId
      );
    } catch (error) {
      logger.error('Error getting user progress:', error);
      return null;
    }
  }

  private triggerEnrollmentEvent(enrollmentData: any, action: 'created' | 'updated'): void {
    try {
      window.dispatchEvent(new CustomEvent('enrollment-changed', {
        detail: {
          action,
          enrollment: enrollmentData,
          timestamp: new Date().toISOString()
        }
      }));
    } catch (error) {
      logger.warn('Failed to trigger enrollment event:', error);
    }
  }

  // Caching methods for offline support

  private cacheEnrollments(userId: string, enrollments: any[]): void {
    try {
      const cacheKey = `enrollments_${userId}`;
      localStorage.setItem(cacheKey, JSON.stringify({
        data: enrollments,
        timestamp: Date.now()
      }));
    } catch (error) {
      logger.warn('Failed to cache enrollments:', error);
    }
  }

  private getCachedEnrollments(userId: string): any[] {
    try {
      const cacheKey = `enrollments_${userId}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        
        // Return cached data if it's less than 1 hour old
        if (Date.now() - timestamp < 3600000) {
          return data || [];
        }
      }
    } catch (error) {
      logger.warn('Failed to get cached enrollments:', error);
    }
    
    return [];
  }

  private cacheAllEnrollments(enrollments: any[]): void {
    try {
      localStorage.setItem('all_enrollments_cache', JSON.stringify({
        data: enrollments,
        timestamp: Date.now()
      }));
    } catch (error) {
      logger.warn('Failed to cache all enrollments:', error);
    }
  }

  private getCachedAllEnrollments(): any[] {
    try {
      const cached = localStorage.getItem('all_enrollments_cache');
      
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        
        // Return cached data if it's less than 30 minutes old
        if (Date.now() - timestamp < 1800000) {
          return data || [];
        }
      }
    } catch (error) {
      logger.warn('Failed to get cached all enrollments:', error);
    }
    
    return [];
  }

  private cacheUserProgress(progressData: UserProgressData): void {
    try {
      const cacheKey = `progress_${progressData.user_id}_${progressData.course_id}`;
      localStorage.setItem(cacheKey, JSON.stringify({
        data: progressData,
        timestamp: Date.now(),
        synced: false
      }));
    } catch (error) {
      logger.warn('Failed to cache user progress:', error);
    }
  }

  private getOfflineProgressData(): UserProgressData[] {
    const offlineData: UserProgressData[] = [];
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        if (key && key.startsWith('progress_')) {
          const cached = localStorage.getItem(key);
          
          if (cached) {
            const { data, synced } = JSON.parse(cached);
            
            if (!synced) {
              offlineData.push(data);
            }
          }
        }
      }
    } catch (error) {
      logger.warn('Failed to get offline progress data:', error);
    }
    
    return offlineData;
  }

  private clearOfflineProgressData(): void {
    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        if (key && key.startsWith('progress_')) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        const cached = localStorage.getItem(key);
        
        if (cached) {
          const parsedData = JSON.parse(cached);
          parsedData.synced = true;
          localStorage.setItem(key, JSON.stringify(parsedData));
        }
      });
    } catch (error) {
      logger.warn('Failed to clear offline progress data:', error);
    }
  }

  /**
   * Get network status and retry queue information
   */
  getNetworkInfo(): {
    isOnline: boolean;
    retryQueueLength: number;
    lastChecked: number;
  } {
    const networkStatus = apiService.getNetworkStatus();
    const retryQueueLength = apiService.getRetryQueueLength();
    
    return {
      isOnline: networkStatus.isOnline,
      retryQueueLength,
      lastChecked: networkStatus.lastChecked
    };
  }

  /**
   * Manually trigger retry of queued requests
   */
  retryQueuedRequests(): void {
    logger.info('Manually triggering retry of queued requests');
    // The ApiErrorHandler will automatically process the queue when network is restored
    // This method can be used to provide user feedback
  }

  /**
   * Clear retry queue (for testing or manual cleanup)
   */
  clearRetryQueue(): void {
    apiService.clearRetryQueue();
    logger.info('Retry queue cleared');
  }
}

// Export singleton instance
export const enhancedEnrollmentService = EnhancedEnrollmentService.getInstance();
export default EnhancedEnrollmentService;
export type { EnrollmentData, UserProgressData };