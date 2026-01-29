import React from 'react';
import { Button } from '@/components/ui/button';
import { Target, X } from 'lucide-react';

interface SidebarHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  courseName?: string;
}

const SidebarHeader = ({ setSidebarOpen, courseName }: SidebarHeaderProps) => {
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Target className="h-5 w-5 text-red-600" />
          Course Content
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      {courseName && (
        <div className="mb-2 text-base font-bold text-blue-700 dark:text-blue-300 truncate animate-fade-in" title={courseName}>
          {courseName}
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
