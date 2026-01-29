/**
 * Test Runner for Comprehensive Testing Suite
 * 
 * This file provides utilities for running the comprehensive test suite
 * that covers courses page components, admin dashboard functionality,
 * and payment processing flow.
 */

import { vi } from 'vitest';

/**
 * Test configuration for different test types
 */
export const testConfig = {
  unit: {
    timeout: 10000,
    retries: 2,
    coverage: true
  },
  integration: {
    timeout: 30000,
    retries: 1,
    coverage: true
  },
  e2e: {
    timeout: 60000,
    retries: 0,
    coverage: false
  }
};

/**
 * Mock setup utilities for consistent test environment
 */
export const mockSetup = {
  /**
   * Setup common mocks for courses page tests
   */
  setupCoursesPageMocks: () => {
    // Mock window methods
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true
    });

    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }));

    // Mock ResizeObserver
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }));
  },

  /**
   * Setup common mocks for admin dashboard tests
   */
  setupAdminDashboardMocks: () => {
    // Mock clipboard API
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue('')
      },
      writable: true
    });

    // Mock notification API
    Object.defineProperty(window, 'Notification', {
      value: vi.fn().mockImplementation(() => ({
        close: vi.fn()
      })),
      writable: true
    });

    // Mock permissions API
    Object.defineProperty(navigator, 'permissions', {
      value: {
        query: vi.fn().mockResolvedValue({ state: 'granted' })
      },
      writable: true
    });
  },

  /**
   * Setup common mocks for payment processing tests
   */
  setupPaymentProcessingMocks: () => {
    // Mock crypto API for payment security
    Object.defineProperty(global, 'crypto', {
      value: {
        randomUUID: vi.fn(() => 'mock-uuid-1234'),
        getRandomValues: vi.fn((arr) => {
          for (let i = 0; i < arr.length; i++) {
            arr[i] = Math.floor(Math.random() * 256);
          }
          return arr;
        }),
        subtle: {
          digest: vi.fn().mockResolvedValue(new ArrayBuffer(32)),
          sign: vi.fn().mockResolvedValue(new ArrayBuffer(64)),
          verify: vi.fn().mockResolvedValue(true)
        }
      },
      writable: true
    });

    // Mock performance API
    Object.defineProperty(global, 'performance', {
      value: {
        now: vi.fn(() => Date.now()),
        mark: vi.fn(),
        measure: vi.fn()
      },
      writable: true
    });
  },

  /**
   * Setup all common mocks
   */
  setupAllMocks: () => {
    mockSetup.setupCoursesPageMocks();
    mockSetup.setupAdminDashboardMocks();
    mockSetup.setupPaymentProcessingMocks();
  }
};

/**
 * Test data factories for consistent test data
 */
export const testDataFactory = {
  /**
   * Create mock course data
   */
  createMockCourse: (overrides = {}) => ({
    id: 'course-1',
    title: 'Test Course',
    description: 'Test course description',
    category: 'Technology',
    level: 'Beginner',
    duration: '4 weeks',
    price: 299,
    instructor: 'Test Instructor',
    rating: 4.5,
    students: 150,
    image: '/test-course.jpg',
    isComingSoon: false,
    available: true,
    courseId: 'course-1',
    currency: 'ZAR',
    ...overrides
  }),

  /**
   * Create mock enrollment data
   */
  createMockEnrollment: (overrides = {}) => ({
    id: 'enrollment-1',
    user_id: 'user-1',
    course_id: 'course-1',
    user_email: 'test@example.com',
    course_title: 'Test Course',
    status: 'pending',
    enrolled_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    ...overrides
  }),

  /**
   * Create mock user data
   */
  createMockUser: (overrides = {}) => ({
    id: 'user-1',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    role: 'student',
    approval_status: 'approved',
    created_at: '2024-01-10T10:00:00Z',
    ...overrides
  }),

  /**
   * Create mock payment data
   */
  createMockPaymentData: (overrides = {}) => ({
    sessionId: 'session-123',
    amount: 299.00,
    currency: 'ZAR',
    reference: 'test-ref-001',
    customer: {
      email: 'test@example.com',
      name: 'Test User'
    },
    paymentMethod: 'card',
    metadata: {
      courseName: 'Test Course',
      userEmail: 'test@example.com',
      userName: 'Test User'
    },
    ...overrides
  }),

  /**
   * Create mock webhook data
   */
  createMockWebhookData: (overrides = {}) => ({
    transaction_id: 'txn-123',
    status: 'completed',
    amount: 299.00,
    currency: 'ZAR',
    reference: 'test-ref-001',
    customer_email: 'test@example.com',
    timestamp: new Date().toISOString(),
    signature: 'valid-signature',
    metadata: {
      courseName: 'Test Course'
    },
    ...overrides
  })
};

/**
 * Test utilities for common test operations
 */
export const testUtils = {
  /**
   * Wait for async operations to complete
   */
  waitForAsync: (ms = 100) => new Promise(resolve => setTimeout(resolve, ms)),

  /**
   * Create a mock function with specific behavior
   */
  createMockFunction: (returnValue?: any, shouldReject = false) => {
    if (shouldReject) {
      return vi.fn().mockRejectedValue(returnValue || new Error('Mock error'));
    }
    return vi.fn().mockResolvedValue(returnValue);
  },

  /**
   * Create a mock implementation that can be controlled
   */
  createControllableMock: () => {
    let shouldReject = false;
    let returnValue: any = undefined;
    let callCount = 0;

    const mockFn = vi.fn().mockImplementation(() => {
      callCount++;
      if (shouldReject) {
        return Promise.reject(returnValue || new Error('Controlled mock error'));
      }
      return Promise.resolve(returnValue);
    });

    return {
      mockFn,
      setReturnValue: (value: any) => { returnValue = value; },
      setShouldReject: (reject: boolean) => { shouldReject = reject; },
      getCallCount: () => callCount,
      reset: () => {
        shouldReject = false;
        returnValue = undefined;
        callCount = 0;
        mockFn.mockClear();
      }
    };
  },

  /**
   * Simulate network delay for realistic testing
   */
  simulateNetworkDelay: (min = 100, max = 500) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  },

  /**
   * Create a mock API response
   */
  createMockApiResponse: (data: any, success = true, status = 200) => ({
    ok: success,
    status,
    json: () => Promise.resolve(success ? { success: true, data } : { success: false, error: data }),
    text: () => Promise.resolve(JSON.stringify(data))
  })
};

/**
 * Test assertions for common validation patterns
 */
export const testAssertions = {
  /**
   * Assert that a component renders without errors
   */
  assertComponentRenders: (component: any) => {
    expect(component).toBeTruthy();
    expect(component.container).toBeTruthy();
  },

  /**
   * Assert that loading states are handled correctly
   */
  assertLoadingStates: (result: any) => {
    expect(typeof result.loading).toBe('boolean');
    if (result.loading) {
      expect(result.data).toBeUndefined();
      expect(result.error).toBeNull();
    }
  },

  /**
   * Assert that error states are handled correctly
   */
  assertErrorStates: (result: any) => {
    if (result.error) {
      expect(typeof result.error).toBe('string');
      expect(result.error.length).toBeGreaterThan(0);
    }
  },

  /**
   * Assert that data structures match expected format
   */
  assertDataStructure: (data: any, expectedKeys: string[]) => {
    expect(data).toBeTruthy();
    expectedKeys.forEach(key => {
      expect(data).toHaveProperty(key);
    });
  },

  /**
   * Assert that payment data is valid
   */
  assertValidPaymentData: (paymentData: any) => {
    expect(paymentData).toHaveProperty('amount');
    expect(paymentData).toHaveProperty('currency');
    expect(paymentData).toHaveProperty('reference');
    expect(typeof paymentData.amount).toBe('number');
    expect(paymentData.amount).toBeGreaterThan(0);
    expect(typeof paymentData.currency).toBe('string');
    expect(typeof paymentData.reference).toBe('string');
  }
};

/**
 * Performance testing utilities
 */
export const performanceUtils = {
  /**
   * Measure execution time of a function
   */
  measureExecutionTime: async (fn: () => Promise<any>) => {
    const start = performance.now();
    await fn();
    const end = performance.now();
    return end - start;
  },

  /**
   * Assert that execution time is within acceptable limits
   */
  assertPerformance: (executionTime: number, maxTime: number) => {
    expect(executionTime).toBeLessThan(maxTime);
  },

  /**
   * Test memory usage (basic implementation)
   */
  measureMemoryUsage: () => {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }
};

/**
 * Export all utilities for easy importing
 */
export default {
  testConfig,
  mockSetup,
  testDataFactory,
  testUtils,
  testAssertions,
  performanceUtils
};