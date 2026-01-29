
import type { Module } from '@/types/course';

export const module1Fundamentals: Module = {
  id: 1,
  title: 'Introduction to Petrol Engines',
  description: 'Understanding engine basics: Four-stroke engine cycle, key components, and differences between petrol and diesel engines.',
  lessons: [
    {
      id: 1,
      title: 'Introduction to Petrol Engines',
      duration: '2 hours 30 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://youtu.be/9KKfIYch1FE',
        textContent: `
          <div class="lesson-content">
            <h2>🚗 Introduction to Petrol Engines</h2>
            
            <div class="learning-objectives">
              <h3>Lesson Objectives:</h3>
              <ul>
                <li>Understand the fundamental operating principles of a four-stroke petrol engine</li>
                <li>Learn about the key components that make up a petrol engine and their roles</li>
                <li>Compare the main differences between petrol and diesel engine technologies</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Section 1: Understanding the Four-Stroke Engine Cycle (45 minutes)</h3>
              
              <h4>A. The Four-Stroke Cycle</h4>
              <h5>Overview:</h5>
              <ul>
                <li>A four-stroke engine is the most common type used in petrol vehicles</li>
                <li>It completes a full cycle in four strokes of the piston: intake, compression, power, and exhaust</li>
              </ul>
              
              <h5>The Four Strokes in Detail:</h5>
              
              <h4>1. Intake Stroke (Suck)</h4>
              <ul>
                <li>The intake valve opens, allowing a mixture of air and fuel to enter the cylinder</li>
                <li>The piston moves downward, increasing the cylinder volume and drawing in the air-fuel mixture</li>
                <li><strong>Key Point:</strong> Only the intake valve is open; exhaust valve stays shut</li>
              </ul>

              <h4>2. Compression Stroke (Squash)</h4>
              <ul>
                <li>Both intake and exhaust valves close</li>
                <li>The piston moves upward, compressing the air-fuel mixture into a smaller volume</li>
                <li><strong>Key Point:</strong> High compression = more power</li>
              </ul>

              <h4>3. Power Stroke (Bang)</h4>
              <ul>
                <li>The compressed air-fuel mixture is ignited by a spark from the spark plug</li>
                <li>The resulting explosion pushes the piston downward, creating mechanical energy</li>
                <li><strong>Purpose:</strong> This is the only stroke that produces power to turn the crankshaft</li>
              </ul>

              <h4>4. Exhaust Stroke (Blow)</h4>
              <ul>
                <li>The exhaust valve opens, and the piston moves upward again, expelling exhaust gases from the cylinder</li>
                <li><strong>Key Point:</strong> Clears the chamber for the next intake stroke</li>
              </ul>

              <div class="key-takeaway">
                <p><strong>Key Takeaway:</strong> The cycle repeats with precise timing to produce smooth, continuous engine power.</p>
              </div>
            </div>

            <div class="content-section">
              <h3>Section 2: Key Engine Components and Their Functions (45 minutes)</h3>
              
              <h4>A. Main Engine Components</h4>
              
              <div class="component-detail">
                <h5>Cylinder Block:</h5>
                <ul>
                  <li>The main structure of the engine</li>
                  <li>Houses the cylinders where the pistons move</li>
                  <li>Provides mounting points for the cylinder head and other components</li>
                  <li><strong>Made of:</strong> Usually cast iron or aluminum</li>
                  <li><strong>Includes:</strong> Passages for coolant and oil flow</li>
                </ul>

                <h5>Cylinder Head:</h5>
                <ul>
                  <li>Sits on top of the cylinder block</li>
                  <li>Contains passages for air and fuel mixture intake and exhaust gas removal</li>
                  <li>Houses the valves, spark plugs, and camshaft</li>
                  <li>Sealed with a head gasket</li>
                </ul>

                <h5>Pistons:</h5>
                <ul>
                  <li>Move up and down inside the cylinders</li>
                  <li>Transfer the force from the combustion process to the crankshaft</li>
                  <li>Connected to the Crankshaft via the connecting rod</li>
                  <li><strong>Fun Fact:</strong> Pistons help convert chemical energy (from fuel) into mechanical energy</li>
                </ul>

                <h5>Connecting Rods:</h5>
                <ul>
                  <li><strong>Function:</strong> Connect pistons to the crankshaft and transfer the linear motion of the piston into rotational motion</li>
                </ul>

                <h5>Crankshaft:</h5>
                <ul>
                  <li>Converts the pistons' linear motion into rotational motion</li>
                  <li>This rotational energy is then used to power the vehicle's wheels or other components</li>
                  <li><strong>Located:</strong> At the bottom of the engine block</li>
                  <li><strong>Balance:</strong> It's carefully balanced to reduce vibration</li>
                </ul>

                <h5>Camshaft:</h5>
                <ul>
                  <li>Controls the opening and closing of the intake and exhaust valves</li>
                  <li>Synchronizes with the crankshaft via a timing belt or chain to maintain precise valve timing</li>
                  <li><strong>May be in:</strong> The block (pushrod engines) or in the head (overhead cam engines)</li>
                </ul>

                <h5>Valves (Intake and Exhaust):</h5>
                <ul>
                  <li>Intake valves allow air-fuel mixture into the cylinder</li>
                  <li>Exhaust valves let burnt gases escape</li>
                  <li>Open and close at the exact moments needed for efficient engine operation</li>
                </ul>
              </div>

              <h4>B. Supporting Components:</h4>
              
              <div class="supporting-components">
                <h5>Spark Plugs:</h5>
                <ul>
                  <li>Generate the spark that ignites the air-fuel mixture in petrol engines</li>
                  <li><strong>Position:</strong> Located at the top of each cylinder in petrol engines</li>
                </ul>

                <h5>Fuel Injectors or Carburetors:</h5>
                <ul>
                  <li>Deliver the correct amount of fuel into the cylinders</li>
                </ul>

                <h5>Air Intake System:</h5>
                <ul>
                  <li><strong>Function:</strong> Brings fresh air into the engine for the combustion process</li>
                  <li><strong>Includes:</strong> Air filter, intake manifold, and throttle body</li>
                </ul>

                <h5>Oil and Cooling Systems:</h5>
                <ul>
                  <li>Lubricate moving parts and regulate engine temperature to prevent overheating</li>
                  <li><strong>Components:</strong> Radiator, Water pump, Thermostat and Coolant</li>
                </ul>

                <h5>Exhaust System:</h5>
                <ul>
                  <li><strong>Function:</strong> Removes exhaust gases from the combustion chamber</li>
                  <li><strong>Includes:</strong> Exhaust manifold, catalytic converter, and muffler</li>
                </ul>

                <h5>Lubrication System:</h5>
                <ul>
                  <li><strong>Function:</strong> Reduces friction and wear between moving parts</li>
                  <li><strong>Includes:</strong> Oil pump, oil filter, oil pan, and oil passages</li>
                </ul>

                <h5>Battery and Starter Motor:</h5>
                <ul>
                  <li><strong>Battery:</strong> Powers the starter motor and electronics</li>
                  <li><strong>Starter Motor:</strong> Cranks the engine to start the combustion cycle</li>
                </ul>

                <h5>Timing Belt/Chain:</h5>
                <ul>
                  <li><strong>Function:</strong> Synchronizes the movement of the crankshaft and camshaft(s) to ensure valves open and close at the correct times</li>
                </ul>
              </div>
            </div>

            <div class="content-section">
              <h3>Section 3: Differences Between Petrol and Diesel Engines (30 minutes)</h3>
              
              <h4>A. Combustion Process Differences</h4>
              <div class="comparison-section">
                <h5>Petrol Engines:</h5>
                <ul>
                  <li>Use a spark plug to ignite a pre-mixed air-fuel mixture</li>
                  <li>Operate at relatively lower compression ratios (around 8:1 to 12:1)</li>
                </ul>

                <h5>Diesel Engines:</h5>
                <ul>
                  <li>Rely on high compression to ignite the fuel (compression ignition)</li>
                  <li>Operate at higher compression ratios (typically 14:1 to 20:1)</li>
                </ul>
              </div>

              <h4>B. Fuel and Efficiency</h4>
              <div class="comparison-section">
                <h5>Petrol Engines:</h5>
                <ul>
                  <li>Use petrol, which is lighter and burns cleaner than diesel</li>
                  <li>Generally produce smoother power delivery but are less fuel-efficient</li>
                </ul>

                <h5>Diesel Engines:</h5>
                <ul>
                  <li>Use diesel fuel, which has higher energy density</li>
                  <li>Tend to be more fuel-efficient and offer greater torque for heavy-duty applications</li>
                </ul>
              </div>

              <h4>C. Application and Durability</h4>
              <div class="comparison-section">
                <h5>Petrol Engines:</h5>
                <ul>
                  <li>Commonly used in passenger cars, motorcycles, and smaller vehicles</li>
                  <li>Known for quick throttle response and higher RPM capabilities</li>
                </ul>

                <h5>Diesel Engines:</h5>
                <ul>
                  <li>Preferred in trucks, buses, and industrial equipment</li>
                  <li>Built for durability and longevity under heavy loads</li>
                </ul>
              </div>

              <div class="detailed-comparison">
                <h4>🔥 Detailed Comparison Summary</h4>
                
                <div class="comparison-grid">
                  <div class="comparison-item">
                    <h5>🔥 Ignition Method</h5>
                    <p><strong>Petrol:</strong> Uses a spark plug to ignite air-fuel mixture</p>
                    <p><strong>Diesel:</strong> Uses compression only – no spark plug needed</p>
                  </div>

                  <div class="comparison-item">
                    <h5>💨 Air-Fuel Mixing</h5>
                    <p><strong>Petrol:</strong> Air and fuel are mixed before entering the cylinder</p>
                    <p><strong>Diesel:</strong> Only air enters the cylinder and is compressed</p>
                  </div>

                  <div class="comparison-item">
                    <h5>🧯 Compression Ratio</h5>
                    <p><strong>Petrol:</strong> Lower (8:1 to 12:1)</p>
                    <p><strong>Diesel:</strong> Higher (14:1 to 25:1)</p>
                  </div>

                  <div class="comparison-item">
                    <h5>💥 Combustion Type</h5>
                    <p><strong>Petrol:</strong> Spark ignition - Rapid and controlled by spark</p>
                    <p><strong>Diesel:</strong> Compression ignition - Slower and relies on heat</p>
                  </div>

                  <div class="comparison-item">
                    <h5>🔧 Efficiency & Power</h5>
                    <p><strong>Petrol:</strong> Higher RPM, better for speed</p>
                    <p><strong>Diesel:</strong> More torque, better for heavy loads</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="summary-section">
              <h3>Conclusion and Q&A (30 minutes)</h3>
              
              <h4>A. Recap Key Points:</h4>
              <ul>
                <li>The four-stroke cycle—intake, compression, power, exhaust—is fundamental to how petrol engines operate</li>
                <li>Each engine component plays a specific role: the pistons transfer combustion energy to the crankshaft, the camshaft controls valve timing, and the cylinder block and head house these critical parts</li>
                <li>Petrol engines differ from diesel engines in ignition method, compression ratios, fuel type, and applications</li>
              </ul>

              <h4>B. Practice and Outcomes:</h4>
              <p>By the end of this lecture, participants will have a foundational understanding of petrol engine operation, the purpose of its key components, and how it differs from diesel engine technology. This knowledge sets the stage for more advanced topics in engine maintenance and repair.</p>
            </div>
          </div>
        `
      }
    },
    {
      id: 2,
      title: 'Petrol Fuel Systems Overview',
      duration: '45 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://youtu.be/aWeqyAxlM2M',
        textContent: `
          <div class="lesson-content">
            <h2>⛽ Petrol Fuel Systems Overview</h2>
            
            <div class="content-section">
              <h3>Carbureted vs. Fuel-Injected Engines</h3>
              
              <h4>Carbureted Engines (Traditional System)</h4>
              <ul>
                <li><strong>Function:</strong> Mixes air and fuel mechanically using a carburetor</li>
                <li><strong>Operation:</strong> Uses engine vacuum to draw fuel from the float bowl</li>
                <li><strong>Advantages:</strong> Simple design, easier to repair, lower cost</li>
                <li><strong>Disadvantages:</strong> Less precise fuel metering, poor cold-start performance</li>
                <li><strong>Common in:</strong> Older vehicles, small engines, motorcycles</li>
              </ul>

              <h4>Fuel-Injected Engines (Modern System)</h4>
              <ul>
                <li><strong>Function:</strong> Uses electronic fuel injectors to spray fuel directly into the intake or cylinder</li>
                <li><strong>Operation:</strong> Engine Control Unit (ECU) controls fuel delivery based on sensor data</li>
                <li><strong>Advantages:</strong> Precise fuel control, better fuel economy, lower emissions</li>
                <li><strong>Types:</strong> Port fuel injection, Direct injection</li>
                <li><strong>Common in:</strong> All modern vehicles</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Role of Air-Fuel Mixture in Combustion Efficiency</h3>
              
              <h4>Stoichiometric Ratio</h4>
              <ul>
                <li><strong>Definition:</strong> The ideal air-fuel ratio for complete combustion</li>
                <li><strong>For Petrol:</strong> 14.7:1 (14.7 parts air to 1 part fuel by weight)</li>
                <li><strong>Purpose:</strong> Ensures complete burning of fuel with minimal emissions</li>
              </ul>

              <h4>Rich vs. Lean Mixtures</h4>
              <div class="mixture-comparison">
                <h5>Rich Mixture (More Fuel)</h5>
                <ul>
                  <li><strong>Ratio:</strong> Less than 14.7:1 (e.g., 12:1)</li>
                  <li><strong>Effects:</strong> More power, cooler combustion, higher fuel consumption</li>
                  <li><strong>When Used:</strong> Cold starts, high performance situations</li>
                  <li><strong>Drawbacks:</strong> Increased emissions, carbon buildup</li>
                </ul>

                <h5>Lean Mixture (Less Fuel)</h5>
                <ul>
                  <li><strong>Ratio:</strong> More than 14.7:1 (e.g., 16:1)</li>
                  <li><strong>Effects:</strong> Better fuel economy, hotter combustion</li>
                  <li><strong>When Used:</strong> Cruising, light load conditions</li>
                  <li><strong>Drawbacks:</strong> Less power, risk of engine knock, higher NOx emissions</li>
                </ul>
              </div>

              <h4>Factors Affecting Mixture Quality</h4>
              <ul>
                <li><strong>Engine Temperature:</strong> Cold engines need richer mixtures</li>
                <li><strong>Load Conditions:</strong> Heavy loads require richer mixtures for power</li>
                <li><strong>Altitude:</strong> Higher altitudes have less oxygen, requiring mixture adjustment</li>
                <li><strong>Throttle Position:</strong> Wide-open throttle needs enrichment for maximum power</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Fuel System Components</h3>
              
              <h4>Fuel Tank and Delivery</h4>
              <ul>
                <li><strong>Fuel Tank:</strong> Stores fuel and houses the fuel pump</li>
                <li><strong>Fuel Pump:</strong> Delivers fuel under pressure to the engine</li>
                <li><strong>Fuel Lines:</strong> Transport fuel from tank to engine</li>
                <li><strong>Fuel Filter:</strong> Removes contaminants from fuel</li>
              </ul>

              <h4>Fuel Metering and Control</h4>
              <ul>
                <li><strong>Fuel Rail:</strong> Distributes fuel to individual injectors</li>
                <li><strong>Fuel Pressure Regulator:</strong> Maintains constant fuel pressure</li>
                <li><strong>Fuel Injectors:</strong> Spray fuel in precise amounts</li>
                <li><strong>ECU:</strong> Controls injection timing and duration</li>
              </ul>
            </div>

            <div class="summary-section">
              <h3>Summary</h3>
              <p>Understanding fuel systems is crucial for petrol engine operation. The evolution from carburetors to fuel injection has improved efficiency, emissions, and performance. Proper air-fuel mixture is essential for optimal combustion and engine longevity.</p>
            </div>
          </div>
        `
      }
    },
    {
      id: 3,
      title: 'Quiz: Introduction to Petrol Engines',
      duration: '20 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What are the four strokes of a four-stroke petrol engine cycle, in the correct order?',
            options: [
              'Intake, Compression, Power, Exhaust',
              'Compression, Exhaust, Power, Intake',
              'Power, Exhaust, Intake, Compression',
              'Intake, Power, Compression, Exhaust'
            ],
            correct: 0,
            explanation: 'The four-stroke cycle follows the sequence: Intake (drawing in air-fuel mixture), Compression (compressing the mixture), Power (ignition and expansion), and Exhaust (expelling burnt gases).'
          },
          {
            question: 'Which component of a petrol engine converts the up-and-down motion of the pistons into rotational motion?',
            options: [
              'Camshaft',
              'Crankshaft',
              'Cylinder block',
              'Valve'
            ],
            correct: 1,
            explanation: 'The crankshaft converts the reciprocating (up-and-down) motion of the pistons into rotational motion that can be used to drive the vehicle.'
          },
          {
            question: 'What is the primary function of the spark plug in a petrol engine?',
            options: [
              'To control the flow of air into the engine',
              'To ignite the air-fuel mixture in the cylinder',
              'To regulate the timing of the valves',
              'To reduce engine temperature during combustion'
            ],
            correct: 1,
            explanation: 'The spark plug generates the electrical spark that ignites the compressed air-fuel mixture in the cylinder during the power stroke.'
          },
          {
            question: 'Which component is responsible for opening and closing the intake and exhaust valves at the correct times?',
            options: [
              'Pistons',
              'Crankshaft',
              'Camshaft',
              'Cylinder head'
            ],
            correct: 2,
            explanation: 'The camshaft controls the opening and closing of the intake and exhaust valves, synchronized with the crankshaft via a timing belt or chain.'
          },
          {
            question: 'How do petrol engines differ from diesel engines in their ignition process?',
            options: [
              'Petrol engines use high compression to ignite the fuel, while diesel engines rely on a spark plug',
              'Petrol engines rely on a spark plug to ignite the air-fuel mixture, while diesel engines rely on high compression to ignite the fuel',
              'Petrol engines mix air and fuel outside the cylinder, while diesel engines mix them inside',
              'Petrol engines do not require ignition timing, whereas diesel engines do'
            ],
            correct: 1,
            explanation: 'Petrol engines use spark ignition (spark plugs) to ignite a pre-mixed air-fuel mixture, while diesel engines use compression ignition where high compression creates enough heat to ignite the fuel.'
          },
          {
            question: 'What is the typical compression ratio range for a petrol engine?',
            options: [
              '6:1 to 8:1',
              '8:1 to 12:1',
              '12:1 to 16:1',
              '14:1 to 20:1'
            ],
            correct: 1,
            explanation: 'Petrol engines typically have compression ratios between 8:1 and 12:1, which is lower than diesel engines to prevent knock and allow for proper spark ignition.'
          },
          {
            question: 'What is the primary function of the cylinder block in a petrol engine?',
            options: [
              'To house the pistons and allow them to move up and down',
              'To direct the air-fuel mixture into the engine',
              'To ignite the fuel at the right moment',
              'To convert rotational motion into linear motion'
            ],
            correct: 0,
            explanation: 'The cylinder block is the main engine structure that houses the cylinders where the pistons move up and down, and provides mounting points for other components.'
          },
          {
            question: 'Which of the following is a major advantage of petrol engines over diesel engines?',
            options: [
              'Higher torque at low RPMs',
              'Better fuel efficiency',
              'Quicker throttle response and higher RPM capabilities',
              'Lower compression ratios leading to longer engine life'
            ],
            correct: 2,
            explanation: 'Petrol engines are known for their quick throttle response and ability to operate at higher RPMs, making them ideal for applications requiring quick acceleration and high-speed performance.'
          }
        ]
      }
    }
  ]
};
