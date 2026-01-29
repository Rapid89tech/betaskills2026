/**
 * LoadingStateManager - Centralized utility for managing loading states and skeleton screens
 * Provides consistent loading indicators across the application
 */

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
  type?: 'spinner' | 'skeleton' | 'progress';
}

export interface SkeletonConfig {
  type: 'dashboard' | 'courses' | 'enrollment' | 'admin' | 'course-content';
  variant?: 'default' | 'compact' | 'detailed';
  animated?: boolean;
}

class LoadingStateManager {
  private globalLoadingState: LoadingState = { isLoading: false };
  private componentLoadingStates: Map<string, LoadingState> = new Map();
  private skeletonStates: Map<string, SkeletonConfig> = new Map();
  private progressStates: Map<string, number> = new Map();
  private listeners: Map<string, ((state: LoadingState) => void)[]> = new Map();

  /**
   * Set global loading state for the entire application
   */
  setGlobalLoading(isLoading: boolean, message?: string, progress?: number): void {
    this.globalLoadingState = {
      isLoading,
      message,
      progress,
      type: progress !== undefined ? 'progress' : 'spinner'
    };
    
    this.notifyListeners('global', this.globalLoadingState);
  }

  /**
   * Set loading state for a specific component
   */
  setComponentLoading(componentId: string, isLoading: boolean, message?: string): void {
    const state: LoadingState = {
      isLoading,
      message,
      type: 'spinner'
    };
    
    this.componentLoadingStates.set(componentId, state);
    this.notifyListeners(componentId, state);
  }

  /**
   * Get loading state for a component
   */
  getComponentLoading(componentId: string): LoadingState {
    return this.componentLoadingStates.get(componentId) || { isLoading: false };
  }

  /**
   * Show skeleton screen for a specific type
   */
  showSkeleton(type: SkeletonConfig['type'], variant: SkeletonConfig['variant'] = 'default'): void {
    const config: SkeletonConfig = {
      type,
      variant,
      animated: true
    };
    
    this.skeletonStates.set(type, config);
    this.notifyListeners(`skeleton-${type}`, { isLoading: true, type: 'skeleton' });
  }

  /**
   * Hide skeleton screen for a specific type
   */
  hideSkeleton(type: SkeletonConfig['type']): void {
    this.skeletonStates.delete(type);
    this.notifyListeners(`skeleton-${type}`, { isLoading: false, type: 'skeleton' });
  }

  /**
   * Get skeleton configuration for a type
   */
  getSkeletonConfig(type: SkeletonConfig['type']): SkeletonConfig | null {
    return this.skeletonStates.get(type) || null;
  }

  /**
   * Show progress indicator with percentage
   */
  showProgress(componentId: string, progress: number, message?: string): void {
    this.progressStates.set(componentId, progress);
    
    const state: LoadingState = {
      isLoading: true,
      progress: Math.max(0, Math.min(100, progress)),
      message,
      type: 'progress'
    };
    
    this.componentLoadingStates.set(componentId, state);
    this.notifyListeners(componentId, state);
  }

  /**
   * Hide progress indicator
   */
  hideProgress(componentId: string): void {
    this.progressStates.delete(componentId);
    this.componentLoadingStates.delete(componentId);
    this.notifyListeners(componentId, { isLoading: false });
  }

  /**
   * Get current progress for a component
   */
  getProgress(componentId: string): number {
    return this.progressStates.get(componentId) || 0;
  }

  /**
   * Subscribe to loading state changes
   */
  subscribe(componentId: string, callback: (state: LoadingState) => void): () => void {
    if (!this.listeners.has(componentId)) {
      this.listeners.set(componentId, []);
    }
    
    this.listeners.get(componentId)!.push(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(componentId);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  /**
   * Clear all loading states
   */
  clearAll(): void {
    this.globalLoadingState = { isLoading: false };
    this.componentLoadingStates.clear();
    this.skeletonStates.clear();
    this.progressStates.clear();
    
    // Notify all listeners
    this.listeners.forEach((callbacks, componentId) => {
      callbacks.forEach(callback => callback({ isLoading: false }));
    });
  }

  /**
   * Get all active loading states for debugging
   */
  getActiveStates(): {
    global: LoadingState;
    components: Record<string, LoadingState>;
    skeletons: Record<string, SkeletonConfig>;
    progress: Record<string, number>;
  } {
    return {
      global: this.globalLoadingState,
      components: Object.fromEntries(this.componentLoadingStates),
      skeletons: Object.fromEntries(this.skeletonStates),
      progress: Object.fromEntries(this.progressStates)
    };
  }

  /**
   * Batch update multiple loading states
   */
  batchUpdate(updates: Array<{
    componentId: string;
    isLoading: boolean;
    message?: string;
    progress?: number;
  }>): void {
    updates.forEach(({ componentId, isLoading, message, progress }) => {
      if (progress !== undefined) {
        this.showProgress(componentId, progress, message);
      } else {
        this.setComponentLoading(componentId, isLoading, message);
      }
    });
  }

  /**
   * Create a loading context for async operations
   */
  async withLoading<T>(
    componentId: string,
    operation: () => Promise<T>,
    message?: string
  ): Promise<T> {
    this.setComponentLoading(componentId, true, message);
    
    try {
      const result = await operation();
      return result;
    } finally {
      this.setComponentLoading(componentId, false);
    }
  }

  /**
   * Create a progress context for operations with progress tracking
   */
  async withProgress<T>(
    componentId: string,
    operation: (updateProgress: (progress: number, message?: string) => void) => Promise<T>,
    initialMessage?: string
  ): Promise<T> {
    this.showProgress(componentId, 0, initialMessage);
    
    const updateProgress = (progress: number, message?: string) => {
      this.showProgress(componentId, progress, message);
    };
    
    try {
      const result = await operation(updateProgress);
      this.showProgress(componentId, 100, 'Complete');
      
      // Auto-hide after a short delay
      setTimeout(() => {
        this.hideProgress(componentId);
      }, 500);
      
      return result;
    } catch (error) {
      this.hideProgress(componentId);
      throw error;
    }
  }

  private notifyListeners(componentId: string, state: LoadingState): void {
    const callbacks = this.listeners.get(componentId);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(state);
        } catch (error) {
          console.error(`Error in loading state listener for ${componentId}:`, error);
        }
      });
    }
  }
}

// Export singleton instance
export const loadingStateManager = new LoadingStateManager();

// Export types
export type { LoadingState, SkeletonConfig };