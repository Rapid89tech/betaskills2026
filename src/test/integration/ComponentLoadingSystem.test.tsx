/**
 * Component Loading System Integration Tests
 * 
 * Tests the complete component loading system including:
 * - ComponentLoadingManager integration
 * - Fallback component handling
 * - Error recovery scenarios
 * - Preloading functionality
 * - Real-world usage patterns
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { ComponentLoadingManager, ComponentRegistration } from '../../services/ComponentLoadingManager';
import { ComponentFallbacks } from '../../components/loading/ComponentFallbacks';

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, ...props }: any) =>
    React.createElement('button', {
      onClick,
      className: `btn ${className || ''}`,
      'data-testid': 'button',
      ...props
    }, children)
}));

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: any) =>
    React.createElement('div', {
      className: `card ${className || ''}`,
      'data-testid': 'card',
      ...props
    }, children),
  CardContent: ({ children, className, ...props }: any) =>
    React.createElement('div', {
      className: `card-content ${className || ''}`,
      'data-testid': 'card-content',
      ...props
    }, children),
  CardHeader: ({ children, className, ...props }: any) =>
    React.createElement('div', {
      className: `card-header ${className || ''}`,
      'data-testid': 'card-header',
      ...props
    }, children),
  CardTitle: ({ children, className, ...props }: any) =>
    React.createElement('h3', {
      className: `card-title ${className || ''}`,
      'data-testid': 'card-title',
      ...props
    }, children)
}));

vi.mock('@/components/ui/alert', () => ({
  Alert: ({ children, className, ...props }: any) =>
    React.createElement('div', {
      className: `alert ${className || ''}`,
      'data-testid': 'alert',
      ...props
    }, children),
  AlertDescription: ({ children, className, ...props }: any) =>
    React.createElement('div', {
      className: `alert-description ${className || ''}`,
      'data-testid': 'alert-description',
      ...props
    }, children)
}));

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  AlertCircle: () => React.createElement('div', { 'data-testid': 'alert-circle-icon' }),
  RefreshCw: () => React.createElement('div', { 'data-testid': 'refresh-icon' }),
  Home: () => React.createElement('div', { 'data-testid': 'home-icon' }),
  User: () => React.createElement('div', { 'data-testid': 'user-icon' }),
  BookOpen: () => React.createElement('div', { 'data-testid': 'book-icon' }),
  Settings: () => React.createElement('div', { 'data-testid': 'settings-icon' }),
  FileText: () => React.createElement('div', { 'data-testid': 'file-icon' }),
  Users: () => React.createElement('div', { 'data-testid': 'users-icon' })
}));

// Mock dependencies
vi.mock('@/utils/loadingOptimizer', () => ({
  loadingOptimizer: {
    startLoading: vi.fn(),
    finishLoading: vi.fn(),
    updateProgress: vi.fn()
  }
}));

vi.mock('@/utils/FallbackManager', () => ({
  fallbackManager: {
    withFallback: vi.fn()
  }
}));

// Mock performance API
Object.defineProperty(global, 'performance', {
  value: {
    now: vi.fn(() => Date.now())
  }
});

// Mock window and document
Object.defineProperty(global, 'window', {
  value: {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    requestIdleCallback: vi.fn((callback) => setTimeout(callback, 0)),
    scrollY: 0,
    location: { reload: vi.fn() }
  }
});

Object.defineProperty(global, 'document', {
  value: {
    readyState: 'complete',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  }
});

describe('Component Loading System Integration', () => {
  let manager: ComponentLoadingManager;

  beforeEach(() => {
    // Reset singleton instance
    (ComponentLoadingManager as any).instance = undefined;
    manager = ComponentLoadingManager.getInstance();
    vi.clearAllMocks();
  });

  afterEach(() => {
    manager.clearCache();
  });

  describe('Successful Component Loading Flow', () => {
    it('should load component successfully through the system', async () => {
      // Create a mock component
      const MockComponent: React.FC = () => (
        React.createElement('div', { 'data-testid': 'mock-component' }, 'Mock Component Loaded')
      );

      // Register component
      const registration: ComponentRegistration = {
        name: 'SuccessfulComponent',
        importFn: () => Promise.resolve({ default: MockComponent }),
        critical: false
      };

      manager.registerComponent(registration);

      // Load component directly
      const result = await manager.loadComponent('SuccessfulComponent');

      expect(result.success).toBe(true);
      expect(result.component).toBe(MockComponent);
      expect(result.fallbackUsed).toBe(false);
      expect(result.loadTime).toBeGreaterThan(0);
    });

    it('should preload critical components automatically', async () => {
      const CriticalComponent: React.FC = () => (
        React.createElement('div', { 'data-testid': 'critical-component' }, 'Critical Component')
      );

      const registration: ComponentRegistration = {
        name: 'CriticalComponent',
        importFn: () => Promise.resolve({ default: CriticalComponent }),
        critical: true,
        preloadTrigger: 'immediate'
      };

      manager.registerComponent(registration);

      // Wait for preloading to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      expect(manager.isPreloaded('CriticalComponent')).toBe(true);

      const stats = manager.getLoadingStats();
      expect(stats.preloadedComponents).toBeGreaterThan(0);
    });
  });

  describe('Error Handling and Fallback Flow', () => {
    it('should use fallback component when loading fails', async () => {
      const FallbackComponent: React.FC = () => (
        React.createElement('div', { 'data-testid': 'fallback-component' }, 'Fallback Component')
      );

      const registration: ComponentRegistration = {
        name: 'FailingComponent',
        importFn: () => Promise.reject(new Error('Component failed to load')),
        critical: false,
        fallback: FallbackComponent
      };

      manager.registerComponent(registration);

      // Load component and expect fallback
      const result = await manager.loadComponent('FailingComponent');

      expect(result.success).toBe(false);
      expect(result.fallbackUsed).toBe(true);
      expect(result.component).toBe(FallbackComponent);
      expect(result.error?.message).toBe('Component failed to load');
    });

    it('should retry failed component loads with exponential backoff', async () => {
      let attemptCount = 0;
      const RetryComponent: React.FC = () => (
        React.createElement('div', { 'data-testid': 'retry-component' }, 'Retry Component Loaded')
      );

      const registration: ComponentRegistration = {
        name: 'RetryComponent',
        importFn: () => {
          attemptCount++;
          if (attemptCount < 3) {
            return Promise.reject(new Error(`Attempt ${attemptCount} failed`));
          }
          return Promise.resolve({ default: RetryComponent });
        },
        critical: false,
        fallback: ComponentFallbacks.Error
      };

      manager.registerComponent(registration);
      manager.updateConfig({ maxRetries: 3, retryDelay: 10 });

      const result = await manager.loadComponent('RetryComponent');

      expect(result.success).toBe(true);
      expect(result.retryCount).toBe(2); // Third attempt succeeded
      expect(attemptCount).toBe(3);
    });

    it('should handle timeout scenarios gracefully', async () => {
      const SlowComponent: React.FC = () => (
        React.createElement('div', { 'data-testid': 'slow-component' }, 'Slow Component')
      );

      const TimeoutFallback: React.FC = () => (
        React.createElement('div', { 'data-testid': 'timeout-fallback' }, 'Timeout Fallback')
      );

      const registration: ComponentRegistration = {
        name: 'SlowComponent',
        importFn: () => new Promise((resolve) => {
          setTimeout(() => resolve({ default: SlowComponent }), 2000);
        }),
        critical: false,
        fallback: TimeoutFallback
      };

      manager.registerComponent(registration);
      manager.updateConfig({ timeout: 100 }); // Very short timeout

      const result = await manager.loadComponent('SlowComponent');

      expect(result.success).toBe(false);
      expect(result.fallbackUsed).toBe(true);
      expect(result.component).toBe(TimeoutFallback);
      expect(result.error?.message).toContain('timed out');
    }, 10000);
  });

  describe('Fallback Component System', () => {
    it('should provide different fallback types', () => {
      // Test that all fallback components are available
      expect(ComponentFallbacks.Loading).toBeDefined();
      expect(ComponentFallbacks.Error).toBeDefined();
      expect(ComponentFallbacks.Dashboard).toBeDefined();
      expect(ComponentFallbacks.CourseContent).toBeDefined();
      expect(ComponentFallbacks.AdminPanel).toBeDefined();
      expect(ComponentFallbacks.UserProfile).toBeDefined();
      expect(ComponentFallbacks.Form).toBeDefined();
      expect(ComponentFallbacks.List).toBeDefined();
      expect(ComponentFallbacks.Minimal).toBeDefined();
      expect(ComponentFallbacks.Skeleton).toBeDefined();
    });

    it('should allow custom fallback registration', () => {
      const CustomFallback: React.FC = () => (
        React.createElement('div', { 'data-testid': 'custom-fallback' }, 'Custom Fallback')
      );

      manager.registerFallback('CustomComponent', CustomFallback);

      const registration: ComponentRegistration = {
        name: 'CustomComponent',
        importFn: () => Promise.reject(new Error('Custom error')),
        critical: false
      };

      manager.registerComponent(registration);

      // The custom fallback should be registered
      expect(manager.getLoadingState('CustomComponent')).toBeDefined();
    });
  });

  describe('Performance and Monitoring', () => {
    it('should track loading performance metrics', async () => {
      const PerformanceComponent: React.FC = () => (
        React.createElement('div', { 'data-testid': 'performance-component' }, 'Performance Component')
      );

      const registration: ComponentRegistration = {
        name: 'PerformanceComponent',
        importFn: () => Promise.resolve({ default: PerformanceComponent }),
        critical: false
      };

      manager.registerComponent(registration);

      const result = await manager.loadComponent('PerformanceComponent');

      expect(result.loadTime).toBeGreaterThan(0);

      const stats = manager.getLoadingStats();
      expect(stats.averageLoadTime).toBeGreaterThan(0);
      expect(stats.totalComponents).toBeGreaterThan(0);
    });

    it('should provide comprehensive loading statistics', async () => {
      // Register multiple components with different characteristics
      const components = [
        {
          name: 'Component1',
          critical: true,
          shouldFail: false
        },
        {
          name: 'Component2',
          critical: false,
          shouldFail: true
        },
        {
          name: 'Component3',
          critical: false,
          shouldFail: false
        }
      ];

      const ErrorFallback: React.FC = () => React.createElement('div', {}, 'Error');

      for (const comp of components) {
        const registration: ComponentRegistration = {
          name: comp.name,
          importFn: comp.shouldFail
            ? () => Promise.reject(new Error('Component failed'))
            : () => Promise.resolve({ default: () => React.createElement('div', {}, comp.name) }),
          critical: comp.critical,
          fallback: ErrorFallback
        };

        manager.registerComponent(registration);
      }

      // Load all components
      await Promise.allSettled(
        components.map(comp => manager.loadComponent(comp.name))
      );

      const stats = manager.getLoadingStats();

      expect(stats.totalComponents).toBe(3);
      expect(stats.criticalComponents).toBe(1);
      expect(stats.failedComponents).toBe(1);
    });
  });

  describe('Context-Based Preloading', () => {
    it('should preload components for specific contexts', async () => {
      const DashboardComponent: React.FC = () => (
        React.createElement('div', { 'data-testid': 'dashboard-component' }, 'Dashboard')
      );

      const ProfileComponent: React.FC = () => (
        React.createElement('div', { 'data-testid': 'profile-component' }, 'Profile')
      );

      const registrations: ComponentRegistration[] = [
        {
          name: 'DashboardComponent',
          importFn: () => Promise.resolve({ default: DashboardComponent }),
          critical: false
        },
        {
          name: 'ProfileComponent',
          importFn: () => Promise.resolve({ default: ProfileComponent }),
          critical: false
        }
      ];

      registrations.forEach(reg => manager.registerComponent(reg));

      await manager.preloadForContext('user-area', ['DashboardComponent', 'ProfileComponent']);

      expect(manager.isPreloaded('DashboardComponent')).toBe(true);
      expect(manager.isPreloaded('ProfileComponent')).toBe(true);
    });
  });

  describe('Real-World Usage Scenarios', () => {
    it('should handle admin dashboard loading with fallback', async () => {
      const AdminDashboard: React.FC = () => (
        React.createElement('div', { 'data-testid': 'admin-dashboard' }, 'Admin Dashboard')
      );

      const AdminFallback: React.FC = () => (
        React.createElement('div', { 'data-testid': 'admin-fallback' }, 'Admin Panel Unavailable')
      );

      const registration: ComponentRegistration = {
        name: 'AdminDashboard',
        importFn: () => Promise.reject(new Error('Admin access denied')),
        critical: false,
        fallback: AdminFallback
      };

      manager.registerComponent(registration);

      const result = await manager.loadComponent('AdminDashboard');

      expect(result.success).toBe(false);
      expect(result.fallbackUsed).toBe(true);
      expect(result.component).toBe(AdminFallback);
      expect(result.error?.message).toBe('Admin access denied');
    });

    it('should handle course content loading with network issues', async () => {
      const CourseContent: React.FC = () => (
        React.createElement('div', { 'data-testid': 'course-content' }, 'Course Content')
      );

      const CourseFallback: React.FC = () => (
        React.createElement('div', { 'data-testid': 'course-fallback' }, 'Course Content Unavailable')
      );

      const registration: ComponentRegistration = {
        name: 'CourseContent',
        importFn: () => Promise.reject(new Error('Network timeout')),
        critical: false,
        fallback: CourseFallback
      };

      manager.registerComponent(registration);

      const result = await manager.loadComponent('CourseContent');

      expect(result.success).toBe(false);
      expect(result.fallbackUsed).toBe(true);
      expect(result.component).toBe(CourseFallback);
      expect(result.error?.message).toBe('Network timeout');
    });

    it('should handle form loading failures gracefully', async () => {
      const ContactForm: React.FC = () => (
        React.createElement('div', { 'data-testid': 'contact-form' }, 'Contact Form')
      );

      const FormFallback: React.FC = () => (
        React.createElement('div', { 'data-testid': 'form-fallback' }, 'Form Unavailable')
      );

      const registration: ComponentRegistration = {
        name: 'ContactForm',
        importFn: () => Promise.reject(new Error('Form module not found')),
        critical: false,
        fallback: FormFallback
      };

      manager.registerComponent(registration);

      const result = await manager.loadComponent('ContactForm');

      expect(result.success).toBe(false);
      expect(result.fallbackUsed).toBe(true);
      expect(result.component).toBe(FormFallback);
      expect(result.error?.message).toBe('Form module not found');
    });
  });

  describe('Configuration and Customization', () => {
    it('should respect custom configuration settings', async () => {
      const CustomComponent: React.FC = () => (
        React.createElement('div', { 'data-testid': 'custom-component' }, 'Custom Component')
      );

      manager.updateConfig({
        maxRetries: 5,
        retryDelay: 50,
        timeout: 5000,
        enableFallbacks: true,
        enablePerformanceTracking: true
      });

      const config = manager.getConfig();

      expect(config.maxRetries).toBe(5);
      expect(config.retryDelay).toBe(50);
      expect(config.timeout).toBe(5000);
      expect(config.enableFallbacks).toBe(true);
      expect(config.enablePerformanceTracking).toBe(true);
    });

    it('should allow custom fallback registration', () => {
      const CustomFallback: React.FC = () => (
        React.createElement('div', { 'data-testid': 'custom-fallback' }, 'Custom Fallback')
      );

      manager.registerFallback('CustomComponent', CustomFallback);

      const registration: ComponentRegistration = {
        name: 'CustomComponent',
        importFn: () => Promise.reject(new Error('Custom error')),
        critical: false
      };

      manager.registerComponent(registration);

      // The custom fallback should be used
      expect(manager.getLoadingState('CustomComponent')).toBeDefined();
    });
  });
});