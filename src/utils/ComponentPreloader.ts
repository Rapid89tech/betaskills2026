import { lazy, ComponentType } from 'react';

interface PreloadableComponent {
  component: ComponentType<any>;
  preloaded: boolean;
  loading: boolean;
  error?: Error;
}

export class ComponentPreloader {
  private static instance: ComponentPreloader;
  private componentCache = new Map<string, PreloadableComponent>();
  private preloadQueue = new Set<string>();
  private readonly MAX_CONCURRENT_PRELOADS = 3;
  private activePreloads = 0;

  private constructor() {}

  static getInstance(): ComponentPreloader {
    if (!ComponentPreloader.instance) {
      ComponentPreloader.instance = new ComponentPreloader();
    }
    return ComponentPreloader.instance;
  }

  // Register a component for preloading
  registerComponent(key: string, importFn: () => Promise<{ default: ComponentType<any> }>): ComponentType<any> {
    if (this.componentCache.has(key)) {
      return this.componentCache.get(key)!.component;
    }

    // Create lazy component
    const LazyComponent = lazy(importFn);

    this.componentCache.set(key, {
      component: LazyComponent,
      preloaded: false,
      loading: false
    });

    return LazyComponent;
  }

  // Preload a specific component with retry logic
  async preloadComponent(key: string, retryCount = 0): Promise<boolean> {
    const cached = this.componentCache.get(key);
    if (!cached || cached.preloaded || cached.loading) {
      return cached?.preloaded || false;
    }

    // Check concurrent preload limit
    if (this.activePreloads >= this.MAX_CONCURRENT_PRELOADS) {
      this.preloadQueue.add(key);
      return false;
    }

    cached.loading = true;
    this.activePreloads++;

    try {
      // Trigger the lazy component to load
      const componentModule = await this.getComponentImport(key);
      if (componentModule) {
        cached.preloaded = true;
        cached.error = undefined; // Clear any previous errors
        console.log(`✅ Component preloaded: ${key}`);
      }
    } catch (error) {
      cached.error = error as Error;
      console.error(`❌ Failed to preload component: ${key}`, error);
      
      // Retry logic for failed preloads
      if (retryCount < 2) {
        console.log(`🔄 Retrying preload for ${key} (attempt ${retryCount + 1})`);
        cached.loading = false;
        this.activePreloads--;
        
        // Retry after a short delay
        setTimeout(() => {
          this.preloadComponent(key, retryCount + 1);
        }, 1000 * (retryCount + 1)); // Exponential backoff
        
        return false;
      }
    } finally {
      if (retryCount === 0 || cached.preloaded || retryCount >= 2) {
        cached.loading = false;
        this.activePreloads--;
        this.processPreloadQueue();
      }
    }

    return cached.preloaded;
  }

  // Preload multiple components
  async preloadComponents(keys: string[]): Promise<boolean[]> {
    const promises = keys.map(key => this.preloadComponent(key));
    return Promise.all(promises);
  }

  // Preload components for a specific course module with enhanced strategy
  async preloadModuleComponents(moduleIndex: number, totalModules: number): Promise<void> {
    const componentsToPreload: string[] = [];

    // Always preload current module components
    componentsToPreload.push(`module-${moduleIndex}`);

    // Preload next module if exists
    if (moduleIndex < totalModules - 1) {
      componentsToPreload.push(`module-${moduleIndex + 1}`);
    }

    // Preload previous module for smooth back navigation
    if (moduleIndex > 0) {
      componentsToPreload.push(`module-${moduleIndex - 1}`);
    }

    // Preload essential components in priority order
    const essentialComponents = [
      'lesson-content',
      'quiz-component', 
      'video-player',
      'interactive-content',
      'course-controls',
      'certificate'
    ];
    
    componentsToPreload.push(...essentialComponents);

    try {
      // Preload in batches to avoid overwhelming the system
      const batchSize = 3;
      for (let i = 0; i < componentsToPreload.length; i += batchSize) {
        const batch = componentsToPreload.slice(i, i + batchSize);
        await Promise.allSettled(batch.map(component => this.preloadComponent(component)));
        
        // Small delay between batches to prevent blocking
        if (i + batchSize < componentsToPreload.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      console.log(`✅ Module ${moduleIndex} preloading completed`);
    } catch (error) {
      console.error(`❌ Module ${moduleIndex} preloading failed:`, error);
    }
  }

  // Get component import function (for internal use)
  private async getComponentImport(key: string): Promise<any> {
    // This is a mapping of component keys to their import functions
    const componentImports: Record<string, () => Promise<any>> = {
      'quiz-component': () => import('@/components/course/QuizComponent'),
      'video-player': () => import('@/components/course/VideoPlayer'),
      'lesson-content': () => import('@/components/course/LessonContent'),
      'interactive-content': () => import('@/components/course/InteractiveContent'),
      'certificate': () => import('@/components/course/Certificate'),
      'course-sidebar': () => import('@/components/course/CourseSidebar'),
      'course-controls': () => import('@/components/course/CourseControls'),
      'score-display': () => import('@/components/course/ScoreDisplay'),
      // Module-specific components can be added dynamically
    };

    const importFn = componentImports[key];
    if (importFn) {
      return await importFn();
    }

    return null;
  }

  // Process the preload queue
  private processPreloadQueue(): void {
    if (this.preloadQueue.size === 0 || this.activePreloads >= this.MAX_CONCURRENT_PRELOADS) {
      return;
    }

    const nextKey = this.preloadQueue.values().next().value;
    if (nextKey) {
      this.preloadQueue.delete(nextKey);
      this.preloadComponent(nextKey);
    }
  }

  // Check if component is preloaded
  isPreloaded(key: string): boolean {
    return this.componentCache.get(key)?.preloaded || false;
  }

  // Get preload status
  getPreloadStatus(key: string): 'not-registered' | 'loading' | 'preloaded' | 'error' {
    const cached = this.componentCache.get(key);
    if (!cached) return 'not-registered';
    if (cached.error) return 'error';
    if (cached.loading) return 'loading';
    if (cached.preloaded) return 'preloaded';
    return 'not-registered';
  }

  // Clear cache (for testing)
  clearCache(): void {
    this.componentCache.clear();
    this.preloadQueue.clear();
    this.activePreloads = 0;
  }

  // Get cache statistics
  getCacheStats(): {
    total: number;
    preloaded: number;
    loading: number;
    errors: number;
  } {
    let preloaded = 0;
    let loading = 0;
    let errors = 0;

    this.componentCache.forEach(cached => {
      if (cached.preloaded) preloaded++;
      if (cached.loading) loading++;
      if (cached.error) errors++;
    });

    return {
      total: this.componentCache.size,
      preloaded,
      loading,
      errors
    };
  }
}

// Preloader instance
export const componentPreloader = ComponentPreloader.getInstance();

// Hook for using component preloader in React components
export const useComponentPreloader = () => {
  return {
    preloadComponent: (key: string) => componentPreloader.preloadComponent(key),
    preloadComponents: (keys: string[]) => componentPreloader.preloadComponents(keys),
    preloadModuleComponents: (moduleIndex: number, totalModules: number) => 
      componentPreloader.preloadModuleComponents(moduleIndex, totalModules),
    isPreloaded: (key: string) => componentPreloader.isPreloaded(key),
    getPreloadStatus: (key: string) => componentPreloader.getPreloadStatus(key),
    getCacheStats: () => componentPreloader.getCacheStats()
  };
};