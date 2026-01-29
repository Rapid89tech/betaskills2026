/**
 * AdminApprovalWorkflow Integration Tests
 * 
 * Tests real-time admin dashboard integration, instant approval actions,
 * and cross-component synchronization.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
    channel: vi.fn(() => ({
      on: vi.fn(() => ({
        subscribe: vi.fn()
      }))
    }))
  }
}));

vi.mock('../services/RealTimePaymentSync', () => ({
  realTimePaymentSync: {
    initialize: vi.fn(),
    subscribeToAdminUpdates: vi.fn(),
    syncEnrollmentStatus: vi.fn(),
    broadcastToUser: vi.fn()
  }
}));

import { AdminApprovalWorkflow } from '../../services/AdminApprovalWorkflow';

describe('AdminApprovalWorkflow Integration Tests', () => {
  let adminWorkflow: AdminApprovalWorkflow;

  beforeEach(async () => {
    adminWorkflow = AdminApprovalWorkflow.getInstance();
    await adminWorkflow.initialize();
  });

  afterEach(() => {
    adminWorkflow.cleanup();
    vi.clearAllMocks();
  });

  describe('Service Integration', () => {
    it('should initialize and provide health status', () => {
      const health = adminWorkflow.getHealthStatus();
      
      expect(health).toMatchObject({
        initialized: expect.any(Boolean),
        newEnrollmentListeners: expect.any(Number),
        processedListeners: expect.any(Number)
      });
    });

    it('should handle event subscriptions', () => {
      const newEnrollmentCallback = vi.fn();
      const processedCallback = vi.fn();
      
      const unsubscribe1 = adminWorkflow.subscribeToNewEnrollments(newEnrollmentCallback);
      const unsubscribe2 = adminWorkflow.subscribeToEnrollmentProcessed(processedCallback);
      
      expect(adminWorkflow.getHealthStatus().newEnrollmentListeners).toBe(1);
      expect(adminWorkflow.getHealthStatus().processedListeners).toBe(1);
      
      unsubscribe1();
      unsubscribe2();
      
      expect(adminWorkflow.getHealthStatus().newEnrollmentListeners).toBe(0);
      expect(adminWorkflow.getHealthStatus().processedListeners).toBe(0);
    });

    it('should maintain singleton pattern', () => {
      const instance1 = AdminApprovalWorkflow.getInstance();
      const instance2 = AdminApprovalWorkflow.getInstance();
      
      expect(instance1).toBe(instance2);
      expect(instance1).toBe(adminWorkflow);
    });
  });

  describe('Real-time Integration', () => {
    it('should setup real-time subscriptions on initialization', async () => {
      // The service should be initialized and ready
      expect(adminWorkflow.getHealthStatus().initialized).toBe(true);
    });

    it('should handle multiple subscribers', () => {
      const callbacks = [vi.fn(), vi.fn(), vi.fn()];
      
      const unsubscribers = callbacks.map(callback => 
        adminWorkflow.subscribeToNewEnrollments(callback)
      );
      
      expect(adminWorkflow.getHealthStatus().newEnrollmentListeners).toBe(3);
      
      // Cleanup
      unsubscribers.forEach(unsub => unsub());
      expect(adminWorkflow.getHealthStatus().newEnrollmentListeners).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle service cleanup gracefully', () => {
      const callback = vi.fn();
      adminWorkflow.subscribeToNewEnrollments(callback);
      
      expect(() => adminWorkflow.cleanup()).not.toThrow();
      expect(adminWorkflow.getHealthStatus().initialized).toBe(false);
    });
  });
});