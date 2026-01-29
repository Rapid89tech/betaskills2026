image.png
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, BookOpen, Target, Lightbulb } from 'lucide-react';

interface LessonSummaryProps {
  title: string;
  keyPoints: string[];
  learningObjectives?: string[];
  tips?: string[];
}

const LessonSummary = ({ title, keyPoints, learningObjectives, tips }: LessonSummaryProps) => {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <BookOpen className="h-6 w-6" />
          </div>
          Lesson Summary
        </CardTitle>
        <p className="text-purple-100">The key contents covered in the module are the following:</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Points */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Key Learning Points
          </h3>
          <div className="space-y-3">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Objectives */}
        {learningObjectives && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Learning Objectives
            </h3>
            <div className="grid gap-2">
              {learningObjectives.map((objective, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white justify-start p-3">
                  {objective}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {tips && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Pro Tips
            </h3>
            <div className="space-y-2">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-500/20 rounded-lg">
                  <Lightbulb className="h-4 w-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonSummary;
