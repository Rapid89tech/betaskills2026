import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Clock, 
  MemoryStick, 
  Zap,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { stabilityMonitoringService, StabilityMetrics } from '@/services/StabilityMonitoringService';
import { useErrorRecovery } from '@/hooks/useErrorRecovery';
import { PerformanceMonitor } from './PerformanceMonitor';

interface StabilityDashboardProps {
  className?: string;
}

export const StabilityDashboard: React.FC<StabilityDashboardProps> = ({ className }) => {
  const [metrics, setMetrics] = useState<StabilityMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { reportError, hasError, retry, clearError } = useErrorRecovery({
    maxRetries: 3,
    autoRetry: true,
    onError: (error) => {
      console.error('Stability Dashboard Error:', error);
    }
  });

  const loadMetrics = async () => {
    try {
      setIsLoading(true);
      const stabilityMetrics = await stabilityMonitoringService.getStabilityMetrics();
      setMetrics(stabilityMetrics);
      setLastUpdated(new Date());
      clearError();
    } catch (error) {
      reportError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = (metrics: StabilityMetrics) => {
    if (metrics.errorCount > 10 || metrics.performanceScore < 50 || metrics.memoryUsage > 90) {
      return { status: 'critical', color: 'destructive', icon: AlertTriangle };
    }
    if (metrics.errorCount > 5 || metrics.performanceScore < 70 || metrics.memoryUsage > 70) {
      return { status: 'warning', color: 'warning', icon: AlertTriangle };
    }
    return { status: 'healthy', color: 'success', icon: CheckCircle };
  };

  const formatUptime = (uptime: number) => {
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatResponseTime = (responseTime: number) => {
    if (responseTime < 0) return 'N/A';
    return `${responseTime.toFixed(0)}ms`;
  };

  if (hasError) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Stability Dashboard Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Failed to load stability metrics. This might indicate a system issue.
          </p>
          <Button onClick={retry} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading && !metrics) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 animate-pulse" />
            Loading Stability Metrics...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) return null;

  const healthStatus = getHealthStatus(metrics);
  const HealthIcon = healthStatus.icon;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HealthIcon className={`w-5 h-5 ${
                healthStatus.status === 'healthy' ? 'text-green-500' : 
                healthStatus.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
              }`} />
              System Health Status
            </div>
            <Badge variant={healthStatus.color as any}>
              {healthStatus.status.toUpperCase()}
            </Badge>
          </CardTitle>
          <CardDescription>
            Real-time monitoring of application stability and performance
            {lastUpdated && (
              <span className="block text-xs mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{metrics.errorCount}</div>
              <div className="text-sm text-gray-600">Errors (1h)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{metrics.performanceScore}</div>
              <div className="text-sm text-gray-600">Performance Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{metrics.memoryUsage.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Memory Usage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{formatUptime(metrics.uptime)}</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Performance Score</span>
                <span className="text-sm text-gray-600">{metrics.performanceScore}/100</span>
              </div>
              <Progress value={metrics.performanceScore} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Response Time</span>
              </div>
              <span className="text-sm font-medium">{formatResponseTime(metrics.responseTime)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Memory Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MemoryStick className="w-5 h-5" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm text-gray-600">{metrics.memoryUsage.toFixed(1)}%</span>
              </div>
              <Progress 
                value={metrics.memoryUsage} 
                className={`h-2 ${metrics.memoryUsage > 80 ? 'bg-red-100' : ''}`}
              />
            </div>
            
            {metrics.memoryUsage > 80 && (
              <div className="flex items-center gap-2 text-sm text-yellow-600">
                <AlertTriangle className="w-4 h-4" />
                High memory usage detected
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Error Summary */}
      {metrics.errorCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Recent Errors
            </CardTitle>
            <CardDescription>
              {metrics.errorCount} error{metrics.errorCount !== 1 ? 's' : ''} detected in the last hour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Monitor the error logs for detailed information about recent issues.
              </span>
              <Button variant="outline" size="sm" onClick={loadMetrics}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Monitor */}
      <PerformanceMonitor />

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
          <CardDescription>
            Tools to help maintain system stability and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={loadMetrics} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Metrics
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                // Clear browser cache
                if ('caches' in window) {
                  caches.keys().then(names => {
                    names.forEach(name => caches.delete(name));
                  });
                }
              }}
            >
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
              <MemoryStick className="w-4 h-4 mr-2" />
              Optimize Memory
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StabilityDashboard;