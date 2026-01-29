import type { Lesson } from '@/types/course';

export const module14Quiz: Lesson = {
  id: 5,
  title: 'Module 14 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is typically the passing score for electrician licensing exams?',
        options: ['60%', '70-75%', '85%', '95%'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'How many hours of on-the-job training are typically required for a journeyman license?',
        options: [
          '2,000-4,000 hours',
          '4,000-6,000 hours',
          '8,000-10,000 hours',
          '12,000-15,000 hours'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What is required to become a Master Electrician?',
        options: [
          'Only pass an exam',
          'Journeyman license, additional experience, and pass master exam',
          'High school diploma',
          '1 year experience'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What is continuing education (CE) for electricians?',
        options: [
          'Initial apprenticeship training',
          'Required training to renew license',
          'Optional advanced courses',
          'High school education'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'Which certification is recognized for solar PV installers?',
        options: ['OSHA 30', 'NICET', 'NABCEP', 'ASE'],
        correctAnswer: 2
      }
    ]
  }
};

