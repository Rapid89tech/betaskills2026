import type { Quiz } from '@/types/course';

export const quiz12: Quiz = {
  id: 12,
  title: 'Module 12 Quiz: Tuning and Performance Optimization',
  duration: '15 min',
  type: 'quiz',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of setting ignition timing correctly?',
      options: [
        'Reduce oil consumption',
        'Ensure efficient combustion and optimal performance',
        'Adjust idle speed',
        'Improve coolant circulation'
      ],
      correctAnswer: 1,
      explanation: 'Correct ignition timing ensures efficient combustion and optimal performance by aligning peak cylinder pressure with the power stroke.'
    },
    {
      id: 2,
      question: 'What tool is used to measure and adjust ignition timing?',
      options: [
        'Compression tester',
        'Feeler gauge',
        'Timing light',
        'Multimeter'
      ],
      correctAnswer: 2,
      explanation: 'A timing light is used to visualize crankshaft marks and adjust ignition timing accurately.'
    },
    {
      id: 3,
      question: 'What component is adjusted in a distributor-based system for timing?',
      options: [
        'Carburetor float level',
        'Distributor housing',
        'Throttle cable',
        'Cylinder head bolts'
      ],
      correctAnswer: 1,
      explanation: 'The distributor housing is rotated to adjust ignition timing in distributor-based systems.'
    },
    {
      id: 4,
      question: 'What indicates a carburetor running too rich?',
      options: [
        'Backfiring during deceleration',
        'Hesitation when accelerating',
        'Black smoke from exhaust',
        'Ticking from valvetrain'
      ],
      correctAnswer: 2,
      explanation: 'Black smoke from the exhaust indicates a rich mixture (too much fuel) in the carburetor.'
    },
    {
      id: 5,
      question: 'How do you verify correct fuel injector delivery?',
      options: [
        'Check oil level',
        'Use timing light',
        'Inspect spray pattern',
        'Measure valve clearance'
      ],
      correctAnswer: 2,
      explanation: 'Inspecting the spray pattern ensures fuel injectors are delivering fuel correctly as a fine mist.'
    },
    {
      id: 6,
      question: 'What is the purpose of a feeler gauge in valve adjustments?',
      options: [
        'Measure air-fuel mixture',
        'Set ignition timing',
        'Determine valve stem-rocker arm gap',
        'Measure compression ratio'
      ],
      correctAnswer: 2,
      explanation: 'A feeler gauge measures the gap between the valve stem and rocker arm to ensure proper valve clearance.'
    },
    {
      id: 7,
      question: 'What happens if valve clearances are too tight?',
      options: [
        'Excessive valvetrain noise',
        'Loss of compression and valve damage',
        'Increased oil pressure',
        'Rich fuel mixture'
      ],
      correctAnswer: 1,
      explanation: 'Too tight valve clearances prevent valves from closing fully, causing compression loss and valve damage.'
    },
    {
      id: 8,
      question: 'Why is proper valve clearance important?',
      options: [
        'Improves fuel economy by leaning mixture',
        'Ensures valves open/close correctly',
        'Increases maximum RPM',
        'Shortens spark plug intervals'
      ],
      correctAnswer: 1,
      explanation: 'Proper valve clearance ensures valves open and close correctly for optimal compression and power.'
    },
    {
      id: 9,
      question: 'What indicates too advanced ignition timing?',
      options: [
        'Smooth idle',
        'Engine knocking or pinging',
        'High fuel economy',
        'Clear exhaust'
      ],
      correctAnswer: 1,
      explanation: 'Engine knocking or pinging indicates too advanced ignition timing, causing pre-ignition.'
    },
    {
      id: 10,
      question: 'What tool is optional for fine-tuning carburetors?',
      options: [
        'Multimeter',
        'Vacuum gauge',
        'Feeler gauge',
        'Timing light'
      ],
      correctAnswer: 1,
      explanation: 'A vacuum gauge helps fine-tune carburetors by measuring manifold vacuum for optimal idle mixture.'
    },
    {
      id: 11,
      question: 'What South African condition affects carburetor tuning?',
      options: [
        'Low humidity',
        'Dusty environments clogging jets',
        'Cold temperatures',
        'High fuel quality'
      ],
      correctAnswer: 1,
      explanation: 'Dusty environments in South Africa clog carburetor jets, requiring more frequent cleaning and adjustment.'
    },
    {
      id: 12,
      question: 'What should be done before adjusting ignition timing?',
      options: [
        'Cool the engine completely',
        'Warm the engine to operating temperature',
        'Replace the fuel filter',
        'Adjust valve clearances'
      ],
      correctAnswer: 1,
      explanation: 'The engine should be warmed to operating temperature (80–90°C) before adjusting ignition timing for accurate results.'
    }
  ]
};
