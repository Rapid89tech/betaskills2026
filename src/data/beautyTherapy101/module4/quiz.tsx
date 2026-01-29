import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 4,
  title: 'Module 4 Quiz: Hair Removal Techniques',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the minimum hair length required for waxing?',
        options: [
          '1/8 inch',
          '1/4 inch (6mm)',
          '1/2 inch',
          '1 inch'
        ],
        correct: 1,
        explanation: 'Waxing requires a minimum hair length of 1/4 inch (6mm) for effective hair removal from the root.'
      },
      {
        question: 'Which hair removal method is best for sensitive skin?',
        options: [
          'Waxing',
          'Sugaring',
          'Shaving',
          'Depilatory creams'
        ],
        correct: 1,
        explanation: 'Sugaring is often preferred for sensitive skin as it uses natural ingredients and is generally less irritating than waxing.'
      },
      {
        question: 'What is the ideal skin and hair combination for laser hair removal?',
        options: [
          'Light hair, dark skin',
          'Dark hair, light skin',
          'Light hair, light skin',
          'Dark hair, dark skin'
        ],
        correct: 1,
        explanation: 'Dark hair on light skin is the ideal combination for laser hair removal, as the laser targets melanin (pigment) in the hair.'
      },
      {
        question: 'How should wax be applied in relation to hair growth direction?',
        options: [
          'Against hair growth',
          'With hair growth',
          'Perpendicular to hair growth',
          'Direction doesn\'t matter'
        ],
        correct: 1,
        explanation: 'Wax should be applied in the direction of hair growth and removed against the direction of hair growth for effective removal.'
      },
      {
        question: 'What is the typical duration of results for waxing?',
        options: [
          '1-2 weeks',
          '3-6 weeks',
          '2-3 months',
          '6 months'
        ],
        correct: 1,
        explanation: 'Waxing typically provides results lasting 3-6 weeks, as hair is removed from the root and takes time to regrow.'
      }
    ]
  }
};

export default quiz;

