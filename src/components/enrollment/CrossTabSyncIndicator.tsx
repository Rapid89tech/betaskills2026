/**
 * CrossTabSyncIndicator Component
 * 
 * Visual indicator for cross-tab enrollment synchronization status with:
 * - Real-time sync status display
 * - Conflict resolution interface
 * - Manual sync controls
 * - Debug information panel
 * 
 * Requirements: 6.3, 6.4, 3.2
 */

import React, { useState } from 'react';
import { 
  useCrossTabSync, 
  type UseCrossTabSyncOptions 
} from '@/hooks/useCrossTabSync';
import { 
  ConflictResolutionStrategy,
  type StateConflict 
} from '@/services/CrossTabSyncService';
import { EnrollmentStatus } from '@/types/enrollment';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Info,
  ChevronDown,
  Tabs,
  Clock,
  Users
} from 'lucide-react';

// Component props interface
export interface CrossTabSyncIndicatorProps {
  className?: string;
  showDebugInfo?: boolean;
  autoResolveConflicts?: boolean;
  conflictResolutionStrategy?: ConflictResolutionStrategy;
  compact?: boolean;
}

/**
 * CrossTabSyncIndicator Component
 */
export const CrossTabSyncIndicator: React.FC<CrossTabSyncIndicatorProps> = ({
  className = '',
  showDebugInfo = false,
  autoResolveConflicts = true,
  conflictResolutionStrategy = ConflictResolutionStrategy.ADMIN_PRIORITY,
  compact = false
}) => {
  // State
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<ConflictResolutionStrategy>(
    conflictResolutionStrategy
  );

  // Hook options
  const hookOptions: UseCrossTabSyncOptions = {
    autoResolveConflicts,
    conflictResolutionStrategy: selectedStrategy,
    syncOnFocus: true,
    enableLogging: true
  };

  // Cross-tab sync hook
  const {
    isInitialized,
    localState,
    conflicts,
    lastSyncTime,
    syncNow,
    resolveConflict,
    clearConflicts,
    getDebugInfo
  } = useCrossTabSync(hookOptions);

  // Get debug info
  const debugInfo = getDebugInfo();

  /**
   * Format timestamp for display
   */
  const formatTimestamp = (date: Date | null): string => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    
    return date.toLocaleDateString();
  };

  /**
   * Get status color based on sync state
   */
  const getStatusColor = (): string => {
    if (!isInitialized) return 'text-gray-500';
    if (conflicts.length > 0) return 'text-yellow-500';
    return 'text-green-500';
  };

  /**
   * Get status icon based on sync state
   */
  const getStatusIcon = () => {
    if (!isInitialized) return <XCircle className="h-4 w-4" />;
    if (conflicts.length > 0) return <AlertTriangle className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  /**
   * Handle conflict resolution
   */
  const handleResolveConflict = (conflict: StateConflict, strategy: ConflictResolutionStrategy) => {
    try {
      resolveConflict(conflict, strategy);
    } catch (error) {
      console.error('Error resolving conflict:', error);
    }
  };

  /**
   * Handle strategy change
   */
  const handleStrategyChange = (strategy: ConflictResolutionStrategy) => {
    setSelectedStrategy(strategy);
  };

  // Compact view
  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`flex items-center gap-2 ${className}`}>
              <div className={getStatusColor()}>
                {getStatusIcon()}
              </div>
              {conflicts.length > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {conflicts.length}
                </Badge>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-sm">
              <div>Cross-tab sync: {isInitialized ? 'Active' : 'Inactive'}</div>
              {conflicts.length > 0 && (
                <div>Conflicts: {conflicts.length}</div>
              )}
              <div>Last sync: {formatTimestamp(lastSyncTime)}</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Full view
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Tabs className="h-4 w-4" />
            Cross-Tab Sync
            <div className={getStatusColor()}>
              {getStatusIcon()}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {conflicts.length > 0 && (
              <Badge variant="destructive" className="text-xs">
                {conflicts.length} conflicts
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={syncNow}
              disabled={!isInitialized}
              className="h-6 px-2"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Information */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span>Active Tabs: {debugInfo.activeTabs}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>Last Sync: {formatTimestamp(lastSyncTime)}</span>
          </div>
        </div>

        {/* Conflicts Section */}
        {conflicts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-yellow-600">
                State Conflicts ({conflicts.length})
              </h4>
              <div className="flex items-center gap-2">
                <Select
                  value={selectedStrategy}
                  onValueChange={handleStrategyChange}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ConflictResolutionStrategy.ADMIN_PRIORITY}>
                      Admin Priority
                    </SelectItem>
                    <SelectItem value={ConflictResolutionStrategy.LAST_WRITE_WINS}>
                      Last Write Wins
                    </SelectItem>
                    <SelectItem value={ConflictResolutionStrategy.MERGE_STATES}>
                      Merge States
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearConflicts}
                  className="h-7 px-2 text-xs"
                >
                  Clear All
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {conflicts.map((conflict, index) => (
                <Card key={`${conflict.enrollmentId}-${index}`} className="border-yellow-200">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Enrollment: {conflict.enrollmentId}
                        </div>
                        <div className="text-xs text-gray-600">
                          Conflict Type: {conflict.conflictType}
                        </div>
                        <div className="flex gap-4 text-xs">
                          <span>
                            Local: {conflict.localState.status}
                          </span>
                          <span>
                            Remote: {conflict.remoteState.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResolveConflict(conflict, selectedStrategy)}
                          className="h-7 px-2 text-xs"
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Debug Information */}
        {showDebugInfo && (
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between h-7 text-xs"
              >
                <div className="flex items-center gap-2">
                  <Info className="h-3 w-3" />
                  Debug Information
                </div>
                <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                <div>Tab ID: {debugInfo.tabId}</div>
                <div>State Version: {debugInfo.stateVersion}</div>
                <div>Enrollments: {localState ? Object.keys(localState.enrollments).length : 0}</div>
                <div>Initialized: {isInitialized ? 'Yes' : 'No'}</div>
                {localState && (
                  <div>Last Updated: {localState.lastUpdated.toISOString()}</div>
                )}
              </div>

              {/* Enrollment States */}
              {localState && Object.keys(localState.enrollments).length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-medium">Current Enrollments:</div>
                  <div className="space-y-1">
                    {Object.entries(localState.enrollments).map(([key, enrollment]) => (
                      <div key={key} className="bg-gray-50 p-2 rounded text-xs">
                        <div className="flex justify-between">
                          <span>{enrollment.courseId}</span>
                          <Badge 
                            variant={enrollment.status === EnrollmentStatus.APPROVED ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {enrollment.status}
                          </Badge>
                        </div>
                        <div className="text-gray-600 mt-1">
                          Updated: {enrollment.updatedAt.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Status Message */}
        <div className="text-xs text-gray-600 text-center">
          {!isInitialized && 'Initializing cross-tab synchronization...'}
          {isInitialized && conflicts.length === 0 && 'All tabs synchronized'}
          {isInitialized && conflicts.length > 0 && `${conflicts.length} conflicts need resolution`}
        </div>
      </CardContent>
    </Card>
  );
};

export default CrossTabSyncIndicator;