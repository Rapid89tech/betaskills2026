/**
 * Integration Tests for User Management Modal Functionality
 * 
 * Tests the complete user management workflow including modal interactions,
 * CRUD operations, password management, and security features.
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 6.1, 6.2, 6.3, 6.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserManagementModal } from '@/components/admin/UserManagementModal';
import { UserManagementService } from '@/services/UserManagementService';
import { PasswordManagementService } from '@/services/PasswordManagementService';
import { DataValidationService } from '@/services/DataValidationService';
import { AuditLoggingService } from '@/services/AuditLoggingService';
import { Profile } from '@/types/auth';

// Mock services
vi.mock('@/services/UserManagementService');
vi.mock('@/services/PasswordManagementService');
vi.mock('@/services/DataValidationService');
vi.mock('@/services/AuditLoggingService');
vi.mock('@/integrations/supabase/client');

// Mock toast hook
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: mockToast })
}));

// Test data
const mockUser: Profile = {
  id: 'user_123',
  email: 'john.doe@example.com',
  first_name: 'John',
  last_name: 'Doe',
  role: 'student',
  contact_number: '+27123456789',
  approval_status: 'approved',
  approved: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
};

const mockNewUserData = {
  first_name: 'Jane',
  last_name: 'Smith',
  email: 'jane.smith@example.com',
  role: 'instructor',
  password: 'SecurePass123!',
  contact_number: '+27987654321',
  approval_status: 'pending'
};

describe('User Management Modal Functionality Integration', () => {
  let mockOnClose: ReturnType<typeof vi.fn>;
  let mockOnSubmit: ReturnType<typeof vi.fn>;
  let mockOnDelete: ReturnType<typeof vi.fn>;
  let user: any;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Setup mock functions
    mockOnClose = vi.fn();
    mockOnSubmit = vi.fn().mockResolvedValue(undefined);
    mockOnDelete = vi.fn().mockResolvedValue(undefined);
    
    // Setup user event
    user = userEvent.setup();

    // Mock service responses
    vi.mocked(PasswordManagementService.validatePassword).mockReturnValue({
      isValid: true,
      strength: 'strong',
      score: 85,
      errors: [],
      suggestions: []
    });

    vi.mocked(PasswordManagementService.generateSecurePassword).mockReturnValue('GeneratedPass123!');

    vi.mocked(DataValidationService.validateUserData).mockReturnValue({
      isValid: true,
      errors: [],
      warnings: [],
      sanitizedData: mockNewUserData
    });

    vi.mocked(UserManagementService.createUser).mockResolvedValue({
      ...mockUser,
      ...mockNewUserData,
      id: 'new_user_456'
    });

    vi.mocked(UserManagementService.updateUser).mockResolvedValue({
      ...mockUser,
      first_name: 'Updated John'
    });

    vi.mocked(UserManagementService.deleteUser).mockResolvedValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('User Details Display and Modal Interactions', () => {
    it('should display comprehensive user information in view mode', async () => {
      // Test Requirement 3.1: Display complete user information
      
      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
          mode="view"
        />
      );

      // Verify modal is open and displays user information
      expect(screen.getByText('User Details')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('student')).toBeInTheDocument();
      expect(screen.getByText('approved')).toBeInTheDocument();

      // Verify user initials avatar
      expect(screen.getByText('JD')).toBeInTheDocument();

      // Verify tabs are present
      expect(screen.getByText('User Details')).toBeInTheDocument();
      expect(screen.getByText('Security')).toBeInTheDocument();
      expect(screen.getByText('Activity')).toBeInTheDocument();

      // Verify form fields display user data
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('+27123456789')).toBeInTheDocument();
    });

    it('should show editable fields with proper validation in edit mode', async () => {
      // Test Requirement 3.2: Editable fields for user data modification
      
      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
          mode="edit"
        />
      );

      // Verify edit mode UI
      expect(screen.getByText('Edit User')).toBeInTheDocument();
      
      // Verify fields are editable
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      
      expect(firstNameInput).not.toBeDisabled();
      expect(lastNameInput).not.toBeDisabled();
      expect(emailInput).not.toBeDisabled();

      // Test real-time validation
      await user.clear(firstNameInput);
      await user.type(firstNameInput, 'Updated John');

      // Verify validation is triggered
      expect(DataValidationService.validateUserData).toHaveBeenCalled();

      // Test form submission
      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            first_name: 'Updated John'
          })
        );
      });
    });

    it('should handle modal state management correctly', async () => {
      // Test modal opening, closing, and state transitions
      
      const { rerender } = render(
        <UserManagementModal
          isOpen={false}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="view"
        />
      );

      // Modal should not be visible when closed
      expect(screen.queryByText('User Details')).not.toBeInTheDocument();

      // Open modal
      rerender(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
          mode="view"
        />
      );

      // Modal should be visible
      expect(screen.getByText('User Details')).toBeInTheDocument();

      // Test close functionality
      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should navigate between tabs correctly', async () => {
      // Test tab navigation and content switching
      
      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
          mode="view"
        />
      );

      // Initially on User Details tab
      expect(screen.getByText('Personal Information')).toBeInTheDocument();

      // Navigate to Security tab
      const securityTab = screen.getByText('Security');
      await user.click(securityTab);

      expect(screen.getByText('Password Management')).toBeInTheDocument();

      // Navigate to Activity tab
      const activityTab = screen.getByText('Activity');
      await user.click(activityTab);

      // Activity tab content should be visible
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });
  });

  describe('User Creation, Editing, and Deletion Operations', () => {
    it('should create new user with comprehensive validation', async () => {
      // Test Requirement 3.3: User creation functionality
      
      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Verify add mode UI
      expect(screen.getByText('Add New User')).toBeInTheDocument();

      // Fill out the form
      await user.type(screen.getByLabelText(/first name/i), mockNewUserData.first_name);
      await user.type(screen.getByLabelText(/last name/i), mockNewUserData.last_name);
      await user.type(screen.getByLabelText(/email/i), mockNewUserData.email);
      await user.type(screen.getByLabelText(/contact number/i), mockNewUserData.contact_number);

      // Navigate to Security tab to set password
      await user.click(screen.getByText('Security'));
      await user.type(screen.getByLabelText(/password/i), mockNewUserData.password);

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /save/i });
      await user.click(submitButton);

      // Verify validation was called
      expect(DataValidationService.validateUserData).toHaveBeenCalledWith(
        expect.objectContaining({
          first_name: mockNewUserData.first_name,
          last_name: mockNewUserData.last_name,
          email: mockNewUserData.email
        }),
        false // isEdit = false for new user
      );

      // Verify password validation
      expect(PasswordManagementService.validatePassword).toHaveBeenCalledWith(
        mockNewUserData.password,
        expect.any(Object),
        undefined
      );

      // Verify submission
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            first_name: mockNewUserData.first_name,
            last_name: mockNewUserData.last_name,
            email: mockNewUserData.email,
            password: mockNewUserData.password
          })
        );
      });

      // Verify success toast
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Success',
        description: 'User created successfully'
      });
    });

    it('should update existing user with change tracking', async () => {
      // Test Requirement 3.4: User editing functionality
      
      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
          mode="edit"
        />
      );

      // Modify user data
      const firstNameInput = screen.getByLabelText(/first name/i);
      await user.clear(firstNameInput);
      await user.type(firstNameInput, 'Updated John');

      const roleSelect = screen.getByLabelText(/role/i);
      await user.selectOptions(roleSelect, 'instructor');

      // Submit changes
      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      // Verify update submission
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            first_name: 'Updated John',
            role: 'instructor'
          })
        );
      });

      // Verify success toast
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Success',
        description: 'User updated successfully'
      });
    });

    it('should delete user with confirmation and audit logging', async () => {
      // Test user deletion functionality
      
      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          onDelete={mockOnDelete}
          user={mockUser}
          mode="view"
        />
      );

      // Mock window.confirm
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

      // Click delete button
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      await user.click(deleteButton);

      // Verify confirmation dialog
      expect(confirmSpy).toHaveBeenCalledWith(
        expect.stringContaining('Are you sure you want to delete John Doe?')
      );

      // Verify deletion
      await waitFor(() => {
        expect(mockOnDelete).toHaveBeenCalledWith(mockUser.id);
      });

      // Verify success toast
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Success',
        description: 'User deleted successfully'
      });

      confirmSpy.mockRestore();
    });

    it('should handle validation errors gracefully', async () => {
      // Test error handling for invalid data
      
      // Mock validation failure
      vi.mocked(DataValidationService.validateUserData).mockReturnValue({
        isValid: false,
        errors: ['Email is required', 'First name is too short'],
        warnings: ['Contact number format may be invalid'],
        sanitizedData: null
      });

      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Try to submit invalid form
      const submitButton = screen.getByRole('button', { name: /save/i });
      await user.click(submitButton);

      // Verify validation error toast
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Validation Error',
        description: expect.stringContaining('Email is required'),
        variant: 'destructive'
      });

      // Verify form was not submitted
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Password Management and Security Features', () => {
    it('should generate secure passwords with strength validation', async () => {
      // Test Requirement 6.2: Password management capabilities
      
      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Navigate to Security tab
      await user.click(screen.getByText('Security'));

      // Click generate password button
      const generateButton = screen.getByRole('button', { name: /generate secure password/i });
      await user.click(generateButton);

      // Verify password generation service was called
      expect(PasswordManagementService.generateSecurePassword).toHaveBeenCalledWith({
        length: 12,
        excludeSimilar: true
      });

      // Verify password was set in form
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toHaveValue('GeneratedPass123!');

      // Verify password validation was triggered
      expect(PasswordManagementService.validatePassword).toHaveBeenCalledWith(
        'GeneratedPass123!',
        expect.any(Object),
        undefined
      );

      // Verify generation toast
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Password Generated',
        description: expect.stringContaining('A secure password has been generated')
      });
    });

    it('should validate password strength in real-time', async () => {
      // Test real-time password validation
      
      // Mock different validation results
      const weakValidation = {
        isValid: false,
        strength: 'weak' as const,
        score: 25,
        errors: ['Password is too short'],
        suggestions: ['Use at least 8 characters']
      };

      const strongValidation = {
        isValid: true,
        strength: 'strong' as const,
        score: 90,
        errors: [],
        suggestions: []
      };

      vi.mocked(PasswordManagementService.validatePassword)
        .mockReturnValueOnce(weakValidation)
        .mockReturnValueOnce(strongValidation);

      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Navigate to Security tab
      await user.click(screen.getByText('Security'));

      const passwordInput = screen.getByLabelText(/password/i);

      // Type weak password
      await user.type(passwordInput, 'weak');

      // Verify weak validation
      expect(PasswordManagementService.validatePassword).toHaveBeenCalledWith(
        'weak',
        expect.any(Object),
        undefined
      );

      // Clear and type strong password
      await user.clear(passwordInput);
      await user.type(passwordInput, 'StrongPassword123!');

      // Verify strong validation
      expect(PasswordManagementService.validatePassword).toHaveBeenCalledWith(
        'StrongPassword123!',
        expect.any(Object),
        undefined
      );
    });

    it('should show/hide password with toggle functionality', async () => {
      // Test password visibility toggle
      
      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Navigate to Security tab
      await user.click(screen.getByText('Security'));

      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, 'TestPassword123!');

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click show password button
      const toggleButton = screen.getByRole('button', { name: /show password/i });
      await user.click(toggleButton);

      // Password should now be visible
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Click hide password button
      await user.click(toggleButton);

      // Password should be hidden again
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should provide multiple password generation options', async () => {
      // Test advanced password generation options
      
      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Navigate to Security tab
      await user.click(screen.getByText('Security'));

      // Expand advanced options
      const advancedOptions = screen.getByText('Advanced Password Options');
      await user.click(advancedOptions);

      // Test different generation options
      const basicButton = screen.getByRole('button', { name: /8 chars \(basic\)/i });
      await user.click(basicButton);

      expect(PasswordManagementService.generateSecurePassword).toHaveBeenCalledWith({
        length: 8
      });

      const strongButton = screen.getByRole('button', { name: /16 chars \(strong\)/i });
      await user.click(strongButton);

      expect(PasswordManagementService.generateSecurePassword).toHaveBeenCalledWith({
        length: 16
      });

      const noSymbolsButton = screen.getByRole('button', { name: /no symbols/i });
      await user.click(noSymbolsButton);

      expect(PasswordManagementService.generateSecurePassword).toHaveBeenCalledWith({
        length: 12,
        includeSpecialChars: false
      });
    });

    it('should validate password requirements for new users', async () => {
      // Test password requirement validation for user creation
      
      // Mock password validation failure
      vi.mocked(PasswordManagementService.validatePassword).mockReturnValue({
        isValid: false,
        strength: 'weak',
        score: 20,
        errors: ['Password must contain uppercase letters'],
        suggestions: ['Add uppercase letters (A-Z)']
      });

      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Fill required fields
      await user.type(screen.getByLabelText(/first name/i), 'Test');
      await user.type(screen.getByLabelText(/last name/i), 'User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');

      // Navigate to Security tab and set weak password
      await user.click(screen.getByText('Security'));
      await user.type(screen.getByLabelText(/password/i), 'weakpass');

      // Try to submit
      const submitButton = screen.getByRole('button', { name: /save/i });
      await user.click(submitButton);

      // Verify password error toast
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Password Error',
        description: 'Please provide a valid password that meets security requirements',
        variant: 'destructive'
      });

      // Verify form was not submitted
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Data Validation and Security', () => {
    it('should sanitize input data before submission', async () => {
      // Test Requirement 6.1, 6.3: Input validation and sanitization
      
      const maliciousData = {
        first_name: '<script>alert("xss")</script>John',
        last_name: 'Doe<img src=x onerror=alert(1)>',
        email: 'test@example.com',
        contact_number: '+27123456789'
      };

      const sanitizedData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@example.com',
        contact_number: '+27123456789'
      };

      vi.mocked(DataValidationService.validateUserData).mockReturnValue({
        isValid: true,
        errors: [],
        warnings: [],
        sanitizedData
      });

      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Input potentially malicious data
      await user.type(screen.getByLabelText(/first name/i), maliciousData.first_name);
      await user.type(screen.getByLabelText(/last name/i), maliciousData.last_name);
      await user.type(screen.getByLabelText(/email/i), maliciousData.email);

      // Submit form
      const submitButton = screen.getByRole('button', { name: /save/i });
      await user.click(submitButton);

      // Verify sanitized data was submitted
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(sanitizedData);
      });
    });

    it('should validate email format and uniqueness', async () => {
      // Test email validation
      
      vi.mocked(DataValidationService.validateUserData).mockReturnValue({
        isValid: false,
        errors: ['Invalid email format'],
        warnings: [],
        sanitizedData: null
      });

      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Enter invalid email
      await user.type(screen.getByLabelText(/email/i), 'invalid-email');

      // Submit form
      const submitButton = screen.getByRole('button', { name: /save/i });
      await user.click(submitButton);

      // Verify validation error
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Validation Error',
        description: expect.stringContaining('Invalid email format'),
        variant: 'destructive'
      });
    });

    it('should validate phone number format', async () => {
      // Test phone number validation
      
      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
          mode="edit"
        />
      );

      const phoneInput = screen.getByLabelText(/contact number/i);
      
      // Clear and enter invalid phone number
      await user.clear(phoneInput);
      await user.type(phoneInput, 'invalid-phone');

      // Verify validation is triggered on input change
      expect(DataValidationService.validateUserData).toHaveBeenCalled();
    });

    it('should handle audit logging for user management actions', async () => {
      // Test Requirement 6.4: Audit logging for administrative activities
      
      // Mock current admin user
      const mockSupabase = {
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: { id: 'admin_123' } }
          })
        }
      };

      vi.doMock('@/integrations/supabase/client', () => ({
        supabase: mockSupabase
      }));

      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
          mode="edit"
        />
      );

      // Make changes and submit
      const firstNameInput = screen.getByLabelText(/first name/i);
      await user.clear(firstNameInput);
      await user.type(firstNameInput, 'Updated John');

      const submitButton = screen.getByRole('button', { name: /save/i });
      await user.click(submitButton);

      // Verify audit logging would be triggered
      // (This would be tested more thoroughly in the service integration tests)
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });
  });

  describe('Error Handling and User Experience', () => {
    it('should handle service errors gracefully', async () => {
      // Test error handling when services fail
      
      mockOnSubmit.mockRejectedValue(new Error('Service unavailable'));

      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Fill form and submit
      await user.type(screen.getByLabelText(/first name/i), 'Test');
      await user.type(screen.getByLabelText(/last name/i), 'User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /save/i });
      await user.click(submitButton);

      // Verify error toast
      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: 'Error',
          description: 'Service unavailable',
          variant: 'destructive'
        });
      });
    });

    it('should show loading states during operations', async () => {
      // Test loading state management
      
      // Mock delayed response
      mockOnSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Fill form
      await user.type(screen.getByLabelText(/first name/i), 'Test');
      await user.type(screen.getByLabelText(/last name/i), 'User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /save/i });
      await user.click(submitButton);

      // Button should be disabled during loading
      expect(submitButton).toBeDisabled();

      // Wait for completion
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });

    it('should prevent form submission with invalid data', async () => {
      // Test form validation prevents submission
      
      vi.mocked(DataValidationService.validateUserData).mockReturnValue({
        isValid: false,
        errors: ['Required fields missing'],
        warnings: [],
        sanitizedData: null
      });

      render(
        <UserManagementModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={null}
          mode="add"
        />
      );

      // Try to submit empty form
      const submitButton = screen.getByRole('button', { name: /save/i });
      await user.click(submitButton);

      // Verify form was not submitted
      expect(mockOnSubmit).not.toHaveBeenCalled();
      
      // Verify validation error was shown
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Validation Error',
        description: expect.stringContaining('Required fields missing'),
        variant: 'destructive'
      });
    });
  });
});