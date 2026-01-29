import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InitializationSteps } from '../InitializationSteps';

// Mock Supabase
vi.mock('../../integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        limit: vi.fn(() => Promise.resolve({ data: [], error: null }))
      })),
      eq: vi.fn(() => ({
        limit: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    })),
    auth: {
      getSession: vi.fn(() => Promise.resolve({ 
        data: { session: null }, 
        error: null 
      }))
    }
  }
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock window.performance
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn()
  }
});

// Mock PerformanceObserver
global.PerformanceObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  disconnect: vi.fn()
}));

describe('InitializationSteps', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Supabase Connection Step', () => {
    it('should create supabase connection step with correct properties', () => {
      const step = InitializationSteps.createSupabaseConnectionStep();
      
      expect(step.name).toBe('supabase-connection');
      expect(step.priority).toBe(100);
      expect(step.required).toBe(true);
      expect(step.timeout).toBe(5000);
      expect(typeof step.execute).toBe('function');
      expect(typeof step.fallback).toBe('function');
    });

    it('should execute successfully when supabase connection works', async () => {
      const { supabase } = await import('../../integrations/supabase/client');
      
      // Mock successful connection
      (supabase.from as any).mockReturnValue({
        select: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve({ data: [], error: null }))
        }))
      });

      const step = InitializationSteps.createSupabaseConnectionStep();
      
      await expect(step.execute()).resolves.toBeUndefined();
    });

    it('should throw error when supabase connection fails', async () => {
      const { supabase } = await import('../../integrations/supabase/client');
      
      // Mock failed connection
      (supabase.from as any).mockReturnValue({
        select: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve({ 
            data: null, 
            error: { message: 'Connection failed', code: 'CONNECTION_ERROR' } 
          }))
        }))
      });

      const step = InitializationSteps.createSupabaseConnectionStep();
      
      await expect(step.execute()).rejects.toThrow('Supabase connection failed');
    });

    it('should execute fallback when connection fails', async () => {
      const step = InitializationSteps.createSupabaseConnectionStep();
      
      await step.fallback!();
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('app_mode', 'offline');
    });
  });

  describe('Authentication Step', () => {
    it('should create authentication step with correct properties', () => {
      const step = InitializationSteps.createAuthenticationStep();
      
      expect(step.name).toBe('authentication');
      expect(step.priority).toBe(90);
      expect(step.required).toBe(true);
      expect(step.timeout).toBe(3000);
      expect(typeof step.execute).toBe('function');
      expect(typeof step.fallback).toBe('function');
    });

    it('should execute successfully when authentication works', async () => {
      const { supabase } = await import('../../integrations/supabase/client');
      
      // Mock successful auth check
      (supabase.auth.getSession as any).mockResolvedValue({
        data: { session: { user: { id: '123' } } },
        error: null
      });

      const step = InitializationSteps.createAuthenticationStep();
      
      await expect(step.execute()).resolves.toBeUndefined();
      expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_initialized', 'true');
    });

    it('should throw error when authentication fails', async () => {
      const { supabase } = await import('../../integrations/supabase/client');
      
      // Mock failed auth check
      (supabase.auth.getSession as any).mockResolvedValue({
        data: { session: null },
        error: { message: 'Auth failed' }
      });

      const step = InitializationSteps.createAuthenticationStep();
      
      await expect(step.execute()).rejects.toThrow('Authentication check failed');
    });

    it('should execute fallback when authentication fails', async () => {
      const step = InitializationSteps.createAuthenticationStep();
      
      await step.fallback!();
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_mode', 'guest');
    });
  });

  describe('Critical Data Step', () => {
    it('should create critical data step with correct properties', () => {
      const step = InitializationSteps.createCriticalDataStep();
      
      expect(step.name).toBe('critical-data');
      expect(step.priority).toBe(80);
      expect(step.required).toBe(true);
      expect(step.timeout).toBe(4000);
      expect(typeof step.execute).toBe('function');
      expect(typeof step.fallback).toBe('function');
    });

    it('should execute successfully when data loading works', async () => {
      const { supabase } = await import('../../integrations/supabase/client');
      
      const mockCourses = [
        { id: '1', title: 'Course 1', status: 'active' },
        { id: '2', title: 'Course 2', status: 'active' }
      ];

      // Mock successful data loading
      (supabase.from as any).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            limit: vi.fn(() => Promise.resolve({ 
              data: mockCourses, 
              error: null 
            }))
          }))
        }))
      });

      const step = InitializationSteps.createCriticalDataStep();
      
      await expect(step.execute()).resolves.toBeUndefined();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'critical_data_loaded', 
        JSON.stringify(mockCourses)
      );
    });

    it('should execute fallback when data loading fails', async () => {
      const step = InitializationSteps.createCriticalDataStep();
      
      await step.fallback!();
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'critical_data_loaded',
        JSON.stringify([{ id: 'default', title: 'Default Course', status: 'active' }])
      );
    });
  });

  describe('Performance Monitoring Step', () => {
    it('should create performance monitoring step with correct properties', () => {
      const step = InitializationSteps.createPerformanceMonitoringStep();
      
      expect(step.name).toBe('performance-monitoring');
      expect(step.priority).toBe(70);
      expect(step.required).toBe(false);
      expect(step.timeout).toBe(2000);
      expect(typeof step.execute).toBe('function');
      expect(typeof step.fallback).toBe('function');
    });

    it('should execute successfully when performance API is available', async () => {
      const step = InitializationSteps.createPerformanceMonitoringStep();
      
      await expect(step.execute()).resolves.toBeUndefined();
      expect(localStorageMock.setItem).toHaveBeenCalledWith('performance_monitoring', 'enabled');
    });

    it('should execute fallback when performance monitoring fails', async () => {
      const step = InitializationSteps.createPerformanceMonitoringStep();
      
      await step.fallback!();
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('performance_monitoring', 'disabled');
    });
  });

  describe('Error Tracking Step', () => {
    it('should create error tracking step with correct properties', () => {
      const step = InitializationSteps.createErrorTrackingStep();
      
      expect(step.name).toBe('error-tracking');
      expect(step.priority).toBe(60);
      expect(step.required).toBe(false);
      expect(step.timeout).toBe(2000);
      expect(typeof step.execute).toBe('function');
      expect(typeof step.fallback).toBe('function');
    });

    it('should execute successfully and set up error handlers', async () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      
      const step = InitializationSteps.createErrorTrackingStep();
      
      await expect(step.execute()).resolves.toBeUndefined();
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('error', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));
      expect(localStorageMock.setItem).toHaveBeenCalledWith('error_tracking', 'enabled');
      
      addEventListenerSpy.mockRestore();
    });

    it('should execute fallback when error tracking fails', async () => {
      const step = InitializationSteps.createErrorTrackingStep();
      
      await step.fallback!();
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('error_tracking', 'basic');
    });
  });

  describe('Storage Cleanup Step', () => {
    it('should create storage cleanup step with correct properties', () => {
      const step = InitializationSteps.createStorageCleanupStep();
      
      expect(step.name).toBe('storage-cleanup');
      expect(step.priority).toBe(50);
      expect(step.required).toBe(false);
      expect(step.timeout).toBe(1000);
      expect(typeof step.execute).toBe('function');
    });

    it('should execute successfully and clean up corrupted data', async () => {
      // Mock corrupted data in localStorage
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'user_progress') return 'invalid json';
        if (key === 'enrollment_cache') return '{"valid": "json"}';
        return null;
      });

      const step = InitializationSteps.createStorageCleanupStep();
      
      await expect(step.execute()).resolves.toBeUndefined();
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user_progress');
      expect(localStorageMock.removeItem).not.toHaveBeenCalledWith('enrollment_cache');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('storage_cleanup', 'completed');
    });
  });

  describe('Default Steps', () => {
    it('should return all default steps in correct order', () => {
      const steps = InitializationSteps.getDefaultSteps();
      
      expect(steps).toHaveLength(6);
      
      const stepNames = steps.map(step => step.name);
      expect(stepNames).toContain('supabase-connection');
      expect(stepNames).toContain('authentication');
      expect(stepNames).toContain('critical-data');
      expect(stepNames).toContain('performance-monitoring');
      expect(stepNames).toContain('error-tracking');
      expect(stepNames).toContain('storage-cleanup');
      
      // Check that steps are properly prioritized
      const priorities = steps.map(step => step.priority);
      const sortedPriorities = [...priorities].sort((a, b) => b - a);
      expect(priorities).toEqual(sortedPriorities);
    });

    it('should have required steps marked correctly', () => {
      const steps = InitializationSteps.getDefaultSteps();
      
      const requiredSteps = steps.filter(step => step.required);
      const optionalSteps = steps.filter(step => !step.required);
      
      expect(requiredSteps).toHaveLength(3); // supabase, auth, critical-data
      expect(optionalSteps).toHaveLength(3); // performance, error-tracking, storage-cleanup
    });
  });
});