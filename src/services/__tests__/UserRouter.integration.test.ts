/**
 * UserRouter Integration Test - Simple verification
 * 
 * Tests basic UserRouter functionality for authentication integration
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserRouter, UserProfile } from '../UserRouter';

describe('UserRouter Integration - Basic Tests', () => {
  let userRouter: UserRouter;
  const mockNavigate = vi.fn();

  beforeEach(() => {
    userRouter = UserRouter.getInstance();
    userRouter.initialize(mockNavigate);
    mockNavigate.mockClear();
    // Ensure the mock doesn't throw errors
    mockNavigate.mockImplementation(() => {});
  });

  it('should initialize UserRouter correctly', () => {
    expect(userRouter).toBeDefined();
    expect(typeof userRouter.routeToUserDashboard).toBe('function');
    expect(typeof userRouter.handleLoginSuccess).toBe('function');
  });

  it('should route student to dashboard', () => {
    const profile: UserProfile = {
      id: 'test-user',
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
      role: 'student',
      approved: true,
      approval_status: 'approved'
    };

    const result = userRouter.routeToUserDashboard(profile);

    expect(result.success).toBe(true);
    expect(result.route).toBe('/dashboard');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: false });
  });

  it('should route admin to admin dashboard', () => {
    const profile: UserProfile = {
      id: 'admin-user',
      email: 'admin@example.com',
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      approved: true,
      approval_status: 'approved'
    };

    const result = userRouter.routeToUserDashboard(profile);

    expect(result.success).toBe(true);
    expect(result.route).toBe('/admin-dashboard');
    expect(mockNavigate).toHaveBeenCalledWith('/admin-dashboard', { replace: false });
  });

  it('should handle missing profile with fallback', () => {
    const result = userRouter.routeToUserDashboard(null);

    expect(result.success).toBe(true);
    expect(result.route).toBe('/dashboard');
    expect(result.fallbackUsed).toBe(true);
  });

  it('should handle role detection failure', () => {
    const user = { id: 'test-user', email: 'test@example.com' };
    
    const result = userRouter.handleRoleDetectionFailure(user);

    expect(result.success).toBe(true);
    expect(result.route).toBe('/dashboard');
  });

  it('should validate route access correctly', () => {
    expect(userRouter.validateRouteAccess('/dashboard', 'student')).toBe(true);
    expect(userRouter.validateRouteAccess('/admin-dashboard', 'student')).toBe(false);
    expect(userRouter.validateRouteAccess('/admin-dashboard', 'admin')).toBe(true);
  });

  it('should handle routing errors gracefully', () => {
    mockNavigate.mockImplementation(() => {
      throw new Error('Navigation failed');
    });

    const error = new Error('Test error');
    const result = userRouter.handleRoutingError(error, '/fallback');

    // Should attempt fallback navigation
    expect(result.error).toContain('Test error');
  });

  it('should determine target route based on role', () => {
    // Test student routing
    const studentProfile: UserProfile = {
      id: 'student',
      email: 'student@example.com',
      first_name: 'Student',
      last_name: 'User',
      role: 'student',
      approved: true,
      approval_status: 'approved'
    };

    const studentResult = userRouter.routeToUserDashboard(studentProfile);
    expect(studentResult.route).toBe('/dashboard');

    // Clear mock and test admin routing separately
    mockNavigate.mockClear();

    const adminProfile: UserProfile = {
      id: 'admin',
      email: 'admin@example.com',
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      approved: true,
      approval_status: 'approved'
    };

    const adminResult = userRouter.routeToUserDashboard(adminProfile);
    expect(adminResult.route).toBe('/admin-dashboard');
  });

  it('should respect dashboard preferences', () => {
    const instructorWithStudentPreference: UserProfile = {
      id: 'instructor',
      email: 'instructor@example.com',
      first_name: 'Instructor',
      last_name: 'User',
      role: 'instructor',
      dashboard_preference: 'student',
      approved: true,
      approval_status: 'approved'
    };

    const result = userRouter.routeToUserDashboard(instructorWithStudentPreference);

    expect(result.route).toBe('/dashboard'); // Should use preference, not role
  });
});