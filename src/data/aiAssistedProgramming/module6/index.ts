import type { Module } from '@/types/course';
import { lesson1WhatIsDeepLearning } from './lesson1-what-is-deep-learning';
import { lesson2ArtificialNeuralNetworks } from './lesson2-artificial-neural-networks';
import { lesson3ActivationFunctions } from './lesson3-activation-functions';
import { lesson4TypesOfNeuralNetworks } from './lesson4-types-of-neural-networks';
import { lesson5TrainingANeuralNetwork } from './lesson5-training-a-neural-network';
import { lesson6PopularDeepLearningFrameworks } from './lesson6-popular-deep-learning-frameworks';
import { lesson7ExampleSimpleNeuralNetworkUsingKeras } from './lesson7-example-simple-neural-network-using-keras';
import { lesson8OverfittingInDeepLearning } from './lesson8-overfitting-in-deep-learning';
import { lesson9RealWorldApplications } from './lesson9-real-world-applications';
import { module6Quiz } from './quiz';

const module6: Module = {
  id: 6,
  title: 'Deep Learning and Neural Networks',
  description: 'This module provides a comprehensive introduction to Deep Learning and Neural Networks, covering the fundamentals of artificial neural networks, activation functions, different network architectures, training processes, popular frameworks, and real-world applications. Students will learn how to build, train, and deploy neural networks for various AI tasks.',
  lessons: [
    lesson1WhatIsDeepLearning,
    lesson2ArtificialNeuralNetworks,
    lesson3ActivationFunctions,
    lesson4TypesOfNeuralNetworks,
    lesson5TrainingANeuralNetwork,
    lesson6PopularDeepLearningFrameworks,
    lesson7ExampleSimpleNeuralNetworkUsingKeras,
    lesson8OverfittingInDeepLearning,
    lesson9RealWorldApplications,
    module6Quiz
  ]
};

export default module6;
