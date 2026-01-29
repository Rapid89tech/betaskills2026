import { Quiz } from '../../../types/course';

export const quiz2: Quiz = {
  id: 'module-2-quiz',
  title: 'Module 2: Petrol Fuel Systems Overview - Quiz',
  description: 'Test your understanding of carbureted vs fuel-injected engines and the role of air-fuel mixture in combustion efficiency.',
  timeLimit: 25,
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What is the primary function of a carburetor in a petrol engine?',
      options: [
        'To generate a spark for combustion',
        'To mix air and fuel before it enters the engine\'s intake manifold',
        'To control the timing of the engine\'s valves',
        'To measure exhaust gas temperature'
      ],
      correctAnswer: 1,
      explanation: 'A carburetor mechanically mixes air and fuel in the correct proportions before the mixture enters the engine\'s intake manifold for combustion.'
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'What key advantage does a fuel injection system have over a carburetor?',
      options: [
        'Lower manufacturing costs',
        'Simplified maintenance requirements',
        'More precise fuel delivery and improved combustion efficiency',
        'Less reliance on electronic sensors'
      ],
      correctAnswer: 2,
      explanation: 'Fuel injection systems provide much more precise fuel delivery through electronic control, resulting in better combustion efficiency, improved fuel economy, and lower emissions.'
    },
    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What happens if the air-fuel mixture in a petrol engine is too rich?',
      options: [
        'The engine may overheat and knock',
        'Combustion becomes more efficient, improving fuel economy',
        'The engine produces black exhaust smoke and wastes fuel',
        'Engine temperature drops, causing stalling'
      ],
      correctAnswer: 2,
      explanation: 'A rich mixture contains excess fuel, leading to incomplete combustion that produces black exhaust smoke, wastes fuel, and can cause spark plug fouling.'
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What is the ideal air-fuel ratio for a petrol engine?',
      options: [
        '10:1',
        '12.5:1',
        '14.7:1',
        '16:1'
      ],
      correctAnswer: 2,
      explanation: 'The stoichiometric (ideal) air-fuel ratio for petrol engines is 14.7:1, which provides complete combustion with optimal efficiency and minimal emissions.'
    },
    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'In a fuel-injected engine, what controls the air-fuel mixture?',
      options: [
        'The carburetor\'s jets and needles',
        'A manual adjustment by the operator',
        'The engine control unit (ECU) and various sensors',
        'The fuel pump\'s pressure regulator'
      ],
      correctAnswer: 2,
      explanation: 'In fuel-injected engines, the ECU uses data from various sensors (O2, MAF, TPS, etc.) to precisely control fuel delivery and maintain optimal air-fuel ratios.'
    },
    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'How can a lean air-fuel mixture affect a petrol engine?',
      options: [
        'It increases carbon buildup on spark plugs',
        'It reduces power and may cause engine knocking',
        'It results in excessive fuel consumption',
        'It lowers engine temperature, improving performance'
      ],
      correctAnswer: 1,
      explanation: 'A lean mixture has insufficient fuel, which can cause reduced power, engine knock due to higher combustion temperatures, and potential engine damage from overheating.'
    },
    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'Which of the following is NOT a component of a fuel injection system?',
      options: [
        'Fuel injector',
        'Oxygen sensor',
        'Spark plug',
        'Engine control unit (ECU)'
      ],
      correctAnswer: 2,
      explanation: 'While spark plugs are essential engine components, they are part of the ignition system, not the fuel injection system. The fuel injection system includes injectors, sensors, and the ECU.'
    },
    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'Which of the following is an advantage of a carbureted engine over a fuel-injected engine?',
      options: [
        'More precise control of the air-fuel ratio',
        'Simpler design and easier manual maintenance',
        'Lower emissions and better fuel economy',
        'Faster response to real-time driving conditions'
      ],
      correctAnswer: 1,
      explanation: 'Carburetors have a simpler mechanical design that can be maintained and repaired with basic tools, making them easier to service manually compared to complex electronic fuel injection systems.'
    }
  ]
};