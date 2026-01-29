import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowUpDown,
  Calendar,
  User,
  BookOpen,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

export interface VirtualEnrollmentItem {
  id: string;
  user_id: string;
  user_email: string;
  user_name?: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  progress: number;
  payment_reference?: string;
  proof_of_payment?: string;
}

export interface VirtualEnrollmentListProps {
  enrollments: VirtualEnrollmentItem[];
  onEnrollmentClick?: (enrollment: VirtualEnrollmentItem) => void;
  onStatusChange?: (enrollmentId: string, status: string) => void;
  height?: number;
  itemHeight?: number;
  overscan?: number;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  loading?: boolean;
}

interface ViewportInfo {
  startIndex: number;
  endIndex: number;
  visibleItems: VirtualEnrollmentItem[];
}

export const VirtualEnrollmentList: React.FC<VirtualEnrollmentListProps> = ({
  enrollments,
  onEnrollmentClick,
  onStatusChange,
  height = 600,
  itemHeight = 80,
  overscan = 5,
  searchable = true,
  filterable = true,
  sortable = true,
  loading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof VirtualEnrollmentItem>('enrolled_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(height);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  // Filter and sort enrollments
  const filteredAndSortedEnrollments = useMemo(() => {
    let filtered = enrollments.filter(enrollment => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          enrollment.user_email.toLowerCase().includes(searchLower) ||
          enrollment.user_name?.toLowerCase().includes(searchLower) ||
          enrollment.course_title.toLowerCase().includes(searchLower) ||
          enrollment.payment_reference?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && enrollment.status !== statusFilter) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [enrollments, searchTerm, statusFilter, sortField, sortDirection]);

  // Calculate viewport information
  const viewportInfo = useMemo((): ViewportInfo => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
      visibleStart + Math.ceil(containerHeight / itemHeight),
      filteredAndSortedEnrollments.length
    );

    const startIndex = Math.max(0, visibleStart - overscan);
    const endIndex = Math.min(
      filteredAndSortedEnrollments.length,
      visibleEnd + overscan
    );

    return {
      startIndex,
      endIndex,
      visibleItems: filteredAndSortedEnrollments.slice(startIndex, endIndex)
    };
  }, [filteredAndSortedEnrollments, scrollTop, containerHeight, itemHeight, overscan]);

  // Handle scroll events
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle sort
  const handleSort = useCallback((field: keyof VirtualEnrollmentItem) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate total height for scroll area
  const totalHeight = filteredAndSortedEnrollments.length * itemHeight;

  // Calculate offset for visible items
  const offsetY = viewportInfo.startIndex * itemHeight;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Loading Enrollments...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Enrollments ({filteredAndSortedEnrollments.length})
        </CardTitle>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search enrollments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          
          {filterable && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Column Headers */}
        {sortable && (
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg mb-4 text-sm font-medium text-gray-600">
            <div className="col-span-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('user_email')}
                className="flex items-center gap-1 h-auto p-0"
              >
                <User className="w-4 h-4" />
                User
                {sortField === 'user_email' && (
                  <ArrowUpDown className="w-3 h-3" />
                )}
              </Button>
            </div>
            <div className="col-span-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('course_title')}
                className="flex items-center gap-1 h-auto p-0"
              >
                <BookOpen className="w-4 h-4" />
                Course
                {sortField === 'course_title' && (
                  <ArrowUpDown className="w-3 h-3" />
                )}
              </Button>
            </div>
            <div className="col-span-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('status')}
                className="flex items-center gap-1 h-auto p-0"
              >
                Status
                {sortField === 'status' && (
                  <ArrowUpDown className="w-3 h-3" />
                )}
              </Button>
            </div>
            <div className="col-span-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('enrolled_at')}
                className="flex items-center gap-1 h-auto p-0"
              >
                <Calendar className="w-4 h-4" />
                Date
                {sortField === 'enrolled_at' && (
                  <ArrowUpDown className="w-3 h-3" />
                )}
              </Button>
            </div>
            <div className="col-span-2">Progress</div>
          </div>
        )}

        {/* Virtual List Container */}
        <div
          ref={containerRef}
          className="relative overflow-auto"
          style={{ height: `${height}px` }}
          onScroll={handleScroll}
        >
          {/* Scrollable Area */}
          <div
            ref={scrollElementRef}
            style={{ height: `${totalHeight}px`, position: 'relative' }}
          >
            {/* Visible Items */}
            <div
              style={{
                transform: `translateY(${offsetY}px)`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0
              }}
            >
              {viewportInfo.visibleItems.map((enrollment, index) => (
                <div
                  key={enrollment.id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                  style={{ height: `${itemHeight}px` }}
                  onClick={() => onEnrollmentClick?.(enrollment)}
                >
                  <div className="grid grid-cols-12 gap-4 p-4 h-full items-center">
                    {/* User Info */}
                    <div className="col-span-3">
                      <div className="font-medium text-gray-900 truncate">
                        {enrollment.user_name || enrollment.user_email}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {enrollment.user_email}
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="col-span-3">
                      <div className="font-medium text-gray-900 truncate">
                        {enrollment.course_title}
                      </div>
                      {enrollment.payment_reference && (
                        <div className="text-sm text-gray-500 truncate">
                          Ref: {enrollment.payment_reference}
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <Badge className={getStatusColor(enrollment.status)}>
                        {getStatusIcon(enrollment.status)}
                        <span className="ml-1 capitalize">{enrollment.status}</span>
                      </Badge>
                    </div>

                    {/* Date */}
                    <div className="col-span-2">
                      <div className="text-sm text-gray-900">
                        {formatDate(enrollment.enrolled_at)}
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {enrollment.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <div>
            Showing {viewportInfo.visibleItems.length} of {filteredAndSortedEnrollments.length} enrollments
          </div>
          <div>
            {filteredAndSortedEnrollments.length > 0 && (
              <>
                {viewportInfo.startIndex + 1}-{viewportInfo.endIndex} of {filteredAndSortedEnrollments.length}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualEnrollmentList;
