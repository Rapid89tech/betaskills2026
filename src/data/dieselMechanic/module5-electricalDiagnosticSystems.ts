import type { Module } from '@/types/course';
import { lesson5_1 } from './module5/lesson5_1';
import { lesson5_2 } from './module5/lesson5_2';
import { lesson5_3 } from './module5/lesson5_3';
import { quiz5 } from './module5/quiz5';

export const module5: Module = {
  id: 5,
  title: '⚡ Module 5: Electrical and Diagnostic Systems',
  description: 'Master diesel engine sensors, diagnostic tools, and electronic control systems. Learn about O2, MAF, and EGR sensors, how to use scan tools, multimeters, and oscilloscopes, and understand CAN bus communication and modern ECUs for comprehensive diagnostics.',
  lessons: [
    lesson5_1,
    lesson5_2,
    lesson5_3,
    quiz5
  ]
};
