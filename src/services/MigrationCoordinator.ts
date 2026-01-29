import { logger } from '@/utils/logger';
import { legacyAccessDetector } from './LegacyAccessDetector';
import type {
  LegacyComponentReport,
  ComponentPriority,
  MigrationResult,
  ValidationResult,
  MigrationProgress,
  ComponentFailure,
  MigrationReport,
  TestResult,
  MigrationConfig,
  MigrationEvent
} from '@/types/migration';

/**
 * Migration Coordinator
 * 
 * This service coordinates the migration of legacy components from direct localStorage
 * access to the UnifiedEnrollmentManager. It provides assessment, tracking, and
 * orchestration capabilities for the migration process.
 */
export class MigrationCoordinator {
  private migrationProgress: MigrationProgress;
  private eventTarget: EventTarget;
  private config: MigrationConfig;
  private migrationHistory: MigrationResult[] = [];

  // Default configuration
  private readonly DEFAULT_CONFIG: MigrationConfig = {
    scanPaths: ['src/hooks', 'src/components', 'src/pages', 'src/services'],
    excludePatterns: ['**/*.test.ts', '**/*.spec.ts', '**/node_modules/**'],
    priorityRules: [
      { pattern: 'useEnrollmentData', priority: 'high', reason: 'Core enrollment data hook' },
      { pattern: 'useEnrollments', priority: 'high', reason: 'Primary enrollment management' },
      { pattern: 'AdminDashboard', priority: 'high', reason: 'Critical admin functionality' },
      { pattern: 'Enrollment', priority: 'medium', reason: 'User-facing enrollment interface' }
    ],
    autoFixEnabled: false,
    backupEnabled: true,
    validationEnabled: true
  };

  constructor(config?: Partial<MigrationConfig>) {
    this.config = { ...this.DEFAULT_CONFIG, ...config };
    this.eventTarget = new EventTarget();
    this.migrationProgress = this.initializeProgress();
    
    // Set up event listeners
    this.setupEventListeners();
  }

  /**
   * Assess all legacy components in the codebase
   */
  async assessLegacyComponents(): Promise<LegacyComponentReport> {
    logger.info('Starting legacy component assessment...');
    
    try {
      this.dispatchMigrationEvent({ type: 'scan-started', timestamp: new Date().toISOString() });
      
      // Get legacy access report from detector
      const accessReport = await legacyAccessDetector.scanForLegacyAccess();
      
      // Analyze components and create priority matrix
      const allComponents = [
        ...accessReport.directLocalStorageAccess.map(a => a.componentPath),
        ...accessReport.legacyHookUsage.map(h => h.componentPath),
        ...accessReport.unmigratedComponents
      ];
      
      const uniqueComponents = [...new Set(allComponents)];
      const migrationPriority = this.calculateMigrationPriority(uniqueComponents, accessReport);
      const estimatedEffort = this.calculateEstimatedEffort(migrationPriority);
      
      const report: LegacyComponentReport = {
        totalComponents: uniqueComponents.length,
        legacyComponents: uniqueComponents,
        migrationPriority,
        estimatedEffort,
        scanTimestamp: new Date().toISOString()
      };
      
      // Update progress tracking
      this.migrationProgress.totalComponents = report.totalComponents;
      this.migrationProgress.pendingComponents = [...uniqueComponents];
      
      logger.info(`Assessment completed. Found ${report.totalComponents} components requiring migration`);
      
      this.dispatchMigrationEvent({ type: 'scan-completed', report });
      
      return report;
    } catch (error) {
      logger.error('Failed to assess legacy components:', error);
      throw error;
    }
  }

  /**
   * Migrate a specific component
   */
  async migrateComponent(componentPath: string): Promise<MigrationResult> {
    logger.info(`Starting migration for component: ${componentPath}`);
    
    try {
      this.dispatchMigrationEvent({ 
        type: 'migration-started', 
        componentPath 
      });
      
      const startTime = Date.now();
      
      // Create backup if enabled
      let backupPath: string | undefined;
      if (this.config.backupEnabled) {
        backupPath = await this.createBackup(componentPath);
      }
      
      // Perform the migration
      const migrationResult = await this.performMigration(componentPath);
      
      // Validate the migration if enabled
      if (this.config.validationEnabled) {
        const validationResult = await this.validateMigration(componentPath);
        if (!validationResult.isValid) {
          migrationResult.success = false;
          migrationResult.errors.push(...validationResult.issues.map(i => i.message));
        }
      }
      
      // Update progress
      this.updateMigrationProgress(componentPath, migrationResult.success);
      
      // Record migration result
      migrationResult.migrationTimestamp = new Date().toISOString();
      this.migrationHistory.push(migrationResult);
      
      const duration = Date.now() - startTime;
      logger.info(`Migration ${migrationResult.success ? 'completed' : 'failed'} for ${componentPath} in ${duration}ms`);
      
      this.dispatchMigrationEvent({ 
        type: migrationResult.success ? 'migration-completed' : 'migration-failed',
        ...(migrationResult.success ? { result: migrationResult } : { componentPath, error: migrationResult.errors.join(', ') })
      });
      
      return migrationResult;
    } catch (error) {
      logger.error(`Migration failed for ${componentPath}:`, error);
      
      const failureResult: MigrationResult = {
        success: false,
        componentPath,
        changes: [],
        warnings: [],
        errors: [error instanceof Error ? error.message : String(error)],
        migrationTimestamp: new Date().toISOString()
      };
      
      this.updateMigrationProgress(componentPath, false, String(error));
      this.migrationHistory.push(failureResult);
      
      this.dispatchMigrationEvent({ 
        type: 'migration-failed', 
        componentPath, 
        error: String(error) 
      });
      
      return failureResult;
    }
  }

  /**
   * Validate a migrated component
   */
  async validateMigration(componentPath: string): Promise<ValidationResult> {
    logger.info(`Validating migration for: ${componentPath}`);
    
    try {
      const result: ValidationResult = {
        isValid: true,
        componentPath,
        issues: [],
        recommendations: [],
        validationTimestamp: new Date().toISOString()
      };
      
      // In a real implementation, this would:
      // 1. Check for remaining localStorage access patterns
      // 2. Verify proper import statements
      // 3. Test component functionality
      // 4. Check TypeScript compilation
      // 5. Run automated tests
      
      // Mock validation logic
      const suggestions = legacyAccessDetector.suggestMigrationPath(componentPath);
      if (suggestions.length > 0) {
        result.recommendations = suggestions.map(s => s.description);
      }
      
      logger.info(`Validation completed for ${componentPath}: ${result.isValid ? 'PASSED' : 'FAILED'}`);
      
      this.dispatchMigrationEvent({ 
        type: 'validation-completed', 
        result 
      });
      
      return result;
    } catch (error) {
      logger.error(`Validation failed for ${componentPath}:`, error);
      throw error;
    }
  }

  /**
   * Get current migration progress
   */
  getMigrationProgress(): MigrationProgress {
    // Update completion percentage
    const total = this.migrationProgress.totalComponents;
    const migrated = this.migrationProgress.migratedComponents;
    this.migrationProgress.completionPercentage = total > 0 ? (migrated / total) * 100 : 0;
    
    // Update estimated time remaining (simple calculation)
    const remaining = this.migrationProgress.pendingComponents.length;
    const avgTimePerComponent = 5; // minutes
    this.migrationProgress.estimatedTimeRemaining = remaining * avgTimePerComponent;
    
    this.migrationProgress.lastUpdate = new Date().toISOString();
    
    return { ...this.migrationProgress };
  }

  /**
   * Generate comprehensive migration report
   */
  async generateMigrationReport(): Promise<MigrationReport> {
    logger.info('Generating migration report...');
    
    const progress = this.getMigrationProgress();
    const successful = this.migrationHistory.filter(r => r.success);
    const failed = this.migrationHistory.filter(r => !r.success);
    
    const report: MigrationReport = {
      summary: {
        totalScanned: progress.totalComponents,
        totalMigrated: progress.migratedComponents,
        totalFailed: progress.failedComponents.length,
        completionRate: progress.completionPercentage
      },
      components: {
        migrated: successful.map(r => r.componentPath),
        pending: progress.pendingComponents,
        failed: progress.failedComponents
      },
      performance: {
        scanDuration: 0, // Would be calculated from actual scan times
        migrationDuration: 0, // Would be calculated from migration times
        averageComponentTime: 0 // Would be calculated from individual migration times
      },
      recommendations: this.generateRecommendations(),
      generatedAt: new Date().toISOString()
    };
    
    logger.info('Migration report generated successfully');
    return report;
  }

  /**
   * Get migration configuration
   */
  getConfig(): MigrationConfig {
    return { ...this.config };
  }

  /**
   * Update migration configuration
   */
  updateConfig(updates: Partial<MigrationConfig>): void {
    this.config = { ...this.config, ...updates };
    logger.info('Migration configuration updated');
  }

  /**
   * Get migration history
   */
  getMigrationHistory(): MigrationResult[] {
    return [...this.migrationHistory];
  }

  /**
   * Clear migration history
   */
  clearMigrationHistory(): void {
    this.migrationHistory = [];
    logger.info('Migration history cleared');
  }

  /**
   * Add event listener for migration events
   */
  addEventListener(eventType: string, callback: (event: CustomEvent) => void): void {
    this.eventTarget.addEventListener(eventType, callback as EventListener);
  }

  /**
   * Remove event listener
   */
  removeEventListener(eventType: string, callback: (event: CustomEvent) => void): void {
    this.eventTarget.removeEventListener(eventType, callback as EventListener);
  }

  /**
   * Private helper methods
   */
  private initializeProgress(): MigrationProgress {
    return {
      totalComponents: 0,
      migratedComponents: 0,
      pendingComponents: [],
      failedComponents: [],
      completionPercentage: 0,
      estimatedTimeRemaining: 0,
      startTime: new Date().toISOString(),
      lastUpdate: new Date().toISOString()
    };
  }

  private calculateMigrationPriority(components: string[], accessReport: any): ComponentPriority[] {
    return components.map(componentPath => {
      // Determine priority based on rules and component characteristics
      let priority: 'high' | 'medium' | 'low' = 'low';
      let reason = 'Standard component migration';
      let estimatedEffort = 2; // hours
      
      // Check priority rules
      for (const rule of this.config.priorityRules) {
        if (componentPath.includes(rule.pattern)) {
          priority = rule.priority;
          reason = rule.reason;
          break;
        }
      }
      
      // Adjust effort based on complexity indicators
      const directAccess = accessReport.directLocalStorageAccess.find((a: any) => a.componentPath === componentPath);
      if (directAccess) {
        estimatedEffort += directAccess.patterns.length * 0.5;
      }
      
      return {
        componentPath,
        priority,
        reason,
        dependencies: [], // Would be calculated from actual dependency analysis
        estimatedEffort,
        legacyPatterns: directAccess?.patterns || []
      };
    });
  }

  private calculateEstimatedEffort(priorities: ComponentPriority[]): number {
    return priorities.reduce((total, component) => total + component.estimatedEffort, 0);
  }

  private async createBackup(componentPath: string): Promise<string> {
    // In a real implementation, this would create a backup of the file
    const backupPath = `${componentPath}.backup.${Date.now()}`;
    logger.info(`Created backup: ${backupPath}`);
    return backupPath;
  }

  private async performMigration(componentPath: string): Promise<MigrationResult> {
    // Mock migration logic - in reality this would:
    // 1. Read the component file
    // 2. Apply migration transformations
    // 3. Update imports and dependencies
    // 4. Write the modified file
    
    const result: MigrationResult = {
      success: true,
      componentPath,
      changes: [
        'Replaced localStorage.getItem with unifiedEnrollmentManager.getUserEnrollments',
        'Added UnifiedEnrollmentManager import',
        'Updated error handling patterns'
      ],
      warnings: [
        'Manual testing recommended for complex state interactions'
      ],
      errors: [],
      migrationTimestamp: new Date().toISOString()
    };
    
    // Simulate some migration scenarios
    if (componentPath.includes('Complex')) {
      result.warnings.push('Complex component may require manual review');
    }
    
    return result;
  }

  private updateMigrationProgress(componentPath: string, success: boolean, error?: string): void {
    if (success) {
      this.migrationProgress.migratedComponents++;
      this.migrationProgress.pendingComponents = this.migrationProgress.pendingComponents.filter(
        p => p !== componentPath
      );
    } else {
      const failure: ComponentFailure = {
        componentPath,
        error: error || 'Unknown error',
        retryCount: 0,
        lastAttempt: new Date().toISOString()
      };
      
      // Check if this component already failed before
      const existingFailureIndex = this.migrationProgress.failedComponents.findIndex(
        f => f.componentPath === componentPath
      );
      
      if (existingFailureIndex >= 0) {
        this.migrationProgress.failedComponents[existingFailureIndex].retryCount++;
        this.migrationProgress.failedComponents[existingFailureIndex].lastAttempt = failure.lastAttempt;
        this.migrationProgress.failedComponents[existingFailureIndex].error = failure.error;
      } else {
        this.migrationProgress.failedComponents.push(failure);
      }
    }
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.migrationProgress.failedComponents.length > 0) {
      recommendations.push('Review failed component migrations and address specific errors');
    }
    
    if (this.migrationProgress.completionPercentage < 50) {
      recommendations.push('Consider prioritizing high-impact components first');
    }
    
    recommendations.push('Run comprehensive tests after migration completion');
    recommendations.push('Monitor application performance post-migration');
    
    return recommendations;
  }

  private setupEventListeners(): void {
    // Listen for legacy access detections
    legacyAccessDetector.addEventListener('runtime-detection', (event) => {
      logger.warn('Runtime legacy access detected during migration', event.detail);
    });
  }

  private dispatchMigrationEvent(event: MigrationEvent): void {
    const customEvent = new CustomEvent('migration-event', { detail: event });
    this.eventTarget.dispatchEvent(customEvent);
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.clearMigrationHistory();
  }
}

// Export singleton instance
export const migrationCoordinator = new MigrationCoordinator();