import type { Quiz } from '@/types/course';

export const module2Quiz: Quiz = {
  id: 2,
  title: 'Module 2 Quiz: Roofing and Construction Tools & Safety',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of roofing hammers (hatchets) compared to standard claw hammers?',
        options: [
          'Driving screws',
          'Cutting shingles and prying nails',
          'Measuring distances',
          'Applying sealants'
        ],
        correct: 1,
        explanation: 'The primary purpose of roofing hammers (hatchets) is cutting shingles and prying nails.'
      },
      {
        question: 'Which type of tin snips would you use to cut a clockwise curve in sheet metal?',
        options: [
          'Straight-cut snips',
          'Left-cut snips',
          'Right-cut snips',
          'Universal snips'
        ],
        correct: 2,
        explanation: 'Right-cut snips are used to cut a clockwise curve in sheet metal.'
      },
      {
        question: 'What is the main function of a chalk line in roofing work?',
        options: [
          'Cutting materials',
          'Marking long, straight lines for cutting or alignment',
          'Driving nails',
          'Applying adhesives'
        ],
        correct: 1,
        explanation: 'The main function of a chalk line in roofing work is marking long, straight lines for cutting or alignment.'
      },
      {
        question: 'Why should you always wear gloves when using tin snips?',
        options: [
          'To improve grip strength',
          'To prevent cuts from sharp metal edges',
          'To protect against heat',
          'To avoid chalk residue'
        ],
        correct: 1,
        explanation: 'You should always wear gloves when using tin snips to prevent cuts from sharp metal edges.'
      },
      {
        question: 'Which safety gear is designed to prevent falls from roofs?',
        options: [
          'Steel-toe boots',
          'Hard hat',
          'Full body harness',
          'Slip-resistant gloves'
        ],
        correct: 2,
        explanation: 'Full body harness is designed to prevent falls from roofs.'
      },
      {
        question: 'What is a key safety tip when using a nail gun on a roofing site?',
        options: [
          'Hold the gun close to your body',
          'Remove safety triggers for faster work',
          'Always engage safety triggers and wear eye protection',
          'Use without gloves for better control'
        ],
        correct: 2,
        explanation: 'A key safety tip when using a nail gun is to always engage safety triggers and wear eye protection.'
      },
      {
        question: 'What is one major advantage of using power drills over manual screwdrivers in roofing?',
        options: [
          'They are lighter to carry',
          'They can drill holes and drive screws faster and with less effort',
          'They require no maintenance',
          'They are quieter to operate'
        ],
        correct: 1,
        explanation: 'One major advantage of using power drills over manual screwdrivers is that they can drill holes and drive screws faster and with less effort.'
      },
      {
        question: 'What general maintenance practice helps prevent unexpected tool failures on the job?',
        options: [
          'Using tools in wet conditions',
          'Regular inspection and lubrication of moving parts',
          'Storing tools in direct sunlight',
          'Ignoring minor damage'
        ],
        correct: 1,
        explanation: 'Regular inspection and lubrication of moving parts helps prevent unexpected tool failures on the job.'
      },
      {
        question: 'When using a utility knife to cut roofing materials, what is the safest practice?',
        options: [
          'Cut toward your body for control',
          'Use a dull blade to avoid deep cuts',
          'Cut away from your body and use a straightedge for clean lines',
          'Hold the material with your free hand'
        ],
        correct: 2,
        explanation: 'The safest practice when using a utility knife is to cut away from your body and use a straightedge for clean lines.'
      },
      {
        question: 'If a tool shows unusual behavior or damage during use, what should you do?',
        options: [
          'Continue using it carefully',
          'Attempt to repair it on-site',
          'Stop using it immediately and report it for repair',
          'Store it without inspection'
        ],
        correct: 2,
        explanation: 'If a tool shows unusual behavior or damage during use, you should stop using it immediately and report it for repair.'
      }
    ]
  }
}; 
