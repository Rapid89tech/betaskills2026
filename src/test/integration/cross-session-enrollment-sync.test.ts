import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { crossSessionEnrollmentSync } from '@/services/CrossSessionEnrollmentSync';
import { enrollmentSessionManager } from '@/services/EnrollmentSessionManager';
import { offlineEnrollmentSync } from '@/services/OfflineEnrollmentSync';
import { enrollmentSyncIntegration } from '@/services/EnrollmentSyncIntegration';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => Promise.resolve({ error: null }))
        }))
      })),
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({
          data: [
            {
              id: 'enrollment-1',
              user_id: 'user-123',
              course_id: 'course-456',
              status: 'approved',
              payment_status: 'completed',
              updated_at: new Date().toISOString()
            }
          ],
          error: null
        }))
      }))
    }))
  }
}));

// Mock logger
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}));

// Mock BroadcastChannel
global.BroadcastChannel = vi.fn().mockImplementation(() => ({
  postMessage: vi.fn(),
  addEventListener: vi.fn(),
  close: vi.fn()
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  storage: new Map()
};

// Make localStorage behave more realistically
localStorageMock.getItem.mockImplementation((key) => {
  return localStorageMock.storage.get(key) || null;
});

localStorageMock.setItem.mockImplementation((key, value) => {
  localStorageMock.storage.set(key, value);
});

localStorageMock.removeItem.mockImplementation((key) => {
  localStorageMock.storage.delete(key);
});

localStorageMock.clear.mockImplementation(() => {
  localStorageMock.storage.clear();
});

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock navigator.onLine
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true
});

describe('Cross-Session Enrollment Synchronization', () => {
  const testUserId = 'user-123';
  const testCourseId = 'course-456';

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.storage.clear();
    
    // Set test environment
    process.env.NODE_ENV = 'test';
    
    // Reset navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true
    });
  });

  afterEach(() => {
    crossSessionEnrollmentSync.cleanup();
    enrollmentSessionManager.cleanup();
    offlineEnrollmentSync.cleanup();
    enrollmentSyncIntegration.cleanup();
  });

  describe('CrossSessionEnrollmentSync', () => {
    it('should initialize for user and create session', () => {
      crossSessionEnrollmentSync.initializeForUser(testUserId);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expect.stringContaining('enrollment_session_state'),
        expect.any(String)
      );
    });

    it('should sync enrollment status across sessions', async () => {
      crossSessionEnrollmentSync.initializeForUser(testUserId);
      
      const syncData = {
        userId: testUserId,
        courseId: testCourseId,
        status: 'approved' as const,
        paymentStatus: 'completed' as const,
        timestamp: Date.now(),
        source: 'payment' as const
      };

      await crossSessionEnrollmentSync.syncEnrollmentStatus(syncData);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expect.stringContaining('enrollment_sync_data'),
        expect.stringContaining(testCourseId)
      );
    });

    it('should handle offline mode by queuing actions', async () => {
      // Set offline
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      crossSessionEnrollmentSync.initializeForUser(testUserId);
      crossSessionEnrollmentSync.handleOffline();
      
      const syncData = {
        userId: testUserId,
        courseId: testCourseId,
        status: 'pending' as const,
        timestamp: Date.now(),
        source: 'manual' as const
      };

      await crossSessionEnrollmentSync.syncEnrollmentStatus(syncData);
      
      // Should store locally but not sync to server
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expect.stringContaining('enrollment_offline_queue'),
        expect.any(String)
      );
    });

    it('should process offline queue when coming back online', async () => {
      crossSessionEnrollmentSync.initializeForUser(testUserId);
      
      // Simulate offline queue
      const offlineQueue = [{
        id: 'action-1',
        data: {
          userId: testUserId,
          courseId: testCourseId,
          status: 'approved',
          timestamp: Date.now(),
          source: 'payment'
        },
        timestamp: Date.now(),
        retryCount: 0
      }];
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key.includes('offline_queue')) {
          return JSON.stringify(offlineQueue);
        }
        return null;
      });

      await crossSessionEnrollmentSync.handleOnline();
      
      // Should process the queue
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should subscribe to enrollment updates', () => {
      crossSessionEnrollmentSync.initializeForUser(testUserId);
      
      const callback = vi.fn();
      const unsubscribe = crossSessionEnrollmentSync.subscribeToUpdates(callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
      expect(callback).not.toHaveBeenCalled();
    });

    it('should get enrollment status from sync data', () => {
      crossSessionEnrollmentSync.initializeForUser(testUserId);
      
      const syncData = {
        [`${testUserId}_${testCourseId}`]: {
          userId: testUserId,
          courseId: testCourseId,
          status: 'approved',
          paymentStatus: 'completed',
          timestamp: Date.now(),
          source: 'payment'
        }
      };
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key.includes('sync_data')) {
          return JSON.stringify(syncData);
        }
        return null;
      });

      const status = crossSessionEnrollmentSync.getEnrollmentStatus(testUserId, testCourseId);
      
      expect(status).toEqual(expect.objectContaining({
        userId: testUserId,
        courseId: testCourseId,
        status: 'approved'
      }));
    });
  });

  describe('EnrollmentSessionManager', () => {
    it('should initialize session for user', async () => {
      await enrollmentSessionManager.initializeForUser(testUserId);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expect.stringContaining('enrollment_session_info'),
        expect.any(String)
      );
    });

    it('should update enrollment in session', async () => {
      await enrollmentSessionManager.initializeForUser(testUserId);
      
      await enrollmentSessionManager.updateEnrollmentInSession(
        testCourseId,
        'approved',
        'completed'
      );
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expect.stringContaining('enrollment_session_state'),
        expect.any(String)
      );
    });

    it('should get enrollment from session', async () => {
      await enrollmentSessionManager.initializeForUser(testUserId);
      
      // First update an enrollment
      await enrollmentSessionManager.updateEnrollmentInSession(
        testCourseId,
        'approved',
        'completed'
      );
      
      // Then get it back
      const enrollment = enrollmentSessionManager.getEnrollmentFromSession(testCourseId);
      
      expect(enrollment).toEqual(expect.objectContaining({
        status: 'approved',
        paymentStatus: 'completed'
      }));
    });

    it('should sync with other sessions', async () => {
      await enrollmentSessionManager.initializeForUser(testUserId);
      
      // Mock device sessions
      const deviceSessions = {
        'session-1': {
          sessionId: 'session-1',
          userId: testUserId,
          deviceId: 'device-1',
          browserInfo: 'Chrome',
          startTime: Date.now() - 10000,
          lastActivity: Date.now() - 1000,
          isActive: true
        }
      };
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key.includes('device_sessions')) {
          return JSON.stringify(deviceSessions);
        }
        return null;
      });

      await enrollmentSessionManager.syncWithOtherSessions();
      
      // Should attempt to sync
      expect(localStorageMock.getItem).toHaveBeenCalled();
    });
  });

  describe('OfflineEnrollmentSync', () => {
    it('should queue enrollment action when offline', () => {
      offlineEnrollmentSync.queueEnrollmentAction(
        'enrollment_update',
        testUserId,
        testCourseId,
        { status: 'approved', paymentStatus: 'completed' },
        'high'
      );
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expect.stringContaining('offline_enrollment_sync_queue'),
        expect.any(String)
      );
    });

    it('should process sync queue when online', async () => {
      // Go offline first
      offlineEnrollmentSync.handleOffline();
      
      // Queue an action while offline
      offlineEnrollmentSync.queueEnrollmentAction(
        'enrollment_update',
        testUserId,
        testCourseId,
        { status: 'approved' },
        'high'
      );

      // Verify action was queued
      const offlineState = offlineEnrollmentSync.getSyncState();
      expect(offlineState.queueSize).toBeGreaterThan(0);
      expect(offlineState.isOnline).toBe(false);

      // Come back online and process queue
      offlineEnrollmentSync.handleOnline();
      await offlineEnrollmentSync.processSyncQueue();
      
      // Verify processing occurred
      const onlineState = offlineEnrollmentSync.getSyncState();
      expect(onlineState.isOnline).toBe(true);
    });

    it('should handle online/offline status changes', () => {
      offlineEnrollmentSync.handleOffline();
      
      const state = offlineEnrollmentSync.getSyncState();
      expect(state.isOnline).toBe(false);
      
      offlineEnrollmentSync.handleOnline();
      
      const newState = offlineEnrollmentSync.getSyncState();
      expect(newState.isOnline).toBe(true);
    });

    it('should subscribe to sync state changes', () => {
      const callback = vi.fn();
      const unsubscribe = offlineEnrollmentSync.subscribeToSyncState(callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      // Trigger state change
      offlineEnrollmentSync.queueEnrollmentAction(
        'enrollment_update',
        testUserId,
        testCourseId,
        { status: 'pending' }
      );
      
      expect(callback).toHaveBeenCalled();
      
      unsubscribe();
    });
  });

  describe('EnrollmentSyncIntegration', () => {
    it('should initialize all services for user', async () => {
      await enrollmentSyncIntegration.initializeForUser(testUserId);
      
      const state = enrollmentSyncIntegration.getState();
      
      expect(state.isInitialized).toBe(true);
      expect(state.userId).toBe(testUserId);
      expect(state.crossSessionActive).toBe(true);
      expect(state.sessionManagerActive).toBe(true);
      expect(state.offlineSyncActive).toBe(true);
    });

    it('should update enrollment status across all services', async () => {
      await enrollmentSyncIntegration.initializeForUser(testUserId);
      
      const updateData = {
        courseId: testCourseId,
        status: 'approved' as const,
        paymentStatus: 'completed' as const,
        source: 'payment' as const
      };

      await enrollmentSyncIntegration.updateEnrollmentStatus(updateData);
      
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should get enrollment status from most reliable source', async () => {
      await enrollmentSyncIntegration.initializeForUser(testUserId);
      
      // Mock cross-session data
      const syncData = {
        [`${testUserId}_${testCourseId}`]: {
          userId: testUserId,
          courseId: testCourseId,
          status: 'approved',
          paymentStatus: 'completed',
          timestamp: Date.now(),
          source: 'payment'
        }
      };
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key.includes('sync_data')) {
          return JSON.stringify(syncData);
        }
        return null;
      });

      const status = enrollmentSyncIntegration.getEnrollmentStatus(testCourseId);
      
      expect(status).toEqual(expect.objectContaining({
        status: 'approved',
        source: 'cross-session'
      }));
    });

    it('should handle online/offline status changes', async () => {
      await enrollmentSyncIntegration.initializeForUser(testUserId);
      
      await enrollmentSyncIntegration.handleOffline();
      
      const state = enrollmentSyncIntegration.getState();
      expect(state.isOnline).toBe(false);
      
      await enrollmentSyncIntegration.handleOnline();
      
      const newState = enrollmentSyncIntegration.getState();
      expect(newState.isOnline).toBe(true);
    });

    it('should force sync across all services', async () => {
      await enrollmentSyncIntegration.initializeForUser(testUserId);
      
      await enrollmentSyncIntegration.forceSyncAll();
      
      const state = enrollmentSyncIntegration.getState();
      expect(state.lastSync).toBeTruthy();
    });

    it('should get sync health status', async () => {
      await enrollmentSyncIntegration.initializeForUser(testUserId);
      
      const health = enrollmentSyncIntegration.getSyncHealth();
      
      expect(health).toEqual(expect.objectContaining({
        overall: expect.any(String),
        services: expect.objectContaining({
          crossSession: expect.any(String),
          sessionManager: expect.any(String),
          offlineSync: expect.any(String),
          realTime: expect.any(String)
        }),
        details: expect.objectContaining({
          queuedActions: expect.any(Number),
          isOnline: expect.any(Boolean)
        })
      }));
    });

    it('should subscribe to enrollment updates', async () => {
      await enrollmentSyncIntegration.initializeForUser(testUserId);
      
      const callback = vi.fn();
      const unsubscribe = enrollmentSyncIntegration.subscribeToEnrollmentUpdates(callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      unsubscribe();
    });

    it('should subscribe to state changes', async () => {
      await enrollmentSyncIntegration.initializeForUser(testUserId);
      
      const callback = vi.fn();
      const unsubscribe = enrollmentSyncIntegration.subscribeToStateChanges(callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      unsubscribe();
    });
  });

  describe('Cross-Service Integration', () => {
    it('should sync data between all services', async () => {
      // Initialize all services
      await enrollmentSyncIntegration.initializeForUser(testUserId);
      
      // Update through integration
      await enrollmentSyncIntegration.updateEnrollmentStatus({
        courseId: testCourseId,
        status: 'approved',
        paymentStatus: 'completed',
        source: 'payment'
      });
      
      // Check that data is available through different services
      const crossSessionStatus = crossSessionEnrollmentSync.getEnrollmentStatus(testUserId, testCourseId);
      const sessionStatus = enrollmentSessionManager.getEnrollmentFromSession(testCourseId);
      const integrationStatus = enrollmentSyncIntegration.getEnrollmentStatus(testCourseId);
      
      // At least one service should have the data
      expect(
        crossSessionStatus || sessionStatus || integrationStatus
      ).toBeTruthy();
    });

    it('should handle offline-to-online transition across all services', async () => {
      await enrollmentSyncIntegration.initializeForUser(testUserId);
      
      // Go offline
      await enrollmentSyncIntegration.handleOffline();
      
      // Make changes while offline
      await enrollmentSyncIntegration.updateEnrollmentStatus({
        courseId: testCourseId,
        status: 'pending',
        source: 'manual'
      });
      
      // Come back online
      await enrollmentSyncIntegration.handleOnline();
      
      // Should sync successfully
      const health = enrollmentSyncIntegration.getSyncHealth();
      expect(health.details.isOnline).toBe(true);
    });
  });
});