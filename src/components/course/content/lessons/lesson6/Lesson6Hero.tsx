
import React from 'react';

const Lesson6Hero = () => {
  return (
    <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl p-8 text-white animate-scale-in">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">🐛</div>
        <h2 className="text-3xl font-bold">AI-Assisted Debugging and Code Review</h2>
        <p className="text-xl opacity-90">Turn bugs into features with AI superpowers! 🔍✨</p>
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm mt-6">
          <p className="text-lg">
            Artificial intelligence tools like ChatGPT, GitHub Copilot, Replit Ghostwriter, and Amazon CodeWhisperer have revolutionized software development. One of their most practical applications is in debugging — identifying, understanding, and fixing bugs in code using natural language prompts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lesson6Hero;
