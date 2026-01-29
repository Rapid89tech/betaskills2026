/**
 * Minimal Production Security Validator for testing
 */

export class ProductionSecurityValidatorMinimal {
  validateApiKeyStrength(apiKey: string): { valid: boolean } {
    return { valid: apiKey === 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D' };
  }
}