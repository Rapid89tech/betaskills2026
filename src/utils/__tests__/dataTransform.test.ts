/**
 * Tests for data transformation utilities
 */

import { describe, it, expect } from 'vitest';
import { ApiResponseTransformer, LegacyDataConverter } from '../dataTransform';
import { Course, SimplifiedCourse } from '@/types/course';
import { UnifiedCourse } from '@/types/unifiedCourse';

describe('ApiResponseTransformer', () => {
  describe('transformCourse', () => {
    it('should transform a valid course API response', () => {
      const apiResponse = {
        id: 'course-123',
        title: 'Test Course',
        description: 'A test course',
        category: 'Technology',
        level: 'Beginner',
        duration: '4 weeks',
        price: 99.99,
        currency: 'ZAR',
        instructor: 'John Doe',
        rating: 4.5,
        students: 150,
        image: 'https://example.com/image.jpg',
        available: true
      };

      const result = ApiResponseTransformer.transformCourse(apiResponse);

      expect(result.data).toBeTruthy();
      expect(result.validation.isValid).toBe(true);
      expect(result.data?.id).toBe('course-123');
      expect(result.data?.courseId).toBe('course-123');
    });

    it('should handle nested API response format', () => {
      const apiResponse = {
        data: {
          id: 'course-123',
          title: 'Test Course',
          description: 'A test course',
          category: 'Technology',
          level: 'Beginner',
          duration: '4 weeks',
          price: 99.99,
          currency: 'ZAR',
          instructor: 'John Doe',
          rating: 4.5,
          students: 150,
          image: 'https://example.com/image.jpg',
          available: true
        }
      };

      const result = ApiResponseTransformer.transformCourse(apiResponse);

      expect(result.data).toBeTruthy();
      expect(result.validation.isValid).toBe(true);
      expect(result.data?.id).toBe('course-123');
    });

    it('should handle array API response format', () => {
      const apiResponse = [{
        id: 'course-123',
        title: 'Test Course',
        description: 'A test course',
        category: 'Technology',
        level: 'Beginner',
        duration: '4 weeks',
        price: 99.99,
        currency: 'ZAR',
        instructor: 'John Doe',
        rating: 4.5,
        students: 150,
        image: 'https://example.com/image.jpg',
        available: true
      }];

      const result = ApiResponseTransformer.transformCourse(apiResponse);

      expect(result.data).toBeTruthy();
      expect(result.validation.isValid).toBe(true);
      expect(result.warnings).toContain('Multiple items in response, using first item');
    });

    it('should apply default values for missing fields', () => {
      const apiResponse = {
        id: 'course-123',
        title: 'Test Course'
        // Missing many required fields
      };

      const result = ApiResponseTransformer.transformCourse(apiResponse);

      expect(result.data).toBeTruthy();
      expect(result.data?.description).toBe('');
      expect(result.data?.category).toBe('General');
      expect(result.data?.level).toBe('Beginner');
      expect(result.data?.duration).toBe('0 hours');
      expect(result.data?.price).toBe(0);
      expect(result.data?.currency).toBe('ZAR');
      expect(result.data?.instructor).toBe('Unknown Instructor');
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should handle instructor object format', () => {
      const apiResponse = {
        id: 'course-123',
        title: 'Test Course',
        description: 'A test course',
        category: 'Technology',
        level: 'Beginner',
        duration: '4 weeks',
        price: 99.99,
        currency: 'ZAR',
        instructor: {
          first_name: 'John',
          last_name: 'Doe'
        },
        rating: 4.5,
        students: 150,
        image: 'https://example.com/image.jpg',
        available: true
      };

      const result = ApiResponseTransformer.transformCourse(apiResponse);

      expect(result.data).toBeTruthy();
      expect(result.data?.instructor).toBe('John Doe');
    });

    it('should handle strict mode validation', () => {
      const invalidApiResponse = {
        id: '', // Invalid empty id
        title: 'Test Course'
      };

      const result = ApiResponseTransformer.transformCourse(invalidApiResponse, { strict: true });

      expect(result.data).toBeNull();
      expect(result.validation.isValid).toBe(false);
    });

    it('should handle transformation errors gracefully', () => {
      const invalidApiResponse = null;

      const result = ApiResponseTransformer.transformCourse(invalidApiResponse);

      expect(result.data).toBeNull();
      expect(result.validation.isValid).toBe(false);
      expect(result.validation.errors.length).toBeGreaterThan(0);
    });
  });

  describe('transformEnrollment', () => {
    it('should transform a valid enrollment API response', () => {
      const apiResponse = {
        id: 'enrollment-123',
        user_id: 'user-456',
        course_id: 'course-789',
        status: 'PENDING',
        payment_status: 'PENDING',
        enrolled_at: '2023-01-01T00:00:00Z'
      };

      const result = ApiResponseTransformer.transformEnrollment(apiResponse);

      expect(result.data).toBeTruthy();
      expect(result.data?.id).toBe('enrollment-123');
      expect(result.data?.userId).toBe('user-456');
      expect(result.data?.courseId).toBe('course-789');
    });

    it('should apply enrollment defaults', () => {
      const apiResponse = {
        id: 'enrollment-123'
        // Missing many fields
      };

      const result = ApiResponseTransformer.transformEnrollment(apiResponse);

      expect(result.data).toBeTruthy();
      expect(result.data?.status).toBe('PENDING');
      expect(result.data?.paymentStatus).toBe('PENDING');
      expect(result.data?.progress).toBe(0);
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('transformBatch', () => {
    it('should transform multiple items', () => {
      const apiResponses = [
        {
          id: 'course-1',
          title: 'Course 1',
          description: 'First course',
          category: 'Tech',
          level: 'Beginner',
          duration: '2 weeks',
          price: 50,
          currency: 'ZAR',
          instructor: 'Jane Doe',
          rating: 4.0,
          students: 100,
          image: '',
          available: true
        },
        {
          id: 'course-2',
          title: 'Course 2',
          description: 'Second course',
          category: 'Business',
          level: 'Intermediate',
          duration: '3 weeks',
          price: 75,
          currency: 'ZAR',
          instructor: 'Bob Smith',
          rating: 4.2,
          students: 120,
          image: '',
          available: true
        }
      ];

      const result = ApiResponseTransformer.transformBatch(
        apiResponses,
        ApiResponseTransformer.transformCourse
      );

      expect(result.data).toHaveLength(2);
      expect(result.data[0].id).toBe('course-1');
      expect(result.data[1].id).toBe('course-2');
    });

    it('should handle mixed valid and invalid items', () => {
      const apiResponses = [
        {
          id: 'course-1',
          title: 'Valid Course',
          description: 'A valid course',
          category: 'Tech',
          level: 'Beginner',
          duration: '2 weeks',
          price: 50,
          currency: 'ZAR',
          instructor: 'Jane Doe',
          rating: 4.0,
          students: 100,
          image: '',
          available: true
        },
        null // Invalid item
      ];

      const result = ApiResponseTransformer.transformBatch(
        apiResponses,
        ApiResponseTransformer.transformCourse
      );

      expect(result.data).toHaveLength(1);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});

describe('LegacyDataConverter', () => {
  describe('courseToUnified', () => {
    it('should convert Course to UnifiedCourse', () => {
      const course: Course = {
        id: 'course-123',
        title: 'Test Course',
        description: 'A test course',
        category: 'Technology',
        level: 'Beginner',
        duration: '4 weeks',
        is_free: false,
        price: 99.99,
        currency: 'ZAR',
        students: 150,
        rating: 4.5,
        instructor: {
          id: 'instructor-1',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com'
        },
        status: 'active',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        available: true,
        thumbnail: 'https://example.com/image.jpg'
      };

      const unified = LegacyDataConverter.courseToUnified(course);

      expect(unified.id).toBe('course-123');
      expect(unified.instructor).toBe('John Doe');
      expect(unified.image).toBe('https://example.com/image.jpg');
      expect(unified.courseId).toBe('course-123');
    });
  });

  describe('simplifiedToUnified', () => {
    it('should convert SimplifiedCourse to UnifiedCourse', () => {
      const simplified: SimplifiedCourse = {
        id: 'course-123',
        title: 'Test Course',
        description: 'A test course',
        category: 'Technology',
        level: 'Beginner',
        duration: '4 weeks',
        is_free: false,
        price: 99.99,
        currency: 'ZAR',
        students: 150,
        rating: 4.5,
        instructor: {
          id: 'instructor-1',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com'
        },
        status: 'active',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        available: true
      };

      const unified = LegacyDataConverter.simplifiedToUnified(simplified);

      expect(unified.id).toBe('course-123');
      expect(unified.instructor).toBe('John Doe');
      expect(unified.courseId).toBe('course-123');
    });
  });

  describe('unifiedToCourse', () => {
    it('should convert UnifiedCourse back to Course format', () => {
      const unified: UnifiedCourse = {
        id: 'course-123',
        title: 'Test Course',
        description: 'A test course',
        category: 'Technology',
        level: 'Beginner',
        duration: '4 weeks',
        price: 99.99,
        currency: 'ZAR',
        instructor: 'John Doe',
        rating: 4.5,
        students: 150,
        image: 'https://example.com/image.jpg',
        available: true,
        courseId: 'course-123'
      };

      const course = LegacyDataConverter.unifiedToCourse(unified);

      expect(course.id).toBe('course-123');
      expect(course.instructor?.first_name).toBe('John');
      expect(course.instructor?.last_name).toBe('Doe');
      expect(course.thumbnail).toBe('https://example.com/image.jpg');
      expect(course.is_free).toBe(false);
    });

    it('should handle single name instructor', () => {
      const unified: UnifiedCourse = {
        id: 'course-123',
        title: 'Test Course',
        description: 'A test course',
        category: 'Technology',
        level: 'Beginner',
        duration: '4 weeks',
        price: 0,
        currency: 'ZAR',
        instructor: 'Madonna', // Single name
        rating: 4.5,
        students: 150,
        image: '',
        available: true,
        courseId: 'course-123'
      };

      const course = LegacyDataConverter.unifiedToCourse(unified);

      expect(course.instructor?.first_name).toBe('Madonna');
      expect(course.instructor?.last_name).toBe('');
      expect(course.is_free).toBe(true);
    });
  });
});