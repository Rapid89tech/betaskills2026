/**
 * Tests for ApiService
 */

import { apiService } from '../apiService';
import { supabase } from '@/integrations/supabase/client';

// Mock dependencies
jest.mock('@/integrations/supabase/client');
jest.mock('@/utils/ApiErrorHandler');
jest.mock('@/utils/logger');

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('executeSupabaseQuery', () => {
    it('should execute successful query without retry', async () => {
      const mockData = [{ id: 1, name: 'test' }];
      const mockQueryFn = jest.fn().mockResolvedValue({
        data: mockData,
        error: null
      });

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query'
      );

      expect(mockQueryFn).toHaveBeenCalledTimes(1);
      expect(result.data).toEqual(mockData);
      expect(result.error).toBeNull();
    });

    it('should handle Supabase errors gracefully', async () => {
      const mockError = {
        message: 'Database connection failed',
        code: 'NETWORK_ERROR'
      };
      const mockQueryFn = jest.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query'
      );

      expect(result.data).toBeNull();
      expect(result.error).toMatchObject({
        ...mockError,
        userMessage: expect.any(String),
        context: 'Test Query',
        timestamp: expect.any(String)
      });
    });

    it('should retry on retryable Supabase errors', async () => {
      const mockError = {
        message: 'Network connection failed',
        code: 'NETWORK_ERROR'
      };
      const mockSuccess = {
        data: [{ id: 1 }],
        error: null
      };

      const mockQueryFn = jest.fn()
        .mockResolvedValueOnce({ data: null, error: mockError })
        .mockResolvedValueOnce(mockSuccess);

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query'
      );

      expect(mockQueryFn).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual([{ id: 1 }]);
      expect(result.error).toBeNull();
    });

    it('should not retry when skipRetry is true', async () => {
      const mockError = {
        message: 'Network connection failed',
        code: 'NETWORK_ERROR'
      };
      const mockQueryFn = jest.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query',
        { skipRetry: true }
      );

      expect(mockQueryFn).toHaveBeenCalledTimes(1);
      expect(result.error).toMatchObject(mockError);
    });

    it('should handle timeout errors', async () => {
      const mockQueryFn = jest.fn().mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 100)
        )
      );

      await expect(
        apiService.executeSupabaseQuery(
          mockQueryFn,
          'Test Query',
          { timeout: 50 }
        )
      ).rejects.toThrow('Test Query - Request timeout after 50ms');
    });
  });

  describe('Error Message Conversion', () => {
    it('should convert network errors to user-friendly messages', async () => {
      const mockError = {
        message: 'Network connection failed',
        code: 'NETWORK_ERROR'
      };
      const mockQueryFn = jest.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query'
      );

      expect(result.error.userMessage).toBe(
        'Unable to connect to the server. Please check your internet connection and try again.'
      );
    });

    it('should convert authentication errors to user-friendly messages', async () => {
      const mockError = {
        message: 'JWT token expired',
        code: 'PGRST301'
      };
      const mockQueryFn = jest.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query'
      );

      expect(result.error.userMessage).toBe(
        'Your session has expired. Please log in again to continue.'
      );
    });

    it('should convert permission errors to user-friendly messages', async () => {
      const mockError = {
        message: 'Insufficient permissions',
        code: 'PGRST116'
      };
      const mockQueryFn = jest.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query'
      );

      expect(result.error.userMessage).toBe(
        'You don\'t have permission to perform this action. Please contact support if you believe this is an error.'
      );
    });

    it('should convert validation errors to user-friendly messages', async () => {
      const mockError = {
        message: 'Constraint violation',
        code: 'PGRST204'
      };
      const mockQueryFn = jest.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query'
      );

      expect(result.error.userMessage).toBe(
        'The data you entered is invalid. Please check your information and try again.'
      );
    });

    it('should convert rate limiting errors to user-friendly messages', async () => {
      const mockError = {
        message: 'Rate limit exceeded',
        code: '429'
      };
      const mockQueryFn = jest.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query'
      );

      expect(result.error.userMessage).toBe(
        'Too many requests. Please wait a moment and try again.'
      );
    });

    it('should convert server errors to user-friendly messages', async () => {
      const mockError = {
        message: 'Internal server error',
        code: '500'
      };
      const mockQueryFn = jest.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query'
      );

      expect(result.error.userMessage).toBe(
        'The server is temporarily unavailable. Please try again in a few moments.'
      );
    });

    it('should provide generic message for unknown errors', async () => {
      const mockError = {
        message: 'Unknown database error',
        code: 'UNKNOWN'
      };
      const mockQueryFn = jest.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await apiService.executeSupabaseQuery(
        mockQueryFn,
        'Test Query'
      );

      expect(result.error.userMessage).toBe(
        'An unexpected error occurred. Please try again or contact support if the problem persists.'
      );
    });
  });

  describe('Convenience Methods', () => {
    beforeEach(() => {
      // Mock the Supabase client methods
      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      });
      mockSupabase.rpc = jest.fn();
    });

    it('should execute select queries', async () => {
      const mockData = [{ id: 1, name: 'test' }];
      const mockQuery = {
        select: jest.fn().mockResolvedValue({ data: mockData, error: null })
      };
      mockSupabase.from = jest.fn().mockReturnValue(mockQuery);

      const result = await apiService.select('users', 'id, name');

      expect(mockSupabase.from).toHaveBeenCalledWith('users');
      expect(mockQuery.select).toHaveBeenCalledWith('id, name');
      expect(result.data).toEqual(mockData);
    });

    it('should execute insert queries with skipRetry', async () => {
      const mockData = { id: 1, name: 'test' };
      const mockQuery = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({ data: mockData, error: null })
      };
      mockSupabase.from = jest.fn().mockReturnValue(mockQuery);

      const result = await apiService.insert('users', { name: 'test' });

      expect(mockSupabase.from).toHaveBeenCalledWith('users');
      expect(mockQuery.insert).toHaveBeenCalledWith({ name: 'test' });
      expect(result.data).toEqual(mockData);
    });

    it('should execute update queries', async () => {
      const mockData = { id: 1, name: 'updated' };
      const mockQuery = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({ data: mockData, error: null })
      };
      mockSupabase.from = jest.fn().mockReturnValue(mockQuery);

      const result = await apiService.update(
        'users',
        { name: 'updated' },
        { column: 'id', value: 1 }
      );

      expect(mockSupabase.from).toHaveBeenCalledWith('users');
      expect(mockQuery.update).toHaveBeenCalledWith({ name: 'updated' });
      expect(mockQuery.eq).toHaveBeenCalledWith('id', 1);
      expect(result.data).toEqual(mockData);
    });

    it('should execute delete queries with skipRetry', async () => {
      const mockQuery = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ data: null, error: null })
      };
      mockSupabase.from = jest.fn().mockReturnValue(mockQuery);

      const result = await apiService.delete('users', { column: 'id', value: 1 });

      expect(mockSupabase.from).toHaveBeenCalledWith('users');
      expect(mockQuery.delete).toHaveBeenCalled();
      expect(mockQuery.eq).toHaveBeenCalledWith('id', 1);
      expect(result.error).toBeNull();
    });

    it('should execute RPC calls', async () => {
      const mockData = { result: 'success' };
      mockSupabase.rpc = jest.fn().mockResolvedValue({ data: mockData, error: null });

      const result = await apiService.rpc('test_function', { param: 'value' });

      expect(mockSupabase.rpc).toHaveBeenCalledWith('test_function', { param: 'value' });
      expect(result.data).toEqual(mockData);
    });
  });

  describe('Network Status and Queue Management', () => {
    it('should return network status from ApiErrorHandler', () => {
      const mockStatus = { isOnline: true, lastChecked: Date.now() };
      
      // Mock the ApiErrorHandler method
      const mockGetNetworkStatus = jest.fn().mockReturnValue(mockStatus);
      require('@/utils/ApiErrorHandler').apiErrorHandler.getNetworkStatus = mockGetNetworkStatus;

      const status = apiService.getNetworkStatus();

      expect(mockGetNetworkStatus).toHaveBeenCalled();
      expect(status).toEqual(mockStatus);
    });

    it('should return retry queue length from ApiErrorHandler', () => {
      const mockLength = 5;
      
      // Mock the ApiErrorHandler method
      const mockGetRetryQueueLength = jest.fn().mockReturnValue(mockLength);
      require('@/utils/ApiErrorHandler').apiErrorHandler.getRetryQueueLength = mockGetRetryQueueLength;

      const length = apiService.getRetryQueueLength();

      expect(mockGetRetryQueueLength).toHaveBeenCalled();
      expect(length).toBe(mockLength);
    });

    it('should clear retry queue via ApiErrorHandler', () => {
      const mockClearRetryQueue = jest.fn();
      require('@/utils/ApiErrorHandler').apiErrorHandler.clearRetryQueue = mockClearRetryQueue;

      apiService.clearRetryQueue();

      expect(mockClearRetryQueue).toHaveBeenCalled();
    });
  });
});