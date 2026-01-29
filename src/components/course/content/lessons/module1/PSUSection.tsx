
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';

const PSUSection = () => {
  return (
    <Card className="animate-slide-in-right delay-400">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <Zap className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-red-600">4. Power Supply Unit (PSU)</h3>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-red-800 mb-2">Your Computer's Power Source</h4>
          <p className="text-red-700 text-sm">Converts AC power from the wall outlet into DC power used by computer components. Supplies regulated power at different voltages (3.3V, 5V, 12V) to all hardware parts.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-blue-600 mb-2">Key Specifications:</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Wattage:</strong> 500W, 750W, 1000W+</li>
              <li>• <strong>Efficiency:</strong> 80 PLUS ratings</li>
              <li>• <strong>Modularity:</strong> Fixed vs modular cables</li>
              <li>• <strong>Form Factor:</strong> ATX, SFX sizes</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-purple-600 mb-2">Common Connectors:</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 20/24-pin motherboard power</li>
              <li>• CPU power connector</li>
              <li>• PCIe power for graphics cards</li>
              <li>• SATA power for drives</li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h5 className="font-semibold text-red-800 mb-2">PSU Failure Symptoms:</h5>
          <ul className="text-red-700 text-sm space-y-1">
            <li>• Computer won't turn on</li>
            <li>• Random shutdowns</li>
            <li>• System instability</li>
            <li>• Overheating or noisy fan</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PSUSection;
