import type { Module } from '@/types/course';
import { lesson1BusinessStructures } from './lesson1-business-structures';
import { lesson2BusinessRegistration } from './lesson2-business-registration';
import { lesson3LicensesPermits } from './lesson3-licenses-permits';
import { lesson4TaxObligations } from './lesson4-tax-obligations';
import { lesson5IntellectualProperty } from './lesson5-intellectual-property';
import { module3Quiz } from './quiz';

const module3: Module = {
  id: 3,
  title: 'Legal Considerations and Business Structure',
  description: 'Selecting the appropriate legal structure for your business is crucial for managing taxation, liability, and operational efficiency. This module delves into various business structures—Sole Proprietorship, Partnership, Limited Liability Company (LLC), Corporation, Cooperative, and Non-Profit Organisation (NPO)—along with the processes for business registration, obtaining licenses, understanding tax obligations, and protecting intellectual property. These elements ensure legal compliance, protect your assets, and enhance credibility with stakeholders, fostering a solid foundation for business success.',
  lessons: [
    lesson1BusinessStructures,
    lesson2BusinessRegistration,
    lesson3LicensesPermits,
    lesson4TaxObligations,
    lesson5IntellectualProperty,
    module3Quiz
  ]
};

export default module3; 