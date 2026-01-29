
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HardDrive } from 'lucide-react';

const StorageSection = () => {
  return (
    <Card className="animate-slide-in-right delay-600">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gray-100 p-3 rounded-full">
            <HardDrive className="h-8 w-8 text-gray-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Storage Devices: HDD, SSD, NVMe</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-blue-600 mb-2">Hard Disk Drive (HDD)</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Magnetic storage with spinning disks</li>
              <li>• Speed: ~80-160 MB/s</li>
              <li>• Large capacity, low cost</li>
              <li>• Mechanical parts, can be noisy</li>
              <li>• Best for: Bulk storage, backups</li>
              <li>• Issues: Clicking, slow performance</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-green-600 mb-2">Solid State Drive (SSD)</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Flash memory, no moving parts</li>
              <li>• Speed: ~200-550 MB/s</li>
              <li>• Fast, durable, silent</li>
              <li>• Higher cost per GB</li>
              <li>• Best for: OS and applications</li>
              <li>• Issues: Firmware bugs, wear leveling</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-purple-600 mb-2">NVMe SSD</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Uses PCIe interface directly</li>
              <li>• Speed: ~2000-7000 MB/s</li>
              <li>• Ultra-fast performance</li>
              <li>• M.2 form factor</li>
              <li>• Best for: High-performance tasks</li>
              <li>• Issues: Compatibility, overheating</li>
            </ul>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Feature</th>
                <th className="border border-gray-300 p-3 text-left">HDD</th>
                <th className="border border-gray-300 p-3 text-left">SSD</th>
                <th className="border border-gray-300 p-3 text-left">NVMe SSD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold">Speed</td>
                <td className="border border-gray-300 p-3">~80-160 MB/s</td>
                <td className="border border-gray-300 p-3">~200-550 MB/s</td>
                <td className="border border-gray-300 p-3">~2000-7000 MB/s</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3 font-semibold">Durability</td>
                <td className="border border-gray-300 p-3">Sensitive to shock</td>
                <td className="border border-gray-300 p-3">Shock resistant</td>
                <td className="border border-gray-300 p-3">Shock resistant</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold">Cost per GB</td>
                <td className="border border-gray-300 p-3">Lowest</td>
                <td className="border border-gray-300 p-3">Moderate</td>
                <td className="border border-gray-300 p-3">Highest</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageSection;
