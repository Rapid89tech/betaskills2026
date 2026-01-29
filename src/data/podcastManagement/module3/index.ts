import type { Module } from '@/types/course';
import { lesson1EssentialRecordingEquipment } from './lesson1-essential-recording-equipment';
import { lesson2RecordingTechniquesAndBestPractices } from './lesson2-recording-techniques-and-best-practices';
import { lesson3RemoteRecordingSolutions } from './lesson3-remote-recording-solutions';
import { lesson4ProductionWorkflowAndFileManagement } from './lesson4-production-workflow-and-file-management';
import { module3Quiz } from './quiz';

const module3: Module = {
  id: 3,
  title: '🎙️ Module 3: Recording & Production Workflow',
  description: 'Master the technical aspects of podcast recording and production workflow. Learn about essential recording equipment, professional recording techniques, remote recording solutions, and efficient production workflows and file management.',
  lessons: [
    lesson1EssentialRecordingEquipment,
    lesson2RecordingTechniquesAndBestPractices,
    lesson3RemoteRecordingSolutions,
    lesson4ProductionWorkflowAndFileManagement,
    module3Quiz
  ]
};

export default module3;
