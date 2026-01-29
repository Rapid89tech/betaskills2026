import React, { useState } from 'react';
import { useApplicationStateContext } from './ApplicationStateProvider';

export interface StateHealthMonitorProps {
  showDetails?: boolean;
  autoHide?: boolean;
  className?: string;
}

export const StateHealthMonitor: React.FC<StateHealthMonitorProps> = ({
  showDetails = false,
  autoHide = true,
  className = ''
}) => {
  const {
    isHealthy,
    isRestoring,
    snapshotCount,
    validationFailures,
    crossTabSyncEnabled,
    lastSnapshot,
    cleanupCorruptedState,
    restoreFromStorage,
    createSnapshot,
    synchronizeAcrossTabs
  } = useApplicationStateContext();

  const [isExpanded, setIsExpanded] = useState(!autoHide || !isHealthy);
  const [isRecovering, setIsRecovering] = useState(false);

  const handleCleanupState = async () => {
    setIsRecovering(true);
    try {
      cleanupCorruptedState();
      createSnapshot(); // Create fresh snapshot after cleanup
    } catch (error) {
      console.error('Failed to cleanup state:', error);
    } finally {
      setIsRecovering(false);
    }
  };

  const handleRestoreFromStorage = async () => {
    setIsRecovering(true);
    try {
      await restoreFromStorage();
    } catch (error) {
      console.error('Failed to restore from storage:', error);
    } finally {
      setIsRecovering(false);
    }
  };

  const handleSyncTabs = () => {
    synchronizeAcrossTabs();
  };

  const handleCreateSnapshot = () => {
    createSnapshot();
  };

  // Auto-hide when healthy and autoHide is enabled
  if (autoHide && isHealthy && !isExpanded) {
    return (
      <div className={`state-health-indicator ${className}`}>
        <button
          onClick={() => setIsExpanded(true)}
          className="health-toggle-btn healthy"
          title="Application state is healthy (click to expand)"
        >
          ✓
        </button>
      </div>
    );
  }

  const getHealthStatus = () => {
    if (isRestoring) return 'restoring';
    if (!isHealthy) return 'unhealthy';
    return 'healthy';
  };

  const getHealthColor = () => {
    switch (getHealthStatus()) {
      case 'restoring': return '#ffa500';
      case 'unhealthy': return '#ff4444';
      case 'healthy': return '#44aa44';
      default: return '#666666';
    }
  };

  const getHealthMessage = () => {
    if (isRestoring) return 'Restoring application state...';
    if (!isHealthy) return `Application state issues detected (${validationFailures} failures)`;
    return 'Application state is healthy';
  };

  return (
    <div className={`state-health-monitor ${className}`} style={{ 
      border: `2px solid ${getHealthColor()}`,
      borderRadius: '8px',
      padding: '12px',
      margin: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <div className="health-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: showDetails ? '12px' : '0'
      }}>
        <div className="health-status" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px' 
        }}>
          <div 
            className="health-indicator"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: getHealthColor()
            }}
          />
          <span style={{ fontWeight: 'bold', color: getHealthColor() }}>
            {getHealthMessage()}
          </span>
        </div>
        
        {autoHide && (
          <button
            onClick={() => setIsExpanded(false)}
            className="health-toggle-btn"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
            title="Minimize health monitor"
          >
            ✕
          </button>
        )}
      </div>

      {showDetails && (
        <div className="health-details" style={{ 
          fontSize: '14px', 
          color: '#666',
          marginBottom: '12px'
        }}>
          <div>Snapshots: {snapshotCount}</div>
          <div>Validation Failures: {validationFailures}</div>
          <div>Cross-tab Sync: {crossTabSyncEnabled ? 'Enabled' : 'Disabled'}</div>
          {lastSnapshot && (
            <div>Last Snapshot: {new Date(lastSnapshot.timestamp).toLocaleTimeString()}</div>
          )}
        </div>
      )}

      {(!isHealthy || isRestoring) && (
        <div className="recovery-actions" style={{ 
          display: 'flex', 
          gap: '8px', 
          flexWrap: 'wrap' 
        }}>
          <button
            onClick={handleCleanupState}
            disabled={isRecovering}
            style={{
              padding: '6px 12px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isRecovering ? 'not-allowed' : 'pointer',
              opacity: isRecovering ? 0.6 : 1
            }}
            title="Clean up corrupted state data"
          >
            {isRecovering ? 'Cleaning...' : 'Cleanup State'}
          </button>

          <button
            onClick={handleRestoreFromStorage}
            disabled={isRecovering}
            style={{
              padding: '6px 12px',
              backgroundColor: '#4dabf7',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isRecovering ? 'not-allowed' : 'pointer',
              opacity: isRecovering ? 0.6 : 1
            }}
            title="Restore state from local storage"
          >
            {isRecovering ? 'Restoring...' : 'Restore from Storage'}
          </button>

          <button
            onClick={handleCreateSnapshot}
            disabled={isRecovering}
            style={{
              padding: '6px 12px',
              backgroundColor: '#51cf66',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isRecovering ? 'not-allowed' : 'pointer',
              opacity: isRecovering ? 0.6 : 1
            }}
            title="Create a new state snapshot"
          >
            Create Snapshot
          </button>

          {crossTabSyncEnabled && (
            <button
              onClick={handleSyncTabs}
              disabled={isRecovering}
              style={{
                padding: '6px 12px',
                backgroundColor: '#845ef7',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isRecovering ? 'not-allowed' : 'pointer',
                opacity: isRecovering ? 0.6 : 1
              }}
              title="Synchronize state across browser tabs"
            >
              Sync Tabs
            </button>
          )}
        </div>
      )}

      {isHealthy && showDetails && (
        <div className="maintenance-actions" style={{ 
          display: 'flex', 
          gap: '8px', 
          marginTop: '8px' 
        }}>
          <button
            onClick={handleCreateSnapshot}
            style={{
              padding: '4px 8px',
              backgroundColor: '#868e96',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            title="Create a manual state snapshot"
          >
            Manual Snapshot
          </button>

          {crossTabSyncEnabled && (
            <button
              onClick={handleSyncTabs}
              style={{
                padding: '4px 8px',
                backgroundColor: '#868e96',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
              title="Force synchronization across tabs"
            >
              Force Sync
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StateHealthMonitor;