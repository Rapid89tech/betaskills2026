import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PowerTool {
  name: string;
  primaryUse: string;
  advantages: string;
  safetyTip: string;
}

const powerTools: PowerTool[] = [
  {
    name: 'Nail Gun',
    primaryUse: 'Fastening nails',
    advantages: 'Speed, consistent depth',
    safetyTip: 'Never disable safety features'
  },
  {
    name: 'Drill',
    primaryUse: 'Drilling holes, driving screws',
    advantages: 'Versatile, portable options',
    safetyTip: 'Use correct bit, secure material'
  },
  {
    name: 'Saw',
    primaryUse: 'Cutting roofing materials',
    advantages: 'Efficient, various blade options',
    safetyTip: 'Keep hands clear of blade'
  }
];

const PowerToolSummaryTable: React.FC = () => {
  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">## Summary</CardTitle>
      </CardHeader>
      <CardContent>
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
              {powerTools.map((tool, index) => (
                <tr key={tool.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 p-3 font-semibold">{tool.name}</td>
                  <td className="border border-gray-300 p-3">{tool.primaryUse}</td>
                  <td className="border border-gray-300 p-3">{tool.advantages}</td>
                  <td className="border border-gray-300 p-3">{tool.safetyTip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> This table provides a comprehensive overview of essential power tools, their primary functions, advantages, and key safety considerations. Always follow proper safety protocols when using power tools.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerToolSummaryTable;
