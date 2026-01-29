import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useEnrollments } from '../useEnrollments';

// Mock dependencies
vi.mock('../useDataManager', () => ({
  useDataManager: vi.fn(() => ({
    enrollments: [],
    loading: false,
    error: null,
    createEnrollment: vi.fn(),
    updateEnrollmentProgress: vi.fn(),
    isEnrolled: vi.fn(() => false),
    hasPendingEnrollment: vi.fn(() => false),
    getEnrollment: vi.fn(() => null),
    refresh: vi.fn()
  }))
}));

vi.mock('@/hooks/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    user: {
      id: 'test-user-id',
      email: 'test@example.com'
    }
  }))
}));

vi.mock('@/services/UnifiedEnrollmentManager', () => ({
  unifiedEnrollmentManager: {
    updateEnrollmentStatus: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  }
}));

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: vi.fn()
    }
  }
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}));

describe('useEnrollments Migration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should use useDataManager instead of direct localStorage access', () => {
    const { result } = renderHook(() => useEnrollments());

    expect(result.current).toHaveProperty('enrollments');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('isEnrolled');
    expect(result.current).toHaveProperty('hasPendingEnrollment');
    expect(result.current).toHaveProperty('getEnrollment');
  });

  it('should delegate isEnrolled to useDataManager', () => {
    const mockUseDataManager = vi.mocked(require('../useDataManager').useDataManager);
    const mockIsEnrolled = vi.fn(() => true);
    
    mockUseDataManager.mockReturnValue({
      enrollments: [],
      loading: false,
      error: null,
      createEnrollment: vi.fn(),
      updateEnrollmentProgress: vi.fn(),
      isEnrolled: mockIsEnrolled,
      hasPendingEnrollment: vi.fn(() => false),
      getEnrollment: vi.fn(() => null),
      refresh: vi.fn()
    });

    const { result } = renderHook(() => useEnrollments());
    
    const isEnrolled = result.current.isEnrolled('test-course-id');
    
    expect(mockIsEnrolled).toHaveBeenCalledWith('test-course-id');
    expect(isEnrolled).toBe(true);
  });

  it('should delegate hasPendingEnrollment to useDataManager', () => {
    const mockUseDataManager = vi.mocked(require('../useDataManager').useDataManager);
    const mockHasPendingEnrollment = vi.fn(() => true);
    
    mockUseDataManager.mockReturnValue({
      enrollments: [],
      loading: false,
      error: null,
      createEnrollment: vi.fn(),
      updateEnrollmentProgress: vi.fn(),
      isEnrolled: vi.fn(() => false),
      hasPendingEnrollment: mockHasPendingEnrollment,
      getEnrollment: vi.fn(() => null),
      refresh: vi.fn()
    });

    const { result } = renderHook(() => useEnrollments());
    
    const hasPending = result.current.hasPendingEnrollment('test-course-id');
    
    expect(mockHasPendingEnrollment).toHaveBeenCalledWith('test-course-id');
    expect(hasPending).toBe(true);
  });

  it('should delegate getEnrollment to useDataManager', () => {
    const mockUseDataManager = vi.mocked(require('../useDataManager').useDataManager);
    const mockEnrollment = { id: 'test-enrollment', course_id: 'test-course', status: 'approved' };
    const mockGetEnrollment = vi.fn(() => mockEnrollment);
    
    mockUseDataManager.mockReturnValue({
      enrollments: [],
      loading: false,
      error: null,
      createEnrollment: vi.fn(),
      updateEnrollmentProgress: vi.fn(),
      isEnrolled: vi.fn(() => false),
      hasPendingEnrollment: vi.fn(() => false),
      getEnrollment: mockGetEnrollment,
      refresh: vi.fn()
    });

    const { result } = renderHook(() => useEnrollments());
    
    const enrollment = result.current.getEnrollment('test-course-id');
    
    expect(mockGetEnrollment).toHaveBeenCalledWith('test-course-id');
    expect(enrollment).toBe(mockEnrollment);
  });

  it('should use UnifiedEnrollmentManager for enrollment creation', async () => {
    const mockUseDataManager = vi.mocked(require('../useDataManager').useDataManager);
    const mockCreateEnrollment = vi.fn().mockResolvedValue({ id: 'new-enrollment' });
    
    mockUseDataManager.mockReturnValue({
      enrollments: [],
      loading: false,
      error: null,
      createEnrollment: mockCreateEnrollment,
      updateEnrollmentProgress: vi.fn(),
      isEnrolled: vi.fn(() => false),
      hasPendingEnrollment: vi.fn(() => false),
      getEnrollment: vi.fn(() => null),
      refresh: vi.fn()
    });

    const { result } = renderHook(() => useEnrollments());
    
    await act(async () => {
      await result.current.enrollInCourse('test-course-id', 'Test Course');
    });
    
    expect(mockCreateEnrollment).toHaveBeenCalledWith({
      user_id: 'test-user-id',
      user_email: 'test@example.com',
      course_id: 'test-course-id',
      course_title: 'Test Course',
      status: 'pending',
      progress: 0
    });
  });

  it('should use UnifiedEnrollmentManager for progress updates', async () => {
    const mockUseDataManager = vi.mocked(require('../useDataManager').useDataManager);
    const mockUpdateEnrollmentProgress = vi.fn().mockResolvedValue(undefined);
    const mockRefresh = vi.fn();
    
    mockUseDataManager.mockReturnValue({
      enrollments: [],
      loading: false,
      error: null,
      createEnrollment: vi.fn(),
      updateEnrollmentProgress: mockUpdateEnrollmentProgress,
      isEnrolled: vi.fn(() => false),
      hasPendingEnrollment: vi.fn(() => false),
      getEnrollment: vi.fn(() => null),
      refresh: mockRefresh
    });

    const { result } = renderHook(() => useEnrollments());
    
    await act(async () => {
      await result.current.updateProgress('test-course-id', 75);
    });
    
    expect(mockUpdateEnrollmentProgress).toHaveBeenCalledWith('test-user-id', 'test-course-id', 75);
  });
});