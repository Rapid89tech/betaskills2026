
import type { Module } from '@/types/course';

export const module3IgnitionSystem: Module = {
  id: 3,
  title: 'Ignition Systems and Timing',
  description: 'Study of ignition systems from mechanical points to modern electronic ignition, including timing procedures and diagnostics.',
  lessons: [
    {
      id: 7,
      title: 'Ignition System Fundamentals',
      duration: '55 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=lTiDWLNRhGQ',
        textContent: `
          <div class="lesson-content">
            <h2>⚡ Ignition System Fundamentals</h2>
            
            <div class="content-section">
              <h3>Purpose of Ignition System</h3>
              <p>The ignition system provides the spark needed to ignite the compressed air-fuel mixture in the combustion chamber at precisely the right moment.</p>
              
              <h4>Key Functions:</h4>
              <ul>
                <li>Generate high voltage (15,000-40,000 volts)</li>
                <li>Deliver spark at correct timing</li>
                <li>Provide sufficient spark energy for ignition</li>
                <li>Distribute spark to correct cylinder</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Types of Ignition Systems</h3>
              
              <h4>Conventional (Points) Ignition:</h4>
              <ul>
                <li>Mechanical points control primary circuit</li>
                <li>Condenser prevents point burning</li>
                <li>Centrifugal and vacuum advance mechanisms</li>
                <li>Requires regular maintenance and adjustment</li>
              </ul>

              <h4>Electronic Ignition:</h4>
              <ul>
                <li>Electronic switching replaces points</li>
                <li>Improved reliability and performance</li>
                <li>Reduced maintenance requirements</li>
                <li>Better high-speed operation</li>
              </ul>

              <h4>Distributorless Ignition (DIS):</h4>
              <ul>
                <li>No mechanical distributor</li>
                <li>Coil-on-plug or coil-near-plug design</li>
                <li>ECU controls timing electronically</li>
                <li>Improved reliability and performance</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Ignition System Components</h3>
              
              <h4>Primary Circuit Components:</h4>
              <ul>
                <li><strong>Battery:</strong> Provides 12V power source</li>
                <li><strong>Ignition Switch:</strong> Controls system power</li>
                <li><strong>Ignition Coil Primary:</strong> Low voltage winding</li>
                <li><strong>Switching Device:</strong> Points or electronic module</li>
                <li><strong>Ballast Resistor:</strong> Limits primary current</li>
              </ul>

              <h4>Secondary Circuit Components:</h4>
              <ul>
                <li><strong>Ignition Coil Secondary:</strong> High voltage winding</li>
                <li><strong>Distributor:</strong> Routes high voltage to cylinders</li>
                <li><strong>Spark Plug Wires:</strong> Carry high voltage to plugs</li>
                <li><strong>Spark Plugs:</strong> Create ignition spark</li>
                <li><strong>Rotor and Cap:</strong> Distribute spark timing</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Ignition Coil Operation</h3>
              
              <h4>Magnetic Induction Principle:</h4>
              <ul>
                <li>Primary winding creates magnetic field</li>
                <li>Switching device interrupts primary current</li>
                <li>Collapsing magnetic field induces high voltage</li>
                <li>Step-up transformer increases voltage</li>
              </ul>

              <h4>Coil Types:</h4>
              <ul>
                <li><strong>Oil-filled:</strong> Traditional design with oil cooling</li>
                <li><strong>Epoxy-filled:</strong> Sealed construction</li>
                <li><strong>Air-cooled:</strong> Open construction</li>
                <li><strong>Coil-on-plug:</strong> Individual coils per cylinder</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Spark Plugs</h3>
              
              <h4>Spark Plug Construction:</h4>
              <ul>
                <li><strong>Center Electrode:</strong> Carries high voltage</li>
                <li><strong>Ground Electrode:</strong> Provides return path</li>
                <li><strong>Insulator:</strong> Ceramic insulation</li>
                <li><strong>Shell:</strong> Threaded metal housing</li>
                <li><strong>Gasket:</strong> Seals combustion chamber</li>
              </ul>

              <h4>Heat Range:</h4>
              <ul>
                <li>Hot plugs: Long insulator nose, slower heat transfer</li>
                <li>Cold plugs: Short insulator nose, faster heat transfer</li>
                <li>Must match engine operating conditions</li>
                <li>Wrong heat range causes fouling or pre-ignition</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 8,
      title: 'Ignition Timing and Advance Systems',
      duration: '45 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=lTiDWLNRhGQ',
        textContent: `
          <div class="lesson-content">
            <h2>⏰ Ignition Timing and Advance Systems</h2>
            
            <div class="content-section">
              <h3>Ignition Timing Basics</h3>
              <p>Ignition timing refers to when the spark occurs in relation to piston position during the compression stroke.</p>
              
              <h4>Timing Terminology:</h4>
              <ul>
                <li><strong>BTDC:</strong> Before Top Dead Center</li>
                <li><strong>ATDC:</strong> After Top Dead Center</li>
                <li><strong>Base Timing:</strong> Initial timing setting</li>
                <li><strong>Total Advance:</strong> Maximum timing advance</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Why Timing Advance is Needed</h3>
              
              <h4>Combustion Characteristics:</h4>
              <ul>
                <li>Fuel burning takes time to complete</li>
                <li>Higher RPM means less time for combustion</li>
                <li>Peak pressure must occur after TDC</li>
                <li>Advance compensates for burn time</li>
              </ul>

              <h4>Load Considerations:</h4>
              <ul>
                <li>Light load: Lean mixture burns slowly</li>
                <li>Heavy load: Rich mixture burns quickly</li>
                <li>Vacuum advance for part-throttle operation</li>
                <li>Mechanical advance for high RPM</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Mechanical Advance Systems</h3>
              
              <h4>Centrifugal Advance:</h4>
              <ul>
                <li>Uses centrifugal force and weights</li>
                <li>Advances timing with increasing RPM</li>
                <li>Springs control advance rate</li>
                <li>Mechanical stops limit maximum advance</li>
              </ul>

              <h4>Vacuum Advance:</h4>
              <ul>
                <li>Uses intake manifold vacuum</li>
                <li>Advances timing during light load</li>
                <li>Improves fuel economy and emissions</li>
                <li>Diaphragm and spring mechanism</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Electronic Timing Control</h3>
              
              <h4>ECU-Controlled Timing:</h4>
              <ul>
                <li>Computer calculates optimal timing</li>
                <li>Uses multiple sensor inputs</li>
                <li>Adjusts for all operating conditions</li>
                <li>Knock sensor prevents detonation</li>
              </ul>

              <h4>Sensor Inputs:</h4>
              <ul>
                <li>Engine speed (RPM)</li>
                <li>Engine load (MAP or MAF)</li>
                <li>Coolant temperature</li>
                <li>Throttle position</li>
                <li>Knock sensor feedback</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Timing Problems and Effects</h3>
              
              <h4>Over-Advanced Timing:</h4>
              <ul>
                <li>Engine knock or ping</li>
                <li>Hard starting when hot</li>
                <li>Overheating</li>
                <li>Reduced power</li>
              </ul>

              <h4>Retarded Timing:</h4>
              <ul>
                <li>Poor acceleration</li>
                <li>Backfiring through exhaust</li>
                <li>Overheating</li>
                <li>Poor fuel economy</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 9,
      title: 'Module 3 Quiz: Ignition Systems',
      duration: '15 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What voltage range do ignition systems typically produce?',
            options: [
              '12-24 volts',
              '120-240 volts',
              '1,500-4,000 volts',
              '15,000-40,000 volts'
            ],
            correct: 3,
            explanation: 'Ignition systems typically produce 15,000-40,000 volts to create a strong enough spark to ignite the compressed air-fuel mixture in the combustion chamber.'
          },
          {
            question: 'What is the purpose of vacuum advance in ignition systems?',
            options: [
              'To advance timing at high RPM',
              'To advance timing during light load conditions',
              'To retard timing during acceleration',
              'To eliminate the need for mechanical advance'
            ],
            correct: 1,
            explanation: 'Vacuum advance advances ignition timing during light load conditions (high vacuum) to improve fuel economy and reduce emissions when the engine is running at part throttle.'
          },
          {
            question: 'What determines the heat range of a spark plug?',
            options: [
              'The electrode gap',
              'The thread size',
              'The length of the insulator nose',
              'The metal composition'
            ],
            correct: 2,
            explanation: 'The heat range of a spark plug is determined by the length of the insulator nose - longer noses conduct heat slower (hot plugs), shorter noses conduct heat faster (cold plugs).'
          },
          {
            question: 'What happens if ignition timing is too advanced?',
            options: [
              'Poor acceleration and backfiring',
              'Engine knock and overheating',
              'Increased fuel economy',
              'Smoother idle'
            ],
            correct: 1,
            explanation: 'Over-advanced timing causes engine knock (ping) and overheating because combustion pressure peaks before the piston reaches TDC, working against the piston movement.'
          },
          {
            question: 'In a distributorless ignition system, what controls the timing?',
            options: [
              'Mechanical advance weights',
              'Vacuum advance diaphragm',
              'Electronic Control Unit (ECU)',
              'Timing chain position'
            ],
            correct: 2,
            explanation: 'In distributorless ignition systems, the Electronic Control Unit (ECU) controls timing electronically using inputs from various sensors to calculate optimal timing for all conditions.'
          }
        ]
      }
    }
  ]
};
