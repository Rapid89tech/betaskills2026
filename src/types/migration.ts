/**
 * Migration Assessment and Tracking Types
 * 
 * These types support the legacy component migration system that identifies
 * and tracks components using direct localStorage access instead of the
 * UnifiedEnrollmentManager.
 */

export interface LegacyComponentReport {
  totalComponents: number;
  legacyComponents: string[];
  migrationPriority: ComponentPriority[];
  estimatedEffort: number;
  scanTimestamp: string;
}

export interface ComponentPriority {
  componentPath: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  dependencies: string[];
  estimatedEffort: number;
  legacyPatterns: LegacyPattern[];
}

export interface LegacyPattern {
  type: 'localStorage.getItem' | 'localStorage.setItem' | 'localStorage.removeItem' | 'direct-access';
  pattern: string;
  lineNumber?: number;
  context: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export interface MigrationResult {
  success: boolean;
  componentPath: string;
  changes: string[];
  warnings: string[];
  errors: string[];
  migrationTimestamp: string;
  beforeSnapshot?: string;
  afterSnapshot?: string;
}

export interface ValidationResult {
  isValid: boolean;
  componentPath: string;
  issues: ValidationIssue[];
  recommendations: string[];
  validationTimestamp: string;
}

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  lineNumber?: number;
  suggestion?: string;
}

export interface MigrationProgress {
  totalComponents: number;
  migratedComponents: number;
  pendingComponents: string[];
  failedComponents: ComponentFailure[];
  completionPercentage: number;
  estimatedTimeRemaining: number;
  startTime: string;
  lastUpdate: string;
}

export interface ComponentFailure {
  componentPath: string;
  error: string;
  retryCount: number;
  lastAttempt: string;
  stackTrace?: string;
}

export interface LegacyAccessReport {
  directLocalStorageAccess: ComponentAccess[];
  legacyHookUsage: ComponentAccess[];
  unmigratedComponents: string[];
  migrationRecommendations: string[];
  scanTimestamp: string;
  runtimeDetections: RuntimeDetection[];
}

export interface ComponentAccess {
  componentPath: string;
  accessType: 'localStorage' | 'hook' | 'service';
  patterns: LegacyPattern[];
  frequency: number;
  lastDetected: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
}

export interface RuntimeDetection {
  timestamp: string;
  componentPath?: string;
  accessKey: string;
  stackTrace: string;
  operation: 'getItem' | 'setItem' | 'removeItem';
  value?: any;
}

export interface MigrationSuggestion {
  type: 'replace-hook' | 'add-import' | 'update-pattern' | 'remove-code';
  description: string;
  fromPattern: string;
  toPattern: string;
  priority: 'high' | 'medium' | 'low';
  automated: boolean;
}

export interface AutoFixResult {
  success: boolean;
  componentPath: string;
  appliedFixes: MigrationSuggestion[];
  remainingIssues: LegacyPattern[];
  backupCreated: boolean;
  backupPath?: string;
}

export interface MigrationReport {
  summary: {
    totalScanned: number;
    totalMigrated: number;
    totalFailed: number;
    completionRate: number;
  };
  components: {
    migrated: string[];
    pending: string[];
    failed: ComponentFailure[];
  };
  performance: {
    scanDuration: number;
    migrationDuration: number;
    averageComponentTime: number;
  };
  recommendations: string[];
  generatedAt: string;
}

export interface TestResult {
  success: boolean;
  componentPath: string;
  testsPassed: number;
  testsFailed: number;
  errors: string[];
  warnings: string[];
  performance: {
    renderTime: number;
    dataAccessTime: number;
  };
}

// Migration configuration types
export interface MigrationConfig {
  scanPaths: string[];
  excludePatterns: string[];
  priorityRules: PriorityRule[];
  autoFixEnabled: boolean;
  backupEnabled: boolean;
  validationEnabled: boolean;
}

export interface PriorityRule {
  pattern: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
}

// Event types for migration tracking
export type MigrationEvent = 
  | { type: 'scan-started'; timestamp: string }
  | { type: 'scan-completed'; report: LegacyComponentReport }
  | { type: 'migration-started'; componentPath: string }
  | { type: 'migration-completed'; result: MigrationResult }
  | { type: 'migration-failed'; componentPath: string; error: string }
  | { type: 'validation-completed'; result: ValidationResult }
  | { type: 'runtime-detection'; detection: RuntimeDetection };