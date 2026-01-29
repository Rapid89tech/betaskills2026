
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const QuizSection = () => {
  return (
    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 animate-scale-in">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🧠</div>
          <h3 className="text-2xl font-bold">Test Your Knowledge</h3>
          <p className="text-gray-600">Ready to test what you've learned about computer hardware?</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3">Sample Quiz Questions:</h4>
          <div className="space-y-2 text-sm">
            <p>1. What is the primary function of the CPU in a computer?</p>
            <p>2. What does RAM do in a computer system?</p>
            <p>3. Which specification indicates how fast a CPU can process instructions?</p>
            <p>4. What could be a symptom of a faulty RAM module?</p>
            <p>5. A failing PSU might cause which type of issues?</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizSection;
