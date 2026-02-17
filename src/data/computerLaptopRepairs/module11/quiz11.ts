import { Lesson } from '@/types/course';

export const quiz11: Lesson = {
  id: 2,
  title: 'Module 11 Quiz: Customer Service and Communication Skills',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the most important aspect of building trust with customers?',
        options: ['Offering the lowest prices', 'Being honest and setting realistic expectations', 'Completing repairs as fast as possible', 'Using technical jargon'],
        correct: 1
      },
      {
        id: 2,
        question: 'When explaining technical issues to customers, you should:',
        options: ['Use as much technical jargon as possible', 'Use simple language and analogies', 'Avoid explaining anything', 'Only provide written explanations'],
        correct: 1
      },
      {
        id: 3,
        question: 'What is the first step when dealing with an angry customer?',
        options: ['Argue back', 'Stay calm and listen without interrupting', 'End the conversation', 'Blame someone else'],
        correct: 1
      },
      {
        id: 4,
        question: 'A professional repair report should include:',
        options: ['Only the final cost', 'Customer complaints about other technicians', 'Problem description, work performed, and cost breakdown', 'Personal opinions about the device'],
        correct: 2
      },
      {
        id: 5,
        question: 'What should you do if a customer has unrealistic expectations about repair time?',
        options: ['Agree to meet their timeline even if impossible', 'Explain realistic timelines honestly', 'Ignore their concerns', 'Refuse the job immediately'],
        correct: 1
      },
      {
        id: 6,
        question: 'Which practice helps build customer loyalty?',
        options: ['Never following up after service', 'Providing follow-up service and maintenance tips', 'Charging extra for every question', 'Avoiding customer feedback'],
        correct: 1
      },
      {
        id: 7,
        question: 'What is an important ethical principle in computer repair?',
        options: ['Accessing customer files without permission', 'Respecting customer data and privacy', 'Overcharging for simple repairs', 'Using pirated software'],
        correct: 1
      },
      {
        id: 8,
        question: 'When creating a quote for a customer, you should include:',
        options: ['Only the total amount', 'Itemized parts, labor costs, and estimated completion time', 'Vague estimates', 'No warranty information'],
        correct: 1
      },
      {
        id: 9,
        question: 'Active listening involves:',
        options: ['Interrupting to show you understand', 'Paying full attention and asking clarifying questions', 'Thinking about your response while they talk', 'Looking at your phone'],
        correct: 1
      },
      {
        id: 10,
        question: 'What is a good way to go the extra mile for customers?',
        options: ['Charging premium prices for basic service', 'Providing follow-up service and maintenance tips', 'Keeping their device longer than necessary', 'Avoiding communication'],
        correct: 1
      }
    ]
  }
};
