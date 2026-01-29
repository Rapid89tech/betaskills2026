/**
 * PaymentHandler Integration Example
 * 
 * This example demonstrates how to use the PaymentHandler service
 * for processing different payment types in the enrollment system.
 */

import React, { useState, useEffect } from 'react';
import { paymentHandler } from '@/services/PaymentHandler';
import {
    PaymentType,
    PaymentStatus,
    PaymentDetails,
    PaymentCallback
} from '@/types/enrollment';

export const PaymentHandlerExample: React.FC = () => {
    const [paymentStatus, setPaymentStatus] = useState<string>('');
    const [paymentId, setPaymentId] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        // Listen for payment callbacks
        const handlePaymentCallback = (event: CustomEvent<PaymentCallback>) => {
            const callback = event.detail;
            console.log('Payment callback received:', callback);

            setPaymentStatus(`Payment ${callback.paymentId}: ${callback.status}`);

            if (callback.status === PaymentStatus.COMPLETED) {
                setPaymentStatus(prev => prev + ' - Access granted!');
            } else if (callback.status === PaymentStatus.PENDING) {
                setPaymentStatus(prev => prev + ' - Awaiting approval');
            }
        };

        window.addEventListener('payment-callback', handlePaymentCallback as EventListener);

        return () => {
            window.removeEventListener('payment-callback', handlePaymentCallback as EventListener);
        };
    }, []);

    const processCardPayment = async () => {
        setIsProcessing(true);
        setPaymentStatus('Processing card payment...');

        const paymentDetails: PaymentDetails = {
            amount: 299.99,
            currency: 'ZAR',
            metadata: {
                courseId: 'course_123',
                userId: 'user_456'
            }
        };

        try {
            const result = await paymentHandler.processPayment(PaymentType.CARD, paymentDetails);

            if (result.success && result.paymentId) {
                setPaymentId(result.paymentId);
                setPaymentStatus(`Card payment successful! Payment ID: ${result.paymentId}`);
            } else {
                setPaymentStatus(`Card payment failed: ${result.error}`);
            }
        } catch (error: any) {
            setPaymentStatus(`Error: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const processEFTPayment = async () => {
        setIsProcessing(true);
        setPaymentStatus('Processing EFT payment...');

        const paymentDetails: PaymentDetails = {
            amount: 299.99,
            currency: 'ZAR',
            reference: 'USER_REF_789',
            metadata: {
                courseId: 'course_123',
                userId: 'user_456',
                bankName: 'Standard Bank'
            }
        };

        try {
            const result = await paymentHandler.processPayment(PaymentType.EFT, paymentDetails);

            if (result.success && result.paymentId) {
                setPaymentId(result.paymentId);
                setPaymentStatus(`EFT payment initiated! Payment ID: ${result.paymentId}`);
            } else {
                setPaymentStatus(`EFT payment failed: ${result.error}`);
            }
        } catch (error: any) {
            setPaymentStatus(`Error: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const validatePayment = async () => {
        if (!paymentId) {
            setPaymentStatus('No payment ID to validate');
            return;
        }

        try {
            const isValid = await paymentHandler.validatePayment(paymentId);
            setPaymentStatus(`Payment validation: ${isValid ? 'VALID' : 'INVALID'}`);
        } catch (error: any) {
            setPaymentStatus(`Validation error: ${error.message}`);
        }
    };

    const getPaymentStatus = async () => {
        if (!paymentId) {
            setPaymentStatus('No payment ID to check');
            return;
        }

        try {
            const status = await paymentHandler.getPaymentStatus(paymentId);
            setPaymentStatus(`Payment status: ${status}`);
        } catch (error: any) {
            setPaymentStatus(`Status check error: ${error.message}`);
        }
    };

    const cancelPayment = async () => {
        if (!paymentId) {
            setPaymentStatus('No payment ID to cancel');
            return;
        }

        try {
            const cancelled = await paymentHandler.cancelPayment(paymentId);
            setPaymentStatus(`Payment cancellation: ${cancelled ? 'SUCCESS' : 'FAILED'}`);
        } catch (error: any) {
            setPaymentStatus(`Cancellation error: ${error.message}`);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">PaymentHandler Example</h2>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={processCardPayment}
                        disabled={isProcessing}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isProcessing ? 'Processing...' : 'Process Card Payment'}
                    </button>

                    <button
                        onClick={processEFTPayment}
                        disabled={isProcessing}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    >
                        {isProcessing ? 'Processing...' : 'Process EFT Payment'}
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <button
                        onClick={validatePayment}
                        disabled={!paymentId}
                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
                    >
                        Validate Payment
                    </button>

                    <button
                        onClick={getPaymentStatus}
                        disabled={!paymentId}
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
                    >
                        Get Status
                    </button>

                    <button
                        onClick={cancelPayment}
                        disabled={!paymentId}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                    >
                        Cancel Payment
                    </button>
                </div>

                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <h3 className="font-semibold mb-2">Payment Status:</h3>
                    <p className="text-sm">{paymentStatus || 'No payment processed yet'}</p>
                    {paymentId && (
                        <p className="text-xs text-gray-600 mt-2">Payment ID: {paymentId}</p>
                    )}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded">
                    <h3 className="font-semibold mb-2">How it works:</h3>
                    <ul className="text-sm space-y-1">
                        <li>• <strong>Card Payment:</strong> Processes immediately with ~95% success rate</li>
                        <li>• <strong>EFT Payment:</strong> Creates pending payment awaiting approval</li>
                        <li>• <strong>Validation:</strong> Checks if payment is completed and valid</li>
                        <li>• <strong>Status:</strong> Returns current payment status (PENDING/COMPLETED/FAILED)</li>
                        <li>• <strong>Cancel:</strong> Cancels payment and sets status to FAILED</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PaymentHandlerExample;