import type { Module } from '@/types/course';

export const module8Practicals: Module = {
  id: 8,
  title: 'Hands-On Practicals and Final Assessment',
  description: 'Virtual simulations, interactive assignments, and comprehensive assessment for diesel mechanic certification.',
  lessons: [
    {
      id: 18,
      title: 'Interactive Repair Tutorials',
      duration: '90 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/interactive-repair-tutorials',
        textContent: `
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-3xl font-bold text-blue-600 mb-6">Module 8: Hands-On Practicals and Virtual Simulations</h2>
              
              <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-3">🎯 Interactive Learning Experience</h3>
                <p class="text-blue-700 mb-3">
                  This module provides hands-on experience through interactive video tutorials, virtual simulations, and practical assignments designed to prepare you for real-world diesel mechanic work.
                </p>
              </div>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-green-800 mb-3">🔧 Step-by-Step Repair Procedures</h4>
                  <ul class="text-sm text-green-600 space-y-1">
                    <li>• Engine teardown and rebuild procedures</li>
                    <li>• Fuel injection system service</li>
                    <li>• Turbocharger maintenance and repair</li>
                    <li>• Cooling system diagnostics and repair</li>
                    <li>• Emissions system servicing</li>
                  </ul>
                </div>

                <div class="bg-orange-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-orange-800 mb-3">🎮 Virtual Simulation Features</h4>
                  <ul class="text-sm text-orange-600 space-y-1">
                    <li>• 3D engine component visualization</li>
                    <li>• Interactive diagnostic scenarios</li>
                    <li>• Tool selection and usage training</li>
                    <li>• Safety procedure simulations</li>
                    <li>• Performance testing simulations</li>
                  </ul>
                </div>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-purple-800 mb-3">📚 Tutorial Categories</h3>
                <div class="grid md:grid-cols-3 gap-4">
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Basic Maintenance</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Oil change procedures</li>
                      <li>• Filter replacements</li>
                      <li>• Fluid checks and top-offs</li>
                      <li>• Belt and hose inspections</li>
                    </ul>
                  </div>
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Advanced Diagnostics</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Engine performance testing</li>
                      <li>• Electrical system diagnosis</li>
                      <li>• Emissions system analysis</li>
                      <li>• Fuel system troubleshooting</li>
                    </ul>
                  </div>
                  <div class="border rounded-lg p-3">
                    <h4 class="font-semibold text-purple-700 mb-2">Major Repairs</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Engine overhaul procedures</li>
                      <li>• Transmission service</li>
                      <li>• Turbocharger rebuilds</li>
                      <li>• Head gasket replacement</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-yellow-800 mb-3">💻 Virtual Simulation Learning Objectives</h3>
                <div class="space-y-3">
                  <div>
                    <h4 class="font-semibold text-yellow-700 mb-2">By completing these simulations, you will:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Gain confidence in using diagnostic equipment</li>
                      <li>• Practice safe work procedures in a risk-free environment</li>
                      <li>• Develop systematic troubleshooting approaches</li>
                      <li>• Learn proper tool selection and usage</li>
                      <li>• Master component identification and function</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-red-50 p-4 rounded-lg">
                <h3 class="text-xl font-semibold text-red-800 mb-3">⚠️ Safety Emphasis</h3>
                <p class="text-red-700">
                  All tutorials emphasize proper safety procedures, including personal protective equipment (PPE) usage, hazard identification, and safe work practices essential for professional diesel mechanics.
                </p>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 19,
      title: 'Virtual Diagnostic Simulations',
      duration: '75 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/virtual-diagnostic-simulations',
        textContent: `
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-3xl font-bold text-blue-600 mb-6">Virtual Diagnostic Simulations</h2>
              
              <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-3">🔍 Realistic Diagnostic Scenarios</h3>
                <p class="text-blue-700 mb-3">
                  Experience realistic diagnostic challenges through interactive simulations that mirror real-world diesel engine problems and troubleshooting procedures.
                </p>
              </div>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-green-800 mb-3">🎯 Simulation Scenarios</h4>
                  <ul class="text-sm text-green-600 space-y-1">
                    <li>• Hard starting conditions</li>
                    <li>• Loss of power complaints</li>
                    <li>• Excessive smoke diagnosis</li>
                    <li>• Fuel system problems</li>
                    <li>• Cooling system failures</li>
                    <li>• Emissions system faults</li>
                  </ul>
                </div>

                <div class="bg-orange-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-orange-800 mb-3">🛠️ Available Tools</h4>
                  <ul class="text-sm text-orange-600 space-y-1">
                    <li>• OBD-II scanners</li>
                    <li>• Digital multimeters</li>
                    <li>• Pressure gauges</li>
                    <li>• Oscilloscopes</li>
                    <li>• Temperature sensors</li>
                    <li>• Compression testers</li>
                  </ul>
                </div>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-purple-800 mb-3">📊 Diagnostic Process Training</h3>
                <div class="space-y-4">
                  <div class="bg-white p-4 rounded border">
                    <h4 class="font-semibold text-purple-700 mb-2">Step 1: Customer Interview</h4>
                    <p class="text-sm text-gray-600">Learn to gather crucial information about symptoms, operating conditions, and maintenance history.</p>
                  </div>
                  <div class="bg-white p-4 rounded border">
                    <h4 class="font-semibold text-purple-700 mb-2">Step 2: Visual Inspection</h4>
                    <p class="text-sm text-gray-600">Practice systematic visual inspections to identify obvious problems and safety concerns.</p>
                  </div>
                  <div class="bg-white p-4 rounded border">
                    <h4 class="font-semibold text-purple-700 mb-2">Step 3: Code Retrieval</h4>
                    <p class="text-sm text-gray-600">Use diagnostic scanners to retrieve and interpret diagnostic trouble codes (DTCs).</p>
                  </div>
                  <div class="bg-white p-4 rounded border">
                    <h4 class="font-semibold text-purple-700 mb-2">Step 4: System Testing</h4>
                    <p class="text-sm text-gray-600">Perform targeted tests on suspected systems using appropriate diagnostic equipment.</p>
                  </div>
                  <div class="bg-white p-4 rounded border">
                    <h4 class="font-semibold text-purple-700 mb-2">Step 5: Root Cause Analysis</h4>
                    <p class="text-sm text-gray-600">Analyze data to determine the root cause and develop an effective repair strategy.</p>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-semibold text-yellow-800 mb-3">🏆 Scoring and Progress Tracking</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-semibold text-yellow-700 mb-2">Performance Metrics:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Diagnostic accuracy</li>
                      <li>• Time to resolution</li>
                      <li>• Tool usage efficiency</li>
                      <li>• Safety compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-yellow-700 mb-2">Progress Features:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Skill level advancement</li>
                      <li>• Achievement badges</li>
                      <li>• Performance analytics</li>
                      <li>• Improvement recommendations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-red-50 p-4 rounded-lg">
                <h3 class="text-xl font-semibold text-red-800 mb-3">🎮 Interactive Features</h3>
                <ul class="text-red-700 space-y-2">
                  <li>• 360-degree engine bay views</li>
                  <li>• Clickable components with detailed information</li>
                  <li>• Real-time feedback on diagnostic choices</li>
                  <li>• Multiple solution paths for complex problems</li>
                  <li>• Instructor hints and guidance system</li>
                </ul>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 20,
      title: 'Practical Assignment: Maintenance Schedule Creation',
      duration: '60 minutes',
      type: 'assignment',
      content: {
        title: 'Create a Comprehensive Fleet Maintenance Schedule',
        description: 'Develop a detailed maintenance schedule for a hypothetical fleet of diesel vehicles operating under various conditions.',
        requirements: [
          'Analyze fleet composition and operating conditions',
          'Establish maintenance intervals for different vehicle types',
          'Create preventive maintenance checklists',
          'Develop a tracking system for maintenance records',
          'Include cost estimates and scheduling considerations',
          'Address both routine and major maintenance requirements'
        ],
        deliverables: 'Submit a comprehensive maintenance schedule document including: fleet analysis, maintenance calendars, cost projections, and implementation timeline.',
        rubric: {
          'Fleet Analysis': 'Thorough assessment of vehicle types, usage patterns, and operating conditions',
          'Maintenance Planning': 'Appropriate intervals and procedures for different maintenance tasks',
          'Documentation': 'Clear, organized, and professionally presented maintenance schedules',
          'Cost Consideration': 'Realistic cost estimates and budget planning',
          'Implementation Strategy': 'Practical approach to implementing and managing the maintenance program'
        }
      }
    },
    {
      id: 21,
      title: 'Practical Assignment: Diagnostic Plan Development',
      duration: '45 minutes',
      type: 'assignment',
      content: {
        title: 'Develop a Systematic Diagnostic Plan',
        description: 'Create a detailed diagnostic plan for a complex diesel engine problem scenario.',
        requirements: [
          'Analyze customer complaint and symptoms',
          'Develop systematic diagnostic approach',
          'Select appropriate diagnostic tools and procedures',
          'Create step-by-step testing sequence',
          'Identify potential root causes',
          'Develop repair strategy and cost estimate'
        ],
        deliverables: 'Submit a complete diagnostic plan including: problem analysis, testing procedures, expected results, and repair recommendations.',
        rubric: {
          'Problem Analysis': 'Accurate interpretation of symptoms and customer information',
          'Diagnostic Approach': 'Logical, systematic approach to problem-solving',
          'Tool Selection': 'Appropriate choice of diagnostic equipment and procedures',
          'Documentation': 'Clear, detailed documentation of diagnostic steps',
          'Root Cause Analysis': 'Accurate identification of underlying problem causes'
        }
      }
    },
    {
      id: 22,
      title: 'Comprehensive Final Examination',
      duration: '120 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'In a diesel engine, what is the primary purpose of the compression stroke?',
            options: [
              'To expel exhaust gases',
              'To draw in fresh air',
              'To compress air to generate heat for ignition',
              'To inject fuel into the cylinder'
            ],
            correct: 2,
            explanation: 'The compression stroke compresses air to extremely high pressure, generating the heat necessary to ignite diesel fuel without spark plugs.'
          },
          {
            question: 'What is the typical operating pressure range for modern common rail fuel injection systems?',
            options: [
              '100-500 bar',
              '500-1000 bar',
              '1000-2000 bar',
              '2000-3000+ bar'
            ],
            correct: 3,
            explanation: 'Modern common rail systems operate at very high pressures, typically between 2000-3000+ bar, to achieve precise fuel atomization and injection timing.'
          },
          {
            question: 'Which diagnostic trouble code typically indicates a fuel rail pressure issue?',
            options: [
              'P0087 - Fuel rail pressure too low',
              'P0300 - Random cylinder misfire',
              'P0401 - EGR flow insufficient',
              'P0562 - System voltage low'
            ],
            correct: 0,
            explanation: 'P0087 specifically indicates that the fuel rail pressure is below the expected threshold, often due to fuel pump, filter, or system leak issues.'
          },
          {
            question: 'What is the primary function of a diesel particulate filter (DPF)?',
            options: [
              'To reduce NOx emissions',
              'To filter fuel before injection',
              'To trap and burn soot particles from exhaust',
              'To cool exhaust gases'
            ],
            correct: 2,
            explanation: 'DPFs capture soot particles from exhaust gases and periodically burn them off through regeneration cycles to prevent their release into the atmosphere.'
          },
          {
            question: 'In a turbocharger system, what drives the turbine wheel?',
            options: [
              'Engine crankshaft via belt',
              'Electric motor',
              'Exhaust gas pressure and flow',
              'Compressed intake air'
            ],
            correct: 2,
            explanation: 'The turbine wheel in a turbocharger is driven by exhaust gas pressure and flow, which in turn drives the compressor wheel to pressurize intake air.'
          },
          {
            question: 'What is the purpose of EGR (Exhaust Gas Recirculation) in diesel engines?',
            options: [
              'To increase power output',
              'To improve fuel economy',
              'To reduce NOx emissions by lowering combustion temperature',
              'To clean exhaust gases'
            ],
            correct: 2,
            explanation: 'EGR reduces NOx formation by recirculating exhaust gases into the intake, diluting the air-fuel mixture and lowering peak combustion temperatures.'
          },
          {
            question: 'When performing oil analysis, what does the presence of metal particles typically indicate?',
            options: [
              'Normal engine operation',
              'Component wear or failure',
              'Contaminated fuel',
              'Cooling system problems'
            ],
            correct: 1,
            explanation: 'Metal particles in oil analysis typically indicate wear of engine components such as bearings, rings, or cylinder walls, helping predict potential failures.'
          },
          {
            question: 'What is the recommended approach when a DPF becomes clogged?',
            options: [
              'Remove and discard the DPF',
              'Ignore the problem until major failure',
              'Perform forced regeneration or professional cleaning',
              'Bypass the DPF system'
            ],
            correct: 2,
            explanation: 'A clogged DPF should be addressed through forced regeneration procedures or professional cleaning to restore proper function and prevent engine damage.'
          },
          {
            question: 'In preventive maintenance, why is it important to use OEM or high-quality aftermarket parts?',
            options: [
              'They are always cheaper',
              'They meet or exceed manufacturer specifications for reliability',
              'They are easier to install',
              'They require less frequent replacement'
            ],
            correct: 1,
            explanation: 'OEM or high-quality aftermarket parts are designed to meet or exceed manufacturer specifications, ensuring proper fit, function, and longevity.'
          },
          {
            question: 'What is the primary advantage of predictive maintenance over reactive maintenance?',
            options: [
              'Lower initial costs',
              'Less complex procedures',
              'Prevents failures before they occur, reducing downtime and costs',
              'Eliminates the need for skilled technicians'
            ],
            correct: 2,
            explanation: 'Predictive maintenance uses data analysis to identify potential problems before they cause failures, significantly reducing unexpected downtime and repair costs.'
          }
        ]
      }
    },
    {
      id: 23,
      title: 'Diesel Mechanic Professional Certification',
      duration: '10 minutes',
      type: 'certificate',
      content: {
        title: 'Diesel Mechanic Professional Certification',
        description: 'Congratulations! You have successfully completed the comprehensive Diesel Mechanic Professional Certification course and demonstrated mastery of diesel engine systems, diagnostics, maintenance, and repair procedures.',
        certificateText: 'This certifies that the holder has successfully completed the Diesel Mechanic Professional Certification course, demonstrating comprehensive knowledge and practical skills in diesel engine fundamentals, fuel injection systems, diagnostics, turbocharger systems, electrical systems, emissions control, preventive maintenance, and hands-on practical applications. This certification is recognized by industry partners and employers as evidence of professional competency in diesel engine service and repair.'
      }
    }
  ]
};