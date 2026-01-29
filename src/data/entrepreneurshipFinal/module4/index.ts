import type { Module } from '@/types/course';
import { lesson1FundingSources } from './lesson1-funding-sources';
import { lesson2FinancialPlanning } from './lesson2-financial-planning';
import { module4Quiz } from './quiz';

const module4: Module = {
  id: 4,
  title: 'Funding and Financial Management',
  description: 'Securing capital and managing finances effectively are pivotal for entrepreneurial success. This module explores diverse funding sources—bootstrapping, investors, loans, grants, crowdfunding, government-backed financing, and equity crowdfunding—and comprehensive financial management practices, including cash flow management, pricing strategies, profitability tracking, financial forecasting, and budgeting. These elements ensure liquidity, competitiveness, and stakeholder confidence, enabling startups to navigate market challenges, maintain financial health, and achieve sustainable growth in dynamic environments.',
  lessons: [
    lesson1FundingSources,
    lesson2FinancialPlanning,
    module4Quiz
  ]
};

export default module4; 