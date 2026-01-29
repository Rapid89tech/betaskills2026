/**
 * RealTimeService Example Component
 * 
 * Demonstrates how to use the RealTimeService for real-time enrollment updates,
 * cross-tab synchronization, and connection status monitoring.
 */

import React, { useState, useEffect } from 'react';
import { realTimeService } from '@/services/RealTimeService';
import { EnrollmentUpdate, EnrollmentUpdateType } from '@/types/enrollment';

export const RealTimeServiceExample: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [enrollmentUpdates, setEnrollmentUpdates] = useState<EnrollmentUpdate[]>([]);
    const [adminUpdates, setAdminUpdates] = useState<EnrollmentUpdate[]>([]);
    const [queuedMessages, setQueuedMessages] = useState(0);

    useEffect(() => {
        // Connect to real-time service
        const connectService = async () => {
            try {
                await realTimeService.connect();
                console.log('✅ Connected to RealTimeService');
            } catch (error) {
                console.error('❌ Failed to connect to RealTimeService:', error);
            }
        };

        connectService();

        // Subscribe to connection status
        const unsubscribeConnection = realTimeService.subscribeToConnectionStatus((connected) => {
            setIsConnected(connected);
            setQueuedMessages(realTimeService.getQueuedMessagesCount());
        });

        // Subscribe to enrollment updates
        const unsubscribeEnrollments = realTimeService.subscribeToEnrollments((update) => {
            console.log('📨 Received enrollment update:', update);
            setEnrollmentUpdates(prev => [update, ...prev.slice(0, 9)]); // Keep last 10
        });

        // Subscribe to admin updates
        const unsubscribeAdmin = realTimeService.subscribeToAdminUpdates((update) => {
            console.log('👨‍💼 Received admin update:', update);
            setAdminUpdates(prev => [update, ...prev.slice(0, 9)]); // Keep last 10
        });

        // Cleanup on unmount
        return () => {
            unsubscribeConnection();
            unsubscribeEnrollments();
            unsubscribeAdmin();
        };
    }, []);

    const handleTestUpdate = () => {
        // Simulate an enrollment update
        const testUpdate: EnrollmentUpdate = {
            type: EnrollmentUpdateType.ENROLLMENT_CREATED,
            enrollmentId: `test-${Date.now()}`,
            userId: 'test-user-id',
            courseId: 'test-course-id',
            status: 'PENDING' as any,
            timestamp: new Date()
        };

        realTimeService.broadcastEnrollmentUpdate(testUpdate);
    };

    const handleSyncTabs = () => {
        realTimeService.syncCrossTab();
    };

    const handleReconnect = async () => {
        try {
            await realTimeService.connect();
        } catch (error) {
            console.error('❌ Reconnection failed:', error);
        }
    };

    const getStatusColor = (connected: boolean) => {
        return connected ? 'text-green-600' : 'text-red-600';
    };

    const getUpdateTypeColor = (type: EnrollmentUpdateType) => {
        switch (type) {
            case EnrollmentUpdateType.ENROLLMENT_CREATED:
                return 'text-blue-600';
            case EnrollmentUpdateType.ENROLLMENT_APPROVED:
                return 'text-green-600';
            case EnrollmentUpdateType.ENROLLMENT_REJECTED:
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">RealTimeService Example</h1>

            {/* Connection Status */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-lg font-semibold mb-3">Connection Status</h2>
                <div className="flex items-center gap-4">
                    <div className={`font-medium ${getStatusColor(isConnected)}`}>
                        {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
                    </div>
                    {queuedMessages > 0 && (
                        <div className="text-yellow-600">
                            📥 {queuedMessages} queued messages
                        </div>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-lg font-semibold mb-3">Controls</h2>
                <div className="flex gap-3">
                    <button
                        onClick={handleTestUpdate}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        📡 Test Update
                    </button>
                    <button
                        onClick={handleSyncTabs}
                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                        🔄 Sync Tabs
                    </button>
                    <button
                        onClick={handleReconnect}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        disabled={isConnected}
                    >
                        🔌 Reconnect
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Enrollment Updates */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-3">
                        📨 Enrollment Updates ({enrollmentUpdates.length})
                    </h2>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {enrollmentUpdates.length === 0 ? (
                            <p className="text-gray-500 text-sm">No updates yet</p>
                        ) : (
                            enrollmentUpdates.map((update, index) => (
                                <div key={index} className="border rounded p-2 text-sm">
                                    <div className={`font-medium ${getUpdateTypeColor(update.type)}`}>
                                        {update.type}
                                    </div>
                                    <div className="text-gray-600">
                                        Course: {update.courseId}
                                    </div>
                                    <div className="text-gray-600">
                                        User: {update.userId}
                                    </div>
                                    <div className="text-gray-500 text-xs">
                                        {update.timestamp.toLocaleTimeString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Admin Updates */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-3">
                        👨‍💼 Admin Updates ({adminUpdates.length})
                    </h2>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {adminUpdates.length === 0 ? (
                            <p className="text-gray-500 text-sm">No admin updates yet</p>
                        ) : (
                            adminUpdates.map((update, index) => (
                                <div key={index} className="border rounded p-2 text-sm">
                                    <div className={`font-medium ${getUpdateTypeColor(update.type)}`}>
                                        {update.type}
                                    </div>
                                    <div className="text-gray-600">
                                        Enrollment: {update.enrollmentId}
                                    </div>
                                    <div className="text-gray-600">
                                        Status: {update.status}
                                    </div>
                                    <div className="text-gray-500 text-xs">
                                        {update.timestamp.toLocaleTimeString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Usage Instructions */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <h3 className="font-semibold mb-2">Usage Instructions:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li>• The service automatically connects on component mount</li>
                    <li>• Click "Test Update" to simulate an enrollment update</li>
                    <li>• Click "Sync Tabs" to synchronize state across browser tabs</li>
                    <li>• Open this page in multiple tabs to see cross-tab synchronization</li>
                    <li>• Connection status shows real-time WebSocket state</li>
                    <li>• Messages are queued when offline and processed when reconnected</li>
                </ul>
            </div>
        </div>
    );
};

export default RealTimeServiceExample;