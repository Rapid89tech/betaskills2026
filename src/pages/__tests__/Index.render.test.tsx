import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '../Index';

// Simple render test to verify no console errors
describe('Index Render Test', () => {
  test('renders without console errors', () => {
    // Capture console errors
    const originalError = console.error;
    const errors: string[] = [];
    console.error = (...args: any[]) => {
      errors.push(args.join(' '));
    };

    try {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      // Verify no console errors occurred
      expect(errors).toHaveLength(0);
    } finally {
      // Restore console.error
      console.error = originalError;
    }
  });
});