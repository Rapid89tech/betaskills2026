
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Usb, Monitor, Volume2, EthernetPort } from 'lucide-react';

const IOPortsSection = () => {
  return (
    <Card className="animate-slide-in-right delay-700">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <Usb className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-blue-600">I/O Ports: USB, HDMI, Ethernet, Audio</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Port Type</th>
                <th className="border border-gray-300 p-3 text-left">Common Connector</th>
                <th className="border border-gray-300 p-3 text-left">Main Use</th>
                <th className="border border-gray-300 p-3 text-left">Max Speed</th>
                <th className="border border-gray-300 p-3 text-left">Typical Issues</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold flex items-center gap-2">
                  <Usb className="h-4 w-4" />
                  USB
                </td>
                <td className="border border-gray-300 p-3">Type-A, Type-C, Mini, Micro</td>
                <td className="border border-gray-300 p-3">Peripherals, data, power</td>
                <td className="border border-gray-300 p-3">Up to 40 Gbps (USB4)</td>
                <td className="border border-gray-300 p-3">Loose cable, driver conflicts</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3 font-semibold flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  HDMI
                </td>
                <td className="border border-gray-300 p-3">Standard, Mini, Micro</td>
                <td className="border border-gray-300 p-3">Audio/video transmission</td>
                <td className="border border-gray-300 p-3">Up to 48 Gbps (HDMI 2.1)</td>
                <td className="border border-gray-300 p-3">No signal, HDCP failure</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold flex items-center gap-2">
                  <EthernetPort className="h-4 w-4" />
                  Ethernet
                </td>
                <td className="border border-gray-300 p-3">RJ-45</td>
                <td className="border border-gray-300 p-3">Wired networking</td>
                <td className="border border-gray-300 p-3">Up to 10 Gbps</td>
                <td className="border border-gray-300 p-3">Cable damage, configuration</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3 font-semibold flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Audio
                </td>
                <td className="border border-gray-300 p-3">3.5mm, RCA, USB, Optical</td>
                <td className="border border-gray-300 p-3">Sound input/output</td>
                <td className="border border-gray-300 p-3">Analog/Digital varies</td>
                <td className="border border-gray-300 p-3">No sound, interference</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default IOPortsSection;
