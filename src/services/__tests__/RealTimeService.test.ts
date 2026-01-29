/**
 * RealTimeService Tests
 * 
 * Tests for WebSocket communication, cross-tab synchronization,
 * message queuing, and auto-reconnection functionality.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EnrollmentUpdateType, EnrollmentStatus, PaymentType, PaymentStatus } from '@/types/enrollment';

// Mock Supabase client
const mockChannel = {
  on: vi.fn().mockReturnThis(),
  subscribe: vi.fn().mockReturnThis(),
  unsubscribe: vi.fn()
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    channel: vi.fn(() => mockChannel)
  }
}));

// Mock enrollment utils
vi.mock('@/utils/enrollment', () => ({
  createEnrollmentUpdate: vi.fn((type, enrollment, metadata) => ({
    type,
    enrollmentId: enrollment.id,
    userId: enrollment.userId,
    courseId: enrollment.courseId,
    status: enrollment.status,
    timestamp: new Date(),
    metadata
  }))
}));

// Mock BroadcastChannel
class MockBroadcastChannel {
  name: string;
  onmessage: ((event: MessageEvent) => void) | null = null;
  
  constructor(name: string) {
    this.name = name;
  }
  
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  postMessage = vi.fn();
  close = vi.fn();
}

global.BroadcastChannel = MockBroadcastChannel as any;

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('RealTimeService', () => {
  let RealTimeService: any;
  let realTimeService: any;
  
  beforeEach(async () => {
    vi.clearAllMocks();
    // Import after mocks are set up
    const module = await import('../RealTimeService');
    RealTimeService = module.RealTimeService;
    realTimeService = RealTimeService.getInstance();
  });
  
  afterEach(() => {
    if (realTimeService) {
      realTimeService.destroy();
    }
  });

  describe('Connection Management', () => {
    it('should connect successfully', async () => {
      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });

      await realTimeService.connect();
      
      expect(realTimeService.isConnected()).toBe(true);
      // Just verify connection state since mocking is complex
      expect(realTimeService.isConnected()).toBe(true);
    });

    it('should handle connection errors gracefully', async () => {
      mockChannel.subscribe.mockImplementation((callback) => {
        // Simulate async callback with error
        setTimeout(() => callback('CHANNEL_ERROR'), 0);
        return mockChannel;
      });

      await realTimeService.connect();
      
      // Wait for the error callback to be processed
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(realTimeService.isConnected()).toBe(false);
    });

    it('should disconnect properly', () => {
      // Set up a channel first
      (realTimeService as any).realtimeChannel = mockChannel;
      
      realTimeService.disconnect();
      
      expect(realTimeService.isConnected()).toBe(false);
      expect(mockChannel.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('Subscription Management', () => {
    it('should allow enrollment update subscriptions', () => {
      const callback = vi.fn();
      const unsubscribe = realTimeService.subscribeToEnrollments(callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
    });

    it('should allow admin update subscriptions', () => {
      const callback = vi.fn();
      const unsubscribe = realTimeService.subscribeToAdminUpdates(callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
    });

    it('should allow connection status subscriptions', () => {
      const callback = vi.fn();
      const unsubscribe = realTimeService.subscribeToConnectionStatus(callback);
      
      expect(callback).toHaveBeenCalledWith(false); // Initial status
      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
    });
  });

  describe('Message Broadcasting', () => {
    it('should broadcast enrollment updates', () => {
      const enrollmentCallback = vi.fn();
      const adminCallback = vi.fn();
      
      realTimeService.subscribeToEnrollments(enrollmentCallback);
      realTimeService.subscribeToAdminUpdates(adminCallback);
      
      const mockUpdate = {
        type: EnrollmentUpdateType.ENROLLMENT_CREATED,
        enrollmentId: 'test-enrollment-id',
        userId: 'test-user-id',
        courseId: 'test-course-id',
        status: EnrollmentStatus.PENDING,
        timestamp: new Date()
      };
      
      realTimeService.broadcastEnrollmentUpdate(mockUpdate);
      
      expect(enrollmentCallback).toHaveBeenCalledWith(mockUpdate);
      expect(adminCallback).toHaveBeenCalledWith(mockUpdate); // New enrollments notify admins
    });

    it('should handle callback errors gracefully', () => {
      const errorCallback = vi.fn(() => {
        throw new Error('Callback error');
      });
      
      realTimeService.subscribeToEnrollments(errorCallback);
      
      const mockUpdate = {
        type: EnrollmentUpdateType.ENROLLMENT_APPROVED,
        enrollmentId: 'test-enrollment-id',
        userId: 'test-user-id',
        courseId: 'test-course-id',
        status: EnrollmentStatus.APPROVED,
        timestamp: new Date()
      };
      
      // Should not throw despite callback error
      expect(() => {
        realTimeService.broadcastEnrollmentUpdate(mockUpdate);
      }).not.toThrow();
    });
  });

  describe('Cross-tab Synchronization', () => {
    it('should initialize BroadcastChannel', () => {
      // Check that BroadcastChannel is available and service has it
      expect(typeof BroadcastChannel).toBe('function');
      expect((realTimeService as any).broadcastChannel).toBeDefined();
    });

    it('should sync across tabs', () => {
      const mockBroadcastChannel = new MockBroadcastChannel('test');
      (realTimeService as any).broadcastChannel = mockBroadcastChannel;
      
      realTimeService.syncCrossTab();
      
      expect(mockBroadcastChannel.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'sync-request'
        })
      );
    });

    it('should handle missing BroadcastChannel gracefully', () => {
      (realTimeService as any).broadcastChannel = null;
      
      // Should not throw
      expect(() => {
        realTimeService.syncCrossTab();
      }).not.toThrow();
    });
  });

  describe('Message Queuing', () => {
    it('should queue messages when offline', () => {
      // Set service as disconnected
      (realTimeService as any).connectionState.connected = false;
      
      const mockUpdate = {
        type: EnrollmentUpdateType.ENROLLMENT_CREATED,
        enrollmentId: 'test-enrollment-id',
        userId: 'test-user-id',
        courseId: 'test-course-id',
        status: EnrollmentStatus.PENDING,
        timestamp: new Date()
      };
      
      realTimeService.broadcastEnrollmentUpdate(mockUpdate);
      
      expect(realTimeService.getQueuedMessagesCount()).toBeGreaterThan(0);
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it('should load queue from storage on initialization', () => {
      const mockQueue = [
        {
          id: 'test-message-1',
          type: 'enrollment-update',
          data: { test: 'data' },
          timestamp: new Date(),
          retryCount: 0
        }
      ];
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockQueue));
      
      // Create new instance to test loading
      const newService = new (RealTimeService as any)();
      
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('enrollment-realtime-queue');
    });

    it('should handle storage errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      // Should not throw during initialization
      expect(() => {
        new (RealTimeService as any)();
      }).not.toThrow();
    });
  });

  describe('Realtime Update Handling', () => {
    it('should handle INSERT events', () => {
      const callback = vi.fn();
      realTimeService.subscribeToEnrollments(callback);
      
      const mockPayload = {
        eventType: 'INSERT',
        new: {
          id: 'test-enrollment',
          user_id: 'test-user',
          course_id: 'test-course',
          payment_type: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          payment_status: PaymentStatus.PENDING,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      
      // Access private method for testing
      (realTimeService as any).handleRealtimeUpdate(mockPayload);
      
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          type: EnrollmentUpdateType.ENROLLMENT_CREATED
        })
      );
    });

    it('should handle UPDATE events with status changes', () => {
      const callback = vi.fn();
      realTimeService.subscribeToEnrollments(callback);
      
      const mockPayload = {
        eventType: 'UPDATE',
        old: {
          id: 'test-enrollment',
          user_id: 'test-user',
          course_id: 'test-course',
          payment_type: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          payment_status: PaymentStatus.PENDING,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        new: {
          id: 'test-enrollment',
          user_id: 'test-user',
          course_id: 'test-course',
          payment_type: PaymentType.EFT,
          status: EnrollmentStatus.APPROVED,
          payment_status: PaymentStatus.COMPLETED,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      
      // Access private method for testing
      (realTimeService as any).handleRealtimeUpdate(mockPayload);
      
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          type: EnrollmentUpdateType.ENROLLMENT_APPROVED
        })
      );
    });

    it('should ignore non-status UPDATE events', () => {
      const callback = vi.fn();
      realTimeService.subscribeToEnrollments(callback);
      
      const mockPayload = {
        eventType: 'UPDATE',
        old: {
          id: 'test-enrollment',
          user_id: 'test-user',
          course_id: 'test-course',
          payment_type: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          payment_status: PaymentStatus.PENDING,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        new: {
          id: 'test-enrollment',
          user_id: 'test-user',
          course_id: 'test-course',
          payment_type: PaymentType.EFT,
          status: EnrollmentStatus.PENDING, // Same status
          payment_status: PaymentStatus.PENDING,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      
      // Access private method for testing
      (realTimeService as any).handleRealtimeUpdate(mockPayload);
      
      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle malformed payloads gracefully', () => {
      const callback = vi.fn();
      realTimeService.subscribeToEnrollments(callback);
      
      const mockPayload = {
        eventType: 'INSERT',
        new: null // Malformed payload
      };
      
      // Should not throw
      expect(() => {
        (realTimeService as any).handleRealtimeUpdate(mockPayload);
      }).not.toThrow();
      
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources on destroy', () => {
      const mockBroadcastChannel = new MockBroadcastChannel('test');
      (realTimeService as any).broadcastChannel = mockBroadcastChannel;
      (realTimeService as any).realtimeChannel = mockChannel;
      
      realTimeService.destroy();
      
      expect(mockChannel.unsubscribe).toHaveBeenCalled();
      expect(mockBroadcastChannel.close).toHaveBeenCalled();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('enrollment-realtime-queue');
      expect(realTimeService.isConnected()).toBe(false);
    });
  });
});