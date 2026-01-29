import type { Quiz } from '@/types/course';

export const module4Quiz: Quiz = {
  id: 3,
  title: 'Module 4 Quiz: Funding and Financial Management',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is bootstrapping in business funding?',
        options: [
          'Raising money from investors',
          'Using personal savings and resources to fund your business',
          'Applying for a government grant',
          'Taking out a business loan'
        ],
        correct: 1,
        explanation: 'Bootstrapping uses personal funds to start and grow a business, preserving control without external debt or equity dilution.'
      },
      {
        question: 'Which type of investor typically invests their own money and offers mentorship?',
        options: [
          'Venture Capitalists',
          'Angel Investors',
          'Bank Loan Officers',
          'Crowdfunding Platforms'
        ],
        correct: 1,
        explanation: 'Angel investors provide personal funds and mentorship to early-stage startups, supporting growth with industry insights.'
      },
      {
        question: 'What is a key disadvantage of business loans?',
        options: [
          'You must give up equity in your business',
          'You have to repay the loan with interest regardless of business success',
          'There is no need to repay the money',
          'They always come with free mentorship'
        ],
        correct: 1,
        explanation: 'Loans require repayment with interest, creating a financial obligation that can strain cash flow if revenue falls short.'
      },
      {
        question: 'What is the primary benefit of grants for small businesses?',
        options: [
          'They do not have to be repaid',
          'They offer unlimited funding',
          'They are easy to get with no application process',
          'They come with no restrictions'
        ],
        correct: 0,
        explanation: 'Grants provide non-repayable funds, supporting growth without debt, though they require competitive applications and compliance.'
      },
      {
        question: 'Why is managing cash flow important for a business?',
        options: [
          'To avoid paying taxes',
          'To ensure the business has enough cash to cover expenses and invest in growth',
          'To increase employee salaries',
          'To avoid having a business plan'
        ],
        correct: 1,
        explanation: 'Cash flow management ensures liquidity for operations, prevents debt, and enables investments in marketing or inventory.'
      },
      {
        question: 'Which of the following is NOT a common pricing strategy?',
        options: [
          'Cost-plus pricing',
          'Penetration pricing',
          'Value-based pricing',
          'Random pricing'
        ],
        correct: 3,
        explanation: 'Random pricing is not a recognized strategy; valid options include cost-plus, penetration, and value-based pricing.'
      },
      {
        question: 'What is one major advantage of using accounting software?',
        options: [
          'It eliminates the need to keep any financial records',
          'It automates invoicing and tracks revenue and expenses accurately',
          'It guarantees business success',
          'It reduces the need for employees'
        ],
        correct: 1,
        explanation: 'Accounting software streamlines financial tracking, reduces errors, and provides real-time insights for decision-making.'
      },
      {
        question: 'What does \'profitability\' indicate in business?',
        options: [
          'The total amount of sales made',
          'The amount of money left after all expenses are paid',
          'The amount of money spent on advertising',
          'The total number of customers'
        ],
        correct: 1,
        explanation: 'Profitability measures net profit, indicating financial health after deducting costs, guiding sustainable business decisions.'
      },
      {
        question: 'What is a key benefit of crowdfunding for startups?',
        options: [
          'It requires no marketing effort',
          'It validates market demand and engages customers',
          'It guarantees large-scale funding',
          'It involves giving up full ownership'
        ],
        correct: 1,
        explanation: 'Crowdfunding tests market interest, engages backers, and raises funds without equity loss, though it requires marketing effort.'
      },
      {
        question: 'What is the purpose of financial forecasting?',
        options: [
          'To eliminate the need for accounting software',
          'To predict future revenue, expenses, and cash flow for planning',
          'To replace a business plan',
          'To avoid tax compliance'
        ],
        correct: 1,
        explanation: 'Financial forecasting projects financial performance, guiding budgeting, funding needs, and strategic decisions for growth.'
      },
      {
        question: 'What is a key feature of equity crowdfunding?',
        options: [
          'It provides funds without any investor involvement',
          'It involves selling small equity stakes to many investors',
          'It requires no regulatory compliance',
          'It focuses only on debt financing'
        ],
        correct: 1,
        explanation: 'Equity crowdfunding raises funds by offering equity to multiple investors, engaging a broad base while requiring regulatory compliance.'
      },
      {
        question: 'Why is budgeting important for business growth?',
        options: [
          'It eliminates the need for revenue tracking',
          'It allocates funds to prioritize revenue-generating activities',
          'It replaces the need for pricing strategies',
          'It ensures unlimited funding'
        ],
        correct: 1,
        explanation: 'Budgeting ensures resources are directed to key areas like marketing, supporting profitability and sustainable growth.'
      }
    ]
  }
}; 
