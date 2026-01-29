/**
 * Simple Production Health Check System Test
 */

import { describe, it, expect, vi } from 'vitest';
import { ProductionHealthCheckSystem } from '../ProductionHealthCheckSystem';

describe('ProductionHealthCheckSystem Simple Test', () => {
  it('should be able to create an instance', () => {
    // Mock import.meta.env
    vi.stubGlobal('import.meta', {
      env: {
        VITE_NODE_ENV: 'production',
        VITE_IKHOKHA_API_KEY: 'test-key',
        VITE_IKHOKHA_API_SECRET: 'test-secret',
        VITE_IKHOKHA_WEBHOOK_SECRET: 'test-webhook-secret',
        VITE_SUPABASE_URL: 'https://test.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'test-anon-key'
      }
    });

    const healthCheckSystem = new ProductionHealthCheckSystem();
    expect(healthCheckSystem).toBeDefined();
    expect(healthCheckSystem).toBeInstanceOf(ProductionHealthCheckSystem);
  });

  it('should have the required methods', () => {
    vi.stubGlobal('import.meta', {
      env: {
        VITE_NODE_ENV: 'production'
      }
    });

    const healthCheckSystem = new ProductionHealthCheckSystem();
    
    expect(typeof healthCheckSystem.checkSystemHealth).toBe('function');
    expect(typeof healthCheckSystem.checkPaymentSystemHealth).toBe('function');
    expect(typeof healthCheckSystem.checkConfigurationHealth).toBe('function');
    expect(typeof healthCheckSystem.performComprehensiveHealthCheck).toBe('function');
    expect(typeof healthCheckSystem.createHealthCheckEndpoint).toBe('function');
  });
});