import type { Module } from '@/types/course';
import { lesson1ProjectEstimating } from './lesson1-project-estimating';
import { lesson2MaterialTakeoffs } from './lesson2-material-takeoffs';
import { lesson3ProjectPlanning } from './lesson3-project-planning';
import { lesson4BusinessBasics } from './lesson4-business-basics';
import { module13Quiz } from './quiz';

const module13: Module = {
  id: 13,
  title: '💼 Module 13: Estimating and Project Planning',
  description: 'Master project estimating, material takeoffs, project planning, scheduling, and electrical business basics',
  lessons: [
    lesson1ProjectEstimating,
    lesson2MaterialTakeoffs,
    lesson3ProjectPlanning,
    lesson4BusinessBasics,
    module13Quiz
  ]
};

export default module13;

