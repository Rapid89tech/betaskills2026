import type { Module } from '@/types/course';
import { lesson1IdentifyingAndFixingLeaks } from './lesson1-identifying-and-fixing-leaks';
import { lesson2UncloggingDrainsAndPipes } from './lesson2-unclogging-drains-and-pipes';
import { lesson3ReplacingDamagedPipesAndFixtures } from './lesson3-replacing-damaged-pipes-and-fixtures';
import { lesson4PreventiveMaintenanceBestPractices } from './lesson4-preventive-maintenance-best-practices';
import { module8Quiz } from './quiz';

const module8: Module = {
  id: 8,
  title: '🛠️ Module 8: Plumbing Repairs and Maintenance',
  description: 'Master leak identification and repair, drain unclogging, pipe and fixture replacement, and preventive maintenance practices',
  lessons: [
    lesson1IdentifyingAndFixingLeaks,
    lesson2UncloggingDrainsAndPipes,
    lesson3ReplacingDamagedPipesAndFixtures,
    lesson4PreventiveMaintenanceBestPractices,
    module8Quiz
  ]
};

export default module8; 