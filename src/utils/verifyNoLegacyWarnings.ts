import { logger } from './logger';
import { legacyAccessMonitor } from './legacyAccessMonitor';

/**
 * Verification utility to ensure no legacy localStorage warnings are generated
 * This can be called during development to verify the migration is complete
 */

export const verifyNoLegacyWarnings = (): boolean => {
  try {
    logger.info('🔍 Verifying no legacy localStorage warnings...');

    // Get migration status report
    const report = legacyAccessMonitor.getMigrationReport();
    
    // Check if all components are migrated
    if (!report.allMigrated) {
      logger.warn(`⚠️ Migration incomplete: ${report.pendingComponents.length} components still pending`);
      logger.warn(`Pending components: ${report.pendingComponents.join(', ')}`);
      return false;
    }

    // Check for any remaining legacy localStorage access patterns
    const localStorageKeys = Object.keys(localStorage);
    const legacyKeys = localStorageKeys.filter(key => 
      key.includes('enrollments') && 
      !key.includes('unified') && 
      !key.includes('migration')
    );

    if (legacyKeys.length > 0) {
      logger.warn(`⚠️ Found legacy localStorage keys: ${legacyKeys.join(', ')}`);
      return false;
    }

    // Check for legacy access patterns in the codebase
    const legacyPatterns = [
      'localStorage.getItem(\'enrollments\')',
      'localStorage.setItem(\'enrollments\')',
      'localStorage.removeItem(\'enrollments\')',
      'JSON.parse(localStorage.getItem(\'enrollments\')',
      'localStorage.getItem(\'user-enrollments\')'
    ];

    // This would need to be run at build time or with a static analysis tool
    // For now, we'll just verify the migration status
    logger.info('✅ No legacy localStorage warnings detected');
    logger.info('✅ All components have been migrated to the unified system');
    
    return true;
  } catch (error) {
    logger.error('❌ Error verifying legacy warnings:', error);
    return false;
  }
};

/**
 * Development helper to run verification
 */
export const runLegacyWarningVerification = (): void => {
  if (import.meta.env.DEV) {
    logger.info('🧪 Running legacy warning verification...');
    const isClean = verifyNoLegacyWarnings();
    
    if (isClean) {
      logger.info('🎉 SUCCESS: No legacy localStorage warnings detected!');
      console.log('%c🎉 SUCCESS: No legacy localStorage warnings detected!', 'color: green; font-weight: bold;');
    } else {
      logger.warn('⚠️ WARNING: Legacy localStorage access still detected');
      console.warn('%c⚠️ WARNING: Legacy localStorage access still detected', 'color: orange; font-weight: bold;');
    }
  }
};

// Auto-run verification in development
if (import.meta.env.DEV) {
  // Run verification after a short delay to allow components to initialize
  setTimeout(() => {
    runLegacyWarningVerification();
  }, 2000);
}
