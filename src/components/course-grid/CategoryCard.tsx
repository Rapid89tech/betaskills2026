import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  category: {
    id: number;
    title: string;
    icon: LucideIcon;
    description: string;
    courses: number;
    color: string;
    bgColor: string;
    courseId: string;
  };
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const IconComponent = category.icon;
  
  return (
    <Link to={`/course/${category.courseId}`}>
      <Card 
        className={`${category.bgColor} border-0 hover-lift cursor-pointer animate-fade-in group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 rounded-xl`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <CardContent className="p-6">
          <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-pink-500 group-hover:to-red-700 group-hover:bg-clip-text group-hover:text-transparent transition-colors">{category.title}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed text-sm">{category.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 bg-white/80 px-3 py-1 rounded-full">{category.courses} courses</span>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark hover:bg-primary/10 font-semibold text-sm">
              Explore →
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
