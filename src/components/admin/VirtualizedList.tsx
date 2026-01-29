import React, { memo, useState, useEffect, useRef } from 'react';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  contact_number?: string;
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

interface VirtualizedListProps {
  items: Enrollment[];
  users: User[];
  onApprove: (enrollmentId: string) => void;
  onReject: (enrollmentId: string) => void;
  actionLoading: string | null;
}

interface EnrollmentRowProps {
  enrollment: Enrollment;
  users: User[];
  onApprove: (enrollmentId: string) => void;
  onReject: (enrollmentId: string) => void;
  actionLoading: string | null;
}

const EnrollmentRow = memo<EnrollmentRowProps>(({ enrollment, users, onApprove, onReject, actionLoading }) => {

  // Find user data
  const user = users.find(u => u.id === enrollment.user_id || u.email === enrollment.user_email);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isLoading = actionLoading === enrollment.id;

  return (
    <div className="px-6 py-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-4">
            {/* User Avatar */}
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-blue-600">
                {user?.first_name?.[0] || enrollment.user_email?.[0] || '?'}
                {user?.last_name?.[0] || ''}
              </span>
            </div>
            
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user ? `${user.first_name} ${user.last_name}` : enrollment.user_email}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {user?.email || enrollment.user_email}
              </p>
              <div className="flex items-center space-x-4 mt-1">
                <p className="text-xs text-gray-500">
                  Course: {enrollment.course_title || enrollment.course_id}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(enrollment.enrolled_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(enrollment.status)}`}>
            {enrollment.status}
          </span>
          
          {enrollment.status === 'pending' && (
            <div className="flex space-x-2">
              <button
                onClick={() => onApprove(enrollment.id)}
                disabled={isLoading}
                className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-1 ${
                  isLoading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isLoading ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                Approve
              </button>
              
              <button
                onClick={() => onReject(enrollment.id)}
                disabled={isLoading}
                className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-1 ${
                  isLoading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isLoading ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

EnrollmentRow.displayName = 'EnrollmentRow';

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  users,
  onApprove,
  onReject,
  actionLoading
}) => {
  const [visibleItems, setVisibleItems] = useState<Enrollment[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const ITEM_HEIGHT = 100;
  const CONTAINER_HEIGHT = 400;
  const VISIBLE_COUNT = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);
  const BUFFER_SIZE = 5;

  useEffect(() => {
    const start = Math.max(0, startIndex - BUFFER_SIZE);
    const end = Math.min(items.length, startIndex + VISIBLE_COUNT + BUFFER_SIZE);
    setVisibleItems(items.slice(start, end));
  }, [items, startIndex]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const newStartIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    setStartIndex(newStartIndex);
  };

  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-lg font-medium">No enrollments found</p>
        <p className="text-sm">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="overflow-auto"
      style={{ height: CONTAINER_HEIGHT }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * ITEM_HEIGHT, position: 'relative' }}>
        <div 
          style={{ 
            transform: `translateY(${Math.max(0, startIndex - BUFFER_SIZE) * ITEM_HEIGHT}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((enrollment) => (
            <EnrollmentRow
              key={enrollment.id}
              enrollment={enrollment}
              users={users}
              onApprove={onApprove}
              onReject={onReject}
              actionLoading={actionLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};