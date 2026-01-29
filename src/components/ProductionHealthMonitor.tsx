/**
 * Production Health Monitor Component
 * 
 * Displays real-time configuration health status and alerts for production issues
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Shield, 
  Database, 
  Webhook,
  Settings
} from 'lucide-react';
import { 
  productionValidator, 
  getConfigurationHealth,
  validateProductionReadiness 
} from '../services/ProductionValidator';
import type { ConfigurationHealth, ProductionReadiness } from '../services/ProductionValidator';

interface ProductionHealthMonitorProps {
  autoRefresh?: boolean;
  refreshInterval?: number; // in seconds
  showDetails?: boolean;
}

export const ProductionHealthMonitor: React.FC<ProductionHealthMonitorProps> = ({
  autoRefresh = true,
  refreshInterval = 30,
  showDetails = true
}) => {
  const [health, setHealth] = useState<ConfigurationHealth | null>(null);
  const [readiness, setReadiness] = useState<ProductionReadiness | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refreshHealth = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [healthData, readinessData] = await Promise.all([
        Promise.resolve(getConfigurationHealth()),
        Promise.resolve(validateProductionReadiness())
      ]);
      
      setHealth(healthData);
      setReadiness(readinessData);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Health monitoring error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshHealth();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(refreshHealth, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const getHealthIcon = (healthy: boolean) => {
    return healthy ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getHealthBadge = (healthy: boolean, label: string) => {
    return (
      <Badge variant={healthy ? "default" : "destructive"} className="flex items-center gap-1">
        {getHealthIcon(healthy)}
        {label}
      </Badge>
    );
  };

  const getComponentIcon = (component: string) => {
    switch (component) {
      case 'ikhokha':
        return <Settings className="h-4 w-4" />;
      case 'database':
        return <Database className="h-4 w-4" />;
      case 'webhook':
        return <Webhook className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  if (loading && !health) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            Loading Configuration Health...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <XCircle className="h-5 w-5" />
            Health Monitor Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={refreshHealth} className="mt-4" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!health || !readiness) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Overall Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getHealthIcon(health.overallHealth.healthy)}
              Production Configuration Health
            </div>
            <div className="flex items-center gap-2">
              {lastUpdate && (
                <span className="text-sm text-gray-500">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
              <Button 
                onClick={refreshHealth} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Configuration</span>
              {getHealthBadge(readiness.configurationValid, readiness.configurationValid ? 'Valid' : 'Invalid')}
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Security</span>
              {getHealthBadge(readiness.securityValid, readiness.securityValid ? 'Secure' : 'Issues')}
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Performance</span>
              {getHealthBadge(readiness.performanceValid, readiness.performanceValid ? 'Optimal' : 'Issues')}
            </div>
          </div>

          {/* Production Readiness Status */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              {readiness.ready ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-semibold">
                Production Status: {readiness.ready ? 'Ready' : 'Not Ready'}
              </span>
            </div>
            
            {!readiness.ready && readiness.issues.length > 0 && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-medium mb-2">Critical Issues Found:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {readiness.issues.slice(0, 5).map((issue, index) => (
                      <li key={index} className="text-sm">{issue}</li>
                    ))}
                    {readiness.issues.length > 5 && (
                      <li className="text-sm font-medium">
                        ... and {readiness.issues.length - 5} more issues
                      </li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Component Health Details */}
          {showDetails && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Component Health</h4>
              
              {/* iKhokha Configuration */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  {getComponentIcon('ikhokha')}
                  <span>iKhokha Configuration</span>
                </div>
                <div className="flex items-center gap-2">
                  {getHealthIcon(health.ikhokhaConfig.healthy)}
                  <span className="text-sm text-gray-500">
                    {health.ikhokhaConfig.metrics.errorsCount} errors
                  </span>
                </div>
              </div>

              {/* Database Configuration */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  {getComponentIcon('database')}
                  <span>Database Configuration</span>
                </div>
                <div className="flex items-center gap-2">
                  {getHealthIcon(health.databaseConfig.healthy)}
                  <span className="text-sm text-gray-500">
                    {health.databaseConfig.metrics.errorsCount} errors
                  </span>
                </div>
              </div>

              {/* Webhook Configuration */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  {getComponentIcon('webhook')}
                  <span>Webhook Configuration</span>
                </div>
                <div className="flex items-center gap-2">
                  {getHealthIcon(health.webhookConfig.healthy)}
                  <span className="text-sm text-gray-500">
                    {health.webhookConfig.metrics.errorsCount} errors
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations */}
          {readiness.recommendations.length > 0 && (
            <div className="mt-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-medium mb-2">Recommendations:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {readiness.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} className="text-sm">{rec}</li>
                    ))}
                    {readiness.recommendations.length > 3 && (
                      <li className="text-sm font-medium">
                        ... and {readiness.recommendations.length - 3} more recommendations
                      </li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Health Metrics */}
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {health.overallHealth.metrics.totalErrors}
                </div>
                <div className="text-sm text-gray-500">Total Errors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {health.overallHealth.metrics.componentsHealthy}
                </div>
                <div className="text-sm text-gray-500">Healthy Components</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {health.overallHealth.metrics.totalComponents}
                </div>
                <div className="text-sm text-gray-500">Total Components</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((health.overallHealth.metrics.componentsHealthy / health.overallHealth.metrics.totalComponents) * 100)}%
                </div>
                <div className="text-sm text-gray-500">Health Score</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Issues (if any) */}
      {showDetails && health.overallHealth.issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Configuration Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {health.overallHealth.issues.map((issue, index) => (
                <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-800">{issue}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductionHealthMonitor;