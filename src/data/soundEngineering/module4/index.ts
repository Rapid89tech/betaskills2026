
import { lesson1DAWInterfaces } from './lesson1-daw-interfaces';
import { lesson2AudioEditing } from './lesson2-audio-editing';
import { lesson3PluginsInstruments } from './lesson3-plugins-instruments';
import { lesson4Quiz } from './lesson4-quiz';
import type { Module } from '@/types/course';

export const module4DigitalAudioWorkstations: Module = {
  id: 4,
  title: 'Digital Audio Workstations (DAWs)',
  description: 'Master DAW interfaces, audio editing techniques, and plug-ins for professional sound production',
  lessons: [
    lesson1DAWInterfaces,
    lesson2AudioEditing,
    lesson3PluginsInstruments,
    lesson4Quiz
  ]
};
