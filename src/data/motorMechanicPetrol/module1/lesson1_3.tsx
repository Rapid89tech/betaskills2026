import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="lesson-content">
      <h1>Differences Between Petrol and Diesel Engines</h1>
      
      <div className="video-container mb-6">
        <iframe 
          width="100%" 
          height="400" 
          src="https://youtu.be/aWeqyAxlM2M?si=olblxusk_C9guuYs" 
          title="Petrol vs Diesel Engines"
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      </div>

      <div className="content-section">
        <h2>Section Overview</h2>
        <p>
          Understanding the fundamental differences between petrol and diesel engines is crucial for mechanics who service various vehicle types. While both are internal combustion engines, they operate on different principles and have distinct characteristics that affect their performance, maintenance, and applications.
        </p>
      </div>

      <div className="content-section">
        <h2>Key Differences</h2>
        
        <div className="difference-explanation mb-6">
          <h3 className="text-red-600 font-bold">Combustion Process</h3>
          <div className="comparison-grid grid md:grid-cols-2 gap-6">
            <div className="petrol-section bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">Petrol Engines</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use spark ignition system</li>
                <li>Air-fuel mixture is pre-mixed</li>
                <li>Compression ratio: 8:1 to 12:1</li>
                <li>Ignition triggered by spark plug</li>
                <li>Operates on Otto cycle</li>
              </ul>
            </div>
            <div className="diesel-section bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Diesel Engines</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use compression ignition system</li>
                <li>Fuel injected into compressed air</li>
                <li>Compression ratio: 14:1 to 20:1</li>
                <li>Auto-ignition from heat of compression</li>
                <li>Operates on Diesel cycle</li>
              </ul>
            </div>
          </div>
          <p className="mt-4">
            Petrol engines ignite a pre-mixed air-fuel mixture using a spark plug at compression ratios of 8:1 to 12:1, while diesel engines use high compression (14:1 to 20:1) to ignite fuel injected into hot, compressed air. This fundamental difference affects engine design, performance, and maintenance requirements, with petrol engines offering smoother operation and diesel engines providing greater torque.
          </p>
        </div>

        <div className="difference-explanation mb-6">
          <h3 className="text-red-600 font-bold">Fuel and Efficiency</h3>
          <div className="video-container mb-4">
            <iframe 
              width="100%" 
              height="300" 
              src="https://youtu.be/ltjVT1wyUuw?si=dMQe5eR-J_PXqCjR" 
              title="Fuel Efficiency in Petrol vs Diesel"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="comparison-grid grid md:grid-cols-2 gap-6">
            <div className="petrol-section bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">Petrol Characteristics</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lighter, more volatile fuel</li>
                <li>Quick throttle response</li>
                <li>Lower fuel efficiency</li>
                <li>Better for high-RPM operation</li>
                <li>Lower energy density</li>
              </ul>
            </div>
            <div className="diesel-section bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Diesel Characteristics</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Denser fuel with higher energy content</li>
                <li>Better fuel efficiency</li>
                <li>Higher torque at low RPM</li>
                <li>Longer range capability</li>
                <li>Higher energy density</li>
              </ul>
            </div>
          </div>
          <p className="mt-4">
            Petrol engines use lighter, more volatile fuel, providing quick throttle response but lower fuel efficiency, while diesel engines use denser fuel with higher energy content, offering better mileage and torque for heavy-duty applications. Fuel properties influence combustion efficiency, emissions, and engine design, with petrol suited for speed and diesel for endurance.
          </p>
        </div>

        <div className="difference-explanation mb-6">
          <h3 className="text-red-600 font-bold">Application and Durability</h3>
          <div className="comparison-grid grid md:grid-cols-2 gap-6">
            <div className="petrol-section bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">Petrol Applications</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Passenger cars and light vehicles</li>
                <li>Motorcycles and scooters</li>
                <li>High-performance sports cars</li>
                <li>Applications requiring high RPM</li>
                <li>Quick acceleration needs</li>
              </ul>
            </div>
            <div className="diesel-section bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Diesel Applications</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Trucks and heavy vehicles</li>
                <li>Buses and commercial vehicles</li>
                <li>Industrial equipment</li>
                <li>Marine applications</li>
                <li>Applications requiring high torque</li>
              </ul>
            </div>
          </div>
          <p className="mt-4">
            Petrol engines power passenger cars, motorcycles, and light vehicles, offering high RPMs and responsiveness, while diesel engines are used in trucks, buses, and industrial equipment, designed for durability under heavy loads. These applications reflect their design priorities, with petrol engines prioritizing speed and diesel engines focusing on longevity and torque.
          </p>
        </div>

        <div className="difference-explanation mb-6">
          <h3 className="text-red-600 font-bold">Fuel Injection Systems</h3>
          <div className="video-container mb-4">
            <iframe 
              width="100%" 
              height="300" 
              src="https://youtu.be/qms_9ZP6ORo?si=vU3TtI9uDgDXUVty" 
              title="Fuel Injection vs Carburetor"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="comparison-grid grid md:grid-cols-2 gap-6">
            <div className="petrol-section bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">Petrol Fuel Systems</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Port fuel injection (PFI)</li>
                <li>Direct fuel injection (DI)</li>
                <li>Carburetors (older vehicles)</li>
                <li>Lower injection pressures</li>
                <li>Electronically controlled</li>
              </ul>
            </div>
            <div className="diesel-section bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">Diesel Fuel Systems</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>High-pressure direct injection</li>
                <li>Common rail systems</li>
                <li>Mechanical or electronic control</li>
                <li>Very high injection pressures</li>
                <li>Precise timing requirements</li>
              </ul>
            </div>
          </div>
          <p className="mt-4">
            Petrol engines use port or direct fuel injection for precise fuel delivery, while older models rely on carburetors for mechanical mixing. Diesel engines use high-pressure direct injection to atomize fuel into compressed air. Injection systems impact efficiency, emissions, and maintenance complexity, with modern systems requiring electronic diagnostics.
          </p>
        </div>
      </div>

      <div className="content-section">
        <h2>Maintenance Implications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="maintenance-section">
            <h3 className="text-red-600 font-bold mb-3">Petrol Engine Maintenance</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Regular spark plug replacement</li>
              <li>Ignition system maintenance</li>
              <li>Fuel filter changes</li>
              <li>Air filter replacement</li>
              <li>Throttle body cleaning</li>
            </ul>
          </div>
          <div className="maintenance-section">
            <h3 className="text-red-600 font-bold mb-3">Diesel Engine Maintenance</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fuel injector cleaning/calibration</li>
              <li>Fuel filter changes (more critical)</li>
              <li>Glow plug maintenance</li>
              <li>Diesel particulate filter service</li>
              <li>EGR system cleaning</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Environmental Considerations</h2>
        <p>
          Both engine types have environmental impacts that affect regulations and maintenance requirements. Petrol engines typically produce lower NOx but higher CO2, while diesel engines produce lower CO2 but higher NOx and particulates. Understanding these differences helps mechanics ensure compliance with emissions standards.
        </p>
      </div>

      <div className="content-section">
        <h2>Key Takeaways</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Petrol engines use spark ignition; diesel engines use compression ignition</li>
          <li>Diesel engines have higher compression ratios and better fuel efficiency</li>
          <li>Petrol engines offer better high-RPM performance and smoother operation</li>
          <li>Different fuel systems require different maintenance approaches</li>
          <li>Applications vary based on performance characteristics</li>
          <li>Environmental regulations affect both engine types differently</li>
        </ul>
      </div>

      <div className="content-section">
        <h2>Practical Applications</h2>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Choosing the Right Engine Type</h3>
          <p>
            Understanding these differences helps in recommending the appropriate engine type for specific applications and in developing specialized maintenance expertise for each engine type.
          </p>
        </div>
      </div>
    </div>
  );
};

export const lesson1_3: Lesson = {
  id: 'petrol-vs-diesel-engines',
  title: 'Differences Between Petrol and Diesel Engines',
  content: LessonContent,
  duration: 60,
  objectives: [
    'Compare and contrast petrol and diesel engine operation',
    'Understand the different combustion processes',
    'Identify appropriate applications for each engine type',
    'Recognize maintenance differences between engine types'
  ],
  keyTerms: [
    'Spark Ignition',
    'Compression Ignition',
    'Otto Cycle',
    'Diesel Cycle',
    'Compression Ratio',
    'Fuel Injection',
    'Volatility',
    'Energy Density',
    'Torque Characteristics',
    'Emissions'
  ],
  media: [
    {
      type: 'video',
      url: 'https://youtu.be/aWeqyAxlM2M?si=olblxusk_C9guuYs',
      title: 'Petrol vs Diesel Engines'
    },
    {
      type: 'video',
      url: 'https://youtu.be/ltjVT1wyUuw?si=dMQe5eR-J_PXqCjR',
      title: 'Fuel Efficiency Comparison'
    },
    {
      type: 'video',
      url: 'https://youtu.be/qms_9ZP6ORo?si=vU3TtI9uDgDXUVty',
      title: 'Fuel Injection vs Carburetor'
    }
  ]
};