
import type { Module } from '@/types/course';

export const module3Diagnostics: Module = {
  id: 3,
  title: 'Engine Lubrication and Cooling Systems',
  description: 'Understanding lubrication and cooling systems, diagnosing problems, and proper maintenance',
  lessons: [
    {
      id: 8,
      title: 'Engine Lubrication Systems',
      duration: '60 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/MEoRP2gOFWQ',
        textContent: `
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-3xl font-bold text-blue-600 mb-6">Engine Lubrication Systems</h2>
              
              <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-3">🛢️ Why Lubrication Is Critical</h3>
                <p class="text-blue-700 mb-3">
                  Lubrication is essential for diesel engines to reduce friction, transfer heat, clean contaminants, and prevent corrosion on metal surfaces.
                </p>
              </div>

              <div class="grid md:grid-cols-3 gap-6 mb-6">
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-green-800 mb-3">🔧 Oil Pump</h4>
                  <ul class="text-sm text-green-600 space-y-1">
                    <li>• Heart of lubrication system</li>
                    <li>• Pressurizes and circulates oil</li>
                    <li>• Driven by crankshaft or camshaft</li>
                    <li>• Ensures proper flow to all components</li>
                  </ul>
                </div>

                <div class="bg-orange-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-orange-800 mb-3">🌊 Oil Galleries</h4>
                  <ul class="text-sm text-orange-600 space-y-1">
                    <li>• Internal engine passages</li>
                    <li>• Deliver oil to critical components</li>
                    <li>• Must remain clear of debris</li>
                    <li>• Connect bearings and valve trains</li>
                  </ul>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-purple-800 mb-3">❄️ Oil Coolers</h4>
                  <ul class="text-sm text-purple-600 space-y-1">
                    <li>• Heat exchangers for oil</li>
                    <li>• Prevent oil breakdown</li>
                    <li>• Integrated or external mounting</li>
                    <li>• Essential for high-load operations</li>
                  </ul>
                </div>
              </div>

              <div class="bg-red-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-red-800 mb-3">⚠️ Common Lubrication Problems</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-semibold text-red-700 mb-2">Oil Leaks:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Worn gaskets or seals</li>
                      <li>• Cracked oil lines</li>
                      <li>• Clogged PCV system</li>
                      <li>• Environmental contamination</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-red-700 mb-2">Low Oil Pressure:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Worn bearings</li>
                      <li>• Failing oil pump</li>
                      <li>• Insufficient oil level</li>
                      <li>• Risk of catastrophic failure</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg">
                <h3 class="text-xl font-semibold text-yellow-800 mb-3">🧪 Oil Contamination Types</h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b">
                        <th class="text-left p-2">Contaminant</th>
                        <th class="text-left p-2">Source</th>
                        <th class="text-left p-2">Consequence</th>
                      </tr>
                    </thead>
                    <tbody class="text-gray-600">
                      <tr class="border-b">
                        <td class="p-2 font-medium">Dirt/Debris</td>
                        <td class="p-2">External sources, damaged air intake</td>
                        <td class="p-2">Accelerated wear</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2 font-medium">Metal Particles</td>
                        <td class="p-2">Internal engine wear</td>
                        <td class="p-2">Sludge formation</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2 font-medium">Fuel Dilution</td>
                        <td class="p-2">Incomplete combustion</td>
                        <td class="p-2">Reduced oil efficiency</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2 font-medium">Coolant</td>
                        <td class="p-2">Failed head gasket</td>
                        <td class="p-2">Gallery blockage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 9,
      title: 'Cooling Systems',
      duration: '65 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/Yh8-0bj3_sI',
        textContent: `
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-3xl font-bold text-blue-600 mb-6">Engine Cooling Systems</h2>
              
              <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-3">🌡️ Cooling System Role</h3>
                <p class="text-blue-700 mb-3">
                  The cooling system maintains stable engine temperature, prevents overheating, and ensures efficient combustion by keeping cylinder temperatures within optimal ranges.
                </p>
              </div>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-green-800 mb-3">🔧 Key Components</h4>
                  <ul class="text-sm text-green-600 space-y-1">
                    <li>• <strong>Radiator:</strong> Transfers heat to air</li>
                    <li>• <strong>Water Pump:</strong> Circulates coolant</li>
                    <li>• <strong>Thermostat:</strong> Regulates flow</li>
                    <li>• <strong>Coolant:</strong> Heat transfer medium</li>
                  </ul>
                </div>

                <div class="bg-orange-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-orange-800 mb-3">🚨 Overheating Symptoms</h4>
                  <ul class="text-sm text-orange-600 space-y-1">
                    <li>• Rising temperature gauge</li>
                    <li>• Steam from radiator</li>
                    <li>• Reduced engine power</li>
                    <li>• Increased engine noise</li>
                  </ul>
                </div>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-purple-800 mb-3">🔍 Common Overheating Causes</h3>
                <div class="grid md:grid-cols-3 gap-4">
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Low Coolant</h4>
                    <p class="text-sm text-gray-700">Leaks, loose clamps, failing hoses</p>
                  </div>
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Clogged Radiator</h4>
                    <p class="text-sm text-gray-700">Debris, rust, scale buildup</p>
                  </div>
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Failing Components</h4>
                    <p class="text-sm text-gray-700">Water pump, thermostat issues</p>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-yellow-800 mb-3">🔧 Component Replacement</h3>
                <div class="space-y-4">
                  <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="font-semibold text-yellow-700">Thermostat Replacement:</h4>
                    <ol class="text-sm text-gray-600 list-decimal list-inside mt-2">
                      <li>Drain coolant to below thermostat level</li>
                      <li>Remove housing and old thermostat</li>
                      <li>Install new thermostat and gasket</li>
                      <li>Refill system and test operation</li>
                    </ol>
                  </div>
                  <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="font-semibold text-yellow-700">Water Pump Replacement:</h4>
                    <ol class="text-sm text-gray-600 list-decimal list-inside mt-2">
                      <li>Drain coolant completely</li>
                      <li>Remove belts or chains</li>
                      <li>Replace pump and seals</li>
                      <li>Check hoses and connections</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div class="bg-red-50 p-4 rounded-lg">
                <h3 class="text-xl font-semibold text-red-800 mb-3">⚠️ Safety Reminder</h3>
                <p class="text-red-700">
                  <strong>Always allow engine to cool before servicing cooling system components.</strong> 
                  Hot coolant under pressure can cause severe burns.
                </p>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 10,
      title: 'Maintenance Schedules',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/maintenance-schedules',
        textContent: `
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-3xl font-bold text-blue-600 mb-6">Lubrication & Cooling Maintenance</h2>
              
              <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibent text-blue-800 mb-3">📅 Maintenance Importance</h3>
                <p class="text-blue-700 mb-3">
                  Proper maintenance schedules prevent costly repairs, extend engine life, and ensure reliable performance. Regular inspections identify problems before they become major failures.
                </p>
              </div>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-green-800 mb-3">🛢️ Lubrication Maintenance</h4>
                  <div class="space-y-3">
                    <div>
                      <h5 class="font-semibold text-green-700">Oil Changes:</h5>
                      <ul class="text-sm text-green-600 mt-1">
                        <li>• Follow manufacturer intervals</li>
                        <li>• Use correct oil grade/viscosity</li>
                        <li>• Replace oil filter every change</li>
                      </ul>
                    </div>
                    <div>
                      <h5 class="font-semibold text-green-700">Routine Inspections:</h5>
                      <ul class="text-sm text-green-600 mt-1">
                        <li>• Check for leaks around seals</li>
                        <li>• Monitor oil pressure readings</li>
                        <li>• Test for contamination</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-orange-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-orange-800 mb-3">❄️ Cooling Maintenance</h4>
                  <div class="space-y-3">
                    <div>
                      <h5 class="font-semibold text-orange-700">Coolant Service:</h5>
                      <ul class="text-sm text-orange-600 mt-1">
                        <li>• Replace per service intervals</li>
                        <li>• Perform complete system flush</li>
                        <li>• Use proper coolant mixture</li>
                      </ul>
                    </div>
                    <div>
                      <h5 class="font-semibold text-orange-700">Component Checks:</h5>
                      <ul class="text-sm text-orange-600 mt-1">
                        <li>• Inspect radiator for damage</li>
                        <li>• Check hoses for cracks</li>
                        <li>• Test thermostat operation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-purple-800 mb-3">📊 Recommended Service Intervals</h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b">
                        <th class="text-left p-2">Service Item</th>
                        <th class="text-left p-2">Interval</th>
                        <th class="text-left p-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody class="text-gray-600">
                      <tr class="border-b">
                        <td class="p-2 font-medium">Engine Oil Change</td>
                        <td class="p-2">5,000-15,000 miles</td>
                        <td class="p-2">Varies by application</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2 font-medium">Oil Filter</td>
                        <td class="p-2">Every oil change</td>
                        <td class="p-2">Critical for filtration</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2 font-medium">Coolant Change</td>
                        <td class="p-2">100,000-150,000 miles</td>
                        <td class="p-2">Or 5-7 years</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2 font-medium">System Flush</td>
                        <td class="p-2">Every 2-3 coolant changes</td>
                        <td class="p-2">Removes buildup</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2 font-medium">Hose Inspection</td>
                        <td class="p-2">Annual</td>
                        <td class="p-2">Look for cracks/swelling</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg">
                <h3 class="text-xl font-semibold text-yellow-800 mb-3">🌡️ Seasonal Considerations</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-semibold text-yellow-700 mb-2">Summer Preparation:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Check radiator airflow</li>
                      <li>• Inspect cooling fans</li>
                      <li>• Verify proper coolant mixture</li>
                      <li>• Test thermostat operation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-yellow-700 mb-2">Winter Preparation:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Ensure freeze protection</li>
                      <li>• Check block heater operation</li>
                      <li>• Use appropriate oil viscosity</li>
                      <li>• Inspect heating system</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 11,
      title: 'Module 3 Assessment',
      duration: '30 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the primary role of the oil pump in a diesel engine?',
            options: [
              'To keep coolant circulating through the radiator',
              'To circulate oil under pressure through the engine\'s lubrication system',
              'To adjust the compression ratio',
              'To reduce emissions from the exhaust system'
            ],
            correct: 1,
            explanation: 'The oil pump is the heart of the lubrication system, circulating oil under pressure to all engine components.'
          },
          {
            question: 'What component is responsible for removing heat from the engine oil?',
            options: [
              'Water pump',
              'Thermostat',
              'Oil cooler',
              'Radiator'
            ],
            correct: 2,
            explanation: 'Oil coolers are heat exchangers specifically designed to remove excess heat from engine oil.'
          },
          {
            question: 'Which of the following could cause low oil pressure?',
            options: [
              'A failing oil pump',
              'A clogged PCV valve',
              'A damaged coolant hose',
              'A worn timing chain'
            ],
            correct: 0,
            explanation: 'A failing oil pump cannot generate adequate pressure to circulate oil throughout the engine.'
          },
          {
            question: 'What can lead to oil contamination?',
            options: [
              'Using synthetic oil',
              'Fuel dilution or coolant intrusion',
              'Replacing the oil filter regularly',
              'Properly functioning oil galleries'
            ],
            correct: 1,
            explanation: 'Fuel dilution from incomplete combustion or coolant intrusion from failed gaskets can contaminate engine oil.'
          },
          {
            question: 'Which cooling system component regulates coolant flow to maintain the engine\'s temperature?',
            options: [
              'Water pump',
              'Radiator cap',
              'Thermostat',
              'Expansion tank'
            ],
            correct: 2,
            explanation: 'The thermostat is a temperature-sensitive valve that opens and closes to regulate coolant flow.'
          },
          {
            question: 'What is a common symptom of a clogged radiator?',
            options: [
              'Lower engine noise',
              'Overheating and reduced coolant flow',
              'Increased oil pressure',
              'Longer oil change intervals'
            ],
            correct: 1,
            explanation: 'A clogged radiator restricts coolant flow and reduces heat dissipation, causing overheating.'
          },
          {
            question: 'Which type of coolant is typically used in modern diesel engines?',
            options: [
              'Pure water',
              'A mix of water and ethylene glycol-based antifreeze',
              'Synthetic oil-based coolant',
              'Kerosene'
            ],
            correct: 1,
            explanation: 'Modern diesel engines use a mixture of water and ethylene glycol-based antifreeze for freeze protection and corrosion prevention.'
          },
          {
            question: 'What should you check first if a diesel engine is overheating?',
            options: [
              'The ignition timing',
              'The radiator cap and coolant level',
              'The fuel injector spray pattern',
              'The alternator voltage output'
            ],
            correct: 1,
            explanation: 'Low coolant level is the most common cause of overheating and should be checked first.'
          },
          {
            question: 'Why is it important to follow a proper maintenance schedule for the lubrication and cooling systems?',
            options: [
              'To increase engine size',
              'To ensure reliable performance and extend the engine\'s lifespan',
              'To decrease the need for coolant and oil changes',
              'To eliminate the need for routine inspections'
            ],
            correct: 1,
            explanation: 'Proper maintenance prevents costly repairs, extends engine life, and ensures reliable performance.'
          }
        ]
      }
    }
  ]
};
