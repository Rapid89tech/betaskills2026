import { describe, it, expect } from 'vitest';
import { ProductionSecurityValidatorMinimal } from '../ProductionSecurityValidatorMinimal';

describe('ProductionSecurityValidatorMinimal', () => {
  it('should instantiate', () => {
    const validator = new ProductionSecurityValidatorMinimal();
    expect(validator).toBeInstanceOf(ProductionSecurityValidatorMinimal);
  });
});