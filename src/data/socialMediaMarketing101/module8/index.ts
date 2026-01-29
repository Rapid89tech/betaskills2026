import type { Module } from '@/types/course';
import { lesson1SchedulingTools } from './lesson1-scheduling-tools';
import { lesson2ContentManagement } from './lesson2-content-management';
import { lesson3MonitoringMentions } from './lesson3-monitoring-mentions';
import { lesson4CollaborationTools } from './lesson4-collaboration-tools';
import { module8Quiz } from './quiz';

const module8: Module = {
  id: 8,
  title: '🛠️ Module 8: Social Media Management Tools',
  description: 'Master scheduling tools, content management automation, mention monitoring, and team collaboration platforms',
  lessons: [
    lesson1SchedulingTools,
    lesson2ContentManagement,
    lesson3MonitoringMentions,
    lesson4CollaborationTools,
    module8Quiz
  ]
};

export default module8;

