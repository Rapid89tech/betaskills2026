import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FastDataService } from '../FastDataService';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn(() => Promise.resolve({ data: [], error: null }))
          }))
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null }))
      }))
    }))
  }
}));

// Get the mocked supabase for test manipulation
const mockSupabase = vi.mocked(await import('@/integrations/supabase/client')).supabase;

describe('FastDataService Enhanced Error Handling', () => {
  let service: FastDataService;

  beforeEach(() => {
    service = FastDataService.getInstance();
    service.clearCache();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Retry Mechanism', () => {
    it('should retry on network errors', async () => {
      const networkError = new Error('Network error');
      networkError.name = 'NetworkError';

      const mockChain = {
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn()
              .mockRejectedValueOnce(networkError)
              .mockRejectedValueOnce(networkError)
              .mockResolvedValueOnce({ data: [{ id: '1', user_id: 'user1' }], error: null })
          }))
        }))
      };

      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => mockChain)
      });

      const result = await service.getAllEnrollments();
      expect(result).toHaveLength(1);
      expect(mockChain.eq).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it('should not retry on non-retryable errors', async () => {
      const authError = new Error('Authentication failed');
      authError.name = 'AuthError';

      const mockChain = {
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn().mockRejectedValue(authError)
          }))
        }))
      };

      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => mockChain)
      });

      await expect(service.getAllEnrollments()).rejects.toThrow('Authentication failed');
      expect(mockChain.eq).toHaveBeenCalledTimes(1); // No retries
    });

    it('should respect max retry attempts', async () => {
      const timeoutError = new Error('Timeout');
      timeoutError.name = 'TimeoutError';

      const mockChain = {
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn().mockRejectedValue(timeoutError)
          }))
        }))
      };

      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => mockChain)
      });

      await expect(service.getAllEnrollments()).rejects.toThrow('Timeout');
      expect(mockChain.eq).toHaveBeenCalledTimes(3); // Initial + 2 retries (max 3 attempts)
    });
  });

  describe('Error Classification', () => {
    it('should identify retryable Supabase errors', async () => {
      const connectionError = {
        code: '08000',
        message: 'Connection exception'
      };

      const mockChain = {
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn()
              .mockRejectedValueOnce(connectionError)
              .mockResolvedValueOnce({ data: [], error: null })
          }))
        }))
      };

      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => mockChain)
      });

      const result = await service.getAllEnrollments();
      expect(result).toEqual([]);
      expect(mockChain.eq).toHaveBeenCalledTimes(2); // Initial + 1 retry
    });

    it('should identify non-retryable Supabase errors', async () => {
      const permissionError = {
        code: '42501',
        message: 'Permission denied'
      };

      const mockChain = {
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn().mockRejectedValue(permissionError)
          }))
        }))
      };

      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => mockChain)
      });

      await expect(service.getAllEnrollments()).rejects.toMatchObject({
        code: '42501'
      });
      expect(mockChain.eq).toHaveBeenCalledTimes(1); // No retries
    });
  });

  describe('Health Check', () => {
    it('should return healthy status when database is accessible', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve({ data: [], error: null }))
        }))
      });

      const health = await service.healthCheck();
      expect(health.healthy).toBe(true);
      expect(health.error).toBeUndefined();
    });

    it('should return unhealthy status when database is not accessible', async () => {
      const dbError = new Error('Database connection failed');
      
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve({ data: null, error: dbError }))
        }))
      });

      const health = await service.healthCheck();
      expect(health.healthy).toBe(false);
      expect(health.error).toBe('Database connection failed');
    });
  });

  describe('Cache Management', () => {
    it('should clear cache on successful operations', async () => {
      // First call should hit the database
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({
              limit: vi.fn(() => Promise.resolve({ data: [{ id: '1' }], error: null }))
            }))
          }))
        }))
      });

      const result1 = await service.getAllEnrollments();
      expect(result1).toHaveLength(1);

      // Second call should use cache (no additional database call)
      const result2 = await service.getAllEnrollments();
      expect(result2).toHaveLength(1);
      expect(mockSupabase.from).toHaveBeenCalledTimes(1);

      // Clear cache and call again should hit database
      service.clearCache();
      const result3 = await service.getAllEnrollments();
      expect(result3).toHaveLength(1);
      expect(mockSupabase.from).toHaveBeenCalledTimes(2);
    });
  });
});