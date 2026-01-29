import type { Module } from '@/types/course';
import { lesson1WireTypes } from './lesson1-wire-types';
import { lesson2Conduits } from './lesson2-conduits';
import { lesson3CableManagement } from './lesson3-cable-management';
import { module5Quiz } from './quiz';

const module5: Module = {
  id: 5,
  title: '🔌 Module 5: Wiring Methods and Materials',
  description: 'Master different wire types (THHN, NM-B, UF-B), conduit systems (EMT, PVC, Flexible), and cable management techniques',
  lessons: [
    lesson1WireTypes,
    lesson2Conduits,
    lesson3CableManagement,
    module5Quiz
  ]
};

export default module5;

