/**
 * Loading optimization utilities to improve application performance
 */

interface LoadingState {
  isLoading: boolean;
  progress: number;
  message: string;
  startTime: number;
}

class LoadingOptimizer {
  private loadingStates: Map<string, LoadingState> = new Map();
  private preloadedResources: Set<string> = new Set();
  private criticalResources: string[] = [];

  constructor() {
    this.setupResourcePreloading();
    this.setupLoadingOptimizations();
  }

  /**
   * Setup resource preloading for critical assets
   */
  private setupResourcePreloading(): void {
    // Preload critical CSS
    this.preloadResource('/assets/index.css', 'style');
    
    // Preload critical fonts
    this.preloadResource('/fonts/inter-var.woff2', 'font');
    
    // Preload critical images
    const criticalImages = [
      '/images/logo.png',
      '/images/hero-bg.jpg'
    ];
    
    criticalImages.forEach(src => {
      this.preloadResource(src, 'image');
    });
  }

  /**
   * Setup loading optimizations
   */
  private setupLoadingOptimizations(): void {
    // Optimize image loading
    this.optimizeImageLoading();
    
    // Setup intersection observer for lazy loading
    this.setupLazyLoading();
    
    // Optimize font loading
    this.optimizeFontLoading();
  }

  /**
   * Preload a resource
   */
  private preloadResource(href: string, as: string): void {
    if (this.preloadedResources.has(href)) return;

    try {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = as;
      link.href = href;
      
      if (as === 'font') {
        link.crossOrigin = 'anonymous';
      }
      
      link.onload = () => {
        this.preloadedResources.add(href);
      };
      
      link.onerror = () => {
        console.warn(`Failed to preload ${as}: ${href}`);
      };
      
      document.head.appendChild(link);
    } catch (error) {
      console.warn(`Error preloading ${as}:`, error);
    }
  }

  /**
   * Optimize image loading
   */
  private optimizeImageLoading(): void {
    // Add loading="lazy" to images not in viewport
    const images = document.querySelectorAll('img:not([loading])');
    
    images.forEach((img, index) => {
      // Skip first few images (likely above fold)
      if (index > 2) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add error handling
      img.addEventListener('error', () => {
        img.setAttribute('src', '/images/placeholder.jpg');
      });
    });
  }

  /**
   * Setup lazy loading with intersection observer
   */
  private setupLazyLoading(): void {
    if (!('IntersectionObserver' in window)) return;

    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const src = element.dataset.lazy;
          
          if (src) {
            if (element.tagName === 'IMG') {
              (element as HTMLImageElement).src = src;
            } else {
              element.style.backgroundImage = `url(${src})`;
            }
            
            element.removeAttribute('data-lazy');
            observer.unobserve(element);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    lazyElements.forEach(el => observer.observe(el));
  }

  /**
   * Optimize font loading
   */
  private optimizeFontLoading(): void {
    // Add font-display: swap to existing fonts
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Track loading state for a component or operation
   */
  public startLoading(key: string, message: string = 'Loading...'): void {
    this.loadingStates.set(key, {
      isLoading: true,
      progress: 0,
      message,
      startTime: performance.now()
    });
  }

  /**
   * Update loading progress
   */
  public updateProgress(key: string, progress: number, message?: string): void {
    const state = this.loadingStates.get(key);
    if (state) {
      state.progress = Math.min(100, Math.max(0, progress));
      if (message) {
        state.message = message;
      }
    }
  }

  /**
   * Finish loading
   */
  public finishLoading(key: string): void {
    const state = this.loadingStates.get(key);
    if (state) {
      const duration = performance.now() - state.startTime;
      
      // Log slow operations in development
      if (import.meta.env.DEV && duration > 2000) {
        console.warn(`Slow loading operation: ${key} took ${duration.toFixed(2)}ms`);
      }
      
      this.loadingStates.delete(key);
    }
  }

  /**
   * Get loading state
   */
  public getLoadingState(key: string): LoadingState | undefined {
    return this.loadingStates.get(key);
  }

  /**
   * Check if any loading is in progress
   */
  public isAnyLoading(): boolean {
    return Array.from(this.loadingStates.values()).some(state => state.isLoading);
  }

  /**
   * Optimize component loading with code splitting
   */
  public async loadComponent<T>(
    importFn: () => Promise<{ default: T }>,
    componentName: string
  ): Promise<T> {
    this.startLoading(`component-${componentName}`, `Loading ${componentName}...`);
    
    try {
      const startTime = performance.now();
      const module = await importFn();
      const loadTime = performance.now() - startTime;
      
      // Log slow component loads
      if (import.meta.env.DEV && loadTime > 1000) {
        console.warn(`Slow component load: ${componentName} took ${loadTime.toFixed(2)}ms`);
      }
      
      this.finishLoading(`component-${componentName}`);
      return module.default;
    } catch (error) {
      this.finishLoading(`component-${componentName}`);
      console.error(`Failed to load component ${componentName}:`, error);
      throw error;
    }
  }

  /**
   * Batch multiple async operations
   */
  public async batchOperations<T>(
    operations: Array<() => Promise<T>>,
    batchSize: number = 3
  ): Promise<T[]> {
    const results: T[] = [];
    
    for (let i = 0; i < operations.length; i += batchSize) {
      const batch = operations.slice(i, i + batchSize);
      const batchResults = await Promise.allSettled(
        batch.map(op => op())
      );
      
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results[i + index] = result.value;
        } else {
          console.warn(`Batch operation ${i + index} failed:`, result.reason);
        }
      });
      
      // Small delay between batches to prevent overwhelming
      if (i + batchSize < operations.length) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }
    
    return results;
  }

  /**
   * Debounce function calls
   */
  public debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * Throttle function calls
   */
  public throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Optimize API calls with caching
   */
  private apiCache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  public async cachedApiCall<T>(
    key: string,
    apiCall: () => Promise<T>,
    ttl: number = 300000 // 5 minutes default
  ): Promise<T> {
    const cached = this.apiCache.get(key);
    const now = Date.now();
    
    // Return cached data if still valid
    if (cached && (now - cached.timestamp) < cached.ttl) {
      return cached.data;
    }
    
    // Make API call
    try {
      const data = await apiCall();
      
      // Cache the result
      this.apiCache.set(key, {
        data,
        timestamp: now,
        ttl
      });
      
      return data;
    } catch (error) {
      // Return stale cache if available on error
      if (cached) {
        console.warn(`API call failed, returning stale cache for ${key}`);
        return cached.data;
      }
      throw error;
    }
  }

  /**
   * Clear API cache
   */
  public clearCache(key?: string): void {
    if (key) {
      this.apiCache.delete(key);
    } else {
      this.apiCache.clear();
    }
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.apiCache.size,
      keys: Array.from(this.apiCache.keys())
    };
  }
}

// Create singleton instance
export const loadingOptimizer = new LoadingOptimizer();

// Export utility functions
export const startLoading = (key: string, message?: string) => 
  loadingOptimizer.startLoading(key, message);

export const updateProgress = (key: string, progress: number, message?: string) => 
  loadingOptimizer.updateProgress(key, progress, message);

export const finishLoading = (key: string) => 
  loadingOptimizer.finishLoading(key);

export const loadComponent = <T>(importFn: () => Promise<{ default: T }>, name: string) => 
  loadingOptimizer.loadComponent(importFn, name);

export const cachedApiCall = <T>(key: string, apiCall: () => Promise<T>, ttl?: number) => 
  loadingOptimizer.cachedApiCall(key, apiCall, ttl);

export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => 
  loadingOptimizer.debounce(func, wait);

export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number) => 
  loadingOptimizer.throttle(func, limit);

export default LoadingOptimizer;