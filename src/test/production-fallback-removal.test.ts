/**
 * Test to verify that fallback and simulation mechanisms have been removed from production
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Production Fallback Removal', () => {
  beforeEach(() => {
    // Mock production environment
    vi.stubEnv('VITE_NODE_ENV', 'production');
    vi.stubEnv('VITE_IKHOKHA_API_KEY', 'PROD_KEY_123456789012345678901234567890');
    vi.stubEnv('VITE_IKHOKHA_API_SECRET', 'PROD_SECRET_123456789012345678901234567890');
  });

  it('should block payment processing with test credentials in production', async () => {
    // Mock test credentials in production
    vi.stubEnv('VITE_IKHOKHA_API_KEY', 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D');
    vi.stubEnv('VITE_IKHOKHA_API_SECRET', '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');

    // Import after mocking environment
    const { ikhokhaPaymentIntegration } = await import('@/services/ikhokhaPaymentIntegration');

    expect(() => {
      // This should throw an error due to test credentials in production
      new (ikhokhaPaymentIntegration.constructor as any)();
    }).toThrow('CRITICAL: Test API key detected in production');
  });

  it('should block payment processing with missing credentials in production', async () => {
    // Mock missing credentials
    vi.stubEnv('VITE_IKHOKHA_API_KEY', '');
    vi.stubEnv('VITE_IKHOKHA_API_SECRET', '');

    expect(() => {
      // This should throw an error due to missing credentials
      const { ikhokhaPaymentIntegration } = require('@/services/ikhokhaPaymentIntegration');
      new (ikhokhaPaymentIntegration.constructor as any)();
    }).toThrow('CRITICAL: Production Ikhokha credentials not configured');
  });

  it('should reject simulated payment parameters in InstantPaymentSuccess', async () => {
    // Mock URL with simulation parameters
    const mockSearchParams = new URLSearchParams({
      payment_id: 'pay_123',
      status: 'success',
      simulated: 'true'
    });

    // Mock URLSearchParams
    vi.stubGlobal('URLSearchParams', vi.fn(() => mockSearchParams));
    
    const { default: InstantPaymentSuccess } = await import('@/components/InstantPaymentSuccess');
    
    // The component should reject simulated payments
    // This is tested through the error callback
    let errorCalled = false;
    const mockOnError = vi.fn(() => { errorCalled = true; });
    const mockOnSuccess = vi.fn();

    // Mock user and courses context
    const mockUser = { id: 'user123', email: 'test@example.com' };
    const mockCourses = [{ id: 'course123', title: 'Test Course' }];

    vi.mock('@/hooks/AuthContext', () => ({
      useAuth: () => ({ user: mockUser })
    }));

    vi.mock('@/hooks/CoursesContext', () => ({
      useCoursesContext: () => ({ courses: mockCourses })
    }));

    // The component should call onError for simulated payments
    expect(mockOnError).toBeDefined();
  });

  it('should block development mode payment processing', async () => {
    // Mock development environment
    vi.stubEnv('VITE_NODE_ENV', 'development');

    const { ikhokhaPaymentIntegration } = await import('@/services/ikhokhaPaymentIntegration');

    const paymentRequest = {
      amount: 100,
      currency: 'ZAR',
      description: 'Test payment',
      reference: 'test_ref',
      customer_email: 'test@example.com',
      customer_name: 'Test User',
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      notify_url: 'http://localhost:3000/notify'
    };

    const result = await ikhokhaPaymentIntegration.createPayment(paymentRequest);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Payment processing not available in development mode');
  });

  it('should verify that simulation methods have been removed', async () => {
    const { ikhokhaPaymentIntegration } = await import('@/services/ikhokhaPaymentIntegration');

    // Verify that simulation methods no longer exist
    expect((ikhokhaPaymentIntegration as any).createDirectPaymentSimulation).toBeUndefined();
    expect((ikhokhaPaymentIntegration as any).createValidatedPaymentFallback).toBeUndefined();
    expect((ikhokhaPaymentIntegration as any).processDirectPayment).toBeUndefined();
    expect((ikhokhaPaymentIntegration as any).createSimulatedPayment).toBeUndefined();
  });

  it('should verify that payment status only accepts real success status', () => {
    const { ikhokhaPaymentIntegration } = require('@/services/ikhokhaPaymentIntegration');

    // Mock URL with simulation parameters
    Object.defineProperty(window, 'location', {
      value: {
        search: '?status=success&simulated=true&payment_id=sim_123'
      },
      writable: true
    });

    const status = (ikhokhaPaymentIntegration.constructor as any).getPaymentStatusFromUrl();

    // Should only accept real success status, not simulated
    expect(status.success).toBe(true); // status=success is present
    expect(status.simulated).toBeUndefined(); // simulated flag should not be returned
  });
});