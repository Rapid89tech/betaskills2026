import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import FastAdminDashboard from '../FastAdminDashboard';
import { useFastDashboard } from '@/hooks/useFastDashboard';
import { useToast } from '@/hooks/use-toast';

// Mock the hooks
vi.mock('@/hooks/useFastDashboard');
vi.mock('@/hooks/use-toast');

const mockUseFastDashboard = vi.mocked(useFastDashboard);
const mockUseToast = vi.mocked(useToast);

describe('FastAdminDashboard - Enhanced Actions', () => {
    const mockToast = vi.fn();
    const mockApproveEnrollment = vi.fn();
    const mockRejectEnrollment = vi.fn();
    const mockRefresh = vi.fn();
    const mockClearError = vi.fn();

    const mockEnrollments = [
        {
            id: '1',
            user_id: 'user1',
            user_email: 'user1@example.com',
            course_id: 'course1',
            course_title: 'Test Course 1',
            status: 'pending' as const,
            enrolled_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
        },
        {
            id: '2',
            user_id: 'user2',
            user_email: 'user2@example.com',
            course_id: 'course2',
            course_title: 'Test Course 2',
            status: 'pending' as const,
            enrolled_at: '2024-01-02T00:00:00Z',
            updated_at: '2024-01-02T00:00:00Z',
        },
        {
            id: '3',
            user_id: 'user3',
            user_email: 'user3@example.com',
            course_id: 'course3',
            course_title: 'Test Course 3',
            status: 'approved' as const,
            enrolled_at: '2024-01-03T00:00:00Z',
            updated_at: '2024-01-03T00:00:00Z',
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();

        mockUseToast.mockReturnValue({
            toast: mockToast,
        });

        mockUseFastDashboard.mockReturnValue({
            allEnrollments: mockEnrollments,
            allUsers: [],
            pendingEnrollments: mockEnrollments.filter(e => e.status === 'pending'),
            userEnrollments: [],
            loading: false,
            error: null,
            retryCount: 0,
            isRetrying: false,
            approveEnrollment: mockApproveEnrollment,
            rejectEnrollment: mockRejectEnrollment,
            refresh: mockRefresh,
            clearError: mockClearError,
            isEnrolled: vi.fn(),
            getEnrollment: vi.fn(),
        });
    });

    it('should display enhanced loading states during approval', async () => {
        mockApproveEnrollment.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 100)));

        render(<FastAdminDashboard />);

        const approveButtons = screen.getAllByRole('button', { name: /approve/i });
        const firstApproveButton = approveButtons[0];
        fireEvent.click(firstApproveButton);

        // Should show loading state
        expect(screen.getByText('Approving...')).toBeInTheDocument();
        expect(screen.getByText('Processing...')).toBeInTheDocument();

        await waitFor(() => {
            expect(mockApproveEnrollment).toHaveBeenCalledWith('1');
        });
    });

    it('should show enhanced error messages with retry options', async () => {
        const errorMessage = 'Network error occurred';
        mockApproveEnrollment.mockRejectedValue(new Error(errorMessage));

        render(<FastAdminDashboard />);

        const approveButtons = screen.getAllByRole('button', { name: /approve/i });
        const firstApproveButton = approveButtons[0];
        fireEvent.click(firstApproveButton);

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: 'Approval Failed',
                    description: errorMessage,
                    variant: 'destructive',
                    action: expect.anything(),
                })
            );
        });
    });

    it('should handle bulk selection of pending enrollments', () => {
        render(<FastAdminDashboard />);

        // Should show "Select All Pending" button when there are pending enrollments
        const selectAllButton = screen.getByRole('button', { name: /select all pending/i });
        expect(selectAllButton).toBeInTheDocument();

        // Click to select all
        fireEvent.click(selectAllButton);

        // Should show bulk action buttons
        expect(screen.getByRole('button', { name: /approve selected/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /reject selected/i })).toBeInTheDocument();
    });

    it('should show individual enrollment checkboxes for pending enrollments', () => {
        render(<FastAdminDashboard />);

        // Should have checkboxes for pending enrollments only
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(2); // Only 2 pending enrollments

        // Check first enrollment
        fireEvent.click(checkboxes[0]);

        // Should show selection count
        expect(screen.getByText('1 selected')).toBeInTheDocument();
    });

    it('should display action-specific error messages inline', async () => {
        const errorMessage = 'Permission denied';
        mockApproveEnrollment.mockRejectedValue(new Error(errorMessage));

        render(<FastAdminDashboard />);

        const approveButtons = screen.getAllByRole('button', { name: /approve/i });
        const firstApproveButton = approveButtons[0];
        fireEvent.click(firstApproveButton);

        await waitFor(() => {
            // Should show inline error message
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
        });
    });

    it('should show optimistic updates with proper visual feedback', async () => {
        // Mock successful approval
        mockApproveEnrollment.mockResolvedValue(true);

        render(<FastAdminDashboard />);

        const approveButtons = screen.getAllByRole('button', { name: /approve/i });
        const firstApproveButton = approveButtons[0];
        fireEvent.click(firstApproveButton);

        // Should immediately show processing state
        expect(screen.getByText('updating...')).toBeInTheDocument();
        expect(screen.getByText('Approving...')).toBeInTheDocument();

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: '✅ Enrollment Approved',
                    description: expect.stringContaining('successfully'),
                })
            );
        });
    });

    it('should handle retry attempts with escalating feedback', async () => {
        let callCount = 0;
        mockApproveEnrollment.mockImplementation(() => {
            callCount++;
            return Promise.reject(new Error(`Attempt ${callCount} failed`));
        });

        render(<FastAdminDashboard />);

        const approveButtons = screen.getAllByRole('button', { name: /approve/i });
        const firstApproveButton = approveButtons[0];

        // First attempt
        fireEvent.click(firstApproveButton);

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: 'Approval Failed',
                })
            );
        });

        // Second attempt (should show different message)
        fireEvent.click(firstApproveButton);

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: 'Still Having Issues',
                    description: expect.stringContaining('This is attempt 2'),
                })
            );
        });
    });
});