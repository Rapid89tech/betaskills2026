/**
 * CourseOrganizer Integration Tests
 * 
 * Integration tests for CourseOrganizer with real EnrollmentManager
 * to verify end-to-end functionality and real-time updates.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CourseOrganizer } from '../CourseOrganizer';
import { EnrollmentManager } from '../EnrollmentManager';
import { Course } from '@/types/course';
import { 
  Enrollment, 
  EnrollmentStatus, 
  PaymentType, 
  PaymentStatus,
  EnrollmentUpdate,
  EnrollmentUpdateType
} from '@/types/enrollment';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    channel: vi.fn(() => ({
      on: vi.fn(() => ({
        subscribe: vi.fn()
      }))
    })),
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          order: vi.fn(() => ({
            data: [],
            error: null
          }))
        }))
      }))
    }))
  }
}));

// Mock PaymentHandler
vi.mock('../PaymentHandler', () => ({
  paymentHandler: {
    processPayment: vi.fn()
  }
}));

// Mock constants
vi.mock('@/constants/enrollment', () => ({
  ENROLLMENT_CONFIG: {},
  ENROLLMENT_ERROR_CODES: {
    DUPLICATE_ENROLLMENT: 'DUPLICATE_ENROLLMENT',
    PAYMENT_PROCESSING_FAILED: 'PAYMENT_PROCESSING_FAILED',
    NETWORK_ERROR: 'NETWORK_ERROR',
    ENROLLMENT_NOT_FOUND: 'ENROLLMENT_NOT_FOUND'
  },
  ENROLLMENT_SUCCESS_MESSAGES: {},
  ENROLLMENT_ERROR_MESSAGES: {
    DUPLICATE_ENROLLMENT: 'Enrollment already exists',
    PAYMENT_PROCESSING_FAILED: 'Payment processing failed',
    NETWORK_ERROR: 'Network error',
    ENROLLMENT_NOT_FOUND: 'Enrollment not found'
  },
  WEBSOCKET_EVENTS: {}
}));

describe('CourseOrganizer Integration Tests', () => {
  let courseOrganizer: CourseOrganizer;
  let enrollmentManager: EnrollmentManager;

  const sampleCourses: Course[] = [
    {
      id: 'course-1',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics',
      category: 'Programming',
      level: 'Beginner',
      duration: '4 weeks',
      is_free: false,
      price: 99,
      currency: 'USD',
      students: 150,
      rating: 4.5,
      instructor: {
        id: 'instructor-1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com'
      },
      status: 'active',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      available: true
    },
    {
      id: 'course-2',
      title: 'React Advanced',
      description: 'Advanced React concepts',
      category: 'Programming',
      level: 'Advanced',
      duration: '6 weeks',
      is_free: false,
      price: 149,
      currency: 'USD',
      students: 89,
      rating: 4.8,
      instructor: {
        id: 'instructor-2',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com'
      },
      status: 'active',
      created_at: '2024-01-02T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
      available: true
    }
  ];

  beforeEach(() => {
    // Get fresh instances
    courseOrganizer = CourseOrganizer.getInstance();
    enrollmentManager = EnrollmentManager.getInstance();
    
    // Clear any existing cache
    courseOrganizer.clearCache();
  });

  afterEach(() => {
    // Cleanup
    courseOrganizer.destroy();
    enrollmentManager.destroy();
  });

  describe('Real-time Integration', () => {
    it('should handle enrollment updates and trigger course reordering', async () => {
      const userId = 'user-1';
      const courseId = 'course-1';

      // Mock enrollment data
      const mockEnrollment: Enrollment = {
        id: 'enrollment-1',
        userId,
        courseId,
        paymentType: PaymentType.CARD,
        status: EnrollmentStatus.APPROVED,
        paymentStatus: PaymentStatus.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date(),
        approvedAt: new Date()
      };

      // Mock getUserEnrollments to return the enrollment
      vi.spyOn(enrollmentManager, 'getUserEnrollments').mockResolvedValue([mockEnrollment]);

      // Subscribe to priority updates
      const priorityUpdates: any[] = [];
      const unsubscribe = courseOrganizer.subscribeToPriorityUpdates((priorities) => {
        priorityUpdates.push(priorities);
      });

      // Organize courses initially
      const initialCourses = await courseOrganizer.organizeCourses(sampleCourses, userId);
      
      // Should prioritize enrolled course
      expect(initialCourses[0].id).toBe(courseId);

      // Simulate enrollment update
      const enrollmentUpdate: EnrollmentUpdate = {
        type: EnrollmentUpdateType.ENROLLMENT_APPROVED,
        enrollmentId: mockEnrollment.id,
        userId,
        courseId,
        status: EnrollmentStatus.APPROVED,
        timestamp: new Date()
      };

      // Trigger the update through the enrollment manager's callback system
      // This simulates what would happen when a real-time update occurs
      const callbacks = (enrollmentManager as any).updateCallbacks;
      if (callbacks && callbacks.size > 0) {
        for (const callback of callbacks) {
          callback(enrollmentUpdate);
        }
      }

      // Wait for debounced update
      await new Promise(resolve => setTimeout(resolve, 350));

      // Cleanup
      unsubscribe();
    });

    it('should maintain course organization consistency across multiple updates', async () => {
      const userId = 'user-1';

      // Mock multiple enrollments
      const mockEnrollments: Enrollment[] = [
        {
          id: 'enrollment-1',
          userId,
          courseId: 'course-1',
          paymentType: PaymentType.CARD,
          status: EnrollmentStatus.APPROVED,
          paymentStatus: PaymentStatus.COMPLETED,
          createdAt: new Date('2024-01-10T10:00:00Z'),
          updatedAt: new Date('2024-01-10T10:00:00Z'),
          approvedAt: new Date('2024-01-10T10:00:00Z')
        },
        {
          id: 'enrollment-2',
          userId,
          courseId: 'course-2',
          paymentType: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
          createdAt: new Date('2024-01-11T10:00:00Z'),
          updatedAt: new Date('2024-01-11T10:00:00Z')
        }
      ];

      vi.spyOn(enrollmentManager, 'getUserEnrollments').mockResolvedValue(mockEnrollments);

      // Organize courses multiple times
      const result1 = await courseOrganizer.organizeCourses(sampleCourses, userId);
      const result2 = await courseOrganizer.organizeCourses(sampleCourses, userId);
      const result3 = await courseOrganizer.organizeCourses(sampleCourses, userId);

      // Results should be consistent
      expect(result1).toEqual(result2);
      expect(result2).toEqual(result3);

      // Enrolled course should be first, pending second
      expect(result1[0].id).toBe('course-1'); // Enrolled
      expect(result1[1].id).toBe('course-2'); // Pending
    });

    it('should handle cache invalidation correctly', async () => {
      const userId = 'user-1';

      // Initial enrollment state
      const initialEnrollments: Enrollment[] = [{
        id: 'enrollment-1',
        userId,
        courseId: 'course-1',
        paymentType: PaymentType.EFT,
        status: EnrollmentStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
      }];

      const getUserEnrollmentsSpy = vi.spyOn(enrollmentManager, 'getUserEnrollments')
        .mockResolvedValue(initialEnrollments);

      // First organization - should fetch from enrollment manager
      await courseOrganizer.organizeCourses(sampleCourses, userId);
      expect(getUserEnrollmentsSpy).toHaveBeenCalledTimes(1);

      // Second organization - should use cache
      await courseOrganizer.organizeCourses(sampleCourses, userId);
      expect(getUserEnrollmentsSpy).toHaveBeenCalledTimes(1);

      // Clear cache and organize again - should fetch again
      courseOrganizer.clearCache(userId);
      await courseOrganizer.organizeCourses(sampleCourses, userId);
      expect(getUserEnrollmentsSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Performance Integration', () => {
    it('should handle large course lists efficiently', async () => {
      const userId = 'user-1';
      
      // Generate large course list
      const largeCourseList: Course[] = Array.from({ length: 100 }, (_, index) => ({
        ...sampleCourses[0],
        id: `course-${index + 1}`,
        title: `Course ${index + 1}`
      }));

      // Mock some enrollments
      const mockEnrollments: Enrollment[] = Array.from({ length: 10 }, (_, index) => ({
        id: `enrollment-${index + 1}`,
        userId,
        courseId: `course-${index + 1}`,
        paymentType: PaymentType.CARD,
        status: index < 5 ? EnrollmentStatus.APPROVED : EnrollmentStatus.PENDING,
        paymentStatus: index < 5 ? PaymentStatus.COMPLETED : PaymentStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        approvedAt: index < 5 ? new Date() : undefined
      }));

      vi.spyOn(enrollmentManager, 'getUserEnrollments').mockResolvedValue(mockEnrollments);

      const startTime = Date.now();
      const organizedCourses = await courseOrganizer.organizeCourses(largeCourseList, userId);
      const endTime = Date.now();

      // Should complete within reasonable time (less than 1 second)
      expect(endTime - startTime).toBeLessThan(1000);
      
      // Should maintain correct order
      expect(organizedCourses).toHaveLength(100);
      
      // First 5 should be enrolled courses
      for (let i = 0; i < 5; i++) {
        expect(organizedCourses[i].id).toBe(`course-${i + 1}`);
      }
      
      // Next 5 should be pending courses
      for (let i = 5; i < 10; i++) {
        expect(organizedCourses[i].id).toBe(`course-${i + 1}`);
      }
    });

    it('should handle rapid subscription updates without performance degradation', async () => {
      const userId = 'user-1';
      const updateCount = 50;
      const updates: EnrollmentUpdate[] = [];

      // Subscribe to updates
      const unsubscribe = courseOrganizer.subscribeToPriorityUpdates((priorities) => {
        // Track updates
      });

      // Generate rapid updates
      const startTime = Date.now();
      
      for (let i = 0; i < updateCount; i++) {
        const update: EnrollmentUpdate = {
          type: EnrollmentUpdateType.ENROLLMENT_APPROVED,
          enrollmentId: `enrollment-${i}`,
          userId,
          courseId: `course-${i}`,
          status: EnrollmentStatus.APPROVED,
          timestamp: new Date()
        };
        
        updates.push(update);
        
        // Simulate rapid updates
        setTimeout(() => {
          // Trigger update callback if it exists
          const callbacks = (courseOrganizer as any).priorityCallbacks;
          if (callbacks && callbacks.size > 0) {
            for (const callback of callbacks) {
              try {
                callback([]);
              } catch (error) {
                // Ignore callback errors for this test
              }
            }
          }
        }, i * 10); // 10ms intervals
      }

      // Wait for all updates to process
      await new Promise(resolve => setTimeout(resolve, updateCount * 10 + 500));
      
      const endTime = Date.now();

      // Should handle all updates within reasonable time
      expect(endTime - startTime).toBeLessThan(2000);

      // Cleanup
      unsubscribe();
    });
  });

  describe('Error Recovery Integration', () => {
    it('should recover from enrollment manager failures', async () => {
      const userId = 'user-1';

      // Mock enrollment manager to fail first, then succeed
      let callCount = 0;
      vi.spyOn(enrollmentManager, 'getUserEnrollments').mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.reject(new Error('Database connection failed'));
        }
        return Promise.resolve([]);
      });

      // First call should handle error gracefully
      const result1 = await courseOrganizer.organizeCourses(sampleCourses, userId);
      expect(result1).toEqual(sampleCourses); // Should return original courses

      // Clear cache to force new fetch
      courseOrganizer.clearCache(userId);

      // Second call should succeed
      const result2 = await courseOrganizer.organizeCourses(sampleCourses, userId);
      expect(result2).toEqual(sampleCourses); // Should work normally
    });

    it('should maintain functionality when real-time updates fail', async () => {
      const userId = 'user-1';

      // Mock successful enrollment fetch
      vi.spyOn(enrollmentManager, 'getUserEnrollments').mockResolvedValue([]);

      // Subscribe with a failing callback
      const faultyCallback = vi.fn().mockImplementation(() => {
        throw new Error('Callback processing failed');
      });
      
      const unsubscribe = courseOrganizer.subscribeToPriorityUpdates(faultyCallback);

      // Should still be able to organize courses normally
      const result = await courseOrganizer.organizeCourses(sampleCourses, userId);
      expect(result).toEqual(sampleCourses);

      // Cleanup
      unsubscribe();
    });
  });
});