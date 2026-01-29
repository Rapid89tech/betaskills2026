
import type { Module } from '@/types/course';

export const module2FuelSystem: Module = {
  id: 2,
  title: 'Fuel System Operation and Diagnostics',
  description: 'Comprehensive study of petrol fuel systems, including carburettors, fuel injection, and modern electronic fuel management.',
  lessons: [
    {
      id: 4,
      title: 'Carburettor Systems',
      duration: '60 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=toVfvRhWbj8',
        textContent: `
          <div class="lesson-content">
            <h2>⛽ Carburettor Systems</h2>
            
            <div class="content-section">
              <h3>Carburettor Principles</h3>
              <p>Carburettors mix air and fuel using the venturi effect and atmospheric pressure differences.</p>
              
              <h4>Basic Operation:</h4>
              <ul>
                <li>Air flows through venturi creating low pressure</li>
                <li>Low pressure draws fuel from float chamber</li>
                <li>Fuel mixes with air to create combustible mixture</li>
                <li>Mixture flows to engine cylinders</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Carburettor Components</h3>
              
              <h4>Main Components:</h4>
              <ul>
                <li><strong>Float Chamber:</strong> Maintains constant fuel level</li>
                <li><strong>Venturi:</strong> Creates pressure differential</li>
                <li><strong>Throttle Valve:</strong> Controls airflow and power</li>
                <li><strong>Choke Valve:</strong> Enriches mixture for cold starts</li>
                <li><strong>Jets:</strong> Control fuel flow at different loads</li>
              </ul>

              <h4>Fuel Circuits:</h4>
              <ul>
                <li><strong>Idle Circuit:</strong> Provides fuel at idle speed</li>
                <li><strong>Main Circuit:</strong> Supplies fuel during normal operation</li>
                <li><strong>Power Circuit:</strong> Enriches mixture under full load</li>
                <li><strong>Accelerator Circuit:</strong> Provides extra fuel during acceleration</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Common Carburettor Problems</h3>
              
              <h4>Symptoms and Causes:</h4>
              <ul>
                <li><strong>Hard Starting:</strong> Blocked jets, incorrect float level</li>
                <li><strong>Poor Idle:</strong> Dirty idle circuit, air leaks</li>
                <li><strong>Hesitation:</strong> Accelerator pump issues, lean mixture</li>
                <li><strong>Black Smoke:</strong> Rich mixture, dirty air filter</li>
                <li><strong>Poor Fuel Economy:</strong> Rich mixture, incorrect adjustments</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Carburettor Maintenance</h3>
              
              <h4>Regular Maintenance:</h4>
              <ul>
                <li>Clean air filter regularly</li>
                <li>Check and adjust idle mixture</li>
                <li>Inspect for fuel leaks</li>
                <li>Clean carburettor body and jets</li>
                <li>Check float level and operation</li>
              </ul>

              <h4>Rebuild Procedures:</h4>
              <ul>
                <li>Disassemble carburettor completely</li>
                <li>Clean all components with carb cleaner</li>
                <li>Replace all gaskets and seals</li>
                <li>Check jet sizes and replace if worn</li>
                <li>Reassemble with proper torque specifications</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 5,
      title: 'Fuel Injection Systems',
      duration: '70 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=_z5jU5nrlAI',
        textContent: `
          <div class="lesson-content">
            <h2>🔧 Fuel Injection Systems</h2>
            
            <div class="content-section">
              <h3>Types of Fuel Injection</h3>
              
              <h4>Single Point Injection (SPI/TBI):</h4>
              <ul>
                <li>One or two injectors above throttle body</li>
                <li>Replaces carburettor with electronic control</li>
                <li>Simple design and maintenance</li>
                <li>Lower cost but less precise fuel control</li>
              </ul>

              <h4>Multi-Point Injection (MPI/PFI):</h4>
              <ul>
                <li>One injector per cylinder</li>
                <li>Precise fuel control for each cylinder</li>
                <li>Better fuel economy and emissions</li>
                <li>Located in intake manifold</li>
              </ul>

              <h4>Direct Injection (DI/GDI):</h4>
              <ul>
                <li>Fuel injected directly into combustion chamber</li>
                <li>Highest precision and efficiency</li>
                <li>Enables stratified charge combustion</li>
                <li>Higher injection pressures required</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Fuel Injection Components</h3>
              
              <h4>Fuel Delivery System:</h4>
              <ul>
                <li><strong>Fuel Tank:</strong> Stores fuel with in-tank pump</li>
                <li><strong>Fuel Pump:</strong> Electric pump provides pressure</li>
                <li><strong>Fuel Filter:</strong> Removes contaminants</li>
                <li><strong>Fuel Rail:</strong> Distributes fuel to injectors</li>
                <li><strong>Pressure Regulator:</strong> Maintains correct pressure</li>
              </ul>

              <h4>Electronic Control:</h4>
              <ul>
                <li><strong>ECU:</strong> Engine Control Unit manages injection</li>
                <li><strong>Injectors:</strong> Solenoid-operated valves</li>
                <li><strong>Sensors:</strong> Provide feedback to ECU</li>
                <li><strong>Wiring Harness:</strong> Connects components</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Fuel Injection Operation</h3>
              
              <h4>Injection Timing:</h4>
              <ul>
                <li>Synchronized with engine timing</li>
                <li>Timed to intake valve opening</li>
                <li>Calculated based on engine load and speed</li>
                <li>Adjusted for optimal performance</li>
              </ul>

              <h4>Injection Duration:</h4>
              <ul>
                <li>Controlled by ECU pulse width</li>
                <li>Based on airflow measurements</li>
                <li>Modified by sensor inputs</li>
                <li>Adjusted for fuel pressure variations</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Fuel Injection Diagnostics</h3>
              
              <h4>Common Problems:</h4>
              <ul>
                <li><strong>Clogged Injectors:</strong> Poor spray pattern, rough idle</li>
                <li><strong>Fuel Pump Failure:</strong> Low pressure, no start condition</li>
                <li><strong>Pressure Regulator Issues:</strong> Incorrect fuel pressure</li>
                <li><strong>Sensor Failures:</strong> Incorrect fuel mixture</li>
                <li><strong>Wiring Problems:</strong> Intermittent operation</li>
              </ul>

              <h4>Diagnostic Procedures:</h4>
              <ul>
                <li>Check fuel pressure with gauge</li>
                <li>Test injector operation with noid lights</li>
                <li>Measure injector resistance</li>
                <li>Check for diagnostic trouble codes</li>
                <li>Perform injector flow tests</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 6,
      title: 'Module 2 Quiz: Fuel Systems',
      duration: '15 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What principle do carburettors use to draw fuel into the air stream?',
            options: [
              'Bernoulli principle and venturi effect',
              'Centrifugal force',
              'Magnetic attraction',
              'Thermal expansion'
            ],
            correct: 0,
            explanation: 'Carburettors use the Bernoulli principle and venturi effect - as air speed increases through the venturi, pressure decreases, creating a vacuum that draws fuel from the float chamber.'
          },
          {
            question: 'Which type of fuel injection provides the most precise fuel control?',
            options: [
              'Single Point Injection (SPI)',
              'Multi-Point Injection (MPI)',
              'Direct Injection (DI)',
              'Mechanical injection'
            ],
            correct: 2,
            explanation: 'Direct Injection (DI) provides the most precise fuel control as it injects fuel directly into the combustion chamber, allowing for exact timing and quantity control.'
          },
          {
            question: 'What is the purpose of the fuel pressure regulator?',
            options: [
              'To increase fuel pressure',
              'To maintain constant fuel pressure',
              'To filter fuel',
              'To pump fuel'
            ],
            correct: 1,
            explanation: 'The fuel pressure regulator maintains constant fuel pressure in the fuel system, ensuring consistent injector operation regardless of engine load or fuel pump variations.'
          },
          {
            question: 'Which component in a carburettor maintains a constant fuel level?',
            options: [
              'Venturi',
              'Throttle valve',
              'Float chamber',
              'Choke valve'
            ],
            correct: 2,
            explanation: 'The float chamber maintains a constant fuel level using a float and needle valve system that opens and closes to maintain the correct fuel level.'
          },
          {
            question: 'What diagnostic tool is used to test fuel injector operation?',
            options: [
              'Compression tester',
              'Noid light',
              'Timing light',
              'Vacuum gauge'
            ],
            correct: 1,
            explanation: 'A noid light is used to test fuel injector operation by connecting to the injector harness and flashing when the ECU sends a pulse to the injector.'
          }
        ]
      }
    }
  ]
};
