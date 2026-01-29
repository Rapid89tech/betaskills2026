import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRouter, UserProfile, RoutingOptions, RoutingResult } from '@/services/UserRouter';
import { useAuth } from '@/hooks/AuthContext';

/**
 * React hook for UserRouter functionality
 * Provides easy access to routing methods with automatic initialization
 */
export const useUserRouter = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  // Initialize UserRouter with navigate function
  useEffect(() => {
    userRouter.initialize(navigate);
  }, [navigate]);

  /**
   * Route to appropriate dashboard based on user profile
   */
  const routeToUserDashboard = useCallback((
    customProfile?: UserProfile | null,
    options?: RoutingOptions
  ): RoutingResult => {
    const targetProfile = customProfile !== undefined ? customProfile : profile;
    return userRouter.routeToUserDashboard(targetProfile, options);
  }, [profile]);

  /**
   * Handle role detection failures
   */
  const handleRoleDetectionFailure = useCallback((
    customUser?: { id: string; email: string },
    options?: RoutingOptions
  ): RoutingResult => {
    const targetUser = customUser || (user ? { id: user.id, email: user.email || '' } : null);
    
    if (!targetUser) {
      console.error('useUserRouter: No user available for role detection failure handling');
      return {
        success: false,
        route: '/auth',
        error: 'No user available'
      };
    }

    return userRouter.handleRoleDetectionFailure(targetUser, options);
  }, [user]);

  /**
   * Get dashboard preference for current user
   */
  const getDashboardPreference = useCallback((): 'student' | 'instructor' | 'admin' | null => {
    if (!profile) return null;
    return userRouter.getDashboardPreference(profile);
  }, [profile]);

  /**
   * Set dashboard preference for current user
   */
  const setDashboardPreference = useCallback(async (
    preference: 'student' | 'instructor' | 'admin'
  ): Promise<boolean> => {
    if (!user?.id) {
      console.error('useUserRouter: No user ID available for setting preference');
      return false;
    }
    return userRouter.setDashboardPreference(user.id, preference);
  }, [user?.id]);

  /**
   * Validate if current user can access a route
   */
  const validateRouteAccess = useCallback((route: string): boolean => {
    if (!profile?.role) return false;
    return userRouter.validateRouteAccess(route, profile.role);
  }, [profile?.role]);

  /**
   * Handle routing errors with recovery
   */
  const handleRoutingError = useCallback((
    error: Error,
    fallbackRoute?: string
  ): RoutingResult => {
    return userRouter.handleRoutingError(error, fallbackRoute);
  }, []);

  /**
   * Get routing history for debugging
   */
  const getRoutingHistory = useCallback(() => {
    return userRouter.getRoutingHistory();
  }, []);

  /**
   * Clear routing history
   */
  const clearRoutingHistory = useCallback(() => {
    userRouter.clearRoutingHistory();
  }, []);

  /**
   * Route to dashboard on login success
   * This is the main method that should be called after successful authentication
   */
  const routeAfterLogin = useCallback((
    loginProfile?: UserProfile | null,
    options?: RoutingOptions
  ): RoutingResult => {
    const targetProfile = loginProfile || profile;
    
    if (!targetProfile) {
      console.warn('useUserRouter: No profile available after login, attempting role detection recovery');
      return handleRoleDetectionFailure(undefined, options);
    }

    // Route to appropriate dashboard with replace history to prevent back button issues
    return routeToUserDashboard(targetProfile, {
      replaceHistory: true,
      ...options
    });
  }, [profile, handleRoleDetectionFailure, routeToUserDashboard]);

  /**
   * Handle login success with comprehensive session setup
   */
  const handleLoginSuccess = useCallback(async (
    loginUser?: { id: string; email: string },
    loginProfile?: UserProfile | null,
    options?: RoutingOptions
  ): Promise<RoutingResult> => {
    const targetUser = loginUser || (user ? { id: user.id, email: user.email || '' } : null);
    const targetProfile = loginProfile || profile;
    
    if (!targetUser) {
      console.error('useUserRouter: No user available for login success handling');
      return {
        success: false,
        route: '/auth',
        error: 'No user available'
      };
    }

    return userRouter.handleLoginSuccess(targetUser, targetProfile || undefined, options);
  }, [user, profile]);

  /**
   * Initialize session for authenticated user
   */
  const initializeSession = useCallback(async (
    sessionUser?: { id: string; email: string },
    sessionProfile?: UserProfile | null
  ): Promise<boolean> => {
    const targetUser = sessionUser || (user ? { id: user.id, email: user.email || '' } : null);
    const targetProfile = sessionProfile || profile;
    
    if (!targetUser) {
      console.error('useUserRouter: No user available for session initialization');
      return false;
    }

    return userRouter.initializeSession(targetUser, targetProfile || undefined);
  }, [user, profile]);

  /**
   * Clean up session on logout
   */
  const cleanupSession = useCallback(async (userId?: string) => {
    const targetUserId = userId || user?.id;
    
    if (!targetUserId) {
      console.error('useUserRouter: No user ID available for session cleanup');
      return;
    }

    await userRouter.cleanupSession(targetUserId);
  }, [user?.id]);

  /**
   * Check if current session is valid
   */
  const isSessionValid = useCallback((userId?: string): boolean => {
    const targetUserId = userId || user?.id;
    
    if (!targetUserId) {
      return false;
    }

    return userRouter.isSessionValid(targetUserId);
  }, [user?.id]);

  /**
   * Update session activity timestamp
   */
  const updateSessionActivity = useCallback((userId?: string) => {
    const targetUserId = userId || user?.id;
    
    if (!targetUserId) {
      return;
    }

    userRouter.updateSessionActivity(targetUserId);
  }, [user?.id]);

  return {
    // Core routing methods
    routeToUserDashboard,
    routeAfterLogin,
    handleRoleDetectionFailure,
    
    // Enhanced login success handling
    handleLoginSuccess,
    
    // Session management
    initializeSession,
    cleanupSession,
    isSessionValid,
    updateSessionActivity,
    
    // Preference management
    getDashboardPreference,
    setDashboardPreference,
    
    // Validation and error handling
    validateRouteAccess,
    handleRoutingError,
    
    // Debugging utilities
    getRoutingHistory,
    clearRoutingHistory,
    
    // Current user state
    currentUser: user,
    currentProfile: profile
  };
};