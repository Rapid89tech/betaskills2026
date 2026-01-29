/**
 * EnrollmentManager Usage Example
 * 
 * This example demonstrates how to use the EnrollmentManager service
 * in React components for handling enrollment operations and real-time updates.
 */

import React, { useState, useEffect } from 'react';
import { enrollmentManager } from '@/services/EnrollmentManager';
import { 
  Enrollment, 
  EnrollmentUpdate, 
  PaymentType,
  EnrollmentStatus 
} from '@/types/enrollment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface EnrollmentManagerExampleProps {
  userId: string;
  courseId: string;
  courseTitle: string;
  isAdmin?: boolean;
}

export const EnrollmentManagerExample: React.FC<EnrollmentManagerExampleProps> = ({
  userId,
  courseId,
  courseTitle,
  isAdmin = false
}) => {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [pendingEnrollments, setPendingEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);

  // Load initial enrollment status
  useEffect(() => {
    const loadEnrollmentStatus = async () => {
      try {
        const status = await enrollmentManager.getEnrollmentStatus(userId, courseId);
        setEnrollment(status);
      } catch (error) {
        console.error('Failed to load enrollment status:', error);
      }
    };

    loadEnrollmentStatus();
  }, [userId, courseId]);

  // Load pending enrollments for admin
  useEffect(() => {
    if (!isAdmin) return;

    const loadPendingEnrollments = async () => {
      try {
        const pending = await enrollmentManager.getPendingEFTEnrollments();
        setPendingEnrollments(pending);
      } catch (error) {
        console.error('Failed to load pending enrollments:', error);
      }
    };

    loadPendingEnrollments();
  }, [isAdmin]);

  // Subscribe to real-time updates
  useEffect(() => {
    const handleEnrollmentUpdate = (update: EnrollmentUpdate) => {
      console.log('Enrollment update received:', update);
      
      // Update local state if this update affects current user/course
      if (update.userId === userId && update.courseId === courseId) {
        // Reload enrollment status
        enrollmentManager.getEnrollmentStatus(userId, courseId)
          .then(setEnrollment)
          .catch(console.error);
        
        // Show notification
        if (update.status === EnrollmentStatus.APPROVED) {
          toast.success('Enrollment approved! You now have access to the course.');
        } else if (update.status === EnrollmentStatus.REJECTED) {
          toast.error('Enrollment was rejected. Please contact support.');
        }
      }
      
      // Update pending list for admin
      if (isAdmin) {
        enrollmentManager.getPendingEFTEnrollments()
          .then(setPendingEnrollments)
          .catch(console.error);
      }
    };

    const handleAdminUpdate = (update: EnrollmentUpdate) => {
      console.log('Admin update received:', update);
      
      if (isAdmin) {
        toast.info(`New enrollment request: ${update.courseId}`);
        
        // Reload pending enrollments
        enrollmentManager.getPendingEFTEnrollments()
          .then(setPendingEnrollments)
          .catch(console.error);
      }
    };

    // Subscribe to updates
    const unsubscribeEnrollment = enrollmentManager.subscribeToEnrollmentUpdates(handleEnrollmentUpdate);
    const unsubscribeAdmin = enrollmentManager.subscribeToAdminUpdates(handleAdminUpdate);

    return () => {
      unsubscribeEnrollment();
      unsubscribeAdmin();
    };
  }, [userId, courseId, isAdmin]);

  // Handle EFT enrollment
  const handleEFTEnrollment = async () => {
    setLoading(true);
    try {
      const result = await enrollmentManager.processEFTEnrollment(userId, courseId, {
        amount: 500,
        currency: 'ZAR',
        reference: `EFT_${Date.now()}`
      });

      if (result.success) {
        setEnrollment(result.enrollment!);
        toast.success('EFT enrollment submitted successfully! Awaiting admin approval.');
      } else {
        toast.error(result.error || 'Failed to process EFT enrollment');
      }
    } catch (error) {
      toast.error('An error occurred during enrollment');
      console.error('EFT enrollment error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle card enrollment
  const handleCardEnrollment = async () => {
    setLoading(true);
    try {
      const result = await enrollmentManager.processCardEnrollment(userId, courseId, {
        amount: 500,
        currency: 'ZAR'
      });

      if (result.success) {
        setEnrollment(result.enrollment!);
        toast.success('Payment successful! You now have access to the course.');
      } else {
        toast.error(result.error || 'Payment failed');
      }
    } catch (error) {
      toast.error('An error occurred during payment');
      console.error('Card enrollment error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle admin approval
  const handleApproval = async (enrollmentId: string) => {
    try {
      await enrollmentManager.approveEnrollment(enrollmentId, userId);
      toast.success('Enrollment approved successfully');
      
      // Reload pending enrollments
      const pending = await enrollmentManager.getPendingEFTEnrollments();
      setPendingEnrollments(pending);
    } catch (error) {
      toast.error('Failed to approve enrollment');
      console.error('Approval error:', error);
    }
  };

  // Handle admin rejection
  const handleRejection = async (enrollmentId: string) => {
    try {
      await enrollmentManager.rejectEnrollment(enrollmentId, userId, 'Invalid payment proof');
      toast.success('Enrollment rejected');
      
      // Reload pending enrollments
      const pending = await enrollmentManager.getPendingEFTEnrollments();
      setPendingEnrollments(pending);
    } catch (error) {
      toast.error('Failed to reject enrollment');
      console.error('Rejection error:', error);
    }
  };

  const getStatusBadge = (status: EnrollmentStatus) => {
    const variants = {
      [EnrollmentStatus.PENDING]: 'secondary',
      [EnrollmentStatus.APPROVED]: 'default',
      [EnrollmentStatus.REJECTED]: 'destructive',
      [EnrollmentStatus.COMPLETED]: 'outline'
    } as const;

    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Student Enrollment Section */}
      <Card>
        <CardHeader>
          <CardTitle>Course Enrollment: {courseTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {enrollment ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Status:</span>
                {getStatusBadge(enrollment.status)}
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Type:</span>
                <Badge variant="outline">{enrollment.paymentType}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Enrolled:</span>
                <span>{enrollment.createdAt.toLocaleDateString()}</span>
              </div>
              
              {enrollment.status === EnrollmentStatus.APPROVED && (
                <Button className="w-full">Continue Course</Button>
              )}
              
              {enrollment.status === EnrollmentStatus.PENDING && (
                <div className="text-sm text-muted-foreground">
                  Your enrollment is pending approval. You will be notified when approved.
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                You are not enrolled in this course. Choose a payment method to enroll:
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={handleEFTEnrollment} 
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? 'Processing...' : 'EFT Payment'}
                </Button>
                <Button 
                  onClick={handleCardEnrollment} 
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Card Payment'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admin Section */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Pending EFT Enrollments ({pendingEnrollments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingEnrollments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pending enrollments</p>
            ) : (
              <div className="space-y-4">
                {pendingEnrollments.map((pendingEnrollment) => (
                  <div 
                    key={pendingEnrollment.id} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">
                        Course: {pendingEnrollment.courseId}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        User: {pendingEnrollment.userId}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Submitted: {pendingEnrollment.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApproval(pendingEnrollment.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleRejection(pendingEnrollment.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnrollmentManagerExample;