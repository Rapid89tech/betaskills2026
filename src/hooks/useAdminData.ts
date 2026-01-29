/**
 * useAdminData Hook
 * 
 * React hook for using the AdminDataManager with caching and optimization
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { adminDataManager, type AdminEnrollment, type AdminUser, type AdminPayment, type AdminStats } from '@/services/adminDataManager';
import { logger } from '@/utils/logger';

// Hook options
interface UseAdminDataOptions {
  useCache?: boolean;
  prefetch?: boolean;
  compression?: boolean;
  maxAge?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

// Hook return types
interface UseAdminDataReturn {
  enrollments: AdminEnrollment[];
  users: AdminUser[];
  payments: AdminPayment[];
  stats: AdminStats | null;
  loading: {
    enrollments: boolean;
    users: boolean;
    payments: boolean;
    stats: boolean;
  };
  error: string | null;
  refresh: () => Promise<void>;
  invalidateCache: (type?: 'enrollments' | 'users' | 'payments' | 'stats') => void;
  metrics: {
    cacheHitRate: number;
    averageQueryTime: number;
    totalQueries: number;
    cacheSize: number;
    memoryUsage: number;
  };
}

/**
 * Hook for managing admin data with caching
 */
export function useAdminData(options: UseAdminDataOptions = {}): UseAdminDataReturn {
  const {
    useCache = true,
    prefetch = true,
    compression = true,
    maxAge,
    autoRefresh = false,
    refreshInterval = 30000 // 30 seconds
  } = options;

  // State management
  const [enrollments, setEnrollments] = useState<AdminEnrollment[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState({
    enrollments: false,
    users: false,
    payments: false,
    stats: false
  });
  const [error, setError] = useState<string | null>(null);

  // Refs for tracking
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();
  const mountedRef = useRef(true);

  // Query options
  const queryOptions = {
    useCache,
    prefetch,
    compression,
    maxAge
  };

  /**
   * Fetch all admin data
   */
  const fetchAllData = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      setError(null);

      // Fetch data in parallel for better performance
      const [enrollmentsData, usersData, paymentsData, statsData] = await Promise.allSettled([
        adminDataManager.getEnrollments(queryOptions),
        adminDataManager.getUsers(queryOptions),
        adminDataManager.getPayments(queryOptions),
        adminDataManager.getStats(queryOptions)
      ]);

      // Update state for successful requests
      if (enrollmentsData.status === 'fulfilled') {
        setEnrollments(enrollmentsData.value);
      } else {
        logger.error('Failed to fetch enrollments:', enrollmentsData.reason);
        setError('Failed to fetch enrollments');
      }

      if (usersData.status === 'fulfilled') {
        setUsers(usersData.value);
      } else {
        logger.error('Failed to fetch users:', usersData.reason);
        setError('Failed to fetch users');
      }

      if (paymentsData.status === 'fulfilled') {
        setPayments(paymentsData.value);
      } else {
        logger.error('Failed to fetch payments:', paymentsData.reason);
        setError('Failed to fetch payments');
      }

      if (statsData.status === 'fulfilled') {
        setStats(statsData.value);
      } else {
        logger.error('Failed to fetch stats:', statsData.reason);
        setError('Failed to fetch stats');
      }

    } catch (error) {
      logger.error('Error fetching admin data:', error);
      setError('Failed to fetch admin data');
    }
  }, [useCache, prefetch, compression, maxAge]);

  /**
   * Fetch specific data type
   */
  const fetchEnrollments = useCallback(async () => {
    if (!mountedRef.current) return;

    setLoading(prev => ({ ...prev, enrollments: true }));
    try {
      const data = await adminDataManager.getEnrollments(queryOptions);
      if (mountedRef.current) {
        setEnrollments(data);
      }
    } catch (error) {
      logger.error('Failed to fetch enrollments:', error);
      if (mountedRef.current) {
        setError('Failed to fetch enrollments');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(prev => ({ ...prev, enrollments: false }));
      }
    }
  }, [queryOptions]);

  const fetchUsers = useCallback(async () => {
    if (!mountedRef.current) return;

    setLoading(prev => ({ ...prev, users: true }));
    try {
      const data = await adminDataManager.getUsers(queryOptions);
      if (mountedRef.current) {
        setUsers(data);
      }
    } catch (error) {
      logger.error('Failed to fetch users:', error);
      if (mountedRef.current) {
        setError('Failed to fetch users');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(prev => ({ ...prev, users: false }));
      }
    }
  }, [queryOptions]);

  const fetchPayments = useCallback(async () => {
    if (!mountedRef.current) return;

    setLoading(prev => ({ ...prev, payments: true }));
    try {
      const data = await adminDataManager.getPayments(queryOptions);
      if (mountedRef.current) {
        setPayments(data);
      }
    } catch (error) {
      logger.error('Failed to fetch payments:', error);
      if (mountedRef.current) {
        setError('Failed to fetch payments');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(prev => ({ ...prev, payments: false }));
      }
    }
  }, [queryOptions]);

  const fetchStats = useCallback(async () => {
    if (!mountedRef.current) return;

    setLoading(prev => ({ ...prev, stats: true }));
    try {
      const data = await adminDataManager.getStats(queryOptions);
      if (mountedRef.current) {
        setStats(data);
      }
    } catch (error) {
      logger.error('Failed to fetch stats:', error);
      if (mountedRef.current) {
        setError('Failed to fetch stats');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(prev => ({ ...prev, stats: false }));
      }
    }
  }, [queryOptions]);

  /**
   * Refresh all data
   */
  const refresh = useCallback(async () => {
    await fetchAllData();
  }, [fetchAllData]);

  /**
   * Invalidate cache
   */
  const invalidateCache = useCallback((type?: 'enrollments' | 'users' | 'payments' | 'stats') => {
    adminDataManager.invalidateCache(type);
    
    // Refresh data after cache invalidation
    if (!type) {
      fetchAllData();
    } else {
      switch (type) {
        case 'enrollments':
          fetchEnrollments();
          break;
        case 'users':
          fetchUsers();
          break;
        case 'payments':
          fetchPayments();
          break;
        case 'stats':
          fetchStats();
          break;
      }
    }
  }, [fetchAllData, fetchEnrollments, fetchUsers, fetchPayments, fetchStats]);

  /**
   * Get performance metrics
   */
  const getMetrics = useCallback(() => {
    return adminDataManager.getMetrics();
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      refreshTimeoutRef.current = setInterval(() => {
        fetchAllData();
      }, refreshInterval);

      return () => {
        if (refreshTimeoutRef.current) {
          clearInterval(refreshTimeoutRef.current);
        }
      };
    }
  }, [autoRefresh, refreshInterval, fetchAllData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (refreshTimeoutRef.current) {
        clearInterval(refreshTimeoutRef.current);
      }
    };
  }, []);

  return {
    enrollments,
    users,
    payments,
    stats,
    loading,
    error,
    refresh,
    invalidateCache,
    metrics: getMetrics()
  };
}

/**
 * Hook for enrollments only
 */
export function useAdminEnrollments(options: UseAdminDataOptions = {}) {
  const [enrollments, setEnrollments] = useState<AdminEnrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminDataManager.getEnrollments({
        useCache: options.useCache,
        prefetch: options.prefetch,
        compression: options.compression,
        maxAge: options.maxAge
      });
      setEnrollments(data);
    } catch (error) {
      logger.error('Failed to fetch enrollments:', error);
      setError('Failed to fetch enrollments');
    } finally {
      setLoading(false);
    }
  }, [options.useCache, options.prefetch, options.compression, options.maxAge]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const refresh = useCallback(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const invalidateCache = useCallback(() => {
    adminDataManager.invalidateCache('enrollments');
    fetchEnrollments();
  }, [fetchEnrollments]);

  return {
    enrollments,
    loading,
    error,
    refresh,
    invalidateCache,
    metrics: adminDataManager.getMetrics()
  };
}

/**
 * Hook for users only
 */
export function useAdminUsers(options: UseAdminDataOptions = {}) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminDataManager.getUsers({
        useCache: options.useCache,
        prefetch: options.prefetch,
        compression: options.compression,
        maxAge: options.maxAge
      });
      setUsers(data);
    } catch (error) {
      logger.error('Failed to fetch users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [options.useCache, options.prefetch, options.compression, options.maxAge]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refresh = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  const invalidateCache = useCallback(() => {
    adminDataManager.invalidateCache('users');
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refresh,
    invalidateCache,
    metrics: adminDataManager.getMetrics()
  };
}

/**
 * Hook for payments only
 */
export function useAdminPayments(options: UseAdminDataOptions = {}) {
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminDataManager.getPayments({
        useCache: options.useCache,
        prefetch: options.prefetch,
        compression: options.compression,
        maxAge: options.maxAge
      });
      setPayments(data);
    } catch (error) {
      logger.error('Failed to fetch payments:', error);
      setError('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  }, [options.useCache, options.prefetch, options.compression, options.maxAge]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const refresh = useCallback(() => {
    fetchPayments();
  }, [fetchPayments]);

  const invalidateCache = useCallback(() => {
    adminDataManager.invalidateCache('payments');
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    loading,
    error,
    refresh,
    invalidateCache,
    metrics: adminDataManager.getMetrics()
  };
}

/**
 * Hook for statistics only
 */
export function useAdminStats(options: UseAdminDataOptions = {}) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminDataManager.getStats({
        useCache: options.useCache,
        prefetch: options.prefetch,
        compression: options.compression,
        maxAge: options.maxAge
      });
      setStats(data);
    } catch (error) {
      logger.error('Failed to fetch stats:', error);
      setError('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, [options.useCache, options.prefetch, options.compression, options.maxAge]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refresh = useCallback(() => {
    fetchStats();
  }, [fetchStats]);

  const invalidateCache = useCallback(() => {
    adminDataManager.invalidateCache('stats');
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refresh,
    invalidateCache,
    metrics: adminDataManager.getMetrics()
  };
}
