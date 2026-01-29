import type { Module } from '@/types/course';
import { lesson1SharingTheGospelWithStudents } from './lesson1-sharing-the-gospel-with-students';
import { lesson2AnsweringFaithQuestionsWithGentleness } from './lesson2-answering-faith-questions-with-gentleness';
import { lesson3CreatingSpaceForTestimonyAndWitness } from './lesson3-creating-space-for-testimony-and-witness';
import { lesson4DealingWithUnbelievingOrSkepticalStudents } from './lesson4-dealing-with-unbelieving-or-skeptical-students';
import { quiz } from './quiz';

export const module8: Module = {
  id: 8,
  title: 'Evangelism and Apologetics in Teaching',
  description: 'Sharing the Gospel with students, answering faith questions with gentleness, creating space for testimony and witness, and dealing with unbelieving or skeptical students.',
  lessons: [
    lesson1SharingTheGospelWithStudents,
    lesson2AnsweringFaithQuestionsWithGentleness,
    lesson3CreatingSpaceForTestimonyAndWitness,
    lesson4DealingWithUnbelievingOrSkepticalStudents,
    quiz
  ]
};
