import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 10,
  title: 'Module 10 Quiz: Business and Professional Development',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is essential for business financial management?',
        options: [
          'Only pricing',
          'Pricing, record keeping, and budgeting',
          'Only record keeping',
          'Only budgeting'
        ],
        correct: 1,
        explanation: 'Financial management requires comprehensive approach including appropriate pricing, accurate record keeping, and effective budgeting for business success.'
      },
      {
        question: 'What is consultative selling?',
        options: [
          'Only presenting products',
          'Needs assessment, solution presentation, value communication, and relationship building',
          'Only needs assessment',
          'Only relationship building'
        ],
        correct: 1,
        explanation: 'Consultative selling involves understanding client needs, presenting appropriate solutions, communicating value, and building relationships rather than just pushing products.'
      },
      {
        question: 'Why is client retention important?',
        options: [
          'Only for revenue',
          'More cost-effective than acquisition, builds loyal base, and ensures sustainable business',
          'Only for loyalty',
          'Only for sustainability'
        ],
        correct: 1,
        explanation: 'Client retention is more cost-effective than acquiring new clients, builds a loyal client base, and ensures sustainable business growth.'
      },
      {
        question: 'What is important for professional development?',
        options: [
          'Only training',
          'Continuing education, skill development, and networking',
          'Only skill development',
          'Only networking'
        ],
        correct: 1,
        explanation: 'Professional development requires ongoing continuing education, skill development in various areas, and networking with industry professionals.'
      },
      {
        question: 'What should be included in a business plan?',
        options: [
          'Only goals',
          'Mission, goals, market analysis, and financial planning',
          'Only market analysis',
          'Only financial planning'
        ],
        correct: 1,
        explanation: 'A comprehensive business plan includes the business mission, short and long-term goals, market analysis, and financial planning for success.'
      }
    ]
  }
};

export default quiz;

