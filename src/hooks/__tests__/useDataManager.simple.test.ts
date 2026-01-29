import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useDataManager } from '../useDataManager';

// Mock all dependencies
vi.mock('@/services/UnifiedEnrollmentManager', () => ({
  unifiedEnrollmentManager: {
    getUserEnrollments: vi.fn().mockResolvedValue([]),
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

describe('useDataManager Simple Test', () => {
  it('should initialize without errors', () => {
    const { result } = renderHook(() => useDataManager());
    
    expect(result.current).toBeDefined();
    expect(result.current.enrollments).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should have all required methods', () => {
    const { result } = renderHook(() => useDataManager());
    
    // Core CRUD operations
    expect(typeof result.current.createEnrollment).toBe('function');
    expect(typeof result.current.updateEnrollment).toBe('function');
    expect(typeof result.current.deleteEnrollment).toBe('function');
    
    // Query operations
    expect(typeof result.current.getEnrollments).toBe('function');
    expect(typeof result.current.getUserEnrollments).toBe('function');
    expect(typeof result.current.getAllEnrollments).toBe('function');
    expect(typeof result.current.getEnrollment).toBe('function');
    
    // Status operations
    expect(typeof result.current.updateEnrollmentStatus).toBe('function');
    expect(typeof result.current.updateEnrollmentProgress).toBe('function');
    
    // Utility functions
    expect(typeof result.current.isEnrolled).toBe('function');
    expect(typeof result.current.isUserEnrolledInCourse).toBe('function');
    expect(typeof result.current.hasPendingEnrollment).toBe('function');
    expect(typeof result.current.getUserEnrollmentForCourse).toBe('function');
    
    // Sync operations
    expect(typeof result.current.syncEnrollments).toBe('function');
    expect(typeof result.current.forceSynchronization).toBe('function');
    
    // Admin operations
    expect(typeof result.current.getEnrollmentStatistics).toBe('function');
    
    // Utility functions
    expect(typeof result.current.refresh).toBe('function');
    expect(typeof result.current.forceRefresh).toBe('function');
  });
});