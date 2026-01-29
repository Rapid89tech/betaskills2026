import { Module } from '../../../types/course';
import lesson1RoleOfLubrication from './lesson1-role-of-lubrication';
import lesson2CommonLubricationProblems from './lesson2-common-lubrication-problems';
import lesson3UnderstandingCoolingSystem from './lesson3-understanding-cooling-system';
import lesson4DiagnosingOverheatingIssues from './lesson4-diagnosing-overheating-issues';
import lesson5MaintenanceSchedules from './lesson5-maintenance-schedules';
import lesson6Quiz from './lesson6-quiz';

export const module3: Module = {
  id: 3,
  title: 'Engine Lubrication and Cooling Systems',
  description: 'This comprehensive module covers the critical aspects of diesel engine lubrication and cooling systems. Students will master the role of lubrication components, diagnose common problems, understand cooling system operations, and learn proper maintenance schedules to ensure optimal engine performance and longevity.',
  lessons: [
    lesson1RoleOfLubrication,
    lesson2CommonLubricationProblems,
    lesson3UnderstandingCoolingSystem,
    lesson4DiagnosingOverheatingIssues,
    lesson5MaintenanceSchedules,
    lesson6Quiz,
  ],
};