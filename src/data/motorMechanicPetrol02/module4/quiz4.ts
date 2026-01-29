import { QuizLesson } from '@/types/course';

const quiz4: QuizLesson = {
  id: 5,
  title: 'Quiz: Engine Maintenance and Routine Services',
  type: 'quiz',
  duration: '15 minutes',
  content: {
    questions: [
      {
        id: 1,
        question: 'What are the three main functions of engine oil in a petrol engine?',
        options: [
          'Cleaning, inflating tires, and cooling',
          'Lubrication, heat transfer, contaminant suspension',
          'Lubrication, engine mounting, and tire traction',
          'Fuel combustion, starting, and oil filtering'
        ],
        correctAnswer: 1,
        explanation: 'Engine oil serves three primary functions: lubrication of moving parts, heat transfer to cool critical engine areas, and suspension of contaminants like metal particles and carbon deposits to prevent sludge buildup.'
      },
      {
        id: 2,
        question: 'How can you tell if engine oil is contaminated or needs changing during a dipstick check?',
        options: [
          'It\'s clear and thin',
          'It appears dark, gritty, or milky',
          'It\'s foamy and green',
          'It smells like petrol'
        ],
        correctAnswer: 1,
        explanation: 'Contaminated oil appears dark, gritty, or milky. Clean, amber oil indicates good condition, while dark oil suggests contamination or overdue changes. Milky oil often indicates coolant leaks.'
      },
      {
        id: 3,
        question: 'What could metal shavings in engine oil indicate?',
        options: [
          'Low oil pressure',
          'Contaminated air filter',
          'Internal engine damage',
          'Worn brake pads'
        ],
        correctAnswer: 2,
        explanation: 'Metal shavings in engine oil indicate internal engine damage, such as worn bearings, scored cylinders, or other mechanical failures that require immediate attention.'
      },
      {
        id: 4,
        question: 'At what intervals should engine oil typically be changed?',
        options: [
          'Every 20,000 km',
          'Every 5,000 km',
          'Every 8,000–12,000 km',
          'Once per year only'
        ],
        correctAnswer: 2,
        explanation: 'Engine oil should typically be changed every 8,000–12,000 kilometres or according to manufacturer guidelines, whichever comes first.'
      },
      {
        id: 5,
        question: 'Why is it important to lubricate the gasket of a new oil filter before installation?',
        options: [
          'To improve fuel economy',
          'To prevent over-tightening',
          'To ensure a tight seal and prevent leaks',
          'To keep it from melting'
        ],
        correctAnswer: 2,
        explanation: 'Lubricating the oil filter gasket with fresh oil ensures a tight seal and prevents leaks, which is crucial for maintaining proper oil pressure and preventing engine damage.'
      },
      {
        id: 6,
        question: 'What happens when an air filter is clogged?',
        options: [
          'Reduced engine power',
          'Increased fuel consumption',
          'Possible check engine light',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'A clogged air filter causes reduced engine power, increased fuel consumption, and may trigger a check engine light due to improper air-fuel ratios.'
      },
      {
        id: 7,
        question: 'How can you check if an air filter needs replacing?',
        options: [
          'Shake it to see if dust falls out',
          'Smell it',
          'Hold it up to the light and check for blockages',
          'Pour water on it'
        ],
        correctAnswer: 2,
        explanation: 'To check if an air filter needs replacing, hold it up to the light. If light is blocked, replacement is needed. This is the most reliable method for assessing filter condition.'
      },
      {
        id: 8,
        question: 'Which type of air filter is best suited for dusty off-road environments?',
        options: [
          'Paper filter',
          'Foam filter',
          'Cotton gauze filter',
          'None of the above'
        ],
        correctAnswer: 1,
        explanation: 'Foam filters are best suited for dusty off-road environments as they provide enhanced dust filtration and are designed to handle harsh conditions.'
      },
      {
        id: 9,
        question: 'What is the function of a spark plug?',
        options: [
          'Filter air',
          'Measure engine temperature',
          'Ignite the air-fuel mixture',
          'Pump fuel'
        ],
        correctAnswer: 2,
        explanation: 'Spark plugs ignite the air-fuel mixture in petrol engines, producing the combustion that drives the piston and powers the vehicle.'
      },
      {
        id: 10,
        question: 'What condition on a spark plug indicates oil contamination?',
        options: [
          'Sooty black deposits',
          'White chalky tips',
          'Blistered insulator',
          'Oily deposits on the electrode'
        ],
        correctAnswer: 3,
        explanation: 'Oily deposits on the spark plug electrode indicate oil contamination, which suggests oil leaks into the combustion chamber, possibly from worn valve seals or piston rings.'
      },
      {
        id: 11,
        question: 'How often should spark plugs be replaced, depending on type?',
        options: [
          'Every 10,000 km',
          'Every 30,000–40,000 km',
          'Every 50,000–160,000 km',
          'Only when misfires occur'
        ],
        correctAnswer: 2,
        explanation: 'Spark plugs should be replaced every 50,000–160,000 kilometres depending on the type: copper plugs (30,000–50,000 km), platinum and iridium plugs (80,000–160,000 km).'
      },
      {
        id: 12,
        question: 'Why should the radiator cap only be opened when the engine is cool?',
        options: [
          'To prevent water loss',
          'To avoid breaking the cap',
          'To prevent burns from hot steam or coolant',
          'To keep coolant flowing'
        ],
        correctAnswer: 2,
        explanation: 'The radiator cap should only be opened when the engine is cool to prevent burns from hot steam or coolant, as the cooling system operates under pressure and can cause serious injuries if opened while hot.'
      }
    ]
  }
};

export default quiz4;
