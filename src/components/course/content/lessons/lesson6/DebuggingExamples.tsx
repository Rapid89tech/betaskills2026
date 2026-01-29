
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, AlertTriangle, CheckCircle } from 'lucide-react';

const DebuggingExamples = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const debugExamples = {
    before: `// Buggy code - can you spot the issues?
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price;
  }
  return total;
}`,
    
    after: `// Fixed code with AI help
function calculateTotal(items) {
  let total = 0;
  // Fixed: Changed <= to < to prevent array bounds error
  for (let i = 0; i < items.length; i++) {
    // Added null check to prevent errors
    if (items[i] && items[i].price) {
      total += items[i].price;
    }
  }
  return total;
}`,

    prompt: `"Please review this JavaScript function and identify any bugs or potential issues. 
The function should calculate the total price of items in an array, but it's throwing errors."`
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">🔧 Live Debugging Example</h3>

      {/* Prompt */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h4 className="font-semibold text-purple-800 mb-3">AI Debugging Prompt:</h4>
        <div className="bg-white p-4 rounded border">
          <code className="text-sm">{debugExamples.prompt}</code>
        </div>
      </div>

      {/* Before */}
      <div className="bg-red-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-red-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Buggy Code:
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopyCode(debugExamples.before, 'before')}
            className="text-sm"
          >
            <Copy className="h-4 w-4 mr-1" />
            {copiedCode === 'before' ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        <pre className="bg-gray-900 text-red-400 p-4 rounded text-sm overflow-x-auto">
          <code>{debugExamples.before}</code>
        </pre>
      </div>

      {/* After */}
      <div className="bg-green-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-green-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            AI-Fixed Code:
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopyCode(debugExamples.after, 'after')}
            className="text-sm"
          >
            <Copy className="h-4 w-4 mr-1" />
            {copiedCode === 'after' ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
          <code>{debugExamples.after}</code>
        </pre>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-3">🧠 AI's Explanation:</h4>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="text-blue-500 mt-1">🔍</div>
            <div>
              <strong>Bug #1:</strong> Loop condition used <code>≤</code> instead of <code>&lt;</code>, causing array index out of bounds
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-blue-500 mt-1">🛡️</div>
            <div>
              <strong>Bug #2:</strong> No null checking for array items, could cause runtime errors
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-blue-500 mt-1">✨</div>
            <div>
              <strong>Solution:</strong> Added bounds checking and null validation for robust error handling
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>📺 Learn More:</strong> <a href="https://youtu.be/XGKyX_hH3Pc" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Watch: Diagnosing Errors Faster with AI</a>
        </p>
      </div>
    </div>
  );
};

export default DebuggingExamples;
