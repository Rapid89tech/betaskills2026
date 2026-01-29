import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useCoursePriorities } from '../useCoursePriorities';
import { useAuth } from '../AuthContext';
import { useFastDashboard } from '../useFastDashboard';

// Mock dependencies
vi.mock('../AuthContext');
vi.mock('../useFastDashboard');

const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User'
};

const mockEnrollments = [
  {
    id: 'enrollment-1',
    user_id: 'user-1',
    course_id: 'course-1',
    status: 'approved',
    enrolled_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'enrollment-2',
    user_id: 'user-1',
    course_id: 'course-2',
    status: 'pending',
    enrolled_at: '2024-01-14T09:00:00Z',
    updated_at: '2024-01-14T09:00:00Z'
  },
  {
    id: 'enrollment-3',
    user_id: 'user-1',
    course_id: 'course-3',
    status: 'rejected',
    enrolled_at: '2024-01-13T08:00:00Z',
    updated_at: '2024-01-13T08:00:00Z'
  }
];

describe('useCoursePriorities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementations
    (useAuth as any).mockReturnValue({
      user: mockUser
    });

    (useFastDashboard as any).mockReturnValue({
      userEnrollments: mockEnrollments,
      loading: false,
      error: null
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Priority Calculation', () => {
    it('should calculate course priorities correctly', async () => {
      const courseIds = ['course-1', 'course-2', 'course-3', 'course-4'];
      
      const { result } = renderHook(() => useCoursePriorities(courseIds));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.coursePriorities).toHaveLength(4);
      
      // Check enrolled course priority
      const enrolledCoursePriority = result.current.coursePriorities.find(
        p => p.courseId === 'course-1'
      );
      expect(enrolledCoursePriority).toMatchObject({
        courseId: 'course-1',
        enrollmentStatus: 'ENROLLED',
        priority: 0, // Highest priority
        displayOrder: 0
      });

      // Check pending course priority
      const pendingCoursePriority = result.current.coursePriorities.find(
        p => p.courseId === 'course-2'
      );
      expect(pendingCoursePriority).toMatchObject({
        courseId: 'course-2',
        enrollmentStatus: 'PENDING',
        priority: 1,
        displayOrder: 1
      });

      // Check not enrolled course priority
      const notEnrolledCoursePriority = result.current.coursePriorities.find(
        p => p.courseId === 'course-4'
      );
      expect(notEnrolledCoursePriority).toMatchObject({
        courseId: 'course-4',
        enrollmentStatus: 'NOT_ENROLLED',
        priority: 2,
        displayOrder: expect.any(Number)
      });
    });

    it('should sort course IDs by priority', async () => {
      const courseIds = ['course-4', 'course-1', 'course-2', 'course-3'];
      
      const { result } = renderHook(() => useCoursePriorities(courseIds));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Should be sorted: enrolled (course-1), pending (course-2), not enrolled (course-4, course-3)
      expect(result.current.sortedCourseIds).toEqual([
        'course-1', // enrolled
        'course-2', // pending
        'course-4', // not enrolled
        'course-3'  // rejected (treated as not enrolled)
      ]);
    });

    it('should group courses by enrollment status', async () => {
      const courseIds = ['course-1', 'course-2', 'course-3', 'course-4'];
      
      const { result } = renderHook(() => useCoursePriorities(courseIds));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.courseGroups).toMatchObject({
        hasEnrolled: true,
        hasPending: true,
        hasAvailable: true,
        totalEnrolled: 1,
        totalPending: 1,
        totalAvailable: 2 // course-3 (rejected) and course-4 (not enrolled)
      });

      expect(result.current.enrolledCourseIds).toEqual(['course-1']);
      expect(result.current.pendingCourseIds).toEqual(['course-2']);
    });

    it('should handle empty course list', async () => {
      const { result } = renderHook(() => useCoursePriorities([]));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.coursePriorities).toEqual([]);
      expect(result.current.sortedCourseIds).toEqual([]);
      expect(result.current.courseGroups).toMatchObject({
        hasEnrolled: false,
        hasPending: false,
        hasAvailable: false,
        totalEnrolled: 0,
        totalPending: 0,
        totalAvailable: 0
      });
    });

    it('should handle courses with no enrollments', async () => {
      (useFastDashboard as any).mockReturnValue({
        userEnrollments: [],
        loading: false,
        error: null
      });

      const courseIds = ['course-1', 'course-2', 'course-3'];
      
      const { result } = renderHook(() => useCoursePriorities(courseIds));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // All courses should be not enrolled
      result.current.coursePriorities.forEach(priority => {
        expect(priority.enrollmentStatus).toBe('NOT_ENROLLED');
        expect(priority.priority).toBe(2);
      });

      expect(result.current.courseGroups).toMatchObject({
        hasEnrolled: false,
        hasPending: false,
        hasAvailable: true,
        totalEnrolled: 0,
        totalPending: 0,
        totalAvailable: 3
      });
    });
  });

  describe('Status Indicators', () => {
    it('should provide status indicator function', async () => {
      const courseIds = ['course-1', 'course-2', 'course-3'];
      
      const { result } = renderHook(() => useCoursePriorities(courseIds));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(typeof result.current.getStatusIndicator).toBe('function');

      // Test status indicators
      const enrolledIndicator = result.current.getStatusIndicator('course-1');
      expect(enrolledIndicator).toMatchObject({
        status: 'ENROLLED',
        color: expect.any(String),
        icon: expect.any(String),
        label: expect.any(String)
      });

      const pendingIndicator = result.current.getStatusIndicator('course-2');
      expect(pendingIndicator).toMatchObject({
        status: 'PENDING',
        color: expect.any(String),
        icon: expect.any(String),
        label: expect.any(String)
      });

      const notEnrolledIndicator = result.current.getStatusIndicator('course-4');
      expect(notEnrolledIndicator).toMatchObject({
        status: 'NOT_ENROLLED',
        color: expect.any(String),
        icon: expect.any(String),
        label: expect.any(String)
      });
    });
  });

  describe('Loading States', () => {
    it('should show loading state initially', () => {
      (useFastDashboard as any).mockReturnValue({
        userEnrollments: [],
        loading: true,
        error: null
      });

      const { result } = renderHook(() => useCoursePriorities(['course-1']));

      expect(result.current.loading).toBe(true);
      expect(result.current.coursePriorities).toEqual([]);
    });

    it('should complete loading when dashboard data is ready', async () => {
      const { result } = renderHook(() => useCoursePriorities(['course-1', 'course-2']));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.coursePriorities).toHaveLength(2);
    });
  });

  describe('Error Handling', () => {
    it('should handle dashboard loading errors', async () => {
      (useFastDashboard as any).mockReturnValue({
        userEnrollments: [],
        loading: false,
        error: 'Failed to load enrollments'
      });

      const { result } = renderHook(() => useCoursePriorities(['course-1']));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Should still provide default priorities even with error
      expect(result.current.coursePriorities).toHaveLength(1);
      expect(result.current.coursePriorities[0].enrollmentStatus).toBe('NOT_ENROLLED');
    });

    it('should handle invalid enrollment data', async () => {
      const invalidEnrollments = [
        {
          id: 'invalid-1',
          // Missing required fields
          course_id: 'course-1',
          status: 'unknown_status'
        }
      ];

      (useFastDashboard as any).mockReturnValue({
        userEnrollments: invalidEnrollments,
        loading: false,
        error: null
      });

      const { result } = renderHook(() => useCoursePriorities(['course-1']));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Should handle invalid data gracefully
      expect(result.current.coursePriorities).toHaveLength(1);
    });
  });

  describe('User Authentication States', () => {
    it('should handle unauthenticated user', async () => {
      (useAuth as any).mockReturnValue({
        user: null
      });

      const { result } = renderHook(() => useCoursePriorities(['course-1', 'course-2']));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // All courses should be not enrolled for unauthenticated users
      result.current.coursePriorities.forEach(priority => {
        expect(priority.enrollmentStatus).toBe('NOT_ENROLLED');
      });

      expect(result.current.courseGroups).toMatchObject({
        hasEnrolled: false,
        hasPending: false,
        hasAvailable: true,
        totalEnrolled: 0,
        totalPending: 0,
        totalAvailable: 2
      });
    });

    it('should handle special user access', async () => {
      // Test special access for specific users
      (useAuth as any).mockReturnValue({
        user: {
          id: 'special-user',
          email: 'john.doe@gmail.com',
          first_name: 'John',
          last_name: 'Doe'
        }
      });

      (useFastDashboard as any).mockReturnValue({
        userEnrollments: [],
        loading: false,
        error: null
      });

      const { result } = renderHook(() => useCoursePriorities(['course-1', 'course-2']));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Special users might have different priority calculation
      expect(result.current.coursePriorities).toHaveLength(2);
    });
  });

  describe('Performance and Optimization', () => {
    it('should memoize calculations correctly', async () => {
      const courseIds = ['course-1', 'course-2', 'course-3'];
      
      const { result, rerender } = renderHook(
        ({ ids }) => useCoursePriorities(ids),
        { initialProps: { ids: courseIds } }
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const firstResult = result.current.coursePriorities;

      // Rerender with same course IDs
      rerender({ ids: courseIds });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Should return the same reference (memoized)
      expect(result.current.coursePriorities).toBe(firstResult);
    });

    it('should recalculate when course IDs change', async () => {
      const initialCourseIds = ['course-1', 'course-2'];
      const updatedCourseIds = ['course-1', 'course-2', 'course-3'];
      
      const { result, rerender } = renderHook(
        ({ ids }) => useCoursePriorities(ids),
        { initialProps: { ids: initialCourseIds } }
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.coursePriorities).toHaveLength(2);

      // Update course IDs
      rerender({ ids: updatedCourseIds });

      await waitFor(() => {
        expect(result.current.coursePriorities).toHaveLength(3);
      });
    });

    it('should handle large course lists efficiently', async () => {
      const largeCourseList = Array.from({ length: 1000 }, (_, i) => `course-${i}`);
      
      const startTime = Date.now();
      const { result } = renderHook(() => useCoursePriorities(largeCourseList));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      expect(result.current.coursePriorities).toHaveLength(1000);
      expect(processingTime).toBeLessThan(5000); // Should process within 5 seconds
    });
  });

  describe('Real-time Updates', () => {
    it('should update priorities when enrollments change', async () => {
      const { result, rerender } = renderHook(() => useCoursePriorities(['course-1', 'course-2']));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const initialEnrolledCount = result.current.courseGroups?.totalEnrolled || 0;

      // Simulate new enrollment
      const updatedEnrollments = [
        ...mockEnrollments,
        {
          id: 'enrollment-new',
          user_id: 'user-1',
          course_id: 'course-2',
          status: 'approved',
          enrolled_at: '2024-01-16T10:00:00Z',
          updated_at: '2024-01-16T10:00:00Z'
        }
      ];

      (useFastDashboard as any).mockReturnValue({
        userEnrollments: updatedEnrollments,
        loading: false,
        error: null
      });

      rerender();

      await waitFor(() => {
        expect(result.current.courseGroups?.totalEnrolled).toBeGreaterThan(initialEnrolledCount);
      });
    });

    it('should handle enrollment status changes', async () => {
      const { result, rerender } = renderHook(() => useCoursePriorities(['course-2']));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Initially pending
      expect(result.current.coursePriorities[0].enrollmentStatus).toBe('PENDING');

      // Simulate status change to approved
      const updatedEnrollments = mockEnrollments.map(enrollment =>
        enrollment.id === 'enrollment-2'
          ? { ...enrollment, status: 'approved' }
          : enrollment
      );

      (useFastDashboard as any).mockReturnValue({
        userEnrollments: updatedEnrollments,
        loading: false,
        error: null
      });

      rerender();

      await waitFor(() => {
        expect(result.current.coursePriorities[0].enrollmentStatus).toBe('ENROLLED');
      });
    });
  });
});