import React, { useState } from 'react';
import { useLoadingState, useSkeletonState, useGlobalLoading } from '@/hooks/useLoadingState';
import UnifiedLoadingComponent from '@/components/loading/UnifiedLoadingComponent';
import ProgressiveLoadingIndicator from '@/components/loading/ProgressiveLoadingIndicator';
import { Button } from '@/components/ui/button';

/**
 * Demo component showcasing all loading states and skeleton screens
 * This component is for development and testing purposes
 */
const LoadingStatesDemo: React.FC = () => {
  const { setLoading: setDashboardLoading, withLoading, withProgress } = useLoadingState('dashboard-demo');
  const { setLoading: setCoursesLoading } = useLoadingState('courses-demo');
  const { setLoading: setEnrollmentLoading } = useLoadingState('enrollment-demo');
  const { showSkeleton, hideSkeleton } = useSkeletonState();
  const { setGlobalLoading } = useGlobalLoading();

  const [progressSteps, setProgressSteps] = useState([
    { id: 'auth', label: 'Authenticating user', status: 'pending' as const },
    { id: 'data', label: 'Loading course data', status: 'pending' as const },
    { id: 'enrollment', label: 'Checking enrollments', status: 'pending' as const },
    { id: 'ui', label: 'Rendering interface', status: 'pending' as const }
  ]);

  const simulateProgressiveLoading = async () => {
    const steps = [...progressSteps];
    
    for (let i = 0; i < steps.length; i++) {
      // Set current step to loading
      steps[i].status = 'loading';
      setProgressSteps([...steps]);
      
      // Simulate loading with progress
      for (let progress = 0; progress <= 100; progress += 20) {
        steps[i].progress = progress;
        setProgressSteps([...steps]);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Mark as completed
      steps[i].status = 'completed';
      setProgressSteps([...steps]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const simulateAsyncOperation = async () => {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve('Operation completed!'), 2000);
    });
  };

  const simulateProgressOperation = async (updateProgress: (progress: number, message?: string) => void) => {
    const steps = ['Initializing...', 'Processing data...', 'Finalizing...'];
    
    for (let i = 0; i < steps.length; i++) {
      const progress = ((i + 1) / steps.length) * 100;
      updateProgress(progress, steps[i]);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return 'Progress operation completed!';
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Loading States Demo</h1>
        <p className="text-gray-600">Demonstration of all loading states and skeleton screens</p>
      </div>

      {/* Basic Loading Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Basic Loading States</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => setDashboardLoading(true, 'Loading dashboard...')}
            variant="outline"
          >
            Start Dashboard Loading
          </Button>
          <Button
            onClick={() => setDashboardLoading(false)}
            variant="outline"
          >
            Stop Dashboard Loading
          </Button>
          <Button
            onClick={() => setCoursesLoading(true, 'Loading courses...')}
            variant="outline"
          >
            Start Courses Loading
          </Button>
          <Button
            onClick={() => setCoursesLoading(false)}
            variant="outline"
          >
            Stop Courses Loading
          </Button>
        </div>
      </div>

      {/* Skeleton Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Skeleton Screens</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Button
            onClick={() => showSkeleton('dashboard', 'student')}
            variant="outline"
          >
            Show Dashboard Skeleton
          </Button>
          <Button
            onClick={() => showSkeleton('courses', 'grid')}
            variant="outline"
          >
            Show Courses Skeleton
          </Button>
          <Button
            onClick={() => showSkeleton('enrollment', 'form')}
            variant="outline"
          >
            Show Enrollment Skeleton
          </Button>
          <Button
            onClick={() => hideSkeleton('dashboard')}
            variant="outline"
          >
            Hide Dashboard Skeleton
          </Button>
          <Button
            onClick={() => hideSkeleton('courses')}
            variant="outline"
          >
            Hide Courses Skeleton
          </Button>
          <Button
            onClick={() => hideSkeleton('enrollment')}
            variant="outline"
          >
            Hide Enrollment Skeleton
          </Button>
        </div>
      </div>

      {/* Advanced Loading Operations */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Advanced Loading Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={async () => {
              const result = await withLoading(simulateAsyncOperation, 'Processing request...');
              alert(result);
            }}
            variant="outline"
          >
            With Loading Wrapper
          </Button>
          <Button
            onClick={async () => {
              const result = await withProgress(simulateProgressOperation, 'Starting operation...');
              alert(result);
            }}
            variant="outline"
          >
            With Progress Wrapper
          </Button>
          <Button
            onClick={() => setGlobalLoading(true, 'Global operation in progress...', 50)}
            variant="outline"
          >
            Set Global Loading
          </Button>
        </div>
      </div>

      {/* Progressive Loading Demo */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Progressive Loading Indicator</h2>
        <div className="mb-4">
          <Button
            onClick={simulateProgressiveLoading}
            variant="outline"
          >
            Simulate Progressive Loading
          </Button>
        </div>
        <ProgressiveLoadingIndicator
          steps={progressSteps}
          showProgress={true}
          onAllComplete={() => alert('All steps completed!')}
        />
      </div>

      {/* Loading Component Demos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dashboard Loading */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Dashboard Loading</h3>
          <UnifiedLoadingComponent
            componentId="dashboard-demo"
            fallbackType="enhanced"
            skeletonType="dashboard"
            skeletonVariant="student"
          >
            <div className="p-4 bg-blue-50 rounded">
              <p>Dashboard content would appear here when not loading</p>
            </div>
          </UnifiedLoadingComponent>
        </div>

        {/* Courses Loading */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Courses Loading</h3>
          <UnifiedLoadingComponent
            componentId="courses-demo"
            fallbackType="skeleton"
            skeletonType="courses"
            skeletonVariant="grid"
          >
            <div className="p-4 bg-green-50 rounded">
              <p>Courses content would appear here when not loading</p>
            </div>
          </UnifiedLoadingComponent>
        </div>

        {/* Enrollment Loading */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Enrollment Loading</h3>
          <UnifiedLoadingComponent
            componentId="enrollment-demo"
            fallbackType="skeleton"
            skeletonType="enrollment"
            skeletonVariant="form"
          >
            <div className="p-4 bg-purple-50 rounded">
              <p>Enrollment content would appear here when not loading</p>
            </div>
          </UnifiedLoadingComponent>
        </div>
      </div>
    </div>
  );
};

export default LoadingStatesDemo;