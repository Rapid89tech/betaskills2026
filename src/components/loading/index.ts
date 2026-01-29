// Loading State Manager
export { loadingStateManager } from '@/utils/LoadingStateManager';
export type { LoadingState, SkeletonConfig } from '@/utils/LoadingStateManager';

// Hooks
export {
  useLoadingState,
  useSkeletonState,
  useGlobalLoading,
  useBatchLoading
} from '@/hooks/useLoadingState';

// Components
export { default as UnifiedLoadingComponent } from './UnifiedLoadingComponent';
export { default as ProgressiveLoadingIndicator } from './ProgressiveLoadingIndicator';
export { default as LoadingStatesDemo } from './LoadingStatesDemo';

// Skeleton Components
export { default as EnhancedDashboardSkeleton } from '@/components/skeletons/EnhancedDashboardSkeleton';
export { default as EnhancedCourseSkeleton } from '@/components/skeletons/EnhancedCourseSkeleton';
export { default as EnrollmentSkeleton } from '@/components/skeletons/EnrollmentSkeleton';

// Legacy Loading Components (for backward compatibility)
export { default as LoadingSpinner } from '@/components/LoadingSpinner';
export { default as EnhancedLoadingSpinner } from '@/components/EnhancedLoadingSpinner';
export { default as SmoothLoadingSpinner } from '@/components/SmoothLoadingSpinner';