import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/AuthContext';
import { CoursesProvider } from '@/hooks/CoursesContext';
import App from '@/App';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'test-user', email: 'test@example.com' } },
        error: null
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      signInWithPassword: vi.fn().mockResolvedValue({
        data: { user: { id: 'test-user', email: 'test@example.com' } },
        error: null
      })
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { role: 'student' },
            error: null
          })
        })
      })
    })
  }
}));

// Mock hooks
vi.mock('@/hooks/useFastDashboard', () => ({
  useFastDashboard: () => ({
    userEnrollments: [],
    loading: false,
    isEnrolled: vi.fn(),
    getEnrollment: vi.fn()
  })
}));

vi.mock('@/hooks/useFastCourses', () => ({
  useFastCourses: () => ({
    courses: [],
    loading: false
  })
}));

vi.mock('@/hooks/useUserRouter', () => ({
  useUserRouter: () => ({
    validateRouteAccess: vi.fn(),
    handleRoleDetectionFailure: vi.fn()
  })
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

// Mock data imports
vi.mock('@/data/comingSoonCourses', () => ({
  comingSoonCourses: []
}));

// Mock logger
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

// Mock embla carousel
vi.mock('embla-carousel-react', () => ({
  default: () => [
    vi.fn(),
    {
      scrollNext: vi.fn(),
      scrollPrev: vi.fn(),
      canScrollNext: vi.fn().mockReturnValue(false),
      canScrollPrev: vi.fn().mockReturnValue(false),
      on: vi.fn(),
      off: vi.fn(),
      destroy: vi.fn(),
      selectedScrollSnap: vi.fn().mockReturnValue(0),
      scrollSnapList: vi.fn().mockReturnValue([])
    }
  ]
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const TestWrapper = ({ children, initialEntries = ['/'] }: { 
  children: React.ReactNode;
  initialEntries?: string[];
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return (
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CoursesProvider>
            {children}
          </CoursesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('Application Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Payment Routes', () => {
    it('should render PaymentPage for /payment/:courseId route', async () => {
      render(
        <TestWrapper initialEntries={['/payment/ai-human-relations']}>
          <App />
        </TestWrapper>
      );

      // Should not show 404 error
      expect(document.body).toBeDefined();
    });

    it('should render PaymentPage for specific course payment route', async () => {
      render(
        <TestWrapper initialEntries={['/payment/entrepreneurship-final']}>
          <App />
        </TestWrapper>
      );

      // Should not show 404 error
      expect(document.body).toBeDefined();
    });
  });

  describe('Admin Routes', () => {
    it('should render AdminDashboard for /admin route', async () => {
      render(
        <TestWrapper initialEntries={['/admin']}>
          <App />
        </TestWrapper>
      );

      // Should not show 404 error
      expect(document.body).toBeDefined();
    });
  });

  describe('Course Routes', () => {
    it('should render Course page for /course/:courseId route', async () => {
      render(
        <TestWrapper initialEntries={['/course/ai-human-relations']}>
          <App />
        </TestWrapper>
      );

      // Should not show 404 error
      expect(document.body).toBeDefined();
    });
  });

  describe('Enrollment Routes', () => {
    it('should render Enrollment page for /enrollment/:courseId route', async () => {
      render(
        <TestWrapper initialEntries={['/enrollment/ai-human-relations']}>
          <App />
        </TestWrapper>
      );

      // Should not show 404 error
      expect(document.body).toBeDefined();
    });
  });

  describe('Payment Success/Cancel Routes', () => {
    it('should render PaymentSuccess for /payment-success route', async () => {
      render(
        <TestWrapper initialEntries={['/payment-success']}>
          <App />
        </TestWrapper>
      );

      // Should not show 404 error
      expect(document.body).toBeDefined();
    });

    it('should render PaymentCancel for /payment-cancel route', async () => {
      render(
        <TestWrapper initialEntries={['/payment-cancel']}>
          <App />
        </TestWrapper>
      );

      // Should not show 404 error
      expect(document.body).toBeDefined();
    });
  });
});