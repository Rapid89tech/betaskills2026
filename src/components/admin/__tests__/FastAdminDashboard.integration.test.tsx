import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import FastAdminDashboard from '../FastAdminDashboard';
import { useFastDashboard } from '@/hooks/useFastDashboard';
import { useToast } from '@/hooks/use-toast';

// Mock the hooks
vi.mock('@/hooks/useFastDashboard');
vi.mock('@/hooks/use-toast');

// Mock the error boundary component
vi.mock('@/components/CriticalSectionErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

const mockEnrollments = [
  {
    id: 'enrollment-1',
    user_email: 'student1@example.com',
    course_title: 'React Development',
    course_id: 'course-1',
    status: 'pending',
    enrolled_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'enrollment-2',
    user_email: 'student2@example.com',
    course_title: 'Node.js Backend',
    course_id: 'course-2',
    status: 'approved',
    enrolled_at: '2024-01-14T09:00:00Z',
    updated_at: '2024-01-14T09:00:00Z'
  },
  {
    id: 'enrollment-3',
    user_email: 'student3@example.com',
    course_title: 'Python Programming',
    course_id: 'course-3',
    status: 'rejected',
    enrolled_at: '2024-01-13T08:00:00Z',
    updated_at: '2024-01-13T08:00:00Z'
  }
];

const mockUsers = [
  {
    id: 'user-1',
    email: 'student1@example.com',
    first_name: 'John',
    last_name: 'Doe',
    role: 'student',
    approval_status: 'approved',
    created_at: '2024-01-10T10:00:00Z'
  },
  {
    id: 'user-2',
    email: 'student2@example.com',
    first_name: 'Jane',
    last_name: 'Smith',
    role: 'student',
    approval_status: 'approved',
    created_at: '2024-01-09T10:00:00Z'
  },
  {
    id: 'user-3',
    email: 'admin@example.com',
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
    approval_status: 'approved',
    created_at: '2024-01-01T10:00:00Z'
  }
];

const mockToast = vi.fn();

const renderAdminDashboard = () => {
  return render(
    <BrowserRouter>
      <FastAdminDashboard />
    </BrowserRouter>
  );
};

describe('FastAdminDashboard Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementations
    (useFastDashboard as any).mockReturnValue({
      allEnrollments: mockEnrollments,
      allUsers: mockUsers,
      pendingEnrollments: mockEnrollments.filter(e => e.status === 'pending'),
      loading: false,
      error: null,
      retryCount: 0,
      isRetrying: false,
      approveEnrollment: vi.fn().mockResolvedValue(true),
      rejectEnrollment: vi.fn().mockResolvedValue(true),
      refresh: vi.fn().mockResolvedValue(undefined),
      clearError: vi.fn()
    });

    (useToast as any).mockReturnValue({
      toast: mockToast
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Dashboard Loading and Display', () => {
    it('should render dashboard with all sections', () => {
      renderAdminDashboard();

      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Manage users and enrollments')).toBeInTheDocument();
      
      // Check stats cards
      expect(screen.getByText('Total Users')).toBeInTheDocument();
      expect(screen.getByText('Total Enrollments')).toBeInTheDocument();
      expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
      expect(screen.getByText('Approved')).toBeInTheDocument();
    });

    it('should display correct statistics', () => {
      renderAdminDashboard();

      expect(screen.getByText('3')).toBeInTheDocument(); // Total users
      expect(screen.getByText('3')).toBeInTheDocument(); // Total enrollments
      expect(screen.getByText('1')).toBeInTheDocument(); // Pending approvals
      expect(screen.getByText('1')).toBeInTheDocument(); // Approved enrollments
    });

    it('should show loading state when data is loading', () => {
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: [],
        allUsers: [],
        pendingEnrollments: [],
        loading: true,
        error: null,
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: vi.fn(),
        rejectEnrollment: vi.fn(),
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      renderAdminDashboard();

      expect(screen.getByText('Loading enrollments...')).toBeInTheDocument();
      expect(screen.getByText('Loading users...')).toBeInTheDocument();
    });
  });

  describe('Enrollment Management', () => {
    it('should display enrollments correctly', () => {
      renderAdminDashboard();

      // Switch to enrollments tab (should be default)
      expect(screen.getByText('student1@example.com')).toBeInTheDocument();
      expect(screen.getByText('React Development')).toBeInTheDocument();
      expect(screen.getByText('student2@example.com')).toBeInTheDocument();
      expect(screen.getByText('Node.js Backend')).toBeInTheDocument();
    });

    it('should show enrollment status badges correctly', () => {
      renderAdminDashboard();

      const pendingBadge = screen.getByText('pending');
      const approvedBadge = screen.getByText('approved');
      const rejectedBadge = screen.getByText('rejected');

      expect(pendingBadge).toBeInTheDocument();
      expect(approvedBadge).toBeInTheDocument();
      expect(rejectedBadge).toBeInTheDocument();
    });

    it('should show action buttons for pending enrollments only', () => {
      renderAdminDashboard();

      // Should have approve and reject buttons for pending enrollment
      const approveButtons = screen.getAllByText('Approve');
      const rejectButtons = screen.getAllByText('Reject');

      expect(approveButtons).toHaveLength(1); // Only one pending enrollment
      expect(rejectButtons).toHaveLength(1);
    });
  });

  describe('Enrollment Actions', () => {
    it('should approve enrollment successfully', async () => {
      const mockApproveEnrollment = vi.fn().mockResolvedValue(true);
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: mockEnrollments,
        allUsers: mockUsers,
        pendingEnrollments: mockEnrollments.filter(e => e.status === 'pending'),
        loading: false,
        error: null,
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: mockApproveEnrollment,
        rejectEnrollment: vi.fn(),
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      renderAdminDashboard();

      const approveButton = screen.getByText('Approve');
      fireEvent.click(approveButton);

      await waitFor(() => {
        expect(mockApproveEnrollment).toHaveBeenCalledWith('enrollment-1');
      });

      expect(mockToast).toHaveBeenCalledWith({
        title: "✅ Enrollment Approved",
        description: "The enrollment has been approved successfully. The student can now access the course.",
        duration: 5000,
      });
    });

    it('should reject enrollment successfully', async () => {
      const mockRejectEnrollment = vi.fn().mockResolvedValue(true);
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: mockEnrollments,
        allUsers: mockUsers,
        pendingEnrollments: mockEnrollments.filter(e => e.status === 'pending'),
        loading: false,
        error: null,
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: vi.fn(),
        rejectEnrollment: mockRejectEnrollment,
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      renderAdminDashboard();

      const rejectButton = screen.getByText('Reject');
      fireEvent.click(rejectButton);

      await waitFor(() => {
        expect(mockRejectEnrollment).toHaveBeenCalledWith('enrollment-1');
      });

      expect(mockToast).toHaveBeenCalledWith({
        title: "❌ Enrollment Rejected",
        description: "The enrollment has been rejected. The student has been notified.",
        duration: 5000,
      });
    });

    it('should handle approval failure with error message', async () => {
      const mockApproveEnrollment = vi.fn().mockRejectedValue(new Error('Network error'));
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: mockEnrollments,
        allUsers: mockUsers,
        pendingEnrollments: mockEnrollments.filter(e => e.status === 'pending'),
        loading: false,
        error: null,
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: mockApproveEnrollment,
        rejectEnrollment: vi.fn(),
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      renderAdminDashboard();

      const approveButton = screen.getByText('Approve');
      fireEvent.click(approveButton);

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: "Approval Failed",
          description: "Network error",
          variant: "destructive",
          duration: 7000,
          action: expect.any(Object)
        });
      });
    });

    it('should show loading state during enrollment actions', async () => {
      const mockApproveEnrollment = vi.fn().mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(true), 100))
      );
      
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: mockEnrollments,
        allUsers: mockUsers,
        pendingEnrollments: mockEnrollments.filter(e => e.status === 'pending'),
        loading: false,
        error: null,
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: mockApproveEnrollment,
        rejectEnrollment: vi.fn(),
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      renderAdminDashboard();

      const approveButton = screen.getByText('Approve');
      fireEvent.click(approveButton);

      // Should show processing state
      expect(screen.getByText('Approving...')).toBeInTheDocument();
      expect(screen.getByText('Processing...')).toBeInTheDocument();

      await waitFor(() => {
        expect(mockApproveEnrollment).toHaveBeenCalled();
      });
    });
  });

  describe('Bulk Operations', () => {
    it('should allow selecting multiple pending enrollments', () => {
      const multiPendingEnrollments = [
        ...mockEnrollments,
        {
          id: 'enrollment-4',
          user_email: 'student4@example.com',
          course_title: 'Vue.js Development',
          course_id: 'course-4',
          status: 'pending',
          enrolled_at: '2024-01-16T10:00:00Z',
          updated_at: '2024-01-16T10:00:00Z'
        }
      ];

      (useFastDashboard as any).mockReturnValue({
        allEnrollments: multiPendingEnrollments,
        allUsers: mockUsers,
        pendingEnrollments: multiPendingEnrollments.filter(e => e.status === 'pending'),
        loading: false,
        error: null,
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: vi.fn().mockResolvedValue(true),
        rejectEnrollment: vi.fn().mockResolvedValue(true),
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      renderAdminDashboard();

      // Should show select all button
      expect(screen.getByText('Select All Pending')).toBeInTheDocument();

      // Should have checkboxes for pending enrollments
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(2); // Two pending enrollments
    });

    it('should perform bulk approval', async () => {
      const multiPendingEnrollments = [
        ...mockEnrollments,
        {
          id: 'enrollment-4',
          user_email: 'student4@example.com',
          course_title: 'Vue.js Development',
          course_id: 'course-4',
          status: 'pending',
          enrolled_at: '2024-01-16T10:00:00Z',
          updated_at: '2024-01-16T10:00:00Z'
        }
      ];

      const mockApproveEnrollment = vi.fn().mockResolvedValue(true);
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: multiPendingEnrollments,
        allUsers: mockUsers,
        pendingEnrollments: multiPendingEnrollments.filter(e => e.status === 'pending'),
        loading: false,
        error: null,
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: mockApproveEnrollment,
        rejectEnrollment: vi.fn(),
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      renderAdminDashboard();

      // Select all pending enrollments
      const selectAllButton = screen.getByText('Select All Pending');
      fireEvent.click(selectAllButton);

      // Should show bulk action buttons
      await waitFor(() => {
        expect(screen.getByText('Approve Selected')).toBeInTheDocument();
        expect(screen.getByText('Reject Selected')).toBeInTheDocument();
      });

      // Perform bulk approval
      const bulkApproveButton = screen.getByText('Approve Selected');
      fireEvent.click(bulkApproveButton);

      await waitFor(() => {
        expect(mockApproveEnrollment).toHaveBeenCalledTimes(2);
      });

      expect(mockToast).toHaveBeenCalledWith({
        title: "Bulk Approval Complete",
        description: "2 enrollments approved successfully.",
        variant: "default",
        duration: 6000,
      });
    });
  });

  describe('User Management', () => {
    it('should display users in users tab', () => {
      renderAdminDashboard();

      // Switch to users tab
      const usersTab = screen.getByText('Users');
      fireEvent.click(usersTab);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('student1@example.com')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Admin User')).toBeInTheDocument();
    });

    it('should show user roles and approval status', () => {
      renderAdminDashboard();

      const usersTab = screen.getByText('Users');
      fireEvent.click(usersTab);

      const studentBadges = screen.getAllByText('student');
      const adminBadge = screen.getByText('admin');
      const approvedBadges = screen.getAllByText('approved');

      expect(studentBadges).toHaveLength(2);
      expect(adminBadge).toBeInTheDocument();
      expect(approvedBadges).toHaveLength(3);
    });

    it('should display user initials in avatars', () => {
      renderAdminDashboard();

      const usersTab = screen.getByText('Users');
      fireEvent.click(usersTab);

      expect(screen.getByText('JD')).toBeInTheDocument(); // John Doe
      expect(screen.getByText('JS')).toBeInTheDocument(); // Jane Smith
      expect(screen.getByText('AU')).toBeInTheDocument(); // Admin User
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should display error state when data loading fails', () => {
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: [],
        allUsers: [],
        pendingEnrollments: [],
        loading: false,
        error: 'Failed to load dashboard data',
        retryCount: 1,
        isRetrying: false,
        approveEnrollment: vi.fn(),
        rejectEnrollment: vi.fn(),
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      renderAdminDashboard();

      expect(screen.getByText('Error Loading Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Failed to load dashboard data')).toBeInTheDocument();
      expect(screen.getByText('Retry attempt 1/3')).toBeInTheDocument();
    });

    it('should allow retry when error occurs', async () => {
      const mockRefresh = vi.fn();
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: [],
        allUsers: [],
        pendingEnrollments: [],
        loading: false,
        error: 'Network error',
        retryCount: 1,
        isRetrying: false,
        approveEnrollment: vi.fn(),
        rejectEnrollment: vi.fn(),
        refresh: mockRefresh,
        clearError: vi.fn()
      });

      renderAdminDashboard();

      const retryButton = screen.getByText('Retry');
      fireEvent.click(retryButton);

      expect(mockRefresh).toHaveBeenCalled();
    });

    it('should show retry indicator when retrying', () => {
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: mockEnrollments,
        allUsers: mockUsers,
        pendingEnrollments: [],
        loading: false,
        error: 'Connection issues',
        retryCount: 2,
        isRetrying: true,
        approveEnrollment: vi.fn(),
        rejectEnrollment: vi.fn(),
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      renderAdminDashboard();

      expect(screen.getByText('Connection issues detected (auto-retrying...)')).toBeInTheDocument();
      expect(screen.getByText('Retry 2/3')).toBeInTheDocument();
      expect(screen.getByText('Retrying...')).toBeInTheDocument();
    });

    it('should allow dismissing errors', async () => {
      const mockClearError = vi.fn();
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: [],
        allUsers: [],
        pendingEnrollments: [],
        loading: false,
        error: 'Temporary error',
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: vi.fn(),
        rejectEnrollment: vi.fn(),
        refresh: vi.fn(),
        clearError: mockClearError
      });

      renderAdminDashboard();

      const dismissButton = screen.getByText('Dismiss');
      fireEvent.click(dismissButton);

      expect(mockClearError).toHaveBeenCalled();
    });
  });

  describe('Real-time Updates', () => {
    it('should handle real-time enrollment updates', async () => {
      const { rerender } = renderAdminDashboard();

      // Simulate real-time update
      const updatedEnrollments = [
        ...mockEnrollments,
        {
          id: 'enrollment-new',
          user_email: 'newstudent@example.com',
          course_title: 'New Course',
          course_id: 'course-new',
          status: 'pending',
          enrolled_at: '2024-01-17T10:00:00Z',
          updated_at: '2024-01-17T10:00:00Z'
        }
      ];

      (useFastDashboard as any).mockReturnValue({
        allEnrollments: updatedEnrollments,
        allUsers: mockUsers,
        pendingEnrollments: updatedEnrollments.filter(e => e.status === 'pending'),
        loading: false,
        error: null,
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: vi.fn().mockResolvedValue(true),
        rejectEnrollment: vi.fn().mockResolvedValue(true),
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      rerender(
        <BrowserRouter>
          <FastAdminDashboard />
        </BrowserRouter>
      );

      expect(screen.getByText('newstudent@example.com')).toBeInTheDocument();
      expect(screen.getByText('New Course')).toBeInTheDocument();
    });
  });

  describe('Refresh Functionality', () => {
    it('should refresh data when refresh button is clicked', async () => {
      const mockRefresh = vi.fn();
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: mockEnrollments,
        allUsers: mockUsers,
        pendingEnrollments: mockEnrollments.filter(e => e.status === 'pending'),
        loading: false,
        error: null,
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: vi.fn(),
        rejectEnrollment: vi.fn(),
        refresh: mockRefresh,
        clearError: vi.fn()
      });

      renderAdminDashboard();

      const refreshButton = screen.getByText('Refresh');
      fireEvent.click(refreshButton);

      expect(mockRefresh).toHaveBeenCalled();
    });

    it('should disable refresh button when loading', () => {
      (useFastDashboard as any).mockReturnValue({
        allEnrollments: mockEnrollments,
        allUsers: mockUsers,
        pendingEnrollments: [],
        loading: true,
        error: null,
        retryCount: 0,
        isRetrying: false,
        approveEnrollment: vi.fn(),
        rejectEnrollment: vi.fn(),
        refresh: vi.fn(),
        clearError: vi.fn()
      });

      renderAdminDashboard();

      const refreshButton = screen.getByText('Refresh');
      expect(refreshButton).toBeDisabled();
    });
  });
});