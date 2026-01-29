
import type { Module } from '@/types/course';

export const module2FuelSystems: Module = {
  id: 2,
  title: 'Petrol Fuel Systems Overview',
  description: 'Comprehensive study of carbureted vs fuel-injected engines and the critical role of air-fuel mixture in combustion efficiency.',
  lessons: [
    {
      id: 4,
      title: 'Carbureted vs. Fuel-Injected Engines',
      duration: '60 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://youtu.be/xX5FvnVq4h8',
        textContent: `
          <div class="lesson-content">
            <h2>🚗 Carbureted vs. Fuel-Injected Engines</h2>
            
            <div class="content-section">
              <h3>A. Introduction to Fuel Delivery Systems</h3>
              <p>Petrol engines rely on a carefully measured air-fuel mixture for efficient combustion. Over time, technology has evolved from simple carburetors to advanced fuel injection systems.</p>
            </div>

            <div class="content-section">
              <h3>⚙️ Basic Definitions</h3>
              <div class="comparison-table">
                <table class="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="border border-gray-300 p-3">System</th>
                      <th class="border border-gray-300 p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Carburetor</strong></td>
                      <td class="border border-gray-300 p-3">A mechanical device that mixes air and fuel before it enters the engine cylinders.</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Fuel Injection</strong></td>
                      <td class="border border-gray-300 p-3">A system that sprays fuel directly into the engine's intake or combustion chamber, usually controlled electronically.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="content-section">
              <h3>B. Carbureted Engines</h3>
              
              <h4>🔧 How They Work:</h4>
              <ul>
                <li>A carburetor mixes air and fuel before it enters the engine's intake manifold</li>
                <li>Uses vacuum suction from the engine to draw in air and fuel</li>
                <li>Relies on a vacuum created by the engine's pistons to draw fuel from a reservoir and mix it with air</li>
                <li>Mix is adjusted by mechanical parts like jets, floats, and throttle plates</li>
              </ul>

              <h4>✅ Advantages:</h4>
              <ul>
                <li>Simple design, easy to maintain and repair</li>
                <li>Cost-effective for older vehicles and small engines</li>
                <li>Simpler and easier to repair with basic tools</li>
                <li>Great for older or classic cars</li>
                <li>No complex electronics</li>
              </ul>

              <h4>❌ Disadvantages:</h4>
              <ul>
                <li>Less precise fuel delivery, resulting in inefficient combustion</li>
                <li>Poor fuel economy and higher emissions</li>
                <li>Requires manual adjustments to maintain the proper air-fuel ratio</li>
                <li>Needs frequent tuning</li>
                <li>Inconsistent performance in extreme conditions</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>C. Fuel-Injected Engines</h3>
              
              <h4>⚡ How They Work:</h4>
              <ul>
                <li>Fuel injectors deliver fuel directly into the engine's intake manifold or combustion chamber</li>
                <li>Uses electronic sensors and actuators to measure and inject the exact amount of fuel needed</li>
                <li>Controlled by an engine control unit (ECU), which uses sensors to continuously adjust the air-fuel mixture</li>
                <li>Injectors spray fuel directly into either:
                  <ul>
                    <li>The intake manifold (port injection), or</li>
                    <li>The combustion chamber (direct injection)</li>
                  </ul>
                </li>
              </ul>

              <h4>✅ Advantages:</h4>
              <ul>
                <li>Highly precise fuel delivery for optimal combustion</li>
                <li>Improved fuel efficiency and reduced emissions</li>
                <li>Greater reliability under varying operating conditions</li>
                <li>Better fuel economy</li>
                <li>Smoother engine operation</li>
                <li>Adapts to changes in driving conditions (load, temperature, altitude)</li>
                <li>Lower emissions</li>
              </ul>

              <h4>❌ Disadvantages:</h4>
              <ul>
                <li>More complex and costly to repair or replace</li>
                <li>Requires specialized diagnostic tools for troubleshooting</li>
                <li>Expensive repairs if sensors fail</li>
                <li>Requires specialized tools or diagnostics</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>🔍 Key Comparisons</h3>
              <div class="comparison-table">
                <table class="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="border border-gray-300 p-3">Feature</th>
                      <th class="border border-gray-300 p-3">Carbureted Engine</th>
                      <th class="border border-gray-300 p-3">Fuel-Injected Engine</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Fuel Mixing</strong></td>
                      <td class="border border-gray-300 p-3">Mechanical and vacuum-based</td>
                      <td class="border border-gray-300 p-3">Electronic and precise</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Efficiency</strong></td>
                      <td class="border border-gray-300 p-3">Less efficient</td>
                      <td class="border border-gray-300 p-3">More fuel-efficient</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Power Output</strong></td>
                      <td class="border border-gray-300 p-3">Slightly less optimized</td>
                      <td class="border border-gray-300 p-3">Better performance and throttle response</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Cold Starts</strong></td>
                      <td class="border border-gray-300 p-3">Harder, especially in winter</td>
                      <td class="border border-gray-300 p-3">Easier, thanks to sensors and auto adjustment</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Maintenance</strong></td>
                      <td class="border border-gray-300 p-3">Easier to fix, but requires regular tuning</td>
                      <td class="border border-gray-300 p-3">Less maintenance but more expensive to fix</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Emissions</strong></td>
                      <td class="border border-gray-300 p-3">Higher</td>
                      <td class="border border-gray-300 p-3">Lower (meets modern emission standards)</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Cost</strong></td>
                      <td class="border border-gray-300 p-3">Cheaper, especially in older vehicles</td>
                      <td class="border border-gray-300 p-3">More expensive system</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Engine Response</strong></td>
                      <td class="border border-gray-300 p-3">Slight delay in throttle</td>
                      <td class="border border-gray-300 p-3">Quicker, more responsive</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="content-section">
              <h3>💡 Why Fuel Injection Replaced Carburetors</h3>
              <ul>
                <li>More accurate fuel delivery improves power and reduces fuel consumption</li>
                <li>Complies with stricter emission regulations</li>
                <li>Modern engines need real-time fuel control, which carburetors can't provide</li>
                <li>Fuel-injection adapts better to different altitudes and temperatures</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 5,
      title: 'Role of Air-Fuel Mixture in Combustion Efficiency',
      duration: '45 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://youtu.be/xX5FvnVq4h8',
        textContent: `
          <div class="lesson-content">
            <h2>🌀 Air-Fuel Mixture & Combustion Efficiency</h2>
            
            <div class="content-section">
              <h3>A. What is the Air-Fuel Mixture?</h3>
              <p>The air-fuel mixture is the ratio of air (oxygen) to fuel (petrol) supplied to the engine's combustion chamber. This mixture must be just right for optimal combustion.</p>
              <ul>
                <li>The air-fuel mixture is the ratio of air to fuel that enters the engine's cylinders for combustion</li>
                <li>Properly balanced mixtures ensure complete combustion, maximizing power and efficiency</li>
                <li>The ideal air-fuel ratio for petrol engines is approximately 14.7:1 (known as the stoichiometric ratio)</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>📏 Ideal Ratio: The Stoichiometric Ratio</h3>
              <div class="highlight-box bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4>Petrol Engines:</h4>
                <ul>
                  <li><strong>Ideal air-to-fuel ratio is 14.7:1</strong> (14.7 parts air to 1 part fuel by weight)</li>
                  <li>Known as the <strong>stoichiometric ratio</strong></li>
                  <li>At this ratio, all fuel is burned with all the available oxygen — perfect for clean emissions and fuel efficiency</li>
                </ul>
              </div>
            </div>

            <div class="content-section">
              <h3>🔥 How the Mixture Affects Combustion Efficiency</h3>
              <div class="comparison-table">
                <table class="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="border border-gray-300 p-3">Type of Mixture</th>
                      <th class="border border-gray-300 p-3">Characteristics</th>
                      <th class="border border-gray-300 p-3">Effects on Combustion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Lean Mixture</strong></td>
                      <td class="border border-gray-300 p-3">More air, less fuel (e.g. 17:1)</td>
                      <td class="border border-gray-300 p-3">
                        • Burns cleaner<br>
                        • Better fuel economy<br>
                        • Risk of misfire or engine knocking<br>
                        • Can cause higher combustion temperatures
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 p-3"><strong>Rich Mixture</strong></td>
                      <td class="border border-gray-300 p-3">More fuel, less air (e.g. 12:1)</td>
                      <td class="border border-gray-300 p-3">
                        • More power<br>
                        • Cooler combustion<br>
                        • Incomplete fuel burn → higher emissions and fuel wastage<br>
                        • Can cause carbon buildup
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="content-section">
              <h3>B. Effects of Incorrect Air-Fuel Ratios</h3>
              
              <h4>❌ Too Rich (Excess Fuel):</h4>
              <ul>
                <li>Produces more power initially, but wastes fuel</li>
                <li>Results in higher carbon deposits, black exhaust smoke, and increased emissions</li>
                <li>Can lead to fouled spark plugs and reduced engine life</li>
                <li>Can wash oil off cylinder walls, reducing lubrication and causing wear</li>
              </ul>

              <h4>❌ Too Lean (Excess Air):</h4>
              <ul>
                <li>Burns cleaner, but may cause engine knocking (detonation)</li>
                <li>Can result in higher engine temperatures, damaging pistons and valves</li>
                <li>May reduce power and throttle response</li>
                <li>Possible engine overheating or knocking</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>⚙️ Why Mixture Matters for Efficiency</h3>
              
              <h4>Complete Combustion = More Power + Less Waste</h4>
              <ul>
                <li>Proper mixture ensures all the fuel is burned efficiently</li>
                <li>Wasted fuel = wasted energy = lower efficiency</li>
              </ul>

              <h4>Prevents Engine Damage</h4>
              <ul>
                <li>Lean mixture = possible engine overheating or knocking</li>
                <li>Rich mixture = can wash oil off cylinder walls, reducing lubrication and causing wear</li>
              </ul>

              <h4>Affects Fuel Economy</h4>
              <ul>
                <li>Right mix = more kilometers per litre</li>
                <li>Wrong mix = poor mileage and higher running costs</li>
              </ul>

              <h4>Controls Emissions</h4>
              <ul>
                <li>Balanced air-fuel = less CO₂, CO, hydrocarbons, and NOx</li>
                <li>Poor mixture control = more pollution</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>🧠 How Engines Manage Mixture</h3>
              
              <h4>Carbureted Engines:</h4>
              <ul>
                <li>Use mechanical jets and valves to control mixture</li>
                <li>Carburetors use jets and needles to control fuel flow, but require frequent manual tuning</li>
              </ul>

              <h4>Fuel-Injected Engines:</h4>
              <p>Use sensors like:</p>
              <ul>
                <li><strong>Oxygen sensor (O2/Lambda sensor)</strong></li>
                <li><strong>Mass Air Flow (MAF) sensor</strong></li>
                <li><strong>Throttle Position Sensor (TPS)</strong></li>
              </ul>
              <p>These allow the ECU (Engine Control Unit) to automatically adjust the mixture in real time.</p>
            </div>

            <div class="content-section">
              <h3>⚠️ What Happens with Poor Air-Fuel Mixing?</h3>
              <ul>
                <li><strong>Engine Knock (Detonation):</strong> Uncontrolled explosion due to lean mixtures</li>
                <li><strong>Misfires:</strong> If mixture is too lean or rich to ignite</li>
                <li><strong>Rough Idling & Hesitation:</strong> Poor performance, especially at low speeds</li>
                <li><strong>Increased Emissions:</strong> Causes the vehicle to fail emissions tests</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>🧪 Summary: Air-Fuel Mixture & Efficiency</h3>
              <div class="highlight-box bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4>Correct Mixture Does This:</h4>
                <ul>
                  <li>✅ Maximizes fuel energy potential</li>
                  <li>✅ Improves engine power & torque</li>
                  <li>✅ Boosts fuel economy</li>
                  <li>✅ Reduces harmful emissions</li>
                  <li>✅ Protects engine internals</li>
                </ul>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 6,
      title: 'Safety and Workshop Best Practices',
      duration: '30 minutes',
      type: 'video',
      content: {
        videoUrl: '',
        textContent: `
          <div class="lesson-content">
            <h2>🛡️ Safety and Workshop Best Practices</h2>
            
            <div class="content-section">
              <h3>Personal Protective Equipment (PPE)</h3>
              <ul>
                <li><strong>Safety Glasses:</strong> Always wear when working with fuel systems or chemicals</li>
                <li><strong>Gloves:</strong> Chemical-resistant gloves when handling fuels and solvents</li>
                <li><strong>Protective Clothing:</strong> Long sleeves and pants to prevent skin contact</li>
                <li><strong>Respirator:</strong> When working in poorly ventilated areas or with strong chemicals</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Proper Handling of Fuels and Chemicals</h3>
              <ul>
                <li><strong>Ventilation:</strong> Always work in well-ventilated areas</li>
                <li><strong>Fire Safety:</strong> Keep fire extinguisher nearby, no smoking or open flames</li>
                <li><strong>Spill Prevention:</strong> Use drip trays and absorbent materials</li>
                <li><strong>Storage:</strong> Store fuels and chemicals in approved containers, away from heat sources</li>
                <li><strong>Disposal:</strong> Follow local regulations for proper disposal of used materials</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Tool Safety and Maintenance</h3>
              <ul>
                <li><strong>Inspection:</strong> Check tools before use for damage or wear</li>
                <li><strong>Proper Use:</strong> Use tools only for their intended purpose</li>
                <li><strong>Maintenance:</strong> Keep tools clean and properly calibrated</li>
                <li><strong>Storage:</strong> Store tools in designated areas to prevent damage</li>
                <li><strong>Training:</strong> Ensure proper training on specialized diagnostic equipment</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Workshop Environment</h3>
              <ul>
                <li><strong>Cleanliness:</strong> Maintain a clean, organized workspace</li>
                <li><strong>Lighting:</strong> Ensure adequate lighting for detailed work</li>
                <li><strong>Emergency Procedures:</strong> Know location of safety equipment and emergency exits</li>
                <li><strong>First Aid:</strong> Keep first aid kit accessible and team members trained</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 7,
      title: 'Module 2 Quiz: Petrol Fuel Systems',
      duration: '20 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the primary function of a carburetor in a petrol engine?',
            options: [
              'To generate a spark for combustion',
              'To mix air and fuel before it enters the engine\'s intake manifold',
              'To control the timing of the engine\'s valves',
              'To measure exhaust gas temperature'
            ],
            correct: 1,
            explanation: 'A carburetor\'s primary function is to mix air and fuel in the correct proportions before the mixture enters the engine\'s intake manifold for combustion.'
          },
          {
            question: 'What key advantage does a fuel injection system have over a carburetor?',
            options: [
              'Lower manufacturing costs',
              'Simplified maintenance requirements',
              'More precise fuel delivery and improved combustion efficiency',
              'Less reliance on electronic sensors'
            ],
            correct: 2,
            explanation: 'Fuel injection systems provide more precise fuel delivery and improved combustion efficiency compared to carburetors, resulting in better performance and fuel economy.'
          },
          {
            question: 'What happens if the air-fuel mixture in a petrol engine is too rich?',
            options: [
              'The engine may overheat and knock',
              'Combustion becomes more efficient, improving fuel economy',
              'The engine produces black exhaust smoke and wastes fuel',
              'Engine temperature drops, causing stalling'
            ],
            correct: 2,
            explanation: 'A rich air-fuel mixture (too much fuel) results in incomplete combustion, producing black exhaust smoke, wasting fuel, and increasing emissions.'
          },
          {
            question: 'What is the ideal air-fuel ratio for a petrol engine?',
            options: [
              '10:1',
              '12.5:1',
              '14.7:1',
              '16:1'
            ],
            correct: 2,
            explanation: 'The ideal air-fuel ratio for petrol engines is 14.7:1, known as the stoichiometric ratio, where complete combustion occurs with minimal emissions.'
          },
          {
            question: 'In a fuel-injected engine, what controls the air-fuel mixture?',
            options: [
              'The carburetor\'s jets and needles',
              'A manual adjustment by the operator',
              'The engine control unit (ECU) and various sensors',
              'The fuel pump\'s pressure regulator'
            ],
            correct: 2,
            explanation: 'In fuel-injected engines, the Engine Control Unit (ECU) uses data from various sensors to precisely control the air-fuel mixture in real-time.'
          },
          {
            question: 'How can a lean air-fuel mixture affect a petrol engine?',
            options: [
              'It increases carbon buildup on spark plugs',
              'It reduces power and may cause engine knocking',
              'It results in excessive fuel consumption',
              'It lowers engine temperature, improving performance'
            ],
            correct: 1,
            explanation: 'A lean air-fuel mixture (too much air) can reduce engine power and may cause engine knocking due to higher combustion temperatures and uncontrolled ignition.'
          },
          {
            question: 'Which of the following is NOT a component of a fuel injection system?',
            options: [
              'Fuel injector',
              'Oxygen sensor',
              'Spark plug',
              'Engine control unit (ECU)'
            ],
            correct: 2,
            explanation: 'While spark plugs are essential for ignition, they are not specifically part of the fuel injection system. They belong to the ignition system.'
          },
          {
            question: 'Which of the following is an advantage of a carbureted engine over a fuel-injected engine?',
            options: [
              'More precise control of the air-fuel ratio',
              'Simpler design and easier manual maintenance',
              'Lower emissions and better fuel economy',
              'Faster response to real-time driving conditions'
            ],
            correct: 1,
            explanation: 'Carbureted engines have a simpler mechanical design that makes them easier to maintain and repair manually, especially with basic tools.'
          }
        ]
      }
    }
  ]
};
