import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

interface LearningObjectivesProps {
  objectives: string[];
}

const LearningObjectives = ({ objectives }: LearningObjectivesProps) => {
  return (
    <Card className="glassmorphism-card border-0 shadow-xl rounded-3xl overflow-hidden animate-fade-in-card">
      <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-6 px-8 flex flex-row items-center gap-3 rounded-t-3xl border-b-0">
        <span className="text-lg md:text-xl font-semibold gradient-text drop-shadow-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Learning Objectives
        </span>
      </CardHeader>
      <CardContent className="py-6 px-8 bg-white/80 dark:bg-gray-900/80">
        <div className="space-y-3">
          {objectives?.map((objective: string, index: number) => (
            <div key={index} className="flex items-start gap-3 animate-fade-in-card" style={{ animationDelay: `${index * 60 + 200}ms` }}>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-base leading-relaxed">{objective}</span>
            </div>
          ))}
        </div>
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
        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite alternate;
        }
        @keyframes pulseGlow {
          0% { opacity: 0.5; filter: blur(32px); }
          100% { opacity: 0.9; filter: blur(48px); }
        }
      `}</style>
    </Card>
  );
};

export default LearningObjectives;
