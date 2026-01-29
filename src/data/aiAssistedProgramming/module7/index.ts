import type { Module } from '@/types/course';
import { lesson1WhatIsNaturalLanguageProcessing } from './lesson1-what-is-natural-language-processing';
import { lesson2KeyComponentsOfNLP } from './lesson2-key-components-of-nlp';
import { lesson3TextPreprocessingTechniquesInPython } from './lesson3-text-preprocessing-techniques-in-python';
import { lesson4VectorizationTextToNumbers } from './lesson4-vectorization-text-to-numbers';
import { lesson5NLPApplications } from './lesson5-nlp-applications';
import { lesson6PretrainedNLPModelsAndLibraries } from './lesson6-pretrained-nlp-models-and-libraries';
import { lesson7SentimentAnalysisExample } from './lesson7-sentiment-analysis-example';
import { lesson8BestPracticesInNLP } from './lesson8-best-practices-in-nlp';
import { module7Quiz } from './quiz';

const module7: Module = {
  id: 7,
  title: 'Natural Language Processing (NLP)',
  description: 'This module provides a comprehensive introduction to Natural Language Processing (NLP), covering the fundamentals of text processing, key components like tokenization and vectorization, practical applications, pre-trained models, and best practices. Students will learn how to process, analyze, and generate human language using modern NLP techniques and tools.',
  lessons: [
    lesson1WhatIsNaturalLanguageProcessing,
    lesson2KeyComponentsOfNLP,
    lesson3TextPreprocessingTechniquesInPython,
    lesson4VectorizationTextToNumbers,
    lesson5NLPApplications,
    lesson6PretrainedNLPModelsAndLibraries,
    lesson7SentimentAnalysisExample,
    lesson8BestPracticesInNLP,
    module7Quiz
  ]
};

export default module7;
