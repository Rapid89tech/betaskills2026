/**
 * Navigation Error Handler Tests
 * Comprehensive tests for navigation error handling and recovery
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import NavigationErrorHandler, { navigationErrorHandler } from '../NavigationErrorHandler';
import { 
  NavigationErrorType, 
  ErrorSeverity, 
  RecoveryStrategy,
  NavigationContext 
} from '../../types/navigationError';

// Mock console methods
const mockConsole = {
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  log: vi.fn()
};

// Mock window.location
const mockLocation = {
  href: ''
};

// Mock window.open
const mockWindowOpen = vi.fn();

describe('NavigationErrorHandler', () => {
  let handler: NavigationErrorHandler;
  let mockContext: NavigationContext;

  beforeEach(() => {
    handler = new NavigationErrorHandler();
    mockContext = {
      route: '/course/test-course',
      component: 'TestComponent',
      userAgent: 'test-agent',
      sessionId: 'test-session',
      previousRoute: '/courses'
    };

    // Setup mocks
    vi.stubGlobal('console', mockConsole);
    vi.stubGlobal('window', { 
      location: mockLocation,
      open: mockWindowOpen,
      navigator: { onLine: true }
    });

    // Clear all mocks
    Object.values(mockConsole).forEach(mock => mock.mockClear());
    mockWindowOpen.mockClear();
    mockLocation.href = '';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('createError', () => {
    it('should create a navigation error with correct properties', () => {
      const error = handler.createError(
        NavigationErrorType.COURSE_NOT_FOUND,
        'Test course not found',
        mockContext,
        { courseId: 'test-course' }
      );

      expect(error.type).toBe(NavigationErrorType.COURSE_NOT_FOUND);
      expect(error.message).toBe('Test course not found');
      expect(error.userMessage).toBe('We couldn\'t find this course. It may have been moved or is no longer available.');
      expect(error.severity).toBe(ErrorSeverity.HIGH);
      expect(error.recoverable).toBe(false);
      expect(error.recoveryStrategy).toBe(RecoveryStrategy.REDIRECT);
      expect(error.context).toEqual(mockContext);
      expect(error.details.courseId).toBe('test-course');
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it('should log error with appropriate level based on severity', () => {
      // Test critical error logging
      handler.createError(
        NavigationErrorType.COURSE_NOT_FOUND,
        'Critical error',
        mockContext
      );
      expect(mockConsole.warn).toHaveBeenCalled();

      // Test medium severity error
      handler.createError(
        NavigationErrorType.NETWORK_ERROR,
        'Network error',
        mockContext
      );
      expect(mockConsole.info).toHaveBeenCalled();
    });
  });

  describe('handleError', () => {
    it('should return navigation error result with recovery actions', () => {
      const error = handler.createError(
        NavigationErrorType.LOADING_FAILED,
        'Loading failed',
        mockContext,
        { courseId: 'test-course' }
      );

      const result = handler.handleError(error);

      expect(result.error).toBe(error);
      expect(result.recoveryActions).toHaveLength(2); // Retry + fallback
      expect(result.canRetry).toBe(true);
      expect(result.retryDelay).toBe(1000); // Base delay
      expect(result.maxRetries).toBe(3);
    });

    it('should not allow retry for non-recoverable errors', () => {
      const error = handler.createError(
        NavigationErrorType.COURSE_NOT_FOUND,
        'Course not found',
        mockContext
      );

      const result = handler.handleError(error);

      expect(result.canRetry).toBe(false);
    });

    it('should limit retry attempts', () => {
      const error = handler.createError(
        NavigationErrorType.LOADING_FAILED,
        'Loading failed',
        mockContext,
        { courseId: 'test-course' }
      );

      // First attempt
      let result = handler.handleError(error);
      expect(result.canRetry).toBe(true);

      // Simulate retry attempts
      for (let i = 0; i < 3; i++) {
        handler['retryAttempts'].set('loading_failed-test-course', i + 1);
      }

      // Should not allow more retries
      result = handler.handleError(error);
      expect(result.canRetry).toBe(false);
    });
  });

  describe('specific error creation methods', () => {
    it('should create course not found error', () => {
      const error = handler.createCourseNotFoundError('test-course', mockContext);

      expect(error.type).toBe(NavigationErrorType.COURSE_NOT_FOUND);
      expect(error.details.courseId).toBe('test-course');
      expect(error.details.searchAttempted).toBe(true);
    });

    it('should create access denied error', () => {
      const error = handler.createAccessDeniedError('test-course', 'test-user', mockContext);

      expect(error.type).toBe(NavigationErrorType.ACCESS_DENIED);
      expect(error.details.courseId).toBe('test-course');
      expect(error.details.userId).toBe('test-user');
      expect(error.details.enrollmentRequired).toBe(true);
    });

    it('should create enrollment invalid error', () => {
      const error = handler.createEnrollmentInvalidError('test-course', 'test-user', mockContext);

      expect(error.type).toBe(NavigationErrorType.ENROLLMENT_INVALID);
      expect(error.details.validationFailed).toBe(true);
    });

    it('should create content unavailable error', () => {
      const error = handler.createContentUnavailableError('test-course', mockContext);

      expect(error.type).toBe(NavigationErrorType.CONTENT_UNAVAILABLE);
      expect(error.details.contentMissing).toBe(true);
    });

    it('should create loading failed error with original error', () => {
      const originalError = new Error('Network timeout');
      const error = handler.createLoadingFailedError('test-course', mockContext, originalError);

      expect(error.type).toBe(NavigationErrorType.LOADING_FAILED);
      expect(error.details.originalError).toBe('Network timeout');
      expect(error.details.stack).toBeDefined();
    });

    it('should create network error', () => {
      const error = handler.createNetworkError(mockContext);

      expect(error.type).toBe(NavigationErrorType.NETWORK_ERROR);
      expect(error.details.offline).toBe(false);
    });
  });

  describe('error classification', () => {
    it('should correctly classify error severity', () => {
      const highSeverityTypes = [
        NavigationErrorType.COURSE_NOT_FOUND,
        NavigationErrorType.ENROLLMENT_INVALID,
        NavigationErrorType.LOADING_FAILED,
        NavigationErrorType.VALIDATION_FAILED
      ];

      highSeverityTypes.forEach(type => {
        const error = handler.createError(type, 'Test', mockContext);
        expect(error.severity).toBe(ErrorSeverity.HIGH);
      });

      const mediumSeverityTypes = [
        NavigationErrorType.ACCESS_DENIED,
        NavigationErrorType.CONTENT_UNAVAILABLE,
        NavigationErrorType.NETWORK_ERROR,
        NavigationErrorType.PERMISSION_DENIED,
        NavigationErrorType.TIMEOUT_ERROR
      ];

      mediumSeverityTypes.forEach(type => {
        const error = handler.createError(type, 'Test', mockContext);
        expect(error.severity).toBe(ErrorSeverity.MEDIUM);
      });
    });

    it('should correctly identify recoverable errors', () => {
      const recoverableTypes = [
        NavigationErrorType.LOADING_FAILED,
        NavigationErrorType.NETWORK_ERROR,
        NavigationErrorType.TIMEOUT_ERROR,
        NavigationErrorType.VALIDATION_FAILED,
        NavigationErrorType.ENROLLMENT_INVALID
      ];

      recoverableTypes.forEach(type => {
        const error = handler.createError(type, 'Test', mockContext);
        expect(error.recoverable).toBe(true);
      });

      const nonRecoverableTypes = [
        NavigationErrorType.COURSE_NOT_FOUND,
        NavigationErrorType.ACCESS_DENIED,
        NavigationErrorType.CONTENT_UNAVAILABLE,
        NavigationErrorType.AUTHENTICATION_REQUIRED,
        NavigationErrorType.PERMISSION_DENIED
      ];

      nonRecoverableTypes.forEach(type => {
        const error = handler.createError(type, 'Test', mockContext);
        expect(error.recoverable).toBe(false);
      });
    });
  });

  describe('recovery strategies', () => {
    it('should assign correct recovery strategies', () => {
      const strategyMap = {
        [NavigationErrorType.COURSE_NOT_FOUND]: RecoveryStrategy.REDIRECT,
        [NavigationErrorType.ACCESS_DENIED]: RecoveryStrategy.MANUAL_INTERVENTION,
        [NavigationErrorType.ENROLLMENT_INVALID]: RecoveryStrategy.REFRESH_DATA,
        [NavigationErrorType.CONTENT_UNAVAILABLE]: RecoveryStrategy.FALLBACK,
        [NavigationErrorType.LOADING_FAILED]: RecoveryStrategy.RETRY,
        [NavigationErrorType.NETWORK_ERROR]: RecoveryStrategy.RETRY,
        [NavigationErrorType.VALIDATION_FAILED]: RecoveryStrategy.REFRESH_DATA,
        [NavigationErrorType.AUTHENTICATION_REQUIRED]: RecoveryStrategy.REDIRECT,
        [NavigationErrorType.PERMISSION_DENIED]: RecoveryStrategy.CONTACT_SUPPORT,
        [NavigationErrorType.TIMEOUT_ERROR]: RecoveryStrategy.RETRY
      };

      Object.entries(strategyMap).forEach(([type, expectedStrategy]) => {
        const error = handler.createError(type as NavigationErrorType, 'Test', mockContext);
        expect(error.recoveryStrategy).toBe(expectedStrategy);
      });
    });
  });

  describe('metrics tracking', () => {
    it('should track error metrics', () => {
      handler.createError(NavigationErrorType.LOADING_FAILED, 'Test 1', mockContext);
      handler.createError(NavigationErrorType.LOADING_FAILED, 'Test 2', mockContext);
      handler.createError(NavigationErrorType.NETWORK_ERROR, 'Test 3', mockContext);

      const metrics = handler.getErrorMetrics();
      
      expect(metrics.get(NavigationErrorType.LOADING_FAILED)?.count).toBe(2);
      expect(metrics.get(NavigationErrorType.NETWORK_ERROR)?.count).toBe(1);
    });

    it('should record successful and failed recoveries', () => {
      handler.createError(NavigationErrorType.LOADING_FAILED, 'Test', mockContext);
      
      handler.recordSuccessfulRecovery(NavigationErrorType.LOADING_FAILED);
      handler.recordFailedRecovery(NavigationErrorType.LOADING_FAILED);

      const metrics = handler.getErrorMetrics();
      const loadingMetrics = metrics.get(NavigationErrorType.LOADING_FAILED);
      
      expect(loadingMetrics?.successfulRecoveries).toBe(1);
      expect(loadingMetrics?.failedRecoveries).toBe(1);
    });
  });

  describe('retry delay calculation', () => {
    it('should calculate exponential backoff delay', () => {
      const error = handler.createError(
        NavigationErrorType.LOADING_FAILED,
        'Test',
        mockContext,
        { courseId: 'test-course' }
      );

      // First attempt
      let result = handler.handleError(error);
      expect(result.retryDelay).toBe(1000);

      // Second attempt
      handler['retryAttempts'].set('loading_failed-test-course', 1);
      result = handler.handleError(error);
      expect(result.retryDelay).toBe(2000);

      // Third attempt
      handler['retryAttempts'].set('loading_failed-test-course', 2);
      result = handler.handleError(error);
      expect(result.retryDelay).toBe(4000);
    });
  });

  describe('singleton instance', () => {
    it('should provide a singleton instance', () => {
      expect(navigationErrorHandler).toBeInstanceOf(NavigationErrorHandler);
    });
  });
});

describe('NavigationErrorHandler Integration', () => {
  beforeEach(() => {
    navigationErrorHandler.clearRetryAttempts();
  });

  it('should handle complete error flow', () => {
    const context: NavigationContext = {
      route: '/course/integration-test',
      component: 'IntegrationTest'
    };

    // Create error
    const error = navigationErrorHandler.createCourseNotFoundError('integration-test', context);
    
    // Handle error
    const result = navigationErrorHandler.handleError(error);
    
    // Verify result
    expect(result.error.type).toBe(NavigationErrorType.COURSE_NOT_FOUND);
    expect(result.recoveryActions.length).toBeGreaterThan(0);
    expect(result.canRetry).toBe(false); // Course not found is not recoverable
    
    // Verify metrics
    const metrics = navigationErrorHandler.getErrorMetrics();
    expect(metrics.get(NavigationErrorType.COURSE_NOT_FOUND)?.count).toBe(1);
  });
});