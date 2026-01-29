/**
 * Basic Production Health Check System Test
 */

import { describe, it, expect, vi } from 'vitest';

describe('ProductionHealthCheckSystem Basic Test', () => {
  it('should be able to import and use the health check system', async () => {
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

    // Dynamic import to avoid constructor issues
    const { ProductionHealthCheckSystem } = await import('../ProductionHealthCheckSystem');
    
    const healthCheckSystem = new ProductionHealthCheckSystem();
    expect(healthCheckSystem).toBeDefined();
    
    // Test a basic health check
    const result = await healthCheckSystem.performComprehensiveHealthCheck();
    expect(result).toBeDefined();
    expect(result.overall_status).toMatch(/healthy|degraded|unhealthy/);
    expect(result.timestamp).toBeDefined();
    expect(result.summary).toBeDefined();
    expect(result.summary.total_checks).toBeGreaterThan(0);
  });
});