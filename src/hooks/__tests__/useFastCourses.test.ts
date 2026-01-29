import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useFastCourses } from '../useFastCourses';
import { featuredCourses } from '@/data/featuredCourses';
import { CourseDataNormalizer } from '@/utils/courseDataNormalizer';
import { fallbackManager } from '@/utils/FallbackManager';
import { errorHandler } from '@/utils/ErrorHandler';

// Mock dependencies
vi.mock('@/data/featuredCourses', () => ({
  featuredCourses: [
    {
      id: 'course-1',
      title: 'React Development',
      description: 'Learn React development',
      category: 'Technology',
      level: 'Beginner',
      duration: '4 weeks',
      price: 299,
      instructor: 'John Doe',
      rating: 4.5,
      students: 150,
      image: '/course1.jpg',
      isComingSoon: false,
      available: true,
      courseId: 'course-1',
      currency: 'ZAR'
    },
    {
      id: 'course-2',
      title: 'Node.js Backend',
      description: 'Learn Node.js backend development',
      category: 'Technology',
      level: 'Intermediate',
      duration: '6 weeks',
      price: 399,
      instructor: 'Jane Smith',
      rating: 4.7,
      students: 200,
      image: '/course2.jpg',
      isComingSoon: true,
      available: false,
      courseId: 'course-2',
      currency: 'ZAR'
    }
  ]
}));

vi.mock('@/utils/courseDataNormalizer', () => ({
  CourseDataNormalizer: {
    validateCourse: vi.fn(),
    toFastCourse: vi.fn()
  }
}));

vi.mock('@/utils/FallbackManager', () => ({
  fallbackManager: {
    withFallback: vi.fn()
  }
}));

vi.mock('@/utils/ErrorHandler', () => ({
  errorHandler: {
    handleError: vi.fn()
  }
}));

describe('useFastCourses', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementations
    (CourseDataNormalizer.validateCourse as any).mockReturnValue({
      isValid: true,
      errors: []
    });

    (CourseDataNormalizer.toFastCourse as any).mockImplementation((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image,
      category: course.category,
      duration: course.duration,
      level: course.level,
      price: course.price,
      instructor: course.instructor,
      rating: course.rating,
      students: course.students,
      isComingSoon: course.isComingSoon
    }));

    (fallbackManager.withFallback as any).mockImplementation(async (key, fn, options) => {
      const data = await fn();
      return { data, fromCache: false };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Successful Course Loading', () => {
    it('should load courses successfully', async () => {
      const { result } = renderHook(() => useFastCourses());

      // Initially loading
      expect(result.current.loading).toBe(true);
      expect(result.current.courses).toEqual([]);
      expect(result.current.error).toBe(null);

      // Wait for courses to load
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.courses).toHaveLength(2);
      expect(result.current.courses[0].title).toBe('React Development');
      expect(result.current.courses[1].title).toBe('Node.js Backend');
      expect(result.current.error).toBe(null);
    });

    it('should validate course data during loading', async () => {
      renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(CourseDataNormalizer.validateCourse).toHaveBeenCalledTimes(2);
      });

      expect(CourseDataNormalizer.validateCourse).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'course-1',
          title: 'React Development'
        })
      );
    });

    it('should convert courses to FastCourse format', async () => {
      renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(CourseDataNormalizer.toFastCourse).toHaveBeenCalledTimes(2);
      });

      expect(CourseDataNormalizer.toFastCourse).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'course-1',
          title: 'React Development'
        })
      );
    });

    it('should use fallback manager for caching', async () => {
      renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(fallbackManager.withFallback).toHaveBeenCalledWith(
          'featured-courses',
          expect.any(Function),
          expect.objectContaining({
            maxAge: 10 * 60 * 1000,
            enableOfflineMode: true,
            showFallbackIndicator: true,
            gracefulDegradation: true
          })
        );
      });
    });
  });

  describe('Course Data Validation', () => {
    it('should handle invalid course data gracefully', async () => {
      (CourseDataNormalizer.validateCourse as any)
        .mockReturnValueOnce({
          isValid: false,
          errors: ['Missing required field: price']
        })
        .mockReturnValueOnce({
          isValid: true,
          errors: []
        });

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const { result } = renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Should still include the invalid course but log a warning
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid course data for React Development:'),
        ['Missing required field: price']
      );

      expect(result.current.courses).toHaveLength(2);

      consoleSpy.mockRestore();
    });

    it('should handle courses with missing properties', async () => {
      (CourseDataNormalizer.toFastCourse as any).mockImplementation((course) => ({
        id: course.id,
        title: course.title || 'Untitled Course',
        description: course.description || 'No description available',
        image: course.image || '/default-course.jpg',
        category: course.category || 'General',
        duration: course.duration || 'TBD',
        level: course.level || 'All Levels',
        price: course.price || 0,
        instructor: course.instructor || 'TBD',
        rating: course.rating || 0,
        students: course.students || 0,
        isComingSoon: course.isComingSoon || false
      }));

      const { result } = renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.courses).toHaveLength(2);
      expect(result.current.error).toBe(null);
    });
  });

  describe('Error Handling', () => {
    it('should handle course loading errors', async () => {
      const testError = new Error('Failed to load courses');
      (fallbackManager.withFallback as any).mockRejectedValue(testError);

      const { result } = renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe('Failed to load courses');
      expect(result.current.courses).toEqual([]);
      expect(errorHandler.handleError).toHaveBeenCalledWith(testError, 'courses-loading');
    });

    it('should handle validation errors during course processing', async () => {
      (CourseDataNormalizer.validateCourse as any).mockImplementation(() => {
        throw new Error('Validation failed');
      });

      const { result } = renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe('Failed to load courses');
      expect(errorHandler.handleError).toHaveBeenCalled();
    });

    it('should handle conversion errors during course processing', async () => {
      (CourseDataNormalizer.toFastCourse as any).mockImplementation(() => {
        throw new Error('Conversion failed');
      });

      const { result } = renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe('Failed to load courses');
      expect(errorHandler.handleError).toHaveBeenCalled();
    });
  });

  describe('Fallback and Caching', () => {
    it('should handle fallback data when primary source fails', async () => {
      const fallbackCourses = [
        {
          id: 'fallback-1',
          title: 'Fallback Course',
          description: 'Cached course data',
          image: '/fallback.jpg',
          category: 'Cached',
          duration: '2 weeks',
          level: 'Beginner',
          price: 199,
          instructor: 'Cache',
          rating: 4.0,
          students: 50,
          isComingSoon: false
        }
      ];

      (fallbackManager.withFallback as any).mockResolvedValue({
        data: fallbackCourses,
        fromCache: true
      });

      const { result } = renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.courses).toEqual(fallbackCourses);
      expect(result.current.error).toBe(null);
    });

    it('should handle empty fallback data', async () => {
      (fallbackManager.withFallback as any).mockResolvedValue({
        data: null,
        fromCache: false
      });

      const { result } = renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.courses).toEqual([]);
      expect(result.current.error).toBe(null);
    });

    it('should use correct cache configuration', async () => {
      renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(fallbackManager.withFallback).toHaveBeenCalledWith(
          'featured-courses',
          expect.any(Function),
          {
            maxAge: 10 * 60 * 1000, // 10 minutes
            enableOfflineMode: true,
            showFallbackIndicator: true,
            gracefulDegradation: true
          }
        );
      });
    });
  });

  describe('Data Structure Consistency', () => {
    it('should ensure consistent FastCourse interface', async () => {
      const { result } = renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      result.current.courses.forEach(course => {
        expect(course).toHaveProperty('id');
        expect(course).toHaveProperty('title');
        expect(course).toHaveProperty('description');
        expect(course).toHaveProperty('image');
        expect(course).toHaveProperty('category');
        expect(course).toHaveProperty('duration');
        expect(course).toHaveProperty('level');
        expect(course).toHaveProperty('price');
        expect(course).toHaveProperty('instructor');
        expect(course).toHaveProperty('rating');
        expect(course).toHaveProperty('students');
        expect(typeof course.isComingSoon).toBe('boolean');
      });
    });

    it('should handle mixed course data formats', async () => {
      // Mock mixed data formats in featured courses
      (featuredCourses as any).splice(0, featuredCourses.length, 
        {
          id: 'mixed-1',
          title: 'Mixed Format Course 1',
          // Some properties missing
          category: 'Technology',
          price: 299
        },
        {
          id: 'mixed-2',
          title: 'Mixed Format Course 2',
          description: 'Complete course data',
          category: 'Business',
          level: 'Advanced',
          duration: '8 weeks',
          price: 599,
          instructor: 'Expert',
          rating: 4.9,
          students: 300,
          image: '/mixed2.jpg',
          isComingSoon: false,
          available: true,
          courseId: 'mixed-2',
          currency: 'ZAR'
        }
      );

      const { result } = renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.courses).toHaveLength(2);
      expect(result.current.error).toBe(null);
    });
  });

  describe('Performance and Memory', () => {
    it('should not cause memory leaks with multiple renders', async () => {
      const { rerender } = renderHook(() => useFastCourses());

      // Rerender multiple times
      for (let i = 0; i < 5; i++) {
        rerender();
        await waitFor(() => {
          expect(fallbackManager.withFallback).toHaveBeenCalled();
        });
      }

      // Should only call fallback manager once due to useEffect dependency
      expect(fallbackManager.withFallback).toHaveBeenCalledTimes(1);
    });

    it('should handle large course datasets efficiently', async () => {
      const largeCourseSet = Array.from({ length: 1000 }, (_, i) => ({
        id: `course-${i}`,
        title: `Course ${i}`,
        description: `Description ${i}`,
        category: 'Technology',
        level: 'Beginner',
        duration: '4 weeks',
        price: 299,
        instructor: 'Instructor',
        rating: 4.5,
        students: 150,
        image: '/course.jpg',
        isComingSoon: false,
        available: true,
        courseId: `course-${i}`,
        currency: 'ZAR'
      }));

      (fallbackManager.withFallback as any).mockResolvedValue({
        data: largeCourseSet,
        fromCache: false
      });

      const startTime = Date.now();
      const { result } = renderHook(() => useFastCourses());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      expect(result.current.courses).toHaveLength(1000);
      expect(processingTime).toBeLessThan(5000); // Should process within 5 seconds
    });
  });
});