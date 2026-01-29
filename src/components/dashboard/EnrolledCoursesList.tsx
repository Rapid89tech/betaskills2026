import React from 'react';
import { Progress } from '@/components/ui/progress';
import { BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStableProgress } from '@/hooks/useStableProgress';

interface EnrolledCoursesListProps {
  enrollments: any[];
  courses: any[];
}

const EnrolledCourseItem = ({ enrollment, course }: { enrollment: any; course: any }) => {
  const { progress } = useStableProgress(course?.id || enrollment.course_id);
  
  // Use stable progress if available, otherwise fallback to enrollment progress
  const displayProgress = progress > 0 ? progress : Math.round((enrollment.progress || 0) * 100);
  const isCompleted = displayProgress >= 100;
  
  return (
    <Link 
      to={`/course/${course?.id || enrollment.course_id}`}
      className="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-1">
            {course?.title || enrollment.course_title || 'Untitled Course'}
          </h4>
          <p className="text-sm text-gray-500 line-clamp-2">
            {course?.description || 'Continue your learning journey'}
          </p>
        </div>
        <div className="ml-3">
          {isCompleted ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <BookOpen className="w-6 h-6 text-blue-500" />
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{displayProgress}%</span>
        </div>
        <Progress value={displayProgress} className="h-2" />
        {isCompleted && (
          <div className="text-sm text-green-600 font-medium">
            🎉 Course Completed! 
          </div>
        )}
      </div>
    </Link>
  );
};

const EnrolledCoursesList = ({ enrollments, courses }: EnrolledCoursesListProps) => {
  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No enrollments yet</h3>
        <p className="text-gray-500 mb-4">Enroll in a course to get started!</p>
        <Link 
          to="/courses"
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  // Sort enrollments by progress (highest first)
  const sortedEnrollments = [...enrollments].sort((a, b) => {
    const progressA = Math.round((a.progress || 0) * 100);
    const progressB = Math.round((b.progress || 0) * 100);
    
    return progressB - progressA; // Sort by highest progress first
  });

  return (
    <div className="space-y-4">
      {sortedEnrollments.map((enrollment) => {
        const course = courses.find((c) => c.id === enrollment.course_id);
        return (
          <EnrolledCourseItem
            key={enrollment.course_id}
            enrollment={enrollment}
            course={course}
          />
        );
      })}
    </div>
  );
};

export default EnrolledCoursesList;
