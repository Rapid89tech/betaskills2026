import React from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { Navigate } from 'react-router-dom';
import SimpleAdminDashboard from '@/components/admin/SimpleAdminDashboard';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // Hardcoded admin access
  const adminEmails = ['ericmnisi007@gmail.com', 'john.doe@gmail.com', 'maxmon@gmail.com', 'maxmon2@gmail.com'];
  const isHardcodedAdmin = user?.email && adminEmails.some(email => user.email?.toLowerCase() === email.toLowerCase());

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isHardcodedAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-8 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-4">You do not have permission to access the admin dashboard.</p>
          <button onClick={() => window.location.href = '/'} className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return <SimpleAdminDashboard />;
};

export default AdminDashboard;
