import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 6,
  title: 'Module 6 Quiz: Makeup Artistry',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What color corrector is used to neutralize redness?',
        options: [
          'Orange',
          'Green',
          'Purple',
          'Yellow'
        ],
        correct: 1,
        explanation: 'Green is the complementary color to red on the color wheel, so green correctors are used to neutralize redness in the skin.'
      },
      {
        question: 'What is the purpose of contouring in makeup?',
        options: [
          'Only to add color',
          'Create definition, balance proportions, and add dimension',
          'Only to highlight',
          'Only to add shine'
        ],
        correct: 1,
        explanation: 'Contouring creates definition by adding shadow, balances facial proportions, and adds dimension to enhance bone structure.'
      },
      {
        question: 'What should be applied first in makeup application?',
        options: [
          'Eyeshadow',
          'Foundation and base products',
          'Lipstick',
          'Mascara'
        ],
        correct: 1,
        explanation: 'Foundation and base products (primer, foundation, concealer) should be applied first to create a clean, even canvas for the rest of the makeup.'
      },
      {
        question: 'What is the ideal face shape that requires minimal contouring?',
        options: [
          'Round',
          'Square',
          'Oval',
          'Heart'
        ],
        correct: 2,
        explanation: 'An oval face shape is considered the ideal shape with balanced proportions, requiring minimal contouring to enhance natural features.'
      },
      {
        question: 'What should be used to set makeup and extend wear?',
        options: [
          'Only foundation',
          'Setting powder and/or setting spray',
          'Only concealer',
          'Only primer'
        ],
        correct: 1,
        explanation: 'Setting powder locks in foundation and concealer, while setting spray provides a final seal to extend makeup wear and prevent fading.'
      }
    ]
  }
};

export default quiz;

