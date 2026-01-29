import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MigrationService } from '../MigrationService';
import { migrationCoordinator } from '../MigrationCoordinator';
import { legacyAccessDetector } from '../LegacyAccessDetector';

// Mock the logger
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn()
  }
}));

describe('MigrationService', () => {
  let migrationService: MigrationService;

  beforeEach(() => {
    migrationService = new MigrationService();
  });

  afterEach(() => {
    migrationService.destroy();
  });

  describe('initialization', () => {
    it('should initialize successfully', async () => {
      await expect(migrationService.initialize()).resolves.not.toThrow();
    });

    it('should not initialize twice', async () => {
      await migrationService.initialize();
      await migrationService.initialize(); // Should not throw
    });

    it('should throw error when using service before initialization', () => {
      expect(() => migrationService.getMigrationStatus()).toThrow('Migration service is not initialized');
    });
  });

  describe('assessment', () => {
    beforeEach(async () => {
      await migrationService.initialize();
    });

    it('should perform full assessment', async () => {
      const assessment = await migrationService.performFullAssessment();
      
      expect(assessment).toHaveProperty('componentReport');
      expect(assessment).toHaveProperty('accessReport');
      expect(assessment).toHaveProperty('recommendations');
      expect(Array.isArray(assessment.recommendations)).toBe(true);
    });

    it('should generate recommendations', async () => {
      const recommendations = await migrationService.generateRecommendations();
      
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('migration status', () => {
    beforeEach(async () => {
      await migrationService.initialize();
    });

    it('should return migration status', () => {
      const status = migrationService.getMigrationStatus();
      
      expect(status).toHaveProperty('progress');
      expect(status).toHaveProperty('runtimeDetections');
      expect(status).toHaveProperty('isMonitoring');
      expect(typeof status.runtimeDetections).toBe('number');
      expect(typeof status.isMonitoring).toBe('boolean');
    });
  });

  describe('data export', () => {
    beforeEach(async () => {
      await migrationService.initialize();
    });

    it('should export migration data', async () => {
      const exportData = await migrationService.exportMigrationData();
      
      expect(exportData).toHaveProperty('assessment');
      expect(exportData).toHaveProperty('progress');
      expect(exportData).toHaveProperty('history');
      expect(exportData).toHaveProperty('runtimeDetections');
      expect(exportData).toHaveProperty('exportTimestamp');
      expect(Array.isArray(exportData.history)).toBe(true);
      expect(Array.isArray(exportData.runtimeDetections)).toBe(true);
    });
  });

  describe('state management', () => {
    beforeEach(async () => {
      await migrationService.initialize();
    });

    it('should reset migration state', async () => {
      await expect(migrationService.resetMigrationState()).resolves.not.toThrow();
    });
  });

  describe('event handling', () => {
    beforeEach(async () => {
      await migrationService.initialize();
    });

    it('should support event listeners', () => {
      const callback = vi.fn();
      
      migrationService.addEventListener('test-event', callback);
      migrationService.removeEventListener('test-event', callback);
      
      // Should not throw
      expect(true).toBe(true);
    });
  });
});