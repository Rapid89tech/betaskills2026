import type { Lesson } from '@/types/course';

export const quiz4: Lesson = {
  id: 4,
  title: '📝 Module 4 Quiz: Turbochargers and Air Management',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'By what percentage do turbochargers typically increase engine power?',
        options: [
          '10-20%',
          '20-30%',
          '30-50%',
          '50-70%'
        ],
        correct: 2,
        explanation: 'Turbochargers typically increase engine power by 30-50% through forced induction, adding 100-200 hp and 200-400 lb-ft of torque to diesel engines.'
      },
      {
        question: 'At what RPM range does a turbocharger turbine typically spin?',
        options: [
          '10,000-50,000 RPM',
          '50,000-80,000 RPM',
          '100,000-150,000 RPM',
          '200,000-250,000 RPM'
        ],
        correct: 2,
        explanation: 'Turbocharger turbines spin at extremely high speeds of 100,000-150,000 RPM, driven by exhaust gases to compress intake air.'
      },
      {
        question: 'What is the typical boost pressure range for a turbocharged diesel engine?',
        options: [
          '2-5 psi',
          '6-20 psi',
          '25-35 psi',
          '40-50 psi'
        ],
        correct: 1,
        explanation: 'Turbocharged diesel engines typically operate at boost pressures of 6-20 psi, increasing air density for enhanced combustion and power output.'
      },
      {
        question: 'What is the primary symptom of excessive oil consumption in a turbocharger?',
        options: [
          'White smoke from exhaust',
          'Blue smoke from exhaust',
          'Black smoke from exhaust',
          'No visible smoke'
        ],
        correct: 1,
        explanation: 'Blue smoke from the exhaust indicates oil burning, which is a primary symptom of turbocharger seal failure causing excessive oil consumption.'
      },
      {
        question: 'What component regulates boost pressure to prevent over-boost conditions?',
        options: [
          'Intercooler',
          'Compressor wheel',
          'Wastegate',
          'Turbine housing'
        ],
        correct: 2,
        explanation: 'The wastegate regulates exhaust flow to the turbine, preventing over-boost conditions by diverting excess exhaust gases when boost pressure reaches the target level.'
      },
      {
        question: 'How often should paper air filters be replaced in normal driving conditions?',
        options: [
          'Every 6,000 miles',
          'Every 12,000-15,000 miles',
          'Every 25,000 miles',
          'Every 50,000 miles'
        ],
        correct: 1,
        explanation: 'Paper air filters should be replaced every 12,000-15,000 miles in normal conditions, or more frequently (every 6,000 miles) in dusty environments.'
      },
      {
        question: 'What is the primary function of an intercooler in a turbocharged system?',
        options: [
          'Increase boost pressure',
          'Cool compressed air to increase density',
          'Filter intake air',
          'Regulate wastegate operation'
        ],
        correct: 1,
        explanation: 'The intercooler cools compressed air from the turbocharger, reducing temperature by up to 100°F to increase air density for more efficient combustion.'
      },
      {
        question: 'What noise typically indicates worn turbocharger bearings?',
        options: [
          'Hissing sound',
          'Clicking sound',
          'Whining or grinding sound',
          'Knocking sound'
        ],
        correct: 2,
        explanation: 'Whining or grinding noises during operation indicate worn turbocharger bearings or impeller contact with the housing, requiring immediate attention.'
      },
      {
        question: 'What type of air filter is reusable and commonly used in performance applications?',
        options: [
          'Paper filter',
          'Foam filter',
          'Cotton gauze filter',
          'All of the above'
        ],
        correct: 2,
        explanation: 'Cotton gauze filters are reusable, high-flow filters popular in performance applications, offering increased airflow and long service life with proper cleaning and re-oiling.'
      },
      {
        question: 'What is turbo lag?',
        options: [
          'Permanent loss of turbo power',
          'Delay between accelerator input and boost response',
          'Turbocharger overheating',
          'Oil leak from turbo seals'
        ],
        correct: 1,
        explanation: 'Turbo lag is the noticeable delay between pressing the accelerator and feeling the turbo boost, caused by the time needed for exhaust gases to spin the turbine to effective speeds.'
      }
    ]
  }
};
