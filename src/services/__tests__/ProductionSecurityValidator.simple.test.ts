/**
 * Simple test to verify ProductionSecurityValidator can be instantiated
 */

import { describe, it, expect } from 'vitest';
import { ProductionSecurityValidator } from '../ProductionSecurityValidator';

describe('ProductionSecurityValidator - Simple Test', () => {
  it('should be able to instantiate the class', () => {
    expect(() => {
      const validator = new ProductionSecurityValidator();
      expect(validator).toBeInstanceOf(ProductionSecurityValidator);
    }).not.toThrow();
  });

  it('should have the required methods', () => {
    const validator = new ProductionSecurityValidator();
    
    expect(typeof validator.validateApiKeyStrength).toBe('function');
    expect(typeof validator.validateSecretStrength).toBe('function');
    expect(typeof validator.validateWebhookSecretStrength).toBe('function');
    expect(typeof validator.validateHttpsEndpoints).toBe('function');
    expect(typeof validator.validateWebhookSecurity).toBe('function');
    expect(typeof validator.validateCertificates).toBe('function');
    expect(typeof validator.performSecurityAudit).toBe('function');
    expect(typeof validator.generateSecurityReport).toBe('function');
    expect(typeof validator.validateProductionSecurity).toBe('function');
  });
});