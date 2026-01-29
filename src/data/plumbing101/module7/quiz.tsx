import type { Quiz } from '@/types/course';

export const module7Quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Drainage, Waste, and Vent (DWV) Systems',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary role of a trap in a DWV system?',
        options: [
          'To increase water pressure',
          'To prevent sewer gases from entering the building',
          'To connect the vent stack to the drainpipe',
          'To improve water flow through pipes'
        ],
        correct: 1,
        explanation: 'The primary role of a trap is to prevent sewer gases from entering the building by maintaining a water seal.'
      },
      {
        question: 'Why is proper venting important in a DWV system?',
        options: [
          'It eliminates the need for traps.',
          'It helps maintain atmospheric pressure and proper water flow.',
          'It increases the slope of the pipes.',
          'It prevents water from entering the sewer line.'
        ],
        correct: 1,
        explanation: 'Proper venting helps maintain atmospheric pressure and proper water flow in the DWV system.'
      },
      {
        question: 'What is the typical slope recommended for drainpipes to ensure proper flow?',
        options: [
          '1 inch per foot',
          '1/4 inch per foot',
          '1/2 inch per foot',
          'No slope is needed'
        ],
        correct: 1,
        explanation: 'The typical slope recommended for drainpipes is 1/4 inch per foot to ensure proper flow.'
      },
      {
        question: 'What is backflow?',
        options: [
          'Water flowing at a higher pressure than normal',
          'The reversal of contaminated water into the clean water supply',
          'A drop in water pressure in the main sewer line',
          'An increase in wastewater flow through the vent pipe'
        ],
        correct: 1,
        explanation: 'Backflow is the reversal of contaminated water into the clean water supply.'
      },
      {
        question: 'Which device is commonly used to prevent backflow?',
        options: [
          'Air gap',
          'Pressure reducer',
          'Ball valve',
          'Water hammer arrestor'
        ],
        correct: 0,
        explanation: 'An air gap is commonly used to prevent backflow by providing physical separation between water supply and contamination sources.'
      },
      {
        question: 'What is the purpose of a vent stack?',
        options: [
          'To connect the building\'s main drain to the municipal sewer.',
          'To carry wastewater from fixtures to the sewer line.',
          'To release sewer gases and maintain proper drainage pressure.',
          'To provide a secondary water supply.'
        ],
        correct: 2,
        explanation: 'The purpose of a vent stack is to release sewer gases and maintain proper drainage pressure.'
      },
      {
        question: 'What is a common method for preventing clogs in drain lines?',
        options: [
          'Installing traps with higher bends.',
          'Ensuring proper slope and using cleanouts for easy access.',
          'Increasing pipe diameter without venting.',
          'Installing multiple check valves in the same line.'
        ],
        correct: 1,
        explanation: 'Ensuring proper slope and using cleanouts for easy access is a common method for preventing clogs in drain lines.'
      },
      {
        question: 'When connecting to a municipal sewer system, what is the final step after installing the main sewer line?',
        options: [
          'Adding an air gap at the connection.',
          'Flushing the line with pressurized water.',
          'Scheduling an inspection to ensure the connection meets local codes.',
          'Installing a backflow preventer at the main sewer line.'
        ],
        correct: 2,
        explanation: 'The final step is scheduling an inspection to ensure the connection meets local codes.'
      },
      {
        question: 'What type of water is considered "gray water"?',
        options: [
          'Wastewater from toilets',
          'Contaminated water from outdoor drains',
          'Non-toxic waste from sinks, showers, and laundry',
          'Water that flows through vent pipes'
        ],
        correct: 2,
        explanation: 'Gray water is non-toxic waste from sinks, showers, and laundry.'
      },
      {
        question: 'Which maintenance step is crucial for ensuring vents continue to function properly?',
        options: [
          'Sealing them off after installation',
          'Using chemical drain cleaners in vent pipes',
          'Checking regularly for debris or blockages in vent openings',
          'Flushing the vents with high-pressure water annually'
        ],
        correct: 2,
        explanation: 'Checking regularly for debris or blockages in vent openings is crucial for ensuring vents continue to function properly.'
      }
    ]
  }
}; 
