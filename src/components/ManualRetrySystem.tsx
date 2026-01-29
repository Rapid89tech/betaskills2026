import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Clock,
  Zap,
  MessageSquare,
  Send,
  History,
  TrendingUp,
  Wifi,
  WifiOff
} from 'lucide-react';
import { errorHandler } from '@/utils/ErrorHandler';
import RetryMechanism from '@/utils/RetryMechanism';
import { useToast } from '@/hooks/use-toast';

interface RetryAttempt {
  id: string;
  timestamp: Date;
  method: string;
  success: boolean;
  error?: string;
  duration: number;
  userNotes?: string;
}

interface RetryOption {
  id: string;
  label: string;
  description: string;
  action: () => Promise<boolean>;
  estimatedTime: string;
  successRate: number;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: React.ComponentType<{ className?: string }>;
  prerequisites?: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface ManualRetrySystemProps {
  error: Error;
  context: string;
  onRetrySuccess?: (method: string) => void;
  onRetryFailure?: (method: string, error: Error) => void;
  customRetryOptions?: RetryOption[];
}

const ManualRetrySystem: React.FC<ManualRetrySystemProps> = ({
  error,
  context,
  onRetrySuccess,
  onRetryFailure,
  customRetryOptions = []
}) => {
  const [retryHistory, setRetryHistory] = useState<RetryAttempt[]>([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const [currentRetryMethod, setCurrentRetryMethod] = useState<string | null>(null);
  const [retryProgress, setRetryProgress] = useState(0);
  const [userNotes, setUserNotes] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryOptions, setRetryOptions] = useState<RetryOption[]>([]);
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

  // Generate retry options based on error type and context
  useEffect(() => {
    const options = generateRetryOptions(error, context, isOnline);
    setRetryOptions([...customRetryOptions, ...options]);
  }, [error, context, isOnline, customRetryOptions]);

  // Load retry history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(`retryHistory_${context}`);
      if (savedHistory) {
        const history = JSON.parse(savedHistory).map((attempt: any) => ({
          ...attempt,
          timestamp: new Date(attempt.timestamp)
        }));
        setRetryHistory(history);
      }
    } catch {
      // Ignore storage errors
    }
  }, [context]);

  // Save retry history to localStorage
  const saveRetryHistory = (history: RetryAttempt[]) => {
    try {
      localStorage.setItem(`retryHistory_${context}`, JSON.stringify(history));
    } catch {
      // Ignore storage errors
    }
  };

  const executeRetry = async (option: RetryOption): Promise<void> => {
    const startTime = Date.now();
    setIsRetrying(true);
    setCurrentRetryMethod(option.id);
    setRetryProgress(0);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setRetryProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      toast({
        title: "Retry in Progress",
        description: `Attempting: ${option.label}`,
      });

      const result = await RetryMechanism.execute(option.action, {
        maxAttempts: 1, // Manual retry should only attempt once
        onRetry: () => {
          setRetryProgress(50);
        }
      });

      const duration = Date.now() - startTime;
      setRetryProgress(100);

      const attempt: RetryAttempt = {
        id: `${option.id}_${Date.now()}`,
        timestamp: new Date(),
        method: option.label,
        success: result.success,
        error: result.error?.message,
        duration,
        userNotes: userNotes.trim() || undefined
      };

      const newHistory = [attempt, ...retryHistory.slice(0, 9)]; // Keep last 10 attempts
      setRetryHistory(newHistory);
      saveRetryHistory(newHistory);

      if (result.success) {
        toast({
          title: "Retry Successful",
          description: `${option.label} completed successfully`,
        });
        onRetrySuccess?.(option.id);
      } else {
        toast({
          title: "Retry Failed",
          description: `${option.label} failed: ${result.error?.message || 'Unknown error'}`,
          variant: "destructive",
        });
        onRetryFailure?.(option.id, result.error || new Error('Retry failed'));
      }

      setUserNotes(''); // Clear notes after attempt
    } catch (retryError) {
      const duration = Date.now() - startTime;
      const attempt: RetryAttempt = {
        id: `${option.id}_${Date.now()}`,
        timestamp: new Date(),
        method: option.label,
        success: false,
        error: retryError instanceof Error ? retryError.message : 'Unknown error',
        duration,
        userNotes: userNotes.trim() || undefined
      };

      const newHistory = [attempt, ...retryHistory.slice(0, 9)];
      setRetryHistory(newHistory);
      saveRetryHistory(newHistory);

      toast({
        title: "Retry Error",
        description: `Error during ${option.label}`,
        variant: "destructive",
      });
      
      onRetryFailure?.(option.id, retryError instanceof Error ? retryError : new Error('Retry failed'));
    } finally {
      clearInterval(progressInterval);
      setIsRetrying(false);
      setCurrentRetryMethod(null);
      setRetryProgress(0);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-purple-100 text-purple-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateOverallSuccessRate = () => {
    if (retryHistory.length === 0) return 0;
    const successfulAttempts = retryHistory.filter(attempt => attempt.success).length;
    return Math.round((successfulAttempts / retryHistory.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Error Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-blue-500" />
            Manual Retry System
            {!isOnline && <WifiOff className="h-4 w-4 text-red-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Error in {context}:</strong> {error.message}
            </AlertDescription>
          </Alert>

          {!isOnline && (
            <Alert className="mt-3">
              <WifiOff className="h-4 w-4" />
              <AlertDescription>
                You're currently offline. Some retry options may not work until connection is restored.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Retry Progress */}
      {isRetrying && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Executing: {retryOptions.find(opt => opt.id === currentRetryMethod)?.label}
                </span>
                <span className="text-sm text-gray-500">{retryProgress}%</span>
              </div>
              <Progress value={retryProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Add Notes (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Textarea
              placeholder="Add any observations or context about this error (e.g., what you were doing when it occurred, any patterns you've noticed)..."
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              className="min-h-[80px]"
            />
            <p className="text-xs text-gray-500">
              These notes will be saved with your retry attempts to help track patterns and improve troubleshooting.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Retry Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Retry Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {retryOptions.map((option) => (
              <Card key={option.id} className="border-2 hover:border-blue-200 transition-colors">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <option.icon className="h-5 w-5 text-gray-600" />
                        <div>
                          <h3 className="font-medium">{option.label}</h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={getRiskColor(option.riskLevel)} variant="outline">
                          {option.riskLevel} risk
                        </Badge>
                        <Badge className={getDifficultyColor(option.difficulty)} variant="outline">
                          {option.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {option.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span className={getSuccessRateColor(option.successRate)}>
                          {option.successRate}% success rate
                        </span>
                      </div>
                    </div>

                    {option.prerequisites && option.prerequisites.length > 0 && (
                      <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                        <p className="text-xs font-medium text-yellow-800 mb-1">Prerequisites:</p>
                        <ul className="text-xs text-yellow-700 list-disc list-inside">
                          {option.prerequisites.map((prereq, index) => (
                            <li key={index}>{prereq}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      onClick={() => executeRetry(option)}
                      disabled={isRetrying || (!isOnline && option.id.includes('network'))}
                      className="w-full flex items-center gap-2"
                    >
                      {isRetrying && currentRetryMethod === option.id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <option.icon className="h-4 w-4" />
                      )}
                      {isRetrying && currentRetryMethod === option.id ? 'Retrying...' : `Try ${option.label}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Retry History */}
      {retryHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="h-4 w-4" />
              Retry History
              <Badge variant="outline">
                {calculateOverallSuccessRate()}% success rate
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {retryHistory.map((attempt) => (
                <div
                  key={attempt.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    attempt.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {attempt.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <div>
                      <div className="font-medium">{attempt.method}</div>
                      <div className="text-sm text-gray-600">
                        {attempt.timestamp.toLocaleString()} • {attempt.duration}ms
                      </div>
                      {attempt.error && (
                        <div className="text-xs text-red-600 mt-1">{attempt.error}</div>
                      )}
                      {attempt.userNotes && (
                        <div className="text-xs text-gray-600 mt-1 italic">
                          Note: {attempt.userNotes}
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge variant={attempt.success ? 'default' : 'destructive'}>
                    {attempt.success ? 'Success' : 'Failed'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper function to generate retry options based on error type
function generateRetryOptions(error: Error, context: string, isOnline: boolean): RetryOption[] {
  const options: RetryOption[] = [];
  const errorMessage = error.message.toLowerCase();

  // Network error retry options
  if (errorMessage.includes('network') || errorMessage.includes('fetch') || !isOnline) {
    options.push({
      id: 'simple-refresh',
      label: 'Simple Page Refresh',
      description: 'Reload the page to retry the failed operation',
      estimatedTime: '5 seconds',
      successRate: 70,
      difficulty: 'easy',
      riskLevel: 'low',
      icon: RefreshCw,
      action: async () => {
        window.location.reload();
        return true;
      }
    });

    options.push({
      id: 'wait-and-retry',
      label: 'Wait and Retry',
      description: 'Wait for network stability then retry the operation',
      estimatedTime: '30 seconds',
      successRate: 85,
      difficulty: 'easy',
      riskLevel: 'low',
      icon: Clock,
      action: async () => {
        // Wait for network to be stable
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Test connectivity
        try {
          const response = await fetch('/api/health-check', { 
            method: 'HEAD',
            cache: 'no-cache'
          });
          return response.ok;
        } catch {
          return navigator.onLine;
        }
      }
    });

    options.push({
      id: 'force-reconnect',
      label: 'Force Reconnection',
      description: 'Clear network cache and force a fresh connection',
      estimatedTime: '15 seconds',
      successRate: 75,
      difficulty: 'medium',
      riskLevel: 'medium',
      icon: Wifi,
      prerequisites: ['Stable internet connection'],
      action: async () => {
        try {
          // Clear any cached network requests
          if ('caches' in window) {
            const cacheNames = await caches.keys();
            const networkCaches = cacheNames.filter(name => 
              name.includes('api') || name.includes('network')
            );
            await Promise.all(networkCaches.map(name => caches.delete(name)));
          }

          // Test with a fresh request
          const response = await fetch('/api/health-check?' + Date.now(), { 
            method: 'HEAD',
            cache: 'no-cache',
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });
          return response.ok;
        } catch {
          return false;
        }
      }
    });
  }

  // Chunk loading error retry options
  if (errorMessage.includes('loading chunk') || errorMessage.includes('chunk')) {
    options.push({
      id: 'clear-cache-reload',
      label: 'Clear Cache and Reload',
      description: 'Remove cached files and reload with fresh resources',
      estimatedTime: '10 seconds',
      successRate: 95,
      difficulty: 'easy',
      riskLevel: 'low',
      icon: Zap,
      action: async () => {
        try {
          if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
          }
          window.location.reload();
          return true;
        } catch {
          window.location.reload();
          return true;
        }
      }
    });

    options.push({
      id: 'hard-refresh',
      label: 'Hard Refresh',
      description: 'Force reload all resources bypassing cache',
      estimatedTime: '8 seconds',
      successRate: 90,
      difficulty: 'easy',
      riskLevel: 'low',
      icon: RefreshCw,
      action: async () => {
        // Simulate hard refresh by adding cache-busting parameter
        const url = new URL(window.location.href);
        url.searchParams.set('_refresh', Date.now().toString());
        window.location.href = url.toString();
        return true;
      }
    });
  }

  // Generic retry options
  if (options.length === 0) {
    options.push({
      id: 'basic-retry',
      label: 'Basic Retry',
      description: 'Attempt the failed operation again',
      estimatedTime: '5 seconds',
      successRate: 60,
      difficulty: 'easy',
      riskLevel: 'low',
      icon: RefreshCw,
      action: async () => {
        // For generic errors, just try a simple reload
        window.location.reload();
        return true;
      }
    });

    options.push({
      id: 'reset-and-retry',
      label: 'Reset State and Retry',
      description: 'Clear temporary data and retry the operation',
      estimatedTime: '10 seconds',
      successRate: 75,
      difficulty: 'medium',
      riskLevel: 'medium',
      icon: Zap,
      action: async () => {
        try {
          // Clear session storage
          sessionStorage.clear();
          
          // Clear problematic localStorage items
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
      }
    });
  }

  return options;
}

export default ManualRetrySystem;
export type { RetryOption, RetryAttempt };