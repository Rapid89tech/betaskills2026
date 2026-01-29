import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, User } from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';

export default function ComingSoonCourse() {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses } = useCourses();
  
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <Link to="/courses" className="text-red-600 hover:text-red-700">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/courses" 
            className="inline-flex items-center text-red-600 hover:text-red-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Course Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                  Coming Soon
                </span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              
                             <div className="flex items-center gap-6 text-lg">
                 <div className="flex items-center gap-2">
                   <Clock className="w-5 h-5" />
                   <span>{course.duration}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <BookOpen className="w-5 h-5" />
                   <span>35 lessons</span>
                 </div>
               </div>
            </div>

            {/* Course Content */}
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Course Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {course.overview || course.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Course Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-sm text-gray-500 mb-2">Duration</div>
                    <div className="font-semibold text-gray-800 text-lg">{course.duration}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-sm text-gray-500 mb-2">Category</div>
                    <div className="font-semibold text-gray-800 text-lg">{course.category}</div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-sm text-gray-500 mb-2">Price</div>
                    <div className="font-semibold text-gray-800 text-lg">R{course.price}</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-800">Course Available Soon</h3>
                    <div className="mt-2 text-blue-700">
                      This course is currently in development. Join our notification list to be informed when enrollment opens.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
