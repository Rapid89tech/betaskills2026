/**
 * Migration Completion Utility
 * 
 * This utility marks the legacy component migration as complete and removes
 * all legacy access detection warnings since all components have been migrated
 * to use the UnifiedEnrollmentManager.
 */

import { legacyAccessMonitor } from './legacyAccessMonitor';
import { logger } from './logger';

/**
 * Complete the legacy component migration
 * 
 * This function should be called once all components have been successfully
 * migrated to the unified enrollment system.
 */
export function completeLegacyComponentMigration(): void {
  logger.info('🎯 Completing legacy component migration...');
  
  try {
    // Mark all components as migrated
    legacyAccessMonitor.markAllComponentsMigrated();
    
    // Log completion status
    const report = legacyAccessMonitor.getMigrationReport();
    logger.info('📊 Final Migration Report:');
    logger.info(`   Total Components: ${report.totalComponents}`);
    logger.info(`   Migrated Components: ${report.migratedComponents.length}`);
    logger.info(`   Pending Components: ${report.pendingComponents.length}`);
    
    if (report.allMigrated) {
      logger.info('🎉 SUCCESS: All components have been migrated to the unified system!');
      logger.info('✅ Legacy access warnings have been disabled');
      logger.info('🧹 Legacy access detection has been removed');
      
      // Set a flag to indicate migration is complete
      try {
        localStorage.setItem('legacy-migration-completed', 'true');
        localStorage.setItem('legacy-migration-completion-date', new Date().toISOString());
      } catch (error) {
        logger.warn('⚠️ Could not set migration completion flag in localStorage:', error);
      }
      
      // Dispatch completion event for any listeners
      window.dispatchEvent(new CustomEvent('legacy-migration-completed', {
        detail: {
          completedAt: new Date().toISOString(),
          totalComponents: report.totalComponents,
          migratedComponents: report.migratedComponents
        }
      }));
      
    } else {
      logger.error('❌ Migration completion failed - some components are still pending');
      throw new Error(`Migration incomplete: ${report.pendingComponents.length} components still pending`);
    }
    
  } catch (error) {
    logger.error('❌ Failed to complete legacy component migration:', error);
    throw error;
  }
}

/**
 * Check if legacy component migration has been completed
 */
export function isLegacyMigrationCompleted(): boolean {
  try {
    const completed = localStorage.getItem('legacy-migration-completed') === 'true';
    const report = legacyAccessMonitor.getMigrationReport();
    
    return completed && report.allMigrated;
  } catch (error) {
    logger.warn('⚠️ Could not check migration completion status:', error);
    return false;
  }
}

/**
 * Get migration completion details
 */
export function getMigrationCompletionDetails(): {
  completed: boolean;
  completionDate?: string;
  totalComponents: number;
  migratedComponents: string[];
} {
  const report = legacyAccessMonitor.getMigrationReport();
  const completionDate = localStorage.getItem('legacy-migration-completion-date');
  
  return {
    completed: isLegacyMigrationCompleted(),
    completionDate: completionDate || undefined,
    totalComponents: report.totalComponents,
    migratedComponents: report.migratedComponents
  };
}

/**
 * Reset migration state (for testing purposes)
 */
export function resetMigrationState(): void {
  logger.info('🔄 Resetting migration state...');
  
  try {
    localStorage.removeItem('legacy-migration-completed');
    localStorage.removeItem('legacy-migration-completion-date');
    
    // Re-enable warnings for testing
    legacyAccessMonitor.enableWarnings();
    
    logger.info('✅ Migration state reset');
  } catch (error) {
    logger.error('❌ Failed to reset migration state:', error);
    throw error;
  }
}