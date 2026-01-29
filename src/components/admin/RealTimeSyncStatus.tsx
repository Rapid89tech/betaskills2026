/**
 * Real-Time Sync Status Component
 * 
 * Displays the status of cross-session enrollment synchronization,
 * including connection health, active sessions, and sync statistics.
 * 
 * Requirements: 1.1, 1.2, 2.1, 2.2, 7.3
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  WifiOff, 
  Users, 
  Clock, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Zap,
  Globe
} from 'lucide-react';
import { useSyncHealthMonitoring } from '@/hooks/useCrossSessionSync';
import { formatDistanceToNow } from 'date-fns';

export const RealTimeSyncStatus: React.FC = () => {
  const { 
    isConnected, 
    isHealthy, 
    stats, 
    errors, 
    reconnect, 
    hasErrors 
  } = useSyncHealthMonitoring();
  
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    if (!isConnected) return 'text-red-500';
    if (!isHealthy || hasErrors) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatusIcon = () => {
    if (!isConnected) return <WifiOff className="h-4 w-4" />;
    if (!isHealthy || hasErrors) return <AlertTriangle className="h-4 w-4" />;
    return <Wifi className="h-4 w-4" />;
  };

  const getStatusText = () => {
    if (!isConnected) return 'Disconnected';
    if (!isHealthy) return 'Unhealthy';
    if (hasErrors) return 'Warning';
    return 'Connected';
  };

  const formatUptime = (uptime: number) => {
    const seconds = Math.floor(uptime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Real-Time Sync Status
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant={isConnected && isHealthy ? "default" : "destructive"}
              className={`${getStatusColor()} flex items-center gap-1`}
            >
              {getStatusIcon()}
              {getStatusText()}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 p-0"
            >
              <Activity className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
              <Users className="h-3 w-3" />
              Sessions
            </div>
            <div className="text-lg font-semibold">
              {stats?.activeSessions || 0}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
              <Zap className="h-3 w-3" />
              Updates
            </div>
            <div className="text-lg font-semibold">
              {stats?.totalUpdates || 0}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
              <Clock className="h-3 w-3" />
              Latency
            </div>
            <div className="text-lg font-semibold">
              {stats?.syncLatency ? `${stats.syncLatency}ms` : '-'}
            </div>
          </div>
        </div>

        {/* Last Update */}
        {stats?.lastUpdate && (
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <span>Last update:</span>
            <span>{formatDistanceToNow(stats.lastUpdate, { addSuffix: true })}</span>
          </div>
        )}

        {/* Errors */}
        {hasErrors && (
          <div className="mb-3">
            <div className="flex items-center gap-1 text-xs text-yellow-600 mb-1">
              <AlertTriangle className="h-3 w-3" />
              Recent Issues ({errors.length})
            </div>
            <div className="text-xs text-muted-foreground">
              {errors[errors.length - 1]}
            </div>
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && stats && (
          <div className="border-t pt-3 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-muted-foreground mb-1">Uptime</div>
                <div className="font-medium">{formatUptime(stats.uptime)}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Errors</div>
                <div className="font-medium">{stats.errors}</div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={reconnect}
                disabled={isConnected && isHealthy}
                className="flex-1"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Reconnect
              </Button>
            </div>
          </div>
        )}

        {/* Connection Indicator */}
        <div className="flex items-center justify-center mt-3">
          <div className={`flex items-center gap-2 text-xs ${getStatusColor()}`}>
            {isConnected && isHealthy ? (
              <>
                <CheckCircle className="h-3 w-3" />
                Real-time sync active
              </>
            ) : (
              <>
                {getStatusIcon()}
                {!isConnected ? 'Sync disconnected' : 'Sync issues detected'}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};