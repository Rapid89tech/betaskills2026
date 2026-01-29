import { Module } from '../../../types/course';
import lesson1WetOutdoorEnvironments from './lesson1-wet-outdoor-environments';
import lesson2TroubleshootingCommonIssues from './lesson2-troubleshooting-common-issues';
import lesson3RepairMaintenance from './lesson3-repair-maintenance';
import lesson4Quiz from './lesson4-quiz';

export const module5: Module = {
  id: 5,
  title: 'Specialized Applications and Troubleshooting',
  description: 'This advanced module covers specialized tiling applications including wet and outdoor environments, common troubleshooting techniques, and comprehensive repair and maintenance procedures. Students will master waterproofing systems, frost-resistant installations, lippage correction, tile replacement, and long-term maintenance strategies for professional-quality results.',
  lessons: [
    lesson1WetOutdoorEnvironments,
    lesson2TroubleshootingCommonIssues,
    lesson3RepairMaintenance,
    lesson4Quiz,
  ],
};