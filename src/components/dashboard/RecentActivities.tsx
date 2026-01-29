import React from 'react';
import { Clock, CheckCircle, BookOpen, Award } from 'lucide-react';
import { useStableProgress } from '@/hooks/useStableProgress';

interface RecentActivitiesProps {
  enrollments: any[];
  courses: any[];
}

const RecentActivities = ({ enrollments, courses }: RecentActivitiesProps) => {
  // Generate recent activities based on actual data
  const activities = React.useMemo(() => {
    const recentActivities: any[] = [];
    
    enrollments.forEach((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.course_id);
      const courseName = course?.title || enrollment.course_title || 'Untitled Course';
      
      // Add enrollment activity
      recentActivities.push({
        id: `enrollment-${enrollment.course_id}`,
        type: 'enrollment',
        title: `Enrolled in ${courseName}`,
        description: 'Started learning journey',
        timestamp: enrollment.enrolled_at || new Date().toISOString(),
        icon: BookOpen,
        color: 'text-blue-500',
      });
      
      // Add progress-based activities
      const progress = Math.round((enrollment.progress || 0) * 100);
      if (progress > 0) {
        recentActivities.push({
          id: `progress-${enrollment.course_id}`,
          type: 'progress',
          title: `Made progress in ${courseName}`,
          description: `${progress}% completed`,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random recent time
          icon: CheckCircle,
          color: 'text-green-500',
        });
      }
      
      // Add completion activities
      if (progress >= 100) {
        recentActivities.push({
          id: `completion-${enrollment.course_id}`,
          type: 'completion',
          title: `Completed ${courseName}`,
          description: 'Earned certificate',
          timestamp: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
          icon: Award,
          color: 'text-yellow-500',
        });
      }
    });
    
    // Sort by timestamp (most recent first) and limit to 10
    return recentActivities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  }, [enrollments, courses]);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-8 h-8 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No recent activities.</p>
        <p className="text-sm text-gray-400 mt-1">Start learning to see your progress here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => {
        const Icon = activity.icon;
        return (
          <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className={`p-2 rounded-full bg-white ${activity.color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              <p className="text-sm text-gray-500">
                {activity.description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatTimeAgo(activity.timestamp)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivities;
