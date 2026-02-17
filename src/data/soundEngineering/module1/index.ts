import type { Module } from '@/types/course';
import { lesson1WhatIsSound } from './lesson1-what-is-sound';
import { lesson2AudioCareers } from './lesson2-audio-careers';
import { lesson3BasicSoundProperties } from './lesson3-basic-sound-properties';
import { lesson4IndustryApplications } from './lesson4-industry-applications';
import { quiz1 } from './quiz1';

export const module1: Module = {
  id: 1,
  title: 'Introduction to Sound Engineering',
  description: 'Explore the fundamentals of sound, audio careers, sound properties, and diverse industry applications of audio engineering.',
  duration: '3 hours',
  lessons: [
    lesson1WhatIsSound,
    lesson2AudioCareers,
    lesson3BasicSoundProperties,
    lesson4IndustryApplications
  ],
  quiz: quiz1
};
