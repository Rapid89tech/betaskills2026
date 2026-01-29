import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 9,
  title: 'Module 9 Quiz: Professional & Business Skills',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of cost estimation in carpentry projects?',
      options: [
        'To select the most expensive materials',
        'To calculate project costs accurately for budgeting and profitability',
        'To impress clients with high numbers',
        'To avoid using budgeting software'
      ],
      correctAnswer: 1,
      explanation: 'The primary purpose of cost estimation is to calculate project costs accurately for budgeting and profitability, ensuring financial viability and client satisfaction.'
    },
    {
      id: 2,
      question: 'Which of the following is considered an indirect cost in carpentry project budgeting?',
      options: [
        'Hardwood boards',
        'Labor for cabinet assembly',
        'Workshop rent',
        'Screws and hinges'
      ],
      correctAnswer: 2,
      explanation: 'Workshop rent is an indirect cost (overhead) that supports the business but isn\'t directly tied to a specific project, unlike materials or labor which are direct costs.'
    },
    {
      id: 3,
      question: 'If a carpenter is building a custom oak tabletop and adds 10% for waste on the material cost of R12,500, what is the adjusted cost including waste?',
      options: [
        'R12,750',
        'R13,750',
        'R14,000',
        'R15,000'
      ],
      correctAnswer: 1,
      explanation: 'R12,500 + 10% (R1,250) = R13,750. Adding 10% for waste accounts for offcuts, defective boards, or measurement errors.'
    },
    {
      id: 4,
      question: 'Which factor is most important when estimating labor costs for a project?',
      options: [
        'Type of finish',
        'Skill level and regional labor rates',
        'Number of screws',
        'Color of wood'
      ],
      correctAnswer: 1,
      explanation: 'Skill level and regional labor rates are most important when estimating labor costs, as they determine hourly rates and the time required to complete tasks.'
    },
    {
      id: 5,
      question: 'How should tool costs for owned equipment be accounted for in a project budget?',
      options: [
        'Include full purchase cost in one project',
        'Ignore tool costs',
        'Amortize over multiple projects',
        'Only count consumables'
      ],
      correctAnswer: 2,
      explanation: 'Tool costs for owned equipment should be amortized over multiple projects (e.g., R10,000 table saw ÷ 100 projects = R100/project) to distribute the investment fairly.'
    },
    {
      id: 6,
      question: 'What is a recommended contingency percentage to include in carpentry project budgets?',
      options: [
        '1–5%',
        '5–10%',
        '10–20%',
        '25–40%'
      ],
      correctAnswer: 2,
      explanation: 'A recommended contingency of 10–20% covers unexpected expenses like material price hikes, delays, or unforeseen challenges while remaining reasonable for clients.'
    },
    {
      id: 7,
      question: 'Why is it important to include a profit margin in a project budget?',
      options: [
        'To cover unexpected material shortages',
        'To ensure the carpenter\'s business sustainability',
        'To reduce material costs',
        'To avoid using budgeting software'
      ],
      correctAnswer: 1,
      explanation: 'Including a profit margin (typically 15–30%) ensures the carpenter\'s business sustainability, covering business growth, reinvestment, and fair compensation beyond just covering costs.'
    },
    {
      id: 8,
      question: 'When calculating total project cost, which of the following should be included?',
      options: [
        'Materials, labor, tools, overheads, contingency, and profit margin',
        'Materials only',
        'Labor and profit margin only',
        'Tools and overheads only'
      ],
      correctAnswer: 0,
      explanation: 'Total project cost should include materials, labor, tools, overheads, contingency, and profit margin to ensure comprehensive budgeting and business viability.'
    },
    {
      id: 9,
      question: 'Which tool or software is most suitable for precise measurements in carpentry cost estimation?',
      options: [
        'Paintbrush',
        'Tape measure or laser measure',
        'Screwdriver',
        'Hand saw'
      ],
      correctAnswer: 1,
      explanation: 'Tape measures or laser measures (like Bosch GLM 50 C) provide precise measurements needed for accurate cost estimation and material calculations.'
    },
    {
      id: 10,
      question: 'If a project has a subtotal of R36,000, adding a 15% contingency and 20% profit, what is the final project budget?',
      options: [
        'R41,400',
        'R44,000',
        'R49,680',
        'R50,000'
      ],
      correctAnswer: 2,
      explanation: 'R36,000 + 15% contingency (R5,400) = R41,400, then + 20% profit (R8,280) = R49,680. Contingency is added first, then profit is calculated on the new subtotal.'
    }
  ]
};

export default quiz;

