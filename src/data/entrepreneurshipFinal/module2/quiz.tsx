import type { Quiz } from '@/types/course';

export const module2Quiz: Quiz = {
  id: 8,
  title: 'Module 2 Quiz: Developing a Business Plan',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of an Executive Summary in a business plan?',
        options: [
          'To list all expenses in detail',
          'To provide a quick, compelling overview of the business idea',
          'To describe the production process',
          'To outline competitor weaknesses'
        ],
        correct: 1,
        explanation: 'The Executive Summary summarizes the business plan, enticing stakeholders to read further.'
      },
      {
        question: 'Which of the following is a key component of the Business Description?',
        options: [
          'Revenue forecasts',
          'Mission statement',
          'Break-even analysis',
          'Customer feedback'
        ],
        correct: 1,
        explanation: 'The Business Description includes the mission statement to define purpose and values.'
      },
      {
        question: 'What does the Market Analysis section aim to demonstrate?',
        options: [
          'How products are delivered to customers',
          'The demand and competitive landscape for your business',
          'The legal structure of the business',
          'The team\'s qualifications'
        ],
        correct: 1,
        explanation: 'Market Analysis proves demand and positions your business within the market.'
      },
      {
        question: 'What is included in an Operational Plan?',
        options: [
          'Financial projections',
          'Business structure, location, and logistics',
          'Competitor strengths and weaknesses',
          'Marketing strategies'
        ],
        correct: 1,
        explanation: 'The Operational Plan details how the business functions and delivers value.'
      },
      {
        question: 'What does a Break-Even Analysis in the Financial Plan show?',
        options: [
          'How much funding is needed',
          'When revenue equals expenses',
          'The target market\'s demographics',
          'The business\'s mission statement'
        ],
        correct: 1,
        explanation: 'Break-even analysis shows when the business becomes profitable.'
      },
      {
        question: 'What does the "Specific" aspect of a SMART goal mean?',
        options: [
          'Goals should be vague to allow flexibility',
          'Goals should clearly define what, who, where, and why',
          'Goals should focus only on financial outcomes',
          'Goals should have no timeline'
        ],
        correct: 1,
        explanation: 'Specific goals provide clarity and direction for actionable outcomes.'
      },
      {
        question: 'Why are Measurable goals important in a business plan?',
        options: [
          'They allow you to track progress with KPIs',
          'They ensure goals are overly ambitious',
          'They focus on unrelated business activities',
          'They eliminate the need for timelines'
        ],
        correct: 0,
        explanation: 'Measurable goals use KPIs to monitor success and adjust strategies.'
      },
      {
        question: 'What makes a goal Achievable?',
        options: [
          'It is based on hope rather than resources',
          'It is realistic given your skills, time, and budget',
          'It ignores market conditions',
          'It focuses only on long-term vision'
        ],
        correct: 1,
        explanation: 'Achievable goals are doable based on available resources.'
      },
      {
        question: 'What does the "Relevant" aspect of a SMART goal ensure?',
        options: [
          'Goals are unrelated to the business vision',
          'Goals align with the business\'s mission and priorities',
          'Goals are set without deadlines',
          'Goals focus only on financial results'
        ],
        correct: 1,
        explanation: 'Relevant goals support the business\'s long-term vision and focus.'
      },
      {
        question: 'What is the importance of setting a Time-bound goal?',
        options: [
          'To create urgency and help track progress with deadlines',
          'To make goals easier to ignore',
          'To allow indefinite time for completion',
          'To focus only on financial results'
        ],
        correct: 0,
        explanation: 'Time-bound goals ensure focus and accountability with clear deadlines.'
      },
      {
        question: 'Explain two key elements that should be included in an Executive Summary.',
        options: [
          'Business concept and competitive advantage',
          'Financial projections and market analysis',
          'Operational plan and team structure',
          'Legal requirements and tax obligations'
        ],
        correct: 0,
        explanation: 'Two key elements of an Executive Summary are the business concept and competitive advantage. The business concept clarifies what the business offers and the problem it solves, like eco-friendly gardening kits for urban dwellers. The competitive advantage highlights what sets the business apart, such as unique features or pricing, ensuring it stands out to stakeholders.'
      },
      {
        question: 'Describe why it\'s important to include a Market Analysis in your business plan.',
        options: [
          'To demonstrate demand and competitive landscape',
          'To outline operational procedures',
          'To detail financial projections',
          'To list team qualifications'
        ],
        correct: 0,
        explanation: 'Market Analysis is crucial because it demonstrates demand for your product and your understanding of the competitive landscape. It identifies target customers, their needs, and market trends, ensuring your business meets real demands. It also analyzes competitors, highlighting gaps you can fill, which builds investor confidence and ensures your plan is grounded in market realities.'
      }
    ]
  }
}; 
