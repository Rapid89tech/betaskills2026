import type { Module } from '@/types/course';
import { lesson1WhyPythonForAIProgramming } from './lesson1-why-python-for-ai-programming';
import { lesson2PythonBasicsRefresher } from './lesson2-python-basics-refresher';
import { lesson3ControlStructures } from './lesson3-control-structures';
import { lesson4FunctionsInPython } from './lesson4-functions-in-python';
import { lesson5PythonLibrariesForAI } from './lesson5-python-libraries-for-ai';
import { lesson6ExampleBasicAIWorkflowWithPython } from './lesson6-example-basic-ai-workflow-with-python';
import { lesson7JupyterNotebookForAIDevelopment } from './lesson7-jupyter-notebook-for-ai-development';
import { lesson8BestPracticesInPythonForAI } from './lesson8-best-practices-in-python-for-ai';
import { module2Quiz } from './quiz';

const module2: Module = {
  id: 2,
  title: 'Python Programming for AI',
  description: 'This module provides a comprehensive introduction to Python programming specifically tailored for AI development. Students will learn why Python is the preferred language for AI, refresh their Python basics, understand control structures and functions, explore essential AI libraries, work through a complete AI workflow example, learn to use Jupyter Notebook for AI development, and understand best practices for writing efficient and maintainable AI code.',
  lessons: [
    lesson1WhyPythonForAIProgramming,
    lesson2PythonBasicsRefresher,
    lesson3ControlStructures,
    lesson4FunctionsInPython,
    lesson5PythonLibrariesForAI,
    lesson6ExampleBasicAIWorkflowWithPython,
    lesson7JupyterNotebookForAIDevelopment,
    lesson8BestPracticesInPythonForAI,
    module2Quiz
  ]
};

export default module2;
