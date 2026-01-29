import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Clock, 
  MemoryStick, 
  Database,
  Zap,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { usePerformanceMetrics, useMemoryOptimization } from '@/hooks/usePerformanceOptimization';
import { performanceOptimizationService } from '@/services/PerformanceOptimizationService';

interface PerformanceMonitorProps {
  className?: string;
  compact?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  className, 
  compact = false 
}) => {
  const performanceMetrics = usePerformanceMetrics();
  const { getCacheStats, clearCache, optimizeMemory } = useMemoryOptimization();
  const [cacheStats, setCacheStats] = useState({ size: 0, hitRate: 0 });

  useEffect(() => {
    const updateCacheStats = () => {
      const stats = getCacheStats();
      setCacheStats(stats);
    };

    updateCacheStats();
    const interval = setInterval(updateCacheStats, 5000);
    return () => clearInterval(interval);
  }, [getCacheStats]);

  const getPerformanceStatus = () => {
    if (!performanceMetrics) return { status: 'unknown', color: 'gray' };

    const { loadTime, memoryUsage, apiResponseTime } = performanceMetrics;
    
    if (loadTime > 3000 || memoryUsage > 85 || apiResponseTime > 2000) {
      return { status: 'poor', color: 'red' };
    }
    if (loadTime > 1500 || memoryUsage > 70 || apiResponseTime > 1000) {
      return { status: 'fair', color: 'yellow' };
    }
    return { status: 'good', color: 'green' };
  };

  const performanceStatus = getPerformanceStatus();

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1">
          <Activity className={`w-4 h-4 text-${performanceStatus.color}-500`} />
          <span className="text-xs text-gray-600">
            {performanceMetrics ? `${performanceMetrics.loadTime.toFixed(0)}ms` : 'N/A'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MemoryStick className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-600">
            {performanceMetrics ? `${performanceMetrics.memoryUsage.toFixed(1)}%` : 'N/A'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Database className="w-4 h-4 text-blue-500" />
          <span className="text-xs text-gray-600">
            {cacheStats.size} cached
          </span>
        </div>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className={`w-5 h-5 text-${performanceStatus.color}-500`} />
          Performance Monitor
          <Badge variant={performanceStatus.color as any}>
            {performanceStatus.status.toUpperCase()}
          </Badge>
        </CardTitle>
        <CardDescription>
          Real-time application performance metrics and optimization tools
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        {performanceMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {performanceMetrics.loadTime.toFixed(0)}ms
              </div>
              <div className="text-sm text-gray-600">Load Time</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MemoryStick className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {performanceMetrics.memoryUsage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Memory Usage</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {performanceMetrics.apiResponseTime.toFixed(0)}ms
              </div>
              <div className="text-sm text-gray-600">API Response</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Database className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {(cacheStats.hitRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Cache Hit Rate</div>
            </div>
          </div>
        )}

        {/* Memory Usage Progress */}
        {performanceMetrics && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Memory Usage</span>
              <span className="text-sm text-gray-600">
                {performanceMetrics.memoryUsage.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={performanceMetrics.memoryUsage} 
              className={`h-2 ${performanceMetrics.memoryUsage > 80 ? 'bg-red-100' : ''}`}
            />
            {performanceMetrics.memoryUsage > 80 && (
              <div className="text-sm text-red-600 mt-1">
                High memory usage detected - consider optimizing
              </div>
            )}
          </div>
        )}

        {/* Cache Statistics */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Cache Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-lg font-semibold text-gray-900">{cacheStats.size}</div>
              <div className="text-sm text-gray-600">Cached Items</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {(cacheStats.hitRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Hit Rate</div>
            </div>
          </div>
        </div>

        {/* Optimization Actions */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Optimization Tools</h4>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={optimizeMemory}
            >
              <MemoryStick className="w-4 h-4 mr-2" />
              Optimize Memory
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => clearCache()}
            >
              <Database className="w-4 h-4 mr-2" />
              Clear Cache
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                // Force garbage collection if available
                if ((window as any).gc) {
                  (window as any).gc();
                }
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Force GC
            </Button>
          </div>
        </div>

        {/* Performance Tips */}
        {performanceStatus.status !== 'good' && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Performance Tips</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {performanceMetrics && performanceMetrics.memoryUsage > 70 && (
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  High memory usage - try clearing cache or optimizing memory
                </div>
              )}
              {performanceMetrics && performanceMetrics.loadTime > 2000 && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  Slow load times - check network connection and server performance
                </div>
              )}
              {cacheStats.hitRate < 0.5 && (
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-500" />
                  Low cache hit rate - data is being fetched frequently
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceMonitor;