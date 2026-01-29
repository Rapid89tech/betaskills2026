import { describe, it, expect } from 'vitest';
import {
  isPendingApproval,
  isActiveEnrollment,
  hasAccessToContent,
  getEnrollmentDisplayStatus,
  getEnrollmentButtonText,
  isEnrollmentButtonDisabled,
  needsAdminAttention
} from '../enrollment';
import { Enrollment, EnrollmentStatus, PaymentType, PaymentStatus } from '@/types/enrollment';

describe('Enrollment Utilities', () => {
  const baseEnrollment: Enrollment = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    userId: '123e4567-e89b-12d3-a456-426614174001',
    courseId: '123e4567-e89b-12d3-a456-426614174002',
    paymentType: PaymentType.EFT,
    status: EnrollmentStatus.PENDING,
    paymentStatus: PaymentStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  describe('isPendingApproval', () => {
    it('should return true for pending EFT enrollment', () => {
      const enrollment = {
        ...baseEnrollment,
        status: EnrollmentStatus.PENDING,
        paymentType: PaymentType.EFT
      };

      expect(isPendingApproval(enrollment)).toBe(true);
    });

    it('should return false for pending card enrollment', () => {
      const enrollment = {
        ...baseEnrollment,
        status: EnrollmentStatus.PENDING,
        paymentType: PaymentType.CARD
      };

      expect(isPendingApproval(enrollment)).toBe(false);
    });

    it('should return false for approved enrollment', () => {
      const enrollment = {
        ...baseEnrollment,
        status: EnrollmentStatus.APPROVED,
        paymentType: PaymentType.EFT
      };

      expect(isPendingApproval(enrollment)).toBe(false);
    });
  });

  describe('hasAccessToContent', () => {
    it('should grant access for completed card payment', () => {
      const enrollment = {
        ...baseEnrollment,
        paymentType: PaymentType.CARD,
        paymentStatus: PaymentStatus.COMPLETED
      };

      expect(hasAccessToContent(enrollment)).toBe(true);
    });

    it('should not grant access for pending card payment', () => {
      const enrollment = {
        ...baseEnrollment,
        paymentType: PaymentType.CARD,
        paymentStatus: PaymentStatus.PENDING
      };

      expect(hasAccessToContent(enrollment)).toBe(false);
    });

    it('should grant access for approved EFT enrollment', () => {
      const enrollment = {
        ...baseEnrollment,
        paymentType: PaymentType.EFT,
        status: EnrollmentStatus.APPROVED
      };

      expect(hasAccessToContent(enrollment)).toBe(true);
    });

    it('should not grant access for pending EFT enrollment', () => {
      const enrollment = {
        ...baseEnrollment,
        paymentType: PaymentType.EFT,
        status: EnrollmentStatus.PENDING
      };

      expect(hasAccessToContent(enrollment)).toBe(false);
    });
  });

  describe('getEnrollmentButtonText', () => {
    it('should return "Enroll Now" for no enrollment', () => {
      expect(getEnrollmentButtonText(null)).toBe('Enroll Now');
    });

    it('should return "Continue Course" for enrollment with access', () => {
      const enrollment = {
        ...baseEnrollment,
        status: EnrollmentStatus.APPROVED
      };

      expect(getEnrollmentButtonText(enrollment)).toBe('Continue Course');
    });

    it('should return "Pending Approval" for pending EFT enrollment', () => {
      const enrollment = {
        ...baseEnrollment,
        status: EnrollmentStatus.PENDING,
        paymentType: PaymentType.EFT
      };

      expect(getEnrollmentButtonText(enrollment)).toBe('Pending Approval');
    });
  });

  describe('needsAdminAttention', () => {
    it('should return true for pending EFT enrollment', () => {
      const enrollment = {
        ...baseEnrollment,
        status: EnrollmentStatus.PENDING,
        paymentType: PaymentType.EFT
      };

      expect(needsAdminAttention(enrollment)).toBe(true);
    });

    it('should return false for approved enrollment', () => {
      const enrollment = {
        ...baseEnrollment,
        status: EnrollmentStatus.APPROVED,
        paymentType: PaymentType.EFT
      };

      expect(needsAdminAttention(enrollment)).toBe(false);
    });

    it('should return false for card enrollment', () => {
      const enrollment = {
        ...baseEnrollment,
        status: EnrollmentStatus.PENDING,
        paymentType: PaymentType.CARD
      };

      expect(needsAdminAttention(enrollment)).toBe(false);
    });
  });
});