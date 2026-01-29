import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface UnavailableCourseMessageProps {
  availableDate?: string;
}

const UnavailableCourseMessage = ({ availableDate }: UnavailableCourseMessageProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-orange-800">
              Course Coming Soon!
            </h3>
            <p className="text-orange-700 text-lg">
              This course will be available starting{' '}
              <span className="font-semibold">
                {availableDate ? formatDate(availableDate) : 'August 1, 2025'}
              </span>
            </p>
          </div>

          <div className="bg-white/60 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-center space-x-2 text-orange-700">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">
                Mark your calendar and check back soon!
              </span>
            </div>
          </div>

          <p className="text-orange-600 text-sm max-w-md">
            You can view the course details below to learn about what will be covered 
            when enrollment opens.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnavailableCourseMessage;