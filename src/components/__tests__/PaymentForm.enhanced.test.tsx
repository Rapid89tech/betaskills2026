import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import PaymentForm from '../PaymentForm';

// Mock the PaymentErrorHandler
vi.mock('@/services/PaymentErrorHandler', () => ({
  PaymentErrorHandler: {
    getInstance: vi.fn(() => ({
      processPaymentError: vi.fn((error, context) => ({
        userMessage: {
          title: 'Test Error',
          description: 'Test error description',
          actions: [
            { label: 'Try Again', action: 'retry', primary: true },
            { label: 'Contact Support', action: 'contact_support' }
          ],
          icon: 'AlertCircle',
          variant: 'warning'
        },
        severity: 'medium',
        category: 'card',
        actionable: true
      }))
    })),
    createPaymentError: vi.fn((code, message, source, details) => ({
      code,
      message,
      source,
      details
    }))
  }
}));

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

describe('PaymentForm Enhanced Error Display', () => {
  const mockProps = {
    amount: 100,
    currency: 'R',
    description: 'Test Course Payment',
    onPaymentSuccess: vi.fn(),
    onPaymentCancel: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders payment form without errors', () => {
    render(<PaymentForm {...mockProps} />);
    
    expect(screen.getByText('Payment Information')).toBeInTheDocument();
    expect(screen.getByLabelText('Cardholder Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Card Number')).toBeInTheDocument();
  });

  it('shows enhanced error display when validation fails', async () => {
    render(<PaymentForm {...mockProps} />);
    
    // Fill in invalid card details
    fireEvent.change(screen.getByLabelText('Card Number'), {
      target: { value: '1234' }
    });
    fireEvent.change(screen.getByLabelText('Cardholder Name'), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByLabelText('Expiry Date'), {
      target: { value: '12/25' }
    });
    fireEvent.change(screen.getByLabelText('CVV'), {
      target: { value: '123' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /pay r 100/i }));

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText('Test Error')).toBeInTheDocument();
      expect(screen.getByText('Test error description')).toBeInTheDocument();
    });

    // Check that action buttons are rendered
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact support/i })).toBeInTheDocument();
  });

  it('clears error when user starts typing', async () => {
    render(<PaymentForm {...mockProps} />);
    
    // Trigger an error first
    fireEvent.change(screen.getByLabelText('Card Number'), {
      target: { value: '1234' }
    });
    fireEvent.click(screen.getByRole('button', { name: /pay r 100/i }));

    await waitFor(() => {
      expect(screen.getByText('Test Error')).toBeInTheDocument();
    });

    // Start typing in card number field
    fireEvent.change(screen.getByLabelText('Card Number'), {
      target: { value: '4111' }
    });

    // Error should be cleared
    await waitFor(() => {
      expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
    });
  });

  it('handles retry action correctly', async () => {
    render(<PaymentForm {...mockProps} />);
    
    // Trigger an error
    fireEvent.change(screen.getByLabelText('Card Number'), {
      target: { value: '1234' }
    });
    fireEvent.click(screen.getByRole('button', { name: /pay r 100/i }));

    await waitFor(() => {
      expect(screen.getByText('Test Error')).toBeInTheDocument();
    });

    // Click retry button
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    // Error should be cleared
    await waitFor(() => {
      expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
    });
  });
});