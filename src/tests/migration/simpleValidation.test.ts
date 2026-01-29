import { describe, it, expect } from 'vitest';
import { migrationValidator } from '@/utils/migrationValidation';
import { legacyAccessMonitor } from '@/utils/legacyAccessMonitor';

/**
 * Simple validation tests for migration system
 * These tests verify basic functionality without complex mocking
 */

describe('Migration Validation', () => {
  it('should create migration validator instance', () => {
    expect(migrationValidator).toBeDefined();
    expect(typeof migrationValidator.validateMigration).toBe('function');
  });

  it('should create legacy access monitor instance', () => {
    expect(legacyAccessMonitor).toBeDefined();
    expect(typeof legacyAccessMonitor.markComponentMigrated).toBe('function');
    expect(typeof legacyAccessMonitor.isComponentMigrated).toBe('function');
  });

  it('should get migration report', () => {
    const report = legacyAccessMonitor.getMigrationReport();
    expect(report).toBeDefined();
    expect(typeof report.totalComponents).toBe('number');
    expect(typeof report.migratedComponents).toBe('object');
    expect(typeof report.pendingComponents).toBe('object');
    expect(typeof report.allMigrated).toBe('boolean');
  });

  it('should mark component as migrated', () => {
    const componentName = 'TestComponent';
    legacyAccessMonitor.markComponentMigrated(componentName);
    expect(legacyAccessMonitor.isComponentMigrated(componentName)).toBe(true);
  });

  it('should generate validation report', () => {
    const report = migrationValidator.generateValidationReport();
    expect(report).toBeDefined();
    expect(typeof report).toBe('string');
    expect(report.length).toBeGreaterThan(0);
  });
});
