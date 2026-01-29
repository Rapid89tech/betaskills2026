
import { lesson1SignalTypes } from './lesson1-signal-types';
import { lesson2SignalFlow } from './lesson2-signal-flow';
import { lesson3AudioEquipment } from './lesson3-audio-equipment';
import { lesson4Quiz } from './lesson4-quiz';
import type { Module } from '@/types/course';

export const module2AudioTechnology: Module = {
  id: 2,
  title: 'Audio Technology and Signal Flow',
  description: 'Understanding signal types, flow diagrams, and essential audio equipment',
  lessons: [
    lesson1SignalTypes,
    lesson2SignalFlow,
    lesson3AudioEquipment,
    lesson4Quiz
  ]
};
