/**
 * Payment Failure Recovery Component
 * 
 * UI component for displaying payment failures and providing recovery options.
 * Shows user-friendly error messages with retry buttons and alternative actions.
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */

import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw, CreditCard, Phone, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  usePaymentFailureRecovery, 
  PaymentFailureState, 
  PaymentFailureActions 
} from '../hooks/usePaymentFailureRecovery';
import { UserFriendlyErrorMessage } from '../services/PaymentFailureRecoveryService';

export interface PaymentFailureRecoveryProps {
  enrollmentId: string;
  courseTitle: string;
  paymentAmount: number;
  currency: string;
  onRetrySuccess?: () => void;
  onManualApprovalRequired?: () => void;
  onContactSupport?: () => void;
  className?: string;
}

/**
 * Payment Failure Recovery Component
 */
export function PaymentFailureRecovery({
  enrollmentId,
  courseTitle,
  paymentAmount,
  currency,
  onRetrySuccess,
  onManualApprovalRequired,
  onContactSupport,
  className = ''
}: PaymentFailureRecoveryProps) {
  const [failureState, actions] = usePaymentFailureRecovery({
    maxRetryAttempts: 3,
    autoRetry: false, // Manual retry for better UX
    onRecoveryComplete: (result) => {
      if (result.success && onRetrySuccess) {
        onRetrySuccess();
      }
      if (result.action === 'manual_approval' && onManualApprovalRequired) {
        onManualApprovalRequired();
      }
    },
    onManualApprovalRequired: onManualApprovalRequired
  });

  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);

  // Countdown timer for next retry
  useEffect(() => {
    if (failureState.nextRetryAt && failureState.isRetryScheduled) {
      const updateCountdown = () => {
        const now = Date.now();
        const retryTime = failureState.nextRetryAt!.getTime();
        const remaining = Math.max(0, Math.ceil((retryTime - now) / 1000));
        
        setRetryCountdown(remaining);
        
        if (remaining === 0) {
          setRetryCountdown(null);
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      
      return () => clearInterval(interval);
    } else {
      setRetryCountdown(null);
    }
  }, [failureState.nextRetryAt, failureState.isRetryScheduled]);

  // Don't render if no failure
  if (!failureState.hasFailure || !failureState.errorMessage) {
    return null;
  }

  const errorMessage = failureState.errorMessage;

  /**
   * Handle retry button click
   */
  const handleRetry = async () => {
    try {
      await actions.retryPayment(enrollmentId);
    } catch (error) {
      console.error('Retry failed:', error);
    }
  };

  /**
   * Handle contact support
   */
  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport();
    } else {
      // Default support action
      window.open('mailto:support@example.com?subject=Payment Issue&body=I need help with payment for enrollment ' + enrollmentId);
    }
  };

  /**
   * Get alert variant based on error type
   */
  const getAlertVariant = (): "default" | "destructive" => {
    if (errorMessage.actionType === 'contact_support') {
      return 'destructive';
    }
    return 'default';
  };

  /**
   * Get status badge
   */
  const getStatusBadge = () => {
    if (failureState.isRecovering) {
      return <Badge variant="secondary">Processing...</Badge>;
    }
    
    if (failureState.recoveryResult?.action === 'manual_approval') {
      return <Badge variant="outline">Pending Review</Badge>;
    }
    
    if (failureState.canRetry) {
      return <Badge variant="secondary">Retry Available</Badge>;
    }
    
    return <Badge variant="destructive">Failed</Badge>;
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg">{errorMessage.title}</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription>
          Payment for {courseTitle} ({currency} {paymentAmount.toFixed(2)})
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Error Message */}
        <Alert variant={getAlertVariant()}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Issue</AlertTitle>
          <AlertDescription className="mt-2">
            {errorMessage.message}
            {errorMessage.additionalInfo && (
              <div className="mt-2 text-sm text-muted-foreground">
                {errorMessage.additionalInfo}
              </div>
            )}
          </AlertDescription>
        </Alert>

        {/* Retry Progress */}
        {failureState.retryAttempts > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Retry Attempts</span>
              <span>{failureState.retryAttempts} / 3</span>
            </div>
            <Progress value={(failureState.retryAttempts / 3) * 100} className="h-2" />
          </div>
        )}

        {/* Countdown Timer */}
        {retryCountdown !== null && retryCountdown > 0 && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Automatic Retry Scheduled</AlertTitle>
            <AlertDescription>
              Next retry in {retryCountdown} seconds...
            </AlertDescription>
          </Alert>
        )}

        {/* Manual Approval Notice */}
        {failureState.recoveryResult?.action === 'manual_approval' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Submitted for Review</AlertTitle>
            <AlertDescription>
              Your enrollment has been submitted for manual review. 
              An administrator will process your request within 24 hours.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Retry Button */}
          {errorMessage.showRetryButton && failureState.canRetry && (
            <Button
              onClick={handleRetry}
              disabled={failureState.isRecovering || retryCountdown !== null}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${failureState.isRecovering ? 'animate-spin' : ''}`} />
              <span>
                {failureState.isRecovering 
                  ? 'Retrying...' 
                  : retryCountdown !== null 
                    ? `Retry in ${retryCountdown}s`
                    : errorMessage.actionText
                }
              </span>
            </Button>
          )}

          {/* Change Payment Method Button */}
          {errorMessage.showChangeMethodButton && (
            <Button
              variant="outline"
              onClick={() => {
                // In a real implementation, this would open payment method selection
                console.log('Change payment method clicked');
              }}
              className="flex items-center space-x-2"
            >
              <CreditCard className="h-4 w-4" />
              <span>Try Different Payment Method</span>
            </Button>
          )}

          {/* Contact Support Button */}
          {errorMessage.showContactSupport && (
            <Button
              variant="outline"
              onClick={handleContactSupport}
              className="flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Contact Support</span>
            </Button>
          )}
        </div>

        {/* Estimated Retry Time */}
        {errorMessage.estimatedRetryTime && !failureState.isRecovering && (
          <div className="text-sm text-muted-foreground text-center">
            Estimated retry time: {errorMessage.estimatedRetryTime}
          </div>
        )}

        {/* Recovery Instructions */}
        {failureState.recoveryResult?.userInstructions && (
          <Alert>
            <AlertDescription>
              {failureState.recoveryResult.userInstructions}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Compact Payment Failure Alert Component
 * For use in smaller spaces like course cards
 */
export function PaymentFailureAlert({
  errorMessage,
  onRetry,
  onDismiss,
  isRetrying = false,
  className = ''
}: {
  errorMessage: UserFriendlyErrorMessage;
  onRetry?: () => void;
  onDismiss?: () => void;
  isRetrying?: boolean;
  className?: string;
}) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{errorMessage.title}</AlertTitle>
      <AlertDescription className="mt-2">
        <div className="mb-3">{errorMessage.message}</div>
        <div className="flex gap-2">
          {errorMessage.showRetryButton && onRetry && (
            <Button
              size="sm"
              variant="outline"
              onClick={onRetry}
              disabled={isRetrying}
              className="h-8"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying...' : 'Retry'}
            </Button>
          )}
          {onDismiss && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onDismiss}
              className="h-8"
            >
              Dismiss
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}

/**
 * Payment Failure Stats Component (for admin dashboard)
 */
export function PaymentFailureStats({ 
  className = '' 
}: { 
  className?: string 
}) {
  const [stats, setStats] = useState({
    totalFailures: 0,
    retrySuccessRate: 0,
    manualApprovalRate: 0,
    isLoading: true
  });

  useEffect(() => {
    // In a real implementation, this would fetch actual stats
    const fetchStats = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalFailures: 23,
        retrySuccessRate: 67,
        manualApprovalRate: 15,
        isLoading: false
      });
    };

    fetchStats();
  }, []);

  if (stats.isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Payment Failure Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Payment Failure Statistics</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.totalFailures}</div>
            <div className="text-sm text-muted-foreground">Total Failures</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.retrySuccessRate}%</div>
            <div className="text-sm text-muted-foreground">Retry Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.manualApprovalRate}%</div>
            <div className="text-sm text-muted-foreground">Manual Approval Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}