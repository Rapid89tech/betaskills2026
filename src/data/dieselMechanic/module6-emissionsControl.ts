import type { Module } from '@/types/course';

export const module6EmissionsControl: Module = {
  id: 6,
  title: 'Emissions Control and Environmental Considerations',
  description: 'Master diesel emissions systems including DPFs, SCR, and EGR for compliance and performance',
  lessons: [
    {
      id: 11,
      title: 'Emissions Control and Environmental Considerations',
      duration: '240 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/Q3AqwaRaF0s',
        textContent: `
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-3xl font-bold text-blue-600 mb-6">Module 6: Emissions Control and Environmental Considerations</h2>
              
              <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-3">🌍 Learning Objectives</h3>
                <ul class="text-blue-700 space-y-2">
                  <li>• Understand the purpose and function of key diesel emissions control systems (DPFs, SCR, EGR)</li>
                  <li>• Learn to identify and diagnose common emissions-related issues</li>
                  <li>• Gain knowledge of maintenance practices that keep emissions equipment working efficiently</li>
                  <li>• Explore the environmental impact of diesel emissions and strategies for reducing them</li>
                </ul>
              </div>

              <div class="mb-8">
                <h3 class="text-2xl font-bold text-green-600 mb-4">Section 1: Diesel Emissions Systems (1 hour)</h3>
                
                <div class="space-y-6">
                  <div class="bg-green-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-green-800 mb-4">🔧 A. Diesel Particulate Filters (DPFs)</h4>
                    <div class="text-sm text-green-700 space-y-3">
                      <div>
                        <p class="font-semibold">What They Do:</p>
                        <p>Trap soot and particulate matter from exhaust gases to prevent their release into the atmosphere.</p>
                      </div>
                      <div>
                        <p class="font-semibold">How They Work:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>Exhaust gases pass through the filter, which captures soot particles</li>
                          <li>Over time, the filter undergoes regeneration—a process that burns off accumulated soot at high temperatures, turning it into ash</li>
                          <li>Regeneration can be passive (during normal driving conditions) or active (when additional fuel is injected to increase exhaust temperature)</li>
                        </ul>
                      </div>
                      <div>
                        <p class="font-semibold">Why They're Important:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>Reduce visible exhaust smoke and fine particulate emissions</li>
                          <li>Help diesel vehicles meet strict air quality standards</li>
                        </ul>
                      </div>
                      <p class="text-blue-600 font-medium">📺 YouTube: How it Works - Diesel Particulate Filter (DPF)</p>
                    </div>
                  </div>

                  <div class="bg-orange-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-orange-800 mb-4">⚗️ B. Selective Catalytic Reduction (SCR)</h4>
                    <div class="text-sm text-orange-700 space-y-3">
                      <div>
                        <p class="font-semibold">What It Is:</p>
                        <p>A system that injects a urea-based solution (commonly known as DEF, or Diesel Exhaust Fluid) into the exhaust stream.</p>
                      </div>
                      <div>
                        <p class="font-semibold">How It Works:</p>
                        <p>DEF reacts with NOx (nitrogen oxides) gases in a catalyst to produce nitrogen and water vapor—harmless byproducts.</p>
                      </div>
                      <div>
                        <p class="font-semibold">Advantages:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>Dramatically lowers NOx emissions, which contribute to smog and respiratory problems</li>
                          <li>Increases fuel efficiency since it allows the engine to run hotter and cleaner without relying solely on EGR</li>
                        </ul>
                      </div>
                      <p class="text-blue-600 font-medium">📺 YouTube: How does vehicle selective catalyst reduction (SCR) technology work?</p>
                    </div>
                  </div>

                  <div class="bg-purple-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-purple-800 mb-4">🔄 C. Exhaust Gas Recirculation (EGR)</h4>
                    <div class="text-sm text-purple-700 space-y-3">
                      <div>
                        <p class="font-semibold">Purpose:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>Recirculates a portion of exhaust gases back into the intake manifold</li>
                          <li>Reduces combustion temperatures and NOx formation</li>
                        </ul>
                      </div>
                      <div>
                        <p class="font-semibold">How It Works:</p>
                        <p>Exhaust gases are mixed with incoming air, lowering the oxygen content and peak combustion temperatures.</p>
                      </div>
                      <div>
                        <p class="font-semibold">Benefits:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>Reduces NOx emissions without additional chemicals</li>
                          <li>Maintains compliance with emissions regulations for older and newer diesel engines</li>
                        </ul>
                      </div>
                      <p class="text-blue-600 font-medium">📺 YouTube: Exhaust gas recirculation (EGR) made easy</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h3 class="text-2xl font-bold text-red-600 mb-4">Section 2: Diagnosing Emissions-Related Issues (1 hour)</h3>
                
                <div class="space-y-6">
                  <div class="bg-red-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-red-800 mb-4">🚨 A. Common DPF Problems</h4>
                    <div class="text-sm text-red-700 space-y-4">
                      <div>
                        <p class="font-semibold">Clogged or Blocked Filters:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Causes:</strong> Frequent short trips, low-speed driving, or failed regenerations</li>
                          <li><strong>Symptoms:</strong> Loss of power, increased fuel consumption, and DPF warning lights</li>
                          <li><strong>Diagnosis:</strong> Scan tool to read DPF-related codes, pressure differential sensors to measure restrictions, physical inspection for cracks or damage</li>
                        </ul>
                        <p class="text-blue-600 font-medium mt-2">📺 YouTube: How to Diagnose & Fix a Blocked DPF with an OBD Tool</p>
                      </div>
                      <div>
                        <p class="font-semibold">Failed Regeneration Cycles:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Causes:</strong> Malfunctioning temperature sensors, faulty EGR systems, or interrupted regen cycles</li>
                          <li><strong>Diagnosis:</strong> Verify sensor readings and compare to OEM specifications, check for codes related to temperature thresholds or failed regen attempts</li>
                        </ul>
                        <p class="text-blue-600 font-medium mt-2">📺 YouTube: DPF Not Regenerating/Clearing? Find Out Common Reasons & Problems Preventing DPF Regeneration</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-yellow-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-yellow-800 mb-4">⚡ B. EGR System Issues</h4>
                    <div class="text-sm text-yellow-700 space-y-4">
                      <div>
                        <p class="font-semibold">Faulty EGR Valves:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Causes:</strong> Carbon buildup, electrical failure, or sticking valves</li>
                          <li><strong>Symptoms:</strong> Rough idling, engine misfires, increased NOx emissions, and check engine lights</li>
                          <li><strong>Diagnosis:</strong> Test valve operation with a scan tool or actuator tester, remove and inspect the valve for carbon deposits</li>
                        </ul>
                        <p class="text-blue-600 font-medium mt-2">📺 YouTube: Signs Of a Bad EGR Valve, Causes & EGR VALVE Cleaning DIY Fix</p>
                      </div>
                      <div>
                        <p class="font-semibold">Clogged EGR Coolers:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Causes:</strong> Soot and carbon accumulation over time</li>
                          <li><strong>Symptoms:</strong> Overheating, coolant leaks, and decreased engine performance</li>
                          <li><strong>Diagnosis:</strong> Pressure test the cooler for leaks, visual inspection for carbon deposits and blockages</li>
                        </ul>
                        <p class="text-blue-600 font-medium mt-2">📺 YouTube: Symptoms of a bad EGR cooler</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-indigo-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-indigo-800 mb-4">💉 C. SCR System Problems</h4>
                    <div class="grid md:grid-cols-2 gap-6">
                      <div class="text-sm text-indigo-700 space-y-3">
                        <div>
                          <p class="font-semibold">Injector Malfunctions:</p>
                          <ul class="list-disc list-inside space-y-1 ml-4">
                            <li><strong>Causes:</strong> Contaminated DEF, clogged injector nozzles, or failing pumps</li>
                            <li><strong>Symptoms:</strong> Increased NOx emissions, DEF usage warning lights, and reduced fuel economy</li>
                            <li><strong>Diagnosis:</strong> Use a scan tool to check for injector codes, measure DEF quality and flow rates, inspect injector lines for leaks or blockages</li>
                          </ul>
                          <p class="text-blue-600 font-medium mt-2">📺 YouTube: How to Diagnose & Fix SCR and DEF System Issues</p>
                        </div>
                      </div>
                      <div class="text-sm text-indigo-700 space-y-3">
                        <div>
                          <p class="font-semibold">Catalyst Degradation:</p>
                          <ul class="list-disc list-inside space-y-1 ml-4">
                            <li><strong>Causes:</strong> Prolonged exposure to extreme heat or contaminants in the exhaust</li>
                            <li><strong>Symptoms:</strong> Higher NOx levels, reduced efficiency, and catalyst-related codes</li>
                            <li><strong>Diagnosis:</strong> Use a gas analyzer to measure NOx levels before and after the catalyst, check for physical damage or melting in the SCR catalyst</li>
                          </ul>
                          <p class="text-blue-600 font-medium mt-2">📺 YouTube: SCR NOx Conversion Efficiency LOW fault code on semi trucks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h3 class="text-2xl font-bold text-cyan-600 mb-4">Section 3: Maintaining Emissions Equipment for Compliance and Performance (45 minutes)</h3>
                
                <div class="space-y-6">
                  <div class="bg-cyan-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-cyan-800 mb-4">🔧 A. DPF Maintenance</h4>
                    <div class="text-sm text-cyan-700 space-y-3">
                      <div>
                        <p class="font-semibold">Monitor Regeneration Cycles:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>Ensure that the vehicle completes full regen cycles when prompted</li>
                          <li>Schedule active regeneration if driving patterns prevent passive regen</li>
                        </ul>
                      </div>
                      <div>
                        <p class="font-semibold">Clean or Replace DPFs:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>If clogged, the DPF can be removed and professionally cleaned using heat or chemicals</li>
                          <li>Replace filters that are damaged, cracked, or have reached end-of-life</li>
                        </ul>
                      </div>
                      <div>
                        <p class="font-semibold">Check Differential Pressure Sensors:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>These sensors measure the pressure difference across the DPF</li>
                          <li>Replace or recalibrate sensors if readings are out of spec</li>
                        </ul>
                      </div>
                      <p class="text-blue-600 font-medium">📺 YouTube: DPF & DPF Differential Pressure Sensor Diagnostics</p>
                    </div>
                  </div>

                  <div class="bg-emerald-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-emerald-800 mb-4">🧽 B. EGR System Maintenance</h4>
                    <div class="text-sm text-emerald-700 space-y-3">
                      <div>
                        <p class="font-semibold">Regular Cleaning of Valves and Coolers:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>Periodically clean EGR valves to prevent carbon buildup</li>
                          <li>Flush EGR coolers to maintain proper coolant flow and prevent overheating</li>
                        </ul>
                      </div>
                      <div>
                        <p class="font-semibold">Inspect and Replace Seals and Gaskets:</p>
                        <p>Check for leaks that can allow unmetered air or exhaust gases into the system.</p>
                      </div>
                      <div>
                        <p class="font-semibold">Ensure Proper Function of EGR Actuators and Sensors:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>Test actuators and position sensors during routine service</li>
                          <li>Replace faulty components to maintain consistent operation</li>
                        </ul>
                      </div>
                      <p class="text-blue-600 font-medium">📺 YouTube: Cummins EGR system: diagnose, remove, clean, replace, repair, and install</p>
                    </div>
                  </div>

                  <div class="bg-amber-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-amber-800 mb-4">💧 C. SCR System Maintenance</h4>
                    <div class="text-sm text-amber-700 space-y-3">
                      <div>
                        <p class="font-semibold">Use High-Quality DEF:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>Always use DEF that meets ISO standards to prevent contamination</li>
                          <li>Store DEF in proper conditions to avoid crystallization or degradation</li>
                        </ul>
                      </div>
                      <div>
                        <p class="font-semibold">Replace DEF Filters Regularly:</p>
                        <p>Filters in the DEF supply system must be changed according to the manufacturer's schedule.</p>
                      </div>
                      <div>
                        <p class="font-semibold">Inspect Injectors and Lines:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                          <li>Check for leaks, clogs, or signs of corrosion</li>
                          <li>Clean or replace injectors that fail flow tests</li>
                        </ul>
                      </div>
                      <p class="text-blue-600 font-medium">📺 YouTube: Troubleshooting: #1 Problem and Fix on DEF/DPF Systems</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h3 class="text-2xl font-bold text-teal-600 mb-4">Section 4: Environmental Impact and Best Practices for Reducing Emissions (30 minutes)</h3>
                
                <div class="space-y-6">
                  <div class="bg-teal-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-teal-800 mb-4">🌱 A. Environmental Impacts of Diesel Emissions</h4>
                    <div class="text-sm text-teal-700 space-y-2">
                      <ul class="list-disc list-inside space-y-2">
                        <li>Diesel engines emit NOx and particulate matter, which contribute to air pollution, smog, and respiratory health issues</li>
                        <li>Improperly maintained emissions systems can lead to higher emissions and non-compliance with regulatory standards</li>
                        <li>Effective emissions controls help reduce greenhouse gases and improve overall air quality</li>
                      </ul>
                    </div>
                  </div>

                  <div class="bg-lime-50 p-6 rounded-lg">
                    <h4 class="text-xl font-semibold text-lime-800 mb-4">✅ B. Best Practices for Reducing Emissions</h4>
                    <div class="grid md:grid-cols-2 gap-6">
                      <div class="text-sm text-lime-700 space-y-3">
                        <div>
                          <p class="font-semibold">Regular Maintenance and Inspections:</p>
                          <ul class="list-disc list-inside space-y-1 ml-4">
                            <li>Keep emissions components in optimal condition</li>
                            <li>Follow recommended service intervals for cleaning, replacements, and recalibrations</li>
                          </ul>
                        </div>
                        <div>
                          <p class="font-semibold">Use Quality Fuels and Additives:</p>
                          <ul class="list-disc list-inside space-y-1 ml-4">
                            <li>Use low-sulfur diesel fuel to reduce sulfur dioxide emissions</li>
                            <li>Consider additives that improve combustion efficiency and reduce soot formation</li>
                          </ul>
                        </div>
                      </div>
                      <div class="text-sm text-lime-700 space-y-3">
                        <div>
                          <p class="font-semibold">Drive Efficiently:</p>
                          <ul class="list-disc list-inside space-y-1 ml-4">
                            <li>Minimize idling and aggressive driving to reduce fuel consumption and emissions</li>
                            <li>Avoid frequent short trips that prevent full DPF regeneration</li>
                          </ul>
                        </div>
                        <div>
                          <p class="font-semibold">Educate Operators:</p>
                          <ul class="list-disc list-inside space-y-1 ml-4">
                            <li>Train drivers and fleet operators on the importance of emissions compliance</li>
                            <li>Encourage proper use of diagnostic tools and adherence to maintenance schedules</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <p class="text-blue-600 font-medium mt-4">📺 YouTube: How to Reduce Your Carbon Footprint | Sustainability Tips | WWF</p>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Conclusion and Q&A (30 minutes)</h3>
                <div class="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">A. Recap Key Points:</h4>
                    <ul class="text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>DPFs, SCR, and EGR systems are essential for reducing diesel emissions and meeting environmental regulations</li>
                      <li>Diagnosing issues like clogged filters, faulty valves, and injector problems ensures reliable operation and compliance</li>
                      <li>Regular maintenance extends the life of emissions components and helps protect the environment</li>
                      <li>Best practices such as using quality DEF, following maintenance intervals, and driving efficiently reduce emissions and operating costs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">B. Interactive Q&A Session:</h4>
                    <ul class="text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Encourage participants to ask about diagnosing specific emissions-related faults</li>
                      <li>Discuss the benefits and challenges of maintaining emissions equipment</li>
                      <li>Provide additional resources for troubleshooting emissions systems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">C. Practice Assignments:</h4>
                    <ul class="text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Assign participants to inspect a vehicle's emissions system and identify key components</li>
                      <li>Encourage them to research a real-world DPF or SCR fault scenario and propose a diagnostic plan</li>
                      <li>Have them create a maintenance checklist for emissions-related equipment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-red-100 p-4 rounded-lg">
                <h3 class="text-xl font-semibold text-red-800 mb-3">⚠️ Safety Warning</h3>
                <p class="text-red-700">
                  <strong>HIGH PRESSURE SYSTEMS:</strong> Emissions control systems operate at high pressures and temperatures. 
                  Always follow safety procedures, use proper PPE, and allow systems to cool before service.
                </p>
              </div>

              <div class="bg-green-100 p-4 rounded-lg mt-6">
                <h3 class="text-xl font-semibold text-green-800 mb-3">🎯 Outcome</h3>
                <p class="text-green-700">
                  By the end of this lecture, participants will understand the role of diesel emissions control systems, know how to diagnose and maintain them, and be familiar with best practices to reduce environmental impact while ensuring regulatory compliance.
                </p>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 12,
      title: 'Module 6 Quiz: Emissions Control & Environmental Considerations',
      duration: '30 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the primary function of a Diesel Particulate Filter (DPF)?',
            options: [
              'To reduce fuel consumption',
              'To remove nitrogen oxides (NOx) from exhaust',
              'To trap soot and particulate matter from exhaust gases',
              'To inject fuel into the exhaust stream'
            ],
            correct: 2,
            explanation: 'DPFs trap soot and particulate matter from exhaust gases to prevent their release into the atmosphere.'
          },
          {
            question: 'Which chemical is injected into the exhaust in an SCR system to reduce NOx emissions?',
            options: [
              'Ethanol',
              'Diesel Exhaust Fluid (DEF)',
              'Nitrogen peroxide',
              'Methanol'
            ],
            correct: 1,
            explanation: 'DEF (Diesel Exhaust Fluid) is a urea-based solution that reacts with NOx gases to produce nitrogen and water vapor.'
          },
          {
            question: 'How does the EGR system help reduce NOx emissions?',
            options: [
              'By increasing fuel pressure',
              'By trapping soot in a filter',
              'By lowering combustion temperatures through recirculating exhaust gases',
              'By injecting water into the combustion chamber'
            ],
            correct: 2,
            explanation: 'EGR recirculates exhaust gases back into the intake, lowering oxygen content and combustion temperatures, which reduces NOx formation.'
          },
          {
            question: 'Which of the following is a common symptom of a clogged DPF?',
            options: [
              'Decreased NOx emissions',
              'Rough idling',
              'Loss of engine power and increased fuel consumption',
              'Overheating of the EGR cooler'
            ],
            correct: 2,
            explanation: 'A clogged DPF restricts exhaust flow, causing loss of engine power and increased fuel consumption, along with DPF warning lights.'
          },
          {
            question: 'What diagnostic tool can help confirm a blocked DPF?',
            options: [
              'Fuel pressure tester',
              'Pressure differential sensor',
              'Timing light',
              'EGR temperature probe'
            ],
            correct: 1,
            explanation: 'Pressure differential sensors measure the pressure difference across the DPF to detect restrictions and blockages.'
          },
          {
            question: 'Which of the following can cause EGR valve failure?',
            options: [
              'Overuse of DEF',
              'High RPM driving',
              'Carbon buildup and sticking',
              'Short regeneration cycles'
            ],
            correct: 2,
            explanation: 'Carbon buildup from exhaust gases can cause EGR valves to stick or fail, along with electrical failures.'
          },
          {
            question: 'What might be a sign of SCR injector malfunction?',
            options: [
              'Black smoke from the tailpipe',
              'Strong smell of gasoline',
              'DEF warning light and increased NOx emissions',
              'Engine oil contamination'
            ],
            correct: 2,
            explanation: 'SCR injector malfunctions prevent proper DEF injection, triggering warning lights and causing increased NOx emissions.'
          },
          {
            question: 'Why is it important to use high-quality DEF in SCR systems?',
            options: [
              'It improves fuel economy directly',
              'It prevents carbon buildup in the DPF',
              'It prevents injector clogs and SCR component failure',
              'It reduces the need for EGR cleaning'
            ],
            correct: 2,
            explanation: 'High-quality DEF prevents contamination that can clog injectors and damage SCR system components.'
          },
          {
            question: 'Which emission from diesel engines is a major contributor to smog and respiratory issues?',
            options: [
              'CO₂',
              'O₂',
              'NOx',
              'H₂O'
            ],
            correct: 2,
            explanation: 'NOx (nitrogen oxides) are major contributors to smog formation and respiratory health issues.'
          },
          {
            question: 'What is a best practice to help reduce diesel emissions and keep systems working properly?',
            options: [
              'Avoid using DEF whenever possible',
              'Drive at high RPMs regularly',
              'Perform regular maintenance and use quality fuels',
              'Disable the EGR valve for more power'
            ],
            correct: 2,
            explanation: 'Regular maintenance, using quality fuels, and following service intervals are essential for reducing emissions and maintaining system performance.'
          }
        ]
      }
    }
  ]
};