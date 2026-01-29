import { Module } from '../../../types/course';
import lesson1TurbochargerFundamentals from './lesson1-turbocharger-fundamentals';
import lesson2DiagnosingTurbochargerIssues from './lesson2-diagnosing-turbocharger-issues';
import lesson3AirFiltersIntakeSystems from './lesson3-air-filters-intake-systems';
import lesson4ChargeAirCoolers from './lesson4-charge-air-coolers';
import lesson5Quiz from './lesson5-quiz';

export const module4: Module = {
  id: 4,
  title: 'Turbochargers and Air Management',
  description: 'This comprehensive module covers turbochargers and air management systems in diesel engines. Students will learn how turbochargers enhance engine performance, diagnose common turbocharger issues, maintain air filters and intake systems, and understand the critical role of charge air coolers in optimizing combustion efficiency.',
  lessons: [
    lesson1TurbochargerFundamentals,
    lesson2DiagnosingTurbochargerIssues,
    lesson3AirFiltersIntakeSystems,
    lesson4ChargeAirCoolers,
    lesson5Quiz,
  ],
};