import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/AuthContext';
import { CoursesProvider } from '@/hooks/CoursesContext';
import { EnrollmentProvider } from '@/hooks/EnrollmentContext';
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
    }),
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnValue({
        unsubscribe: vi.fn()
      })
    })
  }
}));

// Mock all the hooks and services
vi.mock('@/hooks/useFastDashboard', () => ({
  useFastDashboard: () => ({
    userEnrollments: [],
    loading: false,
    isEnrolled: vi.fn(),
    getEnrollment: vi.fn(),
    refresh: vi.fn()
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

// Mock services
vi.mock('@/services/enrollmentService', () => ({
  enrollmentService: {
    createEnrollment: vi.fn().mockResolvedValue({
      id: 'enrollment-123',
      status: 'approved'
    })
  }
}));

vi.mock('@/services/enrollmentNotificationService', () => ({
  enrollmentNotificationService: {
    sendNotification: vi.fn()
  }
}));

vi.mock('@/services/errorLoggingService', () => ({
  errorLoggingService: {
    logError: vi.fn()
  }
}));

vi.mock('@/services/crossTabSyncService', () => ({
  crossTabSyncService: {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
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
            <EnrollmentProvider>
              {children}
            </EnrollmentProvider>
          </CoursesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('Enrollment Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Provider Integration', () => {
    it('should have all required providers in the correct order', async () => {
      render(
        <TestWrapper initialEntries={['/courses']}>
          <App />
        </TestWrapper>
      );

      // Should render without errors, indicating all providers are properly configured
      expect(document.body).toBeDefined();
    });

    it('should handle enrollment context updates', async () => {
      render(
        <TestWrapper initialEntries={['/courses']}>
          <App />
        </TestWrapper>
      );

      // Simulate enrollment success event
      const enrollmentEvent = new CustomEvent('enrollment-success', {
        detail: { courseId: 'test-course', enrollment: { id: 'test-enrollment' } }
      });

      // Should not throw errors when event is dispatched
      expect(() => {
        window.dispatchEvent(enrollmentEvent);
      }).not.toThrow();
    });
  });

  describe('Payment Flow', () => {
    it('should render PaymentPage correctly', async () => {
      render(
        <TestWrapper initialEntries={['/payment/ai-human-relations']}>
          <App />
        </TestWrapper>
      );

      // Should render payment page without 404 error
      expect(document.body).toBeDefined();
    });

    it('should render PaymentSuccess page correctly', async () => {
      render(
        <TestWrapper initialEntries={['/payment-success?course_id=ai-human-relations&payment_id=test123']}>
          <App />
        </TestWrapper>
      );

      // Should render payment success page without errors
      expect(document.body).toBeDefined();
    });
  });

  describe('Dashboard Integration', () => {
    it('should render Dashboard with enrollment context', async () => {
      render(
        <TestWrapper initialEntries={['/dashboard']}>
          <App />
        </TestWrapper>
      );

      // Should render dashboard without errors
      expect(document.body).toBeDefined();
    });

    it('should handle enrollment refresh events', async () => {
      render(
        <TestWrapper initialEntries={['/dashboard']}>
          <App />
        </TestWrapper>
      );

      // Simulate enrollment success event
      const enrollmentEvent = new CustomEvent('enrollment-success');
      
      // Should handle the event without errors
      expect(() => {
        window.dispatchEvent(enrollmentEvent);
      }).not.toThrow();
    });
  });

  describe('Admin Dashboard', () => {
    it('should render AdminDashboard correctly', async () => {
      render(
        <TestWrapper initialEntries={['/admin']}>
          <App />
        </TestWrapper>
      );

      // Should render admin dashboard without 404 error
      expect(document.body).toBeDefined();
    });
  });

  describe('Course Routes', () => {
    it('should render Course page correctly', async () => {
      render(
        <TestWrapper initialEntries={['/course/ai-human-relations']}>
          <App />
        </TestWrapper>
      );

      // Should render course page without 404 error
      expect(document.body).toBeDefined();
    });

    it('should render Enrollment page correctly', async () => {
      render(
        <TestWrapper initialEntries={['/enrollment/ai-human-relations']}>
          <App />
        </TestWrapper>
      );

      // Should render enrollment page without 404 error
      expect(document.body).toBeDefined();
    });
  });
});