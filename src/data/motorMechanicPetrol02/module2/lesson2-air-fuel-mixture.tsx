import { VideoLesson } from '@/types/course';

const lesson2: VideoLesson = {
  id: 2,
  title: 'Role of Air-Fuel Mixture in Combustion Efficiency',
  type: 'video',
  duration: '45 minutes',
  content: {
    videoUrl: 'https://youtu.be/4FfcjERUtUw?si=99d-GgIyz7EpbYGA',
    textContent: `
      <h2>Role of Air-Fuel Mixture in Combustion Efficiency</h2>
      
      <p>The air-fuel mixture is critical for optimizing engine performance and meeting environmental standards. Understanding how to achieve and maintain the correct mixture is essential for mechanics.</p>
      
      <h3>Stoichiometric Ratio</h3>
      <p>The stoichiometric ratio for petrol engines, approximately 14.7:1 (14.7 parts air to 1 part fuel by weight), ensures complete combustion, maximizing power and minimizing emissions. This ideal balance allows all fuel to burn with available oxygen, critical for efficiency and environmental compliance.</p>
      
      <p>The stoichiometric ratio is the benchmark for optimal combustion in petrol engines, ensuring efficient energy conversion and reduced pollutants. Learners will use virtual simulations to adjust air-fuel ratios, observing how deviations impact combustion. Maintaining this ratio requires precise fuel delivery and clean air intake systems, as even minor imbalances can cause performance issues. Mechanics mastering this concept can diagnose and correct mixture-related problems, ensuring vehicles meet emissions standards and perform reliably. The AI voice tutor can explain how to use OBD-II data to monitor air-fuel ratios or adjust fuel trims for optimal combustion.</p>
      
      <h3>Effects of a Rich Mixture</h3>
      <p>A rich mixture (e.g., 12:1) contains excess fuel, producing more power initially but leading to incomplete combustion, higher emissions, and carbon buildup. Symptoms include black exhaust smoke, fouled spark plugs, and reduced engine life due to fuel washing oil from cylinder walls.</p>
      
      <p>A rich mixture can temporarily boost power but wastes fuel and harms engine components, making it a common issue in poorly tuned carbureted engines or faulty fuel injection systems. Learners will explore these effects through virtual diagnostics, identifying symptoms like black smoke or spark plug fouling. This knowledge is crucial for diagnosing issues like clogged air filters or malfunctioning oxygen sensors, which cause rich mixtures. Mechanics mastering this can restore engine efficiency and prevent long-term damage. The AI voice tutor can guide learners through diagnosing rich mixture issues, offering steps to test fuel pressure or clean fouled plugs.</p>
      
      <h3>Effects of a Lean Mixture</h3>
      <p>A lean mixture (e.g., 17:1) has excess air, burning cleaner but risking engine knocking, higher combustion temperatures, and reduced power. It can damage pistons and valves due to overheating, often caused by vacuum leaks or clogged injectors.</p>
      
      <p>Lean mixtures pose significant risks to engine health, as high temperatures can cause detonation or component failure, particularly in high-performance engines. Learners will use simulations to diagnose lean mixture symptoms, such as misfires or rough idling, and learn corrective actions like checking for vacuum leaks. This knowledge is essential for mechanics servicing modern vehicles, where lean mixtures can trigger check engine lights or emissions failures. The AI voice tutor can assist with diagnosing lean conditions, explaining how to use a scan tool to detect MAF sensor errors or vacuum issues.</p>
      
      <h3>Role of Sensors in Fuel Injection</h3>
      <p>Fuel injection systems rely on sensors like oxygen (O2), mass airflow (MAF), and throttle position (TPS) sensors to monitor and adjust the air-fuel mixture in real-time. The ECU uses this data to optimize combustion, adapting to driving conditions like load, temperature, or altitude.</p>
      
      <p>Sensors are the backbone of fuel injection systems, enabling dynamic adjustments that carburetors cannot match. Learners will explore sensor functions through virtual diagnostics, simulating how O2 sensors detect exhaust gas composition or MAF sensors measure airflow. Faulty sensors can disrupt the air-fuel ratio, causing performance issues or emissions failures. Mechanics mastering sensor diagnostics can use tools like multimeters or scan tools to troubleshoot and replace faulty components, ensuring optimal engine performance. The AI voice tutor can explain sensor testing procedures, such as checking O2 sensor voltage or MAF sensor readings.</p>
      
      <h3>Maintenance for Optimal Combustion</h3>
      <p>Regular maintenance of air filters, fuel injectors, and sensors ensures a consistent air-fuel mixture, preventing issues like engine knock or misfires. Cleaning injectors, replacing clogged filters, and checking sensor performance are critical for maintaining combustion efficiency and engine health.</p>
      
      <p>Proper maintenance of fuel system components is essential for sustaining combustion efficiency and meeting emissions standards. Learners will practice maintenance tasks through virtual simulations, such as cleaning injectors or replacing air filters, and learn to diagnose issues like low fuel pressure or dirty sensors. These tasks are vital for preventing performance degradation and extending engine life, especially in high-mileage vehicles. Mechanics mastering these skills can offer comprehensive services, ensuring client vehicles run smoothly and efficiently. The AI voice tutor can guide learners through maintenance procedures, explaining how to use fuel system cleaners or test sensor functionality.</p>
      
      <h3>Key Learning Points</h3>
      <ul>
        <li>The stoichiometric ratio of 14.7:1 is ideal for petrol engines</li>
        <li>Rich mixtures waste fuel and cause carbon buildup</li>
        <li>Lean mixtures can damage engine components</li>
        <li>Sensors play a crucial role in modern fuel systems</li>
        <li>Regular maintenance ensures optimal combustion</li>
      </ul>
    `
  }
};

export default lesson2;
