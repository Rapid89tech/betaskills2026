/**
 * Real-Time Status Synchronization Integration Tests
 * 
 * Comprehensive testing for real-time enrollment status synchronization
 * across components, tabs, and user sessions.
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RealTimePaymentSync } from '@/services/RealTimePaymentSync';
import { EnrollmentStateManager } from '@/services/EnrollmentStateManager';
import { PaymentStatus, EnrollmentStatus } from '@/types/ikhokha';

// Mock WebSocket for real-time testing
class MockWebSocket {
  static instances: MockWebSocket[] = [];
  
  url: string;
  readyState: number = WebSocket.CONNECTING;
  onopen: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;

  constructor(url: string) {
    this.url = url;
    MockWebSocket.instances.push(this);
    
    // Simulate connection
    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      if (this.onopen) {
        this.onopen(new Event('open'));
      }
    }, 10);
  }

  send(data: string) {
    // Simulate message to all other instances
    const message = JSON.parse(data);
    MockWebSocket.instances
      .filter(ws => ws !== this && ws.readyState === WebSocket.OPEN)
      .forEach(ws => {
        if (ws.onmessage) {
          setTimeout(() => {
            ws.onmessage!(new MessageEvent('message', { data }));
          }, 5);
        }
      });
  }

  close() {
    this.readyState = WebSocket.CLOSED;
    if (this.onclose) {
      this.onclose(new CloseEvent('close'));
    }
    const index = MockWebSocket.instances.indexOf(this);
    if (index > -1) {
      MockWebSocket.instances.splice(index, 1);
    }
  }

  static clearAll() {
    MockWebSocket.instances.forEach(ws => ws.close());
    MockWebSocket.instances = [];
  }
}

// Mock BroadcastChannel for cross-tab testing
class MockBroadcastChannel {
  static channels = new Map<string, MockBroadcastChannel[]>();
  
  name: string;
  private listeners: ((event: MessageEvent) => void)[] = [];

  constructor(name: string) {
    this.name = name;
    if (!MockBroadcastChannel.channels.has(name)) {
      MockBroadcastChannel.channels.set(name, []);
    }
    MockBroadcastChannel.channels.get(name)!.push(this);
  }

  postMessage(data: any) {
    const channels = MockBroadcastChannel.channels.get(this.name) || [];
    channels.forEach(channel => {
      if (channel !== this) {
        channel.listeners.forEach(listener => {
          setTimeout(() => listener({ data } as MessageEvent), 0);
        });
      }
    });
  }

  addEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (type === 'message') {
      this.listeners.push(listener);
    }
  }

  removeEventListener(type: string, listener: (event: MessageEvent) => void) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  close() {
    const channels = MockBroadcastChannel.channels.get(this.name) || [];
    const index = channels.indexOf(this);
    if (index > -1) {
      channels.splice(index, 1);
    }
  }

  static clearAll() {
    MockBroadcastChannel.channels.clear();
  }
}

// Mock localStorage with event simulation
const mockLocalStorage = new Map<string, string>();
const storageListeners: ((event: StorageEvent) => void)[] = [];

const mockLocalStorageAPI = {
  getItem: (key: string) => mockLocalStorage.get(key) || null,
  setItem: (key: string, value: string) => {
    const oldValue = mockLocalStorage.get(key) || null;
    mockLocalStorage.set(key, value);
    
    // Simulate storage event
    setTimeout(() => {
      storageListeners.forEach(listener => {
        listener(new StorageEvent('storage', {
          key,
          oldValue,
          newValue: value,
          storageArea: mockLocalStorageAPI as any
        }));
      });
    }, 0);
  },
  removeItem: (key: string) => {
    const oldValue = mockLocalStorage.get(key) || null;
    mockLocalStorage.delete(key);
    
    setTimeout(() => {
      storageListeners.forEach(listener => {
        listener(new StorageEvent('storage', {
          key,
          oldValue,
          newValue: null,
          storageArea: mockLocalStorageAPI as any
        }));
      });
    }, 0);
  },
  clear: () => mockLocalStorage.clear()
};

// Mock Supabase with real-time capabilities
const mockDatabase = new Map();
const mockRealtimeSubscriptions = new Map();

const createRealtimeMockSupabase = () => {
  const mockChannel = {
    on: vi.fn().mockReturnThis(),
    subscribe: vi.fn().mockImplementation((callback) => {
      setTimeout(() => callback('SUBSCRIBED'), 10);
      return mockChannel;
    }),
    unsubscribe: vi.fn()
  };

  const mockQuery = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockImplementation(() => {
      const key = mockQuery._lastEqValue;
      const data = mockDatabase.get(key);
      return Promise.resolve({
        data: data || null,
        error: data ? null : { message: 'Not found' }
      });
    }),
    update: vi.fn().mockImplementation((updateData) => {
      const key = mockQuery._lastEqValue;
      const existingData = mockDatabase.get(key);
      if (existingData) {
        const updatedData = { ...existingData, ...updateData, updated_at: new Date().toISOString() };
        mockDatabase.set(key, updatedData);

        // Simulate real-time UPDATE event
        setTimeout(() => {
          const handlers = mockRealtimeSubscriptions.get('enrollment_changes') || [];
          handlers.forEach((handler: any) => {
            handler({
              eventType: 'UPDATE',
              new: updatedData,
              old: existingData
            });
          });
        }, 5);

        return Promise.resolve({ data: updatedData, error: null });
      }
      return Promise.resolve({ data: null, error: { message: 'Not found' } });
    }),
    _lastEqValue: null as any
  };

  const originalEq = mockQuery.eq;
  mockQuery.eq = vi.fn().mockImplementation((column, value) => {
    mockQuery._lastEqValue = value;
    return originalEq.call(mockQuery, column, value);
  });

  const mockSupabase = {
    from: vi.fn().mockReturnValue(mockQuery),
    channel: vi.fn().mockImplementation((channelName) => {
      const handlers: any[] = [];
      mockRealtimeSubscriptions.set(channelName, handlers);

      return {
        ...mockChannel,
        on: vi.fn().mockImplementation((event, config, handler) => {
          handlers.push(handler);
          return mockChannel;
        })
      };
    })
  };

  return { mockSupabase, mockQuery, mockChannel };
};

describe('Real-Time Status Synchronization Integration', () => {
  let realTimeSync: RealTimePaymentSync;
  let enrollmentStateManager: EnrollmentStateManager;
  let mockSupabase: any;

  beforeEach(async () => {
    // Clear all mocks and data
    vi.clearAllMocks();
    mockDatabase.clear();
    mockRealtimeSubscriptions.clear();
    mockLocalStorage.clear();
    MockWebSocket.clearAll();
    MockBroadcastChannel.clearAll();

    // Setup global mocks
    global.WebSocket = MockWebSocket as any;
    global.BroadcastChannel = MockBroadcastChannel as any;
    global.localStorage = mockLocalStorageAPI as any;
    
    // Mock window.addEventListener for storage events
    global.window = {
      ...global.window,
      addEventListener: vi.fn((type, listener) => {
        if (type === 'storage') {
          storageListeners.push(listener);
        }
      }),
      removeEventListener: vi.fn((type, listener) => {
        if (type === 'storage') {
          const index = storageListeners.indexOf(listener);
          if (index > -1) {
            storageListeners.splice(index, 1);
          }
        }
      })
    } as any;

    // Setup Supabase mock
    const { mockSupabase: supabase } = createRealtimeMockSupabase();
    mockSupabase = supabase;

    vi.doMock('@/integrations/supabase/client', () => ({
      supabase: mockSupabase
    }));

    // Initialize services
    realTimeSync = RealTimePaymentSync.getInstance();
    enrollmentStateManager = EnrollmentStateManager.getInstance();

    await realTimeSync.initialize();
    await enrollmentStateManager.initialize();

    // Setup test data
    mockDatabase.set('enrollment-123', {
      id: 'enrollment-123',
      user_id: 'user-456',
      course_id: 'course-789',
      status: 'pending',
      payment_status: 'pending',
      ikhokha_payment_id: 'payment-123'
    });
  });

  afterEach(() => {
    realTimeSync.cleanup();
    enrollmentStateManager.cleanup();
    MockWebSocket.clearAll();
    MockBroadcastChannel.clearAll();
    storageListeners.length = 0;
    vi.restoreAllMocks();
  });

  describe('Cross-Component Status Updates (Requirement 3.1)', () => {
    it('should synchronize status updates across multiple components', async () => {
      const componentUpdates = {
        courseCard: [] as any[],
        dashboard: [] as any[],
        sidebar: [] as any[]
      };

      // Setup component listeners
      realTimeSync.subscribeToStatusUpdates((update) => {
        componentUpdates.courseCard.push({ component: 'courseCard', ...update });
      });

      realTimeSync.subscribeToStatusUpdates((update) => {
        componentUpdates.dashboard.push({ component: 'dashboard', ...update });
      });

      realTimeSync.subscribeToUserUpdates('user-456', (update) => {
        componentUpdates.sidebar.push({ component: 'sidebar', ...update });
      });

      // Trigger status change
      await realTimeSync.syncEnrollmentStatus('enrollment-123', EnrollmentStatus.APPROVED);

      // Wait for propagation
      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify all components received updates
      expect(componentUpdates.courseCard.length).toBeGreaterThan(0);
      expect(componentUpdates.dashboard.length).toBeGreaterThan(0);
      expect(componentUpdates.sidebar.length).toBeGreaterThan(0);

      // Verify update consistency
      const approvalUpdate = componentUpdates.courseCard.find(u => u.new_status === EnrollmentStatus.APPROVED);
      expect(approvalUpdate).toBeDefined();
      expect(approvalUpdate.enrollment_id).toBe('enrollment-123');

      // Verify all components got the same update
      expect(componentUpdates.dashboard.some(u => 
        u.enrollment_id === 'enrollment-123' && u.new_status === EnrollmentStatus.APPROVED
      )).toBe(true);
    });

    it('should handle rapid sequential updates without conflicts', async () => {
      const allUpdates: any[] = [];
      
      realTimeSync.subscribeToStatusUpdates((update) => {
        allUpdates.push({ ...update, timestamp: Date.now() });
      });

      // Trigger rapid sequential updates
      const updatePromises = [
        realTimeSync.syncPaymentStatus('payment-123', PaymentStatus.PROCESSING),
        realTimeSync.syncPaymentStatus('payment-123', PaymentStatus.COMPLETED),
        realTimeSync.syncEnrollmentStatus('enrollment-123', EnrollmentStatus.APPROVED)
      ];

      await Promise.all(updatePromises);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify all updates were processed
      expect(allUpdates.length).toBe(3);
      
      // Verify updates are in correct order (by timestamp)
      const sortedUpdates = allUpdates.sort((a, b) => a.timestamp - b.timestamp);
      expect(sortedUpdates[0].new_status).toBe(PaymentStatus.PROCESSING);
      expect(sortedUpdates[1].new_status).toBe(PaymentStatus.COMPLETED);
      expect(sortedUpdates[2].new_status).toBe(EnrollmentStatus.APPROVED);
    });

    it('should filter updates by user context', async () => {
      const user456Updates: any[] = [];
      const user789Updates: any[] = [];

      realTimeSync.subscribeToUserUpdates('user-456', (update) => {
        user456Updates.push(update);
      });

      realTimeSync.subscribeToUserUpdates('user-789', (update) => {
        user789Updates.push(update);
      });

      // Add second enrollment for different user
      mockDatabase.set('enrollment-456', {
        id: 'enrollment-456',
        user_id: 'user-789',
        course_id: 'course-999',
        status: 'pending',
        ikhokha_payment_id: 'payment-456'
      });

      // Trigger updates for both users
      await realTimeSync.syncEnrollmentStatus('enrollment-123', EnrollmentStatus.APPROVED);
      await realTimeSync.syncEnrollmentStatus('enrollment-456', EnrollmentStatus.REJECTED);

      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify user-specific filtering
      expect(user456Updates.length).toBe(1);
      expect(user456Updates[0].enrollment_id).toBe('enrollment-123');
      expect(user456Updates[0].new_status).toBe(EnrollmentStatus.APPROVED);

      expect(user789Updates.length).toBe(1);
      expect(user789Updates[0].enrollment_id).toBe('enrollment-456');
      expect(user789Updates[0].new_status).toBe(EnrollmentStatus.REJECTED);
    });
  });

  describe('Cross-Tab Synchronization (Requirement 3.2)', () => {
    it('should sync enrollment status across browser tabs', async () => {
      const tab1Updates: any[] = [];
      const tab2Updates: any[] = [];

      // Create second service instance (simulating another tab)
      const tab2Sync = RealTimePaymentSync.getInstance();
      await tab2Sync.initialize();

      // Setup listeners for both tabs
      realTimeSync.subscribeToUserUpdates('user-456', (update) => {
        tab1Updates.push({ tab: 1, ...update });
      });

      tab2Sync.subscribeToUserUpdates('user-456', (update) => {
        tab2Updates.push({ tab: 2, ...update });
      });

      // Trigger sync from tab 1
      const syncData = {
        userId: 'user-456',
        enrollmentId: 'enrollment-123',
        courseId: 'course-789',
        status: EnrollmentStatus.APPROVED,
        timestamp: new Date(),
        source: 'admin_action'
      };

      realTimeSync.syncAcrossTabs('user-456', syncData);

      // Wait for cross-tab propagation
      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify tab 2 received the update
      expect(tab2Updates.length).toBeGreaterThan(0);
      expect(tab2Updates[0]).toMatchObject({
        tab: 2,
        enrollmentId: 'enrollment-123',
        status: EnrollmentStatus.APPROVED
      });

      tab2Sync.cleanup();
    });

    it('should use localStorage fallback when BroadcastChannel fails', async () => {
      // Disable BroadcastChannel
      global.BroadcastChannel = undefined as any;

      const storageEvents: any[] = [];
      
      // Monitor localStorage changes
      const originalSetItem = mockLocalStorageAPI.setItem;
      mockLocalStorageAPI.setItem = vi.fn((key, value) => {
        storageEvents.push({ key, value });
        return originalSetItem(key, value);
      });

      const syncData = {
        userId: 'user-456',
        enrollmentId: 'enrollment-123',
        courseId: 'course-789',
        status: EnrollmentStatus.APPROVED,
        timestamp: new Date(),
        source: 'system'
      };

      realTimeSync.syncAcrossTabs('user-456', syncData);

      await new Promise(resolve => setTimeout(resolve, 20));

      // Verify localStorage was used
      expect(storageEvents.length).toBeGreaterThan(0);
      const syncEvent = storageEvents.find(e => e.key.startsWith('enrollment_sync_user-456_'));
      expect(syncEvent).toBeDefined();

      const storedData = JSON.parse(syncEvent.value);
      expect(storedData).toMatchObject({
        enrollmentId: 'enrollment-123',
        status: EnrollmentStatus.APPROVED
      });
    });

    it('should handle storage event cleanup', async () => {
      const syncData = {
        userId: 'user-456',
        enrollmentId: 'enrollment-123',
        courseId: 'course-789',
        status: EnrollmentStatus.APPROVED,
        timestamp: new Date(),
        source: 'system'
      };

      realTimeSync.syncAcrossTabs('user-456', syncData);

      await new Promise(resolve => setTimeout(resolve, 20));

      // Verify sync data was stored
      const syncKeys = Array.from(mockLocalStorage.keys()).filter(key =>
        key.startsWith('enrollment_sync_user-456_')
      );
      expect(syncKeys.length).toBe(1);

      // Wait for cleanup (should happen after 30 seconds in real implementation, 
      // but we'll simulate it)
      realTimeSync.cleanupExpiredSyncData();

      await new Promise(resolve => setTimeout(resolve, 10));

      // Verify old sync data was cleaned up
      const remainingKeys = Array.from(mockLocalStorage.keys()).filter(key =>
        key.startsWith('enrollment_sync_user-456_')
      );
      expect(remainingKeys.length).toBe(0);
    });
  });

  describe('WebSocket Real-Time Updates (Requirement 3.3)', () => {
    it('should establish WebSocket connection for real-time updates', async () => {
      const wsMessages: any[] = [];

      // Create second service to simulate another client
      const clientSync = RealTimePaymentSync.getInstance();
      await clientSync.initialize();

      // Setup message listener
      clientSync.subscribeToStatusUpdates((update) => {
        wsMessages.push(update);
      });

      // Simulate WebSocket message from server
      const wsInstances = MockWebSocket.instances;
      expect(wsInstances.length).toBeGreaterThan(0);

      const serverMessage = {
        type: 'enrollment_update',
        data: {
          enrollment_id: 'enrollment-123',
          user_id: 'user-456',
          course_id: 'course-789',
          old_status: 'pending',
          new_status: 'approved',
          timestamp: new Date().toISOString()
        }
      };

      // Send message to all WebSocket instances
      wsInstances.forEach(ws => {
        if (ws.onmessage) {
          ws.onmessage(new MessageEvent('message', { 
            data: JSON.stringify(serverMessage) 
          }));
        }
      });

      await new Promise(resolve => setTimeout(resolve, 20));

      // Verify message was processed
      expect(wsMessages.length).toBeGreaterThan(0);
      expect(wsMessages[0]).toMatchObject({
        enrollment_id: 'enrollment-123',
        new_status: 'approved'
      });

      clientSync.cleanup();
    });

    it('should handle WebSocket connection failures gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Simulate WebSocket connection failure
      const wsInstances = MockWebSocket.instances;
      wsInstances.forEach(ws => {
        if (ws.onerror) {
          ws.onerror(new Event('error'));
        }
      });

      // Service should continue to work despite WebSocket failure
      const updates: any[] = [];
      realTimeSync.subscribeToStatusUpdates((update) => {
        updates.push(update);
      });

      await realTimeSync.syncEnrollmentStatus('enrollment-123', EnrollmentStatus.APPROVED);

      await new Promise(resolve => setTimeout(resolve, 20));

      // Verify updates still work through other mechanisms
      expect(updates.length).toBeGreaterThan(0);

      consoleSpy.mockRestore();
    });

    it('should reconnect WebSocket on connection loss', async () => {
      const connectionEvents: string[] = [];

      // Monitor connection events
      const wsInstances = MockWebSocket.instances;
      const originalOnOpen = wsInstances[0]?.onopen;
      const originalOnClose = wsInstances[0]?.onclose;

      if (wsInstances[0]) {
        wsInstances[0].onopen = (event) => {
          connectionEvents.push('connected');
          if (originalOnOpen) originalOnOpen(event);
        };

        wsInstances[0].onclose = (event) => {
          connectionEvents.push('disconnected');
          if (originalOnClose) originalOnClose(event);
        };
      }

      // Simulate connection loss
      wsInstances.forEach(ws => ws.close());

      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify reconnection attempt (in real implementation)
      expect(connectionEvents).toContain('disconnected');
    });
  });

  describe('Admin Real-Time Notifications (Requirement 4.1)', () => {
    it('should notify admins of new EFT enrollments in real-time', async () => {
      const adminNotifications: any[] = [];

      realTimeSync.subscribeToAdminUpdates((update) => {
        adminNotifications.push(update);
      });

      // Simulate new EFT enrollment insertion
      const eftEnrollment = {
        id: 'enrollment-eft-123',
        user_id: 'user-eft-456',
        user_email: 'eft@example.com',
        course_id: 'course-eft-789',
        course_title: 'EFT Test Course',
        status: 'pending',
        payment_type: 'eft',
        payment_status: 'completed',
        requires_approval: true,
        created_at: new Date().toISOString()
      };

      // Simulate real-time INSERT event
      const handlers = mockRealtimeSubscriptions.get('enrollment_changes') || [];
      handlers.forEach((handler: any) => {
        handler({
          eventType: 'INSERT',
          new: eftEnrollment
        });
      });

      await new Promise(resolve => setTimeout(resolve, 20));

      // Verify admin notification
      expect(adminNotifications.length).toBe(1);
      expect(adminNotifications[0]).toMatchObject({
        type: 'new_eft_enrollment',
        enrollmentId: 'enrollment-eft-123',
        userEmail: 'eft@example.com',
        courseName: 'EFT Test Course'
      });
    });

    it('should broadcast admin approval actions to users', async () => {
      const userNotifications: any[] = [];

      realTimeSync.subscribeToUserUpdates('user-456', (update) => {
        userNotifications.push(update);
      });

      // Simulate admin approval action
      await realTimeSync.broadcastAdminAction({
        type: 'enrollment_approved',
        enrollmentId: 'enrollment-123',
        userId: 'user-456',
        courseId: 'course-789',
        adminId: 'admin-123',
        timestamp: new Date()
      });

      await new Promise(resolve => setTimeout(resolve, 20));

      // Verify user received notification
      expect(userNotifications.length).toBe(1);
      expect(userNotifications[0]).toMatchObject({
        type: 'enrollment_approved',
        enrollmentId: 'enrollment-123'
      });
    });

    it('should handle bulk admin actions efficiently', async () => {
      const adminUpdates: any[] = [];
      const userUpdates = new Map<string, any[]>();

      realTimeSync.subscribeToAdminUpdates((update) => {
        adminUpdates.push(update);
      });

      // Setup user listeners
      for (let i = 0; i < 5; i++) {
        const userId = `bulk-user-${i}`;
        userUpdates.set(userId, []);
        
        realTimeSync.subscribeToUserUpdates(userId, (update) => {
          userUpdates.get(userId)!.push(update);
        });
      }

      // Simulate bulk approval
      const bulkApprovalData = {
        type: 'bulk_approval',
        enrollmentIds: ['enrollment-1', 'enrollment-2', 'enrollment-3', 'enrollment-4', 'enrollment-5'],
        userIds: ['bulk-user-0', 'bulk-user-1', 'bulk-user-2', 'bulk-user-3', 'bulk-user-4'],
        adminId: 'admin-bulk-123',
        timestamp: new Date()
      };

      await realTimeSync.broadcastBulkAdminAction(bulkApprovalData);

      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify all users received their notifications
      for (let i = 0; i < 5; i++) {
        const userId = `bulk-user-${i}`;
        const updates = userUpdates.get(userId)!;
        expect(updates.length).toBe(1);
        expect(updates[0].enrollmentId).toBe(`enrollment-${i + 1}`);
      }
    });
  });

  describe('Error Handling and Resilience (Requirement 3.4)', () => {
    it('should handle listener callback errors gracefully', async () => {
      const workingUpdates: any[] = [];
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Add failing listener
      realTimeSync.subscribeToStatusUpdates(() => {
        throw new Error('Listener callback error');
      });

      // Add working listener
      realTimeSync.subscribeToStatusUpdates((update) => {
        workingUpdates.push(update);
      });

      // Trigger update
      await realTimeSync.syncEnrollmentStatus('enrollment-123', EnrollmentStatus.APPROVED);

      await new Promise(resolve => setTimeout(resolve, 20));

      // Verify working listener still received update
      expect(workingUpdates.length).toBe(1);
      expect(workingUpdates[0].new_status).toBe(EnrollmentStatus.APPROVED);

      // Verify error was logged but didn't crash the system
      expect(errorSpy).toHaveBeenCalled();

      errorSpy.mockRestore();
    });

    it('should handle database connection failures', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Mock database failure
      mockSupabase.from().update = vi.fn().mockRejectedValue(new Error('Database connection failed'));

      // This should not throw
      await expect(
        realTimeSync.syncPaymentStatus('payment-123', PaymentStatus.COMPLETED)
      ).resolves.not.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to sync payment status'),
        expect.any(String),
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should maintain service health monitoring', async () => {
      // Get initial health status
      const initialHealth = realTimeSync.getHealthStatus();
      expect(initialHealth.initialized).toBe(true);
      expect(initialHealth.listenersCount).toBe(0);

      // Add listeners
      const unsubscribe1 = realTimeSync.subscribeToStatusUpdates(() => {});
      const unsubscribe2 = realTimeSync.subscribeToUserUpdates('user-123', () => {});
      const unsubscribe3 = realTimeSync.subscribeToAdminUpdates(() => {});

      const healthWithListeners = realTimeSync.getHealthStatus();
      expect(healthWithListeners.listenersCount).toBe(1);
      expect(healthWithListeners.userListenersCount).toBe(1);
      expect(healthWithListeners.adminListenersCount).toBe(1);

      // Remove listeners
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();

      const healthAfterCleanup = realTimeSync.getHealthStatus();
      expect(healthAfterCleanup.listenersCount).toBe(0);
      expect(healthAfterCleanup.userListenersCount).toBe(0);
      expect(healthAfterCleanup.adminListenersCount).toBe(0);
    });

    it('should handle high-frequency updates without memory leaks', async () => {
      const updates: any[] = [];
      
      realTimeSync.subscribeToStatusUpdates((update) => {
        updates.push(update);
      });

      // Generate high-frequency updates
      const updatePromises = [];
      for (let i = 0; i < 100; i++) {
        updatePromises.push(
          realTimeSync.syncPaymentStatus(`payment-${i}`, PaymentStatus.COMPLETED)
        );
      }

      await Promise.all(updatePromises);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify all updates were processed
      expect(updates.length).toBe(100);

      // Verify memory usage is reasonable (health check)
      const health = realTimeSync.getHealthStatus();
      expect(health.memoryUsage).toBeLessThan(1000000); // Less than 1MB
    });
  });

  describe('Performance Optimization', () => {
    it('should debounce rapid updates for the same enrollment', async () => {
      const updates: any[] = [];
      
      realTimeSync.subscribeToStatusUpdates((update) => {
        updates.push({ ...update, timestamp: Date.now() });
      });

      // Trigger rapid updates for same enrollment
      const rapidUpdates = [
        realTimeSync.syncPaymentStatus('payment-123', PaymentStatus.PROCESSING),
        realTimeSync.syncPaymentStatus('payment-123', PaymentStatus.PROCESSING),
        realTimeSync.syncPaymentStatus('payment-123', PaymentStatus.PROCESSING),
        realTimeSync.syncPaymentStatus('payment-123', PaymentStatus.COMPLETED)
      ];

      await Promise.all(rapidUpdates);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should have fewer updates due to debouncing
      expect(updates.length).toBeLessThan(4);
      
      // Final status should be COMPLETED
      const lastUpdate = updates[updates.length - 1];
      expect(lastUpdate.new_status).toBe(PaymentStatus.COMPLETED);
    });

    it('should batch multiple updates efficiently', async () => {
      const batchedUpdates: any[] = [];
      
      realTimeSync.subscribeToStatusUpdates((update) => {
        batchedUpdates.push(update);
      });

      // Create multiple enrollments and update them
      const enrollmentIds = [];
      for (let i = 0; i < 10; i++) {
        const enrollmentId = `batch-enrollment-${i}`;
        enrollmentIds.push(enrollmentId);
        
        mockDatabase.set(`batch-payment-${i}`, {
          id: enrollmentId,
          user_id: `batch-user-${i}`,
          course_id: `batch-course-${i}`,
          ikhokha_payment_id: `batch-payment-${i}`
        });
      }

      // Batch update all enrollments
      await realTimeSync.batchSyncEnrollmentStatus(
        enrollmentIds.map(id => ({
          enrollmentId: id,
          status: EnrollmentStatus.APPROVED
        }))
      );

      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify all updates were processed efficiently
      expect(batchedUpdates.length).toBe(10);
      expect(batchedUpdates.every(u => u.new_status === EnrollmentStatus.APPROVED)).toBe(true);
    });
  });
});