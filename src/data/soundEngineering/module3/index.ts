
import { lesson1MicrophoneTypes } from './lesson1-microphone-types';
import { lesson2PickupPatterns } from './lesson2-pickup-patterns';
import { lesson3MicPlacement } from './lesson3-mic-placement';
import { lesson4Quiz } from './lesson4-quiz';
import type { Module } from '@/types/course';

export const module3MicrophonesAndApplications: Module = {
  id: 3,
  title: 'Microphones and Their Applications',
  description: 'Master microphone types, pickup patterns, and placement techniques for professional audio recording',
  lessons: [
    lesson1MicrophoneTypes,
    lesson2PickupPatterns,
    lesson3MicPlacement,
    lesson4Quiz
  ]
};
