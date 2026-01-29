
import type { Module } from '@/types/course';

export const module5Diagnostics: Module = {
  id: 5,
  title: 'Engine Diagnostics and Troubleshooting',
  description: 'Advanced diagnostic techniques for petrol engines, including electronic diagnostics, performance testing, and systematic troubleshooting.',
  lessons: [
    {
      id: 13,
      title: 'Electronic Engine Diagnostics',
      duration: '65 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=ScvwDXh-dQQ',
        textContent: `
          <div class="lesson-content">
            <h2>🔧 Electronic Engine Diagnostics</h2>
            
            <div class="content-section">
              <h3>Modern Engine Management Systems</h3>
              <p>Modern petrol engines use sophisticated electronic control systems to optimize performance, fuel economy, and emissions.</p>
              
              <h4>Key Components:</h4>
              <ul>
                <li><strong>ECU (Engine Control Unit):</strong> Main computer</li>
                <li><strong>Sensors:</strong> Provide input data</li>
                <li><strong>Actuators:</strong> Execute ECU commands</li>
                <li><strong>Wiring Harness:</strong> Connects all components</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Essential Engine Sensors</h3>
              
              <h4>Airflow Sensors:</h4>
              <ul>
                <li><strong>MAF (Mass Airflow):</strong> Measures air mass entering engine</li>
                <li><strong>MAP (Manifold Absolute Pressure):</strong> Measures intake pressure</li>
                <li><strong>TPS (Throttle Position):</strong> Monitors throttle opening</li>
              </ul>

              <h4>Temperature Sensors:</h4>
              <ul>
                <li><strong>ECT (Engine Coolant Temperature):</strong> Engine temperature</li>
                <li><strong>IAT (Intake Air Temperature):</strong> Incoming air temperature</li>
                <li><strong>Oil Temperature:</strong> Engine oil temperature</li>
              </ul>

              <h4>Position Sensors:</h4>
              <ul>
                <li><strong>Crankshaft Position:</strong> Engine speed and position</li>
                <li><strong>Camshaft Position:</strong> Valve timing reference</li>
                <li><strong>Knock Sensor:</strong> Detects engine knock</li>
              </ul>

              <h4>Exhaust Sensors:</h4>
              <ul>
                <li><strong>O2 Sensors:</strong> Monitor exhaust oxygen content</li>
                <li><strong>AF (Air/Fuel) Sensors:</strong> Precise mixture monitoring</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Diagnostic Trouble Codes (DTCs)</h3>
              
              <h4>Code Categories:</h4>
              <ul>
                <li><strong>P0xxx:</strong> Generic powertrain codes</li>
                <li><strong>P1xxx:</strong> Manufacturer specific codes</li>
                <li><strong>P2xxx:</strong> Generic powertrain codes (additional)</li>
                <li><strong>P3xxx:</strong> Generic powertrain codes (additional)</li>
              </ul>

              <h4>Code Types:</h4>
              <ul>
                <li><strong>Current Codes:</strong> Active problems</li>
                <li><strong>Pending Codes:</strong> Intermittent issues</li>
                <li><strong>Permanent Codes:</strong> Emissions-related codes</li>
                <li><strong>History Codes:</strong> Previously stored codes</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Diagnostic Equipment</h3>
              
              <h4>Scan Tools:</h4>
              <ul>
                <li><strong>Basic Code Readers:</strong> Read and clear DTCs</li>
                <li><strong>Enhanced Scanners:</strong> Live data, actuator tests</li>
                <li><strong>Professional Tools:</strong> Manufacturer-specific functions</li>
                <li><strong>PC-Based Systems:</strong> Advanced diagnostics</li>
              </ul>

              <h4>Multimeters:</h4>
              <ul>
                <li>Voltage measurements</li>
                <li>Resistance testing</li>
                <li>Current flow testing</li>
                <li>Continuity checks</li>
              </ul>

              <h4>Oscilloscopes:</h4>
              <ul>
                <li>Waveform analysis</li>
                <li>Signal timing verification</li>
                <li>Intermittent fault detection</li>
                <li>Sensor pattern testing</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Diagnostic Procedures</h3>
              
              <h4>Systematic Approach:</h4>
              <ol>
                <li>Verify customer complaint</li>
                <li>Visual inspection</li>
                <li>Retrieve diagnostic codes</li>
                <li>Analyze live data</li>
                <li>Test suspect components</li>
                <li>Repair and verify fix</li>
              </ol>

              <h4>Live Data Analysis:</h4>
              <ul>
                <li>Compare values to specifications</li>
                <li>Look for erratic readings</li>
                <li>Check sensor correlation</li>
                <li>Monitor during test drive</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 14,
      title: 'Engine Performance Testing',
      duration: '55 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=ScvwDXh-dQQ',
        textContent: `
          <div class="lesson-content">
            <h2>📊 Engine Performance Testing</h2>
            
            <div class="content-section">
              <h3>Compression Testing</h3>
              <p>Compression testing evaluates the engine's ability to compress the air-fuel mixture, indicating internal engine condition.</p>
              
              <h4>Compression Test Procedure:</h4>
              <ol>
                <li>Warm engine to operating temperature</li>
                <li>Remove all spark plugs</li>
                <li>Disable ignition system</li>
                <li>Install compression tester</li>
                <li>Crank engine for 5-10 compressions</li>
                <li>Record readings for all cylinders</li>
              </ol>

              <h4>Compression Specifications:</h4>
              <ul>
                <li>Typical range: 125-180 PSI</li>
                <li>Variation between cylinders: Max 25 PSI</li>
                <li>Minimum acceptable: 100 PSI</li>
                <li>Wet test if compression is low</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Cylinder Leakage Testing</h3>
              <p>Cylinder leakage testing identifies where compression is being lost in the engine.</p>
              
              <h4>Leakage Test Procedure:</h4>
              <ol>
                <li>Position piston at TDC compression</li>
                <li>Connect leakage tester to cylinder</li>
                <li>Apply regulated air pressure</li>
                <li>Measure percentage of leakage</li>
                <li>Listen for air leaks at various locations</li>
              </ol>

              <h4>Leakage Interpretation:</h4>
              <ul>
                <li><strong>0-5%:</strong> Excellent condition</li>
                <li><strong>5-10%:</strong> Good condition</li>
                <li><strong>10-20%:</strong> Fair condition</li>
                <li><strong>20%+:</strong> Poor condition, needs repair</li>
              </ul>

              <h4>Leak Location Identification:</h4>
              <ul>
                <li><strong>Intake manifold:</strong> Intake valve leak</li>
                <li><strong>Exhaust pipe:</strong> Exhaust valve leak</li>
                <li><strong>Radiator:</strong> Head gasket leak</li>
                <li><strong>Oil filler cap:</strong> Piston ring leak</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Vacuum Testing</h3>
              <p>Engine vacuum testing provides valuable information about engine condition and valve timing.</p>
              
              <h4>Vacuum Test Setup:</h4>
              <ul>
                <li>Connect vacuum gauge to intake manifold</li>
                <li>Engine at normal operating temperature</li>
                <li>All accessories turned off</li>
                <li>Observe readings at various RPM</li>
              </ul>

              <h4>Vacuum Reading Interpretation:</h4>
              <ul>
                <li><strong>18-22 inHg steady:</strong> Good engine condition</li>
                <li><strong>Low steady reading:</strong> Late ignition timing</li>
                <li><strong>Fluctuating needle:</strong> Valve problems</li>
                <li><strong>Gradual drop:</strong> Exhaust restriction</li>
                <li><strong>Rapid fluctuation:</strong> Intake leak</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Fuel System Testing</h3>
              
              <h4>Fuel Pressure Testing:</h4>
              <ul>
                <li>Connect fuel pressure gauge</li>
                <li>Check static pressure (key on, engine off)</li>
                <li>Check running pressure</li>
                <li>Check pressure drop after shutdown</li>
                <li>Compare to specifications</li>
              </ul>

              <h4>Fuel Injector Testing:</h4>
              <ul>
                <li>Resistance testing with multimeter</li>
                <li>Noid light testing for pulse signal</li>
                <li>Flow testing for spray pattern</li>
                <li>Balance testing between cylinders</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Ignition System Testing</h3>
              
              <h4>Spark Testing:</h4>
              <ul>
                <li>Spark tester for spark strength</li>
                <li>Timing light for ignition timing</li>
                <li>Oscilloscope for detailed analysis</li>
                <li>Coil testing for primary/secondary resistance</li>
              </ul>

              <h4>Ignition Coil Testing:</h4>
              <ul>
                <li>Primary resistance: 0.5-2.0 ohms typical</li>
                <li>Secondary resistance: 6,000-30,000 ohms typical</li>
                <li>Insulation resistance test</li>
                <li>Current ramp testing</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 15,
      title: 'Module 5 Quiz: Engine Diagnostics',
      duration: '20 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the typical compression reading range for a healthy petrol engine?',
            options: [
              '50-80 PSI',
              '125-180 PSI',
              '200-250 PSI',
              '300-400 PSI'
            ],
            correct: 1,
            explanation: 'A healthy petrol engine typically has compression readings between 125-180 PSI, with no more than 25 PSI variation between cylinders.'
          },
          {
            question: 'What does a cylinder leakage test measure?',
            options: [
              'Fuel pressure in the cylinder',
              'The percentage of compressed air that leaks out of the cylinder',
              'The temperature of the cylinder',
              'The electrical resistance of the spark plug'
            ],
            correct: 1,
            explanation: 'A cylinder leakage test measures the percentage of compressed air that leaks out of the cylinder, helping identify where compression is being lost (valves, rings, head gasket).'
          },
          {
            question: 'What does the MAF sensor measure?',
            options: [
              'Manifold air pressure',
              'Mass airflow entering the engine',
              'Fuel pressure',
              'Exhaust gas temperature'
            ],
            correct: 1,
            explanation: 'The MAF (Mass Airflow) sensor measures the mass of air entering the engine, which the ECU uses to calculate the correct amount of fuel to inject.'
          },
          {
            question: 'What would cause a vacuum gauge reading to fluctuate rapidly at idle?',
            options: [
              'Perfect engine condition',
              'Valve problems',
              'Exhaust restriction',
              'Intake air leak'
            ],
            correct: 3,
            explanation: 'A rapidly fluctuating vacuum gauge reading at idle typically indicates an intake air leak, which causes irregular airflow into the engine.'
          },
          {
            question: 'What does a P0xxx diagnostic trouble code indicate?',
            options: [
              'Manufacturer-specific powertrain code',
              'Generic powertrain code',
              'Body control module code',
              'Chassis control code'
            ],
            correct: 1,
            explanation: 'P0xxx codes are generic powertrain diagnostic trouble codes that are standardized across all manufacturers and relate to engine, transmission, and emissions systems.'
          }
        ]
      }
    }
  ]
};
