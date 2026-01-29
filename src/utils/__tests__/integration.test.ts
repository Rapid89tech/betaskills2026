/**
 * Integration tests for data validation and type safety
 */

import { describe, it, expect } from 'vitest';
import { DataValidator, courseValidationRules } from '../validation';
import { TypeGuards, SafeAccess, TypeSafeProcessor } from '../typeSafety';

describe('Data Validation and Type Safety Integration', () => {
  it('should validate and transform course data safely', () => {
    // Mock API response with mixed data quality
    const apiResponse = {
      id: 'course-123',
      title: 'Test Course',
      description: 'A comprehensive test course',
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
      extra_field: 'should be ignored'
    };

    // Step 1: Type-safe property access
    const courseId = SafeAccess.getProperty(apiResponse, 'id');
    const courseTitle = SafeAccess.getProperty(apiResponse, 'title');
    const coursePrice = SafeAccess.toNumber(apiResponse.price);

    expect(courseId).toBe('course-123');
    expect(courseTitle).toBe('Test Course');
    expect(coursePrice).toBe(99.99);

    // Step 2: Runtime validation
    const validation = DataValidator.validate(apiResponse, courseValidationRules);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);

    // Step 3: Type guard validation
    const isValidCourseStructure = TypeGuards.hasRequiredProperties(apiResponse, [
      'id', 'title', 'description', 'category', 'level', 'duration', 
      'price', 'currency', 'instructor', 'rating', 'students', 'available'
    ]);
    expect(isValidCourseStructure).toBe(true);
  });

  it('should handle invalid data gracefully', () => {
    const invalidApiResponse = {
      id: '', // Invalid empty ID
      title: 'Te', // Too short
      price: -10, // Invalid negative price
      rating: 6, // Invalid rating > 5
      level: 'Expert' // Invalid level
    };

    // Validation should catch all errors
    const validation = DataValidator.validate(invalidApiResponse, courseValidationRules);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);

    // Type-safe access should handle invalid values
    const safePrice = SafeAccess.toNumber(invalidApiResponse.price, 0);
    const safeTitle = SafeAccess.toString(invalidApiResponse.title, 'Default Title');

    expect(safePrice).toBe(-10); // Should return actual number even if negative
    expect(safeTitle).toBe('Te'); // Should return actual value even if invalid
  });

  it('should process arrays of data safely', () => {
    const courseArray = [
      {
        id: 'course-1',
        title: 'Valid Course 1',
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
      {
        id: '', // Invalid course
        title: 'Invalid Course'
      },
      {
        id: 'course-3',
        title: 'Valid Course 3',
        description: 'Another valid course',
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

    // Process array with type checking
    const validCourses = TypeSafeProcessor.processArray(
      courseArray,
      (course) => course.title,
      (item): item is any => {
        const validation = DataValidator.validate(item, courseValidationRules);
        return validation.isValid;
      }
    );

    // Should only include valid courses
    expect(validCourses).toHaveLength(2);
    expect(validCourses).toContain('Valid Course 1');
    expect(validCourses).toContain('Valid Course 3');
    expect(validCourses).not.toContain('Invalid Course');
  });

  it('should handle nested data structures safely', () => {
    const nestedApiResponse = {
      data: {
        courses: [
          {
            id: 'course-1',
            title: 'Nested Course',
            instructor: {
              first_name: 'John',
              last_name: 'Doe',
              profile: {
                bio: 'Experienced instructor'
              }
            }
          }
        ]
      }
    };

    // Safe nested property access
    const coursesArray = SafeAccess.getNestedProperty(nestedApiResponse, ['data', 'courses'], []);
    const firstCourseTitle = SafeAccess.getNestedProperty(nestedApiResponse, ['data', 'courses', '0', 'title']);
    const instructorBio = SafeAccess.getNestedProperty(nestedApiResponse, ['data', 'courses', '0', 'instructor', 'profile', 'bio']);
    const nonExistentField = SafeAccess.getNestedProperty(nestedApiResponse, ['data', 'courses', '0', 'nonexistent'], 'default');

    expect(Array.isArray(coursesArray)).toBe(true);
    expect(firstCourseTitle).toBe('Nested Course');
    expect(instructorBio).toBe('Experienced instructor');
    expect(nonExistentField).toBe('default');
  });

  it('should provide comprehensive error information', () => {
    const problematicData = {
      id: null,
      title: '',
      description: 'Short',
      category: undefined,
      level: 'InvalidLevel',
      duration: null,
      price: 'not-a-number',
      currency: 'INVALID',
      instructor: {},
      rating: 'five',
      students: -10,
      image: null,
      available: 'maybe'
    };

    const validation = DataValidator.validate(problematicData, courseValidationRules);

    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(5);
    
    // Check that specific validation errors are caught
    const errorMessages = validation.errors.join(' ');
    expect(errorMessages).toContain('required');
    expect(errorMessages).toContain('type');
    expect(errorMessages).toContain('characters long');
  });
});