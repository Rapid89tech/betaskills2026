/**
 * Component Loading Manager
 * 
 * Provides reliable component loading with fallback mechanisms, automatic retries,
 * and comprehensive error recovery for application stability.
 * 
 * Features:
 * - Intelligent component preloading
 * - Automatic retry with exponential backoff
 * - Fallback component system
 * - Loading error recovery
 * - Performance monitoring
 * - Critical path optimization
 */

import React, { ComponentType, lazy } from 'react';
import { loadingOptimizer } from '@/utils/loadingOptimizer';
import { fallbackManager } from '@/utils/FallbackManager';

// Types for component loading
export interface ComponentLoadingConfig {
  preloadCritical: boolean;
  enableRetry: boolean;
  maxRetries: number;
  retryDelay: number;
  enableFallbacks: boolean;
  timeout: number;
  enablePerformanceTracking: boolean;
}

export interface ComponentLoadingState {
  componentName: string;
  isLoading: boolean;
  progress: number;
  retryCount: number;
  lastError?: Error;
  fallbackActive: boolean;
  loadTime?: number;
  preloaded: boolean;
}

export interface ComponentRegistration {
  name: string;
  importFn: () => Promise<{ default: ComponentType<any> }>;
  fallback?: ComponentType<any>;
  critical: boolean;
  preloadTrigger?: 'immediate' | 'hover' | 'scroll' | 'idle';
  dependencies?: string[];
}

export interface LoadingResult<T = ComponentType<any>> {
  success: boolean;
  component?: T;
  fallbackUsed: boolean;
  loadTime: number;
  retryCount: number;
  error?: Error;
}

// Default configuration
const DEFAULT_CONFIG: ComponentLoadingConfig = {
  preloadCritical: true,
  enableRetry: true,
  maxRetries: 3,
  retryDelay: 1000,
  enableFallbacks: true,
  timeout: 10000,
  enablePerformanceTracking: true
};

/**
 * Component Loading Manager
 * Manages reliable component loading with fallbacks and retry mechanisms
 */
export class ComponentLoadingManager {
  private static instance: ComponentLoadingManager;
  private config: ComponentLoadingConfig;
  private componentRegistry: Map<string, ComponentRegistration> = new Map();
  private loadingStates: Map<string, ComponentLoadingState> = new Map();
  private fallbackComponents: Map<string, ComponentType<any>> = new Map();
  private loadingPromises: Map<string, Promise<LoadingResult>> = new Map();
  private criticalComponents: Set<string> = new Set();
  private preloadQueue: string[] = [];
  private isPreloading = false;

  private constructor(config: Partial<ComponentLoadingConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.initializeDefaultFallbacks();
    this.setupCriticalComponentPreloading();
  }

  static getInstance(config?: Partial<ComponentLoadingConfig>): ComponentLoadingManager {
    if (!ComponentLoadingManager.instance) {
      ComponentLoadingManager.instance = new ComponentLoadingManager(config);
    }
    return ComponentLoadingManager.instance;
  }

  /**
   * Initialize default fallback components
   */
  private initializeDefaultFallbacks(): void {
    // Generic loading fallback
    const LoadingFallback: ComponentType<any> = () => (
      React.createElement('div', {
        className: 'flex items-center justify-center p-8',
        children: [
          React.createElement('div', {
            className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600',
            key: 'spinner'
          }),
          React.createElement('span', {
            className: 'ml-3 text-gray-600',
            key: 'text',
            children: 'Loading component...'
          })
        ]
      })
    );

    // Generic error fallback
    const ErrorFallback: ComponentType<any> = () => (
      React.createElement('div', {
        className: 'flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg',
        children: [
          React.createElement('div', {
            className: 'text-red-600 mb-4',
            key: 'icon',
            children: '⚠️'
          }),
          React.createElement('h3', {
            className: 'text-lg font-semibold text-red-800 mb-2',
            key: 'title',
            children: 'Component Failed to Load'
          }),
          React.createElement('p', {
            className: 'text-red-600 text-center',
            key: 'message',
            children: 'This component could not be loaded. Please refresh the page or try again later.'
          })
        ]
      })
    );

    this.fallbackComponents.set('loading', LoadingFallback);
    this.fallbackComponents.set('error', ErrorFallback);
  }

  /**
   * Setup critical component preloading
   */
  private setupCriticalComponentPreloading(): void {
    if (this.config.preloadCritical) {
      // Preload critical components on idle
      if (typeof window !== 'undefined') {
        const preloadCritical = () => {
          this.preloadCriticalComponents().catch(error => {
            console.warn('Critical component preloading failed:', error);
          });
        };

        if (document.readyState === 'complete') {
          setTimeout(preloadCritical, 100);
        } else {
          window.addEventListener('load', () => {
            setTimeout(preloadCritical, 100);
          });
        }
      }
    }
  }

  /**
   * Register a component for managed loading
   */
  registerComponent(registration: ComponentRegistration): void {
    this.componentRegistry.set(registration.name, registration);
    
    if (registration.critical) {
      this.criticalComponents.add(registration.name);
    }

    // Initialize loading state
    this.loadingStates.set(registration.name, {
      componentName: registration.name,
      isLoading: false,
      progress: 0,
      retryCount: 0,
      fallbackActive: false,
      preloaded: false
    });

    // Register fallback if provided
    if (registration.fallback) {
      this.fallbackComponents.set(registration.name, registration.fallback);
    }

    // Setup preload trigger
    this.setupPreloadTrigger(registration);
  }

  /**
   * Setup preload trigger for a component
   */
  private setupPreloadTrigger(registration: ComponentRegistration): void {
    if (!registration.preloadTrigger || typeof window === 'undefined') return;

    switch (registration.preloadTrigger) {
      case 'immediate':
        this.preloadComponent(registration.name);
        break;
      
      case 'idle':
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            this.preloadComponent(registration.name);
          });
        } else {
          setTimeout(() => {
            this.preloadComponent(registration.name);
          }, 2000);
        }
        break;
      
      case 'scroll':
        let scrollTriggered = false;
        const handleScroll = () => {
          if (!scrollTriggered && window.scrollY > 100) {
            scrollTriggered = true;
            this.preloadComponent(registration.name);
            window.removeEventListener('scroll', handleScroll);
          }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        break;
    }
  }

  /**
   * Load a component with retry and fallback mechanisms
   */
  async loadComponent<T extends ComponentType<any>>(
    componentName: string
  ): Promise<LoadingResult<T>> {
    // Check if already loading
    const existingPromise = this.loadingPromises.get(componentName);
    if (existingPromise) {
      return existingPromise as Promise<LoadingResult<T>>;
    }

    const registration = this.componentRegistry.get(componentName);
    if (!registration) {
      throw new Error(`Component '${componentName}' is not registered`);
    }

    const loadingPromise = this.performComponentLoad<T>(registration);
    this.loadingPromises.set(componentName, loadingPromise);

    try {
      const result = await loadingPromise;
      return result;
    } finally {
      this.loadingPromises.delete(componentName);
    }
  }

  /**
   * Perform the actual component loading with retry logic
   */
  private async performComponentLoad<T extends ComponentType<any>>(
    registration: ComponentRegistration
  ): Promise<LoadingResult<T>> {
    const state = this.loadingStates.get(registration.name)!;
    const startTime = Date.now(); // Use Date.now() for consistent timing
    
    state.isLoading = true;
    state.progress = 0;
    state.retryCount = 0;
    state.lastError = undefined;
    state.fallbackActive = false;

    // Track loading start
    if (this.config.enablePerformanceTracking) {
      loadingOptimizer.startLoading(`component-${registration.name}`, `Loading ${registration.name}...`);
    }

    let lastError: Error | undefined;

    // Retry loop
    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        state.retryCount = attempt;
        state.progress = (attempt / (this.config.maxRetries + 1)) * 50; // First 50% for attempts

        // Load component with timeout
        const component = await this.loadWithTimeout(registration.importFn, this.config.timeout);
        
        const loadTime = Date.now() - startTime;
        state.isLoading = false;
        state.progress = 100;
        state.loadTime = loadTime;

        // Track successful load
        if (this.config.enablePerformanceTracking) {
          loadingOptimizer.finishLoading(`component-${registration.name}`);
        }

        return {
          success: true,
          component: component.default as T,
          fallbackUsed: false,
          loadTime,
          retryCount: attempt,
        };

      } catch (error) {
        lastError = error as Error;
        state.lastError = lastError;

        console.warn(`Component load attempt ${attempt + 1} failed for '${registration.name}':`, error);

        // If not the last attempt, wait before retrying
        if (attempt < this.config.maxRetries) {
          const delay = this.config.retryDelay * Math.pow(2, attempt); // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay));
          state.progress = ((attempt + 1) / (this.config.maxRetries + 1)) * 50;
        }
      }
    }

    // All retries failed
    const loadTime = Date.now() - startTime;
    state.isLoading = false;
    state.loadTime = loadTime;

    if (this.config.enablePerformanceTracking) {
      loadingOptimizer.finishLoading(`component-${registration.name}`);
    }

    // Try to use fallback
    if (this.config.enableFallbacks) {
      const fallback = this.getFallbackComponent(registration.name);
      if (fallback) {
        state.fallbackActive = true;
        state.progress = 100;

        return {
          success: false,
          component: fallback as T,
          fallbackUsed: true,
          loadTime,
          retryCount: this.config.maxRetries,
          error: lastError
        };
      }
    }

    // No fallback available, throw error
    throw lastError || new Error(`Failed to load component '${registration.name}' after ${this.config.maxRetries} retries`);
  }

  /**
   * Load component with timeout
   */
  private async loadWithTimeout<T>(
    importFn: () => Promise<{ default: T }>,
    timeout: number
  ): Promise<{ default: T }> {
    return Promise.race([
      importFn(),
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Component loading timed out after ${timeout}ms`));
        }, timeout);
      })
    ]);
  }

  /**
   * Get fallback component for a given component name
   */
  private getFallbackComponent(componentName: string): ComponentType<any> | null {
    // Try specific fallback first
    const specificFallback = this.fallbackComponents.get(componentName);
    if (specificFallback) {
      return specificFallback;
    }

    // Use generic error fallback
    return this.fallbackComponents.get('error') || null;
  }

  /**
   * Preload a component
   */
  async preloadComponent(componentName: string): Promise<boolean> {
    const registration = this.componentRegistry.get(componentName);
    if (!registration) {
      console.warn(`Cannot preload unregistered component: ${componentName}`);
      return false;
    }

    const state = this.loadingStates.get(componentName);
    if (!state) {
      console.warn(`No loading state found for component: ${componentName}`);
      return false;
    }

    if (state.preloaded || state.isLoading) {
      return state.preloaded;
    }

    try {
      await this.loadComponent(componentName);
      state.preloaded = true;
      return true;
    } catch (error) {
      console.warn(`Failed to preload component '${componentName}':`, error);
      return false;
    }
  }

  /**
   * Preload critical components
   */
  async preloadCriticalComponents(): Promise<void> {
    if (this.isPreloading) return;
    
    this.isPreloading = true;
    const criticalComponents = Array.from(this.criticalComponents);
    
    try {
      // Preload critical components in batches
      const batchSize = 2;
      for (let i = 0; i < criticalComponents.length; i += batchSize) {
        const batch = criticalComponents.slice(i, i + batchSize);
        await Promise.allSettled(
          batch.map(name => this.preloadComponent(name))
        );
        
        // Small delay between batches
        if (i + batchSize < criticalComponents.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    } finally {
      this.isPreloading = false;
    }
  }

  /**
   * Preload components for a specific route or context
   */
  async preloadForContext(context: string, componentNames: string[]): Promise<void> {
    const preloadPromises = componentNames
      .filter(name => this.componentRegistry.has(name))
      .map(name => this.preloadComponent(name));

    await Promise.allSettled(preloadPromises);
  }

  /**
   * Create a lazy component with managed loading
   */
  createLazyComponent<T extends ComponentType<any>>(
    componentName: string
  ): ComponentType<any> {
    const registration = this.componentRegistry.get(componentName);
    if (!registration) {
      throw new Error(`Component '${componentName}' is not registered`);
    }

    return lazy(async () => {
      const result = await this.loadComponent<T>(componentName);
      
      if (result.success && result.component) {
        return { default: result.component };
      } else if (result.fallbackUsed && result.component) {
        return { default: result.component };
      } else {
        throw result.error || new Error(`Failed to load component '${componentName}'`);
      }
    });
  }

  /**
   * Register a fallback component
   */
  registerFallback(componentName: string, fallback: ComponentType<any>): void {
    this.fallbackComponents.set(componentName, fallback);
  }

  /**
   * Get loading state for a component
   */
  getLoadingState(componentName: string): ComponentLoadingState | null {
    return this.loadingStates.get(componentName) || null;
  }

  /**
   * Get all loading states
   */
  getAllLoadingStates(): Map<string, ComponentLoadingState> {
    return new Map(this.loadingStates);
  }

  /**
   * Check if a component is preloaded
   */
  isPreloaded(componentName: string): boolean {
    const state = this.loadingStates.get(componentName);
    return state?.preloaded || false;
  }

  /**
   * Get loading statistics
   */
  getLoadingStats(): {
    totalComponents: number;
    preloadedComponents: number;
    failedComponents: number;
    criticalComponents: number;
    averageLoadTime: number;
  } {
    const states = Array.from(this.loadingStates.values());
    const loadTimes = states
      .filter(s => s.loadTime !== undefined)
      .map(s => s.loadTime!);

    return {
      totalComponents: states.length,
      preloadedComponents: states.filter(s => s.preloaded).length,
      failedComponents: states.filter(s => s.lastError !== undefined).length,
      criticalComponents: this.criticalComponents.size,
      averageLoadTime: loadTimes.length > 0 
        ? loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length 
        : 0
    };
  }

  /**
   * Clear all loading states and caches
   */
  clearCache(): void {
    this.loadingStates.clear();
    this.loadingPromises.clear();
    this.preloadQueue = [];
    this.isPreloading = false;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<ComponentLoadingConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): ComponentLoadingConfig {
    return { ...this.config };
  }
}

// Create singleton instance
export const componentLoadingManager = ComponentLoadingManager.getInstance();

// Export utility functions
export const registerComponent = (registration: ComponentRegistration) =>
  componentLoadingManager.registerComponent(registration);

export const loadComponent = <T extends ComponentType<any>>(componentName: string) =>
  componentLoadingManager.loadComponent<T>(componentName);

export const preloadComponent = (componentName: string) =>
  componentLoadingManager.preloadComponent(componentName);

export const createLazyComponent = <T extends ComponentType<any>>(componentName: string) =>
  componentLoadingManager.createLazyComponent<T>(componentName);

export const getLoadingState = (componentName: string) =>
  componentLoadingManager.getLoadingState(componentName);

export default ComponentLoadingManager;