import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Lightbulb,
  Clock,
  Zap,
  Shield,
  Wifi,
  WifiOff
} from 'lucide-react';
import { errorHandler } from '@/utils/ErrorHandler';
import RetryMechanism from '@/utils/RetryMechanism';
import { useToast } from '@/hooks/use-toast';

interface GuidanceStep {
  id: string;
  title: string;
  description: string;
  instruction: string;
  action?: () => Promise<boolean>;
  manualAction?: () => void;
  estimatedTime?: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  icon: React.ComponentType<{ className?: string }>;
  prerequisites?: string[];
  tips?: string[];
  warnings?: string[];
}

interface ErrorGuidanceSystemProps {
  error: Error;
  context: string;
  onRecoverySuccess?: () => void;
  onRecoveryFailure?: (error: Error) => void;
  onStepComplete?: (stepId: string, success: boolean) => void;
}

const ErrorGuidanceSystem: React.FC<ErrorGuidanceSystemProps> = ({
  error,
  context,
  onRecoverySuccess,
  onRecoveryFailure,
  onStepComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [failedSteps, setFailedSteps] = useState<Set<string>>(new Set());
  const [isExecutingStep, setIsExecutingStep] = useState(false);
  const [guidanceSteps, setGuidanceSteps] = useState<GuidanceStep[]>([]);
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

  // Generate guidance steps based on error type
  useEffect(() => {
    const steps = generateGuidanceSteps(error, context, isOnline);
    setGuidanceSteps(steps);
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
    setFailedSteps(new Set());
  }, [error, context, isOnline]);

  const executeStep = async (step: GuidanceStep): Promise<boolean> => {
    if (!step.action) return false;

    setIsExecutingStep(true);
    
    try {
      toast({
        title: "Executing Recovery Step",
        description: step.title,
      });

      const result = await RetryMechanism.execute(step.action, {
        maxAttempts: 2,
        baseDelay: 1000,
        onRetry: (error, attempt) => {
          toast({
            title: "Retrying Step",
            description: `Attempt ${attempt + 1}: ${step.title}`,
          });
        }
      });

      const success = result.success;
      
      if (success) {
        setCompletedSteps(prev => new Set([...prev, step.id]));
        toast({
          title: "Step Completed Successfully",
          description: step.title,
        });
      } else {
        setFailedSteps(prev => new Set([...prev, step.id]));
        toast({
          title: "Step Failed",
          description: `${step.title}: ${result.error?.message || 'Unknown error'}`,
          variant: "destructive",
        });
      }

      onStepComplete?.(step.id, success);
      return success;
    } catch (stepError) {
      const success = false;
      setFailedSteps(prev => new Set([...prev, step.id]));
      toast({
        title: "Step Error",
        description: `Error executing ${step.title}`,
        variant: "destructive",
      });
      
      onStepComplete?.(step.id, success);
      return success;
    } finally {
      setIsExecutingStep(false);
    }
  };

  const executeManualStep = (step: GuidanceStep) => {
    if (step.manualAction) {
      step.manualAction();
      setCompletedSteps(prev => new Set([...prev, step.id]));
      onStepComplete?.(step.id, true);
    }
  };

  const nextStep = () => {
    if (currentStepIndex < guidanceSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const runAutomaticRecovery = async () => {
    for (let i = 0; i < guidanceSteps.length; i++) {
      setCurrentStepIndex(i);
      const step = guidanceSteps[i];
      
      if (step.action) {
        const success = await executeStep(step);
        if (success) {
          // If this step succeeded and it's a critical recovery step, we might be done
          if (step.id.includes('reload') || step.id.includes('clear-cache')) {
            onRecoverySuccess?.();
            return;
          }
        }
      }
      
      // Add delay between steps
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Check if recovery was successful
    const successfulSteps = guidanceSteps.filter(step => completedSteps.has(step.id));
    if (successfulSteps.length > 0) {
      onRecoverySuccess?.();
    } else {
      onRecoveryFailure?.(new Error('All recovery steps failed'));
    }
  };

  const getStepStatus = (stepId: string): 'pending' | 'completed' | 'failed' | 'current' => {
    const step = guidanceSteps.find(s => s.id === stepId);
    const stepIndex = guidanceSteps.findIndex(s => s.id === stepId);
    
    if (stepIndex === currentStepIndex) return 'current';
    if (completedSteps.has(stepId)) return 'completed';
    if (failedSteps.has(stepId)) return 'failed';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'current': return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentStep = guidanceSteps[currentStepIndex];
  const progress = guidanceSteps.length > 0 ? ((currentStepIndex + 1) / guidanceSteps.length) * 100 : 0;

  if (guidanceSteps.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No specific guidance available for this error type.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Error Recovery Guidance
          {!isOnline && <WifiOff className="h-4 w-4 text-red-500" />}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Step {currentStepIndex + 1} of {guidanceSteps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Error Summary */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Error in {context}:</strong> {error.message}
          </AlertDescription>
        </Alert>

        {/* Current Step */}
        {currentStep && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <currentStep.icon className="h-5 w-5" />
                  {currentStep.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(currentStep.difficulty)}>
                    {currentStep.difficulty}
                  </Badge>
                  {currentStep.estimatedTime && (
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {currentStep.estimatedTime}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{currentStep.description}</p>
              
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Instructions:</h4>
                <p className="text-sm">{currentStep.instruction}</p>
              </div>

              {currentStep.prerequisites && currentStep.prerequisites.length > 0 && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">Prerequisites:</h4>
                  <ul className="list-disc list-inside text-sm text-yellow-700">
                    {currentStep.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentStep.tips && currentStep.tips.length > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">💡 Tips:</h4>
                  <ul className="list-disc list-inside text-sm text-blue-700">
                    {currentStep.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentStep.warnings && currentStep.warnings.length > 0 && (
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">⚠️ Warnings:</h4>
                  <ul className="list-disc list-inside text-sm text-red-700">
                    {currentStep.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                {currentStep.action && (
                  <Button
                    onClick={() => executeStep(currentStep)}
                    disabled={isExecutingStep}
                    className="flex items-center gap-2"
                  >
                    {isExecutingStep ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Zap className="h-4 w-4" />
                    )}
                    {isExecutingStep ? 'Executing...' : 'Execute Automatically'}
                  </Button>
                )}
                
                {currentStep.manualAction && (
                  <Button
                    variant="outline"
                    onClick={() => executeManualStep(currentStep)}
                  >
                    Execute Manually
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setCompletedSteps(prev => new Set([...prev, currentStep.id]));
                    nextStep();
                  }}
                >
                  Skip Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={runAutomaticRecovery}
            disabled={isExecutingStep}
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            Run All Steps
          </Button>

          <Button
            variant="outline"
            onClick={nextStep}
            disabled={currentStepIndex === guidanceSteps.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* All Steps Overview */}
        <div className="space-y-2">
          <h3 className="font-medium">All Recovery Steps:</h3>
          <div className="space-y-2">
            {guidanceSteps.map((step, index) => {
              const status = getStepStatus(step.id);
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    status === 'current' ? 'bg-blue-50 border-blue-200' :
                    status === 'completed' ? 'bg-green-50 border-green-200' :
                    status === 'failed' ? 'bg-red-50 border-red-200' :
                    'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentStepIndex(index)}
                >
                  {getStatusIcon(status)}
                  <step.icon className="h-4 w-4 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm text-gray-600">{step.description}</div>
                  </div>
                  <Badge className={getDifficultyColor(step.difficulty)} variant="outline">
                    {step.difficulty}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to generate guidance steps based on error type
function generateGuidanceSteps(error: Error, context: string, isOnline: boolean): GuidanceStep[] {
  const steps: GuidanceStep[] = [];
  const errorMessage = error.message.toLowerCase();

  // Network error guidance
  if (errorMessage.includes('network') || errorMessage.includes('fetch') || !isOnline) {
    steps.push({
      id: 'check-network-connection',
      title: 'Check Network Connection',
      description: 'Verify your internet connection is working',
      instruction: 'Open a new tab and try visiting a website like google.com to test your connection.',
      difficulty: 'easy',
      icon: Wifi,
      estimatedTime: '30 seconds',
      action: async () => {
        try {
          const response = await fetch('https://www.google.com/favicon.ico', { 
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-cache'
          });
          return true;
        } catch {
          return navigator.onLine;
        }
      },
      tips: [
        'Try switching to a different network (mobile data, different WiFi)',
        'Check if other devices can connect to the internet',
        'Restart your router if you have access to it'
      ]
    });

    steps.push({
      id: 'wait-for-connection',
      title: 'Wait for Connection Restoration',
      description: 'Allow time for network connectivity to be restored',
      instruction: 'Wait 30-60 seconds for your connection to stabilize, then try again.',
      difficulty: 'easy',
      icon: Clock,
      estimatedTime: '1 minute',
      action: async () => {
        return new Promise((resolve) => {
          let attempts = 0;
          const maxAttempts = 6; // 30 seconds total
          
          const checkConnection = () => {
            attempts++;
            if (navigator.onLine) {
              resolve(true);
            } else if (attempts >= maxAttempts) {
              resolve(false);
            } else {
              setTimeout(checkConnection, 5000);
            }
          };
          
          checkConnection();
        });
      }
    });
  }

  // Chunk loading error guidance
  if (errorMessage.includes('loading chunk') || errorMessage.includes('chunk')) {
    steps.push({
      id: 'clear-browser-cache',
      title: 'Clear Browser Cache',
      description: 'Remove outdated cached files that may be causing loading issues',
      instruction: 'This will clear your browser cache and reload the application with fresh files.',
      difficulty: 'easy',
      icon: Shield,
      estimatedTime: '10 seconds',
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
      manualAction: () => {
        // Provide manual instructions
        alert('To manually clear cache:\n1. Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)\n2. Select "Cached images and files"\n3. Click "Clear data"\n4. Reload this page');
      },
      tips: [
        'This is the most common solution for chunk loading errors',
        'Your login session and saved data will not be affected'
      ],
      warnings: [
        'The page will reload automatically after clearing cache'
      ]
    });

    steps.push({
      id: 'reload-application',
      title: 'Reload Application',
      description: 'Refresh the page to load the latest application files',
      instruction: 'This will reload the entire application with fresh resources from the server.',
      difficulty: 'easy',
      icon: RefreshCw,
      estimatedTime: '5 seconds',
      action: async () => {
        window.location.reload();
        return true; // This won't actually return as page reloads
      },
      manualAction: () => {
        window.location.reload();
      }
    });
  }

  // Generic error recovery steps
  if (steps.length === 0) {
    steps.push({
      id: 'refresh-page',
      title: 'Refresh the Page',
      description: 'Simple page refresh to reset the application state',
      instruction: 'Click the refresh button or press F5 to reload the page.',
      difficulty: 'easy',
      icon: RefreshCw,
      estimatedTime: '5 seconds',
      action: async () => {
        window.location.reload();
        return true;
      },
      manualAction: () => {
        window.location.reload();
      }
    });

    steps.push({
      id: 'reset-local-storage',
      title: 'Reset Local Data',
      description: 'Clear temporary data that might be causing issues',
      instruction: 'This will clear temporary application data while preserving your important information.',
      difficulty: 'medium',
      icon: Zap,
      estimatedTime: '10 seconds',
      action: async () => {
        try {
          // Clear session storage
          sessionStorage.clear();
          
          // Clear specific localStorage items that might be problematic
          const keysToRemove = ['errorBoundary_recoveryPath', 'lastNetworkError', 'tempData'];
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
      tips: [
        'This will not affect your course progress or enrollment data',
        'You may need to log in again after this step'
      ],
      warnings: [
        'Some temporary settings may be reset'
      ]
    });
  }

  return steps;
}

export default ErrorGuidanceSystem;
export type { GuidanceStep };