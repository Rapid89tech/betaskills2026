import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { VirtualizedList } from './VirtualizedList';
import { DebouncedSearchInput } from './DebouncedSearchInput';
import { AdminDataCache } from '@/utils/AdminDataCache';
import { PaginationControls } from './PaginationControls';
import { PerformanceComparison } from './PerformanceComparison';
import { useAdminPerformance } from '@/hooks/useAdminPerformance';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  contact_number?: string;
  role: string;
  approval_status: string;
  created_at: string;
}

interface Enrollment {
  id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  user_id: string;
}

interface FilterState {
  search: string;
  status: string;
  dateRange: string;
}

const ITEMS_PER_PAGE = 20;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const OptimizedAdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    dateRange: 'all'
  });
  const { toast } = useToast();
  const { startTiming, endTiming, recordCacheHit, recordCacheMiss } = useAdminPerformance();

  // Initialize cache
  const dataCache = useMemo(() => new AdminDataCache(CACHE_DURATION), []);

  // Debounced search handler
  const handleSearchChange = useCallback((searchTerm: string) => {
    startTiming('search');
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setCurrentPage(1); // Reset to first page when searching
    endTiming('search');
  }, [startTiming, endTiming]);

  // Filter and paginate data
  const filteredData = useMemo(() => {
    let filtered = enrollments;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(enrollment => {
        const user = users.find(u => u.id === enrollment.user_id || u.email === enrollment.user_email);
        return (
          enrollment.user_email?.toLowerCase().includes(searchLower) ||
          enrollment.course_title?.toLowerCase().includes(searchLower) ||
          enrollment.course_id?.toLowerCase().includes(searchLower) ||
          user?.first_name?.toLowerCase().includes(searchLower) ||
          user?.last_name?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(enrollment => enrollment.status === filters.status);
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(enrollment => 
        new Date(enrollment.enrolled_at) >= filterDate
      );
    }

    return filtered;
  }, [enrollments, users, filters]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = filteredData.slice(startIndex, endIndex);
    
    setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
    
    return paginated;
  }, [filteredData, currentPage]);

  // Efficient data fetching with caching
  const fetchData = useCallback(async (forceRefresh = false) => {
    startTiming('load');
    setLoading(true);
    setError(null);

    try {
      // Check cache first
      if (!forceRefresh) {
        const cachedUsers = dataCache.getUsers();
        const cachedEnrollments = dataCache.getEnrollments();
        
        if (cachedUsers && cachedEnrollments) {
          recordCacheHit();
          setUsers(cachedUsers);
          setEnrollments(cachedEnrollments);
          setLoading(false);
          endTiming('load');
          return;
        }
      }

      recordCacheMiss();

      // Fetch with optimized queries
      const [usersResult, enrollmentsResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('id, email, first_name, last_name, contact_number, role, approval_status, created_at')
          .order('created_at', { ascending: false }),
        supabase
          .from('enrollments')
          .select('id, user_id, user_email, course_id, course_title, status, enrolled_at')
          .order('enrolled_at', { ascending: false })
      ]);

      if (usersResult.error) throw usersResult.error;
      if (enrollmentsResult.error) throw enrollmentsResult.error;

      const usersData = usersResult.data || [];
      const enrollmentsData = enrollmentsResult.data || [];

      // Cache the data
      dataCache.setUsers(usersData);
      dataCache.setEnrollments(enrollmentsData);

      setUsers(usersData);
      setEnrollments(enrollmentsData);
      endTiming('load');

    } catch (error: any) {
      console.error('Error fetching admin data:', error);
      setError(error.message || 'Failed to load dashboard data');
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      endTiming('load');
    }
  }, [dataCache, toast, startTiming, endTiming, recordCacheHit, recordCacheMiss]);

  // Optimized enrollment actions with optimistic updates
  const updateEnrollmentStatus = useCallback(async (enrollmentId: string, newStatus: 'approved' | 'rejected') => {
    setActionLoading(enrollmentId);
    
    // Optimistic update
    setEnrollments(prev => 
      prev.map(enrollment => 
        enrollment.id === enrollmentId 
          ? { ...enrollment, status: newStatus }
          : enrollment
      )
    );

    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId);

      if (error) throw error;

      // Update cache
      const updatedEnrollments = enrollments.map(enrollment => 
        enrollment.id === enrollmentId 
          ? { ...enrollment, status: newStatus }
          : enrollment
      );
      dataCache.setEnrollments(updatedEnrollments);

      toast({
        title: "Success",
        description: `Enrollment ${newStatus} successfully`,
      });

    } catch (error: any) {
      // Revert optimistic update on error
      setEnrollments(prev => 
        prev.map(enrollment => 
          enrollment.id === enrollmentId 
            ? { ...enrollment, status: enrollment.status }
            : enrollment
        )
      );
      
      console.error(`Error ${newStatus} enrollment:`, error);
      toast({
        title: "Error",
        description: `Failed to ${newStatus} enrollment. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  }, [enrollments, dataCache, toast]);

  const approveEnrollment = useCallback((enrollmentId: string) => {
    updateEnrollmentStatus(enrollmentId, 'approved');
  }, [updateEnrollmentStatus]);

  const rejectEnrollment = useCallback((enrollmentId: string) => {
    updateEnrollmentStatus(enrollmentId, 'rejected');
  }, [updateEnrollmentStatus]);

  // Handle page changes
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('admin-realtime')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'enrollments' 
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const newEnrollment = payload.new as Enrollment;
          setEnrollments(prev => [newEnrollment, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          const updatedEnrollment = payload.new as Enrollment;
          setEnrollments(prev => 
            prev.map(enrollment => 
              enrollment.id === updatedEnrollment.id ? updatedEnrollment : enrollment
            )
          );
        } else if (payload.eventType === 'DELETE') {
          const deletedEnrollment = payload.old as Enrollment;
          setEnrollments(prev => 
            prev.filter(enrollment => enrollment.id !== deletedEnrollment.id)
          );
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading && !error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading optimized admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <h3 className="font-bold">Error Loading Dashboard</h3>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => fetchData(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Optimized Admin Dashboard</h1>
              <p className="text-gray-600">High-performance enrollment management</p>
            </div>
            <button
              onClick={() => fetchData(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Monitoring */}
        <PerformanceComparison isOptimized={true} />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {enrollments.filter(e => e.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Filtered Results</p>
                <p className="text-2xl font-bold text-gray-900">{filteredData.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <DebouncedSearchInput
                placeholder="Search enrollments..."
                onSearchChange={handleSearchChange}
                debounceMs={300}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({ search: '', status: 'all', dateRange: 'all' });
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Enrollments List with Virtual Scrolling */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Enrollments ({filteredData.length} total)
              </h2>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>
          
          <VirtualizedList
            items={paginatedData}
            users={users}
            onApprove={approveEnrollment}
            onReject={rejectEnrollment}
            actionLoading={actionLoading}
          />

          {/* Pagination */}
          <div className="p-6 border-t">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizedAdminDashboard;