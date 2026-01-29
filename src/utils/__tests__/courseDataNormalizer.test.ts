import { CourseDataNormalizer } from '../courseDataNormalizer';
import { UnifiedCourse } from '@/types/unifiedCourse';

describe('CourseDataNormalizer', () => {
  const mockFeaturedCourse = {
    id: 'test-course',
    title: 'Test Course',
    instructor: 'Test Instructor',
    rating: 4.5,
    students: 100,
    duration: '8 weeks',
    price: 'R2500',
    image: '/test.svg',
    level: 'Intermediate',
    description: 'Test course description',
    category: 'Business',
    courseId: 'test-course'
  };

  const mockUnifiedCourse: UnifiedCourse = {
    id: 'test-course',
    title: 'Test Course',
    description: 'Test course description',
    category: 'Business',
    level: 'Intermediate',
    duration: '8 weeks',
    price: 2500,
    currency: 'ZAR',
    instructor: 'Test Instructor',
    rating: 4.5,
    students: 100,
    image: '/test.svg',
    isComingSoon: false,
    available: true,
    courseId: 'test-course'
  };

  describe('normalizeFeaturedCourse', () => {
    it('should convert string price to number', () => {
      const result = CourseDataNormalizer.normalizeFeaturedCourse(mockFeaturedCourse);
      expect(result.price).toBe(2500);
      expect(result.currency).toBe('ZAR');
    });

    it('should handle free courses', () => {
      const freeCourse = { ...mockFeaturedCourse, price: 'Free' };
      const result = CourseDataNormalizer.normalizeFeaturedCourse(freeCourse);
      expect(result.price).toBe(0);
    });

    it('should normalize category', () => {
      const result = CourseDataNormalizer.normalizeFeaturedCourse(mockFeaturedCourse);
      expect(result.category).toBe('Business');
    });
  });

  describe('validateCourse', () => {
    it('should validate a correct course', () => {
      const result = CourseDataNormalizer.validateCourse(mockUnifiedCourse);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const invalidCourse = { ...mockUnifiedCourse, title: '' };
      const result = CourseDataNormalizer.validateCourse(invalidCourse);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Course title is required');
    });

    it('should detect invalid price', () => {
      const invalidCourse = { ...mockUnifiedCourse, price: -100 };
      const result = CourseDataNormalizer.validateCourse(invalidCourse);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Course price cannot be negative');
    });
  });

  describe('toFastCourse', () => {
    it('should convert UnifiedCourse to FastCourse', () => {
      const result = CourseDataNormalizer.toFastCourse(mockUnifiedCourse);
      expect(result.id).toBe(mockUnifiedCourse.id);
      expect(result.title).toBe(mockUnifiedCourse.title);
      expect(result.price).toBe(mockUnifiedCourse.price);
    });
  });
});