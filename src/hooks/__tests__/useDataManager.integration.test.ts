import { renderHook, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useDataManager } from '../useDataManager';
import { it } from 'node:test';
import { it } from 'node:test';
import { describe } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { describe } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { describe } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { describe } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { describe } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { describe } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { describe } from 'node:test';
import { beforeEach } from 'node:test';
import { describe } from 'node:test';

// Mock dependencies
vi.mock('@/services/UnifiedEnrollmentManager', () => ({
  unifiedEnrollmentManager: {
    getUserEnrollments: vi.fn(),
    createEnrollment: vi.fn(),
    updateEnrollment: vi.fn(),
    deleteEnrollment: vi.fn(),
    getAllEnrollments: vi.fn(),
    updateEnrollmentStatus: vi.fn(),
    updateEnrollmentProgress: vi.fn(),
    isUserEnrolledInCourse: vi.fn(),
    getUserEnrollmentForCourse: vi.fn(),
    getEnrollmentStatistics: vi.fn(),
    forceSynchronization: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }
}));

vi.mock('../AuthContext', () => ({
  useAuth: vi.fn()
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  }
}));

vi.mock('@/services/DataManager', () => ({
  dataManager: {},
  EnrollmentData: {}
}));

describe('useDataManager Integration Test', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com'
  };

  const mockEnrollment = {
    id: 'enrollment-123',
    user_id: 'user-123',
    user_email: 'test@example.com',
    course_id: 'course-123',
    course_title: 'Test Course',
    status: 'pending' as const,
    enrolled_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    progress: 0,
    sync_version: 1,
    conflict_resolution: 'local' as const
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    
    const { useAuth } = await import('../AuthContext');
    const { unifiedEnrollmentManager } = await import('@/services/UnifiedEnrollmentManager');
    
    vi.mocked(useAuth).mockReturnValue({ user: mockUser });
    vi.mocked(unifiedEnrollmentManager.getUserEnrollments).mockResolvedValue([mockEnrollment]);
  });

  describe('Enhanced CRUD Operations', () => {
    it('should create enrollment with proper integration', async () => {
      const { unifiedEnrollmentManager } = await import('@/services/UnifiedEnrollmentManager');
      
      const newEnrollmentData = {
        user_id: 'user-123',
        course_id: 'course-456',
        course_title: 'New Course'
      };
      
      const createdEnrollment = { ...mockEnrollment, id: 'enrollment-456', course_id: 'course-456' };
      vi.mocked(unifiedEnrollmentManager.createEnrollment).mockResolvedValue(createdEnrollment);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollment = await result.current.createEnrollment(newEnrollmentData);
        expect(enrollment).toEqual(createdEnrollment);
      });
      
      expect(unifiedEnrollmentManager.createEnrollment).toHaveBeenCalledWith(newEnrollmentData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('should update enrollment with proper integration', async () => {
      const updates = { status: 'approved' as const, progress: 50 };
      const updatedEnrollment = { ...mockEnrollment, ...updates };
      
      mockUnifiedEnrollmentManager.updateEnrollment.mockResolvedValue(updatedEnrollment);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollment = await result.current.updateEnrollment('enrollment-123', updates);
        expect(enrollment).toEqual(updatedEnrollment);
      });
      
      expect(mockUnifiedEnrollmentManager.updateEnrollment).toHaveBeenCalledWith('enrollment-123', updates);
    });

    it('should delete enrollment with proper integration', async () => {
      mockUnifiedEnrollmentManager.deleteEnrollment.mockResolvedValue();
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.deleteEnrollment('enrollment-123');
      });
      
      expect(mockUnifiedEnrollmentManager.deleteEnrollment).toHaveBeenCalledWith('enrollment-123');
    });
  });

  describe('Enhanced Query Operations', () => {
    it('should get user enrollments with proper integration', async () => {
      const userEnrollments = [mockEnrollment];
      mockUnifiedEnrollmentManager.getUserEnrollments.mockResolvedValue(userEnrollments);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollments = await result.current.getUserEnrollments('user-123');
        expect(enrollments).toEqual(userEnrollments);
      });
      
      expect(mockUnifiedEnrollmentManager.getUserEnrollments).toHaveBeenCalledWith('user-123');
    });

    it('should get all enrollments with proper integration', async () => {
      const allEnrollments = [mockEnrollment, { ...mockEnrollment, id: 'enrollment-456' }];
      mockUnifiedEnrollmentManager.getAllEnrollments.mockResolvedValue(allEnrollments);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollments = await result.current.getAllEnrollments();
        expect(enrollments).toEqual(allEnrollments);
      });
      
      expect(mockUnifiedEnrollmentManager.getAllEnrollments).toHaveBeenCalled();
    });

    it('should get enrollment statistics with proper integration', async () => {
      const stats = {
        total: 10,
        pending: 3,
        approved: 6,
        rejected: 1,
        byStatus: { pending: 3, approved: 6, rejected: 1 }
      };
      
      mockUnifiedEnrollmentManager.getEnrollmentStatistics.mockResolvedValue(stats);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const statistics = await result.current.getEnrollmentStatistics();
        expect(statistics).toEqual(stats);
      });
      
      expect(mockUnifiedEnrollmentManager.getEnrollmentStatistics).toHaveBeenCalled();
    });
  });

  describe('Enhanced Status Operations', () => {
    it('should update enrollment status with proper integration', async () => {
      const updatedEnrollment = { ...mockEnrollment, status: 'approved' as const };
      mockUnifiedEnrollmentManager.updateEnrollmentStatus.mockResolvedValue(updatedEnrollment);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollment = await result.current.updateEnrollmentStatus('enrollment-123', 'approved', 'test@example.com');
        expect(enrollment).toEqual(updatedEnrollment);
      });
      
      expect(mockUnifiedEnrollmentManager.updateEnrollmentStatus).toHaveBeenCalledWith('enrollment-123', 'approved', 'test@example.com');
    });

    it('should update enrollment progress with proper integration', async () => {
      mockUnifiedEnrollmentManager.updateEnrollmentProgress.mockResolvedValue();
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.updateEnrollmentProgress('user-123', 'course-123', 75);
      });
      
      expect(mockUnifiedEnrollmentManager.updateEnrollmentProgress).toHaveBeenCalledWith('user-123', 'course-123', 75);
    });
  });

  describe('Enhanced Utility Functions', () => {
    it('should check if user is enrolled in course via UnifiedEnrollmentManager', async () => {
      mockUnifiedEnrollmentManager.isUserEnrolledInCourse.mockResolvedValue(true);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const isEnrolled = await result.current.isUserEnrolledInCourse('user-123', 'course-123');
        expect(isEnrolled).toBe(true);
      });
      
      expect(mockUnifiedEnrollmentManager.isUserEnrolledInCourse).toHaveBeenCalledWith('user-123', 'course-123');
    });

    it('should get user enrollment for course via UnifiedEnrollmentManager', async () => {
      mockUnifiedEnrollmentManager.getUserEnrollmentForCourse.mockResolvedValue(mockEnrollment);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollment = await result.current.getUserEnrollmentForCourse('user-123', 'course-123');
        expect(enrollment).toEqual(mockEnrollment);
      });
      
      expect(mockUnifiedEnrollmentManager.getUserEnrollmentForCourse).toHaveBeenCalledWith('user-123', 'course-123');
    });
  });

  describe('Enhanced Sync Operations', () => {
    it('should sync enrollments with proper integration', async () => {
      mockUnifiedEnrollmentManager.forceSynchronization.mockResolvedValue();
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.syncEnrollments();
      });
      
      expect(mockUnifiedEnrollmentManager.forceSynchronization).toHaveBeenCalled();
    });

    it('should force synchronization with proper integration', async () => {
      mockUnifiedEnrollmentManager.forceSynchronization.mockResolvedValue();
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.forceSynchronization();
      });
      
      expect(mockUnifiedEnrollmentManager.forceSynchronization).toHaveBeenCalled();
    });

    it('should force refresh data with proper integration', async () => {
      mockUnifiedEnrollmentManager.forceSynchronization.mockResolvedValue();
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.forceRefresh();
      });
      
      expect(mockUnifiedEnrollmentManager.forceSynchronization).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle CRUD operation errors properly', async () => {
      const error = new Error('Operation failed');
      mockUnifiedEnrollmentManager.createEnrollment.mockRejectedValue(error);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        try {
          await result.current.createEnrollment({
            user_id: 'user-123',
            course_id: 'course-456'
          });
        } catch (err) {
          expect(err).toBe(error);
        }
      });
      
      expect(result.current.error).toBe('Operation failed');
      expect(result.current.loading).toBe(false);
    });

    it('should handle query operation errors properly', async () => {
      const error = new Error('Query failed');
      mockUnifiedEnrollmentManager.getAllEnrollments.mockRejectedValue(error);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollments = await result.current.getAllEnrollments();
        expect(enrollments).toEqual([]);
      });
      
      expect(result.current.error).toBe('Query failed');
      expect(result.current.loading).toBe(false);
    });

    it('should handle sync operation errors properly', async () => {
      const error = new Error('Sync failed');
      mockUnifiedEnrollmentManager.forceSynchronization.mockRejectedValue(error);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        try {
          await result.current.syncEnrollments();
        } catch (err) {
          expect(err).toBe(error);
        }
      });
      
      expect(result.current.error).toBe('Sync failed');
      expect(result.current.loading).toBe(false);
    });
  });

  describe('Loading States', () => {
    it('should manage loading states correctly for CRUD operations', async () => {
      let resolveCreate: (value: any) => void;
      const createPromise = new Promise(resolve => {
        resolveCreate = resolve;
      });
      
      mockUnifiedEnrollmentManager.createEnrollment.mockReturnValue(createPromise);
      
      const { result } = renderHook(() => useDataManager());
      
      act(() => {
        result.current.createEnrollment({
          user_id: 'user-123',
          course_id: 'course-456'
        });
      });
      
      // Should be loading
      expect(result.current.loading).toBe(true);
      
      act(() => {
        resolveCreate!(mockEnrollment);
      });
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });

    it('should manage loading states correctly for query operations', async () => {
      let resolveQuery: (value: any) => void;
      const queryPromise = new Promise(resolve => {
        resolveQuery = resolve;
      });
      
      mockUnifiedEnrollmentManager.getAllEnrollments.mockReturnValue(queryPromise);
      
      const { result } = renderHook(() => useDataManager());
      
      act(() => {
        result.current.getAllEnrollments();
      });
      
      // Should be loading
      expect(result.current.loading).toBe(true);
      
      act(() => {
        resolveQuery!([mockEnrollment]);
      });
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });
});