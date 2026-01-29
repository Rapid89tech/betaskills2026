/**
 * ConnectionStatusIndicator Component
 * 
 * Displays real-time connection status in the header and handles reconnection.
 * Listens to DataSyncService events and triggers data refresh on reconnection.
 * 
 * Requirements: 7.4, 7.5
 */

import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { dataSyncService, SyncState } from '@/services/DataSyncService';
import { useAuth } from '@/hooks/AuthContext';
import { logger } from '@/utils/logger';

interface ConnectionStatusIndicatorProps {
  className?: string;
}

export const ConnectionStatusIndicator: React.FC<ConnectionStatusIndicatorProps> = ({ 
  className = '' 
}) => {
  const [syncState, setSyncState] = useState<SyncState>(dataSyncService.getState());
  const { user } = useAuth();

  useEffect(() => {
    // Subscribe to sync state changes
    const unsubscribe = dataSyncService.onStateChange((state) => {
      setSyncState(state);
    });

    // Listen for reconnection events to trigger data refresh
    const handleReconnected = async () => {
      logger.info('🔄 Connection restored, refreshing data');
      
      // Trigger data refresh for authenticated users
      if (user?.id) {
        try {
          await dataSyncService.syncUserData(user.id);
          logger.info('✅ Data refreshed after reconnection');
        } catch (error) {
          logger.error('❌ Failed to refresh data after reconnection', error);
        }
      }
    };

    window.addEventListener('data-sync-reconnected', handleReconnected);

    return () => {
      unsubscribe();
      window.removeEventListener('data-sync-reconnected', handleReconnected);
    };
  }, [user?.id]);

  // Don't show indicator if connected and not syncing
  if (syncState.connectionStatus === 'connected' && !syncState.isSyncing) {
    return null;
  }

  const getStatusDisplay = () => {
    switch (syncState.connectionStatus) {
      case 'disconnected':
        return {
          icon: <WifiOff className="h-4 w-4" />,
          text: 'Offline',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'reconnecting':
        return {
          icon: <RefreshCw className="h-4 w-4 animate-spin" />,
          text: 'Reconnecting...',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'connected':
        if (syncState.isSyncing) {
          return {
            icon: <RefreshCw className="h-4 w-4 animate-spin" />,
            text: 'Syncing...',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
          };
        }
        return {
          icon: <Wifi className="h-4 w-4" />,
          text: 'Connected',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
    }
  };

  const status = getStatusDisplay();
  const hasPendingOps = syncState.pendingOperations.length > 0;

  return (
    <div 
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.bgColor} ${status.borderColor} ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`Connection status: ${status.text}`}
    >
      <span className={status.color}>
        {status.icon}
      </span>
      <span className={`text-sm font-medium ${status.color} hidden sm:inline`}>
        {status.text}
      </span>
      {hasPendingOps && (
        <span 
          className="text-xs bg-white px-2 py-0.5 rounded-full border border-gray-200"
          title={`${syncState.pendingOperations.length} pending operations`}
        >
          {syncState.pendingOperations.length}
        </span>
      )}
    </div>
  );
};

export default ConnectionStatusIndicator;
