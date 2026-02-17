import type { Quiz } from '@/types/course';

export const module6Quiz: Quiz = {
  id: 6,
  title: 'Module 6 Quiz: Business and Salon Management',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main advantage of booth rental over salon employment?',
        options: [
          'Guaranteed steady income',
          'No responsibility for supplies',
          'Higher earning potential and independence',
          'Free equipment provided'
        ],
        correct: 2,
        explanation: 'Booth rental offers higher earning potential and more independence, though you are responsible for your own supplies and have no guaranteed income.'
      },
      {
        question: 'What should be included in a comprehensive business plan?',
        options: [
          'Only financial projections',
          'Just the business name',
          'Executive summary, market analysis, services, pricing, and financial projections',
          'Only marketing strategy'
        ],
        correct: 2,
        explanation: 'A comprehensive business plan includes executive summary, business description, market analysis, services and pricing, marketing strategy, and financial projections.'
      },
      {
        question: 'What is the recommended profit margin for nail services?',
        options: [
          '10-20%',
          '30-40%',
          '50-70%',
          '80-90%'
        ],
        correct: 2,
        explanation: 'Nail services should aim for a 50-70% profit margin, while retail products typically have 30-50% margins.'
      },
      {
        question: 'Which pricing strategy is based on competitor analysis?',
        options: [
          'Cost-based pricing',
          'Market-based pricing',
          'Value-based pricing',
          'Random pricing'
        ],
        correct: 1,
        explanation: 'Market-based pricing involves researching competitor pricing in your area and positioning yourself accordingly (budget, mid-range, or premium).'
      },
      {
        question: 'What percentage of income should be set aside for taxes?',
        options: [
          '5-10%',
          '15-20%',
          '25-30%',
          '40-50%'
        ],
        correct: 2,
        explanation: 'It\'s recommended to set aside 25-30% of income for taxes to ensure you can meet tax obligations and avoid penalties.'
      },
      {
        question: 'Which social media platform is best for showcasing nail art visually?',
        options: [
          'Twitter',
          'LinkedIn',
          'Instagram',
          'Reddit'
        ],
        correct: 2,
        explanation: 'Instagram is ideal for showcasing nail art with before/after photos, portfolio images, and behind-the-scenes content due to its visual focus.'
      },
      {
        question: 'What is a referral program designed to do?',
        options: [
          'Increase product prices',
          'Reward clients who refer friends with discounts or free services',
          'Reduce service quality',
          'Eliminate competition'
        ],
        correct: 1,
        explanation: 'Referral programs reward existing clients who refer friends, encouraging word-of-mouth marketing and client acquisition.'
      },
      {
        question: 'What information should be tracked in client records?',
        options: [
          'Only their name',
          'Contact details, service history, preferences, and allergies',
          'Just payment history',
          'Only appointment dates'
        ],
        correct: 1,
        explanation: 'Client records should include contact details, service history, product preferences, allergies, special occasions, and payment history for personalized service.'
      },
      {
        question: 'What is the first step when handling a client complaint?',
        options: [
          'Argue with the client',
          'Ignore the complaint',
          'Listen and empathize without interruption',
          'Blame the client'
        ],
        correct: 2,
        explanation: 'The first step in handling complaints is to listen actively and empathize, allowing clients to express concerns without interruption.'
      },
      {
        question: 'What is the purpose of a no-show policy?',
        options: [
          'To punish clients',
          'To protect your time and income by requiring advance notice for cancellations',
          'To increase prices',
          'To reduce client bookings'
        ],
        correct: 1,
        explanation: 'A no-show policy requiring 24-48 hours notice protects your time and income by reducing last-minute cancellations and no-shows.'
      }
    ]
  }
};
