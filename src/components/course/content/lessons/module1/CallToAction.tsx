
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const CallToAction = () => {
  return (
    <Card className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white animate-scale-in">
      <CardContent className="p-8 text-center">
        <div className="text-4xl mb-4">🚀</div>
        <h3 className="text-2xl font-bold mb-4">Ready to Learn More?</h3>
        <p className="text-lg opacity-90 mb-6">Understanding these components is the foundation of computer repair mastery!</p>
        <div className="flex justify-center gap-4 text-2xl">
          <span className="animate-bounce">🔧</span>
          <span className="animate-bounce delay-100">💻</span>
          <span className="animate-bounce delay-200">⚡</span>
          <span className="animate-bounce delay-300">🎯</span>
          <span className="animate-bounce delay-400">✨</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallToAction;
