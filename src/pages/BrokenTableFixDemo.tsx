import React from 'react';
import BrokenTableFixer from '@/components/BrokenTableFixer';
import { getCorrectedPowerToolsData } from '@/utils/brokenTableFix';

const BrokenTableFixDemo: React.FC = () => {
  // Sample broken content that might appear in a course
  const brokenContent = `
    <div class="bg-gray-100 p-6 rounded-lg">
      <h4 class="font-bold text-lg mb-3 text-gray-800">## Summary</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 p-2 text-left bg-blue-100">Advantages</th>
              <th class="border border-gray-300 p-2 text-left bg-pink-100">Key Safety Tip</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white">
              <td class="border border-gray-300 p-2">undefined</td>
              <td class="border border-gray-300 p-2">undefined</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-2">Speed, consistent depth</td>
              <td class="border border-gray-300 p-2">Never disable safety features</td>
            </tr>
            <tr class="bg-white">
              <td class="border border-gray-300 p-2">Drill</td>
              <td class="border border-gray-300 p-2">Drilling holes, driving screws</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-2">Saw</td>
              <td class="border border-gray-300 p-2">Cutting roofing materials</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  const correctedData = getCorrectedPowerToolsData();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Broken Table Fix Demo</h1>
          <p className="text-gray-600">This demonstrates how broken power tools tables are automatically detected and fixed.</p>
        </div>

        {/* Broken Table Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">❌ Broken Table (Original)</h2>
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 mb-4">
            <p className="text-red-700 text-sm">
              <strong>Issues:</strong> Missing "Power Tool" and "Primary Use" columns, "undefined" values, misaligned data
            </p>
          </div>
          <div 
            className="bg-white rounded-lg shadow-sm border"
            dangerouslySetInnerHTML={{ __html: brokenContent }}
          />
        </div>

        {/* Fixed Table Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">✅ Fixed Table (Automatically Corrected)</h2>
          <BrokenTableFixer content={brokenContent} />
        </div>

        {/* Data Structure Comparison */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Data Structure Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-red-800 mb-3">❌ Broken Structure</h3>
              <div className="text-red-700 text-sm space-y-2">
                <p><strong>Columns:</strong> Only "Advantages" and "Key Safety Tip"</p>
                <p><strong>Missing:</strong> "Power Tool" and "Primary Use" columns</p>
                <p><strong>Data Issues:</strong> "undefined" values, misaligned information</p>
                <p><strong>Problems:</strong> Tool names in wrong columns, primary uses in safety tip column</p>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Corrected Structure</h3>
              <div className="text-green-700 text-sm space-y-2">
                <p><strong>Columns:</strong> "Power Tool", "Primary Use", "Advantages", "Key Safety Tip"</p>
                <p><strong>Complete:</strong> All necessary columns present</p>
                <p><strong>Data Quality:</strong> No "undefined" values, properly aligned</p>
                <p><strong>Accuracy:</strong> Each tool has correct information in appropriate columns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Corrected Data Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📋 Corrected Data Structure</h2>
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-3 text-left font-semibold bg-blue-100">Power Tool</th>
                    <th className="border border-gray-300 p-3 text-left font-semibold bg-purple-100">Primary Use</th>
                    <th className="border border-gray-300 p-3 text-left font-semibold bg-green-100">Advantages</th>
                    <th className="border border-gray-300 p-3 text-left font-semibold bg-pink-100">Key Safety Tip</th>
                  </tr>
                </thead>
                <tbody>
                  {correctedData.map((tool, index) => (
                    <tr key={tool.powerTool} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 p-3 font-semibold">{tool.powerTool}</td>
                      <td className="border border-gray-300 p-3">{tool.primaryUse}</td>
                      <td className="border border-gray-300 p-3">{tool.advantages}</td>
                      <td className="border border-gray-300 p-3">{tool.safetyTip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">🔧 Implementation Guide</h3>
          <div className="text-blue-700 text-sm space-y-3">
            <p><strong>1. Automatic Detection:</strong> The <code>hasBrokenTable()</code> function detects broken tables by looking for "undefined" values and specific patterns.</p>
            <p><strong>2. Automatic Fix:</strong> The <code>fixBrokenPowerToolsTable()</code> function provides the corrected HTML structure.</p>
            <p><strong>3. React Component:</strong> Use <code>BrokenTableFixer</code> component to automatically fix broken tables in course content.</p>
            <p><strong>4. Usage:</strong> Wrap any content that might contain broken tables with the <code>BrokenTableFixer</code> component.</p>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-100 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">💻 Code Example</h3>
          <pre className="text-sm text-gray-700 bg-white p-4 rounded border overflow-x-auto">
{`import BrokenTableFixer from '@/components/BrokenTableFixer';

// In your course content component
const CourseContent = ({ content }) => {
  return (
    <BrokenTableFixer content={content}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </BrokenTableFixer>
  );
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default BrokenTableFixDemo;
