import type { Lesson } from '@/types/course';

export const module13Quiz: Lesson = {
  id: 5,
  title: 'Module 13 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is typically included in overhead costs?',
        options: [
          'Only materials',
          'Office expenses, insurance, licenses',
          'Only labor',
          'Just vehicle costs'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is a typical waste factor for electrical wire?',
        options: ['5%', '10-15%', '25%', '50%'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What should be done before providing a project estimate?',
        options: [
          'Just guess',
          'Copy another estimate',
          'Review drawings and perform material takeoff',
          'Ask the customer'
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'What insurance is required for employees?',
        options: [
          'Vehicle insurance',
          'Workers compensation',
          'Homeowners insurance',
          'Travel insurance'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is the rough-in phase of electrical installation?',
        options: [
          'Installing devices and fixtures',
          'Testing systems',
          'Installing boxes, conduit, and wire before walls close',
          'Final inspection'
        ],
        correctAnswer: 2
      }
    ]
  }
};

