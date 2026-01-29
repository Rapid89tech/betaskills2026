/**
 * Example demonstrating the enhanced course content validation
 * used in the Course page component
 */

import { CourseContentValidator } from '@/services/CourseContentValidator';
import type { Course } from '@/types/course';

// Example course with complete content
const completeValidCourse: Course = {
  id: 'plumbing101',
  title: 'Plumbing Fundamentals',
  description: 'Learn the basics of plumbing installation and repair',
  category: 'Trade Skills',
  level: 'beginner',
  duration: '6 weeks',
  is_free: false,
  price: 290,
  currency: 'ZAR',
  students: 150,
  rating: 4.8,
  instructor: {
    id: 'instructor1',
    first_name: 'John',
    last_name: 'Smith',
    email: 'john@example.com'
  },
  status: 'approved',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  available: true,
  isComingSoon: false,
  overview: 'Comprehensive plumbing course',
  thumbnail: 'plumbing-thumb.jpg',
  modules: [
    {
      id: 1,
      title: 'Introduction to Plumbing',
      description: 'Basic concepts and tools',
      lessons: [
        {
          id: 1,
          title: 'Plumbing Industry Overview',
          duration: '15 minutes',
          type: 'video',
          content: {
            videoUrl: 'https://example.com/video1.mp4',
            textContent: 'Introduction to the plumbing industry...'
          }
        },
        {
          id: 2,
          title: 'Essential Tools',
          duration: '20 minutes',
          type: 'video',
          content: {
            videoUrl: 'https://example.com/video2.mp4',
            textContent: 'Learn about essential plumbing tools...'
          }
        }
      ]
    },
    {
      id: 2,
      title: 'Basic Techniques',
      description: 'Fundamental plumbing techniques',
      lessons: [
        {
          id: 3,
          title: 'Pipe Installation',
          duration: '25 minutes',
          type: 'video',
          content: {
            videoUrl: 'https://example.com/video3.mp4',
            textContent: 'Step-by-step pipe installation...'
          }
        }
      ]
    }
  ]
};

// Example course with missing content
const incompleteValidCourse: Course = {
  ...completeValidCourse,
  id: 'incomplete-course',
  title: 'Course in Development',
  description: '', // Missing description
  modules: [
    {
      id: 1,
      title: 'Module 1',
      description: 'First module',
      lessons: [
        {
          id: 1,
          title: 'Lesson 1',
          duration: '10 minutes',
          type: 'video',
          content: null // Missing content
        }
      ]
    }
  ]
};

// Example course with structural issues
const invalidCourse: Course = {
  ...completeValidCourse,
  id: '', // Missing ID - critical error
  title: '', // Missing title - critical error
  modules: [] // No modules - critical error
};

/**
 * Demonstrates enhanced course validation functionality
 */
export function demonstrateCourseValidation() {
  console.log('🔍 Course Validation Examples\n');

  // Test complete valid course
  console.log('1. Testing Complete Valid Course:');
  const completeValidation = CourseContentValidator.validateCourse(completeValidCourse);
  console.log('   Result:', {
    isValid: completeValidation.isValid,
    canProceed: completeValidation.canProceed,
    contentStatus: completeValidation.contentStatus,
    hasModules: completeValidation.hasModules,
    hasLessons: completeValidation.hasLessons,
    errors: completeValidation.errors.length,
    warnings: completeValidation.warnings.length
  });
  console.log('   User Message:', CourseContentValidator.createUserFriendlyMessage(completeValidation));
  console.log('   Summary:', CourseContentValidator.getValidationSummary(completeValidation));
  console.log('');

  // Test incomplete course
  console.log('2. Testing Incomplete Course:');
  const incompleteValidation = CourseContentValidator.validateCourse(incompleteValidCourse);
  console.log('   Result:', {
    isValid: incompleteValidation.isValid,
    canProceed: incompleteValidation.canProceed,
    contentStatus: incompleteValidation.contentStatus,
    hasModules: incompleteValidation.hasModules,
    hasLessons: incompleteValidation.hasLessons,
    errors: incompleteValidation.errors.length,
    warnings: incompleteValidation.warnings.length
  });
  console.log('   User Message:', CourseContentValidator.createUserFriendlyMessage(incompleteValidation));
  console.log('   Missing Data:', incompleteValidation.missingData);
  console.log('');

  // Test invalid course
  console.log('3. Testing Invalid Course:');
  const invalidValidation = CourseContentValidator.validateCourse(invalidCourse);
  console.log('   Result:', {
    isValid: invalidValidation.isValid,
    canProceed: invalidValidation.canProceed,
    contentStatus: invalidValidation.contentStatus,
    hasModules: invalidValidation.hasModules,
    hasLessons: invalidValidation.hasLessons,
    errors: invalidValidation.errors.length,
    warnings: invalidValidation.warnings.length
  });
  console.log('   User Message:', CourseContentValidator.createUserFriendlyMessage(invalidValidation));
  console.log('   Critical Errors:', invalidValidation.errors.filter(e => e.severity === 'critical').map(e => e.message));
  console.log('');

  // Test null course
  console.log('4. Testing Null Course:');
  const nullValidation = CourseContentValidator.validateCourse(null);
  console.log('   Result:', {
    isValid: nullValidation.isValid,
    canProceed: nullValidation.canProceed,
    contentStatus: nullValidation.contentStatus,
    errors: nullValidation.errors.length
  });
  console.log('   User Message:', CourseContentValidator.createUserFriendlyMessage(nullValidation));
  console.log('');

  // Test minimum requirements check
  console.log('5. Testing Minimum Requirements:');
  console.log('   Complete Course has minimum data:', CourseContentValidator.hasMinimumRequiredData(completeValidCourse));
  console.log('   Incomplete Course has minimum data:', CourseContentValidator.hasMinimumRequiredData(incompleteValidCourse));
  console.log('   Invalid Course has minimum data:', CourseContentValidator.hasMinimumRequiredData(invalidCourse));
  console.log('   Null Course has minimum data:', CourseContentValidator.hasMinimumRequiredData(null));
}

/**
 * Example of how the Course page uses validation results
 */
export function simulateCoursePageValidation(course: Course | null) {
  console.log('🎯 Simulating Course Page Validation Process\n');

  if (!course) {
    console.log('❌ Course is null - showing course not found page');
    return { showCourseNotFound: true };
  }

  // Enhanced validation with custom requirements
  const validation = CourseContentValidator.validateCourse(course, {
    requiresTitle: true,
    requiresDescription: false, // Description is optional
    minimumModules: 1,
    minimumLessonsPerModule: 1,
    requiresLessonContent: false // Content can be added progressively
  });

  console.log('📊 Validation Results:', {
    courseId: course.id,
    courseTitle: course.title,
    isValid: validation.isValid,
    canProceed: validation.canProceed,
    contentStatus: validation.contentStatus,
    summary: CourseContentValidator.getValidationSummary(validation)
  });

  // Determine what to show based on validation
  if (!validation.canProceed) {
    const userMessage = CourseContentValidator.createUserFriendlyMessage(validation);
    const criticalErrors = validation.errors.filter(e => e.severity === 'critical');
    const hasStructuralIssues = criticalErrors.length > 0;

    console.log('⏳ Course content not ready - showing preparation page');
    console.log('   User Message:', userMessage);
    console.log('   Has Structural Issues:', hasStructuralIssues);
    console.log('   Content Status:', validation.contentStatus);

    return {
      showPreparationPage: true,
      userMessage,
      hasStructuralIssues,
      contentStatus: validation.contentStatus,
      validation
    };
  }

  console.log('✅ Course content ready - can show course player');
  return {
    showCoursePlayer: true,
    validation
  };
}

// Export example courses for testing
export {
  completeValidCourse,
  incompleteValidCourse,
  invalidCourse
};