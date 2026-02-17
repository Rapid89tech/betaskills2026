import type { Module } from '@/types/course';
import { lesson1RecordingTools } from './lesson1-recording-tools';
import { quiz3 } from './quiz3';

const module3: Module = {
  id: 3,
  title: '🎙️ Module 3: Recording & Production Workflow',
  description: 'Master the technical aspects of podcast production, from selecting the right recording tools and software to understanding audio interfaces, microphones, and remote recording platforms for professional-quality audio.',
  lessons: [
    lesson1RecordingTools,
    quiz3
  ]
};

export default module3;
