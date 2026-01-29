import { ComponentType, lazy } from 'react';
import { performanceMonitor } from './performanceMonitor';

/**
 * Unified Performance Manager
 * Handles component loading, asset optimization, performance monitoring, and preloading
 */

interface ComponentCache {
  [key: string]: {
    component: ComponentType<any>;
    loadTime: number;
    isPreloaded: boolean;
  };
}

interface PreloadConfig {
  components: string[];
  routes: string[];
  assets: string[];
}

interface AssetOptimizationConfig {
  enableImageOptimization: boolean;
  enableFontPreloading: boolean;
  enableCriticalCSS: boolean;
  enableResourceHints: boolean;
}

class PerformanceManager {
  private componentCache: ComponentCache = {};
  private preloadedComponents: Set<string> = new Set();
  private criticalComponents: Set<string> = new Set();
  private isEnabled: boolean;
  private assetOptimizationConfig: AssetOptimizationConfig;

  constructor() {
    this.isEnabled = import.meta.env.DEV || localStorage.getItem('enablePerformanceManager') === 'true';
    this.assetOptimizationConfig = {
      enableImageOptimization: true,
      enableFontPreloading: true,
      enableCriticalCSS: true,
      enableResourceHints: true
    };

    // Initialize critical components that should be preloaded
    this.criticalComponents = new Set([
      'Dashboard',
      'Courses',
      'Header',
      'LoadingSpinner'
    ]);

    if (this.isEnabled) {
      this.initializePerformanceTracking();
      this.preloadCriticalComponents();
    }
  }

  /**
   * Load a component with performance tracking and caching
   */
  async loadComponent(componentName: string): Promise<ComponentType<any>> {
    if (!this.isEnabled) {
      throw new Error(`Component loading disabled: ${componentName}`);
    }

    // Check cache first
    if (this.componentCache[componentName]) {
      performanceMonitor.startMeasure(`${componentName}-cache-hit`, 'component');
      performanceMonitor.endMeasure(`${componentName}-cache-hit`);
      return this.componentCache[componentName].component;
    }

    // Start performance measurement
    performanceMonitor.startMeasure(`${componentName}-load`, 'component');

    try {
      const startTime = performance.now();
      
      // Dynamic import based on component name
      const componentModule = await this.getComponentImport(componentName);
      const component = componentModule.default;

      const loadTime = performance.now() - startTime;

      // Cache the component
      this.componentCache[componentName] = {
        component,
        loadTime,
        isPreloaded: this.preloadedComponents.has(componentName)
      };

      performanceMonitor.endMeasure(`${componentName}-load`);

      // Log performance metrics
      if (loadTime > 500) {
        console.warn(`Slow component load: ${componentName} took ${loadTime.toFixed(2)}ms`);
      }

      return component;
    } catch (error) {
      performanceMonitor.endMeasure(`${componentName}-load`);
      console.error(`Failed to load component: ${componentName}`, error);
      throw error;
    }
  }

  /**
   * Create a lazy component with performance tracking
   */
  createLazyComponent<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>,
    componentName: string
  ): T {
    return lazy(async () => {
      performanceMonitor.startMeasure(`${componentName}-lazy-load`, 'chunk');
      
      try {
        const result = await importFn();
        performanceMonitor.endMeasure(`${componentName}-lazy-load`);
        
        // Cache the loaded component
        this.componentCache[componentName] = {
          component: result.default,
          loadTime: performance.now(),
          isPreloaded: false
        };

        return result;
      } catch (error) {
        performanceMonitor.endMeasure(`${componentName}-lazy-load`);
        console.error(`Failed to lazy load component: ${componentName}`, error);
        
        // Return fallback component
        return {
          default: () => React.createElement('div', { 
            className: 'p-4 text-center text-red-500' 
          }, `Failed to load ${componentName}. Please refresh the page.`)
        } as { default: T };
      }
    }) as T;
  }

  /**
   * Preload critical components for better performance
   */
  async preloadCriticalComponents(): Promise<void> {
    if (!this.isEnabled) return;

    performanceMonitor.startMeasure('critical-components-preload', 'component');

    const preloadPromises = Array.from(this.criticalComponents).map(async (componentName) => {
      try {
        await this.preloadComponent(componentName);
        this.preloadedComponents.add(componentName);
      } catch (error) {
        console.warn(`Failed to preload critical component: ${componentName}`, error);
      }
    });

    await Promise.allSettled(preloadPromises);
    performanceMonitor.endMeasure('critical-components-preload');
  }

  /**
   * Preload a specific component
   */
  async preloadComponent(componentName: string): Promise<void> {
    if (this.componentCache[componentName] || this.preloadedComponents.has(componentName)) {
      return; // Already loaded or preloaded
    }

    try {
      performanceMonitor.startMeasure(`${componentName}-preload`, 'component');
      const component = await this.loadComponent(componentName);
      this.preloadedComponents.add(componentName);
      performanceMonitor.endMeasure(`${componentName}-preload`);
    } catch (error) {
      performanceMonitor.endMeasure(`${componentName}-preload`);
      throw error;
    }
  }

  /**
   * Optimize assets for better loading performance
   */
  optimizeAssets(): void {
    if (!this.isEnabled) return;

    performanceMonitor.startMeasure('asset-optimization', 'component');

    // Preload critical fonts
    if (this.assetOptimizationConfig.enableFontPreloading) {
      this.preloadFonts();
    }

    // Add resource hints for better loading
    if (this.assetOptimizationConfig.enableResourceHints) {
      this.addResourceHints();
    }

    // Optimize images
    if (this.assetOptimizationConfig.enableImageOptimization) {
      this.optimizeImages();
    }

    performanceMonitor.endMeasure('asset-optimization');
  }

  /**
   * Track page load performance
   */
  measurePageLoad(pageName: string): void {
    if (!this.isEnabled) return;

    performanceMonitor.startMeasure(`page-${pageName}`, 'route');

    // Measure various page load metrics
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const metrics = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: this.getFirstPaint(),
          firstContentfulPaint: this.getFirstContentfulPaint()
        };

        console.log(`📊 Page Load Metrics for ${pageName}:`, metrics);
      }
    }

    // End measurement after a short delay to capture full page load
    setTimeout(() => {
      performanceMonitor.endMeasure(`page-${pageName}`);
    }, 100);
  }

  /**
   * Track user interactions
   */
  trackUserInteraction(action: string, element?: string): void {
    if (!this.isEnabled) return;

    const interactionName = element ? `${action}-${element}` : action;
    performanceMonitor.startMeasure(`interaction-${interactionName}`, 'component');

    // End measurement after interaction processing
    requestAnimationFrame(() => {
      performanceMonitor.endMeasure(`interaction-${interactionName}`);
    });
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): {
    componentCache: ComponentCache;
    preloadedComponents: string[];
    performanceMetrics: any;
  } {
    return {
      componentCache: this.componentCache,
      preloadedComponents: Array.from(this.preloadedComponents),
      performanceMetrics: performanceMonitor.getSummary()
    };
  }

  /**
   * Clear performance cache and metrics
   */
  clearCache(): void {
    this.componentCache = {};
    this.preloadedComponents.clear();
    performanceMonitor.clear();
  }

  /**
   * Enable/disable performance manager
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    performanceMonitor.setEnabled(enabled);
    
    if (enabled) {
      localStorage.setItem('enablePerformanceManager', 'true');
      this.preloadCriticalComponents();
    } else {
      localStorage.removeItem('enablePerformanceManager');
    }
  }

  /**
   * Add a component to critical components list
   */
  addCriticalComponent(componentName: string): void {
    this.criticalComponents.add(componentName);
    if (this.isEnabled) {
      this.preloadComponent(componentName).catch(console.warn);
    }
  }

  /**
   * Remove a component from critical components list
   */
  removeCriticalComponent(componentName: string): void {
    this.criticalComponents.delete(componentName);
    this.preloadedComponents.delete(componentName);
  }

  // Private helper methods

  private async getComponentImport(componentName: string): Promise<{ default: ComponentType<any> }> {
    // Map component names to their import paths (only existing components)
    const componentMap: { [key: string]: () => Promise<{ default: ComponentType<any> }> } = {
      'Dashboard': () => import('../pages/Dashboard'),
      'AdminDashboard': () => import('../pages/AdminDashboard'),
      'Courses': () => import('../pages/Courses'),
      'Course': () => import('../pages/Course'),
      'Enrollment': () => import('../pages/Enrollment'),
      'PaymentForm': () => import('../components/PaymentForm'),
      'ProofOfPaymentForm': () => import('../components/ProofOfPaymentForm'),
      'CourseCard': () => import('../components/CourseCard'),
      'CourseGrid': () => import('../components/CourseGrid'),
      'Header': () => import('../components/Header'),
      'Footer': () => import('../components/Footer'),
      'LoadingSpinner': () => import('../components/LoadingSpinner'),
      'EnhancedLoadingSpinner': () => import('../components/EnhancedLoadingSpinner'),
      'VideoLearning': () => import('../components/VideoLearning'),
      'ErrorBoundary': () => import('../components/ErrorBoundary')
    };

    const importFn = componentMap[componentName];
    if (!importFn) {
      throw new Error(`Unknown component: ${componentName}`);
    }

    return importFn();
  }

  private initializePerformanceTracking(): void {
    // Track initial page load
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        this.measurePageLoad('initial');
      });

      // Track navigation performance
      if ('navigation' in performance) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              console.log('📊 Navigation Performance:', entry);
            }
          }
        });
        observer.observe({ entryTypes: ['navigation'] });
      }
    }
  }

  private preloadFonts(): void {
    const criticalFonts = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-regular.woff2'
    ];

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = fontUrl;
      document.head.appendChild(link);
    });
  }

  private addResourceHints(): void {
    // Add DNS prefetch for external resources
    const externalDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ];

    externalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  }

  private optimizeImages(): void {
    // Add loading="lazy" to images that are not above the fold
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach((img, index) => {
      if (index > 2) { // Skip first 3 images (likely above fold)
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  private getFirstPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  private getFirstContentfulPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint');
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return firstContentfulPaint ? firstContentfulPaint.startTime : null;
  }
}

// Create singleton instance
export const performanceManager = new PerformanceManager();

// Export utility functions for easier usage
export const loadComponent = (componentName: string) => 
  performanceManager.loadComponent(componentName);

export const preloadComponent = (componentName: string) => 
  performanceManager.preloadComponent(componentName);

export const measurePageLoad = (pageName: string) => 
  performanceManager.measurePageLoad(pageName);

export const trackUserInteraction = (action: string, element?: string) => 
  performanceManager.trackUserInteraction(action, element);

export const optimizeAssets = () => 
  performanceManager.optimizeAssets();

// Note: React hooks moved to separate hooks file to avoid circular dependencies

export default PerformanceManager;