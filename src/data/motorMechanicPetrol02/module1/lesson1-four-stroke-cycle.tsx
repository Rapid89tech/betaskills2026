import { VideoLesson } from '@/types/course';

const lesson1: VideoLesson = {
  id: 1,
  title: 'Understanding the Four-Stroke Engine Cycle',
  type: 'video',
  duration: '45 minutes',
  content: {
    videoUrl: 'https://youtu.be/Pu7g3uIG6Zo?si=uhwqwaTajW2B4bLX',
    textContent: `
    <h2>Understanding the Four-Stroke Engine Cycle</h2>
  
    <p>The four-stroke engine cycle is the fundamental operating principle of petrol engines. This cycle consists of four distinct phases that work together to convert fuel into mechanical energy.</p>
    
    <h3>Intake Stroke (Suck)</h3>
    <p>The intake stroke begins the four-stroke cycle, where the intake valve opens to allow a precisely calibrated air-fuel mixture into the cylinder. As the piston moves downward, it creates a vacuum, drawing the mixture through the intake manifold. This process is critical for setting up efficient combustion, with the throttle valve controlling airflow to optimize the air-fuel ratio (typically 14.7:1 for petrol engines). The intake stroke's efficiency directly impacts engine power and fuel economy, making it a focal point for diagnosing issues like vacuum leaks or throttle body malfunctions.</p>
    
    <p>The intake stroke is the engine's first step in converting fuel into motion, requiring precise coordination between the throttle, intake valves, and fuel delivery system. Learners will use virtual simulations to explore airflow dynamics, adjusting throttle settings to observe their impact on the air-fuel mixture. Common issues, such as clogged air filters or faulty intake valves, can disrupt this stroke, leading to poor performance or stalling. By mastering the intake stroke, mechanics can diagnose and resolve these issues, ensuring vehicles deliver optimal power and efficiency. This knowledge is vital for servicing modern petrol engines, where electronic throttle control and variable intake systems are increasingly common. The AI voice tutor can guide learners through troubleshooting scenarios, such as identifying a vacuum leak using a virtual pressure gauge.</p>
    
    <h3>Compression Stroke (Squash)</h3>
    <p>During the compression stroke, both intake and exhaust valves close, and the piston moves upward, compressing the air-fuel mixture into a smaller volume. This compression increases the mixture's temperature and pressure, typically to a ratio of 8:1 to 12:1 in petrol engines, preparing it for ignition. Higher compression ratios enhance power output but risk knocking if not carefully managed. This stroke is crucial for maximizing combustion efficiency and engine performance.</p>
    
    <p>The compression stroke is where the engine builds the potential energy needed for the power stroke, making it a critical phase for performance and efficiency. Learners will use interactive simulations to adjust compression ratios and observe their effects on cylinder pressure and temperature, gaining insights into how engine design influences output. Issues like worn piston rings or leaking valves can reduce compression, leading to power loss or misfires. Mechanics mastering this stroke can diagnose such problems using tools like compression testers, ensuring engines operate at peak performance. The AI voice tutor provides real-time guidance, explaining how to interpret compression test results or adjust valve clearances to restore optimal compression.</p>
    
    <h3>Power Stroke (Bang)</h3>
    <p>The power stroke is the engine's energy-producing phase, where the spark plug ignites the compressed air-fuel mixture, creating an explosion that forces the piston downward. This movement generates mechanical energy, transferred to the crankshaft to power the vehicle. Precise spark timing, controlled by the engine control unit (ECU), ensures efficient combustion and prevents issues like pre-ignition or detonation. This is the only stroke that produces usable work, making it central to engine performance.</p>
    
    <p>The power stroke transforms chemical energy into mechanical power, driving the vehicle's motion and defining its performance characteristics. Learners will explore ignition timing and combustion dynamics through virtual simulations, adjusting spark plug firing to optimize power output. Common issues, such as faulty spark plugs or incorrect timing, can cause misfires or reduced power, which mechanics must diagnose using tools like oscilloscopes or OBD-II scanners. By mastering this stroke, learners can fine-tune engines for maximum efficiency and performance, a critical skill in automotive repair. The AI voice tutor can assist with troubleshooting, explaining how to analyze ignition patterns or adjust timing for optimal combustion.</p>
    
    <h3>Exhaust Stroke (Blow)</h3>
    <p>In the exhaust stroke, the exhaust valve opens, and the piston moves upward to expel burnt gases from the cylinder, clearing the chamber for the next cycle. This stroke ensures the engine remains free of combustion byproducts, maintaining efficiency and emissions compliance. Components like the exhaust manifold and catalytic converter play key roles in directing and treating exhaust gases to meet environmental standards.</p>
    
    <p>The exhaust stroke is essential for engine health and environmental compliance, as it removes waste gases that could otherwise cause carbon buildup or reduced performance. Learners will use virtual simulations to trace exhaust gas flow through the manifold, catalytic converter, and muffler, learning to diagnose issues like clogged converters or leaking exhaust valves. This stroke's efficiency impacts fuel economy and emissions, making it a focal point for mechanics working on modern vehicles subject to strict regulations like Euro 6 or EPA standards. The AI voice tutor can guide learners through diagnosing exhaust restrictions, offering step-by-step advice on using tools like backpressure testers to ensure optimal flow.</p>
    
    <h3>Key Learning Points</h3>
    <ul>
      <li>The four-stroke cycle consists of intake, compression, power, and exhaust strokes</li>
      <li>Each stroke has a specific function in the engine's operation</li>
      <li>Precise timing and coordination between components is essential</li>
      <li>Understanding the cycle helps diagnose engine problems</li>
      <li>Modern engines use electronic control systems to optimize the cycle</li>
    </ul>
  `
  }
};

export default lesson1;
