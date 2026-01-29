import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface CourseOverviewProps {
  course: any;
}

const CourseOverview = ({ course }: CourseOverviewProps) => {
  return (
    <div className="space-y-8">
      {/* Quick Navigation */}
      <Card className="glassmorphism-card border-0 shadow-xl rounded-3xl overflow-hidden animate-fade-in-card">
        <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-6 px-8 flex flex-row items-center gap-3 rounded-t-3xl border-b-0">
          <span className="text-lg md:text-xl font-semibold gradient-text drop-shadow-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Quick Navigation
          </span>
        </CardHeader>
        <CardContent className="py-6 px-8 bg-white/80 dark:bg-gray-900/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#course-overview" className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-xl hover:from-blue-200/50 hover:to-purple-200/50 transition-all duration-300 group">
              <div className="w-10 h-10 bg-blue-500/90 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                1
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Course Overview</h4>
                <p className="text-sm text-gray-600">Learn about this course</p>
              </div>
            </a>
            <a href="#learning-objectives" className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-100/50 to-pink-100/50 rounded-xl hover:from-purple-200/50 hover:to-pink-200/50 transition-all duration-300 group">
              <div className="w-10 h-10 bg-purple-500/90 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                2
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Learning Objectives</h4>
                <p className="text-sm text-gray-600">What you'll learn</p>
              </div>
            </a>
            <a href="#course-curriculum" className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-100/50 to-red-100/50 rounded-xl hover:from-pink-200/50 hover:to-red-200/50 transition-all duration-300 group">
              <div className="w-10 h-10 bg-pink-500/90 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                3
                </div>
              <div>
                <h4 className="font-bold text-gray-900">Course Curriculum</h4>
                <p className="text-sm text-gray-600">Course structure</p>
            </div>
            </a>
            </div>
        </CardContent>
      </Card>

      {/* Course Overview */}
      <Card id="course-overview" className="glassmorphism-card border-0 shadow-xl rounded-3xl overflow-hidden animate-fade-in-card">
        <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-6 px-8 flex flex-row items-center gap-3 rounded-t-3xl border-b-0">
          <span className="text-lg md:text-xl font-semibold gradient-text drop-shadow-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-600" />
            Course Overview
                  </span>
          </CardHeader>
        <CardContent className="py-6 px-8 bg-white/80 dark:bg-gray-900/80">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-base">
              {course.description || "This course provides comprehensive training in the subject matter, designed to equip learners with practical skills and theoretical knowledge needed for success in the field."}
            </p>
                    </div>
          </CardContent>
        </Card>

      <style>{`
        .glassmorphism-card {
          background: rgba(255,255,255,0.7);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
          backdrop-filter: blur(12px);
          border-radius: 2rem;
        }
        .gradient-text {
          background: linear-gradient(90deg, #2563eb 0%, #a21caf 50%, #db2777 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in-card {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          animation: fadeInCard 0.7s cubic-bezier(.4,2,.3,1) forwards;
        }
        @keyframes fadeInCard {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CourseOverview;
