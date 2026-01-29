
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu } from 'lucide-react';

const CPUSection = () => {
  return (
    <Card className="animate-slide-in-right delay-100">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <Cpu className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-600">1. Central Processing Unit (CPU)</h3>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-green-800 mb-2">The Brain of Your Computer</h4>
          <p className="text-green-700 text-sm mb-3">Often called the "brain" of the computer, the CPU processes instructions and performs calculations. Imagine your computer is like a big, busy kitchen, and you're making a delicious cake!</p>
          <p className="text-green-700 text-sm mb-3">The CPU (Central Processing Unit) is like the chef in that kitchen. The chef reads the recipe (program), figures out what to do next, and tells everyone else what to do. Without the chef, nothing would get done!</p>
          
          <div className="mt-4 space-y-2">
            <p className="text-green-700 text-sm"><strong>🧠 Super Fast Thinker:</strong> The chef thinks really, really fast. When you tell the computer to open a game or watch a video, the CPU quickly understands what you want and starts working on it.</p>
            <p className="text-green-700 text-sm"><strong>⚡ Doing the Work:</strong> The chef does all the important jobs, like mixing the ingredients, cracking the eggs, and making sure everything is cooked just right.</p>
            <p className="text-green-700 text-sm"><strong>🎯 Lots of Jobs at Once:</strong> A really good chef can sometimes do a few things at the same time, like stir the batter while checking the oven.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-blue-600 mb-2">Key Functions:</h5>
            <ul className="modern-bullet-list text-sm">
              <li>Executes program instructions</li>
              <li>Performs basic arithmetic and logic operations</li>
              <li>Controls input/output operations</li>
              <li>Coordinates other components</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-purple-600 mb-2">Key Specifications:</h5>
            <ul className="modern-bullet-list text-sm">
              <li><strong>Clock Speed:</strong> Measured in GHz</li>
              <li><strong>Cores:</strong> Multiple processing units</li>
              <li><strong>Cache:</strong> Fast memory on CPU</li>
              <li><strong>Types:</strong> Intel (i3, i5, i7, i9), AMD (Ryzen)</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <h5 className="font-semibold text-yellow-800 mb-2">CPU Cores Explained</h5>
          <p className="text-yellow-700 text-sm mb-2">Think of cores as multiple mini-brains inside the CPU:</p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded border">
              <strong className="text-yellow-800">One Core:</strong>
              <p className="text-sm text-yellow-700">Can only do one step at a time</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <strong className="text-yellow-800">Dual Core:</strong>
              <p className="text-sm text-yellow-700">Like having two heads working together</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <strong className="text-yellow-800">Quad Core:</strong>
              <p className="text-sm text-yellow-700">Four cores can juggle many tasks at once</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h5 className="font-semibold text-red-800 mb-2">Common CPU Issues:</h5>
          <ul className="modern-bullet-list text-red-700 text-sm">
            <li>Overheating due to thermal paste failure</li>
            <li>Improper installation</li>
            <li>Bent pins (on some CPU types)</li>
            <li>Compatibility problems with motherboard</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CPUSection;
