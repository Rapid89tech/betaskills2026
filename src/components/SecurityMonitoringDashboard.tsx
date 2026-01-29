import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, Key, Lock, Eye, RefreshCw } from 'lucide-react';
import { productionSecurityService, SecurityEvent } from '@/services/ProductionSecurityService';
import { supabase } from '@/integrations/supabase/client';

interface SecurityMetrics {
  totalEvents: number;
  criticalEvents: number;
  highSeverityEvents: number;
  apiKeyRotations: number;
  webhookValidationFailures: number;
  threatsDetected: number;
  lastRotation?: Date;
  nextRotation?: Date;
}

interface PCIComplianceStatus {
  compliant: boolean;
  violations: string[];
  lastCheck: Date;
}

export const SecurityMonitoringDashboard: React.FC = () => {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalEvents: 0,
    criticalEvents: 0,
    highSeverityEvents: 0,
    apiKeyRotations: 0,
    webhookValidationFailures: 0,
    threatsDetected: 0
  });
  const [pciStatus, setPciStatus] = useState<PCIComplianceStatus>({
    compliant: false,
    violations: [],
    lastCheck: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRotatingKeys, setIsRotatingKeys] = useState(false);

  useEffect(() => {
    loadSecurityData();
    setupRealTimeSubscription();
  }, []);

  const loadSecurityData = async () => {
    try {
      setIsLoading(true);
      
      // Load recent security events
      const { data: events, error } = await supabase
        .from('security_events')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error) throw error;

      const securityEvents = events?.map(event => ({
        ...event,
        timestamp: new Date(event.timestamp)
      })) || [];

      setSecurityEvents(securityEvents);

      // Calculate metrics
      const now = new Date();
      const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const recentEvents = securityEvents.filter(event => event.timestamp >= last24Hours);

      const newMetrics: SecurityMetrics = {
        totalEvents: recentEvents.length,
        criticalEvents: recentEvents.filter(e => e.severity === 'critical').length,
        highSeverityEvents: recentEvents.filter(e => e.severity === 'high').length,
        apiKeyRotations: recentEvents.filter(e => e.type === 'api_key_rotation').length,
        webhookValidationFailures: recentEvents.filter(e => e.type === 'webhook_validation_failure').length,
        threatsDetected: recentEvents.filter(e => e.type === 'threat_detected').length
      };

      setMetrics(newMetrics);

      // Check PCI compliance
      const complianceResult = await productionSecurityService.validatePCICompliance();
      setPciStatus({
        compliant: complianceResult.compliant,
        violations: complianceResult.violations,
        lastCheck: new Date()
      });

    } catch (error) {
      console.error('Failed to load security data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealTimeSubscription = () => {
    const subscription = supabase
      .channel('security_events')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'security_events' },
        (payload) => {
          const newEvent = {
            ...payload.new,
            timestamp: new Date(payload.new.timestamp)
          } as SecurityEvent;
          
          setSecurityEvents(prev => [newEvent, ...prev.slice(0, 49)]);
          
          // Update metrics
          setMetrics(prev => ({
            ...prev,
            totalEvents: prev.totalEvents + 1,
            criticalEvents: prev.criticalEvents + (newEvent.severity === 'critical' ? 1 : 0),
            highSeverityEvents: prev.highSeverityEvents + (newEvent.severity === 'high' ? 1 : 0),
            apiKeyRotations: prev.apiKeyRotations + (newEvent.type === 'api_key_rotation' ? 1 : 0),
            webhookValidationFailures: prev.webhookValidationFailures + (newEvent.type === 'webhook_validation_failure' ? 1 : 0),
            threatsDetected: prev.threatsDetected + (newEvent.type === 'threat_detected' ? 1 : 0)
          }));
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const handleApiKeyRotation = async () => {
    try {
      setIsRotatingKeys(true);
      const result = await productionSecurityService.rotateApiKeys();
      
      setMetrics(prev => ({
        ...prev,
        apiKeyRotations: prev.apiKeyRotations + 1,
        lastRotation: result.rotation_timestamp,
        nextRotation: result.next_rotation_due
      }));

      // Show success message
      alert('API keys rotated successfully');
    } catch (error) {
      console.error('API key rotation failed:', error);
      alert('API key rotation failed. Check logs for details.');
    } finally {
      setIsRotatingKeys(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'api_key_rotation': return <Key className="h-4 w-4" />;
      case 'webhook_validation_failure': return <AlertTriangle className="h-4 w-4" />;
      case 'threat_detected': return <Shield className="h-4 w-4" />;
      case 'unauthorized_access': return <Lock className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading security dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Security Monitoring Dashboard</h2>
        <Button 
          onClick={loadSecurityData}
          variant="outline"
          size="sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Security Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events (24h)</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.criticalEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
            <Shield className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.threatsDetected}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Key Rotations</CardTitle>
            <Key className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.apiKeyRotations}</div>
          </CardContent>
        </Card>
      </div>

      {/* PCI Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            PCI DSS Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Badge variant={pciStatus.compliant ? "default" : "destructive"}>
              {pciStatus.compliant ? "COMPLIANT" : "NON-COMPLIANT"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Last checked: {pciStatus.lastCheck.toLocaleString()}
            </span>
          </div>
          
          {pciStatus.violations.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-2">Compliance Violations:</div>
                <ul className="list-disc list-inside space-y-1">
                  {pciStatus.violations.map((violation, index) => (
                    <li key={index} className="text-sm">{violation}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* API Key Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Key Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Rotate API keys to maintain security
              </p>
              {metrics.lastRotation && (
                <p className="text-xs text-muted-foreground mt-1">
                  Last rotation: {metrics.lastRotation.toLocaleString()}
                </p>
              )}
              {metrics.nextRotation && (
                <p className="text-xs text-muted-foreground">
                  Next rotation due: {metrics.nextRotation.toLocaleString()}
                </p>
              )}
            </div>
            <Button 
              onClick={handleApiKeyRotation}
              disabled={isRotatingKeys}
              variant="outline"
            >
              {isRotatingKeys ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Rotating...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4 mr-2" />
                  Rotate Keys
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No security events recorded
              </p>
            ) : (
              securityEvents.slice(0, 10).map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getSeverityColor(event.severity)}>
                        {event.severity.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium">
                        {event.type.replace(/_/g, ' ').toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {event.timestamp.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {event.description}
                    </p>
                    {event.source_ip && (
                      <p className="text-xs text-muted-foreground">
                        Source IP: {event.source_ip}
                      </p>
                    )}
                    {event.metadata && Object.keys(event.metadata).length > 0 && (
                      <details className="mt-2">
                        <summary className="text-xs cursor-pointer text-blue-600">
                          View Details
                        </summary>
                        <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-auto">
                          {JSON.stringify(event.metadata, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityMonitoringDashboard;