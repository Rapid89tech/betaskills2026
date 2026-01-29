import { Module } from '@/types/course';
import { lesson1DAWInterfaces } from './lesson1-daw-interfaces';
import { lesson2AudioEditing } from './lesson2-audio-editing';
import { lesson3PluginsVirtualInstruments } from './lesson3-plugins-virtual-instruments';
import { lesson4Quiz } from './lesson4-quiz';

export const module4DigitalAudioWorkstations: Module = {
  id: 4,
  title: '🎛️ Module 4: Digital Audio Workstations (DAWs)',
  description: 'Understanding DAW interfaces, audio editing, and virtual instruments',
  lessons: [
    lesson1DAWInterfaces,
    lesson2AudioEditing,
    lesson3PluginsVirtualInstruments,
    lesson4Quiz
  ]
}; 