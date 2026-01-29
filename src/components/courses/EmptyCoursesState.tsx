
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface EmptyCoursesStateProps {
  onClearFilters: () => void;
}

const EmptyCoursesState = ({ onClearFilters }: EmptyCoursesStateProps) => {
  return (
    <div className="text-center py-20 animate-fade-in">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpen className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-600 mb-3">No courses found</h3>
      <p className="text-gray-500 mb-6">Try adjusting your search filters to discover more courses.</p>
      <Button 
        onClick={onClearFilters}
        className="bg-gradient-primary hover:opacity-90 text-white"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default EmptyCoursesState;
