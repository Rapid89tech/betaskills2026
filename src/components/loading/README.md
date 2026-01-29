# Loading States and Skeleton Screens System

This document describes the comprehensive loading states and skeleton screens system implemented for the application.

## Overview

The loading system provides:
- **Centralized Loading State Management**: Single source of truth for all loading states
- **Skeleton Screens**: Realistic placeholders that match actual content structure
- **Progressive Loading**: Step-by-step loading indicators for complex operations
- **Unified Components**: Consistent loading experience across the application

## Core Components

### 1. LoadingStateManager

Central utility for managing all loading states in the application.

```typescript
import { loadingStateManager } from '@/utils/LoadingStateManager';

// Set component loading
loadingStateManager.setComponentLoading('dashboard', true, 'Loading dashboard...');

// Show progress
loadingStateManager.showProgress('upload', 75, 'Uploading files...');

// Show skeleton
loadingStateManager.showSkeleton('courses', 'grid');
```

### 2. React Hooks

#### useLoadingState
```typescript
import { useLoadingState } from '@/hooks/useLoadingState';

const MyComponent = () => {
  const { setLoading, withLoading, withProgress } = useLoadingState('my-component');
  
  const handleAsyncOperation = async () => {
    const result = await withLoading(
      () => fetchData(),
      'Loading data...'
    );
  };
};
```

#### useSkeletonState
```typescript
import { useSkeletonState } from '@/hooks/useLoadingState';

const { showSkeleton, hideSkeleton } = useSkeletonState();

// Show skeleton
showSkeleton('dashboard', 'student');

// Hide skeleton
hideSkeleton('dashboard');
```

### 3. UnifiedLoadingComponent

Wrapper component that automatically handles loading states and skeleton screens.

```typescript
import { UnifiedLoadingComponent } from '@/components/loading';

<UnifiedLoadingComponent
  componentId="dashboard"
  fallbackType="skeleton"
  skeletonType="dashboard"
  skeletonVariant="student"
>
  <DashboardContent />
</UnifiedLoadingComponent>
```

## Skeleton Screen Types

### Dashboard Skeletons
- **Student Dashboard**: Course cards, stats, recent activity
- **Admin Dashboard**: User lists, enrollment tables, statistics
- **Instructor Dashboard**: Course management, student progress

```typescript
<EnhancedDashboardSkeleton
  variant="student" // 'student' | 'admin' | 'instructor'
  animated={true}
/>
```

### Course Skeletons
- **Grid View**: Course cards in grid layout
- **Detail View**: Course detail page with sidebar
- **Content View**: Course content with video player

```typescript
<EnhancedCourseSkeleton
  variant="grid" // 'grid' | 'detail' | 'content'
  animated={true}
  count={6}
/>
```

### Enrollment Skeletons
- **Form View**: Enrollment form with fields
- **Status View**: Enrollment status with timeline
- **List View**: List of enrollments

```typescript
<EnrollmentSkeleton
  variant="form" // 'form' | 'status' | 'list'
  animated={true}
  count={5}
/>
```

## Progressive Loading

For complex operations that involve multiple steps:

```typescript
import { ProgressiveLoadingIndicator } from '@/components/loading';

const steps = [
  { id: 'auth', label: 'Authenticating user', status: 'pending' },
  { id: 'data', label: 'Loading course data', status: 'pending' },
  { id: 'ui', label: 'Rendering interface', status: 'pending' }
];

<ProgressiveLoadingIndicator
  steps={steps}
  showProgress={true}
  onAllComplete={() => console.log('All steps completed!')}
/>
```

## Integration Examples

### Basic Loading State
```typescript
const MyComponent = () => {
  const { setLoading, isLoading } = useLoadingState('my-component');
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true, 'Loading data...');
      try {
        await fetchData();
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  if (isLoading) {
    return <LoadingSpinner text="Loading..." />;
  }
  
  return <div>Content</div>;
};
```

### With Skeleton Screen
```typescript
const MyComponent = () => {
  const [data, setData] = useState(null);
  const { setLoading } = useLoadingState('my-component');
  
  useEffect(() => {
    setLoading(true);
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);
  
  return (
    <UnifiedLoadingComponent
      componentId="my-component"
      fallbackType="skeleton"
      skeletonType="courses"
      skeletonVariant="grid"
    >
      <CourseGrid data={data} />
    </UnifiedLoadingComponent>
  );
};
```

### Progress Tracking
```typescript
const UploadComponent = () => {
  const { withProgress } = useLoadingState('upload');
  
  const handleUpload = async () => {
    await withProgress(async (updateProgress) => {
      for (let i = 0; i <= 100; i += 10) {
        updateProgress(i, `Uploading... ${i}%`);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }, 'Starting upload...');
  };
  
  return <button onClick={handleUpload}>Upload Files</button>;
};
```

## Best Practices

### 1. Use Appropriate Loading Types
- **Spinner**: Quick operations (< 2 seconds)
- **Skeleton**: Content loading that matches layout
- **Progress**: Long operations with measurable progress

### 2. Provide Meaningful Messages
```typescript
// Good
setLoading(true, 'Loading course content...');

// Bad
setLoading(true, 'Loading...');
```

### 3. Handle Errors Gracefully
```typescript
const { withLoading } = useLoadingState('component');

try {
  await withLoading(riskyOperation, 'Processing...');
} catch (error) {
  // Handle error appropriately
  showErrorMessage(error.message);
}
```

### 4. Use Skeleton Screens for Better UX
Skeleton screens provide better perceived performance than spinners for content loading.

### 5. Batch Loading States
For multiple related operations:
```typescript
const { batchUpdate } = useBatchLoading();

batchUpdate([
  { componentId: 'header', isLoading: true, message: 'Loading header...' },
  { componentId: 'sidebar', isLoading: true, message: 'Loading navigation...' },
  { componentId: 'content', isLoading: true, message: 'Loading content...' }
]);
```

## Performance Considerations

1. **Lazy Loading**: Skeleton components are optimized for performance
2. **Animation Control**: Animations can be disabled for better performance
3. **Memory Management**: Loading states are automatically cleaned up
4. **Debouncing**: Rapid loading state changes are debounced

## Accessibility

- All loading components include proper ARIA labels
- Screen readers announce loading state changes
- Keyboard navigation is preserved during loading
- Color contrast meets WCAG guidelines

## Testing

The system includes comprehensive test utilities:

```typescript
import { loadingStateManager } from '@/utils/LoadingStateManager';

// Test loading states
expect(loadingStateManager.getComponentLoading('test')).toEqual({
  isLoading: false
});

// Test skeleton visibility
loadingStateManager.showSkeleton('dashboard', 'student');
expect(loadingStateManager.getSkeletonConfig('dashboard')).toBeTruthy();
```

## Migration Guide

### From Old Loading Components

```typescript
// Old way
{loading && <LoadingSpinner />}
{!loading && <Content />}

// New way
<UnifiedLoadingComponent componentId="content" fallbackType="spinner">
  <Content />
</UnifiedLoadingComponent>
```

### From Manual State Management

```typescript
// Old way
const [loading, setLoading] = useState(false);

// New way
const { setLoading, isLoading } = useLoadingState('component');
```

This system provides a comprehensive, performant, and accessible solution for managing loading states throughout the application.