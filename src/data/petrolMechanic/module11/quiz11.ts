import type { Quiz } from '@/types/course';

export const quiz11: Quiz = {
  id: 11,
  title: 'Module 11 Quiz: Lubrication System Repairs',
  duration: '15 min',
  type: 'quiz',
  questions: [
    {
      id: 1,
      question: 'What is a common symptom of low oil pressure?',
      options: [
        'Smooth and quiet engine',
        'Engine knocking or ticking noises',
        'Lower engine temperature',
        'Increased fuel efficiency'
      ],
      correctAnswer: 1,
      explanation: 'Engine knocking or ticking noises indicate low oil pressure, as components are not properly lubricated.'
    },
    {
      id: 2,
      question: 'What is the primary role of the oil pump?',
      options: [
        'Keep oil at constant temperature',
        'Circulate pressurized oil through the engine',
        'Increase oil viscosity',
        'Clean debris from oil'
      ],
      correctAnswer: 1,
      explanation: 'The oil pump circulates pressurized oil through the engine to lubricate and cool components.'
    },
    {
      id: 3,
      question: 'What should you check first for low oil pressure?',
      options: [
        'Coolant color',
        'Oil condition and level',
        'Ignition timing',
        'Alternator voltage'
      ],
      correctAnswer: 1,
      explanation: 'Always check oil condition and level first, as low or contaminated oil is a common cause of low pressure.'
    },
    {
      id: 4,
      question: 'What step is required when replacing an oil pump?',
      options: [
        'Remove timing chain',
        'Drain engine oil',
        'Remove cylinder head',
        'Disconnect alternator'
      ],
      correctAnswer: 1,
      explanation: 'Draining engine oil is required before replacing an oil pump to prevent spills and allow access to the oil pan.'
    },
    {
      id: 5,
      question: 'What can cause clogged oil passages?',
      options: [
        'High-quality synthetic oil',
        'Neglecting oil changes',
        'Regular filter replacement',
        'Adding fresh oil daily'
      ],
      correctAnswer: 1,
      explanation: 'Neglecting oil changes causes sludge buildup that clogs oil passages, reducing flow and pressure.'
    },
    {
      id: 6,
      question: 'What is a method to clean clogged oil passages?',
      options: [
        'Use a multimeter for continuity',
        'Replace coolant thermostat',
        'Run engine flush product',
        'Check valve clearance'
      ],
      correctAnswer: 2,
      explanation: 'Running an engine flush product helps dissolve and remove sludge from clogged oil passages.'
    },
    {
      id: 7,
      question: 'Why replace the oil filter for low oil pressure?',
      options: [
        'Clogged filter restricts flow',
        'Filter increases oil viscosity',
        'Filter prevents coolant mixing',
        'Filter ensures fuel injection timing'
      ],
      correctAnswer: 0,
      explanation: 'A clogged filter restricts oil flow, causing low pressure and poor lubrication.'
    },
    {
      id: 8,
      question: 'What to do after replacing the oil pump and refilling oil?',
      options: [
        'High-speed test drive',
        'Monitor oil pressure gauge',
        'Overfill oil pan',
        'Reset pressure sensor'
      ],
      correctAnswer: 1,
      explanation: 'Monitor the oil pressure gauge to verify the pump is working correctly and pressure is within specifications.'
    },
    {
      id: 9,
      question: 'What indicates high oil pressure?',
      options: [
        'Smooth engine operation',
        'Oil leaks or foamy oil',
        'Low engine temperature',
        'Clear exhaust smoke'
      ],
      correctAnswer: 1,
      explanation: 'High oil pressure can cause oil leaks or foamy oil due to excessive pressure on seals and gaskets.'
    },
    {
      id: 10,
      question: 'What tool verifies actual oil pressure?',
      options: [
        'Infrared thermometer',
        'Mechanical oil pressure gauge',
        'Spark plug socket',
        'Wire stripper'
      ],
      correctAnswer: 1,
      explanation: 'A mechanical oil pressure gauge provides accurate readings of actual oil pressure in the system.'
    },
    {
      id: 11,
      question: 'What causes oil passage clogs in South Africa?',
      options: [
        'Frequent oil changes',
        'Coastal humidity and neglected maintenance',
        'High-quality filters',
        'Low engine temperatures'
      ],
      correctAnswer: 1,
      explanation: 'Coastal humidity and neglected maintenance accelerate corrosion and sludge buildup, clogging oil passages.'
    },
    {
      id: 12,
      question: 'What preventative measure avoids clogged passages?',
      options: [
        'Use low-quality oil',
        'Regular oil changes with high-quality oil',
        'Overfill oil pan',
        'Ignore warning lights'
      ],
      correctAnswer: 1,
      explanation: 'Regular oil changes with high-quality oil prevent sludge buildup and maintain clean oil passages.'
    }
  ]
};
