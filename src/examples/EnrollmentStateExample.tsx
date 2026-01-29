/**
 * EnrollmentStateExample Component
 * 
 * Example implementation showing how to use the EnrollmentStateManager
 * and useEnrollmentState hook in a CourseCard component.
 * 
 * This demonstrates the complete enrollment flow from discovery to course access.
 */

import React from 'react';
import { useCourseCardState } from '@/hooks/useEnrollmentState';
import { ButtonAction } from '@/services/EnrollmentStateManager';
import { PaymentType } from '@/types/ikhokha';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, Clock, AlertCircle, CreditCard } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
}

interface EnrollmentStateExampleProps {
  course: Course;
  user?: User;
  onAuthRedirect: () => void;
  onPaymentInitiate: (courseId: string, paymentType: PaymentType) => void;
  onCourseAccess: (courseId: string) => void;
}

export const EnrollmentStateExample: React.FC<EnrollmentStateExampleProps> = ({
  course,
  user,
  onAuthRedirect,
  onPaymentInitiate,
  onCourseAccess
}) => {
  const {
    enrollmentState,
    isLoading,
    error,
    createEnrollment,
    buttonText,
    buttonAction,
    isButtonDisabled,
    hasAccess,
    requiresApproval
  } = useCourseCardState(course.id, user?.id, user?.isLoggedIn);

  // Handle button click based on current state
  const handleButtonClick = async () => {
    try {
      switch (buttonAction) {
        case ButtonAction.REDIRECT_TO_AUTH:
          onAuthRedirect();
          break;

        case ButtonAction.INITIATE_ENROLLMENT:
          if (user) {
            // Create enrollment first
            await createEnrollment(user.email, course.title, PaymentType.CARD);
            // Then initiate payment
            onPaymentInitiate(course.id, PaymentType.CARD);
          }
          break;

        case ButtonAction.CONTINUE_COURSE:
          onCourseAccess(course.id);
          break;

        case ButtonAction.RETRY_PAYMENT:
          onPaymentInitiate(course.id, PaymentType.CARD);
          break;

        case ButtonAction.SHOW_PENDING:
        default:
          // No action for pending states
          break;
      }
    } catch (error) {
      console.error('Error handling button click:', error);
    }
  };

  // Get status badge variant and icon
  const getStatusBadge = () => {
    switch (enrollmentState.status) {
      case 'approved':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Enrolled
          </Badge>
        );
      case 'pending':
        if (requiresApproval) {
          return (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Clock className="w-3 h-3 mr-1" />
              Pending Approval
            </Badge>
          );
        } else {
          return (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Processing
            </Badge>
          );
        }
      case 'rejected':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Payment Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  // Get button variant based on action
  const getButtonVariant = () => {
    switch (buttonAction) {
      case ButtonAction.CONTINUE_COURSE:
        return 'default';
      case ButtonAction.INITIATE_ENROLLMENT:
        return 'default';
      case ButtonAction.REDIRECT_TO_AUTH:
        return 'outline';
      case ButtonAction.RETRY_PAYMENT:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Get button icon
  const getButtonIcon = () => {
    if (isLoading) {
      return <Loader2 className="w-4 h-4 mr-2 animate-spin" />;
    }

    switch (buttonAction) {
      case ButtonAction.INITIATE_ENROLLMENT:
      case ButtonAction.RETRY_PAYMENT:
        return <CreditCard className="w-4 h-4 mr-2" />;
      case ButtonAction.CONTINUE_COURSE:
        return <CheckCircle className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
            <CardDescription className="mt-1">{course.description}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium">R{course.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration:</span>
            <span>{course.duration}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Level:</span>
            <span>{course.level}</span>
          </div>
          
          {hasAccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 font-medium">
                ✅ You have access to this course
              </p>
            </div>
          )}

          {requiresApproval && enrollmentState.status === 'pending' && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                Your EFT payment is being reviewed by our admin team. 
                You'll receive access once approved.
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">
                ⚠️ {error}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleButtonClick}
          disabled={isButtonDisabled || isLoading}
          variant={getButtonVariant()}
          className="w-full"
        >
          {getButtonIcon()}
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Example usage in a course listing page
export const CourseListingExample: React.FC = () => {
  const sampleCourses: Course[] = [
    {
      id: 'course-1',
      title: 'Web Development Fundamentals',
      description: 'Learn HTML, CSS, and JavaScript basics',
      price: 299,
      duration: '8 weeks',
      level: 'Beginner'
    },
    {
      id: 'course-2',
      title: 'Advanced React Development',
      description: 'Master React hooks, context, and performance',
      price: 499,
      duration: '12 weeks',
      level: 'Advanced'
    }
  ];

  const sampleUser: User = {
    id: 'user-123',
    email: 'student@example.com',
    name: 'John Doe',
    isLoggedIn: true
  };

  const handleAuthRedirect = () => {
    console.log('Redirecting to authentication...');
    // Implement auth redirect logic
  };

  const handlePaymentInitiate = (courseId: string, paymentType: PaymentType) => {
    console.log(`Initiating ${paymentType} payment for course ${courseId}`);
    // Implement payment initiation logic
  };

  const handleCourseAccess = (courseId: string) => {
    console.log(`Accessing course ${courseId}`);
    // Implement course access logic
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCourses.map((course) => (
          <EnrollmentStateExample
            key={course.id}
            course={course}
            user={sampleUser}
            onAuthRedirect={handleAuthRedirect}
            onPaymentInitiate={handlePaymentInitiate}
            onCourseAccess={handleCourseAccess}
          />
        ))}
      </div>
    </div>
  );
};

// Example admin component for managing enrollments
export const AdminEnrollmentExample: React.FC = () => {
  const [selectedCourse] = React.useState('course-1');
  const [selectedUser] = React.useState('user-123');

  const {
    enrollmentState,
    approveEnrollment,
    rejectEnrollment,
    isLoading,
    error
  } = useCourseCardState(selectedCourse, selectedUser, true);

  const handleApprove = async () => {
    if (enrollmentState.enrollmentId) {
      try {
        await approveEnrollment(enrollmentState.enrollmentId, 'admin-456', 'Manual approval');
        console.log('Enrollment approved successfully');
      } catch (error) {
        console.error('Failed to approve enrollment:', error);
      }
    }
  };

  const handleReject = async () => {
    if (enrollmentState.enrollmentId) {
      try {
        await rejectEnrollment(
          enrollmentState.enrollmentId, 
          'Insufficient documentation provided', 
          'admin-456'
        );
        console.log('Enrollment rejected successfully');
      } catch (error) {
        console.error('Failed to reject enrollment:', error);
      }
    }
  };

  if (enrollmentState.status !== 'pending' || !enrollmentState.requiresApproval) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            No pending enrollments requiring approval
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Pending Enrollment Approval</CardTitle>
        <CardDescription>
          EFT payment received - requires manual approval
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <Badge variant="secondary">Pending Approval</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Payment Type:</span>
            <span>{enrollmentState.paymentType?.toUpperCase()}</span>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">⚠️ {error}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          onClick={handleApprove}
          disabled={isLoading}
          variant="default"
          className="flex-1"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <CheckCircle className="w-4 h-4 mr-2" />
          )}
          Approve
        </Button>
        
        <Button
          onClick={handleReject}
          disabled={isLoading}
          variant="destructive"
          className="flex-1"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <AlertCircle className="w-4 h-4 mr-2" />
          )}
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
};