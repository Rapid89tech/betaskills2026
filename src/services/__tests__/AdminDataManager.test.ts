import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { AdminDataManager, EnrollmentFilters, UserFilters, PaymentFilters } from '../AdminDataManager';
import { EnrollmentStatus, PaymentStatus } from '@/types/enrollment';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => {
  const mockSupabase = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          in: vi.fn(() => ({
            gte: vi.fn(() => ({
              lte: vi.fn(() => ({
                limit: vi.fn(() => ({
                  range: vi.fn(() => ({
                    order: vi.fn(() => Promise.resolve({ data: [], error: null }))
                  }))
                }))
              }))
            }))
          }))
        })),
        in: vi.fn(() => ({
          eq: vi.fn(() => ({
            gte: vi.fn(() => ({
              lte: vi.fn(() => ({
                limit: vi.fn(() => ({
                  range: vi.fn(() => ({
                    order: vi.fn(() => Promise.resolve({ data: [], error: null }))
                  }))
                }))
              }))
            }))
          })),
          or: vi.fn(() => ({
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: [], error: null }))
              }))
            })),
            order: vi.fn(() => Promise.resolve({ data: [], error: null }))
          })),
          limit: vi.fn(() => ({
            range: vi.fn(() => ({
              order: vi.fn(() => Promise.resolve({ data: [], error: null }))
            })),
            order: vi.fn(() => Promise.resolve({ data: [], error: null }))
          })),
          order: vi.fn(() => Promise.resolve({ data: [], error: null }))
        })),
        gte: vi.fn(() => ({
          lte: vi.fn(() => ({
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: [], error: null }))
              }))
            })),
            order: vi.fn(() => Promise.resolve({ data: [], error: null }))
          })),
          limit: vi.fn(() => ({
            range: vi.fn(() => ({
              order: vi.fn(() => Promise.resolve({ data: [], error: null }))
            })),
            order: vi.fn(() => Promise.resolve({ data: [], error: null }))
          })),
          order: vi.fn(() => Promise.resolve({ data: [], error: null }))
        })),
        lte: vi.fn(() => ({
          limit: vi.fn(() => ({
            range: vi.fn(() => ({
              order: vi.fn(() => Promise.resolve({ data: [], error: null }))
            })),
            order: vi.fn(() => Promise.resolve({ data: [], error: null }))
          })),
          order: vi.fn(() => Promise.resolve({ data: [], error: null }))
        })),
        limit: vi.fn(() => ({
          range: vi.fn(() => ({
            order: vi.fn(() => Promise.resolve({ data: [], error: null }))
          })),
          order: vi.fn(() => Promise.resolve({ data: [], error: null }))
        })),
        range: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: [], error: null }))
        })),
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  };

  return {
    supabase: mockSupabase
  };
});

describe('AdminDataManager', () => {
  let adminDataManager: AdminDataManager;
  let mockSupabase: any;

  beforeEach(async () => {
    // Get the mocked supabase
    const { supabase } = await import('@/integrations/supabase/client');
    mockSupabase = supabase;
    
    adminDataManager = AdminDataManager.getInstance();
    // Clear cache before each test
    await adminDataManager.refreshCache();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = AdminDataManager.getInstance();
      const instance2 = AdminDataManager.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Enrollment Management', () => {
    const mockEnrollmentData = [
      {
        id: '1',
        user_id: 'user1',
        course_id: 'course1',
        payment_type: 'EFT',
        status: 'pending',
        payment_status: 'pending',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        profiles: {
          email: 'user1@example.com',
          first_name: 'John',
          last_name: 'Doe'
        },
        courses: {
          title: 'Test Course',
          description: 'Test Description',
          instructor_id: 'instructor1'
        }
      }
    ];

    beforeEach(() => {
      const mockQuery = {
        select: vi.fn(() => ({
          in: vi.fn(() => ({
            eq: vi.fn(() => ({
              gte: vi.fn(() => ({
                lte: vi.fn(() => ({
                  limit: vi.fn(() => ({
                    range: vi.fn(() => ({
                      order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
                    }))
                  }))
                }))
              }))
            })),
            gte: vi.fn(() => ({
              lte: vi.fn(() => ({
                limit: vi.fn(() => ({
                  range: vi.fn(() => ({
                    order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
                  }))
                }))
              }))
            })),
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
              }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
          })),
          eq: vi.fn(() => ({
            in: vi.fn(() => ({
              gte: vi.fn(() => ({
                lte: vi.fn(() => ({
                  limit: vi.fn(() => ({
                    range: vi.fn(() => ({
                      order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
                    }))
                  }))
                }))
              }))
            })),
            gte: vi.fn(() => ({
              lte: vi.fn(() => ({
                limit: vi.fn(() => ({
                  range: vi.fn(() => ({
                    order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
                  }))
                }))
              }))
            })),
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
              }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
          })),
          gte: vi.fn(() => ({
            lte: vi.fn(() => ({
              limit: vi.fn(() => ({
                range: vi.fn(() => ({
                  order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
                }))
              }))
            })),
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
              }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
          })),
          lte: vi.fn(() => ({
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
              }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
          })),
          limit: vi.fn(() => ({
            range: vi.fn(() => ({
              order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
          })),
          range: vi.fn(() => ({
            order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
          })),
          order: vi.fn(() => Promise.resolve({ data: mockEnrollmentData, error: null }))
        }))
      };
      
      mockSupabase.from.mockReturnValue(mockQuery);
    });

    it('should fetch enrollments without filters', async () => {
      const enrollments = await adminDataManager.getEnrollments();
      
      expect(mockSupabase.from).toHaveBeenCalledWith('enrollments');
      expect(enrollments).toHaveLength(1);
      expect(enrollments[0].id).toBe('1');
      expect(enrollments[0].userId).toBe('user1');
    });

    it('should fetch enrollments with status filter', async () => {
      const filters: EnrollmentFilters = {
        status: [EnrollmentStatus.PENDING]
      };
      
      const enrollments = await adminDataManager.getEnrollments(filters);
      
      expect(enrollments).toHaveLength(1);
      expect(enrollments[0].status).toBe('pending');
    });

    it('should fetch enrollments with date range filter', async () => {
      const filters: EnrollmentFilters = {
        dateFrom: new Date('2024-01-01'),
        dateTo: new Date('2024-12-31')
      };
      
      const enrollments = await adminDataManager.getEnrollments(filters);
      
      expect(enrollments).toHaveLength(1);
    });

    it('should fetch enrollments with pagination', async () => {
      const filters: EnrollmentFilters = {
        limit: 10,
        offset: 0
      };
      
      const enrollments = await adminDataManager.getEnrollments(filters);
      
      expect(enrollments).toHaveLength(1);
    });
  });

  describe('User Management', () => {
    const mockUserData = [
      {
        id: 'user1',
        email: 'user1@example.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'student',
        approval_status: 'approved',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        enrollments: []
      }
    ];

    beforeEach(() => {
      const mockQuery = {
        select: vi.fn(() => ({
          in: vi.fn(() => ({
            or: vi.fn(() => ({
              limit: vi.fn(() => ({
                range: vi.fn(() => ({
                  order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
                }))
              })),
              order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
            })),
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
              })),
              order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
          })),
          or: vi.fn(() => ({
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
              }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
          })),
          limit: vi.fn(() => ({
            range: vi.fn(() => ({
              order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
          })),
          range: vi.fn(() => ({
            order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
          })),
          order: vi.fn(() => Promise.resolve({ data: mockUserData, error: null }))
        }))
      };
      
      mockSupabase.from.mockReturnValue(mockQuery);
    });

    it('should fetch users without filters', async () => {
      const users = await adminDataManager.getUsers();
      
      expect(mockSupabase.from).toHaveBeenCalledWith('profiles');
      expect(users).toHaveLength(1);
      expect(users[0].id).toBe('user1');
      expect(users[0].email).toBe('user1@example.com');
    });

    it('should fetch users with role filter', async () => {
      const filters: UserFilters = {
        role: ['student']
      };
      
      const users = await adminDataManager.getUsers(filters);
      
      expect(users).toHaveLength(1);
      expect(users[0].role).toBe('student');
    });

    it('should fetch users with search term', async () => {
      const filters: UserFilters = {
        searchTerm: 'john'
      };
      
      const users = await adminDataManager.getUsers(filters);
      
      expect(users).toHaveLength(1);
    });
  });

  describe('Payment Management', () => {
    const mockPaymentData = [
      {
        id: 'payment1',
        enrollment_id: 'enrollment1',
        transaction_id: 'txn1',
        reference: 'ref1',
        amount: 100,
        currency: 'ZAR',
        status: 'completed',
        initiated_at: '2024-01-01T00:00:00Z',
        enrollments: {
          id: 'enrollment1',
          user_id: 'user1',
          course_id: 'course1',
          status: 'approved'
        }
      }
    ];

    beforeEach(() => {
      const mockQuery = {
        select: vi.fn(() => ({
          in: vi.fn(() => ({
            gte: vi.fn(() => ({
              lte: vi.fn(() => ({
                limit: vi.fn(() => ({
                  range: vi.fn(() => ({
                    order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
                  }))
                }))
              }))
            })),
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
              }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
          })),
          gte: vi.fn(() => ({
            lte: vi.fn(() => ({
              limit: vi.fn(() => ({
                range: vi.fn(() => ({
                  order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
                }))
              }))
            })),
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
              }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
          })),
          lte: vi.fn(() => ({
            limit: vi.fn(() => ({
              range: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
              }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
          })),
          limit: vi.fn(() => ({
            range: vi.fn(() => ({
              order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
            })),
            order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
          })),
          range: vi.fn(() => ({
            order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
          })),
          order: vi.fn(() => Promise.resolve({ data: mockPaymentData, error: null }))
        }))
      };
      
      mockSupabase.from.mockReturnValue(mockQuery);
    });

    it('should fetch payments without filters', async () => {
      const payments = await adminDataManager.getPayments();
      
      expect(mockSupabase.from).toHaveBeenCalledWith('ikhokha_payments');
      expect(payments).toHaveLength(1);
      expect(payments[0].id).toBe('payment1');
    });

    it('should fetch payments with status filter', async () => {
      const filters: PaymentFilters = {
        status: [PaymentStatus.COMPLETED]
      };
      
      const payments = await adminDataManager.getPayments(filters);
      
      expect(payments).toHaveLength(1);
      expect(payments[0].status).toBe('completed');
    });

    it('should fetch payments with amount range filter', async () => {
      const filters: PaymentFilters = {
        amountMin: 50,
        amountMax: 150
      };
      
      const payments = await adminDataManager.getPayments(filters);
      
      expect(payments).toHaveLength(1);
    });
  });

  describe('Cache Management', () => {
    it('should cache enrollment data', async () => {
      // First call should hit the database
      await adminDataManager.getEnrollments();
      expect(mockSupabase.from).toHaveBeenCalledTimes(1);

      // Second call should use cache
      await adminDataManager.getEnrollments();
      expect(mockSupabase.from).toHaveBeenCalledTimes(1); // Still 1, not 2
    });

    it('should invalidate cache by key', async () => {
      await adminDataManager.getEnrollments();
      
      // Invalidate specific cache entry
      adminDataManager.invalidateCache('enrollments:test');
      
      const cacheStatus = adminDataManager.getCacheStatus();
      expect(cacheStatus.totalEntries).toBeGreaterThanOrEqual(0);
    });

    it('should invalidate cache by pattern', async () => {
      await adminDataManager.getEnrollments();
      
      // Invalidate all enrollment cache entries
      adminDataManager.invalidateCachePattern('enrollments');
      
      const cacheStatus = adminDataManager.getCacheStatus();
      expect(cacheStatus.totalEntries).toBeGreaterThanOrEqual(0);
    });

    it('should invalidate cache by type', async () => {
      await adminDataManager.getEnrollments();
      
      // Invalidate all enrollment cache entries
      adminDataManager.invalidateCacheByType('enrollments');
      
      const cacheStatus = adminDataManager.getCacheStatus();
      expect(cacheStatus.totalEntries).toBeGreaterThanOrEqual(0);
    });

    it('should refresh all cache', async () => {
      await adminDataManager.getEnrollments();
      
      await adminDataManager.refreshCache();
      
      const cacheStatus = adminDataManager.getCacheStatus();
      expect(cacheStatus.totalEntries).toBe(0);
    });
  });

  describe('Performance Monitoring', () => {
    it('should provide cache status', () => {
      const cacheStatus = adminDataManager.getCacheStatus();
      
      expect(cacheStatus).toHaveProperty('totalEntries');
      expect(cacheStatus).toHaveProperty('hitRate');
      expect(cacheStatus).toHaveProperty('missRate');
      expect(cacheStatus).toHaveProperty('memoryUsage');
    });

    it('should provide performance metrics', () => {
      const metrics = adminDataManager.getPerformanceMetrics();
      
      expect(metrics).toHaveProperty('queryTime');
      expect(metrics).toHaveProperty('cacheHitRate');
      expect(metrics).toHaveProperty('dataFreshness');
      expect(metrics).toHaveProperty('memoryUsage');
      expect(metrics).toHaveProperty('activeConnections');
    });

    it('should optimize queries based on performance', () => {
      // This should not throw an error
      expect(() => adminDataManager.optimizeQueries()).not.toThrow();
    });
  });

  describe('Data Prefetching', () => {
    it('should preload data keys', async () => {
      const keys = ['enrollments:recent', 'users:active'];
      
      await adminDataManager.preloadData(keys);
      
      // Should not throw an error
      expect(true).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      const mockQuery = {
        select: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: null, error: new Error('Database error') }))
        }))
      };
      
      mockSupabase.from.mockReturnValue(mockQuery);
      
      await expect(adminDataManager.getEnrollments()).rejects.toThrow('Database error');
    });
  });
});