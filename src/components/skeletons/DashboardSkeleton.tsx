
import React from 'react';
import { Loader2, GraduationCap } from 'lucide-react';

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <GraduationCap className="w-12 h-12 text-red-600 mr-4" />
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Loading Student dashboard...
        </h2>
        
        <p className="text-gray-600 mb-4">
          Fetching enrollment data...
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-500">Authentication: Active</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Real-time: Connecting...</span>
          </div>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={() => window.location.reload()}
            className="text-sm text-red-600 hover:text-red-700 underline"
          >
            Click here if loading takes too long
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
