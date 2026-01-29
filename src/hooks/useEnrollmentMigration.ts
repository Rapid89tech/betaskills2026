import { useState, useEffect, useCallback } from 'react';
import { enrollmentMigrationManager, MigrationStatus, MigrationResult } from '@/utils/enrollmentMigration';
import { logger } from '@/utils/logger';

export interface UseEnrollmentMigrationResult {
  // Status
  status: MigrationStatus;
  isMigrationNeeded: boolean;
  isCheckingMigration: boolean;
  
  // Actions
  startMigration: () => Promise<MigrationResult>;
  retryMigration: () => Promise<MigrationResult>;
  checkMigrationNeeded: () => Promise<boolean>;
  resetMigration: () => void;
  
  // Utilities
  getMigrationProgress: () => number;
  hasErrors: () => boolean;
  getRetryableErrors: () => boolean;
}

/**
 * Hook for managing enrollment data migration from localStorage to unified system
 * 
 * Provides:
 * - Automatic migration checking on mount
 * - Migration status tracking with real-time updates
 * - Error handling and retry mechanisms
 * - Progress indicators for migration process
 */
export const useEnrollmentMigration = (): UseEnrollmentMigrationResult => {
  const [status, setStatus] = useState<MigrationStatus>(enrollmentMigrationManager.getStatus());
  const [isMigrationNeeded, setIsMigrationNeeded] = useState<boolean>(false);
  const [isCheckingMigration, setIsCheckingMigration] = useState<boolean>(false);

  // Subscribe to migration status updates
  useEffect(() => {
    logger.info('🚀 Setting up enrollment migration status listener');
    
    const unsubscribe = enrollmentMigrationManager.onStatusUpdate((newStatus) => {
      setStatus(newStatus);
      logger.info('📊 Migration status updated:', {
        isRunning: newStatus.isRunning,
        progress: newStatus.progress,
        currentStep: newStatus.currentStep,
        errors: newStatus.errors.length
      });
    });

    return () => {
      logger.info('🧹 Cleaning up enrollment migration status listener');
      unsubscribe();
    };
  }, []);

  // Check if migration is needed on mount
  useEffect(() => {
    try {
      checkMigrationNeeded();
    } catch (error) {
      logger.error('Error checking migration status:', error);
    }
  }, []);

  // Check if migration is needed
  const checkMigrationNeeded = useCallback(async (): Promise<boolean> => {
    setIsCheckingMigration(true);
    
    try {
      logger.info('🔍 Checking if enrollment migration is needed...');
      const needed = await enrollmentMigrationManager.isMigrationNeeded();
      setIsMigrationNeeded(needed);
      
      logger.info(`📋 Migration needed: ${needed}`);
      return needed;
    } catch (error) {
      logger.error('❌ Error checking migration status:', error);
      setIsMigrationNeeded(false);
      return false;
    } finally {
      setIsCheckingMigration(false);
    }
  }, []);

  // Start migration process
  const startMigration = useCallback(async (): Promise<MigrationResult> => {
    logger.info('🚀 Starting enrollment migration via hook...');
    
    try {
      const result = await enrollmentMigrationManager.startMigration();
      
      // Update migration needed status
      setIsMigrationNeeded(!result.success);
      
      logger.info('✅ Migration completed via hook:', {
        success: result.success,
        migratedCount: result.migratedCount,
        skippedCount: result.skippedCount,
        errorCount: result.errorCount,
        duration: result.duration
      });
      
      return result;
    } catch (error) {
      logger.error('❌ Migration failed via hook:', error);
      throw error;
    }
  }, []);

  // Retry failed migration
  const retryMigration = useCallback(async (): Promise<MigrationResult> => {
    logger.info('🔄 Retrying enrollment migration via hook...');
    
    try {
      const result = await enrollmentMigrationManager.retryMigration();
      
      // Update migration needed status
      setIsMigrationNeeded(!result.success);
      
      logger.info('✅ Migration retry completed via hook:', {
        success: result.success,
        migratedCount: result.migratedCount,
        skippedCount: result.skippedCount,
        errorCount: result.errorCount,
        duration: result.duration
      });
      
      return result;
    } catch (error) {
      logger.error('❌ Migration retry failed via hook:', error);
      throw error;
    }
  }, []);

  // Reset migration status
  const resetMigration = useCallback((): void => {
    logger.info('🔄 Resetting migration status via hook...');
    enrollmentMigrationManager.resetMigration();
    setIsMigrationNeeded(true);
  }, []);

  // Get migration progress percentage
  const getMigrationProgress = useCallback((): number => {
    return status.progress;
  }, [status.progress]);

  // Check if migration has errors
  const hasErrors = useCallback((): boolean => {
    return status.errors.length > 0;
  }, [status.errors]);

  // Check if migration has retryable errors
  const getRetryableErrors = useCallback((): boolean => {
    return status.errors.some(error => error.retryable);
  }, [status.errors]);

  return {
    // Status
    status,
    isMigrationNeeded,
    isCheckingMigration,
    
    // Actions
    startMigration,
    retryMigration,
    checkMigrationNeeded,
    resetMigration,
    
    // Utilities
    getMigrationProgress,
    hasErrors,
    getRetryableErrors
  };
};
