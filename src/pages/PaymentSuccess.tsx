import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { verifyPaymentStatus } from '@/services/paymentService';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(false);
  
  const courseId = searchParams.get('course');
  const transactionRef = searchParams.get('ref');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!transactionRef) {
        setVerifying(false);
        return;
      }

      try {
        // Wait a bit for webhook to process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const result = await verifyPaymentStatus(transactionRef);
        
        if (result.status === 'completed') {
          setPaymentVerified(true);
      }
    } catch (error) {
        console.error('Payment verification error:', error);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [transactionRef]);

  const handleContinue = () => {
    if (courseId) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4">
            {verifying ? (
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto" />
            ) : (
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {verifying ? 'Verifying Payment...' : 'Payment Successful!'}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {verifying ? (
            <div className="text-center text-gray-600">
              <p>Please wait while we confirm your payment...</p>
            </div>
          ) : (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-center">
                  {paymentVerified 
                    ? 'Your payment has been confirmed and your enrollment is being processed.'
                    : 'Your payment was successful! Your enrollment will be confirmed shortly.'}
                </p>
              </div>
              
              {transactionRef && (
                <div className="text-sm text-gray-600 text-center">
                  <p className="font-semibold">Transaction Reference:</p>
                  <p className="font-mono bg-gray-100 px-3 py-2 rounded mt-1 text-xs break-all">
                    {transactionRef}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button 
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                >
                  Continue to Course
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="outline" 
                  className="w-full"
                >
                  Go to Dashboard
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                <p>
                  You will receive a confirmation email shortly.
                </p>
                <p className="mt-1">
                  If you have any questions, please contact support.
                </p>
            </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
