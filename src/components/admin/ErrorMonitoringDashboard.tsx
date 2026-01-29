/**
 * ErrorMonitoringDashboard
 * 
 * Comprehensive error monitoring dashboard for the error boundary system
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  RefreshCw, 
  AlertTriangle, 
  Bug, 
  Wifi, 
  WifiOff, 
  Database, 
  Shield,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { errorLoggingService, type ErrorLogEntry, type ErrorMetrics } from '@/services/errorLoggingService';
import { errorRecoveryService, type ServiceHealth } from '@/services/errorRecoveryService';
import { networkErrorService, type NetworkStatus } from '@/services/networkErrorService';
import { ErrorType, ErrorSeverity } from '@/components/error/ErrorBoundarySystem';
import { ErrorCategory } from '@/services/errorRecoveryService';
import { NetworkQuality } from '@/services/networkErrorService';

interface ErrorDashboardState {
  errorLogs: ErrorLogEntry[];
  errorMetrics: ErrorMetrics;
  serviceHealth: ServiceHealth[];
  networkStatus: {
    isOnline: boolean;
    status: NetworkStatus;
    quality: NetworkQuality;
    queueSize: number;
  };
  isLoading: boolean;
  lastUpdate: number;
}

export function ErrorMonitoringDashboard() {
  const [state, setState] = useState<ErrorDashboardState>({
    errorLogs: [],
    errorMetrics: errorLoggingService.getMetrics(),
    serviceHealth: [],
    networkStatus: {
      isOnline: true,
      status: 'online' as NetworkStatus,
      quality: 'good' as NetworkQuality,
      queueSize: 0
    },
    isLoading: false,
    lastUpdate: Date.now()
  });

  const [selectedTab, setSelectedTab] = useState('overview');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Update dashboard data
  const updateDashboard = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const errorLogs = errorLoggingService.getErrorLogs();
      const errorMetrics = errorLoggingService.getMetrics();
      const serviceHealth = errorRecoveryService.getAllServiceHealth();
      const networkStatus = networkErrorService.getNetworkStatus();
      
      setState(prev => ({
        ...prev,
        errorLogs,
        errorMetrics,
        serviceHealth,
        networkStatus,
        isLoading: false,
        lastUpdate: Date.now()
      }));
    } catch (error) {
      console.error('Failed to update dashboard:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Auto-refresh
  useEffect(() => {
    updateDashboard();
    
    const interval = setInterval(updateDashboard, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Filter error logs
  const filteredLogs = state.errorLogs.filter(log => {
    if (filterSeverity !== 'all' && log.severity !== filterSeverity) return false;
    if (filterCategory !== 'all' && log.category !== filterCategory) return false;
    return true;
  });

  // Get error icon
  const getErrorIcon = (log: ErrorLogEntry) => {
    if (log.errorType === ErrorType.NETWORK_ERROR) return <WifiOff className="h-4 w-4 text-orange-500" />;
    if (log.errorType === ErrorType.DATABASE_ERROR) return <Database className="h-4 w-4 text-red-500" />;
    if (log.errorType === ErrorType.AUTH_ERROR) return <Shield className="h-4 w-4 text-purple-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  // Get service health status
  const getServiceHealthStatus = (health: ServiceHealth) => {
    if (health.circuitBreakerState === 'open') return { status: 'Unhealthy', color: 'destructive' };
    if (health.circuitBreakerState === 'half_open') return { status: 'Degraded', color: 'default' };
    return { status: 'Healthy', color: 'default' };
  };

  // Format time
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  // Format duration
  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Error Monitoring Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time error monitoring and system health status
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => errorLoggingService.clearErrorLogs()}
            className="flex items-center gap-2"
          >
            <XCircle className="h-4 w-4" />
            Clear Logs
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={updateDashboard}
            disabled={state.isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${state.isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Errors</p>
                <p className="text-2xl font-bold">{state.errorMetrics.totalErrors}</p>
              </div>
              <Bug className="h-8 w-8 text-red-500" />
            </div>
            <Badge variant="outline" className="mt-2">
              {state.errorMetrics.errorRate.toFixed(1)}% rate
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Network Status</p>
                <p className="text-2xl font-bold">
                  {state.networkStatus.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
              {state.networkStatus.isOnline ? (
                <Wifi className="h-8 w-8 text-green-500" />
              ) : (
                <WifiOff className="h-8 w-8 text-red-500" />
              )}
            </div>
            <Badge variant="outline" className="mt-2">
              {state.networkStatus.quality} quality
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Healthy Services</p>
                <p className="text-2xl font-bold">
                  {state.serviceHealth.filter(h => h.isHealthy).length}/{state.serviceHealth.length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <Badge variant="outline" className="mt-2">
              {state.serviceHealth.length} total
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Queue Size</p>
                <p className="text-2xl font-bold">{state.networkStatus.queueSize}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <Badge variant="outline" className="mt-2">
              Pending requests
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Monitoring */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
          <TabsTrigger value="services">Service Health</TabsTrigger>
          <TabsTrigger value="network">Network Status</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Error Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Error Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(state.errorMetrics.errorsByCategory).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{category}</span>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(count / state.errorMetrics.totalErrors) * 100} 
                        className="w-20"
                      />
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Error Severity */}
            <Card>
              <CardHeader>
                <CardTitle>Error Severity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(state.errorMetrics.errorsBySeverity).map(([severity, count]) => (
                  <div key={severity} className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{severity}</span>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(count / state.errorMetrics.totalErrors) * 100} 
                        className="w-20"
                      />
                      <Badge variant={getSeverityColor(severity)}>{count}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          {/* Error Filters */}
          <div className="flex gap-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="enrollment">Enrollment</option>
              <option value="payment">Payment</option>
              <option value="authentication">Authentication</option>
              <option value="network">Network</option>
              <option value="validation">Validation</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Error Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Errors ({filteredLogs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredLogs.slice(0, 50).map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getErrorIcon(log)}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getSeverityColor(log.severity)}>
                          {log.severity}
                        </Badge>
                        <Badge variant="outline">{log.category}</Badge>
                        {log.errorType && (
                          <Badge variant="secondary">{log.errorType}</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatTime(log.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm font-medium mb-1">{log.message}</p>
                      
                      {log.componentName && (
                        <p className="text-xs text-muted-foreground">
                          Component: {log.componentName}
                        </p>
                      )}
                      
                      {log.retryCount && log.retryCount > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Retries: {log.retryCount}
                        </p>
                      )}
                      
                      {log.recoveryTime && (
                        <p className="text-xs text-muted-foreground">
                          Recovery: {formatDuration(log.recoveryTime)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {filteredLogs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No errors found matching the current filters
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.serviceHealth.map((health) => {
                  const status = getServiceHealthStatus(health);
                  return (
                    <div key={health.serviceName} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          health.isHealthy ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium">{health.serviceName}</p>
                          <p className="text-sm text-muted-foreground">
                            Circuit: {health.circuitBreakerState} | 
                            Errors: {health.errorCount} | 
                            Success: {health.successCount}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={status.color}>{status.status}</Badge>
                        {health.averageResponseTime > 0 && (
                          <Badge variant="outline">
                            {formatDuration(health.averageResponseTime)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {state.serviceHealth.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No service health data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {state.networkStatus.isOnline ? (
                      <Wifi className="h-5 w-5 text-green-500" />
                    ) : (
                      <WifiOff className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-medium">Connection Status</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {state.networkStatus.isOnline ? 'Connected' : 'Disconnected'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <span className="font-medium">Network Quality</span>
                  <Badge variant="outline">{state.networkStatus.quality}</Badge>
                </div>
                
                <div className="space-y-2">
                  <span className="font-medium">Queue Size</span>
                  <Badge variant="outline">{state.networkStatus.queueSize} requests</Badge>
                </div>
                
                <div className="space-y-2">
                  <span className="font-medium">Last Update</span>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(new Date(state.lastUpdate).toISOString())}
                  </p>
                </div>
              </div>
              
              {state.networkStatus.queueSize > 0 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {state.networkStatus.queueSize} requests are queued and will be processed when the connection is restored.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}