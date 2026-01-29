import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CardPaymentMetrics, 
  SystemAlert, 
  AlertSeverity,
  cardPaymentMonitoring 
} from '@/services/CardPaymentMonitoringService';
import { supabase } from '@/integrations/supabase/client';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Activity,
  BarChart3,
  Zap
} from 'lucide-react';

interface MonitoringDashboardProps {
  className?: string;
}

interface PerformanceStats {
  averageWebhookTime: number;
  averageDetectionTime: number;
  averageApprovalTime: number;
  averageUIUpdateTime: number;
  averagePersistenceTime: number;
  averageTotalTime: number;
}

export const CardPaymentMonitoringDashboard: React.FC<MonitoringDashboardProps> = ({ 
  className = '' 
}) => {
  const [metrics, setMetrics] = useState<CardPaymentMetrics | null>(null);
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMonitoringData();
    
    // Set up real-time updates
    const interval = setInterval(loadMonitoringData, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const loadMonitoringData = async () => {
    try {
      setRefreshing(true);
      
      // Load metrics
      const metricsData = await cardPaymentMonitoring.getCardPaymentMetrics();
      setMetrics(metricsData);

      // Load performance stats
      const performanceData = await cardPaymentMonitoring.getProcessingPerformanceStats();
      setPerformanceStats(performanceData);

      // Load recent alerts
      await loadRecentAlerts();

      setError(null);
    } catch (err) {
      console.error('Failed to load monitoring data:', err);
      setError('Failed to load monitoring data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadRecentAlerts = async () => {
    try {
      const { data: alerts } = await supabase
        .from('card_payment_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (alerts) {
        const formattedAlerts: SystemAlert[] = alerts.map(alert => ({
          type: alert.alert_type as any,
          severity: alert.severity as AlertSeverity,
          message: alert.message,
          context: {
            webhookId: alert.webhook_id || '',
            enrollmentId: alert.enrollment_id || '',
            userId: alert.user_id || '',
            courseId: alert.course_id || '',
            paymentReference: '',
            processingStage: 'webhook_validation' as any,
            attemptNumber: 1,
            startTime: new Date()
          },
          timestamp: new Date(alert.created_at),
          requiresImmediate: alert.requires_immediate
        }));
        setRecentAlerts(formattedAlerts);
      }
    } catch (err) {
      console.error('Failed to load alerts:', err);
    }
  };

  const getSeverityColor = (severity: AlertSeverity): string => {
    switch (severity) {
      case AlertSeverity.CRITICAL:
        return 'destructive';
      case AlertSeverity.HIGH:
        return 'destructive';
      case AlertSeverity.MEDIUM:
        return 'default';
      case AlertSeverity.LOW:
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getSeverityIcon = (severity: AlertSeverity) => {
    switch (severity) {
      case AlertSeverity.CRITICAL:
        return <XCircle className="h-4 w-4" />;
      case AlertSeverity.HIGH:
        return <AlertTriangle className="h-4 w-4" />;
      case AlertSeverity.MEDIUM:
        return <AlertTriangle className="h-4 w-4" />;
      case AlertSeverity.LOW:
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 ${className}`}>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Card Payment Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time monitoring and analytics for card payment processing
          </p>
        </div>
        <Button 
          onClick={loadMonitoringData} 
          disabled={refreshing}
          variant="outline"
        >
          {refreshing ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
          ) : (
            <Activity className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.totalCardPayments}</div>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  {metrics.successfulApprovals > metrics.failedApprovals ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPercentage(
                      metrics.totalCardPayments > 0 
                        ? metrics.successfulApprovals / metrics.totalCardPayments 
                        : 0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {metrics.successfulApprovals} successful, {metrics.failedApprovals} failed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDuration(metrics.averageProcessingTime)}
                  </div>
                  <p className="text-xs text-muted-foreground">End-to-end processing</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Immediate Access</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.immediateAccessGranted}</div>
                  <p className="text-xs text-muted-foreground">
                    {formatPercentage(
                      metrics.totalCardPayments > 0 
                        ? metrics.immediateAccessGranted / metrics.totalCardPayments 
                        : 0
                    )} of payments
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {performanceStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Webhook Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDuration(performanceStats.averageWebhookTime)}
                  </div>
                  <p className="text-xs text-muted-foreground">Average webhook validation time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Payment Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDuration(performanceStats.averageDetectionTime)}
                  </div>
                  <p className="text-xs text-muted-foreground">Average detection time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Approval Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDuration(performanceStats.averageApprovalTime)}
                  </div>
                  <p className="text-xs text-muted-foreground">Average approval time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">UI Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDuration(performanceStats.averageUIUpdateTime)}
                  </div>
                  <p className="text-xs text-muted-foreground">Average UI update time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Persistence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDuration(performanceStats.averagePersistenceTime)}
                  </div>
                  <p className="text-xs text-muted-foreground">Average persistence time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total End-to-End</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDuration(performanceStats.averageTotalTime)}
                  </div>
                  <p className="text-xs text-muted-foreground">Complete processing time</p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>
                Latest alerts and notifications from card payment processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentAlerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <p>No recent alerts. System is running smoothly!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant={getSeverityColor(alert.severity) as any}>
                            {alert.severity}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {alert.timestamp.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{alert.message}</p>
                        {alert.requiresImmediate && (
                          <Badge variant="destructive" className="mt-2">
                            Requires Immediate Attention
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};