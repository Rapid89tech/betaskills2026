/**
 * Migration System Usage Example
 * 
 * This example demonstrates how to use the migration assessment and tracking utilities
 * to identify and migrate legacy components from direct localStorage access to the
 * UnifiedEnrollmentManager.
 */

import { migrationService } from '@/services/MigrationService';
import { migrationCoordinator } from '@/services/MigrationCoordinator';
import { legacyAccessDetector } from '@/services/LegacyAccessDetector';
import { migrationUtils } from '@/services/MigrationUtils';
import { logger } from '@/utils/logger';

/**
 * Example: Complete Migration Assessment and Execution
 */
export async function runCompleteMigrationExample(): Promise<void> {
    try {
        logger.info('🚀 Starting complete migration example...');

        // 1. Initialize the migration service
        await migrationService.initialize();
        logger.info('✅ Migration service initialized');

        // 2. Perform full assessment
        const assessment = await migrationService.performFullAssessment();
        logger.info(`📊 Assessment completed: ${assessment.componentReport.totalComponents} components found`);

        // 3. Display assessment results
        console.log('📋 Assessment Results:');
        console.log(`- Total components requiring migration: ${assessment.componentReport.totalComponents}`);
        console.log(`- High priority components: ${assessment.componentReport.migrationPriority.filter(p => p.priority === 'high').length}`);
        console.log(`- Estimated effort: ${assessment.componentReport.estimatedEffort} hours`);
        console.log(`- Runtime detections: ${assessment.accessReport.runtimeDetections.length}`);

        // 4. Show recommendations
        console.log('\n💡 Recommendations:');
        assessment.recommendations.forEach((rec, index) => {
            console.log(`${index + 1}. ${rec}`);
        });

        // 5. Get migration status
        const status = migrationService.getMigrationStatus();
        console.log(`\n📈 Migration Status: ${status.progress.completionPercentage.toFixed(1)}% complete`);

        logger.info('✅ Complete migration example finished');
    } catch (error) {
        logger.error('❌ Migration example failed:', error);
        throw error;
    }
}

/**
 * Example: Single Component Migration
 */
export async function runSingleComponentMigrationExample(): Promise<void> {
    try {
        logger.info('🔧 Starting single component migration example...');

        // Initialize service
        await migrationService.initialize();

        // Example component path (this would be a real component in practice)
        const componentPath = 'src/hooks/useEnrollmentData.ts';

        // Migrate single component with full validation and testing
        const result = await migrationService.migrateSingleComponent(componentPath, {
            validate: true,
            test: true,
            backup: true
        });

        console.log(`\n🔧 Migration Result for ${componentPath}:`);
        console.log(`- Success: ${result.migrationResult.success}`);
        console.log(`- Changes made: ${result.migrationResult.changes.length}`);
        console.log(`- Warnings: ${result.migrationResult.warnings.length}`);
        console.log(`- Errors: ${result.migrationResult.errors.length}`);

        if (result.validationResult) {
            console.log(`- Validation: ${result.validationResult.isValid ? 'PASSED' : 'FAILED'}`);
        }

        if (result.testResult) {
            console.log(`- Tests: ${result.testResult.testsPassed}/${result.testResult.testsPassed + result.testResult.testsFailed} passed`);
        }

        logger.info('✅ Single component migration example finished');
    } catch (error) {
        logger.error('❌ Single component migration example failed:', error);
        throw error;
    }
}

/**
 * Example: Runtime Legacy Access Detection
 */
export async function runRuntimeDetectionExample(): Promise<void> {
    try {
        logger.info('👀 Starting runtime detection example...');

        // Start monitoring
        legacyAccessDetector.monitorRuntimeAccess();

        // Simulate some legacy localStorage access (this would happen naturally in the app)
        console.log('🔍 Monitoring localStorage access...');

        // Set up event listener for detections
        legacyAccessDetector.addEventListener('runtime-detection', (event) => {
            const detection = event.detail.detection;
            console.log(`🚨 Legacy access detected: ${detection.operation} on "${detection.accessKey}"`);
        });

        // Simulate legacy access (in real usage, this would be actual component code)
        localStorage.getItem('enrollments'); // This will trigger a detection
        localStorage.setItem('user-enrollments-123', '[]'); // This will also trigger

        // Get detection report
        setTimeout(() => {
            const detections = legacyAccessDetector.getRuntimeDetections();
            console.log(`\n📊 Runtime Detection Summary:`);
            console.log(`- Total detections: ${detections.length}`);

            detections.forEach((detection, index) => {
                console.log(`${index + 1}. ${detection.operation} on "${detection.accessKey}" at ${detection.timestamp}`);
            });

            // Stop monitoring
            legacyAccessDetector.stopMonitoring();
            logger.info('✅ Runtime detection example finished');
        }, 1000);

    } catch (error) {
        logger.error('❌ Runtime detection example failed:', error);
        throw error;
    }
}

/**
 * Example: Code Transformation Utilities
 */
export function runCodeTransformationExample(): void {
    try {
        logger.info('🔄 Starting code transformation example...');

        // Example legacy code
        const legacyCode = `
import React, { useState, useEffect } from 'react';

function EnrollmentComponent() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Legacy localStorage access
    const storedEnrollments = localStorage.getItem("enrollments");
    if (storedEnrollments) {
      setEnrollments(JSON.parse(storedEnrollments));
    }
    setLoading(false);
  }, []);
  
  const handleEnrollment = (courseId) => {
    const newEnrollment = { id: Date.now(), courseId };
    const updated = [...enrollments, newEnrollment];
    setEnrollments(updated);
    localStorage.setItem("enrollments", JSON.stringify(updated));
  };
  
  return <div>Enrollment Component</div>;
}
`;

        console.log('📝 Original Code:');
        console.log(legacyCode);

        // Step 1: Replace localStorage access
        let transformedCode = migrationUtils.replaceLocalStorageAccess(legacyCode);
        console.log('\n🔄 After localStorage replacement:');
        console.log(transformedCode);

        // Step 2: Add necessary imports
        transformedCode = migrationUtils.addDataManagerImport(transformedCode);
        console.log('\n📦 After adding imports:');
        console.log(transformedCode);

        // Step 3: Validate the transformed code
        const validation = migrationUtils.validateMigratedCode(transformedCode);
        console.log('\n✅ Validation Results:');
        console.log(`- Valid: ${validation.isValid}`);
        console.log(`- Issues: ${validation.issues.length}`);
        validation.issues.forEach((issue, index) => {
            console.log(`  ${index + 1}. [${issue.type.toUpperCase()}] ${issue.message}`);
        });

        // Step 4: Generate migration summary
        const summary = migrationUtils.generateMigrationSummary(legacyCode, transformedCode);
        console.log('\n📊 Migration Summary:');
        console.log(`- Lines changed: ${summary.linesChanged}`);
        console.log(`- Patterns replaced: ${summary.patternsReplaced}`);
        console.log(`- Imports added: ${summary.importsAdded}`);
        console.log(`- Complexity reduction: ${summary.complexityReduction}`);

        // Step 5: Extract component metadata
        const metadata = migrationUtils.extractComponentMetadata(legacyCode);
        console.log('\n🔍 Component Metadata:');
        console.log(`- Component name: ${metadata.componentName}`);
        console.log(`- Has state: ${metadata.hasState}`);
        console.log(`- Has effects: ${metadata.hasEffects}`);
        console.log(`- Complexity score: ${metadata.complexityScore}`);
        console.log(`- Dependencies: ${metadata.dependencies.join(', ')}`);

        logger.info('✅ Code transformation example finished');
    } catch (error) {
        logger.error('❌ Code transformation example failed:', error);
        throw error;
    }
}

/**
 * Example: Migration Progress Tracking
 */
export async function runProgressTrackingExample(): Promise<void> {
    try {
        logger.info('📈 Starting progress tracking example...');

        // Initialize and get initial assessment
        await migrationService.initialize();
        const assessment = await migrationService.performFullAssessment();

        // Set up progress monitoring
        migrationService.addEventListener('migration-event', (event) => {
            const migrationEvent = event.detail;

            switch (migrationEvent.type) {
                case 'scan-started':
                    console.log('🔍 Scan started...');
                    break;
                case 'scan-completed':
                    console.log(`📊 Scan completed: ${migrationEvent.report.totalComponents} components found`);
                    break;
                case 'migration-started':
                    console.log(`🔧 Starting migration: ${migrationEvent.componentPath}`);
                    break;
                case 'migration-completed':
                    console.log(`✅ Migration completed: ${migrationEvent.result.componentPath}`);
                    break;
                case 'migration-failed':
                    console.log(`❌ Migration failed: ${migrationEvent.componentPath} - ${migrationEvent.error}`);
                    break;
            }
        });

        // Start automated migration (dry run)
        console.log('\n🚀 Starting automated migration (dry run)...');
        const report = await migrationService.startAutomatedMigration({
            priorityOnly: true,
            dryRun: true,
            maxConcurrent: 2
        });

        console.log('\n📋 Migration Report:');
        console.log(`- Total scanned: ${report.summary.totalScanned}`);
        console.log(`- Total migrated: ${report.summary.totalMigrated}`);
        console.log(`- Total failed: ${report.summary.totalFailed}`);
        console.log(`- Completion rate: ${report.summary.completionRate}%`);

        logger.info('✅ Progress tracking example finished');
    } catch (error) {
        logger.error('❌ Progress tracking example failed:', error);
        throw error;
    }
}

/**
 * Run all migration examples
 */
export async function runAllMigrationExamples(): Promise<void> {
    console.log('🎯 Running all migration examples...\n');

    try {
        await runCompleteMigrationExample();
        console.log('\n' + '='.repeat(50) + '\n');

        await runSingleComponentMigrationExample();
        console.log('\n' + '='.repeat(50) + '\n');

        await runRuntimeDetectionExample();
        console.log('\n' + '='.repeat(50) + '\n');

        runCodeTransformationExample();
        console.log('\n' + '='.repeat(50) + '\n');

        await runProgressTrackingExample();

        console.log('\n🎉 All migration examples completed successfully!');
    } catch (error) {
        console.error('❌ Migration examples failed:', error);
    }
}

// Export individual examples for selective usage
export {
    runCompleteMigrationExample,
    runSingleComponentMigrationExample,
    runRuntimeDetectionExample,
    runCodeTransformationExample,
    runProgressTrackingExample
};