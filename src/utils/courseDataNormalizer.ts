import { UnifiedCourse, COURSE_CATEGORIES, CourseCategory } from '@/types/unifiedCourse';
import { Course } from '@/types/course';
import { FastCourse } from '@/hooks/useFastCourses';

/**
 * Course Data Normalizer
 * Converts between different course data formats and ensures consistency
 */
export class CourseDataNormalizer {
  /**
   * Normalize featured courses data to unified format
   */
  static normalizeFeaturedCourse(course: any): UnifiedCourse {
    // Handle price conversion
    let price = 0;
    if (typeof course.price === 'string') {
      // Extract number from string like "R2500" or "Free"
      if (course.price.toLowerCase() === 'free') {
        price = 0;
      } else {
        const priceMatch = course.price.match(/\d+/);
        price = priceMatch ? parseInt(priceMatch[0]) : 0;
      }
    } else if (typeof course.price === 'number') {
      price = course.price;
    }

    // Normalize category
    const category = this.normalizeCategory(course.category || 'Professional Services');

    // Generate image path
    const image = course.image || '/placeholder.svg';

    return {
      id: course.courseId || course.id?.toString() || '',
      title: course.title || '',
      description: course.description || '',
      category,
      level: course.level || 'Beginner',
      duration: course.duration || '4 weeks',
      price,
      currency: 'ZAR',
      instructor: course.instructor || 'Beta Skill Tutor',
      rating: course.rating || 4.5,
      students: course.students || 0,
      image,
      isComingSoon: course.isComingSoon || false,
      available: !course.isComingSoon,
      courseId: course.courseId || course.id?.toString() || ''
    };
  }

  /**
   * Convert Course to UnifiedCourse
   */
  static fromCourse(course: Course): UnifiedCourse {
    const instructorName = course.instructor 
      ? `${course.instructor.first_name} ${course.instructor.last_name}`.trim()
      : 'Beta Skill Tutor';

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: this.normalizeCategory(course.category),
      level: course.level,
      duration: course.duration,
      price: course.price,
      currency: course.currency,
      instructor: instructorName,
      rating: course.rating,
      students: course.students,
      image: course.thumbnail || '/placeholder.svg',
      isComingSoon: course.isComingSoon || false,
      available: course.available,
      courseId: course.id
    };
  }

  /**
   * Convert FastCourse to UnifiedCourse
   */
  static fromFastCourse(course: FastCourse): UnifiedCourse {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: this.normalizeCategory(course.category),
      level: course.level,
      duration: course.duration,
      price: course.price,
      currency: 'ZAR',
      instructor: course.instructor,
      rating: course.rating,
      students: course.students,
      image: course.image,
      isComingSoon: course.isComingSoon || false,
      available: !course.isComingSoon,
      courseId: course.id
    };
  }

  /**
   * Convert UnifiedCourse to FastCourse for backward compatibility
   */
  static toFastCourse(course: UnifiedCourse): FastCourse {
    return {
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
    };
  }

  /**
   * Normalize category names to match predefined categories
   */
  private static normalizeCategory(category: string): string {
    // Direct match
    if (COURSE_CATEGORIES[category as CourseCategory]) {
      return COURSE_CATEGORIES[category as CourseCategory];
    }

    // Case-insensitive match
    const lowerCategory = category.toLowerCase();
    for (const [key, value] of Object.entries(COURSE_CATEGORIES)) {
      if (key.toLowerCase() === lowerCategory) {
        return value;
      }
    }

    // Partial matches for common variations
    if (lowerCategory.includes('business') || lowerCategory.includes('entrepreneur')) {
      return 'Business';
    }
    if (lowerCategory.includes('computer') || lowerCategory.includes('programming') || lowerCategory.includes('ai')) {
      return 'ICT';
    }
    if (lowerCategory.includes('motor') || lowerCategory.includes('mechanic') || lowerCategory.includes('automotive')) {
      return 'Motor Vehicles';
    }
    if (lowerCategory.includes('beauty') || lowerCategory.includes('hair') || lowerCategory.includes('nail')) {
      return 'Health and Beauty';
    }
    if (lowerCategory.includes('construction') || lowerCategory.includes('building') || lowerCategory.includes('plumbing') || lowerCategory.includes('roofing') || lowerCategory.includes('tiling')) {
      return 'Construction and Civil';
    }
    if (lowerCategory.includes('sound') || lowerCategory.includes('audio') || lowerCategory.includes('podcast')) {
      return 'Film & Broadcasting';
    }
    if (lowerCategory.includes('christian') || lowerCategory.includes('religion')) {
      return 'Religion';
    }

    // Default fallback
    return 'Professional Services';
  }

  /**
   * Validate unified course data
   */
  static validateCourse(course: UnifiedCourse): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!course.id) errors.push('Course ID is required');
    if (!course.title) errors.push('Course title is required');
    if (!course.description) errors.push('Course description is required');
    if (!course.category) errors.push('Course category is required');
    if (!course.level) errors.push('Course level is required');
    if (!course.duration) errors.push('Course duration is required');
    if (course.price < 0) errors.push('Course price cannot be negative');
    if (!course.currency) errors.push('Course currency is required');
    if (!course.instructor) errors.push('Course instructor is required');
    if (course.rating < 0 || course.rating > 5) errors.push('Course rating must be between 0 and 5');
    if (course.students < 0) errors.push('Student count cannot be negative');

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}