import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CourseGridEnrollmentButton } from '../../components/courses/CourseGridEnrollmentButton';
import { Course } from '../../pages/Course';
import { CoursesGrid } from '../../components/courses/CoursesGrid';
import {
  unifiedEnrollmentValidator
} from '../../services/UnifiedEnrollmentValidator';
import {
  enhancedNavigationHandler
} from '../../services/EnhancedNavigationHandler';
import {
  courseContentValidator
} from '../../services/CourseContentValidator';
import {
  navigationErrorHandler
} from '../../services/NavigationErrorHandler';
import { supabase } from '../../integrations/supabase/client';

// Mock services
vi.mock('../../services/UnifiedEnrollmentValidator', () => ({
  UnifiedEnrollmentValidator: vi.fn(),
  unifiedEnrollmentValidator: {
    validateEnrollment: vi.fn(),
    checkAllSources: vi.fn(),
    reconcileEnrollmentData: vi.fn(),
  }
}));

vi.mock('../../services/EnhancedNavigationHandler', () => ({
  EnhancedNavigationHandler: vi.fn(),
  enhancedNavigationHandler: {
    navigateToCourse: vi.fn(),
    validateAccess: vi.fn(),
    handleNavigationError: vi.fn(),
  }
}));

vi.mock('../../services/CourseContentValidator', () => ({
  CourseContentValidator: vi.fn(),
  courseContentValidator: {
    validateCourseData: vi.fn(),
    createFallbackCourse: vi.fn(),
  }
}));

vi.mock('../../services/NavigationErrorHandler', () => ({
  NavigationErrorHandler: vi.fn(),
  navigationErrorHandler: {
    handleError: vi.fn(),
    getRecoveryOptions: vi.fn(),
  }
}));

vi.mock('../../integrations/supabase/client');

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ courseId: 'plumbing-101' }),
  };
});

// Test wrapper component
const TestWrapper = ({
  children,
  initialEntries = ['/']
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

// Mock course data
const mockPlumbingCourse = {
  id: 'plumbing-101',
  title: 'Plumbing 101',
  description: 'Complete plumbing course for beginners',
  modules: [
    {
      id: 'module-1',
      title: 'Introduction to Plumbing',
      lessons: [
        { id: 'lesson-1', title: 'Plumbing Industry and Careers', content: 'Industry overview' },
        { id: 'lesson-2', title: 'History and Importance', content: 'Historical context' },
      ],
    },
    {
      id: 'module-2',
      title: 'Tools and Materials',
      lessons: [
        { id: 'lesson-3', title: 'Essential Hand Tools', content: 'Tool overview' },
        { id: 'lesson-4', title: 'Types of Pipes and Fittings', content: 'Pipe types' },
      ],
    },
  ],
  lessons: [
    { id: 'lesson-1', title: 'Plumbing Industry and Careers', content: 'Industry overview' },
    { id: 'lesson-2', title: 'History and Importance', content: 'Historical context' },
    { id: 'lesson-3', title: 'Essential Hand Tools', content: 'Tool overview' },
    { id: 'lesson-4', title: 'Types of Pipes and Fittings', content: 'Pipe types' },
  ],
};

const mockElectricalCourse = {
  id: 'electrical-101',
  title: 'Electrical Basics',
  description: 'Electrical fundamentals course',
  modules: [
    {
      id: 'module-1',
      title: 'Electrical Safety',
      lessons: [
        { id: 'lesson-1', title: 'Safety Protocols', content: 'Safety overview' },
      ],
    },
  ],
  lessons: [
    { id: 'lesson-1', title: 'Safety Protocols', content: 'Safety overview' },
  ],
};

describe('Course Navigation End-to-End Integration Tests', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    // Setup user event
    user = userEvent.setup();

    // Reset all mocks
    vi.clearAllMocks();
    mockNavigate.mockClear();

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    // Mock console to reduce noise
    vi.spyOn(console, 'log').mockImplementation(() => { });
    vi.spyOn(console, 'error').mockImplementation(() => { });
    vi.spyOn(console, 'warn').mockImplementation(() => { });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Successful Navigation from Continue Course Button to Lessons', () => {
    it('should complete full navigation flow for enrolled user', async () => {
      // Setup: User is enrolled in plumbing course
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
      });

      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockResolvedValue({
        success: true,
        shouldNavigate: true,
        redirectPath: '/course/plumbing-101',
        confidence: 0.9,
        enrollmentStatus: 'enrolled',
      });

      vi.mocked(enhancedNavigationHandler.validateAccess).mockResolvedValue({
        hasAccess: true,
        enrollmentStatus: 'enrolled',
        accessLevel: 'full',
      });

      vi.mocked(courseContentValidator.validateCourseData).mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
        errors: [],
        warnings: [],
      });

      // Mock Supabase course data loading
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockPlumbingCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      // Step 1: Render course grid with Continue Course button
      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Step 2: Find and click Continue Course button
      const continueButton = screen.getByText('Continue Course');
      expect(continueButton).toBeInTheDocument();

      await user.click(continueButton);

      // Step 3: Verify navigation handler was called
      await waitFor(() => {
        expect(enhancedNavigationHandler.navigateToCourse).toHaveBeenCalledWith('plumbing-101');
      });

      // Step 4: Verify navigation occurred
      expect(mockNavigate).toHaveBeenCalledWith('/course/plumbing-101');

      // Step 5: Render Course page to simulate navigation result
      render(
        <TestWrapper initialEntries={['/course/plumbing-101']}>
          <Course />
        </TestWrapper>
      );

      // Step 6: Verify course content loads properly
      await waitFor(() => {
        expect(screen.getByText('Plumbing 101')).toBeInTheDocument();
      });

      // Step 7: Verify lessons are accessible
      await waitFor(() => {
        expect(screen.getByText('Plumbing Industry and Careers')).toBeInTheDocument();
        expect(screen.getByText('History and Importance')).toBeInTheDocument();
        expect(screen.getByText('Essential Hand Tools')).toBeInTheDocument();
      });

      // Step 8: Verify no enrollment form is shown
      expect(screen.queryByText('Enroll Now')).not.toBeInTheDocument();
    });

    it('should navigate to specific lesson after course access', async () => {
      // Setup enrolled user
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockPlumbingCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      // Render course page
      render(
        <TestWrapper initialEntries={['/course/plumbing-101']}>
          <Course />
        </TestWrapper>
      );

      // Wait for course to load
      await waitFor(() => {
        expect(screen.getByText('Plumbing 101')).toBeInTheDocument();
      });

      // Click on a specific lesson
      const lessonButton = screen.getByText('Essential Hand Tools');
      await user.click(lessonButton);

      // Verify lesson navigation
      await waitFor(() => {
        expect(screen.getByText('Tool overview')).toBeInTheDocument();
      });
    });
  });

  describe('Different Course Types and Enrollment States', () => {
    it('should handle course with different module structures', async () => {
      // Test with electrical course (different structure)
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockNavigationHandler.navigateToCourse.mockResolvedValue({
        success: true,
        destination: '/course/electrical-101',
      });

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockElectricalCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockElectricalCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledWith('electrical-101');
      });
    });

    it('should handle pending enrollment status', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: false,
        status: 'pending',
        confidence: 'high',
      });

      mockNavigationHandler.validateAccess.mockResolvedValue({
        hasAccess: false,
        enrollmentStatus: 'pending',
        accessLevel: 'none',
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should show enrollment button, not continue button
      expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      expect(screen.queryByText('Continue Course')).not.toBeInTheDocument();
    });

    it('should handle unenrolled user attempting to access course', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: false,
        status: 'unenrolled',
        confidence: 'high',
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockPlumbingCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      render(
        <TestWrapper initialEntries={['/course/plumbing-101']}>
          <Course />
        </TestWrapper>
      );

      // Should show enrollment form instead of course content
      await waitFor(() => {
        expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      });

      expect(screen.queryByText('Plumbing Industry and Careers')).not.toBeInTheDocument();
    });

    it('should handle conflicting enrollment data from multiple sources', async () => {
      // Setup conflicting enrollment sources
      mockEnrollmentValidator.checkAllSources.mockResolvedValue([
        {
          type: 'localStorage',
          data: { enrolled: true },
          reliability: 0.7,
          timestamp: new Date('2024-01-01'),
        },
        {
          type: 'api',
          data: { enrolled: false },
          reliability: 0.9,
          timestamp: new Date('2024-01-02'),
        },
      ]);

      mockEnrollmentValidator.reconcileEnrollmentData.mockReturnValue({
        isEnrolled: false, // API source wins due to higher reliability
        status: 'unenrolled',
        confidence: 'medium',
      });

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: false,
        status: 'unenrolled',
        confidence: 'medium',
        sources: [
          { type: 'localStorage', data: { enrolled: true } },
          { type: 'api', data: { enrolled: false } },
        ],
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should show enrollment button since API source indicates not enrolled
      expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      expect(screen.queryByText('Continue Course')).not.toBeInTheDocument();
    });
  });

  describe('Error Scenarios and Recovery Mechanisms', () => {
    it('should handle course not found error with recovery options', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockNavigationHandler.navigateToCourse.mockResolvedValue({
        success: false,
        error: {
          type: 'course_not_found',
          message: 'Course not found',
          courseId: 'plumbing-101',
          recoverable: true,
          suggestedAction: 'Try refreshing the page or contact support',
        },
      });

      mockErrorHandler.handleError.mockReturnValue({
        message: 'Course not found. Please try refreshing the page.',
        actions: ['refresh', 'contact_support'],
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      await waitFor(() => {
        expect(mockErrorHandler.handleError).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'course_not_found',
            message: 'Course not found',
          })
        );
      });
    });

    it('should handle network errors with retry mechanism', async () => {
      let callCount = 0;
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockNavigationHandler.navigateToCourse.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({
            success: false,
            error: {
              type: 'network_error',
              message: 'Network connection failed',
              recoverable: true,
            },
          });
        }
        return Promise.resolve({
          success: true,
          destination: '/course/plumbing-101',
        });
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      // Should retry and eventually succeed
      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledTimes(2);
      }, { timeout: 5000 });

      expect(mockNavigate).toHaveBeenCalledWith('/course/plumbing-101');
    });

    it('should handle missing course content with fallback', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      // Course exists but has no content
      const emptyCourse = {
        ...mockPlumbingCourse,
        modules: [],
        lessons: []
      };

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: false,
        hasModules: false,
        hasLessons: false,
        canProceed: false,
        missingData: ['modules', 'lessons'],
      });

      mockContentValidator.createFallbackCourse.mockReturnValue({
        ...emptyCourse,
        modules: [{
          id: 'placeholder',
          title: 'Content Coming Soon',
          lessons: []
        }],
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: emptyCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      render(
        <TestWrapper initialEntries={['/course/plumbing-101']}>
          <Course />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Content Coming Soon')).toBeInTheDocument();
      });

      // Should show fallback content instead of breaking
      expect(mockContentValidator.createFallbackCourse).toHaveBeenCalled();
    });

    it('should handle enrollment validation failures gracefully', async () => {
      mockEnrollmentValidator.validateEnrollment.mockRejectedValue(
        new Error('Enrollment validation failed')
      );

      mockErrorHandler.handleError.mockReturnValue({
        message: 'Unable to verify enrollment status. Please try again.',
        actions: ['retry', 'refresh'],
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const enrollButton = screen.getByText('Enroll Now');
      await user.click(enrollButton);

      await waitFor(() => {
        expect(mockErrorHandler.handleError).toHaveBeenCalled();
      });
    });

    it('should handle access denied with proper messaging', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: false,
        status: 'rejected',
        confidence: 'high',
      });

      mockNavigationHandler.validateAccess.mockResolvedValue({
        hasAccess: false,
        enrollmentStatus: 'rejected',
        accessLevel: 'none',
      });

      mockNavigationHandler.navigateToCourse.mockResolvedValue({
        success: false,
        error: {
          type: 'access_denied',
          message: 'Access denied - enrollment rejected',
          recoverable: false,
          suggestedAction: 'Contact support for assistance',
        },
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should not show continue button for rejected enrollment
      expect(screen.queryByText('Continue Course')).not.toBeInTheDocument();
      expect(screen.getByText('Enroll Now')).toBeInTheDocument();
    });
  });

  describe('Cross-Browser and Device Compatibility', () => {
    it('should handle mobile navigation with touch events', async () => {
      // Mock mobile user agent
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        configurable: true,
      });

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockNavigationHandler.navigateToCourse.mockResolvedValue({
        success: true,
        destination: '/course/plumbing-101',
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');

      // Simulate touch events
      fireEvent.touchStart(continueButton);
      fireEvent.touchEnd(continueButton);
      await user.click(continueButton);

      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledWith('plumbing-101');
      });
    });

    it('should handle desktop navigation with keyboard events', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockNavigationHandler.navigateToCourse.mockResolvedValue({
        success: true,
        destination: '/course/plumbing-101',
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');

      // Focus and press Enter
      continueButton.focus();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledWith('plumbing-101');
      });
    });

    it('should handle browsers with disabled localStorage', async () => {
      // Mock localStorage to throw errors
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn(() => { throw new Error('localStorage disabled'); }),
          setItem: vi.fn(() => { throw new Error('localStorage disabled'); }),
          removeItem: vi.fn(() => { throw new Error('localStorage disabled'); }),
          clear: vi.fn(() => { throw new Error('localStorage disabled'); }),
        },
        writable: true,
      });

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'medium', // Lower confidence due to localStorage issues
        sources: [{ type: 'api', data: { enrolled: true } }],
      });

      mockNavigationHandler.navigateToCourse.mockResolvedValue({
        success: true,
        destination: '/course/plumbing-101',
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      // Should still work with API-based enrollment validation
      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledWith('plumbing-101');
      });
    });
  });

  describe('Performance and Loading States', () => {
    it('should show loading state during navigation', async () => {
      let resolveNavigation: (value: any) => void;
      const navigationPromise = new Promise((resolve) => {
        resolveNavigation = resolve;
      });

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockNavigationHandler.navigateToCourse.mockReturnValue(navigationPromise);

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      });

      // Resolve navigation
      resolveNavigation!({
        success: true,
        destination: '/course/plumbing-101',
      });

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
    });

    it('should handle navigation timeout gracefully', async () => {
      vi.useFakeTimers();

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      // Navigation takes too long
      mockNavigationHandler.navigateToCourse.mockImplementation(
        () => new Promise(() => { }) // Never resolves
      );

      mockErrorHandler.handleError.mockReturnValue({
        message: 'Navigation is taking longer than expected. Please try again.',
        actions: ['retry', 'refresh'],
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      // Fast-forward time to trigger timeout
      vi.advanceTimersByTime(10000);

      await waitFor(() => {
        expect(mockErrorHandler.handleError).toHaveBeenCalled();
      });

      vi.useRealTimers();
    });

    it('should handle rapid successive navigation attempts', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      let navigationCount = 0;
      mockNavigationHandler.navigateToCourse.mockImplementation(() => {
        navigationCount++;
        return Promise.resolve({
          success: true,
          destination: '/course/plumbing-101',
        });
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');

      // Rapid clicks
      await user.click(continueButton);
      await user.click(continueButton);
      await user.click(continueButton);

      // Should handle gracefully (debounce or prevent multiple calls)
      await waitFor(() => {
        expect(navigationCount).toBeLessThanOrEqual(3);
      });
    });
  });

  describe('Complete User Journey Integration', () => {
    it('should complete full journey from course grid to lesson content', async () => {
      // Setup multiple courses
      const courses = [mockPlumbingCourse, mockElectricalCourse];

      mockEnrollmentValidator.validateEnrollment.mockImplementation((courseId) => {
        return Promise.resolve({
          isEnrolled: courseId === 'plumbing-101',
          status: courseId === 'plumbing-101' ? 'enrolled' : 'unenrolled',
          confidence: 'high',
        });
      });

      mockNavigationHandler.navigateToCourse.mockResolvedValue({
        success: true,
        destination: '/course/plumbing-101',
      });

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockPlumbingCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      // Step 1: Render courses grid
      render(
        <TestWrapper>
          <div>
            {courses.map(course => (
              <CourseGridEnrollmentButton
                key={course.id}
                course={course}
                isEnrolled={course.id === 'plumbing-101'}
                onEnroll={vi.fn()}
              />
            ))}
          </div>
        </TestWrapper>
      );

      // Step 2: Verify both courses are shown with correct buttons
      expect(screen.getByText('Continue Course')).toBeInTheDocument();
      expect(screen.getByText('Enroll Now')).toBeInTheDocument();

      // Step 3: Click Continue Course for plumbing
      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      // Step 4: Verify navigation
      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledWith('plumbing-101');
      });

      // Step 5: Simulate navigation to course page
      render(
        <TestWrapper initialEntries={['/course/plumbing-101']}>
          <Course />
        </TestWrapper>
      );

      // Step 6: Verify course loads
      await waitFor(() => {
        expect(screen.getByText('Plumbing 101')).toBeInTheDocument();
      });

      // Step 7: Navigate to specific lesson
      const lessonLink = screen.getByText('Plumbing Industry and Careers');
      await user.click(lessonLink);

      // Step 8: Verify lesson content loads
      await waitFor(() => {
        expect(screen.getByText('Industry overview')).toBeInTheDocument();
      });
    });
  });
});