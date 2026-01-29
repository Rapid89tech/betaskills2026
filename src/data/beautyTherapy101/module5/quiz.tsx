import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Nail Technology',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the approximate growth rate of fingernails?',
        options: [
          '1mm per month',
          '3mm per month',
          '5mm per month',
          '10mm per month'
        ],
        correct: 1,
        explanation: 'Fingernails grow approximately 3mm per month, while toenails grow about 1mm per month.'
      },
      {
        question: 'How should toenails be cut to prevent ingrown nails?',
        options: [
          'Rounded corners',
          'Straight across',
          'Very short',
          'Pointed'
        ],
        correct: 1,
        explanation: 'Toenails should be cut straight across (not rounded) to prevent ingrown nails, which is a common foot problem.'
      },
      {
        question: 'What is the primary function of the nail matrix?',
        options: [
          'Provides color to nails',
          'Produces nail cells and determines nail characteristics',
          'Protects the nail bed',
          'Provides sensation'
        ],
        correct: 1,
        explanation: 'The nail matrix is the active cell division area that produces nail cells and determines nail shape, thickness, and characteristics.'
      },
      {
        question: 'What is a contraindication for nail services?',
        options: [
          'Healthy nails',
          'Active fungal infection',
          'Regular maintenance',
          'Normal nail growth'
        ],
        correct: 1,
        explanation: 'Active fungal infections are an absolute contraindication for nail services, as services could spread infection or worsen the condition.'
      },
      {
        question: 'What is the purpose of a base coat in nail polish application?',
        options: [
          'Only for color',
          'Protects nails, prevents staining, extends wear',
          'Only for shine',
          'Not necessary'
        ],
        correct: 1,
        explanation: 'A base coat protects nails from staining, provides a smooth surface for color application, and helps extend polish wear.'
      }
    ]
  }
};

export default quiz;

