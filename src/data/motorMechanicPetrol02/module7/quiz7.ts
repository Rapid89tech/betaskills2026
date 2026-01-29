import { QuizLesson } from '@/types/course';

const quiz7: QuizLesson = {
  id: 3,
  title: 'Quiz: Diagnosing and Repairing Common Engine Issues',
  type: 'quiz',
  duration: '15 minutes',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is a common symptom of a cylinder misfire?',
        options: [
          'Smooth idling at low speeds',
          'Noticeable shaking or roughness, especially at idle',
          'Increased fuel efficiency',
          'Complete lack of exhaust emissions'
        ],
        correctAnswer: 1,
        explanation: 'Engine misfiring occurs when one or more cylinders fail to combust fuel properly, disrupting the power stroke and causing noticeable shaking, jerking, or power loss, particularly at idle or low speeds.'
      },
      {
        id: 2,
        question: 'What might indicate a clogged fuel injector?',
        options: [
          'Black smoke from the exhaust',
          'High-pitched knocking noise during acceleration',
          'Sudden drops in engine temperature',
          'Loss of power under load or poor throttle response'
        ],
        correctAnswer: 3,
        explanation: 'A clogged fuel injector restricts fuel flow, causing loss of power under load or poor throttle response, as the engine cannot receive the proper amount of fuel for combustion.'
      },
      {
        id: 3,
        question: 'What can cause black smoke from the exhaust?',
        options: [
          'Burning oil in the combustion chamber',
          'Coolant leak into the cylinders',
          'Rich fuel mixture from a malfunctioning sensor or injector',
          'Excessive timing chain wear'
        ],
        correctAnswer: 2,
        explanation: 'Black smoke indicates a rich fuel mixture (too much fuel, not enough air), often due to clogged injectors, a faulty MAF sensor, or a failing fuel pressure regulator.'
      },
      {
        id: 4,
        question: 'Blue smoke from the exhaust usually indicates what issue?',
        options: [
          'Engine running too lean',
          'Coolant leaking into the combustion chamber',
          'Burning oil due to worn piston rings or valve seals',
          'Clogged catalytic converter'
        ],
        correctAnswer: 2,
        explanation: 'Blue smoke signals oil burning in the combustion chamber, caused by worn piston rings, valve seals, or a faulty PCV system, leading to oil consumption and potential engine damage.'
      },
      {
        id: 5,
        question: 'What does a knocking or pinging noise under load suggest?',
        options: [
          'Failing alternator',
          'Incorrect ignition timing or low-octane fuel',
          'Clogged air filter',
          'Excess coolant in the system'
        ],
        correctAnswer: 1,
        explanation: 'Knocking or pinging, a metallic sound during acceleration or under load, often results from low-octane fuel (below 95), incorrect ignition timing, or carbon buildup in combustion chambers.'
      },
      {
        id: 6,
        question: 'White smoke from the exhaust could indicate?',
        options: [
          'Excessive fuel in the combustion chamber',
          'Oil burning inside the engine',
          'Coolant leaking into the combustion chamber, often from a blown head gasket',
          'Clogged catalytic converter'
        ],
        correctAnswer: 2,
        explanation: 'White smoke suggests coolant entering the cylinders, typically from a blown head gasket or cracked cylinder head, costing R20,000–R40,000 to repair.'
      },
      {
        id: 7,
        question: 'What tool confirms a cylinder compression problem?',
        options: [
          'Torque wrench',
          'Compression tester',
          'Fuel pressure gauge',
          'Stethoscope'
        ],
        correctAnswer: 1,
        explanation: 'Compression testing evaluates cylinder health by measuring pressure (170–210 kPa for most petrol engines) during cranking, diagnosing issues like worn piston rings, damaged valves, or blown head gaskets.'
      },
      {
        id: 8,
        question: 'What is a likely cause of rough idling that improves when revved?',
        options: [
          'Faulty spark plugs or ignition components',
          'Worn valve seals',
          'Broken timing belt',
          'Failing oil pump'
        ],
        correctAnswer: 0,
        explanation: 'Rough idling that improves when revved often indicates faulty spark plugs or ignition components, as the engine can compensate for the issue at higher RPMs.'
      },
      {
        id: 9,
        question: 'What does a rapid vacuum gauge fluctuation at idle suggest?',
        options: [
          'Healthy engine',
          'Burned or sticking valve',
          'Clogged fuel filter',
          'Normal throttle behavior'
        ],
        correctAnswer: 1,
        explanation: 'Rapid fluctuations (3–5 kPa) indicate sticking valves or weak springs, common in South African vehicles after 100,000 km due to heat-induced wear.'
      },
      {
        id: 10,
        question: 'What should be prioritized for immediate repair?',
        options: [
          'Dirty air filter',
          'Fuel leak causing a strong gasoline odour',
          'Minor vacuum hose crack',
          'Worn tire pressure sensor'
        ],
        correctAnswer: 1,
        explanation: 'Immediate repairs include fuel leaks (fire risk, R50,000+ in damages), as they pose significant safety hazards and can cause catastrophic vehicle damage.'
      },
      {
        id: 11,
        question: 'What does a fuel pressure test showing a rapid drop after engine shutdown indicate?',
        options: [
          'Healthy fuel system',
          'Leaking injector or faulty pressure regulator',
          'Clogged air filter',
          'Worn piston rings'
        ],
        correctAnswer: 1,
        explanation: 'A rapid drop after shutdown points to leaking injectors or a failed check valve, causing hard starts and potential fuel system issues.'
      },
      {
        id: 12,
        question: 'What is a benefit of addressing preventable failures like a clogged air filter?',
        options: [
          'Reduced fuel economy',
          'Improved engine performance and lower repair costs',
          'Increased emissions',
          'Higher risk of engine seizure'
        ],
        correctAnswer: 1,
        explanation: 'Addressing preventable failures like a clogged air filter improves engine performance and lowers repair costs, preventing more serious issues from developing.'
      }
    ]
  }
};

export default quiz7;
