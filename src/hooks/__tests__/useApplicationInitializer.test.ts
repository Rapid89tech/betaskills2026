import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useApplicationInitializer } from '../useApplicationInitializer';
import { applicationInitializer } from '../../services/ApplicationInitializer';

// Mock the ApplicationInitializer
vi.mock('../../services/ApplicationInitializer', () => {
  const mockApplicationInitializer = {
    initialize: vi.fn(),
    getInitializationStatus: vi.fn(),
    onProgress: vi.fn(),
    isInitializing: vi.fn(),
    reset: vi.fn()
  };

  return {
    ApplicationInitializer: vi.fn(() => mockApplicationInitializer),
    applicationInitializer: mockApplicationInitializer
  };
});

// Mock InitializationSteps
vi.mock('../../services/InitializationSteps', () => ({
  InitializationSteps: {
    getDefaultSteps: vi.fn(() => [])
  }
}));

const mockApplicationInitializer = applicationInitializer as any;

describe('useApplicationInitializer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementations
    mockApplicationInitializer.getInitializationStatus.mockReturnValue({
      isInitializing: false,
      currentStep: null,
      progress: 0,
      completedSteps: [],
      failedSteps: [],
      totalSteps: 0,
      startTime: 0
    });
    
    mockApplicationInitializer.onProgress.mockReturnValue(() => {});
    mockApplicationInitializer.isInitializing.mockReturnValue(false);
    mockApplicationInitializer.initialize.mockResolvedValue({
      success: true,
      completedSteps: ['test-step'],
      failedSteps: [],
      fallbacksUsed: [],
      totalTime: 100,
      errors: []
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Hook Functionality', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useApplicationInitializer());
      
      expect(result.current.isInitializing).toBe(false);
      expect(result.current.isComplete).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.progress).toBe(0);
      expect(result.current.error).toBeNull();
      expect(result.current.result).toBeNull();
    });

    it('should provide initialize function', () => {
      const { result } = renderHook(() => useApplicationInitializer());
      
      expect(typeof result.current.initialize).toBe('function');
      expect(typeof result.current.reset).toBe('function');
    });
  });

  describe('Auto-start Functionality', () => {
    it('should auto-start initialization when autoStart is true', async () => {
      mockApplicationInitializer.getInitializationStatus.mockReturnValue({
        isInitializing: false,
        currentStep: null,
        progress: 0,
        completedSteps: [],
        failedSteps: [],
        totalSteps: 1,
        startTime: Date.now()
      });

      renderHook(() => useApplicationInitializer({ autoStart: true }));
      
      await waitFor(() => {
        expect(mockApplicationInitializer.initialize).toHaveBeenCalled();
      });
    });

    it('should not auto-start when autoStart is false', () => {
      renderHook(() => useApplicationInitializer({ autoStart: false }));
      
      expect(mockApplicationInitializer.initialize).not.toHaveBeenCalled();
    });
  });

  describe('Manual Initialization', () => {
    it('should initialize when initialize function is called', async () => {
      const { result } = renderHook(() => useApplicationInitializer());
      
      await act(async () => {
        await result.current.initialize();
      });
      
      expect(mockApplicationInitializer.initialize).toHaveBeenCalled();
    });

    it('should update state after successful initialization', async () => {
      const successResult = {
        success: true,
        completedSteps: ['step1', 'step2'],
        failedSteps: [],
        fallbacksUsed: [],
        totalTime: 200,
        errors: []
      };
      
      mockApplicationInitializer.initialize.mockResolvedValue(successResult);
      
      const { result } = renderHook(() => useApplicationInitializer());
      
      await act(async () => {
        await result.current.initialize();
      });
      
      expect(result.current.result).toEqual(successResult);
      expect(result.current.isComplete).toBe(true);
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.hasErrors).toBe(false);
    });

    it('should handle initialization failure', async () => {
      const failureResult = {
        success: false,
        completedSteps: ['step1'],
        failedSteps: ['step2'],
        fallbacksUsed: [],
        totalTime: 150,
        errors: [new Error('Step 2 failed')]
      };
      
      mockApplicationInitializer.initialize.mockResolvedValue(failureResult);
      
      const { result } = renderHook(() => useApplicationInitializer());
      
      await act(async () => {
        await result.current.initialize();
      });
      
      expect(result.current.result).toEqual(failureResult);
      expect(result.current.isComplete).toBe(true);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.hasErrors).toBe(true);
    });

    it('should handle initialization exception', async () => {
      const error = new Error('Initialization crashed');
      mockApplicationInitializer.initialize.mockRejectedValue(error);
      
      const { result } = renderHook(() => useApplicationInitializer());
      
      await act(async () => {
        try {
          await result.current.initialize();
        } catch (e) {
          // Expected to throw
        }
      });
      
      expect(result.current.error).toEqual(error);
      expect(result.current.hasErrors).toBe(true);
    });
  });

  describe('Progress Tracking', () => {
    it('should subscribe to progress updates', () => {
      renderHook(() => useApplicationInitializer());
      
      expect(mockApplicationInitializer.onProgress).toHaveBeenCalled();
    });

    it('should call onProgress callback when provided', async () => {
      const onProgress = vi.fn();
      let progressCallback: (progress: any) => void;
      
      mockApplicationInitializer.onProgress.mockImplementation((callback: (progress: any) => void) => {
        progressCallback = callback;
        return () => {};
      });
      
      renderHook(() => useApplicationInitializer({ onProgress }));
      
      // Simulate progress update
      act(() => {
        progressCallback({
          stepName: 'test-step',
          progress: 50,
          message: 'Testing...',
          timestamp: Date.now()
        });
      });
      
      expect(onProgress).toHaveBeenCalledWith({
        stepName: 'test-step',
        progress: 50,
        message: 'Testing...',
        timestamp: expect.any(Number)
      });
    });

    it('should update status during progress updates', async () => {
      let progressCallback: (progress: any) => void;
      
      mockApplicationInitializer.onProgress.mockImplementation((callback: (progress: any) => void) => {
        progressCallback = callback;
        return () => {};
      });
      
      const { result } = renderHook(() => useApplicationInitializer());
      
      // Simulate progress update with new status
      mockApplicationInitializer.getInitializationStatus.mockReturnValue({
        isInitializing: true,
        currentStep: 'test-step',
        progress: 50,
        completedSteps: [],
        failedSteps: [],
        totalSteps: 2,
        startTime: Date.now()
      });
      
      act(() => {
        progressCallback({
          stepName: 'test-step',
          progress: 50,
          message: 'Testing...',
          timestamp: Date.now()
        });
      });
      
      expect(result.current.currentStep).toBe('test-step');
      expect(result.current.progress).toBe(50);
    });
  });

  describe('Callback Handling', () => {
    it('should call onComplete callback when initialization completes successfully', async () => {
      const onComplete = vi.fn();
      const successResult = {
        success: true,
        completedSteps: ['step1'],
        failedSteps: [],
        fallbacksUsed: [],
        totalTime: 100,
        errors: []
      };
      
      mockApplicationInitializer.initialize.mockResolvedValue(successResult);
      
      const { result } = renderHook(() => useApplicationInitializer({ onComplete }));
      
      await act(async () => {
        await result.current.initialize();
      });
      
      expect(onComplete).toHaveBeenCalledWith(successResult);
    });

    it('should call onError callback when initialization fails', async () => {
      const onError = vi.fn();
      const failureResult = {
        success: false,
        completedSteps: [],
        failedSteps: ['step1'],
        fallbacksUsed: [],
        totalTime: 100,
        errors: [new Error('Failed')]
      };
      
      mockApplicationInitializer.initialize.mockResolvedValue(failureResult);
      
      const { result } = renderHook(() => useApplicationInitializer({ onError }));
      
      await act(async () => {
        await result.current.initialize();
      });
      
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call onError callback when initialization throws', async () => {
      const onError = vi.fn();
      const error = new Error('Initialization crashed');
      
      mockApplicationInitializer.initialize.mockRejectedValue(error);
      
      const { result } = renderHook(() => useApplicationInitializer({ onError }));
      
      await act(async () => {
        try {
          await result.current.initialize();
        } catch (e) {
          // Expected to throw
        }
      });
      
      expect(onError).toHaveBeenCalledWith(error);
    });
  });

  describe('Reset Functionality', () => {
    it('should reset state when reset is called', async () => {
      const { result } = renderHook(() => useApplicationInitializer());
      
      // First initialize
      await act(async () => {
        await result.current.initialize();
      });
      
      expect(result.current.isComplete).toBe(true);
      
      // Then reset
      act(() => {
        result.current.reset();
      });
      
      expect(mockApplicationInitializer.reset).toHaveBeenCalled();
      expect(result.current.result).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  describe('Helper Functions', () => {
    it('should provide correct error message when there is an error', async () => {
      const error = new Error('Test error');
      mockApplicationInitializer.initialize.mockRejectedValue(error);
      
      const { result } = renderHook(() => useApplicationInitializer());
      
      await act(async () => {
        try {
          await result.current.initialize();
        } catch (e) {
          // Expected to throw
        }
      });
      
      expect(result.current.getErrorMessage()).toBe('Test error');
    });

    it('should provide correct error message when initialization fails', async () => {
      const failureResult = {
        success: false,
        completedSteps: [],
        failedSteps: ['step1'],
        fallbacksUsed: [],
        totalTime: 100,
        errors: [new Error('Step failed')]
      };
      
      mockApplicationInitializer.initialize.mockResolvedValue(failureResult);
      
      const { result } = renderHook(() => useApplicationInitializer());
      
      await act(async () => {
        await result.current.initialize();
      });
      
      const errorMessage = result.current.getErrorMessage();
      expect(errorMessage).toContain('Initialization failed');
      expect(errorMessage).toContain('step1');
    });

    it('should return null error message when no errors', () => {
      const { result } = renderHook(() => useApplicationInitializer());
      
      expect(result.current.getErrorMessage()).toBeNull();
    });
  });

  describe('Custom Configuration', () => {
    it('should use custom steps when provided', async () => {
      const customConfig = {
        steps: [
          {
            name: 'custom-step',
            priority: 1,
            required: true,
            timeout: 1000,
            execute: vi.fn().mockResolvedValue(undefined)
          }
        ],
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: false
      };
      
      const { result } = renderHook(() => 
        useApplicationInitializer({ customSteps: customConfig })
      );
      
      await act(async () => {
        await result.current.initialize();
      });
      
      expect(mockApplicationInitializer.initialize).toHaveBeenCalledWith(customConfig);
    });
  });
});