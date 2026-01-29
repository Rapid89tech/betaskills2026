import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useDataManager } from '../useDataManager';

// Simple mocks
vi.mock('@/services/UnifiedEnrollmentManager', () => ({
  unifiedEnrollmentManager: {
    getUserEnrollments: vi.fn().mockResolvedValue([]),
    createEnrollment: vi.fn(),
    updateEnrollment: vi.fn(),
    deleteEnrollment: vi.fn(),
    getAllEnrollments: vi.fn(),
    updateEnrollmentStatus: vi.fn(),
    updateEnrollmentProgress: vi.fn(),
    isUserEnrolledInCourse: vi.fn(),
    getUserEnrollmentForCourse: vi.fn(),
    getEnrollmentStatistics: vi.fn(),
    forceSynchronization: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }
}));

vi.mock('../AuthContext', () => ({
  useAuth: vi.fn().mockReturnValue({ user: null })
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  }
}));

vi.mock('@/services/DataManager', () => ({
  dataManager: {},
  EnrollmentData: {}
}));

describe('useDataManager Functionality Test', () => {
  it('should provide all enhanced CRUD operations', () => {
    const { result } = renderHook(() => useDataManager());
    
    // Verify all CRUD operations are available
    expect(typeof result.current.createEnrollment).toBe('function');
    expect(typeof result.current.updateEnrollment).toBe('function');
    expect(typeof result.current.deleteEnrollment).toBe('function');
    
    // Verify enhanced query operations
    expect(typeof result.current.getEnrollments).toBe('function');
    expect(typeof result.current.getUserEnrollments).toBe('function');
    expect(typeof result.current.getAllEnrollments).toBe('function');
    expect(typeof result.current.getEnrollment).toBe('function');
    
    // Verify status operations
    expect(typeof result.current.updateEnrollmentStatus).toBe('function');
    expect(typeof result.current.updateEnrollmentProgress).toBe('function');
    
    // Verify utility functions
    expect(typeof result.current.isEnrolled).toBe('function');
    expect(typeof result.current.isUserEnrolledInCourse).toBe('function');
    expect(typeof result.current.hasPendingEnrollment).toBe('function');
    expect(typeof result.current.getUserEnrollmentForCourse).toBe('function');
    
    // Verify sync operations
    expect(typeof result.current.syncEnrollments).toBe('function');
    expect(typeof result.current.forceSynchronization).toBe('function');
    
    // Verify admin operations
    expect(typeof result.current.getEnrollmentStatistics).toBe('function');
    
    // Verify utility functions
    expect(typeof result.current.refresh).toBe('function');
    expect(typeof result.current.forceRefresh).toBe('function');
  });

  it('should have proper state structure', () => {
    const { result } = renderHook(() => useDataManager());
    
    // Verify state properties
    expect(Array.isArray(result.current.enrollments)).toBe(true);
    expect(typeof result.current.loading).toBe('boolean');
    expect(result.current.error === null || typeof result.current.error === 'string').toBe(true);
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useDataManager());
    
    expect(result.current.enrollments).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should have TypeScript-compatible interface', () => {
    const { result } = renderHook(() => useDataManager());
    
    // This test ensures the interface matches our TypeScript definitions
    const hook = result.current;
    
    // Test that we can access all properties without TypeScript errors
    expect(hook.enrollments).toBeDefined();
    expect(hook.loading).toBeDefined();
    expect(hook.error).toBeDefined();
    expect(hook.createEnrollment).toBeDefined();
    expect(hook.updateEnrollment).toBeDefined();
    expect(hook.deleteEnrollment).toBeDefined();
    expect(hook.getEnrollments).toBeDefined();
    expect(hook.getUserEnrollments).toBeDefined();
    expect(hook.getAllEnrollments).toBeDefined();
    expect(hook.getEnrollment).toBeDefined();
    expect(hook.updateEnrollmentStatus).toBeDefined();
    expect(hook.updateEnrollmentProgress).toBeDefined();
    expect(hook.isEnrolled).toBeDefined();
    expect(hook.isUserEnrolledInCourse).toBeDefined();
    expect(hook.hasPendingEnrollment).toBeDefined();
    expect(hook.getUserEnrollmentForCourse).toBeDefined();
    expect(hook.syncEnrollments).toBeDefined();
    expect(hook.forceSynchronization).toBeDefined();
    expect(hook.getEnrollmentStatistics).toBeDefined();
    expect(hook.refresh).toBeDefined();
    expect(hook.forceRefresh).toBeDefined();
  });
});