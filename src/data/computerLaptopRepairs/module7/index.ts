import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-bios-firmware';
import { quiz7 } from './quiz7';

const module7: Module = {
  id: 7,
  title: '⚙️ Module 7: BIOS and Firmware Issues',
  description: 'Master BIOS and UEFI firmware management, including accessing settings, performing updates, and troubleshooting boot and hardware detection issues.',
  lessons: [
    lesson1,
    quiz7
  ]
};

export default module7;
