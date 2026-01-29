
import React from 'react';

const BestPractices = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">⭐ AI Debugging Best Practices</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-indigo-200">
          <div className="text-3xl mb-3">✅</div>
          <h4 className="font-semibold text-indigo-800 mb-3">Do This:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="text-indigo-500">•</div>
              <span>Provide complete error messages and stack traces</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="text-indigo-500">•</div>
              <span>Include relevant code context around the bug</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="text-indigo-500">•</div>
              <span>Ask AI to explain why the fix works</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="text-indigo-500">•</div>
              <span>Test AI suggestions thoroughly before implementing</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 border border-red-200">
          <div className="text-3xl mb-3">❌</div>
          <h4 className="font-semibold text-red-800 mb-3">Avoid This:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="text-red-500">•</div>
              <span>Copying AI fixes blindly without understanding</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="text-red-500">•</div>
              <span>Sharing sensitive code or data with AI tools</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="text-red-500">•</div>
              <span>Relying 100% on AI without learning debugging skills</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="text-red-500">•</div>
              <span>Skipping proper testing after applying fixes</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-2xl">💡</div>
          <h4 className="font-semibold text-amber-800">Pro Debugging Tips:</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-amber-700">
          <div>
            <p className="text-sm">🔄 <strong>Iterative Approach:</strong> Start with simple fixes, then ask for optimizations</p>
          </div>
          <div>
            <p className="text-sm">🧪 <strong>Test Edge Cases:</strong> Ask AI to help identify and test edge cases</p>
          </div>
          <div>
            <p className="text-sm">📝 <strong>Document Learning:</strong> Keep notes on common bug patterns AI helps you find</p>
          </div>
          <div>
            <p className="text-sm">🤝 <strong>Combine with Traditional Debugging:</strong> Use console.log, debugger, and AI together</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-4">🧰 Tools That Support Debugging Prompts</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-semibold">Tool</th>
                <th className="text-left p-2 font-semibold">Features</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-medium">ChatGPT</td>
                <td className="p-2">Conversational, step-by-step debugging, multi-language support</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">GitHub Copilot</td>
                <td className="p-2">Inline suggestions in VS Code, real-time code corrections</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Amazon CodeWhisperer</td>
                <td className="p-2">Code-level suggestions and security-focused bug prevention</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Replit Ghostwriter</td>
                <td className="p-2">Context-aware suggestions and bug fixes within Replit IDE</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BestPractices;
