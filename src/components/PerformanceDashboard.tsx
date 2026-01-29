import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Clock, 
  Zap, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  CheckCircle, 
  Globe, 
  Server,
  BarChart3,
  Gauge,
  Lightbulb,
  Target
} from 'lucide-react';
import { performanceMonitor } from '../utils/performanceMonitor';
import { performanceManager } from '../utils/PerformanceManager';

/**
 * Comprehensive Performance Dashboard for monitoring application health
 * Provides real-time metrics, trends, and optimization suggestions
 */

interface PerformanceDashboardProps {
  className?: string;
  showInProduction?: boolean;
}

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'bundle' | 'api' | 'ux';
  action?: () => void;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ 
  className = '',
  showInProduction = false 
}) => {
  const [performanceHealth, setPerformanceHealth] = useState<any>(null);
  const [apiSummary, setApiSummary] = useState<any>(null);
  const [pageLoadSummary, setPageLoadSummary] = useState<any>(null);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  // Only show in development unless explicitly allowed in production
  const shouldShow = import.meta.env.DEV || showInProduction;

  useEffect(() => {
    if (!shouldShow) return;

    // Check if performance monitoring is enabled
    setIsEnabled(localStorage.getItem('enablePerformanceMonitoring') === 'true');

    // Update performance data
    const updatePerformanceData = () => {
      const health = performanceMonitor.getPerformanceHealth();
      const apiData = performanceMonitor.getApiPerformanceSummary();
      const pageData = performanceMonitor.getPageLoadSummary();
      
      setPerformanceHealth(health);
      setApiSummary(apiData);
      setPageLoadSummary(pageData);
      setOptimizationSuggestions(generateOptimizationSuggestions(health, apiData, pageData));
    };

    updatePerformanceData();

    // Set up auto-refresh
    const interval = setInterval(updatePerformanceData, 5000);
    setRefreshInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [shouldShow]);

  const generateOptimizationSuggestions = (health: any, api: any, pageLoad: any): OptimizationSuggestion[] => {
    const suggestions: OptimizationSuggestion[] = [];

    // Performance-based suggestions
    if (health?.score < 70) {
      suggestions.push({
        id: 'low-performance-score',
        title: 'Performance Score Below Threshold',
        description: `Current score: ${health.score}/100. Consider implementing suggested optimizations.`,
        impact: 'high',
        category: 'performance'
      });
    }

    // API performance suggestions
    if (api?.averageResponseTime > 1000) {
      suggestions.push({
        id: 'slow-api-calls',
        title: 'Slow API Response Times',
        description: `Average response time: ${api.averageResponseTime.toFixed(0)}ms. Consider implementing caching or optimizing endpoints.`,
        impact: 'high',
        category: 'api'
      });
    }

    if (api?.errorRate > 0.1) {
      suggestions.push({
        id: 'high-error-rate',
        title: 'High API Error Rate',
        description: `Error rate: ${(api.errorRate * 100).toFixed(1)}%. Implement better error handling and retry logic.`,
        impact: 'high',
        category: 'api'
      });
    }

    if (api?.cacheHitRate < 0.3) {
      suggestions.push({
        id: 'low-cache-hit-rate',
        title: 'Low Cache Hit Rate',
        description: `Cache hit rate: ${(api.cacheHitRate * 100).toFixed(1)}%. Improve caching strategy for better performance.`,
        impact: 'medium',
        category: 'api'
      });
    }

    // Page load suggestions
    if (pageLoad?.averageLoadTime > 3000) {
      suggestions.push({
        id: 'slow-page-loads',
        title: 'Slow Page Load Times',
        description: `Average load time: ${pageLoad.averageLoadTime.toFixed(0)}ms. Implement code splitting and lazy loading.`,
        impact: 'high',
        category: 'performance'
      });
    }

    if (pageLoad?.averageLCP > 2500) {
      suggestions.push({
        id: 'poor-lcp',
        title: 'Poor Largest Contentful Paint',
        description: `LCP: ${pageLoad.averageLCP.toFixed(0)}ms. Optimize images and critical rendering path.`,
        impact: 'medium',
        category: 'ux'
      });
    }

    // Bundle optimization suggestions
    const bundleSize = getBundleSize();
    if (bundleSize > 1000000) { // 1MB
      suggestions.push({
        id: 'large-bundle-size',
        title: 'Large Bundle Size',
        description: `Bundle size: ${(bundleSize / 1024 / 1024).toFixed(1)}MB. Consider code splitting and tree shaking.`,
        impact: 'medium',
        category: 'bundle'
      });
    }

    return suggestions;
  };

  const getBundleSize = (): number => {
    // Estimate bundle size based on performance entries
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    return resources
      .filter(resource => resource.name.includes('.js') || resource.name.includes('.css'))
      .reduce((total, resource) => total + (resource.transferSize || 0), 0);
  };

  const getHealthScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'degrading': return <TrendingDown className="h-3 w-3 text-red-600" />;
      default: return <Minus className="h-3 w-3 text-gray-600" />;
    }
  };

  const togglePerformanceMonitoring = () => {
    const newEnabled = !isEnabled;
    performanceMonitor.setEnabled(newEnabled);
    setIsEnabled(newEnabled);
  };

  const clearAllMetrics = () => {
    performanceMonitor.clear();
    performanceManager.clearCache();
  };

  const applySuggestion = (suggestion: OptimizationSuggestion) => {
    if (suggestion.action) {
      suggestion.action();
    } else {
      // Default actions for common suggestions
      switch (suggestion.id) {
        case 'slow-api-calls':
          console.log('💡 Consider implementing request caching and API optimization');
          break;
        case 'slow-page-loads':
          console.log('💡 Consider implementing code splitting and lazy loading');
          break;
        case 'large-bundle-size':
          console.log('💡 Consider running bundle analyzer: npm run analyze');
          break;
        default:
          console.log(`💡 Optimization suggestion: ${suggestion.title}`);
      }
    }
  };

  if (!shouldShow) return null;

  return (
    <div className={`performance-dashboard ${className}`}>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance Dashboard
            </span>
            <div className="flex items-center space-x-2">
              <Badge variant={isEnabled ? "default" : "secondary"}>
                {isEnabled ? "MONITORING" : "DISABLED"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={togglePerformanceMonitoring}
                title="Toggle Performance Monitoring"
              >
                <Zap className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllMetrics}
                title="Clear All Metrics"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isEnabled ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Performance Monitoring Disabled</h3>
              <p className="text-muted-foreground mb-4">
                Enable performance monitoring to view detailed metrics and optimization suggestions.
              </p>
              <Button onClick={togglePerformanceMonitoring}>
                <Zap className="h-4 w-4 mr-2" />
                Enable Monitoring
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="api">API Performance</TabsTrigger>
                <TabsTrigger value="pages">Page Loads</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {performanceHealth && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Performance Score */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <Gauge className="h-4 w-4 mr-2" />
                          Performance Score
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          {getHealthScoreIcon(performanceHealth.score)}
                          <span className={`text-2xl font-bold ${getHealthScoreColor(performanceHealth.score)}`}>
                            {performanceHealth.score}/100
                          </span>
                        </div>
                        <Progress value={performanceHealth.score} className="mt-2" />
                      </CardContent>
                    </Card>

                    {/* API Performance */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <Server className="h-4 w-4 mr-2" />
                          API Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Avg Response:</span>
                            <Badge variant="outline">
                              {apiSummary?.averageResponseTime?.toFixed(0) || 0}ms
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Error Rate:</span>
                            <Badge variant={apiSummary?.errorRate > 0.1 ? "destructive" : "default"}>
                              {((apiSummary?.errorRate || 0) * 100).toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Page Load Performance */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Page Loads
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Avg Load Time:</span>
                            <Badge variant="outline">
                              {pageLoadSummary?.averageLoadTime?.toFixed(0) || 0}ms
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">LCP:</span>
                            <Badge variant={pageLoadSummary?.averageLCP > 2500 ? "destructive" : "default"}>
                              {pageLoadSummary?.averageLCP?.toFixed(0) || 0}ms
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Issues and Recommendations */}
                {performanceHealth?.issues?.length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Performance Issues Detected:</strong>
                      <ul className="mt-2 space-y-1">
                        {performanceHealth.issues.map((issue: string, index: number) => (
                          <li key={index} className="text-sm">• {issue}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="api" className="space-y-4">
                {apiSummary && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">API Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Calls:</span>
                          <Badge>{apiSummary.totalCalls}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Response Time:</span>
                          <Badge variant="outline">{apiSummary.averageResponseTime.toFixed(0)}ms</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Cache Hit Rate:</span>
                          <Badge variant={apiSummary.cacheHitRate > 0.5 ? "default" : "secondary"}>
                            {(apiSummary.cacheHitRate * 100).toFixed(1)}%
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Slowest API Calls</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {apiSummary.slowestCalls?.length > 0 ? (
                          <div className="space-y-2">
                            {apiSummary.slowestCalls.slice(0, 3).map((call: any, index: number) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="truncate">{call.method} {call.url.split('/').pop()}</span>
                                <Badge variant="destructive">{call.duration.toFixed(0)}ms</Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No slow API calls detected</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pages" className="space-y-4">
                {pageLoadSummary && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Page Load Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span>Average Load Time:</span>
                          <Badge variant="outline">{pageLoadSummary.averageLoadTime.toFixed(0)}ms</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>First Contentful Paint:</span>
                          <Badge variant="outline">{pageLoadSummary.averageFCP?.toFixed(0) || 'N/A'}ms</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Largest Contentful Paint:</span>
                          <Badge variant={pageLoadSummary.averageLCP > 2500 ? "destructive" : "default"}>
                            {pageLoadSummary.averageLCP?.toFixed(0) || 'N/A'}ms
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Slowest Pages</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {pageLoadSummary.slowestPages?.length > 0 ? (
                          <div className="space-y-2">
                            {pageLoadSummary.slowestPages.slice(0, 3).map((page: any, index: number) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="truncate">{page.pageName}</span>
                                <Badge variant="destructive">{page.loadComplete.toFixed(0)}ms</Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No slow pages detected</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-4">
                <div className="flex items-center mb-4">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  <h3 className="text-lg font-semibold">Optimization Suggestions</h3>
                </div>
                
                {optimizationSuggestions.length > 0 ? (
                  <div className="space-y-3">
                    {optimizationSuggestions.map((suggestion) => (
                      <Card key={suggestion.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{suggestion.title}</h4>
                                <Badge 
                                  variant={
                                    suggestion.impact === 'high' ? 'destructive' : 
                                    suggestion.impact === 'medium' ? 'default' : 'secondary'
                                  }
                                >
                                  {suggestion.impact} impact
                                </Badge>
                                <Badge variant="outline">{suggestion.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => applySuggestion(suggestion)}
                              className="ml-4"
                            >
                              <Target className="h-3 w-3 mr-1" />
                              Apply
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h3 className="text-lg font-semibold mb-2">No Optimization Suggestions</h3>
                    <p className="text-muted-foreground">
                      Your application is performing well! Keep monitoring for potential improvements.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="trends" className="space-y-4">
                {performanceHealth?.trends && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          Page Load Trend
                          {getTrendIcon(performanceHealth.trends.pageLoadTrend)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge variant={
                          performanceHealth.trends.pageLoadTrend === 'improving' ? 'default' :
                          performanceHealth.trends.pageLoadTrend === 'degrading' ? 'destructive' : 'secondary'
                        }>
                          {performanceHealth.trends.pageLoadTrend}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          API Performance Trend
                          {getTrendIcon(performanceHealth.trends.apiPerformanceTrend)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge variant={
                          performanceHealth.trends.apiPerformanceTrend === 'improving' ? 'default' :
                          performanceHealth.trends.apiPerformanceTrend === 'degrading' ? 'destructive' : 'secondary'
                        }>
                          {performanceHealth.trends.apiPerformanceTrend}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          Error Rate Trend
                          {getTrendIcon(performanceHealth.trends.errorRateTrend)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge variant={
                          performanceHealth.trends.errorRateTrend === 'improving' ? 'default' :
                          performanceHealth.trends.errorRateTrend === 'degrading' ? 'destructive' : 'secondary'
                        }>
                          {performanceHealth.trends.errorRateTrend}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDashboard;