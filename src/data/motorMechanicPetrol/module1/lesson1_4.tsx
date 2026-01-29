import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="lesson-content">
      <h1>Petrol Fuel Systems Overview</h1>
      
      <div className="video-container mb-6">
        <iframe 
          width="100%" 
          height="400" 
          src="https://youtu.be/qza9U_GWW3A?si=bVyEpItdTXCZF3QI" 
          title="Fuel Systems Overview"
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      </div>

      <div className="content-section">
        <h2>Section Overview</h2>
        <p>
          Petrol fuel systems have evolved significantly from simple carburetors to sophisticated electronic fuel injection systems. Understanding both systems is crucial for mechanics working on a variety of vehicles, from classic cars to modern engines. This lesson covers the fundamental differences and the role of the air-fuel mixture in combustion efficiency.
        </p>
      </div>

      <div className="content-section">
        <h2>Carbureted vs. Fuel-Injected Engines</h2>
        
        <div className="system-comparison mb-6">
          <h3 className="text-red-600 font-bold">Carburetor Operation</h3>
          <div className="video-container mb-4">
            <iframe 
              width="100%" 
              height="300" 
              src="https://youtu.be/qms_9ZP6ORo?si=vU3TtI9uDgDXUVty" 
              title="How a Carburetor Works"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
          <p>
            Carburetors mechanically mix air and fuel before delivery to the engine's intake manifold, using a vacuum created by piston movement to draw fuel from a reservoir. Components like jets, floats, and throttle plates control the mixture, which is then distributed to the cylinders for combustion. Found in older vehicles, carburetors are simple but require frequent tuning to maintain optimal performance.
          </p>
          <div className="advantages-disadvantages grid md:grid-cols-2 gap-6 mt-4">
            <div className="advantages bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Advantages</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Simple, mechanical design</li>
                <li>Cost-effective to manufacture</li>
                <li>Easy to repair with basic tools</li>
                <li>No complex electronics</li>
                <li>Straightforward troubleshooting</li>
              </ul>
            </div>
            <div className="disadvantages bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold text-red-700 mb-2">Disadvantages</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Less precise fuel metering</li>
                <li>Higher emissions</li>
                <li>Poor cold-start performance</li>
                <li>Altitude sensitivity</li>
                <li>Frequent adjustment needed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="system-comparison mb-6">
          <h3 className="text-red-600 font-bold">Fuel Injection System Mechanics</h3>
          <div className="video-container mb-4">
            <iframe 
              width="100%" 
              height="300" 
              src="https://youtu.be/VgeucJ8vjAs?si=TL_XvgwA2jlspO8u" 
              title="How Fuel Injection Works"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
          <p>
            Fuel-injected engines use electronically controlled injectors to spray fuel directly into the intake manifold (port injection) or combustion chamber (direct injection), managed by the engine control unit (ECU). Sensors like the mass airflow (MAF) and oxygen (O2) sensors provide real-time data to adjust the air-fuel mixture, ensuring optimal combustion under varying conditions.
          </p>
          <div className="advantages-disadvantages grid md:grid-cols-2 gap-6 mt-4">
            <div className="advantages bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Advantages</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Precise fuel delivery</li>
                <li>Better fuel economy</li>
                <li>Lower emissions</li>
                <li>Improved cold starting</li>
                <li>Adaptive to conditions</li>
                <li>Better throttle response</li>
              </ul>
            </div>
            <div className="disadvantages bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold text-red-700 mb-2">Disadvantages</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Complex electronic systems</li>
                <li>Higher repair costs</li>
                <li>Requires specialized tools</li>
                <li>Sensor dependency</li>
                <li>More expensive components</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Role of Air-Fuel Mixture in Combustion Efficiency</h2>
        
        <div className="video-container mb-6">
          <iframe 
            width="100%" 
            height="300" 
            src="https://youtu.be/ngXfCeGeeBg?si=NMFsY4nB1CElKUOk" 
            title="Air-Fuel Ratio Explained"
            frameBorder="0" 
            allowFullScreen
          ></iframe>
        </div>

        <div className="air-fuel-section mb-6">
          <h3 className="text-red-600 font-bold">Stoichiometric Ratio</h3>
          <p>
            The air-fuel mixture, ideally 14.7:1 (stoichiometric ratio) for petrol engines, determines combustion efficiency, power output, and emissions. A balanced mixture ensures complete combustion, minimizing waste and pollutants, while lean or rich mixtures can cause performance issues or increased emissions. Components like the throttle body, mass airflow sensor, and oxygen sensors regulate this ratio.
          </p>
          <div className="ratio-examples bg-blue-50 p-4 rounded-lg mt-4">
            <h4 className="font-bold mb-2">Air-Fuel Ratio Examples</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>14.7:1 (Stoichiometric)</strong> - Ideal ratio for complete combustion</li>
              <li><strong>12:1 to 13:1 (Rich)</strong> - More fuel, increased power but higher emissions</li>
              <li><strong>15:1 to 16:1 (Lean)</strong> - Less fuel, better economy but risk of overheating</li>
            </ul>
          </div>
        </div>

        <div className="mixture-effects mb-6">
          <h3 className="text-red-600 font-bold">Effects of Rich and Lean Mixtures</h3>
          <div className="mixture-grid grid md:grid-cols-2 gap-6">
            <div className="rich-mixture bg-orange-50 p-4 rounded-lg">
              <h4 className="font-bold text-orange-700 mb-2">Rich Mixture Effects</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Black exhaust smoke</li>
                <li>Fouled spark plugs</li>
                <li>Increased fuel consumption</li>
                <li>Carbon buildup</li>
                <li>Higher CO emissions</li>
                <li>Rough idle</li>
              </ul>
            </div>
            <div className="lean-mixture bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-700 mb-2">Lean Mixture Effects</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Engine knocking</li>
                <li>Overheating</li>
                <li>Power loss</li>
                <li>Hesitation during acceleration</li>
                <li>Higher NOx emissions</li>
                <li>Potential engine damage</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sensors-section mb-6">
          <h3 className="text-red-600 font-bold">Role of Sensors in Fuel Injection</h3>
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
          <div className="sensor-types">
            <h4 className="font-bold mt-4 mb-2">Key Sensors</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Oxygen Sensor (O2)</strong> - Monitors exhaust gas composition</li>
              <li><strong>Mass Airflow Sensor (MAF)</strong> - Measures incoming air volume</li>
              <li><strong>Throttle Position Sensor (TPS)</strong> - Indicates throttle opening</li>
              <li><strong>Coolant Temperature Sensor</strong> - Affects fuel mixture during warm-up</li>
              <li><strong>Manifold Absolute Pressure (MAP)</strong> - Measures engine load</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Maintenance for Optimal Combustion</h2>
        <p>
          Regular maintenance of air filters, fuel injectors, and sensors ensures a consistent air-fuel mixture, preventing issues like engine knock or misfires. Cleaning injectors, replacing clogged filters, and checking sensor performance are critical for maintaining combustion efficiency and engine health.
        </p>
        <div className="maintenance-tips bg-green-50 p-4 rounded-lg mt-4">
          <h4 className="font-bold mb-2">Key Maintenance Tasks</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Regular air filter replacement (every 15,000-30,000 km)</li>
            <li>Fuel filter changes (every 30,000-50,000 km)</li>
            <li>Injector cleaning (every 50,000-100,000 km)</li>
            <li>Sensor cleaning and inspection</li>
            <li>Throttle body cleaning</li>
            <li>Fuel system cleaning additives</li>
          </ul>
        </div>
      </div>

      <div className="content-section">
        <h2>Key Takeaways</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Carburetors are mechanical; fuel injection systems are electronic</li>
          <li>The ideal air-fuel ratio for petrol engines is 14.7:1</li>
          <li>Rich mixtures waste fuel and increase emissions</li>
          <li>Lean mixtures can cause overheating and engine damage</li>
          <li>Sensors enable precise fuel delivery in modern engines</li>
          <li>Regular maintenance ensures optimal combustion efficiency</li>
        </ul>
      </div>

      <div className="content-section">
        <h2>Diagnostic Applications</h2>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Troubleshooting Fuel System Issues</h3>
          <p>
            Understanding fuel systems helps diagnose problems like poor fuel economy, rough idling, or emissions failures. Learn to use diagnostic tools to analyze air-fuel ratios and sensor data for effective troubleshooting.
          </p>
        </div>
      </div>
    </div>
  );
};

export const lesson1_4: Lesson = {
  id: 'petrol-fuel-systems-overview',
  title: 'Petrol Fuel Systems Overview',
  content: LessonContent,
  duration: 90,
  objectives: [
    'Compare carburetor and fuel injection systems',
    'Understand the importance of air-fuel mixture ratios',
    'Identify the role of sensors in modern fuel systems',
    'Apply knowledge to diagnose fuel system issues'
  ],
  keyTerms: [
    'Carburetor',
    'Fuel Injection',
    'Air-Fuel Ratio',
    'Stoichiometric Ratio',
    'Rich Mixture',
    'Lean Mixture',
    'ECU',
    'O2 Sensor',
    'MAF Sensor',
    'TPS Sensor',
    'Port Injection',
    'Direct Injection'
  ],
  media: [
    {
      type: 'video',
      url: 'https://youtu.be/qza9U_GWW3A?si=bVyEpItdTXCZF3QI',
      title: 'Fuel Systems Overview'
    },
    {
      type: 'video',
      url: 'https://youtu.be/VgeucJ8vjAs?si=TL_XvgwA2jlspO8u',
      title: 'How Fuel Injection Works'
    },
    {
      type: 'video',
      url: 'https://youtu.be/ngXfCeGeeBg?si=NMFsY4nB1CElKUOk',
      title: 'Air-Fuel Ratio Explained'
    },
    {
      type: 'video',
      url: 'https://youtu.be/4VItybZ2Ryc?si=0FxTL77zUB4YvOr6',
      title: 'How O2 Sensors Work'
    }
  ]
};