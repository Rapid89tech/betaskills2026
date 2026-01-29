import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CourseCard from '@/components/CourseCard';
import { EnrollmentStatus, PaymentType } from '@/types/enrollment';
import { realTimeService } from '@/services/RealTimeService';

/**
 * Enhanced Course Card Demo
 * 
 * Demonstrates the real-time enrollment status updates, optimistic UI updates,
 * and visual feedback for different enrollment states.
 */

const EnhancedCourseCardDemo: React.FC = () => {
  const [demoEnrollment, setDemoEnrollment] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Demo course data
  const demoCourse = {
    id: 'demo-course-1',
    title: 'Real-time Enrollment Demo Course',
    description: 'A demonstration course showing real-time enrollment status updates and optimistic UI feedback.',
    price: 99,
    currency: 'R',
    is_free: false,
    rating: 4.8,
    students: 250,
    instructor: {
      first_name: 'Demo',
      last_name: 'Instructor'
    }
  };

  // Simulate enrollment states
  const simulateEnrollmentState = (status: EnrollmentStatus, paymentType: PaymentType) => {
    const enrollment = {
      id: 'demo-enrollment-1',
      user_id: 'demo-user-1',
      course_id: 'demo-course-1',
      status,
      payment_type: paymentType,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    setDemoEnrollment(enrollment);

    // Simulate real-time update
    const customEvent = new CustomEvent('force-course-card-refresh', {
      detail: {
        courseId: 'demo-course-1',
        newStatus: status.toLowerCase(),
        paymentType: paymentType.toLowerCase()
      }
    });

    window.dispatchEvent(customEvent);
  };

  // Connect to real-time service
  const connectRealTime = async () => {
    try {
      await realTimeService.connect();
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect to real-time service:', error);
    }
  };

  // Disconnect from real-time service
  const disconnectRealTime = () => {
    realTimeService.disconnect();
    setIsConnected(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Enhanced Course Card Demo
          </CardTitle>
          <p className="text-center text-gray-600">
            Demonstrating real-time enrollment status updates and optimistic UI feedback
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Course Card Demo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Enhanced Course Card</h3>
              <div className="max-w-sm">
                <CourseCard 
                  course={demoCourse}
                  enrollment={demoEnrollment}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Demo Controls</h3>
              
              {/* Real-time Connection */}
              <div className="space-y-2">
                <h4 className="font-medium">Real-time Service</h4>
                <div className="flex items-center gap-2">
                  <Badge variant={isConnected ? "default" : "secondary"}>
                    {isConnected ? "Connected" : "Disconnected"}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={isConnected ? disconnectRealTime : connectRealTime}
                    variant={isConnected ? "outline" : "default"}
                  >
                    {isConnected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              </div>

              {/* Enrollment State Simulation */}
              <div className="space-y-2">
                <h4 className="font-medium">Simulate Enrollment States</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDemoEnrollment(null)}
                  >
                    No Enrollment
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => simulateEnrollmentState(EnrollmentStatus.PENDING, PaymentType.EFT)}
                  >
                    Pending EFT
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => simulateEnrollmentState(EnrollmentStatus.PENDING, PaymentType.CARD)}
                  >
                    Pending Card
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => simulateEnrollmentState(EnrollmentStatus.APPROVED, PaymentType.EFT)}
                  >
                    Approved EFT
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => simulateEnrollmentState(EnrollmentStatus.APPROVED, PaymentType.CARD)}
                  >
                    Approved Card
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => simulateEnrollmentState(EnrollmentStatus.REJECTED, PaymentType.EFT)}
                  >
                    Rejected
                  </Button>
                </div>
              </div>

              {/* Current State Display */}
              <div className="space-y-2">
                <h4 className="font-medium">Current State</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {demoEnrollment ? (
                    <div className="space-y-1 text-sm">
                      <div><strong>Status:</strong> {demoEnrollment.status}</div>
                      <div><strong>Payment Type:</strong> {demoEnrollment.payment_type}</div>
                      <div><strong>Updated:</strong> {new Date(demoEnrollment.updated_at).toLocaleTimeString()}</div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">No enrollment</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Enhanced Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-medium text-green-600 mb-2">✅ Real-time Status Updates</h4>
                <p className="text-sm text-gray-600">
                  Course cards update immediately when enrollment status changes, 
                  without requiring page refresh.
                </p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-medium text-blue-600 mb-2">⚡ Optimistic UI Updates</h4>
                <p className="text-sm text-gray-600">
                  Card payments show immediate feedback with automatic rollback 
                  on failure for better user experience.
                </p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-medium text-yellow-600 mb-2">🔄 Cross-tab Synchronization</h4>
                <p className="text-sm text-gray-600">
                  Enrollment status updates are synchronized across all browser 
                  tabs using BroadcastChannel API.
                </p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-medium text-purple-600 mb-2">🎨 Visual Feedback</h4>
                <p className="text-sm text-gray-600">
                  Different enrollment states have distinct visual indicators 
                  including badges, button states, and loading animations.
                </p>
              </Card>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Implementation Notes</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Uses WebSocket connections for real-time updates</li>
              <li>• Implements optimistic UI updates with timeout-based rollback</li>
              <li>• Provides visual feedback for pending EFT enrollments</li>
              <li>• Handles admin-approved enrollments with immediate button state changes</li>
              <li>• Includes comprehensive error handling and recovery mechanisms</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedCourseCardDemo;