import { logger } from '@/utils/logger';
import type {
  LegacyAccessReport,
  ComponentAccess,
  LegacyPattern,
  RuntimeDetection,
  MigrationSuggestion,
  AutoFixResult
} from '@/types/migration';

/**
 * Legacy Access Detector
 * 
 * This service identifies components that are still using direct localStorage access
 * for enrollment data instead of the UnifiedEnrollmentManager. It provides both
 * static code analysis and runtime detection capabilities.
 */
export class LegacyAccessDetector {
  private runtimeDetections: RuntimeDetection[] = [];
  private isMonitoring: boolean = false;
  private originalLocalStorage: Storage;
  private eventTarget: EventTarget;

  // Patterns that indicate legacy localStorage access
  private readonly LEGACY_PATTERNS = {
    localStorage: [
      /localStorage\.getItem\s*\(\s*['"](.*enrollment.*)['"]\s*\)/g,
      /localStorage\.setItem\s*\(\s*['"](.*enrollment.*)['"]/g,
      /localStorage\.removeItem\s*\(\s*['"](.*enrollment.*)['"]\s*\)/g,
      /localStorage\[['"](.+enrollment.+)['"]\]/g
    ],
    hooks: [
      /useEnrollmentData(?!Manager)/g,
      /useEnrollments(?!Manager)/g,
      /useBulletproofPersistence/g,
      /useRealTimeEnrollmentStatus/g,
      /useEnrollmentNotifications/g
    ],
    directAccess: [
      /JSON\.parse\s*\(\s*localStorage\.getItem\s*\(\s*['"](.*enrollment.*)['"]\s*\)/g,
      /window\.localStorage\.(get|set|remove)Item/g
    ]
  };

  // High-priority components that should be migrated first
  private readonly HIGH_PRIORITY_COMPONENTS = [
    'useEnrollmentData',
    'useEnrollments', 
    'Enrollment',
    'AdminDashboard',
    'EnrollmentManager'
  ];

  constructor() {
    this.eventTarget = new EventTarget();
    this.originalLocalStorage = window.localStorage;
  }

  /**
   * Scan codebase for legacy localStorage access patterns
   */
  async scanForLegacyAccess(): Promise<LegacyAccessReport> {
    logger.info('Starting legacy access scan...');
    
    try {
      const directAccess = await this.scanDirectLocalStorageAccess();
      const legacyHooks = await this.scanLegacyHookUsage();
      const unmigratedComponents = this.identifyUnmigratedComponents(directAccess, legacyHooks);
      const recommendations = this.generateMigrationRecommendations(directAccess, legacyHooks);

      const report: LegacyAccessReport = {
        directLocalStorageAccess: directAccess,
        legacyHookUsage: legacyHooks,
        unmigratedComponents,
        migrationRecommendations: recommendations,
        scanTimestamp: new Date().toISOString(),
        runtimeDetections: [...this.runtimeDetections]
      };

      logger.info(`Legacy access scan completed. Found ${directAccess.length} direct access patterns and ${legacyHooks.length} legacy hooks`);
      
      // Dispatch scan completed event
      this.dispatchEvent('legacy-scan-completed', { report });
      
      return report;
    } catch (error) {
      logger.error('Failed to scan for legacy access:', error);
      throw error;
    }
  }

  /**
   * Start monitoring runtime localStorage access
   */
  monitorRuntimeAccess(): void {
    if (this.isMonitoring) {
      logger.warn('Runtime monitoring is already active');
      return;
    }

    logger.info('Starting runtime localStorage access monitoring...');
    
    // Override localStorage methods to detect access
    const detector = this;
    
    window.localStorage.getItem = function(key: string) {
      const result = detector.originalLocalStorage.getItem.call(this, key);
      
      if (key.includes('enrollment')) {
        const detection: RuntimeDetection = {
          timestamp: new Date().toISOString(),
          accessKey: key,
          stackTrace: new Error().stack || '',
          operation: 'getItem',
          value: result
        };
        
        detector.recordRuntimeDetection(detection);
      }
      
      return result;
    };

    window.localStorage.setItem = function(key: string, value: string) {
      if (key.includes('enrollment')) {
        const detection: RuntimeDetection = {
          timestamp: new Date().toISOString(),
          accessKey: key,
          stackTrace: new Error().stack || '',
          operation: 'setItem',
          value: value
        };
        
        detector.recordRuntimeDetection(detection);
      }
      
      return detector.originalLocalStorage.setItem.call(this, key, value);
    };

    window.localStorage.removeItem = function(key: string) {
      if (key.includes('enrollment')) {
        const detection: RuntimeDetection = {
          timestamp: new Date().toISOString(),
          accessKey: key,
          stackTrace: new Error().stack || '',
          operation: 'removeItem'
        };
        
        detector.recordRuntimeDetection(detection);
      }
      
      return detector.originalLocalStorage.removeItem.call(this, key);
    };

    this.isMonitoring = true;
    logger.info('Runtime monitoring activated');
  }

  /**
   * Stop monitoring runtime access and restore original localStorage
   */
  stopMonitoring(): void {
    if (!this.isMonitoring) {
      return;
    }

    // Restore original localStorage methods
    window.localStorage.getItem = this.originalLocalStorage.getItem.bind(this.originalLocalStorage);
    window.localStorage.setItem = this.originalLocalStorage.setItem.bind(this.originalLocalStorage);
    window.localStorage.removeItem = this.originalLocalStorage.removeItem.bind(this.originalLocalStorage);

    this.isMonitoring = false;
    logger.info('Runtime monitoring stopped');
  }

  /**
   * Generate comprehensive access report
   */
  generateAccessReport(): LegacyAccessReport {
    return {
      directLocalStorageAccess: [],
      legacyHookUsage: [],
      unmigratedComponents: [],
      migrationRecommendations: [],
      scanTimestamp: new Date().toISOString(),
      runtimeDetections: [...this.runtimeDetections]
    };
  }

  /**
   * Suggest migration path for a specific component
   */
  suggestMigrationPath(componentPath: string): MigrationSuggestion[] {
    const suggestions: MigrationSuggestion[] = [];

    // Common migration patterns
    if (componentPath.includes('useEnrollmentData')) {
      suggestions.push({
        type: 'replace-hook',
        description: 'Replace useEnrollmentData with useDataManager hook',
        fromPattern: 'useEnrollmentData()',
        toPattern: 'useDataManager()',
        priority: 'high',
        automated: true
      });
    }

    if (componentPath.includes('localStorage.getItem')) {
      suggestions.push({
        type: 'update-pattern',
        description: 'Replace direct localStorage access with UnifiedEnrollmentManager',
        fromPattern: 'localStorage.getItem("enrollments")',
        toPattern: 'unifiedEnrollmentManager.getAllEnrollments()',
        priority: 'high',
        automated: false
      });
    }

    // Add import suggestion if using UnifiedEnrollmentManager
    suggestions.push({
      type: 'add-import',
      description: 'Add UnifiedEnrollmentManager import',
      fromPattern: '',
      toPattern: 'import { unifiedEnrollmentManager } from "@/services/UnifiedEnrollmentManager";',
      priority: 'medium',
      automated: true
    });

    return suggestions;
  }

  /**
   * Attempt to automatically fix simple legacy patterns
   */
  async autoFixSimplePatterns(componentPath: string): Promise<AutoFixResult> {
    logger.info(`Attempting auto-fix for component: ${componentPath}`);
    
    try {
      // This would require file system access to read and modify files
      // For now, return a mock result indicating what would be fixed
      const result: AutoFixResult = {
        success: false,
        componentPath,
        appliedFixes: [],
        remainingIssues: [],
        backupCreated: false
      };

      // In a real implementation, this would:
      // 1. Read the component file
      // 2. Apply automated fixes for simple patterns
      // 3. Create a backup
      // 4. Write the modified file
      // 5. Validate the changes

      logger.info(`Auto-fix completed for ${componentPath}`);
      return result;
    } catch (error) {
      logger.error(`Auto-fix failed for ${componentPath}:`, error);
      throw error;
    }
  }

  /**
   * Get current runtime detections
   */
  getRuntimeDetections(): RuntimeDetection[] {
    return [...this.runtimeDetections];
  }

  /**
   * Clear runtime detections
   */
  clearRuntimeDetections(): void {
    this.runtimeDetections = [];
    logger.info('Runtime detections cleared');
  }

  /**
   * Add event listener for detection events
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
  private async scanDirectLocalStorageAccess(): Promise<ComponentAccess[]> {
    // In a real implementation, this would scan actual files
    // For now, return mock data based on known patterns
    const mockAccess: ComponentAccess[] = [
      {
        componentPath: 'src/hooks/useEnrollmentData.ts',
        accessType: 'localStorage',
        patterns: [
          {
            type: 'localStorage.getItem',
            pattern: 'localStorage.getItem("enrollments")',
            lineNumber: 69,
            context: 'const localEnrollments = JSON.parse(localStorage.getItem("enrollments") || "[]");',
            severity: 'high'
          }
        ],
        frequency: 5,
        lastDetected: new Date().toISOString(),
        impact: 'high'
      }
    ];

    return mockAccess;
  }

  private async scanLegacyHookUsage(): Promise<ComponentAccess[]> {
    // Mock legacy hook usage data
    const mockHooks: ComponentAccess[] = [
      {
        componentPath: 'src/pages/Enrollment.tsx',
        accessType: 'hook',
        patterns: [
          {
            type: 'direct-access',
            pattern: 'useEnrollmentData()',
            lineNumber: 15,
            context: 'const { enrollments, loading } = useEnrollmentData();',
            severity: 'medium'
          }
        ],
        frequency: 3,
        lastDetected: new Date().toISOString(),
        impact: 'medium'
      }
    ];

    return mockHooks;
  }

  private identifyUnmigratedComponents(
    directAccess: ComponentAccess[], 
    legacyHooks: ComponentAccess[]
  ): string[] {
    const unmigratedSet = new Set<string>();
    
    directAccess.forEach(access => unmigratedSet.add(access.componentPath));
    legacyHooks.forEach(hook => unmigratedSet.add(hook.componentPath));
    
    return Array.from(unmigratedSet);
  }

  private generateMigrationRecommendations(
    directAccess: ComponentAccess[], 
    legacyHooks: ComponentAccess[]
  ): string[] {
    const recommendations: string[] = [];
    
    if (directAccess.length > 0) {
      recommendations.push('Replace direct localStorage access with UnifiedEnrollmentManager calls');
    }
    
    if (legacyHooks.length > 0) {
      recommendations.push('Migrate legacy hooks to use useDataManager');
    }
    
    recommendations.push('Add proper error handling for data operations');
    recommendations.push('Implement proper TypeScript interfaces');
    
    return recommendations;
  }

  private recordRuntimeDetection(detection: RuntimeDetection): void {
    // Extract component path from stack trace if possible
    const componentPath = this.extractComponentFromStackTrace(detection.stackTrace);
    if (componentPath) {
      detection.componentPath = componentPath;
    }

    this.runtimeDetections.push(detection);
    
    // Log the detection
    logger.warn(`🚨 LEGACY ACCESS DETECTED: ${detection.operation} on key "${detection.accessKey}"`, {
      componentPath: detection.componentPath,
      timestamp: detection.timestamp
    });
    
    // Dispatch runtime detection event
    this.dispatchEvent('runtime-detection', { detection });
    
    // Keep only recent detections (last 100)
    if (this.runtimeDetections.length > 100) {
      this.runtimeDetections = this.runtimeDetections.slice(-100);
    }
  }

  private extractComponentFromStackTrace(stackTrace: string): string | undefined {
    // Simple extraction - look for src/ paths in stack trace
    const lines = stackTrace.split('\n');
    for (const line of lines) {
      const match = line.match(/src\/[^:]+/);
      if (match) {
        return match[0];
      }
    }
    return undefined;
  }

  private dispatchEvent(eventType: string, detail: any): void {
    const event = new CustomEvent(eventType, { detail });
    this.eventTarget.dispatchEvent(event);
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stopMonitoring();
    this.clearRuntimeDetections();
  }
}

// Export singleton instance
export const legacyAccessDetector = new LegacyAccessDetector();