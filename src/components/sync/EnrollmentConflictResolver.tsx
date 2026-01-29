import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  GitMerge,
  Clock,
  Users,
  ArrowRight,
  Info
} from 'lucide-react';
import { useCrossTabSync } from '@/hooks/useCrossTabSync';
import { EnrollmentSyncMessage } from '@/services/crossTabSyncService';

interface ConflictDetails {
  conflictKey: string;
  courseId: string;
  userId: string;
  conflicts: EnrollmentSyncMessage[];
  localData: any;
  remoteData: any;
}

const EnrollmentConflictResolver: React.FC = () => {
  const { 
    pendingConflicts, 
    resolveConflict, 
    getConflictDetails,
    syncState 
  } = useCrossTabSync();
  
  const [conflicts, setConflicts] = useState<ConflictDetails[]>([]);
  const [resolving, setResolving] = useState<string | null>(null);

  useEffect(() => {
    // Convert pending conflicts to conflict details
    const conflictDetails: ConflictDetails[] = [];
    
    for (const [conflictKey, conflictMessages] of pendingConflicts) {
      const parts = conflictKey.split('-');
      const userId = parts[0];
      const courseId = parts[1];
      
      if (conflictMessages.length > 0) {
        const latestConflict = conflictMessages[conflictMessages.length - 1];
        
        conflictDetails.push({
          conflictKey,
          courseId,
          userId,
          conflicts: conflictMessages,
          localData: latestConflict.data.enrollment,
          remoteData: latestConflict.data.enrollment
        });
      }
    }
    
    setConflicts(conflictDetails);
  }, [pendingConflicts]);

  const handleResolveConflict = async (
    conflictKey: string, 
    resolution: 'keep_local' | 'accept_remote' | 'merge'
  ) => {
    setResolving(conflictKey);
    
    try {
      resolveConflict(conflictKey, resolution);
      
      // Remove from local state
      setConflicts(prev => prev.filter(c => c.conflictKey !== conflictKey));
      
    } catch (error) {
      console.error('Error resolving conflict:', error);
    } finally {
      setResolving(null);
    }
  };

  const getConflictTypeIcon = (conflictType: string) => {
    switch (conflictType) {
      case 'simultaneous_action':
        return <Users className="w-4 h-4" />;
      case 'data_mismatch':
        return <AlertTriangle className="w-4 h-4" />;
      case 'version_conflict':
        return <GitMerge className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getConflictTypeColor = (conflictType: string) => {
    switch (conflictType) {
      case 'simultaneous_action':
        return 'bg-orange-100 text-orange-800';
      case 'data_mismatch':
        return 'bg-red-100 text-red-800';
      case 'version_conflict':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (conflicts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="w-5 h-5" />
            Enrollment Conflicts
            <Badge variant="outline" className="bg-orange-100 text-orange-800">
              {conflicts.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              Multiple tabs are trying to modify the same enrollment. Choose how to resolve this conflict.
            </AlertDescription>
          </Alert>

          {conflicts.map((conflict) => {
            const latestConflict = conflict.conflicts[conflict.conflicts.length - 1];
            const conflictType = latestConflict.data.conflict?.type || 'unknown';
            
            return (
              <div key={conflict.conflictKey} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getConflictTypeColor(conflictType)}>
                    {getConflictTypeIcon(conflictType)}
                    <span className="ml-1 capitalize">{conflictType.replace('_', ' ')}</span>
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Course: {conflict.courseId}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">
                      Last updated: {formatTimestamp(latestConflict.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">
                      From tab: {latestConflict.tabId}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                  <p className="font-medium text-gray-700 mb-1">Description:</p>
                  <p className="text-gray-600">
                    {latestConflict.data.conflict?.description || 'Unknown conflict type'}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResolveConflict(conflict.conflictKey, 'keep_local')}
                    disabled={resolving === conflict.conflictKey}
                    className="flex-1"
                  >
                    {resolving === conflict.conflictKey ? (
                      <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    ) : (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    )}
                    Keep Local
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResolveConflict(conflict.conflictKey, 'accept_remote')}
                    disabled={resolving === conflict.conflictKey}
                    className="flex-1"
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Accept Remote
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResolveConflict(conflict.conflictKey, 'merge')}
                    disabled={resolving === conflict.conflictKey}
                    className="flex-1"
                  >
                    <GitMerge className="w-3 h-3 mr-1" />
                    Merge
                  </Button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-xs text-gray-500">
              {syncState.activeTabsCount} active tab(s)
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                conflicts.forEach(conflict => {
                  handleResolveConflict(conflict.conflictKey, 'keep_local');
                });
              }}
              className="text-xs"
            >
              Resolve All (Keep Local)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentConflictResolver;
