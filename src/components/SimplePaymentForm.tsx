import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Lock, AlertCircle, X, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createPaymentLink } from '@/services/paymentService';
import { useAuth } from '@/hooks/AuthContext';

interface SimplePaymentFormProps {
  amount: number;
  currency: string;
  description: string;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentCancel: () => void;
  userEmail?: string;
  userName?: string;
  courseId?: string;
}

const SimplePaymentForm: React.FC<SimplePaymentFormProps> = ({
  amount,
  description,
  onPaymentCancel,
  userEmail = 'customer@example.com',
  userName = 'Customer',
  courseId = 'unknown'
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayNow = async () => {
    if (!user || !user.id) {
      setError('You must be logged in to make a payment');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      console.log('Creating iKhokha payment link...');
      console.log('Request data:', {
        amount,
        currency: 'ZAR',
        description,
        customer_email: userEmail,
        customer_name: userName,
        course_id: courseId,
        user_id: user.id
      });
      
      const result = await createPaymentLink({
        amount,
        currency: 'ZAR',
        description,
        customer_email: userEmail,
        customer_name: userName,
        course_id: courseId,
        user_id: user.id
      });

      console.log('Payment link result:', result);

      if (result.success && result.payment_link_url) {
        console.log('Payment link created:', result.payment_link_url);
        
        toast({
          title: "Redirecting to Payment",
          description: "You will be redirected to iKhokha's secure payment page...",
          duration: 3000,
        });

        // Store transaction reference for later verification
        const transactionRef = result.transaction_reference || '';
        if (transactionRef) {
          sessionStorage.setItem('payment_reference', transactionRef);
        }
        sessionStorage.setItem('payment_course_id', courseId);

        // Redirect to iKhokha payment page
        const paymentUrl = result.payment_link_url as string;
        setTimeout(() => {
          window.location.href = paymentUrl;
        }, 1500);
      } else {
        throw new Error(result.message || 'Failed to create payment link');
      }
    } catch (err: any) {
      console.error('Payment link creation error:', err);
      console.error('Error details:', {
        message: err.message,
        error: err.error,
        stack: err.stack,
        response: err.response
      });
      
      const errorMessage = err.message || err.error || 'Unable to create payment link. Please try again or contact support.';
      
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Payment Link Error",
        description: errorMessage,
        duration: 10000,
      });
      
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CreditCard className="h-6 w-6 text-blue-600" />
              Secure Payment
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onPaymentCancel}
              className="hover:bg-white/50"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-lg text-gray-900">Payment Summary</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium text-gray-900">{description}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Student:</span>
                <span className="font-medium text-gray-900">{userName}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">{userEmail}</span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    R {amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Payment Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 text-sm mb-1">
                  Secure Payment via iKhokha
                </h4>
                <p className="text-sm text-blue-800">
                  You will be redirected to iKhokha's secure payment page to complete your transaction. 
                  Your card details are never stored on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onPaymentCancel}
              variant="outline"
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating Payment Link...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Pay R {amount.toFixed(2)} Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Payment Info */}
          <div className="text-center text-xs text-gray-500 pt-2">
            <p>
              By clicking "Pay Now", you will be redirected to iKhokha's secure payment gateway.
            </p>
            <p className="mt-1">
              Payments are processed in South African Rands (ZAR).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimplePaymentForm;
