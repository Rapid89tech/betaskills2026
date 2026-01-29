import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DataManager, EnrollmentData } from '../DataManager';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            data: [],
            error: null
          }))
        }))
      })),
      upsert: vi.fn(() => ({
        error: null
      }))
    }))
  }
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}));

// Mock BroadcastChannel
class MockBroadcastChannel {
  addEventListener = vi.fn();
  postMessage = vi.fn();
  close = vi.fn();
}

global.BroadcastChannel = MockBroadcastChannel as any;

// Mock navigator.onLine
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true
});

describe('DataManager', () => {
  let dataManager: DataManager;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    // Reset localStorage mock
    mockLocalStorage = {};
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => mockLocalStorage[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          mockLocalStorage[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete mockLocalStorage[key];
        }),
        clear: vi.fn(() => {
          mockLocalStorage = {};
        })
      },
      writable: true
    });

    // Mock window events
    Object.defineProperty(window, 'addEventListener', {
      value: vi.fn(),
      writable: true
    });

    Object.defineProperty(window, 'removeEventListener', {
      value: vi.fn(),
      writable: true
    });

    Object.defineProperty(window, 'dispatchEvent', {
      value: vi.fn(),
      writable: true
    });

    dataManager = DataManager.getInstance();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = DataManager.getInstance();
      const instance2 = DataManager.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Enrollment Management', () => {
    const mockEnrollment: EnrollmentData = {
      id: 'test-enrollment-1',
      user_id: 'user-123',
      user_email: 'test@example.com',
      course_id: 'course-456',
      course_title: 'Test Course',
      status: 'pending',
      enrolled_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      progress: 0,
      sync_version: 1
    };

    it('should get enrollments for a user', async () => {
      // Setup localStorage with test data
      mockLocalStorage['enrollments'] = JSON.stringify([mockEnrollment]);
      
      const enrollments = await dataManager.getEnrollments('user-123');
      
      expect(enrollments).toHaveLength(1);
      expect(enrollments[0].id).toBe('test-enrollment-1');
      expect(enrollments[0].user_id).toBe('user-123');
    });

    it('should return empty array for user with no enrollments', async () => {
      const enrollments = await dataManager.getEnrollments('nonexistent-user');
      expect(enrollments).toHaveLength(0);
    });

    it('should update enrollment and increment sync version', async () => {
      const updatedEnrollment = {
        ...mockEnrollment,
        progress: 50,
        status: 'approved' as const
      };

      await dataManager.updateEnrollment(updatedEnrollment);

      // Check that localStorage was updated
      const stored = JSON.parse(mockLocalStorage['enrollments'] || '[]');
      expect(stored).toHaveLength(1);
      expect(stored[0].progress).toBe(50);
      expect(stored[0].status).toBe('approved');
      expect(stored[0].sync_version).toBe(2);
    });
  });

  describe('Conflict Resolution', () => {
    it('should resolve conflicts using timestamp-based last-write-wins', () => {
      const localEnrollment: EnrollmentData = {
        id: 'enrollment-1',
        user_id: 'user-123',
        course_id: 'course-456',
        status: 'pending',
        enrolled_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z', // Newer
        progress: 25,
        sync_version: 1
      };

      const remoteEnrollment: EnrollmentData = {
        id: 'enrollment-1',
        user_id: 'user-123',
        course_id: 'course-456',
        status: 'approved',
        enrolled_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T12:00:00Z', // Older
        progress: 50,
        sync_version: 2
      };

      const resolved = dataManager.resolveConflicts([localEnrollment], [remoteEnrollment]);

      expect(resolved).toHaveLength(1);
      expect(resolved[0].updated_at).toBe('2024-01-02T00:00:00Z'); // Local wins (newer)
      expect(resolved[0].progress).toBe(25);
      expect(resolved[0].status).toBe('pending');
      expect(resolved[0].conflict_resolution).toBe('local');
    });

    it('should prefer higher sync version when timestamps are equal', () => {
      const timestamp = '2024-01-01T00:00:00Z';
      
      const localEnrollment: EnrollmentData = {
        id: 'enrollment-1',
        user_id: 'user-123',
        course_id: 'course-456',
        status: 'pending',
        enrolled_at: timestamp,
        updated_at: timestamp,
        progress: 25,
        sync_version: 3 // Higher version
      };

      const remoteEnrollment: EnrollmentData = {
        id: 'enrollment-1',
        user_id: 'user-123',
        course_id: 'course-456',
        status: 'approved',
        enrolled_at: timestamp,
        updated_at: timestamp,
        progress: 50,
        sync_version: 2 // Lower version
      };

      const resolved = dataManager.resolveConflicts([localEnrollment], [remoteEnrollment]);

      expect(resolved).toHaveLength(1);
      expect(resolved[0].sync_version).toBe(3);
      expect(resolved[0].progress).toBe(25);
      expect(resolved[0].conflict_resolution).toBe('local');
    });

    it('should handle local-only enrollments', () => {
      const localEnrollment: EnrollmentData = {
        id: 'local-enrollment',
        user_id: 'user-123',
        course_id: 'course-456',
        status: 'pending',
        enrolled_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        progress: 0,
        sync_version: 1
      };

      const resolved = dataManager.resolveConflicts([localEnrollment], []);

      expect(resolved).toHaveLength(1);
      expect(resolved[0].id).toBe('local-enrollment');
      expect(resolved[0].conflict_resolution).toBe('local');
    });

    it('should handle remote-only enrollments', () => {
      const remoteEnrollment: EnrollmentData = {
        id: 'remote-enrollment',
        user_id: 'user-123',
        course_id: 'course-456',
        status: 'approved',
        enrolled_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        progress: 100,
        sync_version: 1
      };

      const resolved = dataManager.resolveConflicts([], [remoteEnrollment]);

      expect(resolved).toHaveLength(1);
      expect(resolved[0].id).toBe('remote-enrollment');
      expect(resolved[0].conflict_resolution).toBe('remote');
    });
  });

  describe('Data Normalization', () => {
    it('should normalize enrollments with different field names', async () => {
      const unnormalizedData = [
        {
          userId: 'user-123', // Alternative field name
          courseId: 'course-456', // Alternative field name
          enrollment_date: '2024-01-01T00:00:00Z', // Alternative field name
          status: 'pending'
        }
      ];

      mockLocalStorage['enrollments'] = JSON.stringify(unnormalizedData);
      
      const enrollments = await dataManager.getEnrollments('user-123');
      
      expect(enrollments).toHaveLength(1);
      expect(enrollments[0].user_id).toBe('user-123');
      expect(enrollments[0].course_id).toBe('course-456');
      expect(enrollments[0].enrolled_at).toBe('2024-01-01T00:00:00Z');
      expect(enrollments[0]).toHaveProperty('id');
      expect(enrollments[0]).toHaveProperty('updated_at');
    });

    it('should generate IDs for enrollments without them', async () => {
      const dataWithoutId = [
        {
          user_id: 'user-123',
          course_id: 'course-456',
          status: 'pending'
        }
      ];

      mockLocalStorage['enrollments'] = JSON.stringify(dataWithoutId);
      
      const enrollments = await dataManager.getEnrollments('user-123');
      
      expect(enrollments).toHaveLength(1);
      expect(enrollments[0].id).toBeDefined();
      expect(enrollments[0].id).toMatch(/^enrollment_/);
    });
  });

  describe('Offline Queue', () => {
    it('should queue operations when offline', async () => {
      // Set offline
      Object.defineProperty(navigator, 'onLine', { value: false, writable: true });
      
      const enrollment: EnrollmentData = {
        id: 'test-enrollment',
        user_id: 'user-123',
        course_id: 'course-456',
        status: 'pending',
        enrolled_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        progress: 0,
        sync_version: 1
      };

      await dataManager.updateEnrollment(enrollment);

      // Check that operation was queued
      const queueData = mockLocalStorage['enrollment-offline-queue'];
      expect(queueData).toBeDefined();
      
      const queue = JSON.parse(queueData);
      expect(queue).toHaveLength(1);
      expect(queue[0].type).toBe('update');
      expect(queue[0].table).toBe('enrollments');
      expect(queue[0].data.id).toBe('test-enrollment');
    });
  });

  describe('Cross-tab Synchronization', () => {
    it('should broadcast updates to other tabs', async () => {
      const mockBroadcastChannel = new MockBroadcastChannel();
      (dataManager as any).broadcastChannel = mockBroadcastChannel;

      const enrollment: EnrollmentData = {
        id: 'test-enrollment',
        user_id: 'user-123',
        course_id: 'course-456',
        status: 'pending',
        enrolled_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        progress: 0,
        sync_version: 1
      };

      await dataManager.updateEnrollment(enrollment);

      expect(mockBroadcastChannel.postMessage).toHaveBeenCalledWith({
        type: 'enrollment-updated',
        data: expect.objectContaining({
          id: 'test-enrollment',
          sync_version: 2
        }),
        timestamp: expect.any(String)
      });
    });
  });
});