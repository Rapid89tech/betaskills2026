
export const motherboardContent = `
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-2xl font-bold text-indigo-600 mb-4">Motherboard</h3>
    <div class="bg-indigo-50 p-4 rounded-lg mb-4">
      <h4 class="font-semibold text-indigo-800 mb-2">The Main Circuit Board</h4>
      <p class="text-indigo-700 text-sm mb-3">The main circuit board connecting all hardware components, serving as the system’s communication hub.</p>
      <p class="text-indigo-700 text-sm mb-3">Houses CPU socket, RAM slots, expansion slots, and connectors for storage and I/O.</p>
      <ul class="text-indigo-700 text-sm mb-3">
        <li><strong>• Chipset:</strong> Controls communication between CPU, RAM, and peripherals, determining compatibility.</li>
        <li><strong>• BIOS/UEFI:</strong> Firmware initializing hardware during boot, critical for system startup.</li>
      </ul>
      <p class="text-indigo-700 text-sm mb-3">Common Issues: Damaged circuits, failing capacitors, BIOS corruption, faulty ports.</p>
      <div class="my-4 flex justify-center">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/b2pd3Y6aBag" title="Motherboards Explained" frameborder="0" allowfullscreen class="rounded-xl shadow-lg w-full max-w-2xl min-h-[315px]"></iframe>
      </div>
    </div>
    <div class="bg-purple-50 p-4 rounded-lg mb-4">
      <h5 class="font-semibold text-purple-800 mb-2">Chipset - The Traffic Controller</h5>
      <p class="text-purple-700 text-sm mb-3">The chipset acts as a traffic controller, ensuring smooth data flow between components. For example, Intel’s Z790 chipset supports high-end CPUs and fast storage. Learners will study chipsets to ensure hardware compatibility during repairs or upgrades, avoiding system mismatches.</p>
    </div>
    <div class="bg-yellow-50 p-4 rounded-lg mb-4">
      <h5 class="font-semibold text-yellow-800 mb-2">BIOS/UEFI - The Startup Manual</h5>
      <p class="text-yellow-700 text-sm mb-3">BIOS/UEFI is the first step in booting a computer, checking hardware readiness before loading the OS. UEFI’s modern interface offers faster startups and advanced features. Learners will learn to access and update BIOS/UEFI to resolve boot issues, ensuring systems start reliably.</p>
    </div>
    <div class="bg-red-50 p-4 rounded-lg mb-4">
      <h5 class="font-semibold text-red-800 mb-2">Common Issues</h5>
      <ul class="text-red-700 text-sm mb-2">
        <li>• Damaged circuits, failing capacitors</li>
        <li>• BIOS corruption</li>
        <li>• Faulty ports or connectors</li>
      </ul>
    </div>
    <div class="bg-gray-100 p-4 rounded-lg">
      <h5 class="font-semibold text-gray-800 mb-2">🎥 Educational Video:</h5>
      <p class="text-gray-700 text-sm">Motherboards Explained</p>
    </div>
  </div>
`;
