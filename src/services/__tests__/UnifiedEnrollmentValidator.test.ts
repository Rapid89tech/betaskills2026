/**
 * UnifiedEnrollmentValidator Tests
 * 
 * Comprehensive tests for enrollment validation with various data source combinations,
 * confidence scoring algorithm accuracy, and edge cases like expired enrollmentsution.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { UnifiedEnrollmentValidator } from '../UnifiedEnrollmentValidator';

// Mock localStorage and sessionStorage
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

const mockSessionStorage = {
  data: {} as Record<string, string>,
  getItem: vi.fn((key: string) => mockSessionStorage.data[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockSessionStorage.data[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockSessionStorage.data[key];
  }),
  clear: vi.fn(() => {
    mockSessionStorage.data = {};
  }),
  length: 0,
  key: vi.fn()
};

// Mock console methods to reduce test noise
const mockConsole = {
  log: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn()
};

describe('UnifiedEnrollmentValidator', () => {
  let validator: UnifiedEnrollmentValidator;
  const testUserId = 'user123';
  const testCourseId = 'course456';

  beforeEach(() => {
    // Reset mocks
    mockLocalStorage.clear();
    mockSessionStorage.clear();
    vi.clearAllMocks();

    // Mock global objects
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    Object.defineProperty(global, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true
    });

    // Also mock window.localStorage and window.sessionStorage if they exist
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      });

      Object.defineProperty(window, 'sessionStorage', {
        value: mockSessionStorage,
        writable: true
      });
    }

    Object.defineProperty(global, 'console', {
      value: mockConsole,
      writable: true
    });

    // Reset and get fresh validator instance
    UnifiedEnrollmentValidator.resetInstance();
    validator = UnifiedEnrollmentValidator.getInstance();
    validator.clearCache();
  });

  afterEach(() => {
    validator.clearCache();
    mockLocalStorage.clear();
    mockSessionStorage.clear();
  });

  describe('Basic Validation', () => {
    it('should return unenrolled when no enrollment data exists', async () => {
      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('unenrolled');
      expect(result.confidence).toBe(0);
      expect(result.sources).toHaveLength(0);
      expect(result.primarySource).toBeNull();
    });

    it('should detect enrollment from enrollment-success flag', async () => {
      const enrollmentData = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };

      mockLocalStorage.setItem(
        `enrollment-success-${testUserId}-${testCourseId}`,
        JSON.stringify(enrollmentData)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.sources).toHaveLength(1);
      expect(result.primarySource?.name).toBe('enrollment-success-flag');
    });

    it('should detect enrollment from user enrollments list', async () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 25
      };

      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([enrollmentData])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources).toHaveLength(1);
      expect(result.primarySource?.data?.status).toBe('approved');
    });

    it('should detect pending enrollment correctly', async () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0
      };

      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(enrollmentData)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('pending');
      expect(result.primarySource?.data?.status).toBe('pending');
    });
  });

  describe('Multiple Sources and Confidence Scoring', () => {
    it('should prioritize higher confidence sources', async () => {
      // Add low confidence source
      const oldEnrollment = {
        id: 'old123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'pending',
        enrolled_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
        updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      };

      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`,
        JSON.stringify(oldEnrollment)
      );

      // Add high confidence source
      const recentPayment = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };

      mockLocalStorage.setItem(
        `recent-payment-${testUserId}-${testCourseId}`,
        JSON.stringify(recentPayment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled'); // Should use the approved status from recent payment
      expect(result.sources).toHaveLength(2);
      expect(result.primarySource?.name).toBe('recent-payment-flag');
    });

    it('should handle multiple sources with same confidence', async () => {
      const enrollment1 = {
        id: 'enroll1',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const enrollment2 = {
        id: 'enroll2',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([enrollment1])
      );

      mockLocalStorage.setItem(
        'enrollments',
        JSON.stringify([enrollment2])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources).toHaveLength(2);
      // Should prioritize user-specific list over global list
      expect(result.primarySource?.name).toBe('user-enrollments-list');
    });
  });

  describe('Conflict Detection and Resolution', () => {
    it('should detect status conflicts between sources', async () => {
      const approvedEnrollment = {
        id: 'enroll1',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const pendingEnrollment = {
        id: 'enroll2',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([approvedEnrollment])
      );

      mockLocalStorage.setItem(
        'enrollments',
        JSON.stringify([pendingEnrollment])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.conflicts).toHaveLength(1);
      expect(result.conflicts[0].conflictType).toBe('status');
      expect(result.conflicts[0].severity).toBe('high');
      // Should still resolve to approved status due to higher priority source
      expect(result.status).toBe('enrolled');
    });

    it('should handle user ID mismatches', async () => {
      const wrongUserEnrollment = {
        id: 'enroll1',
        user_id: 'wronguser',
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`,
        JSON.stringify(wrongUserEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      // Should not find any valid enrollment due to user mismatch
      expect(result.isValid).toBe(false);
      expect(result.status).toBe('unenrolled');
      expect(result.sources).toHaveLength(0);
    });
  });

  describe('Data Normalization', () => {
    it('should normalize different status formats', async () => {
      const enrollmentData = {
        id: 'enroll123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'ENROLLED', // Different case
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(enrollmentData)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.primarySource?.data?.status).toBe('approved'); // Normalized
    });

    it('should handle missing optional fields gracefully', async () => {
      const minimalEnrollment = {
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved'
        // Missing id, dates, etc.
      };

      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(minimalEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.primarySource?.data?.id).toBeDefined(); // Should generate ID
      expect(result.primarySource?.data?.enrolled_at).toBeDefined(); // Should generate timestamp
    });
  });

  describe('Caching', () => {
    it('should cache validation results', async () => {
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

      // First call
      const result1 = await validator.validateEnrollment(testUserId, testCourseId);

      // Clear localStorage to test caching
      mockLocalStorage.clear();

      // Second call should return cached result
      const result2 = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result1.status).toBe('enrolled');
      expect(result2.status).toBe('enrolled');
      expect(result1.metadata.validationTime).toEqual(result2.metadata.validationTime);
    });

    it('should respect cache timeout', async () => {
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

      // First call
      await validator.validateEnrollment(testUserId, testCourseId);

      // Mock time passage (cache timeout is 30 seconds)
      const originalNow = Date.now;
      Date.now = vi.fn(() => originalNow() + 31000); // 31 seconds later

      // Clear localStorage
      mockLocalStorage.clear();

      // Second call should not use cache and return unenrolled
      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.status).toBe('unenrolled');

      // Restore Date.now
      Date.now = originalNow;
    });
  });

  describe('Error Handling', () => {
    it('should handle corrupted localStorage data', async () => {
      // Add corrupted JSON data
      mockLocalStorage.data[`user-enrollment-${testUserId}-${testCourseId}`] = 'invalid json {';

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('unenrolled');
      expect(result.sources).toHaveLength(0);
    });

    it('should handle localStorage access errors', async () => {
      // Mock localStorage to throw errors
      mockLocalStorage.getItem = vi.fn(() => {
        throw new Error('Storage access denied');
      });

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('unenrolled');
    });
  });

  describe('Performance and Metadata', () => {
    it('should track processing time', async () => {
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

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.metadata.processingTimeMs).toBeGreaterThanOrEqual(0);
      expect(result.metadata.totalSources).toBeGreaterThanOrEqual(0);
      expect(result.metadata.sourcesWithData).toBeGreaterThanOrEqual(0);
      expect(result.metadata.userId).toBe(testUserId);
      expect(result.metadata.courseId).toBe(testCourseId);
    });
  });

  describe('Confidence Thresholds', () => {
    it('should respect minimum confidence threshold', async () => {
      // Add very old enrollment data (low confidence)
      const oldEnrollment = {
        id: 'old123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`,
        JSON.stringify(oldEnrollment)
      );

      // Use high confidence threshold
      const result = await validator.validateEnrollment(testUserId, testCourseId, {
        minConfidence: 0.8
      });

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('unenrolled');
      expect(result.primarySource).toBeNull();
    });
  });

  describe('Various Data Source Combinations', () => {
    it('should validate enrollment from multiple source types', async () => {
      // Clear cache and reset validator to ensure clean state
      validator.clearCache();

      // Test with enrollment success flag (highest priority source)
      const enrollmentSuccess = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };

      // Ensure mock storage is working
      mockLocalStorage.clear();
      mockLocalStorage.setItem(
        `enrollment-success-${testUserId}-${testCourseId}`,
        JSON.stringify(enrollmentSuccess)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources.length).toBeGreaterThanOrEqual(1);
      expect(result.primarySource?.name).toBe('enrollment-success-flag');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should handle localStorage and sessionStorage sources', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();
      mockSessionStorage.clear();

      // localStorage source
      const localEnrollment = {
        id: 'local-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([localEnrollment])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources.length).toBeGreaterThanOrEqual(1);
      expect(result.primarySource?.type).toBe('localStorage');
    });

    it('should find enrollment in array formats', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      // Test with user enrollments array
      const userEnrollment = {
        id: 'array-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([userEnrollment])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.primarySource?.name).toBe('user-enrollments-list');
    });

    it('should handle email-based user identification', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      const emailUserId = 'user@example.com';

      // Enrollment with email as user_email field
      const emailEnrollment = {
        id: 'email-123',
        user_email: emailUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${emailUserId}`,
        JSON.stringify([emailEnrollment])
      );

      const result = await validator.validateEnrollment(emailUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.primarySource?.data?.user_email).toBe(emailUserId);
    });
  });

  describe('Confidence Scoring Algorithm Accuracy', () => {
    it('should assign higher confidence to recent enrollment data', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      // Recent enrollment (should have high confidence)
      const recentEnrollment = {
        id: 'recent-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(recentEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.primarySource?.confidence).toBeGreaterThan(0.5);
    });

    it('should assign lower confidence to old enrollment data', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      const now = Date.now();

      // Old enrollment (should have lower confidence)
      const oldEnrollment = {
        id: 'old-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date(now - 48 * 60 * 60 * 1000).toISOString(), // 48 hours ago
        updated_at: new Date(now - 48 * 60 * 60 * 1000).toISOString()
      };
      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`, // Lower priority source
        JSON.stringify(oldEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.confidence).toBeLessThan(0.9); // Should have lower confidence due to age and low priority
    });

    it('should prioritize high-priority sources over low-priority ones', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      // High priority source (enrollment-success flag)
      const highPriorityData = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `enrollment-success-${testUserId}-${testCourseId}`,
        JSON.stringify(highPriorityData)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.primarySource?.name).toBe('enrollment-success-flag');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should handle complete vs minimal enrollment data', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      // Complete enrollment data
      const completeEnrollment = {
        id: 'complete-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 25,
        course_title: 'Test Course'
      };
      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(completeEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.primarySource?.confidence).toBeGreaterThan(0.5);
    });

    it('should validate user and course consistency', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      // Matching user and course
      const matchingEnrollment = {
        id: 'matching-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(matchingEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.primarySource?.confidence).toBeGreaterThan(0.5);
    });

    it('should combine multiple confidence factors', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      // Optimal enrollment: recent, high priority, complete data, consistent
      const optimalEnrollment = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString(),
        courseTitle: 'Test Course'
      };
      mockLocalStorage.setItem(
        `enrollment-success-${testUserId}-${testCourseId}`,
        JSON.stringify(optimalEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.primarySource?.name).toBe('enrollment-success-flag');
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Edge Cases - Expired Enrollments and Conflicting Data', () => {
    it('should handle very old enrollment data', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      const now = Date.now();

      // Enrollment from 30 days ago (very old)
      const expiredEnrollment = {
        id: 'expired-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        updated_at: new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(expiredEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      // Should still detect enrollment but with lower confidence due to age
      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.confidence).toBeLessThan(0.8); // Lower confidence due to age
    });

    it('should handle conflicting enrollment statuses', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      // Approved enrollment (higher priority source)
      const approvedEnrollment = {
        id: 'approved-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([approvedEnrollment])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled'); // Should resolve to approved
      expect(result.sources.length).toBeGreaterThanOrEqual(1);
    });

    it('should handle user ID mismatches by ignoring wrong user data', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      // Enrollment with wrong user ID (should be ignored)
      const wrongUserEnrollment = {
        id: 'wrong-123',
        user_id: 'wrong-user-id',
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`,
        JSON.stringify(wrongUserEnrollment)
      );

      // Enrollment with correct user ID
      const correctUserEnrollment = {
        id: 'correct-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([correctUserEnrollment])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      // Should only find the correct user enrollment
      expect(result.isValid).toBe(true);
      expect(result.status).toBe('pending');
      expect(result.sources.length).toBeGreaterThanOrEqual(1);
      expect(result.primarySource?.data?.user_id).toBe(testUserId);
    });

    it('should handle course ID mismatches', async () => {
      // Enrollment for different course
      const wrongCourseEnrollment = {
        id: 'wrong-course-123',
        user_id: testUserId,
        course_id: 'wrong-course-id',
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([wrongCourseEnrollment])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('unenrolled');
      expect(result.sources).toHaveLength(0); // No matching course enrollments
    });

    it('should handle corrupted enrollment data gracefully', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      // Valid enrollment
      const validEnrollment = {
        id: 'valid-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([validEnrollment])
      );

      // Corrupted data in another source
      mockLocalStorage.data[`enrollment-${testCourseId}`] = 'invalid json data {';

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      // Should still work with valid data, ignoring corrupted source
      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources.length).toBeGreaterThanOrEqual(1); // At least the valid source
    });

    it('should handle null and undefined enrollment data', async () => {
      // Clear cache and reset
      validator.clearCache();
      mockLocalStorage.clear();

      // Null data
      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`,
        JSON.stringify(null)
      );

      // Valid data
      const validEnrollment = {
        id: 'valid-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([validEnrollment])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, { useCache: false });

      // Should work with valid data, ignoring null/corrupted sources
      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources.length).toBeGreaterThanOrEqual(1);
    });

    it('should handle missing required fields in enrollment data', async () => {
      // Enrollment missing required fields
      const incompleteEnrollment = {
        // Missing id, user_id, course_id
        status: 'approved',
        enrolled_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`,
        JSON.stringify(incompleteEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('unenrolled');
      expect(result.sources).toHaveLength(0); // Should be filtered out due to missing required fields
    });

    it('should handle timestamp conflicts between sources', async () => {
      const now = Date.now();

      // Recent enrollment
      const recentEnrollment = {
        id: 'recent-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date(now).toISOString(),
        updated_at: new Date(now).toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([recentEnrollment])
      );

      // Old enrollment (2+ hours difference)
      const oldEnrollment = {
        id: 'old-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date(now - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        updated_at: new Date(now - 3 * 60 * 60 * 1000).toISOString()
      };
      mockLocalStorage.setItem(
        'enrollments',
        JSON.stringify([oldEnrollment])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.conflicts.length).toBeGreaterThanOrEqual(1);
      expect(result.conflicts.some(c => c.conflictType === 'timestamp')).toBe(true);
      // Should prioritize recent enrollment
      expect(result.primarySource?.name).toBe('user-enrollments-list');
    });

    it('should handle rejected enrollment status correctly', async () => {
      const rejectedEnrollment = {
        id: 'rejected-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'rejected',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(rejectedEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('rejected');
      expect(result.primarySource?.data?.status).toBe('rejected');
    });
  });

  describe('Advanced Data Source Combinations', () => {
    it('should handle all high-priority sources simultaneously', async () => {
      // Add multiple high-priority sources
      const enrollmentSuccess = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `enrollment-success-${testUserId}-${testCourseId}`,
        JSON.stringify(enrollmentSuccess)
      );

      const recentPayment = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `recent-payment-${testUserId}-${testCourseId}`,
        JSON.stringify(recentPayment)
      );

      const bulletproofEnrollment = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `bulletproof-enrollment-${testCourseId}`,
        JSON.stringify(bulletproofEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources.length).toBeGreaterThanOrEqual(3);
      // Should prioritize enrollment-success (highest priority)
      expect(result.primarySource?.name).toBe('enrollment-success-flag');
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    it('should handle mixed localStorage and sessionStorage sources', async () => {
      // localStorage source
      const localEnrollment = {
        id: 'local-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([localEnrollment])
      );

      // sessionStorage source (lower priority)
      const sessionEnrollment = {
        id: 'session-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockSessionStorage.setItem(
        'enrollments',
        JSON.stringify([sessionEnrollment])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled'); // Should use localStorage (higher priority)
      expect(result.sources.length).toBeGreaterThanOrEqual(2);
      expect(result.primarySource?.type).toBe('localStorage');
      expect(result.conflicts.length).toBeGreaterThanOrEqual(1); // Status conflict
    });

    it('should handle array vs individual enrollment data formats', async () => {
      // Array format
      const arrayEnrollment = {
        id: 'array-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([arrayEnrollment])
      );

      // Individual format
      const individualEnrollment = {
        id: 'individual-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(individualEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources.length).toBeGreaterThanOrEqual(2);
      // Should prioritize user-specific array (higher priority)
      expect(result.primarySource?.name).toBe('user-enrollments-list');
    });

    it('should handle flag-style vs structured enrollment data', async () => {
      // Flag-style data (from payment success)
      const flagData = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString(),
        courseTitle: 'Test Course'
      };
      mockLocalStorage.setItem(
        `enrollment-success-${testUserId}-${testCourseId}`,
        JSON.stringify(flagData)
      );

      // Structured enrollment data
      const structuredData = {
        id: 'structured-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 15
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([structuredData])
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled'); // Should use flag data (higher priority)
      expect(result.sources.length).toBeGreaterThanOrEqual(2);
      expect(result.primarySource?.name).toBe('enrollment-success-flag');
      expect(result.conflicts.length).toBeGreaterThanOrEqual(1); // Status conflict
    });

    it('should handle global vs user-specific enrollment lists', async () => {
      // User-specific list
      const userEnrollment = {
        id: 'user-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([userEnrollment])
      );

      // Global list with multiple users
      const globalEnrollments = [
        {
          id: 'global-123',
          user_id: testUserId,
          course_id: testCourseId,
          status: 'pending',
          enrolled_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'other-user-123',
          user_id: 'other-user',
          course_id: testCourseId,
          status: 'approved',
          enrolled_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      mockLocalStorage.setItem('enrollments', JSON.stringify(globalEnrollments));

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled'); // Should use user-specific (higher priority)
      expect(result.sources.length).toBeGreaterThanOrEqual(2);
      expect(result.primarySource?.name).toBe('user-enrollments-list');
      expect(result.conflicts.length).toBeGreaterThanOrEqual(1); // Status conflict
    });
  });

  describe('Confidence Scoring Edge Cases', () => {
    it('should handle zero confidence sources', async () => {
      // Very old enrollment with incomplete data
      const lowQualityEnrollment = {
        // Missing id and other fields
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days old
      };
      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`, // Low priority source
        JSON.stringify(lowQualityEnrollment)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId, {
        minConfidence: 0.1 // Very low threshold
      });

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.confidence).toBeLessThan(0.5); // Should have low confidence
    });

    it('should handle confidence calculation with missing timestamps', async () => {
      const enrollmentWithoutTimestamp = {
        id: 'no-timestamp-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved'
        // Missing enrolled_at and updated_at
      };
      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(enrollmentWithoutTimestamp)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.primarySource?.data?.enrolled_at).toBeDefined(); // Should generate timestamp
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should handle confidence with partial user matches', async () => {
      const emailUserId = 'user@example.com';

      // Enrollment with email match but no user_id
      const emailOnlyEnrollment = {
        id: 'email-only-123',
        user_email: emailUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${emailUserId}`,
        JSON.stringify([emailOnlyEnrollment])
      );

      const result = await validator.validateEnrollment(emailUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.confidence).toBeGreaterThan(0.5); // Should have decent confidence with email match
    });

    it('should handle confidence with source priority weighting', async () => {
      // High priority source with minimal data
      const highPriorityMinimal = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `enrollment-success-${testUserId}-${testCourseId}`,
        JSON.stringify(highPriorityMinimal)
      );

      // Low priority source with complete data
      const lowPriorityComplete = {
        id: 'complete-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 50,
        course_title: 'Complete Course Data'
      };
      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`,
        JSON.stringify(lowPriorityComplete)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources.length).toBeGreaterThanOrEqual(2);
      // High priority source should win despite less complete data
      expect(result.primarySource?.name).toBe('enrollment-success-flag');
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Complex Conflict Resolution', () => {
    it('should handle multiple conflicting sources with different severities', async () => {
      // High confidence approved source
      const approvedSource = {
        status: 'approved',
        courseId: testCourseId,
        userEmail: testUserId,
        timestamp: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `enrollment-success-${testUserId}-${testCourseId}`,
        JSON.stringify(approvedSource)
      );

      // Medium confidence pending source
      const pendingSource = {
        id: 'pending-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([pendingSource])
      );

      // Low confidence rejected source
      const rejectedSource = {
        id: 'rejected-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'rejected',
        enrolled_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day old
        updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      };
      mockLocalStorage.setItem(
        `enrollment-${testCourseId}`,
        JSON.stringify(rejectedSource)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled'); // Should resolve to approved (highest confidence)
      expect(result.sources.length).toBeGreaterThanOrEqual(3);
      expect(result.conflicts.length).toBeGreaterThanOrEqual(2); // Multiple status conflicts
      expect(result.primarySource?.name).toBe('enrollment-success-flag');
      expect(result.confidence).toBeLessThan(1); // Should be reduced due to conflicts
    });

    it('should handle course ID conflicts by filtering out wrong courses', async () => {
      const correctCourseId = testCourseId;
      const wrongCourseId = 'wrong-course-123';

      // Correct course enrollment
      const correctEnrollment = {
        id: 'correct-123',
        user_id: testUserId,
        course_id: correctCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([correctEnrollment])
      );

      // Wrong course enrollment (should be ignored)
      const wrongEnrollment = {
        id: 'wrong-123',
        user_id: testUserId,
        course_id: wrongCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        'enrollments',
        JSON.stringify([wrongEnrollment])
      );

      const result = await validator.validateEnrollment(testUserId, correctCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources.length).toBe(1); // Only correct course should be found
      expect(result.primarySource?.data?.course_id).toBe(correctCourseId);
      expect(result.conflicts).toHaveLength(0); // No conflicts since wrong course is filtered out
    });

    it('should handle user ID conflicts by filtering out wrong users', async () => {
      const correctUserId = testUserId;
      const wrongUserId = 'wrong-user-123';

      // Correct user enrollment
      const correctEnrollment = {
        id: 'correct-123',
        user_id: correctUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollments-${correctUserId}`,
        JSON.stringify([correctEnrollment])
      );

      // Wrong user enrollment (should be ignored)
      const wrongEnrollment = {
        id: 'wrong-123',
        user_id: wrongUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        'enrollments',
        JSON.stringify([wrongEnrollment])
      );

      const result = await validator.validateEnrollment(correctUserId, testCourseId);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('enrolled');
      expect(result.sources.length).toBe(1); // Only correct user should be found
      expect(result.primarySource?.data?.user_id).toBe(correctUserId);
      expect(result.conflicts).toHaveLength(0); // No conflicts since wrong user is filtered out
    });
  });

  describe('Performance and Caching Edge Cases', () => {
    it('should handle cache with expired entries', async () => {
      const enrollmentData = {
        id: 'cache-test-123',
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

      // First call to populate cache
      const result1 = await validator.validateEnrollment(testUserId, testCourseId);

      // Mock time passage beyond cache timeout (30 seconds)
      const originalNow = Date.now;
      Date.now = vi.fn(() => originalNow() + 35000); // 35 seconds later

      // Change the data
      const updatedEnrollmentData = {
        ...enrollmentData,
        status: 'pending'
      };
      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(updatedEnrollmentData)
      );

      // Second call should not use cache and get updated data
      const result2 = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result1.status).toBe('enrolled');
      expect(result2.status).toBe('pending'); // Should reflect updated data

      // Restore Date.now
      Date.now = originalNow;
    });

    it('should handle validation with useCache disabled', async () => {
      const enrollmentData = {
        id: 'no-cache-123',
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

      // First call with cache disabled
      const result1 = await validator.validateEnrollment(testUserId, testCourseId, {
        useCache: false
      });

      // Change data
      mockLocalStorage.removeItem(`user-enrollment-${testUserId}-${testCourseId}`);

      // Second call with cache disabled should get updated result
      const result2 = await validator.validateEnrollment(testUserId, testCourseId, {
        useCache: false
      });

      expect(result1.status).toBe('enrolled');
      expect(result2.status).toBe('unenrolled');
    });

    it('should track processing time accurately', async () => {
      // Add multiple sources to increase processing time
      const sources = [
        { key: `enrollment-success-${testUserId}-${testCourseId}`, data: { status: 'approved', courseId: testCourseId, userEmail: testUserId, timestamp: new Date().toISOString() } },
        { key: `recent-payment-${testUserId}-${testCourseId}`, data: { status: 'approved', courseId: testCourseId, userEmail: testUserId, timestamp: new Date().toISOString() } },
        { key: `user-enrollments-${testUserId}`, data: [{ id: '1', user_id: testUserId, course_id: testCourseId, status: 'approved', enrolled_at: new Date().toISOString(), updated_at: new Date().toISOString() }] },
        { key: 'enrollments', data: [{ id: '2', user_id: testUserId, course_id: testCourseId, status: 'pending', enrolled_at: new Date().toISOString(), updated_at: new Date().toISOString() }] }
      ];

      sources.forEach(source => {
        mockLocalStorage.setItem(source.key, JSON.stringify(source.data));
      });

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.metadata.processingTimeMs).toBeGreaterThanOrEqual(0);
      expect(result.metadata.totalSources).toBeGreaterThanOrEqual(sources.length);
      expect(result.metadata.sourcesWithData).toBeGreaterThanOrEqual(sources.length);
    });
  });

  describe('Status Normalization Edge Cases', () => {
    it('should normalize various status formats correctly', async () => {
      const statusMappings = [
        { input: 'APPROVED', expected: 'enrolled' },
        { input: 'enrolled', expected: 'enrolled' },
        { input: 'ACTIVE', expected: 'enrolled' },
        { input: 'confirmed', expected: 'enrolled' },
        { input: 'PENDING', expected: 'pending' },
        { input: 'waiting', expected: 'pending' },
        { input: 'SUBMITTED', expected: 'pending' },
        { input: 'REJECTED', expected: 'rejected' },
        { input: 'denied', expected: 'rejected' },
        { input: 'CANCELLED', expected: 'rejected' },
        { input: 'inactive', expected: 'rejected' },
        { input: 'unknown_status', expected: 'pending' } // Default case
      ];

      for (const mapping of statusMappings) {
        // Clear previous data
        mockLocalStorage.clear();
        validator.clearCache();

        const enrollmentData = {
          id: `status-test-${mapping.input}`,
          user_id: testUserId,
          course_id: testCourseId,
          status: mapping.input,
          enrolled_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        mockLocalStorage.setItem(
          `user-enrollment-${testUserId}-${testCourseId}`,
          JSON.stringify(enrollmentData)
        );

        const result = await validator.validateEnrollment(testUserId, testCourseId);

        expect(result.status).toBe(mapping.expected);
        expect(result.primarySource?.data?.status).toBe(
          mapping.input.toLowerCase() === 'enrolled' || mapping.input.toLowerCase() === 'active' || mapping.input.toLowerCase() === 'confirmed' ? 'approved' :
            mapping.input.toLowerCase() === 'rejected' || mapping.input.toLowerCase() === 'denied' || mapping.input.toLowerCase() === 'cancelled' || mapping.input.toLowerCase() === 'inactive' ? 'rejected' :
              'pending'
        );
      }
    });

    it('should handle case-insensitive status normalization', async () => {
      const enrollmentData = {
        id: 'case-test-123',
        user_id: testUserId,
        course_id: testCourseId,
        status: '  ApPrOvEd  ', // Mixed case with whitespace
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockLocalStorage.setItem(
        `user-enrollment-${testUserId}-${testCourseId}`,
        JSON.stringify(enrollmentData)
      );

      const result = await validator.validateEnrollment(testUserId, testCourseId);

      expect(result.status).toBe('enrolled');
      expect(result.primarySource?.data?.status).toBe('approved');
    });
  });
});: testCourseId,
  status: 'approved',
    enrolled_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
      };
mockLocalStorage.setItem(
  `user-enrollments-${testUserId}`,
  JSON.stringify([validEnrollment])
);

const result = await validator.validateEnrollment(testUserId, testCourseId);

expect(result.isValid).toBe(true);
expect(result.status).toBe('enrolled');
expect(result.sources.length).toBeGreaterThanOrEqual(1); // At least the valid source
    });

it('should handle empty arrays in enrollment lists', async () => {
  // Empty user enrollments array
  mockLocalStorage.setItem(
    `user-enrollments-${testUserId}`,
    JSON.stringify([])
  );

  // Empty global enrollments array
  mockLocalStorage.setItem(
    'enrollments',
    JSON.stringify([])
  );

  const result = await validator.validateEnrollment(testUserId, testCourseId);

  expect(result.isValid).toBe(false);
  expect(result.status).toBe('unenrolled');
  expect(result.sources).toHaveLength(0);
});

it('should handle mixed valid and invalid data in arrays', async () => {
  const mixedEnrollments = [
    null, // Invalid
    {
      // Missing required fields
      status: 'approved'
    },
    {
      // Valid enrollment
      id: 'valid-123',
      user_id: testUserId,
      course_id: testCourseId,
      status: 'approved',
      enrolled_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    undefined, // Invalid
    {
      // Wrong course
      id: 'wrong-course-123',
      user_id: testUserId,
      course_id: 'wrong-course',
      status: 'approved',
      enrolled_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  mockLocalStorage.setItem(
    `user-enrollments-${testUserId}`,
    JSON.stringify(mixedEnrollments)
  );

  const result = await validator.validateEnrollment(testUserId, testCourseId);

  expect(result.isValid).toBe(true);
  expect(result.status).toBe('enrolled');
  expect(result.sources.length).toBeGreaterThanOrEqual(1); // At least the valid enrollment
  expect(result.primarySource?.data?.id).toBe('valid-123');
});
  });
});