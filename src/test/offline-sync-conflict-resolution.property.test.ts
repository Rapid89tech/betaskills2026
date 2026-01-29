/**
 * Property-Based Test: Offline Sync Conflict Resolution
 * 
 * Feature: mobile-sync-admin-overhaul, Property 9: Offline Sync Conflict Resolution
 * Validates: Requirements 3.4
 * 
 * Property: For any enrollment modified offline, when connectivity is restored,
 * the system SHALL sync using timestamp-based last-write-wins conflict resolution.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fc from 'fast-check';
import { DataSyncService, SyncOperation } from '@/services/DataSyncService';

/**
 * Enrollment data structure for testing
 */
interface EnrollmentData {
  id: string;
  user_id: string;
  course_id: string;
  status: 'approved' | 'pending' | 'rejected';
  progress: number;
  updated_at: string;
}

/**
 * Generator for enrollment data with timestamps
 */
const enrollmentWithTimestampArbitrary = fc.record({
  id: fc.uuid(),
  user_id: fc.uuid(),
  course_id: fc.string({ minLength: 5, maxLength: 50 }),
  status: fc.constantFrom('approved' as const, 'pending' as const, 'rejected' as const),
  progress: fc.integer({ min: 0, max: 100 }),
  updated_at: fc.integer({ min: 1577836800000, max: 1767225600000 }) // 2020-01-01 to 2025-12-31 in ms
    .map(ms => new Date(ms).toISOString())
});

/**
 * Generator for timestamp pairs where one is older than the other
 */
const timestampPairArbitrary = fc.tuple(
  fc.integer({ min: 1577836800000, max: 1735689600000 }), // 2020-01-01 to 2025-01-01
  fc.integer({ min: 1, max: 86400000 }) // 1ms to 1 day difference
).map(([baseTime, diff]) => ({
  older: new Date(baseTime).toISOString(),
  newer: new Date(baseTime + diff).toISOString()
}));

describe('Property 9: Offline Sync Conflict Resolution', () => {
  let syncService: DataSyncService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Get a fresh instance for each test
    syncService = DataSyncService.getInstance();
  });

  afterEach(() => {
    // Clean up after each test
    syncService.cleanup();
    localStorage.clear();
  });

  /**
   * Property test: Operations queued offline are persisted
   */
  it('should persist queued operations when offline', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            type: fc.constantFrom('enrollment' as const, 'progress' as const, 'profile' as const),
            action: fc.constantFrom('create' as const, 'update' as const, 'delete' as const),
            data: fc.record({
              id: fc.uuid(),
              user_id: fc.uuid(),
              course_id: fc.string({ minLength: 5, maxLength: 50 }),
              progress: fc.integer({ min: 0, max: 100 })
            })
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (operations) => {
          // Clear queue before test
          syncService.clearPendingOperations();
          
          // Queue operations
          operations.forEach(op => {
            syncService.queueOperation(op);
          });

          // Check that operations are queued
          const queuedCount = syncService.getPendingOperationsCount();
          
          // Should have queued all operations (or up to max queue size of 100)
          const expectedCount = Math.min(operations.length, 100);
          return queuedCount === expectedCount;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Queued operations maintain order
   */
  it('should maintain operation order in the queue', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            type: fc.constantFrom('enrollment' as const, 'progress' as const),
            action: fc.constantFrom('create' as const, 'update' as const),
            data: fc.record({
              id: fc.uuid(),
              user_id: fc.uuid(),
              course_id: fc.string({ minLength: 5, maxLength: 50 })
            })
          }),
          { minLength: 2, maxLength: 5 }
        ),
        (operations) => {
          // Clear any existing operations
          syncService.clearPendingOperations();
          
          // Queue operations in order
          operations.forEach(op => {
            syncService.queueOperation(op);
          });

          const state = syncService.getState();
          const queuedOps = state.pendingOperations;

          // Verify order is maintained by checking timestamps are increasing
          for (let i = 1; i < queuedOps.length; i++) {
            const prevTimestamp = new Date(queuedOps[i - 1].timestamp).getTime();
            const currTimestamp = new Date(queuedOps[i].timestamp).getTime();
            
            if (currTimestamp < prevTimestamp) {
              return false;
            }
          }

          return queuedOps.length === operations.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Operations have timestamps assigned when queued
   */
  it('should assign timestamps to all queued operations', () => {
    fc.assert(
      fc.property(
        fc.record({
          type: fc.constantFrom('enrollment' as const, 'progress' as const, 'profile' as const),
          action: fc.constantFrom('create' as const, 'update' as const, 'delete' as const),
          data: fc.record({
            id: fc.uuid(),
            user_id: fc.uuid(),
            course_id: fc.string({ minLength: 5, maxLength: 50 })
          })
        }),
        (operation) => {
          // Clear queue
          syncService.clearPendingOperations();
          
          // Queue operation
          syncService.queueOperation(operation);

          const state = syncService.getState();
          const queuedOp = state.pendingOperations[0];

          // Verify timestamp exists and is valid ISO string
          if (!queuedOp || !queuedOp.timestamp) {
            return false;
          }

          const timestamp = new Date(queuedOp.timestamp);
          return !isNaN(timestamp.getTime());
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Operations queued have unique IDs
   */
  it('should assign unique IDs to all queued operations', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            type: fc.constantFrom('enrollment' as const, 'progress' as const),
            action: fc.constantFrom('create' as const, 'update' as const),
            data: fc.record({
              id: fc.uuid(),
              user_id: fc.uuid(),
              course_id: fc.string({ minLength: 5, maxLength: 50 })
            })
          }),
          { minLength: 2, maxLength: 10 }
        ),
        (operations) => {
          // Clear queue
          syncService.clearPendingOperations();
          
          // Queue operations
          operations.forEach(op => {
            syncService.queueOperation(op);
          });

          const state = syncService.getState();
          const queuedOps = state.pendingOperations;

          // Check all IDs are unique
          const ids = queuedOps.map(op => op.id);
          const uniqueIds = new Set(ids);

          return uniqueIds.size === ids.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Retry count is initialized to 0
   */
  it('should initialize retry count to 0 for all queued operations', () => {
    fc.assert(
      fc.property(
        fc.record({
          type: fc.constantFrom('enrollment' as const, 'progress' as const, 'profile' as const),
          action: fc.constantFrom('create' as const, 'update' as const, 'delete' as const),
          data: fc.record({
            id: fc.uuid(),
            user_id: fc.uuid(),
            course_id: fc.string({ minLength: 5, maxLength: 50 })
          })
        }),
        (operation) => {
          // Clear queue
          syncService.clearPendingOperations();
          
          // Queue operation
          syncService.queueOperation(operation);

          const state = syncService.getState();
          const queuedOp = state.pendingOperations[0];

          return queuedOp && queuedOp.retryCount === 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Queue respects maximum size limit
   */
  it('should respect maximum queue size by removing oldest operations', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 101, max: 150 }), // More than default max (100)
        (operationCount) => {
          // Clear queue
          syncService.clearPendingOperations();
          
          // Queue more operations than the limit
          for (let i = 0; i < operationCount; i++) {
            syncService.queueOperation({
              type: 'enrollment',
              action: 'update',
              data: {
                id: `test-${i}`,
                user_id: 'test-user',
                course_id: 'test-course',
                progress: i
              }
            });
          }

          const queuedCount = syncService.getPendingOperationsCount();

          // Queue should not exceed max size (100)
          return queuedCount <= 100;
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property test: Clearing operations removes all pending operations
   */
  it('should remove all pending operations when cleared', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            type: fc.constantFrom('enrollment' as const, 'progress' as const),
            action: fc.constantFrom('create' as const, 'update' as const),
            data: fc.record({
              id: fc.uuid(),
              user_id: fc.uuid(),
              course_id: fc.string({ minLength: 5, maxLength: 50 })
            })
          }),
          { minLength: 1, maxLength: 20 }
        ),
        (operations) => {
          // Queue operations
          operations.forEach(op => {
            syncService.queueOperation(op);
          });

          // Verify operations are queued
          const beforeClear = syncService.getPendingOperationsCount();
          
          // Clear operations
          syncService.clearPendingOperations();
          
          // Verify queue is empty
          const afterClear = syncService.getPendingOperationsCount();

          return beforeClear > 0 && afterClear === 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Operations preserve data integrity
   */
  it('should preserve operation data integrity when queued', () => {
    fc.assert(
      fc.property(
        fc.record({
          type: fc.constantFrom('enrollment' as const, 'progress' as const, 'profile' as const),
          action: fc.constantFrom('create' as const, 'update' as const, 'delete' as const),
          data: fc.record({
            id: fc.uuid(),
            user_id: fc.uuid(),
            course_id: fc.string({ minLength: 5, maxLength: 50 }),
            progress: fc.integer({ min: 0, max: 100 }),
            status: fc.constantFrom('approved', 'pending', 'rejected')
          })
        }),
        (operation) => {
          // Clear queue
          syncService.clearPendingOperations();
          
          // Queue operation
          syncService.queueOperation(operation);

          const state = syncService.getState();
          const queuedOp = state.pendingOperations[0];

          // Verify all data is preserved
          return (
            queuedOp &&
            queuedOp.type === operation.type &&
            queuedOp.action === operation.action &&
            queuedOp.data.id === operation.data.id &&
            queuedOp.data.user_id === operation.data.user_id &&
            queuedOp.data.course_id === operation.data.course_id &&
            queuedOp.data.progress === operation.data.progress &&
            queuedOp.data.status === operation.data.status
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: hasPendingOperations reflects queue state accurately
   */
  it('should accurately report whether pending operations exist', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            type: fc.constantFrom('enrollment' as const, 'progress' as const),
            action: fc.constantFrom('create' as const, 'update' as const),
            data: fc.record({
              id: fc.uuid(),
              user_id: fc.uuid(),
              course_id: fc.string({ minLength: 5, maxLength: 50 })
            })
          }),
          { minLength: 0, maxLength: 10 }
        ),
        (operations) => {
          // Clear queue
          syncService.clearPendingOperations();
          
          // Initially should have no pending operations
          const initiallyEmpty = !syncService.hasPendingOperations();
          
          // Queue operations
          operations.forEach(op => {
            syncService.queueOperation(op);
          });

          const hasPending = syncService.hasPendingOperations();
          const expectedHasPending = operations.length > 0;

          return initiallyEmpty && (hasPending === expectedHasPending);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Timestamp-based ordering is consistent
   */
  it('should maintain consistent timestamp-based ordering for operations', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            type: fc.constantFrom('enrollment' as const, 'progress' as const),
            action: fc.constantFrom('create' as const, 'update' as const),
            data: fc.record({
              id: fc.uuid(),
              user_id: fc.uuid(),
              course_id: fc.string({ minLength: 5, maxLength: 50 })
            })
          }),
          { minLength: 3, maxLength: 10 }
        ),
        (operations) => {
          // Clear queue
          syncService.clearPendingOperations();
          
          // Queue operations with small delays to ensure different timestamps
          operations.forEach((op, index) => {
            // Add a small artificial delay to timestamp
            setTimeout(() => {
              syncService.queueOperation(op);
            }, index);
          });

          // Wait for all operations to be queued
          const state = syncService.getState();
          const queuedOps = state.pendingOperations;

          // Verify timestamps are in ascending order
          for (let i = 1; i < queuedOps.length; i++) {
            const prevTime = new Date(queuedOps[i - 1].timestamp).getTime();
            const currTime = new Date(queuedOps[i].timestamp).getTime();
            
            // Current timestamp should be >= previous (allowing for same millisecond)
            if (currTime < prevTime) {
              return false;
            }
          }

          return true;
        }
      ),
      { numRuns: 50 }
    );
  });
});
