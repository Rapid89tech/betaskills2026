
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Lesson6Success = () => {
  return (
    <Card className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white animate-scale-in">
      <CardContent className="p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-3xl font-bold mb-4">Debug Like a Pro!</h3>
        <p className="text-xl opacity-90 mb-6">
          You now have AI superpowers for finding and fixing bugs faster than ever. 
          No more pulling your hair out over mysterious errors! 🕵️‍♂️✨
        </p>
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm mb-6">
          <p className="text-lg">🏆 <strong>Remember:</strong> Great debuggers aren't born, they're made through practice and the right tools!</p>
        </div>
        <div className="flex justify-center gap-4 text-3xl">
          <span className="animate-bounce">🐛</span>
          <span className="animate-bounce delay-100">➡️</span>
          <span className="animate-bounce delay-200">✨</span>
          <span className="animate-bounce delay-300">🚀</span>
          <span className="animate-bounce delay-400">🎯</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Lesson6Success;
