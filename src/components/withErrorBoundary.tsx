import React, { ComponentType, ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface WithErrorBoundaryOptions {
  fallbackComponent?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * Higher-order component that wraps a component with an ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
) {
  const WrappedComponent = (props: P) => {
    return (
      <ErrorBoundary
        fallbackComponent={options.fallbackComponent}
        onError={options.onError}
        maxRetries={options.maxRetries}
        retryDelay={options.retryDelay}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  // Preserve component name for debugging
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Decorator for class components
 */
export function ErrorBoundaryDecorator(options: WithErrorBoundaryOptions = {}) {
  return function <T extends ComponentType<any>>(target: T): T {
    return withErrorBoundary(target, options) as T;
  };
}

export default withErrorBoundary;