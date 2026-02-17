import type { QuizLesson } from '@/types/course';

export const module1Quiz: QuizLesson = {
  id: 1,
  title: 'Module 1 Quiz: Nail Care Tools and Products',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of nail clippers?',
        options: [
          'Polishing the nail surface',
          'Trimming nails quickly and evenly',
          'Cleaning underneath the nail'
        ],
        correct: 1,
        explanation: 'Nail clippers are designed to trim nails quickly and evenly, providing a clean cut.'
      },
      {
        question: 'Which nail tool is used to shape the edges of the nail?',
        options: [
          'Cuticle pusher',
          'Buffer',
          'File'
        ],
        correct: 2,
        explanation: 'A file is used to shape the edges of the nail and smooth rough areas.'
      },
      {
        question: 'What is the function of a buffer in nail care?',
        options: [
          'To shape the free edge of the nail',
          'To remove cuticles safely',
          'To polish and smooth the nail surface'
        ],
        correct: 2,
        explanation: 'A buffer polishes and smooths the nail surface, creating a shiny finish.'
      },
      {
        question: 'Why is it important to use a base coat before applying nail polish?',
        options: [
          'It makes the polish dry faster',
          'It protects the nail and enhances polish adhesion',
          'It prevents the polish from chipping'
        ],
        correct: 1,
        explanation: 'A base coat protects the nail from staining and helps polish adhere better to the nail plate.'
      },
      {
        question: 'What should be used to moisturize and soften the cuticles?',
        options: [
          'Nail polish remover',
          'Cuticle oil',
          'Top coat'
        ],
        correct: 1,
        explanation: 'Cuticle oil moisturizes and softens the cuticles, keeping them healthy and preventing dryness.'
      },
      {
        question: 'What is the purpose of a top coat?',
        options: [
          'To help polish adhere to the nail plate',
          'To strengthen the nail',
          'To seal the polish and add shine'
        ],
        correct: 2,
        explanation: 'A top coat seals the polish, adds shine, and helps protect the manicure from chipping.'
      },
      {
        question: 'Which product is best for reinforcing weak or brittle nails?',
        options: [
          'Nail strengthener',
          'Base coat',
          'Acetone'
        ],
        correct: 0,
        explanation: 'Nail strengthener is specifically formulated to reinforce weak or brittle nails.'
      },
      {
        question: 'How should tools be cleaned before they are sanitized?',
        options: [
          'Soak them in acetone',
          'Wash them with soap and water to remove debris',
          'Buff them with a high-grit buffer'
        ],
        correct: 1,
        explanation: 'Tools should be washed with soap and water to remove debris before sanitizing or disinfecting.'
      },
      {
        question: 'Which of the following is NOT an effective way to disinfect nail tools?',
        options: [
          'Using an EPA-registered disinfectant',
          'Wiping tools with a damp cloth',
          'Soaking tools in the recommended disinfectant solution'
        ],
        correct: 1,
        explanation: 'Wiping with a damp cloth is insufficient for disinfection; proper disinfectants must be used.'
      },
      {
        question: 'How should clean tools be stored to maintain sanitation?',
        options: [
          'In a sealed, covered container',
          'Left out on the workstation',
          'In a drawer with used tools'
        ],
        correct: 0,
        explanation: 'Clean tools should be stored in a sealed, covered container to prevent recontamination.'
      }
    ]
  }
};
