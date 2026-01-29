import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cachedApiCall, debounce } from '../utils/loadingOptimizer';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

interface UseOptimizedApiOptions {
  cacheKey?: string;
  cacheTtl?: number;
  retryAttempts?: number;
  retryDelay?: number;
  debounceMs?: number;
  timeout?: number;
}

export function useOptimizedApi<T>(
  apiCall: () => Promise<T>,
  options: UseOptimizedApiOptions = {}
) {
  const {
    cacheKey,
    cacheTtl = 300000, // 5 minutes
    retryAttempts = 3,
    retryDelay = 1000,
    debounceMs = 300,
    timeout = 30000 // Increased to 30 seconds
  } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
    lastFetch: null
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const executeApiCall = useCallback(async (force = false): Promise<T | null> => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      let result: T;

      if (cacheKey && !force) {
        // Use cached API call
        result = await cachedApiCall(cacheKey, apiCall, cacheTtl);
      } else {
        // Add timeout to API call
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), timeout);
        });

        result = await Promise.race([
          apiCall(),
          timeoutPromise
        ]);
      }

      setState({
        data: result,
        loading: false,
        error: null,
        lastFetch: Date.now()
      });

      retryCountRef.current = 0;
      return result;

    } catch (error: any) {
      // Don't update state if request was aborted
      if (error.name === 'AbortError') {
        return null;
      }

      const errorMessage = error?.message || 'An error occurred';

      // Retry logic
      if (retryCountRef.current < retryAttempts) {
        retryCountRef.current++;
        
        setTimeout(() => {
          executeApiCall(force);
        }, retryDelay * retryCountRef.current);

        setState(prev => ({
          ...prev,
          loading: true,
          error: `Retrying... (${retryCountRef.current}/${retryAttempts})`
        }));

        return null;
      }

      setState({
        data: null,
        loading: false,
        error: errorMessage,
        lastFetch: Date.now()
      });

      return null;
    }
  }, [apiCall, cacheKey, cacheTtl, retryAttempts, retryDelay, timeout]);

  // Debounced version of the API call
  const debouncedExecute = useCallback(
    debounce(executeApiCall, debounceMs),
    [executeApiCall, debounceMs]
  );

  const refetch = useCallback(() => {
    return executeApiCall(true);
  }, [executeApiCall]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState(prev => ({ ...prev, loading: false }));
  }, []);

  return {
    ...state,
    execute: executeApiCall,
    debouncedExecute,
    refetch,
    cancel,
    isStale: state.lastFetch ? (Date.now() - state.lastFetch) > cacheTtl : true
  };
}

// Specialized hook for Supabase queries
export function useSupabaseQuery<T>(
  tableName: string,
  query?: (builder: any) => any,
  options: UseOptimizedApiOptions = {}
) {
  const apiCall = useCallback(async (): Promise<T> => {
    let queryBuilder = supabase.from(tableName).select('*');
    
    if (query) {
      queryBuilder = query(queryBuilder);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      throw new Error(error.message);
    }

    return data as T;
  }, [tableName, query]);

  return useOptimizedApi<T>(apiCall, {
    cacheKey: `supabase-${tableName}`,
    ...options
  });
}

// Hook for optimized mutations
export function useOptimizedMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    invalidateCache?: string[];
  } = {}
) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null
  });

  const mutate = useCallback(async (variables: TVariables): Promise<TData | null> => {
    setState({ loading: true, error: null });

    try {
      const result = await mutationFn(variables);
      
      // Invalidate cache if specified
      if (options.invalidateCache) {
        const { loadingOptimizer } = await import('../utils/loadingOptimizer');
        options.invalidateCache.forEach(key => {
          loadingOptimizer.clearCache(key);
        });
      }

      setState({ loading: false, error: null });
      options.onSuccess?.(result, variables);
      
      return result;
    } catch (error: any) {
      const errorMessage = error?.message || 'Mutation failed';
      setState({ loading: false, error: errorMessage });
      options.onError?.(error, variables);
      
      return null;
    }
  }, [mutationFn, options]);

  return {
    ...state,
    mutate
  };
}

export default useOptimizedApi;