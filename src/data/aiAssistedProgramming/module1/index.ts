import type { Module } from '@/types/course';
import { lesson1WhatIsArtificialIntelligence } from './lesson1-what-is-artificial-intelligence';
import { lesson2WhatIsAIProgramming } from './lesson2-what-is-ai-programming';
import { lesson3ProgrammingLanguagesForAI } from './lesson3-programming-languages-for-ai';
import { lesson4FieldsOfAIProgramming } from './lesson4-fields-of-ai-programming';
import { lesson5CoreConceptsInAIProgramming } from './lesson5-core-concepts-in-ai-programming';
import { lesson6ToolsAndFrameworks } from './lesson6-tools-and-frameworks';
import { lesson7EthicalConsiderationsInAI } from './lesson7-ethical-considerations-in-ai';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: 'Introduction to AI Programming',
  description: 'This module provides a comprehensive introduction to Artificial Intelligence programming, covering fundamental concepts, categories of AI, programming languages, fields of AI programming, core concepts, tools and frameworks, and ethical considerations. Students will learn about the different types of AI, the AI programming workflow, and the essential tools and frameworks used in AI development.',
  lessons: [
    lesson1WhatIsArtificialIntelligence,
    lesson2WhatIsAIProgramming,
    lesson3ProgrammingLanguagesForAI,
    lesson4FieldsOfAIProgramming,
    lesson5CoreConceptsInAIProgramming,
    lesson6ToolsAndFrameworks,
    lesson7EthicalConsiderationsInAI,
    module1Quiz
  ]
};

export default module1;
