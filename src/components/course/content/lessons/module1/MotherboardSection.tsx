
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircuitBoard } from 'lucide-react';

const MotherboardSection = () => {
  return (
    <Card className="animate-slide-in-right delay-300">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <CircuitBoard className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-indigo-600">3. Motherboard</h3>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-indigo-800 mb-2">The Main Circuit Board</h4>
          <p className="text-indigo-700 text-sm mb-3">The main printed circuit board (PCB) connecting and allowing communication between all hardware components.</p>
          <p className="text-indigo-700 text-sm">Houses the CPU socket, RAM slots, expansion slots (PCIe), power connectors, storage connectors (SATA, M.2), and I/O ports.</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h5 className="font-semibold text-purple-800 mb-2">Chipset - The Traffic Controller</h5>
          <p className="text-purple-700 text-sm mb-2">The chipset is like the kitchen's super smart traffic controller or helpful manager:</p>
          <div className="space-y-2">
            <p className="text-purple-700 text-sm">🚦 <strong>Connecting Everyone:</strong> All parts need to talk to each other - CPU needs ingredients from storage, sends results to screen</p>
            <p className="text-purple-700 text-sm">📡 <strong>Message Director:</strong> Chipset directs all messages and data between components</p>
            <p className="text-purple-700 text-sm">🛣️ <strong>Highway System:</strong> Like the main highway system guiding information where it needs to go</p>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <h5 className="font-semibold text-yellow-800 mb-2">BIOS/UEFI - The Startup Manual</h5>
          <p className="text-yellow-700 text-sm mb-2">Firmware interface stored on the motherboard to initialize hardware during boot:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded border">
              <strong className="text-yellow-800">BIOS (Basic Input/Output System):</strong>
              <p className="text-sm text-yellow-700">Old, simple manual - good but slow, understands simple instructions</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <strong className="text-yellow-800">UEFI (Unified Extensible Firmware Interface):</strong>
              <p className="text-sm text-yellow-700">New, fancy digital manual - faster, more features, graphical interface</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h5 className="font-semibold text-red-800 mb-2">Common Motherboard Issues:</h5>
          <ul className="text-red-700 text-sm space-y-1">
            <li>• Damaged circuits or components</li>
            <li>• Failing capacitors</li>
            <li>• BIOS corruption</li>
            <li>• Faulty ports or connectors</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotherboardSection;
