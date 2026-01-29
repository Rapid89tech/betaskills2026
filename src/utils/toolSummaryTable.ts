export const getToolSummaryTable = () => {
  return `
    <div class="bg-gray-100 p-6 rounded-lg">
      <h4 class="font-bold text-lg mb-3 text-gray-800">## Summary</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 p-2 text-left bg-blue-100">Tool</th>
              <th class="border border-gray-300 p-2 text-left bg-purple-100">Primary Use</th>
              <th class="border border-gray-300 p-2 text-left bg-pink-100">Key Safety Tip</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white">
              <td class="border border-gray-300 p-2 font-semibold">Hammer</td>
              <td class="border border-gray-300 p-2">Driving nails, shaping materials</td>
              <td class="border border-gray-300 p-2">Wear eye protection</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-2 font-semibold">Tin Snips</td>
              <td class="border border-gray-300 p-2">Cutting sheet metal</td>
              <td class="border border-gray-300 p-2">Use gloves to avoid cuts</td>
            </tr>
            <tr class="bg-white">
              <td class="border border-gray-300 p-2 font-semibold">Chalk Line</td>
              <td class="border border-gray-300 p-2">Marking straight lines</td>
              <td class="border border-gray-300 p-2">Keep chalk dry</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-2 font-semibold">Tape Measure</td>
              <td class="border border-gray-300 p-2">Measuring lengths</td>
              <td class="border border-gray-300 p-2">Retract carefully to avoid injury</td>
            </tr>
            <tr class="bg-white">
              <td class="border border-gray-300 p-2 font-semibold">Utility Knife</td>
              <td class="border border-gray-300 p-2">Cutting roofing materials</td>
              <td class="border border-gray-300 p-2">Cut away from body</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-2 font-semibold">Pry Bar</td>
              <td class="border border-gray-300 p-2">Removing nails, prying materials</td>
              <td class="border border-gray-300 p-2">Use leverage properly</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 p-4 bg-blue-50 rounded-lg">
        <p class="text-blue-800 text-sm"><strong>Note:</strong> This table provides a comprehensive overview of essential tools, their primary functions, and key safety considerations. Always follow proper safety protocols when using any tools.</p>
      </div>
    </div>
  `;
};

export const getPowerToolSummaryTable = () => {
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

export const getToolSummaryData = () => {
  return [
    {
      name: 'Hammer',
      primaryUse: 'Driving nails, shaping materials',
      safetyTip: 'Wear eye protection'
    },
    {
      name: 'Tin Snips',
      primaryUse: 'Cutting sheet metal',
      safetyTip: 'Use gloves to avoid cuts'
    },
    {
      name: 'Chalk Line',
      primaryUse: 'Marking straight lines',
      safetyTip: 'Keep chalk dry'
    },
    {
      name: 'Tape Measure',
      primaryUse: 'Measuring lengths',
      safetyTip: 'Retract carefully to avoid injury'
    },
    {
      name: 'Utility Knife',
      primaryUse: 'Cutting roofing materials',
      safetyTip: 'Cut away from body'
    },
    {
      name: 'Pry Bar',
      primaryUse: 'Removing nails, prying materials',
      safetyTip: 'Use leverage properly'
    }
  ];
};

export const getPowerToolSummaryData = () => {
  return [
    {
      name: 'Nail Gun',
      primaryUse: 'Fastening nails',
      advantages: 'Speed, consistent depth',
      safetyTip: 'Never disable safety features'
    },
    {
      name: 'Drill',
      primaryUse: 'Drilling holes, driving screws',
      advantages: 'Versatile, portable options',
      safetyTip: 'Use correct bit, secure material'
    },
    {
      name: 'Saw',
      primaryUse: 'Cutting roofing materials',
      advantages: 'Efficient, various blade options',
      safetyTip: 'Keep hands clear of blade'
    }
  ];
};
