import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  adminDataManager, 
  EnrollmentFilters, 
  UserFilters, 
  PaymentFilters,
  AdminUser,
  CacheStatus,
  PerformanceMetrics
} from '@/services/AdminDataManager';
import { Enrollment } from '@/types/enrollment';

// Payment interface for admin (EFT only)
export interface Payment {
  id: string;
  enrollmentId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentType: 'EFT';
  status: 'pending' | 'completed' | 'failed';
  proofOfPaymentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UseAdminDataManagerOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  enablePrefetch?: boolean;
  prefetchKeys?: string[];
}

interface UseAdminDataManagerReturn {
  // Data
  enrollments: Enrollment[];
  users: AdminUser[];
  payments: Payment[];
  
  // Loading states
  enrollmentsLoading: boolean;
  usersLoading: boolean;
  paymentsLoading: boolean;
  
  // Error states
  enrollmentsError: string | null;
  usersError: string | null;
  paymentsError: string | null;
  
  // Cache and performance
  cacheStatus: CacheStatus | null;
  performanceMetrics: PerformanceMetrics | null;
  
  // Actions
  loadEnrollments: (filters?: EnrollmentFilters) => Promise<void>;
  loadUsers: (filters?: UserFilters) => Promise<void>;
  loadPayments: (filters?: PaymentFilters) => Promise<void>;
  refreshAll: () => Promise<void>;
  
  // Cache management
  invalidateCache: (key: string) => void;
  invalidateCachePattern: (pattern: string) => void;
  invalidateCacheByType: (type: string) => void;
  refreshCache: () => Promise<void>;
  
  // Performance
  optimizeQueries: () => void;
  preloadData: (keys: string[]) => Promise<void>;
  
  // Utilities
  isLoading: boolean;
  hasErrors: boolean;
}

export const useAdminDataManager = (
  options: UseAdminDataManagerOptions = {}
): UseAdminDataManagerReturn => {
  const {
    autoRefresh = false,
    refreshInterval = 30000, // 30 seconds
    enablePrefetch = true,
    prefetchKeys = ['enrollments:recent', 'users:active', 'payments:recent']
  } = options;

  // Data state
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [payments, setPayments] = useState<IkhokhaPayment[]>([]);

  // Loading states
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  // Error states
  const [enrollmentsError, setEnrollmentsError] = useState<string | null>(null);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [paymentsError, setPaymentsError] = useState<string | null>(null);

  // Performance state
  const [cacheStatus, setCacheStatus] = useState<CacheStatus | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);

  // Refs for cleanup
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  // Load enrollments
  const loadEnrollments = useCallback(async (filters?: EnrollmentFilters) => {
    if (!mountedRef.current) return;
    
    setEnrollmentsLoading(true);
    setEnrollmentsError(null);

    try {
      const data = await adminDataManager.getEnrollments(filters);
      if (mountedRef.current) {
        setEnrollments(data);
      }
    } catch (error: any) {
      if (mountedRef.current) {
        setEnrollmentsError(error.message || 'Failed to load enrollments');
        console.error('Error loading enrollments:', error);
      }
    } finally {
      if (mountedRef.current) {
        setEnrollmentsLoading(false);
      }
    }
  }, []);

  // Load users
  const loadUsers = useCallback(async (filters?: UserFilters) => {
    if (!mountedRef.current) return;
    
    setUsersLoading(true);
    setUsersError(null);

    try {
      const data = await adminDataManager.getUsers(filters);
      if (mountedRef.current) {
        setUsers(data);
      }
    } catch (error: any) {
      if (mountedRef.current) {
        setUsersError(error.message || 'Failed to load users');
        console.error('Error loading users:', error);
      }
    } finally {
      if (mountedRef.current) {
        setUsersLoading(false);
      }
    }
  }, []);

  // Load payments
  const loadPayments = useCallback(async (filters?: PaymentFilters) => {
    if (!mountedRef.current) return;
    
    setPaymentsLoading(true);
    setPaymentsError(null);

    try {
      const data = await adminDataManager.getPayments(filters);
      if (mountedRef.current) {
        setPayments(data);
      }
    } catch (error: any) {
      if (mountedRef.current) {
        setPaymentsError(error.message || 'Failed to load payments');
        console.error('Error loading payments:', error);
      }
    } finally {
      if (mountedRef.current) {
        setPaymentsLoading(false);
      }
    }
  }, []);

  // Refresh all data
  const refreshAll = useCallback(async () => {
    await Promise.all([
      loadEnrollments(),
      loadUsers(),
      loadPayments()
    ]);
  }, [loadEnrollments, loadUsers, loadPayments]);

  // Cache management functions
  const invalidateCache = useCallback((key: string) => {
    adminDataManager.invalidateCache(key);
  }, []);

  const invalidateCachePattern = useCallback((pattern: string) => {
    adminDataManager.invalidateCachePattern(pattern);
  }, []);

  const invalidateCacheByType = useCallback((type: string) => {
    adminDataManager.invalidateCacheByType(type);
  }, []);

  const refreshCache = useCallback(async () => {
    await adminDataManager.refreshCache();
    await refreshAll();
  }, [refreshAll]);

  // Performance functions
  const optimizeQueries = useCallback(() => {
    adminDataManager.optimizeQueries();
  }, []);

  const preloadData = useCallback(async (keys: string[]) => {
    await adminDataManager.preloadData(keys);
  }, []);

  // Update performance metrics
  const updatePerformanceMetrics = useCallback(() => {
    if (!mountedRef.current) return;
    
    try {
      const cache = adminDataManager.getCacheStatus();
      const metrics = adminDataManager.getPerformanceMetrics();
      
      setCacheStatus(cache);
      setPerformanceMetrics(metrics);
    } catch (error) {
      console.error('Error updating performance metrics:', error);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    const initializeData = async () => {
      // Enable prefetching if configured
      if (enablePrefetch && prefetchKeys.length > 0) {
        await preloadData(prefetchKeys);
      }

      // Load initial data
      await refreshAll();
      
      // Update performance metrics
      updatePerformanceMetrics();
    };

    initializeData();
  }, [enablePrefetch, prefetchKeys, preloadData, refreshAll, updatePerformanceMetrics]);

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      refreshIntervalRef.current = setInterval(() => {
        refreshAll();
        updatePerformanceMetrics();
      }, refreshInterval);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [autoRefresh, refreshInterval, refreshAll, updatePerformanceMetrics]);

  // Performance metrics update interval
  useEffect(() => {
    const metricsInterval = setInterval(updatePerformanceMetrics, 10000); // Every 10 seconds

    return () => clearInterval(metricsInterval);
  }, [updatePerformanceMetrics]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  // Computed values
  const isLoading = enrollmentsLoading || usersLoading || paymentsLoading;
  const hasErrors = !!(enrollmentsError || usersError || paymentsError);

  return {
    // Data
    enrollments,
    users,
    payments,
    
    // Loading states
    enrollmentsLoading,
    usersLoading,
    paymentsLoading,
    
    // Error states
    enrollmentsError,
    usersError,
    paymentsError,
    
    // Cache and performance
    cacheStatus,
    performanceMetrics,
    
    // Actions
    loadEnrollments,
    loadUsers,
    loadPayments,
    refreshAll,
    
    // Cache management
    invalidateCache,
    invalidateCachePattern,
    invalidateCacheByType,
    refreshCache,
    
    // Performance
    optimizeQueries,
    preloadData,
    
    // Utilities
    isLoading,
    hasErrors
  };
};

// Specialized hooks for specific use cases

/**
 * Hook for enrollment management with real-time updates
 */
export const useEnrollmentManager = (filters?: EnrollmentFilters) => {
  const {
    enrollments,
    enrollmentsLoading,
    enrollmentsError,
    loadEnrollments,
    invalidateCacheByType
  } = useAdminDataManager({
    autoRefresh: true,
    refreshInterval: 15000, // 15 seconds for more frequent updates
    prefetchKeys: ['enrollments:recent', 'enrollments:pending']
  });

  const refreshEnrollments = useCallback(async () => {
    invalidateCacheByType('enrollments');
    await loadEnrollments(filters);
  }, [filters, loadEnrollments, invalidateCacheByType]);

  useEffect(() => {
    loadEnrollments(filters);
  }, [filters, loadEnrollments]);

  return {
    enrollments,
    loading: enrollmentsLoading,
    error: enrollmentsError,
    refresh: refreshEnrollments,
    reload: () => loadEnrollments(filters)
  };
};

/**
 * Hook for user management with search capabilities
 */
export const useUserManager = (filters?: UserFilters) => {
  const {
    users,
    usersLoading,
    usersError,
    loadUsers,
    invalidateCacheByType
  } = useAdminDataManager({
    autoRefresh: false, // Manual refresh for user management
    prefetchKeys: ['users:active']
  });

  const refreshUsers = useCallback(async () => {
    invalidateCacheByType('users');
    await loadUsers(filters);
  }, [filters, loadUsers, invalidateCacheByType]);

  useEffect(() => {
    loadUsers(filters);
  }, [filters, loadUsers]);

  return {
    users,
    loading: usersLoading,
    error: usersError,
    refresh: refreshUsers,
    reload: () => loadUsers(filters)
  };
};

/**
 * Hook for payment management with transaction tracking
 */
export const usePaymentManager = (filters?: PaymentFilters) => {
  const {
    payments,
    paymentsLoading,
    paymentsError,
    loadPayments,
    invalidateCacheByType
  } = useAdminDataManager({
    autoRefresh: true,
    refreshInterval: 20000, // 20 seconds for payment updates
    prefetchKeys: ['payments:recent']
  });

  const refreshPayments = useCallback(async () => {
    invalidateCacheByType('payments');
    await loadPayments(filters);
  }, [filters, loadPayments, invalidateCacheByType]);

  useEffect(() => {
    loadPayments(filters);
  }, [filters, loadPayments]);

  return {
    payments,
    loading: paymentsLoading,
    error: paymentsError,
    refresh: refreshPayments,
    reload: () => loadPayments(filters)
  };
};