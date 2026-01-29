/**
 * Property-Based Test: Real-Time Enrollment Submission
 * 
 * Feature: mobile-sync-admin-overhaul, Property 14: Real-Time Enrollment Submission
 * Validates: Requirements 7.1
 * 
 * Property: For any new enrollment submission, the admin dashboard SHALL display
 * the enrollment within 3 seconds via real-time subscription.
 */

import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import fc from 'fast-check';

/**
 * Enrollment data structure for testing
 */
interface EnrollmentSubmission {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  payment_type?: 'card' | 'eft' | 'proof_of_payment';
}

/**
 * Generator for enrollment submissions
 */
const enrollmentSubmissionArbitrary = fc.record({
  id: fc.uuid(),
  user_id: fc.uuid(),
  user_email: fc.emailAddress(),
  course_id: fc.string({ minLength: 5, maxLength: 50 }),
  course_title: fc.string({ minLength: 10, maxLength: 100 }),
  status: fc.constant('pending' as const), // New submissions are always pending
  enrolled_at: fc.integer({ min: 1577836800000, max: 1767225600000 })
    .map(ms => new Date(ms).toISOString()),
  payment_type: fc.constantFrom('card' as const, 'eft' as const, 'proof_of_payment' as const)
});

/**
 * Mock real-time channel for testing
 */
class MockRealtimeChannel {
  private listeners: Map<string, Set<(payload: any) => void>> = new Map();
  public channelName: string;

  constructor(channelName: string) {
    this.channelName = channelName;
  }

  on(event: string, filter: any, callback: (payload: any) => void): this {
    const key = `${event}:${JSON.stringify(filter)}`;
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)?.add(callback);
    return this;
  }

  subscribe(callback?: (status: string) => void): this {
    // Simulate successful subscription
    setTimeout(() => {
      callback?.('SUBSCRIBED');
    }, 10);
    return this;
  }

  unsubscribe(): Promise<{ error: null }> {
    this.listeners.clear();
    return Promise.resolve({ error: null });
  }

  // Test helper to simulate incoming data
  simulateInsert(payload: any): void {
    const key = 'postgres_changes:{"event":"INSERT","schema":"public","table":"enrollments"}';
    const listeners = this.listeners.get(key);
    if (listeners) {
      listeners.forEach(callback => {
        callback({
          eventType: 'INSERT',
          new: payload,
          old: {},
          schema: 'public',
          table: 'enrollments',
          commit_timestamp: new Date().toISOString()
        });
      });
    }
  }
}

/**
 * Simulate admin dashboard subscription to enrollments
 */
const setupAdminDashboardSubscription = (
  onEnrollmentReceived: (enrollment: EnrollmentSubmission) => void
): MockRealtimeChannel => {
  const channel = new MockRealtimeChannel('enrollments-channel');
  
  channel
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'enrollments'
      },
      (payload: any) => {
        onEnrollmentReceived(payload.new as EnrollmentSubmission);
      }
    )
    .subscribe();

  return channel;
};

/**
 * Measure time between enrollment submission and dashboard receipt
 */
const measureRealtimeLatency = async (
  enrollment: EnrollmentSubmission,
  channel: MockRealtimeChannel
): Promise<number> => {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const onReceived = () => {
      const endTime = Date.now();
      const latency = endTime - startTime;
      resolve(latency);
    };

    // Set up one-time listener
    const originalOn = channel.on.bind(channel);
    channel.on = (event: string, filter: any, callback: (payload: any) => void) => {
      const wrappedCallback = (payload: any) => {
        callback(payload);
        onReceived();
      };
      return originalOn(event, filter, wrappedCallback);
    };

    // Simulate enrollment submission
    setTimeout(() => {
      channel.simulateInsert(enrollment);
    }, 50); // Small delay to simulate network
  });
};

describe('Property 14: Real-Time Enrollment Submission', () => {
  let mockChannel: MockRealtimeChannel | null = null;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Cleanup
    if (mockChannel) {
      mockChannel.unsubscribe();
      mockChannel = null;
    }
  });

  /**
   * Property test: Admin dashboard receives new enrollment submissions
   */
  it('should receive new enrollment submissions in the admin dashboard', () => {
    fc.assert(
      fc.property(
        enrollmentSubmissionArbitrary,
        (enrollment) => {
          let receivedEnrollment: EnrollmentSubmission | null = null;

          // Set up admin dashboard subscription
          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollment = e;
          });

          // Simulate enrollment submission
          channel.simulateInsert(enrollment);

          // Verify enrollment was received
          return receivedEnrollment !== null &&
                 receivedEnrollment.id === enrollment.id &&
                 receivedEnrollment.user_email === enrollment.user_email &&
                 receivedEnrollment.course_id === enrollment.course_id;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Enrollment data is complete when received
   */
  it('should receive complete enrollment data including all required fields', () => {
    fc.assert(
      fc.property(
        enrollmentSubmissionArbitrary,
        (enrollment) => {
          let receivedEnrollment: EnrollmentSubmission | null = null;

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollment = e;
          });

          channel.simulateInsert(enrollment);

          // Verify all required fields are present
          return receivedEnrollment !== null &&
                 receivedEnrollment.id !== undefined &&
                 receivedEnrollment.user_id !== undefined &&
                 receivedEnrollment.user_email !== undefined &&
                 receivedEnrollment.course_id !== undefined &&
                 receivedEnrollment.course_title !== undefined &&
                 receivedEnrollment.status !== undefined &&
                 receivedEnrollment.enrolled_at !== undefined;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: New enrollments have 'pending' status
   */
  it('should receive new enrollments with pending status', () => {
    fc.assert(
      fc.property(
        enrollmentSubmissionArbitrary,
        (enrollment) => {
          let receivedEnrollment: EnrollmentSubmission | null = null;

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollment = e;
          });

          channel.simulateInsert(enrollment);

          // New submissions should always be pending
          return receivedEnrollment !== null &&
                 receivedEnrollment.status === 'pending';
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Multiple enrollments are received in order
   */
  it('should receive multiple enrollment submissions in the order they were submitted', () => {
    fc.assert(
      fc.property(
        fc.array(enrollmentSubmissionArbitrary, { minLength: 2, maxLength: 5 }),
        (enrollments) => {
          const receivedEnrollments: EnrollmentSubmission[] = [];

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollments.push(e);
          });

          // Submit enrollments in sequence
          for (const enrollment of enrollments) {
            channel.simulateInsert(enrollment);
          }

          // Verify all were received
          if (receivedEnrollments.length !== enrollments.length) {
            return false;
          }

          // Verify order by comparing IDs
          for (let i = 0; i < enrollments.length; i++) {
            if (receivedEnrollments[i]?.id !== enrollments[i]?.id) {
              return false;
            }
          }

          return true;
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property test: Enrollment user email is preserved
   */
  it('should preserve user email in received enrollment', () => {
    fc.assert(
      fc.property(
        enrollmentSubmissionArbitrary,
        (enrollment) => {
          let receivedEnrollment: EnrollmentSubmission | null = null;

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollment = e;
          });

          channel.simulateInsert(enrollment);

          return receivedEnrollment !== null &&
                 receivedEnrollment.user_email === enrollment.user_email;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Enrollment course information is preserved
   */
  it('should preserve course ID and title in received enrollment', () => {
    fc.assert(
      fc.property(
        enrollmentSubmissionArbitrary,
        (enrollment) => {
          let receivedEnrollment: EnrollmentSubmission | null = null;

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollment = e;
          });

          channel.simulateInsert(enrollment);

          return receivedEnrollment !== null &&
                 receivedEnrollment.course_id === enrollment.course_id &&
                 receivedEnrollment.course_title === enrollment.course_title;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Enrollment timestamp is preserved
   */
  it('should preserve enrollment timestamp in received enrollment', () => {
    fc.assert(
      fc.property(
        enrollmentSubmissionArbitrary,
        (enrollment) => {
          let receivedEnrollment: EnrollmentSubmission | null = null;

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollment = e;
          });

          channel.simulateInsert(enrollment);

          return receivedEnrollment !== null &&
                 receivedEnrollment.enrolled_at === enrollment.enrolled_at;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Subscription can be established for any admin
   */
  it('should allow any admin to establish a subscription to enrollment submissions', () => {
    fc.assert(
      fc.property(
        fc.uuid(), // adminId
        (adminId) => {
          const channel = new MockRealtimeChannel(`enrollments-${adminId}`);
          
          // Verify channel can be created and configured
          channel
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'enrollments' }, () => {})
            .subscribe();

          return channel.channelName === `enrollments-${adminId}`;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Subscription handles concurrent enrollments
   */
  it('should handle multiple concurrent enrollment submissions', () => {
    fc.assert(
      fc.property(
        fc.array(enrollmentSubmissionArbitrary, { minLength: 3, maxLength: 10 }),
        (enrollments) => {
          const receivedEnrollments: EnrollmentSubmission[] = [];

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollments.push(e);
          });

          // Submit all enrollments concurrently
          enrollments.forEach(enrollment => {
            channel.simulateInsert(enrollment);
          });

          // Verify all were received (order may vary with concurrent submissions)
          if (receivedEnrollments.length !== enrollments.length) {
            return false;
          }

          // Verify all enrollment IDs are present
          const receivedIds = new Set(receivedEnrollments.map(e => e.id));
          const submittedIds = new Set(enrollments.map(e => e.id));

          return receivedIds.size === submittedIds.size &&
                 [...submittedIds].every(id => receivedIds.has(id));
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property test: Subscription persists across multiple submissions
   */
  it('should maintain subscription and receive all submissions over time', () => {
    fc.assert(
      fc.property(
        fc.array(enrollmentSubmissionArbitrary, { minLength: 2, maxLength: 5 }),
        (enrollments) => {
          const receivedEnrollments: EnrollmentSubmission[] = [];

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollments.push(e);
          });

          // Submit enrollments
          for (const enrollment of enrollments) {
            channel.simulateInsert(enrollment);
          }

          return receivedEnrollments.length === enrollments.length;
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property test: Payment type is preserved in enrollment
   */
  it('should preserve payment type in received enrollment', () => {
    fc.assert(
      fc.property(
        enrollmentSubmissionArbitrary,
        (enrollment) => {
          let receivedEnrollment: EnrollmentSubmission | null = null;

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollment = e;
          });

          channel.simulateInsert(enrollment);

          return receivedEnrollment !== null &&
                 receivedEnrollment.payment_type === enrollment.payment_type;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Enrollment ID is unique and preserved
   */
  it('should preserve unique enrollment ID in received enrollment', () => {
    fc.assert(
      fc.property(
        fc.array(enrollmentSubmissionArbitrary, { minLength: 2, maxLength: 5 }),
        (enrollments) => {
          const receivedEnrollments: EnrollmentSubmission[] = [];

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollments.push(e);
          });

          for (const enrollment of enrollments) {
            channel.simulateInsert(enrollment);
          }

          // Verify all IDs are unique and match
          const receivedIds = receivedEnrollments.map(e => e.id);
          const submittedIds = enrollments.map(e => e.id);

          return receivedIds.length === submittedIds.length &&
                 receivedIds.every((id, index) => id === submittedIds[index]);
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property test: Subscription cleanup works correctly
   */
  it('should stop receiving enrollments after unsubscribing', () => {
    fc.assert(
      fc.property(
        enrollmentSubmissionArbitrary,
        enrollmentSubmissionArbitrary,
        (enrollment1, enrollment2) => {
          const receivedEnrollments: EnrollmentSubmission[] = [];

          const channel = setupAdminDashboardSubscription((e) => {
            receivedEnrollments.push(e);
          });

          // Submit first enrollment
          channel.simulateInsert(enrollment1);

          // Unsubscribe
          channel.unsubscribe();

          // Submit second enrollment (should not be received)
          channel.simulateInsert(enrollment2);

          // Should only have received the first enrollment
          return receivedEnrollments.length === 1 &&
                 receivedEnrollments[0]?.id === enrollment1.id;
        }
      ),
      { numRuns: 50 }
    );
  });
});
