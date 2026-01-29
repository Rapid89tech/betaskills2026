/**
 * UserRouter Authentication Integration Tests
 * 
 * Tests the integration between UserRouter and authentication flow
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { UserRouter, UserProfile } from '../UserRouter';

// Mock navigate function
const mockNavigate = vi.fn();

// Mock RealTimeService
vi.mock('../RealTimeService', () => ({
  realTimeService: {
    connect: vi.fn().mockResolvedValue(undefined),
    disconnect: vi.fn(),
  }
}));

describe('UserRouter Authentication Integration', () => {
  let userRouter: UserRouter;

  beforeEach(() => {
    userRouter = UserRouter.getInstance();
    userRouter.initialize(mockNavigate);
    mockNavigate.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('handleLoginSuccess', () => {
    it('should handle login success with profile', async () => {
      const user = { id: 'user-1', email: 'test@example.com' };
      const profile: UserProfile = {
        id: 'user-1',
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        role: 'student',
        approved: true,
        approval_status: 'approved'
      };

      const result = await userRouter.handleLoginSuccess(user, profile);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/dashboard');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
      
      // Check session initialization
      const sessionData = localStorage.getItem(`user-session-${user.id}`);
      expect(sessionData).toBeTruthy();
      
      const session = JSON.parse(sessionData!);
      expect(session.userId).toBe(user.id);
      expect(session.email).toBe(user.email);
    });

    it('should handle login success without profile using role detection', async () => {
      const user = { id: 'user-2', email: 'test2@example.com' };

      const result = await userRouter.handleLoginSuccess(user);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/dashboard');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
      
      // Check fallback profile creation
      const fallbackProfile = localStorage.getItem(`fallback-profile-${user.id}`);
      expect(fallbackProfile).toBeTruthy();
    });

    it('should handle instructor role routing', async () => {
      const user = { id: 'user-3', email: 'instructor@example.com' };
      const profile: UserProfile = {
        id: 'user-3',
        email: 'instructor@example.com',
        first_name: 'Instructor',
        last_name: 'User',
        role: 'instructor',
        approved: true,
        approval_status: 'approved'
      };

      const result = await userRouter.handleLoginSuccess(user, profile);

      expect(result.success).toBe(true);
      // Should default to student dashboard per requirements
      expect(result.route).toBe('/dashboard');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });

    it('should handle admin role routing', async () => {
      const user = { id: 'user-4', email: 'admin@example.com' };
      const profile: UserProfile = {
        id: 'user-4',
        email: 'admin@example.com',
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin',
        approved: true,
        approval_status: 'approved'
      };

      const result = await userRouter.handleLoginSuccess(user, profile);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/admin-dashboard');
      expect(mockNavigate).toHaveBeenCalledWith('/admin-dashboard', { replace: true });
    });
  });

  describe('initializeSession', () => {
    it('should initialize session with user data', async () => {
      const user = { id: 'user-5', email: 'session@example.com' };
      const profile: UserProfile = {
        id: 'user-5',
        email: 'session@example.com',
        first_name: 'Session',
        last_name: 'User',
        role: 'student',
        approved: true,
        approval_status: 'approved'
      };

      const result = await userRouter.initializeSession(user, profile);

      expect(result).toBe(true);
      
      const sessionData = localStorage.getItem(`user-session-${user.id}`);
      expect(sessionData).toBeTruthy();
      
      const session = JSON.parse(sessionData!);
      expect(session.userId).toBe(user.id);
      expect(session.email).toBe(user.email);
      expect(session.loginTime).toBeTruthy();
      expect(session.lastActivity).toBeTruthy();
    });

    it('should set dashboard preference if not already set', async () => {
      const user = { id: 'user-6', email: 'pref@example.com' };
      const profile: UserProfile = {
        id: 'user-6',
        email: 'pref@example.com',
        first_name: 'Pref',
        last_name: 'User',
        role: 'instructor',
        approved: true,
        approval_status: 'approved'
      };

      await userRouter.initializeSession(user, profile);

      const preference = localStorage.getItem(`dashboard-preference-${user.id}`);
      expect(preference).toBe('instructor');
    });
  });

  describe('cleanupSession', () => {
    it('should clean up all session data', () => {
      const userId = 'user-7';
      
      // Set up session data
      localStorage.setItem(`user-session-${userId}`, JSON.stringify({ test: 'data' }));
      localStorage.setItem(`dashboard-preference-${userId}`, 'student');
      localStorage.setItem(`fallback-profile-${userId}`, JSON.stringify({ test: 'profile' }));

      userRouter.cleanupSession(userId);

      expect(localStorage.getItem(`user-session-${userId}`)).toBeNull();
      expect(localStorage.getItem(`dashboard-preference-${userId}`)).toBeNull();
      expect(localStorage.getItem(`fallback-profile-${userId}`)).toBeNull();
    });
  });

  describe('isSessionValid', () => {
    it('should return true for valid session', () => {
      const userId = 'user-8';
      const sessionData = {
        userId,
        email: 'valid@example.com',
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      };
      
      localStorage.setItem(`user-session-${userId}`, JSON.stringify(sessionData));

      const isValid = userRouter.isSessionValid(userId);
      expect(isValid).toBe(true);
    });

    it('should return false for expired session', () => {
      const userId = 'user-9';
      const expiredTime = new Date(Date.now() - 25 * 60 * 60 * 1000); // 25 hours ago
      const sessionData = {
        userId,
        email: 'expired@example.com',
        loginTime: expiredTime.toISOString(),
        lastActivity: expiredTime.toISOString()
      };
      
      localStorage.setItem(`user-session-${userId}`, JSON.stringify(sessionData));

      const isValid = userRouter.isSessionValid(userId);
      expect(isValid).toBe(false);
    });

    it('should return false for missing session', () => {
      const isValid = userRouter.isSessionValid('nonexistent-user');
      expect(isValid).toBe(false);
    });
  });

  describe('updateSessionActivity', () => {
    it('should update session activity timestamp', () => {
      const userId = 'user-10';
      const oldTime = new Date(Date.now() - 60000); // 1 minute ago
      const sessionData = {
        userId,
        email: 'activity@example.com',
        loginTime: oldTime.toISOString(),
        lastActivity: oldTime.toISOString()
      };
      
      localStorage.setItem(`user-session-${userId}`, JSON.stringify(sessionData));

      userRouter.updateSessionActivity(userId);

      const updatedSessionData = localStorage.getItem(`user-session-${userId}`);
      const updatedSession = JSON.parse(updatedSessionData!);
      
      expect(new Date(updatedSession.lastActivity).getTime()).toBeGreaterThan(oldTime.getTime());
    });
  });

  describe('error handling', () => {
    it('should handle routing errors gracefully', async () => {
      // Mock navigate to throw error
      mockNavigate.mockImplementation(() => {
        throw new Error('Navigation failed');
      });

      const user = { id: 'error-user', email: 'error@example.com' };
      const profile: UserProfile = {
        id: 'error-user',
        email: 'error@example.com',
        first_name: 'Error',
        last_name: 'User',
        role: 'student',
        approved: true,
        approval_status: 'approved'
      };

      const result = await userRouter.handleLoginSuccess(user, profile);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Navigation failed');
    });

    it('should handle session initialization errors', async () => {
      // Mock localStorage to throw error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = vi.fn().mockImplementation(() => {
        throw new Error('Storage failed');
      });

      const user = { id: 'storage-error', email: 'storage@example.com' };
      
      const result = await userRouter.initializeSession(user);

      expect(result).toBe(false);

      // Restore localStorage
      localStorage.setItem = originalSetItem;
    });
  });

  describe('dashboard preferences', () => {
    it('should respect existing dashboard preference', async () => {
      const user = { id: 'pref-user', email: 'pref@example.com' };
      const profile: UserProfile = {
        id: 'pref-user',
        email: 'pref@example.com',
        first_name: 'Pref',
        last_name: 'User',
        role: 'instructor',
        dashboard_preference: 'student',
        approved: true,
        approval_status: 'approved'
      };

      const result = await userRouter.handleLoginSuccess(user, profile);

      expect(result.success).toBe(true);
      expect(result.route).toBe('/dashboard'); // Should use preference, not role
    });

    it('should set preference based on role if not set', async () => {
      const user = { id: 'no-pref-user', email: 'nopref@example.com' };
      const profile: UserProfile = {
        id: 'no-pref-user',
        email: 'nopref@example.com',
        first_name: 'NoPref',
        last_name: 'User',
        role: 'admin',
        approved: true,
        approval_status: 'approved'
      };

      await userRouter.handleLoginSuccess(user, profile);

      const preference = localStorage.getItem(`dashboard-preference-${user.id}`);
      expect(preference).toBe('admin');
    });
  });
});