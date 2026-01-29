
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const HardwareSummary = () => {
  return (
    <Card className="bg-gradient-to-r from-gray-50 to-blue-50 animate-scale-in">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">📋</div>
          <h3 className="text-2xl font-bold">Hardware Summary</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3 text-left">Component</th>
                <th className="border border-gray-300 p-3 text-left">Function</th>
                <th className="border border-gray-300 p-3 text-left">Common Problems</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-300 p-3 font-semibold">CPU</td>
                <td className="border border-gray-300 p-3">Processes instructions and tasks</td>
                <td className="border border-gray-300 p-3">Overheating, compatibility</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3 font-semibold">RAM</td>
                <td className="border border-gray-300 p-3">Temporary fast-access memory</td>
                <td className="border border-gray-300 p-3">Faulty modules, blue screens</td>
              </tr>
              <tr className="bg-white">
                <td className="border border-gray-300 p-3 font-semibold">Motherboard</td>
                <td className="border border-gray-300 p-3">Connects all components</td>
                <td className="border border-gray-300 p-3">Damaged circuits, BIOS issues</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3 font-semibold">PSU</td>
                <td className="border border-gray-300 p-3">Powers the computer</td>
                <td className="border border-gray-300 p-3">Power failures, overheating</td>
              </tr>
              <tr className="bg-white">
                <td className="border border-gray-300 p-3 font-semibold">GPU</td>
                <td className="border border-gray-300 p-3">Renders graphics</td>
                <td className="border border-gray-300 p-3">Driver issues, overheating</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default HardwareSummary;
