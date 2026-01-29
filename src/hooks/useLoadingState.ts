import { useEffect, useState, useCallback } from 'react';
import { loadingStateManager, LoadingState, SkeletonConfig } from '@/utils/LoadingStateManager';

/**
 * Hook for managing loading states with the LoadingStateManager
 */
export const useLoadingState = (componentId: string) => {
  const [loadingState, setLoadingState] = useState<LoadingState>({ isLoading: false });

  useEffect(() => {
    // Subscribe to loading state changes
    const unsubscribe = loadingStateManager.subscribe(componentId, setLoadingState);
    
    // Get initial state
    const initialState = loadingStateManager.getComponentLoading(componentId);
    setLoadingState(initialState);

    return unsubscribe;
  }, [componentId]);

  const setLoading = useCallback((isLoading: boolean, message?: string) => {
    loadingStateManager.setComponentLoading(componentId, isLoading, message);
  }, [componentId]);

  const showProgress = useCallback((progress: number, message?: string) => {
    loadingStateManager.showProgress(componentId, progress, message);
  }, [componentId]);

  const hideProgress = useCallback(() => {
    loadingStateManager.hideProgress(componentId);
  }, [componentId]);

  const withLoading = useCallback(async <T>(
    operation: () => Promise<T>,
    message?: string
  ): Promise<T> => {
    return loadingStateManager.withLoading(componentId, operation, message);
  }, [componentId]);

  const withProgress = useCallback(async <T>(
    operation: (updateProgress: (progress: number, message?: string) => void) => Promise<T>,
    initialMessage?: string
  ): Promise<T> => {
    return loadingStateManager.withProgress(componentId, operation, initialMessage);
  }, [componentId]);

  return {
    loadingState,
    isLoading: loadingState.isLoading,
    setLoading,
    showProgress,
    hideProgress,
    withLoading,
    withProgress
  };
};

/**
 * Hook for managing skeleton screens
 */
export const useSkeletonState = () => {
  const showSkeleton = useCallback((
    type: SkeletonConfig['type'],
    variant: SkeletonConfig['variant'] = 'default'
  ) => {
    loadingStateManager.showSkeleton(type, variant);
  }, []);

  const hideSkeleton = useCallback((type: SkeletonConfig['type']) => {
    loadingStateManager.hideSkeleton(type);
  }, []);

  const getSkeletonConfig = useCallback((type: SkeletonConfig['type']) => {
    return loadingStateManager.getSkeletonConfig(type);
  }, []);

  return {
    showSkeleton,
    hideSkeleton,
    getSkeletonConfig
  };
};

/**
 * Hook for global loading state management
 */
export const useGlobalLoading = () => {
  const [globalState, setGlobalState] = useState<LoadingState>({ isLoading: false });

  useEffect(() => {
    const unsubscribe = loadingStateManager.subscribe('global', setGlobalState);
    return unsubscribe;
  }, []);

  const setGlobalLoading = useCallback((
    isLoading: boolean,
    message?: string,
    progress?: number
  ) => {
    loadingStateManager.setGlobalLoading(isLoading, message, progress);
  }, []);

  return {
    globalState,
    isGlobalLoading: globalState.isLoading,
    setGlobalLoading
  };
};

/**
 * Hook for batch loading operations
 */
export const useBatchLoading = () => {
  const batchUpdate = useCallback((updates: Array<{
    componentId: string;
    isLoading: boolean;
    message?: string;
    progress?: number;
  }>) => {
    loadingStateManager.batchUpdate(updates);
  }, []);

  const clearAll = useCallback(() => {
    loadingStateManager.clearAll();
  }, []);

  const getActiveStates = useCallback(() => {
    return loadingStateManager.getActiveStates();
  }, []);

  return {
    batchUpdate,
    clearAll,
    getActiveStates
  };
};