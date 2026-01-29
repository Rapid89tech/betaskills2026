import { Module } from '@/types/course';
import lesson1 from './lesson1-cleaning-replacing-fuel-filters';
import lesson2 from './lesson2-checking-fuel-line-leaks';
import lesson3 from './lesson3-using-fuel-system-cleaners';
import quiz6 from './quiz6';

const module6: Module = {
  id: 6,
  title: 'Ensuring Fuel System Health',
  description: 'This module focuses on maintaining a healthy fuel system in petrol vehicles, critical for efficient combustion and engine performance. Learners will master cleaning or replacing fuel filters, identifying and repairing fuel line leaks, and using fuel system cleaners to optimize engine efficiency.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz6
  ]
};

export default module6;
