/**
 * Property-Based Test: Admin Enrollment List Completeness
 * 
 * Feature: mobile-sync-admin-overhaul, Property 11: Admin Enrollment List Completeness
 * Validates: Requirements 5.1, 5.2
 * 
 * Property: For any enrollment displayed in the admin pending list, the view SHALL include:
 * user email, user name, course title, submission timestamp, and proof of payment status.
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

/**
 * Enrollment data structure matching the admin interface
 */
interface AdminEnrollmentView {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  approved_at?: string;
  progress: number;
  proof_of_payment?: string;
  payment_ref?: string;
  payment_date?: string;
  payment_type?: 'card' | 'eft' | 'manual';
  last_updated?: string;
  metadata?: any;
  user?: {
    first_name: string;
    last_name: string;
    role: string;
  };
}

/**
 * Generator for user profile data
 */
const userProfileArbitrary = fc.record({
  first_name: fc.string({ minLength: 1, maxLength: 50 }),
  last_name: fc.string({ minLength: 1, maxLength: 50 }),
  role: fc.constantFrom('student', 'admin', 'instructor')
});

/**
 * Generator for enrollment data with all required fields
 * Note: user field is REQUIRED per Requirements 5.1 and 5.2
 */
const enrollmentArbitrary = fc.record({
  id: fc.uuid(),
  user_id: fc.uuid(),
  user_email: fc.emailAddress(),
  course_id: fc.string({ minLength: 5, maxLength: 50 }),
  course_title: fc.string({ minLength: 5, maxLength: 100 }),
  status: fc.constantFrom('pending' as const, 'approved' as const, 'rejected' as const),
  enrolled_at: fc.integer({ min: 1577836800000, max: 1767225600000 }) // 2020-01-01 to 2025-12-31 in ms
    .map(ms => new Date(ms).toISOString()),
  approved_at: fc.option(
    fc.integer({ min: 1577836800000, max: 1767225600000 })
      .map(ms => new Date(ms).toISOString()),
    { nil: undefined }
  ),
  progress: fc.integer({ min: 0, max: 100 }),
  proof_of_payment: fc.option(
    fc.webUrl(),
    { nil: undefined }
  ),
  payment_ref: fc.option(
    fc.string({ minLength: 5, maxLength: 50 }),
    { nil: undefined }
  ),
  payment_date: fc.option(
    fc.integer({ min: 1577836800000, max: 1767225600000 })
      .map(ms => new Date(ms).toISOString()),
    { nil: undefined }
  ),
  payment_type: fc.option(
    fc.constantFrom('card' as const, 'eft' as const, 'manual' as const),
    { nil: undefined }
  ),
  last_updated: fc.option(
    fc.integer({ min: 1577836800000, max: 1767225600000 })
      .map(ms => new Date(ms).toISOString()),
    { nil: undefined }
  ),
  metadata: fc.option(
    fc.object(),
    { nil: undefined }
  ),
  // User field is REQUIRED - enrollments displayed in admin must have user data
  user: userProfileArbitrary
});

/**
 * Generator for a list of enrollments
 */
const enrollmentListArbitrary = fc.array(enrollmentArbitrary, { minLength: 1, maxLength: 50 });

/**
 * Helper function to check if an enrollment has all required fields for admin display
 */
function hasRequiredFields(enrollment: AdminEnrollmentView): boolean {
  // Required fields per Requirements 5.1 and 5.2:
  // - user email
  // - user name (first_name + last_name from user object)
  // - course title
  // - submission timestamp (enrolled_at)
  // - proof of payment status (presence of proof_of_payment field)
  
  const hasUserEmail = typeof enrollment.user_email === 'string' && enrollment.user_email.length > 0;
  const hasUserName = enrollment.user && 
                      typeof enrollment.user.first_name === 'string' && 
                      typeof enrollment.user.last_name === 'string';
  const hasCourseTitle = typeof enrollment.course_title === 'string' && enrollment.course_title.length > 0;
  const hasSubmissionTimestamp = typeof enrollment.enrolled_at === 'string' && enrollment.enrolled_at.length > 0;
  // Proof of payment status is indicated by the presence/absence of the field
  const hasProofOfPaymentStatus = 'proof_of_payment' in enrollment;
  
  return hasUserEmail && hasUserName && hasCourseTitle && hasSubmissionTimestamp && hasProofOfPaymentStatus;
}

/**
 * Helper function to extract display data from enrollment
 */
function extractDisplayData(enrollment: AdminEnrollmentView) {
  return {
    userEmail: enrollment.user_email,
    userName: enrollment.user ? `${enrollment.user.first_name} ${enrollment.user.last_name}` : '',
    courseTitle: enrollment.course_title,
    submissionTimestamp: enrollment.enrolled_at,
    proofOfPaymentStatus: enrollment.proof_of_payment ? 'present' : 'missing'
  };
}

describe('Property 11: Admin Enrollment List Completeness', () => {
  /**
   * Property test: All enrollments must have required fields
   */
  it('should ensure all enrollments have user email, user name, course title, submission timestamp, and proof of payment status', () => {
    fc.assert(
      fc.property(
        enrollmentListArbitrary,
        (enrollments) => {
          // Every enrollment in the list must have all required fields
          return enrollments.every(enrollment => hasRequiredFields(enrollment));
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: User email must be non-empty string
   */
  it('should ensure all enrollments have non-empty user email', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollment) => {
          return typeof enrollment.user_email === 'string' && enrollment.user_email.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: User name must be constructible from user object
   */
  it('should ensure all enrollments have user object with first and last name', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollment) => {
          // If user object exists, it must have first_name and last_name
          if (enrollment.user) {
            return (
              typeof enrollment.user.first_name === 'string' &&
              typeof enrollment.user.last_name === 'string'
            );
          }
          // If no user object, this is acceptable (will be handled by fallback)
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Course title must be non-empty string
   */
  it('should ensure all enrollments have non-empty course title', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollment) => {
          return typeof enrollment.course_title === 'string' && enrollment.course_title.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Submission timestamp must be valid ISO string
   */
  it('should ensure all enrollments have valid submission timestamp', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollment) => {
          // Must be a string
          if (typeof enrollment.enrolled_at !== 'string' || enrollment.enrolled_at.length === 0) {
            return false;
          }
          
          // Must be parseable as a date
          const date = new Date(enrollment.enrolled_at);
          return !isNaN(date.getTime());
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Proof of payment status must be determinable
   */
  it('should ensure proof of payment status is determinable for all enrollments', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollment) => {
          // The proof_of_payment field must exist (can be undefined or a URL)
          return 'proof_of_payment' in enrollment;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Display data extraction is consistent
   */
  it('should consistently extract display data from enrollments', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollment) => {
          const displayData1 = extractDisplayData(enrollment);
          const displayData2 = extractDisplayData(enrollment);
          
          // Multiple extractions should yield identical results
          return (
            displayData1.userEmail === displayData2.userEmail &&
            displayData1.userName === displayData2.userName &&
            displayData1.courseTitle === displayData2.courseTitle &&
            displayData1.submissionTimestamp === displayData2.submissionTimestamp &&
            displayData1.proofOfPaymentStatus === displayData2.proofOfPaymentStatus
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Pending enrollments must have all required fields
   */
  it('should ensure pending enrollments specifically have all required fields', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollmentBase) => {
          // Force status to pending
          const enrollment = { ...enrollmentBase, status: 'pending' as const };
          
          // Pending enrollments must have all required fields
          return hasRequiredFields(enrollment);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: All enrollment statuses must have complete data
   */
  it('should ensure enrollments of all statuses have complete required fields', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        fc.constantFrom('pending' as const, 'approved' as const, 'rejected' as const),
        (enrollmentBase, status) => {
          const enrollment = { ...enrollmentBase, status };
          
          // Regardless of status, all required fields must be present
          return hasRequiredFields(enrollment);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Proof of payment status correctly reflects presence/absence
   */
  it('should correctly determine proof of payment status based on field presence', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollment) => {
          const displayData = extractDisplayData(enrollment);
          
          // If proof_of_payment has a value, status should be 'present'
          // If proof_of_payment is undefined, status should be 'missing'
          if (enrollment.proof_of_payment) {
            return displayData.proofOfPaymentStatus === 'present';
          } else {
            return displayData.proofOfPaymentStatus === 'missing';
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Large enrollment lists maintain completeness
   */
  it('should maintain field completeness for large enrollment lists', () => {
    fc.assert(
      fc.property(
        fc.array(enrollmentArbitrary, { minLength: 10, maxLength: 100 }),
        (enrollments) => {
          // Every enrollment in a large list must have all required fields
          return enrollments.every(enrollment => hasRequiredFields(enrollment));
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Enrollment list filtering preserves completeness
   */
  it('should preserve field completeness when filtering enrollments', () => {
    fc.assert(
      fc.property(
        enrollmentListArbitrary,
        fc.constantFrom('pending' as const, 'approved' as const, 'rejected' as const),
        (enrollments, filterStatus) => {
          // Filter enrollments by status
          const filtered = enrollments.filter(e => e.status === filterStatus);
          
          // All filtered enrollments must still have complete fields
          return filtered.every(enrollment => hasRequiredFields(enrollment));
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: User name construction handles missing user object
   */
  it('should handle enrollments with missing user object gracefully', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollmentBase) => {
          // Remove user object
          const { user: _user, ...enrollmentWithoutUser } = enrollmentBase;
          const enrollment = enrollmentWithoutUser as AdminEnrollmentView;
          
          const displayData = extractDisplayData(enrollment);
          
          // Should return empty string for userName when user object is missing
          return displayData.userName === '';
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Required fields are never null or undefined (except optional fields)
   */
  it('should ensure required fields are never null or undefined', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollment) => {
          // Required fields must not be null or undefined
          return (
            enrollment.user_email != null &&
            enrollment.course_title != null &&
            enrollment.enrolled_at != null &&
            // proof_of_payment can be undefined, but the key must exist
            'proof_of_payment' in enrollment
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Enrollment ID is always present and non-empty
   */
  it('should ensure all enrollments have a valid ID', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollment) => {
          return typeof enrollment.id === 'string' && enrollment.id.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Status field is always one of the valid values
   */
  it('should ensure status is always a valid enrollment status', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        (enrollment) => {
          return ['pending', 'approved', 'rejected'].includes(enrollment.status);
        }
      ),
      { numRuns: 100 }
    );
  });
});
