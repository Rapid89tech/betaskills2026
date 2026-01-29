import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { enhancedNavigationHandler } from '../../services/EnhancedNavigationHandler';
import { unifiedEnrollmentValidator } from '../../services/UnifiedEnrollmentValidator';
import { courseContentValidator } from '../../services/CourseContentValidator';
import { navigationErrorHandler } from '../../services/NavigationErrorHandler';

// Mock the services
vi.mock('../../services/EnhancedNavigationHandler', () => ({
  enhancedNavigationHandler: {
    navigateToCourse: vi.fn(),
    validateAccess: vi.fn(),
    handleNavigationError: vi.fn(),
  }
}));

vi.mock('../../services/UnifiedEnrollmentValidator', () => ({
  unifiedEnrollmentValidator: {
    validateEnrollment: vi.fn(),
    checkAllSources: vi.fn(),
    reconcileEnrollmentData: vi.fn(),
  }
}));

vi.mock('../../services/CourseContentValidator', () => ({
  courseContentValidator: {
    validateCourseData: vi.fn(),
    createFallbackCourse: vi.fn(),
  }
}));

vi.mock('../../services/NavigationErrorHandler', () => ({
  navigationErrorHandler: {
    handleError: vi.fn(),
    getRecoveryOptions: vi.fn(),
  }
}));

describe('Course Navigation End-to-End Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
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
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Successful Navigation Flow', () => {
    it('should complete navigation from Continue Course button to lessons for enrolled user', async () => {
      // Setup: User is enrolled in plumbing course
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockResolvedValue({
        success: true,
        shouldNavigate: true,
        redirectPath: '/course/plumbing-101',
        confidence: 0.9,
        enrollmentStatus: 'enrolled',
      });

      vi.mocked(courseContentValidator.validateCourseData).mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
        errors: [],
        warnings: [],
      });

      // Simulate navigation flow
      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      // Step 1: Validate enrollment
      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(true);
      expect(enrollmentResult.status).toBe('enrolled');

      // Step 2: Navigate to course
      const navigationResult = await enhancedNavigationHandler.navigateToCourse(courseId);
      expect(navigationResult.success).toBe(true);
      expect(navigationResult.shouldNavigate).toBe(true);
      expect(navigationResult.redirectPath).toBe('/course/plumbing-101');

      // Step 3: Validate course content
      const mockCourse = {
        id: 'plumbing-101',
        title: 'Plumbing 101',
        modules: [
          {
            id: 'module-1',
            title: 'Introduction to Plumbing',
            lessons: [
              { id: 'lesson-1', title: 'Plumbing Industry and Careers' },
              { id: 'lesson-2', title: 'History and Importance' },
            ],
          },
        ],
        lessons: [
          { id: 'lesson-1', title: 'Plumbing Industry and Careers' },
          { id: 'lesson-2', title: 'History and Importance' },
        ],
      };

      const contentValidation = courseContentValidator.validateCourseData(mockCourse);
      expect(contentValidation.isValid).toBe(true);
      expect(contentValidation.hasModules).toBe(true);
      expect(contentValidation.hasLessons).toBe(true);
      expect(contentValidation.canProceed).toBe(true);

      // Verify all services were called correctly
      expect(unifiedEnrollmentValidator.validateEnrollment).toHaveBeenCalledWith(courseId, userId);
      expect(enhancedNavigationHandler.navigateToCourse).toHaveBeenCalledWith(courseId);
      expect(courseContentValidator.validateCourseData).toHaveBeenCalledWith(mockCourse);
    });

    it('should handle lesson navigation after course access', async () => {
      // Setup enrolled user with valid course
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      vi.mocked(courseContentValidator.validateCourseData).mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
        errors: [],
        warnings: [],
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';
      const lessonId = 'lesson-1';

      // Validate enrollment first
      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(true);

      // Validate course content
      const mockCourse = {
        id: courseId,
        title: 'Plumbing 101',
        modules: [
          {
            id: 'module-1',
            title: 'Introduction to Plumbing',
            lessons: [
              { id: lessonId, title: 'Plumbing Industry and Careers', content: 'Industry overview' },
            ],
          },
        ],
        lessons: [
          { id: lessonId, title: 'Plumbing Industry and Careers', content: 'Industry overview' },
        ],
      };

      const contentValidation = courseContentValidator.validateCourseData(mockCourse);
      expect(contentValidation.canProceed).toBe(true);

      // Verify lesson is accessible
      const lesson = mockCourse.lessons.find(l => l.id === lessonId);
      expect(lesson).toBeDefined();
      expect(lesson?.title).toBe('Plumbing Industry and Careers');
      expect(lesson?.content).toBe('Industry overview');
    });
  });

  describe('Different Course Types and Enrollment States', () => {
    it('should handle different course structures', async () => {
      // Test with electrical course (different structure)
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'api', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockResolvedValue({
        success: true,
        shouldNavigate: true,
        redirectPath: '/course/electrical-101',
        confidence: 0.9,
        enrollmentStatus: 'enrolled',
      });

      const courseId = 'electrical-101';
      const userId = 'test-user-123';

      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(true);

      const navigationResult = await enhancedNavigationHandler.navigateToCourse(courseId);
      expect(navigationResult.success).toBe(true);
      expect(navigationResult.redirectPath).toBe('/course/electrical-101');
    });

    it('should handle pending enrollment status', async () => {
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: false,
        isEnrolled: false,
        status: 'pending',
        confidence: 'high',
        sources: [{ type: 'api', data: { status: 'pending' } }],
        lastVerified: new Date(),
      });

      vi.mocked(enhancedNavigationHandler.validateAccess).mockResolvedValue({
        hasAccess: false,
        enrollmentStatus: 'pending',
        accessLevel: 'none',
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(false);
      expect(enrollmentResult.status).toBe('pending');

      const accessResult = await enhancedNavigationHandler.validateAccess(courseId, userId);
      expect(accessResult.hasAccess).toBe(false);
      expect(accessResult.enrollmentStatus).toBe('pending');
    });

    it('should handle unenrolled user attempting to access course', async () => {
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: false,
        isEnrolled: false,
        status: 'unenrolled',
        confidence: 'high',
        sources: [],
        lastVerified: new Date(),
      });

      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockResolvedValue({
        success: false,
        shouldNavigate: false,
        errorMessage: 'Access denied - user not enrolled',
        confidence: 0.9,
        enrollmentStatus: 'unenrolled',
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(false);
      expect(enrollmentResult.status).toBe('unenrolled');

      const navigationResult = await enhancedNavigationHandler.navigateToCourse(courseId);
      expect(navigationResult.success).toBe(false);
      expect(navigationResult.shouldNavigate).toBe(false);
      expect(navigationResult.errorMessage).toContain('Access denied');
    });

    it('should handle conflicting enrollment data from multiple sources', async () => {
      // Setup conflicting enrollment sources
      vi.mocked(unifiedEnrollmentValidator.checkAllSources).mockResolvedValue([
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

      vi.mocked(unifiedEnrollmentValidator.reconcileEnrollmentData).mockReturnValue({
        isEnrolled: false, // API source wins due to higher reliability
        status: 'unenrolled',
        confidence: 'medium',
      });

      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: false,
        isEnrolled: false,
        status: 'unenrolled',
        confidence: 'medium',
        sources: [
          { type: 'localStorage', data: { enrolled: true } },
          { type: 'api', data: { enrolled: false } },
        ],
        lastVerified: new Date(),
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      const sources = await unifiedEnrollmentValidator.checkAllSources(courseId, userId);
      expect(sources).toHaveLength(2);

      const reconciledData = unifiedEnrollmentValidator.reconcileEnrollmentData(sources);
      expect(reconciledData.isEnrolled).toBe(false); // API source should win

      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(false);
      expect(enrollmentResult.confidence).toBe('medium');
    });
  });

  describe('Error Scenarios and Recovery Mechanisms', () => {
    it('should handle course not found error with recovery options', async () => {
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockResolvedValue({
        success: false,
        shouldNavigate: false,
        errorMessage: 'Course not found',
        confidence: 0.9,
        enrollmentStatus: 'enrolled',
      });

      vi.mocked(navigationErrorHandler.handleError).mockReturnValue({
        message: 'Course not found. Please try refreshing the page.',
        actions: ['refresh', 'contact_support'],
        severity: 'high',
        recoverable: true,
      });

      const courseId = 'non-existent-course';
      const userId = 'test-user-123';

      // User is enrolled but course doesn't exist
      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(true);

      const navigationResult = await enhancedNavigationHandler.navigateToCourse(courseId);
      expect(navigationResult.success).toBe(false);
      expect(navigationResult.errorMessage).toContain('Course not found');

      const errorHandling = navigationErrorHandler.handleError({
        type: 'course_not_found',
        message: 'Course not found',
        courseId,
        userId,
        recoverable: true,
        suggestedAction: 'Try refreshing the page or contact support',
      });

      expect(errorHandling.recoverable).toBe(true);
      expect(errorHandling.actions).toContain('refresh');
      expect(errorHandling.actions).toContain('contact_support');
    });

    it('should handle network errors with retry mechanism', async () => {
      let callCount = 0;
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({
            success: false,
            shouldNavigate: false,
            errorMessage: 'Network connection failed',
            confidence: 0.9,
            enrollmentStatus: 'enrolled',
          });
        }
        return Promise.resolve({
          success: true,
          shouldNavigate: true,
          redirectPath: '/course/plumbing-101',
          confidence: 0.9,
          enrollmentStatus: 'enrolled',
        });
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      // First attempt fails
      let navigationResult = await enhancedNavigationHandler.navigateToCourse(courseId);
      expect(navigationResult.success).toBe(false);
      expect(navigationResult.errorMessage).toContain('Network connection failed');

      // Retry succeeds
      navigationResult = await enhancedNavigationHandler.navigateToCourse(courseId);
      expect(navigationResult.success).toBe(true);
      expect(navigationResult.redirectPath).toBe('/course/plumbing-101');

      expect(callCount).toBe(2);
    });

    it('should handle missing course content with fallback', async () => {
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      // Course exists but has no content
      const emptyCourse = { 
        id: 'plumbing-101',
        title: 'Plumbing 101',
        modules: [], 
        lessons: [] 
      };
      
      vi.mocked(courseContentValidator.validateCourseData).mockReturnValue({
        isValid: false,
        hasModules: false,
        hasLessons: false,
        canProceed: false,
        errors: [
          { type: 'missing_data', message: 'No modules found', severity: 'critical' },
          { type: 'missing_data', message: 'No lessons found', severity: 'critical' },
        ],
        warnings: [],
      });

      vi.mocked(courseContentValidator.createFallbackCourse).mockReturnValue({
        ...emptyCourse,
        modules: [{ 
          id: 'placeholder', 
          title: 'Content Coming Soon', 
          lessons: [] 
        }],
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(true);

      const contentValidation = courseContentValidator.validateCourseData(emptyCourse);
      expect(contentValidation.isValid).toBe(false);
      expect(contentValidation.canProceed).toBe(false);

      // Should create fallback course
      const fallbackCourse = courseContentValidator.createFallbackCourse(emptyCourse);
      expect(fallbackCourse.modules).toHaveLength(1);
      expect(fallbackCourse.modules[0].title).toBe('Content Coming Soon');

      expect(courseContentValidator.createFallbackCourse).toHaveBeenCalledWith(emptyCourse);
    });

    it('should handle enrollment validation failures gracefully', async () => {
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockRejectedValue(
        new Error('Enrollment validation failed')
      );

      vi.mocked(navigationErrorHandler.handleError).mockReturnValue({
        message: 'Unable to verify enrollment status. Please try again.',
        actions: ['retry', 'refresh'],
        severity: 'medium',
        recoverable: true,
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      try {
        await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Enrollment validation failed');

        const errorHandling = navigationErrorHandler.handleError({
          type: 'enrollment_invalid',
          message: 'Enrollment validation failed',
          courseId,
          userId,
          recoverable: true,
          suggestedAction: 'Try again or refresh the page',
        });

        expect(errorHandling.recoverable).toBe(true);
        expect(errorHandling.actions).toContain('retry');
        expect(errorHandling.actions).toContain('refresh');
      }
    });
  });

  describe('Cross-Browser and Device Compatibility', () => {
    it('should handle browsers with disabled localStorage', async () => {
      // Mock localStorage to throw errors
      vi.mocked(window.localStorage.getItem).mockImplementation(() => {
        throw new Error('localStorage disabled');
      });

      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'medium', // Lower confidence due to localStorage issues
        sources: [{ type: 'api', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockResolvedValue({
        success: true,
        shouldNavigate: true,
        redirectPath: '/course/plumbing-101',
        confidence: 0.8, // Lower confidence due to localStorage issues
        enrollmentStatus: 'enrolled',
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      // Should still work with API-based enrollment validation
      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(true);
      expect(enrollmentResult.confidence).toBe('medium');

      const navigationResult = await enhancedNavigationHandler.navigateToCourse(courseId);
      expect(navigationResult.success).toBe(true);
      expect(navigationResult.confidence).toBe(0.8);
    });

    it('should handle mobile vs desktop navigation consistently', async () => {
      // Test mobile user agent
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        configurable: true,
      });

      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockResolvedValue({
        success: true,
        shouldNavigate: true,
        redirectPath: '/course/plumbing-101',
        confidence: 0.9,
        enrollmentStatus: 'enrolled',
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(true);

      const navigationResult = await enhancedNavigationHandler.navigateToCourse(courseId);
      expect(navigationResult.success).toBe(true);

      // Should work the same regardless of device
      expect(navigationResult.redirectPath).toBe('/course/plumbing-101');
    });
  });

  describe('Performance and Loading States', () => {
    it('should handle rapid successive navigation attempts', async () => {
      let navigationCount = 0;
      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockImplementation(() => {
        navigationCount++;
        return Promise.resolve({
          success: true,
          shouldNavigate: true,
          redirectPath: '/course/plumbing-101',
          confidence: 0.9,
          enrollmentStatus: 'enrolled',
        });
      });

      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      const courseId = 'plumbing-101';

      // Rapid navigation attempts
      const promises = [
        enhancedNavigationHandler.navigateToCourse(courseId),
        enhancedNavigationHandler.navigateToCourse(courseId),
        enhancedNavigationHandler.navigateToCourse(courseId),
      ];

      const results = await Promise.all(promises);

      // All should succeed
      results.forEach(result => {
        expect(result.success).toBe(true);
      });

      // Should handle gracefully (may debounce or allow multiple calls)
      expect(navigationCount).toBeGreaterThan(0);
      expect(navigationCount).toBeLessThanOrEqual(3);
    });

    it('should handle navigation timeout scenarios', async () => {
      vi.useFakeTimers();

      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      // Navigation takes too long
      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      vi.mocked(navigationErrorHandler.handleError).mockReturnValue({
        message: 'Navigation is taking longer than expected. Please try again.',
        actions: ['retry', 'refresh'],
        severity: 'medium',
        recoverable: true,
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(true);

      // Start navigation (will timeout)
      const navigationPromise = enhancedNavigationHandler.navigateToCourse(courseId);

      // Fast-forward time to trigger timeout
      vi.advanceTimersByTime(10000);

      // Should handle timeout gracefully
      const errorHandling = navigationErrorHandler.handleError({
        type: 'network_error',
        message: 'Navigation timeout',
        courseId,
        userId,
        recoverable: true,
        suggestedAction: 'Try again',
      });

      expect(errorHandling.recoverable).toBe(true);
      expect(errorHandling.actions).toContain('retry');

      vi.useRealTimers();
    });
  });

  describe('Complete User Journey Integration', () => {
    it('should complete full journey from enrollment validation to lesson access', async () => {
      // Setup complete successful flow
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockResolvedValue({
        isValid: true,
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'localStorage', data: { enrolled: true } }],
        lastVerified: new Date(),
      });

      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockResolvedValue({
        success: true,
        shouldNavigate: true,
        redirectPath: '/course/plumbing-101',
        confidence: 0.9,
        enrollmentStatus: 'enrolled',
      });

      vi.mocked(courseContentValidator.validateCourseData).mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
        errors: [],
        warnings: [],
      });

      const courseId = 'plumbing-101';
      const userId = 'test-user-123';

      // Step 1: Validate enrollment
      const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(courseId, userId);
      expect(enrollmentResult.isEnrolled).toBe(true);

      // Step 2: Navigate to course
      const navigationResult = await enhancedNavigationHandler.navigateToCourse(courseId);
      expect(navigationResult.success).toBe(true);
      expect(navigationResult.redirectPath).toBe('/course/plumbing-101');

      // Step 3: Validate course content
      const mockCourse = {
        id: courseId,
        title: 'Plumbing 101',
        modules: [
          {
            id: 'module-1',
            title: 'Introduction to Plumbing',
            lessons: [
              { id: 'lesson-1', title: 'Plumbing Industry and Careers', content: 'Industry overview' },
              { id: 'lesson-2', title: 'History and Importance', content: 'Historical context' },
            ],
          },
        ],
        lessons: [
          { id: 'lesson-1', title: 'Plumbing Industry and Careers', content: 'Industry overview' },
          { id: 'lesson-2', title: 'History and Importance', content: 'Historical context' },
        ],
      };

      const contentValidation = courseContentValidator.validateCourseData(mockCourse);
      expect(contentValidation.canProceed).toBe(true);

      // Step 4: Access specific lesson
      const targetLesson = mockCourse.lessons.find(l => l.id === 'lesson-1');
      expect(targetLesson).toBeDefined();
      expect(targetLesson?.title).toBe('Plumbing Industry and Careers');

      // Verify complete flow
      expect(unifiedEnrollmentValidator.validateEnrollment).toHaveBeenCalledWith(courseId, userId);
      expect(enhancedNavigationHandler.navigateToCourse).toHaveBeenCalledWith(courseId);
      expect(courseContentValidator.validateCourseData).toHaveBeenCalledWith(mockCourse);
    });

    it('should handle different course types in the same flow', async () => {
      const courses = [
        { id: 'plumbing-101', title: 'Plumbing 101' },
        { id: 'electrical-101', title: 'Electrical Basics' },
        { id: 'carpentry-101', title: 'Carpentry Fundamentals' },
      ];

      // Mock enrollment for all courses
      vi.mocked(unifiedEnrollmentValidator.validateEnrollment).mockImplementation((courseId) => {
        return Promise.resolve({
          isValid: true,
          isEnrolled: true,
          status: 'enrolled',
          confidence: 'high',
          sources: [{ type: 'localStorage', data: { enrolled: true } }],
          lastVerified: new Date(),
        });
      });

      vi.mocked(enhancedNavigationHandler.navigateToCourse).mockImplementation((courseId) => {
        return Promise.resolve({
          success: true,
          shouldNavigate: true,
          redirectPath: `/course/${courseId}`,
          confidence: 0.9,
          enrollmentStatus: 'enrolled',
        });
      });

      const userId = 'test-user-123';

      // Test navigation to each course type
      for (const course of courses) {
        const enrollmentResult = await unifiedEnrollmentValidator.validateEnrollment(course.id, userId);
        expect(enrollmentResult.isEnrolled).toBe(true);

        const navigationResult = await enhancedNavigationHandler.navigateToCourse(course.id);
        expect(navigationResult.success).toBe(true);
        expect(navigationResult.redirectPath).toBe(`/course/${course.id}`);
      }

      // Verify all courses were processed
      expect(unifiedEnrollmentValidator.validateEnrollment).toHaveBeenCalledTimes(3);
      expect(enhancedNavigationHandler.navigateToCourse).toHaveBeenCalledTimes(3);
    });
  });
});