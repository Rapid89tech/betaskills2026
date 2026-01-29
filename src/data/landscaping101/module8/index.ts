import type { Module } from '@/types/course';
import { lesson1SettingUpBusiness } from './lesson1-setting-up-business';
import { lesson2EstimatingPricing } from './lesson2-estimating-pricing';
import { lesson3MarketingClient } from './lesson3-marketing-client';
import { lesson4ProjectScheduling } from './lesson4-project-scheduling';
import { lesson5ProfessionalEthics } from './lesson5-professional-ethics';
import { module8Quiz } from './quiz';

const module8: Module = {
  id: 8,
  title: '💼 Module 8: Business and Career in Landscaping',
  description: 'Learn how to start and manage a landscaping business or career',
  lessons: [
    lesson1SettingUpBusiness,
    lesson2EstimatingPricing,
    lesson3MarketingClient,
    lesson4ProjectScheduling,
    lesson5ProfessionalEthics,
    module8Quiz
  ]
};

export default module8;

