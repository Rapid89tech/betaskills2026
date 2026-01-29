/**
 * useNavigationErrorHandler Hook Tests
 * Tests for React hook integration with navigation error handling
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { useNavigationErrorHandler } from '../useNavigationErrorHandler';
import { NavigationErrorType } from '../../types/navigationError';

// Mock the navigation error handler
vi.mock('../../services/NavigationErrorHandler', () => {
  const mockHandler = {
    createError: vi.fn(),
    handleError: vi.fn(),
    createCourseNotFoundError: vi.fn(),
    createAccessDeniedError: vi.fn(),
    createEnrollmentInvalidError: vi.fn(),
    createContentUnavailableError: vi.fn(),
    createLoadingFailedError: vi.fn(),
    createNetworkError: vi.fn(),
    recordSuccessfulRecovery: vi.fn(),
    recordFailedRecovery: vi.fn()
  };

  return {
    navigationErrorHandler: mockHandler,
    default: class MockNavigationErrorHandler {
      static instance = mockHandler;
    }
  };
});

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Mock sessionStorage
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

// Mock window.location
const mockLocation = {
  pathname: '/test-route'
};

describe('useNavigationErrorHandler', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );

  beforeEach(() => {
    vi.stubGlobal('sessionStorage', mockSessionStorage);
    vi.stubGlobal('window', { 
      location: mockLocation,
      navigator: { userAgent: 'test-agent' }
    });
    vi.stubGlobal('document', { referrer: 'http://test-referrer.com' });

    // Clear all mocks
    mockNavigate.mockClear();
    mockSessionStorage.getItem.mockClear();
    
    // Setup default mock returns
    mockSessionStorage.getItem.mockReturnValue('test-session-id');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('initialization', () => {
    it('should initialize with no error state', () => {
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent', '/test-route'),
        { wrapper }
      );

      expect(result.current.error).toBeNull();
      expect(result.current.recoveryActions).toEqual([]);
      expect(result.current.isRetrying).toBe(false);
      expect(result.current.canRetry).toBe(false);
    });

    it('should create navigation context with component and route info', () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent', '/test-route'),
        { wrapper }
      );

      act(() => {
        result.current.createError(NavigationErrorType.LOADING_FAILED, 'Test error');
      });

      expect(navigationErrorHandler.createError).toHaveBeenCalledWith(
        NavigationErrorType.LOADING_FAILED,
        'Test error',
        expect.objectContaining({
          route: '/test-route',
          component: 'TestComponent',
          userAgent: 'test-agent',
          sessionId: 'test-session-id',
          previousRoute: 'http://test-referrer.com'
        }),
        {}
      );
    });
  });

  describe('error handling', () => {
    it('should handle navigation error and update state', () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const mockError = {
        type: NavigationErrorType.LOADING_FAILED,
        message: 'Test error',
        userMessage: 'Loading failed',
        severity: 'high' as any,
        recoverable: true,
        timestamp: new Date(),
        context: { route: '/test', component: 'Test' },
        details: {},
        suggestedAction: 'Try again',
        recoveryStrategy: 'retry' as any
      };

      const mockResult = {
        error: mockError,
        recoveryActions: [
          {
            type: 'retry',
            label: 'Try Again',
            action: vi.fn(),
            primary: true
          }
        ],
        canRetry: true,
        retryDelay: 1000,
        maxRetries: 3
      };

      navigationErrorHandler.handleError.mockReturnValue(mockResult);

      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.handleError(mockError);
      });

      expect(result.current.error).toBe(mockError);
      expect(result.current.recoveryActions).toEqual(mockResult.recoveryActions);
      expect(result.current.canRetry).toBe(true);
    });

    it('should clear error state', () => {
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      // Set up error state first
      const mockError = {
        type: NavigationErrorType.LOADING_FAILED,
        message: 'Test error'
      };

      act(() => {
        result.current.handleError(mockError as any);
      });

      // Clear error
      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
      expect(result.current.recoveryActions).toEqual([]);
      expect(result.current.isRetrying).toBe(false);
    });
  });

  describe('retry functionality', () => {
    it('should execute retry action and handle success', async () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const mockRetryAction = vi.fn().mockResolvedValue(undefined);
      const mockResult = {
        error: { type: NavigationErrorType.LOADING_FAILED },
        recoveryActions: [
          {
            type: 'retry',
            label: 'Try Again',
            action: mockRetryAction,
            primary: true
          }
        ],
        canRetry: true
      };

      navigationErrorHandler.handleError.mockReturnValue(mockResult);

      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      // Set up error state
      act(() => {
        result.current.handleError(mockResult.error as any);
      });

      // Execute retry
      await act(async () => {
        await result.current.retry();
      });

      expect(mockRetryAction).toHaveBeenCalled();
      expect(navigationErrorHandler.recordSuccessfulRecovery).toHaveBeenCalledWith(
        NavigationErrorType.LOADING_FAILED
      );
      expect(result.current.error).toBeNull(); // Should clear error on success
    });

    it('should handle retry failure', async () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const mockRetryAction = vi.fn().mockRejectedValue(new Error('Retry failed'));
      const mockResult = {
        error: { type: NavigationErrorType.LOADING_FAILED },
        recoveryActions: [
          {
            type: 'retry',
            label: 'Try Again',
            action: mockRetryAction,
            primary: true
          }
        ],
        canRetry: true
      };

      navigationErrorHandler.handleError.mockReturnValue(mockResult);

      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      // Set up error state
      act(() => {
        result.current.handleError(mockResult.error as any);
      });

      // Execute retry
      await act(async () => {
        await result.current.retry();
      });

      expect(navigationErrorHandler.recordFailedRecovery).toHaveBeenCalledWith(
        NavigationErrorType.LOADING_FAILED
      );
      expect(result.current.isRetrying).toBe(false);
    });

    it('should not retry when canRetry is false', async () => {
      const mockResult = {
        error: { type: NavigationErrorType.COURSE_NOT_FOUND },
        recoveryActions: [],
        canRetry: false
      };

      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      navigationErrorHandler.handleError.mockReturnValue(mockResult);

      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.handleError(mockResult.error as any);
      });

      await act(async () => {
        await result.current.retry();
      });

      // Should not attempt retry
      expect(result.current.isRetrying).toBe(false);
    });
  });

  describe('recovery actions', () => {
    it('should execute recovery action and record success', async () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const mockAction = {
        type: 'redirect' as any,
        label: 'Go to Courses',
        action: vi.fn().mockResolvedValue(undefined),
        primary: true
      };

      const mockResult = {
        error: { type: NavigationErrorType.ACCESS_DENIED },
        recoveryActions: [mockAction],
        canRetry: false
      };

      navigationErrorHandler.handleError.mockReturnValue(mockResult);

      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.handleError(mockResult.error as any);
      });

      await act(async () => {
        await result.current.executeRecoveryAction(mockAction);
      });

      expect(mockAction.action).toHaveBeenCalled();
      expect(navigationErrorHandler.recordSuccessfulRecovery).toHaveBeenCalledWith(
        NavigationErrorType.ACCESS_DENIED
      );
      expect(result.current.error).toBeNull(); // Should clear error after non-retry action
    });

    it('should handle recovery action failure', async () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const mockAction = {
        type: 'redirect' as any,
        label: 'Go to Courses',
        action: vi.fn().mockRejectedValue(new Error('Action failed')),
        primary: true
      };

      const mockResult = {
        error: { type: NavigationErrorType.ACCESS_DENIED },
        recoveryActions: [mockAction],
        canRetry: false
      };

      navigationErrorHandler.handleError.mockReturnValue(mockResult);

      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.handleError(mockResult.error as any);
      });

      await act(async () => {
        await result.current.executeRecoveryAction(mockAction);
      });

      expect(navigationErrorHandler.recordFailedRecovery).toHaveBeenCalledWith(
        NavigationErrorType.ACCESS_DENIED
      );
    });
  });

  describe('convenience error creation methods', () => {
    it('should create course not found error', () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.createCourseNotFoundError('test-course');
      });

      expect(navigationErrorHandler.createCourseNotFoundError).toHaveBeenCalledWith(
        'test-course',
        expect.objectContaining({
          component: 'TestComponent'
        })
      );
    });

    it('should create access denied error', () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.createAccessDeniedError('test-course', 'test-user');
      });

      expect(navigationErrorHandler.createAccessDeniedError).toHaveBeenCalledWith(
        'test-course',
        'test-user',
        expect.objectContaining({
          component: 'TestComponent'
        })
      );
    });

    it('should create enrollment invalid error', () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.createEnrollmentInvalidError('test-course', 'test-user');
      });

      expect(navigationErrorHandler.createEnrollmentInvalidError).toHaveBeenCalledWith(
        'test-course',
        'test-user',
        expect.objectContaining({
          component: 'TestComponent'
        })
      );
    });

    it('should create content unavailable error', () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.createContentUnavailableError('test-course');
      });

      expect(navigationErrorHandler.createContentUnavailableError).toHaveBeenCalledWith(
        'test-course',
        expect.objectContaining({
          component: 'TestComponent'
        })
      );
    });

    it('should create loading failed error', () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const originalError = new Error('Network timeout');
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.createLoadingFailedError('test-course', originalError);
      });

      expect(navigationErrorHandler.createLoadingFailedError).toHaveBeenCalledWith(
        'test-course',
        expect.objectContaining({
          component: 'TestComponent'
        }),
        originalError
      );
    });

    it('should create network error', () => {
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const originalError = new Error('Connection failed');
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.createNetworkError(originalError);
      });

      expect(navigationErrorHandler.createNetworkError).toHaveBeenCalledWith(
        expect.objectContaining({
          component: 'TestComponent'
        }),
        originalError
      );
    });
  });

  describe('context creation', () => {
    it('should use current route from window.location when not provided', () => {
      mockLocation.pathname = '/dynamic-route';
      
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'), // No route provided
        { wrapper }
      );

      act(() => {
        result.current.createError(NavigationErrorType.LOADING_FAILED, 'Test error');
      });

      expect(navigationErrorHandler.createError).toHaveBeenCalledWith(
        NavigationErrorType.LOADING_FAILED,
        'Test error',
        expect.objectContaining({
          route: '/dynamic-route'
        }),
        {}
      );
    });

    it('should handle missing session ID gracefully', () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      
      const { navigationErrorHandler } = require('../../services/NavigationErrorHandler');
      
      const { result } = renderHook(
        () => useNavigationErrorHandler('TestComponent'),
        { wrapper }
      );

      act(() => {
        result.current.createError(NavigationErrorType.LOADING_FAILED, 'Test error');
      });

      expect(navigationErrorHandler.createError).toHaveBeenCalledWith(
        NavigationErrorType.LOADING_FAILED,
        'Test error',
        expect.objectContaining({
          sessionId: undefined
        }),
        {}
      );
    });
  });
});