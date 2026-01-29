import { performanceManager } from './PerformanceManager';
import { performanceOptimizer } from './performanceOptimizer';
import { performanceAnalytics } from './performanceAnalytics';
import { enrollmentMigrationManager } from './enrollmentMigration';
import { initializeUnifiedEnrollmentSystem, detectLegacyEnrollmentAccess } from './enrollmentDataMigration';

/**
 * Initialize performance management for the application
 * This should be called early in the app lifecycle
 */

export const initializePerformanceManager = (): void => {
  // Enable performance manager in development or when explicitly enabled
  const shouldEnable = import.meta.env.DEV || 
                      localStorage.getItem('enablePerformanceManager') === 'true' ||
                      new URLSearchParams(window.location.search).has('perf');

  performanceManager.setEnabled(shouldEnable);
  performanceOptimizer.setEnabled(shouldEnable);
  performanceAnalytics.setEnabled(shouldEnable);

  if (shouldEnable) {
    console.log('🚀 Performance Management Suite initialized');
    
    // Optimize assets on initialization
    performanceManager.optimizeAssets();
    
    // Apply automatic optimizations after a delay
    setTimeout(async () => {
      const appliedOptimizations = await performanceOptimizer.applyAutomaticOptimizations();
      if (appliedOptimizations.length > 0) {
        console.log('✅ Applied automatic optimizations:', appliedOptimizations);
      }
    }, 2000);
    
    // Add performance monitoring to window for debugging
    if (import.meta.env.DEV) {
      (window as any).performanceManager = performanceManager;
      (window as any).performanceOptimizer = performanceOptimizer;
      (window as any).performanceAnalytics = performanceAnalytics;
      console.log('🔧 Performance tools available at window.performanceManager, window.performanceOptimizer, and window.performanceAnalytics');
    }
  }
};

/**
 * Performance configuration for different environments
 */
export const getPerformanceConfig = () => {
  const isDev = import.meta.env.DEV;
  const isProd = import.meta.env.PROD;

  return {
    enablePerformanceTracking: isDev || localStorage.getItem('enablePerformanceTracking') === 'true',
    enableComponentPreloading: true,
    enableAssetOptimization: isProd,
    enablePerformanceLogging: isDev,
    criticalComponents: [
      'Dashboard',
      'CourseList', 
      'Navigation',
      'UserProfile',
      'AdminDashboard',
      'EnrollmentManagement',
      'CourseVideoLearning',
      'VideoPlayer',
      'DashboardStats',
      'EnrolledCoursesList'
    ],
    preloadThreshold: 1000, // ms - preload components if user hovers for this long
    performanceWarningThreshold: 500 // ms - warn if operations take longer than this
  };
};

/**
 * Setup performance monitoring for the entire application
 */
export const setupGlobalPerformanceMonitoring = (): void => {
  const config = getPerformanceConfig();

  if (!config.enablePerformanceTracking) {
    return;
  }

  // Monitor route changes
  if (typeof window !== 'undefined') {
    let currentPath = window.location.pathname;
    
    const trackRouteChange = () => {
      const newPath = window.location.pathname;
      if (newPath !== currentPath) {
        performanceManager.measurePageLoad(newPath.replace('/', '') || 'home');
        currentPath = newPath;
      }
    };

    // Listen for route changes (works with most SPA routers)
    window.addEventListener('popstate', trackRouteChange);
    
    // Also track programmatic navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setTimeout(trackRouteChange, 0);
    };
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      setTimeout(trackRouteChange, 0);
    };
  }

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > config.performanceWarningThreshold) {
            console.warn(`🐌 Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.warn('Long task monitoring not supported:', error);
    }
  }

  // Monitor memory usage (if available)
  if ('memory' in performance) {
    setInterval(() => {
      const memory = (performance as any).memory;
      const memoryUsage = {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      };
      
      // Warn if memory usage is high
      if (memoryUsage.used > memoryUsage.limit * 0.8) {
        console.warn('🧠 High memory usage detected:', memoryUsage);
      }
    }, 30000); // Check every 30 seconds
  }
};

/**
 * Smart preloading based on user behavior
 */
export const setupSmartPreloading = (): void => {
  if (typeof window === 'undefined') return;

  const config = getPerformanceConfig();
  let hoverTimeout: NodeJS.Timeout;

  // Preload components when user hovers over navigation links
  document.addEventListener('mouseover', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href]') as HTMLAnchorElement;
    
    if (link && link.href) {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        const href = link.getAttribute('href') || '';
        const componentName = getComponentNameFromRoute(href);
        
        if (componentName && config.criticalComponents.includes(componentName)) {
          performanceManager.preloadComponent(componentName).catch(console.warn);
        }
      }, config.preloadThreshold);
    }
  });

  // Cancel preloading if user moves away quickly
  document.addEventListener('mouseout', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href]');
    
    if (link) {
      clearTimeout(hoverTimeout);
    }
  });
};

/**
 * Map route paths to component names for smart preloading
 */
const getComponentNameFromRoute = (route: string): string | null => {
  const routeMap: { [key: string]: string } = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/courses': 'CourseList',
    '/admin': 'AdminDashboard',
    '/admin/enrollments': 'EnrollmentManagement',
    '/profile': 'UserProfile'
  };

  return routeMap[route] || null;
};

/**
 * Export all initialization functions
 */
export const initializeAllPerformanceFeatures = (): void => {
  // Only initialize performance features in development or when explicitly enabled
  const shouldInitialize = import.meta.env.DEV || 
                          localStorage.getItem('enablePerformanceFeatures') === 'true';
  
  if (!shouldInitialize) {
    console.log('⏸️ Performance features disabled for production');
    return;
  }

  try {
    initializePerformanceManager();
    setupGlobalPerformanceMonitoring();
    setupSmartPreloading();
    
    // Defer heavy operations to avoid blocking initial render
    setTimeout(() => {
      // Initialize unified data management layer
      enrollmentMigrationManager.startMigration().catch(() => {
        // Silently fail in production
        if (import.meta.env.DEV) {
          console.warn('Failed to migrate enrollment data');
        }
      });
      
      // Initialize unified enrollment system
      initializeUnifiedEnrollmentSystem().catch(() => {
        // Silently fail in production
        if (import.meta.env.DEV) {
          console.warn('Failed to initialize unified enrollment system');
        }
      });
    }, 1000);
    
    // Enable legacy access detection in development only
    if (import.meta.env.DEV) {
      setTimeout(() => {
        detectLegacyEnrollmentAccess();
      }, 2000);
    }
    
    // Verify DataManager integration in development only
    if (import.meta.env.DEV) {
      setTimeout(() => {
        import('./dataManagerIntegration').then(({ verifyDataManagerIntegration }) => {
          verifyDataManagerIntegration();
        }).catch(() => {
          console.warn('DataManager integration verification failed');
        });
      }, 3000);
    }
    
    console.log('✅ Performance features initialized');
    
    // Import and setup verification in development only
    if (import.meta.env.DEV) {
      setTimeout(() => {
        import('./verifyPerformanceManager').then(({ verifyPerformanceManager }) => {
          // Make verification available but don't auto-run
          (window as any).verifyPerformanceManager = verifyPerformanceManager;
        }).catch(() => {
          console.warn('Performance manager verification setup failed');
        });
      }, 4000);
    }
  } catch (error) {
    // Silently fail in production to avoid breaking the app
    if (import.meta.env.DEV) {
      console.error('Failed to initialize performance features:', error);
    }
  }
};

export default {
  initializePerformanceManager,
  setupGlobalPerformanceMonitoring,
  setupSmartPreloading,
  initializeAllPerformanceFeatures,
  getPerformanceConfig
};