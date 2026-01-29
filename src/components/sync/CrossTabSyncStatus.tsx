import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  WifiOff, 
  Users, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity
} from 'lucide-react';
import { useCrossTabSync } from '@/hooks/useCrossTabSync';

interface CrossTabSyncStatusProps {
  showDetails?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  compact?: boolean;
}

const CrossTabSyncStatus: React.FC<CrossTabSyncStatusProps> = ({
  showDetails = false,
  position = 'top-right',
  compact = false
}) => {
  const { 
    syncState, 
    forceSync,
    pendingConflicts,
    isOnline,
    activeTabsCount,
    lastSyncTime,
    syncStatus
  } = useCrossTabSync();

  const [isExpanded, setIsExpanded] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'fixed top-4 right-4';
      case 'top-left':
        return 'fixed top-4 left-4';
      case 'bottom-right':
        return 'fixed bottom-4 right-4';
      case 'bottom-left':
        return 'fixed bottom-4 left-4';
      default:
        return 'fixed top-4 right-4';
    }
  };

  const getStatusColor = () => {
    if (!isOnline) return 'bg-red-100 text-red-800';
    if (pendingConflicts.size > 0) return 'bg-orange-100 text-orange-800';
    if (syncStatus === 'error') return 'bg-red-100 text-red-800';
    if (syncStatus === 'syncing') return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="w-4 h-4" />;
    if (pendingConflicts.size > 0) return <AlertTriangle className="w-4 h-4" />;
    if (syncStatus === 'error') return <AlertTriangle className="w-4 h-4" />;
    if (syncStatus === 'syncing') return <RefreshCw className="w-4 h-4 animate-spin" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    if (pendingConflicts.size > 0) return 'Conflicts';
    if (syncStatus === 'error') return 'Sync Error';
    if (syncStatus === 'syncing') return 'Syncing';
    return 'Synced';
  };

  const formatLastSync = () => {
    if (!lastSyncTime) return 'Never';
    const now = new Date();
    const syncTime = new Date(lastSyncTime);
    const diffMs = now.getTime() - syncTime.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffSeconds < 60) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return syncTime.toLocaleDateString();
  };

  if (compact) {
    return (
      <div className={`${getPositionClasses()} z-40`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2"
        >
          <Badge className={getStatusColor()}>
            {getStatusIcon()}
            <span className="ml-1">{activeTabsCount}</span>
          </Badge>
        </Button>
      </div>
    );
  }

  return (
    <div className={`${getPositionClasses()} z-40`}>
      <Card className="w-64 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Cross-Tab Sync</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1"
            >
              {isExpanded ? '−' : '+'}
            </Button>
          </div>

          <div className="space-y-3">
            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <Badge className={getStatusColor()}>
                {getStatusIcon()}
                <span className="ml-1">{getStatusText()}</span>
              </Badge>
            </div>

            {/* Active Tabs */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Tabs:</span>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-gray-500" />
                <span className="text-sm font-medium">{activeTabsCount}</span>
              </div>
            </div>

            {/* Connection Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Connection:</span>
              <div className="flex items-center gap-1">
                {isOnline ? (
                  <Wifi className="w-3 h-3 text-green-500" />
                ) : (
                  <WifiOff className="w-3 h-3 text-red-500" />
                )}
                <span className="text-sm font-medium">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            {/* Last Sync */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Sync:</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-sm">{formatLastSync()}</span>
              </div>
            </div>

            {/* Conflicts */}
            {pendingConflicts.size > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Conflicts:</span>
                <Badge variant="outline" className="bg-orange-100 text-orange-800">
                  {pendingConflicts.size}
                </Badge>
              </div>
            )}

            {/* Expanded Details */}
            {isExpanded && (
              <div className="pt-3 border-t space-y-2">
                <div className="text-xs text-gray-500">
                  <div>Tab ID: {syncState.tabId}</div>
                  <div>Sync Status: {syncStatus}</div>
                  {lastSyncTime && (
                    <div>Last Sync: {new Date(lastSyncTime).toLocaleString()}</div>
                  )}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={forceSync}
                  disabled={syncStatus === 'syncing'}
                  className="w-full"
                >
                  {syncStatus === 'syncing' ? (
                    <>
                      <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Force Sync
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrossTabSyncStatus;
