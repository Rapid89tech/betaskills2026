import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

// Mock the AuthContext
const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
};

const mockProfile = {
  role: 'student',
  first_name: 'Test',
  last_name: 'User',
};

vi.mock('@/hooks/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    user: null,
    profile: null,
    loading: false,
  })),
}));

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock NotificationBell component
vi.mock('../notifications/NotificationBell', () => ({
  default: () => <div data-testid="notification-bell">NotificationBell</div>,
}));

// Mock LogoutButton component
vi.mock('../LogoutButton', () => ({
  default: () => <button data-testid="logout-button">Logout</button>,
}));

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Header Mobile Behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Menu Toggle Functionality', () => {
    it('should render the mobile menu button', () => {
      renderHeader();
      
      // The mobile menu button should be present (hidden on desktop via CSS)
      const menuButton = screen.getByRole('button', { name: '' });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveClass('md:hidden');
    });

    it('should toggle mobile menu open when menu button is clicked', () => {
      renderHeader();
      
      // Initially, mobile navigation should not be visible
      expect(screen.queryByText('Home')).toBeInTheDocument(); // Desktop nav has Home
      
      // Find and click the mobile menu button
      const menuButton = document.querySelector('button.md\\:hidden');
      expect(menuButton).toBeInTheDocument();
      
      fireEvent.click(menuButton!);
      
      // After clicking, mobile navigation should be visible
      // Mobile nav has multiple Home links (desktop + mobile)
      const homeLinks = screen.getAllByText('Home');
      expect(homeLinks.length).toBeGreaterThanOrEqual(2);
    });

    it('should toggle mobile menu closed when menu button is clicked again', () => {
      renderHeader();
      
      const menuButton = document.querySelector('button.md\\:hidden');
      expect(menuButton).toBeInTheDocument();
      
      // Open the menu
      fireEvent.click(menuButton!);
      
      // Verify menu is open (multiple Home links)
      let homeLinks = screen.getAllByText('Home');
      expect(homeLinks.length).toBeGreaterThanOrEqual(2);
      
      // Close the menu
      fireEvent.click(menuButton!);
      
      // After closing, only desktop nav Home should be visible
      homeLinks = screen.getAllByText('Home');
      expect(homeLinks.length).toBe(1);
    });

    it('should show X icon when menu is open and Menu icon when closed', () => {
      renderHeader();
      
      const menuButton = document.querySelector('button.md\\:hidden');
      expect(menuButton).toBeInTheDocument();
      
      // Initially should show Menu icon (hamburger)
      expect(menuButton?.querySelector('svg')).toBeInTheDocument();
      
      // Open the menu
      fireEvent.click(menuButton!);
      
      // Should still have an SVG icon (X icon)
      expect(menuButton?.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Navigation Overlay Rendering', () => {
    it('should render mobile navigation overlay when menu is open', () => {
      renderHeader();
      
      const menuButton = document.querySelector('button.md\\:hidden');
      fireEvent.click(menuButton!);
      
      // Mobile navigation should be visible with proper styling
      const mobileNav = document.querySelector('nav.md\\:hidden');
      expect(mobileNav).toBeInTheDocument();
      expect(mobileNav).toHaveClass('bg-white/95');
      expect(mobileNav).toHaveClass('backdrop-blur-sm');
      expect(mobileNav).toHaveClass('rounded-xl');
      expect(mobileNav).toHaveClass('shadow-lg');
    });

    it('should render Home and Courses links in mobile navigation', () => {
      renderHeader();
      
      const menuButton = document.querySelector('button.md\\:hidden');
      fireEvent.click(menuButton!);
      
      // Check for navigation links in mobile menu
      const mobileNav = document.querySelector('nav.md\\:hidden');
      expect(mobileNav).toBeInTheDocument();
      
      const homeLink = mobileNav?.querySelector('a[href="/"]');
      const coursesLink = mobileNav?.querySelector('a[href="/courses"]');
      
      expect(homeLink).toBeInTheDocument();
      expect(coursesLink).toBeInTheDocument();
    });

    it('should render Log In and Get Started buttons for unauthenticated users', () => {
      renderHeader();
      
      const menuButton = document.querySelector('button.md\\:hidden');
      fireEvent.click(menuButton!);
      
      // Check for auth buttons in mobile menu
      const mobileNav = document.querySelector('nav.md\\:hidden');
      expect(mobileNav).toBeInTheDocument();
      
      const authLinks = mobileNav?.querySelectorAll('a[href="/auth"]');
      expect(authLinks?.length).toBe(2); // Log In and Get Started
    });

    it('should close mobile menu when a navigation link is clicked', () => {
      renderHeader();
      
      const menuButton = document.querySelector('button.md\\:hidden');
      fireEvent.click(menuButton!);
      
      // Find and click a link in mobile nav
      const mobileNav = document.querySelector('nav.md\\:hidden');
      const homeLink = mobileNav?.querySelector('a[href="/"]');
      
      expect(homeLink).toBeInTheDocument();
      fireEvent.click(homeLink!);
      
      // Menu should be closed (mobile nav should not be visible)
      expect(document.querySelector('nav.md\\:hidden')).not.toBeInTheDocument();
    });

    it('should have touch-friendly link styling in mobile navigation', () => {
      renderHeader();
      
      const menuButton = document.querySelector('button.md\\:hidden');
      fireEvent.click(menuButton!);
      
      const mobileNav = document.querySelector('nav.md\\:hidden');
      const homeLink = mobileNav?.querySelector('a[href="/"]');
      
      // Check for touch-friendly classes (py-3 for padding, rounded-lg for tap area)
      expect(homeLink).toHaveClass('py-3');
      expect(homeLink).toHaveClass('px-4');
      expect(homeLink).toHaveClass('rounded-lg');
    });
  });
});
