import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Phone, Building2, CreditCard } from 'lucide-react';
import { PaymentErrorHandler } from '@/services/PaymentErrorHandler';
import { ProcessedPaymentError } from '@/types/paymentError';

const PaymentFormDemo: React.FC = () => {
  const [currentError, setCurrentError] = useState<ProcessedPaymentError | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const simulateError = (errorType: string) => {
    const errorHandler = PaymentErrorHandler.getInstance();
    
    let paymentError;
    switch (errorType) {
      case 'insufficient_funds':
        paymentError = PaymentErrorHandler.createPaymentError(
          'INSUFFICIENT_FUNDS',
          'Insufficient funds',
          'ikhokha'
        );
        break;
      case 'expired_card':
        paymentError = PaymentErrorHandler.createPaymentError(
          'EXPIRED_CARD',
          'Card expired',
          'validation'
        );
        break;
      case 'invalid_cvv':
        paymentError = PaymentErrorHandler.createPaymentError(
          'INVALID_CVV',
          'Invalid CVV',
          'validation'
        );
        break;
      case 'network_timeout':
        paymentError = PaymentErrorHandler.createPaymentError(
          'TIMEOUT',
          'Network timeout',
          'network'
        );
        break;
      case 'test_card':
        paymentError = PaymentErrorHandler.createPaymentError(
          'INVALID_TEST_CARD',
          'Invalid test card',
          'validation'
        );
        break;
      default:
        paymentError = PaymentErrorHandler.createPaymentError(
          'SYSTEM_ERROR',
          'System error',
          'system'
        );
    }

    const errorContext = {
      paymentMethod: 'card',
      attemptCount: attemptCount + 1,
      isTestMode: true,
      courseId: 'demo-course'
    };

    const processedError = errorHandler.processPaymentError(paymentError, errorContext);
    setCurrentError(processedError);
    setAttemptCount(prev => prev + 1);
  };

  const clearError = () => {
    setCurrentError(null);
  };

  const handleErrorAction = (action: string) => {
    console.log(`Action clicked: ${action}`);
    if (action === 'retry') {
      clearError();
    }
  };

  const getErrorIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'CreditCard': CreditCard,
      'AlertCircle': AlertCircle,
      'AlertTriangle': AlertCircle,
      'Wifi': AlertCircle
    };
    return iconMap[iconName] || AlertCircle;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Error Display Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => simulateError('insufficient_funds')} variant="outline" size="sm">
              Insufficient Funds
            </Button>
            <Button onClick={() => simulateError('expired_card')} variant="outline" size="sm">
              Expired Card
            </Button>
            <Button onClick={() => simulateError('invalid_cvv')} variant="outline" size="sm">
              Invalid CVV
            </Button>
            <Button onClick={() => simulateError('network_timeout')} variant="outline" size="sm">
              Network Timeout
            </Button>
            <Button onClick={() => simulateError('test_card')} variant="outline" size="sm">
              Test Card Error
            </Button>
            <Button onClick={clearError} variant="outline" size="sm">
              Clear Error
            </Button>
          </div>

          {/* Enhanced Error Display */}
          {currentError && (
            <Alert 
              variant={currentError.userMessage.variant === 'destructive' ? 'destructive' : 'default'} 
              className={`mb-4 ${
                currentError.userMessage.variant === 'info' ? 'border-blue-200 bg-blue-50' : 
                currentError.userMessage.variant === 'warning' ? 'border-yellow-200 bg-yellow-50' : ''
              }`}
            >
              {React.createElement(getErrorIcon(currentError.userMessage.icon), { 
                className: "h-4 w-4" 
              })}
              <AlertTitle>{currentError.userMessage.title}</AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-3">{currentError.userMessage.description}</p>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {currentError.userMessage.actions.map((action) => (
                    <Button
                      key={action.action}
                      variant={action.primary ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleErrorAction(action.action)}
                      className="text-xs"
                    >
                      {action.action === 'retry' && <RefreshCw className="w-3 h-3 mr-1" />}
                      {action.action === 'contact_support' && <Phone className="w-3 h-3 mr-1" />}
                      {action.action === 'try_eft' && <Building2 className="w-3 h-3 mr-1" />}
                      {action.action === 'try_different_card' && <CreditCard className="w-3 h-3 mr-1" />}
                      {action.label}
                    </Button>
                  ))}
                </div>
                
                {/* Progressive guidance for multiple attempts */}
                {attemptCount > 2 && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                    <p className="font-medium">💡 Having trouble?</p>
                    <p>Try the EFT payment option or contact your bank if card issues persist.</p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-gray-600">
            <p><strong>Attempt Count:</strong> {attemptCount}</p>
            <p><strong>Current Error:</strong> {currentError ? currentError.userMessage.title : 'None'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFormDemo;