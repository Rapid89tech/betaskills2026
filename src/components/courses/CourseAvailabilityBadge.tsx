import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Check } from 'lucide-react';

interface CourseAvailabilityBadgeProps {
  available: boolean;
  availableDate?: string;
}

const CourseAvailabilityBadge = ({ available, availableDate }: CourseAvailabilityBadgeProps) => {
  if (available) {
    return (
      <Badge className="bg-green-600/90 text-white border-0 font-medium">
        <Check className="w-3 h-3 mr-1" />
        Available Now
      </Badge>
    );
  }

  return (
    <Badge className="bg-orange-600/90 text-white border-0 font-medium">
      <Calendar className="w-3 h-3 mr-1" />
      Available {availableDate ? new Date(availableDate).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }) : 'Soon'}
    </Badge>
  );
};

export default CourseAvailabilityBadge;