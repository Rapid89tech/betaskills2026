
import React from 'react';

const CommonMistakes = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-red-600">⚠️ Common Prompting Mistakes</h3>
      <p className="text-red-600">Avoid these pitfalls for better results!</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-red-800 flex items-center gap-2">
            <div className="text-xl">❌</div>
            What NOT to Do:
          </h4>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border border-red-200">
              <p className="text-sm text-red-700"><strong>Too Vague:</strong> "Make a website"</p>
            </div>
            <div className="bg-white p-3 rounded border border-red-200">
              <p className="text-sm text-red-700"><strong>No Context:</strong> "Fix this code" (without showing the code)</p>
            </div>
            <div className="bg-white p-3 rounded border border-red-200">
              <p className="text-sm text-red-700"><strong>Overwhelming:</strong> "Build an entire e-commerce platform"</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-green-800 flex items-center gap-2">
            <div className="text-xl">✅</div>
            Better Alternatives:
          </h4>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border border-green-200">
              <p className="text-sm text-green-700"><strong>Specific:</strong> "Create a responsive landing page with header, hero section, and footer"</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-200">
              <p className="text-sm text-green-700"><strong>With Context:</strong> "Fix this React component that's not rendering properly: [code]"</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-200">
              <p className="text-sm text-green-700"><strong>Manageable:</strong> "Create a product card component for an e-commerce site"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonMistakes;
