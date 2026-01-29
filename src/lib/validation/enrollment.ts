import { z } from 'zod';
import { EnrollmentStatus, PaymentType, PaymentStatus, EnrollmentUpdateType } from '@/types/enrollment';

// Enrollment Validation Schema
export const enrollmentSchema = z.object({
  id: z.string().uuid('Invalid enrollment ID format'),
  userId: z.string().uuid('Invalid user ID format'),
  courseId: z.string().uuid('Invalid course ID format'),
  paymentType: z.nativeEnum(PaymentType, {
    errorMap: () => ({ message: 'Payment type must be either EFT or CARD' })
  }),
  status: z.nativeEnum(EnrollmentStatus, {
    errorMap: () => ({ message: 'Invalid enrollment status' })
  }),
  paymentStatus: z.nativeEnum(PaymentStatus, {
    errorMap: () => ({ message: 'Invalid payment status' })
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
  approvedBy: z.string().uuid('Invalid approver ID format').optional(),
  approvedAt: z.date().optional(),
  rejectionReason: z.string().min(1, 'Rejection reason cannot be empty').optional()
});

// Course Priority Validation Schema
export const coursePrioritySchema = z.object({
  courseId: z.string().uuid('Invalid course ID format'),
  userId: z.string().uuid('Invalid user ID format'),
  priority: z.number().int().min(0, 'Priority must be a non-negative integer'),
  enrollmentStatus: z.enum(['ENROLLED', 'PENDING', 'NONE'], {
    errorMap: () => ({ message: 'Enrollment status must be ENROLLED, PENDING, or NONE' })
  }),
  lastUpdated: z.date()
});

// Enrollment Update Validation Schema
export const enrollmentUpdateSchema = z.object({
  type: z.nativeEnum(EnrollmentUpdateType, {
    errorMap: () => ({ message: 'Invalid enrollment update type' })
  }),
  enrollmentId: z.string().uuid('Invalid enrollment ID format'),
  userId: z.string().uuid('Invalid user ID format'),
  courseId: z.string().uuid('Invalid course ID format'),
  status: z.nativeEnum(EnrollmentStatus, {
    errorMap: () => ({ message: 'Invalid enrollment status' })
  }),
  timestamp: z.date(),
  metadata: z.record(z.any()).optional()
});

// Payment Details Validation Schema
export const paymentDetailsSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3, 'Currency must be a 3-letter code').toUpperCase(),
  reference: z.string().min(1, 'Reference cannot be empty').optional(),
  metadata: z.record(z.any()).optional()
});

// Enrollment Creation Input Schema
export const createEnrollmentSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  courseId: z.string().uuid('Invalid course ID format'),
  paymentType: z.nativeEnum(PaymentType, {
    errorMap: () => ({ message: 'Payment type must be either EFT or CARD' })
  }),
  paymentDetails: paymentDetailsSchema
});

// Enrollment Approval Schema
export const approveEnrollmentSchema = z.object({
  enrollmentId: z.string().uuid('Invalid enrollment ID format'),
  adminId: z.string().uuid('Invalid admin ID format')
});

// Enrollment Rejection Schema
export const rejectEnrollmentSchema = z.object({
  enrollmentId: z.string().uuid('Invalid enrollment ID format'),
  adminId: z.string().uuid('Invalid admin ID format'),
  reason: z.string().min(1, 'Rejection reason is required').max(500, 'Rejection reason too long')
});

// Enrollment Status Query Schema
export const enrollmentStatusQuerySchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  courseId: z.string().uuid('Invalid course ID format')
});

// Validation helper functions
export const validateEnrollment = (data: unknown) => {
  return enrollmentSchema.safeParse(data);
};

export const validateCoursePriority = (data: unknown) => {
  return coursePrioritySchema.safeParse(data);
};

export const validateEnrollmentUpdate = (data: unknown) => {
  return enrollmentUpdateSchema.safeParse(data);
};

export const validatePaymentDetails = (data: unknown) => {
  return paymentDetailsSchema.safeParse(data);
};

export const validateCreateEnrollment = (data: unknown) => {
  return createEnrollmentSchema.safeParse(data);
};

export const validateApproveEnrollment = (data: unknown) => {
  return approveEnrollmentSchema.safeParse(data);
};

export const validateRejectEnrollment = (data: unknown) => {
  return rejectEnrollmentSchema.safeParse(data);
};

export const validateEnrollmentStatusQuery = (data: unknown) => {
  return enrollmentStatusQuerySchema.safeParse(data);
};

// Type exports for use in components
export type EnrollmentInput = z.infer<typeof enrollmentSchema>;
export type CoursePriorityInput = z.infer<typeof coursePrioritySchema>;
export type EnrollmentUpdateInput = z.infer<typeof enrollmentUpdateSchema>;
export type PaymentDetailsInput = z.infer<typeof paymentDetailsSchema>;
export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;
export type ApproveEnrollmentInput = z.infer<typeof approveEnrollmentSchema>;
export type RejectEnrollmentInput = z.infer<typeof rejectEnrollmentSchema>;
export type EnrollmentStatusQueryInput = z.infer<typeof enrollmentStatusQuerySchema>;