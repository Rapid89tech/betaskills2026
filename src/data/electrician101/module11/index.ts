import type { Module } from '@/types/course';
import { lesson1TroubleshootingBasics } from './lesson1-troubleshooting-basics';
import { lesson2DiagnosticTools } from './lesson2-diagnostic-tools';
import { lesson3PreventiveMaintenance } from './lesson3-preventive-maintenance';
import { lesson4RepairTechniques } from './lesson4-repair-techniques';
import { module11Quiz } from './quiz';

const module11: Module = {
  id: 11,
  title: '🔧 Module 11: Troubleshooting and Maintenance',
  description: 'Master troubleshooting techniques, diagnostic tools, preventive maintenance, and repair procedures for electrical systems',
  lessons: [
    lesson1TroubleshootingBasics,
    lesson2DiagnosticTools,
    lesson3PreventiveMaintenance,
    lesson4RepairTechniques,
    module11Quiz
  ]
};

export default module11;

