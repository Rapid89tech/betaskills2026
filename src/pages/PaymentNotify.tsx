import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentNotify: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Log payment notification data for debugging
    const paymentData = {
      payment_id: searchParams.get('payment_id'),
      ref: searchParams.get('ref'),
      status: searchParams.get('status'),
      amount: searchParams.get('amount'),
      currency: searchParams.get('currency'),
      timestamp: new Date().toISOString()
    };

    console.log('Payment notification received:', paymentData);

    // In a real implementation, you would:
    // 1. Verify the payment with Ikhokha
    // 2. Update the enrollment status in your database
    // 3. Send confirmation emails
    // 4. Update user progress

  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Notification Received
        </h1>
        <p className="text-gray-600">
          Thank you for your payment. We are processing your enrollment.
        </p>
      </div>
    </div>
  );
};

export default PaymentNotify;
