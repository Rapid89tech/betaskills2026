/**
 * ComponentFallbacks Tests
 * 
 * Tests for fallback components used when main components fail to load.
 * Covers all fallback scenarios and user interactions.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  LoadingFallback,
  ErrorFallback,
  DashboardFallback,
  CourseContentFallback,
  AdminPanelFallback,
  UserProfileFallback,
  FormFallback,
  ListFallback,
  MinimalFallback,
  SkeletonFallback,
  ComponentFallbacks
} from '../ComponentFallbacks';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  AlertCircle: () => React.createElement('div', { 'data-testid': 'alert-circle-icon' }),
  RefreshCw: () => React.createElement('div', { 'data-testid': 'refresh-icon' }),
  Home: () => React.createElement('div', { 'data-testid': 'home-icon' }),
  User: () => React.createElement('div', { 'data-testid': 'user-icon' }),
  BookOpen: () => React.createElement('div', { 'data-testid': 'book-icon' }),
  Settings: () => React.createElement('div', { 'data-testid': 'settings-icon' }),
  FileText: () => React.createElement('div', { 'data-testid': 'file-icon' }),
  Users: () => React.createElement('div', { 'data-testid': 'users-icon' })
}));

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, variant, ...props }: any) =>
    React.createElement('button', {
      onClick,
      className: `btn ${variant || 'default'} ${className || ''}`,
      'data-testid': 'button',
      ...props
    }, children)
}));

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: any) =>
    React.createElement('div', {
      className: `card ${className || ''}`,
      'data-testid': 'card',
      ...props
    }, children),
  CardContent: ({ children, className, ...props }: any) =>
    React.createElement('div', {
      className: `card-content ${className || ''}`,
      'data-testid': 'card-content',
      ...props
    }, children),
  CardHeader: ({ children, className, ...props }: any) =>
    React.createElement('div', {
      className: `card-header ${className || ''}`,
      'data-testid': 'card-header',
      ...props
    }, children),
  CardTitle: ({ children, className, ...props }: any) =>
    React.createElement('h3', {
      className: `card-title ${className || ''}`,
      'data-testid': 'card-title',
      ...props
    }, children)
}));

vi.mock('@/components/ui/alert', () => ({
  Alert: ({ children, className, ...props }: any) =>
    React.createElement('div', {
      className: `alert ${className || ''}`,
      'data-testid': 'alert',
      ...props
    }, children),
  AlertDescription: ({ children, className, ...props }: any) =>
    React.createElement('div', {
      className: `alert-description ${className || ''}`,
      'data-testid': 'alert-description',
      ...props
    }, children)
}));

// Mock window.location.reload
Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn()
  },
  writable: true
});

describe('ComponentFallbacks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('LoadingFallback', () => {
    it('should render loading spinner and message', () => {
      render(<LoadingFallback componentName="TestComponent" />);
      
      expect(screen.getByText('Loading TestComponent...')).toBeInTheDocument();
      expect(screen.getByText('Please wait while we prepare your content')).toBeInTheDocument();
    });

    it('should use default component name when not provided', () => {
      render(<LoadingFallback />);
      
      expect(screen.getByText('Loading component...')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<LoadingFallback className="custom-class" />);
      
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('ErrorFallback', () => {
    const mockError = new Error('Test error message');
    const mockRetry = vi.fn();

    it('should render error message and retry button', () => {
      render(<ErrorFallback error={mockError} retry={mockRetry} componentName="TestComponent" />);
      
      expect(screen.getByText('Component Failed to Load')).toBeInTheDocument();
      expect(screen.getByText(/The TestComponent could not be loaded/)).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
      expect(screen.getByText('Refresh Page')).toBeInTheDocument();
    });

    it('should call retry function when Try Again is clicked', () => {
      render(<ErrorFallback error={mockError} retry={mockRetry} />);
      
      fireEvent.click(screen.getByText('Try Again'));
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });

    it('should call window.location.reload when Refresh Page is clicked', () => {
      render(<ErrorFallback error={mockError} retry={mockRetry} />);
      
      fireEvent.click(screen.getByText('Refresh Page'));
      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });

    it('should render without retry button when retry is not provided', () => {
      render(<ErrorFallback error={mockError} />);
      
      expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
      expect(screen.getByText('Refresh Page')).toBeInTheDocument();
    });

    it('should render without error details when error is not provided', () => {
      render(<ErrorFallback retry={mockRetry} />);
      
      expect(screen.getByText('Component Failed to Load')).toBeInTheDocument();
      expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    });
  });

  describe('DashboardFallback', () => {
    const mockRetry = vi.fn();

    it('should render dashboard unavailable message', () => {
      render(<DashboardFallback retry={mockRetry} />);
      
      expect(screen.getByText('Dashboard Unavailable')).toBeInTheDocument();
      expect(screen.getByText(/The dashboard is temporarily unavailable/)).toBeInTheDocument();
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should render navigation buttons', () => {
      render(<DashboardFallback retry={mockRetry} />);
      
      expect(screen.getByText('View Courses')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Reload Dashboard')).toBeInTheDocument();
    });

    it('should call retry when reload button is clicked', () => {
      render(<DashboardFallback retry={mockRetry} />);
      
      fireEvent.click(screen.getByText('Reload Dashboard'));
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });

    it('should not render reload button when retry is not provided', () => {
      render(<DashboardFallback />);
      
      expect(screen.queryByText('Reload Dashboard')).not.toBeInTheDocument();
    });
  });

  describe('CourseContentFallback', () => {
    const mockRetry = vi.fn();

    it('should render course content unavailable message', () => {
      render(<CourseContentFallback retry={mockRetry} />);
      
      expect(screen.getByText('Course Content Unavailable')).toBeInTheDocument();
      expect(screen.getByText(/The course content could not be loaded/)).toBeInTheDocument();
      expect(screen.getByTestId('book-icon')).toBeInTheDocument();
    });

    it('should render helpful suggestions', () => {
      render(<CourseContentFallback retry={mockRetry} />);
      
      expect(screen.getByText('What you can do:')).toBeInTheDocument();
      expect(screen.getByText(/Check your internet connection/)).toBeInTheDocument();
      expect(screen.getByText(/Try refreshing the page/)).toBeInTheDocument();
      expect(screen.getByText(/Contact support if the problem persists/)).toBeInTheDocument();
    });

    it('should call retry when reload button is clicked', () => {
      render(<CourseContentFallback retry={mockRetry} />);
      
      fireEvent.click(screen.getByText('Reload Course Content'));
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('AdminPanelFallback', () => {
    const mockRetry = vi.fn();

    it('should render admin panel unavailable message', () => {
      render(<AdminPanelFallback retry={mockRetry} />);
      
      expect(screen.getByText('Admin Panel Unavailable')).toBeInTheDocument();
      expect(screen.getByText(/The admin panel could not be loaded/)).toBeInTheDocument();
      expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
    });

    it('should render admin-specific alert', () => {
      render(<AdminPanelFallback retry={mockRetry} />);
      
      expect(screen.getByText(/check your admin permissions/)).toBeInTheDocument();
    });

    it('should call retry when reload button is clicked', () => {
      render(<AdminPanelFallback retry={mockRetry} />);
      
      fireEvent.click(screen.getByText('Reload Admin Panel'));
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('UserProfileFallback', () => {
    const mockRetry = vi.fn();

    it('should render user profile unavailable message', () => {
      render(<UserProfileFallback retry={mockRetry} />);
      
      expect(screen.getByText('Profile Unavailable')).toBeInTheDocument();
      expect(screen.getByText(/Your profile information could not be loaded/)).toBeInTheDocument();
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    });

    it('should render navigation options', () => {
      render(<UserProfileFallback retry={mockRetry} />);
      
      expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Reload Profile')).toBeInTheDocument();
    });

    it('should call retry when reload button is clicked', () => {
      render(<UserProfileFallback retry={mockRetry} />);
      
      fireEvent.click(screen.getByText('Reload Profile'));
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('FormFallback', () => {
    const mockError = new Error('Form loading error');
    const mockRetry = vi.fn();

    it('should render form unavailable message', () => {
      render(<FormFallback error={mockError} retry={mockRetry} componentName="Contact Form" />);
      
      expect(screen.getByText('Form Unavailable')).toBeInTheDocument();
      expect(screen.getByText(/The Contact Form could not be loaded/)).toBeInTheDocument();
      expect(screen.getByTestId('file-icon')).toBeInTheDocument();
    });

    it('should display error details when provided', () => {
      render(<FormFallback error={mockError} retry={mockRetry} />);
      
      expect(screen.getByText(/Form loading error/)).toBeInTheDocument();
    });

    it('should use default form name when not provided', () => {
      render(<FormFallback retry={mockRetry} />);
      
      expect(screen.getByText(/The form could not be loaded/)).toBeInTheDocument();
    });

    it('should call retry when reload button is clicked', () => {
      render(<FormFallback retry={mockRetry} />);
      
      fireEvent.click(screen.getByText('Reload Form'));
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('ListFallback', () => {
    const mockRetry = vi.fn();

    it('should render list unavailable message', () => {
      render(<ListFallback retry={mockRetry} componentName="User List" />);
      
      expect(screen.getByText('Content Unavailable')).toBeInTheDocument();
      expect(screen.getByText(/The User List could not be loaded/)).toBeInTheDocument();
      expect(screen.getByTestId('users-icon')).toBeInTheDocument();
    });

    it('should render skeleton placeholder', () => {
      const { container } = render(<ListFallback retry={mockRetry} />);
      
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('should use default list name when not provided', () => {
      render(<ListFallback retry={mockRetry} />);
      
      expect(screen.getByText(/The list could not be loaded/)).toBeInTheDocument();
    });

    it('should call retry when reload button is clicked', () => {
      render(<ListFallback retry={mockRetry} />);
      
      fireEvent.click(screen.getByText('Reload Content'));
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('MinimalFallback', () => {
    it('should render minimal fallback message', () => {
      render(<MinimalFallback componentName="TestComponent" />);
      
      expect(screen.getByText('TestComponent unavailable')).toBeInTheDocument();
      expect(screen.getByTestId('alert-circle-icon')).toBeInTheDocument();
    });

    it('should use default component name when not provided', () => {
      render(<MinimalFallback />);
      
      expect(screen.getByText('component unavailable')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<MinimalFallback className="custom-minimal" />);
      
      expect(container.firstChild).toHaveClass('custom-minimal');
    });
  });

  describe('SkeletonFallback', () => {
    it('should render default number of skeleton lines', () => {
      const { container } = render(<SkeletonFallback />);
      
      const skeletonLines = container.querySelectorAll('.h-4.bg-gray-200');
      expect(skeletonLines.length).toBe(6); // 3 lines * 2 elements per line
    });

    it('should render custom number of skeleton lines', () => {
      const { container } = render(<SkeletonFallback lines={5} />);
      
      const skeletonLines = container.querySelectorAll('.h-4.bg-gray-200');
      expect(skeletonLines.length).toBe(10); // 5 lines * 2 elements per line
    });

    it('should apply custom className', () => {
      const { container } = render(<SkeletonFallback className="custom-skeleton" />);
      
      expect(container.firstChild).toHaveClass('custom-skeleton');
    });

    it('should have animate-pulse class', () => {
      const { container } = render(<SkeletonFallback />);
      
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });

  describe('ComponentFallbacks Export', () => {
    it('should export all fallback components', () => {
      expect(ComponentFallbacks.Loading).toBe(LoadingFallback);
      expect(ComponentFallbacks.Error).toBe(ErrorFallback);
      expect(ComponentFallbacks.Dashboard).toBe(DashboardFallback);
      expect(ComponentFallbacks.CourseContent).toBe(CourseContentFallback);
      expect(ComponentFallbacks.AdminPanel).toBe(AdminPanelFallback);
      expect(ComponentFallbacks.UserProfile).toBe(UserProfileFallback);
      expect(ComponentFallbacks.Form).toBe(FormFallback);
      expect(ComponentFallbacks.List).toBe(ListFallback);
      expect(ComponentFallbacks.Minimal).toBe(MinimalFallback);
      expect(ComponentFallbacks.Skeleton).toBe(SkeletonFallback);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for loading states', () => {
      render(<LoadingFallback componentName="TestComponent" />);
      
      // Check for loading indicators that screen readers can understand
      expect(screen.getByText('Loading TestComponent...')).toBeInTheDocument();
    });

    it('should have proper button labels for retry actions', () => {
      const mockRetry = vi.fn();
      render(<ErrorFallback retry={mockRetry} />);
      
      const tryAgainButton = screen.getByText('Try Again');
      const refreshButton = screen.getByText('Refresh Page');
      
      expect(tryAgainButton).toBeInTheDocument();
      expect(refreshButton).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      render(<DashboardFallback />);
      
      expect(screen.getByTestId('card-title')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing props gracefully', () => {
      expect(() => render(<LoadingFallback />)).not.toThrow();
      expect(() => render(<ErrorFallback />)).not.toThrow();
      expect(() => render(<MinimalFallback />)).not.toThrow();
    });

    it('should handle undefined error objects', () => {
      expect(() => render(<ErrorFallback error={undefined} />)).not.toThrow();
    });

    it('should handle missing retry functions', () => {
      expect(() => render(<ErrorFallback retry={undefined} />)).not.toThrow();
    });
  });

  describe('Responsive Design', () => {
    it('should apply responsive classes for mobile layouts', () => {
      const { container } = render(<ErrorFallback />);
      
      // Check for responsive flex classes
      expect(container.querySelector('.flex-col')).toBeInTheDocument();
      expect(container.querySelector('.sm\\:flex-row')).toBeInTheDocument();
    });

    it('should have proper spacing for different screen sizes', () => {
      const { container } = render(<DashboardFallback />);
      
      // Check for responsive grid classes
      expect(container.querySelector('.grid-cols-2')).toBeInTheDocument();
    });
  });
});