
import { lesson1GainStaging } from './lesson1-gain-staging';
import { lesson2EqCompressionReverb } from './lesson2-eq-compression-reverb';
import { lesson3StereoImaging } from './lesson3-stereo-imaging';
import { lesson4Quiz } from './lesson4-quiz';
import { lesson5Certificate } from './lesson5-certificate';
import type { Module } from '@/types/course';

export const module5MixingPrinciples: Module = {
  id: 5,
  title: 'Mixing Principles',
  description: 'Master gain staging, EQ, compression, reverb, and stereo imaging for professional mixing',
  lessons: [
    lesson1GainStaging,
    lesson2EqCompressionReverb,
    lesson3StereoImaging,
    lesson4Quiz,
    lesson5Certificate
  ]
};
