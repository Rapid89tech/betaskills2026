import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Wifi, 
  Code, 
  Server, 
  Shield,
  RefreshCw,
  Zap
} from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';
import ComprehensiveErrorRecovery from './ComprehensiveErrorRecovery';

// Component that can throw different types of errors for testing
const ErrorThrower: React.FC<{ errorType: string }> = ({ errorType }) => {
  if (errorType === 'network') {
    throw new Error('Network request failed: Unable to connect to server');
  }
  
  if (errorType === 'chunk') {
    throw new Error('Loading chunk 2 failed: (error: https://example.com/chunk.js)');
  }
  
  if (errorType === 'permission') {
    throw new Error('Permission denied: Insufficient privileges to access resource');
  }
  
  if (errorType === 'generic') {
    throw new Error('An unexpected error occurred in the application');
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-green-800">✅ No error - Component is working normally</p>
    </div>
  );
};

const ErrorRecoveryDemo: React.FC = () => {
  const [errorType, setErrorType] = useState<string>('none');
  const [demoMode, setDemoMode] = useState<'boundary' | 'standalone'>('boundary');
  const [key, setKey] = useState(0);

  const errorTypes = [
    { value: 'none', label: 'No Error', icon: Shield, description: 'Component works normally' },
    { value: 'network', label: 'Network Error', icon: Wifi, description: 'Simulates connection issues' },
    { value: 'chunk', label: 'Chunk Loading Error', icon: Code, description: 'Simulates resource loading failure' },
    { value: 'permission', label: 'Permission Error', icon: Shield, description: 'Simulates access denied' },
    { value: 'generic', label: 'Generic Error', icon: Server, description: 'Simulates unexpected error' }
  ];

  const resetDemo = () => {
    setErrorType('none');
    setKey(prev => prev + 1);
  };

  const triggerError = (type: string) => {
    setErrorType(type);
    setKey(prev => prev + 1);
  };

  const selectedErrorType = errorTypes.find(type => type.value === errorType);

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Error Recovery System Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This demo showcases the comprehensive error recovery system. 
              Select an error type to see how the system handles different scenarios.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Demo Mode:</label>
              <Select value={demoMode} onValueChange={(value: 'boundary' | 'standalone') => setDemoMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boundary">Error Boundary Integration</SelectItem>
                  <SelectItem value="standalone">Standalone Recovery System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Error Type:</label>
              <Select value={errorType} onValueChange={setErrorType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {errorTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedErrorType && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <selectedErrorType.icon className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">{selectedErrorType.label}</span>
              </div>
              <p className="text-sm text-blue-700">{selectedErrorType.description}</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={resetDemo} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Demo
            </Button>
            {errorTypes.slice(1).map((type) => (
              <Button
                key={type.value}
                onClick={() => triggerError(type.value)}
                variant="outline"
                size="sm"
              >
                <type.icon className="h-4 w-4 mr-1" />
                {type.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Demo Area</span>
            <Badge variant="outline">
              {demoMode === 'boundary' ? 'Error Boundary Mode' : 'Standalone Mode'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {demoMode === 'boundary' ? (
            <ErrorBoundary
              key={key}
              enableComprehensiveRecovery={true}
              context="Demo Application"
              maxRetries={2}
            >
              <ErrorThrower errorType={errorType} />
            </ErrorBoundary>
          ) : (
            errorType !== 'none' ? (
              <ComprehensiveErrorRecovery
                error={new Error(
                  errorType === 'network' ? 'Network request failed: Unable to connect to server' :
                  errorType === 'chunk' ? 'Loading chunk 2 failed: (error: https://example.com/chunk.js)' :
                  errorType === 'permission' ? 'Permission denied: Insufficient privileges to access resource' :
                  'An unexpected error occurred in the application'
                )}
                context="Demo Application"
                onRecoveryComplete={() => {
                  console.log('Recovery completed successfully');
                  resetDemo();
                }}
                onRecoveryFailed={(error) => {
                  console.log('Recovery failed:', error);
                }}
              />
            ) : (
              <ErrorThrower errorType={errorType} />
            )
          )}
        </CardContent>
      </Card>

      {/* Feature Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Error Recovery Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-medium">Automatic Recovery</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Intelligent error detection and classification</li>
                <li>• Automatic retry with exponential backoff</li>
                <li>• Network connectivity monitoring</li>
                <li>• Cache clearing for chunk loading errors</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Guided Recovery</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Step-by-step recovery instructions</li>
                <li>• Progress tracking and feedback</li>
                <li>• Contextual tips and warnings</li>
                <li>• Difficulty and time estimates</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Manual Recovery</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Multiple recovery method options</li>
                <li>• Success rate statistics</li>
                <li>• Detailed attempt history</li>
                <li>• User notes and feedback</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Contextual Help</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Error-specific guidance</li>
                <li>• Prevention tips and best practices</li>
                <li>• Related topic suggestions</li>
                <li>• Documentation links</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorRecoveryDemo;