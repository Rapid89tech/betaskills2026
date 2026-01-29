
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor } from 'lucide-react';

const GPUSection = () => {
  return (
    <Card className="animate-slide-in-right delay-500">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-3 rounded-full">
            <Monitor className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-purple-600">5. Graphics Processing Unit (GPU)</h3>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-purple-800 mb-2">Your Computer's Visual Processor</h4>
          <p className="text-purple-700 text-sm">Specialized processor designed to accelerate rendering of images, video, and animations. Handles graphics calculations, freeing the CPU for other tasks.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-blue-600 mb-2">Types of GPUs:</h5>
            <ul className="modern-bullet-list text-sm">
              <li><strong>Integrated:</strong> Built into CPU/motherboard</li>
              <li><strong>Dedicated:</strong> Separate card with own memory</li>
              <li><strong>Brands:</strong> NVIDIA GeForce, AMD Radeon</li>
              <li><strong>VRAM:</strong> Graphics memory for textures</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-purple-600 mb-2">Common Uses:</h5>
            <ul className="modern-bullet-list text-sm">
              <li>Gaming and 3D graphics</li>
              <li>Video editing and streaming</li>
              <li>CAD and 3D modeling</li>
              <li>Essential for high-performance tasks</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h5 className="font-semibold text-yellow-800 mb-2">Common GPU Issues:</h5>
          <ul className="modern-bullet-list text-yellow-700 text-sm">
            <li>Driver conflicts and updates needed</li>
            <li>Overheating and thermal throttling</li>
            <li>Artifacts or display corruption</li>
            <li>No display output</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GPUSection;
