import type { Lesson } from '@/types/course';

export const quiz1: Lesson = {
  id: 4,
  title: '📝 Module 1 Quiz: Introduction to Petrol Engines',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which stroke in the four-stroke cycle is responsible for drawing the air-fuel mixture into the cylinder?',
        options: [
          'Compression stroke',
          'Intake stroke',
          'Power stroke',
          'Exhaust stroke'
        ],
        correct: 1,
        explanation: 'The intake stroke draws the air-fuel mixture into the cylinder as the piston moves downward, creating a vacuum.'
      },
      {
        question: 'During which stroke does the spark plug ignite the air-fuel mixture?',
        options: [
          'Intake stroke',
          'Compression stroke',
          'Power stroke',
          'Exhaust stroke'
        ],
        correct: 2,
        explanation: 'The power stroke is when the spark plug ignites the compressed air-fuel mixture, creating an explosion that forces the piston downward.'
      },
      {
        question: 'What is the primary purpose of the compression stroke?',
        options: [
          'To expel burnt gases from the cylinder',
          'To increase the temperature and pressure of the air-fuel mixture',
          'To draw fresh air into the cylinder',
          'To cool down the engine'
        ],
        correct: 1,
        explanation: 'The compression stroke increases the temperature and pressure of the air-fuel mixture, preparing it for efficient ignition.'
      },
      {
        question: 'Which component is responsible for converting the linear motion of the pistons into rotational motion?',
        options: [
          'Camshaft',
          'Cylinder head',
          'Crankshaft',
          'Connecting rod'
        ],
        correct: 2,
        explanation: 'The crankshaft converts the pistons\' linear motion into rotational energy to drive the vehicle\'s wheels.'
      },
      {
        question: 'What is the main difference between petrol and diesel engines in terms of ignition?',
        options: [
          'Diesel engines use a spark plug, while petrol engines use compression ignition',
          'Petrol engines rely on a spark plug to ignite the air-fuel mixture, while diesel engines rely on high compression to ignite the fuel',
          'Both use spark plugs but at different temperatures',
          'Petrol engines do not require ignition timing, whereas diesel engines do'
        ],
        correct: 1,
        explanation: 'Petrol engines use spark plugs for ignition, while diesel engines use high compression to ignite fuel injected into hot, compressed air.'
      },
      {
        question: 'What is the typical compression ratio range for a petrol engine?',
        options: [
          '6:1 to 8:1',
          '8:1 to 12:1',
          '12:1 to 16:1',
          '14:1 to 20:1'
        ],
        correct: 1,
        explanation: 'Petrol engines typically have compression ratios between 8:1 and 12:1, which is lower than diesel engines to prevent knocking.'
      },
      {
        question: 'What is the primary material function of the cylinder block in a petrol engine?',
        options: [
          'To house the pistons and allow them to move up and down',
          'To direct the air-fuel mixture into the engine',
          'To ignite the fuel at the right moment',
          'To convert rotational motion into linear motion'
        ],
        correct: 0,
        explanation: 'The cylinder block houses the cylinders where pistons move and provides the structural foundation for the engine.'
      },
      {
        question: 'Which of the following is a major advantage of petrol engines over diesel engines?',
        options: [
          'Higher torque at low RPMs',
          'Better fuel efficiency',
          'Quicker throttle response and higher RPM capabilities',
          'Lower compression ratios leading to longer engine life'
        ],
        correct: 2,
        explanation: 'Petrol engines offer quicker throttle response and can achieve higher RPMs, making them ideal for performance applications.'
      },
      {
        question: 'Which statement best describes the ignition process in a diesel engine?',
        options: [
          'A spark plug ignites the air-fuel mixture in the cylinder',
          'Air and fuel are mixed before entering the cylinder and then compressed',
          'Only air is compressed, and fuel is injected into the hot air where it ignites due to heat',
          'Fuel is compressed first, then air is added and ignited by a spark'
        ],
        correct: 2,
        explanation: 'Diesel engines compress only air to high temperatures, then inject fuel which ignites spontaneously due to the heat.'
      },
      {
        question: 'Petrol engines have a lower compression ratio than diesel engines to prevent knocking.',
        options: [
          'True',
          'False'
        ],
        correct: 0,
        explanation: 'True. Petrol engines use lower compression ratios (8:1 to 12:1) compared to diesel engines (14:1 to 20:1) to prevent knocking and pre-ignition.'
      }
    ]
  }
};
