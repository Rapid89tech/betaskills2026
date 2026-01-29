
export const storageContent = `
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-2xl font-bold text-gray-800 mb-4">Storage Devices: HDD, SSD, NVMe</h3>
    <div class="grid md:grid-cols-3 gap-4 mb-6">
      <div class="border rounded-lg p-4">
        <h5 class="font-semibold text-blue-600 mb-2">Hard Disk Drive (HDD)</h5>
        <p class="text-sm text-gray-700 mb-2"><strong>Definition:</strong> Uses spinning magnetic platters for data storage, offering large capacities at low cost.</p>
        <ul class="text-sm text-gray-700 mb-2">
          <li>• Capacity: Ranges from 500GB to several TB, ideal for mass storage.</li>
          <li>• Speed: Slower read/write speeds (80-160 MB/s) due to mechanical parts.</li>
          <li>• Common Issues: Clicking noises, bad sectors, mechanical failure.</li>
        </ul>
        <div class="my-2 flex justify-center">
          <iframe width="320" height="180" src="https://www.youtube.com/embed/r3Jy5dHOj3g" title="HDD Explained" frameborder="0" allowfullscreen class="rounded-xl shadow-lg w-full max-w-xs min-h-[180px]"></iframe>
        </div>
      </div>
      <div class="border rounded-lg p-4">
        <h5 class="font-semibold text-green-600 mb-2">Solid State Drive (SSD)</h5>
        <p class="text-sm text-gray-700 mb-2"><strong>Definition:</strong> Uses NAND flash memory for faster, more durable storage than HDDs.</p>
        <ul class="text-sm text-gray-700 mb-2">
          <li>• Speed: 200-550 MB/s for SATA SSDs, enhancing system responsiveness.</li>
          <li>• Durability: No moving parts, resistant to shock and vibration.</li>
          <li>• Common Issues: Firmware bugs, wear leveling over time.</li>
        </ul>
        <div class="my-2 flex justify-center">
          <iframe width="320" height="180" src="https://www.youtube.com/embed/r3Jy5dHOj3g" title="SSD Explained" frameborder="0" allowfullscreen class="rounded-xl shadow-lg w-full max-w-xs min-h-[180px]"></iframe>
        </div>
      </div>
      <div class="border rounded-lg p-4">
        <h5 class="font-semibold text-purple-600 mb-2">NVMe SSD</h5>
        <p class="text-sm text-gray-700 mb-2"><strong>Definition:</strong> High-speed SSD interface using PCIe for ultra-fast data transfer.</p>
        <ul class="text-sm text-gray-700 mb-2">
          <li>• Speed: 2000-7000 MB/s, ideal for high-performance tasks.</li>
          <li>• Form Factors: M.2 or U.2, requiring specific motherboard slots.</li>
          <li>• Common Issues: Overheating, driver support needs.</li>
        </ul>
        <div class="my-2 flex justify-center">
          <iframe width="320" height="180" src="https://www.youtube.com/embed/AXoDZF61-c4" title="NVMe Explained" frameborder="0" allowfullscreen class="rounded-xl shadow-lg w-full max-w-xs min-h-[180px]"></iframe>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg mb-4">
      <h4 class="font-bold text-lg mb-3 text-gray-800">Storage Comparison Table</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 p-2 text-left">Feature</th>
              <th class="border border-gray-300 p-2 text-left">HDD</th>
              <th class="border border-gray-300 p-2 text-left">SSD</th>
              <th class="border border-gray-300 p-2 text-left">NVMe SSD</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white">
              <td class="border border-gray-300 p-2 font-semibold">Storage Type</td>
              <td class="border border-gray-300 p-2">Magnetic disks</td>
              <td class="border border-gray-300 p-2">NAND Flash memory</td>
              <td class="border border-gray-300 p-2">NAND Flash with PCIe interface</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-2 font-semibold">Speed</td>
              <td class="border border-gray-300 p-2">~80-160 MB/s</td>
              <td class="border border-gray-300 p-2">~200-550 MB/s</td>
              <td class="border border-gray-300 p-2">~2000-7000 MB/s</td>
            </tr>
            <tr class="bg-white">
              <td class="border border-gray-300 p-2 font-semibold">Durability</td>
              <td class="border border-gray-300 p-2">Sensitive to shock</td>
              <td class="border border-gray-300 p-2">Shock resistant</td>
              <td class="border border-gray-300 p-2">Shock resistant</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-2 font-semibold">Cost per GB</td>
              <td class="border border-gray-300 p-2">Lowest</td>
              <td class="border border-gray-300 p-2">Moderate</td>
              <td class="border border-gray-300 p-2">Highest</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="bg-blue-50 p-4 rounded-lg mb-4">
      <h5 class="font-semibold text-blue-800 mb-2">Practical Tips</h5>
      <ul class="text-blue-700 text-sm mb-2">
        <li>• Always check motherboard compatibility for NVMe slots before purchasing</li>
        <li>• Use SSDs for faster boot times and improved system responsiveness</li>
        <li>• Back up important data regularly regardless of storage type</li>
        <li>• Monitor SSD health with manufacturer utilities to track wear levels</li>
      </ul>
    </div>
    <div class="bg-gray-100 p-4 rounded-lg">
      <h5 class="font-semibold text-gray-800 mb-2">🎥 Educational Video:</h5>
      <p class="text-gray-700 text-sm">SSD vs HDD vs NVMe vs SATA vs mSATA vs M2: Storage Devices EXPLAINED!</p>
    </div>
  </div>
`;
