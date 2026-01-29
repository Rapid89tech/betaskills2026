import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CourseGridEnrollmentButton } from '../../components/courses/CourseGridEnrollmentButton';
import { Course } from '../../pages/Course';
import { UnifiedEnrollmentValidator } from '../../services/UnifiedEnrollmentValidator';
import { EnhancedNavigationHandler } from '../../services/EnhancedNavigationHandler';
import { CourseContentValidator } from '../../services/CourseContentValidator';
import { NavigationErrorHandler } from '../../services/NavigationErrorHandler';
import { supabase } from '../../integrations/supabase/client';

// Mock services
vi.mock('../../services/UnifiedEnrollmentValidator');
vi.mock('../../services/EnhancedNavigationHandler');
vi.mock('../../services/CourseContentValidator');
vi.mock('../../services/NavigationErrorHandler');
vi.mock('../../integrations/supabase/client');

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ courseId: 'test-course-1' }),
  };
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Mock course data
const mockCourse = {
  id: 'test-course-1',
  title: 'Test Course',
  description: 'A test course for navigation testing',
  modules: [
    {
      id: 'module-1',
      title: 'Module 1',
      lessons: [
        { id: 'lesson-1', title: 'Lesson 1', content: 'Test content' },
        { id: 'lesson-2', title: 'Lesson 2', content: 'Test content' },
      ],
    },
  ],
  lessons: [
    { id: 'lesson-1', title: 'Lesson 1', content: 'Test content' },
    { id: 'lesson-2', title: 'Lesson 2', content: 'Test content' },
  ],
};

describe('Course Navigation Flow Integration Tests', () => {
  let mockEnrollmentValidator: any;
  let mockNavigationHandler: any;
  let mockContentValidator: any;
  let mockErrorHandler: any;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    mockNavigate.mockClear();

    // Setup service mocks
    mockEnrollmentValidator = {
      validateEnrollment: vi.fn(),
      checkAllSources: vi.fn(),
      reconcileEnrollmentData: vi.fn(),
    };

    mockNavigationHandler = {
      navigateToCourse: vi.fn(),
      validateAccess: vi.fn(),
      handleNavigationError: vi.fn(),
    };

    mockContentValidator = {
      validateCourseData: vi.fn(),
      createFallbackCourse: vi.fn(),
    };

    mockErrorHandler = {
      handleError: vi.fn(),
      getRecoveryOptions: vi.fn(),
    };

    // Mock service instances
    (UnifiedEnrollmentValidator as any).mockImplementation(() => mockEnrollmentValidator);
    (EnhancedNavigationHandler as any).mockImplementation(() => mockNavigationHandler);
    (CourseContentValidator as any).mockImplementation(() => mockContentValidator);
    (NavigationErrorHandler as any).mockImplementation(() => mockErrorHandler);

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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Successful Navigation Flow', () => {
    it('should navigate from Continue Course button to course content for enrolled user', async () => {
      // Setup: User is enrolled
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
      });

      mockNavigationHandler.navigateToCourse.mockResolvedValue({
        success: true,
        destination: '/course/test-course-1',
      });

      mockNavigationHandler.validateAccess.mockResolvedValue({
        hasAccess: true,
        enrollmentStatus: 'enrolled',
        accessLevel: 'full',
      });

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
      });

      // Mock course data loading
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      // Render CourseGridEnrollmentButton
      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Find and click Continue Course button
      const continueButton = screen.getByText('Continue Course');
      expect(continueButton).toBeInTheDocument();

      fireEvent.click(continueButton);

      // Verify navigation handler was called
      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledWith('test-course-1');
      });

      // Verify successful navigation
      expect(mockNavigate).toHaveBeenCalledWith('/course/test-course-1');
    });

    it('should load course content properly after navigation', async () => {
      // Setup: Valid enrollment and course data
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

      // Mock course data loading
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      // Render Course page
      render(
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      // Wait for course content to load
      await waitFor(() => {
        expect(screen.getByText('Test Course')).toBeInTheDocument();
      });

      // Verify course player is shown (not enrollment form)
      expect(screen.queryByText('Enroll Now')).not.toBeInTheDocument();
      
      // Verify lessons are available
      await waitFor(() => {
        expect(screen.getByText('Lesson 1')).toBeInTheDocument();
        expect(screen.getByText('Lesson 2')).toBeInTheDocument();
      });
    });
  });

  describe('Different Enrollment States', () => {
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
            course={mockCourse}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const enrollButton = screen.getByText('Enroll Now');
      expect(enrollButton).toBeInTheDocument();
      expect(screen.queryByText('Continue Course')).not.toBeInTheDocument();
    });

    it('should handle unenrolled status and show enrollment form', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: false,
        status: 'unenrolled',
        confidence: 'high',
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mkReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      render(
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      });

      expect(screen.queryByText('Continue Course')).not.toBeInTheDocument();
    });

    it('should handle conflicting enrollment data sources', async () => {
      // Setup conflicting sources
      mockEnrollmentValidator.checkAllSources.mockResolvedValue([
        { type: 'localStorage', data: { enrolled: true }, reliability: 0.8 },
        { type: 'api', data: { enrolled: false }, reliability: 0.9 },
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
            course={mockCourse}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should show enrollment button since API source indicates not enrolled
      expect(screen.getByText('Enroll Now')).toBeInTheDocument();
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle course not found error', async () => {
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
          recoverable: true,
          suggestedAction: 'Try refreshing the page',
        },
      });

      mockErrorHandler.handleError.mockReturnValue({
        message: 'Course not found. Please try refreshing the page.',
        actions: ['refresh', 'contact_support'],
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(mockErrorHandler.handleError).toHaveBeenCalled();
      });
    });

    it('should handle network errors with retry mechanism', async () => {
      let callCount = 0;
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
          destination: '/course/test-course-1',
        });
      });

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      fireEvent.click(continueButton);

      // Should retry and eventually succeed
      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledTimes(2);
      });
    });

    it('should handle missing course content gracefully', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      // Course exists but has no content
      const emptyCourse = { ...mockCourse, modules: [], lessons: [] };
      
      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: false,
        hasModules: false,
        hasLessons: false,
        canProceed: false,
        missingData: ['modules', 'lessons'],
      });

      mockContentValidator.createFallbackCourse.mockReturnValue({
        ...emptyCourse,
        modules: [{ id: 'placeholder', title: 'Content Coming Soon', lessons: [] }],
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
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Content Coming Soon')).toBeInTheDocument();
      });

      // Should show fallback content instead of breaking
      expect(mockContentValidator.createFallbackCourse).toHaveBeenCalled();
    });

    it('should handle enrollment validation failures', async () => {
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
            course={mockCourse}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const enrollButton = screen.getByText('Enroll Now');
      fireEvent.click(enrollButton);

      await waitFor(() => {
        expect(mockErrorHandler.handleError).toHaveBeenCalled();
      });
    });
  });

  describe('Cross-Browser and Device Compatibility', () => {
    it('should handle mobile navigation', async () => {
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
        destination: '/course/test-course-1',
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalled();
      });
    });

    it('should handle touch events on mobile devices', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      
      // Simulate touch events
      fireEvent.touchStart(continueButton);
      fireEvent.touchEnd(continueButton);

      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalled();
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
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      fireEvent.click(continueButton);

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      });

      // Resolve navigation
      resolveNavigation!({
        success: true,
        destination: '/course/test-course-1',
      });

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
    });

    it('should handle navigation timeout', async () => {
      vi.useFakeTimers();

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      // Navigation takes too long
      mockNavigationHandler.navigateToCourse.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      mockErrorHandler.handleError.mockReturnValue({
        message: 'Navigation is taking longer than expected. Please try again.',
        actions: ['retry', 'refresh'],
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      fireEvent.click(continueButton);

      // Fast-forward time to trigger timeout
      vi.advanceTimersByTime(10000);

      await waitFor(() => {
        expect(mockErrorHandler.handleError).toHaveBeenCalled();
      });

      vi.useRealTimers();
    });
  });
});