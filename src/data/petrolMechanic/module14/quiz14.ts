import type { Quiz } from '@/types/course';

export const quiz14: Quiz = {
  id: 14,
  title: 'Module 14 Quiz: Emissions and Environmental Considerations',
  duration: '15 min',
  type: 'quiz',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of emissions standards?',
      options: [
        'Improve racing engine performance',
        'Limit vehicle pollutants',
        'Eliminate catalytic converters',
        'Reduce engine size'
      ],
      correctAnswer: 1,
      explanation: 'Emissions standards limit vehicle pollutants to reduce air pollution and protect public health.'
    },
    {
      id: 2,
      question: 'What pollutants are regulated by emissions standards?',
      options: [
        'Water vapor and nitrogen',
        'NOx, HC, CO, and particulate matter',
        'Helium and CO2',
        'SO2 and methane'
      ],
      correctAnswer: 1,
      explanation: 'Emissions standards regulate nitrogen oxides (NOx), hydrocarbons (HC), carbon monoxide (CO), and particulate matter (PM).'
    },
    {
      id: 3,
      question: 'Which component converts pollutants into less harmful substances?',
      options: [
        'Oxygen sensor',
        'Catalytic converter',
        'Muffler',
        'EGR valve'
      ],
      correctAnswer: 1,
      explanation: 'The catalytic converter converts pollutants like HC, CO, and NOx into less harmful substances (CO2, H2O, N2).'
    },
    {
      id: 4,
      question: 'What is a symptom of a clogged catalytic converter?',
      options: [
        'Increased power',
        'Improved economy',
        'Reduced acceleration',
        'Lower emissions'
      ],
      correctAnswer: 2,
      explanation: 'A clogged catalytic converter restricts exhaust flow, causing reduced acceleration and power loss.'
    },
    {
      id: 5,
      question: 'How does an oxygen sensor reduce emissions?',
      options: [
        'Increases exhaust flow',
        'Adjusts air-fuel mixture',
        'Removes exhaust particles',
        'Cools exhaust gases'
      ],
      correctAnswer: 1,
      explanation: 'Oxygen sensors monitor exhaust oxygen and adjust the air-fuel mixture to maintain optimal combustion and reduce emissions.'
    },
    {
      id: 6,
      question: 'What might a P0420 code indicate?',
      options: [
        'Low coolant temperature',
        'Catalytic converter efficiency issue',
        'Alternator problem',
        'Cylinder 1 misfire'
      ],
      correctAnswer: 1,
      explanation: 'A P0420 code indicates a catalytic converter efficiency issue, often due to clogging or damage.'
    },
    {
      id: 7,
      question: 'What is a consequence of a faulty oxygen sensor?',
      options: [
        'Perfect economy',
        'Reduced emissions efficiency and higher fuel use',
        'Decreased oil pressure',
        'Improved high-RPM performance'
      ],
      correctAnswer: 1,
      explanation: 'A faulty oxygen sensor causes incorrect air-fuel mixture, reducing emissions efficiency and increasing fuel consumption.'
    },
    {
      id: 8,
      question: 'Which tool retrieves emissions-related trouble codes?',
      options: [
        'Compression tester',
        'Timing light',
        'OBD-II scanner',
        'Vacuum gauge'
      ],
      correctAnswer: 2,
      explanation: 'An OBD-II scanner retrieves diagnostic trouble codes (DTCs) related to emissions and other systems.'
    },
    {
      id: 9,
      question: 'What South African condition affects emissions compliance?',
      options: [
        'Low humidity',
        'Inconsistent rural fuel quality',
        'Cold temperatures',
        'High oxygen levels'
      ],
      correctAnswer: 1,
      explanation: 'Inconsistent rural fuel quality in South Africa can increase emissions and affect compliance with standards.'
    },
    {
      id: 10,
      question: 'What test indicates a clogged catalytic converter?',
      options: [
        'Voltage test',
        'Backpressure test',
        'Compression test',
        'Timing test'
      ],
      correctAnswer: 1,
      explanation: 'A backpressure test measures exhaust restriction; high backpressure (&gt;20 kPa) indicates a clogged converter.'
    },
    {
      id: 11,
      question: 'What maintenance step ensures emissions compliance?',
      options: [
        'Ignore check engine lights',
        'Use high-quality parts and fluids',
        'Remove catalytic converter',
        'Use low-octane fuel'
      ],
      correctAnswer: 1,
      explanation: 'Using high-quality parts and fluids ensures proper combustion and emissions control, maintaining compliance.'
    },
    {
      id: 12,
      question: 'What indicates a failing oxygen sensor in live data?',
      options: [
        'Rapid 0.1–0.9V oscillation',
        'Flatlined voltage readings',
        'High boost pressure',
        'Low coolant temperature'
      ],
      correctAnswer: 1,
      explanation: 'Flatlined voltage readings (e.g., constant 0.4V) indicate a failing oxygen sensor that is not responding to exhaust changes.'
    }
  ]
};
