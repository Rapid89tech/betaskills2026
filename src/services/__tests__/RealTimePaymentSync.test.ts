/**
 * Comprehensive Test Suite for RealTimePaymentSync Service
 * 
 * Tests all functionality including cross-component updates, cross-tab sync,
 * WebSocket integration, and event broadcasting.
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { PaymentStatus, EnrollmentStatus } from '@/types/ikhokha';

// Mock Supabase client
const mockSupabase = {
  from: vi.fn(),
  channel: vi.fn(),
};

const mockChannel = {
  on: vi.fn().mockReturnThis(),
  subscribe: vi.fn().mockReturnThis(),
  unsubscribe: vi.fn(),
};

const mockQuery = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  update: vi.fn(),
};

// Mock BroadcastChannel
class MockBroadcastChannel {
  name: string;
  onmessage: ((event: MessageEvent) => void) | null = null;
  
  constructor(name: string) {
    this.name = name;
  }
  
  postMessage(data: any) {
    // Simulate message posting
    if (this.onmessage) {
      this.onmessage({ data } as MessageEvent);
    }
  }
  
  addEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (type === 'message') {
      this.onmessage = listener;
    }
  }
  
  removeEventListener() {
    this.onmessage = null;
  }
  
  close() {
    // Mock close
  }
}

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock window events
const mockWindowEvents: { [key: string]: EventListener[] } = {};
const mockAddEventListener = vi.fn((type: string, listener: EventListener) => {
  if (!mockWindowEvents[type]) {
    mockWindowEvents[type] = [];
  }
  mockWindowEvents[type].push(listener);
});

const mockRemoveEventListener = vi.fn((type: string, listener: EventListener) => {
  if (mockWindowEvents[type]) {
    const index = mockWindowEvents[type].indexOf(listener);
    if (index > -1) {
      mockWindowEvents[type].splice(index, 1);
    }
  }
});

const mockDispatchEvent = vi.fn((event: Event) => {
  const listeners = mockWindowEvents[event.type] || [];
  listeners.forEach(listener => listener(event));
});

// Mock the entire module before importing
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
      update: vi.fn().mockResolvedValue({ data: null, error: null })
    }),
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
      unsubscribe: vi.fn()
    })
  }
}));

// Import after mocking
const { RealTimePaymentSync } = await import('../RealTimePaymentSync');

describe('RealTimePaymentSync', () => {
  let service: RealTimePaymentSync;
  let mockEnrollmentData: any;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Mock global objects
    global.BroadcastChannel = MockBroadcastChannel as any;
    global.localStorage = mockLocalStorage as any;
    global.window = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: mockDispatchEvent,
    } as any;

    // Sample enrollment data
    mockEnrollmentData = {
      id: 'enrollment-123',
      user_id: 'user-456',
      course_id: 'course-789',
      status: 'pending',
      payment_status: 'pending',
      payment_type: 'card',
      amount: 100,
      currency: 'ZAR',
      ikhokha_payment_id: 'payment-123',
      user_email: 'test@example.com',
      course_title: 'Test Course'
    };

    // Create a fresh service instance by clearing the singleton
    (RealTimePaymentSync as any).instance = undefined;
    service = RealTimePaymentSync.getInstance();
  });

  afterEach(() => {
    if (service) {
      service.cleanup();
    }
    vi.restoreAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = RealTimePaymentSync.getInstance();
      const instance2 = RealTimePaymentSync.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Initialization', () => {
    it('should initialize successfully', async () => {
      await service.initialize();
      
      expect(mockSupabase.channel).toHaveBeenCalledWith('enrollment_changes');
      expect(mockChannel.on).toHaveBeenCalled();
      expect(mockChannel.subscribe).toHaveBeenCalled();
    });

    it('should handle initialization errors', async () => {
      // Create a new service instance that will fail
      (RealTimePaymentSync as any).instance = undefined;
      mockSupabase.channel.mockImplementation(() => {
        throw new Error('Connection failed');
      });

      const failingService = RealTimePaymentSync.getInstance();
      await expect(failingService.initialize()).rejects.toThrow('Connection failed');
    });

    it('should not initialize twice', async () => {
      await service.initialize();
      await service.initialize(); // Second call

      // Should only be called once
      expect(mockSupabase.channel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Payment Status Synchronization', () => {
    beforeEach(async () => {
      await service.initialize();
    });

    it('should sync payment status successfully', async () => {
      // Mock successful enrollment fetch
      mockQuery.single.mockResolvedValue({
        data: mockEnrollmentData,
        error: null
      });

      // Mock successful update
      mockQuery.update.mockResolvedValue({
        data: { ...mockEnrollmentData, payment_status: 'completed' },
        error: null
      });

      const statusCallback = vi.fn();
      service.subscribeToStatusUpdates(statusCallback);

      await service.syncPaymentStatus('payment-123', PaymentStatus.COMPLETED);

      expect(mockSupabase.from).toHaveBeenCalledWith('enrollments');
      expect(mockQuery.eq).toHaveBeenCalledWith('ikhokha_payment_id', 'payment-123');
      expect(mockQuery.update).toHaveBeenCalledWith({
        payment_status: PaymentStatus.COMPLETED,
        updated_at: expect.any(String)
      });
      expect(statusCallback).toHaveBeenCalled();
    });

    it('should handle payment sync errors gracefully', async () => {
      mockQuery.single.mockResolvedValue({
        data: null,
        error: { message: 'Enrollment not found' }
      });

      await expect(service.syncPaymentStatus('invalid-payment', PaymentStatus.COMPLETED))
        .resolves.not.toThrow();
    });

    it('should broadcast payment status updates', async () => {
      mockQuery.single.mockResolvedValue({
        data: mockEnrollmentData,
        error: null
      });
      mockQuery.update.mockResolvedValue({ data: mockEnrollmentData, error: null });

      const statusCallback = vi.fn();
      service.subscribeToStatusUpdates(statusCallback);

      await service.syncPaymentStatus('payment-123', PaymentStatus.COMPLETED);

      expect(statusCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'payment',
          target_user_id: 'user-456',
          enrollment_id: 'enrollment-123',
          course_id: 'course-789',
          new_status: PaymentStatus.COMPLETED,
          source: 'payment_webhook'
        })
      );
    });
  });

  describe('Enrollment Status Synchronization', () => {
    beforeEach(async () => {
      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });
      await service.initialize();
    });

    it('should sync enrollment status successfully', async () => {
      mockQuery.single.mockResolvedValue({
        data: mockEnrollmentData,
        error: null
      });
      mockQuery.update.mockResolvedValue({
        data: { ...mockEnrollmentData, status: 'approved' },
        error: null
      });

      const statusCallback = vi.fn();
      service.subscribeToStatusUpdates(statusCallback);

      await service.syncEnrollmentStatus('enrollment-123', EnrollmentStatus.APPROVED);

      expect(mockQuery.update).toHaveBeenCalledWith({
        status: EnrollmentStatus.APPROVED,
        updated_at: expect.any(String),
        course_access_granted: true,
        access_granted_at: expect.any(String)
      });
      expect(statusCallback).toHaveBeenCalled();
    });

    it('should handle enrollment sync errors', async () => {
      mockQuery.single.mockRejectedValue(new Error('Database error'));

      await expect(service.syncEnrollmentStatus('enrollment-123', EnrollmentStatus.APPROVED))
        .rejects.toThrow('Database error');
    });
  });

  describe('Event Broadcasting', () => {
    beforeEach(async () => {
      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });
      await service.initialize();
    });

    it('should broadcast status updates to all listeners', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      service.subscribeToStatusUpdates(callback1);
      service.subscribeToStatusUpdates(callback2);

      const update = {
        type: 'enrollment' as const,
        target_user_id: 'user-456',
        enrollment_id: 'enrollment-123',
        course_id: 'course-789',
        new_status: 'approved',
        timestamp: new Date(),
        source: 'system' as const
      };

      service.broadcastStatusUpdate(update);

      expect(callback1).toHaveBeenCalledWith(update);
      expect(callback2).toHaveBeenCalledWith(update);
    });

    it('should handle callback errors gracefully', () => {
      const errorCallback = vi.fn(() => {
        throw new Error('Callback error');
      });
      const normalCallback = vi.fn();
      
      service.subscribeToStatusUpdates(errorCallback);
      service.subscribeToStatusUpdates(normalCallback);

      const update = {
        type: 'enrollment' as const,
        target_user_id: 'user-456',
        enrollment_id: 'enrollment-123',
        course_id: 'course-789',
        new_status: 'approved',
        timestamp: new Date(),
        source: 'system' as const
      };

      expect(() => service.broadcastStatusUpdate(update)).not.toThrow();
      expect(normalCallback).toHaveBeenCalled();
    });

    it('should dispatch custom events', () => {
      const update = {
        type: 'enrollment' as const,
        target_user_id: 'user-456',
        enrollment_id: 'enrollment-123',
        course_id: 'course-789',
        old_status: 'pending',
        new_status: 'approved',
        timestamp: new Date(),
        source: 'system' as const
      };

      service.broadcastStatusUpdate(update);

      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'enrollment-status-changed'
        })
      );
    });
  });

  describe('User-Specific Updates', () => {
    beforeEach(async () => {
      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });
      await service.initialize();
    });

    it('should broadcast to specific users', () => {
      const userCallback = vi.fn();
      service.subscribeToUserUpdates('user-456', userCallback);

      const update = {
        userId: 'user-456',
        type: 'enrollment_status_changed' as const,
        data: { enrollmentId: 'enrollment-123', status: 'approved' },
        timestamp: new Date()
      };

      service.broadcastToUser('user-456', update);

      expect(userCallback).toHaveBeenCalledWith(update);
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'user-enrollment-update'
        })
      );
    });

    it('should not broadcast to other users', () => {
      const userCallback = vi.fn();
      service.subscribeToUserUpdates('user-123', userCallback);

      const update = {
        userId: 'user-456',
        type: 'enrollment_status_changed' as const,
        data: { enrollmentId: 'enrollment-123', status: 'approved' },
        timestamp: new Date()
      };

      service.broadcastToUser('user-456', update);

      expect(userCallback).not.toHaveBeenCalled();
    });
  });

  describe('Admin Updates', () => {
    beforeEach(async () => {
      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });
      await service.initialize();
    });

    it('should broadcast to admin users', () => {
      const adminCallback = vi.fn();
      service.subscribeToAdminUpdates(adminCallback);

      const update = {
        type: 'new_eft_enrollment' as const,
        enrollmentId: 'enrollment-123',
        userEmail: 'test@example.com',
        courseName: 'Test Course',
        timestamp: new Date()
      };

      service.broadcastToAdmins(update);

      expect(adminCallback).toHaveBeenCalledWith(update);
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'admin-enrollment-update'
        })
      );
    });
  });

  describe('Cross-Tab Synchronization', () => {
    beforeEach(async () => {
      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });
      await service.initialize();
    });

    it('should sync data across tabs using BroadcastChannel', () => {
      const syncData = {
        userId: 'user-456',
        enrollmentId: 'enrollment-123',
        courseId: 'course-789',
        status: EnrollmentStatus.APPROVED,
        timestamp: new Date(),
        source: 'system'
      };

      // Mock BroadcastChannel postMessage
      const broadcastSpy = vi.spyOn(service['broadcastChannel'], 'postMessage');

      service.syncAcrossTabs('user-456', syncData);

      expect(broadcastSpy).toHaveBeenCalledWith({
        type: 'enrollment_sync',
        userId: 'user-456',
        data: syncData,
        timestamp: expect.any(Date)
      });
    });

    it('should use localStorage as fallback', () => {
      const syncData = {
        userId: 'user-456',
        enrollmentId: 'enrollment-123',
        courseId: 'course-789',
        status: EnrollmentStatus.APPROVED,
        timestamp: new Date(),
        source: 'system'
      };

      service.syncAcrossTabs('user-456', syncData);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        expect.stringMatching(/^enrollment_sync_user-456_/),
        JSON.stringify(syncData)
      );
    });

    it('should clean up localStorage entries', (done) => {
      const syncData = {
        userId: 'user-456',
        enrollmentId: 'enrollment-123',
        courseId: 'course-789',
        status: EnrollmentStatus.APPROVED,
        timestamp: new Date(),
        source: 'system'
      };

      service.syncAcrossTabs('user-456', syncData);

      // Check that cleanup is scheduled
      setTimeout(() => {
        expect(mockLocalStorage.removeItem).toHaveBeenCalled();
        done();
      }, 5100); // Slightly more than the 5000ms timeout
    });
  });

  describe('Supabase Real-time Integration', () => {
    it('should handle Supabase change events', async () => {
      let changeHandler: (payload: any) => void;
      
      mockChannel.on.mockImplementation((event, config, handler) => {
        changeHandler = handler;
        return mockChannel;
      });

      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });

      const statusCallback = vi.fn();
      service.subscribeToStatusUpdates(statusCallback);

      await service.initialize();

      // Simulate Supabase change event
      const payload = {
        eventType: 'UPDATE',
        new: { ...mockEnrollmentData, status: 'approved' },
        old: mockEnrollmentData
      };

      changeHandler!(payload);

      expect(statusCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'enrollment',
          target_user_id: 'user-456',
          enrollment_id: 'enrollment-123',
          old_status: 'pending',
          new_status: 'approved'
        })
      );
    });

    it('should handle INSERT events for EFT enrollments', async () => {
      let changeHandler: (payload: any) => void;
      
      mockChannel.on.mockImplementation((event, config, handler) => {
        changeHandler = handler;
        return mockChannel;
      });

      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });

      const adminCallback = vi.fn();
      service.subscribeToAdminUpdates(adminCallback);

      await service.initialize();

      // Simulate EFT enrollment INSERT
      const payload = {
        eventType: 'INSERT',
        new: { ...mockEnrollmentData, payment_type: 'eft', status: 'pending' }
      };

      changeHandler!(payload);

      expect(adminCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'new_eft_enrollment',
          enrollmentId: 'enrollment-123',
          userEmail: 'test@example.com',
          courseName: 'Test Course'
        })
      );
    });
  });

  describe('Subscription Management', () => {
    beforeEach(async () => {
      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });
      await service.initialize();
    });

    it('should return unsubscribe functions', () => {
      const callback = vi.fn();
      const unsubscribe = service.subscribeToStatusUpdates(callback);

      expect(typeof unsubscribe).toBe('function');

      // Test unsubscribe
      unsubscribe();
      
      const update = {
        type: 'enrollment' as const,
        target_user_id: 'user-456',
        enrollment_id: 'enrollment-123',
        course_id: 'course-789',
        new_status: 'approved',
        timestamp: new Date(),
        source: 'system' as const
      };

      service.broadcastStatusUpdate(update);
      expect(callback).not.toHaveBeenCalled();
    });

    it('should clean up user listeners when no more callbacks', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      const unsubscribe1 = service.subscribeToUserUpdates('user-456', callback1);
      const unsubscribe2 = service.subscribeToUserUpdates('user-456', callback2);

      // Unsubscribe first callback
      unsubscribe1();
      
      // User should still have listeners
      expect(service['userListeners'].has('user-456')).toBe(true);

      // Unsubscribe second callback
      unsubscribe2();
      
      // User listeners should be cleaned up
      expect(service['userListeners'].has('user-456')).toBe(false);
    });
  });

  describe('Health Status', () => {
    it('should return health status', async () => {
      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });

      await service.initialize();

      const callback1 = vi.fn();
      const callback2 = vi.fn();
      service.subscribeToStatusUpdates(callback1);
      service.subscribeToUserUpdates('user-456', callback2);
      service.subscribeToAdminUpdates(vi.fn());

      const health = service.getHealthStatus();

      expect(health).toEqual({
        initialized: true,
        listenersCount: 1,
        userListenersCount: 1,
        adminListenersCount: 1,
        supabaseConnected: true
      });
    });
  });

  describe('Cleanup', () => {
    it('should cleanup all resources', async () => {
      mockChannel.subscribe.mockImplementation((callback) => {
        callback('SUBSCRIBED');
        return mockChannel;
      });

      await service.initialize();

      const callback = vi.fn();
      service.subscribeToStatusUpdates(callback);
      service.subscribeToUserUpdates('user-456', vi.fn());
      service.subscribeToAdminUpdates(vi.fn());

      service.cleanup();

      expect(mockChannel.unsubscribe).toHaveBeenCalled();
      expect(service.getHealthStatus().initialized).toBe(false);
      expect(service.getHealthStatus().listenersCount).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle Supabase subscription errors', async () => {
      mockSupabase.channel.mockImplementation(() => {
        throw new Error('Supabase error');
      });

      await expect(service.initialize()).rejects.toThrow('Supabase error');
    });

    it('should handle BroadcastChannel errors gracefully', () => {
      // Mock BroadcastChannel to throw error
      const originalBroadcastChannel = global.BroadcastChannel;
      global.BroadcastChannel = class {
        constructor() {
          throw new Error('BroadcastChannel not supported');
        }
      } as any;

      expect(() => {
        new (RealTimePaymentSync as any)();
      }).toThrow('BroadcastChannel not supported');

      // Restore
      global.BroadcastChannel = originalBroadcastChannel;
    });
  });
});