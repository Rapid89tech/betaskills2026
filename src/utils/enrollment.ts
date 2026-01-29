import { 
  Enrollment, 
  EnrollmentStatus, 
  PaymentType, 
  PaymentStatus,
  CoursePriority,
  EnrollmentUpdate,
  EnrollmentUpdateType
} from '@/types/enrollment';

/**
 * Utility functions for enrollment operations
 */

// Check if enrollment is pending approval
export const isPendingApproval = (enrollment: Enrollment): boolean => {
  return enrollment.status === EnrollmentStatus.PENDING && 
         enrollment.paymentType === PaymentType.EFT;
};

// Check if enrollment is approved and active
export const isActiveEnrollment = (enrollment: Enrollment): boolean => {
  return enrollment.status === EnrollmentStatus.APPROVED || 
         enrollment.status === EnrollmentStatus.COMPLETED;
};

// Check if enrollment allows course access
export const hasAccessToContent = (enrollment: Enrollment): boolean => {
  // Card payments get immediate access, EFT needs approval
  if (enrollment.paymentType === PaymentType.CARD) {
    return enrollment.paymentStatus === PaymentStatus.COMPLETED;
  }
  
  return enrollment.status === EnrollmentStatus.APPROVED || 
         enrollment.status === EnrollmentStatus.COMPLETED;
};

// Get enrollment display status for UI
export const getEnrollmentDisplayStatus = (enrollment: Enrollment): string => {
  if (enrollment.status === EnrollmentStatus.PENDING && enrollment.paymentType === PaymentType.EFT) {
    return 'Pending EFT Approval';
  }
  
  if (enrollment.status === EnrollmentStatus.PENDING && enrollment.paymentType === PaymentType.CARD) {
    return 'Processing Payment';
  }
  
  switch (enrollment.status) {
    case EnrollmentStatus.APPROVED:
      return 'Enrolled';
    case EnrollmentStatus.COMPLETED:
      return 'Completed';
    case EnrollmentStatus.REJECTED:
      return 'Enrollment Rejected';
    default:
      return 'Unknown Status';
  }
};

// Get button text based on enrollment status
export const getEnrollmentButtonText = (enrollment: Enrollment | null): string => {
  if (!enrollment) {
    return 'Enroll Now';
  }
  
  if (hasAccessToContent(enrollment)) {
    return 'Continue Course';
  }
  
  if (isPendingApproval(enrollment)) {
    return 'Pending Approval';
  }
  
  if (enrollment.status === EnrollmentStatus.REJECTED) {
    return 'Enroll Now';
  }
  
  return 'Enroll Now';
};

// Check if enrollment button should be disabled
export const isEnrollmentButtonDisabled = (enrollment: Enrollment | null): boolean => {
  if (!enrollment) {
    return false;
  }
  
  return isPendingApproval(enrollment) || 
         (enrollment.paymentType === PaymentType.CARD && 
          enrollment.paymentStatus === PaymentStatus.PENDING);
};

// Sort enrollments by priority (for admin dashboard)
export const sortEnrollmentsByPriority = (enrollments: Enrollment[]): Enrollment[] => {
  return [...enrollments].sort((a, b) => {
    // EFT pending enrollments first
    const aIsPendingEFT = isPendingApproval(a);
    const bIsPendingEFT = isPendingApproval(b);
    
    if (aIsPendingEFT && !bIsPendingEFT) return -1;
    if (!aIsPendingEFT && bIsPendingEFT) return 1;
    
    // Then by most recent
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
};

// Sort courses by enrollment priority
export const sortCoursesByEnrollmentPriority = (priorities: CoursePriority[]): CoursePriority[] => {
  return [...priorities].sort((a, b) => {
    // Enrolled courses first
    if (a.enrollmentStatus === 'ENROLLED' && b.enrollmentStatus !== 'ENROLLED') return -1;
    if (a.enrollmentStatus !== 'ENROLLED' && b.enrollmentStatus === 'ENROLLED') return 1;
    
    // Then pending courses
    if (a.enrollmentStatus === 'PENDING' && b.enrollmentStatus === 'NONE') return -1;
    if (a.enrollmentStatus === 'NONE' && b.enrollmentStatus === 'PENDING') return 1;
    
    // Within same status, sort by most recently updated
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });
};

// Create enrollment update object
export const createEnrollmentUpdate = (
  type: EnrollmentUpdateType,
  enrollment: Enrollment,
  metadata?: Record<string, any>
): EnrollmentUpdate => {
  return {
    type,
    enrollmentId: enrollment.id,
    userId: enrollment.userId,
    courseId: enrollment.courseId,
    status: enrollment.status,
    timestamp: new Date(),
    metadata
  };
};

// Check if enrollment needs admin attention
export const needsAdminAttention = (enrollment: Enrollment): boolean => {
  return enrollment.status === EnrollmentStatus.PENDING && 
         enrollment.paymentType === PaymentType.EFT;
};

// Get enrollment age in hours
export const getEnrollmentAgeHours = (enrollment: Enrollment): number => {
  const now = new Date();
  const created = new Date(enrollment.createdAt);
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));
};

// Check if enrollment is stale (older than 24 hours and still pending)
export const isStaleEnrollment = (enrollment: Enrollment): boolean => {
  return enrollment.status === EnrollmentStatus.PENDING && 
         getEnrollmentAgeHours(enrollment) > 24;
};

// Format enrollment for display
export const formatEnrollmentForDisplay = (enrollment: Enrollment) => {
  return {
    id: enrollment.id,
    status: getEnrollmentDisplayStatus(enrollment),
    paymentType: enrollment.paymentType,
    createdAt: enrollment.createdAt.toISOString(),
    needsAttention: needsAdminAttention(enrollment),
    isStale: isStaleEnrollment(enrollment),
    ageHours: getEnrollmentAgeHours(enrollment)
  };
};