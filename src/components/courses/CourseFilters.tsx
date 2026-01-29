
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface CourseFiltersProps {
  onFiltersChange: (filters: {
    search: string;
    category: string;
    level: string;
    priceRange: string;
  }) => void;
  hideLevel?: boolean;
  hidePrice?: boolean;
}

const CourseFilters = ({ onFiltersChange, hideLevel, hidePrice }: CourseFiltersProps) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    level: '',
    priceRange: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const actualValue = value === 'all-categories' || value === 'all-levels' || value === 'all-prices' ? '' : value;
    const newFilters = { ...filters, [key]: actualValue };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const categories = [
    'Information Communication and Technology',
    'Technology',
    'Religion',
    'Beauty and Health',
    'Mechanical Repairs',
    'Construction',
    'Business',
  ];

  return (
    <div className="p-6 rounded-2xl shadow-xl border-0 space-y-6 animate-fade-in delay-200 bg-gradient-to-br from-red-600/80 via-red-400/70 to-pink-400/80 backdrop-blur-2xl">
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/80" />
          <Input
            placeholder="Search courses..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10 w-full rounded-xl bg-white/20 text-white placeholder-white/70 border-0 shadow-inner focus:ring-2 focus:ring-white/40 focus:bg-white/30 transition-all"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 w-full justify-center rounded-xl bg-white/20 text-white border-0 shadow-inner hover:bg-white/30 transition-all">
          <Filter className="h-4 w-4 text-white/80" />
          Filters
        </Button>
        <Select value={filters.category || 'all-categories'} onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger className="w-full rounded-xl bg-white/20 text-white border-0 shadow-inner focus:ring-2 focus:ring-white/40 focus:bg-white/30 transition-all text-base font-semibold">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white/90 text-gray-900 shadow-xl">
            <SelectItem value="all-categories" className="text-base font-semibold">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category} className="text-base font-semibold text-gray-900">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Level and Price filters omitted if hidden */}
        {!hideLevel && (
          <Select value={filters.level || 'all-levels'} onValueChange={(value) => handleFilterChange('level', value)}>
            <SelectTrigger className="w-full rounded-xl bg-white/20 text-white border-0 shadow-inner focus:ring-2 focus:ring-white/40 focus:bg-white/30 transition-all">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white/90 text-gray-900 shadow-xl">
              <SelectItem value="all-levels">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        )}
        {!hidePrice && (
          <Select value={filters.priceRange || 'all-prices'} onValueChange={(value) => handleFilterChange('priceRange', value)}>
            <SelectTrigger className="w-full rounded-xl bg-white/20 text-white border-0 shadow-inner focus:ring-2 focus:ring-white/40 focus:bg-white/30 transition-all">
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white/90 text-gray-900 shadow-xl">
              <SelectItem value="all-prices">All Prices</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="0-500">R0 - R500</SelectItem>
              <SelectItem value="500-1000">R500 - R1000</SelectItem>
              <SelectItem value="1000+">R1000+</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default CourseFilters;
