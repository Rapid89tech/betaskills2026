import type { Quiz } from '@/types/course';

export const module5Quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Roof Installation Techniques',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the first step in preparing a roof deck for installation?',
        options: [
          'Apply sealant to the deck',
          'Clear the deck of old materials, nails, and debris',
          'Install underlayment immediately',
          'Check for ventilation issues'
        ],
        correct: 1,
        explanation: 'The first step in preparing a roof deck is to clear the deck of old materials, nails, and debris to ensure a clean surface for installation.'
      },
      {
        question: 'What is the primary purpose of starter shingles?',
        options: [
          'To provide decorative appeal',
          'To seal eaves/rakes and provide wind resistance',
          'To reduce installation costs',
          'To improve insulation'
        ],
        correct: 1,
        explanation: 'Starter shingles primarily seal eaves/rakes and provide wind resistance, ensuring the first course is properly aligned and protected.'
      },
      {
        question: 'Which type of underlayment is most suitable for valleys and eaves in cold climates?',
        options: [
          'Asphalt-saturated felt',
          'Synthetic underlayment',
          'Self-adhering membrane',
          'Standard roofing paper'
        ],
        correct: 2,
        explanation: 'Self-adhering membrane (rubberized asphalt) is most suitable for valleys and eaves in cold climates due to its superior waterproofing properties.'
      },
      {
        question: 'What is the recommended exposure for asphalt shingles?',
        options: [
          '3-4 inches',
          '5-6 inches',
          '7-8 inches',
          '2-3 inches'
        ],
        correct: 1,
        explanation: 'The recommended exposure for asphalt shingles is 5-6 inches for optimal performance and weather resistance.'
      },
      {
        question: 'Which tool is essential for installing metal panels?',
        options: [
          'Tile cutter',
          'Impact driver',
          'Roofing hammer',
          'Chalk line'
        ],
        correct: 1,
        explanation: 'An impact driver is essential for installing metal panels as it provides the torque needed to properly fasten the panels with screws.'
      },
      {
        question: 'What is the main advantage of step flashing over continuous flashing?',
        options: [
          'Lower cost',
          'Better for sloped intersections',
          'Easier installation',
          'Longer lifespan'
        ],
        correct: 1,
        explanation: 'Step flashing is better for sloped intersections as it follows the roof slope and provides better water diversion.'
      },
      {
        question: 'Which sealant is most suitable for metal roofs?',
        options: [
          'Silicone',
          'Polyurethane',
          'Butyl rubber',
          'Roof cement'
        ],
        correct: 2,
        explanation: 'Butyl rubber is most suitable for metal roofs due to its sticky nature and compatibility with metal surfaces.'
      },
      {
        question: 'What is the purpose of a ridge vent in roof ventilation?',
        options: [
          'To provide intake air',
          'To serve as an exhaust vent',
          'To support the ridge cap',
          'To prevent ice dams'
        ],
        correct: 1,
        explanation: 'A ridge vent serves as an exhaust vent, allowing hot air to escape from the attic while maintaining proper ventilation balance.'
      },
      {
        question: 'How much should ridge cap shingles overlap?',
        options: [
          '3 inches',
          '5 inches',
          '7 inches',
          '2 inches'
        ],
        correct: 1,
        explanation: 'Ridge cap shingles should overlap 5 inches to ensure proper coverage and weather resistance.'
      },
      {
        question: 'What is the balanced ventilation ratio for attic spaces?',
        options: [
          '1 sq. ft. vent per 150 sq. ft. attic',
          '1 sq. ft. vent per 300 sq. ft. attic',
          '1 sq. ft. vent per 450 sq. ft. attic',
          '1 sq. ft. vent per 600 sq. ft. attic'
        ],
        correct: 1,
        explanation: 'The balanced ventilation ratio is 1 sq. ft. vent per 300 sq. ft. attic, split equally between intake (soffit) and exhaust (ridge) vents.'
      }
    ]
  }
}; 
