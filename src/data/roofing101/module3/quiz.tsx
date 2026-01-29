import type { Quiz } from '@/types/course';

export const module3Quiz: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: Roofing Materials',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of a roofing hammer (hatchet) compared to a standard claw hammer?',
        options: [
          'Driving nails only',
          'Cutting shingles and prying nails',
          'Removing old roof tiles',
          'Breaking concrete'
        ],
        correct: 1,
        explanation: 'The primary purpose of a roofing hammer (hatchet) is cutting shingles and prying nails.'
      },
      {
        question: 'Which tin snips are best for cutting a clockwise curve in sheet metal?',
        options: [
          'Left-cut snips',
          'Straight-cut snips',
          'Right-cut snips',
          'Multi-purpose snips'
        ],
        correct: 2,
        explanation: 'Right-cut snips are best for cutting a clockwise curve in sheet metal.'
      },
      {
        question: 'What is the main function of a chalk line in roofing work?',
        options: [
          'Measuring roof slope',
          'Aligning tiles',
          'Marking long, straight lines',
          'Locating rafters'
        ],
        correct: 2,
        explanation: 'The main function of a chalk line in roofing work is marking long, straight lines.'
      },
      {
        question: 'Why should gloves always be worn when using tin snips?',
        options: [
          'To keep hands clean',
          'To prevent electric shock',
          'To prevent cuts from sharp metal edges',
          'To improve speed'
        ],
        correct: 2,
        explanation: 'Gloves should always be worn when using tin snips to prevent cuts from sharp metal edges.'
      },
      {
        question: 'What safety equipment is most important for preventing falls during roof installation?',
        options: [
          'Hard hat',
          'Safety goggles',
          'Full body harness',
          'Steel-toed boots'
        ],
        correct: 2,
        explanation: 'Full body harness is most important for preventing falls during roof installation.'
      },
      {
        question: 'Why is underlayment important beneath metal roofing panels?',
        options: [
          'Adds color to the roof',
          'Keeps the roof warmer',
          'Provides extra waterproofing and reduces condensation',
          'Increases the weight for better wind resistance'
        ],
        correct: 2,
        explanation: 'Underlayment is important beneath metal roofing panels because it provides extra waterproofing and reduces condensation.'
      },
      {
        question: 'Which of the following is an advantage of standing seam metal roofing?',
        options: [
          'Uses wood shingles for aesthetics',
          'Has visible fasteners for easy access',
          'Provides superior weather resistance with hidden seams',
          'Only suitable for flat roofs'
        ],
        correct: 2,
        explanation: 'An advantage of standing seam metal roofing is that it provides superior weather resistance with hidden seams.'
      },
      {
        question: 'What maintenance practice helps prevent tool failure on construction sites?',
        options: [
          'Using tools quickly',
          'Painting tools',
          'Regular inspection and lubrication',
          'Storing tools outside'
        ],
        correct: 2,
        explanation: 'Regular inspection and lubrication helps prevent tool failure on construction sites.'
      },
      {
        question: 'What is the correct response if a tool behaves unusually or shows signs of damage?',
        options: [
          'Use it until it breaks',
          'Fix it without reporting',
          'Stop using it and report it for repair',
          'Let others try it first'
        ],
        correct: 2,
        explanation: 'The correct response if a tool behaves unusually or shows signs of damage is to stop using it and report it for repair.'
      },
      {
        question: 'What is one environmental benefit of using metal roofing materials?',
        options: [
          'They are made of plastic',
          'They can be recycled after use',
          'They absorb heat for warmth',
          'They require frequent replacement'
        ],
        correct: 1,
        explanation: 'One environmental benefit of using metal roofing materials is that they can be recycled after use.'
      }
    ]
  }
}; 
