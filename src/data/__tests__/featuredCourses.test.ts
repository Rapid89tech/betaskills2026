import { 
  featuredCourses, 
  getFeaturedCourseCategories, 
  getCoursesByCategory,
  getFreeCourses,
  getPaidCourses,
  searchCourses,
  getCourseById
} from '../featuredCourses';
import { COURSE_CATEGORIES } from '@/types/unifiedCourse';

describe('Featured Courses', () => {
  describe('Data Structure Validation', () => {
    it('should have all required properties for each course', () => {
      const requiredProperties = [
        'id', 'title', 'description', 'category', 'level', 
        'duration', 'price', 'currency', 'instructor', 
        'rating', 'students', 'image', 'available', 'courseId'
      ];

      featuredCourses.forEach(course => {
        requiredProperties.forEach(prop => {
          expect(course).toHaveProperty(prop);
          expect(course[prop as keyof typeof course]).toBeDefined();
        });
      });
    });

    it('should have valid categories from predefined list', () => {
      const validCategories = Object.values(COURSE_CATEGORIES);
      
      featuredCourses.forEach(course => {
        expect(validCategories).toContain(course.category);
      });
    });

    it('should have valid price values', () => {
      featuredCourses.forEach(course => {
        expect(course.price).toBeGreaterThanOrEqual(0);
        expect(typeof course.price).toBe('number');
      });
    });

    it('should have valid rating values', () => {
      featuredCourses.forEach(course => {
        expect(course.rating).toBeGreaterThanOrEqual(0);
        expect(course.rating).toBeLessThanOrEqual(5);
        expect(typeof course.rating).toBe('number');
      });
    });

    it('should have ZAR currency for all courses', () => {
      featuredCourses.forEach(course => {
        expect(course.currency).toBe('ZAR');
      });
    });

    it('should have backward compatibility with courseId', () => {
      featuredCourses.forEach(course => {
        expect(course.id).toBe(course.courseId);
      });
    });
  });

  describe('Utility Functions', () => {
    it('should get unique categories', () => {
      const categories = getFeaturedCourseCategories();
      expect(categories.length).toBeGreaterThan(0);
      expect(categories).toEqual([...new Set(categories)].sort());
    });

    it('should filter courses by category', () => {
      const ictCourses = getCoursesByCategory('ICT');
      expect(ictCourses.length).toBeGreaterThan(0);
      ictCourses.forEach(course => {
        expect(course.category).toBe('ICT');
      });
    });

    it('should get free courses', () => {
      const freeCourses = getFreeCourses();
      freeCourses.forEach(course => {
        expect(course.price).toBe(0);
      });
    });

    it('should get paid courses', () => {
      const paidCourses = getPaidCourses();
      paidCourses.forEach(course => {
        expect(course.price).toBeGreaterThan(0);
      });
    });

    it('should search courses by title', () => {
      const results = searchCourses('AI');
      expect(results.length).toBeGreaterThan(0);
      results.forEach(course => {
        expect(
          course.title.toLowerCase().includes('ai') ||
          course.description.toLowerCase().includes('ai')
        ).toBe(true);
      });
    });

    it('should get course by ID', () => {
      const firstCourse = featuredCourses[0];
      const foundCourse = getCourseById(firstCourse.id);
      expect(foundCourse).toEqual(firstCourse);
    });

    it('should get course by courseId for backward compatibility', () => {
      const firstCourse = featuredCourses[0];
      const foundCourse = getCourseById(firstCourse.courseId);
      expect(foundCourse).toEqual(firstCourse);
    });
  });

  describe('Data Quality', () => {
    it('should have unique course IDs', () => {
      const ids = featuredCourses.map(course => course.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids.length).toBe(uniqueIds.length);
    });

    it('should have non-empty titles and descriptions', () => {
      featuredCourses.forEach(course => {
        expect(course.title.trim().length).toBeGreaterThan(0);
        expect(course.description.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have valid instructor names', () => {
      featuredCourses.forEach(course => {
        expect(course.instructor.trim().length).toBeGreaterThan(0);
        expect(typeof course.instructor).toBe('string');
      });
    });

    it('should have valid duration format', () => {
      featuredCourses.forEach(course => {
        expect(course.duration).toMatch(/\d+\s+(week|month)s?/i);
      });
    });

    it('should have valid level values', () => {
      const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
      featuredCourses.forEach(course => {
        expect(validLevels).toContain(course.level);
      });
    });
  });
});