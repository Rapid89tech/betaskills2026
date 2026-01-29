/**
 * Property-Based Test: Server Data Priority
 * 
 * Feature: mobile-sync-admin-overhaul, Property 8: Server Data Priority
 * Validates: Requirements 3.5
 * 
 * Property: For any authenticated user with conflicting local and server enrollment data,
 * the system SHALL use server data as the source of truth, overwriting local data.
 */

import { describe, it, beforeEach } from 'vitest';
import fc from 'fast-check';
import { DataSyncService } from '@/services/DataSyncService';

/**
 * Enrollment data structure for testing
 */
interface EnrollmentData {
  id: string;
  user_id: string;
  course_id: string;
  status: 'approved' | 'pending' | 'rejected';
  progress: number;
  updated_at?: string;
}

/**
 * Generator for enrollment data
 */
const enrollmentArbitrary = fc.record({
  id: fc.uuid(),
  user_id: fc.uuid(),
  course_id: fc.string({ minLength: 5, maxLength: 50 }),
  status: fc.constantFrom('approved' as const, 'pending' as const, 'rejected' as const),
  progress: fc.integer({ min: 0, max: 100 }),
  updated_at: fc.option(
    fc.integer({ min: 1577836800000, max: 1767225600000 }) // 2020-01-01 to 2025-12-31 in ms
      .map(ms => new Date(ms).toISOString()),
    { nil: undefined }
  )
});

/**
 * Generator for conflicting enrollment pairs (same id, different data)
 */
const conflictingEnrollmentPairArbitrary = fc.tuple(
  enrollmentArbitrary,
  enrollmentArbitrary
).map(([local, remote]) => ({
  local: { ...local, id: 'conflict-id', user_id: 'test-user', course_id: 'test-course' },
  remote: { ...remote, id: 'conflict-id', user_id: 'test-user', course_id: 'test-course' }
}));

describe('Property 8: Server Data Priority', () => {
  let syncService: DataSyncService;

  beforeEach(() => {
    // Get a fresh instance for each test
    syncService = DataSyncService.getInstance();
  });

  /**
   * Property test: Server data always wins when both local and remote have timestamps
   */
  it('should always prioritize server (remote) data over local data when both have timestamps', () => {
    fc.assert(
      fc.property(
        conflictingEnrollmentPairArbitrary,
        ({ local, remote }) => {
          // Ensure both have timestamps
          const localWithTimestamp = { ...local, updated_at: new Date().toISOString() };
          const remoteWithTimestamp = { ...remote, updated_at: new Date().toISOString() };

          const result = syncService.resolveConflict(localWithTimestamp, remoteWithTimestamp);

          // Server (remote) data should always be returned
          return (
            result.id === remote.id &&
            result.status === remote.status &&
            result.progress === remote.progress &&
            result.updated_at === remoteWithTimestamp.updated_at
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Server data wins even when local timestamp is newer
   */
  it('should prioritize server data even when local data has a newer timestamp', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        enrollmentArbitrary,
        (localBase, remoteBase) => {
          // Create local data with a timestamp 1 hour in the future
          const futureTime = new Date(Date.now() + 3600000).toISOString();
          const currentTime = new Date().toISOString();
          
          const local = { ...localBase, updated_at: futureTime };
          const remote = { ...remoteBase, updated_at: currentTime };

          const result = syncService.resolveConflict(local, remote);

          // Server (remote) should ALWAYS win, regardless of timestamps
          // This implements pure server-first approach (Requirement 3.5)
          return (
            result.id === remote.id &&
            result.status === remote.status &&
            result.progress === remote.progress &&
            result.updated_at === remote.updated_at
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Server data wins when local has no timestamp
   */
  it('should prioritize server data when local data lacks timestamp', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        enrollmentArbitrary,
        (localBase, remoteBase) => {
          // Remove updated_at from local
          const { updated_at: _localTimestamp, ...localRest } = localBase;
          const local = localRest as EnrollmentData;
          const remote = { ...remoteBase, updated_at: new Date().toISOString() };

          const result = syncService.resolveConflict(local, remote) as EnrollmentData;

          // Server data should be used when local has no timestamp
          return (
            result.id === remote.id &&
            result.status === remote.status &&
            result.progress === remote.progress
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Server data wins when remote has no timestamp
   */
  it('should prioritize server data even when remote data lacks timestamp', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        enrollmentArbitrary,
        (localBase, remoteBase) => {
          const local = { ...localBase, updated_at: new Date().toISOString() };
          // Remove updated_at from remote
          const { updated_at: _remoteTimestamp, ...remoteRest } = remoteBase;
          const remote = remoteRest as EnrollmentData;

          const result = syncService.resolveConflict(local, remote) as EnrollmentData;

          // Server data should still be used (server-first approach)
          return (
            result.id === remote.id &&
            result.status === remote.status &&
            result.progress === remote.progress
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Server data wins when neither has timestamp
   */
  it('should prioritize server data when neither local nor remote has timestamp', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        enrollmentArbitrary,
        (localBase, remoteBase) => {
          // Remove updated_at from both
          const { updated_at: _localTimestamp, ...localRest } = localBase;
          const { updated_at: _remoteTimestamp, ...remoteRest } = remoteBase;
          const local = localRest as EnrollmentData;
          const remote = remoteRest as EnrollmentData;

          const result = syncService.resolveConflict(local, remote) as EnrollmentData;

          // Server data should be used as source of truth
          return (
            result.id === remote.id &&
            result.status === remote.status &&
            result.progress === remote.progress
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Server data priority applies to all enrollment statuses
   */
  it('should prioritize server data regardless of enrollment status', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('approved' as const, 'pending' as const, 'rejected' as const),
        fc.constantFrom('approved' as const, 'pending' as const, 'rejected' as const),
        fc.integer({ min: 0, max: 100 }),
        fc.integer({ min: 0, max: 100 }),
        (localStatus, remoteStatus, localProgress, remoteProgress) => {
          const local: EnrollmentData = {
            id: 'test-id',
            user_id: 'test-user',
            course_id: 'test-course',
            status: localStatus,
            progress: localProgress,
            updated_at: new Date().toISOString()
          };

          const remote: EnrollmentData = {
            id: 'test-id',
            user_id: 'test-user',
            course_id: 'test-course',
            status: remoteStatus,
            progress: remoteProgress,
            updated_at: new Date().toISOString()
          };

          const result = syncService.resolveConflict(local, remote);

          // Server data should always be used
          return (
            result.status === remoteStatus &&
            result.progress === remoteProgress
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Conflict resolution is deterministic
   */
  it('should produce consistent results when resolving the same conflict multiple times', () => {
    fc.assert(
      fc.property(
        enrollmentArbitrary,
        enrollmentArbitrary,
        (localBase, remoteBase) => {
          // Ensure both have timestamps for this test
          const local = { ...localBase, updated_at: localBase.updated_at || new Date().toISOString() };
          const remote = { ...remoteBase, updated_at: remoteBase.updated_at || new Date().toISOString() };
          
          const result1 = syncService.resolveConflict(local, remote) as EnrollmentData;
          const result2 = syncService.resolveConflict(local, remote) as EnrollmentData;
          const result3 = syncService.resolveConflict(local, remote) as EnrollmentData;

          // All results should be identical
          return (
            result1.id === result2.id &&
            result2.id === result3.id &&
            result1.status === result2.status &&
            result2.status === result3.status &&
            result1.progress === result2.progress &&
            result2.progress === result3.progress
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Server data priority applies to progress values
   */
  it('should prioritize server progress values over local progress values', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        fc.integer({ min: 0, max: 100 }),
        (localProgress, remoteProgress) => {
          const local: EnrollmentData = {
            id: 'test-id',
            user_id: 'test-user',
            course_id: 'test-course',
            status: 'approved',
            progress: localProgress,
            updated_at: new Date().toISOString()
          };

          const remote: EnrollmentData = {
            id: 'test-id',
            user_id: 'test-user',
            course_id: 'test-course',
            status: 'approved',
            progress: remoteProgress,
            updated_at: new Date().toISOString()
          };

          const result = syncService.resolveConflict(local, remote);

          // Server progress should always be used
          return result.progress === remoteProgress;
        }
      ),
      { numRuns: 100 }
    );
  });
});
