import type { Module } from '@/types/course';
import lesson1 from './lesson1-furniture-cabinet-making';
import lesson2 from './lesson2-doors-windows-flooring';
import lesson3 from './lesson3-roofing-structural';
import lesson4 from './lesson4-cnc-modern-technology';
import quiz from './quiz';

const module8: Module = {
  id: 8,
  title: 'Advanced Carpentry',
  description: 'Explore advanced carpentry techniques including furniture design, cabinet making, installation of doors/windows/flooring, structural framing, roofing, and modern CNC technology.',
  lessons: [lesson1, lesson2, lesson3, lesson4],
  quiz
};

export default module8;

