export interface InitializationStep {
  name: string;
  priority: number;
  required: boolean;
  timeout: number;
  execute: () => Promise<void>;
  fallback?: () => Promise<void>;
}

export interface InitializationConfig {
  steps: InitializationStep[];
  maxTimeout: number;
  enableFallbacks: boolean;
  retryFailedSteps: boolean;
}

export interface StepResult {
  stepName: string;
  success: boolean;
  executionTime: number;
  error?: Error;
  fallbackUsed: boolean;
}

export interface InitializationResult {
  success: boolean;
  completedSteps: string[];
  failedSteps: string[];
  fallbacksUsed: string[];
  totalTime: number;
  errors: Error[];
}

export interface InitializationStatus {
  isInitializing: boolean;
  currentStep: string | null;
  progress: number;
  completedSteps: string[];
  failedSteps: string[];
  totalSteps: number;
  startTime: number;
  estimatedCompletion?: number;
}

export interface InitializationProgress {
  stepName: string;
  progress: number;
  message: string;
  timestamp: number;
}