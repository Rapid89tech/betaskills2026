import type { Module } from '@/types/course';
import { lesson1WhyModelEvaluationMatters } from './lesson1-why-model-evaluation-matters';
import { lesson2EvaluationMetricsByProblemType } from './lesson2-evaluation-metrics-by-problem-type';
import { lesson3CrossValidation } from './lesson3-cross-validation';
import { lesson4HyperparameterTuning } from './lesson4-hyperparameter-tuning';
import { lesson5ModelSavingAndSerialization } from './lesson5-model-saving-and-serialization';
import { lesson6ModelDeploymentMethods } from './lesson6-model-deployment-methods';
import { lesson7MonitoringAndMaintenance } from './lesson7-monitoring-and-maintenance';
import { module9Quiz } from './quiz';

const module9: Module = {
  id: 9,
  title: 'Model Evaluation, Tuning, and Deployment',
  description: 'This module provides a comprehensive guide to model evaluation, tuning, and deployment, covering evaluation metrics, cross-validation techniques, hyperparameter tuning methods, model serialization, deployment strategies, and post-deployment monitoring. Students will learn how to assess model performance, optimize hyperparameters, save models, deploy them to production, and maintain them effectively.',
  lessons: [
    lesson1WhyModelEvaluationMatters,
    lesson2EvaluationMetricsByProblemType,
    lesson3CrossValidation,
    lesson4HyperparameterTuning,
    lesson5ModelSavingAndSerialization,
    lesson6ModelDeploymentMethods,
    lesson7MonitoringAndMaintenance,
    module9Quiz
  ]
};

export default module9;
