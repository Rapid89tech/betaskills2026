import { QuizLesson } from '@/types/course';

const quiz2: QuizLesson = {
  id: 3,
  title: 'Quiz: Petrol Fuel Systems Overview',
  type: 'quiz',
  duration: '15 minutes',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary function of a carburetor in a petrol engine?',
        options: [
          'To generate a spark for combustion',
          'To mix air and fuel before it enters the engine\'s intake manifold',
          'To control the timing of the engine\'s valves',
          'To measure exhaust gas temperature'
        ],
        correctAnswer: 1,
        explanation: 'Carburetors mechanically mix air and fuel before delivery to the engine\'s intake manifold, using a vacuum created by piston movement to draw fuel from a reservoir.'
      },
      {
        id: 2,
        question: 'What key advantage does a fuel injection system have over a carburetor?',
        options: [
          'Lower manufacturing costs',
          'Simplified maintenance requirements',
          'More precise fuel delivery and improved combustion efficiency',
          'Less reliance on electronic sensors'
        ],
        correctAnswer: 2,
        explanation: 'Fuel injection systems deliver precise fuel amounts, improving combustion efficiency, fuel economy, and throttle response through electronic control.'
      },
      {
        id: 3,
        question: 'What happens if the air-fuel mixture in a petrol engine is too rich?',
        options: [
          'The engine may overheat and knock',
          'Combustion becomes more efficient, improving fuel economy',
          'The engine produces black exhaust smoke and wastes fuel',
          'Engine temperature drops, causing stalling'
        ],
        correctAnswer: 2,
        explanation: 'A rich mixture contains excess fuel, leading to incomplete combustion, black exhaust smoke, and wasted fuel.'
      },
      {
        id: 4,
        question: 'What is the ideal air-fuel ratio for a petrol engine?',
        options: [
          '10:1',
          '12.5:1',
          '14.7:1',
          '16:1'
        ],
        correctAnswer: 2,
        explanation: 'The stoichiometric ratio of 14.7:1 (14.7 parts air to 1 part fuel by weight) ensures complete combustion and optimal performance.'
      },
      {
        id: 5,
        question: 'In a fuel-injected engine, what controls the air-fuel mixture?',
        options: [
          'The carburetor\'s jets and needles',
          'A manual adjustment by the operator',
          'The engine control unit (ECU) and various sensors',
          'The fuel pump\'s pressure regulator'
        ],
        correctAnswer: 2,
        explanation: 'The ECU uses data from sensors like oxygen sensors and mass airflow sensors to control the air-fuel mixture in real-time.'
      },
      {
        id: 6,
        question: 'How can a lean air-fuel mixture affect a petrol engine?',
        options: [
          'It increases carbon buildup on spark plugs',
          'It reduces power and may cause engine knocking',
          'It results in excessive fuel consumption',
          'It lowers engine temperature, improving performance'
        ],
        correctAnswer: 1,
        explanation: 'A lean mixture has excess air, which can cause engine knocking, higher combustion temperatures, and reduced power.'
      },
      {
        id: 7,
        question: 'Which of the following is NOT a component of a fuel injection system?',
        options: [
          'Fuel injector',
          'Oxygen sensor',
          'Spark plug',
          'Engine control unit (ECU)'
        ],
        correctAnswer: 2,
        explanation: 'Spark plugs are part of the ignition system, not the fuel injection system. Fuel injection systems include injectors, sensors, and the ECU.'
      },
      {
        id: 8,
        question: 'Which of the following is an advantage of a carbureted engine over a fuel-injected engine?',
        options: [
          'More precise control of the air-fuel ratio',
          'Simpler design and easier manual maintenance',
          'Lower emissions and better fuel economy',
          'Faster response to real-time driving conditions'
        ],
        correctAnswer: 1,
        explanation: 'Carburetors are simpler in design and easier to maintain manually, making them suitable for classic cars and small engines.'
      }
    ]
  }
};

export default quiz2;
