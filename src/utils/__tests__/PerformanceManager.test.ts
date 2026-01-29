import { describe, it, expect, beforeEach, vi } from 'vitest';
import { performanceManager } from '../PerformanceManager';

// Mock performance API
const mockPerformance = {
  now: vi.fn(() => Date.now()),
  getEntriesByType: vi.fn(() => []),
  mark: vi.fn(),
  measure: vi.fn()
};

// Mock window.performance
Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true
});

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

describe('PerformanceManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    performanceManager.clearCache();
    mockLocalStorage.getItem.mockReturnValue('true'); // Enable by default for tests
  });

  it('should initialize correctly', () => {
    expect(performanceManager).toBeDefined();
  });

  it('should enable/disable performance tracking', () => {
    performanceManager.setEnabled(true);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('enablePerformanceManager', 'true');

    performanceManager.setEnabled(false);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('enablePerformanceManager');
  });

  it('should track user interactions', () => {
    performanceManager.setEnabled(true);
    
    // Mock performance.now to return predictable values
    mockPerformance.now.mockReturnValueOnce(100).mockReturnValueOnce(150);
    
    performanceManager.trackUserInteraction('click', 'button');
    
    // Should have called performance.now for start time
    expect(mockPerformance.now).toHaveBeenCalled();
  });

  it('should measure page load performance', () => {
    performanceManager.setEnabled(true);
    
    performanceManager.measurePageLoad('dashboard');
    
    // Should have called performance.now
    expect(mockPerformance.now).toHaveBeenCalled();
  });

  it('should manage critical components', () => {
    performanceManager.addCriticalComponent('TestComponent');
    performanceManager.removeCriticalComponent('TestComponent');
    
    // Should not throw errors
    expect(true).toBe(true);
  });

  it('should provide performance summary', () => {
    const summary = performanceManager.getPerformanceSummary();
    
    expect(summary).toHaveProperty('componentCache');
    expect(summary).toHaveProperty('preloadedComponents');
    expect(summary).toHaveProperty('performanceMetrics');
  });

  it('should clear cache correctly', () => {
    performanceManager.clearCache();
    
    const summary = performanceManager.getPerformanceSummary();
    expect(Object.keys(summary.componentCache)).toHaveLength(0);
    expect(summary.preloadedComponents).toHaveLength(0);
  });

  it('should handle asset optimization', () => {
    // Mock document methods
    const mockCreateElement = vi.fn(() => ({
      setAttribute: vi.fn(),
      href: '',
      rel: '',
      as: '',
      type: '',
      crossOrigin: ''
    }));
    
    const mockHead = {
      appendChild: vi.fn()
    };
    
    Object.defineProperty(document, 'createElement', {
      value: mockCreateElement,
      writable: true
    });
    
    Object.defineProperty(document, 'head', {
      value: mockHead,
      writable: true
    });
    
    performanceManager.setEnabled(true);
    performanceManager.optimizeAssets();
    
    // Should not throw errors
    expect(true).toBe(true);
  });
});