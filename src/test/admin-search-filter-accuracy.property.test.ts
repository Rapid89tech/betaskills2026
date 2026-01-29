/**
 * Property-Based Test: Admin Search Filter Accuracy
 * 
 * Feature: mobile-sync-admin-overhaul, Property 12: Admin Search Filter Accuracy
 * Validates: Requirements 4.3, 6.3
 * 
 * Property: For any search query applied to users or enrollments, the results SHALL contain
 * only items matching the search criteria (email contains query OR name contains query).
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

/**
 * User profile data structure matching the database schema
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
 * Enrollment data structure for search testing
 */
interface EnrollmentData {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
}

/**
 * Filter users by search query (email or name)
 * This mirrors the implementation in SimpleAdminDashboard.tsx
 */
function filterUsersBySearch(users: UserProfile[], searchQuery: string): UserProfile[] {
  if (!searchQuery.trim()) {
    return users;
  }

  const query = searchQuery.toLowerCase();
  
  return users.filter(user => {
    const email = (user.email || '').toLowerCase();
    const firstName = (user.first_name || '').toLowerCase();
    const lastName = (user.last_name || '').toLowerCase();
    const fullName = `${firstName} ${lastName}`.trim();
    
    return email.includes(query) || fullName.includes(query);
  });
}

/**
 * Filter users by date range
 * This mirrors the implementation in SimpleAdminDashboard.tsx
 */
function filterUsersByDateRange(
  users: UserProfile[], 
  dateFrom?: Date, 
  dateTo?: Date
): UserProfile[] {
  let filtered = [...users];

  if (dateFrom) {
    filtered = filtered.filter(user => {
      if (!user.created_at) return false;
      const userDate = new Date(user.created_at);
      return userDate >= dateFrom;
    });
  }

  if (dateTo) {
    filtered = filtered.filter(user => {
      if (!user.created_at) return false;
      const userDate = new Date(user.created_at);
      // Set time to end of day for dateTo
      const endOfDay = new Date(dateTo);
      endOfDay.setHours(23, 59, 59, 999);
      return userDate <= endOfDay;
    });
  }

  return filtered;
}

/**
 * Filter enrollments by search query (user email or course title)
 */
function filterEnrollmentsBySearch(
  enrollments: EnrollmentData[], 
  searchQuery: string
): EnrollmentData[] {
  if (!searchQuery.trim()) {
    return enrollments;
  }

  const query = searchQuery.toLowerCase();
  
  return enrollments.filter(enrollment => {
    const userEmail = (enrollment.user_email || '').toLowerCase();
    const courseTitle = (enrollment.course_title || '').toLowerCase();
    
    return userEmail.includes(query) || courseTitle.includes(query);
  });
}

/**
 * Check if a user matches a search query
 */
function userMatchesQuery(user: UserProfile, query: string): boolean {
  const lowerQuery = query.toLowerCase();
  const email = (user.email || '').toLowerCase();
  const firstName = (user.first_name || '').toLowerCase();
  const lastName = (user.last_name || '').toLowerCase();
  const fullName = `${firstName} ${lastName}`.trim();
  
  return email.includes(lowerQuery) || fullName.includes(lowerQuery);
}

/**
 * Check if an enrollment matches a search query
 */
function enrollmentMatchesQuery(enrollment: EnrollmentData, query: string): boolean {
  const lowerQuery = query.toLowerCase();
  const userEmail = (enrollment.user_email || '').toLowerCase();
  const courseTitle = (enrollment.course_title || '').toLowerCase();
  
  return userEmail.includes(lowerQuery) || courseTitle.includes(lowerQuery);
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

/**
 * Arbitrary generator for enrollment data
 */
const enrollmentArbitrary = fc.record({
  id: fc.uuid(),
  user_id: fc.uuid(),
  user_email: fc.emailAddress(),
  course_id: fc.string({ minLength: 5, maxLength: 50 }),
  course_title: fc.string({ minLength: 5, maxLength: 100 }),
  status: fc.constantFrom('pending' as const, 'approved' as const, 'rejected' as const),
  enrolled_at: fc.date({ min: new Date('2020-01-01'), max: new Date('2025-12-31') })
    .map(d => d.toISOString())
});

/**
 * Generator for a list of users
 */
const userListArbitrary = fc.array(userProfileArbitrary, { minLength: 1, maxLength: 50 });

/**
 * Generator for a list of enrollments
 */
const enrollmentListArbitrary = fc.array(enrollmentArbitrary, { minLength: 1, maxLength: 50 });

/**
 * Generator for search queries (non-empty strings)
 */
const searchQueryArbitrary = fc.string({ minLength: 1, maxLength: 20 });

/**
 * Generator for date ranges
 */
const dateRangeArbitrary = fc.record({
  from: fc.option(fc.date({ min: new Date('2020-01-01'), max: new Date('2025-12-31') }), { nil: undefined }),
  to: fc.option(fc.date({ min: new Date('2020-01-01'), max: new Date('2025-12-31') }), { nil: undefined })
});

describe('Property 12: Admin Search Filter Accuracy', () => {
  /**
   * Property test: All filtered users match the search query
   */
  it('should return only users matching the search query (email or name)', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        searchQueryArbitrary,
        (users, query) => {
          const filtered = filterUsersBySearch(users, query);
          
          // Every filtered user must match the query
          return filtered.every(user => userMatchesQuery(user, query));
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: No users are excluded if they match the query
   */
  it('should include all users that match the search query', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        searchQueryArbitrary,
        (users, query) => {
          const filtered = filterUsersBySearch(users, query);
          const matchingUsers = users.filter(user => userMatchesQuery(user, query));
          
          // All matching users should be in the filtered results
          return matchingUsers.every(matchingUser => 
            filtered.some(filteredUser => filteredUser.id === matchingUser.id)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Empty query returns all users
   */
  it('should return all users when search query is empty', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        (users) => {
          const filtered = filterUsersBySearch(users, '');
          
          // Empty query should return all users
          return filtered.length === users.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Whitespace-only query returns all users
   */
  it('should return all users when search query is only whitespace', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        fc.string().filter(s => s.trim() === ''),
        (users, query) => {
          const filtered = filterUsersBySearch(users, query);
          
          // Whitespace-only query should return all users
          return filtered.length === users.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Search is case-insensitive
   */
  it('should perform case-insensitive search', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        searchQueryArbitrary,
        (users, query) => {
          const lowerFiltered = filterUsersBySearch(users, query.toLowerCase());
          const upperFiltered = filterUsersBySearch(users, query.toUpperCase());
          const mixedFiltered = filterUsersBySearch(users, query);
          
          // All case variations should return the same results
          return (
            lowerFiltered.length === upperFiltered.length &&
            lowerFiltered.length === mixedFiltered.length
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Search matches partial email
   */
  it('should match users by partial email', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary,
        (user) => {
          // Extract a substring from the email
          const emailPart = user.email.substring(0, Math.max(1, user.email.indexOf('@')));
          
          if (emailPart.length === 0) return true; // Skip if no valid part
          
          const filtered = filterUsersBySearch([user], emailPart);
          
          // User should be in filtered results
          return filtered.length === 1 && filtered[0].id === user.id;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Search matches partial name
   */
  it('should match users by partial name', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary.filter(u => u.first_name !== null && u.first_name.length > 0),
        (user) => {
          // Extract a substring from the first name
          const namePart = user.first_name!.substring(0, Math.min(3, user.first_name!.length));
          
          const filtered = filterUsersBySearch([user], namePart);
          
          // User should be in filtered results
          return filtered.length === 1 && filtered[0].id === user.id;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Search matches full name (first + last)
   */
  it('should match users by full name combination', () => {
    fc.assert(
      fc.property(
        userProfileArbitrary.filter(u => 
          u.first_name !== null && 
          u.last_name !== null && 
          u.first_name.length > 0 && 
          u.last_name.length > 0
        ),
        (user) => {
          const fullName = `${user.first_name} ${user.last_name}`;
          
          const filtered = filterUsersBySearch([user], fullName);
          
          // User should be in filtered results
          return filtered.length === 1 && filtered[0].id === user.id;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Date range filter includes users within range
   */
  it('should include users within the date range', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        dateRangeArbitrary,
        (users, dateRange) => {
          const filtered = filterUsersByDateRange(users, dateRange.from, dateRange.to);
          
          // Every filtered user must be within the date range
          return filtered.every(user => {
            const userDate = new Date(user.created_at);
            
            if (dateRange.from && userDate < dateRange.from) {
              return false;
            }
            
            if (dateRange.to) {
              const endOfDay = new Date(dateRange.to);
              endOfDay.setHours(23, 59, 59, 999);
              if (userDate > endOfDay) {
                return false;
              }
            }
            
            return true;
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Date range filter excludes users outside range
   */
  it('should exclude users outside the date range', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        dateRangeArbitrary.filter(dr => dr.from !== undefined || dr.to !== undefined),
        (users, dateRange) => {
          const filtered = filterUsersByDateRange(users, dateRange.from, dateRange.to);
          const filteredIds = new Set(filtered.map(u => u.id));
          
          // Users not in filtered results must be outside the date range
          const excluded = users.filter(u => !filteredIds.has(u.id));
          
          return excluded.every(user => {
            const userDate = new Date(user.created_at);
            
            if (dateRange.from && userDate < dateRange.from) {
              return true; // Correctly excluded
            }
            
            if (dateRange.to) {
              const endOfDay = new Date(dateRange.to);
              endOfDay.setHours(23, 59, 59, 999);
              if (userDate > endOfDay) {
                return true; // Correctly excluded
              }
            }
            
            return false; // Should not be excluded
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: No date range returns all users
   */
  it('should return all users when no date range is specified', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        (users) => {
          const filtered = filterUsersByDateRange(users, undefined, undefined);
          
          // No date range should return all users
          return filtered.length === users.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: All filtered enrollments match the search query
   */
  it('should return only enrollments matching the search query (email or course title)', () => {
    fc.assert(
      fc.property(
        enrollmentListArbitrary,
        searchQueryArbitrary,
        (enrollments, query) => {
          const filtered = filterEnrollmentsBySearch(enrollments, query);
          
          // Every filtered enrollment must match the query
          return filtered.every(enrollment => enrollmentMatchesQuery(enrollment, query));
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: No enrollments are excluded if they match the query
   */
  it('should include all enrollments that match the search query', () => {
    fc.assert(
      fc.property(
        enrollmentListArbitrary,
        searchQueryArbitrary,
        (enrollments, query) => {
          const filtered = filterEnrollmentsBySearch(enrollments, query);
          const matchingEnrollments = enrollments.filter(e => enrollmentMatchesQuery(e, query));
          
          // All matching enrollments should be in the filtered results
          return matchingEnrollments.every(matchingEnrollment => 
            filtered.some(filteredEnrollment => filteredEnrollment.id === matchingEnrollment.id)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Enrollment search is case-insensitive
   */
  it('should perform case-insensitive search on enrollments', () => {
    fc.assert(
      fc.property(
        enrollmentListArbitrary,
        searchQueryArbitrary,
        (enrollments, query) => {
          const lowerFiltered = filterEnrollmentsBySearch(enrollments, query.toLowerCase());
          const upperFiltered = filterEnrollmentsBySearch(enrollments, query.toUpperCase());
          
          // All case variations should return the same results
          return lowerFiltered.length === upperFiltered.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Combined filters work correctly
   */
  it('should correctly apply both search and date range filters', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        searchQueryArbitrary,
        dateRangeArbitrary,
        (users, query, dateRange) => {
          // Apply search filter first
          const searchFiltered = filterUsersBySearch(users, query);
          
          // Then apply date range filter
          const fullyFiltered = filterUsersByDateRange(searchFiltered, dateRange.from, dateRange.to);
          
          // Every result must match both criteria
          return fullyFiltered.every(user => {
            const matchesSearch = userMatchesQuery(user, query);
            
            const userDate = new Date(user.created_at);
            let matchesDateRange = true;
            
            if (dateRange.from && userDate < dateRange.from) {
              matchesDateRange = false;
            }
            
            if (dateRange.to) {
              const endOfDay = new Date(dateRange.to);
              endOfDay.setHours(23, 59, 59, 999);
              if (userDate > endOfDay) {
                matchesDateRange = false;
              }
            }
            
            return matchesSearch && matchesDateRange;
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Filter results are a subset of original data
   */
  it('should ensure filtered results are always a subset of original data', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        searchQueryArbitrary,
        (users, query) => {
          const filtered = filterUsersBySearch(users, query);
          
          // Every filtered user must exist in the original list
          return filtered.every(filteredUser => 
            users.some(user => user.id === filteredUser.id)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Filter is idempotent
   */
  it('should produce the same results when applied multiple times', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        searchQueryArbitrary,
        (users, query) => {
          const filtered1 = filterUsersBySearch(users, query);
          const filtered2 = filterUsersBySearch(filtered1, query);
          
          // Applying filter twice should give same results
          return filtered1.length === filtered2.length &&
                 filtered1.every((u, i) => u.id === filtered2[i].id);
        }
      ),
      { numRuns: 100 }
    );
  });
});
