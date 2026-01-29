import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Play,
  FileText,
  Award,
  Star
} from 'lucide-react';

interface CourseCurriculumProps {
  modules: any[];
  totalLessons: number;
  totalDuration: string;
}

const CourseCurriculum = ({ modules, totalLessons, totalDuration }: CourseCurriculumProps) => {
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'quiz': return <FileText className="h-4 w-4" />;
      case 'assignment': return <Award className="h-4 w-4" />;
      case 'certificate': return <Star className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <Card className="glassmorphism-card border-0 shadow-xl rounded-3xl overflow-hidden animate-fade-in-card">
      <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-6 px-8 flex flex-row items-center gap-3 rounded-t-3xl border-b-0">
        <span className="text-lg md:text-xl font-semibold gradient-text drop-shadow-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Course Curriculum
        </span>
        <span className="ml-auto text-base font-semibold text-gray-700 bg-white/70 px-4 py-1 rounded-full shadow-sm">
          {modules.length} modules • {totalLessons} lessons
        </span>
      </CardHeader>
      <CardContent className="space-y-6 py-6 px-4 md:px-8 bg-white/80 dark:bg-gray-900/80">
        {modules.map((module: any, moduleIndex: number) => (
          <Collapsible key={module.id} className="border-0 rounded-2xl bg-gradient-to-r from-blue-100/30 via-purple-100/20 to-pink-100/20 shadow-md animate-fade-in-card transition-all duration-300 hover:shadow-xl group" style={{ animationDelay: `${moduleIndex * 80 + 200}ms` }}>
            <CollapsibleTrigger
              onClick={() => toggleModule(moduleIndex)}
              className="w-full p-0 text-left rounded-2xl flex items-center justify-between gap-3 cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-4 w-full px-6 py-5">
                <div className="w-10 h-10 bg-blue-500/90 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md border-4 border-white/40 group-hover:scale-105 transition-transform">
                  {moduleIndex + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-1 truncate">{module.title}</h4>
                  <p className="text-sm text-gray-600 mb-1 truncate">{module.description}</p>
                  <p className="text-xs text-gray-500">{module.lessons.length} lessons</p>
                </div>
                <div className="flex-shrink-0">
                  {expandedModules.includes(moduleIndex) ? (
                    <ChevronDown className="h-6 w-6 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  )}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-5 space-y-3 animate-fade-in-card">
                {module.lessons.map((lesson: any, lessonIndex: number) => (
                  <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white/90 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50/40 transition-all duration-200 animate-fade-in-card" style={{ animationDelay: `${lessonIndex * 40 + 100}ms` }}>
                    <div className="w-9 h-9 bg-blue-100 rounded flex items-center justify-center">
                      {getLessonIcon(lesson.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base text-gray-900 truncate">{lesson.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{lesson.type}</p>
                    </div>
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
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
    </Card>
  );
};

export default CourseCurriculum;
