import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import OptimizedAdminDashboard from '../OptimizedAdminDashboard';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    })),
    channel: vi.fn(() => ({
      on: vi.fn(() => ({
        subscribe: vi.fn()
      }))
    })),
    removeChannel: vi.fn()
  }
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

vi.mock('react-window', () => ({
  FixedSizeList: ({ children, itemData, itemCount }: any) => (
    <div data-testid="virtualized-list">
      {Array.from({ length: Math.min(itemCount, 5) }, (_, index) =>
        children({ index, style: {}, data: itemData })
      )}
    </div>
  )
}));

describe('OptimizedAdminDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the optimized admin dashboard', async () => {
    render(<OptimizedAdminDashboard />);
    
    expect(screen.getByText('Optimized Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText('High-performance enrollment management')).toBeInTheDocument();
  });

  it('shows performance monitoring component', async () => {
    render(<OptimizedAdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Optimized Admin Dashboard')).toBeInTheDocument();
    });
  });

  it('renders search input with debouncing', async () => {
    render(<OptimizedAdminDashboard />);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search enrollments...');
      expect(searchInput).toBeInTheDocument();
    });
  });

  it('renders filter controls', async () => {
    render(<OptimizedAdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Date Range')).toBeInTheDocument();
      expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    });
  });

  it('handles search input changes', async () => {
    render(<OptimizedAdminDashboard />);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search enrollments...');
      fireEvent.change(searchInput, { target: { value: 'test search' } });
      expect(searchInput).toHaveValue('test search');
    });
  });

  it('handles filter changes', async () => {
    render(<OptimizedAdminDashboard />);
    
    await waitFor(() => {
      const statusFilter = screen.getByDisplayValue('All Statuses');
      fireEvent.change(statusFilter, { target: { value: 'pending' } });
      expect(statusFilter).toHaveValue('pending');
    });
  });

  it('shows stats cards', async () => {
    render(<OptimizedAdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Total Users')).toBeInTheDocument();
      expect(screen.getByText('Total Enrollments')).toBeInTheDocument();
      expect(screen.getByText('Pending Enrollments')).toBeInTheDocument();
      expect(screen.getByText('Filtered Results')).toBeInTheDocument();
    });
  });
});