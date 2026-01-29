import { VideoLesson } from '@/types/course';

const lesson1: VideoLesson = {
  id: 1,
  title: 'Carbureted vs. Fuel-Injected Engines',
  type: 'video',
  duration: '55 minutes',
  content: {
    videoUrl: 'https://youtu.be/qza9U_GWW3A?si=bVyEpItdTXCZF3QI',
    textContent: `
    <h2>Carbureted vs. Fuel-Injected Engines</h2>
    
    <p>Understanding the differences between carbureted and fuel-injected engines is essential for mechanics working with both classic and modern vehicles. Each system has distinct advantages and maintenance requirements.</p>
    
    <h3>Carburetor Operation</h3>
    <p>Carburetors mechanically mix air and fuel before delivery to the engine's intake manifold, using a vacuum created by piston movement to draw fuel from a reservoir. Components like jets, floats, and throttle plates control the mixture, which is then distributed to the cylinders for combustion. Found in older vehicles, carburetors are simple but require frequent tuning to maintain optimal performance.</p>
    
    <p>Carburetors represent a foundational technology in petrol engines, valued for their simplicity and affordability in classic cars and small engines like lawnmowers. Learners will explore carburetor operation through virtual simulations, adjusting jets and floats to achieve the desired air-fuel ratio. While effective, carburetors lack the precision of modern systems, leading to inconsistent fuel delivery and higher emissions. Mechanics mastering carburetor maintenance can service vintage vehicles, addressing issues like flooding or lean mixtures, which cause rough idling or stalling. The AI voice tutor can guide learners through tuning a carburetor or diagnosing blockages, ensuring practical skills for restoring older engines.</p>
    
    <h3>Fuel Injection System Mechanics</h3>
    <p>Fuel-injected engines use electronically controlled injectors to spray fuel directly into the intake manifold (port injection) or combustion chamber (direct injection), managed by the engine control unit (ECU). Sensors like the mass airflow (MAF) and oxygen (O2) sensors provide real-time data to adjust the air-fuel mixture, ensuring optimal combustion under varying conditions.</p>
    
    <p>Fuel injection systems are the cornerstone of modern petrol engine efficiency, offering precise fuel delivery that enhances power, fuel economy, and emissions control. Learners will use virtual simulations to explore injector operation and ECU programming, adjusting fuel trims based on sensor inputs. These systems are complex, requiring specialized diagnostic tools like OBD-II scanners to troubleshoot issues such as clogged injectors or faulty sensors. Mechanics mastering fuel injection can service modern vehicles, ensuring compliance with stringent emissions standards. The AI voice tutor can assist with diagnosing injector failures or interpreting ECU data, providing step-by-step guidance for complex repairs.</p>
    
    <h3>Advantages of Carburetors</h3>
    <p>Carburetors are simple, cost-effective, and easy to repair with basic tools, making them ideal for older vehicles and small engines. Their mechanical design requires no complex electronics, allowing straightforward maintenance and tuning, which is particularly appealing for classic car enthusiasts and budget-conscious applications.</p>
    
    <p>The simplicity of carburetors makes them a valuable technology for specific contexts, such as restoring vintage cars or servicing small engines in motorcycles or generators. Learners will study carburetor components like choke valves and venturi tubes through interactive models, practicing manual adjustments to optimize performance. While less efficient than fuel injection, their ease of repair reduces downtime and costs in certain scenarios. Mechanics mastering carburetor maintenance can cater to niche markets, such as classic car restoration, where these systems remain prevalent. The AI voice tutor can explain how to adjust a carburetor's idle mixture or diagnose flooding, offering practical solutions for real-world applications.</p>
    
    <h3>Advantages of Fuel Injection</h3>
    <p>Fuel injection systems deliver precise fuel amounts, improving combustion efficiency, fuel economy, and throttle response. Controlled by the ECU, they adapt to driving conditions, reducing emissions and enhancing reliability. They excel in cold starts and high-altitude environments, meeting modern environmental standards like Euro 6 or EPA regulations.</p>
    
    <p>Fuel injection's precision and adaptability make it the standard for modern petrol engines, supporting performance and environmental goals. Learners will explore how sensors like the throttle position sensor (TPS) and oxygen sensor optimize fuel delivery through virtual simulations. These systems reduce unburned fuel and emissions, making them critical for compliance with global regulations. Mechanics mastering fuel injection can service advanced vehicles, addressing issues like sensor failures or injector clogs. The AI voice tutor can guide learners through diagnosing fuel trim errors or recalibrating injectors, ensuring skills for modern automotive repair.</p>
    
    <h3>Disadvantages and Challenges</h3>
    <p>Carburetors require frequent manual tuning and are less efficient, leading to higher emissions and fuel waste, while fuel injection systems are complex and costly to repair, often requiring specialized diagnostic tools. Both systems present unique maintenance challenges, such as carburetor clogging or injector sensor failures.</p>
    
    <p>The trade-offs between carburetors and fuel injection highlight their respective maintenance demands. Carburetors, while simpler, need regular adjustments to prevent issues like flooding or lean mixtures, which can degrade performance. Fuel injection systems, though efficient, rely on complex electronics, making repairs expensive and requiring tools like scan tools or multimeters. Learners will compare these challenges through case studies, diagnosing issues like carburetor varnish buildup or injector circuit faults. Mechanics mastering these systems can service a wide range of vehicles, from classic to modern. The AI voice tutor can assist with troubleshooting, explaining how to clean carburetors or test injector circuits.</p>
    
    <h3>Key Learning Points</h3>
    <ul>
      <li>Carburetors are mechanical systems that mix air and fuel</li>
      <li>Fuel injection uses electronic control for precise delivery</li>
      <li>Each system has specific advantages and maintenance needs</li>
      <li>Modern vehicles primarily use fuel injection</li>
      <li>Understanding both systems is valuable for mechanics</li>
    </ul>
  `
  }
};

export default lesson1;
