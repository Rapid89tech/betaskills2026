import type { Lesson } from '@/types/course';

export const quiz7: Lesson = {
  id: 3,
  title: '📝 Module 7 Quiz: Diagnosing and Repairing Common Engine Issues',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is a common symptom of a cylinder misfire?',
        options: [
          'Smooth idling at low speeds',
          'Noticeable shaking or roughness, especially at idle',
          'Increased fuel efficiency',
          'Complete lack of exhaust emissions'
        ],
        correct: 1,
        explanation: 'A cylinder misfire causes noticeable shaking or roughness, particularly at idle or low speeds, along with vibrations, popping sounds from the exhaust, and potential check engine lights.'
      },
      {
        question: 'What might indicate a clogged fuel injector?',
        options: [
          'Black smoke from the exhaust',
          'High-pitched knocking noise during acceleration',
          'Sudden drops in engine temperature',
          'Loss of power under load or poor throttle response'
        ],
        correct: 3,
        explanation: 'Clogged fuel injectors restrict fuel flow, causing loss of power under load, poor throttle response, rough idling, and potential misfires due to inadequate fuel delivery.'
      },
      {
        question: 'What can cause black smoke from the exhaust?',
        options: [
          'Burning oil in the combustion chamber',
          'Coolant leak into the cylinders',
          'Rich fuel mixture from a malfunctioning sensor or injector',
          'Excessive timing chain wear'
        ],
        correct: 2,
        explanation: 'Black smoke indicates a rich fuel mixture (too much fuel, not enough air), typically caused by clogged injectors, faulty MAF sensor, or failing fuel pressure regulator.'
      },
      {
        question: 'Blue smoke from the exhaust usually indicates what issue?',
        options: [
          'Engine running too lean',
          'Coolant leaking into the combustion chamber',
          'Burning oil due to worn piston rings or valve seals',
          'Clogged catalytic converter'
        ],
        correct: 2,
        explanation: 'Blue smoke signals oil burning in the combustion chamber, caused by worn piston rings, valve seals, or a faulty PCV system, leading to oil consumption and potential engine damage.'
      },
      {
        question: 'What does a knocking or pinging noise under load suggest?',
        options: [
          'Failing alternator',
          'Incorrect ignition timing or low-octane fuel',
          'Clogged air filter',
          'Excess coolant in the system'
        ],
        correct: 1,
        explanation: 'Knocking or pinging under load typically results from incorrect ignition timing, low-octane fuel (below 95), or carbon buildup in combustion chambers, risking piston damage.'
      },
      {
        question: 'White smoke from the exhaust could indicate?',
        options: [
          'Excessive fuel in the combustion chamber',
          'Oil burning inside the engine',
          'Coolant leaking into the combustion chamber, often from a blown head gasket',
          'Clogged catalytic converter'
        ],
        correct: 2,
        explanation: 'White smoke suggests coolant entering the cylinders, typically from a blown head gasket or cracked cylinder head, requiring costly repairs (R20,000–R40,000).'
      },
      {
        question: 'What tool confirms a cylinder compression problem?',
        options: [
          'Torque wrench',
          'Compression tester',
          'Fuel pressure gauge',
          'Stethoscope'
        ],
        correct: 1,
        explanation: 'A compression tester measures cylinder pressure during cranking, diagnosing issues like worn piston rings, damaged valves, or blown head gaskets by comparing readings across cylinders.'
      },
      {
        question: 'What is a likely cause of rough idling that improves when revved?',
        options: [
          'Faulty spark plugs or ignition components',
          'Worn valve seals',
          'Broken timing belt',
          'Failing oil pump'
        ],
        correct: 0,
        explanation: 'Rough idling that improves when revved often indicates faulty spark plugs or ignition components, which struggle at low RPMs but perform better at higher engine speeds.'
      },
      {
        question: 'What does a rapid vacuum gauge fluctuation at idle suggest?',
        options: [
          'Healthy engine',
          'Burned or sticking valve',
          'Clogged fuel filter',
          'Normal throttle behavior'
        ],
        correct: 1,
        explanation: 'Rapid vacuum gauge fluctuations (3–5 kPa) at idle indicate burned or sticking valves, which disrupt normal intake manifold pressure and require valve inspection or replacement.'
      },
      {
        question: 'What should be prioritized for immediate repair?',
        options: [
          'Dirty air filter',
          'Fuel leak causing a strong gasoline odour',
          'Minor vacuum hose crack',
          'Worn tire pressure sensor'
        ],
        correct: 1,
        explanation: 'Fuel leaks pose immediate fire hazards and safety risks, requiring urgent repair to prevent catastrophic damage (R50,000+) and ensure vehicle and occupant safety.'
      },
      {
        question: 'What does a fuel pressure test showing a rapid drop after engine shutdown indicate?',
        options: [
          'Healthy fuel system',
          'Leaking injector or faulty pressure regulator',
          'Clogged air filter',
          'Worn piston rings'
        ],
        correct: 1,
        explanation: 'A rapid pressure drop after shutdown indicates leaking injectors or a failed check valve, allowing fuel to drain back to the tank and causing hard starting or misfires.'
      },
      {
        question: 'What is a benefit of addressing preventable failures like a clogged air filter?',
        options: [
          'Reduced fuel economy',
          'Improved engine performance and lower repair costs',
          'Increased emissions',
          'Higher risk of engine seizure'
        ],
        correct: 1,
        explanation: 'Addressing preventable failures like clogged air filters improves engine performance, restores fuel economy, reduces emissions, and prevents costly repairs from escalating issues.'
      }
    ]
  }
};
