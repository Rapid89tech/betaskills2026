import { logger } from '@/utils/logger';
import { migrationCoordinator } from './MigrationCoordinator';
import { legacyAccessDetector } from './LegacyAccessDetector';
import { migrationUtils } from './MigrationUtils';
import type {
  LegacyComponentReport,
  MigrationProgress,
  MigrationReport,
  LegacyAccessReport
} from '@/types/migration';

/**
 * Migration Service
 * 
 * This is the main service that provides a unified interface for the legacy
 * component migration system. It coordinates between the MigrationCoordinator,
 * LegacyAccessDetector, and MigrationUtils to provide a complete migration solution.
 */
export class MigrationService {
  private isInitialized: boolean = false;
  private eventTarget: EventTarget;

  constructor() {
    this.eventTarget = new EventTarget();
  }

  /**
   * Initialize the migration service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      logger.warn('Migration service is already initialized');
      return;
    }

    try {
      logger.info('Initializing Migration Service...');
      
      // Start runtime monitoring for legacy access
      legacyAccessDetector.monitorRuntimeAccess();
      
      // Set up event forwarding
      this.setupEventForwarding();
      
      this.isInitialized = true;
      logger.info('Migration Service initialized successfully');
      
      // Dispatch initialization event
      this.dispatchEvent('migration-service-initialized', {});
    } catch (error) {
      logger.error('Failed to initialize Migration Service:', error);
      throw error;
    }
  }

  /**
   * Perform a complete assessment of legacy components
   */
  async performFullAssessment(): Promise<{
    componentReport: LegacyComponentReport;
    accessReport: LegacyAccessReport;
    recommendations: string[];
  }> {
    this.ensureInitialized();
    
    logger.info('Starting full migration assessment...');
    
    try {
      // Get component assessment
      const componentReport = await migrationCoordinator.assessLegacyComponents();
      
      // Get access pattern report
      const accessReport = await legacyAccessDetector.scanForLegacyAccess();
      
      // Generate recommendations
      const recommendations = this.generateAssessmentRecommendations(componentReport, accessReport);
      
      logger.info(`Full assessment completed. Found ${componentReport.totalComponents} components requiring migration`);
      
      return {
        componentReport,
        accessReport,
        recommendations
      };
    } catch (error) {
      logger.error('Failed to perform full assessment:', error);
      throw error;
    }
  }

  /**
   * Start automated migration process
   */
  async startAutomatedMigration(options?: {
    priorityOnly?: boolean;
    dryRun?: boolean;
    maxConcurrent?: number;
  }): Promise<MigrationReport> {
    this.ensureInitialized();
    
    const { priorityOnly = false, dryRun = false, maxConcurrent = 3 } = options || {};
    
    logger.info(`Starting automated migration (dryRun: ${dryRun}, priorityOnly: ${priorityOnly})`);
    
    try {
      // Get assessment first
      const assessment = await this.performFullAssessment();
      
      // Determine components to migrate
      let componentsToMigrate = assessment.componentReport.legacyComponents;
      
      if (priorityOnly) {
        componentsToMigrate = assessment.componentReport.migrationPriority
          .filter(p => p.priority === 'high')
          .map(p => p.componentPath);
      }
      
      logger.info(`Migrating ${componentsToMigrate.length} components`);
      
      // Migrate components (with concurrency control)
      const migrationPromises: Promise<any>[] = [];
      const results: any[] = [];
      
      for (let i = 0; i < componentsToMigrate.length; i += maxConcurrent) {
        const batch = componentsToMigrate.slice(i, i + maxConcurrent);
        
        const batchPromises = batch.map(async (componentPath) => {
          if (dryRun) {
            logger.info(`[DRY RUN] Would migrate: ${componentPath}`);
            return { componentPath, success: true, dryRun: true };
          } else {
            return await migrationCoordinator.migrateComponent(componentPath);
          }
        });
        
        const batchResults = await Promise.allSettled(batchPromises);
        results.push(...batchResults.map(r => r.status === 'fulfilled' ? r.value : { success: false, error: r.reason }));
        
        // Small delay between batches to prevent overwhelming the system
        if (i + maxConcurrent < componentsToMigrate.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      // Generate final report
      const report = await migrationCoordinator.generateMigrationReport();
      
      logger.info(`Automated migration completed. Success rate: ${report.summary.completionRate}%`);
      
      return report;
    } catch (error) {
      logger.error('Automated migration failed:', error);
      throw error;
    }
  }

  /**
   * Migrate a single component with full validation
   */
  async migrateSingleComponent(componentPath: string, options?: {
    validate?: boolean;
    test?: boolean;
    backup?: boolean;
  }): Promise<{
    migrationResult: any;
    validationResult?: any;
    testResult?: any;
  }> {
    this.ensureInitialized();
    
    const { validate = true, test = false, backup = true } = options || {};
    
    logger.info(`Migrating single component: ${componentPath}`);
    
    try {
      // Update coordinator config for this migration
      const currentConfig = migrationCoordinator.getConfig();
      migrationCoordinator.updateConfig({
        ...currentConfig,
        backupEnabled: backup,
        validationEnabled: validate
      });
      
      // Perform migration
      const migrationResult = await migrationCoordinator.migrateComponent(componentPath);
      
      const result: any = { migrationResult };
      
      // Perform additional validation if requested
      if (validate && migrationResult.success) {
        result.validationResult = await migrationCoordinator.validateMigration(componentPath);
      }
      
      // Perform integration testing if requested
      if (test && migrationResult.success) {
        result.testResult = await migrationUtils.testComponentIntegration(componentPath);
      }
      
      logger.info(`Single component migration completed: ${migrationResult.success ? 'SUCCESS' : 'FAILED'}`);
      
      return result;
    } catch (error) {
      logger.error(`Single component migration failed for ${componentPath}:`, error);
      throw error;
    }
  }

  /**
   * Get current migration status
   */
  getMigrationStatus(): {
    progress: MigrationProgress;
    runtimeDetections: number;
    isMonitoring: boolean;
    lastAssessment?: string;
  } {
    this.ensureInitialized();
    
    const progress = migrationCoordinator.getMigrationProgress();
    const runtimeDetections = legacyAccessDetector.getRuntimeDetections().length;
    
    return {
      progress,
      runtimeDetections,
      isMonitoring: true, // legacyAccessDetector is always monitoring when initialized
      lastAssessment: progress.lastUpdate
    };
  }

  /**
   * Generate migration recommendations
   */
  async generateRecommendations(): Promise<string[]> {
    this.ensureInitialized();
    
    try {
      const assessment = await this.performFullAssessment();
      return assessment.recommendations;
    } catch (error) {
      logger.error('Failed to generate recommendations:', error);
      return ['Unable to generate recommendations due to assessment failure'];
    }
  }

  /**
   * Clear all migration data and reset
   */
  async resetMigrationState(): Promise<void> {
    this.ensureInitialized();
    
    logger.info('Resetting migration state...');
    
    try {
      // Clear runtime detections
      legacyAccessDetector.clearRuntimeDetections();
      
      // Clear migration history
      migrationCoordinator.clearMigrationHistory();
      
      logger.info('Migration state reset successfully');
      
      // Dispatch reset event
      this.dispatchEvent('migration-state-reset', {});
    } catch (error) {
      logger.error('Failed to reset migration state:', error);
      throw error;
    }
  }

  /**
   * Export migration data for analysis
   */
  async exportMigrationData(): Promise<{
    assessment: any;
    progress: MigrationProgress;
    history: any[];
    runtimeDetections: any[];
    exportTimestamp: string;
  }> {
    this.ensureInitialized();
    
    try {
      const assessment = await this.performFullAssessment();
      const progress = migrationCoordinator.getMigrationProgress();
      const history = migrationCoordinator.getMigrationHistory();
      const runtimeDetections = legacyAccessDetector.getRuntimeDetections();
      
      return {
        assessment,
        progress,
        history,
        runtimeDetections,
        exportTimestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Failed to export migration data:', error);
      throw error;
    }
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
  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error('Migration service is not initialized. Call initialize() first.');
    }
  }

  private generateAssessmentRecommendations(
    componentReport: LegacyComponentReport,
    accessReport: LegacyAccessReport
  ): string[] {
    const recommendations: string[] = [];
    
    // Priority-based recommendations
    const highPriorityComponents = componentReport.migrationPriority.filter(p => p.priority === 'high');
    if (highPriorityComponents.length > 0) {
      recommendations.push(`Start with ${highPriorityComponents.length} high-priority components: ${highPriorityComponents.map(c => c.componentPath).join(', ')}`);
    }
    
    // Runtime detection recommendations
    if (accessReport.runtimeDetections.length > 0) {
      recommendations.push(`Address ${accessReport.runtimeDetections.length} runtime legacy access detections`);
    }
    
    // Effort-based recommendations
    if (componentReport.estimatedEffort > 20) {
      recommendations.push('Consider migrating in phases due to high estimated effort');
    } else {
      recommendations.push('Migration can likely be completed in a single phase');
    }
    
    // Pattern-specific recommendations
    if (accessReport.directLocalStorageAccess.length > 0) {
      recommendations.push('Focus on replacing direct localStorage access patterns first');
    }
    
    if (accessReport.legacyHookUsage.length > 0) {
      recommendations.push('Update legacy hook usage to use useDataManager');
    }
    
    // General recommendations
    recommendations.push('Create backups before starting migration');
    recommendations.push('Test each component after migration');
    recommendations.push('Monitor runtime detections during migration');
    
    return recommendations;
  }

  private setupEventForwarding(): void {
    // Forward events from coordinator
    migrationCoordinator.addEventListener('migration-event', (event) => {
      this.dispatchEvent('migration-event', event.detail);
    });
    
    // Forward events from detector
    legacyAccessDetector.addEventListener('runtime-detection', (event) => {
      this.dispatchEvent('runtime-detection', event.detail);
    });
    
    legacyAccessDetector.addEventListener('legacy-scan-completed', (event) => {
      this.dispatchEvent('legacy-scan-completed', event.detail);
    });
  }

  private dispatchEvent(eventType: string, detail: any): void {
    const event = new CustomEvent(eventType, { detail });
    this.eventTarget.dispatchEvent(event);
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.isInitialized) {
      legacyAccessDetector.stopMonitoring();
      legacyAccessDetector.destroy();
      migrationCoordinator.destroy();
      this.isInitialized = false;
    }
  }
}

// Export singleton instance
export const migrationService = new MigrationService();