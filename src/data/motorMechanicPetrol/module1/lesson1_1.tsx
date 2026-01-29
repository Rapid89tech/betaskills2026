import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="lesson-content">
      <h1>Understanding the Four-Stroke Engine Cycle</h1>
      
      <div className="video-container mb-6">
        <iframe 
          width="100%" 
          height="400" 
          src="https://youtu.be/Pu7g3uIG6Zo?si=uhwqwaTajW2B4bLX" 
          title="Four-Stroke Engine Cycle"
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      </div>

      <div className="content-section">
        <h2>Section Overview</h2>
        <p>
          The four-stroke engine cycle is the fundamental process that powers petrol engines. Understanding this cycle is crucial for diagnosing issues and performing maintenance effectively. Each stroke has a specific function that contributes to the overall operation of the engine.
        </p>
      </div>

      <div className="content-section">
        <h2>The Four Strokes Explained</h2>
        
        <div className="stroke-explanation mb-6">
          <h3 className="text-red-600 font-bold">1. Intake Stroke (Suck)</h3>
          <div className="video-container mb-4">
            <iframe 
              width="100%" 
              height="300" 
              src="https://youtu.be/9KKfIYch1FE?si=02ky8wwGrdsPlAqA" 
              title="How a Car Engine Works"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
          <p>
            The intake stroke begins the four-stroke cycle, where the intake valve opens to allow a precisely calibrated air-fuel mixture into the cylinder. As the piston moves downward, it creates a vacuum, drawing the mixture through the intake manifold. This process is critical for setting up efficient combustion, with the throttle valve controlling airflow to optimize the air-fuel ratio (typically 14.7:1 for petrol engines). The intake stroke's efficiency directly impacts engine power and fuel economy, making it a focal point for diagnosing issues like vacuum leaks or throttle body malfunctions.
          </p>
          <p>
            The intake stroke is the engine's first step in converting fuel into motion, requiring precise coordination between the throttle, intake valves, and fuel delivery system. Learners will use virtual simulations to explore airflow dynamics, adjusting throttle settings to observe their impact on the air-fuel mixture. Common issues, such as clogged air filters or faulty intake valves, can disrupt this stroke, leading to poor performance or stalling. By mastering the intake stroke, mechanics can diagnose and resolve these issues, ensuring vehicles deliver optimal power and efficiency. This knowledge is vital for servicing modern petrol engines, where electronic throttle control and variable intake systems are increasingly common.
          </p>
        </div>

        <div className="stroke-explanation mb-6">
          <h3 className="text-red-600 font-bold">2. Compression Stroke (Squash)</h3>
          <p>
            During the compression stroke, both intake and exhaust valves close, and the piston moves upward, compressing the air-fuel mixture into a smaller volume. This compression increases the mixture's temperature and pressure, typically to a ratio of 8:1 to 12:1 in petrol engines, preparing it for ignition. Higher compression ratios enhance power output but risk knocking if not carefully managed. This stroke is crucial for maximizing combustion efficiency and engine performance.
          </p>
          <p>
            The compression stroke is where the engine builds the potential energy needed for the power stroke, making it a critical phase for performance and efficiency. Learners will use interactive simulations to adjust compression ratios and observe their effects on cylinder pressure and temperature, gaining insights into how engine design influences output. Issues like worn piston rings or leaking valves can reduce compression, leading to power loss or misfires. Mechanics mastering this stroke can diagnose such problems using tools like compression testers, ensuring engines operate at peak performance.
          </p>
        </div>

        <div className="stroke-explanation mb-6">
          <h3 className="text-red-600 font-bold">3. Power Stroke (Bang)</h3>
          <div className="video-container mb-4">
            <iframe 
              width="100%" 
              height="300" 
              src="https://youtu.be/x70VqMrXrbs?si=eabI2yUuFO5z7EpR" 
              title="Internal Combustion Engine: Power Stroke"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
          <p>
            The power stroke is the engine's energy-producing phase, where the spark plug ignites the compressed air-fuel mixture, creating an explosion that forces the piston downward. This movement generates mechanical energy, transferred to the crankshaft to power the vehicle. Precise spark timing, controlled by the engine control unit (ECU), ensures efficient combustion and prevents issues like pre-ignition or detonation. This is the only stroke that produces usable work, making it central to engine performance.
          </p>
          <p>
            The power stroke transforms chemical energy into mechanical power, driving the vehicle's motion and defining its performance characteristics. Learners will explore ignition timing and combustion dynamics through virtual simulations, adjusting spark plug firing to optimize power output. Common issues, such as faulty spark plugs or incorrect timing, can cause misfires or reduced power, which mechanics must diagnose using tools like oscilloscopes or OBD-II scanners. By mastering this stroke, learners can fine-tune engines for maximum efficiency and performance, a critical skill in automotive repair.
          </p>
        </div>

        <div className="stroke-explanation mb-6">
          <h3 className="text-red-600 font-bold">4. Exhaust Stroke (Blow)</h3>
          <div className="video-container mb-4">
            <iframe 
              width="100%" 
              height="300" 
              src="https://youtu.be/plIzFxAlSLU?si=6-LW1R052BvoJWxd" 
              title="How an Engine Exhaust System Works"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
          <p>
            In the exhaust stroke, the exhaust valve opens, and the piston moves upward to expel burnt gases from the cylinder, clearing the chamber for the next cycle. This stroke ensures the engine remains free of combustion byproducts, maintaining efficiency and emissions compliance. Components like the exhaust manifold and catalytic converter play key roles in directing and treating exhaust gases to meet environmental standards.
          </p>
          <p>
            The exhaust stroke is essential for engine health and environmental compliance, as it removes waste gases that could otherwise cause carbon buildup or reduced performance. Learners will use virtual simulations to trace exhaust gas flow through the manifold, catalytic converter, and muffler, learning to diagnose issues like clogged converters or leaking exhaust valves. This stroke's efficiency impacts fuel economy and emissions, making it a focal point for mechanics working on modern vehicles subject to strict regulations like Euro 6 or EPA standards.
          </p>
        </div>
      </div>

      <div className="content-section">
        <h2>Key Takeaways</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>The four-stroke cycle consists of intake, compression, power, and exhaust strokes</li>
          <li>Each stroke serves a specific purpose in the combustion process</li>
          <li>Proper timing and coordination between strokes is essential for optimal performance</li>
          <li>Understanding each stroke helps in diagnosing engine problems</li>
          <li>The power stroke is the only stroke that produces usable work</li>
        </ul>
      </div>

      <div className="content-section">
        <h2>Interactive Elements</h2>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Virtual Engine Simulation</h3>
          <p>
            Use the interactive engine simulator to observe each stroke in action. Adjust variables such as throttle position, compression ratio, and spark timing to see their effects on engine performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export const lesson1_1: Lesson = {
  id: 'understanding-four-stroke-cycle',
  title: 'Understanding the Four-Stroke Engine Cycle',
  content: LessonContent,
  duration: 60,
  objectives: [
    'Identify the four strokes of a petrol engine cycle',
    'Understand the purpose and mechanics of each stroke',
    'Recognize common issues that can occur during each stroke',
    'Apply knowledge to diagnose engine problems'
  ],
  keyTerms: [
    'Intake Stroke',
    'Compression Stroke', 
    'Power Stroke',
    'Exhaust Stroke',
    'Air-fuel Mixture',
    'Compression Ratio',
    'Spark Timing',
    'Combustion Chamber'
  ],
  media: [
    {
      type: 'video',
      url: 'https://youtu.be/Pu7g3uIG6Zo?si=uhwqwaTajW2B4bLX',
      title: 'Four-Stroke Engine Cycle Overview'
    },
    {
      type: 'video', 
      url: 'https://youtu.be/9KKfIYch1FE?si=02ky8wwGrdsPlAqA',
      title: 'How a Car Engine Works'
    },
    {
      type: 'video',
      url: 'https://youtu.be/x70VqMrXrbs?si=eabI2yUuFO5z7EpR', 
      title: 'Internal Combustion Engine: Power Stroke'
    }
  ]
};