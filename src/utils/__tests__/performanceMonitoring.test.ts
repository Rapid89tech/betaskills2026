/**
 * Tests for performance monitoring implementation
 */

import { performanceMonitor } from '../performanceMonitor';
import { performanceOptimizer } from '../performanceOptimizer';
import { performanceAnalytics } from '../performanceAnalytics';

// Mock performance API
const mockPerformance = {
  now: jest.fn(() => Date.now()),
  getEntriesByType: jest.fn(() => []),
  mark: jest.fn(),
  measure: jest.fn(),
  memory: {
    usedJSHeapSize: 50000000,
    totalJSHeapSize: 100000000,
    jsHeapSizeLimit: 200000000
  }
};

// Mock window.performance
Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true
});

describe('Performance Monitoring Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    performanceMonitor.clear();
  });

  describe('Performance Monitor', () => {
    test('should start and end measurements', () => {
      const measurementName = 'test-component';
      
      performanceMonitor.startMeasure(measurementName, 'component');
      
      // Simulate some work
      setTimeout(() => {
        const duration = performanceMonitor.endMeasure(measurementName);
        expect(duration).toBeGreaterThan(0);
      }, 10);
    });

    test('should track API calls', () => {
      const url = '/api/test';
      const method = 'GET';
      const startTime = performance.now();
      
      const mockResponse = {
        status: 200,
        headers: {
          get: jest.fn(() => '1000')
        }
      } as any;

      performanceMonitor.trackApiCall(url, method, startTime, mockResponse);
      
      const summary = performanceMonitor.getApiPerformanceSummary();
      expect(summary.totalCalls).toBeGreaterThan(0);
    });

    test('should calculate performance health', () => {
      const health = performanceMonitor.getPerformanceHealth();
      
      expect(health).toHaveProperty('score');
      expect(health).toHaveProperty('issues');
      expect(health).toHaveProperty('recommendations');
      expect(health).toHaveProperty('trends');
      expect(health.score).toBeGreaterThanOrEqual(0);
      expect(health.score).toBeLessThanOrEqual(100);
    });

    test('should provide performance summary', () => {
      const summary = performanceMonitor.getSummary();
      
      expect(summary).toHaveProperty('totalOperations');
      expect(summary).toHaveProperty('averageDuration');
      expect(summary).toHaveProperty('slowOperations');
      expect(summary).toHaveProperty('fastOperations');
    });
  });

  describe('Performance Optimizer', () => {
    test('should analyze performance and provide suggestions', async () => {
      const report = await performanceOptimizer.analyzePerformance();
      
      expect(report).toHaveProperty('score');
      expect(report).toHaveProperty('issues');
      expect(report).toHaveProperty('optimizations');
      expect(report).toHaveProperty('recommendations');
      expect(Array.isArray(report.optimizations)).toBe(true);
    });

    test('should get optimization suggestions', () => {
      const suggestions = performanceOptimizer.getOptimizationSuggestions();
      
      expect(Array.isArray(suggestions)).toBe(true);
      suggestions.forEach(suggestion => {
        expect(suggestion).toHaveProperty('id');
        expect(suggestion).toHaveProperty('name');
        expect(suggestion).toHaveProperty('description');
        expect(suggestion).toHaveProperty('category');
        expect(suggestion).toHaveProperty('priority');
      });
    });

    test('should apply automatic optimizations safely', async () => {
      const appliedOptimizations = await performanceOptimizer.applyAutomaticOptimizations();
      
      expect(Array.isArray(appliedOptimizations)).toBe(true);
      // Should not throw errors even if no optimizations are applied
    });
  });

  describe('Performance Analytics', () => {
    test('should collect performance data points', () => {
      performanceAnalytics.collectDataPoint();
      
      const report = performanceAnalytics.generateReport('hour');
      expect(report).toHaveProperty('totalSessions');
      expect(report).toHaveProperty('averagePerformanceScore');
      expect(report).toHaveProperty('performanceTrends');
    });

    test('should generate performance reports', () => {
      const report = performanceAnalytics.generateReport('day');
      
      expect(report).toHaveProperty('period');
      expect(report).toHaveProperty('startTime');
      expect(report).toHaveProperty('endTime');
      expect(report).toHaveProperty('totalSessions');
      expect(report).toHaveProperty('averagePerformanceScore');
      expect(report).toHaveProperty('topIssues');
      expect(report).toHaveProperty('recommendations');
      expect(report.period).toBe('day');
    });

    test('should export performance data', () => {
      const jsonData = performanceAnalytics.exportData('json');
      const csvData = performanceAnalytics.exportData('csv');
      
      expect(typeof jsonData).toBe('string');
      expect(typeof csvData).toBe('string');
      expect(() => JSON.parse(jsonData)).not.toThrow();
    });

    test('should get performance trends', () => {
      const trends = performanceAnalytics.getPerformanceTrends(7);
      
      expect(trends).toHaveProperty('dates');
      expect(trends).toHaveProperty('performanceScores');
      expect(trends).toHaveProperty('pageLoadTimes');
      expect(trends).toHaveProperty('apiResponseTimes');
      expect(Array.isArray(trends.dates)).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    test('should work together without conflicts', async () => {
      // Start monitoring
      performanceMonitor.startMeasure('integration-test', 'component');
      
      // Collect analytics data
      performanceAnalytics.collectDataPoint();
      
      // Get optimization suggestions
      const suggestions = performanceOptimizer.getOptimizationSuggestions();
      
      // End monitoring
      const duration = performanceMonitor.endMeasure('integration-test');
      
      // Generate reports
      const health = performanceMonitor.getPerformanceHealth();
      const report = performanceAnalytics.generateReport('hour');
      
      expect(duration).toBeGreaterThanOrEqual(0);
      expect(health.score).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(suggestions)).toBe(true);
      expect(report.totalSessions).toBeGreaterThanOrEqual(0);
    });

    test('should handle errors gracefully', async () => {
      // Test with invalid measurement names
      expect(() => performanceMonitor.endMeasure('non-existent')).not.toThrow();
      
      // Test with invalid optimization IDs
      const result = await performanceOptimizer.applyOptimization('invalid-id');
      expect(result).toBe(false);
      
      // Test analytics with no data
      const emptyReport = performanceAnalytics.generateReport('month');
      expect(emptyReport.totalSessions).toBe(0);
    });
  });
});