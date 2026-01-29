import { QuizLesson } from '@/types/course';

const quiz1: QuizLesson = {
  id: 4,
  title: 'Quiz: Introduction to Petrol Engines',
  type: 'quiz',
  duration: '15 minutes',
  content: {
    questions: [
      {
        id: 1,
        question: 'What are the four strokes of a four-stroke petrol engine cycle, in the correct order?',
        options: [
          'Intake, Compression, Power, Exhaust',
          'Compression, Exhaust, Power, Intake',
          'Power, Exhaust, Intake, Compression',
          'Intake, Power, Compression, Exhaust'
        ],
        correctAnswer: 0,
        explanation: 'The four-stroke cycle follows the sequence: Intake (suck), Compression (squash), Power (bang), and Exhaust (blow). This sequence is fundamental to petrol engine operation.'
      },
      {
        id: 2,
        question: 'Which component of a petrol engine converts the up-and-down motion of the pistons into rotational motion?',
        options: [
          'Camshaft',
          'Crankshaft',
          'Cylinder block',
          'Valve'
        ],
        correctAnswer: 1,
        explanation: 'The crankshaft is responsible for converting the linear motion of the pistons into rotational motion that drives the vehicle\'s wheels.'
      },
      {
        id: 3,
        question: 'What is the primary function of the spark plug in a petrol engine?',
        options: [
          'To control the flow of air into the engine',
          'To ignite the air-fuel mixture in the cylinder',
          'To regulate the timing of the valves',
          'To reduce engine temperature during combustion'
        ],
        correctAnswer: 1,
        explanation: 'The spark plug provides the electrical spark that ignites the compressed air-fuel mixture in the cylinder during the power stroke.'
      },
      {
        id: 4,
        question: 'Which component is responsible for opening and closing the intake and exhaust valves at the correct times?',
        options: [
          'Pistons',
          'Crankshaft',
          'Camshaft',
          'Cylinder head'
        ],
        correctAnswer: 2,
        explanation: 'The camshaft controls the precise timing of valve opening and closing, ensuring proper engine operation.'
      },
      {
        id: 5,
        question: 'How do petrol engines differ from diesel engines in their ignition process?',
        options: [
          'Petrol engines use high compression to ignite the fuel, while diesel engines rely on a spark plug.',
          'Petrol engines rely on a spark plug to ignite the air-fuel mixture, while diesel engines rely on high compression to ignite the fuel.',
          'Petrol engines mix air and fuel outside the cylinder, while diesel engines mix them inside.',
          'Petrol engines do not require ignition timing, whereas diesel engines do.'
        ],
        correctAnswer: 1,
        explanation: 'Petrol engines use spark ignition (spark plug) while diesel engines use compression ignition (high compression heats the air enough to ignite the fuel).'
      },
      {
        id: 6,
        question: 'What is the typical compression ratio range for a petrol engine?',
        options: [
          '6:1 to 8:1',
          '8:1 to 12:1',
          '12:1 to 16:1',
          '14:1 to 20:1'
        ],
        correctAnswer: 1,
        explanation: 'Petrol engines typically have compression ratios between 8:1 and 12:1, which is lower than diesel engines to prevent knocking.'
      },
      {
        id: 7,
        question: 'What is the primary material function of the cylinder block in a petrol engine?',
        options: [
          'To house the pistons and allow them to move up and down.',
          'To direct the air-fuel mixture into the engine.',
          'To ignite the fuel at the right moment.',
          'To convert rotational motion into linear motion.'
        ],
        correctAnswer: 0,
        explanation: 'The cylinder block serves as the structural foundation, housing the cylinders where pistons move up and down during the engine cycle.'
      },
      {
        id: 8,
        question: 'Which of the following is a major advantage of petrol engines over diesel engines?',
        options: [
          'Higher torque at low RPMs',
          'Better fuel efficiency',
          'Quicker throttle response and higher RPM capabilities',
          'Lower compression ratios leading to longer engine life'
        ],
        correctAnswer: 2,
        explanation: 'Petrol engines offer quicker throttle response and higher RPM capabilities, making them suitable for performance applications.'
      },
      {
        id: 9,
        question: 'Which statement best describes the ignition process in a diesel engine?',
        options: [
          'A spark plug ignites the air-fuel mixture in the cylinder.',
          'Air and fuel are mixed before entering the cylinder and then compressed.',
          'Only air is compressed, and fuel is injected into the hot air where it ignites due to heat.',
          'Fuel is compressed first, then air is added and ignited by a spark.'
        ],
        correctAnswer: 2,
        explanation: 'In diesel engines, only air is compressed to high pressure and temperature, then fuel is injected into the hot air where it ignites due to the heat.'
      },
      {
        id: 10,
        question: 'Petrol engines have a lower compression ratio than diesel engines to prevent knocking.',
        options: [
          'True',
          'False'
        ],
        correctAnswer: 0,
        explanation: 'True. Petrol engines use lower compression ratios (8:1 to 12:1) compared to diesel engines (14:1 to 20:1) to prevent knocking, which can damage the engine.'
      }
    ]
  }
};

export default quiz1;
