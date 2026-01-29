
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const WhatIsPrompt = () => {
  return (
    <Card className="overflow-hidden border-l-4 border-l-blue-500 animate-slide-in-right">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">🎯</div>
          <h3 className="text-2xl font-bold text-blue-600">What is a Prompt?</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            A prompt is the input you give to an AI model to generate a response. For code generation, it's typically a natural language instruction that describes the task you want to accomplish.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-800 mb-3">Example:</h4>
            <div className="bg-white p-4 rounded border font-mono text-sm">
              "Write a Python function that checks if a number is a prime number."
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>📺 Watch:</strong> <a href="https://youtu.be/uwA3MMYBfAQ" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Learn more about effective prompting</a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatIsPrompt;
