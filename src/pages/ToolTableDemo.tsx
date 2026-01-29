import React from 'react';
import ToolSummaryTable from '@/components/ToolSummaryTable';
import PowerToolSummaryTable from '@/components/PowerToolSummaryTable';
import { getToolSummaryTable, getPowerToolSummaryTable } from '@/utils/toolSummaryTable';

const ToolTableDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tool Summary Tables - Fixed Versions</h1>
          <p className="text-gray-600">These are the corrected versions of the tool summary tables with proper data organization.</p>
        </div>

        {/* Power Tools Table - React Component Version */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Power Tools Table - React Component Version</h2>
          <PowerToolSummaryTable />
        </div>

        {/* Power Tools Table - HTML String Version */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Power Tools Table - HTML String Version (for course content)</h2>
          <div 
            className="bg-white rounded-lg shadow-sm border"
            dangerouslySetInnerHTML={{ __html: getPowerToolSummaryTable() }}
          />
        </div>

        {/* Hand Tools Table - React Component Version */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hand Tools Table - React Component Version</h2>
          <ToolSummaryTable />
        </div>

        {/* Hand Tools Table - HTML String Version */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hand Tools Table - HTML String Version (for course content)</h2>
          <div 
            className="bg-white rounded-lg shadow-sm border"
            dangerouslySetInnerHTML={{ __html: getToolSummaryTable() }}
          />
        </div>

        {/* Issues Fixed */}
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Issues Fixed:</h3>
          <ul className="text-yellow-700 space-y-2">
            <li>• <strong>Removed "undefined" values</strong> - All cells now contain proper data</li>
            <li>• <strong>Corrected column data</strong> - All columns now have correct information</li>
            <li>• <strong>Fixed data organization</strong> - Each tool now has its proper data in the right columns</li>
            <li>• <strong>Added proper styling</strong> - Color-coded headers and alternating row colors</li>
            <li>• <strong>Improved readability</strong> - Better spacing and typography</li>
            <li>• <strong>Created separate tables</strong> - Power tools and hand tools have their own appropriate structures</li>
          </ul>
        </div>

        {/* Data Structure Comparison */}
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mt-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Data Structure Comparison:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Power Tools Table:</h4>
              <div className="text-blue-700 text-sm space-y-1">
                <p><strong>Power Tool:</strong> The name of the power tool</p>
                <p><strong>Primary Use:</strong> What the tool is primarily used for</p>
                <p><strong>Advantages:</strong> Key benefits of using this power tool</p>
                <p><strong>Key Safety Tip:</strong> The most important safety consideration</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Hand Tools Table:</h4>
              <div className="text-blue-700 text-sm space-y-1">
                <p><strong>Tool:</strong> The name of the hand tool</p>
                <p><strong>Primary Use:</strong> What the tool is primarily used for</p>
                <p><strong>Key Safety Tip:</strong> The most important safety consideration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Corrected Data */}
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500 mt-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Corrected Power Tools Data:</h3>
          <div className="text-green-700 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <strong>Nail Gun:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Primary Use: Fastening nails</li>
                  <li>• Advantages: Speed, consistent depth</li>
                  <li>• Safety Tip: Never disable safety features</li>
                </ul>
              </div>
              <div>
                <strong>Drill:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Primary Use: Drilling holes, driving screws</li>
                  <li>• Advantages: Versatile, portable options</li>
                  <li>• Safety Tip: Use correct bit, secure material</li>
                </ul>
              </div>
              <div>
                <strong>Saw:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Primary Use: Cutting roofing materials</li>
                  <li>• Advantages: Efficient, various blade options</li>
                  <li>• Safety Tip: Keep hands clear of blade</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolTableDemo;
