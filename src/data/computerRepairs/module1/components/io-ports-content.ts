
export const ioPortsContent = `
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-2xl font-bold text-gray-800 mb-4">I/O Ports: USB, HDMI, Ethernet, Audio</h3>
    <div class="space-y-6 mb-6">
      <div class="border rounded-lg p-4">
        <h5 class="font-semibold text-blue-600 mb-2">Universal Serial Bus (USB)</h5>
        <p class="text-sm text-gray-700 mb-2"><strong>Definition:</strong> Interface for connecting peripherals like keyboards, mice, and storage devices.</p>
        <ul class="text-sm text-gray-700 mb-2">
          <li>• Versions: USB 1.1 (12 Mbps) to USB4 (40 Gbps).</li>
          <li>• Connectors: Type-A, Type-C, Mini, Micro.</li>
          <li>• Common Issues: Loose connections, driver conflicts.</li>
        </ul>
        <div class="my-2 flex justify-center">
          <iframe width="320" height="180" src="https://www.youtube.com/embed/Wb0xM_5iYl0" title="USB Types, Ports and Devices Explained" frameborder="0" allowfullscreen class="rounded-xl shadow-lg w-full max-w-xs min-h-[180px]"></iframe>
        </div>
      </div>
      <div class="border rounded-lg p-4">
        <h5 class="font-semibold text-green-600 mb-2">High-Definition Multimedia Interface (HDMI)</h5>
        <p class="text-sm text-gray-700 mb-2"><strong>Definition:</strong> Transmits uncompressed audio/video to displays.</p>
        <ul class="text-sm text-gray-700 mb-2">
          <li>• Versions: HDMI 1.4 (4K@30Hz) to 2.1 (8K, high refresh rates).</li>
          <li>• Common Issues: No signal, HDCP handshake failures.</li>
        </ul>
        <div class="my-2 flex justify-center">
          <iframe width="320" height="180" src="https://www.youtube.com/embed/9cSdNKj-jd0" title="HDMI 2.1 - What You Need to Know" frameborder="0" allowfullscreen class="rounded-xl shadow-lg w-full max-w-xs min-h-[180px]"></iframe>
        </div>
      </div>
      <div class="border rounded-lg p-4">
        <h5 class="font-semibold text-indigo-600 mb-2">Ethernet Port (RJ-45)</h5>
        <p class="text-sm text-gray-700 mb-2"><strong>Definition:</strong> Provides wired network connections via twisted pair cables.</p>
        <ul class="text-sm text-gray-700 mb-2">
          <li>• Speeds: Fast Ethernet (100 Mbps) to 10 Gigabit Ethernet.</li>
          <li>• Common Issues: Damaged cables, configuration errors.</li>
        </ul>
        <div class="my-2 flex justify-center">
          <iframe width="320" height="180" src="https://www.youtube.com/embed/gc-1Ump16ig" title="Ethernet Explained" frameborder="0" allowfullscreen class="rounded-xl shadow-lg w-full max-w-xs min-h-[180px]"></iframe>
        </div>
      </div>
      <div class="border rounded-lg p-4">
        <h5 class="font-semibold text-purple-600 mb-2">Audio Ports</h5>
        <p class="text-sm text-gray-700 mb-2"><strong>Definition:</strong> Transmit audio input/output for headphones, microphones, and speakers.</p>
        <ul class="text-sm text-gray-700 mb-2">
          <li>• Connectors: 3.5mm, RCA, Optical, USB audio.</li>
          <li>• Common Issues: No sound, ground loop noise.</li>
        </ul>
        <div class="my-2 flex justify-center">
          <iframe width="320" height="180" src="https://www.youtube.com/embed/PO96PH5BNr4" title="Audio Connectors Explained" frameborder="0" allowfullscreen class="rounded-xl shadow-lg w-full max-w-xs min-h-[180px]"></iframe>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg mb-4">
      <h4 class="font-bold text-lg mb-3 text-gray-800">I/O Ports Summary Table</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 p-3 text-left">Port Type</th>
              <th class="border border-gray-300 p-3 text-left">Common Connector</th>
              <th class="border border-gray-300 p-3 text-left">Main Use</th>
              <th class="border border-gray-300 p-3 text-left">Max Data Speed</th>
              <th class="border border-gray-300 p-3 text-left">Typical Issues</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-3 font-semibold">USB</td>
              <td class="border border-gray-300 p-3">Type-A, Type-C, Mini, Micro</td>
              <td class="border border-gray-300 p-3">Peripherals, data, power</td>
              <td class="border border-gray-300 p-3">Up to 40 Gbps (USB4)</td>
              <td class="border border-gray-300 p-3">Loose cable, driver conflicts</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-3 font-semibold">HDMI</td>
              <td class="border border-gray-300 p-3">Standard, Mini, Micro</td>
              <td class="border border-gray-300 p-3">Audio/video transmission</td>
              <td class="border border-gray-300 p-3">Up to 48 Gbps (HDMI 2.1)</td>
              <td class="border border-gray-300 p-3">No signal, HDCP failure</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-3 font-semibold">Ethernet</td>
              <td class="border border-gray-300 p-3">RJ-45</td>
              <td class="border border-gray-300 p-3">Wired networking</td>
              <td class="border border-gray-300 p-3">Up to 10 Gbps</td>
              <td class="border border-gray-300 p-3">Cable damage, configuration</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-3 font-semibold">Audio</td>
              <td class="border border-gray-300 p-3">3.5mm, RCA, USB, Optical</td>
              <td class="border border-gray-300 p-3">Sound input/output</td>
              <td class="border border-gray-300 p-3">Analog/Digital varies</td>
              <td class="border border-gray-300 p-3">No sound, interference</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="bg-gray-100 p-4 rounded-lg">
      <h5 class="font-semibold text-gray-800 mb-2">🎥 Educational Videos:</h5>
      <ul class="text-gray-700 text-sm mb-2">
        <li>• USB Types, Ports and Devices Explained</li>
        <li>• Hands On With HDMI 2.1 - What You Need To Know</li>
        <li>• Ethernet Explained | RJ45, GG45, Cables & Ports</li>
        <li>• Audio Connectors</li>
      </ul>
    </div>
  </div>
`;
