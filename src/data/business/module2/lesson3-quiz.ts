import { QuizLesson } from '@/types/course';

export const lesson3Quiz: QuizLesson = {
  id: 3,
  title: 'Quiz: Module 2 – Market Research',
  duration: '30 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of market research?',
        options: [
          'To increase product price',
          'To identify and understand customer needs',
          'To hire more staff',
          'To reduce taxes'
        ],
        correct: 1,
        explanation: 'Market research focuses on understanding customer needs to ensure your product or service meets market demands.'
      },
      {
        question: 'A "target market" refers to:',
        options: [
          'Everyone in your city',
          'People with the highest income',
          'A specific group most likely to buy your product',
          'Your competitors'
        ],
        correct: 2,
        explanation: 'A target market is a defined group of potential customers most likely to benefit from and purchase your offering.'
      },
      {
        question: 'Which of the following is NOT a method of validating a business idea?',
        options: [
          'Creating a landing page',
          'Building a full product with all features',
          'Conducting surveys',
          'Running a small test campaign'
        ],
        correct: 1,
        explanation: 'Validating a business idea involves testing with minimal resources, not building a complete product.'
      },
      {
        question: 'What is the main purpose of an MVP (Minimum Viable Product)?',
        options: [
          'To impress investors',
          'To test your idea with minimal resources',
          'To make the final version of the product',
          'To copy a competitor\'s product'
        ],
        correct: 1,
        explanation: 'An MVP tests the core concept efficiently, gathering feedback without extensive investment.'
      },
      {
        question: 'Which of the following best describes a focus group?',
        options: [
          'A one-on-one interview with an investor',
          'A group of random people in a public space',
          'A selected group discussing your product to give feedback',
          'An online advertisement group'
        ],
        correct: 2,
        explanation: 'A focus group involves a targeted group providing insights on your product or idea.'
      },
      {
        question: 'What are demographic factors in market research?',
        options: [
          'Customer values and beliefs',
          'Measurable characteristics like age and income',
          'Customer buying habits',
          'Geographic location only'
        ],
        correct: 1,
        explanation: 'Demographic factors are measurable characteristics like age, gender, income, education, and occupation.'
      },
      {
        question: 'What is a unique value proposition (UVP)?',
        options: [
          'A list of product features',
          'A clear statement of why customers should choose your product',
          'A pricing strategy',
          'A marketing budget'
        ],
        correct: 1,
        explanation: 'A UVP clearly communicates why your product or service is the best choice for your target customers.'
      },
      {
        question: 'Which method involves watching customers in real settings?',
        options: [
          'Surveys',
          'Interviews',
          'Observation',
          'Focus groups'
        ],
        correct: 2,
        explanation: 'Observation involves watching customers in real settings to understand their behaviors and preferences.'
      },
      {
        question: 'What does TAM stand for in market sizing?',
        options: [
          'Total Available Market',
          'Target Audience Market',
          'Total Addressable Market',
          'Target Area Market'
        ],
        correct: 2,
        explanation: 'TAM stands for Total Addressable Market, which represents the total market demand for your product or service.'
      },
      {
        question: 'Why is competitor analysis important?',
        options: [
          'To copy their products exactly',
          'To understand market gaps and opportunities for differentiation',
          'To avoid all competition',
          'To reduce prices below competitors'
        ],
        correct: 1,
        explanation: 'Competitor analysis helps you understand market gaps and opportunities for differentiation, not to copy competitors.'
      }
    ]
  }
}; 