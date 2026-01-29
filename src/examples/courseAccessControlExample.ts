/**
 * Course Access Control System Example
 * 
 * This example demonstrates how to use the CourseAccessController
 * to manage course content access based on enrollment and payment status.
 * 
 * Requirements: 2.2, 3.4, 6.4
 */

import { courseAccessController } from '@/services/CourseAccessController';
import { EnrollmentStatus, PaymentStatus } from '@/types/ikhokha';
import { logger } from '@/utils/logger';

// Example user and course data
const exampleUserId = 'user-12345';
const exampleCourseId = 'course-67890';
const exampleEnrollmentId = 'enrollment-abcdef';

/**
 * Example 1: Basic Course Access Check
 * 
 * Check if a user has access to a specific course
 */
export async function basicAccessCheck() {
  console.log('=== Basic Course Access Check ===');
  
  try {
    const accessResult = await courseAccessController.canAccessCourse(
      exampleCourseId, 
      exampleUserId
    );
    
    if (accessResult.hasAccess) {
      console.log('✅ User has access to the course');
      console.log(`Enrollment Status: ${accessResult.enrollmentStatus}`);
      console.log(`Payment Status: ${accessResult.paymentStatus}`);
    } else {
      console.log('❌ User does not have access to the course');
      console.log(`Reason: ${accessResult.reason}`);
      console.log(`Enrollment Status: ${accessResult.enrollmentStatus}`);
      console.log(`Payment Status: ${accessResult.paymentStatus}`);
    }
  } catch (error) {
    console.error('Error checking course access:', error);
  }
}

/**
 * Example 2: Grant Course Access After Payment
 * 
 * Automatically grant access when payment is completed and enrollment is approved
 */
export async function grantAccessAfterPayment() {
  console.log('=== Grant Access After Payment ===');
  
  try {
    // This would typically be called after receiving a payment webhook
    const grantResult = await courseAccessController.grantCourseAccess(exampleEnrollmentId);
    
    if (grantResult.success) {
      console.log('✅ Course access granted successfully');
      console.log(`Enrollment ID: ${grantResult.enrollmentId}`);
      
      // Verify access was granted
      const accessCheck = await courseAccessController.canAccessCourse(
        exampleCourseId, 
        exampleUserId
      );
      
      console.log(`Access verified: ${accessCheck.hasAccess}`);
    } else {
      console.log('❌ Failed to grant course access');
      console.log(`Error: ${grantResult.error}`);
    }
  } catch (error) {
    console.error('Error granting course access:', error);
  }
}

/**
 * Example 3: Revoke Access for Rejected Enrollment
 * 
 * Revoke access when enrollment is rejected or payment fails
 */
export async function revokeAccessForRejection() {
  console.log('=== Revoke Access for Rejection ===');
  
  try {
    const revokeResult = await courseAccessController.revokeCourseAccess(
      exampleEnrollmentId,
      'Payment verification failed'
    );
    
    if (revokeResult.success) {
      console.log('✅ Course access revoked successfully');
      console.log(`Enrollment ID: ${revokeResult.enrollmentId}`);
      
      // Verify access was revoked
      const accessCheck = await courseAccessController.canAccessCourse(
        exampleCourseId, 
        exampleUserId
      );
      
      console.log(`Access after revocation: ${accessCheck.hasAccess}`);
      console.log(`Revocation reason: ${accessCheck.reason}`);
    } else {
      console.log('❌ Failed to revoke course access');
      console.log(`Error: ${revokeResult.error}`);
    }
  } catch (error) {
    console.error('Error revoking course access:', error);
  }
}

/**
 * Example 4: Multiple Course Access Check
 * 
 * Check access to multiple courses at once for efficiency
 */
export async function multipleCourseAccessCheck() {
  console.log('=== Multiple Course Access Check ===');
  
  const courseIds = [
    'course-programming-101',
    'course-web-development',
    'course-data-science',
    'course-mobile-apps'
  ];
  
  try {
    const accessResults = await courseAccessController.getUserCourseAccess(
      exampleUserId, 
      courseIds
    );
    
    console.log(`Checked access for ${courseIds.length} courses:`);
    
    Object.entries(accessResults).forEach(([courseId, result]) => {
      const status = result.hasAccess ? '✅ Access Granted' : '❌ No Access';
      console.log(`${courseId}: ${status}`);
      
      if (!result.hasAccess && result.reason) {
        console.log(`  Reason: ${result.reason}`);
      }
      
      if (result.enrollmentStatus) {
        console.log(`  Enrollment: ${result.enrollmentStatus}`);
      }
      
      if (result.paymentStatus) {
        console.log(`  Payment: ${result.paymentStatus}`);
      }
    });
  } catch (error) {
    console.error('Error checking multiple course access:', error);
  }
}

/**
 * Example 5: Bulk Access Management
 * 
 * Grant access to multiple enrollments (useful for admin operations)
 */
export async function bulkAccessManagement() {
  console.log('=== Bulk Access Management ===');
  
  const enrollmentIds = [
    'enrollment-001',
    'enrollment-002',
    'enrollment-003',
    'enrollment-004'
  ];
  
  try {
    const bulkResult = await courseAccessController.bulkGrantAccess(enrollmentIds);
    
    console.log(`Bulk access grant results:`);
    console.log(`✅ Successful: ${bulkResult.success.length} enrollments`);
    console.log(`❌ Failed: ${bulkResult.failed.length} enrollments`);
    
    if (bulkResult.success.length > 0) {
      console.log('Successful enrollments:', bulkResult.success);
    }
    
    if (bulkResult.failed.length > 0) {
      console.log('Failed enrollments:');
      bulkResult.failed.forEach(failure => {
        console.log(`  ${failure.id}: ${failure.error}`);
      });
    }
  } catch (error) {
    console.error('Error in bulk access management:', error);
  }
}

/**
 * Example 6: Enrollment Expiry Check
 * 
 * Check if enrollments have expired and automatically revoke access
 */
export async function enrollmentExpiryCheck() {
  console.log('=== Enrollment Expiry Check ===');
  
  try {
    // Check if enrollment has expired (default 365 days)
    const isExpired = await courseAccessController.checkEnrollmentExpiry(exampleEnrollmentId);
    
    if (isExpired) {
      console.log('⏰ Enrollment has expired - access automatically revoked');
    } else {
      console.log('✅ Enrollment is still valid');
    }
    
    // Check with custom expiry period (180 days)
    const isExpiredCustom = await courseAccessController.checkEnrollmentExpiry(
      exampleEnrollmentId, 
      180
    );
    
    console.log(`Expired with 180-day limit: ${isExpiredCustom}`);
  } catch (error) {
    console.error('Error checking enrollment expiry:', error);
  }
}

/**
 * Example 7: Cache Management
 * 
 * Demonstrate cache usage and management for performance
 */
export async function cacheManagementExample() {
  console.log('=== Cache Management Example ===');
  
  try {
    // First access check (hits database)
    console.log('First access check (database hit):');
    const start1 = Date.now();
    await courseAccessController.canAccessCourse(exampleCourseId, exampleUserId);
    const time1 = Date.now() - start1;
    console.log(`Time: ${time1}ms`);
    
    // Second access check (uses cache)
    console.log('Second access check (cache hit):');
    const start2 = Date.now();
    await courseAccessController.canAccessCourse(exampleCourseId, exampleUserId);
    const time2 = Date.now() - start2;
    console.log(`Time: ${time2}ms`);
    
    // Check cache statistics
    const cacheStats = courseAccessController.getCacheStats();
    console.log(`Cache size: ${cacheStats.size}`);
    console.log(`Cache keys: ${cacheStats.keys.join(', ')}`);
    
    // Clear cache
    courseAccessController.clearAllCache();
    console.log('Cache cleared');
    
    const newCacheStats = courseAccessController.getCacheStats();
    console.log(`New cache size: ${newCacheStats.size}`);
  } catch (error) {
    console.error('Error in cache management example:', error);
  }
}

/**
 * Example 8: Real-world Payment Flow Integration
 * 
 * Demonstrate integration with payment processing workflow
 */
export async function paymentFlowIntegration() {
  console.log('=== Payment Flow Integration ===');
  
  // Simulate different payment scenarios
  const scenarios = [
    {
      name: 'Card Payment - Immediate Access',
      enrollmentId: 'enrollment-card-001',
      paymentType: 'card',
      shouldGrantImmediately: true
    },
    {
      name: 'EFT Payment - Pending Approval',
      enrollmentId: 'enrollment-eft-001',
      paymentType: 'eft',
      shouldGrantImmediately: false
    }
  ];
  
  for (const scenario of scenarios) {
    console.log(`\n--- ${scenario.name} ---`);
    
    try {
      if (scenario.shouldGrantImmediately) {
        // Card payment: grant access immediately
        const grantResult = await courseAccessController.grantCourseAccess(
          scenario.enrollmentId
        );
        
        if (grantResult.success) {
          console.log('✅ Immediate access granted for card payment');
        } else {
          console.log(`❌ Failed to grant access: ${grantResult.error}`);
        }
      } else {
        // EFT payment: check access (should be pending)
        const accessResult = await courseAccessController.canAccessCourse(
          exampleCourseId, 
          exampleUserId
        );
        
        if (!accessResult.hasAccess) {
          console.log('⏳ Access pending admin approval for EFT payment');
          console.log(`Reason: ${accessResult.reason}`);
        }
      }
    } catch (error) {
      console.error(`Error in ${scenario.name}:`, error);
    }
  }
}

/**
 * Example 9: Error Handling and Resilience
 * 
 * Demonstrate proper error handling for various failure scenarios
 */
export async function errorHandlingExample() {
  console.log('=== Error Handling Example ===');
  
  const testCases = [
    {
      name: 'Non-existent User',
      userId: 'non-existent-user',
      courseId: exampleCourseId
    },
    {
      name: 'Non-existent Course',
      userId: exampleUserId,
      courseId: 'non-existent-course'
    },
    {
      name: 'Invalid Enrollment ID',
      enrollmentId: 'invalid-enrollment-id'
    }
  ];
  
  for (const testCase of testCases) {
    console.log(`\n--- ${testCase.name} ---`);
    
    try {
      if (testCase.enrollmentId) {
        // Test enrollment-specific operations
        const grantResult = await courseAccessController.grantCourseAccess(
          testCase.enrollmentId
        );
        
        if (!grantResult.success) {
          console.log(`Expected error: ${grantResult.error}`);
        }
      } else {
        // Test access check operations
        const accessResult = await courseAccessController.canAccessCourse(
          testCase.courseId!, 
          testCase.userId!
        );
        
        if (!accessResult.hasAccess) {
          console.log(`Expected no access: ${accessResult.reason}`);
        }
      }
    } catch (error) {
      console.log(`Handled error gracefully: ${error}`);
    }
  }
}

/**
 * Run all examples
 */
export async function runAllExamples() {
  console.log('🚀 Course Access Control System Examples\n');
  
  try {
    await basicAccessCheck();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await grantAccessAfterPayment();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await revokeAccessForRejection();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await multipleCourseAccessCheck();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await bulkAccessManagement();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await enrollmentExpiryCheck();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await cacheManagementExample();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await paymentFlowIntegration();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await errorHandlingExample();
    
    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('❌ Error running examples:', error);
  }
}

// Export individual examples for selective usage
export {
  basicAccessCheck,
  grantAccessAfterPayment,
  revokeAccessForRejection,
  multipleCourseAccessCheck,
  bulkAccessManagement,
  enrollmentExpiryCheck,
  cacheManagementExample,
  paymentFlowIntegration,
  errorHandlingExample
};