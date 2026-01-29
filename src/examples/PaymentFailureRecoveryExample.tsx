/**
 * Payment Failure Recovery Example
 * 
 * Demonstrates how to integrate the payment failure recovery system
 * into course enrollment components and payment flows.
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */

import React, { useState } from 'react';
import { AlertCircle, CreditCard, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { 
  usePaymentFailureRecovery,
  UsePaymentFailureRecoveryOptions 
} from '../hooks/usePaymentFailureRecovery';
import { 
  PaymentFailureRecovery, 
  PaymentFailureAlert,
  PaymentFailureStats 
} from '../components/PaymentFailureRecovery';

import { 
  PaymentData, 
  IkhokhaError, 
  NetworkError, 
  PaymentValidationError 
} from '../types/ikhokha';

/**
 * Course Card with Payment Failure Recovery
 * Shows how to integrate failure recovery into course enrollment
 */
export function CourseCardWithFailureRecovery() {
  const [enrollmentStatus, setEnrollmentStatus] = useState<'none' | 'pending' | 'failed' | 'approved'>('none');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);

  const course = {
    id: 'course-react-advanced',
    title: 'Advanced React Development',
    price: 299.99,
    currency: 'ZAR',
    description: 'Master advanced React patterns and techniques'
  };

  const mockPaymentData: PaymentData = {
    sessionId: 'session-' + Date.now(),
    amount: course.price,
    currency: course.currency,
    reference: 'ref-' + Date.now(),
    customer: {
      email: 'student@example.com',
      name: 'John Doe'
    },
    metadata: {
      userId: 'user-123',
      courseId: course.id,
      courseName: course.title
    }
  };

  const recoveryOptions: UsePaymentFailureRecoveryOptions = {
    maxRetryAttempts: 3,
    autoRetry: false, // Manual retry for better UX
    onRecoveryComplete: (result) => {
      if (result.success) {
        setEnrollmentStatus('approved');
        console.log('✅ Payment recovery successful!');
      }
    },
    onManualApprovalRequired: (enrollmentId) => {
      setEnrollmentStatus('pending');
      console.log('📋 Manual approval required for enrollment:', enrollmentId);
    }
  };

  const [failureState, failureActions] = usePaymentFailureRecovery(recoveryOptions);

  /**
   * Simulate payment processing with different failure scenarios
   */
  const simulatePayment = async (failureType?: 'network' | 'declined' | 'validation' | 'critical') => {
    setIsProcessingPayment(true);
    setEnrollmentStatus('pending');
    
    const newEnrollmentId = 'enrollment-' + Date.now();
    setEnrollmentId(newEnrollmentId);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate different types of failures
      if (failureType) {
        let error: Error;
        
        switch (failureType) {
          case 'network':
            error = new NetworkError('Connection timeout - please check your internet connection');
            break;
          case 'declined':
            error = new IkhokhaError('Payment was declined by your bank', 'PAYMENT_DECLINED');
            break;
          case 'validation':
            error = new PaymentValidationError('Invalid card number format');
            break;
          case 'critical':
            error = new IkhokhaError('Payment service configuration error', 'CONFIGURATION_ERROR');
            break;
          default:
            error = new Error('Unknown payment error');
        }

        // Handle the failure through our recovery system
        await failureActions.handlePaymentFailure(error, mockPaymentData, newEnrollmentId);
        setEnrollmentStatus('failed');
      } else {
        // Simulate successful payment
        setEnrollmentStatus('approved');
        console.log('✅ Payment successful!');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setEnrollmentStatus('failed');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  /**
   * Handle retry from failure recovery component
   */
  const handleRetrySuccess = () => {
    setEnrollmentStatus('approved');
    failureActions.clearFailure();
    console.log('✅ Payment retry successful!');
  };

  /**
   * Handle contact support
   */
  const handleContactSupport = () => {
    console.log('📞 Contacting support for enrollment:', enrollmentId);
    // In a real app, this would open a support ticket or chat
    alert('Support has been contacted. You will receive assistance within 24 hours.');
  };

  /**
   * Get button content based on enrollment status
   */
  const getEnrollmentButton = () => {
    if (isProcessingPayment) {
      return (
        <Button disabled className="w-full">
          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          Processing Payment...
        </Button>
      );
    }

    switch (enrollmentStatus) {
      case 'none':
        return (
          <Button onClick={() => simulatePayment()} className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            Enroll Now - {course.currency} {course.price}
          </Button>
        );
      
      case 'pending':
        return (
          <Button disabled variant="outline" className="w-full">
            <Clock className="h-4 w-4 mr-2" />
            Pending Approval
          </Button>
        );
      
      case 'approved':
        return (
          <Button variant="default" className="w-full">
            <CheckCircle className="h-4 w-4 mr-2" />
            Continue Course
          </Button>
        );
      
      case 'failed':
        return (
          <Button 
            onClick={() => simulatePayment()} 
            variant="outline" 
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        );
      
      default:
        return null;
    }
  };

  /**
   * Get status badge
   */
  const getStatusBadge = () => {
    switch (enrollmentStatus) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'approved':
        return <Badge variant="default">Enrolled</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Course Card */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{course.title}</CardTitle>
            {getStatusBadge()}
          </div>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {getEnrollmentButton()}
          
          {/* Failure Recovery Component */}
          {failureState.hasFailure && enrollmentId && (
            <PaymentFailureRecovery
              enrollmentId={enrollmentId}
              courseTitle={course.title}
              paymentAmount={course.price}
              currency={course.currency}
              onRetrySuccess={handleRetrySuccess}
              onContactSupport={handleContactSupport}
            />
          )}
        </CardContent>
      </Card>

      {/* Test Failure Scenarios */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-sm">Test Failure Scenarios</CardTitle>
          <CardDescription>
            Simulate different payment failure types to see recovery in action
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => simulatePayment('network')}
              disabled={isProcessingPayment}
            >
              Network Error
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => simulatePayment('declined')}
              disabled={isProcessingPayment}
            >
              Payment Declined
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => simulatePayment('validation')}
              disabled={isProcessingPayment}
            >
              Validation Error
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => simulatePayment('critical')}
              disabled={isProcessingPayment}
            >
              Critical Error
            </Button>
          </div>
          
          <Separator />
          
          <Button 
            size="sm" 
            variant="default" 
            onClick={() => simulatePayment()}
            disabled={isProcessingPayment}
            className="w-full"
          >
            Successful Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Compact Payment Failure Alert Example
 * Shows how to use the compact alert component
 */
export function CompactFailureAlertExample() {
  const [showAlert, setShowAlert] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const mockErrorMessage = {
    title: 'Payment Failed',
    message: 'Your card was declined. Please try a different payment method or contact your bank.',
    actionText: 'Retry Payment',
    actionType: 'retry' as const,
    showRetryButton: true,
    showChangeMethodButton: true,
    showContactSupport: false,
    additionalInfo: 'You can also try again with the same card.'
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    // Simulate retry delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRetrying(false);
    setShowAlert(false);
    console.log('Retry completed');
  };

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-sm">Compact Failure Alert</CardTitle>
          <CardDescription>
            Lightweight alert for smaller UI spaces
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => setShowAlert(true)} variant="outline">
            Show Payment Failure Alert
          </Button>
          
          {showAlert && (
            <PaymentFailureAlert
              errorMessage={mockErrorMessage}
              onRetry={handleRetry}
              onDismiss={handleDismiss}
              isRetrying={isRetrying}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Admin Dashboard Failure Stats Example
 * Shows payment failure statistics for administrators
 */
export function AdminFailureStatsExample() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Failure Dashboard</CardTitle>
          <CardDescription>
            Monitor payment failures and recovery statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentFailureStats />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Recovery Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Manual Approval Required</AlertTitle>
            <AlertDescription>
              3 enrollments are waiting for manual approval due to payment failures.
              <div className="mt-2">
                <Button size="sm" variant="outline">
                  Review Pending Enrollments
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>High Failure Rate Detected</AlertTitle>
            <AlertDescription>
              Payment failure rate has increased by 15% in the last hour.
              This may indicate an issue with the payment gateway.
              <div className="mt-2">
                <Button size="sm" variant="outline">
                  Check System Status
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Complete Payment Failure Recovery Example
 * Combines all components to show the full system
 */
export function CompletePaymentFailureRecoveryExample() {
  const [activeTab, setActiveTab] = useState<'course' | 'compact' | 'admin'>('course');

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Payment Failure Recovery System</h1>
        <p className="text-muted-foreground">
          Comprehensive payment failure handling with user-friendly recovery options
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-2">
        <Button 
          variant={activeTab === 'course' ? 'default' : 'outline'}
          onClick={() => setActiveTab('course')}
        >
          Course Enrollment
        </Button>
        <Button 
          variant={activeTab === 'compact' ? 'default' : 'outline'}
          onClick={() => setActiveTab('compact')}
        >
          Compact Alerts
        </Button>
        <Button 
          variant={activeTab === 'admin' ? 'default' : 'outline'}
          onClick={() => setActiveTab('admin')}
        >
          Admin Dashboard
        </Button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'course' && <CourseCardWithFailureRecovery />}
        {activeTab === 'compact' && <CompactFailureAlertExample />}
        {activeTab === 'admin' && <AdminFailureStatsExample />}
      </div>

      {/* Feature Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">✅ Requirement 7.1</h4>
              <p className="text-sm text-muted-foreground">
                Clear error messages with retry options for all payment failures
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">✅ Requirement 7.2</h4>
              <p className="text-sm text-muted-foreground">
                Enrollment status remains pending until successful payment completion
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">✅ Requirement 7.3</h4>
              <p className="text-sm text-muted-foreground">
                Intelligent retry mechanism with exponential backoff for failed transactions
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">✅ Requirement 7.4</h4>
              <p className="text-sm text-muted-foreground">
                Automatic fallback to manual approval for persistent payment failures
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CompletePaymentFailureRecoveryExample;