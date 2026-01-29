import { renderHook, act, waitFor } from '@testing-library/react';
import { useDataManager } from '../useDataManager';
import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { useAuth } from '../AuthContext';

// Mock dependencies
jest.mock('@/services/UnifiedEnrollmentManager');
jest.mock('../AuthContext');
jest.mock('@/utils/logger');

const mockUnifiedEnrollmentManager = unifiedEnrollmentManager as jest.Mocked<typeof unifiedEnrollmentManager>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('useDataManager Enhanced Hook', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: mockUser });
    
    // Setup default mock implementations
    mockUnifiedEnrollmentManager.getUserEnrollments.mockResolvedValue([mockEnrollment]);
    mockUnifiedEnrollmentManager.addEventListener = jest.fn();
    mockUnifiedEnrollmentManager.removeEventListener = jest.fn();
  });

  describe('Initialization and State Management', () => {
    it('should initialize with empty state when no user', async () => {
      mockUseAuth.mockReturnValue({ user: null });
      
      const { result } = renderHook(() => useDataManager());
      
      expect(result.current.enrollments).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('should load enrollments on mount when user is present', async () => {
      const { result } = renderHook(() => useDataManager());
      
      await waitFor(() => {
        expect(mockUnifiedEnrollmentManager.getUserEnrollments).toHaveBeenCalledWith('user-123');
      });
      
      await waitFor(() => {
        expect(result.current.enrollments).toEqual([mockEnrollment]);
        expect(result.current.loading).toBe(false);
      });
    });

    it('should handle loading states correctly', async () => {
      mockUnifiedEnrollmentManager.getUserEnrollments.mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve([mockEnrollment]), 100))
      );
      
      const { result } = renderHook(() => useDataManager());
      
      // Should start loading
      await waitFor(() => {
        expect(result.current.loading).toBe(true);
      });
      
      // Should finish loading
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.enrollments).toEqual([mockEnrollment]);
      });
    });

    it('should handle errors gracefully', async () => {
      const error = new Error('Failed to load enrollments');
      mockUnifiedEnrollmentManager.getUserEnrollments.mockRejectedValue(error);
      
      const { result } = renderHook(() => useDataManager());
      
      await waitFor(() => {
        expect(result.current.error).toBe('Failed to load enrollments');
        expect(result.current.loading).toBe(false);
        expect(result.current.enrollments).toEqual([]);
      });
    });
  });

  describe('CRUD Operations', () => {
    it('should create enrollment successfully', async () => {
      const newEnrollmentData = {
        user_id: 'user-123',
        course_id: 'course-456',
        course_title: 'New Course'
      };
      
      const createdEnrollment = { ...mockEnrollment, id: 'enrollment-456', course_id: 'course-456' };
      mockUnifiedEnrollmentManager.createEnrollment.mockResolvedValue(createdEnrollment);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollment = await result.current.createEnrollment(newEnrollmentData);
        expect(enrollment).toEqual(createdEnrollment);
      });
      
      expect(mockUnifiedEnrollmentManager.createEnrollment).toHaveBeenCalledWith(newEnrollmentData);
    });

    it('should update enrollment successfully', async () => {
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

    it('should delete enrollment successfully', async () => {
      mockUnifiedEnrollmentManager.deleteEnrollment.mockResolvedValue();
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.deleteEnrollment('enrollment-123');
      });
      
      expect(mockUnifiedEnrollmentManager.deleteEnrollment).toHaveBeenCalledWith('enrollment-123');
    });

    it('should handle CRUD operation errors', async () => {
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
    });
  });

  describe('Query Operations', () => {
    it('should get user enrollments', async () => {
      const userEnrollments = [mockEnrollment];
      mockUnifiedEnrollmentManager.getUserEnrollments.mockResolvedValue(userEnrollments);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollments = await result.current.getUserEnrollments('user-123');
        expect(enrollments).toEqual(userEnrollments);
      });
      
      expect(mockUnifiedEnrollmentManager.getUserEnrollments).toHaveBeenCalledWith('user-123');
    });

    it('should get all enrollments', async () => {
      const allEnrollments = [mockEnrollment, { ...mockEnrollment, id: 'enrollment-456' }];
      mockUnifiedEnrollmentManager.getAllEnrollments.mockResolvedValue(allEnrollments);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollments = await result.current.getAllEnrollments();
        expect(enrollments).toEqual(allEnrollments);
      });
      
      expect(mockUnifiedEnrollmentManager.getAllEnrollments).toHaveBeenCalled();
    });

    it('should get enrollment statistics', async () => {
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

  describe('Status Operations', () => {
    it('should update enrollment status', async () => {
      const updatedEnrollment = { ...mockEnrollment, status: 'approved' as const };
      mockUnifiedEnrollmentManager.updateEnrollmentStatus.mockResolvedValue(updatedEnrollment);
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        const enrollment = await result.current.updateEnrollmentStatus('enrollment-123', 'approved', 'test@example.com');
        expect(enrollment).toEqual(updatedEnrollment);
      });
      
      expect(mockUnifiedEnrollmentManager.updateEnrollmentStatus).toHaveBeenCalledWith('enrollment-123', 'approved', 'test@example.com');
    });

    it('should update enrollment progress', async () => {
      mockUnifiedEnrollmentManager.updateEnrollmentProgress.mockResolvedValue();
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.updateEnrollmentProgress('user-123', 'course-123', 75);
      });
      
      expect(mockUnifiedEnrollmentManager.updateEnrollmentProgress).toHaveBeenCalledWith('user-123', 'course-123', 75);
    });
  });

  describe('Utility Functions', () => {
    it('should check if user is enrolled locally', () => {
      const { result } = renderHook(() => useDataManager());
      
      // Wait for initial load
      act(() => {
        result.current.enrollments = [{ ...mockEnrollment, status: 'approved' }];
      });
      
      const isEnrolled = result.current.isEnrolled('course-123');
      expect(isEnrolled).toBe(true);
    });

    it('should check if user has pending enrollment locally', () => {
      const { result } = renderHook(() => useDataManager());
      
      // Wait for initial load
      act(() => {
        result.current.enrollments = [{ ...mockEnrollment, status: 'pending' }];
      });
      
      const hasPending = result.current.hasPendingEnrollment('course-123');
      expect(hasPending).toBe(true);
    });

    it('should get enrollment for course locally', () => {
      const { result } = renderHook(() => useDataManager());
      
      // Wait for initial load
      act(() => {
        result.current.enrollments = [mockEnrollment];
      });
      
      const enrollment = result.current.getEnrollment('course-123');
      expect(enrollment).toEqual(mockEnrollment);
    });

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

  describe('Sync Operations', () => {
    it('should sync enrollments', async () => {
      mockUnifiedEnrollmentManager.forceSynchronization.mockResolvedValue();
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.syncEnrollments();
      });
      
      expect(mockUnifiedEnrollmentManager.forceSynchronization).toHaveBeenCalled();
    });

    it('should force synchronization', async () => {
      mockUnifiedEnrollmentManager.forceSynchronization.mockResolvedValue();
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.forceSynchronization();
      });
      
      expect(mockUnifiedEnrollmentManager.forceSynchronization).toHaveBeenCalled();
    });

    it('should refresh data', async () => {
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.refresh();
      });
      
      // Should call getUserEnrollments again
      expect(mockUnifiedEnrollmentManager.getUserEnrollments).toHaveBeenCalledTimes(2); // Once on mount, once on refresh
    });

    it('should force refresh data', async () => {
      mockUnifiedEnrollmentManager.forceSynchronization.mockResolvedValue();
      
      const { result } = renderHook(() => useDataManager());
      
      await act(async () => {
        await result.current.forceRefresh();
      });
      
      expect(mockUnifiedEnrollmentManager.forceSynchronization).toHaveBeenCalled();
    });
  });

  describe('Event Handling', () => {
    it('should set up event listeners on mount', () => {
      renderHook(() => useDataManager());
      
      expect(mockUnifiedEnrollmentManager.addEventListener).toHaveBeenCalledWith('enrollment-created', expect.any(Function));
      expect(mockUnifiedEnrollmentManager.addEventListener).toHaveBeenCalledWith('enrollment-updated', expect.any(Function));
      expect(mockUnifiedEnrollmentManager.addEventListener).toHaveBeenCalledWith('enrollment-deleted', expect.any(Function));
      expect(mockUnifiedEnrollmentManager.addEventListener).toHaveBeenCalledWith('enrollment-status-changed', expect.any(Function));
      expect(mockUnifiedEnrollmentManager.addEventListener).toHaveBeenCalledWith('sync-completed', expect.any(Function));
      expect(mockUnifiedEnrollmentManager.addEventListener).toHaveBeenCalledWith('user-enrollments-updated', expect.any(Function));
    });

    it('should clean up event listeners on unmount', () => {
      const { unmount } = renderHook(() => useDataManager());
      
      unmount();
      
      expect(mockUnifiedEnrollmentManager.removeEventListener).toHaveBeenCalledWith('enrollment-created', expect.any(Function));
      expect(mockUnifiedEnrollmentManager.removeEventListener).toHaveBeenCalledWith('enrollment-updated', expect.any(Function));
      expect(mockUnifiedEnrollmentManager.removeEventListener).toHaveBeenCalledWith('enrollment-deleted', expect.any(Function));
      expect(mockUnifiedEnrollmentManager.removeEventListener).toHaveBeenCalledWith('enrollment-status-changed', expect.any(Function));
      expect(mockUnifiedEnrollmentManager.removeEventListener).toHaveBeenCalledWith('sync-completed', expect.any(Function));
      expect(mockUnifiedEnrollmentManager.removeEventListener).toHaveBeenCalledWith('user-enrollments-updated', expect.any(Function));
    });
  });

  describe('Special User Handling', () => {
    it('should provide special access for admin users', () => {
      mockUseAuth.mockReturnValue({ 
        user: { ...mockUser, email: 'john.doe@gmail.com' } 
      });
      
      const { result } = renderHook(() => useDataManager());
      
      const isEnrolled = result.current.isEnrolled('any-course-id');
      expect(isEnrolled).toBe(true);
    });

    it('should provide special access for specific users', () => {
      mockUseAuth.mockReturnValue({ 
        user: { ...mockUser, email: 'carlowalljee@gmail.com' } 
      });
      
      const { result } = renderHook(() => useDataManager());
      
      const isEnrolled = result.current.isEnrolled('any-course-id');
      expect(isEnrolled).toBe(true);
    });
  });
});