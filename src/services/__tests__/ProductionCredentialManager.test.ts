/**
 * Tests for ProductionCredentialManager
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  ProductionCredentialManager, 
  type ProductionCredentials
} from '../ProductionCredentialManager';

// Mock environment variables
const mockEnv = {
  VITE_IKHOKHA_API_KEY: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
  VITE_IKHOKHA_API_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
  VITE_IKHOKHA_WEBHOOK_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
  VITE_NODE_ENV: 'production',
  VITE_IKHOKHA_TEST_MODE: 'false'
};

describe('ProductionCredentialManager', () => {
  let manager: ProductionCredentialManager;

  beforeEach(() => {
    // Reset singleton instance
    (ProductionCredentialManager as any).instance = undefined;
    manager = ProductionCredentialManager.getInstance();
    
    // Mock import.meta.env
    vi.stubGlobal('import', {
      meta: {
        env: { ...mockEnv }
      }
    });
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = ProductionCredentialManager.getInstance();
      const instance2 = ProductionCredentialManager.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('loadProductionCredentials', () => {
    it('should load production credentials successfully', () => {
      const credentials = manager.loadProductionCredentials();
      
      expect(credentials.api_key).toBe('IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D');
      expect(credentials.api_secret).toBe('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      expect(credentials.webhook_secret).toBe('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      expect(credentials.node_env).toBe('production');
      expect(credentials.test_mode).toBe(false);
    });

    it('should throw error when required environment variables are missing', () => {
      vi.stubGlobal('import', {
        meta: {
          env: {}
        }
      });

      expect(() => manager.loadProductionCredentials()).toThrow(
        'Required environment variable VITE_NODE_ENV is not set'
      );
    });
  });

  describe('validateCredentialFormat', () => {
    it('should validate correct production credentials', () => {
      const credentials: ProductionCredentials = {
        api_key: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
        api_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
        webhook_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
        node_env: 'production',
        test_mode: false,
        api_url: 'https://api.ikhokha.com',
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000,
        webhook_validation: true,
        https_required: true,
        payment_logging: true
      };

      const result = manager.validateCredentialFormat(credentials);
      
      expect(result.is_valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('maskSensitiveData', () => {
    it('should mask sensitive credential data', () => {
      const credentials: ProductionCredentials = {
        api_key: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
        api_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
        webhook_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
        node_env: 'production',
        test_mode: false,
        api_url: 'https://api.ikhokha.com',
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000,
        webhook_validation: true,
        https_required: true,
        payment_logging: true
      };

      const masked = manager.maskSensitiveData(credentials);
      
      expect(masked.api_key).toBe('IKW3************************DX5D');
      expect(masked.api_secret).toBe('455r************************OeS');
      expect(masked.webhook_secret).toBe('455r************************OeS');
      expect(masked.node_env).toBe('production');
      expect(masked.api_url).toBe('https://api.ikhokha.com');
    });
  });
});