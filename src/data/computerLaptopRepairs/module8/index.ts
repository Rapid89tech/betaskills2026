import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-os-installation';
import { quiz8 } from './quiz8';

const module8: Module = {
  id: 8,
  title: '💿 Module 8: Operating System Installation and Repair',
  description: 'Master creating bootable media, installing Windows/Linux/macOS, partitioning disks, managing drivers, and troubleshooting installation errors.',
  lessons: [
    lesson1,
    quiz8
  ]
};

export default module8;
