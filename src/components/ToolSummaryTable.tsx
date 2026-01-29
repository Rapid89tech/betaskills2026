import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Tool {
  name: string;
  primaryUse: string;
  safetyTip: string;
}

const tools: Tool[] = [
  {
    name: 'Hammer',
    primaryUse: 'Driving nails, shaping materials',
    safetyTip: 'Wear eye protection'
  },
  {
    name: 'Tin Snips',
    primaryUse: 'Cutting sheet metal',
    safetyTip: 'Use gloves to avoid cuts'
  },
  {
    name: 'Chalk Line',
    primaryUse: 'Marking straight lines',
    safetyTip: 'Keep chalk dry'
  },
  {
    name: 'Tape Measure',
    primaryUse: 'Measuring lengths',
    safetyTip: 'Retract carefully to avoid injury'
  },
  {
    name: 'Utility Knife',
    primaryUse: 'Cutting roofing materials',
    safetyTip: 'Cut away from body'
  },
  {
    name: 'Pry Bar',
    primaryUse: 'Removing nails, prying materials',
    safetyTip: 'Use leverage properly'
  }
];

const ToolSummaryTable: React.FC = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">## Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3 text-left font-semibold bg-blue-100">Tool</th>
                <th className="border border-gray-300 p-3 text-left font-semibold bg-purple-100">Primary Use</th>
                <th className="border border-gray-300 p-3 text-left font-semibold bg-pink-100">Key Safety Tip</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, index) => (
                <tr key={tool.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 p-3 font-semibold">{tool.name}</td>
                  <td className="border border-gray-300 p-3">{tool.primaryUse}</td>
                  <td className="border border-gray-300 p-3">{tool.safetyTip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> This table provides a comprehensive overview of essential tools, their primary functions, and key safety considerations. Always follow proper safety protocols when using any tools.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolSummaryTable;
