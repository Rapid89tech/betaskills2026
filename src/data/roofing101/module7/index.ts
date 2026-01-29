import type { Module } from '@/types/course';
import { lesson1CommonRoofingProblemsLeaksBlistering } from './lesson1-common-roofing-problems-leaks-blistering';
import { lesson2InspectionProceduresForRoofingSystems } from './lesson2-inspection-procedures-for-roofing-systems';
import { lesson3TemporaryAndPermanentRepairTechniques } from './lesson3-temporary-and-permanent-repair-techniques';
import { lesson4PreventativeMaintenanceStrategies } from './lesson4-preventative-maintenance-strategies';
import { module7Quiz } from './quiz';

const module7: Module = {
  id: 7,
  title: '🔧 Module 7: Roof Inspection, Maintenance, and Repair',
  description: 'Master inspection procedures, identify common problems, apply repair techniques, and implement preventative maintenance strategies',
  lessons: [
    lesson1CommonRoofingProblemsLeaksBlistering,
    lesson2InspectionProceduresForRoofingSystems,
    lesson3TemporaryAndPermanentRepairTechniques,
    lesson4PreventativeMaintenanceStrategies,
    module7Quiz
  ]
};

export default module7;