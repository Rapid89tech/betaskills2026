import { Quiz } from '../../../types/course';

export const quiz1: Quiz = {
  id: 'module-1-quiz',
  title: 'Module 1: Introduction to Petrol Engines - Quiz',
  description: 'Test your understanding of petrol engine fundamentals, four-stroke cycle, engine components, and fuel systems.',
  timeLimit: 30,
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What are the four strokes of a four-stroke petrol engine cycle, in the correct order?',
      options: [
        'Intake, Compression, Power, Exhaust',
        'Compression, Exhaust, Power, Intake',
        'Power, Exhaust, Intake, Compression',
        'Intake, Power, Compression, Exhaust'
      ],
      correctAnswer: 0,
      explanation: 'The correct order is Intake (suck), Compression (squash), Power (bang), and Exhaust (blow). This sequence ensures proper fuel delivery, compression, combustion, and waste removal.'
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'Which component of a petrol engine converts the up-and-down motion of the pistons into rotational motion?',
      options: [
        'Camshaft',
        'Crankshaft',
        'Cylinder block',
        'Valve'
      ],
      correctAnswer: 1,
      explanation: 'The crankshaft converts the linear (up-and-down) motion of the pistons into rotational motion that can be transferred to the wheels through the transmission.'
    },
    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What is the primary function of the spark plug in a petrol engine?',
      options: [
        'To control the flow of air into the engine',
        'To ignite the air-fuel mixture in the cylinder',
        'To regulate the timing of the valves',
        'To reduce engine temperature during combustion'
      ],
      correctAnswer: 1,
      explanation: 'The spark plug creates an electrical spark at precisely the right moment to ignite the compressed air-fuel mixture in the combustion chamber.'
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'Which component is responsible for opening and closing the intake and exhaust valves at the correct times?',
      options: [
        'Pistons',
        'Crankshaft',
        'Camshaft',
        'Cylinder head'
      ],
      correctAnswer: 2,
      explanation: 'The camshaft, synchronized with the crankshaft through a timing belt or chain, controls the precise opening and closing of intake and exhaust valves.'
    },
    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'How do petrol engines differ from diesel engines in their ignition process?',
      options: [
        'Petrol engines use high compression to ignite the fuel, while diesel engines rely on a spark plug',
        'Petrol engines rely on a spark plug to ignite the air-fuel mixture, while diesel engines rely on high compression to ignite the fuel',
        'Petrol engines mix air and fuel outside the cylinder, while diesel engines mix them inside',
        'Petrol engines do not require ignition timing, whereas diesel engines do'
      ],
      correctAnswer: 1,
      explanation: 'Petrol engines use spark ignition (spark plugs) while diesel engines use compression ignition (high compression creates enough heat to auto-ignite the fuel).'
    },
    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What is the typical compression ratio range for a petrol engine?',
      options: [
        '6:1 to 8:1',
        '8:1 to 12:1',
        '12:1 to 16:1',
        '14:1 to 20:1'
      ],
      correctAnswer: 1,
      explanation: 'Petrol engines typically have compression ratios between 8:1 and 12:1. This is lower than diesel engines to prevent knocking with spark ignition.'
    },
    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'What is the primary function of the cylinder block in a petrol engine?',
      options: [
        'To house the pistons and allow them to move up and down',
        'To direct the air-fuel mixture into the engine',
        'To ignite the fuel at the right moment',
        'To convert rotational motion into linear motion'
      ],
      correctAnswer: 0,
      explanation: 'The cylinder block is the main structural component that houses the cylinders where pistons move up and down, and provides mounting points for other engine components.'
    },
    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'Which of the following is a major advantage of petrol engines over diesel engines?',
      options: [
        'Higher torque at low RPMs',
        'Better fuel efficiency',
        'Quicker throttle response and higher RPM capabilities',
        'Lower compression ratios leading to longer engine life'
      ],
      correctAnswer: 2,
      explanation: 'Petrol engines typically offer quicker throttle response and can operate at higher RPMs, making them better suited for applications requiring rapid acceleration and high-speed operation.'
    },
    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'What is the ideal air-fuel ratio for a petrol engine?',
      options: [
        '10:1',
        '12.5:1',
        '14.7:1',
        '16:1'
      ],
      correctAnswer: 2,
      explanation: 'The stoichiometric (ideal) air-fuel ratio for petrol engines is 14.7:1, which provides complete combustion with minimal emissions and optimal efficiency.'
    },
    {
      id: 'q10',
      type: 'true-false',
      question: 'Petrol engines have a lower compression ratio than diesel engines to prevent knocking.',
      correctAnswer: true,
      explanation: 'True. Petrol engines use lower compression ratios (8:1 to 12:1) compared to diesel engines (14:1 to 20:1) to prevent knock and allow for spark ignition timing control.'
    }
  ]
};