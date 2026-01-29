import type { Quiz } from '@/types/course';

export const module4Quiz: Quiz = {
  id: 4,
  title: 'Module 4 Quiz: Flashing and Drip Edges',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of roof flashing?',
        options: [
          'Improve roof appearance',
          'Insulate attic space',
          'Prevent water from penetrating joints/openings',
          'Support roofing material'
        ],
        correct: 2,
        explanation: 'The primary purpose of roof flashing is to prevent water from penetrating joints/openings.'
      },
      {
        question: 'Which is NOT a typical flashing material?',
        options: [
          'Aluminum',
          'Copper',
          'Concrete',
          'Galvanized steel'
        ],
        correct: 2,
        explanation: 'Concrete is NOT a typical flashing material.'
      },
      {
        question: 'Where is step flashing most commonly used?',
        options: [
          'Roof valleys',
          'Skylights',
          'Roof-to-wall intersections',
          'Eaves/rakes'
        ],
        correct: 2,
        explanation: 'Step flashing is most commonly used at roof-to-wall intersections.'
      },
      {
        question: 'What type of flashing is used at chimney bases?',
        options: [
          'Ridge flashing',
          'Kick-out flashing',
          'Chimney flashing',
          'Gable flashing'
        ],
        correct: 2,
        explanation: 'Chimney flashing is used at chimney bases.'
      },
      {
        question: 'Why must flashing materials be compatible?',
        options: [
          'Reduce noise',
          'Prevent color mismatch',
          'Avoid corrosion from chemical reactions',
          'Ease installation'
        ],
        correct: 2,
        explanation: 'Flashing materials must be compatible to avoid corrosion from chemical reactions.'
      },
      {
        question: 'What is the correct drip edge placement at eaves?',
        options: [
          'Over underlayment, under shingles',
          'Under underlayment, under shingles',
          'Over shingles, under underlayment',
          'Under roof deck'
        ],
        correct: 1,
        explanation: 'The correct drip edge placement at eaves is under underlayment, under shingles.'
      },
      {
        question: 'What problem results from missing/poorly installed drip edges?',
        options: [
          'Ice buildup in soffits',
          'Water wicking under shingles, damaging fascia',
          'Gutter overflow only',
          'Loss of attic ventilation'
        ],
        correct: 1,
        explanation: 'Missing/poorly installed drip edges result in water wicking under shingles, damaging fascia.'
      },
      {
        question: 'What is kick-out flashing used for?',
        options: [
          'Direct water into gutters',
          'Allow airflow under shingles',
          'Divert water from siding at roof-wall intersections',
          'Support shingles at ridge'
        ],
        correct: 2,
        explanation: 'Kick-out flashing is used to divert water from siding at roof-wall intersections.'
      },
      {
        question: 'How much should drip edge pieces overlap?',
        options: [
          '1/2 inch',
          '1 inch',
          '2 inches',
          '4 inches'
        ],
        correct: 2,
        explanation: 'Drip edge pieces should overlap 2 inches.'
      },
      {
        question: 'What is a best practice for flashing installation?',
        options: [
          'Install under underlayment in all areas',
          'Use nails that rust easily',
          'Mix copper with steel to save costs',
          'Overlap flashing pieces in the direction of water flow'
        ],
        correct: 3,
        explanation: 'A best practice for flashing installation is to overlap flashing pieces in the direction of water flow.'
      }
    ]
  }
}; 
