/**
 * Runtime Validation System
 * Provides comprehensive validation for critical data structures
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ValidationRule<T> {
  field: keyof T;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

/**
 * Generic data validator
 */
export class DataValidator {
  /**
   * Validate data against a set of rules
   */
  static validate<T>(data: any, rules: ValidationRule<T>[]): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data || typeof data !== 'object') {
      return {
        isValid: false,
        errors: ['Data must be an object'],
        warnings: []
      };
    }

    for (const rule of rules) {
      const fieldName = String(rule.field);
      const value = data[rule.field];

      // Check required fields
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push(`${fieldName} is required`);
        continue;
      }

      // Skip validation if field is not required and empty
      if (!rule.required && (value === undefined || value === null || value === '')) {
        continue;
      }

      // Type validation
      if (rule.type && !this.validateType(value, rule.type)) {
        errors.push(`${fieldName} must be of type ${rule.type}`);
        continue;
      }

      // String validations
      if (rule.type === 'string' && typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          errors.push(`${fieldName} must be at least ${rule.minLength} characters long`);
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          errors.push(`${fieldName} must be no more than ${rule.maxLength} characters long`);
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errors.push(`${fieldName} format is invalid`);
        }
      }

      // Number validations
      if (rule.type === 'number' && typeof value === 'number') {
        if (rule.min !== undefined && value < rule.min) {
          errors.push(`${fieldName} must be at least ${rule.min}`);
        }
        if (rule.max !== undefined && value > rule.max) {
          errors.push(`${fieldName} must be no more than ${rule.max}`);
        }
      }

      // Custom validation
      if (rule.custom) {
        const customError = rule.custom(value);
        if (customError) {
          errors.push(`${fieldName}: ${customError}`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate type of value
   */
  private static validateType(value: any, expectedType: string): boolean {
    switch (expectedType) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number' && !isNaN(value);
      case 'boolean':
        return typeof value === 'boolean';
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      case 'array':
        return Array.isArray(value);
      default:
        return true;
    }
  }

  /**
   * Sanitize string input
   */
  static sanitizeString(input: string): string {
    if (typeof input !== 'string') return '';
    return input.trim().replace(/[<>]/g, '');
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate UUID format
   */
  static isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Validate currency code
   */
  static isValidCurrency(currency: string): boolean {
    const validCurrencies = ['ZAR', 'USD', 'EUR', 'GBP'];
    return validCurrencies.includes(currency.toUpperCase());
  }

  /**
   * Validate course level
   */
  static isValidCourseLevel(level: string): boolean {
    const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
    return validLevels.includes(level);
  }
}

/**
 * Course-specific validation rules
 */
export const courseValidationRules: ValidationRule<any>[] = [
  { field: 'id', required: true, type: 'string', minLength: 1 },
  { field: 'title', required: true, type: 'string', minLength: 3, maxLength: 200 },
  { field: 'description', required: true, type: 'string', minLength: 10, maxLength: 1000 },
  { field: 'category', required: true, type: 'string', minLength: 1 },
  { field: 'level', required: true, type: 'string', custom: (value) => 
    DataValidator.isValidCourseLevel(value) ? null : 'must be Beginner, Intermediate, or Advanced'
  },
  { field: 'duration', required: true, type: 'string', minLength: 1 },
  { field: 'price', required: true, type: 'number', min: 0 },
  { field: 'currency', required: true, type: 'string', custom: (value) =>
    DataValidator.isValidCurrency(value) ? null : 'must be a valid currency code'
  },
  { field: 'instructor', required: true, type: 'string', minLength: 1 },
  { field: 'rating', required: true, type: 'number', min: 0, max: 5 },
  { field: 'students', required: true, type: 'number', min: 0 },
  { field: 'image', required: false, type: 'string' },
  { field: 'available', required: true, type: 'boolean' }
];

/**
 * Enrollment-specific validation rules
 */
export const enrollmentValidationRules: ValidationRule<any>[] = [
  { field: 'id', required: true, type: 'string', minLength: 1 },
  { field: 'user_id', required: true, type: 'string', minLength: 1 },
  { field: 'course_id', required: true, type: 'string', minLength: 1 },
  { field: 'status', required: true, type: 'string', custom: (value) => {
    const validStatuses = ['pending', 'approved', 'rejected', 'active', 'completed'];
    return validStatuses.includes(value.toLowerCase()) ? null : 'must be a valid enrollment status';
  }},
  { field: 'enrolled_at', required: true, type: 'string' },
  { field: 'payment_status', required: false, type: 'string' },
  { field: 'payment_amount', required: false, type: 'number', min: 0 }
];

/**
 * User profile validation rules
 */
export const userProfileValidationRules: ValidationRule<any>[] = [
  { field: 'id', required: true, type: 'string', minLength: 1 },
  { field: 'email', required: true, type: 'string', custom: (value) =>
    DataValidator.isValidEmail(value) ? null : 'must be a valid email address'
  },
  { field: 'first_name', required: true, type: 'string', minLength: 1, maxLength: 50 },
  { field: 'last_name', required: true, type: 'string', minLength: 1, maxLength: 50 },
  { field: 'role', required: true, type: 'string', custom: (value) => {
    const validRoles = ['student', 'instructor', 'admin'];
    return validRoles.includes(value.toLowerCase()) ? null : 'must be student, instructor, or admin';
  }},
  { field: 'phone', required: false, type: 'string', pattern: /^\+?[\d\s\-\(\)]+$/ },
  { field: 'created_at', required: true, type: 'string' },
  { field: 'updated_at', required: true, type: 'string' }
];

/**
 * Payment data validation rules
 */
export const paymentValidationRules: ValidationRule<any>[] = [
  { field: 'amount', required: true, type: 'number', min: 0.01 },
  { field: 'currency', required: true, type: 'string', custom: (value) =>
    DataValidator.isValidCurrency(value) ? null : 'must be a valid currency code'
  },
  { field: 'reference', required: true, type: 'string', minLength: 1 },
  { field: 'user_id', required: true, type: 'string', minLength: 1 },
  { field: 'course_id', required: true, type: 'string', minLength: 1 },
  { field: 'payment_method', required: false, type: 'string' },
  { field: 'status', required: true, type: 'string', custom: (value) => {
    const validStatuses = ['pending', 'processing', 'completed', 'failed', 'cancelled'];
    return validStatuses.includes(value.toLowerCase()) ? null : 'must be a valid payment status';
  }}
];