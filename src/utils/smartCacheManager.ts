/**
 * Smart Cache Manager
 * A senior-level cache management solution that works WITH the application
 * instead of aggressively clearing everything. This prevents cache issues
 * while maintaining application performance.
 */
import { logger } from './logger';

interface CacheStrategy {
  preserveUserData: boolean;
  preserveProgressData: boolean;
  preserveAuthData: boolean;
  clearStaleAssets: boolean;
  clearStaleAPI: boolean;
}

class SmartCacheManager {
  private static instance: SmartCacheManager;
  private lastBuildTime: string | null = null;
  private cacheStrategy: CacheStrategy = {
    preserveUserData: true,
    preserveProgressData: true,
    preserveAuthData: true,
    clearStaleAssets: true,
    clearStaleAPI: false, // Don't clear API cache aggressively
  };

  private constructor() {
    this.initialize();
  }

  public static getInstance(): SmartCacheManager {
    if (!SmartCacheManager.instance) {
      SmartCacheManager.instance = new SmartCacheManager();
    }
    return SmartCacheManager.instance;
  }

  private initialize(): void {
    // Get build time from meta tag or environment
    const buildTimeMeta = document.querySelector('meta[name="build-timestamp"]');
    this.lastBuildTime = buildTimeMeta?.getAttribute('content') || 
                        import.meta.env.VITE_BUILD_TIME || 
                        new Date().toISOString();

    // Check if we need to update cache strategy
    this.checkAndUpdateCache();
  }

  private checkAndUpdateCache(): void {
    const storedBuildTime = localStorage.getItem('app-build-time');
    
    if (!storedBuildTime) {
      // First time user - store build time
      localStorage.setItem('app-build-time', this.lastBuildTime!);
      return;
    }

    if (storedBuildTime !== this.lastBuildTime) {
      logger.info('New build detected, applying smart cache update...');
      this.applySmartCacheUpdate();
      localStorage.setItem('app-build-time', this.lastBuildTime!);
    }
  }

  private applySmartCacheUpdate(): void {
    // Only clear what's necessary, preserve user data
    this.clearStaleAssets();
    this.clearStaleAPICache();
    
    // Preserve important user data
    this.preserveUserData();
    
    logger.info('Smart cache update completed');
  }

  private clearStaleAssets(): void {
    if (!this.cacheStrategy.clearStaleAssets) return;

    try {
      // Clear service worker cache for assets only
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            // Only clear asset caches, not API caches
            if (cacheName.includes('assets') || cacheName.includes('static')) {
              caches.delete(cacheName);
              logger.info(`Cleared stale asset cache: ${cacheName}`);
            }
          });
        });
      }
    } catch (error) {
      logger.warn('Could not clear stale assets:', error);
    }
  }

  private clearStaleAPICache(): void {
    if (!this.cacheStrategy.clearStaleAPI) return;

    try {
      // Only clear very old API cache entries
      const apiCacheKeys = Object.keys(localStorage).filter(key => 
        key.startsWith('api-cache-') || key.startsWith('supabase-cache-')
      );

      apiCacheKeys.forEach(key => {
        const cacheData = localStorage.getItem(key);
        if (cacheData) {
          try {
            const parsed = JSON.parse(cacheData);
            const cacheTime = parsed.timestamp || 0;
            const age = Date.now() - cacheTime;
            
            // Only clear cache older than 1 hour
            if (age > 3600000) {
              localStorage.removeItem(key);
              logger.info(`Cleared old API cache: ${key}`);
            }
          } catch (error) {
            // Remove corrupted cache entries
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      logger.warn('Could not clear stale API cache:', error);
    }
  }

  private preserveUserData(): void {
    // Ensure critical user data is preserved
    const criticalKeys = [
      'user',
      'profile',
      'auth-token',
      'user-preferences',
      'course-progress-',
      'completed-lessons-',
      'progress-',
      'completedLessons-',
      'enrollments',
      'user-enrollments-'
    ];

    logger.info('Preserving critical user data during cache update');
    
    // This is handled by not clearing these keys
    // The smart strategy is to NOT clear them aggressively
  }

  public getCacheStrategy(): CacheStrategy {
    return { ...this.cacheStrategy };
  }

  public updateCacheStrategy(strategy: Partial<CacheStrategy>): void {
    this.cacheStrategy = { ...this.cacheStrategy, ...strategy };
  }

  public forceSmartRefresh(): void {
    logger.info('Performing smart refresh...');
    
    // Clear only stale assets, preserve user data
    this.clearStaleAssets();
    
    // Reload the page
    window.location.reload();
  }

  public clearSpecificCache(keys: string[]): void {
    keys.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        logger.info(`Cleared specific cache: ${key}`);
      }
    });
  }

  public getCacheStatus(): { buildTime: string; userDataPreserved: boolean; staleAssetsCleared: boolean } {
    return {
      buildTime: this.lastBuildTime || 'unknown',
      userDataPreserved: this.cacheStrategy.preserveUserData,
      staleAssetsCleared: this.cacheStrategy.clearStaleAssets
    };
  }
}

// Export singleton instance
export const smartCacheManager = SmartCacheManager.getInstance();

// Auto-initialize
smartCacheManager.getCacheStatus();
