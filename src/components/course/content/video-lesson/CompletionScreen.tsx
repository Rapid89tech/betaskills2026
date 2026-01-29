import React from 'react';
import { CheckCircle } from 'lucide-react';

const CompletionScreen = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl animate-fade-in">
      <div className="text-center text-white p-8">
        <div className="mb-6">
          <CheckCircle className="h-20 w-20 mx-auto mb-4 animate-scale-in" />
          <h2 className="text-4xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Lesson Complete!
          </h2>
          <p className="text-xl opacity-90 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Outstanding work! You've mastered another essential concept. Your expertise is growing with every lesson!
          </p>
        </div>
        
        <div className="flex justify-center items-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <span className="text-4xl">🎙️</span>
          <span className="text-4xl">🎧</span>
          <span className="text-4xl">📊</span>
          <span className="text-4xl">🚀</span>
          <span className="text-4xl">⭐</span>
          <span className="text-4xl">🎵</span>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;