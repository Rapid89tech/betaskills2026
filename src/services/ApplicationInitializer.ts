import {
  InitializationStep,
  InitializationConfig,
  InitializationResult,
  InitializationStatus,
  InitializationProgress,
  StepResult
} from '../types/initialization';

export class ApplicationInitializer {
  private status: InitializationStatus = {
    isInitializing: false,
    currentStep: null,
    progress: 0,
    completedSteps: [],
    failedSteps: [],
    totalSteps: 0,
    startTime: 0
  };

  private progressCallbacks: ((progress: InitializationProgress) => void)[] = [];
  private initializationPromise: Promise<InitializationResult> | null = null;

  /**
   * Initialize the application with the provided configuration
   */
  async initialize(config: InitializationConfig): Promise<InitializationResult> {
    if (this.status.isInitializing) {
      // Return existing initialization promise if already running
      return this.initializationPromise || Promise.reject(new Error('Initialization already in progress'));
    }

    this.initializationPromise = this.performInitialization(config);
    return this.initializationPromise;
  }

  private async performInitialization(config: InitializationConfig): Promise<InitializationResult> {
    const startTime = Date.now();
    
    // Sort steps by priority (higher priority first)
    const sortedSteps = [...config.steps].sort((a, b) => b.priority - a.priority);
    
    this.status = {
      isInitializing: true,
      currentStep: null,
      progress: 0,
      completedSteps: [],
      failedSteps: [],
      totalSteps: sortedSteps.length,
      startTime
    };

    const result: InitializationResult = {
      success: true,
      completedSteps: [],
      failedSteps: [],
      fallbacksUsed: [],
      totalTime: 0,
      errors: []
    };

    // Set up global timeout
    const globalTimeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Global initialization timeout after ${config.maxTimeout}ms`));
      }, config.maxTimeout);
    });

    try {
      // Execute steps with global timeout
      await Promise.race([
        this.executeSteps(sortedSteps, config, result),
        globalTimeoutPromise
      ]);
    } catch (error) {
      result.success = false;
      result.errors.push(error as Error);
      
      // If global timeout, mark remaining steps as failed
      if (error instanceof Error && error.message.includes('Global initialization timeout')) {
        const remainingSteps = sortedSteps.filter(step => 
          !result.completedSteps.includes(step.name) && 
          !result.failedSteps.includes(step.name)
        );
        result.failedSteps.push(...remainingSteps.map(step => step.name));
      }
    }

    result.totalTime = Date.now() - startTime;
    
    // Determine overall success
    const requiredSteps = sortedSteps.filter(step => step.required);
    const failedRequiredSteps = requiredSteps.filter(step => 
      result.failedSteps.includes(step.name)
    );
    
    result.success = failedRequiredSteps.length === 0;

    this.status.isInitializing = false;
    this.status.progress = 100;
    this.initializationPromise = null;

    return result;
  }

  private async executeSteps(
    steps: InitializationStep[], 
    config: InitializationConfig, 
    result: InitializationResult
  ): Promise<void> {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      this.status.currentStep = step.name;
      this.status.progress = (i / steps.length) * 100;

      this.notifyProgress({
        stepName: step.name,
        progress: this.status.progress,
        message: `Executing ${step.name}...`,
        timestamp: Date.now()
      });

      const stepResult = await this.executeStep(step);
      
      if (stepResult.success) {
        result.completedSteps.push(step.name);
        this.status.completedSteps.push(step.name);
        
        if (stepResult.fallbackUsed) {
          result.fallbacksUsed.push(step.name);
        }
      } else {
        result.failedSteps.push(step.name);
        this.status.failedSteps.push(step.name);
        result.errors.push(stepResult.error!);

        // Handle step failure
        await this.handleStepFailure(step, stepResult.error!, config, result);
      }
    }
  }

  /**
   * Execute a single initialization step
   */
  async executeStep(step: InitializationStep): Promise<StepResult> {
    const startTime = Date.now();
    const stepResult: StepResult = {
      stepName: step.name,
      success: false,
      executionTime: 0,
      fallbackUsed: false
    };

    try {
      // Create timeout promise for this step
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Step '${step.name}' timed out after ${step.timeout}ms`));
        }, step.timeout);
      });

      // Execute step with timeout
      await Promise.race([
        step.execute(),
        timeoutPromise
      ]);

      stepResult.success = true;
    } catch (error) {
      stepResult.error = error as Error;
      
      // Try fallback if available
      if (step.fallback) {
        try {
          await step.fallback();
          stepResult.success = true;
          stepResult.fallbackUsed = true;
        } catch (fallbackError) {
          stepResult.error = fallbackError as Error;
        }
      }
    }

    stepResult.executionTime = Date.now() - startTime;
    return stepResult;
  }

  /**
   * Handle step failure based on configuration
   */
  async handleStepFailure(
    step: InitializationStep, 
    error: Error, 
    config: InitializationConfig,
    result: InitializationResult
  ): Promise<void> {
    // Log the error
    console.error(`Initialization step '${step.name}' failed:`, error);

    // If step is required and no fallback worked, this is a critical failure
    if (step.required && !result.completedSteps.includes(step.name)) {
      this.notifyProgress({
        stepName: step.name,
        progress: this.status.progress,
        message: `Critical step '${step.name}' failed: ${error.message}`,
        timestamp: Date.now()
      });

      // For required steps, we might want to retry if configured
      if (config.retryFailedSteps) {
        this.notifyProgress({
          stepName: step.name,
          progress: this.status.progress,
          message: `Retrying critical step '${step.name}'...`,
          timestamp: Date.now()
        });

        const retryResult = await this.executeStep(step);
        if (retryResult.success) {
          // Remove from failed steps and add to completed
          const failedIndex = result.failedSteps.indexOf(step.name);
          if (failedIndex > -1) {
            result.failedSteps.splice(failedIndex, 1);
          }
          result.completedSteps.push(step.name);
          this.status.completedSteps.push(step.name);
          
          if (retryResult.fallbackUsed) {
            result.fallbacksUsed.push(step.name);
          }
        }
      }
    }
  }

  /**
   * Get current initialization status
   */
  getInitializationStatus(): InitializationStatus {
    return { ...this.status };
  }

  /**
   * Subscribe to initialization progress updates
   */
  onProgress(callback: (progress: InitializationProgress) => void): () => void {
    this.progressCallbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.progressCallbacks.indexOf(callback);
      if (index > -1) {
        this.progressCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Check if initialization is currently running
   */
  isInitializing(): boolean {
    return this.status.isInitializing;
  }

  /**
   * Reset the initializer state
   */
  reset(): void {
    this.status = {
      isInitializing: false,
      currentStep: null,
      progress: 0,
      completedSteps: [],
      failedSteps: [],
      totalSteps: 0,
      startTime: 0
    };
    this.initializationPromise = null;
  }

  private notifyProgress(progress: InitializationProgress): void {
    this.progressCallbacks.forEach(callback => {
      try {
        callback(progress);
      } catch (error) {
        console.error('Error in progress callback:', error);
      }
    });
  }
}

// Singleton instance for global use
export const applicationInitializer = new ApplicationInitializer();