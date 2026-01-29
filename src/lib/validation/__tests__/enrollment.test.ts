import { describe, it, expect } from 'vitest';
import {
  validateEnrollment,
  validateCoursePriority,
  validateEnrollmentUpdate,
  validatePaymentDetails,
  validateCreateEnrollment
} from '../enrollment';
import { EnrollmentStatus, PaymentType, PaymentStatus, EnrollmentUpdateType } from '@/types/enrollment';

describe('Enrollment Validation', () => {
  describe('validateEnrollment', () => {
    it('should validate a valid enrollment', () => {
      const validEnrollment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: '123e4567-e89b-12d3-a456-426614174001',
        courseId: '123e4567-e89b-12d3-a456-426614174002',
        paymentType: PaymentType.CARD,
        status: EnrollmentStatus.APPROVED,
        paymentStatus: PaymentStatus.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = validateEnrollment(validEnrollment);
      expect(result.success).toBe(true);
    });

    it('should reject invalid enrollment with bad UUID', () => {
      const invalidEnrollment = {
        id: 'invalid-uuid',
        userId: '123e4567-e89b-12d3-a456-426614174001',
        courseId: '123e4567-e89b-12d3-a456-426614174002',
        paymentType: PaymentType.CARD,
        status: EnrollmentStatus.APPROVED,
        paymentStatus: PaymentStatus.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = validateEnrollment(invalidEnrollment);
      expect(result.success).toBe(false);
    });
  });

  describe('validatePaymentDetails', () => {
    it('should validate valid payment details', () => {
      const validPaymentDetails = {
        amount: 99.99,
        currency: 'USD',
        reference: 'REF123'
      };

      const result = validatePaymentDetails(validPaymentDetails);
      expect(result.success).toBe(true);
    });

    it('should reject negative amount', () => {
      const invalidPaymentDetails = {
        amount: -10,
        currency: 'USD'
      };

      const result = validatePaymentDetails(invalidPaymentDetails);
      expect(result.success).toBe(false);
    });
  });

  describe('validateCreateEnrollment', () => {
    it('should validate valid enrollment creation data', () => {
      const validData = {
        userId: '123e4567-e89b-12d3-a456-426614174001',
        courseId: '123e4567-e89b-12d3-a456-426614174002',
        paymentType: PaymentType.EFT,
        paymentDetails: {
          amount: 199.99,
          currency: 'USD',
          reference: 'EFT-REF-123'
        }
      };

      const result = validateCreateEnrollment(validData);
      expect(result.success).toBe(true);
    });
  });
});