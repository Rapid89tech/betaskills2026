import type { Module } from '@/types/course';

export const module7Maintenance: Module = {
  id: 7,
  title: 'Diesel Engine Maintenance and Preventative Care',
  description: 'Establishing maintenance intervals, best practices for fleet maintenance, and strategies for extending component life.',
  lessons: [
    {
      id: 13,
      title: 'Establishing Maintenance Intervals',
      duration: '60 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/2wQpX7abvEM',
        textContent: `
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-3xl font-bold text-blue-600 mb-6">Module 7: Diesel Engine Maintenance and Preventative Care</h2>
              
              <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-3">🛠️ Maintenance Intervals Overview</h3>
                <p class="text-blue-700 mb-3">
                  Proper maintenance intervals are crucial for diesel engine longevity, performance, and reliability. This section covers establishing appropriate schedules for oil changes, filter replacements, and coolant maintenance.
                </p>
              </div>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-green-800 mb-3">🛢️ Oil Changes and Lubrication</h4>
                  <ul class="text-sm text-green-600 space-y-1">
                    <li>• Keeps engine lubricated and reduces friction</li>
                    <li>• Removes contaminants and combustion byproducts</li>
                    <li>• Extends life of bearings, camshafts, and rings</li>
                    <li>• Follow manufacturer guidelines</li>
                    <li>• Consider operating conditions and environment</li>
                  </ul>
                </div>

                <div class="bg-orange-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-orange-800 mb-3">🔧 Filter Replacements</h4>
                  <ul class="text-sm text-orange-600 space-y-1">
                    <li>• Oil Filter: Replace with every oil change</li>
                    <li>• Fuel Filter: Per manufacturer specifications</li>
                    <li>• Air Filter: Based on operating conditions</li>
                    <li>• More frequent in dusty environments</li>
                    <li>• Clean filters improve efficiency</li>
                  </ul>
                </div>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-purple-800 mb-3">💧 Coolant System Maintenance</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-semibold text-purple-700 mb-2">Importance:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Maintains optimal engine temperatures</li>
                      <li>• Prevents corrosion and buildup</li>
                      <li>• Protects against freezing and boiling</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-purple-700 mb-2">Maintenance Tips:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Check coolant levels regularly</li>
                      <li>• Use correct coolant type</li>
                      <li>• Perform periodic coolant flushes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-yellow-800 mb-3">⚠️ Key Indicators for Maintenance</h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b">
                        <th class="text-left p-2">Component</th>
                        <th class="text-left p-2">Warning Signs</th>
                        <th class="text-left p-2">Action Required</th>
                      </tr>
                    </thead>
                    <tbody class="text-gray-600">
                      <tr class="border-b">
                        <td class="p-2 font-medium">Engine Oil</td>
                        <td class="p-2">Dark, thick, or contaminated oil</td>
                        <td class="p-2">Immediate oil change</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2 font-medium">Fuel Economy</td>
                        <td class="p-2">Noticeable decrease in MPG</td>
                        <td class="p-2">Check filters and service</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2 font-medium">Oil Pressure</td>
                        <td class="p-2">Pressure fluctuations</td>
                        <td class="p-2">Investigate and service</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="bg-red-50 p-4 rounded-lg">
                <h3 class="text-xl font-semibold text-red-800 mb-3">📋 Operating Conditions Considerations</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-semibold text-red-700 mb-2">Severe Conditions:</h4>
                    <ul class="text-sm text-red-600 space-y-1">
                      <li>• Heavy loads and towing</li>
                      <li>• Extreme temperatures</li>
                      <li>• Stop-and-go traffic</li>
                      <li>• Dusty environments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-red-700 mb-2">Adjustments Needed:</h4>
                    <ul class="text-sm text-red-600 space-y-1">
                      <li>• Shorter maintenance intervals</li>
                      <li>• More frequent filter changes</li>
                      <li>• Enhanced monitoring</li>
                      <li>• Premium fluids and parts</li>
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
      id: 14,
      title: 'Fleet Maintenance and Recordkeeping',
      duration: '60 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/fleet-management-video',
        textContent: `
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-3xl font-bold text-blue-600 mb-6">Fleet Maintenance and Recordkeeping Best Practices</h2>
              
              <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-3">🚛 Fleet Standardization</h3>
                <p class="text-blue-700 mb-3">
                  Standardizing maintenance schedules across a fleet ensures consistency, reduces costs, and improves reliability. Proper recordkeeping supports compliance and warranty claims.
                </p>
              </div>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-green-800 mb-3">📅 Maintenance Calendar</h4>
                  <ul class="text-sm text-green-600 space-y-1">
                    <li>• Detailed plan with clear intervals</li>
                    <li>• Oil changes and filter replacements</li>
                    <li>• Regular inspections schedule</li>
                    <li>• Fleet management software integration</li>
                    <li>• Automated notifications and reminders</li>
                  </ul>
                </div>

                <div class="bg-orange-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-orange-800 mb-3">⚙️ Operating Condition Adjustments</h4>
                  <ul class="text-sm text-orange-600 space-y-1">
                    <li>• Different intervals for severe conditions</li>
                    <li>• Stop-and-go traffic considerations</li>
                    <li>• Extreme weather adjustments</li>
                    <li>• Performance data review</li>
                    <li>• Schedule optimization</li>
                  </ul>
                </div>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-purple-800 mb-3">📊 Effective Recordkeeping</h3>
                <div class="grid md:grid-cols-3 gap-4">
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Service History</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Every maintenance activity</li>
                      <li>• Date, mileage, engine hours</li>
                      <li>• Parts used and technician notes</li>
                    </ul>
                  </div>
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Cost Tracking</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Repair costs and parts</li>
                      <li>• Labor time tracking</li>
                      <li>• Downtime logs</li>
                    </ul>
                  </div>
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Compliance</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Regulatory standards</li>
                      <li>• Warranty documentation</li>
                      <li>• Audit trail maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-yellow-800 mb-3">💻 Digital Tools for Fleet Management</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-semibold text-yellow-700 mb-2">Fleet Management Software:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Automated maintenance reminders</li>
                      <li>• Digital record storage</li>
                      <li>• Maintenance report generation</li>
                      <li>• Cost analysis and tracking</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-yellow-700 mb-2">Telematics Integration:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Real-time engine performance monitoring</li>
                      <li>• GPS data integration</li>
                      <li>• Early issue identification</li>
                      <li>• Diagnostic data collection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-red-50 p-4 rounded-lg">
                <h3 class="text-xl font-semibold text-red-800 mb-3">📈 Benefits of Proper Fleet Management</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-semibold text-red-700 mb-2">Cost Savings:</h4>
                    <ul class="text-sm text-red-600 space-y-1">
                      <li>• Reduced unexpected breakdowns</li>
                      <li>• Lower repair costs</li>
                      <li>• Improved fuel efficiency</li>
                      <li>• Extended component life</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-red-700 mb-2">Operational Benefits:</h4>
                    <ul class="text-sm text-red-600 space-y-1">
                      <li>• Minimized downtime</li>
                      <li>• Improved reliability</li>
                      <li>• Better compliance tracking</li>
                      <li>• Enhanced safety</li>
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
      id: 15,
      title: 'Predictive Maintenance and Data Analysis',
      duration: '45 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/predictive-maintenance-video',
        textContent: `
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-3xl font-bold text-blue-600 mb-6">Predictive Maintenance and Data Analysis</h2>
              
              <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-3">📊 Using Data to Predict Failures</h3>
                <p class="text-blue-700 mb-3">
                  Analyzing maintenance trends and using predictive strategies can prevent major engine failures, reduce costs, and improve fleet reliability.
                </p>
              </div>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-green-800 mb-3">🔍 Analyzing Maintenance Trends</h4>
                  <ul class="text-sm text-green-600 space-y-1">
                    <li>• Identify recurring problems</li>
                    <li>• Track component lifespan patterns</li>
                    <li>• Monitor performance metrics</li>
                    <li>• Compare failure intervals</li>
                    <li>• Adjust maintenance schedules</li>
                  </ul>
                </div>

                <div class="bg-orange-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-orange-800 mb-3">⚡ Performance Indicators</h4>
                  <ul class="text-sm text-orange-600 space-y-1">
                    <li>• Fuel economy trends</li>
                    <li>• Oil pressure patterns</li>
                    <li>• Engine temperature monitoring</li>
                    <li>• Declining performance signals</li>
                    <li>• Early warning detection</li>
                  </ul>
                </div>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-purple-800 mb-3">🧪 Predictive Maintenance Strategies</h3>
                <div class="grid md:grid-cols-3 gap-4">
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Oil Analysis</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Detect wear metals</li>
                      <li>• Find contaminants</li>
                      <li>• Monitor fuel dilution</li>
                      <li>• Schedule preventive actions</li>
                    </ul>
                  </div>
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Coolant Testing</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• pH level monitoring</li>
                      <li>• Contamination detection</li>
                      <li>• Glycol concentration</li>
                      <li>• Corrosion prevention</li>
                    </ul>
                  </div>
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Digital Monitoring</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Continuous reporting</li>
                      <li>• Sensor networks</li>
                      <li>• Threshold alerts</li>
                      <li>• Immediate notifications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-yellow-800 mb-3">💡 Real-World Application Example</h3>
                <div class="bg-white p-4 rounded border">
                  <h4 class="font-semibold text-gray-800 mb-2">Case Study: Turbocharger Failure Prevention</h4>
                  <p class="text-sm text-gray-600 mb-2">
                    <strong>Problem:</strong> A fleet operator noticed a pattern of early turbocharger failures across multiple vehicles.
                  </p>
                  <p class="text-sm text-gray-600 mb-2">
                    <strong>Analysis:</strong> Oil analysis revealed contaminated oil was causing premature wear.
                  </p>
                  <p class="text-sm text-gray-600 mb-2">
                    <strong>Solution:</strong> Adjusted oil change intervals and switched to higher-quality oil.
                  </p>
                  <p class="text-sm text-gray-600">
                    <strong>Result:</strong> Eliminated turbocharger failures and significantly reduced downtime.
                  </p>
                </div>
              </div>

              <div class="bg-red-50 p-4 rounded-lg">
                <h3 class="text-xl font-semibold text-red-800 mb-3">🎯 Early Intervention Benefits</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-semibold text-red-700 mb-2">Cost Savings:</h4>
                    <ul class="text-sm text-red-600 space-y-1">
                      <li>• Prevent catastrophic failures</li>
                      <li>• Reduce repair costs</li>
                      <li>• Minimize downtime</li>
                      <li>• Extend component life</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-red-700 mb-2">Examples:</h4>
                    <ul class="text-sm text-red-600 space-y-1">
                      <li>• Replace worn bearings early</li>
                      <li>• Service failing water pumps</li>
                      <li>• Address cooling system issues</li>
                      <li>• Prevent engine block damage</li>
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
      id: 16,
      title: 'Extending Component Life',
      duration: '30 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/component-life-extension',
        textContent: `
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-3xl font-bold text-blue-600 mb-6">Tips for Extending Diesel Engine Component Life</h2>
              
              <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-3">🔧 Proactive Maintenance Habits</h3>
                <p class="text-blue-700 mb-3">
                  Small preventive actions can significantly extend the life of expensive diesel engine components, saving money and reducing downtime.
                </p>
              </div>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-green-800 mb-3">🔍 Regular Inspections</h4>
                  <ul class="text-sm text-green-600 space-y-1">
                    <li>• Check belts, hoses, and clamps</li>
                    <li>• Monitor for leaks and unusual noises</li>
                    <li>• Inspect for abnormal odors</li>
                    <li>• Verify filter condition</li>
                    <li>• Document findings</li>
                  </ul>
                </div>

                <div class="bg-orange-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-orange-800 mb-3">⭐ Quality Parts and Fluids</h4>
                  <ul class="text-sm text-orange-600 space-y-1">
                    <li>• Use OEM or high-quality aftermarket parts</li>
                    <li>• Follow manufacturer specifications</li>
                    <li>• Use recommended oil grades</li>
                    <li>• Don't mix different coolant types</li>
                    <li>• Invest in quality for longevity</li>
                  </ul>
                </div>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-purple-800 mb-3">⚡ Address Issues Quickly</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-semibold text-purple-700 mb-2">Don't Ignore:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Small leaks or drips</li>
                      <li>• Unusual engine noises</li>
                      <li>• Slight performance drops</li>
                      <li>• Warning lights or codes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-purple-700 mb-2">Quick Action Benefits:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Prevents minor issues becoming major</li>
                      <li>• Reduces repair costs</li>
                      <li>• Minimizes downtime</li>
                      <li>• Protects related components</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-yellow-800 mb-3">📚 Education and Training</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-semibold text-yellow-700 mb-2">Operator Training:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Proper warm-up procedures</li>
                      <li>• Correct shutdown protocols</li>
                      <li>• Efficient driving techniques</li>
                      <li>• Warning sign recognition</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-yellow-700 mb-2">Technician Development:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Latest maintenance techniques</li>
                      <li>• New diagnostic tools</li>
                      <li>• Emerging technologies</li>
                      <li>• Best practice updates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-red-50 p-4 rounded-lg">
                <h3 class="text-xl font-semibold text-red-800 mb-3">📋 Technical Resources</h3>
                <div class="space-y-3">
                  <div>
                    <h4 class="font-semibold text-red-700 mb-2">Stay Updated With:</h4>
                    <ul class="text-sm text-red-600 space-y-1">
                      <li>• Technical Service Bulletins (TSBs)</li>
                      <li>• Manufacturer updates and recalls</li>
                      <li>• Industry best practices</li>
                      <li>• New maintenance procedures</li>
                      <li>• Common fixes and preventive measures</li>
                    </ul>
                  </div>
                  <div class="bg-white p-3 rounded border">
                    <h5 class="font-semibold text-gray-800 mb-1">Pro Tip:</h5>
                    <p class="text-sm text-gray-600">
                      Subscribe to manufacturer newsletters and join professional forums to stay informed about the latest developments in diesel engine maintenance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 17,
      title: 'Module 7 Quiz: Maintenance and Preventative Care',
      duration: '20 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'Why is it important to establish regular oil change intervals?',
            options: [
              'To maintain proper ignition timing',
              'To remove contaminants and keep the engine lubricated',
              'To prevent coolant loss',
              'To increase fuel injection pressure'
            ],
            correct: 1,
            explanation: 'Regular oil changes remove contaminants and keep the engine properly lubricated, extending the life of critical components like bearings, camshafts, and piston rings.'
          },
          {
            question: 'Which component should typically be replaced along with an oil change?',
            options: [
              'Air filter',
              'Oil filter',
              'Coolant thermostat',
              'Fuel pump'
            ],
            correct: 1,
            explanation: 'The oil filter should be replaced with every oil change to prevent recirculation of debris and contaminants.'
          },
          {
            question: 'How often should air filters be replaced?',
            options: [
              'Once every two years regardless of operating conditions',
              'Only when the check engine light comes on',
              'At intervals recommended by the manufacturer or more frequently in dusty conditions',
              'Every time the engine coolant is changed'
            ],
            correct: 2,
            explanation: 'Air filters should be replaced at manufacturer-recommended intervals or more frequently in dusty environments to maintain optimal combustion efficiency.'
          },
          {
            question: 'What is a common indicator that a coolant system needs attention?',
            options: [
              'Low oil pressure warning',
              'Increased fuel efficiency',
              'Engine overheating or loss of coolant',
              'Decreased air intake temperature'
            ],
            correct: 2,
            explanation: 'Engine overheating or loss of coolant are clear indicators that the cooling system requires immediate attention.'
          },
          {
            question: 'Why is fleet recordkeeping important in diesel engine maintenance?',
            options: [
              'It allows technicians to skip certain maintenance steps',
              'It ensures all vehicles are maintained uniformly and compliance is documented',
              'It decreases the need for regular filter replacements',
              'It replaces the need for physical inspections'
            ],
            correct: 1,
            explanation: 'Proper recordkeeping ensures uniform maintenance across the fleet, documents compliance with regulations, and supports warranty claims.'
          },
          {
            question: 'How can maintenance data help prevent engine failures?',
            options: [
              'By reducing the need for coolant changes',
              'By identifying patterns and predicting component failures before they occur',
              'By allowing the operator to skip scheduled maintenance',
              'By automatically increasing fuel efficiency'
            ],
            correct: 1,
            explanation: 'Analyzing maintenance data helps identify patterns and predict component failures, allowing for preventive action before catastrophic failures occur.'
          },
          {
            question: 'What is a good strategy to extend the life of diesel engine components?',
            options: [
              'Use lower-quality fluids to reduce operating costs',
              'Proactively replace parts only after they fail',
              'Perform regular inspections and address minor issues early',
              'Ignore minor performance changes until they become significant'
            ],
            correct: 2,
            explanation: 'Regular inspections and addressing minor issues early prevents small problems from becoming major failures, extending component life.'
          },
          {
            question: 'Which of the following is an example of predictive maintenance?',
            options: [
              'Replacing a fuel filter at the recommended interval',
              'Using oil analysis to detect wear metals and contaminants',
              'Cleaning an air filter when it looks dirty',
              'Checking coolant levels once a month'
            ],
            correct: 1,
            explanation: 'Oil analysis to detect wear metals and contaminants is predictive maintenance - using data to predict potential failures before they occur.'
          }
        ]
      }
    }
  ]
};