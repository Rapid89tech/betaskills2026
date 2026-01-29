import type { Module } from '@/types/course';
import { lesson1PurposeOfTheCapstoneProject } from './lesson1-purpose-of-the-capstone-project';
import { lesson2ProjectOverviewPredictingCustomerChurn } from './lesson2-project-overview-predicting-customer-churn';
import { lesson3StepByStepDevelopmentPlan } from './lesson3-step-by-step-development-plan';
import { lesson4DataCollection } from './lesson4-data-collection';
import { lesson5DataPreprocessing } from './lesson5-data-preprocessing';
import { lesson6ExploratoryDataAnalysis } from './lesson6-exploratory-data-analysis';
import { lesson7ModelBuilding } from './lesson7-model-building';
import { lesson8ModelEvaluation } from './lesson8-model-evaluation';
import { lesson9HyperparameterTuning } from './lesson9-hyperparameter-tuning';
import { lesson10SaveTheModel } from './lesson10-save-the-model';
import { lesson11DeployTheModelWithFlask } from './lesson11-deploy-the-model-with-flask';
import { lesson12TestYourAPI } from './lesson12-test-your-api';
import { lesson13DocumentationAndPresentation } from './lesson13-documentation-and-presentation';
import { lesson14AdditionalIndustryInsights } from './lesson14-additional-industry-insights';
import { module10Quiz } from './quiz';

const module10: Module = {
  id: 10,
  title: 'Capstone Project – Building a Full AI Application',
  description: 'This module provides a comprehensive capstone project experience where students build a complete AI application from start to finish. The project focuses on predicting customer churn for a telecom company, integrating all concepts learned throughout the course including data preprocessing, model building, evaluation, deployment, and presentation. Students will work through a real-world problem with industry-standard practices.',
  lessons: [
    lesson1PurposeOfTheCapstoneProject,
    lesson2ProjectOverviewPredictingCustomerChurn,
    lesson3StepByStepDevelopmentPlan,
    lesson4DataCollection,
    lesson5DataPreprocessing,
    lesson6ExploratoryDataAnalysis,
    lesson7ModelBuilding,
    lesson8ModelEvaluation,
    lesson9HyperparameterTuning,
    lesson10SaveTheModel,
    lesson11DeployTheModelWithFlask,
    lesson12TestYourAPI,
    lesson13DocumentationAndPresentation,
    lesson14AdditionalIndustryInsights,
    module10Quiz
  ]
};

export default module10;
