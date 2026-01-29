import React, { useState, useEffect } from 'react';
import { useAdminPerformance } from '@/hooks/useAdminPerformance';

interface PerformanceComparisonProps {
  isOptimized: boolean;
}

export const PerformanceComparison: React.FC<PerformanceComparisonProps> = ({ isOptimized }) => {
  const { metrics, getPerformanceReport } = useAdminPerformance();
  const [showReport, setShowReport] = useState(false);

  const getMetricColor = (value: number, thresholds: { good: number; fair: number }) => {
    if (value <= thresholds.good) return 'text-green-600 bg-green-100';
    if (value <= thresholds.fair) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCacheColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600 bg-green-100';
    if (rate >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isOptimized ? 'bg-green-500' : 'bg-orange-500'}`}></div>
          <h3 className="text-lg font-medium text-gray-900">
            {isOptimized ? 'Optimized' : 'Standard'} Admin Dashboard
          </h3>
        </div>
        <button
          onClick={() => setShowReport(!showReport)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showReport ? 'Hide' : 'Show'} Performance Report
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center">
          <div className={`px-3 py-2 rounded-lg ${getMetricColor(metrics.loadTime, { good: 1000, fair: 2000 })}`}>
            <div className="text-lg font-bold">{metrics.loadTime.toFixed(0)}ms</div>
            <div className="text-xs">Load Time</div>
          </div>
        </div>

        <div className="text-center">
          <div className={`px-3 py-2 rounded-lg ${getMetricColor(metrics.searchTime, { good: 300, fair: 1000 })}`}>
            <div className="text-lg font-bold">{metrics.searchTime.toFixed(0)}ms</div>
            <div className="text-xs">Search Time</div>
          </div>
        </div>

        <div className="text-center">
          <div className={`px-3 py-2 rounded-lg ${getMetricColor(metrics.renderTime, { good: 100, fair: 300 })}`}>
            <div className="text-lg font-bold">{metrics.renderTime.toFixed(0)}ms</div>
            <div className="text-xs">Render Time</div>
          </div>
        </div>

        <div className="text-center">
          <div className={`px-3 py-2 rounded-lg ${getCacheColor(metrics.cacheHitRate)}`}>
            <div className="text-lg font-bold">{metrics.cacheHitRate.toFixed(1)}%</div>
            <div className="text-xs">Cache Hit Rate</div>
          </div>
        </div>

        <div className="text-center">
          <div className={`px-3 py-2 rounded-lg ${getMetricColor(metrics.memoryUsage, { good: 50, fair: 100 })}`}>
            <div className="text-lg font-bold">{metrics.memoryUsage.toFixed(1)}MB</div>
            <div className="text-xs">Memory Usage</div>
          </div>
        </div>
      </div>

      {isOptimized && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium">Performance Optimizations Active:</span>
          </div>
          <ul className="mt-2 text-sm text-blue-700 space-y-1">
            <li>• Virtual scrolling for large lists</li>
            <li>• Debounced search with 300ms delay</li>
            <li>• Intelligent caching with 5-minute TTL</li>
            <li>• Pagination with 20 items per page</li>
            <li>• Optimistic updates for better UX</li>
            <li>• Real-time updates via WebSocket</li>
          </ul>
        </div>
      )}

      {showReport && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Detailed Performance Report</h4>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
            {getPerformanceReport()}
          </pre>
        </div>
      )}
    </div>
  );
};