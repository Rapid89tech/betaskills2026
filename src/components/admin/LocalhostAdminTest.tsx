// Simple test component for localhost admin dashboard
import React from 'react';

const LocalhostAdminTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Localhost Admin Test</h1>
        <p className="text-gray-600 mb-4">This is a simple test to verify localhost routing works</p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ✅ Localhost admin dashboard is working!
        </div>
      </div>
    </div>
  );
};

export default LocalhostAdminTest;
