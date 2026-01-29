/**
 * Tests for type safety utilities
 */

import { describe, it, expect } from 'vitest';
import { 
  TypeGuards, 
  SafeAccess, 
  TypeAssertions, 
  TypeSafeProcessor,
  EnvSafeAccess
} from '../typeSafety';
import { UnifiedCourse } from '@/types/unifiedCourse';
import { Enrollment, EnrollmentStatus, PaymentStatus } from '@/types/enrollment';

describe('TypeGuards', () => {
  describe('basic type guards', () => {
    it('should identify strings correctly', () => {
      expect(TypeGuards.isString('hello')).toBe(true);
      expect(TypeGuards.isString(123)).toBe(false);
      expect(TypeGuards.isString(null)).toBe(false);
      expect(TypeGuards.isString(undefined)).toBe(false);
    });

    it('should identify non-empty strings correctly', () => {
      expect(TypeGuards.isNonEmptyString('hello')).toBe(true);
      expect(TypeGuards.isNonEmptyString('')).toBe(false);
      expect(TypeGuards.isNonEmptyString('   ')).toBe(false);
      expect(TypeGuards.isNonEmptyString(123)).toBe(false);
    });

    it('should identify numbers correctly', () => {
      expect(TypeGuards.isNumber(123)).toBe(true);
      expect(TypeGuards.isNumber(0)).toBe(true);
      expect(TypeGuards.isNumber(-123)).toBe(true);
      expect(TypeGuards.isNumber(NaN)).toBe(false);
      expect(TypeGuards.isNumber('123')).toBe(false);
    });

    it('should identify positive numbers correctly', () => {
      expect(TypeGuards.isPositiveNumber(123)).toBe(true);
      expect(TypeGuards.isPositiveNumber(0.1)).toBe(true);
      expect(TypeGuards.isPositiveNumber(0)).toBe(false);
      expect(TypeGuards.isPositiveNumber(-123)).toBe(false);
    });

    it('should identify booleans correctly', () => {
      expect(TypeGuards.isBoolean(true)).toBe(true);
      expect(TypeGuards.isBoolean(false)).toBe(true);
      expect(TypeGuards.isBoolean('true')).toBe(false);
      expect(TypeGuards.isBoolean(1)).toBe(false);
    });

    it('should identify objects correctly', () => {
      expect(TypeGuards.isObject({})).toBe(true);
      expect(TypeGuards.isObject({ key: 'value' })).toBe(true);
      expect(TypeGuards.isObject([])).toBe(false);
      expect(TypeGuards.isObject(null)).toBe(false);
      expect(TypeGuards.isObject('object')).toBe(false);
    });

    it('should identify arrays correctly', () => {
      expect(TypeGuards.isArray([])).toBe(true);
      expect(TypeGuards.isArray([1, 2, 3])).toBe(true);
      expect(TypeGuards.isArray({})).toBe(false);
      expect(TypeGuards.isArray('array')).toBe(false);
    });
  });

  describe('date validation', () => {
    it('should validate dates correctly', () => {
      expect(TypeGuards.isValidDate(new Date())).toBe(true);
      expect(TypeGuards.isValidDate('2023-01-01')).toBe(true);
      expect(TypeGuards.isValidDate('2023-01-01T00:00:00Z')).toBe(true);
      expect(TypeGuards.isValidDate('invalid-date')).toBe(false);
      expect(TypeGuards.isValidDate(123)).toBe(false);
    });
  });

  describe('enum validation', () => {
    it('should validate enrollment status', () => {
      expect(TypeGuards.isEnrollmentStatus('PENDING')).toBe(true);
      expect(TypeGuards.isEnrollmentStatus('APPROVED')).toBe(true);
      expect(TypeGuards.isEnrollmentStatus('INVALID')).toBe(false);
      expect(TypeGuards.isEnrollmentStatus(123)).toBe(false);
    });

    it('should validate payment status', () => {
      expect(TypeGuards.isPaymentStatus('PENDING')).toBe(true);
      expect(TypeGuards.isPaymentStatus('COMPLETED')).toBe(true);
      expect(TypeGuards.isPaymentStatus('INVALID')).toBe(false);
      expect(TypeGuards.isPaymentStatus(123)).toBe(false);
    });
  });

  describe('complex type guards', () => {
    it('should validate UnifiedCourse objects', () => {
      const validCourse: UnifiedCourse = {
        id: 'course-123',
        title: 'Test Course',
        description: 'A test course',
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
        courseId: 'course-123'
      };

      expect(TypeGuards.isUnifiedCourse(validCourse)).toBe(true);

      const invalidCourse = {
        id: '', // empty id
        title: 'Test Course'
        // missing required fields
      };

      expect(TypeGuards.isUnifiedCourse(invalidCourse)).toBe(false);
    });

    it('should validate Enrollment objects', () => {
      const validEnrollment: Enrollment = {
        id: 'enrollment-123',
        userId: 'user-456',
        courseId: 'course-789',
        paymentType: 'EFT' as any,
        status: EnrollmentStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(TypeGuards.isEnrollment(validEnrollment)).toBe(true);

      const invalidEnrollment = {
        id: 'enrollment-123'
        // missing required fields
      };

      expect(TypeGuards.isEnrollment(invalidEnrollment)).toBe(false);
    });
  });
});

describe('SafeAccess', () => {
  describe('property access', () => {
    it('should safely get properties', () => {
      const obj = { name: 'John', age: 30 };
      
      expect(SafeAccess.getProperty(obj, 'name')).toBe('John');
      expect(SafeAccess.getProperty(obj, 'age')).toBe(30);
      expect(SafeAccess.getProperty(null, 'name')).toBeUndefined();
      expect(SafeAccess.getProperty(undefined, 'name')).toBeUndefined();
    });

    it('should safely get nested properties', () => {
      const obj = {
        user: {
          profile: {
            name: 'John'
          }
        }
      };

      expect(SafeAccess.getNestedProperty(obj, ['user', 'profile', 'name'])).toBe('John');
      expect(SafeAccess.getNestedProperty(obj, ['user', 'profile', 'age'], 'default')).toBe('default');
      expect(SafeAccess.getNestedProperty(obj, ['invalid', 'path'])).toBeUndefined();
      expect(SafeAccess.getNestedProperty(null, ['user', 'name'])).toBeUndefined();
    });
  });

  describe('type conversion', () => {
    it('should safely convert to string', () => {
      expect(SafeAccess.toString('hello')).toBe('hello');
      expect(SafeAccess.toString(123)).toBe('123');
      expect(SafeAccess.toString(true)).toBe('true');
      expect(SafeAccess.toString(null)).toBe('');
      expect(SafeAccess.toString(undefined)).toBe('');
      expect(SafeAccess.toString(null, 'default')).toBe('default');
    });

    it('should safely convert to number', () => {
      expect(SafeAccess.toNumber(123)).toBe(123);
      expect(SafeAccess.toNumber('123')).toBe(123);
      expect(SafeAccess.toNumber('123.45')).toBe(123.45);
      expect(SafeAccess.toNumber('invalid')).toBe(0);
      expect(SafeAccess.toNumber(null)).toBe(0);
      expect(SafeAccess.toNumber('invalid', 42)).toBe(42);
    });

    it('should safely convert to boolean', () => {
      expect(SafeAccess.toBoolean(true)).toBe(true);
      expect(SafeAccess.toBoolean(false)).toBe(false);
      expect(SafeAccess.toBoolean('true')).toBe(true);
      expect(SafeAccess.toBoolean('false')).toBe(false);
      expect(SafeAccess.toBoolean('1')).toBe(true);
      expect(SafeAccess.toBoolean('0')).toBe(false);
      expect(SafeAccess.toBoolean(1)).toBe(true);
      expect(SafeAccess.toBoolean(0)).toBe(false);
      expect(SafeAccess.toBoolean('invalid')).toBe(false);
      expect(SafeAccess.toBoolean(null, true)).toBe(true);
    });

    it('should safely convert to array', () => {
      expect(SafeAccess.toArray([1, 2, 3])).toEqual([1, 2, 3]);
      expect(SafeAccess.toArray('single')).toEqual(['single']);
      expect(SafeAccess.toArray(null)).toEqual([]);
      expect(SafeAccess.toArray(undefined)).toEqual([]);
      expect(SafeAccess.toArray(null, ['default'])).toEqual(['default']);
    });
  });
});

describe('TypeAssertions', () => {
  it('should assert string types', () => {
    expect(() => TypeAssertions.assertString('hello')).not.toThrow();
    expect(() => TypeAssertions.assertString(123)).toThrow('must be a string');
  });

  it('should assert non-empty string types', () => {
    expect(() => TypeAssertions.assertNonEmptyString('hello')).not.toThrow();
    expect(() => TypeAssertions.assertNonEmptyString('')).toThrow('must be a non-empty string');
    expect(() => TypeAssertions.assertNonEmptyString('   ')).toThrow('must be a non-empty string');
  });

  it('should assert number types', () => {
    expect(() => TypeAssertions.assertNumber(123)).not.toThrow();
    expect(() => TypeAssertions.assertNumber('123')).toThrow('must be a number');
  });

  it('should assert positive number types', () => {
    expect(() => TypeAssertions.assertPositiveNumber(123)).not.toThrow();
    expect(() => TypeAssertions.assertPositiveNumber(0)).toThrow('must be a positive number');
    expect(() => TypeAssertions.assertPositiveNumber(-123)).toThrow('must be a positive number');
  });

  it('should assert boolean types', () => {
    expect(() => TypeAssertions.assertBoolean(true)).not.toThrow();
    expect(() => TypeAssertions.assertBoolean('true')).toThrow('must be a boolean');
  });

  it('should assert object types', () => {
    expect(() => TypeAssertions.assertObject({})).not.toThrow();
    expect(() => TypeAssertions.assertObject([])).toThrow('must be an object');
    expect(() => TypeAssertions.assertObject(null)).toThrow('must be an object');
  });

  it('should assert array types', () => {
    expect(() => TypeAssertions.assertArray([])).not.toThrow();
    expect(() => TypeAssertions.assertArray({})).toThrow('must be an array');
  });
});

describe('TypeSafeProcessor', () => {
  describe('processArray', () => {
    it('should process valid array items', () => {
      const data = ['hello', 'world', 123, 'test'];
      const processor = (item: string) => item.toUpperCase();
      const typeGuard = (item: unknown): item is string => typeof item === 'string';

      const result = TypeSafeProcessor.processArray(data, processor, typeGuard);

      expect(result).toEqual(['HELLO', 'WORLD', 'TEST']);
    });

    it('should handle empty arrays', () => {
      const result = TypeSafeProcessor.processArray(
        [],
        (item: string) => item.toUpperCase(),
        (item: unknown): item is string => typeof item === 'string'
      );

      expect(result).toEqual([]);
    });
  });

  describe('processObject', () => {
    it('should process valid objects', () => {
      const data = { name: 'John', age: 30 };
      const processor = (item: { name: string; age: number }) => `${item.name} is ${item.age}`;
      const typeGuard = (item: unknown): item is { name: string; age: number } => 
        typeof item === 'object' && item !== null && 'name' in item && 'age' in item;

      const result = TypeSafeProcessor.processObject(data, processor, typeGuard);

      expect(result).toBe('John is 30');
    });

    it('should return null for invalid objects', () => {
      const data = 'invalid';
      const processor = (item: { name: string }) => item.name;
      const typeGuard = (item: unknown): item is { name: string } => 
        typeof item === 'object' && item !== null && 'name' in item;

      const result = TypeSafeProcessor.processObject(data, processor, typeGuard);

      expect(result).toBeNull();
    });
  });

  describe('safeMap', () => {
    it('should map array safely with error handling', () => {
      const data = [1, 2, 3, 4];
      const mapper = (item: number) => {
        if (item === 3) throw new Error('Test error');
        return item * 2;
      };

      const result = TypeSafeProcessor.safeMap(data, mapper);

      expect(result).toEqual([2, 4, 8]);
    });

    it('should use error handler when provided', () => {
      const data = [1, 2, 3, 4];
      const mapper = (item: number) => {
        if (item === 3) throw new Error('Test error');
        return item * 2;
      };
      const errorHandler = (error: Error, item: number) => item * -1;

      const result = TypeSafeProcessor.safeMap(data, mapper, errorHandler);

      expect(result).toEqual([2, 4, -3, 8]);
    });
  });

  describe('typedFilter', () => {
    it('should filter with type predicate', () => {
      const data = [1, 'hello', 2, 'world', 3];
      const predicate = (item: unknown): item is number => typeof item === 'number';

      const result = TypeSafeProcessor.typedFilter(data, predicate);

      expect(result).toEqual([1, 2, 3]);
    });
  });
});

describe('EnvSafeAccess', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getString', () => {
    it('should get string environment variables', () => {
      process.env.TEST_STRING = 'hello world';
      
      expect(EnvSafeAccess.getString('TEST_STRING')).toBe('hello world');
    });

    it('should use default value when variable is not set', () => {
      expect(EnvSafeAccess.getString('NONEXISTENT', 'default')).toBe('default');
    });

    it('should throw error when required variable is not set', () => {
      expect(() => EnvSafeAccess.getString('NONEXISTENT')).toThrow('is required but not set');
    });
  });

  describe('getNumber', () => {
    it('should get number environment variables', () => {
      process.env.TEST_NUMBER = '123.45';
      
      expect(EnvSafeAccess.getNumber('TEST_NUMBER')).toBe(123.45);
    });

    it('should use default value when variable is not set', () => {
      expect(EnvSafeAccess.getNumber('NONEXISTENT', 42)).toBe(42);
    });

    it('should throw error for invalid number format', () => {
      process.env.TEST_INVALID_NUMBER = 'not-a-number';
      
      expect(() => EnvSafeAccess.getNumber('TEST_INVALID_NUMBER')).toThrow('must be a valid number');
    });
  });

  describe('getBoolean', () => {
    it('should get boolean environment variables', () => {
      process.env.TEST_BOOL_TRUE = 'true';
      process.env.TEST_BOOL_FALSE = 'false';
      
      expect(EnvSafeAccess.getBoolean('TEST_BOOL_TRUE')).toBe(true);
      expect(EnvSafeAccess.getBoolean('TEST_BOOL_FALSE')).toBe(false);
    });

    it('should use default value when variable is not set', () => {
      expect(EnvSafeAccess.getBoolean('NONEXISTENT', true)).toBe(true);
    });
  });
});