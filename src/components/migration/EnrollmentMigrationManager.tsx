import React, { useState, useEffect } from 'react';
import { useEnrollmentMigration } from '@/hooks/useEnrollmentMigration';
import { EnrollmentMigrationProgress } from './EnrollmentMigrationProgress';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import { legacyAccessMonitor } from '@/utils/legacyAccessMonitor';
// Temporarily disabled to fix loading issues
// import { startupMigrationTrigger } from '@/utils/startupMigrationTrigger';
// import { automaticEnrollmentMigration, MigrationProgress } from '@/utils/automaticEnrollmentMigration';

// Temporary interface to replace MigrationProgress
interface MigrationProgress {
  total: number;
  completed: number;
  failed: number;
  percentage: number;
  currentItem?: string;
  errors: string[];
}

interface EnrollmentMigrationManagerProps {
  children: React.ReactNode;
  autoStart?: boolean;
  showProgress?: boolean;
}

export const EnrollmentMigrationManager: React.FC<EnrollmentMigrationManagerProps> = ({
  children,
  autoStart = true,
  showProgress = true
}) => {
  const [showMigrationUI, setShowMigrationUI] = useState(false);
  const [hasCheckedMigration, setHasCheckedMigration] = useState(false);
  
  const {
    status,
    isMigrationNeeded,
    isCheckingMigration,
    startMigration,
    retryMigration,
    hasErrors,
    getRetryableErrors
  } = useEnrollmentMigration();
  
  const { toast } = useToast();

  // 🚨 SIMPLIFIED: Initialize migration system (temporarily simplified to fix loading issues)
  useEffect(() => {
    if (!hasCheckedMigration) {
      try {
        logger.info('🔍 EnrollmentMigrationManager: Initializing migration system...');
        
        // Initialize legacy access monitoring
        legacyAccessMonitor.logMigrationStatus();
        
        // Mark as checked to prevent infinite loops
        setHasCheckedMigration(true);
        
        logger.info('✅ Migration system initialized successfully');
        
      } catch (error) {
        logger.error('Error initializing migration manager:', error);
        setHasCheckedMigration(true); // Continue anyway
      }
    }
  }, [hasCheckedMigration]);

  // Fallback: Auto-start legacy migration if needed (for backward compatibility)
  useEffect(() => {
    if (hasCheckedMigration && autoStart && isMigrationNeeded && !status.isRunning && !hasErrors() && !isCheckingMigration) {
      // Temporarily simplified - just start migration if needed
      logger.info('🚀 EnrollmentMigrationManager: Starting migration system...');
      handleStartMigration();
    }
  }, [hasCheckedMigration, autoStart, isMigrationNeeded, status.isRunning, hasErrors, isCheckingMigration]);

  // Show migration UI when migration is running or has errors
  useEffect(() => {
    if (status.isRunning || (hasErrors() && isMigrationNeeded)) {
      setShowMigrationUI(true);
    }
  }, [status.isRunning, hasErrors, isMigrationNeeded]);

  // Handle migration completion
  useEffect(() => {
    if (!status.isRunning && hasCheckedMigration) {
      if (status.progress === 100 && !hasErrors()) {
        // Migration completed successfully
        logger.info('✅ EnrollmentMigrationManager: Migration completed successfully');
        toast({
          title: "✅ Migration Complete",
          description: "Your enrollment data has been successfully migrated to the new system.",
          duration: 5000
        });
        
        if (showProgress) {
          // Hide migration UI after a delay
          setTimeout(() => {
            setShowMigrationUI(false);
          }, 3000);
        } else {
          setShowMigrationUI(false);
        }
      } else if (hasErrors()) {
        // Migration completed with errors
        logger.warn('⚠️ EnrollmentMigrationManager: Migration completed with errors');
        
        if (getRetryableErrors()) {
          toast({
            title: "⚠️ Migration Issues",
            description: "Migration completed but some data could not be migrated. You can retry if needed.",
            variant: "destructive",
            duration: 8000
          });
        } else {
          toast({
            title: "❌ Migration Failed",
            description: "There was an error during migration. You can retry or continue without migration.",
            variant: "destructive",
            duration: 8000
          });
        }
      }
    }
  }, [status.isRunning, status.progress, hasErrors, hasCheckedMigration, getRetryableErrors, toast, showProgress]);

  const handleStartMigration = async () => {
    try {
      logger.info('🚀 Starting enrollment migration...');
      setShowMigrationUI(true);
      
      const result = await startMigration();
      
      logger.info('📊 Migration result:', {
        success: result.success,
        migratedCount: result.migratedCount,
        skippedCount: result.skippedCount,
        errorCount: result.errorCount,
        duration: result.duration
      });
      
    } catch (error) {
      logger.error('❌ Migration start failed:', error);
      toast({
        title: "❌ Migration Error",
        description: "Failed to start enrollment migration. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRetryMigration = async () => {
    try {
      logger.info('🔄 Retrying enrollment migration...');
      
      const result = await retryMigration();
      
      logger.info('📊 Migration retry result:', {
        success: result.success,
        migratedCount: result.migratedCount,
        skippedCount: result.skippedCount,
        errorCount: result.errorCount,
        duration: result.duration
      });
      
    } catch (error) {
      logger.error('❌ Migration retry failed:', error);
      toast({
        title: "❌ Retry Failed",
        description: "Failed to retry enrollment migration. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDismissMigration = () => {
    logger.info('👋 Dismissing migration UI');
    setShowMigrationUI(false);
  };

  return (
    <>
      {/* Migration Progress Overlay */}
      {showProgress && showMigrationUI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg">
            <EnrollmentMigrationProgress
              status={status}
              onRetry={getRetryableErrors() ? handleRetryMigration : undefined}
              onDismiss={handleDismissMigration}
            />
          </div>
        </div>
      )}
      
      {/* Main Application Content */}
      {children}
    </>
  );
};
