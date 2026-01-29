import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { crossTabSyncTest, CrossTabSyncUtils } from '@/utils/crossTabSyncTest';
import { dataManager } from '@/services/DataManager';
import { logger } from '@/utils/logger';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  Database,
  Zap,
  Activity
} from 'lucide-react';

/**
 * Cross-Tab Synchronization Demo Component
 * 
 * This component demonstrates and tests the enhanced cross-tab synchronization
 * and offline support features implemented in task 7.
 */
export const CrossTabSyncDemo: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queueStatus, setQueueStatus] = useState(dataManager.getOfflineQueueStatus());
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [crossTabEvents, setCrossTabEvents] = useState<any[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Update online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Monitor queue status
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueStatus(dataManager.getOfflineQueueStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Listen for cross-tab events
  useEffect(() => {
    const eventTypes = [
      'enrollment-created-cross-tab',
      'enrollment-updated-cross-tab',
      'enrollment-deleted-cross-tab',
      'enrollment-storage-update',
      'queue-completed',
      'queue-processed'
    ];

    const handleCrossTabEvent = (event: CustomEvent) => {
      const eventData = {
        type: event.type,
        timestamp: new Date().toISOString(),
        detail: event.detail
      };
      
      setCrossTabEvents(prev => [eventData, ...prev.slice(0, 9)]); // Keep last 10 events
      logger.info('Cross-tab event received:', eventData);
    };

    eventTypes.forEach(eventType => {
      window.addEventListener(eventType, handleCrossTabEvent as EventListener);
    });

    return () => {
      eventTypes.forEach(eventType => {
        window.removeEventListener(eventType, handleCrossTabEvent as EventListener);
      });
    };
  }, []);

  // Run all tests
  const runAllTests = useCallback(async () => {
    setIsRunningTests(true);
    setTestResults(null);
    
    try {
      await crossTabSyncTest.initialize();
      const results = await crossTabSyncTest.runAllTests();
      setTestResults(results);
      setLastSyncTime(new Date());
    } catch (error) {
      logger.error('Failed to run tests:', error);
      setTestResults({ error: error.message });
    } finally {
      setIsRunningTests(false);
      await crossTabSyncTest.cleanup();
    }
  }, []);

  // Test individual features
  const testCrossTabSync = useCallback(async () => {
    const result = await CrossTabSyncUtils.testCrossTabSync();
    logger.info('Cross-tab sync test result:', result);
  }, []);

  const testOfflineQueue = useCallback(async () => {
    const result = await CrossTabSyncUtils.testOfflineQueue();
    logger.info('Offline queue test result:', result);
  }, []);

  // Utility functions
  const requestCrossTabSync = useCallback(() => {
    CrossTabSyncUtils.requestCrossTabSync();
  }, []);

  const clearOfflineQueue = useCallback(() => {
    CrossTabSyncUtils.clearOfflineQueue();
    setQueueStatus(dataManager.getOfflineQueueStatus());
  }, []);

  const simulateOffline = useCallback(() => {
    // Simulate offline mode for testing
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });
    window.dispatchEvent(new Event('offline'));
  }, []);

  const simulateOnline = useCallback(() => {
    // Simulate online mode for testing
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true
    });
    window.dispatchEvent(new Event('online'));
  }, []);

  const getStatusColor = (status: boolean | undefined) => {
    if (status === undefined) return 'secondary';
    return status ? 'default' : 'destructive';
  };

  const getStatusIcon = (status: boolean | undefined) => {
    if (status === undefined) return <Clock className="h-4 w-4" />;
    return status ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Cross-Tab Synchronization Demo</h2>
          <p className="text-muted-foreground">
            Test and monitor cross-tab synchronization and offline support features
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Badge variant="default" className="flex items-center space-x-1">
              <Wifi className="h-3 w-3" />
              <span>Online</span>
            </Badge>
          ) : (
            <Badge variant="destructive" className="flex items-center space-x-1">
              <WifiOff className="h-3 w-3" />
              <span>Offline</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Connection Status and Queue Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isOnline ? 'Online' : 'Offline'}
            </div>
            <p className="text-xs text-muted-foreground">
              Network connectivity status
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline Queue</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStatus.length}</div>
            <p className="text-xs text-muted-foreground">
              Operations queued for sync
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cross-Tab Events</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crossTabEvents.length}</div>
            <p className="text-xs text-muted-foreground">
              Events received from other tabs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Test Controls</span>
          </CardTitle>
          <CardDescription>
            Run tests to verify cross-tab synchronization and offline support functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={runAllTests} 
              disabled={isRunningTests}
              className="flex items-center space-x-2"
            >
              {isRunningTests ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <span>Run All Tests</span>
            </Button>
            
            <Button variant="outline" onClick={testCrossTabSync}>
              Test Cross-Tab Sync
            </Button>
            
            <Button variant="outline" onClick={testOfflineQueue}>
              Test Offline Queue
            </Button>
            
            <Button variant="outline" onClick={requestCrossTabSync}>
              Request Cross-Tab Sync
            </Button>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={simulateOffline}>
              Simulate Offline
            </Button>
            
            <Button variant="secondary" onClick={simulateOnline}>
              Simulate Online
            </Button>
            
            <Button variant="destructive" onClick={clearOfflineQueue}>
              Clear Queue
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              Results from the latest test run
              {lastSyncTime && (
                <span className="ml-2 text-xs">
                  (Last run: {lastSyncTime.toLocaleTimeString()})
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {testResults.error ? (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  Test failed: {testResults.error}
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(testResults.crossTabSync)}
                    <Badge variant={getStatusColor(testResults.crossTabSync)}>
                      Cross-Tab Sync
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(testResults.offlineQueue)}
                    <Badge variant={getStatusColor(testResults.offlineQueue)}>
                      Offline Queue
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(testResults.localStorageEvents)}
                    <Badge variant={getStatusColor(testResults.localStorageEvents)}>
                      Storage Events
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(testResults.broadcastChannel)}
                    <Badge variant={getStatusColor(testResults.broadcastChannel)}>
                      Broadcast Channel
                    </Badge>
                  </div>
                </div>
                
                <Alert variant={testResults.overall ? "default" : "destructive"}>
                  {testResults.overall ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>
                    {testResults.overall 
                      ? "All tests passed! Cross-tab synchronization and offline support are working correctly."
                      : "Some tests failed. Check the individual test results above."
                    }
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Queue Status Details */}
      {queueStatus.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Offline Queue Details</CardTitle>
            <CardDescription>
              Operations waiting to be synchronized when online
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Queue Length:</span>
                <span>{queueStatus.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing:</span>
                <span>{queueStatus.isProcessing ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Retry Count:</span>
                <span>{queueStatus.retryCount}</span>
              </div>
            </div>
            
            {queueStatus.operations.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Queued Operations:</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {queueStatus.operations.map((op, index) => (
                    <div key={index} className="text-xs bg-muted p-2 rounded">
                      <span className="font-medium">{op.type}</span> - {op.table} - {op.id}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Cross-Tab Events Log */}
      {crossTabEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Cross-Tab Events Log</CardTitle>
            <CardDescription>
              Recent events received from other browser tabs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {crossTabEvents.map((event, index) => (
                <div key={index} className="text-xs bg-muted p-2 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{event.type}</span>
                    <span className="text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  {event.detail && (
                    <div className="mt-1 text-muted-foreground">
                      {JSON.stringify(event.detail, null, 2).substring(0, 100)}...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Cross-Tab Synchronization:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Open this page in multiple browser tabs</li>
            <li>Run tests in one tab and observe events in other tabs</li>
            <li>Create or update enrollments and watch for cross-tab updates</li>
          </ul>
          
          <p className="mt-4"><strong>Offline Support:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Click "Simulate Offline" to test offline mode</li>
            <li>Perform enrollment operations while offline</li>
            <li>Click "Simulate Online" to restore connectivity and watch queue processing</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrossTabSyncDemo;