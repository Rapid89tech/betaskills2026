import type { Lesson } from '@/types/course';

export const quiz2: Lesson = {
  id: 3,
  title: '📝 Module 2 Quiz: Petrol Fuel Systems Overview',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary function of a carburetor in a petrol engine?',
        options: [
          'To generate a spark for combustion',
          'To mix air and fuel before it enters the engine\'s intake manifold',
          'To control the timing of the engine\'s valves',
          'To measure exhaust gas temperature'
        ],
        correct: 1,
        explanation: 'The carburetor mechanically mixes air and fuel before delivery to the engine\'s intake manifold, using vacuum created by piston movement.'
      },
      {
        question: 'What key advantage does a fuel injection system have over a carburetor?',
        options: [
          'Lower manufacturing costs',
          'Simplified maintenance requirements',
          'More precise fuel delivery and improved combustion efficiency',
          'Less reliance on electronic sensors'
        ],
        correct: 2,
        explanation: 'Fuel injection systems use electronic controls for precise fuel delivery, improving combustion efficiency, emissions, and performance compared to carburetors.'
      },
      {
        question: 'What happens if the air-fuel mixture in a petrol engine is too rich?',
        options: [
          'The engine may overheat and knock',
          'Combustion becomes more efficient, improving fuel economy',
          'The engine produces black exhaust smoke and wastes fuel',
          'Engine temperature drops, causing stalling'
        ],
        correct: 2,
        explanation: 'A rich mixture (too much fuel) causes incomplete combustion, resulting in black exhaust smoke, wasted fuel, and potential spark plug fouling.'
      },
      {
        question: 'What is the ideal air-fuel ratio for a petrol engine?',
        options: [
          '10:1',
          '12.5:1',
          '14.7:1',
          '16:1'
        ],
        correct: 2,
        explanation: 'The stoichiometric air-fuel ratio of 14.7:1 ensures complete combustion, optimizing power output while minimizing emissions and fuel waste.'
      },
      {
        question: 'In a fuel-injected engine, what controls the air-fuel mixture?',
        options: [
          'The carburetor\'s jets and needles',
          'A manual adjustment by the operator',
          'The engine control unit (ECU) and various sensors',
          'The fuel pump\'s pressure regulator'
        ],
        correct: 2,
        explanation: 'The ECU uses data from sensors like the mass airflow sensor and oxygen sensors to precisely control fuel injector pulse widths and maintain optimal air-fuel ratios.'
      },
      {
        question: 'How can a lean air-fuel mixture affect a petrol engine?',
        options: [
          'It increases carbon buildup on spark plugs',
          'It reduces power and may cause engine knocking',
          'It results in excessive fuel consumption',
          'It lowers engine temperature, improving performance'
        ],
        correct: 1,
        explanation: 'A lean mixture (too little fuel) can cause reduced power output, increased combustion temperatures, and engine knocking due to insufficient fuel for proper combustion.'
      },
      {
        question: 'Which of the following is NOT a component of a fuel injection system?',
        options: [
          'Fuel injector',
          'Oxygen sensor',
          'Spark plug',
          'Engine control unit (ECU)'
        ],
        correct: 2,
        explanation: 'While spark plugs are essential for ignition, they are part of the ignition system, not the fuel injection system. Fuel injection components include injectors, sensors, and the ECU.'
      },
      {
        question: 'Which of the following is an advantage of a carbureted engine over a fuel-injected engine?',
        options: [
          'More precise control of the air-fuel ratio',
          'Simpler design and easier manual maintenance',
          'Lower emissions and better fuel economy',
          'Faster response to real-time driving conditions'
        ],
        correct: 1,
        explanation: 'Carburetors have a simpler mechanical design without electronic components, making them easier to maintain manually and less expensive to repair, though less efficient than fuel injection.'
      }
    ]
  }
};
