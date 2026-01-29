/**
 * AdminPerformanceDashboard
 * 
 * Performance monitoring dashboard for the AdminDataManager
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Database, Zap, MemoryStick, Clock, TrendingUp } from 'lucide-react';
import { adminDataManager } from '@/services/adminDataManager';
import { logger } from '@/utils/logger';

interface PerformanceMetrics {
  cacheHitRate: number;
  averageQueryTime: number;
  totalQueries: number;
  cacheSize: number;
  memoryUsage: number;
  lastCleanup: number;
}

interface CacheConfig {
  ttl: number;
  maxSize: number;
  prefetchThreshold: number;
  compressionEnabled: boolean;
}

export function AdminPerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cacheHitRate: 0,
    averageQueryTime: 0,
    totalQueries: 0,
    cacheSize: 0,
    memoryUsage: 0,
    lastCleanup: 0
  });
  
  const [config, setConfig] = useState<CacheConfig>({
    ttl: 5 * 60 * 1000,
    maxSize: 1000,
    prefetchThreshold: 0.8,
    compressionEnabled: true
  });
  
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update metrics
  const updateMetrics = () => {
    const currentMetrics = adminDataManager.getMetrics();
    setMetrics(currentMetrics);
  };

  // Refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Force refresh by invalidating cache
      adminDataManager.invalidateCache();
      updateMetrics();
      logger.info('Performance dashboard refreshed');
    } catch (error) {
      logger.error('Failed to refresh performance dashboard:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Clear cache
  const handleClearCache = (type?: 'enrollments' | 'users' | 'payments' | 'stats') => {
    adminDataManager.invalidateCache(type);
    updateMetrics();
    logger.info(`Cache cleared: ${type || 'all'}`);
  };

  // Update configuration
  const handleConfigUpdate = (newConfig: Partial<CacheConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    adminDataManager.configure(updatedConfig);
    logger.info('Cache configuration updated:', updatedConfig);
  };

  // Format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Format bytes
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  // Format time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  // Format duration
  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  // Auto-refresh metrics
  useEffect(() => {
    updateMetrics();
    
    const interval = setInterval(updateMetrics, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor AdminDataManager performance and cache statistics
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleClearCache()}
            className="flex items-center gap-2"
          >
            <Database className="h-4 w-4" />
            Clear All Cache
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cache Hit Rate</p>
                <p className="text-2xl font-bold">
                  {(metrics.cacheHitRate * 100).toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <Progress 
              value={metrics.cacheHitRate * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Query Time</p>
                <p className="text-2xl font-bold">
                  {formatDuration(metrics.averageQueryTime)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <Badge 
              variant={metrics.averageQueryTime < 1000 ? 'default' : 'destructive'}
              className="mt-2"
            >
              {metrics.averageQueryTime < 1000 ? 'Fast' : 'Slow'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Queries</p>
                <p className="text-2xl font-bold">
                  {formatNumber(metrics.totalQueries)}
                </p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Memory Usage</p>
                <p className="text-2xl font-bold">
                  {formatBytes(metrics.memoryUsage)}
                </p>
              </div>
              <MemoryStick className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Tabs defaultValue="cache" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cache">Cache Management</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="cache" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Cache Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cache Size</span>
                  <Badge variant="outline">{metrics.cacheSize} entries</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <Badge variant="outline">{formatBytes(metrics.memoryUsage)}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Last Cleanup</span>
                  <Badge variant="outline">{formatTime(metrics.lastCleanup)}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cache Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleClearCache('enrollments')}
                  className="w-full justify-start"
                >
                  Clear Enrollments Cache
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleClearCache('users')}
                  className="w-full justify-start"
                >
                  Clear Users Cache
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleClearCache('payments')}
                  className="w-full justify-start"
                >
                  Clear Payments Cache
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleClearCache('stats')}
                  className="w-full justify-start"
                >
                  Clear Stats Cache
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cache Hit Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {(metrics.cacheHitRate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={metrics.cacheHitRate * 100} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Average Query Time</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDuration(metrics.averageQueryTime)}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(100, (metrics.averageQueryTime / 2000) * 100)} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{formatNumber(metrics.totalQueries)}</p>
                  <p className="text-sm text-muted-foreground">Total Queries</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold">{metrics.cacheSize}</p>
                  <p className="text-sm text-muted-foreground">Cache Entries</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold">{formatBytes(metrics.memoryUsage)}</p>
                  <p className="text-sm text-muted-foreground">Memory Used</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cache Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">TTL (Time to Live)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={config.ttl / 1000}
                      onChange={(e) => handleConfigUpdate({ ttl: Number(e.target.value) * 1000 })}
                      className="flex-1 px-3 py-2 border rounded-md"
                      placeholder="TTL in seconds"
                    />
                    <span className="text-sm text-muted-foreground self-center">seconds</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Cache Size</label>
                  <input
                    type="number"
                    value={config.maxSize}
                    onChange={(e) => handleConfigUpdate({ maxSize: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Maximum cache entries"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prefetch Threshold</label>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={config.prefetchThreshold}
                      onChange={(e) => handleConfigUpdate({ prefetchThreshold: Number(e.target.value) })}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground self-center">
                      {(config.prefetchThreshold * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Compression</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.compressionEnabled}
                      onChange={(e) => handleConfigUpdate({ compressionEnabled: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Enable compression</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
