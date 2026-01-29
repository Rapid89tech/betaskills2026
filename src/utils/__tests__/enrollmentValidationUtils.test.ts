/**
 * Tests for Enrollment Validation Utilities
 * 
 * These tests verify the helper functions work correctly for localStorage checking,
 * API verification, and enrollment context validation.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  checkLocalStorageEnrollment,
  verifyEnrollmentViaAPI,
  validateEnrollmentContext,
  isEnrollmentDataRecent,
  selectMostReliableEnrollment,
  cleanupOldEnrollmentData
} from '../enrollmentValidationUtils';

// Mock localStorage
const mockLocalStorage = {
  data: {} as Record<string, string>,
  getItem: vi.fn((key: string) => mockLocalStorage.data[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.data[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockLocalStorage.data[key];
  }),
  clear: vi.fn(() => {
    mockLocalStorage.data = {};
  }),
  length: 0,
  key: vi.fn()
};

// Mock console methods
const mockConsole = {
  log: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn()
};

describe('Enrollment Validation Utilities', () => {
  const testUserId = 'user123';
  const testCourseId = 'course456';

  beforeEach(() => {
    // Reset mocks
    mockLocalStorage.clear();
    vi.clearAllMocks();

    // Mock global objects
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    Object.defineProperty(global, 'console', {
      value: mockConsole,
      writable: true
    });
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  describe('checkLocalStorageEnrollment', () => {
    it('should find enrollment data in various localStorage keys', () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(enrollmentData)
      );

      const results = checkLocalStorageEnrollment(testUserId, testCourseId);

      expect(results).toHaveLength(1);
      expect(results[0].found).toBe(true);
      expect(results[0].data?.status).toBe('approved');
      expect(results[0].source).toBe(`user-enrollment-${testUserId}-${testCourseId}`);
      expect(results[0].confidence).toBeGreaterThan(0);
    });

    it('should find enrollment data in enrollment lists', () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([enrollmentData])
      );

      const results = checkLocalStorageEnrollment(testUserId, testCourseId);

      expect(results).toHaveLength(1);
      expect(results[0].found).toBe(true);
      expect(results[0].data?.status).toBe('approved');
      expect(results[0].source).toBe(`user-enrollments-${testUserId}`);
    });

    it('should handle enrollment success flags', () => {
      const successFlag = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };

      mockLocalStorage.setItem(
        `enrollment-success-${testUserId}-${testCourseId}`,
        JSON.stringify(successFlag)
      );

      const results = checkLocalStorageEnrollment(testUserId, testCourseId);

      expect(results).toHaveLength(1);
      expect(results[0].found).toBe(true);
      expect(results[0].data?.status).toBe('approved');
      expect(results[0].confidence).toBeGreaterThan(0.8); // High confidence for success flags
    });

    it('should return empty array when no enrollment data found', () => {
      const results = checkLocalStorageEnrollment(testUserId, testCourseId);

      expect(results).toHaveLength(0);
    });

    it('should handle corrupted JSON data gracefully', () => {
      mockLocalStorage.data[`user-enrollment-${testUserId}-${testCourseId}`] = 'invalid json {';

      const results = checkLocalStorageEnrollment(testUserId, testCourseId);

      expect(results).toHaveLength(0);
    });

    it('should sort results by confidence', () => {
      // Add low confidence data
      const oldEnrollment = {
        id: 'old123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
        updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      };

      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`,
        JSON.stringify(oldEnrollment)
      );

      // Add high confidence data
      const successFlag = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };

      mockLocalStorage.setItem(
        `enrollment-success-${testUserId}-${testCourseId}`,
        JSON.stringify(successFlag)
      );

      const results = checkLocalStorageEnrollment(testUserId, testCourseId);

      expect(results).toHaveLength(2);
      expect(results[0].confidence).toBeGreaterThan(results[1].confidence);
      expect(results[0].source).toBe(`enrollment-success-${testUserId}-${testCourseId}`);
    });
  });

  describe('verifyEnrollmentViaAPI', () => {
    it('should return success with no data (placeholder implementation)', async () => {
      const result = await verifyEnrollmentViaAPI(testUserId, testCourseId);

      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
      expect(result.responseTime).toBeGreaterThanOrEqual(0);
    });

    it('should handle API errors gracefully', async () => {
      // Mock fetch to throw error
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const result = await verifyEnrollmentViaAPI(testUserId, testCourseId);

      expect(result.success).toBe(true); // Placeholder always returns success
      expect(result.data).toBeNull();
    });
  });

  describe('validateEnrollmentContext', () => {
    it('should validate complete enrollment data', () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: testUserId,
        user_email: 'user@example.com',
        course_id: testCourseId,
        course_title: 'Test Course',
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        approved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 50
      };

      const result = validateEnrollmentContext(enrollmentData, testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.completeness).toBeGreaterThan(0.8);
    });

    it('should detect missing required fields', () => {
      const incompleteData = {
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0
        // Missing id
      };

      const result = validateEnrollmentContext(incompleteData as any, testUserId, testCourseId);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Missing required field: id');
    });

    it('should detect user ID mismatch', () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: 'wronguser',
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0
      };

      const result = validateEnrollmentContext(enrollmentData, testUserId, testCourseId);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('User ID mismatch'))).toBe(true);
    });

    it('should detect course ID mismatch', () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: 'wrongcourse',
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0
      };

      const result = validateEnrollmentContext(enrollmentData, testUserId, testCourseId);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Course ID mismatch'))).toBe(true);
    });

    it('should detect invalid status', () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'invalid' as any,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0
      };

      const result = validateEnrollmentContext(enrollmentData, testUserId, testCourseId);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Invalid status'))).toBe(true);
    });

    it('should generate warnings for invalid dates', () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: 'invalid-date',
        updated_at: new Date().toISOString(),
        progress: 0
      };

      const result = validateEnrollmentContext(enrollmentData, testUserId, testCourseId);

      expect(result.warnings.some(w => w.includes('Invalid enrolled_at date'))).toBe(true);
    });

    it('should generate warnings for out-of-range progress', () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 150 // Out of range
      };

      const result = validateEnrollmentContext(enrollmentData, testUserId, testCourseId);

      expect(result.warnings.some(w => w.includes('Progress out of range'))).toBe(true);
    });
  });

  describe('isEnrollmentDataRecent', () => {
    it('should return true for recent data', () => {
      const recentData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0
      };

      const result = isEnrollmentDataRecent(recentData);

      expect(result).toBe(true);
    });

    it('should return false for old data', () => {
      const oldData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
        progress: 0
      };

      const result = isEnrollmentDataRecent(oldData, 30 * 60 * 1000); // 30 minutes

      expect(result).toBe(false);
    });

    it('should handle invalid dates', () => {
      const invalidData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: 'invalid-date',
        progress: 0
      };

      const result = isEnrollmentDataRecent(invalidData);

      expect(result).toBe(false);
    });
  });

  describe('selectMostReliableEnrollment', () => {
    it('should select highest confidence enrollment', () => {
      const results = [
        {
          found: true,
          data: { id: '1', user_id: testUserId, course_id: testCourseId, status: 'approved' as const, enrolled_at: '', updated_at: '', progress: 0 },
          source: 'source1',
          confidence: 0.7,
          age: 1000
        },
        {
          found: true,
          data: { id: '2', user_id: testUserId, course_id: testCourseId, status: 'approved' as const, enrolled_at: '', updated_at: '', progress: 0 },
          source: 'source2',
          confidence: 0.9,
          age: 2000
        }
      ];

      const result = selectMostReliableEnrollment(results);

      expect(result?.data?.id).toBe('2');
      expect(result?.confidence).toBe(0.9);
    });

    it('should return null for empty results', () => {
      const result = selectMostReliableEnrollment([]);

      expect(result).toBeNull();
    });

    it('should filter out low confidence results', () => {
      const results = [
        {
          found: true,
          data: { id: '1', user_id: testUserId, course_id: testCourseId, status: 'approved' as const, enrolled_at: '', updated_at: '', progress: 0 },
          source: 'source1',
          confidence: 0.1, // Very low confidence
          age: 1000
        }
      ];

      const result = selectMostReliableEnrollment(results);

      expect(result).toBeNull();
    });

    it('should prefer newer data when confidence is equal', () => {
      const results = [
        {
          found: true,
          data: { id: '1', user_id: testUserId, course_id: testCourseId, status: 'approved' as const, enrolled_at: '', updated_at: '', progress: 0 },
          source: 'source1',
          confidence: 0.8,
          age: 2000 // Older
        },
        {
          found: true,
          data: { id: '2', user_id: testUserId, course_id: testCourseId, status: 'approved' as const, enrolled_at: '', updated_at: '', progress: 0 },
          source: 'source2',
          confidence: 0.8,
          age: 1000 // Newer
        }
      ];

      const result = selectMostReliableEnrollment(results);

      expect(result?.data?.id).toBe('2'); // Should select newer data
    });
  });

  describe('cleanupOldEnrollmentData', () => {
    it('should remove old enrollment data', () => {
      const oldTimestamp = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(); // 8 days ago
      const recentTimestamp = new Date().toISOString();

      // Add old data
      mockLocalStorage.setItem('enrollment-old', JSON.stringify({
        timestamp: oldTimestamp,
        status: 'approved'
      }));

      // Add recent data
      mockLocalStorage.setItem('enrollment-recent', JSON.stringify({
        timestamp: recentTimestamp,
        status: 'approved'
      }));

      // Mock localStorage.key method
      mockLocalStorage.key = vi.fn((index: number) => {
        const keys = Object.keys(mockLocalStorage.data);
        return keys[index] || null;
      });

      Object.defineProperty(mockLocalStorage, 'length', {
        get: () => Object.keys(mockLocalStorage.data).length
      });

      const cleanedCount = cleanupOldEnrollmentData(7 * 24 * 60 * 60 * 1000); // 7 days

      expect(cleanedCount).toBe(1);
      expect(mockLocalStorage.data['enrollment-old']).toBeUndefined();
      expect(mockLocalStorage.data['enrollment-recent']).toBeDefined();
    });

    it('should handle corrupted data gracefully', () => {
      mockLocalStorage.setItem('enrollment-corrupted', 'invalid json {');

      mockLocalStorage.key = vi.fn((index: number) => {
        const keys = Object.keys(mockLocalStorage.data);
        return keys[index] || null;
      });

      Object.defineProperty(mockLocalStorage, 'length', {
        get: () => Object.keys(mockLocalStorage.data).length
      });

      const cleanedCount = cleanupOldEnrollmentData();

      expect(cleanedCount).toBe(0); // Should not crash
    });
  });
});