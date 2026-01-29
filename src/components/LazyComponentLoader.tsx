/**
 * Enhanced Lazy Component Loader
 * Implements intelligent lazy loading with preloading, error boundaries, and performance monitoring
 */

import React, { Suspense, ComponentType, lazy, useEffect, useState, useCallback } from 'react';
import { loadingOptimizer } from '@/utils/loadingOptimizer';
import { performanceManager } from '@/utils/PerformanceManager';
import OptimizedLoadingSpinner from './OptimizedLoadingSpinner';

interface LazyComponentLoaderProps {
  componentName: string;
  importFn: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ComponentType;
  preload?: boolean;
  preloadDelay?: number;
  errorBoundary?: boolean;
  retryAttempts?: number;
  onLoadStart?: () => void;
  onLoadComplete?: (loadTime: number) => void;
  onLoadError?: (error: Error) => void;
  children?: React.ReactNode;
}

interface LazyComponentState {
  isLoading: boolean;
  error: Error | null;
  retryCount: number;
  loadTime: number | null;
}

/**
 * Enhanced lazy component with intelligent loading and error handling
 */
export const LazyComponentLoader: React.FC<LazyComponentLoaderProps> = ({
  componentName,
  importFn,
  fallback: CustomFallback,
  preload = false,
  preloadDelay = 1000,
  errorBoundary = true,
  retryAttempts = 3,
  onLoadStart,
  onLoadComplete,
  onLoadError,
  children
}) => {
  const [state, setState] = useState<LazyComponentState>({
    isLoading: false,
    error: null,
    retryCount: 0,
    loadTime: null
  });

  const [LazyComponent, setLazyComponent] = useState<ComponentType<any> | null>(null);

  // Create lazy component with enhanced error handling
  const createLazyComponent = useCallback(() => {
    return lazy(async () => {
      const startTime = performance.now();
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      if (onLoadStart) {
        onLoadStart();
      }

      try {
        // Use loading optimizer for better performance tracking
        const result = await loadingOptimizer.loadComponent(importFn, componentName);
        const loadTime = performance.now() - startTime;

        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          loadTime,
          retryCount: 0 
        }));

        if (onLoadComplete) {
          onLoadComplete(loadTime);
        }

        // Track performance
        performanceManager.trackUserInteraction('component-load', componentName);

        return { default: result };
      } catch (error) {
        const loadError = error as Error;
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: loadError,
          retryCount: prev.retryCount + 1
        }));

        if (onLoadError) {
          onLoadError(loadError);
        }

        // Return error component
        return {
          default: () => (
            <ErrorFallback 
              error={loadError}
              componentName={componentName}
              onRetry={() => window.location.reload()}
              canRetry={state.retryCount < retryAttempts}
            />
          )
        };
      }
    });
  }, [componentName, importFn, onLoadStart, onLoadComplete, onLoadError, retryAttempts, state.retryCount]);

  // Initialize lazy component
  useEffect(() => {
    const component = createLazyComponent();
    setLazyComponent(() => component);
  }, [createLazyComponent]);

  // Preload component if requested
  useEffect(() => {
    if (preload && preloadDelay > 0) {
      const timer = setTimeout(() => {
        performanceManager.preloadComponent(componentName).catch(console.warn);
      }, preloadDelay);

      return () => clearTimeout(timer);
    } else if (preload) {
      performanceManager.preloadComponent(componentName).catch(console.warn);
    }
  }, [preload, preloadDelay, componentName]);

  // Default fallback component
  const DefaultFallback = () => (
    <OptimizedLoadingSpinner 
      message={`Loading ${componentName}...`}
      showProgress={true}
      timeout={10000}
    />
  );

  const FallbackComponent = CustomFallback || DefaultFallback;

  if (!LazyComponent) {
    return <FallbackComponent />;
  }

  const content = (
    <Suspense fallback={<FallbackComponent />}>
      <LazyComponent>{children}</LazyComponent>
    </Suspense>
  );

  // Wrap with error boundary if requested
  if (errorBoundary) {
    return (
      <LazyComponentErrorBoundary 
        componentName={componentName}
        onError={onLoadError}
      >
        {content}
      </LazyComponentErrorBoundary>
    );
  }

  return content;
};

/**
 * Error fallback component for failed lazy loads
 */
interface ErrorFallbackProps {
  error: Error;
  componentName: string;
  onRetry: () => void;
  canRetry: boolean;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  componentName,
  onRetry,
  canRetry
}) => (
  <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
    <div className="text-red-600 mb-4">
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    
    <h3 className="text-lg font-semibold text-red-800 mb-2">
      Failed to load {componentName}
    </h3>
    
    <p className="text-red-600 text-center mb-4 max-w-md">
      {error.message || 'An unexpected error occurred while loading this component.'}
    </p>
    
    {canRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Retry Loading
      </button>
    )}
    
    {import.meta.env.DEV && (
      <details className="mt-4 text-xs text-red-500">
        <summary className="cursor-pointer">Error Details</summary>
        <pre className="mt-2 p-2 bg-red-100 rounded text-left overflow-auto max-w-md">
          {error.stack}
        </pre>
      </details>
    )}
  </div>
);

/**
 * Error boundary for lazy components
 */
interface LazyComponentErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface LazyComponentErrorBoundaryProps {
  componentName: string;
  onError?: (error: Error) => void;
  children: React.ReactNode;
}

class LazyComponentErrorBoundary extends React.Component<
  LazyComponentErrorBoundaryProps,
  LazyComponentErrorBoundaryState
> {
  constructor(props: LazyComponentErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): LazyComponentErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Lazy component error in ${this.props.componentName}:`, error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ErrorFallback
          error={this.state.error}
          componentName={this.props.componentName}
          onRetry={() => {
            this.setState({ hasError: false, error: null });
            window.location.reload();
          }}
          canRetry={true}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Hook for creating lazy components with enhanced features
 */
export const useLazyComponent = <T extends ComponentType<any>>(
  componentName: string,
  importFn: () => Promise<{ default: T }>,
  options: {
    preload?: boolean;
    preloadDelay?: number;
    retryAttempts?: number;
  } = {}
) => {
  const [loadState, setLoadState] = useState<{
    isLoading: boolean;
    error: Error | null;
    loadTime: number | null;
  }>({
    isLoading: false,
    error: null,
    loadTime: null
  });

  const LazyComponent = React.useMemo(() => {
    return React.forwardRef<any, any>((props, _ref) => (
      <LazyComponentLoader
        componentName={componentName}
        importFn={importFn}
        preload={options.preload}
        preloadDelay={options.preloadDelay}
        retryAttempts={options.retryAttempts}
        onLoadStart={() => setLoadState(prev => ({ ...prev, isLoading: true }))}
        onLoadComplete={(loadTime) => setLoadState(prev => ({ 
          ...prev, 
          isLoading: false, 
          loadTime 
        }))}
        onLoadError={(error) => setLoadState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error 
        }))}
        {...props}
      />
    ));
  }, [componentName, importFn, options]);

  return {
    LazyComponent,
    loadState,
    preload: () => performanceManager.preloadComponent(componentName)
  };
};

/**
 * Batch preloader for multiple components
 */
export const batchPreloadComponents = async (
  components: Array<{
    name: string;
    importFn: () => Promise<{ default: ComponentType<any> }>;
  }>
): Promise<void> => {
  const preloadPromises = components.map(({ name, importFn }) =>
    loadingOptimizer.loadComponent(importFn, name).catch(error => {
      console.warn(`Failed to preload ${name}:`, error);
      return null;
    })
  );

  await Promise.allSettled(preloadPromises);
};

/**
 * Smart preloader that preloads based on user behavior
 */
export const useSmartPreloader = (
  components: Array<{
    name: string;
    importFn: () => Promise<{ default: ComponentType<any> }>;
    trigger: 'hover' | 'scroll' | 'idle';
    element?: string;
  }>
) => {
  useEffect(() => {
    const preloadOnHover = (componentName: string, _importFn: () => Promise<{ default: ComponentType<any> }>) => {
      let hoverTimer: NodeJS.Timeout;
      
      const handleMouseEnter = () => {
        hoverTimer = setTimeout(() => {
          performanceManager.preloadComponent(componentName).catch(console.warn);
        }, 500);
      };
      
      const handleMouseLeave = () => {
        clearTimeout(hoverTimer);
      };
      
      return { handleMouseEnter, handleMouseLeave };
    };

    const preloadOnIdle = (componentName: string, _importFn: () => Promise<{ default: ComponentType<any> }>) => {
      const idleTimer = setTimeout(() => {
        performanceManager.preloadComponent(componentName).catch(console.warn);
      }, 2000);
      
      return () => clearTimeout(idleTimer);
    };

    const cleanupFunctions: Array<() => void> = [];

    components.forEach(({ name, importFn, trigger, element }) => {
      switch (trigger) {
        case 'hover':
          if (element) {
            const targetElement = document.querySelector(element);
            if (targetElement) {
              const { handleMouseEnter, handleMouseLeave } = preloadOnHover(name, importFn);
              targetElement.addEventListener('mouseenter', handleMouseEnter);
              targetElement.addEventListener('mouseleave', handleMouseLeave);
              
              cleanupFunctions.push(() => {
                targetElement.removeEventListener('mouseenter', handleMouseEnter);
                targetElement.removeEventListener('mouseleave', handleMouseLeave);
              });
            }
          }
          break;
          
        case 'idle':
          const cleanup = preloadOnIdle(name, importFn);
          cleanupFunctions.push(cleanup);
          break;
          
        case 'scroll':
          // Implement scroll-based preloading
          const handleScroll = () => {
            if (window.scrollY > 100) {
              performanceManager.preloadComponent(name).catch(console.warn);
              window.removeEventListener('scroll', handleScroll);
            }
          };
          
          window.addEventListener('scroll', handleScroll);
          cleanupFunctions.push(() => window.removeEventListener('scroll', handleScroll));
          break;
      }
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [components]);
};

export default LazyComponentLoader;