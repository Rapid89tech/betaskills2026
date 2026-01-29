import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { BookOpen, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedCourseCardProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    rating: number;
    students: number;
    duration: string;
    price: string;
    image: string;
    level: string;
    description: string;
    courseId: string;
  };
  index: number;
}

const FeaturedCourseCard = ({ course, index }: FeaturedCourseCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover-lift cursor-pointer bg-white animate-scale-in group shadow-xl hover:shadow-2xl transition-all duration-500 rounded-xl border-0"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <BookOpen className="h-16 w-16 text-white/90 relative z-10 group-hover:scale-110 transition-transform" />
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white font-semibold text-sm">{course.level}</span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full">
            Popular
          </span>
          <span className="text-xl font-bold text-blue-600">Course</span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-pink-500 group-hover:to-red-700 group-hover:bg-clip-text group-hover:text-transparent transition-colors">{course.title}</h3>
        <p className="text-gray-600 mb-2 text-sm">{course.description}</p>
        <p className="text-gray-500 mb-4 font-medium text-sm">by {course.instructor}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
            <span className="font-semibold">{course.rating}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>
        
        <Link to={`/course/${course.courseId}`}>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            View Course
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default FeaturedCourseCard;
