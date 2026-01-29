import { QuizLesson } from '@/types/course';

export const lesson2Quiz: QuizLesson = {
  id: 2,
  title: 'Quiz: Module 1 – Introduction to Entrepreneurship',
  duration: '30 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is entrepreneurship?',
        options: [
          'Working a 9-to-5 job',
          'Creating and growing a business to solve problems',
          'Investing in real estate',
          'Becoming a consultant'
        ],
        correct: 1,
        explanation: 'Entrepreneurship is the process of creating and growing a business to solve problems and meet market needs.'
      },
      {
        question: 'Which of the following is a common trait of an entrepreneur?',
        options: [
          'Laziness',
          'Resilience',
          'Predictability',
          'Dependence'
        ],
        correct: 1,
        explanation: 'Resilience is a key trait of successful entrepreneurs, allowing them to bounce back from setbacks and challenges.'
      },
      {
        question: 'One benefit of entrepreneurship is...',
        options: [
          'Guaranteed income',
          'Independence and flexibility',
          'Government employment',
          'Mandatory promotion'
        ],
        correct: 1,
        explanation: 'Entrepreneurship offers independence and flexibility, allowing you to be your own boss and set your own schedule.'
      },
      {
        question: 'What is a startup ecosystem?',
        options: [
          'A natural environment for fish',
          'A support system for new businesses',
          'A franchise model',
          'A loan system'
        ],
        correct: 1,
        explanation: 'A startup ecosystem is a network of individuals and institutions that support entrepreneurship and new business development.'
      },
      {
        question: 'Who is known for founding Spanx?',
        options: [
          'Oprah Winfrey',
          'Sara Blakely',
          'Jeff Bezos',
          'Warren Buffet'
        ],
        correct: 1,
        explanation: 'Sara Blakely founded Spanx, turning a $5,000 investment into a billion-dollar business through creativity and determination.'
      }
    ]
  }
}; 