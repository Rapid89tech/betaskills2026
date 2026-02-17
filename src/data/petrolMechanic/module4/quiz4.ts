import type { Lesson } from '@/types/course';

export const quiz4: Lesson = {
  id: 5,
  title: '📝 Module 4 Quiz: Engine Maintenance and Routine Services',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What are the three main functions of engine oil in a petrol engine?',
        options: [
          'Cleaning, inflating tires, and cooling',
          'Lubrication, heat transfer, contaminant suspension',
          'Lubrication, engine mounting, and tire traction',
          'Fuel combustion, starting, and oil filtering'
        ],
        correct: 1,
        explanation: 'Engine oil serves three critical functions: lubricating moving parts to reduce friction, transferring heat to cool engine components, and suspending contaminants to prevent sludge buildup.'
      },
      {
        question: 'How can you tell if engine oil is contaminated or needs changing during a dipstick check?',
        options: [
          'It\'s clear and thin',
          'It appears dark, gritty, or milky',
          'It\'s foamy and green',
          'It smells like petrol'
        ],
        correct: 1,
        explanation: 'Dark, gritty oil indicates contamination with carbon deposits, while milky oil suggests coolant contamination, possibly from a blown head gasket. Both conditions require immediate attention.'
      },
      {
        question: 'What could metal shavings in engine oil indicate?',
        options: [
          'Low oil pressure',
          'Contaminated air filter',
          'Internal engine damage',
          'Worn brake pads'
        ],
        correct: 2,
        explanation: 'Metal shavings in engine oil indicate internal engine damage, such as worn bearings, damaged pistons, or cylinder scoring, requiring immediate investigation and repair.'
      },
      {
        question: 'At what intervals should engine oil typically be changed?',
        options: [
          'Every 20,000 km',
          'Every 5,000 km',
          'Every 8,000–12,000 km',
          'Once per year only'
        ],
        correct: 2,
        explanation: 'Engine oil should typically be changed every 8,000–12,000 kilometres or according to manufacturer guidelines to maintain optimal lubrication and prevent engine wear.'
      },
      {
        question: 'Why is it important to lubricate the gasket of a new oil filter before installation?',
        options: [
          'To improve fuel economy',
          'To prevent over-tightening',
          'To ensure a tight seal and prevent leaks',
          'To keep it from melting'
        ],
        correct: 2,
        explanation: 'Lubricating the oil filter gasket with fresh oil ensures a proper seal when installed, preventing oil leaks and ensuring the filter functions correctly.'
      },
      {
        question: 'What happens when an air filter is clogged?',
        options: [
          'Reduced engine power',
          'Increased fuel consumption',
          'Possible check engine light',
          'All of the above'
        ],
        correct: 3,
        explanation: 'A clogged air filter restricts airflow to the engine, causing reduced power, increased fuel consumption (10-15% drop), and potentially triggering a check engine light due to improper air-fuel ratios.'
      },
      {
        question: 'How can you check if an air filter needs replacing?',
        options: [
          'Shake it to see if dust falls out',
          'Smell it',
          'Hold it up to the light and check for blockages',
          'Pour water on it'
        ],
        correct: 2,
        explanation: 'Holding an air filter up to light is an effective way to check for clogs. If light cannot pass through, the filter is blocked and needs replacement.'
      },
      {
        question: 'Which type of air filter is best suited for dusty off-road environments?',
        options: [
          'Paper filter',
          'Foam filter',
          'Cotton gauze filter',
          'None of the above'
        ],
        correct: 1,
        explanation: 'Foam filters provide enhanced dust filtration and are specifically designed for off-road vehicles operating in dusty environments, offering superior protection against contaminants.'
      },
      {
        question: 'What is the function of a spark plug?',
        options: [
          'Filter air',
          'Measure engine temperature',
          'Ignite the air-fuel mixture',
          'Pump fuel'
        ],
        correct: 2,
        explanation: 'Spark plugs ignite the compressed air-fuel mixture in the combustion chamber, creating the explosion that drives the piston and powers the engine.'
      },
      {
        question: 'What condition on a spark plug indicates oil contamination?',
        options: [
          'Sooty black deposits',
          'White chalky tips',
          'Blistered insulator',
          'Oily deposits on the electrode'
        ],
        correct: 3,
        explanation: 'Oily deposits on spark plug electrodes indicate oil is entering the combustion chamber, possibly due to worn valve seals, piston rings, or other internal engine issues.'
      },
      {
        question: 'How often should spark plugs be replaced, depending on type?',
        options: [
          'Every 10,000 km',
          'Every 30,000–40,000 km',
          'Every 50,000–160,000 km',
          'Only when misfires occur'
        ],
        correct: 2,
        explanation: 'Spark plug replacement intervals vary by type: copper plugs (50,000 km), platinum plugs (80,000-100,000 km), and iridium plugs (up to 160,000 km).'
      },
      {
        question: 'Why should the radiator cap only be opened when the engine is cool?',
        options: [
          'To prevent water loss',
          'To avoid breaking the cap',
          'To prevent burns from hot steam or coolant',
          'To keep coolant flowing'
        ],
        correct: 2,
        explanation: 'Opening a hot radiator cap releases pressurized steam and hot coolant that can cause severe burns. Always wait for the engine to cool before opening the cooling system.'
      }
    ]
  }
};
