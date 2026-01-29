
import type { Module } from '@/types/course';

export const module4CoolingSystem: Module = {
  id: 4,
  title: 'Cooling System Operation and Maintenance',
  description: 'Understanding cooling system components, operation, diagnostics, and maintenance procedures.',
  lessons: [
    {
      id: 10,
      title: 'Cooling System Components and Operation',
      duration: '50 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=OaJUjwIKTCc',
        textContent: `
          <div class="lesson-content">
            <h2>🌡️ Cooling System Components and Operation</h2>
            
            <div class="content-section">
              <h3>Purpose of Cooling System</h3>
              <p>The cooling system maintains optimal engine operating temperature by removing excess heat generated during combustion.</p>
              
              <h4>Key Functions:</h4>
              <ul>
                <li>Remove excess heat from engine components</li>
                <li>Maintain optimal operating temperature (85-95°C)</li>
                <li>Prevent overheating and engine damage</li>
                <li>Provide heat for passenger compartment</li>
                <li>Help engine reach operating temperature quickly</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Cooling System Components</h3>
              
              <h4>Heat Exchange Components:</h4>
              <ul>
                <li><strong>Radiator:</strong> Primary heat exchanger</li>
                <li><strong>Heater Core:</strong> Provides cabin heating</li>
                <li><strong>Engine Block:</strong> Contains water jackets</li>
                <li><strong>Cylinder Head:</strong> Cooling passages around valves</li>
                <li><strong>Oil Cooler:</strong> Cools engine oil (some engines)</li>
              </ul>

              <h4>Flow Control Components:</h4>
              <ul>
                <li><strong>Water Pump:</strong> Circulates coolant through system</li>
                <li><strong>Thermostat:</strong> Controls coolant flow and temperature</li>
                <li><strong>Radiator Cap:</strong> Pressurizes system</li>
                <li><strong>Cooling Fan:</strong> Increases airflow through radiator</li>
                <li><strong>Fan Shroud:</strong> Directs airflow efficiently</li>
              </ul>

              <h4>Connecting Components:</h4>
              <ul>
                <li><strong>Radiator Hoses:</strong> Upper and lower hoses</li>
                <li><strong>Heater Hoses:</strong> Connect to heater core</li>
                <li><strong>Bypass Hose:</strong> Allows circulation when thermostat closed</li>
                <li><strong>Overflow Tank:</strong> Handles coolant expansion</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Cooling System Operation</h3>
              
              <h4>Cold Engine Starting:</h4>
              <ul>
                <li>Thermostat remains closed</li>
                <li>Coolant circulates through bypass</li>
                <li>Water pump operates continuously</li>
                <li>Engine warms up quickly</li>
              </ul>

              <h4>Normal Operating Temperature:</h4>
              <ul>
                <li>Thermostat opens at rated temperature</li>
                <li>Coolant flows through radiator</li>
                <li>Fan operates when needed</li>
                <li>System maintains steady temperature</li>
              </ul>

              <h4>Pressurized System Benefits:</h4>
              <ul>
                <li>Raises coolant boiling point</li>
                <li>Prevents coolant loss</li>
                <li>Improves heat transfer efficiency</li>
                <li>Allows higher operating temperatures</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Types of Cooling Systems</h3>
              
              <h4>Liquid Cooling (Most Common):</h4>
              <ul>
                <li>Uses water/antifreeze mixture</li>
                <li>Efficient heat transfer</li>
                <li>Quiet operation</li>
                <li>Compact engine design possible</li>
              </ul>

              <h4>Air Cooling (Less Common):</h4>
              <ul>
                <li>Uses air directly on engine fins</li>
                <li>Simpler system design</li>
                <li>No coolant leaks possible</li>
                <li>Limited to smaller engines</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Coolant Properties and Types</h3>
              
              <h4>Coolant Functions:</h4>
              <ul>
                <li>Absorb and transfer heat</li>
                <li>Prevent freezing in cold weather</li>
                <li>Prevent boiling at high temperatures</li>
                <li>Protect against corrosion</li>
                <li>Lubricate water pump</li>
              </ul>

              <h4>Coolant Types:</h4>
              <ul>
                <li><strong>IAT (Inorganic Acid Technology):</strong> Traditional green coolant</li>
                <li><strong>OAT (Organic Acid Technology):</strong> Long-life coolant</li>
                <li><strong>HOAT (Hybrid OAT):</strong> Combines IAT and OAT</li>
                <li><strong>POAT (Phosphated OAT):</strong> Asian vehicle formula</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 11,
      title: 'Cooling System Diagnostics and Repair',
      duration: '60 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=OaJUjwIKTCc',
        textContent: `
          <div class="lesson-content">
            <h2>🔧 Cooling System Diagnostics and Repair</h2>
            
            <div class="content-section">
              <h3>Common Cooling System Problems</h3>
              
              <h4>Overheating Causes:</h4>
              <ul>
                <li><strong>Low coolant level:</strong> Leaks, evaporation</li>
                <li><strong>Thermostat problems:</strong> Stuck closed or wrong temperature</li>
                <li><strong>Water pump failure:</strong> Impeller damage, bearing failure</li>
                <li><strong>Radiator blockage:</strong> Internal or external restrictions</li>
                <li><strong>Fan problems:</strong> Motor failure, clutch issues</li>
                <li><strong>Head gasket failure:</strong> Combustion gases in coolant</li>
              </ul>

              <h4>Overcooling Causes:</h4>
              <ul>
                <li>Thermostat stuck open</li>
                <li>Wrong temperature thermostat</li>
                <li>Fan running continuously</li>
                <li>Excessive airflow</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Diagnostic Procedures</h3>
              
              <h4>Visual Inspection:</h4>
              <ul>
                <li>Check coolant level and condition</li>
                <li>Inspect hoses for cracks and leaks</li>
                <li>Check radiator for damage and blockage</li>
                <li>Examine water pump for leaks</li>
                <li>Test radiator cap pressure rating</li>
              </ul>

              <h4>Pressure Testing:</h4>
              <ul>
                <li>Pressure test cooling system</li>
                <li>Test radiator cap operation</li>
                <li>Check for internal leaks</li>
                <li>Identify external leak sources</li>
              </ul>

              <h4>Thermostat Testing:</h4>
              <ul>
                <li>Check opening temperature</li>
                <li>Verify full opening</li>
                <li>Test in hot water bath</li>
                <li>Check for proper sealing when closed</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Water Pump Diagnosis</h3>
              
              <h4>Signs of Water Pump Failure:</h4>
              <ul>
                <li>Coolant leaks from weep hole</li>
                <li>Bearing noise or roughness</li>
                <li>Loose or wobbling pulley</li>
                <li>Overheating despite proper coolant level</li>
                <li>Cavitation damage to impeller</li>
              </ul>

              <h4>Testing Procedures:</h4>
              <ul>
                <li>Check pulley for looseness</li>
                <li>Listen for bearing noise</li>
                <li>Inspect weep hole for leaks</li>
                <li>Test coolant flow rate</li>
                <li>Check impeller condition</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Radiator Service and Repair</h3>
              
              <h4>Cleaning Procedures:</h4>
              <ul>
                <li>External cleaning with compressed air</li>
                <li>Chemical flushing for internal cleaning</li>
                <li>Reverse flushing for stubborn blockages</li>
                <li>Pressure washing external surfaces</li>
              </ul>

              <h4>Repair Procedures:</h4>
              <ul>
                <li>Minor leak repair with sealant</li>
                <li>Tank replacement for major damage</li>
                <li>Core replacement when necessary</li>
                <li>Professional radiator shop services</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Cooling System Maintenance</h3>
              
              <h4>Regular Maintenance:</h4>
              <ul>
                <li>Check coolant level regularly</li>
                <li>Inspect hoses and clamps</li>
                <li>Test radiator cap annually</li>
                <li>Clean radiator external surfaces</li>
                <li>Check belt tension and condition</li>
              </ul>

              <h4>Coolant Service:</h4>
              <ul>
                <li>Follow manufacturer's change intervals</li>
                <li>Use correct coolant type</li>
                <li>Proper mixing ratios (usually 50/50)</li>
                <li>Complete system flushing</li>
                <li>Bleed air from system properly</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 12,
      title: 'Module 4 Quiz: Cooling Systems',
      duration: '15 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the typical operating temperature range for most petrol engines?',
            options: [
              '60-70°C',
              '85-95°C',
              '110-120°C',
              '130-140°C'
            ],
            correct: 1,
            explanation: 'Most petrol engines operate optimally between 85-95°C (185-203°F). This temperature range ensures efficient combustion while preventing overheating.'
          },
          {
            question: 'What happens when the thermostat is stuck in the closed position?',
            options: [
              'The engine will run too cold',
              'The engine will overheat',
              'Fuel economy will improve',
              'The heater will work better'
            ],
            correct: 1,
            explanation: 'When the thermostat is stuck closed, coolant cannot flow to the radiator, causing the engine to overheat as heat cannot be dissipated.'
          },
          {
            question: 'What is the primary purpose of pressurizing the cooling system?',
            options: [
              'To increase coolant flow rate',
              'To raise the boiling point of coolant',
              'To reduce the amount of coolant needed',
              'To make the water pump work harder'
            ],
            correct: 1,
            explanation: 'Pressurizing the cooling system raises the boiling point of the coolant, allowing the engine to operate at higher temperatures without the coolant boiling.'
          },
          {
            question: 'Which component circulates coolant through the cooling system?',
            options: [
              'Thermostat',
              'Radiator',
              'Water pump',
              'Radiator cap'
            ],
            correct: 2,
            explanation: 'The water pump circulates coolant through the entire cooling system, driven by the engine via a belt or timing chain.'
          },
          {
            question: 'What is the typical coolant-to-water ratio in most cooling systems?',
            options: [
              '25/75',
              '50/50',
              '75/25',
              '100/0'
            ],
            correct: 1,
            explanation: 'The typical coolant-to-water ratio is 50/50, providing optimal freeze protection, boiling point elevation, and corrosion protection.'
          }
        ]
      }
    }
  ]
};
