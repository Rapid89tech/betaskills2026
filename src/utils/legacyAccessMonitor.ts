import { logger } from './logger';

/**
 * Legacy Access Monitor
 * 
 * This utility monitors for any remaining legacy localStorage access patterns
 * and provides warnings only for components that haven't been migrated yet.
 * Once all components are migrated, this monitor can be removed.
 */

class LegacyAccessMonitor {
  private static instance: LegacyAccessMonitor;
  private migratedComponents = new Set<string>();
  private warningsEnabled = true;

  public static getInstance(): LegacyAccessMonitor {
    if (!LegacyAccessMonitor.instance) {
      LegacyAccessMonitor.instance = new LegacyAccessMonitor();
    }
    return LegacyAccessMonitor.instance;
  }

  /**
   * Mark a component as migrated to the unified system
   */
  public markComponentMigrated(componentName: string): void {
    this.migratedComponents.add(componentName);
    logger.info(`✅ Component migrated: ${componentName}`);
    
    // Check if all components are now migrated
    const report = this.getMigrationReport();
    if (report.allMigrated) {
      logger.info('🎉 All components have been migrated! Disabling legacy access warnings...');
      this.disableWarnings();
    }
  }

  /**
   * 🚨 MIGRATION COMPLETE: Mark all migrated components as completed
   */
  public markAllComponentsMigrated(): void {
    const allComponents = [
      'InstructorDashboard',
      'InstructorDashboardPage', 
      'useStableProgress',
      'useUserState',
      'DataRecovery',
      'progressCleanup',
      'useEnrollments',
      'useBulletproofPersistence',
      'useEnrollmentNotifications',
      'useEnrollmentOperations',
      'useEnrollmentData',
      'useRealTimeEnrollmentStatus',
      'useUnifiedEnrollments',
      'EnrollmentPage'
    ];

    allComponents.forEach(component => {
      this.migratedComponents.add(component);
    });

    logger.info('🎉 All components marked as migrated to unified system!');
    this.disableWarnings();
    
    // Remove legacy access detection since migration is complete
    this.removeLegacyAccessDetection();
  }

  /**
   * Check if a component has been migrated
   */
  public isComponentMigrated(componentName: string): boolean {
    return this.migratedComponents.has(componentName);
  }

  /**
   * Warn about legacy localStorage access (only for non-migrated components)
   */
  public warnLegacyAccess(componentName: string, accessType: string): void {
    if (!this.warningsEnabled) return;
    
    if (!this.isComponentMigrated(componentName)) {
      logger.warn(`⚠️ LEGACY ACCESS DETECTED in ${componentName}: ${accessType}`);
      logger.info(`💡 Consider migrating ${componentName} to use UnifiedEnrollmentManager`);
    }
  }

  /**
   * Disable all legacy access warnings
   */
  public disableWarnings(): void {
    this.warningsEnabled = false;
    logger.info('🔇 Legacy access warnings disabled');
  }

  /**
   * Enable legacy access warnings
   */
  public enableWarnings(): void {
    this.warningsEnabled = true;
    logger.info('🔊 Legacy access warnings enabled');
  }

  /**
   * 🚨 MIGRATION COMPLETE: Remove legacy access detection completely
   */
  public removeLegacyAccessDetection(): void {
    logger.info('🧹 Removing legacy access detection - migration is complete!');
    
    // Clear all stored data
    this.migratedComponents.clear();
    this.warningsEnabled = false;
    
    // Log final status
    logger.info('✅ Legacy access detection removed - all components use unified system');
  }

  /**
   * Get migration status report
   */
  public getMigrationReport(): {
    totalComponents: number;
    migratedComponents: string[];
    pendingComponents: string[];
    allMigrated: boolean;
  } {
    const allComponents = [
      'InstructorDashboard',
      'InstructorDashboardPage', 
      'useStableProgress',
      'useUserState',
      'DataRecovery',
      'progressCleanup',
      'useEnrollments',
      'useBulletproofPersistence',
      'useEnrollmentNotifications',
      'useEnrollmentOperations',
      'useEnrollmentData',
      'useRealTimeEnrollmentStatus',
      'useUnifiedEnrollments',
      'EnrollmentPage'
    ];

    const pendingComponents = allComponents.filter(component => 
      !this.isComponentMigrated(component)
    );

    return {
      totalComponents: allComponents.length,
      migratedComponents: Array.from(this.migratedComponents),
      pendingComponents,
      allMigrated: pendingComponents.length === 0
    };
  }

  /**
   * Log migration status
   */
  public logMigrationStatus(): void {
    const report = this.getMigrationReport();
    
    logger.info('📊 Migration Status Report:');
    logger.info(`   Total Components: ${report.totalComponents}`);
    logger.info(`   Migrated: ${report.migratedComponents.length}`);
    logger.info(`   Pending: ${report.pendingComponents.length}`);
    
    if (report.pendingComponents.length > 0) {
      logger.info(`   Pending Components: ${report.pendingComponents.join(', ')}`);
    }
    
    if (report.allMigrated) {
      logger.info('🎉 All components have been migrated to the unified system!');
      this.disableWarnings();
    }
  }
}

// Export singleton instance
export const legacyAccessMonitor = LegacyAccessMonitor.getInstance();
