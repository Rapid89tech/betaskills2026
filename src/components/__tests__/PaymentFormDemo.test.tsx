import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PaymentFormDemo from '../PaymentFormDemo';

// Mock the PaymentErrorHandler
vi.mock('@/services/PaymentErrorHandler', () => ({
  PaymentErrorHandler: {
    getInstance: vi.fn(() => ({
      processPaymentError: vi.fn((error, context) => ({
        userMessage: {
          title: 'Payment Declined',
          description: 'Payment declined: Insufficient funds. Please check your account balance or try a different card.',
          actions: [
            { label: 'Try Different Card', action: 'try_different_card', primary: true },
            { label: 'Use EFT Payment', action: 'try_eft' },
            { label: 'Contact Support', action: 'contact_support' }
          ],
          icon: 'CreditCard',
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

describe('PaymentFormDemo', () => {
  it('renders demo interface correctly', () => {
    render(<PaymentFormDemo />);
    
    expect(screen.getByText('Payment Error Display Demo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /insufficient funds/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /expired card/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /invalid cvv/i })).toBeInTheDocument();
  });

  it('displays error when button is clicked', () => {
    render(<PaymentFormDemo />);
    
    // Click the insufficient funds button
    fireEvent.click(screen.getByRole('button', { name: /insufficient funds/i }));
    
    // Check that error is displayed
    expect(screen.getByText('Payment Declined')).toBeInTheDocument();
    expect(screen.getByText(/payment declined: insufficient funds/i)).toBeInTheDocument();
    
    // Check that action buttons are displayed
    expect(screen.getByRole('button', { name: /try different card/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /use eft payment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact support/i })).toBeInTheDocument();
  });

  it('clears error when clear button is clicked', () => {
    render(<PaymentFormDemo />);
    
    // First show an error
    fireEvent.click(screen.getByRole('button', { name: /insufficient funds/i }));
    expect(screen.getByText('Payment Declined')).toBeInTheDocument();
    
    // Then clear it
    fireEvent.click(screen.getByRole('button', { name: /clear error/i }));
    expect(screen.queryByText('Payment Declined')).not.toBeInTheDocument();
  });
});