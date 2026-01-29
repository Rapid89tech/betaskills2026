/**
 * AdminApprovalWorkflow Service Tests
 * 
 * Tests for EFT payment approval workflow, real-time updates,
 * and audit trail functionality.
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';

// Mock RealTimePaymentSync
vi.mock('../RealTimePaymentSync', () => ({
  realTimePaymentSync: {
    initialize: vi.fn(),
    subscribeToAdminUpdates: vi.fn(),
    syncEnrollmentStatus: vi.fn(),
    broadcastToUser: vi.fn()
  }
}));

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn()
  }
}));

import { AdminApprovalWorkflow } from '../AdminApprovalWorkflow';
import { realTimePaymentSync } from '../RealTimePaymentSync';

describe('AdminApprovalWorkflow', () => {
  let adminWorkflow: AdminApprovalWorkflow;
  let mockEnrollmentData: any;
  let mockAdminId: string;

  beforeEach(() => {
    adminWorkflow = AdminApprovalWorkflow.getInstance();
    mockAdminId = 'admin-123';
    
    mockEnrollmentData = {
      id: 'enrollment-123',
      user_id: 'user-456',
      user_email: 'student@example.com',
      course_id: 'course-789',
      course_title: 'Test Course',
      payment_type: 'eft',
      payment_status: 'completed',
      status: 'pending',
      requires_approval: true,
      amount: 299.99,
      currency: 'ZAR',
      created_at: '2024-01-01T10:00:00Z',
      updated_at: '2024-01-01T10:00:00Z'
    };

    // Reset all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    adminWorkflow.cleanup();
  });

  describe('Initialization', () => {
    it('should initialize successfully', async () => {
      (realTimePaymentSync.initialize as Mock).mockResolvedValue(undefined);
      (realTimePaymentSync.subscribeToAdminUpdates as Mock).mockReturnValue(() => {});

      await adminWorkflow.initialize();

      expect(realTimePaymentSync.initialize).toHaveBeenCalled();
      expect(realTimePaymentSync.subscribeToAdminUpdates).toHaveBeenCalled();
    });

    it('should handle initialization errors', async () => {
      const error = new Error('Initialization failed');
      (realTimePaymentSync.initialize as Mock).mockRejectedValue(error);

      await expect(adminWorkflow.initialize()).rejects.toThrow('Initialization failed');
    });
  });

  describe('Event Subscriptions', () => {
    it('should allow subscribing to new enrollments', () => {
      const callback = vi.fn();
      const unsubscribe = adminWorkflow.subscribeToNewEnrollments(callback);

      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
      expect(adminWorkflow.getHealthStatus().newEnrollmentListeners).toBe(0);
    });

    it('should allow subscribing to enrollment processed events', () => {
      const callback = vi.fn();
      const unsubscribe = adminWorkflow.subscribeToEnrollmentProcessed(callback);

      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
      expect(adminWorkflow.getHealthStatus().processedListeners).toBe(0);
    });
  });

  describe('Health Status', () => {
    it('should return health status', () => {
      const status = adminWorkflow.getHealthStatus();

      expect(status).toMatchObject({
        initialized: expect.any(Boolean),
        newEnrollmentListeners: expect.any(Number),
        processedListeners: expect.any(Number)
      });
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      adminWorkflow.subscribeToNewEnrollments(callback1);
      adminWorkflow.subscribeToEnrollmentProcessed(callback2);

      expect(adminWorkflow.getHealthStatus().newEnrollmentListeners).toBe(1);
      expect(adminWorkflow.getHealthStatus().processedListeners).toBe(1);

      adminWorkflow.cleanup();

      expect(adminWorkflow.getHealthStatus().newEnrollmentListeners).toBe(0);
      expect(adminWorkflow.getHealthStatus().processedListeners).toBe(0);
      expect(adminWorkflow.getHealthStatus().initialized).toBe(false);
    });
  });

  describe('Service Instance', () => {
    it('should return singleton instance', () => {
      const instance1 = AdminApprovalWorkflow.getInstance();
      const instance2 = AdminApprovalWorkflow.getInstance();
      
      expect(instance1).toBe(instance2);
    });
  });
});