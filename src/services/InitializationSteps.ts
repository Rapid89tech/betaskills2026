import { InitializationStep } from '../types/initialization';
import { supabase } from '../integrations/supabase/client';

/**
 * Common initialization steps for the application
 */
export class InitializationSteps {
  /**
   * Initialize Supabase connection
   */
  static createSupabaseConnectionStep(): InitializationStep {
    return {
      name: 'supabase-connection',
      priority: 100,
      required: true,
      timeout: 5000,
      execute: async () => {
        // Test Supabase connection
        const { error } = await supabase.from('profiles').select('count').limit(1);
        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" which is fine
          throw new Error(`Supabase connection failed: ${error.message}`);
        }
      },
      fallback: async () => {
        // Fallback: Set offline mode or use local storage
        console.warn('Supabase connection failed, running in offline mode');
        localStorage.setItem('app_mode', 'offline');
      }
    };
  }

  /**
   * Initialize user authentication state
   */
  static createAuthenticationStep(): InitializationStep {
    return {
      name: 'authentication',
      priority: 90,
      required: true,
      timeout: 3000,
      execute: async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          throw new Error(`Authentication check failed: ${error.message}`);
        }
        
        // Store session state for app use
        if (session) {
          localStorage.setItem('auth_initialized', 'true');
        }
      },
      fallback: async () => {
        // Fallback: Continue without authentication (guest mode)
        console.warn('Authentication initialization failed, continuing in guest mode');
        localStorage.setItem('auth_mode', 'guest');
      }
    };
  }

  /**
   * Load critical application data
   */
  static createCriticalDataStep(): InitializationStep {
    return {
      name: 'critical-data',
      priority: 80,
      required: true,
      timeout: 4000,
      execute: async () => {
        // Load essential data like courses, user profile, etc.
        const { data: courses, error: coursesError } = await supabase
          .from('courses')
          .select('id, title, status')
          .eq('status', 'active')
          .limit(5);

        if (coursesError) {
          throw new Error(`Failed to load critical data: ${coursesError.message}`);
        }

        // Cache critical data
        if (courses) {
          localStorage.setItem('critical_data_loaded', JSON.stringify(courses));
        }
      },
      fallback: async () => {
        // Fallback: Load from cache or use default data
        const cachedData = localStorage.getItem('critical_data_loaded');
        if (!cachedData) {
          // Use minimal default data
          const defaultData = [{ id: 'default', title: 'Default Course', status: 'active' }];
          localStorage.setItem('critical_data_loaded', JSON.stringify(defaultData));
        }
        console.warn('Using cached or default critical data');
      }
    };
  }

  /**
   * Initialize performance monitoring
   */
  static createPerformanceMonitoringStep(): InitializationStep {
    return {
      name: 'performance-monitoring',
      priority: 70,
      required: false,
      timeout: 2000,
      execute: async () => {
        // Initialize performance monitoring
        if (typeof window !== 'undefined' && window.performance) {
          // Set up performance observers
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (entry.entryType === 'navigation') {
                console.log('Navigation timing:', entry);
              }
            });
          });
          
          observer.observe({ entryTypes: ['navigation', 'resource'] });
          localStorage.setItem('performance_monitoring', 'enabled');
        }
      },
      fallback: async () => {
        // Fallback: Disable performance monitoring
        console.warn('Performance monitoring initialization failed, continuing without monitoring');
        localStorage.setItem('performance_monitoring', 'disabled');
      }
    };
  }

  /**
   * Initialize error tracking
   */
  static createErrorTrackingStep(): InitializationStep {
    return {
      name: 'error-tracking',
      priority: 60,
      required: false,
      timeout: 2000,
      execute: async () => {
        // Set up global error handlers
        window.addEventListener('error', (event) => {
          console.error('Global error:', event.error);
          // In production, this would send to error tracking service
        });

        window.addEventListener('unhandledrejection', (event) => {
          console.error('Unhandled promise rejection:', event.reason);
          // In production, this would send to error tracking service
        });

        localStorage.setItem('error_tracking', 'enabled');
      },
      fallback: async () => {
        // Fallback: Basic console logging only
        console.warn('Error tracking initialization failed, using basic logging');
        localStorage.setItem('error_tracking', 'basic');
      }
    };
  }

  /**
   * Initialize local storage cleanup
   */
  static createStorageCleanupStep(): InitializationStep {
    return {
      name: 'storage-cleanup',
      priority: 50,
      required: false,
      timeout: 1000,
      execute: async () => {
        // Clean up old or corrupted localStorage entries
        const keysToCheck = ['user_progress', 'enrollment_cache', 'course_data'];
        
        keysToCheck.forEach(key => {
          const value = localStorage.getItem(key);
          if (value) {
            try {
              JSON.parse(value);
            } catch (error) {
              // Remove corrupted data
              localStorage.removeItem(key);
              console.log(`Removed corrupted localStorage key: ${key}`);
            }
          }
        });

        localStorage.setItem('storage_cleanup', 'completed');
      }
    };
  }

  /**
   * Get default initialization steps
   */
  static getDefaultSteps(): InitializationStep[] {
    return [
      this.createSupabaseConnectionStep(),
      this.createAuthenticationStep(),
      this.createCriticalDataStep(),
      this.createPerformanceMonitoringStep(),
      this.createErrorTrackingStep(),
      this.createStorageCleanupStep()
    ];
  }
}