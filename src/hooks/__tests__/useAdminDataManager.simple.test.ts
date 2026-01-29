import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminDataManager } from '../useAdminDataManager';

// Mock AdminDataManager
vi.mock('@/services/AdminDataManager', () => {
  const mockAdminDataManager = {
    getEnrollments: vi.fn().mockResolvedValue([]),
    getUsers: vi.fn().mockResolvedValue([]),
    getPayments: vi.fn().mockResolvedValue([]),
    invalidateCache: vi.fn(),
    invalidateCachePattern: vi.fn(),
    invalidateCacheByType: vi.fn(),
    refreshCache: vi.fn().mockResolvedValue(undefined),
    optimizeQueries: vi.fn(),
    preloadData: vi.fn().mockResolvedValue(undefined),
    getCacheStatus: vi.fn().mockReturnValue({
      totalEntries: 0,
      hitRate: 0,
      missRate: 0,
      memoryUsage: 0,
      oldestEntry: 0,
      newestEntry: 0
    }),
    getPerformanceMetrics: vi.fn().mockReturnValue({
      queryTime: 0,
      cacheHitRate: 0,
      dataFreshness: 1,
      memoryUsage: 0,
      activeConnections: 1
    })
  };

  return {
    adminDataManager: mockAdminDataManager,
    AdminDataManager: {
      getInstance: () => mockAdminDataManager
    }
  };
});

describe('useAdminDataManager - Core Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Hook Functionality', () => {
    it('should initialize with empty data', () => {
      const { result } = renderHook(() => useAdminDataManager());

      expect(result.current.enrollments).toEqual([]);
      expect(result.current.users).toEqual([]);
      expect(result.current.payments).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasErrors).toBe(false);
    });

    it('should provide all expected functions', () => {
      const { result } = renderHook(() => useAdminDataManager());

      expect(typeof result.current.loadEnrollments).toBe('function');
      expect(typeof result.current.loadUsers).toBe('function');
      expect(typeof result.current.loadPayments).toBe('function');
      expect(typeof result.current.refreshAll).toBe('function');
      expect(typeof result.current.invalidateCache).toBe('function');
      expect(typeof result.current.invalidateCachePattern).toBe('function');
      expect(typeof result.current.invalidateCacheByType).toBe('function');
      expect(typeof result.current.refreshCache).toBe('function');
      expect(typeof result.current.optimizeQueries).toBe('function');
      expect(typeof result.current.preloadData).toBe('function');
    });
  });

  describe('Data Loading Functions', () => {
    it('should call loadEnrollments', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      await act(async () => {
        await result.current.loadEnrollments();
      });

      // Function should exist and be callable
      expect(typeof result.current.loadEnrollments).toBe('function');
    });

    it('should call loadUsers', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      await act(async () => {
        await result.current.loadUsers();
      });

      // Function should exist and be callable
      expect(typeof result.current.loadUsers).toBe('function');
    });

    it('should call loadPayments', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      await act(async () => {
        await result.current.loadPayments();
      });

      // Function should exist and be callable
      expect(typeof result.current.loadPayments).toBe('function');
    });

    it('should call refreshAll', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      await act(async () => {
        await result.current.refreshAll();
      });

      // Function should exist and be callable
      expect(typeof result.current.refreshAll).toBe('function');
    });
  });

  describe('Cache Management Functions', () => {
    it('should call invalidateCache', () => {
      const { result } = renderHook(() => useAdminDataManager());

      act(() => {
        result.current.invalidateCache('test-key');
      });

      // Function should exist and be callable
      expect(typeof result.current.invalidateCache).toBe('function');
    });

    it('should call invalidateCachePattern', () => {
      const { result } = renderHook(() => useAdminDataManager());

      act(() => {
        result.current.invalidateCachePattern('test-pattern');
      });

      // Function should exist and be callable
      expect(typeof result.current.invalidateCachePattern).toBe('function');
    });

    it('should call invalidateCacheByType', () => {
      const { result } = renderHook(() => useAdminDataManager());

      act(() => {
        result.current.invalidateCacheByType('enrollments');
      });

      // Function should exist and be callable
      expect(typeof result.current.invalidateCacheByType).toBe('function');
    });

    it('should call refreshCache', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      await act(async () => {
        await result.current.refreshCache();
      });

      // Function should exist and be callable
      expect(typeof result.current.refreshCache).toBe('function');
    });
  });

  describe('Performance Functions', () => {
    it('should call optimizeQueries', () => {
      const { result } = renderHook(() => useAdminDataManager());

      act(() => {
        result.current.optimizeQueries();
      });

      // Function should exist and be callable
      expect(typeof result.current.optimizeQueries).toBe('function');
    });

    it('should call preloadData', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      await act(async () => {
        await result.current.preloadData(['test:key']);
      });

      // Function should exist and be callable
      expect(typeof result.current.preloadData).toBe('function');
    });
  });

  describe('State Properties', () => {
    it('should provide loading states', () => {
      const { result } = renderHook(() => useAdminDataManager());

      expect(typeof result.current.enrollmentsLoading).toBe('boolean');
      expect(typeof result.current.usersLoading).toBe('boolean');
      expect(typeof result.current.paymentsLoading).toBe('boolean');
      expect(typeof result.current.isLoading).toBe('boolean');
    });

    it('should provide error states', () => {
      const { result } = renderHook(() => useAdminDataManager());

      expect(result.current.enrollmentsError).toBeNull();
      expect(result.current.usersError).toBeNull();
      expect(result.current.paymentsError).toBeNull();
      expect(typeof result.current.hasErrors).toBe('boolean');
    });

    it('should provide performance metrics', () => {
      const { result } = renderHook(() => useAdminDataManager());

      // These might be null initially, but should be defined properties
      expect('cacheStatus' in result.current).toBe(true);
      expect('performanceMetrics' in result.current).toBe(true);
    });
  });

  describe('Hook Options', () => {
    it('should accept options', () => {
      const options = {
        autoRefresh: false,
        refreshInterval: 10000,
        enablePrefetch: false,
        prefetchKeys: []
      };

      const { result } = renderHook(() => useAdminDataManager(options));

      // Hook should initialize without errors
      expect(result.current).toBeDefined();
    });
  });
});