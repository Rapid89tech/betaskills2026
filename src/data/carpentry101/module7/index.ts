import type { Module } from '@/types/course';
import lesson1 from './lesson1-sanding-smoothing';
import lesson2 from './lesson2-staining-varnishing-oiling-painting';
import lesson3 from './lesson3-polishing-protective-coatings';
import lesson4 from './lesson4-finishing-durability-aesthetics';
import quiz from './quiz';

const module7: Module = {
  id: 7,
  title: 'Surface Preparation & Finishing',
  description: 'Learn comprehensive finishing techniques including sanding, smoothing, staining, varnishing, oiling, painting, polishing, and protective coatings for professional results.',
  lessons: [lesson1, lesson2, lesson3, lesson4],
  quiz
};

export default module7;

