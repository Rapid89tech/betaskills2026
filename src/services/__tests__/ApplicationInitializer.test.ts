import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ApplicationInitializer } from '../ApplicationInitializer';
import { InitializationStep, InitializationConfig } from '../../types/initialization';

describe('ApplicationInitializer', () => {
  let initializer: ApplicationInitializer;

  beforeEach(() => {
    initializer = new ApplicationInitializer();
    vi.clearAllMocks();
  });

  afterEach(() => {
    initializer.reset();
  });

  describe('Basic Functionality', () => {
    it('should initialize with default status', () => {
      const status = initializer.getInitializationStatus();
      expect(status.isInitializing).toBe(false);
      expect(status.progress).toBe(0);
      expect(status.completedSteps).toEqual([]);
      expect(status.failedSteps).toEqual([]);
    });

    it('should not allow multiple concurrent initializations', async () => {
      const mockStep: InitializationStep = {
        name: 'test-step',
        priority: 1,
        required: true,
        timeout: 1000,
        execute: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
      };

      const config: InitializationConfig = {
        steps: [mockStep],
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: false
      };

      // Start first initialization
      const promise1 = initializer.initialize(config);
      
      // Try to start second initialization
      const promise2 = initializer.initialize(config);

      // Both should resolve to the same result
      const [result1, result2] = await Promise.all([promise1, promise2]);
      expect(result1).toBe(result2);
    });
  });

  describe('Step Execution', () => {
    it('should execute steps in priority order', async () => {
      const executionOrder: string[] = [];
      
      const steps: InitializationStep[] = [
        {
          name: 'low-priority',
          priority: 1,
          required: true,
          timeout: 1000,
          execute: vi.fn().mockImplementation(async () => {
            executionOrder.push('low-priority');
          })
        },
        {
          name: 'high-priority',
          priority: 10,
          required: true,
          timeout: 1000,
          execute: vi.fn().mockImplementation(async () => {
            executionOrder.push('high-priority');
          })
        },
        {
          name: 'medium-priority',
          priority: 5,
          required: true,
          timeout: 1000,
          execute: vi.fn().mockImplementation(async () => {
            executionOrder.push('medium-priority');
          })
        }
      ];

      const config: InitializationConfig = {
        steps,
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: false
      };

      const result = await initializer.initialize(config);
      
      expect(result.success).toBe(true);
      expect(executionOrder).toEqual(['high-priority', 'medium-priority', 'low-priority']);
    });

    it('should handle step timeout', async () => {
      const mockStep: InitializationStep = {
        name: 'timeout-step',
        priority: 1,
        required: true,
        timeout: 100,
        execute: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 200)))
      };

      const config: InitializationConfig = {
        steps: [mockStep],
        maxTimeout: 5000,
        enableFallbacks: false,
        retryFailedSteps: false
      };

      const result = await initializer.initialize(config);
      
      expect(result.success).toBe(false);
      expect(result.failedSteps).toContain('timeout-step');
      expect(result.errors[0].message).toContain('timed out');
    });

    it('should use fallback when step fails', async () => {
      const fallbackExecuted = vi.fn();
      
      const mockStep: InitializationStep = {
        name: 'fallback-step',
        priority: 1,
        required: true,
        timeout: 1000,
        execute: vi.fn().mockRejectedValue(new Error('Step failed')),
        fallback: fallbackExecuted
      };

      const config: InitializationConfig = {
        steps: [mockStep],
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: false
      };

      const result = await initializer.initialize(config);
      
      expect(result.success).toBe(true);
      expect(result.completedSteps).toContain('fallback-step');
      expect(result.fallbacksUsed).toContain('fallback-step');
      expect(fallbackExecuted).toHaveBeenCalled();
    });

    it('should fail when required step fails without fallback', async () => {
      const mockStep: InitializationStep = {
        name: 'required-step',
        priority: 1,
        required: true,
        timeout: 1000,
        execute: vi.fn().mockRejectedValue(new Error('Required step failed'))
      };

      const config: InitializationConfig = {
        steps: [mockStep],
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: false
      };

      const result = await initializer.initialize(config);
      
      expect(result.success).toBe(false);
      expect(result.failedSteps).toContain('required-step');
      expect(result.errors[0].message).toBe('Required step failed');
    });

    it('should succeed when optional step fails', async () => {
      const mockSteps: InitializationStep[] = [
        {
          name: 'required-step',
          priority: 2,
          required: true,
          timeout: 1000,
          execute: vi.fn().mockResolvedValue(undefined)
        },
        {
          name: 'optional-step',
          priority: 1,
          required: false,
          timeout: 1000,
          execute: vi.fn().mockRejectedValue(new Error('Optional step failed'))
        }
      ];

      const config: InitializationConfig = {
        steps: mockSteps,
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: false
      };

      const result = await initializer.initialize(config);
      
      expect(result.success).toBe(true);
      expect(result.completedSteps).toContain('required-step');
      expect(result.failedSteps).toContain('optional-step');
    });
  });

  describe('Retry Mechanism', () => {
    it('should retry failed required steps when configured', async () => {
      let attemptCount = 0;
      
      const mockStep: InitializationStep = {
        name: 'retry-step',
        priority: 1,
        required: true,
        timeout: 1000,
        execute: vi.fn().mockImplementation(async () => {
          attemptCount++;
          if (attemptCount === 1) {
            throw new Error('First attempt failed');
          }
          // Second attempt succeeds
        })
      };

      const config: InitializationConfig = {
        steps: [mockStep],
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: true
      };

      const result = await initializer.initialize(config);
      
      expect(result.success).toBe(true);
      expect(result.completedSteps).toContain('retry-step');
      expect(attemptCount).toBe(2);
    });
  });

  describe('Global Timeout', () => {
    it('should respect global timeout', async () => {
      const mockStep: InitializationStep = {
        name: 'slow-step',
        priority: 1,
        required: true,
        timeout: 5000, // Step timeout is longer than global timeout
        execute: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 300)))
      };

      const config: InitializationConfig = {
        steps: [mockStep],
        maxTimeout: 100, // Very short global timeout
        enableFallbacks: true,
        retryFailedSteps: false
      };

      const result = await initializer.initialize(config);
      
      expect(result.success).toBe(false);
      expect(result.errors[0].message).toContain('Global initialization timeout');
    });
  });

  describe('Progress Tracking', () => {
    it('should track progress during initialization', async () => {
      const progressUpdates: number[] = [];
      
      const mockSteps: InitializationStep[] = [
        {
          name: 'step-1',
          priority: 2,
          required: true,
          timeout: 1000,
          execute: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 50)))
        },
        {
          name: 'step-2',
          priority: 1,
          required: true,
          timeout: 1000,
          execute: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 50)))
        }
      ];

      const config: InitializationConfig = {
        steps: mockSteps,
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: false
      };

      // Subscribe to progress updates
      const unsubscribe = initializer.onProgress((progress) => {
        progressUpdates.push(progress.progress);
      });

      await initializer.initialize(config);
      unsubscribe();
      
      expect(progressUpdates.length).toBeGreaterThan(0);
      expect(progressUpdates[progressUpdates.length - 1]).toBeGreaterThan(0);
    });

    it('should update status during initialization', async () => {
      const mockStep: InitializationStep = {
        name: 'status-step',
        priority: 1,
        required: true,
        timeout: 1000,
        execute: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 50)))
      };

      const config: InitializationConfig = {
        steps: [mockStep],
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: false
      };

      const initPromise = initializer.initialize(config);
      
      // Check status during initialization
      await new Promise(resolve => setTimeout(resolve, 10));
      const statusDuringInit = initializer.getInitializationStatus();
      expect(statusDuringInit.isInitializing).toBe(true);
      
      await initPromise;
      
      const statusAfterInit = initializer.getInitializationStatus();
      expect(statusAfterInit.isInitializing).toBe(false);
      expect(statusAfterInit.progress).toBe(100);
    });
  });

  describe('Error Handling', () => {
    it('should collect all errors during initialization', async () => {
      const mockSteps: InitializationStep[] = [
        {
          name: 'error-step-1',
          priority: 2,
          required: false,
          timeout: 1000,
          execute: vi.fn().mockRejectedValue(new Error('Error 1'))
        },
        {
          name: 'error-step-2',
          priority: 1,
          required: false,
          timeout: 1000,
          execute: vi.fn().mockRejectedValue(new Error('Error 2'))
        }
      ];

      const config: InitializationConfig = {
        steps: mockSteps,
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: false
      };

      const result = await initializer.initialize(config);
      
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0].message).toBe('Error 1');
      expect(result.errors[1].message).toBe('Error 2');
    });
  });

  describe('Reset Functionality', () => {
    it('should reset status after initialization', async () => {
      const mockStep: InitializationStep = {
        name: 'reset-test-step',
        priority: 1,
        required: true,
        timeout: 1000,
        execute: vi.fn().mockResolvedValue(undefined)
      };

      const config: InitializationConfig = {
        steps: [mockStep],
        maxTimeout: 5000,
        enableFallbacks: true,
        retryFailedSteps: false
      };

      await initializer.initialize(config);
      
      let status = initializer.getInitializationStatus();
      expect(status.completedSteps).toHaveLength(1);
      
      initializer.reset();
      
      status = initializer.getInitializationStatus();
      expect(status.completedSteps).toHaveLength(0);
      expect(status.progress).toBe(0);
      expect(status.isInitializing).toBe(false);
    });
  });
});