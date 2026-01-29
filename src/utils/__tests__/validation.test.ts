/**
 * Tests for validation utilities
 */

import { describe, it, expect } from 'vitest';
import { 
  DataValidator, 
  ValidationRule, 
  courseValidationRules, 
  enrollmentValidationRules,
  userProfileValidationRules 
} from '../validation';

describe('DataValidator', () => {
  describe('validate', () => {
    it('should validate required fields', () => {
      const rules: ValidationRule<any>[] = [
        { field: 'name', required: true, type: 'string' },
        { field: 'age', required: true, type: 'number' }
      ];

      const validData = { name: 'John', age: 30 };
      const result = DataValidator.validate(validData, rules);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', () => {
      const rules: ValidationRule<any>[] = [
        { field: 'name', required: true, type: 'string' },
        { field: 'age', required: true, type: 'number' }
      ];

      const invalidData = { name: 'John' }; // missing age
      const result = DataValidator.validate(invalidData, rules);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('age is required');
    });

    it('should validate string length constraints', () => {
      const rules: ValidationRule<any>[] = [
        { field: 'name', required: true, type: 'string', minLength: 3, maxLength: 10 }
      ];

      const shortName = { name: 'Jo' };
      const longName = { name: 'VeryLongNameThatExceedsLimit' };
      const validName = { name: 'John' };

      expect(DataValidator.validate(shortName, rules).isValid).toBe(false);
      expect(DataValidator.validate(longName, rules).isValid).toBe(false);
      expect(DataValidator.validate(validName, rules).isValid).toBe(true);
    });

    it('should validate number range constraints', () => {
      const rules: ValidationRule<any>[] = [
        { field: 'score', required: true, type: 'number', min: 0, max: 100 }
      ];

      const negativeScore = { score: -10 };
      const highScore = { score: 150 };
      const validScore = { score: 85 };

      expect(DataValidator.validate(negativeScore, rules).isValid).toBe(false);
      expect(DataValidator.validate(highScore, rules).isValid).toBe(false);
      expect(DataValidator.validate(validScore, rules).isValid).toBe(true);
    });

    it('should validate pattern matching', () => {
      const rules: ValidationRule<any>[] = [
        { field: 'email', required: true, type: 'string', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
      ];

      const invalidEmail = { email: 'invalid-email' };
      const validEmail = { email: 'test@example.com' };

      expect(DataValidator.validate(invalidEmail, rules).isValid).toBe(false);
      expect(DataValidator.validate(validEmail, rules).isValid).toBe(true);
    });

    it('should validate custom validation functions', () => {
      const rules: ValidationRule<any>[] = [
        { 
          field: 'level', 
          required: true, 
          type: 'string', 
          custom: (value) => ['Beginner', 'Intermediate', 'Advanced'].includes(value) ? null : 'Invalid level'
        }
      ];

      const invalidLevel = { level: 'Expert' };
      const validLevel = { level: 'Beginner' };

      expect(DataValidator.validate(invalidLevel, rules).isValid).toBe(false);
      expect(DataValidator.validate(validLevel, rules).isValid).toBe(true);
    });

    it('should handle non-object input', () => {
      const rules: ValidationRule<any>[] = [
        { field: 'name', required: true, type: 'string' }
      ];

      const result = DataValidator.validate(null, rules);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Data must be an object');
    });
  });

  describe('utility methods', () => {
    it('should sanitize strings correctly', () => {
      expect(DataValidator.sanitizeString('  hello world  ')).toBe('hello world');
      expect(DataValidator.sanitizeString('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
      expect(DataValidator.sanitizeString(123 as any)).toBe('');
    });

    it('should validate email format', () => {
      expect(DataValidator.isValidEmail('test@example.com')).toBe(true);
      expect(DataValidator.isValidEmail('invalid-email')).toBe(false);
      expect(DataValidator.isValidEmail('test@')).toBe(false);
      expect(DataValidator.isValidEmail('@example.com')).toBe(false);
    });

    it('should validate UUID format', () => {
      expect(DataValidator.isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(DataValidator.isValidUUID('invalid-uuid')).toBe(false);
      expect(DataValidator.isValidUUID('123e4567-e89b-12d3-a456')).toBe(false);
    });

    it('should validate currency codes', () => {
      expect(DataValidator.isValidCurrency('ZAR')).toBe(true);
      expect(DataValidator.isValidCurrency('USD')).toBe(true);
      expect(DataValidator.isValidCurrency('eur')).toBe(true); // case insensitive
      expect(DataValidator.isValidCurrency('INVALID')).toBe(false);
    });

    it('should validate course levels', () => {
      expect(DataValidator.isValidCourseLevel('Beginner')).toBe(true);
      expect(DataValidator.isValidCourseLevel('Intermediate')).toBe(true);
      expect(DataValidator.isValidCourseLevel('Advanced')).toBe(true);
      expect(DataValidator.isValidCourseLevel('Expert')).toBe(false);
    });
  });
});

describe('Validation Rules', () => {
  describe('courseValidationRules', () => {
    it('should validate a complete course object', () => {
      const validCourse = {
        id: 'course-123',
        title: 'Test Course',
        description: 'A comprehensive test course for validation',
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

      const result = DataValidator.validate(validCourse, courseValidationRules);
      expect(result.isValid).toBe(true);
    });

    it('should fail validation for invalid course data', () => {
      const invalidCourse = {
        id: '', // empty id
        title: 'Te', // too short
        description: 'Short', // too short
        category: '',
        level: 'Expert', // invalid level
        duration: '',
        price: -10, // negative price
        currency: 'INVALID',
        instructor: '',
        rating: 6, // rating too high
        students: -5, // negative students
        available: 'yes' // wrong type
      };

      const result = DataValidator.validate(invalidCourse, courseValidationRules);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('enrollmentValidationRules', () => {
    it('should validate a complete enrollment object', () => {
      const validEnrollment = {
        id: 'enrollment-123',
        user_id: 'user-456',
        course_id: 'course-789',
        status: 'approved',
        enrolled_at: '2023-01-01T00:00:00Z',
        payment_status: 'completed',
        payment_amount: 99.99
      };

      const result = DataValidator.validate(validEnrollment, enrollmentValidationRules);
      expect(result.isValid).toBe(true);
    });

    it('should fail validation for invalid enrollment status', () => {
      const invalidEnrollment = {
        id: 'enrollment-123',
        user_id: 'user-456',
        course_id: 'course-789',
        status: 'invalid-status',
        enrolled_at: '2023-01-01T00:00:00Z'
      };

      const result = DataValidator.validate(invalidEnrollment, enrollmentValidationRules);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('valid enrollment status'))).toBe(true);
    });
  });

  describe('userProfileValidationRules', () => {
    it('should validate a complete user profile', () => {
      const validUser = {
        id: 'user-123',
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'student',
        phone: '+27123456789',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      };

      const result = DataValidator.validate(validUser, userProfileValidationRules);
      expect(result.isValid).toBe(true);
    });

    it('should fail validation for invalid email', () => {
      const invalidUser = {
        id: 'user-123',
        email: 'invalid-email',
        first_name: 'John',
        last_name: 'Doe',
        role: 'student',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      };

      const result = DataValidator.validate(invalidUser, userProfileValidationRules);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('valid email address'))).toBe(true);
    });

    it('should fail validation for invalid role', () => {
      const invalidUser = {
        id: 'user-123',
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'invalid-role',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      };

      const result = DataValidator.validate(invalidUser, userProfileValidationRules);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('student, instructor, or admin'))).toBe(true);
    });
  });
});