import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle, 
  Activity, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: string;
  category: string;
  message: string;
  metadata?: Record<string, any>;
  user_id?: string;
  session_id?: string;
}

interface PerformanceMetric {
  id: string;
  timestamp: string;
  metric_name: string;
  value: number;
  unit: string;
  category: string;
  metadata?: Record<string, any>;
}

interface ErrorReport {
  id: string;
  timestamp: string;
  error_type: string;
  error_message: string;
  severity: string;
  category: string;
  resolved: boolean;
  metadata?: Record<string, any>;
}

interface ErrorSummary {
  category: string;
  severity: string;
  error_type: string;
  error_count: number;
  unresolved_count: number;
  last_occurrence: string;
}

interface PerformanceSummary {
  category: string;
  metric_name: string;
  measurement_count: number;
  avg_value: number;
  min_value: number;
  max_value: number;
  p95_value: number;
  unit: string;
}

export function MonitoringDashboard() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [errorReports, setErrorReports] = useState<ErrorReport[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [errorSummary, setErrorSummary] = useState<ErrorSummary[]>([]);
  const [performanceSummary, setPerformanceSummary] = useState<PerformanceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const { toast } = useToast();

  const timeRanges = {
    '1h': '1 hour',
    '24h': '24 hours',
    '7d': '7 days',
    '30d': '30 days'
  };

  const getTimeRangeFilter = (range: string) => {
    const now = new Date();
    switch (range) {
      case '1h':
        return new Date(now.getTime() - 60 * 60 * 1000).toISOString();
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      default:
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const timeFilter = getTimeRangeFilter(selectedTimeRange);

      // Fetch recent logs
      const { data: logsData, error: logsError } = await supabase
        .from('application_logs')
        .select('*')
        .gte('timestamp', timeFilter)
        .order('timestamp', { ascending: false })
        .limit(100);

      if (logsError) throw logsError;
      setLogs(logsData || []);

      // Fetch error reports
      const { data: errorsData, error: errorsError } = await supabase
        .from('error_reports')
        .select('*')
        .gte('timestamp', timeFilter)
        .order('timestamp', { ascending: false })
        .limit(50);

      if (errorsError) throw errorsError;
      setErrorReports(errorsData || []);

      // Fetch performance metrics
      const { data: metricsData, error: metricsError } = await supabase
        .from('performance_metrics')
        .select('*')
        .gte('timestamp', timeFilter)
        .order('timestamp', { ascending: false })
        .limit(100);

      if (metricsError) throw metricsError;
      setPerformanceMetrics(metricsData || []);

      // Fetch error summary
      const { data: errorSummaryData, error: errorSummaryError } = await supabase
        .from('error_summary')
        .select('*');

      if (errorSummaryError) throw errorSummaryError;
      setErrorSummary(errorSummaryData || []);

      // Fetch performance summary
      const { data: perfSummaryData, error: perfSummaryError } = await supabase
        .from('performance_summary')
        .select('*');

      if (perfSummaryError) throw perfSummaryError;
      setPerformanceSummary(perfSummaryData || []);

    } catch (error) {
      console.error('Error fetching monitoring data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch monitoring data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resolveError = async (errorId: string) => {
    try {
      const { error } = await supabase
        .from('error_reports')
        .update({ 
          resolved: true, 
          resolved_at: new Date().toISOString(),
          resolved_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', errorId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Error marked as resolved"
      });

      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error resolving error report:', error);
      toast({
        title: "Error",
        description: "Failed to resolve error",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTimeRange]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600';
      case 'warn': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      case 'debug': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'ms' && value > 1000) {
      return `${(value / 1000).toFixed(2)}s`;
    }
    return `${value.toFixed(2)}${unit}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading monitoring data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">System Monitoring</h2>
        <div className="flex gap-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {Object.entries(timeRanges).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <Button onClick={fetchData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {errorReports.filter(e => !e.resolved).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceSummary
                .filter(p => p.category === 'api_response_time')
                .reduce((acc, p) => acc + p.avg_value, 0) / 
                Math.max(performanceSummary.filter(p => p.category === 'api_response_time').length, 1)
              }ms
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Metrics</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="logs">Application Logs</TabsTrigger>
          <TabsTrigger value="errors">Error Reports</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Application Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="border-l-4 border-gray-200 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getLevelColor(log.level)}>
                            {log.level.toUpperCase()}
                          </Badge>
                          <Badge variant="secondary">{log.category}</Badge>
                          <span className="text-sm text-gray-500">
                            {formatTimestamp(log.timestamp)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{log.message}</p>
                        {log.metadata && (
                          <details className="mt-2">
                            <summary className="text-xs text-gray-500 cursor-pointer">
                              View metadata
                            </summary>
                            <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                              {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {errorReports.map((error) => (
                  <Alert key={error.id} className={`border-l-4 ${getSeverityColor(error.severity)}`}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getSeverityColor(error.severity)}>
                              {error.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">{error.category}</Badge>
                            <Badge variant="outline">{error.error_type}</Badge>
                            {error.resolved ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <p className="font-medium">{error.error_message}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatTimestamp(error.timestamp)}
                          </p>
                        </div>
                        {!error.resolved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => resolveError(error.id)}
                          >
                            Mark Resolved
                          </Button>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {performanceMetrics.map((metric) => (
                  <div key={metric.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{metric.metric_name}</p>
                      <p className="text-sm text-gray-500">{metric.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatValue(metric.value, metric.unit)}</p>
                      <p className="text-xs text-gray-500">
                        {formatTimestamp(metric.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Error Summary (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {errorSummary.map((summary, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{summary.error_type}</p>
                        <p className="text-sm text-gray-500">
                          {summary.category} • {summary.severity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{summary.error_count} total</p>
                        <p className="text-sm text-red-600">
                          {summary.unresolved_count} unresolved
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Summary (Last 24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {performanceSummary.map((summary, index) => (
                    <div key={index} className="py-2 border-b">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{summary.metric_name}</p>
                        <p className="text-sm text-gray-500">{summary.measurement_count} samples</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-1 text-sm">
                        <div>
                          <span className="text-gray-500">Avg:</span> {formatValue(summary.avg_value, summary.unit)}
                        </div>
                        <div>
                          <span className="text-gray-500">P95:</span> {formatValue(summary.p95_value, summary.unit)}
                        </div>
                        <div>
                          <span className="text-gray-500">Max:</span> {formatValue(summary.max_value, summary.unit)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MonitoringDashboard;