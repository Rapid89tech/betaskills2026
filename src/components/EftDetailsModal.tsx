import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Copy, Check, X, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EftDetailsModalProps {
  amount: number;
  reference: string;
  onClose: () => void;
  onSubmitProof: () => void;
}

const EftDetailsModal: React.FC<EftDetailsModalProps> = ({
  amount,
  reference,
  onClose,
  onSubmitProof
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const bankDetails = {
    bankName: 'STD Bank',
    accountType: 'Cheque',
    accountNumber: '10222498305',
    branchCode: '051001',
    reference: reference,
    amount: `R${amount.toFixed(2)}`
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [field]: true });
      toast({
        title: "Copied!",
        description: `${field} copied to clipboard`,
      });
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied({ ...copied, [field]: false });
      }, 2000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full bg-white">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">EFT Payment Details</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8 text-white hover:bg-red-600 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please use your <strong>exact reference number</strong> when making the payment so we can match your payment to your enrollment.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {Object.entries(bankDetails).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">{value}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-100"
                    onClick={() => copyToClipboard(value.toString(), key)}
                  >
                    {copied[key] ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  After making your payment, please submit your proof of payment. Your course access will be granted once payment is verified.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between space-x-4 pt-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={onSubmitProof}
          >
            <FileText className="mr-2 h-4 w-4" />
            Submit Proof of Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EftDetailsModal;
