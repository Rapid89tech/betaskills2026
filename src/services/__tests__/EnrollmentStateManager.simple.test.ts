/**
 * EnrollmentStateManager Simple Tests
 * 
 * Basic tests for enrollment state management functionality
 */

import { describe, it, expect, vi } from 'vitest';
import { EnrollmentStatus, PaymentType } from '@/types/ikhokha';

// Mock the Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          order: vi.fn(() => ({
            limit: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } })
            }))
          }))
        })),
        order: vi.fn(() => ({
          ascending: vi.fn().mockResolvedValue({ data: [], error: null })
        }))
      })),
      upsert: vi.fn().mockResolvedValue({ error: null }),
      insert: vi.fn().mockResolvedValue({ error: null })
    }))
  }
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}));

describe('EnrollmentStateManager', () => {
  it('should be importable', async () => {
    const { EnrollmentStateManager } = await import('../EnrollmentStateManager');
    expect(EnrollmentStateManager).toBeDefined();
  });

  it('should create singleton instance', async () => {
    const { EnrollmentStateManager } = await import('../EnrollmentStateManager');
    const instance1 = EnrollmentStateManager.getInstance();
    const instance2 = EnrollmentStateManager.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should determine payment types correctly', async () => {
    const { EnrollmentStateManager } = await import('../EnrollmentStateManager');
    const manager = EnrollmentStateManager.getInstance();
    
    expect(manager.determinePaymentType('credit_card')).toBe(PaymentType.CARD);
    expect(manager.determinePaymentType('eft')).toBe(PaymentType.EFT);
    expect(manager.determinePaymentType('manual')).toBe(PaymentType.MANUAL);
  });

  it('should determine approval requirements correctly', async () => {
    const { EnrollmentStateManager } = await import('../EnrollmentStateManager');
    const manager = EnrollmentStateManager.getInstance();
    
    expect(manager.shouldRequireApproval(PaymentType.CARD)).toBe(false);
    expect(manager.shouldRequireApproval(PaymentType.EFT)).toBe(true);
    expect(manager.shouldRequireApproval(PaymentType.MANUAL)).toBe(true);
  });

  it('should handle enrollment state for not logged in users', async () => {
    const { EnrollmentStateManager, ButtonAction } = await import('../EnrollmentStateManager');
    const manager = EnrollmentStateManager.getInstance();
    
    const state = await manager.getEnrollmentState('course-123', undefined, false);
    
    expect(state.buttonText).toBe("Register To Enroll");
    expect(state.buttonAction).toBe(ButtonAction.REDIRECT_TO_AUTH);
    expect(state.canEnroll).toBe(false);
    expect(state.hasAccess).toBe(false);
  });

  it('should handle enrollment state for logged in users with no enrollment', async () => {
    const { EnrollmentStateManager, ButtonAction } = await import('../EnrollmentStateManager');
    const manager = EnrollmentStateManager.getInstance();
    
    const state = await manager.getEnrollmentState('course-123', 'user-456', true);
    
    expect(state.buttonText).toBe("Enroll Now");
    expect(state.buttonAction).toBe(ButtonAction.INITIATE_ENROLLMENT);
    expect(state.canEnroll).toBe(true);
    expect(state.hasAccess).toBe(false);
  });
});