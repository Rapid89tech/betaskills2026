import { Module } from '@/types/course';
import { lesson1SignalTypes } from './lesson1-signal-types';
import { lesson2SignalFlowDiagrams } from './lesson2-signal-flow-diagrams';
import { lesson3AudioInterfaceMixersPreamps } from './lesson3-audio-interface-mixers-preamps';
import { lesson4Quiz } from './lesson4-quiz';

export const module2AudioTechnologyAndSignalFlow: Module = {
  id: 2,
  title: '📡 Module 2: Audio Technology and Signal Flow',
  description: 'Understanding analog vs digital signals, signal flow diagrams, and audio equipment',
  lessons: [
    lesson1SignalTypes,
    lesson2SignalFlowDiagrams,
    lesson3AudioInterfaceMixersPreamps,
    lesson4Quiz
  ]
}; 