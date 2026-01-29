import { Module } from '../../../types/course';
import lesson1DieselEmissionsSystems from './lesson1-diesel-emissions-systems';
import lesson2DiagnosingEmissionsIssues from './lesson2-diagnosing-emissions-issues';
import lesson3MaintenanceCompliancePerformance from './lesson3-maintenance-compliance-performance';
import lesson4EnvironmentalImpactBestPractices from './lesson4-environmental-impact-best-practices';
import lesson5Quiz from './lesson5-quiz';

export const module6: Module = {
  id: 6,
  title: 'Emissions Control and Environmental Considerations',
  description: 'This comprehensive module covers diesel emissions control systems and environmental considerations. Students will learn about DPFs, SCR, and EGR systems, master diagnostic techniques for emissions-related issues, understand maintenance requirements for compliance and performance, and explore environmental impacts and best practices for reducing emissions.',
  lessons: [
    lesson1DieselEmissionsSystems,
    lesson2DiagnosingEmissionsIssues,
    lesson3MaintenanceCompliancePerformance,
    lesson4EnvironmentalImpactBestPractices,
    lesson5Quiz,
  ],
};