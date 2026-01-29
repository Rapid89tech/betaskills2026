import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Culinary Business & Leadership',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which principle of restaurant management emphasizes minimizing waste and maximizing productivity?',
        options: [
          'Guest-Centric Approach',
          'Operational Efficiency',
          'Team Leadership',
          'Financial Management'
        ],
        correct: 1,
        explanation: 'Operational Efficiency is the principle that emphasizes minimizing waste and maximizing productivity through streamlined workflows.'
      },
      {
        question: 'What does FIFO stand for in inventory management?',
        options: [
          'First In, First Out',
          'Fast Inventory, Fast Output',
          'First Inventory, First Order',
          'Food In, Food Out'
        ],
        correct: 0,
        explanation: 'FIFO stands for First In, First Out, a method of rotating stock to use older items first and minimize spoilage.'
      },
      {
        question: 'Which kitchen role is primarily responsible for coordinating between kitchen and front-of-house for timely service?',
        options: [
          'Line Cook',
          'Executive Chef',
          'Expediter',
          'Sous Chef'
        ],
        correct: 2,
        explanation: 'The Expediter is primarily responsible for coordinating between kitchen and front-of-house for timely service, ensuring smooth communication and delivery.'
      },
      {
        question: 'A key strategy in menu engineering is to:',
        options: [
          'Offer only low-cost dishes to minimize expenses',
          'Categorize dishes based on popularity and profitability',
          'Avoid seasonal ingredients to reduce complexity',
          'Set all menu prices at the same profit margin'
        ],
        correct: 1,
        explanation: 'Menu engineering categorizes dishes based on popularity and profitability (stars, plowhorses, puzzles, dogs) to optimize menu performance.'
      },
      {
        question: 'What is the target percentage range for food cost in most restaurants?',
        options: [
          '10–15%',
          '25–35%',
          '40–50%',
          '50–60%'
        ],
        correct: 1,
        explanation: 'The target percentage range for food cost in most restaurants is 25–35% of revenue to ensure profitability.'
      },
      {
        question: 'Which of the following is a principle of marketing and branding for chefs?',
        options: [
          'Prioritize low-cost ingredients',
          'Maintain authenticity and engage with audiences',
          'Focus only on local diners',
          'Avoid digital marketing'
        ],
        correct: 1,
        explanation: 'Maintaining authenticity and engaging with audiences is a key principle of marketing and branding for chefs, building trust and loyalty.'
      },
      {
        question: 'Which front-of-house tool helps manage reservations and optimize table turnover?',
        options: [
          'POS System',
          '7shifts Scheduling Software',
          'OpenTable or Resy',
          'MarketMan Inventory Software'
        ],
        correct: 2,
        explanation: 'OpenTable or Resy are reservation platforms that help manage reservations and optimize table turnover in restaurants.'
      },
      {
        question: 'Which practice helps reduce waste and supports sustainability in kitchen operations?',
        options: [
          'Over-ordering ingredients',
          'Portion control and upcycling ingredients',
          'Using imported ingredients exclusively',
          'Avoiding menu changes'
        ],
        correct: 1,
        explanation: 'Portion control and upcycling ingredients (e.g., using vegetable scraps for stocks) helps reduce waste and supports sustainability.'
      },
      {
        question: 'What is the main role of a sommelier in a restaurant?',
        options: [
          'Manage kitchen prep stations',
          'Coordinate guest seating and reservations',
          'Curate beverage pairings and educate staff on wines or beers',
          'Handle social media marketing'
        ],
        correct: 2,
        explanation: 'A sommelier curates beverage pairings and educates staff on wines or beers, enhancing the dining experience through beverage expertise.'
      },
      {
        question: 'Why is staff training considered critical in restaurant management?',
        options: [
          'It ensures consistent quality, service, and safety',
          'It reduces the need for inventory management',
          'It eliminates the need for menu engineering',
          'It allows chefs to avoid financial planning'
        ],
        correct: 0,
        explanation: 'Staff training is critical because it ensures consistent quality, service, and safety, maintaining standards across all operations.'
      }
    ]
  }
};

export default quiz;

