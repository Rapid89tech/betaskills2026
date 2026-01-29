
import React from 'react';
import { Search, Target, AlertTriangle, Code } from 'lucide-react';

const AIStrategies = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">🎯 AI Debugging Strategies</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strategy 1 */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Search className="h-6 w-6 text-blue-500" />
            <h4 className="font-semibold text-blue-800">1. Provide Full Context</h4>
          </div>
          <p className="text-blue-700 mb-3">Include the relevant portion of the code and describe what it should do vs what it's doing.</p>
          <div className="bg-white p-3 rounded border font-mono text-sm">
            "Here's my Python function to calculate averages. It crashes when I pass an empty list. Can you find and fix the bug?"
          </div>
        </div>

        {/* Strategy 2 */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-6 w-6 text-green-500" />
            <h4 className="font-semibold text-green-800">2. State Expected Behavior</h4>
          </div>
          <p className="text-green-700 mb-3">AI tools work better when you tell them what you want the code to do.</p>
          <div className="bg-white p-3 rounded border font-mono text-sm">
            "This JavaScript function is supposed to filter even numbers, but it returns odds. What's wrong and how do I fix it?"
          </div>
        </div>

        {/* Strategy 3 */}
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-6 w-6 text-purple-500" />
            <h4 className="font-semibold text-purple-800">3. Include Error Output</h4>
          </div>
          <p className="text-purple-700 mb-3">If you have error messages or stack traces, paste them with your code.</p>
          <div className="bg-white p-3 rounded border font-mono text-sm">
            "This code throws a ZeroDivisionError when I run it with an empty list. Fix it so that it returns 0 instead."
          </div>
        </div>

        {/* Strategy 4 */}
        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <div className="flex items-center gap-2 mb-3">
            <Code className="h-6 w-6 text-orange-500" />
            <h4 className="font-semibold text-orange-800">4. Ask for Explanation</h4>
          </div>
          <p className="text-orange-700 mb-3">If you're learning, prompt the AI to explain what went wrong and why.</p>
          <div className="bg-white p-3 rounded border font-mono text-sm">
            "Explain why this C++ loop is skipping the first element."
          </div>
        </div>
      </div>

      {/* Common Prompt Templates */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-4">🔄 Common Prompt Templates</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-semibold">Purpose</th>
                <th className="text-left p-2 font-semibold">Prompt Example</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="border-b">
                <td className="p-2 font-medium">Find bugs</td>
                <td className="p-2 font-mono text-xs">"Can you find the bug in this function that crashes with null input?"</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Fix logic error</td>
                <td className="p-2 font-mono text-xs">"This sorting function doesn't work with negative numbers. Fix it."</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Debug with error</td>
                <td className="p-2 font-mono text-xs">"Here's my code and the error message I get. Help me fix it."</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Explain issue</td>
                <td className="p-2 font-mono text-xs">"Why is this function returning undefined instead of the expected result?"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AIStrategies;
