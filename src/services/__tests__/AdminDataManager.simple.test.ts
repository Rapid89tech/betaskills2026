import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AdminDataManager } from '../AdminDataManager';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => {
  const createQueryChain = () => ({
    select: vi.fn(() => createQueryChain()),
    in: vi.fn(() => createQueryChain()),
    eq: vi.fn(() => createQueryChain()),
    gte: vi.fn(() => createQueryChain()),
    lte: vi.fn(() => createQueryChain()),
    or: vi.fn(() => createQueryChain()),
    limit: vi.fn(() => createQueryChain()),
    range: vi.fn(() => createQueryChain()),
    order: vi.fn(() => Promise.resolve({ data: [], error: null }))
  });

  return {
    supabase: {
      from: vi.fn(() => createQueryChain())
    }
  };
});

describe('AdminDataManager - Core Functionality', () => {
  let adminDataManager: AdminDataManager;

  beforeEach(() => {
    adminDataManager = AdminDataManager.getInstance();
    vi.clearAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = AdminDataManager.getInstance();
      const instance2 = AdminDataManager.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Cache Management', () => {
    it('should provide cache status', () => {
      const cacheStatus = adminDataManager.getCacheStatus();
      
      expect(cacheStatus).toHaveProperty('totalEntries');
      expect(cacheStatus).toHaveProperty('hitRate');
      expect(cacheStatus).toHaveProperty('missRate');
      expect(cacheStatus).toHaveProperty('memoryUsage');
      expect(typeof cacheStatus.totalEntries).toBe('number');
      expect(typeof cacheStatus.hitRate).toBe('number');
      expect(typeof cacheStatus.missRate).toBe('number');
      expect(typeof cacheStatus.memoryUsage).toBe('number');
    });

    it('should provide performance metrics', () => {
      const metrics = adminDataManager.getPerformanceMetrics();
      
      expect(metrics).toHaveProperty('queryTime');
      expect(metrics).toHaveProperty('cacheHitRate');
      expect(metrics).toHaveProperty('dataFreshness');
      expect(metrics).toHaveProperty('memoryUsage');
      expect(metrics).toHaveProperty('activeConnections');
      expect(typeof metrics.queryTime).toBe('number');
      expect(typeof metrics.cacheHitRate).toBe('number');
      expect(typeof metrics.dataFreshness).toBe('number');
      expect(typeof metrics.memoryUsage).toBe('number');
      expect(typeof metrics.activeConnections).toBe('number');
    });

    it('should invalidate cache by key', () => {
      // This should not throw an error
      expect(() => adminDataManager.invalidateCache('test-key')).not.toThrow();
    });

    it('should invalidate cache by pattern', () => {
      // This should not throw an error
      expect(() => adminDataManager.invalidateCachePattern('enrollments')).not.toThrow();
    });

    it('should invalidate cache by type', () => {
      // This should not throw an error
      expect(() => adminDataManager.invalidateCacheByType('users')).not.toThrow();
    });

    it('should refresh cache', async () => {
      // This should not throw an error
      await expect(adminDataManager.refreshCache()).resolves.not.toThrow();
    });
  });

  describe('Performance Optimization', () => {
    it('should optimize queries', () => {
      // This should not throw an error
      expect(() => adminDataManager.optimizeQueries()).not.toThrow();
    });

    it('should preload data', async () => {
      const keys = ['enrollments:recent', 'users:active'];
      
      // This should not throw an error
      await expect(adminDataManager.preloadData(keys)).resolves.not.toThrow();
    });
  });

  describe('Data Fetching', () => {
    it('should fetch enrollments', async () => {
      const enrollments = await adminDataManager.getEnrollments();
      
      expect(Array.isArray(enrollments)).toBe(true);
    });

    it('should fetch users', async () => {
      const users = await adminDataManager.getUsers();
      
      expect(Array.isArray(users)).toBe(true);
    });

    it('should fetch payments', async () => {
      const payments = await adminDataManager.getPayments();
      
      expect(Array.isArray(payments)).toBe(true);
    });
  });

  describe('Filter Support', () => {
    it('should accept enrollment filters', async () => {
      const filters = {
        status: ['pending' as any],
        limit: 10,
        offset: 0
      };
      
      const enrollments = await adminDataManager.getEnrollments(filters);
      expect(Array.isArray(enrollments)).toBe(true);
    });

    it('should accept user filters', async () => {
      const filters = {
        role: ['student'],
        searchTerm: 'test',
        limit: 10
      };
      
      const users = await adminDataManager.getUsers(filters);
      expect(Array.isArray(users)).toBe(true);
    });

    it('should accept payment filters', async () => {
      const filters = {
        status: ['completed' as any],
        amountMin: 100,
        amountMax: 1000
      };
      
      const payments = await adminDataManager.getPayments(filters);
      expect(Array.isArray(payments)).toBe(true);
    });
  });
});