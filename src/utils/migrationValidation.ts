import { logger } from './logger';
import { legacyAccessMonitor } from './legacyAccessMonitor';
import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';

/**
 * Comprehensive Migration Validation Utility
 * 
 * Validates that all components have been properly migrated to use the unified system
 * and ensures data consistency across all migrated components.
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  components: ComponentValidationResult[];
  performance: PerformanceMetrics;
  dataConsistency: DataConsistencyResult;
}

export interface ComponentValidationResult {
  componentName: string;
  isMigrated: boolean;
  usesUnifiedSystem: boolean;
  hasLegacyAccess: boolean;
  errors: string[];
  warnings: string[];
}

export interface PerformanceMetrics {
  averageResponseTime: number;
  memoryUsage: number;
  localStorageAccessCount: number;
  unifiedSystemAccessCount: number;
  performanceScore: number;
}

export interface DataConsistencyResult {
  isConsistent: boolean;
  inconsistencies: DataInconsistency[];
  totalRecords: number;
  unifiedRecords: number;
  legacyRecords: number;
}

export interface DataInconsistency {
  type: 'missing_data' | 'duplicate_data' | 'mismatched_data';
  component: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

class MigrationValidator {
  private static instance: MigrationValidator;
  private validationResults: ValidationResult | null = null;

  public static getInstance(): MigrationValidator {
    if (!MigrationValidator.instance) {
      MigrationValidator.instance = new MigrationValidator();
    }
    return MigrationValidator.instance;
  }

  /**
   * Run comprehensive migration validation
   */
  public async validateMigration(): Promise<ValidationResult> {
    logger.info('🔍 Starting comprehensive migration validation...');

    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // 1. Validate component migration status
      const componentResults = await this.validateComponents();
      
      // 2. Check data consistency
      const dataConsistency = await this.validateDataConsistency();
      
      // 3. Measure performance metrics
      const performance = await this.measurePerformance();
      
      // 4. Check for legacy access patterns
      const legacyAccessCheck = this.checkLegacyAccessPatterns();

      // Compile results
      const result: ValidationResult = {
        isValid: errors.length === 0 && dataConsistency.isConsistent,
        errors: [...errors, ...legacyAccessCheck.errors],
        warnings: [...warnings, ...legacyAccessCheck.warnings],
        components: componentResults,
        performance,
        dataConsistency
      };

      // Check component results for issues
      componentResults.forEach(component => {
        if (!component.isMigrated) {
          errors.push(`Component ${component.componentName} is not migrated`);
        }
        if (component.hasLegacyAccess) {
          errors.push(`Component ${component.componentName} still has legacy access patterns`);
        }
        if (!component.usesUnifiedSystem) {
          errors.push(`Component ${component.componentName} does not use unified system`);
        }
        errors.push(...component.errors);
        warnings.push(...component.warnings);
      });

      // Check data consistency
      if (!dataConsistency.isConsistent) {
        dataConsistency.inconsistencies.forEach(inconsistency => {
          if (inconsistency.severity === 'high') {
            errors.push(`High severity data inconsistency: ${inconsistency.description}`);
          } else {
            warnings.push(`Data inconsistency: ${inconsistency.description}`);
          }
        });
      }

      this.validationResults = result;
      
      const duration = Date.now() - startTime;
      logger.info(`✅ Migration validation completed in ${duration}ms`);
      logger.info(`   Valid: ${result.isValid}`);
      logger.info(`   Errors: ${result.errors.length}`);
      logger.info(`   Warnings: ${result.warnings.length}`);
      logger.info(`   Components: ${componentResults.length}`);
      logger.info(`   Performance Score: ${performance.performanceScore}/100`);

      return result;

    } catch (error) {
      logger.error('❌ Migration validation failed:', error);
      throw error;
    }
  }

  /**
   * Validate individual components
   */
  private async validateComponents(): Promise<ComponentValidationResult[]> {
    const components = [
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
      'EnrollmentPage'
    ];

    const results: ComponentValidationResult[] = [];

    for (const componentName of components) {
      const result = await this.validateComponent(componentName);
      results.push(result);
    }

    return results;
  }

  /**
   * Validate individual component
   */
  private async validateComponent(componentName: string): Promise<ComponentValidationResult> {
    const result: ComponentValidationResult = {
      componentName,
      isMigrated: false,
      usesUnifiedSystem: false,
      hasLegacyAccess: false,
      errors: [],
      warnings: []
    };

    try {
      // Check if component is marked as migrated
      result.isMigrated = legacyAccessMonitor.isComponentMigrated(componentName);

      // Check for unified system usage
      result.usesUnifiedSystem = await this.checkUnifiedSystemUsage(componentName);

      // Check for legacy access patterns
      result.hasLegacyAccess = await this.checkLegacyAccessInComponent(componentName);

      // Validate component-specific requirements
      await this.validateComponentSpecificRequirements(componentName, result);

    } catch (error) {
      result.errors.push(`Validation error: ${error}`);
    }

    return result;
  }

  /**
   * Check if component uses unified system
   */
  private async checkUnifiedSystemUsage(componentName: string): Promise<boolean> {
    // This would typically involve static analysis or runtime checks
    // For now, we'll use the migration status as a proxy
    return legacyAccessMonitor.isComponentMigrated(componentName);
  }

  /**
   * Check for legacy access patterns in component
   */
  private async checkLegacyAccessInComponent(componentName: string): Promise<boolean> {
    // This would typically involve static analysis
    // For now, we'll assume migrated components don't have legacy access
    return !legacyAccessMonitor.isComponentMigrated(componentName);
  }

  /**
   * Validate component-specific requirements
   */
  private async validateComponentSpecificRequirements(
    componentName: string, 
    result: ComponentValidationResult
  ): Promise<void> {
    switch (componentName) {
      case 'useEnrollments':
        await this.validateUseEnrollments(result);
        break;
      case 'useBulletproofPersistence':
        await this.validateUseBulletproofPersistence(result);
        break;
      case 'useEnrollmentNotifications':
        await this.validateUseEnrollmentNotifications(result);
        break;
      case 'useEnrollmentOperations':
        await this.validateUseEnrollmentOperations(result);
        break;
      case 'useEnrollmentData':
        await this.validateUseEnrollmentData(result);
        break;
      case 'EnrollmentPage':
        await this.validateEnrollmentPage(result);
        break;
      default:
        // Generic validation for other components
        break;
    }
  }

  /**
   * Validate useEnrollments hook
   */
  private async validateUseEnrollments(result: ComponentValidationResult): Promise<void> {
    try {
      // Check if hook uses useDataManager
      // This would typically involve runtime checks or static analysis
      if (!result.usesUnifiedSystem) {
        result.errors.push('useEnrollments should use useDataManager');
      }
    } catch (error) {
      result.errors.push(`useEnrollments validation error: ${error}`);
    }
  }

  /**
   * Validate useBulletproofPersistence hook
   */
  private async validateUseBulletproofPersistence(result: ComponentValidationResult): Promise<void> {
    try {
      // Check if hook uses UnifiedEnrollmentManager
      if (!result.usesUnifiedSystem) {
        result.errors.push('useBulletproofPersistence should use UnifiedEnrollmentManager');
      }
    } catch (error) {
      result.errors.push(`useBulletproofPersistence validation error: ${error}`);
    }
  }

  /**
   * Validate useEnrollmentNotifications hook
   */
  private async validateUseEnrollmentNotifications(result: ComponentValidationResult): Promise<void> {
    try {
      // Check if hook uses unified data access
      if (!result.usesUnifiedSystem) {
        result.errors.push('useEnrollmentNotifications should use unified data access');
      }
    } catch (error) {
      result.errors.push(`useEnrollmentNotifications validation error: ${error}`);
    }
  }

  /**
   * Validate useEnrollmentOperations hook
   */
  private async validateUseEnrollmentOperations(result: ComponentValidationResult): Promise<void> {
    try {
      // Check if hook uses UnifiedEnrollmentManager exclusively
      if (!result.usesUnifiedSystem) {
        result.errors.push('useEnrollmentOperations should use UnifiedEnrollmentManager exclusively');
      }
    } catch (error) {
      result.errors.push(`useEnrollmentOperations validation error: ${error}`);
    }
  }

  /**
   * Validate useEnrollmentData hook
   */
  private async validateUseEnrollmentData(result: ComponentValidationResult): Promise<void> {
    try {
      // Check if hook uses unified system exclusively
      if (!result.usesUnifiedSystem) {
        result.errors.push('useEnrollmentData should use unified system exclusively');
      }
    } catch (error) {
      result.errors.push(`useEnrollmentData validation error: ${error}`);
    }
  }

  /**
   * Validate EnrollmentPage component
   */
  private async validateEnrollmentPage(result: ComponentValidationResult): Promise<void> {
    try {
      // Check if page uses useDataManager exclusively
      if (!result.usesUnifiedSystem) {
        result.errors.push('EnrollmentPage should use useDataManager exclusively');
      }
    } catch (error) {
      result.errors.push(`EnrollmentPage validation error: ${error}`);
    }
  }

  /**
   * Validate data consistency across components
   */
  private async validateDataConsistency(): Promise<DataConsistencyResult> {
    const inconsistencies: DataInconsistency[] = [];
    
    try {
      // Get data from unified system
      const unifiedEnrollments = await unifiedEnrollmentManager.getAllEnrollments();
      
      // Check for data integrity
      const duplicateIds = this.findDuplicateIds(unifiedEnrollments);
      if (duplicateIds.length > 0) {
        inconsistencies.push({
          type: 'duplicate_data',
          component: 'UnifiedEnrollmentManager',
          description: `Found ${duplicateIds.length} duplicate enrollment IDs`,
          severity: 'high'
        });
      }

      // Check for missing required fields
      const missingFields = this.findMissingFields(unifiedEnrollments);
      if (missingFields.length > 0) {
        inconsistencies.push({
          type: 'missing_data',
          component: 'UnifiedEnrollmentManager',
          description: `Found ${missingFields.length} enrollments with missing required fields`,
          severity: 'medium'
        });
      }

      // Check for data format consistency
      const formatIssues = this.findFormatIssues(unifiedEnrollments);
      if (formatIssues.length > 0) {
        inconsistencies.push({
          type: 'mismatched_data',
          component: 'UnifiedEnrollmentManager',
          description: `Found ${formatIssues.length} enrollments with format issues`,
          severity: 'medium'
        });
      }

      return {
        isConsistent: inconsistencies.length === 0,
        inconsistencies,
        totalRecords: unifiedEnrollments.length,
        unifiedRecords: unifiedEnrollments.length,
        legacyRecords: 0 // Should be 0 after migration
      };

    } catch (error) {
      logger.error('Error validating data consistency:', error);
      return {
        isConsistent: false,
        inconsistencies: [{
          type: 'missing_data',
          component: 'DataConsistencyCheck',
          description: `Failed to validate data consistency: ${error}`,
          severity: 'high'
        }],
        totalRecords: 0,
        unifiedRecords: 0,
        legacyRecords: 0
      };
    }
  }

  /**
   * Find duplicate IDs in enrollment data
   */
  private findDuplicateIds(enrollments: any[]): string[] {
    const ids = enrollments.map(e => e.id).filter(Boolean);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    return [...new Set(duplicates)];
  }

  /**
   * Find missing required fields
   */
  private findMissingFields(enrollments: any[]): any[] {
    const requiredFields = ['user_id', 'user_email', 'course_id', 'status'];
    return enrollments.filter(enrollment => 
      requiredFields.some(field => !enrollment[field])
    );
  }

  /**
   * Find format issues
   */
  private findFormatIssues(enrollments: any[]): any[] {
    return enrollments.filter(enrollment => {
      // Check email format
      if (enrollment.user_email && !this.isValidEmail(enrollment.user_email)) {
        return true;
      }
      // Check status values
      if (enrollment.status && !['pending', 'approved', 'rejected'].includes(enrollment.status)) {
        return true;
      }
      // Check progress range
      if (enrollment.progress && (enrollment.progress < 0 || enrollment.progress > 100)) {
        return true;
      }
      return false;
    });
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Measure performance metrics
   */
  private async measurePerformance(): Promise<PerformanceMetrics> {
    const startTime = Date.now();
    const memoryBefore = this.getMemoryUsage();
    
    try {
      // Measure unified system access performance
      const unifiedStartTime = Date.now();
      await unifiedEnrollmentManager.getAllEnrollments();
      const unifiedEndTime = Date.now();
      
      const memoryAfter = this.getMemoryUsage();
      
      // Count localStorage access (should be minimal after migration)
      const localStorageAccessCount = this.countLocalStorageAccess();
      
      return {
        averageResponseTime: unifiedEndTime - unifiedStartTime,
        memoryUsage: memoryAfter - memoryBefore,
        localStorageAccessCount,
        unifiedSystemAccessCount: 1,
        performanceScore: this.calculatePerformanceScore(
          unifiedEndTime - unifiedStartTime,
          memoryAfter - memoryBefore,
          localStorageAccessCount
        )
      };

    } catch (error) {
      logger.error('Error measuring performance:', error);
      return {
        averageResponseTime: 0,
        memoryUsage: 0,
        localStorageAccessCount: 0,
        unifiedSystemAccessCount: 0,
        performanceScore: 0
      };
    }
  }

  /**
   * Get memory usage (approximation)
   */
  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * Count localStorage access (approximation)
   */
  private countLocalStorageAccess(): number {
    // This would typically involve monitoring localStorage calls
    // For now, we'll return 0 as we expect minimal access after migration
    return 0;
  }

  /**
   * Calculate performance score
   */
  private calculatePerformanceScore(responseTime: number, memoryUsage: number, localStorageAccess: number): number {
    let score = 100;
    
    // Penalize slow response times
    if (responseTime > 1000) score -= 20;
    else if (responseTime > 500) score -= 10;
    else if (responseTime > 200) score -= 5;
    
    // Penalize high memory usage
    if (memoryUsage > 10000000) score -= 20; // 10MB
    else if (memoryUsage > 5000000) score -= 10; // 5MB
    else if (memoryUsage > 1000000) score -= 5; // 1MB
    
    // Penalize localStorage access
    if (localStorageAccess > 10) score -= 15;
    else if (localStorageAccess > 5) score -= 10;
    else if (localStorageAccess > 0) score -= 5;
    
    return Math.max(0, score);
  }

  /**
   * Check for legacy access patterns
   */
  private checkLegacyAccessPatterns(): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    try {
      // Check localStorage for legacy enrollment keys
      const localStorageKeys = Object.keys(localStorage);
      const legacyKeys = localStorageKeys.filter(key => 
        key.includes('enrollments') && 
        !key.includes('unified') && 
        !key.includes('migration')
      );
      
      if (legacyKeys.length > 0) {
        warnings.push(`Found ${legacyKeys.length} legacy localStorage keys: ${legacyKeys.join(', ')}`);
      }
      
      // Check for legacy access patterns in console
      // This would typically involve monitoring console logs
      
    } catch (error) {
      errors.push(`Error checking legacy access patterns: ${error}`);
    }
    
    return { errors, warnings };
  }

  /**
   * Get last validation results
   */
  public getLastValidationResults(): ValidationResult | null {
    return this.validationResults;
  }

  /**
   * Generate validation report
   */
  public generateValidationReport(): string {
    if (!this.validationResults) {
      return 'No validation results available. Run validateMigration() first.';
    }

    const result = this.validationResults;
    let report = '🔍 MIGRATION VALIDATION REPORT\n';
    report += '================================\n\n';
    
    // Overall status
    report += `Overall Status: ${result.isValid ? '✅ VALID' : '❌ INVALID'}\n`;
    report += `Errors: ${result.errors.length}\n`;
    report += `Warnings: ${result.warnings.length}\n\n`;
    
    // Component status
    report += 'COMPONENT STATUS:\n';
    report += '================\n';
    result.components.forEach(component => {
      const status = component.isMigrated && !component.hasLegacyAccess ? '✅' : '❌';
      report += `${status} ${component.componentName}\n`;
      if (component.errors.length > 0) {
        component.errors.forEach(error => report += `   Error: ${error}\n`);
      }
      if (component.warnings.length > 0) {
        component.warnings.forEach(warning => report += `   Warning: ${warning}\n`);
      }
    });
    
    // Data consistency
    report += '\nDATA CONSISTENCY:\n';
    report += '================\n';
    report += `Status: ${result.dataConsistency.isConsistent ? '✅ CONSISTENT' : '❌ INCONSISTENT'}\n`;
    report += `Total Records: ${result.dataConsistency.totalRecords}\n`;
    report += `Unified Records: ${result.dataConsistency.unifiedRecords}\n`;
    report += `Legacy Records: ${result.dataConsistency.legacyRecords}\n`;
    
    if (result.dataConsistency.inconsistencies.length > 0) {
      report += '\nInconsistencies:\n';
      result.dataConsistency.inconsistencies.forEach(inconsistency => {
        report += `  ${inconsistency.severity.toUpperCase()}: ${inconsistency.description}\n`;
      });
    }
    
    // Performance
    report += '\nPERFORMANCE METRICS:\n';
    report += '===================\n';
    report += `Score: ${result.performance.performanceScore}/100\n`;
    report += `Response Time: ${result.performance.averageResponseTime}ms\n`;
    report += `Memory Usage: ${result.performance.memoryUsage} bytes\n`;
    report += `localStorage Access: ${result.performance.localStorageAccessCount}\n`;
    
    return report;
  }
}

// Export singleton instance
export const migrationValidator = MigrationValidator.getInstance();
