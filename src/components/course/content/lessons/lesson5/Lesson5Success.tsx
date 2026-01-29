
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Lesson5Success = () => {
  return (
    <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white animate-scale-in">
      <CardContent className="p-8 text-center">
        <div className="text-6xl mb-4">🎪</div>
        <h3 className="text-3xl font-bold mb-4">Ready to Practice?</h3>
        <p className="text-xl opacity-90 mb-6">
          Try these prompting techniques in your next coding session. 
          Remember: specific, contextual prompts = better code! 🎯
        </p>
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm mb-6">
          <p className="text-lg">💡 <strong>Pro Tip:</strong> Start with simple prompts and gradually add more detail as you get comfortable!</p>
        </div>
        <div className="flex justify-center gap-4 text-3xl">
          <span className="animate-bounce">🚀</span>
          <span className="animate-bounce delay-100">💻</span>
          <span className="animate-bounce delay-200">⚡</span>
          <span className="animate-bounce delay-300">🎯</span>
          <span className="animate-bounce delay-400">✨</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Lesson5Success;
