import { PaymentType, EnrollmentStatus, PaymentStatus } from '@/types/enrollment';

// Payment Type Constants
export const PAYMENT_TYPES = {
  EFT: PaymentType.EFT,
  CARD: PaymentType.CARD
} as const;

// Enrollment Status Constants
export const ENROLLMENT_STATUSES = {
  PENDING: EnrollmentStatus.PENDING,
  APPROVED: EnrollmentStatus.APPROVED,
  REJECTED: EnrollmentStatus.REJECTED,
  COMPLETED: EnrollmentStatus.COMPLETED
} as const;

// Payment Status Constants
export const PAYMENT_STATUSES = {
  PENDING: PaymentStatus.PENDING,
  COMPLETED: PaymentStatus.COMPLETED,
  FAILED: PaymentStatus.FAILED
} as const;

// Enrollment Configuration
export const ENROLLMENT_CONFIG = {
  // Maximum time to wait for card payment confirmation (in milliseconds)
  CARD_PAYMENT_TIMEOUT: 30000, // 30 seconds
  
  // Time after which EFT enrollment is considered stale (in hours)
  EFT_STALE_THRESHOLD: 24,
  
  // Maximum rejection reason length
  MAX_REJECTION_REASON_LENGTH: 500,
  
  // Retry configuration for failed operations
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
  
  // Real-time update configuration
  WEBSOCKET_RECONNECT_DELAY: 5000,
  MAX_RECONNECT_ATTEMPTS: 10,
  
  // Course priority configuration
  DEFAULT_PRIORITY: 0,
  ENROLLED_PRIORITY_BOOST: 1000,
  PENDING_PRIORITY_BOOST: 500
} as const;

// Error Codes
export const ENROLLMENT_ERROR_CODES = {
  INVALID_PAYMENT_TYPE: 'INVALID_PAYMENT_TYPE',
  PAYMENT_PROCESSING_FAILED: 'PAYMENT_PROCESSING_FAILED',
  ENROLLMENT_NOT_FOUND: 'ENROLLMENT_NOT_FOUND',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  DUPLICATE_ENROLLMENT: 'DUPLICATE_ENROLLMENT',
  INVALID_COURSE: 'INVALID_COURSE',
  INVALID_USER: 'INVALID_USER',
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR'
} as const;

// Success Messages
export const ENROLLMENT_SUCCESS_MESSAGES = {
  CARD_PAYMENT_SUCCESS: 'Payment successful! You now have access to the course.',
  EFT_ENROLLMENT_SUCCESS: 'EFT enrollment submitted successfully. You will receive access once payment is approved.',
  ENROLLMENT_APPROVED: 'Enrollment approved successfully. Student now has access to the course.',
  ENROLLMENT_REJECTED: 'Enrollment rejected successfully.'
} as const;

// Error Messages
export const ENROLLMENT_ERROR_MESSAGES = {
  [ENROLLMENT_ERROR_CODES.INVALID_PAYMENT_TYPE]: 'Invalid payment type selected.',
  [ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED]: 'Payment processing failed. Please try again.',
  [ENROLLMENT_ERROR_CODES.ENROLLMENT_NOT_FOUND]: 'Enrollment not found.',
  [ENROLLMENT_ERROR_CODES.INSUFFICIENT_PERMISSIONS]: 'You do not have permission to perform this action.',
  [ENROLLMENT_ERROR_CODES.DUPLICATE_ENROLLMENT]: 'You are already enrolled in this course.',
  [ENROLLMENT_ERROR_CODES.INVALID_COURSE]: 'Invalid course selected.',
  [ENROLLMENT_ERROR_CODES.INVALID_USER]: 'Invalid user information.',
  [ENROLLMENT_ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection and try again.',
  [ENROLLMENT_ERROR_CODES.VALIDATION_ERROR]: 'Invalid data provided.',
  [ENROLLMENT_ERROR_CODES.TIMEOUT_ERROR]: 'Operation timed out. Please try again.'
} as const;

// UI Constants
export const ENROLLMENT_UI = {
  BUTTON_TEXTS: {
    ENROLL_NOW: 'Enroll Now',
    CONTINUE_COURSE: 'Continue Course',
    PENDING_APPROVAL: 'Pending Approval',
    PROCESSING_PAYMENT: 'Processing Payment...',
    ENROLLMENT_REJECTED: 'Enrollment Rejected'
  },
  
  STATUS_COLORS: {
    [EnrollmentStatus.PENDING]: 'yellow',
    [EnrollmentStatus.APPROVED]: 'green',
    [EnrollmentStatus.REJECTED]: 'red',
    [EnrollmentStatus.COMPLETED]: 'blue'
  },
  
  PAYMENT_TYPE_LABELS: {
    [PaymentType.EFT]: 'EFT Payment',
    [PaymentType.CARD]: 'Card Payment'
  }
} as const;

// WebSocket Event Types
export const WEBSOCKET_EVENTS = {
  ENROLLMENT_CREATED: 'enrollment:created',
  ENROLLMENT_APPROVED: 'enrollment:approved',
  ENROLLMENT_REJECTED: 'enrollment:rejected',
  ENROLLMENT_UPDATED: 'enrollment:updated',
  ADMIN_NOTIFICATION: 'admin:notification',
  STUDENT_NOTIFICATION: 'student:notification'
} as const;