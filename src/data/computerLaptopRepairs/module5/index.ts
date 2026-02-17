import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-upgrades';
import { quiz5 } from './quiz5';

const module5: Module = {
  id: 5,
  title: '⚡ Module 5: Replacing RAM, HDD, SSD, and Motherboards',
  description: 'Master upgrading and replacing critical system components including RAM, storage devices, and motherboards to enhance performance and resolve hardware failures.',
  lessons: [
    lesson1,
    quiz5
  ]
};

export default module5;
