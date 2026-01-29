import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PaymentForm from '../PaymentForm';

// Mock the PaymentErrorHandler
vi.mock('@/services/PaymentErrorHandler');

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

// Mock the simpleSafePayment module
vi.mock('@/utils/simpleSafePayment', () => ({
  simpleSafeCreateRealPayment: vi.fn()
}));

describe('PaymentForm Basic Functionality', () => {
  const mockProps = {
    amount: 100,
    currency: 'R',
    description: 'Test Course Payment',
    onPaymentSuccess: vi.fn(),
    onPaymentCancel: vi.fn()
  };

  it('renders payment form correctly', () => {
    render(<PaymentForm {...mockProps} />);
    
    expect(screen.getByText('Payment Information')).toBeInTheDocument();
    expect(screen.getByLabelText('Cardholder Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Card Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry Date')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pay r 100/i })).toBeInTheDocument();
  });

  it('displays amount and description correctly', () => {
    render(<PaymentForm {...mockProps} />);
    
    expect(screen.getByText('R 100')).toBeInTheDocument();
    expect(screen.getByText('Test Course Payment')).toBeInTheDocument();
  });

  it('shows test mode information', () => {
    render(<PaymentForm {...mockProps} />);
    
    expect(screen.getByText(/test mode: use these test card numbers/i)).toBeInTheDocument();
    expect(screen.getByText('4111 1111 1111 1111')).toBeInTheDocument();
    expect(screen.getByText('5555 5555 5555 4444')).toBeInTheDocument();
  });
});