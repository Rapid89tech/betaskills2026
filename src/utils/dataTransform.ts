/**
 * Data Transformation Utilities
 * Provides API response normalization and data structure transformation
 */

import { Course, SimplifiedCourse } from '@/types/course';
import { UnifiedCourse } from '@/types/unifiedCourse';
import { Enrollment } from '@/types/enrollment';
import { DataValidator, ValidationResult, courseValidationRules, enrollmentValidationRules, userProfileValidationRules } from './validation';

export interface TransformationResult<T> {
  data: T | null;
  validation: ValidationResult;
  warnings: string[];
}

export interface NormalizationOptions {
  strict?: boolean;
  applyDefaults?: boolean;
  validateRequired?: boolean;
}

/**
 * API Response Transformer
 * Handles normalization of API responses to consistent data structures
 */
export class ApiResponseTransformer {
  /**
   * Transform and validate course data from API response
   */
  static transformCourse(apiResponse: any, options: NormalizationOptions = {}): TransformationResult<UnifiedCourse> {
    const warnings: string[] = [];
    const { strict = false, applyDefaults = true, validateRequired = true } = options;
    
    try {
      // Handle different API response formats
      const courseData = this.extractCourseData(apiResponse, warnings);
      
      // Apply default values for missing fields
      const normalizedCourse = applyDefaults ? 
        this.applyCourseDefaults(courseData, warnings) : 
        courseData;
      
      // Validate the transformed data
      const validation = validateRequired ? 
        DataValidator.validate(normalizedCourse, courseValidationRules) : 
        { isValid: true, errors: [], warnings: [] };
      
      // In strict mode, return null if validation fails
      if (strict && !validation.isValid) {
        return {
          data: null,
          validation,
          warnings
        };
      }
      
      return {
        data: normalizedCourse as UnifiedCourse,
        validation,
        warnings
      };
    } catch (error) {
      return {
        data: null,
        validation: {
          isValid: false,
          errors: [`Transformation error: ${error instanceof Error ? error.message : 'Unknown error'}`],
          warnings: []
        },
        warnings
      };
    }
  }

  /**
   * Transform enrollment data from API response
   */
  static transformEnrollment(apiResponse: any, options: NormalizationOptions = {}): TransformationResult<Enrollment> {
    const warnings: string[] = [];
    const { strict = false, applyDefaults = true, validateRequired = true } = options;
    
    try {
      const enrollmentData = this.extractEnrollmentData(apiResponse, warnings);
      
      const normalizedEnrollment = applyDefaults ? 
        this.applyEnrollmentDefaults(enrollmentData, warnings) : 
        enrollmentData;
      
      const validation = validateRequired ? 
        DataValidator.validate(normalizedEnrollment, enrollmentValidationRules) : 
        { isValid: true, errors: [], warnings: [] };
      
      if (strict && !validation.isValid) {
        return {
          data: null,
          validation,
          warnings
        };
      }
      
      return {
        data: normalizedEnrollment as Enrollment,
        validation,
        warnings
      };
    } catch (error) {
      return {
        data: null,
        validation: {
          isValid: false,
          errors: [`Transformation error: ${error instanceof Error ? error.message : 'Unknown error'}`],
          warnings: []
        },
        warnings
      };
    }
  }

  /**
   * Transform user profile data from API response
   */
  static transformUserProfile(apiResponse: any, options: NormalizationOptions = {}): TransformationResult<any> {
    const warnings: string[] = [];
    const { strict = false, applyDefaults = true, validateRequired = true } = options;
    
    try {
      const userData = this.extractUserData(apiResponse, warnings);
      
      const normalizedUser = applyDefaults ? 
        this.applyUserDefaults(userData, warnings) : 
        userData;
      
      const validation = validateRequired ? 
        DataValidator.validate(normalizedUser, userProfileValidationRules) : 
        { isValid: true, errors: [], warnings: [] };
      
      if (strict && !validation.isValid) {
        return {
          data: null,
          validation,
          warnings
        };
      }
      
      return {
        data: normalizedUser,
        validation,
        warnings
      };
    } catch (error) {
      return {
        data: null,
        validation: {
          isValid: false,
          errors: [`Transformation error: ${error instanceof Error ? error.message : 'Unknown error'}`],
          warnings: []
        },
        warnings
      };
    }
  }

  /**
   * Batch transform multiple items
   */
  static transformBatch<T>(
    apiResponses: any[], 
    transformer: (item: any, options?: NormalizationOptions) => TransformationResult<T>,
    options: NormalizationOptions = {}
  ): { 
    data: T[], 
    errors: string[], 
    warnings: string[] 
  } {
    const data: T[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const response of apiResponses) {
      const result = transformer(response, options);
      
      if (result.data) {
        data.push(result.data);
      }
      
      errors.push(...result.validation.errors);
      warnings.push(...result.validation.warnings, ...result.warnings);
    }

    return { data, errors, warnings };
  }

  /**
   * Extract course data from various API response formats
   */
  private static extractCourseData(apiResponse: any, warnings: string[]): any {
    // Handle array responses (take first item)
    if (Array.isArray(apiResponse)) {
      if (apiResponse.length === 0) {
        throw new Error('Empty array response');
      }
      if (apiResponse.length > 1) {
        warnings.push('Multiple items in response, using first item');
      }
      return this.extractCourseData(apiResponse[0], warnings);
    }

    // Handle nested data structures
    if (apiResponse.data) {
      return this.extractCourseData(apiResponse.data, warnings);
    }

    // Handle course object directly
    if (typeof apiResponse === 'object' && apiResponse !== null) {
      return apiResponse;
    }

    throw new Error('Invalid API response format');
  }

  /**
   * Extract enrollment data from API response
   */
  private static extractEnrollmentData(apiResponse: any, warnings: string[]): any {
    if (Array.isArray(apiResponse)) {
      if (apiResponse.length === 0) {
        throw new Error('Empty array response');
      }
      if (apiResponse.length > 1) {
        warnings.push('Multiple enrollments in response, using first item');
      }
      return this.extractEnrollmentData(apiResponse[0], warnings);
    }

    if (apiResponse.data) {
      return this.extractEnrollmentData(apiResponse.data, warnings);
    }

    if (typeof apiResponse === 'object' && apiResponse !== null) {
      return apiResponse;
    }

    throw new Error('Invalid enrollment API response format');
  }

  /**
   * Extract user data from API response
   */
  private static extractUserData(apiResponse: any, warnings: string[]): any {
    if (Array.isArray(apiResponse)) {
      if (apiResponse.length === 0) {
        throw new Error('Empty array response');
      }
      if (apiResponse.length > 1) {
        warnings.push('Multiple users in response, using first item');
      }
      return this.extractUserData(apiResponse[0], warnings);
    }

    if (apiResponse.data) {
      return this.extractUserData(apiResponse.data, warnings);
    }

    if (typeof apiResponse === 'object' && apiResponse !== null) {
      return apiResponse;
    }

    throw new Error('Invalid user API response format');
  }

  /**
   * Apply default values for missing course fields
   */
  private static applyCourseDefaults(courseData: any, warnings: string[]): any {
    const defaults = {
      id: courseData.id || courseData.courseId || '',
      title: courseData.title || 'Untitled Course',
      description: courseData.description || '',
      category: courseData.category || 'General',
      level: courseData.level || 'Beginner',
      duration: courseData.duration || '0 hours',
      price: typeof courseData.price === 'number' ? courseData.price : 0,
      currency: courseData.currency || 'ZAR',
      instructor: this.extractInstructorName(courseData.instructor) || 'Unknown Instructor',
      rating: typeof courseData.rating === 'number' ? courseData.rating : 0,
      students: typeof courseData.students === 'number' ? courseData.students : 0,
      image: courseData.image || courseData.thumbnail || '',
      isComingSoon: courseData.isComingSoon !== undefined ? courseData.isComingSoon : 
                   courseData.is_coming_soon !== undefined ? courseData.is_coming_soon : false,
      available: courseData.available !== undefined ? courseData.available : true,
      courseId: courseData.courseId || courseData.id || ''
    };

    // Track which defaults were applied
    Object.keys(defaults).forEach(key => {
      if (courseData[key] === undefined || courseData[key] === null) {
        warnings.push(`Applied default value for missing field: ${key}`);
      }
    });

    return { ...courseData, ...defaults };
  }

  /**
   * Apply default values for missing enrollment fields
   */
  private static applyEnrollmentDefaults(enrollmentData: any, warnings: string[]): any {
    const defaults = {
      id: enrollmentData.id || '',
      userId: enrollmentData.userId || enrollmentData.user_id || '',
      courseId: enrollmentData.courseId || enrollmentData.course_id || '',
      status: enrollmentData.status || 'PENDING',
      paymentStatus: enrollmentData.paymentStatus || enrollmentData.payment_status || 'PENDING',
      createdAt: enrollmentData.createdAt || enrollmentData.created_at || enrollmentData.enrolled_at || new Date().toISOString(),
      updatedAt: enrollmentData.updatedAt || enrollmentData.updated_at || new Date().toISOString(),
      progress: typeof enrollmentData.progress === 'number' ? enrollmentData.progress : 0
    };

    Object.keys(defaults).forEach(key => {
      if (enrollmentData[key] === undefined || enrollmentData[key] === null) {
        warnings.push(`Applied default value for missing enrollment field: ${key}`);
      }
    });

    return { ...enrollmentData, ...defaults };
  }

  /**
   * Apply default values for missing user fields
   */
  private static applyUserDefaults(userData: any, warnings: string[]): any {
    const defaults = {
      id: userData.id || '',
      email: userData.email || '',
      first_name: userData.first_name || userData.firstName || '',
      last_name: userData.last_name || userData.lastName || '',
      role: userData.role || 'student',
      created_at: userData.created_at || userData.createdAt || new Date().toISOString(),
      updated_at: userData.updated_at || userData.updatedAt || new Date().toISOString()
    };

    Object.keys(defaults).forEach(key => {
      if (userData[key] === undefined || userData[key] === null) {
        warnings.push(`Applied default value for missing user field: ${key}`);
      }
    });

    return { ...userData, ...defaults };
  }

  /**
   * Extract instructor name from various formats
   */
  private static extractInstructorName(instructor: any): string {
    if (typeof instructor === 'string') {
      return instructor;
    }
    
    if (typeof instructor === 'object' && instructor !== null) {
      if (instructor.first_name && instructor.last_name) {
        return `${instructor.first_name} ${instructor.last_name}`;
      }
      if (instructor.name) {
        return instructor.name;
      }
      if (instructor.firstName && instructor.lastName) {
        return `${instructor.firstName} ${instructor.lastName}`;
      }
    }
    
    return '';
  }
}

/**
 * Legacy Data Converter
 * Converts between old and new data formats for backward compatibility
 */
export class LegacyDataConverter {
  /**
   * Convert Course to UnifiedCourse format
   */
  static courseToUnified(course: Course): UnifiedCourse {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      duration: course.duration,
      price: course.price,
      currency: course.currency,
      instructor: `${course.instructor.first_name} ${course.instructor.last_name}`,
      rating: course.rating,
      students: course.students,
      image: course.thumbnail || '',
      isComingSoon: course.isComingSoon !== undefined ? course.isComingSoon : undefined,
      available: course.available,
      courseId: course.id
    };
  }

  /**
   * Convert SimplifiedCourse to UnifiedCourse format
   */
  static simplifiedToUnified(course: SimplifiedCourse): UnifiedCourse {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      duration: course.duration,
      price: course.price,
      currency: course.currency,
      instructor: `${course.instructor.first_name} ${course.instructor.last_name}`,
      rating: course.rating,
      students: course.students,
      image: course.thumbnail || '',
      isComingSoon: course.isComingSoon !== undefined ? course.isComingSoon : undefined,
      available: course.available,
      courseId: course.id
    };
  }

  /**
   * Convert UnifiedCourse back to Course format
   */
  static unifiedToCourse(unifiedCourse: UnifiedCourse): Partial<Course> {
    const [firstName = '', lastName = ''] = unifiedCourse.instructor.split(' ');
    
    return {
      id: unifiedCourse.id,
      title: unifiedCourse.title,
      description: unifiedCourse.description,
      category: unifiedCourse.category,
      level: unifiedCourse.level,
      duration: unifiedCourse.duration,
      price: unifiedCourse.price,
      currency: unifiedCourse.currency,
      rating: unifiedCourse.rating,
      students: unifiedCourse.students,
      available: unifiedCourse.available,
      isComingSoon: unifiedCourse.isComingSoon !== undefined ? unifiedCourse.isComingSoon : undefined,
      thumbnail: unifiedCourse.image,
      instructor: {
        id: '',
        first_name: firstName,
        last_name: lastName,
        email: ''
      },
      is_free: unifiedCourse.price === 0,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
}