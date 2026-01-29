import type { Module } from '@/types/course';
import lesson1 from './lesson1-safety-site-prep';
import lesson2 from './lesson2-panel-mounting';
import lesson3 from './lesson3-electrical-connections';
import lesson4 from './lesson4-inverter-controller-install';
import lesson5 from './lesson5-wiring-grounding';
import lesson6 from './lesson6-grid-integration';
import quiz from './quiz';

const module4: Module = {
  id: 4,
  title: 'Installation Techniques',
  description: 'Master professional installation techniques including safety protocols, panel mounting, electrical connections, inverter installation, wiring, grounding, and grid integration.',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6],
  quiz
};

export default module4;

