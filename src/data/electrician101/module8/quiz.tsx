import type { Lesson } from '@/types/course';

export const module8Quiz: Lesson = {
  id: 5,
  title: 'Module 8 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the minimum size for residential service panels?',
        options: ['60 amps', '100 amps', '150 amps', '200 amps'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Where should ground and neutral be bonded?',
        options: [
          'At every panel',
          'Only at service disconnect',
          'At every outlet',
          'Never bonded'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is the minimum length for ground rods?',
        options: ['6 feet', '8 feet', '10 feet', '12 feet'],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What wire is used for residential branch circuit wiring?',
        options: ['THHN in conduit', 'NM-B cable', 'UF-B cable', 'MC cable'],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What protects wiring from overcurrent?',
        options: [
          'Ground wire',
          'Circuit breaker or fuse',
          'GFCI',
          'Neutral wire'
        ],
        correctAnswer: 1
      }
    ]
  }
};

