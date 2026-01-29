
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, MemoryStick, CircuitBoard, Zap, Monitor, HardDrive, Usb } from 'lucide-react';

const ComponentOverview = () => {
  return (
    <Card className="border-l-4 border-l-blue-500 animate-slide-in-right">
      <CardContent className="p-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <h3 className="font-bold text-blue-800 mb-2">Key Computer Hardware Components:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-green-600" />
                <span>CPU (Central Processing Unit)</span>
              </div>
              <div className="flex items-center gap-2">
                <MemoryStick className="h-5 w-5 text-orange-600" />
                <span>RAM (Random Access Memory)</span>
              </div>
              <div className="flex items-center gap-2">
                <CircuitBoard className="h-5 w-5 text-indigo-600" />
                <span>Motherboard</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-red-600" />
                <span>PSU (Power Supply Unit)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-purple-600" />
                <span>GPU (Graphics Processing Unit)</span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-gray-600" />
                <span>Storage Devices: HDD, SSD, NVMe</span>
              </div>
              <div className="flex items-center gap-2">
                <Usb className="h-5 w-5 text-blue-600" />
                <span>I/O Ports: USB, HDMI, Ethernet, Audio</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentOverview;
