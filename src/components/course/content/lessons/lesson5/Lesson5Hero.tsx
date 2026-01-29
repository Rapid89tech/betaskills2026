
import React from 'react';

const Lesson5Hero = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl p-8 text-white animate-scale-in">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-3xl font-bold">Writing Effective Prompts for Code Generation</h2>
        <p className="text-xl opacity-90">Master the art of communicating with AI! 🤖💬</p>
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm mt-6">
          <p className="text-lg">
            <strong>🧠 Introduction:</strong> AI tools like GitHub Copilot, ChatGPT, and others can generate, debug, and refactor code based on prompts — natural language instructions. The effectiveness of the output depends heavily on how well you craft your prompt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lesson5Hero;
