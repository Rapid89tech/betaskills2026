import type { Module } from '@/types/course';
import { lesson1IntroductionToAudioEditingSoftware } from './lesson1-introduction-to-audio-editing-software';
import { lesson2BasicEditingTechniques } from './lesson2-basic-editing-techniques';
import { lesson3AudioEnhancementAndProcessing } from './lesson3-audio-enhancement-and-processing';
import { lesson4ExportingAndFinalizingAudio } from './lesson4-exporting-and-finalizing-audio';
import { module4Quiz } from './quiz';

const module4: Module = {
  id: 4,
  title: '🎧 Module 4: Audio Editing Essentials',
  description: 'Master the essential skills of audio editing for podcast production. Learn about audio editing software, basic editing techniques, audio enhancement and processing, and exporting and finalizing audio for professional-quality podcast episodes.',
  lessons: [
    lesson1IntroductionToAudioEditingSoftware,
    lesson2BasicEditingTechniques,
    lesson3AudioEnhancementAndProcessing,
    lesson4ExportingAndFinalizingAudio,
    module4Quiz
  ]
};

export default module4;
