import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="lesson-content">
      <h1>Carbureted vs. Fuel-Injected Engines</h1>
      
      <div className="video-container mb-6">
        <iframe 
          width="100%" 
          height="400" 
          src="https://youtu.be/qza9U_GWW3A?si=bVyEpItdTXCZF3QI" 
          title="Carbureted vs Fuel-Injected Engines"
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      </div>

      <div className="content-section">
        <h2>Section Overview</h2>
        <p>
          Understanding the differences between carbureted and fuel-injected engines is crucial for mechanics working on vehicles spanning several decades. Each system has unique characteristics, advantages, and maintenance requirements that affect performance, efficiency, and emissions.
        </p>
      </div>

      <div className="content-section">
        <h2>Carburetor Operation</h2>
        
        <div className="video-container mb-4">
          <iframe 
            width="100%" 
            height="300" 
            src="https://youtu.be/1ohL6KgasjA?si=AJ-g56UPr8WFVXmL" 
            title="How a Carburetor Works"
            frameBorder="0" 
            allowFullScreen
          ></iframe>
        </div>

        <p>
          Carburetors mechanically mix air and fuel before delivery to the engine's intake manifold, using a vacuum created by piston movement to draw fuel from a reservoir. Components like jets, floats, and throttle plates control the mixture, which is then distributed to the cylinders for combustion. Found in older vehicles, carburetors are simple but require frequent tuning to maintain optimal performance.
        </p>

        <div className="carburetor-components mb-6">
          <h3 className="text-red-600 font-bold">Key Carburetor Components</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="component-list">
              <h4 className="font-bold mb-2">Primary Components</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Float Chamber</strong> - Maintains constant fuel level</li>
                <li><strong>Venturi</strong> - Creates vacuum for fuel suction</li>
                <li><strong>Jets</strong> - Control fuel flow rate</li>
                <li><strong>Throttle Valve</strong> - Controls air flow and engine speed</li>
                <li><strong>Choke</strong> - Enriches mixture for cold starts</li>
              </ul>
            </div>
            <div className="operation-principles">
              <h4 className="font-bold mb-2">Operating Principles</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Bernoulli's principle creates fuel suction</li>
                <li>Mechanical linkages control fuel flow</li>
                <li>Float system maintains fuel level</li>
                <li>Multiple circuits for different operating conditions</li>
                <li>Manual adjustment for optimal mixture</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="carburetor-advantages mb-6">
          <h3 className="text-red-600 font-bold">Advantages of Carburetors</h3>
          <div className="advantages-grid grid md:grid-cols-2 gap-6">
            <div className="mechanical-advantages bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Mechanical Simplicity</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>No complex electronics required</li>
                <li>Straightforward mechanical operation</li>
                <li>Easy to understand and diagnose</li>
                <li>Field-repairable with basic tools</li>
                <li>Lower initial manufacturing cost</li>
              </ul>
            </div>
            <div className="maintenance-advantages bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">Maintenance Benefits</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Can be rebuilt with simple tools</li>
                <li>Parts readily available</li>
                <li>Manual adjustment possible</li>
                <li>No electronic failures</li>
                <li>Works in extreme conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Fuel Injection System Mechanics</h2>
        
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

        <div className="injection-types mb-6">
          <h3 className="text-red-600 font-bold">Types of Fuel Injection</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="port-injection bg-purple-50 p-4 rounded-lg">
              <h4 className="font-bold text-purple-700 mb-2">Port Fuel Injection (PFI)</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fuel injected into intake manifold</li>
                <li>Lower injection pressures (2-4 bar)</li>
                <li>Good fuel atomization</li>
                <li>Valve cleaning action</li>
                <li>Most common in modern engines</li>
              </ul>
            </div>
            <div className="direct-injection bg-orange-50 p-4 rounded-lg">
              <h4 className="font-bold text-orange-700 mb-2">Direct Injection (DI)</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fuel injected directly into cylinder</li>
                <li>High injection pressures (100+ bar)</li>
                <li>Better fuel economy</li>
                <li>Higher power output</li>
                <li>More precise control</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="injection-advantages mb-6">
          <h3 className="text-red-600 font-bold">Advantages of Fuel Injection</h3>
          <div className="video-container mb-4">
            <iframe 
              width="100%" 
              height="300" 
              src="https://youtu.be/IZMKcbC0rTs?si=WLCVjApDYjPJtK89" 
              title="Benefits of Fuel Injection"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="advantages-grid grid md:grid-cols-2 gap-6">
            <div className="performance-advantages bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Performance Benefits</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Precise fuel metering</li>
                <li>Better throttle response</li>
                <li>Improved cold starting</li>
                <li>Consistent air-fuel ratios</li>
                <li>Altitude compensation</li>
              </ul>
            </div>
            <div className="efficiency-advantages bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">Efficiency & Emissions</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Better fuel economy</li>
                <li>Lower emissions</li>
                <li>Reduced unburned fuel</li>
                <li>Meets modern emissions standards</li>
                <li>Real-time optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Disadvantages and Challenges</h2>
        
        <div className="challenges-grid grid md:grid-cols-2 gap-6">
          <div className="carburetor-challenges bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-red-700 mb-2">Carburetor Challenges</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Frequent manual tuning required</li>
              <li>Poor cold-start performance</li>
              <li>Altitude sensitivity</li>
              <li>Higher emissions</li>
              <li>Inconsistent fuel delivery</li>
              <li>Prone to clogging from impurities</li>
            </ul>
          </div>
          <div className="injection-challenges bg-orange-50 p-4 rounded-lg">
            <h3 className="font-bold text-orange-700 mb-2">Fuel Injection Challenges</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Complex electronic systems</li>
              <li>Higher repair costs</li>
              <li>Requires specialized diagnostic tools</li>
              <li>Sensor dependency</li>
              <li>Electronic failure points</li>
              <li>More expensive components</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>ECU and Sensor Integration</h2>
        <p>
          Modern fuel injection systems rely heavily on the Engine Control Unit (ECU) and various sensors to maintain optimal performance. Understanding this integration is crucial for effective diagnostics and repair.
        </p>
        
        <div className="sensor-types mb-6">
          <h3 className="text-red-600 font-bold">Key Sensors in Fuel Injection</h3>
          <div className="sensor-grid grid md:grid-cols-3 gap-4">
            <div className="sensor-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Oxygen Sensors</h4>
              <p className="text-sm">Monitor exhaust gas composition for fuel trim adjustments</p>
            </div>
            <div className="sensor-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">MAF Sensor</h4>
              <p className="text-sm">Measures incoming air mass for fuel calculation</p>
            </div>
            <div className="sensor-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">TPS Sensor</h4>
              <p className="text-sm">Indicates throttle position and rate of change</p>
            </div>
            <div className="sensor-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Coolant Temp</h4>
              <p className="text-sm">Affects fuel mixture during warm-up</p>
            </div>
            <div className="sensor-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">MAP Sensor</h4>
              <p className="text-sm">Measures manifold pressure for load calculation</p>
            </div>
            <div className="sensor-card bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Crank Position</h4>
              <p className="text-sm">Provides timing reference for injection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Maintenance Considerations</h2>
        <div className="maintenance-comparison grid md:grid-cols-2 gap-6">
          <div className="carburetor-maintenance">
            <h3 className="text-red-600 font-bold mb-3">Carburetor Maintenance</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Regular cleaning and adjustment</li>
              <li>Float level checking</li>
              <li>Jet cleaning and replacement</li>
              <li>Gasket and seal replacement</li>
              <li>Linkage lubrication</li>
              <li>Choke operation verification</li>
            </ul>
          </div>
          <div className="injection-maintenance">
            <h3 className="text-red-600 font-bold mb-3">Fuel Injection Maintenance</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fuel filter replacement</li>
              <li>Injector cleaning</li>
              <li>Sensor cleaning and calibration</li>
              <li>ECU software updates</li>
              <li>Fuel pressure testing</li>
              <li>Throttle body cleaning</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Key Takeaways</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Carburetors are mechanically simple but require frequent adjustment</li>
          <li>Fuel injection provides precise control but is more complex</li>
          <li>Each system has specific maintenance requirements</li>
          <li>Modern vehicles favor fuel injection for efficiency and emissions</li>
          <li>Understanding both systems is valuable for comprehensive service</li>
          <li>Diagnostic approaches differ significantly between systems</li>
        </ul>
      </div>

      <div className="content-section">
        <h2>Diagnostic Applications</h2>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">System-Specific Troubleshooting</h3>
          <p>
            Learn to identify symptoms unique to each fuel system type. Carburetors may show flooding or lean conditions, while fuel injection systems may exhibit sensor-related issues or injector problems. Each requires different diagnostic approaches and tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export const lesson2_1: Lesson = {
  id: 'carbureted-vs-fuel-injected',
  title: 'Carbureted vs. Fuel-Injected Engines',
  content: LessonContent,
  duration: 90,
  objectives: [
    'Compare carburetor and fuel injection system operation',
    'Identify advantages and disadvantages of each system',
    'Understand the role of ECU and sensors in fuel injection',
    'Apply knowledge to system-specific maintenance and diagnostics'
  ],
  keyTerms: [
    'Carburetor',
    'Fuel Injection',
    'ECU',
    'Port Injection',
    'Direct Injection',
    'MAF Sensor',
    'O2 Sensor',
    'TPS Sensor',
    'Venturi',
    'Float Chamber',
    'Jets',
    'Fuel Atomization'
  ],
  media: [
    {
      type: 'video',
      url: 'https://youtu.be/qza9U_GWW3A?si=bVyEpItdTXCZF3QI',
      title: 'Carbureted vs Fuel-Injected Engines'
    },
    {
      type: 'video',
      url: 'https://youtu.be/1ohL6KgasjA?si=AJ-g56UPr8WFVXmL',
      title: 'How a Carburetor Works'
    },
    {
      type: 'video',
      url: 'https://youtu.be/VgeucJ8vjAs?si=TL_XvgwA2jlspO8u',
      title: 'How Fuel Injection Works'
    }
  ]
};