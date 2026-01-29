import type { Module } from '@/types/course';
import { lesson1OverviewOfModelBuildingInMachineLearning } from './lesson1-overview-of-model-building-in-machine-learning';
import { lesson2StepsInBuildingAMachineLearningModel } from './lesson2-steps-in-building-a-machine-learning-model';
import { lesson3ChoosingTheRightAlgorithm } from './lesson3-choosing-the-right-algorithm';
import { lesson4ModelTrainingTips } from './lesson4-model-training-tips';
import { lesson5OverfittingVsUnderfitting } from './lesson5-overfitting-vs-underfitting';
import { lesson6ModelEvaluationMetrics } from './lesson6-model-evaluation-metrics';
import { lesson7HyperparameterTuning } from './lesson7-hyperparameter-tuning';
import { lesson8ModelDeploymentOverview } from './lesson8-model-deployment-overview';
import { module5Quiz } from './quiz';

const module5: Module = {
  id: 5,
  title: 'Building Machine Learning Models',
  description: 'This module provides a comprehensive guide to building machine learning models, covering the complete workflow from data preparation to model deployment. Students will learn the systematic approach to model building, algorithm selection, training techniques, evaluation methods, hyperparameter tuning, and deployment strategies for production-ready ML systems.',
  lessons: [
    lesson1OverviewOfModelBuildingInMachineLearning,
    lesson2StepsInBuildingAMachineLearningModel,
    lesson3ChoosingTheRightAlgorithm,
    lesson4ModelTrainingTips,
    lesson5OverfittingVsUnderfitting,
    lesson6ModelEvaluationMetrics,
    lesson7HyperparameterTuning,
    lesson8ModelDeploymentOverview,
    module5Quiz
  ]
};

export default module5;
