import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const courseId = searchParams.get('course');

  const handleTryAgain = () => {
    if (courseId) {
      navigate(`/payment/${courseId}`);
    } else {
      navigate('/courses');
    }
  };

  const handleGoBack = () => {
    if (courseId) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4">
            <XCircle className="h-16 w-16 text-red-600 mx-auto" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Payment Failed
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-center">
              Your payment could not be processed. This may be due to insufficient funds, 
              incorrect card details, or your bank declining the transaction.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleTryAgain}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>
              If you continue to experience issues, please:
            </p>
            <ul className="mt-2 space-y-1 text-left pl-6 list-disc">
              <li>Check your card details are correct</li>
              <li>Ensure you have sufficient funds</li>
              <li>Contact your bank to authorize the transaction</li>
              <li>Try a different payment method</li>
              <li>Contact our support team for assistance</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailed;

