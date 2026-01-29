import type { Module } from '@/types/course';
import { lesson1ExtendingPhoneLifespan } from './lesson1-extending-phone-lifespan';
import { lesson2FirmwareUpdates } from './lesson2-firmware-updates';
import { lesson3CustomerEducation } from './lesson3-customer-education';
import { module6Quiz } from './quiz';

const module6: Module = {
  id: 6,
  title: 'Module 6: Maintenance and Preventive Care',
  description: 'Essential maintenance practices, firmware updates, and customer education strategies for extending smartphone lifespan and preventing common issues.',
  lessons: [
    lesson1ExtendingPhoneLifespan,
    lesson2FirmwareUpdates,
    lesson3CustomerEducation,
    module6Quiz
  ]
};

export default module6;
