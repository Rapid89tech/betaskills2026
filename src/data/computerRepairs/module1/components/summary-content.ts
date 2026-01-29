
export const summaryContent = `
  <div class="bg-gray-100 p-6 rounded-lg">
    <h4 class="font-bold text-lg mb-3 text-gray-800">Hardware Summary Table</h4>
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 p-2 text-left">Component</th>
            <th class="border border-gray-300 p-2 text-left">Function</th>
            <th class="border border-gray-300 p-2 text-left">Common Problems</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white">
            <td class="border border-gray-300 p-2 font-semibold">CPU</td>
            <td class="border border-gray-300 p-2">Processes instructions and tasks</td>
            <td class="border border-gray-300 p-2">Overheating, compatibility</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 p-2 font-semibold">RAM</td>
            <td class="border border-gray-300 p-2">Temporary fast-access memory</td>
            <td class="border border-gray-300 p-2">Faulty modules, blue screens</td>
          </tr>
          <tr class="bg-white">
            <td class="border border-gray-300 p-2 font-semibold">Motherboard</td>
            <td class="border border-gray-300 p-2">Connects all components</td>
            <td class="border border-gray-300 p-2">Damaged circuits, BIOS issues</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 p-2 font-semibold">PSU</td>
            <td class="border border-gray-300 p-2">Powers the computer</td>
            <td class="border border-gray-300 p-2">Power failures, overheating</td>
          </tr>
          <tr class="bg-white">
            <td class="border border-gray-300 p-2 font-semibold">GPU</td>
            <td class="border border-gray-300 p-2">Renders graphics</td>
            <td class="border border-gray-300 p-2">Driver issues, overheating</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-6 p-4 bg-blue-50 rounded-lg">
      <p class="text-blue-800 text-sm"><strong>Note:</strong> This table summarizes the key hardware components, their functions, and common problems. Use it as a quick reference for troubleshooting and review.</p>
    </div>
  </div>
`;
