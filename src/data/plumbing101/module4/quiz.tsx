import type { Quiz } from '@/types/course';

export const module4Quiz: Quiz = {
  id: 4,
  title: 'Module 4 Quiz: Plumbing Systems Overview',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is one key characteristic of a residential plumbing system?',
        options: [
          'It typically uses industrial-grade pipes.',
          'It includes multiple layers of chemical filtration.',
          'It serves single-family homes or apartments with a simpler layout.',
          'It is designed to handle very large-scale wastewater treatment.'
        ],
        correct: 2,
        explanation: 'Residential plumbing systems are characterized by serving single-family homes or apartments with simpler layouts compared to commercial or industrial systems.'
      },
      {
        question: 'What is the main purpose of a water heater in a plumbing system?',
        options: [
          'To increase water pressure.',
          'To provide hot water to fixtures and appliances.',
          'To filter out impurities from the water supply.',
          'To maintain the slope of the drain lines.'
        ],
        correct: 1,
        explanation: 'The main purpose of a water heater is to provide hot water to fixtures and appliances throughout the building.'
      },
      {
        question: 'Which type of pipe is commonly used for residential water supply lines due to its flexibility and resistance to freezing?',
        options: [
          'PVC',
          'Cast iron',
          'Copper',
          'PEX'
        ],
        correct: 3,
        explanation: 'PEX (Cross-linked Polyethylene) is commonly used for residential water supply lines due to its flexibility and resistance to freezing.'
      },
      {
        question: 'What is the primary function of a drain-waste-vent (DWV) system?',
        options: [
          'To supply potable water to fixtures.',
          'To regulate water pressure within the pipes.',
          'To remove wastewater and prevent sewer gases from entering the building.',
          'To heat water before it reaches the fixtures.'
        ],
        correct: 2,
        explanation: 'The primary function of a DWV system is to remove wastewater and prevent sewer gases from entering the building.'
      },
      {
        question: 'Why is venting important in a plumbing system?',
        options: [
          'It increases the velocity of water flow through the pipes.',
          'It prevents sediment from accumulating in the traps.',
          'It ensures proper drainage flow and prevents sewer gases from escaping into the building.',
          'It keeps the water supply cold during high-temperature weather.'
        ],
        correct: 2,
        explanation: 'Venting is important because it ensures proper drainage flow and prevents sewer gases from escaping into the building.'
      },
      {
        question: 'What is the difference between commercial and residential plumbing systems?',
        options: [
          'Residential plumbing systems are more complex than commercial systems.',
          'Commercial plumbing systems are designed for higher usage, larger piping, and stricter code requirements.',
          'Commercial plumbing systems only use PVC pipes.',
          'Residential plumbing systems require advanced treatment systems for wastewater.'
        ],
        correct: 1,
        explanation: 'Commercial plumbing systems are designed for higher usage, larger piping, and stricter code requirements compared to residential systems.'
      },
      {
        question: 'Which component of a drainage system helps maintain proper flow by preventing blockages caused by negative pressure?',
        options: [
          'Main sewer line',
          'Vent stack',
          'Water heater',
          'Pressure regulator'
        ],
        correct: 1,
        explanation: 'The vent stack helps maintain proper flow by preventing blockages caused by negative pressure in the drainage system.'
      },
      {
        question: 'How does a recirculation line improve a hot water supply system?',
        options: [
          'It reduces the need for venting.',
          'It eliminates the use of traps.',
          'It provides instant hot water and reduces wastage.',
          'It increases the slope of the drainage pipes.'
        ],
        correct: 2,
        explanation: 'A recirculation line improves a hot water supply system by providing instant hot water and reducing wastage.'
      },
      {
        question: 'In a typical residential setting, what is the most common material used for sewer and waste pipes?',
        options: [
          'PEX',
          'PVC',
          'Copper',
          'Galvanized steel'
        ],
        correct: 1,
        explanation: 'PVC is the most common material used for sewer and waste pipes in typical residential settings.'
      },
      {
        question: 'What does a venting system release safely to the outside of a building?',
        options: [
          'Potable water',
          'Excess heat',
          'Sewer gases',
          'Filtered sediment'
        ],
        correct: 2,
        explanation: 'A venting system releases sewer gases safely to the outside of a building.'
      }
    ]
  }
}; 
