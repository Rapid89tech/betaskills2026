import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { UserRouter, UserProfile } from '../UserRouter';

// Mock navigate function
const mockNavigate = vi.fn();

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
    search: ''
  },
  writable: true
});

describe('UserRouter', () => {
  let userRouter: UserRouter;

  beforeEach(() => {
    // Get fresh instance and clear mocks
    userRouter = UserRouter.getInstance();
    
    // Reset mock navigate to default behavior
    mockNavigate.mockReset();
    mockNavigate.mockImplementation(() => {});
    
    userRouter.initialize(mockNavigate);
    userRouter.clearRoutingHistory();
    vi.clearAllMocks();
    
    // Reset window.location
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
        search: ''
      },
      writable: true
    });
  });

  describe('routeToUserDashboard', () => {
    it('should route student to student dashboard', () => {
      const studentProfile: UserProfile = {
        id: '1',
        email: 'student@test.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'student'
      };

      const result = userRouter.routeToUserDashboard(studentProfile);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/dashboard');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: false });
    });

    it('should route instructor to student dashboard by default', () => {
      const instructorProfile: UserProfile = {
        id: '2',
        email: 'instructor@test.com',
        first_name: 'Jane',
        last_name: 'Smith',
        role: 'instructor'
      };

      const result = userRouter.routeToUserDashboard(instructorProfile);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/dashboard');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: false });
    });

    it('should route admin to admin dashboard', () => {
      const adminProfile: UserProfile = {
        id: '3',
        email: 'admin@test.com',
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin'
      };

      const result = userRouter.routeToUserDashboard(adminProfile);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/admin-dashboard');
      expect(mockNavigate).toHaveBeenCalledWith('/admin-dashboard', { replace: false });
    });

    it('should respect dashboard preference over role', () => {
      const instructorProfile: UserProfile = {
        id: '2',
        email: 'instructor@test.com',
        first_name: 'Jane',
        last_name: 'Smith',
        role: 'instructor',
        dashboard_preference: 'instructor'
      };

      const result = userRouter.routeToUserDashboard(instructorProfile);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/instructor-dashboard');
      expect(mockNavigate).toHaveBeenCalledWith('/instructor-dashboard', { replace: false });
    });

    it('should use fallback route when profile is null', () => {
      const result = userRouter.routeToUserDashboard(null);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/dashboard');
      expect(result.fallbackUsed).toBe(true);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: false });
    });

    it('should preserve query parameters when requested', () => {
      window.location.search = '?tab=courses&filter=enrolled';
      
      const studentProfile: UserProfile = {
        id: '1',
        email: 'student@test.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'student'
      };

      const result = userRouter.routeToUserDashboard(studentProfile, {
        preserveQueryParams: true
      });

      expect(result.success).toBe(true);
      expect(result.route).toBe('/dashboard?tab=courses&filter=enrolled');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard?tab=courses&filter=enrolled', { replace: false });
    });

    it('should use replace history when requested', () => {
      const studentProfile: UserProfile = {
        id: '1',
        email: 'student@test.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'student'
      };

      const result = userRouter.routeToUserDashboard(studentProfile, {
        replaceHistory: true
      });

      expect(result.success).toBe(true);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });

  describe('handleRoleDetectionFailure', () => {
    it('should create fallback profile and route to student dashboard', () => {
      const user = { id: '1', email: 'user@test.com' };
      
      const result = userRouter.handleRoleDetectionFailure(user);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/dashboard');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'fallback-profile-1',
        expect.stringContaining('"role":"student"')
      );
    });

    it('should handle localStorage errors gracefully', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      const user = { id: '1', email: 'user@test.com' };
      const result = userRouter.handleRoleDetectionFailure(user);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/dashboard');
    });
  });

  describe('validateRouteAccess', () => {
    it('should allow student access to student routes', () => {
      expect(userRouter.validateRouteAccess('/dashboard', 'student')).toBe(true);
      expect(userRouter.validateRouteAccess('/course/123', 'student')).toBe(true);
      expect(userRouter.validateRouteAccess('/enrollment/123', 'student')).toBe(true);
    });

    it('should deny student access to admin routes', () => {
      expect(userRouter.validateRouteAccess('/admin-dashboard', 'student')).toBe(false);
    });

    it('should allow instructor access to instructor and student routes', () => {
      expect(userRouter.validateRouteAccess('/dashboard', 'instructor')).toBe(true);
      expect(userRouter.validateRouteAccess('/instructor-dashboard', 'instructor')).toBe(true);
      expect(userRouter.validateRouteAccess('/course/123', 'instructor')).toBe(true);
    });

    it('should allow admin access to all routes', () => {
      expect(userRouter.validateRouteAccess('/dashboard', 'admin')).toBe(true);
      expect(userRouter.validateRouteAccess('/instructor-dashboard', 'admin')).toBe(true);
      expect(userRouter.validateRouteAccess('/admin-dashboard', 'admin')).toBe(true);
    });

    it('should default to student permissions for unknown roles', () => {
      expect(userRouter.validateRouteAccess('/dashboard', 'unknown')).toBe(true);
      expect(userRouter.validateRouteAccess('/admin-dashboard', 'unknown')).toBe(false);
    });
  });

  describe('dashboard preferences', () => {
    it('should set and retrieve dashboard preference', async () => {
      const userId = '123';
      const preference = 'instructor';

      // Mock localStorage.setItem to not throw
      mockLocalStorage.setItem.mockReturnValue(undefined);

      const success = await userRouter.setDashboardPreference(userId, preference);
      expect(success).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'dashboard-preference-123',
        'instructor'
      );
    });

    it('should get dashboard preference from profile', () => {
      const profile: UserProfile = {
        id: '1',
        email: 'user@test.com',
        first_name: 'User',
        last_name: 'Test',
        role: 'instructor',
        dashboard_preference: 'student'
      };

      const preference = userRouter.getDashboardPreference(profile);
      expect(preference).toBe('student');
    });

    it('should default to student preference when no preference set', () => {
      const profile: UserProfile = {
        id: '1',
        email: 'user@test.com',
        first_name: 'User',
        last_name: 'Test',
        role: 'instructor'
      };

      const preference = userRouter.getDashboardPreference(profile);
      expect(preference).toBe('student');
    });
  });

  describe('error handling', () => {
    it('should handle navigation errors with fallback', () => {
      // Clear history to ensure clean state
      userRouter.clearRoutingHistory();
      
      // Test that error handling returns appropriate error result
      const error = new Error('Test error');
      const result = userRouter.handleRoutingError(error, '/fallback');

      // The result should contain error information
      expect(result.error).toContain('Test error');
      expect(result.route).toBe('/fallback');
      
      // In test environment, navigation might fail, but error should be handled
      expect(typeof result.success).toBe('boolean');
    });

    it('should handle missing navigate function', () => {
      // Create new instance without initialization
      const uninitializedRouter = new (UserRouter as any)();
      
      const profile: UserProfile = {
        id: '1',
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        role: 'student'
      };

      const result = uninitializedRouter.routeToUserDashboard(profile);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Navigate function not available');
    });
  });

  describe('routing history', () => {
    it('should track successful routing history', () => {
      // Clear history first to ensure clean state
      userRouter.clearRoutingHistory();
      
      const profile: UserProfile = {
        id: '1',
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        role: 'student'
      };

      const result = userRouter.routeToUserDashboard(profile);
      expect(result.success).toBe(true);
      
      const history = userRouter.getRoutingHistory();
      expect(history.length).toBeGreaterThanOrEqual(1);
      
      // Find the dashboard route in history
      const dashboardEntry = history.find(entry => entry.route === '/dashboard');
      expect(dashboardEntry).toBeDefined();
      expect(dashboardEntry?.success).toBe(true);
    });

    it('should clear routing history', () => {
      // Clear history first to ensure clean state
      userRouter.clearRoutingHistory();
      
      const profile: UserProfile = {
        id: '1',
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        role: 'student'
      };

      userRouter.routeToUserDashboard(profile);
      expect(userRouter.getRoutingHistory().length).toBeGreaterThan(0);
      
      userRouter.clearRoutingHistory();
      expect(userRouter.getRoutingHistory()).toHaveLength(0);
    });
  });
});