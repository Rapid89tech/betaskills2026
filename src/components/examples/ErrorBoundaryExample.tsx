/**
 * ErrorBoundaryExample
 * 
 * Example component demonstrating how to use the comprehensive error boundary system
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  ErrorBoundary, 
  ErrorBoundaryProvider, 
  NetworkErrorBoundary, 
  DatabaseErrorBoundary, 
  AuthErrorBoundary,
  withErrorBoundary,
  useErrorReporting
} from '@/components/error/ErrorBoundarySystem';
import { errorRecoveryService } from '@/services/errorRecoveryService';
import { networkErrorService } from '@/services/networkErrorService';
import { errorLoggingService } from '@/services/errorLoggingService';

// Example component that can throw errors
function ProblematicComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('This is a test error from ProblematicComponent');
  }
  
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-green-800">Component rendered successfully!</p>
    </div>
  );
}

// Example component that makes network requests
function NetworkComponent() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // This will use the network error service
      const result = await networkErrorService.executeRequest(
        async () => {
          // Simulate a network request
          const response = await fetch('/api/test-endpoint');
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return await response.text();
        },
        'test-request',
        {
          priority: 1,
          maxRetries: 3,
          timeout: 5000
        }
      );
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Request Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </Button>
        
        {data && (
          <Alert>
            <AlertDescription>
              <strong>Success:</strong> {data}
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

// Example component with error reporting
function ComponentWithErrorReporting() {
  const { reportComponentError, reportNetworkError, reportDatabaseError } = useErrorReporting();

  const triggerComponentError = () => {
    try {
      throw new Error('Manual component error for testing');
    } catch (error) {
      reportComponentError(error as Error, {
        componentName: 'ComponentWithErrorReporting',
        severity: 'medium',
        metadata: { action: 'manual_trigger' }
      });
    }
  };

  const triggerNetworkError = () => {
    try {
      throw new Error('Manual network error for testing');
    } catch (error) {
      reportNetworkError(error as Error, {
        severity: 'high',
        metadata: { action: 'manual_trigger' }
      });
    }
  };

  const triggerDatabaseError = () => {
    try {
      throw new Error('Manual database error for testing');
    } catch (error) {
      reportDatabaseError(error as Error, {
        severity: 'high',
        metadata: { action: 'manual_trigger' }
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Reporting Examples</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button onClick={triggerComponentError} variant="outline">
            Report Component Error
          </Button>
          <Button onClick={triggerNetworkError} variant="outline">
            Report Network Error
          </Button>
          <Button onClick={triggerDatabaseError} variant="outline">
            Report Database Error
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Wrapped component example
const WrappedComponent = withErrorBoundary(
  ProblematicComponent,
  {
    componentName: 'WrappedComponent',
    severity: 'medium'
  }
);

// Main example component
export function ErrorBoundaryExample() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [showNetworkExample, setShowNetworkExample] = useState(false);

  return (
    <ErrorBoundaryProvider>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Error Boundary System Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This demonstrates the comprehensive error boundary system with component-level error handling,
              service-level recovery, network error handling, and error logging integration.
            </p>
            
            <div className="flex gap-2">
              <Badge variant="outline">Component Errors</Badge>
              <Badge variant="outline">Service Recovery</Badge>
              <Badge variant="outline">Network Handling</Badge>
              <Badge variant="outline">Error Logging</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Basic Error Boundary Example */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Error Boundary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => setShouldThrow(!shouldThrow)}
                variant={shouldThrow ? 'destructive' : 'default'}
              >
                {shouldThrow ? 'Disable Error' : 'Trigger Error'}
              </Button>
            </div>
            
            <ErrorBoundary
              context={{
                componentName: 'ErrorBoundaryExample',
                severity: 'medium'
              }}
            >
              <ProblematicComponent shouldThrow={shouldThrow} />
            </ErrorBoundary>
          </CardContent>
        </Card>

        {/* Specialized Error Boundaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Error Boundary</CardTitle>
            </CardHeader>
            <CardContent>
              <NetworkErrorBoundary>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800">
                    This content is wrapped in a NetworkErrorBoundary.
                    If network errors occur, it will show a specialized fallback.
                  </p>
                </div>
              </NetworkErrorBoundary>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Error Boundary</CardTitle>
            </CardHeader>
            <CardContent>
              <DatabaseErrorBoundary>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-purple-800">
                    This content is wrapped in a DatabaseErrorBoundary.
                    If database errors occur, it will show a specialized fallback.
                  </p>
                </div>
              </DatabaseErrorBoundary>
            </CardContent>
          </Card>
        </div>

        {/* Auth Error Boundary */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication Error Boundary</CardTitle>
          </CardHeader>
          <CardContent>
            <AuthErrorBoundary>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800">
                  This content is wrapped in an AuthErrorBoundary.
                  If authentication errors occur, it will redirect to login.
                </p>
              </div>
            </AuthErrorBoundary>
          </CardContent>
        </Card>

        {/* HOC Example */}
        <Card>
          <CardHeader>
            <CardTitle>Higher-Order Component (HOC) Example</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This component is wrapped using the withErrorBoundary HOC.
            </p>
            
            <Button
              onClick={() => setShouldThrow(!shouldThrow)}
              variant={shouldThrow ? 'destructive' : 'default'}
            >
              {shouldThrow ? 'Disable Error' : 'Trigger Error'}
            </Button>
            
            <WrappedComponent shouldThrow={shouldThrow} />
          </CardContent>
        </Card>

        {/* Network Service Example */}
        <Card>
          <CardHeader>
            <CardTitle>Network Error Service Example</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => setShowNetworkExample(!showNetworkExample)}
                variant="outline"
              >
                {showNetworkExample ? 'Hide' : 'Show'} Network Example
              </Button>
            </div>
            
            {showNetworkExample && <NetworkComponent />}
          </CardContent>
        </Card>

        {/* Error Reporting Example */}
        <ComponentWithErrorReporting />

        {/* Service Status */}
        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Error Recovery Service</p>
                <Badge variant="default">Active</Badge>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Network Error Service</p>
                <Badge variant="default">Active</Badge>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Error Logging Service</p>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundaryProvider>
  );
}
