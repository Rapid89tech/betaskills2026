import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  XCircle,
  Monitor,
  Smartphone,
  Globe,
  Database
} from 'lucide-react';
import { useCrossSessionEnrollmentSync, useEnrollmentStatusSync } from '@/hooks/useCrossSessionEnrollmentSync';
import { enrollmentSyncIntegration } from '@/services/EnrollmentSyncIntegration';
import { useAuth } from '@/hooks/AuthContext';

interface CrossSessionEnrollmentDemoProps {
  courseId: string;
  courseName: string;
}

/**
 * Cross-Session Enrollment Synchronization Demo Component
 * Demonstrates real-time enrollment status synchronization across multiple browser tabs and devices
 */
export const CrossSessionEnrollmentDemo: React.FC<CrossSessionEnrollmentDemoProps> = ({
  courseId,
  courseName
}) => {
  const { user } = useAuth();
  const {
    enrollmentStatus,
    syncState,
    syncEnrollmentStatus,
    forceSyncWithServer,
    isOnline,
    isSyncing
  } = useCrossSessionEnrollmentSync(courseId);

  const enrollmentStatusSync = useEnrollmentStatusSync(courseId);
  
  const [syncHealth, setSyncHealth] = useState(enrollmentSyncIntegration.getSyncHealth());
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [simulationMode, setSimulationMode] = useState(false);

  // Update sync health periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncHealth(enrollmentSyncIntegration.getSyncHealth());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Listen for enrollment updates
  useEffect(() => {
    const unsubscribe = enrollmentSyncIntegration.subscribeToEnrollmentUpdates((data) => {
      if (data.courseId === courseId) {
        setLastUpdate(`${new Date().toLocaleTimeString()} - ${data.source}: ${data.status}`);
      }
    });

    return unsubscribe;
  }, [courseId]);

  const handleSimulatePaymentSuccess = async () => {
    if (!user) return;
    
    setSimulationMode(true);
    try {
      await syncEnrollmentStatus(courseId, 'approved', 'completed', 'payment');
      setLastUpdate(`${new Date().toLocaleTimeString()} - Simulated payment success`);
    } catch (error) {
      console.error('Error simulating payment:', error);
    } finally {
      setSimulationMode(false);
    }
  };

  const handleSimulateAdminApproval = async () => {
    if (!user) return;
    
    setSimulationMode(true);
    try {
      await syncEnrollmentStatus(courseId, 'approved', 'completed', 'admin');
      setLastUpdate(`${new Date().toLocaleTimeString()} - Simulated admin approval`);
    } catch (error) {
      console.error('Error simulating admin approval:', error);
    } finally {
      setSimulationMode(false);
    }
  };

  const handleSimulateWebhook = async () => {
    if (!user) return;
    
    setSimulationMode(true);
    try {
      await syncEnrollmentStatus(courseId, 'approved', 'completed', 'webhook');
      setLastUpdate(`${new Date().toLocaleTimeString()} - Simulated webhook update`);
    } catch (error) {
      console.error('Error simulating webhook:', error);
    } finally {
      setSimulationMode(false);
    }
  };

  const handleForceSync = async () => {
    try {
      await forceSyncWithServer();
      setLastUpdate(`${new Date().toLocaleTimeString()} - Forced sync completed`);
    } catch (error) {
      console.error('Error forcing sync:', error);
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  if (!user) {
    return (
      <Alert>
        <AlertDescription>
          Please log in to see cross-session enrollment synchronization demo.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Cross-Session Enrollment Sync Demo
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Course: {courseName} | User: {user.email}
          </p>
        </CardHeader>
      </Card>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
            Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
            {isSyncing && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Syncing
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleForceSync}
              disabled={!isOnline || isSyncing}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Force Sync
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Enrollment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Enrollment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(enrollmentStatus.status)}
                <span className="font-medium">Status:</span>
                <Badge variant={enrollmentStatus.status === 'approved' ? 'default' : 'secondary'}>
                  {enrollmentStatus.status || 'Not Enrolled'}
                </Badge>
              </div>
              
              {enrollmentStatus.paymentStatus && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Payment:</span>
                  <Badge variant="outline">
                    {enrollmentStatus.paymentStatus}
                  </Badge>
                </div>
              )}
              
              {enrollmentStatus.lastUpdated && (
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date(enrollmentStatus.lastUpdated).toLocaleString()}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Enrolled:</span>
                <Badge variant={enrollmentStatusSync.isEnrolled ? 'default' : 'secondary'}>
                  {enrollmentStatusSync.isEnrolled ? 'Yes' : 'No'}
                </Badge>
              </div>
              
              {lastUpdate && (
                <div className="text-sm text-muted-foreground">
                  Last sync: {lastUpdate}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Sync Health Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getHealthColor(syncHealth.overall)}`} />
              <span className="font-medium">Overall Health:</span>
              <Badge variant={syncHealth.overall === 'healthy' ? 'default' : 'destructive'}>
                {syncHealth.overall}
              </Badge>
            </div>

            <Separator />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="font-medium text-sm">Cross-Session</div>
                <Badge variant={syncHealth.services.crossSession === 'active' ? 'default' : 'secondary'}>
                  {syncHealth.services.crossSession}
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="font-medium text-sm">Session Manager</div>
                <Badge variant={syncHealth.services.sessionManager === 'active' ? 'default' : 'secondary'}>
                  {syncHealth.services.sessionManager}
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="font-medium text-sm">Offline Sync</div>
                <Badge variant={syncHealth.services.offlineSync === 'active' ? 'default' : 'secondary'}>
                  {syncHealth.services.offlineSync}
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="font-medium text-sm">Real-Time</div>
                <Badge variant={syncHealth.services.realTime === 'active' ? 'default' : 'secondary'}>
                  {syncHealth.services.realTime}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Queued Actions:</span> {syncHealth.details.queuedActions}
              </div>
              <div>
                <span className="font-medium">Last Sync:</span>{' '}
                {syncHealth.details.lastSync 
                  ? new Date(syncHealth.details.lastSync).toLocaleTimeString()
                  : 'Never'
                }
              </div>
              <div>
                <span className="font-medium">Online:</span>{' '}
                {syncHealth.details.isOnline ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Simulation Controls
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Test cross-session synchronization by simulating different enrollment events
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleSimulatePaymentSuccess}
              disabled={simulationMode}
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Simulate Payment Success
            </Button>
            
            <Button
              onClick={handleSimulateAdminApproval}
              disabled={simulationMode}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Simulate Admin Approval
            </Button>
            
            <Button
              onClick={handleSimulateWebhook}
              disabled={simulationMode}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Simulate Webhook Update
            </Button>
          </div>
          
          {simulationMode && (
            <Alert className="mt-4">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <AlertDescription>
                Simulating enrollment update... Check other browser tabs to see real-time synchronization.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Test Cross-Session Sync</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>1. Multi-Tab Testing:</strong> Open this page in multiple browser tabs and simulate enrollment changes to see real-time updates.</p>
            <p><strong>2. Offline Testing:</strong> Disconnect your internet, simulate changes, then reconnect to see offline sync in action.</p>
            <p><strong>3. Cross-Device Testing:</strong> Open this page on different devices with the same user account to test cross-device synchronization.</p>
            <p><strong>4. Real-Time Updates:</strong> Changes made through payment processing or admin approval will appear instantly across all sessions.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrossSessionEnrollmentDemo;