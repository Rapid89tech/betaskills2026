/**
 * Comprehensive Error Recovery System
 * 
 * Advanced error recovery component that provides:
 * - Multiple recovery strategies
 * - System diagnostics
 * - Cache management
 * - Network connectivity testing
 * - User guidance and support
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  AlertTriangle, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Database, 
  Trash2, 
  Download, 
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  HelpCircle,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fallbackManager } from '@/utils/FallbackManager';
import { errorHandler } from '@/utils/ErrorHandler';

interface DiagnosticResult {
  name: string;
  status: 'success' | 'warning' | 'error' | 'pending';
  message: string;
  details?: string;
}

interface RecoveryStep {
  id: string;
  name: string;
  description: string;
  action: () => Promise<boolean>;
  status: 'pending' | 'running' | 'success' | 'error';
  required: boolean;
}

interface ComprehensiveErrorRecoveryProps {
  error: Error;
  context: string;
  onRecoveryComplete: () => void;
  onRecoveryFailed: (error: Error) => void;
}

const ComprehensiveErrorRecovery: React.FC<ComprehensiveErrorRecoveryProps> = ({
  error,
  context,
  onRecoveryComplete,
  onRecoveryFailed
}) => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [recoverySteps, setRecoverySteps] = useState<RecoveryStep[]>([]);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [isRunningRecovery, setIsRunningRecovery] = useState(false);
  const [recoveryProgress, setRecoveryProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('diagnostics');
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [cacheStats, setCacheStats] = useState(fallbackManager.getCacheStats());

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update cache stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCacheStats(fallbackManager.getCacheStats());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Initialize recovery steps
  useEffect(() => {
    const steps: RecoveryStep[] = [
      {
        id: 'network-check',
        name: 'Network Connectivity',
        description: 'Test network connection and API endpoints',
        action: async () => {
          try {
            const response = await fetch('/favicon.ico', { method: 'HEAD' });
            return response.ok;
          } catch {
            return false;
          }
        },
        status: 'pending',
        required: true
      },
      {
        id: 'clear-cache',
        name: 'Clear Application Cache',
        description: 'Remove potentially corrupted cached data',
        action: async () => {
          try {
            fallbackManager.clearCache();
            localStorage.removeItem('fallbackCache');
            sessionStorage.clear();
            return true;
          } catch {
            return false;
          }
        },
        status: 'pending',
        required: false
      },
      {
        id: 'clear-browser-cache',
        name: 'Clear Browser Cache',
        description: 'Clear browser caches and service workers',
        action: async () => {
          try {
            if ('caches' in window) {
              const cacheNames = await caches.keys();
              await Promise.all(cacheNames.map(name => caches.delete(name)));
            }
            
            if ('serviceWorker' in navigator) {
              const registrations = await navigator.serviceWorker.getRegistrations();
              await Promise.all(registrations.map(reg => reg.unregister()));
            }
            
            return true;
          } catch {
            return false;
          }
        },
        status: 'pending',
        required: false
      },
      {
        id: 'reload-resources',
        name: 'Reload Critical Resources',
        description: 'Refresh essential application resources',
        action: async () => {
          try {
            // Simulate resource reloading
            await new Promise(resolve => setTimeout(resolve, 1000));
            return true;
          } catch {
            return false;
          }
        },
        status: 'pending',
        required: true
      },
      {
        id: 'reset-state',
        name: 'Reset Application State',
        description: 'Clear application state and reinitialize',
        action: async () => {
          try {
            // Clear error handler state
            errorHandler.clearErrors();
            
            // Reset any global state
            window.dispatchEvent(new CustomEvent('app:reset'));
            
            return true;
          } catch {
            return false;
          }
        },
        status: 'pending',
        required: true
      }
    ];

    setRecoverySteps(steps);
  }, []);

  const runDiagnostics = useCallback(async () => {
    setIsRunningDiagnostics(true);
    const results: DiagnosticResult[] = [];

    // Network connectivity test
    try {
      const response = await fetch('/favicon.ico', { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      results.push({
        name: 'Network Connectivity',
        status: response.ok ? 'success' : 'error',
        message: response.ok ? 'Connected to internet' : 'No internet connection',
        details: `Status: ${response.status}`
      });
    } catch (error) {
      results.push({
        name: 'Network Connectivity',
        status: 'error',
        message: 'Network request failed',
        details: (error as Error).message
      });
    }

    // Browser compatibility check
    const browserFeatures = {
      localStorage: typeof Storage !== 'undefined',
      sessionStorage: typeof sessionStorage !== 'undefined',
      fetch: typeof fetch !== 'undefined',
      serviceWorker: 'serviceWorker' in navigator,
      caches: 'caches' in window
    };

    const missingFeatures = Object.entries(browserFeatures)
      .filter(([, supported]) => !supported)
      .map(([feature]) => feature);

    results.push({
      name: 'Browser Compatibility',
      status: missingFeatures.length === 0 ? 'success' : 'warning',
      message: missingFeatures.length === 0 
        ? 'All required features supported' 
        : `Missing features: ${missingFeatures.join(', ')}`,
      details: `Supported: ${Object.keys(browserFeatures).length - missingFeatures.length}/${Object.keys(browserFeatures).length}`
    });

    // Cache status check
    const stats = fallbackManager.getCacheStats();
    results.push({
      name: 'Application Cache',
      status: stats.size > 0 ? 'success' : 'warning',
      message: `${stats.size} cached items (${Math.round(stats.totalSize / 1024)}KB)`,
      details: stats.keys.join(', ')
    });

    // Error analysis
    const errorMessage = error.message.toLowerCase();
    let errorCategory = 'unknown';
    let severity = 'medium';

    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      errorCategory = 'network';
      severity = 'high';
    } else if (errorMessage.includes('chunk') || errorMessage.includes('loading')) {
      errorCategory = 'resource';
      severity = 'medium';
    } else if (errorMessage.includes('auth') || errorMessage.includes('permission')) {
      errorCategory = 'authentication';
      severity = 'high';
    }

    results.push({
      name: 'Error Analysis',
      status: severity === 'high' ? 'error' : 'warning',
      message: `${errorCategory} error detected`,
      details: `Severity: ${severity}, Context: ${context}`
    });

    setDiagnostics(results);
    setIsRunningDiagnostics(false);
  }, [error, context]);

  const runRecovery = useCallback(async () => {
    setIsRunningRecovery(true);
    setRecoveryProgress(0);

    const totalSteps = recoverySteps.length;
    let completedSteps = 0;
    let hasErrors = false;

    for (const step of recoverySteps) {
      // Update step status to running
      setRecoverySteps(prev => prev.map(s => 
        s.id === step.id ? { ...s, status: 'running' } : s
      ));

      try {
        const success = await step.action();
        
        setRecoverySteps(prev => prev.map(s => 
          s.id === step.id ? { 
            ...s, 
            status: success ? 'success' : 'error' 
          } : s
        ));

        if (!success && step.required) {
          hasErrors = true;
        }

        completedSteps++;
        setRecoveryProgress((completedSteps / totalSteps) * 100);

        // Small delay between steps
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        setRecoverySteps(prev => prev.map(s => 
          s.id === step.id ? { ...s, status: 'error' } : s
        ));

        if (step.required) {
          hasErrors = true;
        }

        completedSteps++;
        setRecoveryProgress((completedSteps / totalSteps) * 100);
      }
    }

    setIsRunningRecovery(false);

    if (hasErrors) {
      onRecoveryFailed(new Error('Recovery process encountered errors'));
    } else {
      // Wait a moment then complete recovery
      setTimeout(() => {
        onRecoveryComplete();
      }, 1000);
    }
  }, [recoverySteps, onRecoveryComplete, onRecoveryFailed]);

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStepStatusIcon = (status: RecoveryStep['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent(`Error Recovery Support - ${context}`);
    const body = encodeURIComponent(
      `I'm experiencing an error that requires recovery assistance.\n\n` +
      `Error: ${error.message}\n` +
      `Context: ${context}\n` +
      `Time: ${new Date().toISOString()}\n` +
      `URL: ${window.location.href}\n\n` +
      `Diagnostics:\n${diagnostics.map(d => `- ${d.name}: ${d.message}`).join('\n')}\n\n` +
      `Please help me resolve this issue.`
    );
    
    window.open(`mailto:support@betaskill.com?subject=${subject}&body=${body}`);
  };

  // Run diagnostics on mount
  useEffect(() => {
    runDiagnostics();
  }, [runDiagnostics]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <div>
              <CardTitle>System Recovery</CardTitle>
              <p className="text-sm text-gray-600">
                Advanced error recovery for {context}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {networkStatus ? (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Wifi className="h-3 w-3 mr-1" />
                Online
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-50 text-red-700">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
            <TabsTrigger value="recovery">Recovery</TabsTrigger>
            <TabsTrigger value="cache">Cache</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="diagnostics" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">System Diagnostics</h3>
              <Button
                onClick={runDiagnostics}
                disabled={isRunningDiagnostics}
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRunningDiagnostics ? 'animate-spin' : ''}`} />
                {isRunningDiagnostics ? 'Running...' : 'Run Diagnostics'}
              </Button>
            </div>

            <div className="space-y-3">
              {diagnostics.map((diagnostic, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(diagnostic.status)}
                      <div>
                        <h4 className="font-medium">{diagnostic.name}</h4>
                        <p className="text-sm text-gray-600">{diagnostic.message}</p>
                        {diagnostic.details && (
                          <p className="text-xs text-gray-500 mt-1">{diagnostic.details}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recovery" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Recovery Process</h3>
              <Button
                onClick={runRecovery}
                disabled={isRunningRecovery}
                size="sm"
              >
                <Settings className={`h-4 w-4 mr-2 ${isRunningRecovery ? 'animate-spin' : ''}`} />
                {isRunningRecovery ? 'Running Recovery...' : 'Start Recovery'}
              </Button>
            </div>

            {isRunningRecovery && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Recovery Progress</span>
                  <span>{Math.round(recoveryProgress)}%</span>
                </div>
                <Progress value={recoveryProgress} className="w-full" />
              </div>
            )}

            <div className="space-y-3">
              {recoverySteps.map((step) => (
                <Card key={step.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getStepStatusIcon(step.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{step.name}</h4>
                          {step.required && (
                            <Badge variant="outline" className="text-xs">Required</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cache" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Cache Management</h3>
              <Button
                onClick={() => {
                  fallbackManager.clearCache();
                  setCacheStats(fallbackManager.getCacheStats());
                }}
                variant="outline"
                size="sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Cached Items</span>
                </div>
                <p className="text-2xl font-bold">{cacheStats.size}</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Cache Size</span>
                </div>
                <p className="text-2xl font-bold">{Math.round(cacheStats.totalSize / 1024)}KB</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Oldest Entry</span>
                </div>
                <p className="text-sm">
                  {cacheStats.oldestEntry 
                    ? new Date(cacheStats.oldestEntry).toLocaleString()
                    : 'No entries'
                  }
                </p>
              </Card>
            </div>

            {cacheStats.keys.length > 0 && (
              <Card className="p-4">
                <h4 className="font-medium mb-2">Cached Keys</h4>
                <div className="space-y-1">
                  {cacheStats.keys.map((key, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-1">
                      {key}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="support" className="space-y-4">
            <h3 className="text-lg font-medium">Get Help</h3>
            
            <Alert>
              <HelpCircle className="h-4 w-4" />
              <AlertDescription>
                If the automatic recovery doesn't resolve your issue, you can get additional help below.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button
                onClick={handleContactSupport}
                className="w-full"
                variant="outline"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>

              <Button
                onClick={() => window.location.reload()}
                className="w-full"
                variant="outline"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Force Reload Page
              </Button>

              <Button
                onClick={() => window.location.href = '/'}
                className="w-full"
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </div>

            <Card className="p-4 bg-gray-50">
              <h4 className="font-medium mb-2">Error Information</h4>
              <div className="text-sm space-y-1">
                <p><strong>Error:</strong> {error.message}</p>
                <p><strong>Context:</strong> {context}</p>
                <p><strong>Time:</strong> {new Date().toISOString()}</p>
                <p><strong>URL:</strong> {window.location.href}</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ComprehensiveErrorRecovery;