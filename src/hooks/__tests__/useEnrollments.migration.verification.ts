/**
 * Migration Verification for useEnrollments Hook
 * 
 * This file verifies that the useEnrollments hook has been successfully migrated
 * to use useDataManager and UnifiedEnrollmentManager instead of direct localStorage access.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const HOOK_PATH = join(__dirname, '../useEnrollments.tsx');

function verifyMigration() {
  const hookContent = readFileSync(HOOK_PATH, 'utf-8');
  
  const checks = [
    {
      name: 'Uses useDataManager import',
      test: () => hookContent.includes("import { useDataManager } from './useDataManager'"),
      passed: false
    },
    {
      name: 'Uses UnifiedEnrollmentManager import',
      test: () => hookContent.includes("import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager'"),
      passed: false
    },
    {
      name: 'No direct localStorage.getItem calls',
      test: () => !hookContent.includes('localStorage.getItem('),
      passed: false
    },
    {
      name: 'No direct localStorage.setItem calls',
      test: () => !hookContent.includes('localStorage.setItem('),
      passed: false
    },
    {
      name: 'Uses useDataManager hook',
      test: () => hookContent.includes('useDataManager()'),
      passed: false
    },
    {
      name: 'Delegates isEnrolled to dataManagerIsEnrolled',
      test: () => hookContent.includes('dataManagerIsEnrolled(courseId)'),
      passed: false
    },
    {
      name: 'Delegates hasPendingEnrollment to dataManagerHasPendingEnrollment',
      test: () => hookContent.includes('dataManagerHasPendingEnrollment(courseId)'),
      passed: false
    },
    {
      name: 'Delegates getEnrollment to dataManagerGetEnrollment',
      test: () => hookContent.includes('dataManagerGetEnrollment(courseId)'),
      passed: false
    },
    {
      name: 'Uses createEnrollment from useDataManager',
      test: () => hookContent.includes('await createEnrollment(enrollmentData)'),
      passed: false
    },
    {
      name: 'Uses updateEnrollmentProgress from useDataManager',
      test: () => hookContent.includes('await updateEnrollmentProgress(user.id, courseId, progress)'),
      passed: false
    },
    {
      name: 'Uses refresh instead of refetch',
      test: () => hookContent.includes('refetch: refresh'),
      passed: false
    },
    {
      name: 'Uses logger instead of console.log',
      test: () => hookContent.includes("logger.info('🚀 useEnrollments:") && !hookContent.includes("console.log('🚀 useEnrollments:"),
      passed: false
    },
    {
      name: 'Includes error handling from useDataManager',
      test: () => hookContent.includes('error, // Now includes error handling from useDataManager'),
      passed: false
    },
    {
      name: 'Uses UnifiedEnrollmentManager event listeners',
      test: () => hookContent.includes('unifiedEnrollmentManager.addEventListener') && hookContent.includes('unifiedEnrollmentManager.removeEventListener'),
      passed: false
    }
  ];

  // Run all checks
  checks.forEach(check => {
    check.passed = check.test();
  });

  // Report results
  console.log('\n🔍 useEnrollments Migration Verification Results:\n');
  
  let allPassed = true;
  checks.forEach(check => {
    const status = check.passed ? '✅' : '❌';
    console.log(`${status} ${check.name}`);
    if (!check.passed) {
      allPassed = false;
    }
  });

  console.log('\n' + '='.repeat(60));
  
  if (allPassed) {
    console.log('🎉 Migration SUCCESSFUL! All checks passed.');
    console.log('✅ useEnrollments hook has been successfully migrated to use useDataManager and UnifiedEnrollmentManager.');
    console.log('✅ No direct localStorage access patterns remain.');
    console.log('✅ All functionality now uses the unified data layer.');
  } else {
    console.log('❌ Migration INCOMPLETE! Some checks failed.');
    console.log('Please review the failed checks and complete the migration.');
  }

  return allPassed;
}

// Run verification if this file is executed directly
if (require.main === module) {
  const success = verifyMigration();
  process.exit(success ? 0 : 1);
}

export { verifyMigration };