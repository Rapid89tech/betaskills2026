import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-display-keyboard';
import { quiz6 } from './quiz6';

const module6: Module = {
  id: 6,
  title: '🖥️ Module 6: Display, Keyboard, and Touchpad Repairs',
  description: 'Master diagnosing and repairing laptop displays, keyboards, and touchpads. Learn display technologies, replacement procedures, and preventive maintenance.',
  lessons: [
    lesson1,
    quiz6
  ]
};

export default module6;
