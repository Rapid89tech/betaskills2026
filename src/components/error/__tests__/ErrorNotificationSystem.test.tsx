/**
 * Tests for Error Notification System
 */

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ErrorNotificationSystem from '../ErrorNotificationSystem';
import { type UserFriendlyError } from '@/utils/ErrorHandler';

// Mock navigator.onLine
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true
});

// Mock Audio
global.Audio = vi.fn().mockImplementation(() => ({
  play: vi.fn().mockResolvedValue(undefined),
  volume: 0.5
}));

describe('ErrorNotificationSystem', () => {
  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    if (consoleErrorSpy.mockRestore) {
      consoleErrorSpy.mockRestore();
    }
    vi.useRealTimers();
  });

  describe('Initialization', () => {
    it('renders without notifications initially', () => {
      render(<ErrorNotificationSystem />);
      
      // Should not render anything when no notifications
      expect(document.body.children.length).toBe(1); // Just the test container
    });

    it('monitors network status changes', () => {
      render(<ErrorNotificationSystem />);

      // Simulate going offline
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      act(() => {
        window.dispatchEvent(new Event('offline'));
      });

      // Simulate coming back online
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true
      });

      act(() => {
        window.dispatchEvent(new Event('online'));
      });

      // Should handle network status changes without errors
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('Notification Display', () => {
    it('shows notification when error event is dispatched', () => {
      render(<ErrorNotificationSystem />);

      const userError: UserFriendlyError = {
        message: 'Test error message',
        severity: 'medium',
        category: 'network',
        actions: [
          {
            label: 'Retry',
            action: vi.fn(),
            primary: true
          }
        ]
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      expect(screen.getByText('Test error message')).toBeInTheDocument();
      expect(screen.getByText('network')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('displays multiple notifications', () => {
      render(<ErrorNotificationSystem maxNotifications={3} />);

      const errors = [
        { message: 'Error 1', severity: 'low' as const, category: 'network' as const, actions: [] },
        { message: 'Error 2', severity: 'medium' as const, category: 'api' as const, actions: [] },
        { message: 'Error 3', severity: 'high' as const, category: 'auth' as const, actions: [] }
      ];

      errors.forEach(error => {
        act(() => {
          window.dispatchEvent(new CustomEvent('errorHandler:showError', {
            detail: error
          }));
        });
      });

      expect(screen.getByText('Error 1')).toBeInTheDocument();
      expect(screen.getByText('Error 2')).toBeInTheDocument();
      expect(screen.getByText('Error 3')).toBeInTheDocument();
    });

    it('limits notifications to maxNotifications', () => {
      render(<ErrorNotificationSystem maxNotifications={2} />);

      const errors = [
        { message: 'Error 1', severity: 'low' as const, category: 'network' as const, actions: [] },
        { message: 'Error 2', severity: 'medium' as const, category: 'api' as const, actions: [] },
        { message: 'Error 3', severity: 'high' as const, category: 'auth' as const, actions: [] }
      ];

      errors.forEach(error => {
        act(() => {
          window.dispatchEvent(new CustomEvent('errorHandler:showError', {
            detail: error
          }));
        });
      });

      expect(screen.getByText('Error 3')).toBeInTheDocument();
      expect(screen.getByText('Error 2')).toBeInTheDocument();
      expect(screen.queryByText('Error 1')).not.toBeInTheDocument();
    });
  });

  describe('Auto-hide Functionality', () => {
    it('auto-hides low severity notifications', () => {
      render(<ErrorNotificationSystem defaultAutoHide={true} defaultHideAfter={1000} />);

      const userError: UserFriendlyError = {
        message: 'Auto-hide error',
        severity: 'low',
        category: 'network',
        actions: []
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      expect(screen.getByText('Auto-hide error')).toBeInTheDocument();

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(1100);
      });

      expect(screen.queryByText('Auto-hide error')).not.toBeInTheDocument();
    });

    it('does not auto-hide critical notifications', () => {
      render(<ErrorNotificationSystem defaultAutoHide={true} defaultHideAfter={1000} />);

      const userError: UserFriendlyError = {
        message: 'Critical error',
        severity: 'critical',
        category: 'auth',
        actions: []
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      expect(screen.getByText('Critical error')).toBeInTheDocument();

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(1100);
      });

      // Critical errors should not auto-hide
      expect(screen.getByText('Critical error')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('dismisses notification when close button is clicked', () => {
      render(<ErrorNotificationSystem />);

      const userError: UserFriendlyError = {
        message: 'Dismissible error',
        severity: 'medium',
        category: 'network',
        actions: []
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      expect(screen.getByText('Dismissible error')).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: '' }); // Close button has no text
      fireEvent.click(closeButton);

      expect(screen.queryByText('Dismissible error')).not.toBeInTheDocument();
    });

    it('executes action when action button is clicked', () => {
      render(<ErrorNotificationSystem />);

      const actionMock = vi.fn();
      const userError: UserFriendlyError = {
        message: 'Actionable error',
        severity: 'medium',
        category: 'network',
        actions: [
          {
            label: 'Test Action',
            action: actionMock,
            primary: true
          }
        ]
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      const actionButton = screen.getByRole('button', { name: /test action/i });
      fireEvent.click(actionButton);

      expect(actionMock).toHaveBeenCalled();
    });

    it('dismisses notification after non-primary action', () => {
      render(<ErrorNotificationSystem />);

      const actionMock = vi.fn();
      const userError: UserFriendlyError = {
        message: 'Action error',
        severity: 'medium',
        category: 'network',
        actions: [
          {
            label: 'Secondary Action',
            action: actionMock,
            primary: false
          }
        ]
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      const actionButton = screen.getByRole('button', { name: /secondary action/i });
      fireEvent.click(actionButton);

      expect(actionMock).toHaveBeenCalled();
      expect(screen.queryByText('Action error')).not.toBeInTheDocument();
    });
  });

  describe('Retry Functionality', () => {
    it('shows retry button for retryable errors', () => {
      render(<ErrorNotificationSystem />);

      const userError: UserFriendlyError = {
        message: 'Retryable error',
        severity: 'medium',
        category: 'network',
        actions: [
          {
            label: 'Retry',
            action: vi.fn(),
            primary: true
          }
        ],
        canRetry: true
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      expect(screen.getByRole('button', { name: /auto retry/i })).toBeInTheDocument();
    });

    it('executes retry with progress indication', async () => {
      render(<ErrorNotificationSystem />);

      const retryAction = vi.fn();
      const userError: UserFriendlyError = {
        message: 'Retry error',
        severity: 'medium',
        category: 'network',
        actions: [
          {
            label: 'Retry',
            action: retryAction,
            primary: true
          }
        ],
        canRetry: true,
        retryDelay: 500
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      const retryButton = screen.getByRole('button', { name: /auto retry/i });
      fireEvent.click(retryButton);

      // Should show retrying state
      expect(screen.getByText(/retrying/i)).toBeInTheDocument();

      // Fast-forward past retry delay
      act(() => {
        vi.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(retryAction).toHaveBeenCalled();
      });
    });
  });

  describe('Critical Error Modals', () => {
    it('shows modal for critical errors', () => {
      render(<ErrorNotificationSystem />);

      const userError: UserFriendlyError = {
        message: 'Critical system error',
        severity: 'critical',
        category: 'auth',
        actions: [
          {
            label: 'Sign In',
            action: vi.fn(),
            primary: true
          }
        ]
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      expect(screen.getByText('Critical Error')).toBeInTheDocument();
      expect(screen.getByText('Critical system error')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('shows offline indicator in critical modal when offline', () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      render(<ErrorNotificationSystem />);

      const userError: UserFriendlyError = {
        message: 'Critical offline error',
        severity: 'critical',
        category: 'network',
        actions: []
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      expect(screen.getByText(/offline/i)).toBeInTheDocument();
    });
  });

  describe('Sound Notifications', () => {
    it('plays sound for non-low severity errors when enabled', () => {
      render(<ErrorNotificationSystem enableSound={true} />);

      const userError: UserFriendlyError = {
        message: 'Sound error',
        severity: 'high',
        category: 'network',
        actions: []
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      expect(global.Audio).toHaveBeenCalledWith('/notification.mp3');
    });

    it('does not play sound when disabled', () => {
      render(<ErrorNotificationSystem enableSound={false} />);

      const userError: UserFriendlyError = {
        message: 'Silent error',
        severity: 'high',
        category: 'network',
        actions: []
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      expect(global.Audio).not.toHaveBeenCalled();
    });

    it('does not play sound for low severity errors', () => {
      render(<ErrorNotificationSystem enableSound={true} />);

      const userError: UserFriendlyError = {
        message: 'Low severity error',
        severity: 'low',
        category: 'network',
        actions: []
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      expect(global.Audio).not.toHaveBeenCalled();
    });
  });

  describe('Positioning', () => {
    it('applies correct positioning classes', () => {
      const { rerender } = render(<ErrorNotificationSystem position="top-left" />);

      const userError: UserFriendlyError = {
        message: 'Position test',
        severity: 'medium',
        category: 'network',
        actions: []
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      let container = document.querySelector('.fixed');
      expect(container).toHaveClass('top-4', 'left-4');

      // Test different position
      rerender(<ErrorNotificationSystem position="bottom-center" />);

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      container = document.querySelector('.fixed');
      expect(container).toHaveClass('bottom-4', 'left-1/2');
    });
  });

  describe('Network Status Integration', () => {
    it('shows offline indicator for network errors when offline', () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      render(<ErrorNotificationSystem />);

      const userError: UserFriendlyError = {
        message: 'Network error while offline',
        severity: 'medium',
        category: 'network',
        actions: []
      };

      act(() => {
        window.dispatchEvent(new CustomEvent('errorHandler:showError', {
          detail: userError
        }));
      });

      // Should show offline indicator
      const offlineIcons = document.querySelectorAll('[data-lucide="wifi-off"]');
      expect(offlineIcons.length).toBeGreaterThan(0);
    });

    it('updates network status when connectivity changes', () => {
      render(<ErrorNotificationSystem />);

      // Start online
      expect(navigator.onLine).toBe(true);

      // Go offline
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      act(() => {
        window.dispatchEvent(new Event('offline'));
      });

      // Come back online
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true
      });

      act(() => {
        window.dispatchEvent(new Event('online'));
      });

      // Should handle network changes without errors
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('Cleanup', () => {
    it('removes event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = render(<ErrorNotificationSystem />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('errorHandler:showError', expect.any(Function));

      if (removeEventListenerSpy.mockRestore) {
        removeEventListenerSpy.mockRestore();
      }
    });
  });
});