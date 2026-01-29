/**
 * AdminApprovalWorkflow Service Usage Examples
 * 
 * Demonstrates how to use the AdminApprovalWorkflow service for
 * EFT payment approvals, real-time updates, and audit trail management.
 */

import { adminApprovalWorkflow } from '../services/AdminApprovalWorkflow';

/**
 * Example 1: Initialize and setup admin approval workflow
 */
export async function initializeAdminWorkflow() {
  try {
    // Initialize the workflow service
    await adminApprovalWorkflow.initialize();
    
    console.log('AdminApprovalWorkflow initialized successfully');
    
    // Check health status
    const health = adminApprovalWorkflow.getHealthStatus();
    console.log('Workflow health:', health);
    
  } catch (error) {
    console.error('Failed to initialize admin workflow:', error);
  }
}

/**
 * Example 2: Fetch and display pending enrollments for admin dashboard
 */
export async function displayPendingEnrollments() {
  try {
    // Get all pending enrollments
    const pendingEnrollments = await adminApprovalWorkflow.getPendingEnrollments();
    
    console.log(`Found ${pendingEnrollments.length} pending enrollments:`);
    
    pendingEnrollments.forEach(enrollment => {
      console.log(`
        ID: ${enrollment.id}
        Student: ${enrollment.user_email}
        Course: ${enrollment.course_title}
        Payment Type: ${enrollment.payment_type}
        Amount: ${enrollment.currency} ${enrollment.amount}
        Created: ${new Date(enrollment.created_at).toLocaleString()}
      `);
    });
    
    return pendingEnrollments;
    
  } catch (error) {
    console.error('Error fetching pending enrollments:', error);
    return [];
  }
}

/**
 * Example 3: Get detailed enrollment information for admin review
 */
export async function getEnrollmentDetailsForReview(enrollmentId: string) {
  try {
    const details = await adminApprovalWorkflow.getEnrollmentDetails(enrollmentId);
    
    console.log('Enrollment Details:');
    console.log(`
      Basic Info:
      - ID: ${details.id}
      - Student: ${details.user_email}
      - Course: ${details.course_title}
      - Payment Type: ${details.payment_type}
      - Status: ${details.payment_status}
      - Amount: ${details.currency} ${details.amount}
      
      Student Profile:
      - Name: ${details.user_profile?.full_name || 'Not provided'}
      - Phone: ${details.user_profile?.phone || 'Not provided'}
      
      Course Details:
      - Description: ${details.course_details?.description || 'Not available'}
      - Price: ${details.course_details?.price || 'Not available'}
      - Duration: ${details.course_details?.duration || 'Not available'}
      
      Payment History:
      ${details.payment_history?.map(entry => 
        `- ${entry.timestamp}: ${entry.status} ${entry.notes ? `(${entry.notes})` : ''}`
      ).join('\n      ') || 'No history available'}
    `);
    
    return details;
    
  } catch (error) {
    console.error('Error getting enrollment details:', error);
    return null;
  }
}

/**
 * Example 4: Approve an enrollment with real-time updates
 */
export async function approveEnrollmentExample(enrollmentId: string, adminId: string) {
  try {
    console.log(`Approving enrollment ${enrollmentId}...`);
    
    const result = await adminApprovalWorkflow.approveEnrollment(
      enrollmentId,
      adminId,
      'Approved after manual verification of EFT payment'
    );
    
    if (result.success) {
      console.log(`✅ Enrollment approved successfully!`);
      console.log(`
        Enrollment ID: ${result.enrollmentId}
        Approved by: ${result.approvedBy}
        Timestamp: ${result.timestamp.toLocaleString()}
        Message: ${result.message}
      `);
      
      // The student interface will be updated automatically via real-time sync
      console.log('🔄 Student interface updated in real-time');
      
    } else {
      console.error(`❌ Failed to approve enrollment: ${result.message}`);
    }
    
    return result;
    
  } catch (error) {
    console.error('Error approving enrollment:', error);
    return null;
  }
}

/**
 * Example 5: Reject an enrollment with reason
 */
export async function rejectEnrollmentExample(enrollmentId: string, adminId: string) {
  try {
    const rejectionReason = 'Invalid payment proof provided';
    
    console.log(`Rejecting enrollment ${enrollmentId}...`);
    
    const result = await adminApprovalWorkflow.rejectEnrollment(
      enrollmentId,
      rejectionReason,
      adminId
    );
    
    if (result.success) {
      console.log(`❌ Enrollment rejected successfully!`);
      console.log(`
        Enrollment ID: ${result.enrollmentId}
        Rejected by: ${result.rejectedBy}
        Reason: ${result.reason}
        Timestamp: ${result.timestamp.toLocaleString()}
      `);
      
      // The student will be notified automatically
      console.log('📧 Student notified of rejection');
      
    } else {
      console.error(`❌ Failed to reject enrollment: ${result.reason}`);
    }
    
    return result;
    
  } catch (error) {
    console.error('Error rejecting enrollment:', error);
    return null;
  }
}

/**
 * Example 6: Bulk approve multiple enrollments
 */
export async function bulkApproveEnrollmentsExample(enrollmentIds: string[], adminId: string) {
  try {
    console.log(`Bulk approving ${enrollmentIds.length} enrollments...`);
    
    const result = await adminApprovalWorkflow.bulkApproveEnrollments(enrollmentIds, adminId);
    
    console.log(`📊 Bulk Approval Results:`);
    console.log(`
      Total Processed: ${result.totalProcessed}
      Successful: ${result.successful.length}
      Failed: ${result.failed.length}
      Approved by: ${result.approvedBy}
      Timestamp: ${result.timestamp.toLocaleString()}
    `);
    
    if (result.successful.length > 0) {
      console.log(`✅ Successfully approved: ${result.successful.join(', ')}`);
    }
    
    if (result.failed.length > 0) {
      console.log(`❌ Failed approvals:`);
      result.failed.forEach(failure => {
        console.log(`  - ${failure.enrollmentId}: ${failure.error}`);
      });
    }
    
    return result;
    
  } catch (error) {
    console.error('Error in bulk approval:', error);
    return null;
  }
}

/**
 * Example 7: Setup real-time notifications for new enrollments
 */
export function setupRealTimeNotifications() {
  console.log('Setting up real-time notifications...');
  
  // Subscribe to new enrollment notifications
  const unsubscribeNewEnrollments = adminApprovalWorkflow.subscribeToNewEnrollments((enrollment) => {
    console.log(`🔔 New EFT enrollment received!`);
    console.log(`
      Student: ${enrollment.user_email}
      Course: ${enrollment.course_title}
      Amount: ${enrollment.currency} ${enrollment.amount}
      Time: ${new Date(enrollment.created_at).toLocaleString()}
    `);
    
    // You could trigger desktop notifications, update UI, etc.
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New EFT Enrollment', {
        body: `${enrollment.user_email} enrolled in ${enrollment.course_title}`,
        icon: '/favicon.ico'
      });
    }
  });
  
  // Subscribe to enrollment processing notifications
  const unsubscribeProcessed = adminApprovalWorkflow.subscribeToEnrollmentProcessed((enrollmentId, action) => {
    console.log(`📝 Enrollment ${enrollmentId} was ${action}`);
    
    // Update admin dashboard UI, refresh lists, etc.
  });
  
  console.log('✅ Real-time notifications setup complete');
  
  // Return cleanup function
  return () => {
    unsubscribeNewEnrollments();
    unsubscribeProcessed();
    console.log('🧹 Real-time notifications cleaned up');
  };
}

/**
 * Example 8: View audit trail for an enrollment
 */
export async function viewAuditTrailExample(enrollmentId: string) {
  try {
    console.log(`Fetching audit trail for enrollment ${enrollmentId}...`);
    
    const auditTrail = await adminApprovalWorkflow.getApprovalAuditTrail(enrollmentId);
    
    console.log(`📋 Audit Trail (${auditTrail.length} entries):`);
    
    auditTrail.forEach((entry, index) => {
      console.log(`
        ${index + 1}. ${entry.action.toUpperCase()}
           Performed by: ${entry.performed_by}
           Timestamp: ${new Date(entry.timestamp).toLocaleString()}
           Reason: ${entry.reason || 'No reason provided'}
           Metadata: ${JSON.stringify(entry.metadata, null, 2)}
      `);
    });
    
    return auditTrail;
    
  } catch (error) {
    console.error('Error fetching audit trail:', error);
    return [];
  }
}

/**
 * Example 9: Get workflow statistics for admin dashboard
 */
export async function getWorkflowStatisticsExample() {
  try {
    console.log('Fetching workflow statistics...');
    
    const stats = await adminApprovalWorkflow.getWorkflowStatistics();
    
    console.log(`📊 Workflow Statistics:`);
    console.log(`
      Pending Enrollments: ${stats.pendingCount}
      Approved Today: ${stats.approvedToday}
      Rejected Today: ${stats.rejectedToday}
      Average Approval Time: ${stats.averageApprovalTime} minutes
    `);
    
    return stats;
    
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return null;
  }
}

/**
 * Example 10: Complete admin workflow demonstration
 */
export async function completeAdminWorkflowDemo() {
  console.log('🚀 Starting complete admin workflow demonstration...');
  
  try {
    // 1. Initialize the workflow
    await initializeAdminWorkflow();
    
    // 2. Setup real-time notifications
    const cleanupNotifications = setupRealTimeNotifications();
    
    // 3. Get pending enrollments
    const pendingEnrollments = await displayPendingEnrollments();
    
    if (pendingEnrollments.length > 0) {
      const firstEnrollment = pendingEnrollments[0];
      
      // 4. Get detailed information
      await getEnrollmentDetailsForReview(firstEnrollment.id);
      
      // 5. View audit trail
      await viewAuditTrailExample(firstEnrollment.id);
      
      // 6. Approve the enrollment (in a real scenario, this would be based on admin decision)
      console.log('\n⚠️  In a real scenario, admin would review and decide to approve/reject');
      console.log('For demo purposes, we will simulate approval...\n');
      
      // Uncomment to actually approve:
      // await approveEnrollmentExample(firstEnrollment.id, 'demo-admin-123');
    }
    
    // 7. Get workflow statistics
    await getWorkflowStatisticsExample();
    
    console.log('✅ Admin workflow demonstration completed successfully!');
    
    // Cleanup
    setTimeout(() => {
      cleanupNotifications();
      adminApprovalWorkflow.cleanup();
    }, 5000);
    
  } catch (error) {
    console.error('❌ Error in admin workflow demo:', error);
  }
}

/**
 * Example 11: Error handling and recovery
 */
export async function errorHandlingExample() {
  try {
    // Attempt to approve a non-existent enrollment
    const result = await adminApprovalWorkflow.approveEnrollment(
      'non-existent-enrollment',
      'admin-123'
    );
    
    if (!result.success) {
      console.log('✅ Error handled gracefully:', result.message);
    }
    
    // Attempt to get details for invalid enrollment
    try {
      await adminApprovalWorkflow.getEnrollmentDetails('invalid-id');
    } catch (error) {
      console.log('✅ Exception caught and handled:', error.message);
    }
    
    // Test bulk approval with mixed valid/invalid IDs
    const mixedIds = ['valid-1', 'invalid-2', 'valid-3'];
    const bulkResult = await adminApprovalWorkflow.bulkApproveEnrollments(mixedIds, 'admin-123');
    
    console.log('✅ Bulk operation handled partial failures:', {
      successful: bulkResult.successful.length,
      failed: bulkResult.failed.length
    });
    
  } catch (error) {
    console.error('Error in error handling example:', error);
  }
}

// Export all examples for easy usage
export const adminWorkflowExamples = {
  initializeAdminWorkflow,
  displayPendingEnrollments,
  getEnrollmentDetailsForReview,
  approveEnrollmentExample,
  rejectEnrollmentExample,
  bulkApproveEnrollmentsExample,
  setupRealTimeNotifications,
  viewAuditTrailExample,
  getWorkflowStatisticsExample,
  completeAdminWorkflowDemo,
  errorHandlingExample
};

// Usage in a React component or admin dashboard:
/*
import { adminWorkflowExamples } from './examples/adminApprovalWorkflowExample';

// In your admin dashboard component
useEffect(() => {
  adminWorkflowExamples.initializeAdminWorkflow();
  const cleanup = adminWorkflowExamples.setupRealTimeNotifications();
  
  return cleanup;
}, []);

// For handling approval button clicks
const handleApproval = async (enrollmentId: string) => {
  await adminWorkflowExamples.approveEnrollmentExample(enrollmentId, currentAdminId);
  // Refresh pending enrollments list
  await adminWorkflowExamples.displayPendingEnrollments();
};
*/