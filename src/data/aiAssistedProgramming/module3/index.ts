import type { Module } from '@/types/course';
import { lesson1WhatIsMachineLearning } from './lesson1-what-is-machine-learning';
import { lesson2TypesOfMachineLearning } from './lesson2-types-of-machine-learning';
import { lesson3SupervisedLearning } from './lesson3-supervised-learning';
import { lesson4UnsupervisedLearning } from './lesson4-unsupervised-learning';
import { lesson5ReinforcementLearning } from './lesson5-reinforcement-learning';
import { lesson6KeyConceptsInMachineLearning } from './lesson6-key-concepts-in-machine-learning';
import { lesson7MachineLearningPipeline } from './lesson7-machine-learning-pipeline';
import { lesson8EvaluationMetrics } from './lesson8-evaluation-metrics';
import { module3Quiz } from './quiz';

const module3: Module = {
  id: 3,
  title: 'Introduction to Machine Learning (ML)',
  description: 'This module provides a comprehensive introduction to Machine Learning fundamentals, covering the core principles of ML, different types of learning (supervised, unsupervised, reinforcement), key concepts, the complete ML pipeline, and evaluation metrics. Students will learn how ML systems learn from data, understand various algorithms and their applications, and gain practical knowledge of building and evaluating ML models.',
  lessons: [
    lesson1WhatIsMachineLearning,
    lesson2TypesOfMachineLearning,
    lesson3SupervisedLearning,
    lesson4UnsupervisedLearning,
    lesson5ReinforcementLearning,
    lesson6KeyConceptsInMachineLearning,
    lesson7MachineLearningPipeline,
    lesson8EvaluationMetrics,
    module3Quiz
  ]
};

export default module3;
