import type { Quiz } from '@/types/course';

export const module2Quiz: Quiz = {
  id: 2,
  title: 'Module 2 Quiz: Manicure and Pedicure Techniques',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What should you do first during a client consultation for a manicure?',
        options: [
          'Apply base coat immediately',
          'Examine nails for infections or damage',
          'Start filing the nails',
          'Apply cuticle oil'
        ],
        correct: 1,
        explanation: 'A thorough consultation includes examining the client\'s nails, cuticles, and skin for any signs of infection, damage, or allergies before proceeding.'
      },
      {
        question: 'Which polish remover is gentler on natural nails?',
        options: [
          'Acetone',
          'Non-acetone',
          'Alcohol-based remover',
          'Water-based remover'
        ],
        correct: 1,
        explanation: 'Non-acetone polish remover is gentler on natural nails and prevents excessive drying, while acetone is more effective for stubborn products like gel polish.'
      },
      {
        question: 'What is the correct way to file nails to prevent splitting?',
        options: [
          'File back and forth quickly',
          'File in one direction only',
          'File in circular motions',
          'File at a 90-degree angle'
        ],
        correct: 1,
        explanation: 'Filing nails in one direction prevents splitting and weakening. Sawing back and forth creates micro-tears in the nail plate.'
      },
      {
        question: 'Which nail shape is best for clients with strong nails who want a classic look?',
        options: [
          'Stiletto',
          'Almond',
          'Square',
          'Round'
        ],
        correct: 2,
        explanation: 'Square nails are filed straight across with sharp corners and are ideal for strong nails, offering a classic and professional appearance.'
      },
      {
        question: 'How long should hands be soaked during a manicure?',
        options: [
          '1-2 minutes',
          '5-10 minutes',
          '15-20 minutes',
          '30 minutes'
        ],
        correct: 1,
        explanation: 'Soaking hands for 5-10 minutes in warm, soapy water softens cuticles and makes them easier to push back without damage.'
      },
      {
        question: 'What angle should you use when pushing back cuticles?',
        options: [
          '90-degree angle',
          '45-degree angle',
          '30-degree angle',
          '60-degree angle'
        ],
        correct: 1,
        explanation: 'Working at a 45-degree angle when pushing back cuticles helps avoid damaging the nail bed while effectively moving the cuticle back.'
      },
      {
        question: 'When should you trim cuticles during a manicure?',
        options: [
          'Always trim all cuticles completely',
          'Only trim excess dead skin or hangnails',
          'Never trim cuticles',
          'Trim before soaking'
        ],
        correct: 1,
        explanation: 'Only trim excess dead skin or hangnails with cuticle nippers. Avoid cutting live tissue to prevent bleeding, infection, and pain.'
      },
      {
        question: 'How should toenails be trimmed to prevent ingrown nails?',
        options: [
          'Round the corners deeply',
          'Cut in a V-shape',
          'Trim straight across',
          'Cut very short'
        ],
        correct: 2,
        explanation: 'Trimming toenails straight across prevents ingrown nails. Avoid rounding the corners too much, as this increases the risk of ingrown toenails.'
      },
      {
        question: 'What is the purpose of applying a base coat before color polish?',
        options: [
          'To make polish dry faster',
          'To protect the natural nail and prevent staining',
          'To add shine',
          'To remove oils'
        ],
        correct: 1,
        explanation: 'A base coat protects the natural nail from staining and helps polish adhere better and last longer.'
      },
      {
        question: 'What should be added to a foot bath for antibacterial benefits?',
        options: [
          'Soap only',
          'Hot water only',
          'Essential oils like tea tree',
          'Nail polish remover'
        ],
        correct: 2,
        explanation: 'Adding essential oils like lavender or tea tree to the foot bath provides relaxation and antibacterial benefits while softening the skin.'
      }
    ]
  }
};
