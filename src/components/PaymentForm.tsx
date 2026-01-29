import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Lock, AlertCircle, AlertTriangle, Wifi, RefreshCw, Phone, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PaymentErrorHandler } from '@/services/PaymentErrorHandler';
import { ProgressiveErrorHandler, ProgressiveErrorContext } from '@/services/ProgressiveErrorHandler';
import contextAwareErrorTracker from '@/services/ContextAwareErrorTracker';
import { PaymentError, ProcessedPaymentError, ErrorContext } from '@/types/paymentError';
interface PaymentFormProps {
  amount: number;
  currency: string;
  description: string;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentCancel: () => void;
  userId?: string; // For progressive error tracking
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency,
  description,
  onPaymentSuccess,
  onPaymentCancel,
  userId
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentError, setCurrentError] = useState<ProcessedPaymentError | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [sessionId] = useState(() => `payment_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [formStartTime] = useState(() => new Date());

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  // Initialize progressive error handling services
  const progressiveErrorHandler = ProgressiveErrorHandler.getInstance();
  const contextAwareTracker = contextAwareErrorTracker;

  // Initialize user environment and payment session tracking
  React.useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const courseId = pathParts[pathParts.length - 1];

    // Track user environment
    contextAwareTracker.trackUserEnvironment(userId || 'anonymous', {
      userAgent: navigator.userAgent,
      isTestMode: process.env.NODE_ENV === 'development'
    });

    // Start payment session tracking
    contextAwareTracker.startPaymentSession(sessionId, {
      courseId: courseId,
      paymentAmount: amount,
      attemptedMethods: ['card']
    });

    return () => {
      // Record abandonment if form is unmounted without success
      contextAwareTracker.recordAbandonmentPoint(sessionId, 'form_unmount');
    };
  }, [userId, sessionId, amount, contextAwareTracker]);

  const handleInputChange = (field: string, value: string) => {
    // Clear error when user starts typing
    if (currentError) {
      clearError();
    }
    
    // Track form interactions for progressive analysis
    contextAwareTracker.updatePaymentSession(sessionId, {
      formInteractions: (attemptCount || 0) + 1
    });
    
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    }
    return digits;
  };

  // Enhanced progressive error handling
  const handlePaymentError = (error: any, source: PaymentError['source'] = 'system') => {
    const pathParts = window.location.pathname.split('/');
    const courseId = pathParts[pathParts.length - 1];
    const newAttemptCount = attemptCount + 1;
    
    // Update session with error attempt
    contextAwareTracker.updatePaymentSession(sessionId, {
      attemptedMethods: ['card'],
      formInteractions: newAttemptCount
    });

    // Create progressive error context
    const baseContext: ErrorContext = {
      userId: userId || 'anonymous',
      ...(courseId && { courseId }),
      paymentMethod: 'card',
      attemptCount: newAttemptCount,
      isTestMode: process.env.NODE_ENV === 'development',
      userAgent: navigator.userAgent
    };
    
    const progressiveContext: ProgressiveErrorContext = {
      ...contextAwareTracker.createProgressiveErrorContext(baseContext, sessionId),
      errorHistory: undefined // Will be set by ProgressiveErrorHandler
    };

    // Create PaymentError object
    let paymentError: PaymentError;

    if (typeof error === 'string') {
      paymentError = PaymentErrorHandler.createPaymentError(error, error, source);
    } else if (error?.error) {
      paymentError = PaymentErrorHandler.createPaymentError(
        error.error,
        error.message || 'Payment failed',
        source,
        error
      );
    } else if (error?.message) {
      paymentError = PaymentErrorHandler.createFromNetworkError(error);
    } else {
      paymentError = PaymentErrorHandler.createPaymentError(
        'UNKNOWN_ERROR',
        'An unexpected error occurred',
        source,
        error
      );
    }

    // Process error with progressive enhancement
    const processedError = progressiveErrorHandler.processProgressiveError(paymentError, progressiveContext);
    
    // Get context-aware message suggestions
    const contextSuggestions = contextAwareTracker.getContextAwareMessageSuggestions(
      paymentError, 
      userId || 'anonymous', 
      sessionId
    );

    // Apply context-aware enhancements to the processed error
    const enhancedError = applyContextAwareEnhancements(processedError, contextSuggestions);
    
    setCurrentError(enhancedError);
    setAttemptCount(newAttemptCount);

    // Track error environment for analytics
    contextAwareTracker.trackErrorEnvironment(`${paymentError.code}_${newAttemptCount}`);
  };

  // Apply context-aware enhancements to error messages
  const applyContextAwareEnhancements = (
    processedError: ProcessedPaymentError,
    contextSuggestions: ReturnType<typeof contextAwareTracker.getContextAwareMessageSuggestions>
  ): ProcessedPaymentError => {
    let enhancedMessage = { ...processedError.userMessage };

    // Adjust message based on context variant
    switch (contextSuggestions.messageVariant) {
      case 'mobile':
        enhancedMessage.description = enhancedMessage.description + ' For mobile payments, ensure you have a stable connection.';
        break;
      case 'test':
        enhancedMessage.description = enhancedMessage.description + ' Remember to use the test card numbers provided above.';
        break;
      case 'new_user':
        enhancedMessage.description = enhancedMessage.description + ' Need help? Our support team is here to assist you.';
        break;
      case 'experienced':
        enhancedMessage.description = enhancedMessage.description.replace('Please', 'You may want to');
        break;
    }

    // Adjust severity based on escalation level
    let adjustedSeverity = processedError.severity;
    if (contextSuggestions.escalationLevel === 'high' && processedError.severity !== 'critical') {
      adjustedSeverity = 'high';
    }

    return {
      ...processedError,
      userMessage: enhancedMessage,
      severity: adjustedSeverity
    };
  };

  // Clear error when user starts typing or takes action
  const clearError = () => {
    setCurrentError(null);
  };

  // Handle error action buttons with tracking
  const handleErrorAction = (action: string) => {
    // Track user action for analytics
    contextAwareTracker.updatePaymentSession(sessionId, {
      abandonmentPoints: [`error_action_${action}`]
    });

    switch (action) {
      case 'retry':
        clearError();
        break;
      case 'try_different_card':
        clearError();
        contextAwareTracker.recordAbandonmentPoint(sessionId, 'card_change_attempt');
        setCardData({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardholderName: ''
        });
        break;
      case 'try_eft':
        // Record EFT preference for future sessions
        contextAwareTracker.recordAbandonmentPoint(sessionId, 'switched_to_eft');
        // Navigate to EFT payment option
        const pathParts = window.location.pathname.split('/');
        const courseId = pathParts[pathParts.length - 1];
        window.location.href = `/payment/${courseId}?method=eft`;
        break;
      case 'contact_support':
        // Record support contact for escalation tracking
        contextAwareTracker.recordAbandonmentPoint(sessionId, 'contacted_support');
        // Open support contact
        window.open('mailto:support@betaskill.com?subject=Payment Issue', '_blank');
        break;
    }
  };

  // Get icon component for error display
  const getErrorIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'CreditCard': CreditCard,
      'AlertCircle': AlertCircle,
      'AlertTriangle': AlertTriangle,
      'Wifi': Wifi
    };
    return iconMap[iconName] || AlertCircle;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    clearError(); // Clear any previous errors

    try {
      // Validate card details first
      const validationResult = validateCardDetails(cardData);
      if (!validationResult.valid) {
        handlePaymentError(validationResult.error, 'validation');
        setIsProcessing(false);
        return;
      }

      // Create real Ikhokha payment request
      // Extract courseId from current URL path (e.g., /payment/plumbing101)
      const pathParts = window.location.pathname.split('/');
      const courseId = pathParts[pathParts.length - 1]; // Get last part of path
      
      console.log('🔍 PaymentForm: Extracted courseId from URL:', courseId);
      console.log('🔍 PaymentForm: Current pathname:', window.location.pathname);
      
      // Construct return URL with course_id parameter
      const returnUrl = `${window.location.origin}/payment-success?course_id=${encodeURIComponent(courseId || '')}`;
      const cancelUrl = `${window.location.origin}/payment-cancel?course_id=${encodeURIComponent(courseId || '')}`;
      
      console.log('🔍 PaymentForm: Return URL:', returnUrl);
      
      const paymentRequest = {
        amount: amount,
        currency: currency === 'R' ? 'ZAR' : currency,
        description: description,
        reference: `course_payment_${Date.now()}`,
        customer_email: '', // Will be filled from user context
        customer_name: cardData.cardholderName,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        notify_url: `${window.location.origin}/payment/notify`,
        course_id: courseId, // Add course ID for tracking
        card_details: {
          card_number: cardData.cardNumber.replace(/\s/g, ''),
          expiry_month: cardData.expiryDate.split('/')[0],
          expiry_year: `20${cardData.expiryDate.split('/')[1]}`,
          cvv: cardData.cvv,
          cardholder_name: cardData.cardholderName
        }
      };

      // Call simple safe payment processing for testing
      const { simpleSafeCreateRealPayment } = await import('@/utils/simpleSafePayment');
      const result = await simpleSafeCreateRealPayment(paymentRequest);

      if (result.success) {
        clearError(); // Clear any errors on success
        
        // Record successful payment for learning
        contextAwareTracker.recordSuccessfulPayment(
          userId || 'anonymous', 
          'card', 
          sessionId
        );

        toast({
          title: "✅ Payment Processing Successfully!",
          description: "Your payment is being processed through secure gateway. You will be enrolled shortly. Redirecting to confirmation...",
          duration: 4000,
        });

        // Dispatch force refresh event to update course cards immediately
        window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
          detail: { 
            timestamp: new Date().toISOString(),
            source: 'PaymentForm'
          }
        }));

        // Show success message before redirecting
        setTimeout(() => {
          if (result.success && 'payment_url' in result && result.payment_url) {
            window.location.href = result.payment_url;
          } else {
            onPaymentSuccess(result);
          }
        }, 2000);
      } else {
        // Use enhanced progressive error handling
        handlePaymentError(result, 'ikhokha');
      }
    } catch (error) {
      console.error('Payment error:', error);
      handlePaymentError(error, 'network');
    } finally {
      setIsProcessing(false);
    }
  };

  const validateCardDetails = (cardData: any) => {
    // Basic card validation
    const cardNumber = cardData.cardNumber.replace(/\s/g, '');
    
    // Check if card number is valid length (13-19 digits)
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return { valid: false, error: "INVALID_CARD_NUMBER" };
    }

    // Luhn algorithm validation
    if (!isValidCardNumber(cardNumber)) {
      return { valid: false, error: "INVALID_CARD_NUMBER" };
    }

    // Check expiry date
    const [month, year] = cardData.expiryDate.split('/');
    const expiryMonth = parseInt(month);
    const expiryYear = parseInt(`20${year}`);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
      return { valid: false, error: "EXPIRED_CARD" };
    }

    // Check CVV length
    if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
      return { valid: false, error: "INVALID_CVV" };
    }

    // Check cardholder name
    if (cardData.cardholderName.trim().length < 2) {
      return { valid: false, error: "INVALID_CARD_NUMBER" }; // Use generic card error for name validation
    }

    return { valid: true };
  };

  const isValidCardNumber = (cardNumber: string) => {
    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i] || '0');
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const isFormValid = () => {
    const cardNumber = cardData.cardNumber.replace(/\s/g, '');
    return (
      cardNumber.length >= 13 && cardNumber.length <= 19 &&
      cardData.expiryDate.length === 5 &&
      cardData.cvv.length >= 3 && cardData.cvv.length <= 4 &&
      cardData.cardholderName.trim().length >= 2 &&
      isValidCardNumber(cardNumber)
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
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
              
              {/* Enhanced Progressive guidance */}
              {attemptCount > 1 && (
                <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                  <p className="font-medium">💡 Progressive Help:</p>
                  {attemptCount === 2 && (
                    <p>Second attempt detected. Consider trying a different card or the EFT payment option.</p>
                  )}
                  {attemptCount === 3 && (
                    <p>Multiple attempts detected. We recommend using EFT payment or contacting support for assistance.</p>
                  )}
                  {attemptCount >= 4 && (
                    <div>
                      <p className="font-medium text-blue-900">Need immediate help?</p>
                      <p>After {attemptCount} attempts, our support team can help you complete your enrollment quickly.</p>
                      <p className="mt-1">
                        <strong>Quick options:</strong> Try EFT payment (instant) or contact your bank about card issues.
                      </p>
                    </div>
                  )}
                  
                  {/* Time-based guidance */}
                  {(() => {
                    const timeSpent = Math.floor((Date.now() - formStartTime.getTime()) / 1000);
                    if (timeSpent > 300) { // 5 minutes
                      return (
                        <p className="mt-2 font-medium text-blue-900">
                          ⏰ You've been working on this for {Math.floor(timeSpent / 60)} minutes. 
                          Our support team can help you complete this quickly!
                        </p>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-800">Amount to Pay:</span>
              <span className="text-lg font-bold text-blue-900">{currency} {amount}</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">{description}</p>
            <div className="mt-2 text-xs text-blue-700">
              <p className="font-semibold">💳 Test Mode: Use these test card numbers:</p>
              <ul className="mt-1 space-y-1">
                <li>• <strong>4111 1111 1111 1111</strong> - Visa (Success)</li>
                <li>• <strong>5555 5555 5555 4444</strong> - Mastercard (Success)</li>
                <li>• Use any future expiry date and any 3-digit CVV</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                type="text"
                placeholder="John Doe"
                value={cardData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                maxLength={19}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  maxLength={5}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Lock className="w-3 h-3" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPaymentCancel}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isProcessing}
              className="flex-1"
            >
              {isProcessing ? 'Processing...' : `Pay ${currency} ${amount}`}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
