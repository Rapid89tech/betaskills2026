
// Enrollment Status Enums
export enum EnrollmentStatus {
  PENDING = 'PENDING',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  PAYMENT_PROCESSING = 'PAYMENT_PROCESSING',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED'
}

// Payment Type Constants
export enum PaymentType {
  EFT = 'EFT',
  CARD = 'CARD'
}

// Payment Status Enum
export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

// Enhanced Enrollment Interface
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  paymentType: PaymentType;
  status: EnrollmentStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  // Legacy fields for backward compatibility
  user_id?: string;
  user_email?: string;
  course_id?: string;
  course_title?: string;
  enrolled_at?: string;
  completed_at?: string;
  progress?: number;
  course?: {
    title: string;
    description?: string;
    instructor_id: string;
  };
}

// Course Priority Interface
export interface CoursePriority {
  courseId: string;
  userId: string;
  priority: number;
  enrollmentStatus: 'ENROLLED' | 'PENDING' | 'NONE';
  lastUpdated: Date;
}

// Real-time Update Types
export enum EnrollmentUpdateType {
  ENROLLMENT_CREATED = 'ENROLLMENT_CREATED',
  ENROLLMENT_APPROVED = 'ENROLLMENT_APPROVED',
  ENROLLMENT_REJECTED = 'ENROLLMENT_REJECTED'
}

export interface EnrollmentUpdate {
  type: EnrollmentUpdateType;
  enrollmentId: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Enrollment Result Interface
export interface EnrollmentResult {
  success: boolean;
  enrollment?: Enrollment;
  error?: string;
  errorCode?: string;
}

// Payment Details Interface
export interface PaymentDetails {
  amount: number;
  currency: string;
  reference?: string;
  metadata?: Record<string, any>;
}

// Payment Result Interface
export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  error?: string;
  errorCode?: string;
}

// Payment Callback Interface
export interface PaymentCallback {
  paymentId: string;
  status: PaymentStatus;
  reference?: string;
  metadata?: Record<string, any>;
}
