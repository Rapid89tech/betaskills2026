/**
 * Type Safety Utilities
 * Provides runtime type checking and validation for TypeScript strict mode compliance
 */

import { UnifiedCourse } from '@/types/unifiedCourse';
import { Enrollment, EnrollmentStatus, PaymentStatus } from '@/types/enrollment';
import { Course, SimplifiedCourse } from '@/types/course';

/**
 * Type guard utilities for runtime type checking
 */
export class TypeGuards {
  /**
   * Check if value is a string
   */
  static isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  /**
   * Check if value is a non-empty string
   */
  static isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
  }

  /**
   * Check if value is a number
   */
  static isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
  }

  /**
   * Check if value is a positive number
   */
  static isPositiveNumber(value: unknown): value is number {
    return this.isNumber(value) && value > 0;
  }

  /**
   * Check if value is a boolean
   */
  static isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
  }

  /**
   * Check if value is an object (not null, not array)
   */
  static isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  /**
   * Check if value is an array
   */
  static isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  /**
   * Check if value is a valid date string or Date object
   */
  static isValidDate(value: unknown): value is string | Date {
    if (value instanceof Date) {
      return !isNaN(value.getTime());
    }
    if (typeof value === 'string') {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }
    return false;
  }

  /**
   * Check if value is a valid enrollment status
   */
  static isEnrollmentStatus(value: unknown): value is EnrollmentStatus {
    return typeof value === 'string' && 
           Object.values(EnrollmentStatus).includes(value as EnrollmentStatus);
  }

  /**
   * Check if value is a valid payment status
   */
  static isPaymentStatus(value: unknown): value is PaymentStatus {
    return typeof value === 'string' && 
           Object.values(PaymentStatus).includes(value as PaymentStatus);
  }

  /**
   * Check if object has required properties
   */
  static hasRequiredProperties<T extends Record<string, unknown>>(
    obj: unknown, 
    requiredProps: (keyof T)[]
  ): obj is T {
    if (!this.isObject(obj)) return false;
    
    return requiredProps.every(prop => 
      Object.prototype.hasOwnProperty.call(obj, prop) && 
      obj[prop] !== undefined && 
      obj[prop] !== null
    );
  }

  /**
   * Type guard for UnifiedCourse
   */
  static isUnifiedCourse(value: unknown): value is UnifiedCourse {
    if (!this.isObject(value)) return false;

    const requiredProps: (keyof UnifiedCourse)[] = [
      'id', 'title', 'description', 'category', 'level', 
      'duration', 'price', 'currency', 'instructor', 
      'rating', 'students', 'image', 'available', 'courseId'
    ];

    return this.hasRequiredProperties<UnifiedCourse>(value, requiredProps) &&
           this.isNonEmptyString(value.id) &&
           this.isNonEmptyString(value.title) &&
           this.isString(value.description) &&
           this.isNonEmptyString(value.category) &&
           this.isNonEmptyString(value.level) &&
           this.isNonEmptyString(value.duration) &&
           this.isNumber(value.price) &&
           this.isNonEmptyString(value.currency) &&
           this.isNonEmptyString(value.instructor) &&
           this.isNumber(value.rating) &&
           this.isNumber(value.students) &&
           this.isString(value.image) &&
           this.isBoolean(value.available) &&
           this.isNonEmptyString(value.courseId);
  }

  /**
   * Type guard for Course
   */
  static isCourse(value: unknown): value is Course {
    if (!this.isObject(value)) return false;

    const requiredProps: (keyof Course)[] = [
      'id', 'title', 'description', 'category', 'level', 
      'duration', 'is_free', 'price', 'currency', 'students', 
      'rating', 'instructor', 'status', 'created_at', 'updated_at', 'available'
    ];

    return this.hasRequiredProperties<Course>(value, requiredProps) &&
           this.isNonEmptyString(value.id) &&
           this.isNonEmptyString(value.title) &&
           this.isObject(value.instructor) &&
           this.hasRequiredProperties(value.instructor, ['id', 'first_name', 'last_name', 'email']);
  }

  /**
   * Type guard for Enrollment
   */
  static isEnrollment(value: unknown): value is Enrollment {
    if (!this.isObject(value)) return false;

    const requiredProps: (keyof Enrollment)[] = [
      'id', 'userId', 'courseId', 'status', 'paymentStatus', 'createdAt', 'updatedAt'
    ];

    return this.hasRequiredProperties<Enrollment>(value, requiredProps) &&
           this.isNonEmptyString(value.id) &&
           this.isNonEmptyString(value.userId) &&
           this.isNonEmptyString(value.courseId) &&
           this.isEnrollmentStatus(value.status) &&
           this.isPaymentStatus(value.paymentStatus);
  }
}

/**
 * Safe property access utilities
 */
export class SafeAccess {
  /**
   * Safely get a property from an object with type checking
   */
  static getProperty<T, K extends keyof T>(
    obj: T | null | undefined, 
    key: K
  ): T[K] | undefined {
    if (obj === null || obj === undefined) return undefined;
    return obj[key];
  }

  /**
   * Safely get a nested property with type checking
   */
  static getNestedProperty<T>(
    obj: unknown, 
    path: string[], 
    defaultValue?: T
  ): T | undefined {
    let current: any = obj;
    
    for (const key of path) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current !== undefined ? current : defaultValue;
  }

  /**
   * Safely convert value to string
   */
  static toString(value: unknown, defaultValue = ''): string {
    if (value === null || value === undefined) return defaultValue;
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    return defaultValue;
  }

  /**
   * Safely convert value to number
   */
  static toNumber(value: unknown, defaultValue = 0): number {
    if (typeof value === 'number' && !isNaN(value)) return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? defaultValue : parsed;
    }
    return defaultValue;
  }

  /**
   * Safely convert value to boolean
   */
  static toBoolean(value: unknown, defaultValue = false): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const lower = value.toLowerCase();
      if (lower === 'true' || lower === '1' || lower === 'yes') return true;
      if (lower === 'false' || lower === '0' || lower === 'no') return false;
    }
    if (typeof value === 'number') return value !== 0;
    return defaultValue;
  }

  /**
   * Safely get array from value
   */
  static toArray<T>(value: unknown, defaultValue: T[] = []): T[] {
    if (Array.isArray(value)) return value;
    if (value !== null && value !== undefined) return [value as T];
    return defaultValue;
  }
}

/**
 * Runtime type assertion utilities
 */
export class TypeAssertions {
  /**
   * Assert that value is a string, throw error if not
   */
  static assertString(value: unknown, fieldName = 'value'): asserts value is string {
    if (!TypeGuards.isString(value)) {
      throw new TypeError(`${fieldName} must be a string, got ${typeof value}`);
    }
  }

  /**
   * Assert that value is a non-empty string
   */
  static assertNonEmptyString(value: unknown, fieldName = 'value'): asserts value is string {
    if (!TypeGuards.isNonEmptyString(value)) {
      throw new TypeError(`${fieldName} must be a non-empty string`);
    }
  }

  /**
   * Assert that value is a number
   */
  static assertNumber(value: unknown, fieldName = 'value'): asserts value is number {
    if (!TypeGuards.isNumber(value)) {
      throw new TypeError(`${fieldName} must be a number, got ${typeof value}`);
    }
  }

  /**
   * Assert that value is a positive number
   */
  static assertPositiveNumber(value: unknown, fieldName = 'value'): asserts value is number {
    if (!TypeGuards.isPositiveNumber(value)) {
      throw new TypeError(`${fieldName} must be a positive number`);
    }
  }

  /**
   * Assert that value is a boolean
   */
  static assertBoolean(value: unknown, fieldName = 'value'): asserts value is boolean {
    if (!TypeGuards.isBoolean(value)) {
      throw new TypeError(`${fieldName} must be a boolean, got ${typeof value}`);
    }
  }

  /**
   * Assert that value is an object
   */
  static assertObject(value: unknown, fieldName = 'value'): asserts value is Record<string, unknown> {
    if (!TypeGuards.isObject(value)) {
      throw new TypeError(`${fieldName} must be an object`);
    }
  }

  /**
   * Assert that value is an array
   */
  static assertArray(value: unknown, fieldName = 'value'): asserts value is unknown[] {
    if (!TypeGuards.isArray(value)) {
      throw new TypeError(`${fieldName} must be an array`);
    }
  }

  /**
   * Assert that value is a UnifiedCourse
   */
  static assertUnifiedCourse(value: unknown, fieldName = 'course'): asserts value is UnifiedCourse {
    if (!TypeGuards.isUnifiedCourse(value)) {
      throw new TypeError(`${fieldName} must be a valid UnifiedCourse object`);
    }
  }

  /**
   * Assert that value is an Enrollment
   */
  static assertEnrollment(value: unknown, fieldName = 'enrollment'): asserts value is Enrollment {
    if (!TypeGuards.isEnrollment(value)) {
      throw new TypeError(`${fieldName} must be a valid Enrollment object`);
    }
  }
}

/**
 * Type-safe data processing utilities
 */
export class TypeSafeProcessor {
  /**
   * Process array with type checking
   */
  static processArray<T, R>(
    data: unknown,
    processor: (item: T) => R,
    typeGuard: (item: unknown) => item is T,
    fieldName = 'data'
  ): R[] {
    TypeAssertions.assertArray(data, fieldName);
    
    const results: R[] = [];
    
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (typeGuard(item)) {
        results.push(processor(item));
      } else {
        console.warn(`Invalid item at index ${i} in ${fieldName}, skipping`);
      }
    }
    
    return results;
  }

  /**
   * Process object with type checking
   */
  static processObject<T, R>(
    data: unknown,
    processor: (item: T) => R,
    typeGuard: (item: unknown) => item is T,
    fieldName = 'data'
  ): R | null {
    if (!typeGuard(data)) {
      console.warn(`Invalid ${fieldName} object, returning null`);
      return null;
    }
    
    return processor(data);
  }

  /**
   * Safely map over array with error handling
   */
  static safeMap<T, R>(
    array: T[],
    mapper: (item: T, index: number) => R,
    errorHandler?: (error: Error, item: T, index: number) => R | null
  ): R[] {
    const results: R[] = [];
    
    for (let i = 0; i < array.length; i++) {
      try {
        const result = mapper(array[i], i);
        results.push(result);
      } catch (error) {
        if (errorHandler) {
          const handledResult = errorHandler(error as Error, array[i], i);
          if (handledResult !== null) {
            results.push(handledResult);
          }
        } else {
          console.error(`Error processing item at index ${i}:`, error);
        }
      }
    }
    
    return results;
  }

  /**
   * Filter array with type predicate
   */
  static typedFilter<T, U extends T>(
    array: T[],
    predicate: (item: T) => item is U
  ): U[] {
    return array.filter(predicate);
  }
}

/**
 * Validation decorator for class methods
 */
export function validateInput<T extends any[]>(
  validators: Array<(arg: any) => boolean>
) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: T) {
      for (let i = 0; i < validators.length && i < args.length; i++) {
        if (!validators[i](args[i])) {
          throw new TypeError(`Invalid argument ${i + 1} for method ${propertyKey}`);
        }
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

/**
 * Type-safe environment variable access
 */
export class EnvSafeAccess {
  /**
   * Get environment variable as string with validation
   */
  static getString(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    return value;
  }

  /**
   * Get environment variable as number with validation
   */
  static getNumber(key: string, defaultValue?: number): number {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      throw new Error(`Environment variable ${key} must be a valid number, got: ${value}`);
    }
    return parsed;
  }

  /**
   * Get environment variable as boolean with validation
   */
  static getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    return SafeAccess.toBoolean(value, false);
  }
}