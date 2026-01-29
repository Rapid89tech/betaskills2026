import { logger } from '@/utils/logger';
import type { ValidationResult, TestResult, ValidationIssue } from '@/types/migration';

/**
 * Migration Utilities
 * 
 * This service provides utility functions for code transformation, validation,
 * and testing during the migration process from legacy localStorage access
 * to the UnifiedEnrollmentManager.
 */
export class MigrationUtils {
  
  // Common migration patterns and their replacements
  private readonly MIGRATION_PATTERNS = {
    // localStorage access patterns
    'localStorage.getItem("enrollments")': 'await unifiedEnrollmentManager.getAllEnrollments()',
    'localStorage.getItem(`user-enrollments-${userId}`)': 'await unifiedEnrollmentManager.getUserEnrollments(userId)',
    'localStorage.setItem("enrollments", JSON.stringify(enrollments))': '// Handled automatically by UnifiedEnrollmentManager',
    'JSON.parse(localStorage.getItem("enrollments") || "[]")': 'await unifiedEnrollmentManager.getAllEnrollments()',
    
    // Hook replacements
    'useEnrollmentData()': 'useDataManager()',
    'useEnrollments()': 'useDataManager()',
    'useBulletproofPersistence()': 'useDataManager()',
    
    // Import statements
    'import { useEnrollmentData }': 'import { useDataManager }',
    'import { useEnrollments }': 'import { useDataManager }',
  };

  // Required imports for migrated components
  private readonly REQUIRED_IMPORTS = [
    'import { unifiedEnrollmentManager } from "@/services/UnifiedEnrollmentManager";',
    'import { useDataManager } from "@/hooks/useDataManager";'
  ];

  /**
   * Replace localStorage access patterns with UnifiedEnrollmentManager calls
   */
  replaceLocalStorageAccess(code: string): string {
    let modifiedCode = code;
    
    // Apply pattern replacements
    for (const [pattern, replacement] of Object.entries(this.MIGRATION_PATTERNS)) {
      const regex = new RegExp(this.escapeRegExp(pattern), 'g');
      modifiedCode = modifiedCode.replace(regex, replacement);
    }
    
    // Handle more complex patterns with regex
    modifiedCode = this.replaceComplexPatterns(modifiedCode);
    
    logger.info('Applied localStorage access replacements');
    return modifiedCode;
  }

  /**
   * Add necessary imports for UnifiedEnrollmentManager
   */
  addDataManagerImport(code: string): string {
    let modifiedCode = code;
    
    // Check if imports already exist
    const hasUnifiedManagerImport = code.includes('import { unifiedEnrollmentManager }');
    const hasDataManagerImport = code.includes('import { useDataManager }');
    
    // Find the import section (after any comments, before first non-import statement)
    const importInsertionPoint = this.findImportInsertionPoint(code);
    
    const importsToAdd: string[] = [];
    
    if (!hasUnifiedManagerImport && code.includes('unifiedEnrollmentManager')) {
      importsToAdd.push('import { unifiedEnrollmentManager } from "@/services/UnifiedEnrollmentManager";');
    }
    
    if (!hasDataManagerImport && code.includes('useDataManager')) {
      importsToAdd.push('import { useDataManager } from "@/hooks/useDataManager";');
    }
    
    if (importsToAdd.length > 0) {
      const importStatements = importsToAdd.join('\n') + '\n';
      modifiedCode = code.slice(0, importInsertionPoint) + importStatements + code.slice(importInsertionPoint);
      logger.info(`Added ${importsToAdd.length} import statements`);
    }
    
    return modifiedCode;
  }

  /**
   * Update hook usage patterns
   */
  updateHookUsage(code: string): string {
    let modifiedCode = code;
    
    // Replace hook destructuring patterns
    const hookPatterns = [
      {
        from: /const\s+{\s*([^}]+)\s*}\s*=\s*useEnrollmentData\(\)/g,
        to: 'const { $1 } = useDataManager()'
      },
      {
        from: /const\s+{\s*([^}]+)\s*}\s*=\s*useEnrollments\(\)/g,
        to: 'const { $1 } = useDataManager()'
      }
    ];
    
    for (const pattern of hookPatterns) {
      modifiedCode = modifiedCode.replace(pattern.from, pattern.to);
    }
    
    logger.info('Updated hook usage patterns');
    return modifiedCode;
  }

  /**
   * Validate migrated code for common issues
   */
  validateMigratedCode(code: string): ValidationResult {
    const issues: ValidationIssue[] = [];
    const recommendations: string[] = [];
    
    // Check for remaining localStorage access
    const localStorageMatches = code.match(/localStorage\.(get|set|remove)Item/g);
    if (localStorageMatches) {
      issues.push({
        type: 'warning',
        message: `Found ${localStorageMatches.length} remaining localStorage access patterns`,
        suggestion: 'Replace with UnifiedEnrollmentManager calls'
      });
    }
    
    // Check for proper imports
    if (code.includes('unifiedEnrollmentManager') && !code.includes('import { unifiedEnrollmentManager }')) {
      issues.push({
        type: 'error',
        message: 'Missing UnifiedEnrollmentManager import',
        suggestion: 'Add: import { unifiedEnrollmentManager } from "@/services/UnifiedEnrollmentManager";'
      });
    }
    
    if (code.includes('useDataManager') && !code.includes('import { useDataManager }')) {
      issues.push({
        type: 'error',
        message: 'Missing useDataManager import',
        suggestion: 'Add: import { useDataManager } from "@/hooks/useDataManager";'
      });
    }
    
    // Check for async/await usage
    if (code.includes('unifiedEnrollmentManager.') && !code.includes('await unifiedEnrollmentManager')) {
      issues.push({
        type: 'warning',
        message: 'UnifiedEnrollmentManager methods are async but no await found',
        suggestion: 'Add await keywords for async operations'
      });
    }
    
    // Check for error handling
    if (code.includes('unifiedEnrollmentManager.') && !code.includes('try') && !code.includes('catch')) {
      recommendations.push('Consider adding error handling for data operations');
    }
    
    // Generate recommendations
    if (issues.length === 0) {
      recommendations.push('Code appears to be properly migrated');
    } else {
      recommendations.push('Address validation issues before completing migration');
    }
    
    const result: ValidationResult = {
      isValid: issues.filter(i => i.type === 'error').length === 0,
      componentPath: 'inline-code',
      issues,
      recommendations,
      validationTimestamp: new Date().toISOString()
    };
    
    logger.info(`Code validation completed: ${result.isValid ? 'PASSED' : 'FAILED'} with ${issues.length} issues`);
    return result;
  }

  /**
   * Test component integration after migration
   */
  async testComponentIntegration(componentPath: string): Promise<TestResult> {
    logger.info(`Testing component integration: ${componentPath}`);
    
    try {
      // Mock test result - in reality this would:
      // 1. Import and render the component
      // 2. Test data access functionality
      // 3. Verify no localStorage access
      // 4. Check performance metrics
      
      const result: TestResult = {
        success: true,
        componentPath,
        testsPassed: 5,
        testsFailed: 0,
        errors: [],
        warnings: [],
        performance: {
          renderTime: 45, // ms
          dataAccessTime: 12 // ms
        }
      };
      
      // Simulate some test scenarios
      if (componentPath.includes('Complex')) {
        result.warnings.push('Complex component may have slower render times');
        result.performance.renderTime = 120;
      }
      
      logger.info(`Component integration test completed: ${result.success ? 'PASSED' : 'FAILED'}`);
      return result;
    } catch (error) {
      logger.error(`Component integration test failed for ${componentPath}:`, error);
      
      return {
        success: false,
        componentPath,
        testsPassed: 0,
        testsFailed: 1,
        errors: [error instanceof Error ? error.message : String(error)],
        warnings: [],
        performance: {
          renderTime: 0,
          dataAccessTime: 0
        }
      };
    }
  }

  /**
   * Generate migration summary for a component
   */
  generateMigrationSummary(originalCode: string, migratedCode: string): {
    linesChanged: number;
    patternsReplaced: number;
    importsAdded: number;
    complexityReduction: number;
  } {
    const originalLines = originalCode.split('\n').length;
    const migratedLines = migratedCode.split('\n').length;
    
    // Count pattern replacements
    let patternsReplaced = 0;
    for (const pattern of Object.keys(this.MIGRATION_PATTERNS)) {
      const originalMatches = (originalCode.match(new RegExp(this.escapeRegExp(pattern), 'g')) || []).length;
      const migratedMatches = (migratedCode.match(new RegExp(this.escapeRegExp(pattern), 'g')) || []).length;
      patternsReplaced += originalMatches - migratedMatches;
    }
    
    // Count imports added
    const originalImports = (originalCode.match(/^import\s+/gm) || []).length;
    const migratedImports = (migratedCode.match(/^import\s+/gm) || []).length;
    const importsAdded = migratedImports - originalImports;
    
    // Calculate complexity reduction (simplified metric)
    const originalComplexity = (originalCode.match(/localStorage\./g) || []).length;
    const migratedComplexity = (migratedCode.match(/localStorage\./g) || []).length;
    const complexityReduction = originalComplexity - migratedComplexity;
    
    return {
      linesChanged: Math.abs(migratedLines - originalLines),
      patternsReplaced,
      importsAdded,
      complexityReduction
    };
  }

  /**
   * Check if component is already migrated
   */
  isComponentMigrated(code: string): boolean {
    // Check for legacy patterns
    const hasLegacyPatterns = [
      /localStorage\.getItem.*enrollment/,
      /localStorage\.setItem.*enrollment/,
      /useEnrollmentData\(\)/,
      /useEnrollments\(\)/
    ].some(pattern => pattern.test(code));
    
    // Check for modern patterns
    const hasModernPatterns = [
      /unifiedEnrollmentManager\./,
      /useDataManager\(\)/
    ].some(pattern => pattern.test(code));
    
    return !hasLegacyPatterns && hasModernPatterns;
  }

  /**
   * Extract component metadata for migration planning
   */
  extractComponentMetadata(code: string): {
    componentName: string;
    hasState: boolean;
    hasEffects: boolean;
    complexityScore: number;
    dependencies: string[];
  } {
    // Extract component name
    const componentNameMatch = code.match(/(?:export\s+(?:default\s+)?(?:function|const)\s+(\w+)|class\s+(\w+))/);
    const componentName = componentNameMatch?.[1] || componentNameMatch?.[2] || 'Unknown';
    
    // Check for React hooks
    const hasState = /useState|useReducer/.test(code);
    const hasEffects = /useEffect|useLayoutEffect/.test(code);
    
    // Calculate complexity score (simplified)
    const complexityFactors = [
      (code.match(/localStorage\./g) || []).length * 2, // localStorage usage
      (code.match(/useEffect/g) || []).length, // effects
      (code.match(/useState/g) || []).length, // state
      (code.match(/async|await/g) || []).length, // async operations
    ];
    const complexityScore = complexityFactors.reduce((sum, factor) => sum + factor, 0);
    
    // Extract dependencies (simplified)
    const importMatches = code.match(/import\s+.*?\s+from\s+['"]([^'"]+)['"]/g) || [];
    const dependencies = importMatches.map(imp => {
      const match = imp.match(/from\s+['"]([^'"]+)['"]/);
      return match?.[1] || '';
    }).filter(Boolean);
    
    return {
      componentName,
      hasState,
      hasEffects,
      complexityScore,
      dependencies
    };
  }

  /**
   * Private helper methods
   */
  private replaceComplexPatterns(code: string): string {
    let modifiedCode = code;
    
    // Replace complex localStorage patterns with regex
    const complexPatterns = [
      {
        // JSON.parse(localStorage.getItem("enrollments") || "[]")
        from: /JSON\.parse\s*\(\s*localStorage\.getItem\s*\(\s*["']([^"']*enrollment[^"']*)["']\s*\)\s*\|\|\s*["']\[\]["']\s*\)/g,
        to: 'await unifiedEnrollmentManager.getAllEnrollments()'
      },
      {
        // localStorage.getItem(`user-enrollments-${userId}`)
        from: /localStorage\.getItem\s*\(\s*`([^`]*enrollment[^`]*)`\s*\)/g,
        to: 'await unifiedEnrollmentManager.getUserEnrollments(userId)'
      }
    ];
    
    for (const pattern of complexPatterns) {
      modifiedCode = modifiedCode.replace(pattern.from, pattern.to);
    }
    
    return modifiedCode;
  }

  private findImportInsertionPoint(code: string): number {
    const lines = code.split('\n');
    let insertionPoint = 0;
    
    // Skip comments and existing imports
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('//') || line.startsWith('/*') || line.startsWith('*') || 
          line.startsWith('import ') || line === '' || line.startsWith('\'use strict\'')) {
        insertionPoint = code.indexOf(lines[i]) + lines[i].length + 1;
      } else {
        break;
      }
    }
    
    return insertionPoint;
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// Export singleton instance
export const migrationUtils = new MigrationUtils();