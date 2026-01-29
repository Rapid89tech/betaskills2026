import type { Lesson } from '@/types/course';

export const module7Quiz: Lesson = {
  id: 4,
  title: 'Module 7 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What does NEC stand for?',
        options: [
          'National Energy Code',
          'National Electrical Code',
          'National Equipment Code',
          'National Engineering Code'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'How often is the NEC updated?',
        options: ['Every year', 'Every 2 years', 'Every 3 years', 'Every 5 years'],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What is the maximum spacing for outlets along walls in dwelling units?',
        options: ['6 feet', '8 feet', '12 feet', '15 feet'],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'Where is GFCI protection required?',
        options: [
          'Only in bathrooms',
          'Bathrooms, kitchens, outdoors, garages',
          'Only outdoors',
          'Only in commercial buildings'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What Article covers grounding and bonding?',
        options: ['Article 210', 'Article 220', 'Article 250', 'Article 310'],
        correctAnswer: 2
      }
    ]
  }
};

