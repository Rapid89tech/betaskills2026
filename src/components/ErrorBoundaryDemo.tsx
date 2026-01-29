import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ErrorBoundary from './ErrorBoundary';

// Component that can throw different types of errors
const ErrorThrower = ({ errorType }: { errorType: string }) => {
  switch (errorType) {
    case 'network':
      throw new Error('Network request failed');
    case 'chunk':
      throw new Error('Loading chunk 1 failed');
    case 'render':
      throw new Error('Component render error');
    case 'generic':
      throw new Error('Generic error occurred');
    default:
      return <div className="p-4 text-green-600">No error - component working normally!</div>;
  }
};

const ErrorBoundaryDemo = () => {
  const [errorType, setErrorType] = useState<string>('none');
  const [key, setKey] = useState(0);

  const triggerError = (type: string) => {
    setErrorType(type);
    setKey(prev => prev + 1); // Force re-render
  };

  const resetDemo = () => {
    setErrorType('none');
    setKey(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Error Boundary Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            This demo shows the enhanced error boundary with automatic retry functionality,
            user-friendly error messages, and recovery mechanisms.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button onClick={() => triggerError('network')} variant="destructive" size="sm">
              Network Error
            </Button>
            <Button onClick={() => triggerError('chunk')} variant="destructive" size="sm">
              Chunk Load Error
            </Button>
            <Button onClick={() => triggerError('render')} variant="destructive" size="sm">
              Render Error
            </Button>
            <Button onClick={() => triggerError('generic')} variant="destructive" size="sm">
              Generic Error
            </Button>
          </div>
          
          <Button onClick={resetDemo} variant="outline" className="w-full">
            Reset Demo
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Boundary Test Area</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorBoundary
            key={key}
            maxRetries={2}
            retryDelay={1000}
            onError={(error, errorInfo) => {
              console.log('Demo: Error caught:', error.message);
            }}
          >
            <ErrorThrower errorType={errorType} />
          </ErrorBoundary>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features Demonstrated</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li><strong>Network Error:</strong> Shows connection-specific error message with retry and offline options</li>
            <li><strong>Chunk Load Error:</strong> Shows resource loading error with cache clearing options</li>
            <li><strong>Render Error:</strong> Shows component error with navigation options</li>
            <li><strong>Generic Error:</strong> Shows fallback error message with standard recovery options</li>
            <li><strong>Automatic Recovery:</strong> Attempts automatic retry for recoverable errors</li>
            <li><strong>Online/Offline Detection:</strong> Shows network status and adjusts error messages</li>
            <li><strong>User-Friendly Messages:</strong> Converts technical errors to actionable user messages</li>
            <li><strong>Recovery Actions:</strong> Provides multiple recovery options based on error type</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorBoundaryDemo;