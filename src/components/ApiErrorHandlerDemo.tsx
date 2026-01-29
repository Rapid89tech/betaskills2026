/**
 * API Error Handler Demonstration Component
 * 
 * This component demonstrates the capabilities of the centralized API error handling:
 * - Automatic retry with exponential backoff
 * - Network connectivity detection
 * - Offline queue management
 * - User-friendly error messages
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Network
} from 'lucide-react';

import { apiErrorHandler } from '@/utils/ApiErrorHandler';
import { enhancedEnrollmentService } from '@/services/enhancedEnrollmentService';
import { logger } from '@/utils/logger';

interface NetworkInfo {
  isOnline: boolean;
  retryQueueLength: number;
  lastChecked: number;
}

interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'success' | 'error' | 'retrying';
  message: string;
  timestamp: number;
  attempts?: number;
}

const ApiErrorHandlerDemo: React.FC = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    isOnline: true,
    retryQueueLength: 0,
    lastChecked: Date.now()
  });
  
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Update network info periodically
  useEffect(() => {
    const updateNetworkInfo = () => {
      const info = enhancedEnrollmentService.getNetworkInfo();
      setNetworkInfo(info);
    };

    updateNetworkInfo();
    const interval = setInterval(updateNetworkInfo, 2000);

    return () => clearInterval(interval);
  }, []);

  // Listen for network events
  useEffect(() => {
    const handleOnline = () => {
      logger.info('Network connection restored');
      setNetworkInfo(prev => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      logger.info('Network connection lost');
      setNetworkInfo(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addTestResult = (result: Omit<TestResult, 'id' | 'timestamp'>) => {
    const newResult: TestResult = {
      ...result,
      id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };
    
    setTestResults(prev => [newResult, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const updateTestResult = (id: string, updates: Partial<TestResult>) => {
    setTestResults(prev => 
      prev.map(result => 
        result.id === id ? { ...result, ...updates } : result
      )
    );
  };

  // Test successful API call
  const testSuccessfulCall = async () => {
    const testId = `success_${Date.now()}`;
    addTestResult({
      name: 'Successful API Call',
      status: 'pending',
      message: 'Testing successful API request...'
    });

    try {
      // Simulate a successful API call
      const response = await apiErrorHandler.fetchWithRetry('/favicon.ico', {
        method: 'HEAD'
      });

      updateTestResult(testId, {
        status: 'success',
        message: `Success! Status: ${response.status}`
      });

    } catch (error) {
      updateTestResult(testId, {
        status: 'error',
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  // Test retry mechanism with failing endpoint
  const testRetryMechanism = async () => {
    const testId = `retry_${Date.now()}`;
    addTestResult({
      name: 'Retry Mechanism Test',
      status: 'pending',
      message: 'Testing retry with failing endpoint...'
    });

    try {
      // This will likely fail and trigger retries
      const response = await apiErrorHandler.fetchWithRetry('/api/nonexistent-endpoint', {
        method: 'GET'
      }, {
        maxRetries: 2,
        baseDelay: 500
      });

      updateTestResult(testId, {
        status: 'success',
        message: `Unexpected success! Status: ${response.status}`
      });

    } catch (error) {
      updateTestResult(testId, {
        status: 'error',
        message: `Failed after retries: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  // Test enrollment service with error handling
  const testEnrollmentService = async () => {
    const testId = `enrollment_${Date.now()}`;
    addTestResult({
      name: 'Enhanced Enrollment Service',
      status: 'pending',
      message: 'Testing enrollment service with error handling...'
    });

    try {
      const enrollments = await enhancedEnrollmentService.getUserEnrollments('demo-user-123');
      
      updateTestResult(testId, {
        status: 'success',
        message: `Retrieved ${enrollments.length} enrollments successfully`
      });

    } catch (error) {
      updateTestResult(testId, {
        status: 'error',
        message: `Enrollment service error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  // Test offline queue functionality
  const testOfflineQueue = async () => {
    const testId = `offline_${Date.now()}`;
    addTestResult({
      name: 'Offline Queue Test',
      status: 'pending',
      message: 'Testing offline request queuing...'
    });

    try {
      // Simulate going offline
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      // This should be queued
      const response = await apiErrorHandler.fetchWithRetry('/api/test-offline', {
        method: 'POST',
        body: JSON.stringify({ test: 'offline data' })
      });

      updateTestResult(testId, {
        status: 'success',
        message: `Request queued for offline processing. Status: ${response.status}`
      });

      // Restore online status
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true
      });

    } catch (error) {
      updateTestResult(testId, {
        status: 'error',
        message: `Offline queue error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  // Run all tests
  const runAllTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);

    try {
      await testSuccessfulCall();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await testRetryMechanism();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await testEnrollmentService();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await testOfflineQueue();
      
    } finally {
      setIsRunningTests(false);
    }
  };

  // Clear retry queue
  const clearRetryQueue = () => {
    enhancedEnrollmentService.clearRetryQueue();
    setNetworkInfo(prev => ({ ...prev, retryQueueLength: 0 }));
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'retrying':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      case 'pending':
      case 'retrying':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            API Error Handler Demonstration
          </CardTitle>
          <CardDescription>
            Test and monitor the centralized API error handling system with retry logic,
            network detection, and offline support.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Network Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {networkInfo.isOnline ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              <div>
                <p className="font-medium">
                  Network Status: {networkInfo.isOnline ? 'Online' : 'Offline'}
                </p>
                <p className="text-sm text-gray-600">
                  Last checked: {new Date(networkInfo.lastChecked).toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant={networkInfo.retryQueueLength > 0 ? 'destructive' : 'secondary'}>
                Queue: {networkInfo.retryQueueLength}
              </Badge>
              
              {networkInfo.retryQueueLength > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearRetryQueue}
                >
                  Clear Queue
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Test Controls */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={runAllTests}
              disabled={isRunningTests}
              className="flex items-center gap-2"
            >
              {isRunningTests && <RefreshCw className="h-4 w-4 animate-spin" />}
              Run All Tests
            </Button>
            
            <Button
              variant="outline"
              onClick={testSuccessfulCall}
              disabled={isRunningTests}
            >
              Test Success
            </Button>
            
            <Button
              variant="outline"
              onClick={testRetryMechanism}
              disabled={isRunningTests}
            >
              Test Retry
            </Button>
            
            <Button
              variant="outline"
              onClick={testEnrollmentService}
              disabled={isRunningTests}
            >
              Test Service
            </Button>
            
            <Button
              variant="outline"
              onClick={testOfflineQueue}
              disabled={isRunningTests}
            >
              Test Offline
            </Button>
          </div>

          <Separator />

          {/* Test Results */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Test Results</h3>
            
            {testResults.length === 0 ? (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  No tests have been run yet. Click "Run All Tests" to start testing the API error handling system.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                {testResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <p className="font-medium">{result.name}</p>
                        <p className="text-sm text-gray-600">{result.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(result.status)}>
                        {result.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Information */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Features being demonstrated:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Automatic retry with exponential backoff for failed requests</li>
                <li>• Network connectivity detection and offline handling</li>
                <li>• Request queuing when offline with automatic sync when online</li>
                <li>• User-friendly error message conversion from technical errors</li>
                <li>• Enhanced Supabase integration with centralized error handling</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiErrorHandlerDemo;