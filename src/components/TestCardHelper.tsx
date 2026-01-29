import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Copy, Check } from 'lucide-react';

interface TestCardHelperProps {
  onCardSelect?: (cardNumber: string) => void;
}

const TestCardHelper: React.FC<TestCardHelperProps> = ({ onCardSelect }) => {
  const [copiedCard, setCopiedCard] = useState<string | null>(null);

  const testCards = [
    {
      number: '4111 1111 1111 1111',
      type: 'Visa',
      status: 'Success',
      color: 'text-green-600'
    },
    {
      number: '5555 5555 5555 4444',
      type: 'Mastercard',
      status: 'Success',
      color: 'text-green-600'
    },
    {
      number: '3782 8224 6310 005',
      type: 'American Express',
      status: 'Success',
      color: 'text-green-600'
    }
  ];

  const handleCopyCard = async (cardNumber: string) => {
    try {
      await navigator.clipboard.writeText(cardNumber);
      setCopiedCard(cardNumber);
      setTimeout(() => setCopiedCard(null), 2000);
      
      if (onCardSelect) {
        onCardSelect(cardNumber);
      }
    } catch (error) {
      console.error('Failed to copy card number:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-sm">
          <CreditCard className="w-4 h-4 mr-2" />
          Test Card Numbers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-xs text-gray-600 mb-3">
          Click any card number below to copy it to your clipboard:
        </p>
        
        {testCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => handleCopyCard(card.number)}
          >
            <div className="flex-1">
              <div className="font-mono text-sm font-medium">{card.number}</div>
              <div className="text-xs text-gray-500">
                {card.type} • <span className={card.color}>{card.status}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyCard(card.number);
              }}
            >
              {copiedCard === card.number ? (
                <Check className="w-3 h-3 text-green-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
          </div>
        ))}
        
        <div className="mt-3 p-2 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Additional Info:</strong>
          </p>
          <ul className="text-xs text-blue-600 mt-1 space-y-1">
            <li>• Use any future expiry date (e.g., 12/25)</li>
            <li>• Use any 3-digit CVV (e.g., 123)</li>
            <li>• Use any cardholder name</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCardHelper;