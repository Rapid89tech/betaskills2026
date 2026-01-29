import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ApplicationErrorBoundary from '../ApplicationErrorBoundary';

describe('ApplicationErrorBoundary Basic Test', () => {
  it('should render without crashing', () => {
    render(
      <ApplicationErrorBoundary>
        <div>Test content</div>
      </ApplicationErrorBoundary>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});