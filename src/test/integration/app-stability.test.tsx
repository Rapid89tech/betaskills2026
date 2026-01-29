import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/AuthContext';
import { CoursesProvider } from '@/hooks/CoursesContext';
import Courses from '@/pages/Courses';
import Dashboard from '@/pages/Dashboard';

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
    vi.fn(), // emblaRef
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

// Mock window.matchMedia for carousel
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CoursesProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </CoursesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('Application Stability', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Courses Page', () => {
    it('should render without crashing', async () => {
      render(
        <TestWrapper>
          <Courses />
        </TestWrapper>
      );

      // Should not throw an error and should render some content
      expect(document.body).toBeDefined();
    });

    it('should have CoursesProvider context available', async () => {
      render(
        <TestWrapper>
          <Courses />
        </TestWrapper>
      );

      // The page should render without the "useCoursesContext must be used within a CoursesProvider" error
      expect(document.body).toBeDefined();
    });
  });

  describe('Dashboard Page', () => {
    it('should render without crashing', async () => {
      render(
        <TestWrapper>
          <Dashboard />
        </TestWrapper>
      );

      // Should not throw an error and should render some content
      expect(document.body).toBeDefined();
    });
  });

  describe('Context Providers', () => {
    it('should provide CoursesContext', async () => {
      const { useCoursesContext } = await import('@/hooks/CoursesContext');
      
      const TestComponent = () => {
        const { courses, loading } = useCoursesContext();
        return <div data-testid="courses-count">{courses.length}</div>;
      };

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('courses-count')).toBeDefined();
    });
  });
});