# Component Loading System

A comprehensive, production-ready component loading system that provides reliable component loading with fallback mechanisms, automatic retries, and performance tracking.

## Features

### ✨ Core Features
- **Reliable Component Loading**: Robust loading with automatic retry mechanisms
- **Fallback System**: Comprehensive fallback components for different scenarios
- **Performance Tracking**: Built-in performance monitoring and statistics
- **Preloading**: Smart preloading for critical components
- **Error Recovery**: Graceful error handling and recovery strategies
- **Configuration**: Flexible configuration options

### 🎯 Key Benefits
- **Application Stability**: Prevents crashes from failed component loads
- **User Experience**: Smooth loading states and helpful error messages
- **Performance**: Optimized loading with preloading and caching
- **Developer Experience**: Easy to use API with comprehensive TypeScript support
- **Production Ready**: Thoroughly tested with comprehensive error handling

## Quick Start

### Basic Usage

```typescript
import { ComponentLoadingManager, ComponentRegistration } from '@/services/ComponentLoadingManager';
import { ComponentFallbacks } from '@/components/loading/ComponentFallbacks';

// Get manager instance
const manager = ComponentLoadingManager.getInstance();

// Register a component
const registration: ComponentRegistration = {
  name: 'MyComponent',
  importFn: () => import('./MyComponent'),
  critical: false,
  fallback: ComponentFallbacks.Loading
};

manager.registerComponent(registration);

// Load the component
const result = await manager.loadComponent('MyComponent');
if (result.success) {
  // Use result.component
} else {
  // Handle fallback: result.component contains fallback
}
```

### React Integration

```typescript
import React, { Suspense } from 'react';

// Create lazy component
const LazyComponent = manager.createLazyComponent('MyComponent');

// Use in React
function App() {
  return (
    <Suspense fallback={<ComponentFallbacks.Loading componentName="MyComponent" />}>
      <LazyComponent />
    </Suspense>
  );
}
```

## Component Registration

### Registration Options

```typescript
interface ComponentRegistration {
  name: string;                    // Unique component name
  importFn: () => Promise<any>;    // Import function
  critical: boolean;               // Whether to preload automatically
  fallback?: ComponentType<any>;   // Custom fallback component
  preloadTrigger?: 'immediate' | 'hover' | 'scroll' | 'idle';
  dependencies?: string[];         // Component dependencies
}
```

### Examples

```typescript
// Basic component
manager.registerComponent({
  name: 'UserProfile',
  importFn: () => import('./components/UserProfile'),
  critical: false
});

// Critical component with immediate preloading
manager.registerComponent({
  name: 'Dashboard',
  importFn: () => import('./components/Dashboard'),
  critical: true,
  preloadTrigger: 'immediate',
  fallback: ComponentFallbacks.Dashboard
});

// Component with custom fallback
manager.registerComponent({
  name: 'AdminPanel',
  importFn: () => import('./components/AdminPanel'),
  critical: false,
  fallback: ComponentFallbacks.AdminPanel
});
```

## Fallback Components

### Available Fallbacks

The system provides comprehensive fallback components for different scenarios:

```typescript
import { ComponentFallbacks } from '@/components/loading/ComponentFallbacks';

// Generic fallbacks
ComponentFallbacks.Loading      // Loading spinner
ComponentFallbacks.Error        // Error message with retry
ComponentFallbacks.Minimal      // Minimal error display
ComponentFallbacks.Skeleton     // Skeleton loading animation

// Specific fallbacks
ComponentFallbacks.Dashboard     // Dashboard unavailable
ComponentFallbacks.CourseContent // Course content unavailable
ComponentFallbacks.AdminPanel   // Admin panel unavailable
ComponentFallbacks.UserProfile  // User profile unavailable
ComponentFallbacks.Form         // Form unavailable
ComponentFallbacks.List         // List/table unavailable
```

### Custom Fallbacks

```typescript
// Create custom fallback
const CustomFallback: React.FC<FallbackProps> = ({ error, retry, componentName }) => (
  <div className="custom-fallback">
    <h3>Oops! {componentName} failed to load</h3>
    {error && <p>Error: {error.message}</p>}
    {retry && <button onClick={retry}>Try Again</button>}
  </div>
);

// Register custom fallback
manager.registerFallback('MyComponent', CustomFallback);
```

## Configuration

### Default Configuration

```typescript
const DEFAULT_CONFIG = {
  preloadCritical: true,        // Preload critical components
  enableRetry: true,            // Enable automatic retries
  maxRetries: 3,                // Maximum retry attempts
  retryDelay: 1000,             // Base retry delay (ms)
  enableFallbacks: true,        // Enable fallback components
  timeout: 10000,               // Loading timeout (ms)
  enablePerformanceTracking: true // Track performance metrics
};
```

### Custom Configuration

```typescript
manager.updateConfig({
  maxRetries: 5,
  retryDelay: 2000,
  timeout: 15000,
  enablePerformanceTracking: true
});
```

## Preloading

### Automatic Preloading

Critical components are automatically preloaded:

```typescript
// This component will be preloaded automatically
manager.registerComponent({
  name: 'CriticalComponent',
  importFn: () => import('./CriticalComponent'),
  critical: true,
  preloadTrigger: 'immediate'
});
```

### Manual Preloading

```typescript
// Preload specific component
await manager.preloadComponent('UserProfile');

// Preload components for a context
await manager.preloadForContext('dashboard', [
  'DashboardStats',
  'UserProfile',
  'RecentActivity'
]);

// Check if preloaded
const isPreloaded = manager.isPreloaded('UserProfile');
```

### Preload Triggers

```typescript
// Different preload triggers
manager.registerComponent({
  name: 'Component1',
  importFn: () => import('./Component1'),
  preloadTrigger: 'immediate'  // Load immediately
});

manager.registerComponent({
  name: 'Component2',
  importFn: () => import('./Component2'),
  preloadTrigger: 'idle'       // Load when browser is idle
});

manager.registerComponent({
  name: 'Component3',
  importFn: () => import('./Component3'),
  preloadTrigger: 'scroll'     // Load when user scrolls
});
```

## Error Handling

### Retry Mechanism

The system automatically retries failed loads with exponential backoff:

```typescript
// Configure retry behavior
manager.updateConfig({
  enableRetry: true,
  maxRetries: 3,
  retryDelay: 1000  // Base delay, increases exponentially
});
```

### Error Recovery Strategies

1. **Automatic Retry**: For transient network/loading issues
2. **Fallback Components**: For failed component loads
3. **Graceful Degradation**: For non-critical feature failures
4. **User Guidance**: For errors requiring user action

### Error Types

```typescript
// Network errors
manager.registerComponent({
  name: 'NetworkComponent',
  importFn: () => import('./NetworkComponent'),
  fallback: ComponentFallbacks.Error  // Shows retry options
});

// Permission errors
manager.registerComponent({
  name: 'AdminComponent',
  importFn: () => import('./AdminComponent'),
  fallback: ComponentFallbacks.AdminPanel  // Shows permission message
});
```

## Performance Monitoring

### Loading Statistics

```typescript
const stats = manager.getLoadingStats();
console.log({
  totalComponents: stats.totalComponents,
  preloadedComponents: stats.preloadedComponents,
  failedComponents: stats.failedComponents,
  criticalComponents: stats.criticalComponents,
  averageLoadTime: stats.averageLoadTime
});
```

### Loading States

```typescript
// Get loading state for specific component
const state = manager.getLoadingState('MyComponent');
console.log({
  isLoading: state.isLoading,
  progress: state.progress,
  retryCount: state.retryCount,
  preloaded: state.preloaded,
  loadTime: state.loadTime
});

// Get all loading states
const allStates = manager.getAllLoadingStates();
```

### Performance Tracking

```typescript
// Enable performance tracking
manager.updateConfig({
  enablePerformanceTracking: true
});

// Performance data is automatically collected
const result = await manager.loadComponent('MyComponent');
console.log(`Load time: ${result.loadTime}ms`);
console.log(`Retries: ${result.retryCount}`);
```

## Advanced Usage

### Component Dependencies

```typescript
// Register component with dependencies
manager.registerComponent({
  name: 'ComplexComponent',
  importFn: () => import('./ComplexComponent'),
  dependencies: ['BaseComponent', 'UtilityComponent'],
  critical: false
});
```

### Lazy Component Creation

```typescript
// Create lazy component for React
const LazyUserProfile = manager.createLazyComponent('UserProfile');

// Use in component
function UserPage() {
  return (
    <Suspense fallback={<ComponentFallbacks.Loading componentName="UserProfile" />}>
      <LazyUserProfile />
    </Suspense>
  );
}
```

### Cache Management

```typescript
// Clear all caches
manager.clearCache();

// Get current configuration
const config = manager.getConfig();

// Update configuration
manager.updateConfig({
  timeout: 5000,
  maxRetries: 2
});
```

## Best Practices

### 1. Component Registration

```typescript
// ✅ Good: Register components early in app initialization
const initializeComponents = () => {
  const components = [
    { name: 'Dashboard', path: './Dashboard', critical: true },
    { name: 'UserProfile', path: './UserProfile', critical: false },
    { name: 'Settings', path: './Settings', critical: false }
  ];

  components.forEach(comp => {
    manager.registerComponent({
      name: comp.name,
      importFn: () => import(comp.path),
      critical: comp.critical,
      fallback: ComponentFallbacks.Loading
    });
  });
};
```

### 2. Fallback Selection

```typescript
// ✅ Good: Use appropriate fallbacks for different components
manager.registerComponent({
  name: 'AdminDashboard',
  importFn: () => import('./AdminDashboard'),
  fallback: ComponentFallbacks.AdminPanel  // Specific fallback
});

manager.registerComponent({
  name: 'CourseViewer',
  importFn: () => import('./CourseViewer'),
  fallback: ComponentFallbacks.CourseContent  // Specific fallback
});
```

### 3. Critical Component Identification

```typescript
// ✅ Good: Mark truly critical components
const criticalComponents = [
  'AppHeader',
  'Navigation',
  'ErrorBoundary',
  'AuthProvider'
];

criticalComponents.forEach(name => {
  manager.registerComponent({
    name,
    importFn: () => import(`./components/${name}`),
    critical: true,
    preloadTrigger: 'immediate'
  });
});
```

### 4. Error Handling

```typescript
// ✅ Good: Handle loading results properly
const loadComponent = async (name: string) => {
  try {
    const result = await manager.loadComponent(name);
    
    if (result.success) {
      return result.component;
    } else {
      // Log error for monitoring
      console.warn(`Component ${name} failed to load:`, result.error);
      return result.component; // Fallback component
    }
  } catch (error) {
    console.error(`Critical error loading ${name}:`, error);
    return ComponentFallbacks.Error;
  }
};
```

## Testing

The system includes comprehensive tests:

```bash
# Run component loading manager tests
npm test src/services/__tests__/ComponentLoadingManager.test.ts

# Run fallback component tests
npm test src/components/loading/__tests__/ComponentFallbacks.test.tsx

# Run integration tests
npm test src/test/integration/ComponentLoadingSystem.test.tsx
```

## API Reference

### ComponentLoadingManager

#### Methods

- `registerComponent(registration: ComponentRegistration): void`
- `loadComponent<T>(componentName: string): Promise<LoadingResult<T>>`
- `preloadComponent(componentName: string): Promise<boolean>`
- `preloadCriticalComponents(): Promise<void>`
- `preloadForContext(context: string, componentNames: string[]): Promise<void>`
- `createLazyComponent<T>(componentName: string): ComponentType<any>`
- `registerFallback(componentName: string, fallback: ComponentType<any>): void`
- `getLoadingState(componentName: string): ComponentLoadingState | null`
- `getAllLoadingStates(): Map<string, ComponentLoadingState>`
- `getLoadingStats(): LoadingStats`
- `isPreloaded(componentName: string): boolean`
- `clearCache(): void`
- `updateConfig(newConfig: Partial<ComponentLoadingConfig>): void`
- `getConfig(): ComponentLoadingConfig`

#### Types

```typescript
interface LoadingResult<T = ComponentType<any>> {
  success: boolean;
  component?: T;
  fallbackUsed: boolean;
  loadTime: number;
  retryCount: number;
  error?: Error;
}

interface ComponentLoadingState {
  componentName: string;
  isLoading: boolean;
  progress: number;
  retryCount: number;
  lastError?: Error;
  fallbackActive: boolean;
  loadTime?: number;
  preloaded: boolean;
}
```

## Troubleshooting

### Common Issues

1. **Component not loading**
   - Check if component is registered
   - Verify import path is correct
   - Check network connectivity

2. **Fallback not showing**
   - Ensure fallbacks are enabled in config
   - Verify fallback component is registered
   - Check for JavaScript errors

3. **Performance issues**
   - Enable performance tracking
   - Check loading statistics
   - Consider preloading critical components

4. **Memory leaks**
   - Clear cache periodically
   - Avoid registering too many components
   - Monitor loading states

### Debug Mode

```typescript
// Enable debug logging
manager.updateConfig({
  enablePerformanceTracking: true
});

// Monitor loading states
setInterval(() => {
  const stats = manager.getLoadingStats();
  console.log('Loading stats:', stats);
}, 5000);
```

## Contributing

When contributing to the component loading system:

1. Add comprehensive tests for new features
2. Update documentation for API changes
3. Follow TypeScript best practices
4. Ensure backward compatibility
5. Test with different network conditions

## License

This component loading system is part of the application stability fixes and follows the same license as the main project.