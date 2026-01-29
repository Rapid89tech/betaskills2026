import React, { useEffect, useState } from 'react';
import { CheckCircle, Circle, Loader2, AlertCircle } from 'lucide-react';

interface LoadingStep {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'completed' | 'error';
  progress?: number;
  errorMessage?: string;
}

interface ProgressiveLoadingIndicatorProps {
  steps: LoadingStep[];
  currentStep?: string;
  showProgress?: boolean;
  onStepComplete?: (stepId: string) => void;
  onAllComplete?: () => void;
  className?: string;
}

const ProgressiveLoadingIndicator: React.FC<ProgressiveLoadingIndicatorProps> = ({
  steps,
  currentStep,
  showProgress = true,
  onStepComplete,
  onAllComplete,
  className = ''
}) => {
  const [internalSteps, setInternalSteps] = useState<LoadingStep[]>(steps);

  useEffect(() => {
    setInternalSteps(steps);
  }, [steps]);

  useEffect(() => {
    // Check if all steps are completed
    const allCompleted = internalSteps.every(step => step.status === 'completed');
    if (allCompleted && onAllComplete) {
      onAllComplete();
    }
  }, [internalSteps, onAllComplete]);

  const getStepIcon = (step: LoadingStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'loading':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'pending':
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStepColor = (step: LoadingStep) => {
    switch (step.status) {
      case 'completed':
        return 'text-green-600';
      case 'loading':
        return 'text-blue-600';
      case 'error':
        return 'text-red-600';
      case 'pending':
      default:
        return 'text-gray-500';
    }
  };

  const getOverallProgress = () => {
    const completedSteps = internalSteps.filter(step => step.status === 'completed').length;
    return (completedSteps / internalSteps.length) * 100;
  };

  const getCurrentStepProgress = () => {
    const current = internalSteps.find(step => step.status === 'loading');
    return current?.progress || 0;
  };

  return (
    <div className={`progressive-loading-indicator ${className}`}>
      {/* Overall Progress Bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Loading Progress</span>
            <span className="text-sm text-gray-500">{Math.round(getOverallProgress())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${getOverallProgress()}%` }}
            />
          </div>
        </div>
      )}

      {/* Steps List */}
      <div className="space-y-4">
        {internalSteps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            {/* Step Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {getStepIcon(step)}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${getStepColor(step)}`}>
                  {step.label}
                </p>
                {step.status === 'loading' && step.progress !== undefined && (
                  <span className="text-xs text-gray-500">
                    {Math.round(step.progress)}%
                  </span>
                )}
              </div>

              {/* Step Progress Bar (for individual step progress) */}
              {step.status === 'loading' && step.progress !== undefined && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${step.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {step.status === 'error' && step.errorMessage && (
                <p className="mt-1 text-xs text-red-600">
                  {step.errorMessage}
                </p>
              )}

              {/* Connection Line to Next Step */}
              {index < internalSteps.length - 1 && (
                <div className="mt-2 ml-2">
                  <div className={`w-0.5 h-4 ${
                    step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Current Step Details */}
      {currentStep && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
            <span className="text-sm font-medium text-blue-800">
              Currently: {internalSteps.find(s => s.id === currentStep)?.label}
            </span>
          </div>
          {getCurrentStepProgress() > 0 && (
            <div className="mt-2">
              <div className="w-full bg-blue-200 rounded-full h-1">
                <div
                  className="bg-blue-600 h-1 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${getCurrentStepProgress()}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressiveLoadingIndicator;