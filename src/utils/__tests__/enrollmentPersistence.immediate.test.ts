/**
 * Tests for immediate enrollment status persistence system
 * Verifies card payment approval functionality and conflict resolution
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  updateEnrollmentStatusImmediately,
  processCardPaymentApproval,
  resolveEnrollmentConflicts,
  recoverEnrollmentDataEnhanced,
  verifyEnrollmentPersistence,
  EnrollmentData,
  ImmediateUpdateOptions,
  ConflictResolutionResult
} from '../enrollmentPersistence';
import { PaymentType } from '../../types/ikhokha';

// Mock logger
vi.mock('../logger', () => ({
  logger: {
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

// Mock IndexedDB
const mockIndexedDB = {
  open: vi.fn(),
  deleteDatabase: vi.fn()
};

Object.defineProperty(window, 'indexedDB', {
  value: mockIndexedDB,
  writable: true
});

describe('Immediate Enrollment Status Persistence', () => {
  const mockEnrollment: EnrollmentData = {
    id: 'enrollment_123',
    user_id: 'user_456',
    user_email: 'test@example.com',
    course_id: 'course_789',
    course_title: 'Test Course',
    status: 'pending',
    enrolled_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    progress: 0
  };

  beforeEach(() => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock successful IndexedDB operations
    mockIndexedDB.open.mockImplementation(() => {
      const mockRequest = {
        result: {
          transaction: () => ({
            objectStore: () => ({
              put: vi.fn().mockResolvedValue(undefined),
              get: vi.fn().mockResolvedValue({ data: null }),
              delete: vi.fn().mockResolvedValue(undefined)
            })
          })
        },
        onsuccess: null,
        onerror: null,
        onupgradeneeded: null
      };
      
      // Simulate successful open
      setTimeout(() => {
        if (mockRequest.onsuccess) {
          mockRequest.onsuccess({ target: mockRequest } as any);
        }
      }, 0);
      
      return mockRequest;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('updateEnrollmentStatusImmediately', () => {
    it('should update enrollment status with card payment source', async () => {
      const options: ImmediateUpdateOptions = {
        source: 'webhook_card_payment',
        broadcastUpdate: true
      };

      const approvedEnrollment: EnrollmentData = {
        ...mockEnrollment,
        status: 'approved'
      };

      const result = await updateEnrollmentStatusImmediately(approvedEnrollment, options);

      expect(result).toBe(true);
      
      // Verify localStorage was updated
      const userKey = `user-enrollments-${mockEnrollment.user_id}`;
      const storedData = localStorage.getItem(userKey);
      expect(storedData).toBeTruthy();
      
      const parsedData = JSON.parse(storedData!);
      expect(Array.isArray(parsedData)).toBe(true);
      expect(parsedData[0].status).toBe('approved');
      expect(parsedData[0].approval_source).toBe('webhook_card_payment');
    });

    it('should set approved_at timestamp for card payment approvals', async () => {
      const options: ImmediateUpdateOptions = {
        source: 'webhook_card_payment'
      };

      const approvedEnrollment: EnrollmentData = {
        ...mockEnrollment,
        status: 'approved'
      };

      await updateEnrollmentStatusImmediately(approvedEnrollment, options);

      const userKey = `user-enrollments-${mockEnrollment.user_id}`;
      const storedData = JSON.parse(localStorage.getItem(userKey)!);
      
      expect(storedData[0].approved_at).toBeTruthy();
      expect(new Date(storedData[0].approved_at)).toBeInstanceOf(Date);
    });

    it('should increment sync version', async () => {
      const enrollmentWithVersion: EnrollmentData = {
        ...mockEnrollment,
        sync_version: 5
      };

      const options: ImmediateUpdateOptions = {
        source: 'system_automatic'
      };

      await updateEnrollmentStatusImmediately(enrollmentWithVersion, options);

      const userKey = `user-enrollments-${mockEnrollment.user_id}`;
      const storedData = JSON.parse(localStorage.getItem(userKey)!);
      
      expect(storedData[0].sync_version).toBe(6);
    });

    it('should broadcast update event when requested', async () => {
      const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
      
      const options: ImmediateUpdateOptions = {
        source: 'webhook_card_payment',
        broadcastUpdate: true
      };

      await updateEnrollmentStatusImmediately(mockEnrollment, options);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'enrollment-status-updated',
          detail: expect.objectContaining({
            enrollmentId: mockEnrollment.id,
            userId: mockEnrollment.user_id,
            courseId: mockEnrollment.course_id,
            source: 'webhook_card_payment'
          })
        })
      );
    });
  });

  describe('processCardPaymentApproval', () => {
    beforeEach(() => {
      // Pre-populate with pending enrollment
      const userKey = `user-enrollments-${mockEnrollment.user_id}`;
      localStorage.setItem(userKey, JSON.stringify([mockEnrollment]));
      localStorage.setItem(`enrollment-${mockEnrollment.id}`, JSON.stringify(mockEnrollment));
    });

    it('should process card payment approval successfully', async () => {
      const result = await processCardPaymentApproval(
        mockEnrollment.id,
        mockEnrollment.user_id,
        mockEnrollment.course_id,
        'payment_ref_123'
      );

      expect(result).toBe(true);

      // Verify enrollment was updated to approved
      const userKey = `user-enrollments-${mockEnrollment.user_id}`;
      const storedData = JSON.parse(localStorage.getItem(userKey)!);
      
      expect(storedData[0].status).toBe('approved');
      expect(storedData[0].payment_type).toBe(PaymentType.CARD);
      expect(storedData[0].approval_source).toBe('webhook_card_payment');
      expect(storedData[0].approved_at).toBeTruthy();
    });

    it('should set enrollment success flag', async () => {
      await processCardPaymentApproval(
        mockEnrollment.id,
        mockEnrollment.user_id,
        mockEnrollment.course_id,
        'payment_ref_123'
      );

      const flagKey = `enrollment-success-${mockEnrollment.user_id}-${mockEnrollment.course_id}`;
      const flagData = localStorage.getItem(flagKey);
      
      expect(flagData).toBeTruthy();
      
      const parsedFlag = JSON.parse(flagData!);
      expect(parsedFlag.status).toBe('approved');
      expect(parsedFlag.paymentReference).toBe('payment_ref_123');
      expect(parsedFlag.source).toBe('card_payment');
    });

    it('should return false if enrollment not found', async () => {
      const result = await processCardPaymentApproval(
        'nonexistent_enrollment',
        mockEnrollment.user_id,
        mockEnrollment.course_id,
        'payment_ref_123'
      );

      expect(result).toBe(false);
    });
  });

  describe('resolveEnrollmentConflicts', () => {
    it('should prioritize approved status (requirement 5.4)', () => {
      const localData: EnrollmentData = {
        ...mockEnrollment,
        status: 'approved',
        updated_at: '2024-01-01T10:00:00Z',
        sync_version: 1
      };

      const remoteData: EnrollmentData = {
        ...mockEnrollment,
        status: 'pending',
        updated_at: '2024-01-01T11:00:00Z', // More recent
        sync_version: 2
      };

      const result = resolveEnrollmentConflicts(localData, remoteData);

      expect(result.resolved).toBe(true);
      expect(result.strategy).toBe('approved_priority');
      expect(result.finalData.status).toBe('approved');
      expect(result.conflicts.length).toBeGreaterThan(0);
    });

    it('should use most recent data when neither is approved', () => {
      const localData: EnrollmentData = {
        ...mockEnrollment,
        status: 'pending',
        updated_at: '2024-01-01T10:00:00Z',
        sync_version: 1
      };

      const remoteData: EnrollmentData = {
        ...mockEnrollment,
        status: 'rejected',
        updated_at: '2024-01-01T11:00:00Z', // More recent
        sync_version: 2
      };

      const result = resolveEnrollmentConflicts(localData, remoteData);

      expect(result.resolved).toBe(true);
      expect(result.strategy).toBe('remote_wins');
      expect(result.finalData.status).toBe('rejected');
    });

    it('should merge data when timestamps are equal', () => {
      const timestamp = '2024-01-01T10:00:00Z';
      
      const localData: EnrollmentData = {
        ...mockEnrollment,
        status: 'pending',
        updated_at: timestamp,
        progress: 25,
        sync_version: 1
      };

      const remoteData: EnrollmentData = {
        ...mockEnrollment,
        status: 'pending',
        updated_at: timestamp,
        progress: 50,
        sync_version: 2
      };

      const result = resolveEnrollmentConflicts(localData, remoteData);

      expect(result.resolved).toBe(true);
      expect(result.strategy).toBe('merge');
      expect(result.finalData.progress).toBe(50); // Max progress
      expect(result.finalData.sync_version).toBe(2); // Max version
    });
  });

  describe('recoverEnrollmentDataEnhanced', () => {
    beforeEach(() => {
      // Set up test data in multiple storage locations
      const enrollment1: EnrollmentData = {
        ...mockEnrollment,
        id: 'enrollment_1',
        course_id: 'course_1'
      };

      const enrollment2: EnrollmentData = {
        ...mockEnrollment,
        id: 'enrollment_2',
        course_id: 'course_2',
        status: 'approved'
      };

      // Store in different keys
      localStorage.setItem('enrollments', JSON.stringify([enrollment1]));
      localStorage.setItem(`user-enrollments-${mockEnrollment.user_id}`, JSON.stringify([enrollment2]));
      sessionStorage.setItem('enrollments', JSON.stringify([enrollment1, enrollment2]));
    });

    it('should recover enrollments from multiple storage strategies', async () => {
      const result = await recoverEnrollmentDataEnhanced(mockEnrollment.user_id);

      expect(result.success).toBe(true);
      expect(result.recoveredEnrollments.length).toBeGreaterThan(0);
      expect(result.sources.length).toBeGreaterThan(0);
      
      // Should find both enrollments
      const courseIds = result.recoveredEnrollments.map(e => e.course_id);
      expect(courseIds).toContain('course_1');
      expect(courseIds).toContain('course_2');
    });

    it('should resolve conflicts during recovery', async () => {
      // Create conflicting data - override the existing enrollment1 in sessionStorage with approved status
      const conflictingEnrollment: EnrollmentData = {
        ...mockEnrollment,
        id: 'enrollment_1',
        course_id: 'course_1',
        status: 'approved', // Different from the pending one in localStorage
        updated_at: '2024-01-01T12:00:00Z'
      };

      // Store the conflicting enrollment in a key that will be found during recovery
      const existingSessionData = JSON.parse(sessionStorage.getItem('enrollments') || '[]');
      const updatedSessionData = existingSessionData.map((e: EnrollmentData) => 
        e.id === 'enrollment_1' ? conflictingEnrollment : e
      );
      sessionStorage.setItem('enrollments', JSON.stringify(updatedSessionData));

      const result = await recoverEnrollmentDataEnhanced(mockEnrollment.user_id);

      expect(result.success).toBe(true);
      // Should have resolved conflicts
      const enrollment1 = result.recoveredEnrollments.find(e => e.id === 'enrollment_1');
      expect(enrollment1?.status).toBe('approved'); // Should prioritize approved status
    });
  });

  describe('verifyEnrollmentPersistence', () => {
    beforeEach(() => {
      // Store enrollment in localStorage
      localStorage.setItem(`enrollment-${mockEnrollment.id}`, JSON.stringify(mockEnrollment));
    });

    it('should verify enrollment exists across storage strategies', async () => {
      const result = await verifyEnrollmentPersistence(mockEnrollment.id, mockEnrollment.user_id);

      expect(result.verified).toBe(true);
      expect(result.strategies.length).toBeGreaterThan(0);
      
      const foundStrategies = result.strategies.filter(s => s.found);
      expect(foundStrategies.length).toBeGreaterThan(0);
    });

    it('should return false when enrollment not found', async () => {
      const result = await verifyEnrollmentPersistence('nonexistent_id', mockEnrollment.user_id);

      expect(result.verified).toBe(false);
      
      const foundStrategies = result.strategies.filter(s => s.found);
      expect(foundStrategies.length).toBe(0);
    });
  });
});