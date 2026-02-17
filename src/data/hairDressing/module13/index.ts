import type { Module } from '@/types/course';
import { lesson1SalonManagementCustomerService } from './lesson1-salon-management-customer-service';
import { module13Quiz } from './quiz13';

const module13: Module = {
  id: 13,
  title: '🏪 Module 13: Salon Management and Customer Service',
  description: 'Master effective communication, appointment scheduling, time management, and professional handling of difficult clients',
  lessons: [
    lesson1SalonManagementCustomerService,
    module13Quiz
  ]
};

export default module13;
