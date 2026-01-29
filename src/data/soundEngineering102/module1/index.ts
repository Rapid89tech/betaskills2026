import { Module } from '@/types/course';
import { lesson1WhatIsSound } from './lesson1-what-is-sound';
import { lesson2AudioCareers } from './lesson2-audio-careers';
import { lesson3BasicSoundProperties } from './lesson3-basic-sound-properties';
import { lesson4IndustryApplications } from './lesson4-industry-applications';
import { lesson5Quiz } from './lesson5-quiz';

export const module1IntroductionToSoundEngineering102: Module = {
  id: 1,
  title: '🎧 Module 1: Introduction to Sound Engineering',
  description: 'Fundamental concepts of sound, audio careers, sound properties, and industry applications',
  lessons: [
    lesson1WhatIsSound,
    lesson2AudioCareers,
    lesson3BasicSoundProperties,
    lesson4IndustryApplications,
    lesson5Quiz
  ]
}; 