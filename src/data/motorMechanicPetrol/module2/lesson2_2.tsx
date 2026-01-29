import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="lesson-content">
      <h1>Role of Air-Fuel Mixture in Combustion Efficiency</h1>
      
      <div className="video-container mb-6">
        <iframe 
          width="100%" 
          height="400" 
          src="https://youtu.be/4FfcjERUtUw?si=99d-GgIyz7EpbYGA" 
          title="Air-Fuel Mixture in Combustion"
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      </div>

      <div className="content-section">
        <h2>Section Overview</h2>
        <p>
          The air-fuel mixture is fundamental to engine performance, efficiency, and emissions. Understanding how to achieve and maintain the optimal mixture is crucial for proper engine operation and meeting environmental standards. This lesson explores the stoichiometric ratio, effects of rich and lean mixtures, and the role of sensors in maintaining optimal combustion.
        </p>
      </div>

      <div className="content-section">
        <h2>Stoichiometric Ratio</h2>
        
        <div className="video-container mb-4">
          <iframe 
            width="100%" 
            height="300" 
            src="https://youtu.be/ngXfCeGeeBg?si=NMFsY4nB1CElKUOk" 
            title="Air-Fuel Ratio Explained"
            frameBorder="0" 
            allowFullScreen
          ></iframe>
        </div>

        <p>
          The stoichiometric ratio for petrol engines, approximately 14.7:1 (14.7 parts air to 1 part fuel by weight), ensures complete combustion, maximizing power and minimizing emissions. This ideal balance allows all fuel to burn with available oxygen, critical for efficiency and environmental compliance.
        </p>

        <div className="stoichiometric-details mb-6">
          <h3 className="text-red-600 font-bold">Understanding the 14.7:1 Ratio</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="ratio-explanation bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">What It Means</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>14.7 kg of air per 1 kg of fuel</li>
                <li>Complete combustion achievable</li>
                <li>All oxygen consumed in reaction</li>
                <li>Minimal harmful emissions</li>
                <li>Maximum energy extraction</li>
              </ul>
            </div>
            <div className="practical-application bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Practical Applications</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Basis for ECU fuel calculations</li>
                <li>Reference for emissions testing</li>
                <li>Carburetor tuning target</li>
                <li>Diagnostic comparison point</li>
                <li>Catalyst efficiency requirement</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="combustion-chemistry mb-6">
          <h3 className="text-red-600 font-bold">Combustion Chemistry</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Complete Combustion Reaction</h4>
            <p className="mb-2">
              <strong>C8H18 + 12.5 O2 → 8 CO2 + 9 H2O + Energy</strong>
            </p>
            <p className="text-sm">
              This simplified representation shows how octane (representing petrol) combines with oxygen to produce carbon dioxide, water vapor, and energy when the air-fuel ratio is correct.
            </p>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Effects of Rich Mixture</h2>
        
        <div className="video-container mb-4">
          <iframe 
            width="100%" 
            height="300" 
            src="https://youtu.be/23MngtdOWMA?si=gSLZYBU5pZlCA19A" 
            title="Rich vs Lean Mixture Effects"
            frameBorder="0" 
            allowFullScreen
          ></iframe>
        </div>

        <p>
          A rich mixture (e.g., 12:1) contains excess fuel, producing more power initially but leading to incomplete combustion, higher emissions, and carbon buildup. Symptoms include black exhaust smoke, fouled spark plugs, and reduced engine life due to fuel washing oil from cylinder walls.
        </p>

        <div className="rich-mixture-effects mb-6">
          <h3 className="text-red-600 font-bold">Rich Mixture Characteristics</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="symptoms bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold text-red-700 mb-2">Visible Symptoms</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Black or dark exhaust smoke</li>
                <li>Strong fuel odor from exhaust</li>
                <li>Sooty spark plugs</li>
                <li>Carbon deposits on valves</li>
                <li>Fuel smell in oil</li>
                <li>Poor fuel economy</li>
              </ul>
            </div>
            <div className="consequences bg-orange-50 p-4 rounded-lg">
              <h4 className="font-bold text-orange-700 mb-2">Long-term Effects</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cylinder wall washing</li>
                <li>Increased oil contamination</li>
                <li>Catalytic converter damage</li>
                <li>Valve and seat burning</li>
                <li>Increased emissions</li>
                <li>Higher fuel costs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rich-mixture-causes mb-6">
          <h3 className="text-red-600 font-bold">Common Causes of Rich Mixtures</h3>
          <div className="causes-grid grid md:grid-cols-3 gap-4">
            <div className="cause-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Fuel System Issues</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Leaking fuel injectors</li>
                <li>High fuel pressure</li>
                <li>Faulty fuel pressure regulator</li>
                <li>Clogged return line</li>
              </ul>
            </div>
            <div className="cause-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Air System Problems</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Dirty air filter</li>
                <li>Restricted air intake</li>
                <li>Faulty MAF sensor</li>
                <li>Intake manifold issues</li>
              </ul>
            </div>
            <div className="cause-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Sensor Malfunctions</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Faulty oxygen sensors</li>
                <li>Coolant temperature sensor</li>
                <li>Throttle position sensor</li>
                <li>ECU mapping issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Effects of Lean Mixture</h2>
        
        <p>
          A lean mixture (e.g., 17:1) has excess air, burning cleaner but risking engine knocking, higher combustion temperatures, and reduced power. It can damage pistons and valves due to overheating, often caused by vacuum leaks or clogged injectors.
        </p>

        <div className="lean-mixture-effects mb-6">
          <h3 className="text-red-600 font-bold">Lean Mixture Characteristics</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="symptoms bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-700 mb-2">Performance Symptoms</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Engine knock or ping</li>
                <li>Hesitation during acceleration</li>
                <li>Rough idle</li>
                <li>Higher exhaust temperatures</li>
                <li>Backfiring on deceleration</li>
                <li>Loss of power</li>
              </ul>
            </div>
            <div className="consequences bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold text-red-700 mb-2">Potential Damage</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Piston crown melting</li>
                <li>Valve burning</li>
                <li>Pre-ignition damage</li>
                <li>Cylinder head warping</li>
                <li>Engine seizure</li>
                <li>Increased NOx emissions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lean-mixture-causes mb-6">
          <h3 className="text-red-600 font-bold">Common Causes of Lean Mixtures</h3>
          <div className="causes-grid grid md:grid-cols-3 gap-4">
            <div className="cause-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Air Leaks</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Vacuum hose leaks</li>
                <li>Intake manifold gasket</li>
                <li>Throttle body gasket</li>
                <li>PCV system leaks</li>
              </ul>
            </div>
            <div className="cause-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Fuel Delivery Issues</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Clogged fuel injectors</li>
                <li>Low fuel pressure</li>
                <li>Dirty fuel filter</li>
                <li>Weak fuel pump</li>
              </ul>
            </div>
            <div className="cause-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Sensor Problems</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Contaminated MAF sensor</li>
                <li>Faulty O2 sensors</li>
                <li>Incorrect MAP readings</li>
                <li>ECU calibration issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Role of Sensors in Fuel Injection</h2>
        
        <div className="video-container mb-4">
          <iframe 
            width="100%" 
            height="300" 
            src="https://youtu.be/4VItybZ2Ryc?si=0FxTL77zUB4YvOr6" 
            title="How O2 Sensors Work"
            frameBorder="0" 
            allowFullScreen
          ></iframe>
        </div>

        <p>
          Fuel injection systems rely on sensors like oxygen (O2), mass airflow (MAF), and throttle position (TPS) sensors to monitor and adjust the air-fuel mixture in real-time. The ECU uses this data to optimize combustion, adapting to driving conditions like load, temperature, or altitude.
        </p>

        <div className="sensor-details mb-6">
          <h3 className="text-red-600 font-bold">Key Sensors and Their Functions</h3>
          
          <div className="sensor-cards grid md:grid-cols-2 gap-6">
            <div className="o2-sensor bg-purple-50 p-4 rounded-lg">
              <h4 className="font-bold text-purple-700 mb-2">Oxygen Sensors (O2)</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Monitor exhaust gas oxygen content</li>
                <li>Generate voltage signal (0.1-0.9V)</li>
                <li>Enable closed-loop fuel control</li>
                <li>Upstream and downstream types</li>
                <li>Critical for emissions control</li>
              </ul>
            </div>
            
            <div className="maf-sensor bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">Mass Airflow Sensor (MAF)</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Measures incoming air mass</li>
                <li>Hot-wire or hot-film technology</li>
                <li>Primary input for fuel calculation</li>
                <li>Altitude compensation</li>
                <li>Load determination</li>
              </ul>
            </div>
            
            <div className="tps-sensor bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Throttle Position Sensor (TPS)</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Indicates throttle plate position</li>
                <li>Acceleration enrichment signal</li>
                <li>Idle and WOT recognition</li>
                <li>Deceleration fuel cutoff</li>
                <li>Potentiometer or Hall-effect type</li>
              </ul>
            </div>
            
            <div className="coolant-sensor bg-orange-50 p-4 rounded-lg">
              <h4 className="font-bold text-orange-700 mb-2">Coolant Temperature Sensor</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Monitors engine temperature</li>
                <li>Cold start enrichment</li>
                <li>Warm-up compensation</li>
                <li>Fan control integration</li>
                <li>Thermistor technology</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="closed-loop-operation mb-6">
          <h3 className="text-red-600 font-bold">Closed-Loop Operation</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">How the System Works</h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>ECU calculates base fuel delivery based on MAF and RPM</li>
              <li>Additional sensors provide correction factors</li>
              <li>Fuel is injected according to calculated requirements</li>
              <li>O2 sensors monitor exhaust gas composition</li>
              <li>ECU adjusts fuel delivery based on O2 sensor feedback</li>
              <li>System continuously adapts to maintain optimal ratio</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Maintenance for Optimal Combustion</h2>
        
        <p>
          Regular maintenance of air filters, fuel injectors, and sensors ensures a consistent air-fuel mixture, preventing issues like engine knock or misfires. Cleaning injectors, replacing clogged filters, and checking sensor performance are critical for maintaining combustion efficiency and engine health.
        </p>

        <div className="maintenance-schedule mb-6">
          <h3 className="text-red-600 font-bold">Recommended Maintenance Schedule</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="regular-maintenance bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Regular Intervals</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Air Filter:</strong> Every 15,000-30,000 km</li>
                <li><strong>Fuel Filter:</strong> Every 30,000-50,000 km</li>
                <li><strong>Spark Plugs:</strong> Every 30,000-100,000 km</li>
                <li><strong>Fuel System Cleaning:</strong> Every 50,000 km</li>
              </ul>
            </div>
            <div className="sensor-maintenance bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">Sensor Maintenance</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>O2 Sensors:</strong> Every 100,000-160,000 km</li>
                <li><strong>MAF Sensor:</strong> Clean every 30,000 km</li>
                <li><strong>Throttle Body:</strong> Clean every 50,000 km</li>
                <li><strong>PCV System:</strong> Inspect every 30,000 km</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="diagnostic-indicators mb-6">
          <h3 className="text-red-600 font-bold">Diagnostic Indicators</h3>
          <div className="indicators-grid grid md:grid-cols-3 gap-4">
            <div className="indicator-card bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold text-red-700 mb-2">Rich Mixture Signs</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Black exhaust smoke</li>
                <li>Poor fuel economy</li>
                <li>Rough idle</li>
                <li>Fuel odor</li>
                <li>P0172 diagnostic code</li>
              </ul>
            </div>
            <div className="indicator-card bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-700 mb-2">Lean Mixture Signs</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Engine knock/ping</li>
                <li>Hesitation</li>
                <li>Backfire on deceleration</li>
                <li>High exhaust temperature</li>
                <li>P0171 diagnostic code</li>
              </ul>
            </div>
            <div className="indicator-card bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">Sensor Issues</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Check engine light</li>
                <li>Erratic idle</li>
                <li>Poor acceleration</li>
                <li>Failed emissions test</li>
                <li>Various P0xxx codes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Key Takeaways</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>The stoichiometric ratio (14.7:1) is optimal for complete combustion</li>
          <li>Rich mixtures waste fuel and increase emissions</li>
          <li>Lean mixtures can cause overheating and engine damage</li>
          <li>Sensors enable real-time air-fuel ratio optimization</li>
          <li>Regular maintenance prevents mixture-related problems</li>
          <li>Proper diagnostics identify mixture issues early</li>
        </ul>
      </div>

      <div className="content-section">
        <h2>Practical Applications</h2>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Real-World Diagnostics</h3>
          <p>
            Understanding air-fuel mixture principles enables effective diagnosis of driveability issues, emissions failures, and fuel economy problems. Use diagnostic tools to analyze fuel trims, sensor data, and exhaust gas composition for accurate troubleshooting.
          </p>
        </div>
      </div>
    </div>
  );
};

export const lesson2_2: Lesson = {
  id: 'air-fuel-mixture-combustion',
  title: 'Role of Air-Fuel Mixture in Combustion Efficiency',
  content: LessonContent,
  duration: 90,
  objectives: [
    'Understand the stoichiometric air-fuel ratio and its importance',
    'Identify effects of rich and lean mixtures on engine performance',
    'Explain the role of sensors in maintaining optimal combustion',
    'Apply knowledge to diagnose mixture-related problems'
  ],
  keyTerms: [
    'Stoichiometric Ratio',
    'Rich Mixture',
    'Lean Mixture',
    'Oxygen Sensor',
    'MAF Sensor',
    'TPS Sensor',
    'Closed-Loop Control',
    'Fuel Trim',
    'Lambda',
    'Combustion Efficiency',
    'Emissions',
    'Engine Knock'
  ],
  media: [
    {
      type: 'video',
      url: 'https://youtu.be/4FfcjERUtUw?si=99d-GgIyz7EpbYGA',
      title: 'Air-Fuel Mixture in Combustion'
    },
    {
      type: 'video',
      url: 'https://youtu.be/ngXfCeGeeBg?si=NMFsY4nB1CElKUOk',
      title: 'Air-Fuel Ratio Explained'
    },
    {
      type: 'video',
      url: 'https://youtu.be/23MngtdOWMA?si=gSLZYBU5pZlCA19A',
      title: 'Rich vs Lean Mixture Effects'
    },
    {
      type: 'video',
      url: 'https://youtu.be/4VItybZ2Ryc?si=0FxTL77zUB4YvOr6',
      title: 'How O2 Sensors Work'
    }
  ]
};