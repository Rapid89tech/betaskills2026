import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface CourseFilterProps {
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
}

interface FilterState {
  keyword: string;
  category: string;
  availability: string;
}

const CourseFilter: React.FC<CourseFilterProps> = ({ onFilterChange, categories }) => {
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    category: '',
    availability: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const availabilityOptions = [
    { value: '', label: 'All Availability' },
    { value: 'available', label: 'Available Now' },
    { value: 'coming-soon', label: 'Coming Soon' },
    { value: 'enrolled', label: 'Enrolled' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { keyword: '', category: '', availability: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.keyword || filters.category || filters.availability;

  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-gradient-to-r from-white/90 via-red-50/80 to-white/90 border-b border-gradient-to-r from-red-200/50 via-pink-200/50 to-red-200/50 shadow-lg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-xl animate-pulse-glow delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-red-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse-glow delay-500" />
      </div>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 relative z-10">
        <style>{`
          .animate-pulse-glow {
            animation: pulseGlow 3s ease-in-out infinite;
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
        `}</style>
        {/* Main Filter Bar */}
        <div className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4">
          {/* Search by Keyword */}
          <div className="relative flex-1 w-full lg:w-auto group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-hover:text-red-500 transition-colors duration-200" />
            <Input
              type="text"
              placeholder="Search courses by keyword..."
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              className="pl-10 pr-4 py-2 sm:py-3 border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl transition-all duration-300 hover:border-red-300 hover:shadow-md bg-white/80 backdrop-blur-sm text-sm sm:text-base"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 via-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative w-full lg:w-auto group">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 pr-10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 hover:border-red-300 hover:shadow-md cursor-pointer min-w-[150px] sm:min-w-[200px] text-sm sm:text-base"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none group-hover:text-red-500 transition-colors duration-200" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Availability Filter */}
          <div className="relative w-full lg:w-auto group">
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 pr-10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 hover:border-red-300 hover:shadow-md cursor-pointer min-w-[150px] sm:min-w-[200px] text-sm sm:text-base"
            >
              {availabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none group-hover:text-red-500 transition-colors duration-200" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Expand/Collapse Button for Mobile */}
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden border-2 border-gray-200 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm"
          >
            <Filter className="h-4 w-4 mr-2" />
            {isExpanded ? 'Hide' : 'More'}
          </Button>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-gray-500 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-gradient-to-r from-red-200/50 via-pink-200/50 to-red-200/50">
            <span className="text-sm text-gray-700 font-semibold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Active filters:</span>
            {filters.keyword && (
              <Badge variant="secondary" className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 hover:from-red-200 hover:to-pink-200 border border-red-200/50 transition-all duration-300 shadow-sm">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-semibold">Keyword: {filters.keyword}</span>
                <button
                  onClick={() => handleFilterChange('keyword', '')}
                  className="ml-2 hover:text-red-600 transition-colors duration-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 border border-blue-200/50 transition-all duration-300 shadow-sm">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">Category: {filters.category}</span>
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className="ml-2 hover:text-blue-600 transition-colors duration-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.availability && (
              <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 hover:from-green-200 hover:to-emerald-200 border border-green-200/50 transition-all duration-300 shadow-sm">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-semibold">Availability: {availabilityOptions.find(opt => opt.value === filters.availability)?.label}</span>
                <button
                  onClick={() => handleFilterChange('availability', '')}
                  className="ml-2 hover:text-green-600 transition-colors duration-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gradient-to-r from-red-200/50 via-pink-200/50 to-red-200/50">
          <span className="text-xs sm:text-sm text-gray-700 font-semibold mr-2 sm:mr-3 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Quick filters:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFilterChange('availability', 'available')}
            className={`text-xs px-2 sm:px-4 py-1 sm:py-2 rounded-full transition-all duration-300 shadow-sm ${
              filters.availability === 'available'
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-300 shadow-md'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-green-50 hover:to-emerald-50 hover:text-green-700 hover:border-green-300'
            }`}
          >
            🟢 Available Now
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFilterChange('category', 'Business')}
            className={`text-xs px-4 py-2 rounded-full transition-all duration-300 shadow-sm ${
              filters.category === 'Business'
                ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-2 border-blue-300 shadow-md'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 hover:border-blue-300'
            }`}
          >
            💼 Business
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFilterChange('category', 'ICT')}
            className={`text-xs px-4 py-2 rounded-full transition-all duration-300 shadow-sm ${
              filters.category === 'ICT'
                ? 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border-2 border-cyan-300 shadow-md'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-700 hover:border-cyan-300'
            }`}
          >
            💻 ICT
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFilterChange('category', 'Electronics')}
            className={`text-xs px-4 py-2 rounded-full transition-all duration-300 shadow-sm ${
              filters.category === 'Electronics'
                ? 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-2 border-orange-300 shadow-md'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-orange-50 hover:to-amber-50 hover:text-orange-700 hover:border-orange-300'
            }`}
          >
            ⚡ Electronics
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFilterChange('category', 'Health and Beauty')}
            className={`text-xs px-4 py-2 rounded-full transition-all duration-300 shadow-sm ${
              filters.category === 'Health and Beauty'
                ? 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-2 border-pink-300 shadow-md'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-pink-50 hover:to-rose-50 hover:text-pink-700 hover:border-pink-300'
            }`}
          >
            💄 Health and Beauty
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter; 