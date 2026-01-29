/**
 * Integration Test for Real-Time Payment Synchronization
 * 
 * Tests the complete workflow of real-time enrollment status synchronization
 * including cross-component updates, cross-tab sync, and WebSocket integration.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RealTimePaymentSync } from '@/services/RealTimePaymentSync';
import { PaymentStatus, EnrollmentStatus } from '@/types/ikhokha';

// Mock Supabase client with realistic behavior
const mockSupabaseData = new Map();
const mockSupabaseSubscriptions = new Map();

const createMockSupabase = () => {
    const mockChannel = {
        on: vi.fn().mockReturnThis(),
        subscribe: vi.fn().mockImplementation((callback) => {
            setTimeout(() => callback('SUBSCRIBED'), 10);
            return mockChannel;
        }),
        unsubscribe: vi.fn()
    };

    const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockImplementation(() => {
            const key = mockQuery._lastEqValue;
            const data = mockSupabaseData.get(key);
            return Promise.resolve({
                data: data || null,
                error: data ? null : { message: 'Not found' }
            });
        }),
        update: vi.fn().mockImplementation((updateData) => {
            const key = mockQuery._lastEqValue;
            const existingData = mockSupabaseData.get(key);
            if (existingData) {
                const updatedData = { ...existingData, ...updateData };
                mockSupabaseData.set(key, updatedData);

                // Simulate real-time update
                setTimeout(() => {
                    const handlers = mockSupabaseSubscriptions.get('enrollment_changes') || [];
                    handlers.forEach((handler: any) => {
                        handler({
                            eventType: 'UPDATE',
                            new: updatedData,
                            old: existingData
                        });
                    });
                }, 5);

                return Promise.resolve({ data: updatedData, error: null });
            }
            return Promise.resolve({ data: null, error: { message: 'Not found' } });
        }),
        _lastEqValue: null as any
    };

    // Override eq to capture the value for mocking
    const originalEq = mockQuery.eq;
    mockQuery.eq = vi.fn().mockImplementation((column, value) => {
        if (column === 'ikhokha_payment_id' || column === 'id') {
            mockQuery._lastEqValue = value;
        }
        return originalEq.call(mockQuery, column, value);
    });

    const mockSupabase = {
        from: vi.fn().mockReturnValue(mockQuery),
        channel: vi.fn().mockImplementation((channelName) => {
            const handlers: any[] = [];
            mockSupabaseSubscriptions.set(channelName, handlers);

            return {
                ...mockChannel,
                on: vi.fn().mockImplementation((event, config, handler) => {
                    handlers.push(handler);
                    return mockChannel;
                })
            };
        })
    };

    return { mockSupabase, mockQuery, mockChannel };
};

// Mock BroadcastChannel for cross-tab testing
class MockBroadcastChannel {
    name: string;
    private static channels = new Map<string, MockBroadcastChannel[]>();
    private listeners: ((event: MessageEvent) => void)[] = [];

    constructor(name: string) {
        this.name = name;
        if (!MockBroadcastChannel.channels.has(name)) {
            MockBroadcastChannel.channels.set(name, []);
        }
        MockBroadcastChannel.channels.get(name)!.push(this);
    }

    postMessage(data: any) {
        // Simulate broadcasting to all channels with the same name
        const channels = MockBroadcastChannel.channels.get(this.name) || [];
        channels.forEach(channel => {
            if (channel !== this) {
                channel.listeners.forEach(listener => {
                    setTimeout(() => listener({ data } as MessageEvent), 0);
                });
            }
        });
    }

    addEventListener(type: string, listener: (event: MessageEvent) => void) {
        if (type === 'message') {
            this.listeners.push(listener);
        }
    }

    removeEventListener(type: string, listener: (event: MessageEvent) => void) {
        if (type === 'message') {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        }
    }

    close() {
        const channels = MockBroadcastChannel.channels.get(this.name) || [];
        const index = channels.indexOf(this);
        if (index > -1) {
            channels.splice(index, 1);
        }
    }

    static clearAll() {
        MockBroadcastChannel.channels.clear();
    }
}

// Mock localStorage
const mockLocalStorage = new Map<string, string>();
const mockLocalStorageAPI = {
    getItem: (key: string) => mockLocalStorage.get(key) || null,
    setItem: (key: string, value: string) => mockLocalStorage.set(key, value),
    removeItem: (key: string) => mockLocalStorage.delete(key),
    clear: () => mockLocalStorage.clear()
};

describe('Real-Time Payment Sync Integration', () => {
    let service: RealTimePaymentSync;
    let mockSupabase: any;
    let mockEnrollmentData: any;

    beforeEach(async () => {
        // Clear all mocks and data
        vi.clearAllMocks();
        mockSupabaseData.clear();
        mockSupabaseSubscriptions.clear();
        MockBroadcastChannel.clearAll();
        mockLocalStorage.clear();

        // Setup mocks
        const { mockSupabase: supabase } = createMockSupabase();
        mockSupabase = supabase;

        // Mock global objects
        global.BroadcastChannel = MockBroadcastChannel as any;
        global.localStorage = mockLocalStorageAPI as any;

        // Mock Supabase import
        vi.doMock('@/integrations/supabase/client', () => ({
            supabase: mockSupabase
        }));

        // Sample enrollment data
        mockEnrollmentData = {
            id: 'enrollment-123',
            user_id: 'user-456',
            course_id: 'course-789',
            status: 'pending',
            payment_status: 'pending',
            payment_type: 'card',
            amount: 100,
            currency: 'ZAR',
            ikhokha_payment_id: 'payment-123',
            user_email: 'test@example.com',
            course_title: 'Test Course'
        };

        // Add enrollment to mock database
        mockSupabaseData.set('payment-123', mockEnrollmentData);
        mockSupabaseData.set('enrollment-123', mockEnrollmentData);

        // Get fresh service instance
        service = RealTimePaymentSync.getInstance();
        await service.initialize();
    });

    afterEach(() => {
        service.cleanup();
        vi.restoreAllMocks();
    });

    describe('End-to-End Payment Status Sync', () => {
        it('should sync payment status and trigger all update mechanisms', async () => {
            const statusUpdates: any[] = [];
            const userUpdates: any[] = [];
            const customEvents: any[] = [];

            // Setup listeners
            service.subscribeToStatusUpdates((update) => {
                statusUpdates.push(update);
            });

            service.subscribeToUserUpdates('user-456', (update) => {
                userUpdates.push(update);
            });

            // Mock window events
            const originalDispatchEvent = window.dispatchEvent;
            window.dispatchEvent = vi.fn((event: Event) => {
                customEvents.push(event);
                return true;
            });

            // Perform payment status sync
            await service.syncPaymentStatus('payment-123', PaymentStatus.COMPLETED);

            // Wait for async operations
            await new Promise(resolve => setTimeout(resolve, 50));

            // Verify status update was broadcast
            expect(statusUpdates).toHaveLength(1);
            expect(statusUpdates[0]).toMatchObject({
                type: 'payment',
                target_user_id: 'user-456',
                enrollment_id: 'enrollment-123',
                course_id: 'course-789',
                new_status: PaymentStatus.COMPLETED,
                source: 'payment_webhook'
            });

            // Verify database was updated
            const updatedData = mockSupabaseData.get('payment-123');
            expect(updatedData.payment_status).toBe(PaymentStatus.COMPLETED);

            // Verify custom events were dispatched
            expect(customEvents.some(e => e.type === 'payment-status-changed')).toBe(true);

            // Restore
            window.dispatchEvent = originalDispatchEvent;
        });

        it('should handle real-time Supabase updates', async () => {
            const statusUpdates: any[] = [];
            service.subscribeToStatusUpdates((update) => {
                statusUpdates.push(update);
            });

            // Simulate external database update (e.g., from admin dashboard)
            const handlers = mockSupabaseSubscriptions.get('enrollment_changes') || [];
            const updatedData = { ...mockEnrollmentData, status: 'approved' };

            handlers.forEach((handler: any) => {
                handler({
                    eventType: 'UPDATE',
                    new: updatedData,
                    old: mockEnrollmentData
                });
            });

            // Wait for async processing
            await new Promise(resolve => setTimeout(resolve, 10));

            // Verify update was processed
            expect(statusUpdates).toHaveLength(1);
            expect(statusUpdates[0]).toMatchObject({
                type: 'enrollment',
                target_user_id: 'user-456',
                enrollment_id: 'enrollment-123',
                old_status: 'pending',
                new_status: 'approved'
            });
        });
    });

    describe('Cross-Tab Synchronization', () => {
        it('should sync data across multiple tabs', async () => {
            const crossTabEvents: any[] = [];

            // Mock window events to capture cross-tab sync
            window.addEventListener = vi.fn((type, listener) => {
                if (type === 'cross-tab-enrollment-sync') {
                    crossTabEvents.push({ type, listener });
                }
            });

            // Create second service instance (simulating another tab)
            const service2 = RealTimePaymentSync.getInstance();
            await service2.initialize();

            const syncData = {
                userId: 'user-456',
                enrollmentId: 'enrollment-123',
                courseId: 'course-789',
                status: EnrollmentStatus.APPROVED,
                timestamp: new Date(),
                source: 'system'
            };

            // Sync from first tab
            service.syncAcrossTabs('user-456', syncData);

            // Wait for BroadcastChannel message
            await new Promise(resolve => setTimeout(resolve, 10));

            // Verify localStorage fallback was used
            const syncKeys = Array.from(mockLocalStorage.keys()).filter(key =>
                key.startsWith('enrollment_sync_user-456_')
            );
            expect(syncKeys.length).toBe(1);

            const storedData = JSON.parse(mockLocalStorage.get(syncKeys[0])!);
            expect(storedData).toMatchObject(syncData);

            service2.cleanup();
        });

        it('should handle BroadcastChannel messages between tabs', async () => {
            const receivedMessages: any[] = [];

            // Create two channels (simulating two tabs)
            const channel1 = new MockBroadcastChannel('payment-sync');
            const channel2 = new MockBroadcastChannel('payment-sync');

            channel2.addEventListener('message', (event) => {
                receivedMessages.push(event.data);
            });

            // Send message from channel1
            const testMessage = {
                type: 'enrollment_sync',
                userId: 'user-456',
                data: { enrollmentId: 'enrollment-123', status: 'approved' }
            };

            channel1.postMessage(testMessage);

            // Wait for message propagation
            await new Promise(resolve => setTimeout(resolve, 10));

            expect(receivedMessages).toHaveLength(1);
            expect(receivedMessages[0]).toEqual(testMessage);

            channel1.close();
            channel2.close();
        });
    });

    describe('Admin Notifications', () => {
        it('should notify admins of new EFT enrollments', async () => {
            const adminUpdates: any[] = [];
            service.subscribeToAdminUpdates((update) => {
                adminUpdates.push(update);
            });

            // Simulate new EFT enrollment insertion
            const eftEnrollment = {
                ...mockEnrollmentData,
                payment_type: 'eft',
                status: 'pending'
            };

            const handlers = mockSupabaseSubscriptions.get('enrollment_changes') || [];
            handlers.forEach((handler: any) => {
                handler({
                    eventType: 'INSERT',
                    new: eftEnrollment
                });
            });

            // Wait for processing
            await new Promise(resolve => setTimeout(resolve, 10));

            expect(adminUpdates).toHaveLength(1);
            expect(adminUpdates[0]).toMatchObject({
                type: 'new_eft_enrollment',
                enrollmentId: 'enrollment-123',
                userEmail: 'test@example.com',
                courseName: 'Test Course'
            });
        });
    });

    describe('Error Handling and Resilience', () => {
        it('should handle database errors gracefully', async () => {
            // Mock database error
            mockSupabaseData.delete('payment-123');

            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            // This should not throw
            await expect(
                service.syncPaymentStatus('payment-123', PaymentStatus.COMPLETED)
            ).resolves.not.toThrow();

            expect(consoleSpy).toHaveBeenCalledWith(
                'Failed to find enrollment for payment:',
                'payment-123',
                expect.any(Object)
            );

            consoleSpy.mockRestore();
        });

        it('should handle listener callback errors', () => {
            const errorCallback = vi.fn(() => {
                throw new Error('Callback error');
            });
            const normalCallback = vi.fn();

            service.subscribeToStatusUpdates(errorCallback);
            service.subscribeToStatusUpdates(normalCallback);

            const update = {
                type: 'enrollment' as const,
                target_user_id: 'user-456',
                enrollment_id: 'enrollment-123',
                course_id: 'course-789',
                new_status: 'approved',
                timestamp: new Date(),
                source: 'system' as const
            };

            expect(() => service.broadcastStatusUpdate(update)).not.toThrow();
            expect(normalCallback).toHaveBeenCalled();
        });

        it('should handle Supabase connection issues', async () => {
            // Mock Supabase subscription failure
            const mockChannel = {
                on: vi.fn().mockReturnThis(),
                subscribe: vi.fn().mockImplementation((callback) => {
                    setTimeout(() => callback('CHANNEL_ERROR'), 10);
                    return mockChannel;
                }),
                unsubscribe: vi.fn()
            };

            mockSupabase.channel.mockReturnValue(mockChannel);

            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

            // Create new service instance with failing connection
            const failingService = RealTimePaymentSync.getInstance();
            await failingService.initialize();

            // Wait for subscription status
            await new Promise(resolve => setTimeout(resolve, 20));

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Subscription'),
                'CHANNEL_ERROR'
            );

            consoleSpy.mockRestore();
            failingService.cleanup();
        });
    });

    describe('Performance and Cleanup', () => {
        it('should properly cleanup all resources', () => {
            const statusCallback = vi.fn();
            const userCallback = vi.fn();
            const adminCallback = vi.fn();

            service.subscribeToStatusUpdates(statusCallback);
            service.subscribeToUserUpdates('user-456', userCallback);
            service.subscribeToAdminUpdates(adminCallback);

            const healthBefore = service.getHealthStatus();
            expect(healthBefore.listenersCount).toBe(1);
            expect(healthBefore.userListenersCount).toBe(1);
            expect(healthBefore.adminListenersCount).toBe(1);

            service.cleanup();

            const healthAfter = service.getHealthStatus();
            expect(healthAfter.initialized).toBe(false);
            expect(healthAfter.listenersCount).toBe(0);
            expect(healthAfter.userListenersCount).toBe(0);
            expect(healthAfter.adminListenersCount).toBe(0);
        });

        it('should handle high-frequency updates efficiently', async () => {
            const updates: any[] = [];
            service.subscribeToStatusUpdates((update) => {
                updates.push(update);
            });

            // Simulate rapid updates
            const promises = [];
            for (let i = 0; i < 10; i++) {
                const enrollmentData = {
                    ...mockEnrollmentData,
                    id: `enrollment-${i}`,
                    ikhokha_payment_id: `payment-${i}`
                };
                mockSupabaseData.set(`payment-${i}`, enrollmentData);

                promises.push(
                    service.syncPaymentStatus(`payment-${i}`, PaymentStatus.COMPLETED)
                );
            }

            await Promise.all(promises);

            expect(updates).toHaveLength(10);
            expect(updates.every(u => u.new_status === PaymentStatus.COMPLETED)).toBe(true);
        });
    });

    describe('Real-World Scenarios', () => {
        it('should handle complete enrollment workflow', async () => {
            const allUpdates: any[] = [];
            const adminUpdates: any[] = [];

            service.subscribeToStatusUpdates((update) => {
                allUpdates.push({ ...update, step: 'status_update' });
            });

            service.subscribeToAdminUpdates((update) => {
                adminUpdates.push({ ...update, step: 'admin_notification' });
            });

            // Step 1: User submits EFT enrollment
            const eftEnrollment = {
                ...mockEnrollmentData,
                payment_type: 'eft',
                status: 'pending'
            };

            mockSupabaseData.set('enrollment-123', eftEnrollment);

            // Simulate INSERT event
            const handlers = mockSupabaseSubscriptions.get('enrollment_changes') || [];
            handlers.forEach((handler: any) => {
                handler({
                    eventType: 'INSERT',
                    new: eftEnrollment
                });
            });

            await new Promise(resolve => setTimeout(resolve, 20));

            // Step 2: Admin approves enrollment
            await service.syncEnrollmentStatus('enrollment-123', EnrollmentStatus.APPROVED);

            await new Promise(resolve => setTimeout(resolve, 20));

            // Verify complete workflow
            expect(adminUpdates).toHaveLength(1);
            expect(adminUpdates[0].type).toBe('new_eft_enrollment');

            expect(allUpdates.length).toBeGreaterThan(0);
            expect(allUpdates.some(u => u.new_status === EnrollmentStatus.APPROVED)).toBe(true);
        });
    });
});