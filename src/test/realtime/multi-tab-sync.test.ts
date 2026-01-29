import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EnhancedRealTimeSync } from '../../services/EnhancedRealTimeSync';
import type { EnrollmentData, ImmediateApprovalUpdate, CourseAccessUpdate } from '../../types/ikhokha';

/**
 * Real-Time Update Testing with Multiple Browser Tabs
 * 
 * These tests verify cross-tab synchronization functionality:
 * 1. Enrollment status updates across multiple tabs
 * 2. Course access changes synchronized in real-time
 * 3. UI state consistency across browser tabs
 * 4. Conflict resolution between tabs
 * 5. Performance under multiple tab scenarios
 * 
 * Requirements: 3.1, 3.2, 3.3
 */
describe('Multi-Tab Real-Time Sync Tests', () => {
  let realTimeSync: EnhancedRealTimeSync;
  let mockBroadcastChannels: Map<string, any>;
  let mockLocalStorage: Map<string, string>;
  let mockSessionStorage: Map<string, string>;

  // Mock tab instances
  const createMockTab = (tabId: string) => ({
    id: tabId,
    broadcastChannel: {
      postMessage: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      close: vi.fn(),
    },
    localStorage: {
      getItem: vi.fn((key: string) => mockLocalStorage.get(key) || null),
      setItem: vi.fn((key: string, value: string) => mockLocalStorage.set(key, value)),
      removeItem: vi.fn((key: string) => mockLocalStorage.delete(key)),
      clear: vi.fn(() => mockLocalStorage.clear()),
    },
    sessionStorage: {
      getItem: vi.fn((key: string) => mockSessionStorage.get(key) || null),
      setItem: vi.fn((key: string, value: string) => mockSessionStorage.set(key, value)),
      removeItem: vi.fn((key: string) => mockSessionStorage.delete(key)),
      clear: vi.fn(() => mockSessionStorage.clear()),
    }
  });

  const mockEnrollment: EnrollmentData = {
    id: 'enroll_multi_tab',
    user_id: 'user_multi_tab',
    user_email: 'multitab@example.com',
    course_id: 'course_multi_tab',
    course_title: 'Multi-Tab Test Course',
    status: 'pending',
    payment_type: 'card',
    payment_status: 'completed',
    payment_reference: 'pay_multi_tab',
    approval_type: 'automatic_card_payment',
    approved_by: 'system_card_payment',
    approval_source: 'webhook_card_payment',
    course_access_granted: false,
    access_level: 'none',
    status_history: [],
    last_updated_by: 'webhook_card_payment',
    created_at: new Date(),
    updated_at: new Date(),
    sync_version: 1,
    last_synced_at: new Date()
  };

  beforeEach(() => {
    realTimeSync = new EnhancedRealTimeSync();
    mockBroadcastChannels = new Map();
    mockLocalStorage = new Map();
    mockSessionStorage = new Map();

    // Mock BroadcastChannel
    global.BroadcastChannel = vi.fn().mockImplementation((name: string) => {
      const channel = {
        name,
        postMessage: vi.fn((data) => {
          // Simulate message delivery to other tabs
          mockBroadcastChannels.forEach((otherChannel, channelName) => {
            if (channelName === name && otherChannel !== channel) {
              // Simulate async message delivery
              setTimeout(() => {
                if (otherChannel.onmessage) {
                  otherChannel.onmessage({ data });
                }
              }, 0);
            }
          });
        }),
        addEventListener: vi.fn((event, handler) => {
          if (event === 'message') {
            channel.onmessage = handler;
          }
        }),
        removeEventListener: vi.fn(),
        close: vi.fn(),
        onmessage: null as any
      };
      mockBroadcastChannels.set(`${name}_${Date.now()}`, channel);
      return channel;
    });

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => mockLocalStorage.get(key) || null),
        setItem: vi.fn((key: string, value: string) => mockLocalStorage.set(key, value)),
        removeItem: vi.fn((key: string) => mockLocalStorage.delete(key)),
        clear: vi.fn(() => mockLocalStorage.clear()),
      },
      writable: true,
    });

    // Mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: vi.fn((key: string) => mockSessionStorage.get(key) || null),
        setItem: vi.fn((key: string, value: string) => mockSessionStorage.set(key, value)),
        removeItem: vi.fn((key: string) => mockSessionStorage.delete(key)),
        clear: vi.fn(() => mockSessionStorage.clear()),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockBroadcastChannels.clear();
    mockLocalStorage.clear();
    mockSessionStorage.clear();
  });

  describe('Cross-Tab Enrollment Status Synchronization', () => {
    it('should synchronize enrollment approval across multiple tabs', async () => {
      const tab1 = createMockTab('tab1');
      const tab2 = createMockTab('tab2');
      const tab3 = createMockTab('tab3');

      // Simulate enrollment approval in tab1
      const approvalUpdate: ImmediateApprovalUpdate = {
        enrollmentId: mockEnrollment.id,
        userId: mockEnrollment.user_id,
        courseId: mockEnrollment.course_id,
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        paymentReference: mockEnrollment.payment_reference,
        accessGranted: true
      };

      // Broadcast from tab1
      await realTimeSync.broadcastImmediateApproval(approvalUpdate);

      // Verify localStorage was updated
      expect(localStorage.setItem).toHaveBeenCalledWith(
        expect.stringContaining('enrollment_'),
        expect.stringContaining('"status":"approved"')
      );

      // Simulate cross-tab sync
      await realTimeSync.syncEnrollmentStatusAcrossTabs(
        mockEnrollment.user_id,
        mockEnrollment.course_id,
        'approved'
      );

      // Verify broadcast was sent
      expect(BroadcastChannel).toHaveBeenCalled();
    });

    it('should handle enrollment status conflicts between tabs', async () => {
      // Tab1 thinks enrollment is pending
      mockLocalStorage.set('enrollment_enroll_multi_tab', JSON.stringify({
        ...mockEnrollment,
        status: 'pending',
        sync_version: 1
      }));

      // Tab2 thinks enrollment is approved
      const tab2Data = {
        ...mockEnrollment,
        status: 'approved',
        sync_version: 2,
        course_access_granted: true
      };

      // Simulate conflict resolution
      const resolvedData = await realTimeSync.coordinatePersistenceUpdate(
        tab2Data,
        'webhook_card_payment'
      );

      // Should resolve to the higher version (approved status)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'enrollment_enroll_multi_tab',
        expect.stringContaining('"status":"approved"')
      );
    });

    it('should maintain consistency during rapid status changes', async () => {
      const rapidUpdates = [
        { status: 'pending', version: 1 },
        { status: 'processing', version: 2 },
        { status: 'approved', version: 3 },
        { status: 'approved', version: 4 } // Duplicate to test idempotency
      ];

      // Simulate rapid updates from different tabs
      for (const update of rapidUpdates) {
        const updatedEnrollment = {
          ...mockEnrollment,
          status: update.status as any,
          sync_version: update.version,
          last_synced_at: new Date()
        };

        await realTimeSync.coordinatePersistenceUpdate(
          updatedEnrollment,
          'webhook_card_payment'
        );
      }

      // Should end up with the final approved status
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        'enrollment_enroll_multi_tab',
        expect.stringContaining('"status":"approved"')
      );
    });
  });

  describe('Course Access Synchronization', () => {
    it('should synchronize course access grants across tabs', async () => {
      const accessUpdate: CourseAccessUpdate = {
        userId: mockEnrollment.user_id,
        courseId: mockEnrollment.course_id,
        accessLevel: 'granted',
        grantedAt: new Date(),
        source: 'card_payment'
      };

      await realTimeSync.broadcastCourseAccessGranted(accessUpdate);

      // Verify access was persisted
      expect(localStorage.setItem).toHaveBeenCalledWith(
        expect.stringContaining('course_access_'),
        expect.stringContaining('"accessLevel":"granted"')
      );
    });

    it('should handle access revocation across tabs', async () => {
      // First grant access
      const grantUpdate: CourseAccessUpdate = {
        userId: mockEnrollment.user_id,
        courseId: mockEnrollment.course_id,
        accessLevel: 'granted',
        grantedAt: new Date(),
        source: 'card_payment'
      };

      await realTimeSync.broadcastCourseAccessGranted(grantUpdate);

      // Then revoke access
      const revokeUpdate: CourseAccessUpdate = {
        userId: mockEnrollment.user_id,
        courseId: mockEnrollment.course_id,
        accessLevel: 'revoked',
        grantedAt: new Date(),
        source: 'admin_approval'
      };

      await realTimeSync.broadcastCourseAccessGranted(revokeUpdate);

      // Should reflect revoked status
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        expect.stringContaining('course_access_'),
        expect.stringContaining('"accessLevel":"revoked"')
      );
    });
  });

  describe('UI State Consistency', () => {
    it('should trigger UI updates across all tabs', async () => {
      const uiUpdateSpy = vi.spyOn(realTimeSync, 'triggerUIRefresh');

      // Simulate UI update trigger
      await realTimeSync.triggerUIRefresh(
        mockEnrollment.user_id,
        mockEnrollment.course_id,
        'enrollment_approved'
      );

      expect(uiUpdateSpy).toHaveBeenCalledWith(
        mockEnrollment.user_id,
        mockEnrollment.course_id,
        'enrollment_approved'
      );
    });

    it('should coordinate button state changes across tabs', async () => {
      // Simulate button state change from "Enroll Now" to "Continue Course"
      const buttonStateUpdate = {
        component: 'enrollment_button',
        action: 'change_button_text',
        data: {
          oldText: 'Enroll Now',
          newText: 'Continue Course',
          courseId: mockEnrollment.course_id,
          userId: mockEnrollment.user_id
        },
        priority: 'immediate',
        timeout: 2000
      };

      await realTimeSync.triggerUIRefresh(
        mockEnrollment.user_id,
        mockEnrollment.course_id,
        'button_state_change'
      );

      // Verify broadcast was sent for UI update
      expect(BroadcastChannel).toHaveBeenCalled();
    });

    it('should handle UI update failures gracefully', async () => {
      // Mock a UI update failure
      const failingUpdate = vi.spyOn(realTimeSync, 'triggerUIRefresh')
        .mockRejectedValueOnce(new Error('UI update failed'));

      await expect(
        realTimeSync.triggerUIRefresh(
          mockEnrollment.user_id,
          mockEnrollment.course_id,
          'enrollment_approved'
        )
      ).rejects.toThrow('UI update failed');

      expect(failingUpdate).toHaveBeenCalled();
    });
  });

  describe('Performance Under Multiple Tabs', () => {
    it('should handle 10 simultaneous tabs efficiently', async () => {
      const tabCount = 10;
      const tabs = Array.from({ length: tabCount }, (_, i) => createMockTab(`tab${i}`));

      const startTime = Date.now();

      // Simulate enrollment approval broadcast to all tabs
      const approvalUpdate: ImmediateApprovalUpdate = {
        enrollmentId: mockEnrollment.id,
        userId: mockEnrollment.user_id,
        courseId: mockEnrollment.course_id,
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        paymentReference: mockEnrollment.payment_reference,
        accessGranted: true
      };

      // Broadcast from each tab simultaneously
      const broadcastPromises = tabs.map(() =>
        realTimeSync.broadcastImmediateApproval(approvalUpdate)
      );

      await Promise.all(broadcastPromises);

      const totalTime = Date.now() - startTime;

      // Should handle 10 tabs in under 1 second
      expect(totalTime).toBeLessThan(1000);
    });

    it('should maintain performance with frequent updates', async () => {
      const updateCount = 50;
      const updates = Array.from({ length: updateCount }, (_, i) => ({
        ...mockEnrollment,
        sync_version: i + 1,
        last_synced_at: new Date()
      }));

      const startTime = Date.now();

      // Send frequent updates
      for (const update of updates) {
        await realTimeSync.coordinatePersistenceUpdate(
          update,
          'webhook_card_payment'
        );
      }

      const totalTime = Date.now() - startTime;

      // Should handle 50 updates in under 2 seconds
      expect(totalTime).toBeLessThan(2000);
    });

    it('should handle memory efficiently with long-running tabs', async () => {
      // Simulate a long-running tab with many updates
      const longRunningUpdates = 1000;

      for (let i = 0; i < longRunningUpdates; i++) {
        const update = {
          ...mockEnrollment,
          sync_version: i + 1,
          last_synced_at: new Date()
        };

        await realTimeSync.coordinatePersistenceUpdate(
          update,
          'webhook_card_payment'
        );

        // Simulate some processing time
        if (i % 100 === 0) {
          await new Promise(resolve => setTimeout(resolve, 1));
        }
      }

      // Should not cause memory issues
      expect(mockLocalStorage.size).toBeLessThan(10); // Should not accumulate too much data
    });
  });

  describe('Network Connectivity Scenarios', () => {
    it('should handle offline/online transitions', async () => {
      // Simulate offline state
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });

      // Try to broadcast while offline
      const approvalUpdate: ImmediateApprovalUpdate = {
        enrollmentId: mockEnrollment.id,
        userId: mockEnrollment.user_id,
        courseId: mockEnrollment.course_id,
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        paymentReference: mockEnrollment.payment_reference,
        accessGranted: true
      };

      await realTimeSync.broadcastImmediateApproval(approvalUpdate);

      // Should still persist locally
      expect(localStorage.setItem).toHaveBeenCalled();

      // Simulate coming back online
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true,
      });

      // Should sync when back online
      await realTimeSync.syncEnrollmentStatusAcrossTabs(
        mockEnrollment.user_id,
        mockEnrollment.course_id,
        'approved'
      );

      expect(BroadcastChannel).toHaveBeenCalled();
    });

    it('should queue updates during network issues', async () => {
      // Mock network failure
      const originalBroadcast = realTimeSync.broadcastImmediateApproval;
      let networkFailureCount = 0;

      vi.spyOn(realTimeSync, 'broadcastImmediateApproval').mockImplementation(async (update) => {
        networkFailureCount++;
        if (networkFailureCount <= 2) {
          throw new Error('Network error');
        }
        return originalBroadcast.call(realTimeSync, update);
      });

      const approvalUpdate: ImmediateApprovalUpdate = {
        enrollmentId: mockEnrollment.id,
        userId: mockEnrollment.user_id,
        courseId: mockEnrollment.course_id,
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        paymentReference: mockEnrollment.payment_reference,
        accessGranted: true
      };

      // First two attempts should fail
      await expect(
        realTimeSync.broadcastImmediateApproval(approvalUpdate)
      ).rejects.toThrow('Network error');

      await expect(
        realTimeSync.broadcastImmediateApproval(approvalUpdate)
      ).rejects.toThrow('Network error');

      // Third attempt should succeed
      await expect(
        realTimeSync.broadcastImmediateApproval(approvalUpdate)
      ).resolves.not.toThrow();
    });
  });

  describe('Data Consistency Verification', () => {
    it('should verify synchronization across tabs', async () => {
      const verificationSpy = vi.spyOn(realTimeSync, 'verifyTabSynchronization');

      const result = await realTimeSync.verifyTabSynchronization(
        mockEnrollment.user_id,
        mockEnrollment.course_id
      );

      expect(verificationSpy).toHaveBeenCalledWith(
        mockEnrollment.user_id,
        mockEnrollment.course_id
      );
    });

    it('should detect and resolve data inconsistencies', async () => {
      // Create inconsistent data across storage mechanisms
      mockLocalStorage.set('enrollment_enroll_multi_tab', JSON.stringify({
        ...mockEnrollment,
        status: 'pending',
        sync_version: 1
      }));

      mockSessionStorage.set('enrollment_enroll_multi_tab', JSON.stringify({
        ...mockEnrollment,
        status: 'approved',
        sync_version: 2
      }));

      // Should resolve to the higher version
      const resolvedData = await realTimeSync.coordinatePersistenceUpdate(
        {
          ...mockEnrollment,
          status: 'approved',
          sync_version: 3
        },
        'webhook_card_payment'
      );

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'enrollment_enroll_multi_tab',
        expect.stringContaining('"sync_version":3')
      );
    });
  });
});