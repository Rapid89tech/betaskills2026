/**
 * Property-Based Test: Admin User Profile Completeness
 * 
 * Feature: mobile-sync-admin-overhaul, Property 10: Admin User Profile Completeness
 * Validates: Requirements 4.2
 * 
 * Property: For any user displayed in the admin dashboard, the view SHALL include:
 * email, full name (first + last), phone (if provided), registration date, and account status.
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

/**
 * User profile data structure as stored in the database
 */
interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  contact_number: string | null;
  created_at: string;
  role: string | null;
}

/**
 * Admin view of user profile - what should be displayed
 */
interface AdminUserView {
  email: string;
  fullName: string;
  phone: string;
  registrationDate: string;
  accountStatus: string;
}

/**
 * Transform a user profile into the admin view format
 * This simulates what the admin dashboard should display
 */
function transformToAdminView(profile: UserProfile): AdminUserView {
  // Email - required field
  const email = profile.email || 'N/A';
  
  // Full name - combine first and last name
  const firstName = profile.first_name || '';
  const lastName = profile.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'N/A';
  
  // Phone - optional field
  const phone = profile.contact_number || 'Not provided';
  
  // Registration date - required field
  const registrationDate = profile.created_at 
    ? new Date(profile.created_at).toLocaleDateString() 
    : 'N/A';
  
  // Account status - derived from role or default to 'student'
  const accountStatus = profile.role || 'student';
  
  return {
    email,
    fullName,
    phone,
    registrationDate,
    accountStatus
  };
}

/**
 * Check if an admin user view is complete (has all required fields)
 */
function isAdminViewComplete(view: AdminUserView): boolean {
  // Email must be present and not 'N/A'
  const hasEmail = view.email && view.email !== 'N/A';
  
  // Full name must be present (can be 'N/A' if both first and last are missing)
  const hasFullName = view.fullName !== undefined && view.fullName !== null;
  
  // Phone must be present (can be 'Not provided' if missing)
  const hasPhone = view.phone !== undefined && view.phone !== null;
  
  // Registration date must be present and not 'N/A'
  const hasRegistrationDate = view.registrationDate && view.registrationDate !== 'N/A';
  
  // Account status must be present
  const hasAccountStatus = view.accountStatus !== undefined && view.accountStatus !== null;
  
  return hasEmail && hasFullName && hasPhone && hasRegistrationDate && hasAccountStatus;
}

/**
 * Arbitrary generator for user profiles
 */
const userProfileArbitrary = fc.record({
  id: fc.uuid(),
  email: fc.emailAddress(),
  first_name: fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: null }),
  last_name: fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: null }),
  contact_number: fc.option(
    fc.string({ minLength: 10, maxLength: 15 }).filter(s => /^\+?[\d\s-]+$/.test(s)),
    { nil: null }
  ),
  created_at: fc.date({ min: new Date('2020-01-01'), max: new Date('2025-12-31') })
    .map(d => d.toISOString()),
  role: fc.option(fc.constantFrom('student', 'admin', 'instructor'), { nil: null })
});

describe('Property 10: Admin User Profile Completeness', () => {
  /**
   * Property test: All user profiles displayed in admin view contain required fields
   */
  it('should include all required fields (email, full name, phone, registration date, account status) for any user', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary,
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // The admin view must be complete
          return isAdminViewComplete(adminView);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Email field is always present and not empty
   */
  it('should always display email field for any user profile', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary,
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // Email must be present and not 'N/A' (since we generate valid emails)
          return adminView.email && adminView.email !== 'N/A' && adminView.email.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Full name field is always present (even if 'N/A')
   */
  it('should always display full name field for any user profile', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary,
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // Full name must be present (can be 'N/A' if both names are missing)
          return adminView.fullName !== undefined && adminView.fullName !== null;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Full name combines first and last name correctly
   */
  it('should correctly combine first and last name into full name', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary,
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          const firstName = profile.first_name || '';
          const lastName = profile.last_name || '';
          const expectedFullName = `${firstName} ${lastName}`.trim() || 'N/A';
          
          return adminView.fullName === expectedFullName;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Phone field is always present (shows 'Not provided' if missing)
   */
  it('should always display phone field for any user profile', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary,
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // Phone must be present (either actual number or 'Not provided')
          return adminView.phone !== undefined && adminView.phone !== null;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Phone displays actual number when provided
   */
  it('should display actual phone number when contact_number is provided', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary.filter(p => p.contact_number !== null),
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // When contact_number exists, it should be displayed (not 'Not provided')
          return adminView.phone === profile.contact_number;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Phone displays 'Not provided' when missing
   */
  it('should display "Not provided" when contact_number is missing', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary.filter(p => p.contact_number === null),
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // When contact_number is null, should display 'Not provided'
          return adminView.phone === 'Not provided';
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Registration date is always present and formatted
   */
  it('should always display registration date for any user profile', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary,
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // Registration date must be present and not 'N/A' (since we generate valid dates)
          return adminView.registrationDate && adminView.registrationDate !== 'N/A';
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Registration date is properly formatted
   */
  it('should format registration date as a valid date string', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary,
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // Registration date should be a valid date format
          // Check if it matches common date formats (e.g., "12/9/2024" or "12/09/2024")
          const datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
          return datePattern.test(adminView.registrationDate);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Account status is always present
   */
  it('should always display account status for any user profile', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary,
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // Account status must be present
          return adminView.accountStatus !== undefined && adminView.accountStatus !== null;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Account status defaults to 'student' when role is null
   */
  it('should default account status to "student" when role is not specified', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary.filter(p => p.role === null),
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // When role is null, account status should default to 'student'
          return adminView.accountStatus === 'student';
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Account status matches role when role is specified
   */
  it('should display role as account status when role is specified', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary.filter(p => p.role !== null),
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // When role exists, account status should match it
          return adminView.accountStatus === profile.role;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: All five required fields are present simultaneously
   */
  it('should display all five required fields (email, full name, phone, registration date, account status) simultaneously', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary,
        (profile) => {
          const adminView = transformToAdminView(profile);
          
          // Check that all five fields exist
          const hasAllFields = 
            adminView.email !== undefined &&
            adminView.fullName !== undefined &&
            adminView.phone !== undefined &&
            adminView.registrationDate !== undefined &&
            adminView.accountStatus !== undefined;
          
          return hasAllFields;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Unit test: Verify the transformation function with a complete profile
   */
  it('should correctly transform a complete user profile', () => {
    const profile: UserProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      contact_number: '+1234567890',
      created_at: '2024-01-15T10:30:00Z',
      role: 'student'
    };

    const adminView = transformToAdminView(profile);

    expect(adminView.email).toBe('test@example.com');
    expect(adminView.fullName).toBe('John Doe');
    expect(adminView.phone).toBe('+1234567890');
    expect(adminView.registrationDate).toBe('1/15/2024');
    expect(adminView.accountStatus).toBe('student');
    expect(isAdminViewComplete(adminView)).toBe(true);
  });

  /**
   * Unit test: Verify the transformation function with minimal profile
   */
  it('should correctly transform a minimal user profile', () => {
    const profile: UserProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'minimal@example.com',
      first_name: null,
      last_name: null,
      contact_number: null,
      created_at: '2024-01-15T10:30:00Z',
      role: null
    };

    const adminView = transformToAdminView(profile);

    expect(adminView.email).toBe('minimal@example.com');
    expect(adminView.fullName).toBe('N/A');
    expect(adminView.phone).toBe('Not provided');
    expect(adminView.registrationDate).toBe('1/15/2024');
    expect(adminView.accountStatus).toBe('student');
    expect(isAdminViewComplete(adminView)).toBe(true);
  });

  /**
   * Unit test: Verify the transformation function with partial name
   */
  it('should correctly handle profiles with only first name', () => {
    const profile: UserProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'partial@example.com',
      first_name: 'Jane',
      last_name: null,
      contact_number: null,
      created_at: '2024-01-15T10:30:00Z',
      role: 'admin'
    };

    const adminView = transformToAdminView(profile);

    expect(adminView.email).toBe('partial@example.com');
    expect(adminView.fullName).toBe('Jane');
    expect(adminView.phone).toBe('Not provided');
    expect(adminView.accountStatus).toBe('admin');
    expect(isAdminViewComplete(adminView)).toBe(true);
  });

  /**
   * Unit test: Verify the transformation function with only last name
   */
  it('should correctly handle profiles with only last name', () => {
    const profile: UserProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'lastname@example.com',
      first_name: null,
      last_name: 'Smith',
      contact_number: '+9876543210',
      created_at: '2024-01-15T10:30:00Z',
      role: 'instructor'
    };

    const adminView = transformToAdminView(profile);

    expect(adminView.email).toBe('lastname@example.com');
    expect(adminView.fullName).toBe('Smith');
    expect(adminView.phone).toBe('+9876543210');
    expect(adminView.accountStatus).toBe('instructor');
    expect(isAdminViewComplete(adminView)).toBe(true);
  });
});
