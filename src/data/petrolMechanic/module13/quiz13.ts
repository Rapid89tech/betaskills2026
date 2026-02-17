import type { Quiz } from '@/types/course';

export const quiz13: Quiz = {
  id: 13,
  title: 'Module 13 Quiz: Improving Engine Efficiency and Performance',
  duration: '15 min',
  type: 'quiz',
  questions: [
    {
      id: 1,
      question: 'What is a primary benefit of high-quality performance parts?',
      options: [
        'Reduced need for oil changes',
        'Enhanced durability, reliability, and efficiency',
        'Decreased engine noise under load',
        'Improved economy without tuning'
      ],
      correctAnswer: 1,
      explanation: 'High-quality performance parts enhance durability, reliability, and efficiency through superior materials and tighter tolerances.'
    },
    {
      id: 2,
      question: 'Why upgrade to a performance air intake system?',
      options: [
        'Restrict airflow for torque',
        'Increase airflow, improve combustion, and enhance throttle response',
        'Reduce engine bay size',
        'Eliminate air filter need'
      ],
      correctAnswer: 1,
      explanation: 'Performance air intakes increase airflow by 15–25%, improving combustion efficiency and throttle response.'
    },
    {
      id: 3,
      question: 'How does higher-octane fuel improve performance?',
      options: [
        'Automatically cleans injectors',
        'Resists knocking in high-compression or forced-induction engines',
        'Increases horsepower in any engine',
        'Reduces running temperature'
      ],
      correctAnswer: 1,
      explanation: 'Higher-octane fuel resists knocking in high-compression or turbocharged engines, preventing pre-ignition damage.'
    },
    {
      id: 4,
      question: 'What is an advantage of fuel additives?',
      options: [
        'Replace regular maintenance',
        'Maintain clean fuel system and prevent injector clogs',
        'Permanently increase octane',
        'Eliminate fuel pressure regulation'
      ],
      correctAnswer: 1,
      explanation: 'Fuel additives clean injectors, valves, and combustion chambers, preventing clogs and maintaining efficiency.'
    },
    {
      id: 5,
      question: 'Which tool monitors air-fuel ratios?',
      options: [
        'Compression tester',
        'Infrared thermometer',
        'Wideband air-fuel ratio gauge',
        'Vacuum gauge'
      ],
      correctAnswer: 2,
      explanation: 'A wideband air-fuel ratio gauge monitors the air-fuel mixture to ensure optimal combustion (14.7:1 ideal).'
    },
    {
      id: 6,
      question: 'Why use performance data loggers?',
      options: [
        'Eliminate live monitoring',
        'Record parameters to identify issues',
        'Bypass ECU diagnostics',
        'Auto-recalibrate injectors'
      ],
      correctAnswer: 1,
      explanation: 'Performance data loggers record RPM, boost, and temperature over time to identify trends and issues.'
    },
    {
      id: 7,
      question: 'How do vacuum/boost gauges maintain efficiency?',
      options: [
        'Increase fuel flow',
        'Monitor manifold pressure and forced induction operation',
        'Improve oil circulation',
        'Adjust ignition timing'
      ],
      correctAnswer: 1,
      explanation: 'Vacuum/boost gauges monitor manifold pressure and turbo operation to ensure efficient performance.'
    },
    {
      id: 8,
      question: 'Why use diagnostics after performance upgrades?',
      options: [
        'Replace old parts',
        'Verify safe and efficient operation',
        'Increase economy automatically',
        'Disable ECU settings'
      ],
      correctAnswer: 1,
      explanation: 'Diagnostics verify that performance upgrades operate safely and efficiently without causing issues.'
    },
    {
      id: 9,
      question: 'What South African condition affects fuel quality?',
      options: [
        'Low humidity',
        'Inconsistent rural fuel stations',
        'Cold temperatures',
        'High octane availability'
      ],
      correctAnswer: 1,
      explanation: 'Inconsistent rural fuel stations in South Africa often supply lower-quality fuel, affecting performance.'
    },
    {
      id: 10,
      question: 'What performance part reduces backpressure?',
      options: [
        'Cold air intake',
        'Performance exhaust system',
        'Iridium spark plugs',
        'High-capacity radiator'
      ],
      correctAnswer: 1,
      explanation: 'Performance exhaust systems reduce backpressure by 10–20 kPa, boosting horsepower and torque.'
    },
    {
      id: 11,
      question: 'What should be done before using additives?',
      options: [
        'Overfill fuel tank',
        'Check manufacturer dosage instructions',
        'Replace fuel pump',
        'Ignore maintenance schedules'
      ],
      correctAnswer: 1,
      explanation: 'Always check manufacturer dosage instructions to avoid overuse and potential damage.'
    },
    {
      id: 12,
      question: 'What parameter should be monitored regularly?',
      options: [
        'Tire pressure',
        'Air-fuel ratio',
        'Brake fluid color',
        'Battery voltage only'
      ],
      correctAnswer: 1,
      explanation: 'Air-fuel ratio should be monitored regularly to ensure optimal combustion and emissions compliance.'
    }
  ]
};
