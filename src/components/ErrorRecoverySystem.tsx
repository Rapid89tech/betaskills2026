import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  AlertCircle, 
  RefreshCw, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Wifi, 
  WifiOff,
  Clock,
  Zap,
  Shield
} from 'lucide-react';
import { errorHandler } from '@/utils/ErrorHandler';
import { useToast } from '@/hooks/use-toast';

interface RecoveryStep {
  id: string;
  title: string;
  description: string;
  action: () => Promise<boolean>;
  icon: React.ComponentType<{ className?: string }>;
  helpText?: string;
  estimatedTime?: string;
}

interface ErrorRecoverySystemProps {
  error?: Error;
  context?: string;
  onRecoveryComplete?: () => void;
  onRecoveryFailed?: (error: Error) => void;
  customRecoverySteps?: RecoveryStep[];
}

const ErrorRecoverySystem: React.FC<ErrorRecoverySystemProps> = ({
  error,
  context = 'Unknown',
  onRecoveryComplete,
  onRecoveryFailed,
  customRecoverySteps = []
}) => {
  const [isRecovering, setIsRecovering] = useState(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [failedSteps, setFailedSteps] = useState<Set<string>>(new Set());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  // Monitor network status
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

  // Default recovery steps based on error type
  const getDefaultRecoverySteps = useCallback((): RecoveryStep[] => {
    const errorMessage = error?.message?.toLowerCase() || '';
    const steps: RecoveryStep[] = [];

    // Network-related recovery steps
    if (errorMessage.includes('network') || errorMessage.includes('fetch') || !isOnline) {
      steps.push({
        id: 'check-connection',
        title: 'Check Network Connection',
        description: 'Verify your internet connection is stable',
        action: async () => {
          // Wait for network to be available
          if (!navigator.onLine) {
            return new Promise((resolve) => {
              const checkConnection = () => {
                if (navigator.onLine) {
                  window.removeEventListener('online', checkConnection);
                  resolve(true);
                } else {
                  setTimeout(() => resolve(false), 5000);
                }
              };
              window.addEventListener('online', checkConnection);
              setTimeout(() => resolve(false), 10000);
            });
          }
          return true;
        },
        icon: Wifi,
        helpText: 'Make sure you have a stable internet connection. Try switching networks if the problem persists.',
        estimatedTime: '10 seconds'
      });

      steps.push({
        id: 'retry-request',
        title: 'Retry Network Request',
        description: 'Attempt to reconnect to the server',
        action: async () => {
          try {
            // Simple connectivity test
            const response = await fetch('/api/health-check', { 
              method: 'HEAD',
              cache: 'no-cache'
            });
            return response.ok;
          } catch {
            return false;
          }
        },
        icon: RefreshCw,
        helpText: 'This will retry the failed network request with fresh connection.',
        estimatedTime: '5 seconds'
      });
    }

    // Chunk loading error recovery
    if (errorMessage.includes('loading chunk') || errorMessage.includes('chunk')) {
      steps.push({
        id: 'clear-cache',
        title: 'Clear Browser Cache',
        description: 'Remove cached files that may be corrupted',
        action: async () => {
          try {
            if ('caches' in window) {
              const cacheNames = await caches.keys();
              await Promise.all(cacheNames.map(name => caches.delete(name)));
            }
            return true;
          } catch {
            return false;
          }
        },
        icon: Shield,
        helpText: 'Clearing the cache removes old files that might be causing loading issues.',
        estimatedTime: '3 seconds'
      });

      steps.push({
        id: 'reload-resources',
        title: 'Reload Application Resources',
        description: 'Refresh the application to load updated files',
        action: async () => {
          window.location.reload();
          return true; // This won't actually return as page reloads
        },
        icon: RefreshCw,
        helpText: 'This will reload the entire application with fresh resources.',
        estimatedTime: '5 seconds'
      });
    }

    // Generic recovery steps
    steps.push({
      id: 'reset-state',
      title: 'Reset Application State',
      description: 'Clear temporary data and reset the application',
      action: async () => {
        try {
          // Clear session storage
          sessionStorage.clear();
          
          // Clear specific localStorage items that might be corrupted
          const keysToRemove = ['errorBoundary_recoveryPath', 'lastNetworkError'];
          keysToRemove.forEach(key => {
            try {
              localStorage.removeItem(key);
            } catch {
              // Ignore storage errors
            }
          });
          
          return true;
        } catch {
          return false;
        }
      },
      icon: Zap,
      helpText: 'This clears temporary data that might be causing issues without affecting your saved progress.',
      estimatedTime: '2 seconds'
    });

    return steps;
  }, [error, isOnline]);

  const allRecoverySteps = [...customRecoverySteps, ...getDefaultRecoverySteps()];

  const executeRecoveryStep = async (step: RecoveryStep): Promise<boolean> => {
    setCurrentStep(step.id);
    
    try {
      toast({
        title: "Recovery in Progress",
        description: `${step.title}...`,
      });

      const success = await step.action();
      
      if (success) {
        setCompletedSteps(prev => new Set([...prev, step.id]));
        toast({
          title: "Step Completed",
          description: `${step.title} completed successfully`,
        });
        return true;
      } else {
        setFailedSteps(prev => new Set([...prev, step.id]));
        toast({
          title: "Step Failed",
          description: `${step.title} failed to complete`,
          variant: "destructive",
        });
        return false;
      }
    } catch (stepError) {
      setFailedSteps(prev => new Set([...prev, step.id]));
      toast({
        title: "Step Error",
        description: `Error during ${step.title}: ${stepError instanceof Error ? stepError.message : 'Unknown error'}`,
        variant: "destructive",
      });
      return false;
    } finally {
      setCurrentStep(null);
    }
  };

  const runAutomaticRecovery = async (): Promise<void> => {
    setIsRecovering(true);
    setCompletedSteps(new Set());
    setFailedSteps(new Set());

    let recoverySuccessful = false;

    for (const step of allRecoverySteps) {
      const success = await executeRecoveryStep(step);
      
      if (success) {
        recoverySuccessful = true;
        // For some steps like reload, we might not reach this point
        break;
      }
      
      // Add delay between steps
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsRecovering(false);

    if (recoverySuccessful) {
      toast({
        title: "Recovery Successful",
        description: "The error has been resolved. You can continue using the application.",
      });
      onRecoveryComplete?.();
    } else {
      const recoveryError = new Error('All recovery steps failed');
      toast({
        title: "Recovery Failed",
        description: "Unable to automatically resolve the error. Please try manual recovery options.",
        variant: "destructive",
      });
      onRecoveryFailed?.(recoveryError);
    }
  };

  const runManualRecoveryStep = async (stepId: string): Promise<void> => {
    const step = allRecoverySteps.find(s => s.id === stepId);
    if (!step) return;

    const success = await executeRecoveryStep(step);
    
    if (success) {
      onRecoveryComplete?.();
    }
  };

  const getStepStatus = (stepId: string): 'pending' | 'running' | 'completed' | 'failed' => {
    if (currentStep === stepId) return 'running';
    if (completedSteps.has(stepId)) return 'completed';
    if (failedSteps.has(stepId)) return 'failed';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <TooltipProvider>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Error Recovery System
            {!isOnline && <WifiOff className="h-4 w-4 text-red-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Error in {context}:</strong> {error.message}
              </AlertDescription>
            </Alert>
          )}

          {!isOnline && (
            <Alert>
              <WifiOff className="h-4 w-4" />
              <AlertDescription>
                You're currently offline. Some recovery steps may not work until connection is restored.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recovery Options</h3>
              <Button 
                onClick={runAutomaticRecovery}
                disabled={isRecovering}
                className="flex items-center gap-2"
              >
                {isRecovering ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                {isRecovering ? 'Recovering...' : 'Auto Recovery'}
              </Button>
            </div>

            <div className="space-y-2">
              {allRecoverySteps.map((step) => {
                const status = getStepStatus(step.id);
                return (
                  <div 
                    key={step.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      status === 'completed' ? 'bg-green-50 border-green-200' :
                      status === 'failed' ? 'bg-red-50 border-red-200' :
                      status === 'running' ? 'bg-blue-50 border-blue-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(status)}
                      <step.icon className="h-4 w-4 text-gray-600" />
                      <div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-sm text-gray-600">{step.description}</div>
                        {step.estimatedTime && (
                          <div className="text-xs text-gray-500">
                            Estimated time: {step.estimatedTime}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {step.helpText && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{step.helpText}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => runManualRecoveryStep(step.id)}
                        disabled={isRecovering || status === 'running'}
                      >
                        {status === 'failed' ? 'Retry' : 'Run'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Need more help?</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Try refreshing the page if automatic recovery fails</li>
              <li>Check your internet connection and try again</li>
              <li>Clear your browser cache and cookies</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default ErrorRecoverySystem;