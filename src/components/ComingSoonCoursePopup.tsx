import React from 'react';
import { X, Clock, BookOpen, User, Star } from 'lucide-react';
import { SimplifiedCourse } from '../types/course';

interface ComingSoonCoursePopupProps {
  course: SimplifiedCourse;
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonCoursePopup({ course, isOpen, onClose }: ComingSoonCoursePopupProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
                     {/* Header */}
           <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 sm:p-6 rounded-t-lg sticky top-0 z-10">
             <button
               onClick={onClose}
               className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
             >
               <X size={20} className="sm:w-6 sm:h-6" />
             </button>
            
            <div className="pr-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Coming Soon
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>35 lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>{course.instructor?.first_name} {course.instructor?.last_name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Course Overview</h3>
              <p className="text-gray-600 leading-relaxed">{course.overview}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Course Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Duration</div>
                  <div className="font-semibold text-gray-800">{course.duration}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Level</div>
                  <div className="font-semibold text-gray-800">{course.level}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Category</div>
                  <div className="font-semibold text-gray-800">{course.category}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Price</div>
                  <div className="font-semibold text-gray-800">R{course.price}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Course Available Soon</h3>
                  <div className="mt-1 text-sm text-blue-700">
                    This course is currently in development. Join our notification list to be informed when enrollment opens.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Want to be notified when this course is available?
              </div>
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
