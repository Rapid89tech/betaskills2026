/**
 * CrossTabSyncIntegration Component
 * 
 * Example integration of cross-tab synchronization in the admin dashboard.
 * This component demonstrates how to use the useCrossTabSync hook to:
 * - Synchronize enrollment updates across browser tabs
 * - Handle conflicts when multiple admins work simultaneously
 * - Provide real-time updates to the admin interface
 * 
 * Requirements: 6.3, 6.4, 3.2
 */

import React, { useEffect, useState } from 'react';
import { useCrossTabSync } from '@/hooks/useCrossTabSync';
import { CrossTabSyncIndicator } from '@/components/enrollment/CrossTabSyncIndicator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  EnrollmentStatus, 
  EnrollmentUpdateType,
  type EnrollmentUpdate 
} from '@/types/enrollment';
import { 
  RefreshCw, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Info
} from 'lucide-react';

interface CrossTabSyncIntegrationProps {
  className?: string;
}

/**
 * CrossTabSyncIntegration Component
 */
export const CrossTabSyncIntegration: React.FC<CrossTabSyncIntegrationProps> = ({
  className = ''
}) => {
  const [enrollmentUpdates, setEnrollmentUpdates] = useState<EnrollmentUpdate[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  // Initialize cross-tab sync with admin-specific settings
  const {
    isInitialized,
    localState,
    conflicts,
    lastSyncTime,
    syncNow,
    resolveConflict,
    clearConflicts,
    subscribeToUpdates,
    subscribeToConflicts,
    getDebugInfo
  } = useCrossTabSync({
    autoResolveConflicts: false, // Let admins manually resolve conflicts
    conflictResolutionStrategy: 'admin-priority' as any,
    syncOnFocus: true,
    enableLogging: true
  });

  /**
   * Handle enrollment updates from other tabs
   */
  useEffect(() => {
    if (!isInitialized) return;

    const unsubscribe = subscribeToUpdates((update: EnrollmentUpdate) => {
      console.log('📨 Cross-tab enrollment update received:', update);
      
      // Add to recent updates list
      setEnrollmentUpdates(prev => [update, ...prev.slice(0, 9)]); // Keep last 10
      setLastUpdateTime(new Date());
      
      // Handle different types of updates
      switch (update.type) {
        case EnrollmentUpdateType.ENROLLMENT_CREATED:
          // New enrollment from another tab - refresh enrollment list
          console.log('🆕 New enrollment created in another tab');
          break;
          
        case EnrollmentUpdateType.ENROLLMENT_APPROVED:
          // Enrollment approved in another tab
          console.log('✅ Enrollment approved in another tab');
          break;
          
        case EnrollmentUpdateType.ENROLLMENT_REJECTED:
          // Enrollment rejected in another tab
          console.log('❌ Enrollment rejected in another tab');
          break;
      }
    });

    return unsubscribe;
  }, [isInitialized, subscribeToUpdates]);

  /**
   * Handle conflicts from other tabs
   */
  useEffect(() => {
    if (!isInitialized) return;

    const unsubscribe = subscribeToConflicts((conflict) => {
      console.log('⚠️ Cross-tab conflict detected:', conflict);
      
      // Show notification to admin about conflict
      // In a real app, you might want to show a toast or modal
    });

    return unsubscribe;
  }, [isInitialized, subscribeToConflicts]);

  /**
   * Get status summary
   */
  const getStatusSummary = () => {
    if (!localState) return { total: 0, pending: 0, approved: 0, rejected: 0 };
    
    const enrollments = Object.values(localState.enrollments);
    return {
      total: enrollments.length,
      pending: enrollments.filter(e => e.status === EnrollmentStatus.PENDING).length,
      approved: enrollments.filter(e => e.status === EnrollmentStatus.APPROVED).length,
      rejected: enrollments.filter(e => e.status === EnrollmentStatus.REJECTED).length
    };
  };

  const statusSummary = getStatusSummary();
  const debugInfo = getDebugInfo();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Cross-Tab Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Cross-Tab Synchronization
            {isInitialized ? (
              <Badge variant="default" className="ml-2">Active</Badge>
            ) : (
              <Badge variant="secondary" className="ml-2">Initializing</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sync Indicator */}
          <CrossTabSyncIndicator 
            showDebugInfo={true}
            autoResolveConflicts={false}
            conflictResolutionStrategy={'admin-priority' as any}
          />
          
          {/* Manual Sync Button */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={syncNow}
              disabled={!isInitialized}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Sync Now
            </Button>
            
            {conflicts.length > 0 && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={clearConflicts}
                className="flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Clear Conflicts ({conflicts.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Enrollment Status Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{statusSummary.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{statusSummary.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{statusSummary.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{statusSummary.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </div>
          </div>
          
          {lastSyncTime && (
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Last synced: {lastSyncTime.toLocaleTimeString()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Cross-Tab Updates */}
      {enrollmentUpdates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Recent Cross-Tab Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {enrollmentUpdates.map((update, index) => (
                <div key={`${update.enrollmentId}-${index}`} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div className="flex items-center gap-2">
                    {update.type === EnrollmentUpdateType.ENROLLMENT_APPROVED && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {update.type === EnrollmentUpdateType.ENROLLMENT_REJECTED && (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    {update.type === EnrollmentUpdateType.ENROLLMENT_CREATED && (
                      <Info className="h-4 w-4 text-blue-500" />
                    )}
                    <div>
                      <div className="text-sm font-medium">
                        {update.type.replace('ENROLLMENT_', '').toLowerCase()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Course: {update.courseId} | User: {update.userId}
                      </div>
                    </div>
                  </div>
                  <Badge variant={
                    update.status === EnrollmentStatus.APPROVED ? 'default' :
                    update.status === EnrollmentStatus.REJECTED ? 'destructive' :
                    'secondary'
                  }>
                    {update.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conflicts Alert */}
      {conflicts.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {conflicts.length} enrollment conflict{conflicts.length > 1 ? 's' : ''} detected. 
            Multiple admins may be working on the same enrollments simultaneously. 
            Please review and resolve conflicts to ensure data consistency.
          </AlertDescription>
        </Alert>
      )}

      {/* Debug Information (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs font-mono space-y-1">
              <div>Tab ID: {debugInfo.tabId}</div>
              <div>Active Tabs: {debugInfo.activeTabs}</div>
              <div>State Version: {debugInfo.stateVersion}</div>
              <div>Pending Conflicts: {debugInfo.pendingConflicts}</div>
              <div>Initialized: {isInitialized ? 'Yes' : 'No'}</div>
              {lastUpdateTime && (
                <div>Last Update: {lastUpdateTime.toISOString()}</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CrossTabSyncIntegration;