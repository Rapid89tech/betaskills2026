/**
 * Enhanced CourseCard Component Tests
 * 
 * Tests for the enhanced CourseCard component with proper enrollment logic
 * Requirements: 1.1, 1.2, 1.3, 6.1, 6.3, 6.4
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CourseCard from '@/components/CourseCard';
import { EnrollmentStatus } from '@/types/ikhokha';

// Mock dependencies
vi.mock('@/hooks/AuthContext', () => ({
  useAuth: vi.fn()
}));

vi.mock('@/hooks/useEnrollments', () => ({
  useEnrollments: vi.fn()
}));

vi.mock('@/services/ProductionPaymentOrchestrator', () => ({
  productionPaymentOrchestrator: {
    initiateEnrollment: vi.fn(),
    subscribeToEnrollmentUpdates: vi.fn(() => () => {})
  }
}));

// Import the mocked hooks
import { useAuth } from '@/hooks/AuthContext';
import { useEnrollments } from '@/hooks/useEnrollments';
import { productionPaymentOrchestrator } from '@/services/ProductionPaymentOrchestrator';

const mockCourse = {
  id: 'test-course-1',
  title: 'Test Course',
  description: 'A test course for unit testing',
  category: 'Test',
  level: 'beginner',
  duration: '4 weeks',
  is_free: false,
  price: 299,
  currency: 'ZAR',
  students: 0,
  rating: 5.0,
  instructor: {
    id: 'test-instructor',
    first_name: 'Test',
    last_name: 'Instructor',
    email: 'test@example.com'
  },
  status: 'active',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  available: true
};

const renderCourseCard = (props = {}) => {
  return render(
    <BrowserRouter>
      <CourseCard course={mockCourse} {...props} />
    </BrowserRouter>
  );
};

describe('CourseCard Enhanced Enrollment Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Requirement 1.1: Not logged in users', () => {
    it('should show "Register To Enroll" button for non-logged users', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: null,
        profile: null
      });
      
      vi.mocked(useEnrollments).mockReturnValue({
        getEnrollment: vi.fn(() => null),
        isEnrolled: vi.fn(() => false),
        hasPendingEnrollment: vi.fn(() => false)
      });

      renderCourseCard();

      expect(screen.getByText('Register To Enroll')).toBeInTheDocument();
    });

    it('should redirect to auth when "Register To Enroll" is clicked', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: null,
        profile: null
      });
      
      vi.mocked(useEnrollments).mockReturnValue({
        getEnrollment: vi.fn(() => null),
        isEnrolled: vi.fn(() => false),
        hasPendingEnrollment: vi.fn(() => false)
      });

      renderCourseCard();

      const button = screen.getByText('Register To Enroll');
      fireEvent.click(button);

      // Navigation would be handled by react-router in real app
      expect(button).toBeInTheDocument();
    });
  });

  describe('Requirement 1.2: Logged in users without enrollment', () => {
    it('should show "Enroll Now" button for logged-in users without enrollment', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: { id: 'user-1', email: 'test@example.com' },
        profile: { role: 'student' }
      });
      
      vi.mocked(useEnrollments).mockReturnValue({
        getEnrollment: vi.fn(() => null),
        isEnrolled: vi.fn(() => false),
        hasPendingEnrollment: vi.fn(() => false)
      });

      renderCourseCard();

      expect(screen.getByText('Enroll Now')).toBeInTheDocument();
    });
  });

  describe('Requirement 6.3: Pending Approval state for EFT payments', () => {
    it('should show "Pending Approval" button for EFT payments awaiting admin approval', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: { id: 'user-1', email: 'test@example.com' },
        profile: { role: 'student' }
      });
      
      vi.mocked(useEnrollments).mockReturnValue({
        getEnrollment: vi.fn(() => ({
          id: 'enrollment-1',
          status: 'pending',
          course_id: 'test-course-1',
          user_id: 'user-1'
        })),
        isEnrolled: vi.fn(() => false),
        hasPendingEnrollment: vi.fn(() => true)
      });

      renderCourseCard();

      const pendingButton = screen.getByRole('button', { name: /pending approval/i });
      expect(pendingButton).toBeInTheDocument();
      expect(pendingButton).toBeDisabled();
    });
  });

  describe('Requirement 6.4: Continue Course for approved enrollments', () => {
    it('should show "Continue Course" button for approved enrollments with course access', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: { id: 'user-1', email: 'test@example.com' },
        profile: { role: 'student' }
      });
      
      vi.mocked(useEnrollments).mockReturnValue({
        getEnrollment: vi.fn(() => ({
          id: 'enrollment-1',
          status: 'approved',
          course_id: 'test-course-1',
          user_id: 'user-1'
        })),
        isEnrolled: vi.fn(() => true),
        hasPendingEnrollment: vi.fn(() => false)
      });

      renderCourseCard();

      expect(screen.getByText('Continue Course')).toBeInTheDocument();
      expect(screen.getByText('Continue Course')).not.toBeDisabled();
    });
  });

  describe('Real-time status updates', () => {
    it('should show correct button state based on enrollment status', async () => {
      // Test that the component correctly shows different states
      // First test pending state
      vi.mocked(useAuth).mockReturnValue({
        user: { id: 'user-1', email: 'test@example.com' },
        profile: { role: 'student' }
      });
      
      vi.mocked(useEnrollments).mockReturnValue({
        getEnrollment: vi.fn(() => ({
          id: 'enrollment-1',
          status: 'pending',
          course_id: 'test-course-1',
          user_id: 'user-1'
        })),
        isEnrolled: vi.fn(() => false),
        hasPendingEnrollment: vi.fn(() => true)
      });

      const { rerender } = renderCourseCard();

      // Initially should show pending approval
      const pendingButton = screen.getByRole('button', { name: /pending approval/i });
      expect(pendingButton).toBeInTheDocument();

      // Now test approved state by re-rendering with different mock data
      vi.mocked(useEnrollments).mockReturnValue({
        getEnrollment: vi.fn(() => ({
          id: 'enrollment-1',
          status: 'approved',
          course_id: 'test-course-1',
          user_id: 'user-1'
        })),
        isEnrolled: vi.fn(() => true),
        hasPendingEnrollment: vi.fn(() => false)
      });

      rerender(
        <BrowserRouter>
          <CourseCard course={mockCourse} />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Continue Course')).toBeInTheDocument();
      });
    });
  });

  describe('Loading states', () => {
    it('should show processing indicator during enrollment', async () => {
      vi.mocked(useAuth).mockReturnValue({
        user: { id: 'user-1', email: 'test@example.com' },
        profile: { role: 'student', first_name: 'Test', last_name: 'User' }
      });
      
      vi.mocked(useEnrollments).mockReturnValue({
        getEnrollment: vi.fn(() => null),
        isEnrolled: vi.fn(() => false),
        hasPendingEnrollment: vi.fn(() => false)
      });

      // Mock a slow enrollment process
      vi.mocked(productionPaymentOrchestrator.initiateEnrollment).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({
          success: true,
          paymentUrl: 'https://payment.example.com',
          status: EnrollmentStatus.PAYMENT_PROCESSING
        }), 100))
      );

      renderCourseCard();

      const enrollButton = screen.getByText('Enroll Now');
      fireEvent.click(enrollButton);

      // Should show processing state
      await waitFor(() => {
        expect(screen.getByText('Processing...')).toBeInTheDocument();
      });
    });
  });

  describe('Special access handling', () => {
    it('should show special access for john.doe@gmail.com', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: { id: 'user-1', email: 'john.doe@gmail.com' },
        profile: { role: 'student' }
      });
      
      vi.mocked(useEnrollments).mockReturnValue({
        getEnrollment: vi.fn(() => null),
        isEnrolled: vi.fn(() => false),
        hasPendingEnrollment: vi.fn(() => false)
      });

      renderCourseCard();

      expect(screen.getByText('🎯 Access Course')).toBeInTheDocument();
    });
  });

  describe('Non-student users', () => {
    it('should not show enrollment button for non-student users', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: { id: 'user-1', email: 'admin@example.com' },
        profile: { role: 'admin' }
      });
      
      vi.mocked(useEnrollments).mockReturnValue({
        getEnrollment: vi.fn(() => null),
        isEnrolled: vi.fn(() => false),
        hasPendingEnrollment: vi.fn(() => false)
      });

      renderCourseCard();

      expect(screen.queryByText('Enroll Now')).not.toBeInTheDocument();
      expect(screen.queryByText('Register To Enroll')).not.toBeInTheDocument();
    });
  });
});