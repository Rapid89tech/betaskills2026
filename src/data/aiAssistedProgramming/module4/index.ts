import type { Module } from '@/types/course';
import { lesson1ImportanceOfDataInAI } from './lesson1-importance-of-data-in-ai';
import { lesson2WhatIsDataPreprocessing } from './lesson2-what-is-data-preprocessing';
import { lesson3StepsInDataPreprocessing } from './lesson3-steps-in-data-preprocessing';
import { lesson4WhatIsFeatureEngineering } from './lesson4-what-is-feature-engineering';
import { lesson5TechniquesInFeatureEngineering } from './lesson5-techniques-in-feature-engineering';
import { lesson6BestPractices } from './lesson6-best-practices';
import { module4Quiz } from './quiz';

const module4: Module = {
  id: 4,
  title: 'Data Preprocessing and Feature Engineering',
  description: 'This module covers the critical aspects of data preparation for AI and Machine Learning, including the importance of data quality, comprehensive data preprocessing techniques, feature engineering methods, and best practices. Students will learn how to clean, transform, and structure raw data into formats suitable for ML models, create meaningful features, and implement effective preprocessing pipelines.',
  lessons: [
    lesson1ImportanceOfDataInAI,
    lesson2WhatIsDataPreprocessing,
    lesson3StepsInDataPreprocessing,
    lesson4WhatIsFeatureEngineering,
    lesson5TechniquesInFeatureEngineering,
    lesson6BestPractices,
    module4Quiz
  ]
};

export default module4;
