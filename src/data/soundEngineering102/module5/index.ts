import { Module } from '@/types/course';
import { lesson1GainStaging } from './lesson1-gain-staging';
import { lesson2EQCompressionReverb } from './lesson2-eq-compression-reverb';
import { lesson3StereoImaging } from './lesson3-stereo-imaging';
import { lesson4Quiz } from './lesson4-quiz';

export const module5MixingPrinciples: Module = {
  id: 5,
  title: '🎚️ Module 5: Mixing Principles',
  description: 'Understanding gain staging, EQ, compression, reverb, and stereo imaging',
  lessons: [
    lesson1GainStaging,
    lesson2EQCompressionReverb,
    lesson3StereoImaging,
    lesson4Quiz
  ]
}; 