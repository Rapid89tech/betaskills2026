// Utility to fix broken power tools table
export const fixBrokenPowerToolsTable = () => {
  return `
    <div class="bg-gray-100 p-6 rounded-lg">
      <h4 class="font-bold text-lg mb-3 text-gray-800">## Summary</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 p-2 text-left bg-blue-100">Power Tool</th>
              <th class="border border-gray-300 p-2 text-left bg-purple-100">Primary Use</th>
              <th class="border border-gray-300 p-2 text-left bg-green-100">Advantages</th>
              <th class="border border-gray-300 p-2 text-left bg-pink-100">Key Safety Tip</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white">
              <td class="border border-gray-300 p-2 font-semibold">Nail Gun</td>
              <td class="border border-gray-300 p-2">Fastening nails</td>
              <td class="border border-gray-300 p-2">Speed, consistent depth</td>
              <td class="border border-gray-300 p-2">Never disable safety features</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-2 font-semibold">Drill</td>
              <td class="border border-gray-300 p-2">Drilling holes, driving screws</td>
              <td class="border border-gray-300 p-2">Versatile, portable options</td>
              <td class="border border-gray-300 p-2">Use correct bit, secure material</td>
            </tr>
            <tr class="bg-white">
              <td class="border border-gray-300 p-2 font-semibold">Saw</td>
              <td class="border border-gray-300 p-2">Cutting roofing materials</td>
              <td class="border border-gray-300 p-2">Efficient, various blade options</td>
              <td class="border border-gray-300 p-2">Keep hands clear of blade</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 p-4 bg-blue-50 rounded-lg">
        <p class="text-blue-800 text-sm"><strong>Note:</strong> This table provides a comprehensive overview of essential power tools, their primary functions, advantages, and key safety considerations. Always follow proper safety protocols when using power tools.</p>
      </div>
    </div>
  `;
};

// Function to replace broken table content in course materials
export const replaceBrokenTableInContent = (content: string): string => {
  // Pattern to match the broken table structure
  const brokenTablePattern = /\\|\\s*Advantages\\s*\\|\\s*Key Safety Tip\\s*\\|\\s*\\n\\|\\s*[-\\s|]+\\s*\\|\\s*\\n((?:\\|[^|\\n]*\\|[^|\\n]*\\|\\s*\\n?)*)/g;
  
  // Replace with the fixed table
  return content.replace(brokenTablePattern, fixBrokenPowerToolsTable());
};

// Function to check if content contains broken table
export const hasBrokenTable = (content: string): boolean => {
  return content.includes('undefined') && 
         content.includes('Speed, consistent depth') && 
         content.includes('Advantages') && 
         content.includes('Key Safety Tip');
};

// Function to get the corrected data structure
export const getCorrectedPowerToolsData = () => {
  return [
    {
      powerTool: 'Nail Gun',
      primaryUse: 'Fastening nails',
      advantages: 'Speed, consistent depth',
      safetyTip: 'Never disable safety features'
    },
    {
      powerTool: 'Drill',
      primaryUse: 'Drilling holes, driving screws',
      advantages: 'Versatile, portable options',
      safetyTip: 'Use correct bit, secure material'
    },
    {
      powerTool: 'Saw',
      primaryUse: 'Cutting roofing materials',
      advantages: 'Efficient, various blade options',
      safetyTip: 'Keep hands clear of blade'
    }
  ];
};
