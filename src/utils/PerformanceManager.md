# PerformanceManager Documentation

## Overview

The PerformanceManager is a unified utility for handling component loading, asset optimization, performance monitoring, and preloading mechanisms in the React application. It provides a comprehensive solution for improving application performance and user experience.

## Features

### 1. Component Loading and Caching
- Dynamic component loading with performance tracking
- Component caching to avoid redundant loads
- Lazy component creation with error handling
- Preloading mechanism for critical components

### 2. Performance Monitoring
- Page load time measurement
- User interaction tracking
- Component render performance monitoring
- Performance metrics collection and analysis

### 3. Asset Optimization
- Font preloading for critical fonts
- Resource hints for external domains
- Image lazy loading optimization
- DNS prefetching for better loading

### 4. Smart Preloading
- Critical component identification and preloading
- Hover-based preloading for better UX
- Route-based component preloading
- Configurable preloading thresholds

## Usage

### Basic Setup

```typescript
import { performanceManager } from './utils/PerformanceManager';
import { initializeAllPerformanceFeatures } from './utils/performanceInit';

// Initialize in your main App component
useEffect(() => {
  initializeAllPerformanceFeatures();
}, []);
```

### Using React Hooks

```typescript
import { usePerformanceManager, usePagePerformance } from './hooks/usePerformanceManager';

const MyComponent = () => {
  const {
    loadComponent,
    preloadComponent,
    trackInteraction,
    isLoading
  } = usePerformanceManager({
    trackMount: true,
    trackInteractions: true,
    preloadComponents: ['AdminDashboard'],
    componentName: 'MyComponent'
  });

  const { trackInteraction: trackPageInteraction } = usePagePerformance('my-page');

  // Use the hooks in your component logic
};
```

### Creating Performance-Aware Lazy Components

```typescript
import { createPreloadableLazyComponent } from './utils/lazyComponents';

const LazyAdminDashboard = createPreloadableLazyComponent(
  () => import('../components/admin/AdminDashboard'),
  'AdminDashboard',
  true // Preload this component
);
```

### Manual Performance Tracking

```typescript
// Track user interactions
performanceManager.trackUserInteraction('button-click', 'submit-form');

// Measure page loads
performanceManager.measurePageLoad('dashboard');

// Load components dynamically
const component = await performanceManager.loadComponent('AdminDashboard');

// Preload components
await performanceManager.preloadComponent('CourseVideoLearning');
```

## Configuration

### Environment-Based Configuration

The PerformanceManager automatically adjusts its behavior based on the environment:

- **Development**: Full logging, performance monitoring enabled, debug tools available
- **Production**: Optimized for performance, minimal logging, asset optimization enabled

### Manual Configuration

```typescript
// Enable/disable performance manager
performanceManager.setEnabled(true);

// Add critical components for preloading
performanceManager.addCriticalComponent('ImportantComponent');

// Configure asset optimization
performanceManager.optimizeAssets();
```

## Performance Monitoring

### Available Metrics

- **Component Load Times**: Time taken to load and render components
- **Page Load Performance**: Full page load metrics including paint times
- **User Interaction Delays**: Time between user actions and UI responses
- **Cache Hit Rates**: Efficiency of component caching
- **Memory Usage**: JavaScript heap usage monitoring (when available)

### Accessing Performance Data

```typescript
// Get comprehensive performance summary
const summary = performanceManager.getPerformanceSummary();

// Access specific metrics
const {
  componentCache,
  preloadedComponents,
  performanceMetrics
} = summary;
```

## Development Tools

### Performance Monitor Component

In development mode, a visual performance monitor is available:

```typescript
import PerformanceMonitor from './components/PerformanceMonitor';

// Add to your app (automatically shown only in development)
<PerformanceMonitor />
```

### Browser Console Tools

In development, additional tools are available in the browser console:

```javascript
// Verify PerformanceManager functionality
window.verifyPerformanceManager();

// Access PerformanceManager directly
window.performanceManager.getPerformanceSummary();
```

## Best Practices

### 1. Component Preloading
- Identify critical components that users are likely to need
- Use hover-based preloading for navigation elements
- Preload components based on user behavior patterns

### 2. Performance Tracking
- Track meaningful user interactions, not every mouse movement
- Use descriptive names for performance measurements
- Monitor performance trends over time

### 3. Asset Optimization
- Preload critical fonts and resources
- Use appropriate loading strategies for different asset types
- Monitor and optimize bundle sizes regularly

### 4. Error Handling
- Always provide fallback components for lazy loading failures
- Handle network errors gracefully
- Provide user-friendly error messages with recovery options

## Integration with Existing Code

### Updating Existing Lazy Components

```typescript
// Before
const LazyComponent = lazy(() => import('./Component'));

// After
const LazyComponent = createPreloadableLazyComponent(
  () => import('./Component'),
  'Component',
  false // Set to true for critical components
);
```

### Adding Performance Tracking to Components

```typescript
// Add performance tracking to existing components
const ExistingComponent = () => {
  const { trackInteraction } = usePerformanceManager({
    componentName: 'ExistingComponent'
  });

  const handleClick = () => {
    trackInteraction('button-click');
    // existing click logic
  };

  // rest of component
};
```

## Troubleshooting

### Common Issues

1. **Performance Manager Not Enabled**
   - Check localStorage for 'enablePerformanceManager' setting
   - Verify environment configuration
   - Use `performanceManager.setEnabled(true)` to force enable

2. **Components Not Preloading**
   - Verify component names match the import map
   - Check network connectivity
   - Review browser console for error messages

3. **Performance Metrics Not Updating**
   - Ensure performance monitoring is enabled
   - Check if Performance API is available in the browser
   - Verify component names are correctly specified

### Debug Mode

Enable debug mode for detailed logging:

```typescript
// In development
localStorage.setItem('enablePerformanceManager', 'true');
localStorage.setItem('enablePerformanceTracking', 'true');
```

## API Reference

### PerformanceManager Class

#### Methods

- `loadComponent(componentName: string): Promise<ComponentType<any>>`
- `preloadComponent(componentName: string): Promise<void>`
- `createLazyComponent<T>(importFn: Function, componentName: string): T`
- `trackUserInteraction(action: string, element?: string): void`
- `measurePageLoad(pageName: string): void`
- `optimizeAssets(): void`
- `getPerformanceSummary(): PerformanceSummary`
- `clearCache(): void`
- `setEnabled(enabled: boolean): void`
- `addCriticalComponent(componentName: string): void`
- `removeCriticalComponent(componentName: string): void`

### React Hooks

#### usePerformanceManager(options)

Options:
- `trackMount?: boolean` - Track component mount/unmount
- `trackInteractions?: boolean` - Track user interactions
- `preloadComponents?: string[]` - Components to preload on mount
- `componentName?: string` - Name for tracking purposes

Returns:
- `loadComponent: (name: string) => Promise<ComponentType>`
- `preloadComponent: (name: string) => Promise<void>`
- `trackInteraction: (action: string, element?: string) => void`
- `measurePageLoad: (pageName: string) => void`
- `isLoading: boolean`
- `performanceSummary: PerformanceSummary`

#### usePagePerformance(pageName)

Automatically tracks page performance metrics.

#### useComponentPerformance(componentName)

Monitors component render performance.

Returns:
- `renderCount: number`
- `lastRenderTime: number | null`

## Examples

See `src/components/examples/PerformanceAwareComponent.tsx` for a comprehensive example of how to use all PerformanceManager features in a React component.