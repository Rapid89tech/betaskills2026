
import type { Module } from '@/types/course';

export const module6Maintenance: Module = {
  id: 6,
  title: 'Preventive Maintenance and Service Procedures',
  description: 'Comprehensive preventive maintenance procedures for petrol engines, including service intervals and best practices.',
  lessons: [
    {
      id: 16,
      title: 'Engine Service Intervals and Procedures',
      duration: '45 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=O1hF25Cowv8',
        textContent: `
          <div class="lesson-content">
            <h2>🛠️ Engine Service Intervals and Procedures</h2>
            
            <div class="content-section">
              <h3>Importance of Preventive Maintenance</h3>
              <p>Regular preventive maintenance is essential for engine longevity, reliability, and optimal performance.</p>
              
              <h4>Benefits of Regular Maintenance:</h4>
              <ul>
                <li>Extends engine life</li>
                <li>Maintains fuel efficiency</li>
                <li>Prevents costly repairs</li>
                <li>Ensures reliable operation</li>
                <li>Maintains warranty coverage</li>
                <li>Reduces emissions</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Oil and Filter Service</h3>
              
              <h4>Oil Change Intervals:</h4>
              <ul>
                <li><strong>Conventional Oil:</strong> 5,000-7,500 km</li>
                <li><strong>Semi-Synthetic:</strong> 7,500-10,000 km</li>
                <li><strong>Full Synthetic:</strong> 10,000-15,000 km</li>
                <li><strong>Severe Conditions:</strong> Reduce intervals by 50%</li>
              </ul>

              <h4>Oil Change Procedure:</h4>
              <ol>
                <li>Warm engine to operating temperature</li>
                <li>Raise vehicle safely</li>
                <li>Remove drain plug and drain oil</li>
                <li>Replace drain plug with new gasket</li>
                <li>Remove and replace oil filter</li>
                <li>Add new oil to proper level</li>
                <li>Check for leaks and proper level</li>
              </ol>

              <h4>Oil Selection:</h4>
              <ul>
                <li>Use manufacturer-specified viscosity</li>
                <li>Check API certification</li>
                <li>Consider driving conditions</li>
                <li>Follow vehicle manufacturer recommendations</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Air Filter Service</h3>
              
              <h4>Service Intervals:</h4>
              <ul>
                <li>Normal conditions: 30,000-50,000 km</li>
                <li>Dusty conditions: 15,000-25,000 km</li>
                <li>Check every oil change</li>
                <li>Replace when dirty or damaged</li>
              </ul>

              <h4>Air Filter Types:</h4>
              <ul>
                <li><strong>Paper filters:</strong> Most common, disposable</li>
                <li><strong>Cloth filters:</strong> Reusable, washable</li>
                <li><strong>Foam filters:</strong> Washable, oil-treated</li>
                <li><strong>High-performance:</strong> Increased flow capacity</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Spark Plug Service</h3>
              
              <h4>Service Intervals:</h4>
              <ul>
                <li>Conventional plugs: 30,000-50,000 km</li>
                <li>Platinum plugs: 80,000-100,000 km</li>
                <li>Iridium plugs: 100,000-150,000 km</li>
                <li>Check every major service</li>
              </ul>

              <h4>Spark Plug Inspection:</h4>
              <ul>
                <li>Check electrode wear</li>
                <li>Inspect for carbon deposits</li>
                <li>Look for oil fouling</li>
                <li>Check ceramic insulator</li>
                <li>Verify proper gap</li>
              </ul>

              <h4>Installation Procedure:</h4>
              <ul>
                <li>Clean spark plug wells</li>
                <li>Check plug gap before installation</li>
                <li>Use anti-seize compound on threads</li>
                <li>Tighten to manufacturer specification</li>
                <li>Reconnect ignition wires properly</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Fuel Filter Service</h3>
              
              <h4>Service Intervals:</h4>
              <ul>
                <li>External filters: 30,000-60,000 km</li>
                <li>In-tank filters: 80,000-150,000 km</li>
                <li>Follow manufacturer recommendations</li>
                <li>Replace if fuel delivery problems occur</li>
              </ul>

              <h4>Fuel Filter Replacement:</h4>
              <ul>
                <li>Relieve fuel system pressure</li>
                <li>Disconnect battery negative terminal</li>
                <li>Use proper tools and safety equipment</li>
                <li>Note fuel flow direction</li>
                <li>Check for leaks after installation</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 17,
      title: 'Advanced Maintenance Procedures',
      duration: '50 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=O1hF25Cowv8',
        textContent: `
          <div class="lesson-content">
            <h2>🔧 Advanced Maintenance Procedures</h2>
            
            <div class="content-section">
              <h3>Timing Belt/Chain Service</h3>
              
              <h4>Timing Belt Service:</h4>
              <ul>
                <li><strong>Intervals:</strong> 80,000-160,000 km</li>
                <li><strong>Inspection:</strong> Check for cracks, fraying</li>
                <li><strong>Replacement:</strong> Always replace tensioner</li>
                <li><strong>Timing:</strong> Critical to maintain proper timing</li>
              </ul>

              <h4>Timing Chain Service:</h4>
              <ul>
                <li>Typically longer service life</li>
                <li>Check for stretch and wear</li>
                <li>Listen for timing chain noise</li>
                <li>Replace tensioners and guides as needed</li>
              </ul>

              <h4>Water Pump Replacement:</h4>
              <ul>
                <li>Often replaced with timing belt</li>
                <li>Check for leaks and bearing wear</li>
                <li>Use new gaskets and seals</li>
                <li>Flush cooling system after replacement</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Valve Adjustment</h3>
              
              <h4>When Valve Adjustment is Needed:</h4>
              <ul>
                <li>Engines with solid lifters</li>
                <li>Specific service intervals</li>
                <li>Noisy valve train</li>
                <li>Poor engine performance</li>
              </ul>

              <h4>Valve Adjustment Procedure:</h4>
              <ol>
                <li>Engine at correct temperature (hot or cold)</li>
                <li>Remove valve cover</li>
                <li>Set cylinder to TDC compression</li>
                <li>Check clearance with feeler gauges</li>
                <li>Adjust if outside specifications</li>
                <li>Recheck after adjustment</li>
                <li>Reassemble with new gaskets</li>
              </ol>
            </div>

            <div class="content-section">
              <h3>Cooling System Service</h3>
              
              <h4>Coolant Service Intervals:</h4>
              <ul>
                <li>Conventional coolant: 2-3 years</li>
                <li>Extended life coolant: 5-10 years</li>
                <li>Check level and condition regularly</li>
                <li>Pressure test system annually</li>
              </ul>

              <h4>Cooling System Flush Procedure:</h4>
              <ol>
                <li>Drain old coolant completely</li>
                <li>Fill with flush solution</li>
                <li>Run engine to operating temperature</li>
                <li>Drain flush solution</li>
                <li>Rinse with clean water</li>
                <li>Fill with new coolant mixture</li>
                <li>Bleed air from system</li>
              </ol>
            </div>

            <div class="content-section">
              <h3>Transmission Service</h3>
              
              <h4>Manual Transmission:</h4>
              <ul>
                <li>Check fluid level regularly</li>
                <li>Change fluid every 60,000-100,000 km</li>
                <li>Inspect clutch operation</li>
                <li>Check for leaks</li>
              </ul>

              <h4>Automatic Transmission:</h4>
              <ul>
                <li>Check fluid level and condition</li>
                <li>Change fluid and filter as scheduled</li>
                <li>Inspect for leaks</li>
                <li>Test shift quality</li>
              </ul>
            </div>

            <div class="content-section">
              <h3>Emission System Maintenance</h3>
              
              <h4>PCV System:</h4>
              <ul>
                <li>Replace PCV valve as scheduled</li>
                <li>Clean PCV hoses and connections</li>
                <li>Check for proper vacuum</li>
                <li>Inspect for oil leaks</li>
              </ul>

              <h4>EGR System:</h4>
              <ul>
                <li>Clean EGR valve and passages</li>
                <li>Check valve operation</li>
                <li>Inspect vacuum lines</li>
                <li>Test electronic controls</li>
              </ul>

              <h4>Catalytic Converter:</h4>
              <ul>
                <li>Monitor for efficiency codes</li>
                <li>Check for physical damage</li>
                <li>Maintain proper air-fuel ratio</li>
                <li>Address engine problems promptly</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 18,
      title: 'Module 6 Quiz: Maintenance Procedures',
      duration: '15 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the typical oil change interval for full synthetic oil?',
            options: [
              '3,000-5,000 km',
              '5,000-7,500 km',
              '10,000-15,000 km',
              '20,000-25,000 km'
            ],
            correct: 2,
            explanation: 'Full synthetic oil typically allows for longer intervals of 10,000-15,000 km between changes, though this can vary based on driving conditions and manufacturer recommendations.'
          },
          {
            question: 'How often should spark plugs typically be replaced?',
            options: [
              'Every oil change',
              'Every 10,000 km',
              'Every 30,000-150,000 km depending on type',
              'Only when they fail'
            ],
            correct: 2,
            explanation: 'Spark plug replacement intervals vary by type: conventional plugs every 30,000-50,000 km, platinum plugs every 80,000-100,000 km, and iridium plugs every 100,000-150,000 km.'
          },
          {
            question: 'What should be replaced along with the timing belt?',
            options: [
              'Only the timing belt',
              'Timing belt and tensioner',
              'Timing belt, tensioner, and water pump',
              'The entire engine'
            ],
            correct: 2,
            explanation: 'When replacing a timing belt, it\'s recommended to also replace the tensioner and often the water pump, as they are accessed during the same procedure and failure could cause expensive engine damage.'
          },
          {
            question: 'What is the purpose of the PCV valve?',
            options: [
              'Control fuel pressure',
              'Regulate engine temperature',
              'Control crankcase ventilation',
              'Adjust ignition timing'
            ],
            correct: 2,
            explanation: 'The PCV (Positive Crankcase Ventilation) valve controls the flow of crankcase vapors back into the intake system, preventing pressure buildup and reducing emissions.'
          },
          {
            question: 'How often should the air filter typically be replaced?',
            options: [
              'Every 5,000 km',
              'Every 15,000 km',
              'Every 30,000-50,000 km',
              'Every 100,000 km'
            ],
            correct: 2,
            explanation: 'Air filters should typically be replaced every 30,000-50,000 km under normal conditions, or more frequently in dusty conditions. They should be checked at every oil change.'
          }
        ]
      }
    }
  ]
};
