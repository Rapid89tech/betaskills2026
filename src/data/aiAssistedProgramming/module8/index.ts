import type { Module } from '@/types/course';
import { lesson1WhatIsComputerVision } from './lesson1-what-is-computer-vision';
import { lesson2KeyTasksInComputerVision } from './lesson2-key-tasks-in-computer-vision';
import { lesson3ToolsAndLibrariesForComputerVision } from './lesson3-tools-and-libraries-for-computer-vision';
import { lesson4BasicImageProcessingTechniques } from './lesson4-basic-image-processing-techniques';
import { lesson5ConvolutionalNeuralNetworksCNNs } from './lesson5-convolutional-neural-networks-cnns';
import { lesson6ImageDataAugmentation } from './lesson6-image-data-augmentation';
import { lesson7RealWorldApplications } from './lesson7-real-world-applications';
import { lesson8BestPracticesInComputerVision } from './lesson8-best-practices-in-computer-vision';
import { module8Quiz } from './quiz';

const module8: Module = {
  id: 8,
  title: 'Computer Vision and Image Processing',
  description: 'This module provides a comprehensive introduction to Computer Vision and Image Processing, covering fundamental concepts, key tasks, tools and libraries, basic image processing techniques, Convolutional Neural Networks (CNNs), data augmentation, real-world applications, and best practices. Students will learn how to process, analyze, and understand visual data using modern computer vision techniques.',
  lessons: [
    lesson1WhatIsComputerVision,
    lesson2KeyTasksInComputerVision,
    lesson3ToolsAndLibrariesForComputerVision,
    lesson4BasicImageProcessingTechniques,
    lesson5ConvolutionalNeuralNetworksCNNs,
    lesson6ImageDataAugmentation,
    lesson7RealWorldApplications,
    lesson8BestPracticesInComputerVision,
    module8Quiz
  ]
};

export default module8;
