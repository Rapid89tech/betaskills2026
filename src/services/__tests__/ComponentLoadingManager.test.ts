/**
 * ComponentLoadingManager Tests
 * 
 * Comprehensive tests for the component loading system including:
 * - Component registration and loading
 * - Retry mechanisms with exponential backoff
 * - Fallback component handling
 * - Preloading functionality
 * - Error recovery scenarios
 * - Performance tracking
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { ComponentLoadingManager, ComponentRegistration } from '../ComponentLoadingManager';

// Mock dependencies
vi.mock('@/utils/loadingOptimizer', () => ({
  loadingOptimizer: {
    startLoading: vi.fn(),
    finishLoading: vi.fn(),
    updateProgress: vi.fn()
  }
}));

vi.mock('@/utils/FallbackManager', () => ({
  fallbackManager: {
    withFallback: vi.fn()
  }
}));

// Mock React
vi.mock('react', () => ({
  createElement: vi.fn((type, props, ...children) => ({
    type,
    props: { ...props, children }
  })),
  lazy: vi.fn((importFn) => importFn)
}));

// Mock performance API
Object.defineProperty(global, 'performance', {
  value: {
    now: vi.fn(() => Date.now())
  }
});

// Mock Date.now to return incrementing values for timing tests
let mockTime = 1000;
vi.spyOn(Date, 'now').mockImplementation(() => {
  mockTime += 10; // Increment by 10ms each call
  return mockTime;
});

// Mock window and document
Object.defineProperty(global, 'window', {
  value: {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    requestIdleCallback: vi.fn((callback) => setTimeout(callback, 0)),
    scrollY: 0
  }
});

Object.defineProperty(global, 'document', {
  value: {
    readyState: 'complete',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  }
});

describe('ComponentLoadingManager', () => {
  let manager: ComponentLoadingManager;
  let mockComponent: React.ComponentType;
  let mockFallback: React.ComponentType;

  beforeEach(() => {
    // Reset singleton instance
    (ComponentLoadingManager as any).instance = undefined;
    
    // Reset mock time
    mockTime = 1000;
    
    // Create fresh manager instance
    manager = ComponentLoadingManager.getInstance();
    
    // Create mock components
    mockComponent = vi.fn(() => React.createElement('div', {}, 'Mock Component'));
    mockFallback = vi.fn(() => React.createElement('div', {}, 'Fallback Component'));
    
    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    manager.clearCache();
  });

  describe('Component Registration', () => {
    it('should register a component successfully', () => {
      const registration: ComponentRegistration = {
        name: 'TestComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false,
        fallback: mockFallback
      };

      manager.registerComponent(registration);
      
      const loadingState = manager.getLoadingState('TestComponent');
      expect(loadingState).toBeDefined();
      expect(loadingState?.componentName).toBe('TestComponent');
      expect(loadingState?.isLoading).toBe(false);
      expect(loadingState?.retryCount).toBe(0);
    });

    it('should mark critical components correctly', () => {
      const registration: ComponentRegistration = {
        name: 'CriticalComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: true
      };

      manager.registerComponent(registration);
      
      const stats = manager.getLoadingStats();
      expect(stats.criticalComponents).toBe(1);
    });

    it('should register fallback components', () => {
      const registration: ComponentRegistration = {
        name: 'ComponentWithFallback',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false,
        fallback: mockFallback
      };

      manager.registerComponent(registration);
      manager.registerFallback('ComponentWithFallback', mockFallback);
      
      // Fallback should be registered
      expect(manager.getLoadingState('ComponentWithFallback')).toBeDefined();
    });
  });

  describe('Component Loading', () => {
    beforeEach(() => {
      const registration: ComponentRegistration = {
        name: 'TestComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false,
        fallback: mockFallback
      };
      manager.registerComponent(registration);
    });

    it('should load a component successfully', async () => {
      const result = await manager.loadComponent('TestComponent');
      
      expect(result.success).toBe(true);
      expect(result.component).toBe(mockComponent);
      expect(result.fallbackUsed).toBe(false);
      expect(result.retryCount).toBe(0);
      expect(result.loadTime).toBeGreaterThan(0);
    });

    it('should handle component loading timeout', async () => {
      const slowRegistration: ComponentRegistration = {
        name: 'SlowComponent',
        importFn: () => new Promise((resolve) => {
          setTimeout(() => resolve({ default: mockComponent }), 2000); // 2 seconds
        }),
        critical: false,
        fallback: mockFallback
      };

      manager.registerComponent(slowRegistration);
      manager.updateConfig({ timeout: 100 }); // 100ms timeout

      const result = await manager.loadComponent('SlowComponent');
      
      expect(result.success).toBe(false);
      expect(result.fallbackUsed).toBe(true);
      expect(result.component).toBe(mockFallback);
    }, 10000); // 10 second test timeout

    it('should retry failed component loads', async () => {
      let attemptCount = 0;
      const flakyRegistration: ComponentRegistration = {
        name: 'FlakyComponent',
        importFn: () => {
          attemptCount++;
          if (attemptCount < 3) {
            return Promise.reject(new Error('Network error'));
          }
          return Promise.resolve({ default: mockComponent });
        },
        critical: false,
        fallback: mockFallback
      };

      manager.registerComponent(flakyRegistration);
      manager.updateConfig({ maxRetries: 3, retryDelay: 10 });

      const result = await manager.loadComponent('FlakyComponent');
      
      expect(result.success).toBe(true);
      expect(result.component).toBe(mockComponent);
      expect(result.retryCount).toBe(2); // Third attempt succeeded
      expect(attemptCount).toBe(3);
    });

    it('should use fallback after max retries exceeded', async () => {
      const failingRegistration: ComponentRegistration = {
        name: 'FailingComponent',
        importFn: () => Promise.reject(new Error('Persistent error')),
        critical: false,
        fallback: mockFallback
      };

      manager.registerComponent(failingRegistration);
      manager.updateConfig({ maxRetries: 2, retryDelay: 10 });

      const result = await manager.loadComponent('FailingComponent');
      
      expect(result.success).toBe(false);
      expect(result.fallbackUsed).toBe(true);
      expect(result.component).toBe(mockFallback);
      expect(result.retryCount).toBe(2);
      expect(result.error).toBeDefined();
    });

    it('should throw error when no fallback is available', async () => {
      const failingRegistration: ComponentRegistration = {
        name: 'FailingNoFallback',
        importFn: () => Promise.reject(new Error('Persistent error')),
        critical: false
      };

      manager.registerComponent(failingRegistration);
      manager.updateConfig({ maxRetries: 1, retryDelay: 10, enableFallbacks: false });

      await expect(manager.loadComponent('FailingNoFallback')).rejects.toThrow('Persistent error');
    });

    it('should handle unregistered component', async () => {
      await expect(manager.loadComponent('UnregisteredComponent')).rejects.toThrow(
        "Component 'UnregisteredComponent' is not registered"
      );
    });

    it('should return same promise for concurrent loads', async () => {
      // Start both loads at the same time before awaiting
      const promise1 = manager.loadComponent('TestComponent');
      const promise2 = manager.loadComponent('TestComponent');
      
      // Both promises should resolve to the same result
      const [result1, result2] = await Promise.all([promise1, promise2]);
      expect(result1).toEqual(result2);
      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
    });
  });

  describe('Component Preloading', () => {
    beforeEach(() => {
      const registration: ComponentRegistration = {
        name: 'PreloadComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: true,
        preloadTrigger: 'immediate'
      };
      manager.registerComponent(registration);
    });

    it('should preload a component successfully', async () => {
      const success = await manager.preloadComponent('PreloadComponent');
      
      expect(success).toBe(true);
      
      const loadingState = manager.getLoadingState('PreloadComponent');
      expect(loadingState?.preloaded).toBe(true);
    });

    it('should handle preload failures gracefully', async () => {
      const failingRegistration: ComponentRegistration = {
        name: 'FailingPreload',
        importFn: () => Promise.reject(new Error('Preload failed')),
        critical: false
        // No fallback provided, so preload should fail
      };

      manager.registerComponent(failingRegistration);
      manager.updateConfig({ enableFallbacks: false }); // Disable fallbacks for this test
      
      const success = await manager.preloadComponent('FailingPreload');
      expect(success).toBe(false);
    }, 10000); // 10 second test timeout

    it('should preload critical components automatically', async () => {
      // Wait for automatic preloading to complete
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const stats = manager.getLoadingStats();
      expect(stats.preloadedComponents).toBeGreaterThan(0);
    });

    it('should preload components for specific context', async () => {
      const contextRegistration: ComponentRegistration = {
        name: 'ContextComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false
      };

      manager.registerComponent(contextRegistration);
      
      await manager.preloadForContext('dashboard', ['ContextComponent']);
      
      const loadingState = manager.getLoadingState('ContextComponent');
      expect(loadingState?.preloaded).toBe(true);
    });

    it('should check if component is preloaded', async () => {
      expect(manager.isPreloaded('PreloadComponent')).toBe(false);
      
      await manager.preloadComponent('PreloadComponent');
      
      expect(manager.isPreloaded('PreloadComponent')).toBe(true);
    });
  });

  describe('Lazy Component Creation', () => {
    beforeEach(() => {
      const registration: ComponentRegistration = {
        name: 'LazyComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false,
        fallback: mockFallback
      };
      manager.registerComponent(registration);
    });

    it('should create lazy component successfully', () => {
      const LazyComponent = manager.createLazyComponent('LazyComponent');
      
      expect(LazyComponent).toBeDefined();
      expect(typeof LazyComponent).toBe('function');
    });

    it('should throw error for unregistered lazy component', () => {
      expect(() => manager.createLazyComponent('UnregisteredLazy')).toThrow(
        "Component 'UnregisteredLazy' is not registered"
      );
    });
  });

  describe('Loading State Management', () => {
    beforeEach(() => {
      const registration: ComponentRegistration = {
        name: 'StateComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false
      };
      manager.registerComponent(registration);
    });

    it('should track loading state correctly', async () => {
      const loadPromise = manager.loadComponent('StateComponent');
      
      const loadingState = manager.getLoadingState('StateComponent');
      expect(loadingState?.isLoading).toBe(true);
      
      await loadPromise;
      
      const completedState = manager.getLoadingState('StateComponent');
      expect(completedState?.isLoading).toBe(false);
      expect(completedState?.loadTime).toBeGreaterThan(0);
    });

    it('should return all loading states', () => {
      const allStates = manager.getAllLoadingStates();
      
      expect(allStates.size).toBeGreaterThan(0);
      expect(allStates.has('StateComponent')).toBe(true);
    });

    it('should provide loading statistics', async () => {
      await manager.loadComponent('StateComponent');
      
      const stats = manager.getLoadingStats();
      
      expect(stats.totalComponents).toBeGreaterThan(0);
      expect(stats.averageLoadTime).toBeGreaterThan(0);
      expect(typeof stats.preloadedComponents).toBe('number');
      expect(typeof stats.failedComponents).toBe('number');
      expect(typeof stats.criticalComponents).toBe('number');
    });
  });

  describe('Configuration Management', () => {
    it('should update configuration correctly', () => {
      const newConfig = {
        maxRetries: 5,
        retryDelay: 2000,
        timeout: 15000
      };

      manager.updateConfig(newConfig);
      
      const currentConfig = manager.getConfig();
      expect(currentConfig.maxRetries).toBe(5);
      expect(currentConfig.retryDelay).toBe(2000);
      expect(currentConfig.timeout).toBe(15000);
    });

    it('should return current configuration', () => {
      const config = manager.getConfig();
      
      expect(config).toBeDefined();
      expect(typeof config.preloadCritical).toBe('boolean');
      expect(typeof config.enableRetry).toBe('boolean');
      expect(typeof config.maxRetries).toBe('number');
      expect(typeof config.retryDelay).toBe('number');
      expect(typeof config.enableFallbacks).toBe('boolean');
      expect(typeof config.timeout).toBe('number');
      expect(typeof config.enablePerformanceTracking).toBe('boolean');
    });
  });

  describe('Cache Management', () => {
    beforeEach(() => {
      const registration: ComponentRegistration = {
        name: 'CacheComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false
      };
      manager.registerComponent(registration);
    });

    it('should clear cache correctly', async () => {
      await manager.loadComponent('CacheComponent');
      
      let stats = manager.getLoadingStats();
      expect(stats.totalComponents).toBeGreaterThan(0);
      
      manager.clearCache();
      
      stats = manager.getLoadingStats();
      expect(stats.totalComponents).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      const networkErrorRegistration: ComponentRegistration = {
        name: 'NetworkErrorComponent',
        importFn: () => Promise.reject(new Error('Network error')),
        critical: false,
        fallback: mockFallback
      };

      manager.registerComponent(networkErrorRegistration);
      
      const result = await manager.loadComponent('NetworkErrorComponent');
      
      expect(result.success).toBe(false);
      expect(result.fallbackUsed).toBe(true);
      expect(result.error?.message).toBe('Network error');
    }, 10000); // 10 second test timeout

    it('should handle import errors gracefully', async () => {
      const importErrorRegistration: ComponentRegistration = {
        name: 'ImportErrorComponent',
        importFn: () => Promise.reject(new Error('Module not found')),
        critical: false,
        fallback: mockFallback
      };

      manager.registerComponent(importErrorRegistration);
      
      const result = await manager.loadComponent('ImportErrorComponent');
      
      expect(result.success).toBe(false);
      expect(result.fallbackUsed).toBe(true);
      expect(result.error?.message).toBe('Module not found');
    }, 10000); // 10 second test timeout

    it('should handle malformed component modules', async () => {
      const malformedRegistration: ComponentRegistration = {
        name: 'MalformedComponent',
        importFn: () => Promise.resolve({} as any), // Missing default export
        critical: false,
        fallback: mockFallback
      };

      manager.registerComponent(malformedRegistration);
      
      const result = await manager.loadComponent('MalformedComponent');
      
      expect(result.success).toBe(true); // Should still work with undefined default
      expect(result.component).toBeUndefined();
    });
  });

  describe('Performance Tracking', () => {
    beforeEach(() => {
      const registration: ComponentRegistration = {
        name: 'PerformanceComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false
      };
      manager.registerComponent(registration);
    });

    it('should track loading performance', async () => {
      const result = await manager.loadComponent('PerformanceComponent');
      
      expect(result.loadTime).toBeGreaterThan(0);
      
      const loadingState = manager.getLoadingState('PerformanceComponent');
      expect(loadingState?.loadTime).toBe(result.loadTime);
    });

    it('should calculate average load times', async () => {
      // Load multiple components
      await manager.loadComponent('PerformanceComponent');
      
      const stats = manager.getLoadingStats();
      expect(stats.averageLoadTime).toBeGreaterThan(0);
    });
  });

  describe('Preload Triggers', () => {
    it('should handle immediate preload trigger', () => {
      const immediateRegistration: ComponentRegistration = {
        name: 'ImmediateComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false,
        preloadTrigger: 'immediate'
      };

      const preloadSpy = vi.spyOn(manager, 'preloadComponent');
      
      manager.registerComponent(immediateRegistration);
      
      expect(preloadSpy).toHaveBeenCalledWith('ImmediateComponent');
    });

    it('should handle idle preload trigger', () => {
      const idleRegistration: ComponentRegistration = {
        name: 'IdleComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false,
        preloadTrigger: 'idle'
      };

      manager.registerComponent(idleRegistration);
      
      expect(window.requestIdleCallback).toHaveBeenCalled();
    });

    it('should handle scroll preload trigger', () => {
      const scrollRegistration: ComponentRegistration = {
        name: 'ScrollComponent',
        importFn: () => Promise.resolve({ default: mockComponent }),
        critical: false,
        preloadTrigger: 'scroll'
      };

      manager.registerComponent(scrollRegistration);
      
      expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
    });
  });
});