
import React from 'react';
import EnhancedCourseSkeleton from '@/components/skeletons/EnhancedCourseSkeleton';

const CoursesLoadingState = () => {
  return (
    <EnhancedCourseSkeleton
      variant="grid"
      animated={true}
      count={6}
    />
  );
};

export default CoursesLoadingState;
