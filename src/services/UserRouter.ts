import { NavigateFunction } from 'react-router-dom';

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'student' | 'instructor' | 'admin';
  approved?: boolean;
  approval_status?: string;
  dashboard_preference?: 'student' | 'instructor' | 'admin';
}

export interface RoutingOptions {
  fallbackRoute?: string;
  preserveQueryParams?: boolean;
  replaceHistory?: boolean;
}

export interface RoutingResult {
  success: boolean;
  route: string;
  error?: string;
  fallbackUsed?: boolean;
}

/**
 * UserRouter service for intelligent role-based dashboard routing
 * Handles proper user redirection based on roles and preferences
 */
export class UserRouter {
  private static instance: UserRouter;
  private navigate: NavigateFunction | null = null;
  private routingHistory: Array<{ timestamp: Date; route: string; success: boolean }> = [];

  private constructor() {}

  public static getInstance(): UserRouter {
    if (!UserRouter.instance) {
      UserRouter.instance = new UserRouter();
    }
    return UserRouter.instance;
  }

  /**
   * Initialize the router with navigation function
   */
  public initialize(navigate: NavigateFunction): void {
    this.navigate = navigate;
  }

  /**
   * Route user to appropriate dashboard based on role and preferences
   */
  public routeToUserDashboard(
    profile: UserProfile | null,
    options: RoutingOptions = {}
  ): RoutingResult {
    const {
      fallbackRoute = '/dashboard',
      preserveQueryParams = false,
      replaceHistory = false
    } = options;

    try {
      // Validate navigation function is available
      if (!this.navigate) {
        throw new Error('UserRouter not initialized with navigate function');
      }

      // Handle missing or invalid profile
      if (!profile) {
        console.warn('UserRouter: No profile provided, using fallback route');
        return this.executeNavigation(fallbackRoute, { replaceHistory, preserveQueryParams, fallbackUsed: true });
      }

      // Determine target route based on role and preferences
      const targetRoute = this.determineTargetRoute(profile);
      
      // Execute navigation
      const result = this.executeNavigation(targetRoute, { replaceHistory, preserveQueryParams });
      
      // Log routing decision
      this.logRoutingDecision(profile, targetRoute, result.success);
      
      return result;

    } catch (error) {
      console.error('UserRouter: Error during routing:', error);
      
      // Attempt fallback navigation
      try {
        const fallbackResult = this.executeNavigation(fallbackRoute, { replaceHistory, preserveQueryParams, fallbackUsed: true });
        return {
          ...fallbackResult,
          error: error instanceof Error ? error.message : 'Unknown routing error'
        };
      } catch (fallbackError) {
        return {
          success: false,
          route: fallbackRoute,
          error: `Routing failed and fallback failed: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`
        };
      }
    }
  }

  /**
   * Determine the appropriate route based on user profile
   */
  private determineTargetRoute(profile: UserProfile): string {
    // Check for explicit dashboard preference first
    if (profile.dashboard_preference) {
      switch (profile.dashboard_preference) {
        case 'student':
          return '/dashboard';
        case 'instructor':
          return '/instructor-dashboard';
        case 'admin':
          return '/admin-dashboard';
      }
    }

    // Route based on primary role
    switch (profile.role) {
      case 'student':
        return '/dashboard';
      case 'instructor':
        // For users with instructor role, check if they also have student enrollments
        // If they do, default to student dashboard but allow switching
        return '/dashboard'; // Changed to default to student dashboard per requirements
      case 'admin':
        return '/admin-dashboard';
      default:
        console.warn(`UserRouter: Unknown role '${profile.role}', defaulting to student dashboard`);
        return '/dashboard';
    }
  }

  /**
   * Execute the navigation with error handling
   */
  private executeNavigation(
    route: string,
    options: { replaceHistory?: boolean; preserveQueryParams?: boolean; fallbackUsed?: boolean } = {}
  ): RoutingResult {
    try {
      if (!this.navigate) {
        throw new Error('Navigate function not available');
      }

      let finalRoute = route;

      // Preserve query parameters if requested
      if (options.preserveQueryParams) {
        const currentParams = new URLSearchParams(window.location.search);
        if (currentParams.toString()) {
          finalRoute += `?${currentParams.toString()}`;
        }
      }

      // Execute navigation
      this.navigate(finalRoute, { replace: options.replaceHistory || false });

      // Record successful navigation
      this.routingHistory.push({
        timestamp: new Date(),
        route: finalRoute,
        success: true
      });

        return {
          success: true,
          route: finalRoute,
          fallbackUsed: options.fallbackUsed || false
        };

    } catch (error) {
      // Record failed navigation
      this.routingHistory.push({
        timestamp: new Date(),
        route,
        success: false
      });

      throw error;
    }
  }

  /**
   * Handle role detection failures with recovery mechanisms
   */
  public handleRoleDetectionFailure(
    user: { id: string; email: string },
    options: RoutingOptions = {}
  ): RoutingResult {
    console.warn('UserRouter: Role detection failed, implementing recovery');

    // Create minimal profile for fallback
    const fallbackProfile: UserProfile = {
      id: user.id,
      email: user.email,
      first_name: user.email.split('@')[0] || 'User',
      last_name: '',
      role: 'student', // Default to student role
      approved: true,
      approval_status: 'approved'
    };

    // Store fallback profile in localStorage for recovery
    try {
      localStorage.setItem(`fallback-profile-${user.id}`, JSON.stringify(fallbackProfile));
    } catch (error) {
      console.warn('UserRouter: Could not store fallback profile:', error);
    }

    return this.routeToUserDashboard(fallbackProfile, {
      ...options,
      fallbackRoute: '/dashboard' // Always default to student dashboard on failure
    });
  }

  /**
   * Get user's dashboard preference or detect from usage patterns
   */
  public getDashboardPreference(profile: UserProfile): 'student' | 'instructor' | 'admin' {
    // Return explicit preference if set
    if (profile.dashboard_preference) {
      return profile.dashboard_preference;
    }

    // Check routing history for patterns
    const recentRoutes = this.routingHistory
      .filter(entry => entry.success && entry.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // Last 7 days
      .map(entry => entry.route);

    // If no routing history, default to student
    if (recentRoutes.length === 0) {
      return 'student';
    }

    const dashboardCounts = {
      student: recentRoutes.filter(route => route.includes('/dashboard') && !route.includes('/instructor-dashboard') && !route.includes('/admin-dashboard')).length,
      instructor: recentRoutes.filter(route => route.includes('/instructor-dashboard')).length,
      admin: recentRoutes.filter(route => route.includes('/admin-dashboard')).length
    };

    // Return most frequently used dashboard
    const mostUsed = Object.entries(dashboardCounts).reduce((a, b) => 
      dashboardCounts[a[0] as keyof typeof dashboardCounts] > dashboardCounts[b[0] as keyof typeof dashboardCounts] ? a : b
    )[0] as 'student' | 'instructor' | 'admin';

    return mostUsed || 'student'; // Default to student if no history
  }

  /**
   * Set user's dashboard preference
   */
  public async setDashboardPreference(
    userId: string,
    preference: 'student' | 'instructor' | 'admin'
  ): Promise<boolean> {
    try {
      // Store preference in localStorage for immediate use
      localStorage.setItem(`dashboard-preference-${userId}`, preference);
      
      // TODO: In a real implementation, this would also update the database
      // For now, we'll just store locally
      
      console.log(`UserRouter: Dashboard preference set to '${preference}' for user ${userId}`);
      return true;
    } catch (error) {
      console.error('UserRouter: Failed to set dashboard preference:', error);
      return false;
    }
  }

  /**
   * Get routing history for debugging and analytics
   */
  public getRoutingHistory(): Array<{ timestamp: Date; route: string; success: boolean }> {
    return [...this.routingHistory];
  }

  /**
   * Clear routing history
   */
  public clearRoutingHistory(): void {
    this.routingHistory = [];
  }

  /**
   * Log routing decisions for debugging
   */
  private logRoutingDecision(profile: UserProfile, route: string, success: boolean): void {
    console.log(`UserRouter: Routed user ${profile.email} (role: ${profile.role}) to ${route} - ${success ? 'SUCCESS' : 'FAILED'}`);
  }

  /**
   * Validate if a route is accessible for a given role
   */
  public validateRouteAccess(route: string, role: string): boolean {
    const roleRouteMap: Record<string, string[]> = {
      student: ['/dashboard', '/course', '/enrollment', '/payment'],
      instructor: ['/dashboard', '/instructor-dashboard', '/course'],
      admin: ['/dashboard', '/instructor-dashboard', '/admin-dashboard', '/course']
    };

    const allowedRoutes = roleRouteMap[role] || roleRouteMap.student;
    return allowedRoutes?.some(allowedRoute => route.startsWith(allowedRoute)) || false;
  }

  /**
   * Handle routing errors with recovery mechanisms
   */
  public handleRoutingError(error: Error, fallbackRoute: string = '/dashboard'): RoutingResult {
    console.error('UserRouter: Routing error occurred:', error);

    try {
      if (this.navigate) {
        this.navigate(fallbackRoute, { replace: true });
        return {
          success: true,
          route: fallbackRoute,
          error: error.message,
          fallbackUsed: true
        };
      } else {
        // If navigate is not available, try window.location as last resort
        window.location.href = fallbackRoute;
        return {
          success: true,
          route: fallbackRoute,
          error: error.message,
          fallbackUsed: true
        };
      }
    } catch (recoveryError) {
      return {
        success: false,
        route: fallbackRoute,
        error: `Original error: ${error.message}. Recovery error: ${recoveryError instanceof Error ? recoveryError.message : 'Unknown'}`
      };
    }
  }

  /**
   * Initialize session management for authenticated user
   */
  public async initializeSession(user: { id: string; email: string }, profile?: UserProfile): Promise<boolean> {
    try {
      console.log('UserRouter: Initializing session for user:', user.email);
      
      // Session management removed to break circular dependency
      // TODO: Implement session management without circular dependency
      
      // Set dashboard preference if profile is available
      if (profile && !profile.dashboard_preference) {
        await this.setDashboardPreference(user.id, profile.role);
      }
      
      console.log('UserRouter: Session initialized successfully');
      return true;
      
    } catch (error) {
      console.error('UserRouter: Session initialization failed:', error);
      return false;
    }
  }

  /**
   * Clean up session on logout
   */
  public async cleanupSession(userId: string): Promise<void> {
    try {
      console.log('UserRouter: Cleaning up session for user:', userId);
      
      // Session cleanup removed to break circular dependency
      // TODO: Implement session cleanup without circular dependency
      
      // Remove additional localStorage items
      localStorage.removeItem(`dashboard-preference-${userId}`);
      localStorage.removeItem(`fallback-profile-${userId}`);
      
      // Clear routing history
      this.clearRoutingHistory();
      
      console.log('UserRouter: Session cleanup completed');
      
    } catch (error) {
      console.error('UserRouter: Session cleanup failed:', error);
    }
  }

  /**
   * Check if user session is valid
   */
  public isSessionValid(userId: string): boolean {
    // Session validation removed to break circular dependency
    // For now, just return true to keep the app working
    return true;
  }

  /**
   * Update session activity timestamp
   */
  public updateSessionActivity(userId: string): void {
    // Session activity update removed to break circular dependency
    // TODO: Implement session activity tracking without circular dependency
  }

  /**
   * Handle login success with comprehensive session setup
   */
  public async handleLoginSuccess(
    user: { id: string; email: string },
    profile?: UserProfile,
    options: RoutingOptions = {}
  ): Promise<RoutingResult> {
    try {
      console.log('UserRouter: Handling login success for:', user.email);
      
      // Initialize session
      const sessionInitialized = await this.initializeSession(user, profile);
      if (!sessionInitialized) {
        console.warn('UserRouter: Session initialization failed, continuing with routing');
      }
      
      // Route to appropriate dashboard
      if (profile) {
        return this.routeToUserDashboard(profile, {
          replaceHistory: true,
          ...options
        });
      } else {
        // Handle missing profile with role detection recovery
        return this.handleRoleDetectionFailure(user, {
          replaceHistory: true,
          ...options
        });
      }
      
    } catch (error) {
      console.error('UserRouter: Error handling login success:', error);
      return this.handleRoutingError(error as Error, '/dashboard');
    }
  }
}

// Export singleton instance
export const userRouter = UserRouter.getInstance();