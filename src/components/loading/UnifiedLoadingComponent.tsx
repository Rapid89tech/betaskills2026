import React, { useEffect, useState } from 'react';
import { loadingStateManager, LoadingState, SkeletonConfig } from '@/utils/LoadingStateManager';
import LoadingSpinner from '@/components/LoadingSpinner';
import EnhancedLoadingSpinner from '@/components/EnhancedLoadingSpinner';
import EnhancedDashboardSkeleton from '@/components/skeletons/EnhancedDashboardSkeleton';
import EnhancedCourseSkeleton from '@/components/skeletons/EnhancedCourseSkeleton';
import EnrollmentSkeleton from '@/components/skeletons/EnrollmentSkeleton';

interface UnifiedLoadingComponentProps {
  componentId: string;
  fallbackType?: 'spinner' | 'enhanced' | 'skeleton';
  skeletonType?: SkeletonConfig['type'];
  skeletonVariant?: SkeletonConfig['variant'];
  children?: React.ReactNode;
  className?: string;
}

const UnifiedLoadingComponent: React.FC<UnifiedLoadingComponentProps> = ({
  componentId,
  fallbackType = 'spinner',
  skeletonType = 'dashboard',
  skeletonVariant = 'default',
  children,
  className = ''
}) => {
  const [loadingState, setLoadingState] = useState<LoadingState>({ isLoading: false });

  useEffect(() => {
    // Subscribe to loading state changes for this component
    const unsubscribe = loadingStateManager.subscribe(componentId, setLoadingState);
    
    // Get initial state
    const initialState = loadingStateManager.getComponentLoading(componentId);
    setLoadingState(initialState);

    return unsubscribe;
  }, [componentId]);

  // If not loading, render children
  if (!loadingState.isLoading) {
    return <>{children}</>;
  }

  // Render appropriate loading component based on type
  const renderLoadingComponent = () => {
    switch (loadingState.type) {
      case 'skeleton':
        return renderSkeletonComponent();
      case 'progress':
        return (
          <EnhancedLoadingSpinner
            message={loadingState.message}
            showProgress={true}
          />
        );
      case 'spinner':
      default:
        if (fallbackType === 'enhanced') {
          return (
            <EnhancedLoadingSpinner
              message={loadingState.message}
              showProgress={false}
            />
          );
        }
        return (
          <LoadingSpinner
            text={loadingState.message}
            className={className}
          />
        );
    }
  };

  const renderSkeletonComponent = () => {
    switch (skeletonType) {
      case 'dashboard':
        return (
          <EnhancedDashboardSkeleton
            variant={skeletonVariant as 'student' | 'admin' | 'instructor'}
            animated={true}
          />
        );
      case 'courses':
        return (
          <EnhancedCourseSkeleton
            variant={skeletonVariant as 'grid' | 'detail' | 'content'}
            animated={true}
          />
        );
      case 'enrollment':
        return (
          <EnrollmentSkeleton
            variant={skeletonVariant as 'form' | 'status' | 'list'}
            animated={true}
          />
        );
      case 'admin':
        return (
          <EnhancedDashboardSkeleton
            variant="admin"
            animated={true}
          />
        );
      case 'course-content':
        return (
          <EnhancedCourseSkeleton
            variant="content"
            animated={true}
          />
        );
      default:
        return (
          <EnhancedLoadingSpinner
            message={loadingState.message || 'Loading...'}
            showProgress={false}
          />
        );
    }
  };

  return (
    <div className={`unified-loading-component ${className}`}>
      {renderLoadingComponent()}
    </div>
  );
};

export default UnifiedLoadingComponent;