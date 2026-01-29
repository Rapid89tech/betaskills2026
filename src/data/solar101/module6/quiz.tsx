import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 6,
  title: 'Module 6 Quiz: Maintenance and Troubleshooting',
  questions: [
    {
      id: 1,
      question: 'What is the main goal of routine inspection procedures in solar PV systems?',
      options: [
        'Increase voltage output beyond panel ratings',
        'Detect issues early to maintain performance and lifespan',
        'Reduce the number of solar panels',
        'Eliminate the need for inverter replacements'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'According to IEC 62446 and 2025 best practices, how often should full routine inspections typically be scheduled?',
      options: [
        'Once every 5 years',
        'Monthly',
        'Semi-annually (spring/fall)',
        'Every 10 days'
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: 'Which of the following tools is used for detecting hotspots during solar panel inspections?',
      options: [
        'Klein Tools Torque Wrench',
        'Megger MIT420/2 Insulation Tester',
        'Fluke Ti480 PRO Thermal Camera',
        'SolarEdge Monitoring App'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: 'What is the recommended minimum insulation resistance per string during electrical testing?',
      options: [
        '100 kΩ',
        '10 MΩ',
        '1 MΩ',
        '500 Ω'
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      question: 'Which component should be checked for swelling, electrolyte level, or leaks during inspections?',
      options: [
        'Inverter',
        'Charge controller',
        'Battery',
        'PV module junction box'
      ],
      correctAnswer: 2
    },
    {
      id: 6,
      question: 'What cleaning method is best suited for water-scarce areas and avoids the use of water?',
      options: [
        'Manual cleaning with soap and water',
        'Water-fed pole systems',
        'Dry cleaning with electrostatic brushes or air',
        'Robotic AI-guided cleaners'
      ],
      correctAnswer: 2
    },
    {
      id: 7,
      question: 'What is a common cause of inverter faults in PV systems?',
      options: [
        'Excess soap left on panels',
        'Overuse of robotic cleaners',
        'DC input voltage outside MPPT range',
        'Use of deionized water'
      ],
      correctAnswer: 2
    },
    {
      id: 8,
      question: 'Which app provides real-time inverter/panel data with fault alerts and is free with hardware?',
      options: [
        'SolarEdge Designer',
        'Tigo Energy Intelligence',
        'Enphase Enlighten',
        'Fronius Solar.web'
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      question: 'Before replacing a faulty solar panel or inverter, what is the first safety step?',
      options: [
        'Remove the bolts',
        'Clean the area with soap and water',
        'De-energize the system following lockout/tagout procedures',
        'Take a photo for social media'
      ],
      correctAnswer: 2
    },
    {
      id: 10,
      question: 'What is a key benefit of AI-powered monitoring tools in 2025?',
      options: [
        'Manual panel cleaning becomes unnecessary',
        'Reduces inverter cost by 90%',
        'Enables predictive alerts and reduces O&M costs',
        'Doubles the panel efficiency automatically'
      ],
      correctAnswer: 2
    }
  ]
};

export default quiz;

