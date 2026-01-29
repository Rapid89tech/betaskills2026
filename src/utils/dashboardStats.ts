import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp,
  Clock
} from 'lucide-react';
import { Profile } from '@/types/auth';
import { Course } from '@/hooks/useCourses';
import { Enrollment } from '@/types/enrollment';

export const getStatsForRole = (
  profile: Profile | null,
  courses: Course[],
  enrollments: Enrollment[],
  userId?: string
) => {
  if (profile?.role === 'admin') {
    return [
      {
        title: "Total Courses",
        value: courses.length,
        icon: BookOpen,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        description: "Courses in system"
      },
      {
        title: "Total Enrollments", 
        value: enrollments.length,
        icon: Users,
        color: "text-green-600",
        bgColor: "bg-green-50",
        description: "Active enrollments"
      },
      {
        title: "Completed Courses",
        value: enrollments.filter(e => e.completed_at).length,
        icon: Award,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        description: "Finished courses"
      },
      {
        title: "System Health",
        value: "98%",
        icon: TrendingUp,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        description: "Uptime"
      }
    ];
  } else if (profile?.role === 'instructor') {
    const myCourses = courses.filter(c => c.instructor.id === userId || c.id === 'computer-repairs');
    return [
      {
        title: "My Courses",
        value: myCourses.length,
        icon: BookOpen,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        description: "Courses created"
      },
      {
        title: "Total Students",
        value: enrollments.length,
        icon: Users,
        color: "text-green-600", 
        bgColor: "bg-green-50",
        description: "Enrolled students"
      },
      {
        title: "Completions",
        value: enrollments.filter(e => e.completed_at).length,
        icon: Award,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50", 
        description: "Course completions"
      },
      {
        title: "Average Rating",
        value: "4.8",
        icon: TrendingUp,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        description: "Student feedback"
      }
    ];
  } else {
    // Student stats
    // Calculate hours learned
    let totalHours = 0;
    enrollments.forEach(e => {
      const course = courses.find(c => c.id === e.course_id);
      if (course && course.duration) {
        // Try to extract hours from duration string (e.g., '12.5 hours', '6 weeks', '45 min')
        const match = course.duration.match(/([\d.]+)\s*(hour|hr|h)/i);
        if (match) {
          const hours = parseFloat(match[1]);
          totalHours += hours * (e.progress / 100);
        } else {
          // Try minutes
          const minMatch = course.duration.match(/([\d.]+)\s*(min|minute)/i);
          if (minMatch) {
            const mins = parseFloat(minMatch[1]);
            totalHours += (mins / 60) * (e.progress / 100);
          }
        }
      }
    });
    totalHours = Math.round(totalHours * 10) / 10;

    // Calculate learning streak (consecutive days with progress > 0)
    let streak = 0;
    const daysWithProgress = new Set();
    enrollments.forEach(e => {
      if (e.completed_at) {
        const date = new Date(e.completed_at).toDateString();
        daysWithProgress.add(date);
      } else if (e.enrolled_at && e.progress > 0) {
        const date = new Date(e.enrolled_at).toDateString();
        daysWithProgress.add(date);
      }
    });
    // Count consecutive days up to today
    let current = new Date();
    while (daysWithProgress.has(current.toDateString())) {
      streak++;
      current.setDate(current.getDate() - 1);
    }

    return [
      {
        title: "Courses Enrolled",
        value: enrollments.length,
        icon: BookOpen,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        description: "Active enrollments"
      },
      {
        title: "Hours Learned",
        value: totalHours,
        icon: Clock,
        color: "text-green-600", 
        bgColor: "bg-green-50",
        description: "Total learning time"
      },
      {
        title: "Certificates",
        value: enrollments.filter(e => e.completed_at).length,
        icon: Award,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50", 
        description: "Completed courses"
      },
      {
        title: "Learning Streak",
        value: streak,
        icon: TrendingUp,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        description: "Days in a row"
      }
    ];
  }
};
