import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle } from 'lucide-react';

interface LessonHeaderProps {
  duration: string;
  isCompleted: boolean;
}

const LessonHeader = ({ duration, isCompleted }: LessonHeaderProps) => {
  return (
    <div className="flex items-center justify-between animate-slide-in-right">
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="flex items-center gap-1 hover-scale">
          <Clock className="h-3 w-3" />
          {duration}
        </Badge>
        {isCompleted && (
          <Badge variant="default" className="bg-green-600 flex items-center gap-1 animate-scale-in">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        )}
      </div>
    </div>
  );
};

export default LessonHeader;