/**
 * Higher-Order Component for Application Error Boundary
 * 
 * Provides a convenient way to wrap components with the enhanced error boundary system
 */

import { ComponentType, ReactNode } from 'react';
import ApplicationErrorBoundary, { type ApplicationErrorBoundaryProps } from './ApplicationErrorBoundary';

export interface WithApplicationErrorBoundaryOptions {
  fallbackComponent?: ReactNode;
  onError?: ApplicationErrorBoundaryProps['onError'];
  onRecovery?: ApplicationErrorBoundaryProps['onRecovery'];
  enableComprehensiveRecovery?: boolean;
  enableAutomaticRecovery?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  context?: string;
  className?: string;
}

/**
 * Higher-order component that wraps a component with ApplicationErrorBoundary
 */
export function withApplicationErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithApplicationErrorBoundaryOptions = {}
): ComponentType<P> {
  const WithApplicationErrorBoundaryComponent = (props: P) => {
    return (
      <ApplicationErrorBoundary
        {...(options.fallbackComponent && { fallbackComponent: options.fallbackComponent })}
        {...(options.onError && { onError: options.onError })}
        {...(options.onRecovery && { onRecovery: options.onRecovery })}
        {...(options.enableComprehensiveRecovery !== undefined && { enableComprehensiveRecovery: options.enableComprehensiveRecovery })}
        {...(options.enableAutomaticRecovery !== undefined && { enableAutomaticRecovery: options.enableAutomaticRecovery })}
        {...(options.maxRetries !== undefined && { maxRetries: options.maxRetries })}
        {...(options.retryDelay !== undefined && { retryDelay: options.retryDelay })}
        context={options.context || WrappedComponent.displayName || WrappedComponent.name}
        {...(options.className && { className: options.className })}
      >
        <WrappedComponent {...props} />
      </ApplicationErrorBoundary>
    );
  };

  WithApplicationErrorBoundaryComponent.displayName = 
    `withApplicationErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithApplicationErrorBoundaryComponent;
}

/**
 * Decorator version for class components
 */
export function ApplicationErrorBoundaryDecorator(options: WithApplicationErrorBoundaryOptions = {}) {
  return function <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> {
    return withApplicationErrorBoundary(WrappedComponent, options);
  };
}

/**
 * Hook for programmatically triggering error boundary features
 */
export function useApplicationErrorBoundary() {
  const triggerError = (error: Error) => {
    // This will be caught by the nearest error boundary
    throw error;
  };

  const reportError = (error: Error, context?: string) => {
    // Report error without triggering boundary
    console.error(`Error reported from ${context || 'unknown context'}:`, error);
    
    // Dispatch custom event for error tracking
    window.dispatchEvent(new CustomEvent('applicationError:reported', {
      detail: { error, context }
    }));
  };

  return {
    triggerError,
    reportError
  };
}

export default withApplicationErrorBoundary;