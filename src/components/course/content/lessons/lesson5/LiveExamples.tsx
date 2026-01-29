
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

const LiveExamples = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    function: `// Ask AI: "Create a function to calculate compound interest"
function calculateCompoundInterest(principal, rate, time, compoundFreq) {
  return principal * Math.pow((1 + rate / compoundFreq), compoundFreq * time);
}`,
    
    component: `// Ask AI: "Create a React component for a user profile card"
const UserProfile = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mx-auto" />
      <h3 className="text-xl font-semibold text-center mt-4">{user.name}</h3>
      <p className="text-gray-600 text-center">{user.title}</p>
    </div>
  );
};`,

    algorithm: `// Ask AI: "Implement a binary search algorithm"
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1; // Not found
}`
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">💡 Real Prompting Examples</h3>
      
      <div className="space-y-6">
        {/* Example 1 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">Example 1: Function Generation</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(codeExamples.function, 'function')}
              className="text-sm"
            >
              <Copy className="h-4 w-4 mr-1" />
              {copiedCode === 'function' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="bg-green-100 p-3 rounded mb-3 border-l-4 border-green-500">
            <p className="text-sm font-semibold text-green-800">Good Prompt:</p>
            <p className="text-green-700">"Create a JavaScript function to calculate compound interest with parameters for principal, annual rate, time in years, and compounding frequency."</p>
          </div>
          <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
            <code>{codeExamples.function}</code>
          </pre>
        </div>

        {/* Example 2 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">Example 2: React Component</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(codeExamples.component, 'component')}
              className="text-sm"
            >
              <Copy className="h-4 w-4 mr-1" />
              {copiedCode === 'component' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="bg-blue-100 p-3 rounded mb-3 border-l-4 border-blue-500">
            <p className="text-sm font-semibold text-blue-800">Good Prompt:</p>
            <p className="text-blue-700">"Create a React functional component for a user profile card that takes a user object as props and displays avatar, name, and title with Tailwind CSS styling."</p>
          </div>
          <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
            <code>{codeExamples.component}</code>
          </pre>
        </div>

        {/* Example 3 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">Example 3: Algorithm Implementation</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(codeExamples.algorithm, 'algorithm')}
              className="text-sm"
            >
              <Copy className="h-4 w-4 mr-1" />
              {copiedCode === 'algorithm' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="bg-purple-100 p-3 rounded mb-3 border-l-4 border-purple-500">
            <p className="text-sm font-semibold text-purple-800">Good Prompt:</p>
            <p className="text-purple-700">"Implement a binary search algorithm in JavaScript that takes a sorted array and target value, returns the index if found or -1 if not found."</p>
          </div>
          <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
            <code>{codeExamples.algorithm}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LiveExamples;
