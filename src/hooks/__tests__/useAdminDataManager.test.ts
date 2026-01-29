import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAdminDataManager, useEnrollmentManager, useUserManager, usePaymentManager } from '../useAdminDataManager';
import { EnrollmentStatus, PaymentStatus } from '@/types/enrollment';

// Mock AdminDataManager
vi.mock('@/services/AdminDataManager', () => {
  const mockAdminDataManager = {
    getEnrollments: vi.fn(),
    getUsers: vi.fn(),
    getPayments: vi.fn(),
    invalidateCache: vi.fn(),
    invalidateCachePattern: vi.fn(),
    invalidateCacheByType: vi.fn(),
    refreshCache: vi.fn(),
    optimizeQueries: vi.fn(),
    preloadData: vi.fn(),
    getCacheStatus: vi.fn(),
    getPerformanceMetrics: vi.fn()
  };

  return {
    adminDataManager: mockAdminDataManager,
    AdminDataManager: {
      getInstance: () => mockAdminDataManager
    }
  };
});

describe('useAdminDataManager', () => {
  const mockEnrollments = [
    {
      id: '1',
      userId: 'user1',
      courseId: 'course1',
      status: EnrollmentStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const mockUsers = [
    {
      id: 'user1',
      email: 'user1@example.com',
      first_name: 'John',
      last_name: 'Doe',
      role: 'student',
      approval_status: 'approved',
      created_at: '2024-01-01T00:00:00Z'
    }
  ];

  const mockPayments = [
    {
      id: 'payment1',
      enrollmentId: 'enrollment1',
      transactionId: 'txn1',
      reference: 'ref1',
      amount: 100,
      currency: 'ZAR',
      status: 'completed',
      initiatedAt: new Date()
    }
  ];

  const mockCacheStatus = {
    totalEntries: 5,
    hitRate: 0.8,
    missRate: 0.2,
    memoryUsage: 1024,
    oldestEntry: Date.now() - 300000,
    newestEntry: Date.now()
  };

  const mockPerformanceMetrics = {
    queryTime: 150,
    cacheHitRate: 0.8,
    dataFreshness: 0.9,
    memoryUsage: 1024,
    activeConnections: 1
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    
    const { adminDataManager } = await import('@/services/AdminDataManager');
    const mockAdminDataManager = adminDataManager as any;
    
    mockAdminDataManager.getEnrollments.mockResolvedValue(mockEnrollments);
    mockAdminDataManager.getUsers.mockResolvedValue(mockUsers);
    mockAdminDataManager.getPayments.mockResolvedValue(mockPayments);
    mockAdminDataManager.getCacheStatus.mockReturnValue(mockCacheStatus);
    mockAdminDataManager.getPerformanceMetrics.mockReturnValue(mockPerformanceMetrics);
    mockAdminDataManager.preloadData.mockResolvedValue(undefined);
    mockAdminDataManager.refreshCache.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Basic Functionality', () => {
    it('should initialize with empty data', () => {
      const { result } = renderHook(() => useAdminDataManager());

      expect(result.current.enrollments).toEqual([]);
      expect(result.current.users).toEqual([]);
      expect(result.current.payments).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasErrors).toBe(false);
    });

    it('should load initial data on mount', async () => {
      const { adminDataManager } = await import('@/services/AdminDataManager');
      const mockAdminDataManager = adminDataManager as any;
      
      const { result } = renderHook(() => useAdminDataManager());

      await waitFor(() => {
        expect(mockAdminDataManager.getEnrollments).toHaveBeenCalled();
        expect(mockAdminDataManager.getUsers).toHaveBeenCalled();
        expect(mockAdminDataManager.getPayments).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(result.current.enrollments).toEqual(mockEnrollments);
        expect(result.current.users).toEqual(mockUsers);
        expect(result.current.payments).toEqual(mockPayments);
      });
    });

    it('should enable prefetching when configured', async () => {
      const prefetchKeys = ['enrollments:recent', 'users:active'];
      
      renderHook(() => useAdminDataManager({
        enablePrefetch: true,
        prefetchKeys
      }));

      await waitFor(() => {
        expect(mockAdminDataManager.preloadData).toHaveBeenCalledWith(prefetchKeys);
      });
    });
  });

  describe('Data Loading', () => {
    it('should load enrollments with filters', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      const filters = { status: [EnrollmentStatus.PENDING] };

      await act(async () => {
        await result.current.loadEnrollments(filters);
      });

      expect(mockAdminDataManager.getEnrollments).toHaveBeenCalledWith(filters);
      expect(result.current.enrollments).toEqual(mockEnrollments);
    });

    it('should load users with filters', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      const filters = { role: ['student'] };

      await act(async () => {
        await result.current.loadUsers(filters);
      });

      expect(mockAdminDataManager.getUsers).toHaveBeenCalledWith(filters);
      expect(result.current.users).toEqual(mockUsers);
    });

    it('should load payments with filters', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      const filters = { status: [PaymentStatus.COMPLETED] };

      await act(async () => {
        await result.current.loadPayments(filters);
      });

      expect(mockAdminDataManager.getPayments).toHaveBeenCalledWith(filters);
      expect(result.current.payments).toEqual(mockPayments);
    });

    it('should refresh all data', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      await act(async () => {
        await result.current.refreshAll();
      });

      expect(mockAdminDataManager.getEnrollments).toHaveBeenCalled();
      expect(mockAdminDataManager.getUsers).toHaveBeenCalled();
      expect(mockAdminDataManager.getPayments).toHaveBeenCalled();
    });
  });

  describe('Loading States', () => {
    it('should set loading state during data fetch', async () => {
      let resolveEnrollments: (value: any) => void;
      const enrollmentsPromise = new Promise(resolve => {
        resolveEnrollments = resolve;
      });
      
      mockAdminDataManager.getEnrollments.mockReturnValue(enrollmentsPromise);

      const { result } = renderHook(() => useAdminDataManager());

      act(() => {
        result.current.loadEnrollments();
      });

      expect(result.current.enrollmentsLoading).toBe(true);

      await act(async () => {
        resolveEnrollments(mockEnrollments);
        await enrollmentsPromise;
      });

      expect(result.current.enrollmentsLoading).toBe(false);
    });

    it('should handle loading errors', async () => {
      const error = new Error('Failed to load data');
      mockAdminDataManager.getEnrollments.mockRejectedValue(error);

      const { result } = renderHook(() => useAdminDataManager());

      await act(async () => {
        await result.current.loadEnrollments();
      });

      expect(result.current.enrollmentsError).toBe('Failed to load data');
      expect(result.current.hasErrors).toBe(true);
    });
  });

  describe('Cache Management', () => {
    it('should invalidate cache by key', () => {
      const { result } = renderHook(() => useAdminDataManager());

      act(() => {
        result.current.invalidateCache('test-key');
      });

      expect(mockAdminDataManager.invalidateCache).toHaveBeenCalledWith('test-key');
    });

    it('should invalidate cache by pattern', () => {
      const { result } = renderHook(() => useAdminDataManager());

      act(() => {
        result.current.invalidateCachePattern('enrollments');
      });

      expect(mockAdminDataManager.invalidateCachePattern).toHaveBeenCalledWith('enrollments');
    });

    it('should invalidate cache by type', () => {
      const { result } = renderHook(() => useAdminDataManager());

      act(() => {
        result.current.invalidateCacheByType('users');
      });

      expect(mockAdminDataManager.invalidateCacheByType).toHaveBeenCalledWith('users');
    });

    it('should refresh cache and reload data', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      await act(async () => {
        await result.current.refreshCache();
      });

      expect(mockAdminDataManager.refreshCache).toHaveBeenCalled();
      expect(mockAdminDataManager.getEnrollments).toHaveBeenCalled();
      expect(mockAdminDataManager.getUsers).toHaveBeenCalled();
      expect(mockAdminDataManager.getPayments).toHaveBeenCalled();
    });
  });

  describe('Performance Monitoring', () => {
    it('should provide cache status', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      await waitFor(() => {
        expect(result.current.cacheStatus).toEqual(mockCacheStatus);
      });
    });

    it('should provide performance metrics', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      await waitFor(() => {
        expect(result.current.performanceMetrics).toEqual(mockPerformanceMetrics);
      });
    });

    it('should optimize queries', () => {
      const { result } = renderHook(() => useAdminDataManager());

      act(() => {
        result.current.optimizeQueries();
      });

      expect(mockAdminDataManager.optimizeQueries).toHaveBeenCalled();
    });

    it('should preload data', async () => {
      const { result } = renderHook(() => useAdminDataManager());

      const keys = ['test:key1', 'test:key2'];

      await act(async () => {
        await result.current.preloadData(keys);
      });

      expect(mockAdminDataManager.preloadData).toHaveBeenCalledWith(keys);
    });
  });

  describe('Auto Refresh', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should auto-refresh data when enabled', async () => {
      renderHook(() => useAdminDataManager({
        autoRefresh: true,
        refreshInterval: 1000
      }));

      // Initial load
      await waitFor(() => {
        expect(mockAdminDataManager.getEnrollments).toHaveBeenCalledTimes(1);
      });

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        expect(mockAdminDataManager.getEnrollments).toHaveBeenCalledTimes(2);
      });
    });

    it('should not auto-refresh when disabled', async () => {
      renderHook(() => useAdminDataManager({
        autoRefresh: false
      }));

      // Initial load
      await waitFor(() => {
        expect(mockAdminDataManager.getEnrollments).toHaveBeenCalledTimes(1);
      });

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(30000);
      });

      // Should still be only 1 call
      expect(mockAdminDataManager.getEnrollments).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Specialized Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAdminDataManager.getEnrollments.mockResolvedValue([]);
    mockAdminDataManager.getUsers.mockResolvedValue([]);
    mockAdminDataManager.getPayments.mockResolvedValue([]);
  });

  describe('useEnrollmentManager', () => {
    it('should load enrollments with filters', async () => {
      const filters = { status: [EnrollmentStatus.PENDING] };
      
      renderHook(() => useEnrollmentManager(filters));

      await waitFor(() => {
        expect(mockAdminDataManager.getEnrollments).toHaveBeenCalledWith(filters);
      });
    });

    it('should refresh enrollments', async () => {
      const { result } = renderHook(() => useEnrollmentManager());

      await act(async () => {
        await result.current.refresh();
      });

      expect(mockAdminDataManager.invalidateCacheByType).toHaveBeenCalledWith('enrollments');
      expect(mockAdminDataManager.getEnrollments).toHaveBeenCalled();
    });
  });

  describe('useUserManager', () => {
    it('should load users with filters', async () => {
      const filters = { role: ['student'] };
      
      renderHook(() => useUserManager(filters));

      await waitFor(() => {
        expect(mockAdminDataManager.getUsers).toHaveBeenCalledWith(filters);
      });
    });

    it('should refresh users', async () => {
      const { result } = renderHook(() => useUserManager());

      await act(async () => {
        await result.current.refresh();
      });

      expect(mockAdminDataManager.invalidateCacheByType).toHaveBeenCalledWith('users');
      expect(mockAdminDataManager.getUsers).toHaveBeenCalled();
    });
  });

  describe('usePaymentManager', () => {
    it('should load payments with filters', async () => {
      const filters = { status: [PaymentStatus.COMPLETED] };
      
      renderHook(() => usePaymentManager(filters));

      await waitFor(() => {
        expect(mockAdminDataManager.getPayments).toHaveBeenCalledWith(filters);
      });
    });

    it('should refresh payments', async () => {
      const { result } = renderHook(() => usePaymentManager());

      await act(async () => {
        await result.current.refresh();
      });

      expect(mockAdminDataManager.invalidateCacheByType).toHaveBeenCalledWith('payments');
      expect(mockAdminDataManager.getPayments).toHaveBeenCalled();
    });
  });
});