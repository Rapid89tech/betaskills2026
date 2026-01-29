import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="lesson-content">
      <h1>Key Engine Components and Their Functions</h1>
      
      <div className="video-container mb-6">
        <iframe 
          width="100%" 
          height="400" 
          src="https://youtu.be/x70VqMrXrbs?si=eabI2yUuFO5z7EpR" 
          title="Engine Components Overview"
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      </div>

      <div className="content-section">
        <h2>Section Overview</h2>
        <p>
          Understanding the key components of a petrol engine is essential for effective maintenance and repair. Each component plays a vital role in the engine's operation, and knowing their functions helps mechanics diagnose problems and perform accurate repairs.
        </p>
      </div>

      <div className="content-section">
        <h2>Major Engine Components</h2>
        
        <div className="component-explanation mb-6">
          <h3 className="text-red-600 font-bold">Cylinder Block</h3>
          <p>
            The cylinder block is the engine's structural foundation, housing the cylinders where pistons move and providing mounting points for the cylinder head, crankshaft, and other components. Typically made of cast iron or aluminum for durability and weight savings, it includes passages for coolant and oil to manage heat and lubrication. The block's design ensures alignment and stability under the extreme forces of combustion, making it critical for engine longevity.
          </p>
          <p>
            The cylinder block's robust construction is vital for withstanding the high pressures and temperatures of combustion, while its coolant and oil passages prevent overheating and wear. Learners will explore its design through virtual dissections, identifying key features like cylinder bores and mounting surfaces. Issues such as cracks, warping, or coolant leaks can compromise the block, leading to engine failure. Mechanics mastering this component can perform critical repairs, such as resurfacing or replacing damaged blocks, ensuring long-term reliability.
          </p>
        </div>

        <div className="component-explanation mb-6">
          <h3 className="text-red-600 font-bold">Cylinder Head</h3>
          <p>
            The cylinder head, mounted atop the cylinder block, contains passages for air-fuel intake and exhaust gas removal, housing valves, spark plugs, and often the camshaft. Sealed with a head gasket, it maintains combustion chamber integrity and supports efficient gas flow. Its design, including valve placement and port shaping, significantly influences engine performance and efficiency.
          </p>
          <p>
            The cylinder head is a complex component that orchestrates the flow of gases and houses critical systems, making it a common point of failure if not properly maintained. Learners will study its construction and function through interactive models, simulating assembly and disassembly to understand valve and spark plug integration. Issues like warped heads, blown gaskets, or cracked ports can cause compression loss or overheating, requiring precise diagnostics and repair. Mechanics mastering cylinder head maintenance can address these issues, ensuring optimal engine performance and client satisfaction.
          </p>
        </div>

        <div className="component-explanation mb-6">
          <h3 className="text-red-600 font-bold">Pistons and Connecting Rods</h3>
          <div className="video-container mb-4">
            <iframe 
              width="100%" 
              height="300" 
              src="https://youtu.be/plIzFxAlSLU?si=6-LW1R052BvoJWxd" 
              title="Piston and Connecting Rod Function"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
          <p>
            Pistons move up and down within cylinders, transferring combustion energy to the crankshaft via connecting rods, which convert linear motion into rotational motion. Made from aluminum alloys for strength and weight efficiency, pistons use rings to seal the combustion chamber, while connecting rods, typically steel, ensure durable energy transfer. These components are critical for engine power output.
          </p>
          <p>
            Pistons and connecting rods are the engine's power translators, enduring extreme forces during combustion. Learners will explore their design, including piston rings and rod bearings, through virtual simulations, observing how they convert combustion energy into mechanical work. Issues like piston slap, worn rings, or rod bearing failure can cause knocks or power loss, requiring precise diagnostics. By mastering these components, mechanics can perform complex repairs like piston replacement or rod reconditioning, ensuring engine reliability.
          </p>
        </div>

        <div className="component-explanation mb-6">
          <h3 className="text-red-600 font-bold">Crankshaft and Camshaft</h3>
          <p>
            The crankshaft converts the pistons' linear motion into rotational energy to drive the vehicle's wheels, while the camshaft, synchronized via a timing belt or chain, controls the precise opening and closing of intake and exhaust valves. Both components require careful balancing and alignment to minimize vibration and ensure efficient operation.
          </p>
          <p>
            The crankshaft and camshaft are the engine's timing and power delivery core, critical for smooth and efficient operation. Learners will use virtual models to study their interaction, including how timing belts maintain synchronization. Issues like crankshaft imbalance, camshaft wear, or timing misalignment can cause vibrations, misfires, or catastrophic engine failure. Mechanics mastering these components can perform tasks like timing belt replacements or camshaft adjustments, ensuring optimal performance.
          </p>
        </div>

        <div className="component-explanation mb-6">
          <h3 className="text-red-600 font-bold">Valves and Supporting Systems</h3>
          <p>
            Intake valves allow the air-fuel mixture into the cylinder, while exhaust valves release burnt gases, with timing controlled by the camshaft. Supporting systems, including spark plugs for ignition, fuel injectors or carburetors for fuel delivery, and cooling systems for temperature regulation, ensure efficient engine operation. These systems are integral to maintaining performance and emissions standards.
          </p>
          <p>
            Valves and their supporting systems are the engine's gatekeepers, managing gas flow and maintaining optimal combustion conditions. Learners will explore valve timing, fuel delivery, and cooling circuits through simulations, learning to diagnose issues like sticking valves, clogged injectors, or overheating. These components are critical for efficiency and compliance with emissions regulations, making their maintenance a key skill for modern mechanics.
          </p>
        </div>

        <div className="component-explanation mb-6">
          <h3 className="text-red-600 font-bold">Oil and Cooling Systems</h3>
          <div className="video-container mb-4">
            <iframe 
              width="100%" 
              height="300" 
              src="https://youtu.be/HPVckPH6o-w?si=XgHWKXX3lV74hfJW" 
              title="How Engine Cooling Systems Work"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
          <p>
            The oil system lubricates moving parts to reduce friction and wear, while the cooling system, including the radiator, water pump, thermostat, and coolant, regulates engine temperature to prevent overheating. These systems are essential for engine longevity and performance, protecting components from excessive heat and friction.
          </p>
          <p>
            Oil and cooling systems are the engine's lifelines, ensuring durability and preventing catastrophic failures due to overheating or inadequate lubrication. Learners will study their components, such as oil pumps and radiators, through virtual simulations, learning to diagnose issues like low oil pressure or coolant leaks. Proper maintenance, such as regular oil changes and coolant flushes, is critical for engine health, especially in high-performance or high-mileage vehicles. Mechanics mastering these systems can perform essential services, ensuring client vehicles operate reliably.
          </p>
        </div>
      </div>

      <div className="content-section">
        <h2>Component Interaction</h2>
        <p>
          All engine components work together in precise coordination. The timing of valve operations, fuel injection, and ignition must be perfectly synchronized with piston movement and crankshaft rotation. Understanding these interactions is crucial for effective diagnostics and repair.
        </p>
      </div>

      <div className="content-section">
        <h2>Key Takeaways</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>The cylinder block provides the structural foundation for the engine</li>
          <li>Pistons and connecting rods convert combustion energy to mechanical motion</li>
          <li>The crankshaft and camshaft coordinate timing and power delivery</li>
          <li>Valves control gas flow in and out of cylinders</li>
          <li>Oil and cooling systems protect engine components from damage</li>
          <li>All components must work in precise coordination for optimal performance</li>
        </ul>
      </div>

      <div className="content-section">
        <h2>Diagnostic Applications</h2>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Component Failure Indicators</h3>
          <p>
            Learn to identify symptoms of component failure: unusual noises from worn bearings, oil leaks from gasket failures, overheating from cooling system issues, and power loss from valve or timing problems. Early detection saves costly repairs.
          </p>
        </div>
      </div>
    </div>
  );
};

export const lesson1_2: Lesson = {
  id: 'key-engine-components',
  title: 'Key Engine Components and Their Functions',
  content: LessonContent,
  duration: 75,
  objectives: [
    'Identify major engine components and their locations',
    'Understand the function of each key component',
    'Recognize how components interact with each other',
    'Apply knowledge to diagnose component-related issues'
  ],
  keyTerms: [
    'Cylinder Block',
    'Cylinder Head',
    'Pistons',
    'Connecting Rods',
    'Crankshaft',
    'Camshaft',
    'Valves',
    'Head Gasket',
    'Timing Belt',
    'Oil System',
    'Cooling System'
  ],
  media: [
    {
      type: 'video',
      url: 'https://youtu.be/x70VqMrXrbs?si=eabI2yUuFO5z7EpR',
      title: 'Engine Components Overview'
    },
    {
      type: 'video',
      url: 'https://youtu.be/HPVckPH6o-w?si=XgHWKXX3lV74hfJW',
      title: 'How Engine Cooling Systems Work'
    }
  ]
};