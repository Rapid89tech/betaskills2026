/**
 * Startup Migration Trigger
 * 
 * This utility automatically triggers enrollment data migration when the application starts.
 * It provides a non-blocking migration process with progress indicators and error handling.
 */

import { automaticEnrollmentMigration, MigrationProgress } from './automaticEnrollmentMigration';
import { logger } from './logger';

export interface StartupMigrationOptions {
  showProgressIndicator?: boolean;
  blockUI?: boolean;
  retryOnFailure?: boolean;
  maxRetries?: number;
  onProgress?: (progress: MigrationProgress) => void;
  onComplete?: (success: boolean, result: any) => void;
  onError?: (error: Error) => void;
}

class StartupMigrationTrigger {
  private static instance: StartupMigrationTrigger;
  private migrationTriggered = false;
  private progressElement: HTMLElement | null = null;

  public static getInstance(): StartupMigrationTrigger {
    if (!StartupMigrationTrigger.instance) {
      StartupMigrationTrigger.instance = new StartupMigrationTrigger();
    }
    return StartupMigrationTrigger.instance;
  }

  /**
   * Initialize and trigger migration on application startup
   */
  public async initializeStartupMigration(options: StartupMigrationOptions = {}): Promise<void> {
    if (this.migrationTriggered) {
      logger.info('ℹ️ Startup migration already triggered');
      return;
    }

    this.migrationTriggered = true;

    const {
      showProgressIndicator = true,
      blockUI = false,
      retryOnFailure = true,
      maxRetries = 3,
      onProgress,
      onComplete,
      onError
    } = options;

    logger.info('🚀 Initializing startup enrollment migration...');

    try {
      // Check if migration is needed
      if (automaticEnrollmentMigration.isMigrationCompleted()) {
        logger.info('✅ Migration already completed, skipping startup migration');
        onComplete?.(true, { alreadyCompleted: true });
        return;
      }

      // Set up progress tracking
      if (showProgressIndicator) {
        this.createProgressIndicator();
      }

      if (onProgress) {
        automaticEnrollmentMigration.onProgress(onProgress);
      }

      // Set up internal progress handler for UI updates
      automaticEnrollmentMigration.onProgress((progress) => {
        this.updateProgressIndicator(progress);
      });

      // Trigger migration
      const migrationPromise = this.runMigrationWithRetry(maxRetries, retryOnFailure);

      if (blockUI) {
        // Wait for migration to complete before continuing
        const result = await migrationPromise;
        this.handleMigrationComplete(result, onComplete, onError);
      } else {
        // Run migration in background
        migrationPromise
          .then(result => this.handleMigrationComplete(result, onComplete, onError))
          .catch(error => this.handleMigrationError(error, onError));
      }

    } catch (error) {
      logger.error('❌ Failed to initialize startup migration:', error);
      this.handleMigrationError(error as Error, onError);
    }
  }

  /**
   * Run migration with retry logic
   */
  private async runMigrationWithRetry(maxRetries: number, retryOnFailure: boolean): Promise<any> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.info(`🔄 Migration attempt ${attempt}/${maxRetries}`);
        
        const result = await automaticEnrollmentMigration.triggerAutomaticMigration();
        
        if (result.success) {
          logger.info(`✅ Migration successful on attempt ${attempt}`);
          return result;
        } else if (result.failedCount > 0 && retryOnFailure && attempt < maxRetries) {
          logger.warn(`⚠️ Migration partially failed (${result.failedCount} failures), retrying...`);
          lastError = new Error(`Migration failed: ${result.errors.join(', ')}`);
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          continue;
        } else {
          // Don't retry if not configured or max attempts reached
          return result;
        }
      } catch (error) {
        logger.error(`❌ Migration attempt ${attempt} failed:`, error);
        lastError = error as Error;
        
        if (!retryOnFailure || attempt >= maxRetries) {
          throw lastError;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
    
    throw lastError || new Error('Migration failed after all retry attempts');
  }

  /**
   * Handle migration completion
   */
  private handleMigrationComplete(
    result: any, 
    onComplete?: (success: boolean, result: any) => void,
    onError?: (error: Error) => void
  ): void {
    try {
      this.hideProgressIndicator();
      
      if (result.success) {
        logger.info('✅ Startup migration completed successfully');
        
        // Show success notification if there were actual migrations
        if (result.migratedCount > 0) {
          this.showMigrationNotification(
            'Migration Complete',
            `Successfully migrated ${result.migratedCount} enrollment records.`,
            'success'
          );
        }
        
        onComplete?.(true, result);
      } else {
        logger.error('❌ Startup migration completed with errors');
        
        // Show error notification
        this.showMigrationNotification(
          'Migration Issues',
          `Migration completed with ${result.failedCount} failures. Some data may need manual review.`,
          'warning'
        );
        
        onComplete?.(false, result);
      }
    } catch (error) {
      logger.error('❌ Error handling migration completion:', error);
      onError?.(error as Error);
    }
  }

  /**
   * Handle migration error
   */
  private handleMigrationError(error: Error, onError?: (error: Error) => void): void {
    logger.error('❌ Startup migration error:', error);
    
    this.hideProgressIndicator();
    
    // Show error notification
    this.showMigrationNotification(
      'Migration Failed',
      'Failed to migrate enrollment data. The application will continue to work, but some data may be missing.',
      'error'
    );
    
    onError?.(error);
  }

  /**
   * Create progress indicator UI
   */
  private createProgressIndicator(): void {
    if (this.progressElement) return;

    const progressContainer = document.createElement('div');
    progressContainer.id = 'enrollment-migration-progress';
    progressContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      min-width: 300px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
    `;

    progressContainer.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <div style="width: 16px; height: 16px; border: 2px solid #3b82f6; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></div>
        <strong>Migrating Enrollment Data...</strong>
      </div>
      <div id="migration-progress-text" style="color: #64748b; margin-bottom: 8px;">Initializing...</div>
      <div style="background: #f1f5f9; border-radius: 4px; height: 8px; overflow: hidden;">
        <div id="migration-progress-bar" style="background: #3b82f6; height: 100%; width: 0%; transition: width 0.3s ease;"></div>
      </div>
    `;

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(progressContainer);
    this.progressElement = progressContainer;
  }

  /**
   * Update progress indicator
   */
  private updateProgressIndicator(progress: MigrationProgress): void {
    if (!this.progressElement) return;

    const textElement = this.progressElement.querySelector('#migration-progress-text');
    const barElement = this.progressElement.querySelector('#migration-progress-bar') as HTMLElement;

    if (textElement) {
      if (progress.currentItem) {
        textElement.textContent = `Migrating: ${progress.currentItem} (${progress.completed}/${progress.total})`;
      } else {
        textElement.textContent = `Progress: ${progress.completed}/${progress.total} (${progress.percentage}%)`;
      }
    }

    if (barElement) {
      barElement.style.width = `${progress.percentage}%`;
    }
  }

  /**
   * Hide progress indicator
   */
  private hideProgressIndicator(): void {
    if (this.progressElement) {
      // Fade out animation
      this.progressElement.style.transition = 'opacity 0.5s ease';
      this.progressElement.style.opacity = '0';
      
      setTimeout(() => {
        if (this.progressElement && this.progressElement.parentNode) {
          this.progressElement.parentNode.removeChild(this.progressElement);
        }
        this.progressElement = null;
      }, 500);
    }
  }

  /**
   * Show migration notification
   */
  private showMigrationNotification(title: string, message: string, type: 'success' | 'warning' | 'error'): void {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border: 1px solid ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444'};
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      min-width: 300px;
      max-width: 400px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
    `;

    const iconColor = type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444';
    const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : '❌';

    notification.innerHTML = `
      <div style="display: flex; align-items: flex-start;">
        <div style="color: ${iconColor}; margin-right: 8px; font-size: 16px;">${icon}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
          <div style="color: #64748b; line-height: 1.4;">${message}</div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 18px; padding: 0; margin-left: 8px;">×</button>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transition = 'opacity 0.5s ease';
        notification.style.opacity = '0';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 500);
      }
    }, 5000);
  }

  /**
   * Check if migration is needed
   */
  public isMigrationNeeded(): boolean {
    return !automaticEnrollmentMigration.isMigrationCompleted();
  }

  /**
   * Get migration status
   */
  public getMigrationStatus() {
    return automaticEnrollmentMigration.getMigrationStatus();
  }

  /**
   * Manually trigger migration (for testing or manual retry)
   */
  public async manuallyTriggerMigration(options: StartupMigrationOptions = {}): Promise<void> {
    this.migrationTriggered = false; // Reset flag to allow manual trigger
    return this.initializeStartupMigration({ ...options, blockUI: true });
  }
}

// Export singleton instance
export const startupMigrationTrigger = StartupMigrationTrigger.getInstance();

// Export types
export type { StartupMigrationOptions };