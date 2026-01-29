import { Course, Module, Lesson } from '@/types/course';

export interface ValidationError {
  type: 'missing_data' | 'invalid_structure' | 'content_error';
  message: string;
  field?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export interface ValidationWarning {
  type: 'incomplete_content' | 'missing_optional' | 'performance' | 'content_error';
  message: string;
  field?: string;
  suggestion?: string;
}

export interface CourseValidationResult {
  isValid: boolean;
  hasModules: boolean;
  hasLessons: boolean;
  missingData: string[];
  canProceed: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  contentStatus: 'complete' | 'partial' | 'placeholder' | 'invalid';
}

export interface MinimumCourseRequirements {
  requiresTitle: boolean;
  requiresDescription: boolean;
  minimumModules: number;
  minimumLessonsPerModule: number;
  requiresLessonContent: boolean;
}

export class CourseContentValidator {
  private static readonly DEFAULT_REQUIREMENTS: MinimumCourseRequirements = {
    requiresTitle: true,
    requiresDescription: true,
    minimumModules: 1,
    minimumLessonsPerModule: 1,
    requiresLessonContent: true,
  };

  /**
   * Validates course content structure and completeness
   */
  static validateCourse(
    course: Course | null | undefined,
    requirements: Partial<MinimumCourseRequirements> = {}
  ): CourseValidationResult {
    const reqs = { ...this.DEFAULT_REQUIREMENTS, ...requirements };
    const result: CourseValidationResult = {
      isValid: false,
      hasModules: false,
      hasLessons: false,
      missingData: [],
      canProceed: false,
      errors: [],
      warnings: [],
      contentStatus: 'invalid',
    };

    // Check if course exists
    if (!course) {
      result.errors.push({
        type: 'missing_data',
        message: 'Course data is null or undefined',
        severity: 'critical',
      });
      return result;
    }

    // Validate basic course properties
    this.validateBasicProperties(course, reqs, result);
    
    // Validate course structure
    this.validateCourseStructure(course, reqs, result);
    
    // Validate content completeness
    this.validateContentCompleteness(course, reqs, result);
    
    // Determine overall status
    this.determineOverallStatus(result);

    return result;
  }

  /**
   * Validates basic course properties like title and description
   */
  private static validateBasicProperties(
    course: Course,
    requirements: MinimumCourseRequirements,
    result: CourseValidationResult
  ): void {
    if (requirements.requiresTitle && (!course.title || course.title.trim() === '')) {
      result.errors.push({
        type: 'missing_data',
        message: 'Course title is required but missing or empty',
        field: 'title',
        severity: 'high',
      });
      result.missingData.push('title');
    }

    if (requirements.requiresDescription && (!course.description || course.description.trim() === '')) {
      result.warnings.push({
        type: 'incomplete_content',
        message: 'Course description is missing or empty',
        field: 'description',
        suggestion: 'Add a descriptive course overview',
      });
      result.missingData.push('description');
    }

    // Check for course ID
    if (!course.id || course.id === '') {
      result.errors.push({
        type: 'missing_data',
        message: 'Course ID is required but missing',
        field: 'id',
        severity: 'critical',
      });
      result.missingData.push('id');
    }
  }

  /**
   * Validates course module and lesson structure
   */
  private static validateCourseStructure(
    course: Course,
    requirements: MinimumCourseRequirements,
    result: CourseValidationResult
  ): void {
    // Check modules
    if (!course.modules || !Array.isArray(course.modules)) {
      result.errors.push({
        type: 'invalid_structure',
        message: 'Course modules must be an array',
        field: 'modules',
        severity: 'critical',
      });
      result.missingData.push('modules');
      return;
    }

    result.hasModules = course.modules.length > 0;

    if (course.modules.length < requirements.minimumModules) {
      result.errors.push({
        type: 'missing_data',
        message: `Course requires at least ${requirements.minimumModules} module(s), found ${course.modules.length}`,
        field: 'modules',
        severity: 'high',
      });
    }

    // Validate each module
    let totalLessons = 0;
    course.modules.forEach((module, moduleIndex) => {
      this.validateModule(module, moduleIndex, requirements, result);
      if (module.lessons && Array.isArray(module.lessons)) {
        totalLessons += module.lessons.length;
      }
    });

    result.hasLessons = totalLessons > 0;
  }

  /**
   * Validates individual module structure
   */
  private static validateModule(
    module: Module,
    moduleIndex: number,
    requirements: MinimumCourseRequirements,
    result: CourseValidationResult
  ): void {
    const modulePrefix = `Module ${moduleIndex + 1}`;

    // Check module basic properties
    if (!module.id || module.id === 0) {
      result.errors.push({
        type: 'missing_data',
        message: `${modulePrefix}: Module ID is required`,
        field: `modules[${moduleIndex}].id`,
        severity: 'high',
      });
    }

    if (!module.title || module.title.trim() === '') {
      result.errors.push({
        type: 'missing_data',
        message: `${modulePrefix}: Module title is required`,
        field: `modules[${moduleIndex}].title`,
        severity: 'high',
      });
    }

    // Check lessons
    if (!module.lessons || !Array.isArray(module.lessons)) {
      result.errors.push({
        type: 'invalid_structure',
        message: `${modulePrefix}: Module lessons must be an array`,
        field: `modules[${moduleIndex}].lessons`,
        severity: 'high',
      });
      return;
    }

    if (module.lessons.length < requirements.minimumLessonsPerModule) {
      result.warnings.push({
        type: 'incomplete_content',
        message: `${modulePrefix}: Module has ${module.lessons.length} lesson(s), recommended minimum is ${requirements.minimumLessonsPerModule}`,
        field: `modules[${moduleIndex}].lessons`,
        suggestion: 'Consider adding more lessons to provide comprehensive coverage',
      });
    }

    // Validate each lesson
    module.lessons.forEach((lesson, lessonIndex) => {
      this.validateLesson(lesson, moduleIndex, lessonIndex, requirements, result);
    });
  }

  /**
   * Validates individual lesson structure
   */
  private static validateLesson(
    lesson: Lesson,
    moduleIndex: number,
    lessonIndex: number,
    requirements: MinimumCourseRequirements,
    result: CourseValidationResult
  ): void {
    const lessonPrefix = `Module ${moduleIndex + 1}, Lesson ${lessonIndex + 1}`;

    // Check lesson basic properties
    if (!lesson.id || lesson.id === 0) {
      result.errors.push({
        type: 'missing_data',
        message: `${lessonPrefix}: Lesson ID is required`,
        field: `modules[${moduleIndex}].lessons[${lessonIndex}].id`,
        severity: 'high',
      });
    }

    if (!lesson.title || lesson.title.trim() === '') {
      result.errors.push({
        type: 'missing_data',
        message: `${lessonPrefix}: Lesson title is required`,
        field: `modules[${moduleIndex}].lessons[${lessonIndex}].title`,
        severity: 'high',
      });
    }

    // Check lesson content if required
    if (requirements.requiresLessonContent) {
      if (!lesson.content) {
        result.warnings.push({
          type: 'incomplete_content',
          message: `${lessonPrefix}: Lesson content is missing`,
          field: `modules[${moduleIndex}].lessons[${lessonIndex}].content`,
          suggestion: 'Add lesson content to provide learning material',
        });
      }
    }

    // Check for video content if it's a video lesson
    if (lesson.type === 'video' && lesson.content) {
      const videoContent = lesson.content as any;
      if (videoContent.videoUrl && typeof videoContent.videoUrl === 'string' && videoContent.videoUrl.trim() !== '') {
        // Basic URL validation
        try {
          new URL(videoContent.videoUrl);
        } catch {
          result.warnings.push({
            type: 'content_error',
            message: `${lessonPrefix}: Invalid video URL format`,
            field: `modules[${moduleIndex}].lessons[${lessonIndex}].content.videoUrl`,
            suggestion: 'Ensure video URL is properly formatted',
          });
        }
      }
    }
  }

  /**
   * Validates content completeness and quality
   */
  private static validateContentCompleteness(
    course: Course,
    _requirements: MinimumCourseRequirements,
    result: CourseValidationResult
  ): void {
    if (!result.hasModules) {
      result.contentStatus = 'invalid';
      return;
    }

    if (!result.hasLessons) {
      result.contentStatus = 'placeholder';
      return;
    }

    // Count content completeness
    let totalLessons = 0;
    let lessonsWithContent = 0;
    let lessonsWithVideo = 0;

    course.modules?.forEach(module => {
      module.lessons?.forEach(lesson => {
        totalLessons++;
        if (lesson.content) {
          lessonsWithContent++;
        }
        if (lesson.type === 'video' && lesson.content) {
          const videoContent = lesson.content as any;
          if (videoContent.videoUrl && typeof videoContent.videoUrl === 'string' && videoContent.videoUrl.trim() !== '') {
            lessonsWithVideo++;
          }
        }
      });
    });

    const contentCompleteness = totalLessons > 0 ? lessonsWithContent / totalLessons : 0;
    const videoCompleteness = totalLessons > 0 ? lessonsWithVideo / totalLessons : 0;

    if (contentCompleteness >= 0.8) {
      result.contentStatus = 'complete';
    } else if (contentCompleteness >= 0.5) {
      result.contentStatus = 'partial';
    } else {
      result.contentStatus = 'placeholder';
    }

    // Add performance warnings
    if (videoCompleteness < 0.3 && totalLessons > 0) {
      result.warnings.push({
        type: 'incomplete_content',
        message: `Only ${Math.round(videoCompleteness * 100)}% of lessons have video content`,
        suggestion: 'Consider adding video content to improve learning experience',
      });
    }
  }

  /**
   * Determines overall validation status
   */
  private static determineOverallStatus(result: CourseValidationResult): void {
    const criticalErrors = result.errors.filter(e => e.severity === 'critical').length;
    const highErrors = result.errors.filter(e => e.severity === 'high').length;

    // Course is valid if no critical errors and has basic structure
    result.isValid = criticalErrors === 0 && result.hasModules && result.hasLessons;
    
    // Course can proceed if no critical errors (even with warnings)
    result.canProceed = criticalErrors === 0 && result.hasModules;

    // Adjust content status based on errors
    if (criticalErrors > 0) {
      result.contentStatus = 'invalid';
    } else if (highErrors > 0 && result.contentStatus === 'complete') {
      result.contentStatus = 'partial';
    }
  }

  /**
   * Creates user-friendly error messages for missing content
   */
  static createUserFriendlyMessage(validationResult: CourseValidationResult): string {
    if (validationResult.isValid) {
      return 'Course content is ready for learning!';
    }

    const criticalErrors = validationResult.errors.filter(e => e.severity === 'critical');
    const highErrors = validationResult.errors.filter(e => e.severity === 'high');

    if (criticalErrors.length > 0) {
      return 'This course is currently unavailable due to missing essential content. Please contact support for assistance.';
    }

    if (highErrors.length > 0) {
      return 'This course is being prepared and may have limited content available. Some lessons might not be accessible yet.';
    }

    if (validationResult.contentStatus === 'placeholder') {
      return 'This course is in development. Basic structure is available but content is still being added.';
    }

    if (validationResult.contentStatus === 'partial') {
      return 'This course is partially complete. Most content is available for learning.';
    }

    return 'Course content validation completed with minor issues.';
  }

  /**
   * Checks if course has minimum required data structure
   */
  static hasMinimumRequiredData(course: Course | null | undefined): boolean {
    if (!course) return false;
    
    const validation = this.validateCourse(course, {
      requiresTitle: true,
      requiresDescription: false,
      minimumModules: 1,
      minimumLessonsPerModule: 1,
      requiresLessonContent: false,
    });

    return validation.canProceed;
  }

  /**
   * Gets validation summary for debugging
   */
  static getValidationSummary(validationResult: CourseValidationResult): string {
    const summary = [
      `Status: ${validationResult.contentStatus}`,
      `Valid: ${validationResult.isValid}`,
      `Can Proceed: ${validationResult.canProceed}`,
      `Modules: ${validationResult.hasModules}`,
      `Lessons: ${validationResult.hasLessons}`,
      `Errors: ${validationResult.errors.length}`,
      `Warnings: ${validationResult.warnings.length}`,
    ];

    if (validationResult.missingData.length > 0) {
      summary.push(`Missing: ${validationResult.missingData.join(', ')}`);
    }

    return summary.join(' | ');
  }

  /**
   * Instance method for validateCourseData (for compatibility)
   */
  validateCourseData(course: Course | null | undefined): Promise<CourseValidationResult> {
    return Promise.resolve(CourseContentValidator.validateCourse(course));
  }
}

// Export singleton instance for compatibility
export const courseContentValidator = new CourseContentValidator();