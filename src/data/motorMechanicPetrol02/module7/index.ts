import { Module } from '@/types/course';
import lesson1 from './lesson1-recognizing-common-symptoms';
import lesson2 from './lesson2-diagnosing-prioritizing-repairs';
import quiz7 from './quiz7';

const module7: Module = {
  id: 7,
  title: 'Diagnosing and Repairing Common Engine Issues',
  description: 'This module equips learners with essential skills to diagnose and repair common petrol engine issues, including misfiring, poor fuel economy, rough idling, stalling, unusual noises, and exhaust smoke. Through engaging video lectures, interactive virtual simulations, and practical assignments, participants will master symptom identification, understand underlying causes, and prioritize repairs effectively.',
  lessons: [
    lesson1,
    lesson2,
    quiz7
  ]
};

export default module7;
