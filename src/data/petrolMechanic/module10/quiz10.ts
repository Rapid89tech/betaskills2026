import type { Quiz } from '@/types/course';

export const quiz10: Quiz = {
  id: 10,
  title: 'Module 10 Quiz: Cooling System Overhauls',
  duration: '15 min',
  type: 'quiz',
  questions: [
    {
      id: 1,
      question: 'What is a common cause of engine overheating?',
      options: [
        'High-quality coolant',
        'Low coolant levels or leaks',
        'Properly functioning water pump',
        'Regular maintenance'
      ],
      correctAnswer: 1,
      explanation: 'Low coolant levels or leaks are common causes of engine overheating, as they prevent proper heat dissipation from the engine.'
    },
    {
      id: 2,
      question: 'What does a stuck-closed thermostat prevent?',
      options: [
        'Engine reaching operating temperature',
        'Coolant circulating through the engine',
        'Fan activation',
        'Water pump operation'
      ],
      correctAnswer: 1,
      explanation: 'A stuck-closed thermostat prevents coolant from circulating through the engine, causing overheating.'
    },
    {
      id: 3,
      question: 'What are common symptoms of a failing water pump?',
      options: [
        'Smooth coolant flow',
        'Coolant leaks near the pump and whining noises',
        'Decreased fuel economy',
        'Excessive coolant in the overflow tank'
      ],
      correctAnswer: 1,
      explanation: 'Coolant leaks near the pump and whining noises are common symptoms of a failing water pump due to bearing wear or seal failure.'
    },
    {
      id: 4,
      question: 'What indicates a clogged or blocked radiator?',
      options: [
        'Consistently low engine temperature',
        'Rapid cooling after shutdown',
        'Reduced heat transfer and uneven cooling',
        'Clear coolant with no leaks'
      ],
      correctAnswer: 2,
      explanation: 'Reduced heat transfer and uneven cooling indicate a clogged or blocked radiator, preventing proper heat dissipation.'
    },
    {
      id: 5,
      question: 'What is the purpose of flushing the cooling system?',
      options: [
        'Increase radiator pressure',
        'Remove rust, debris, and old coolant',
        'Improve gasket sealing',
        'Lower coolant boiling point'
      ],
      correctAnswer: 1,
      explanation: 'Flushing removes rust, debris, and old coolant to maintain cooling efficiency and prevent corrosion.'
    },
    {
      id: 6,
      question: 'What should you do before replacing a thermostat?',
      options: [
        'Drain some coolant from the system',
        'Replace the water pump first',
        'Check alternator voltage',
        'Add extra antifreeze'
      ],
      correctAnswer: 0,
      explanation: 'You should drain some coolant from the system before replacing a thermostat to prevent spills and allow access to the housing.'
    },
    {
      id: 7,
      question: 'How do you remove a radiator correctly?',
      options: [
        'Leave hoses connected and pull it out',
        'Disconnect hoses, transmission lines, and mounting brackets',
        'Remove the radiator cap and push it out',
        'Use a pry bar to force it out'
      ],
      correctAnswer: 1,
      explanation: 'Proper radiator removal requires disconnecting hoses, transmission lines (if applicable), and mounting brackets before extraction.'
    },
    {
      id: 8,
      question: 'Why is bleeding air from the cooling system important after component replacement?',
      options: [
        'Increase system pressure',
        'Ensure proper coolant flow and prevent hot spots',
        'Lower coolant boiling point',
        'Improve water pump efficiency'
      ],
      correctAnswer: 1,
      explanation: 'Bleeding air ensures proper coolant flow and prevents hot spots that can cause overheating and engine damage.'
    },
    {
      id: 9,
      question: 'What indicates a potential head gasket failure?',
      options: [
        'Clear coolant in the radiator',
        'White smoke from the exhaust',
        'Consistent engine temperature',
        'High fuel efficiency'
      ],
      correctAnswer: 1,
      explanation: 'White smoke from the exhaust indicates coolant burning in the combustion chamber, a sign of head gasket failure.'
    },
    {
      id: 10,
      question: 'What tool verifies thermostat operation during diagnostics?',
      options: [
        'Multimeter',
        'Infrared thermometer',
        'Wire stripper',
        'Spark plug socket'
      ],
      correctAnswer: 1,
      explanation: 'An infrared thermometer can verify thermostat operation by measuring temperature differences across the cooling system.'
    },
    {
      id: 11,
      question: 'What should be used instead of tap water during a cooling system flush?',
      options: [
        'Coolant concentrate',
        'Distilled water',
        'Brake fluid',
        'Tap water with additives'
      ],
      correctAnswer: 1,
      explanation: 'Distilled water should be used to avoid mineral deposits that can clog the cooling system.'
    },
    {
      id: 12,
      question: 'What symptom suggests a faulty radiator fan?',
      options: [
        'Overheating at high speeds',
        'Overheating at idle or low speeds',
        'Coolant boiling during highway driving',
        'Rusty coolant in the reservoir'
      ],
      correctAnswer: 1,
      explanation: 'Overheating at idle or low speeds suggests a faulty radiator fan, as airflow is reduced when the vehicle is not moving.'
    }
  ]
};
