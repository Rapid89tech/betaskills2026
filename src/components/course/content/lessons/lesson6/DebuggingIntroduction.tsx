
import React from 'react';
import { CheckCircle } from 'lucide-react';

const DebuggingIntroduction = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">🧠 What Is Bug Identification and Fixing?</h3>
      
      <div className="bg-blue-50 rounded-lg p-6">
        <p className="text-lg leading-relaxed mb-4">
          <strong>Bug identification</strong> is the process of detecting errors or unintended behavior in a program.
          <strong> Fixing bugs</strong> involves changing the code to remove those errors without introducing new ones.
        </p>
        
        <h4 className="font-semibold text-blue-800 mb-3">AI tools can assist in:</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span>Detecting syntax and logical errors</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span>Explaining error messages</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span>Proposing corrected versions of code</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span>Suggesting better practices to avoid similar bugs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-3">📌 When to Use AI for Debugging:</h4>
        <ul className="space-y-2 text-yellow-700">
          <li>• When facing cryptic error messages or unexpected behavior</li>
          <li>• When trying to debug legacy or unfamiliar code</li>
          <li>• To cross-check your understanding of a problem</li>
          <li>• To fix code faster during rapid development or prototyping</li>
        </ul>
      </div>

      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <p className="text-sm text-purple-800">
          <strong>📺 Watch:</strong> <a href="https://youtu.be/dYZCYbf9BJA" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Learn AI debugging techniques</a>
        </p>
      </div>
    </div>
  );
};

export default DebuggingIntroduction;
