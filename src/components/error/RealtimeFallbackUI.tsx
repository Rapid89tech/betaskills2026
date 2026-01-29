import React, { useState, useEffect, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Activity,
  Users,
  Bell
} from 'lucide-react';

interface RealtimeFallbackUIProps {
  children: ReactNode;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting' | 'error';
  lastConnected?: Date;
  onReconnect?: () => void;
  showConnectionStatus?: boolean;
  fallbackMessage?: string;
}

interface ConnectionStats {
  reconnectAttempts: number;
  totalDowntime: number;
  lastError?: string;
  lastSuccessfulConnection?: Date;
}

const RealtimeFallbackUI: React.FC<RealtimeFallbackUIProps> = ({
  children,
  connectionStatus,
  lastConnected,
  onReconnect,
  showConnectionStatus = true,
  fallbackMessage
}) => {
  const [connectionStats, setConnectionStats] = useState<ConnectionStats>({
    reconnectAttempts: 0,
    totalDowntime: 0,
    lastSuccessfulConnection: lastConnected
  });
  const [isManualReconnect, setIsManualReconnect] = useState(false);
  const [downtimeStart, setDowntimeStart] = useState<Date | null>(null);

  // Track connection status changes
  useEffect(() => {
    if (connectionStatus === 'disconnected' || connectionStatus === 'error') {
      if (!downtimeStart) {
        setDowntimeStart(new Date());
      }
    } else if (connectionStatus === 'connected') {
      if (downtimeStart) {
        const downtime = Date.now() - downtimeStart.getTime();
        setConnectionStats(prev => ({
          ...prev,
          totalDowntime: prev.totalDowntime + downtime,
          lastSuccessfulConnection: new Date()
        }));
        setDowntimeStart(null);
      }
    }
  }, [connectionStatus, downtimeStart]);

  // Track reconnection attempts
  useEffect(() => {
    if (connectionStatus === 'reconnecting') {
      setConnectionStats(prev => ({
        ...prev,
        reconnectAttempts: prev.reconnectAttempts + 1
      }));
    }
  }, [connectionStatus]);

  const handleManualReconnect = async () => {
    setIsManualReconnect(true);
    try {
      if (onReconnect) {
        await onReconnect();
      }
    } catch (error) {
      console.error('Manual reconnect failed:', error);
    } finally {
      setIsManualReconnect(false);
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="w-5 h-5 text-green-500" />;
      case 'disconnected':
        return <WifiOff className="w-5 h-5 text-red-500" />;
      case 'reconnecting':
        return <RefreshCw className="w-5 h-5 text-orange-500 animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <WifiOff className="w-5 h-5 text-gray-500" />;
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'disconnected':
        return 'bg-red-100 text-red-800';
      case 'reconnecting':
        return 'bg-orange-100 text-orange-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      case 'reconnecting':
        return 'Reconnecting...';
      case 'error':
        return 'Connection Error';
      default:
        return 'Unknown';
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getCurrentDowntime = () => {
    if (downtimeStart) {
      return Date.now() - downtimeStart.getTime();
    }
    return 0;
  };

  // Show fallback UI when disconnected or in error state
  if (connectionStatus === 'disconnected' || connectionStatus === 'error') {
    return (
      <div className="space-y-4">
        {/* Connection Status Banner */}
        {showConnectionStatus && (
          <Alert className="border-orange-200 bg-orange-50">
            <WifiOff className="w-4 h-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>
                {connectionStatus === 'error' 
                  ? 'Real-time connection error. Some features may not work properly.'
                  : 'You are currently offline. Some features may not be available.'
                }
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleManualReconnect}
                disabled={isManualReconnect || connectionStatus === 'reconnecting'}
                className="ml-4"
              >
                {isManualReconnect ? (
                  <>
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    Reconnecting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Retry
                  </>
                )}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Fallback Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-500" />
              Offline Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <Badge className={getConnectionStatusColor()}>
                {getConnectionIcon()}
                <span className="ml-1">{getConnectionStatusText()}</span>
              </Badge>
              
              {connectionStats.lastSuccessfulConnection && (
                <span className="text-sm text-gray-500">
                  Last connected: {connectionStats.lastSuccessfulConnection.toLocaleTimeString()}
                </span>
              )}
            </div>

            {/* Downtime Information */}
            {downtimeStart && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Downtime: {formatDuration(getCurrentDowntime())}</span>
              </div>
            )}

            {/* Connection Statistics */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-gray-500" />
                <span>Reconnect attempts: {connectionStats.reconnectAttempts}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>Total downtime: {formatDuration(connectionStats.totalDowntime)}</span>
              </div>
            </div>

            {/* Fallback Message */}
            {fallbackMessage && (
              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>{fallbackMessage}</AlertDescription>
              </Alert>
            )}

            {/* Feature Status */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">Feature Status:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  {connectionStatus === 'connected' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  )}
                  <span>Real-time updates</span>
                </div>
                <div className="flex items-center gap-2">
                  {connectionStatus === 'connected' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  )}
                  <span>Notifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Enrollment forms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Data persistence</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleManualReconnect}
                disabled={isManualReconnect || connectionStatus === 'reconnecting'}
                className="flex-1"
              >
                {isManualReconnect ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Reconnecting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reconnect
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                Refresh Page
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Show children with reduced functionality */}
        <div className="opacity-75">
          {children}
        </div>
      </div>
    );
  }

  // Show normal content when connected
  return (
    <div className="space-y-4">
      {/* Connection Status Indicator */}
      {showConnectionStatus && connectionStatus === 'connected' && (
        <div className="flex items-center justify-end">
          <Badge className={getConnectionStatusColor()}>
            {getConnectionIcon()}
            <span className="ml-1">{getConnectionStatusText()}</span>
          </Badge>
        </div>
      )}

      {/* Show children normally */}
      {children}
    </div>
  );
};

export default RealtimeFallbackUI;
