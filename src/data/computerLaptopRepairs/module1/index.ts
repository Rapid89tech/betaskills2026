import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-hardware-components';
import { quiz1 } from './quiz1';

const module1: Module = {
  id: 1,
  title: '💻 Module 1: Introduction to Computer Hardware',
  description: 'Learn the core components of computers and laptops, including CPU, RAM, motherboard, PSU, GPU, storage devices, and I/O ports. Understand how each part functions and contributes to system performance.',
  lessons: [
    lesson1,
    quiz1
  ]
};

export default module1;
