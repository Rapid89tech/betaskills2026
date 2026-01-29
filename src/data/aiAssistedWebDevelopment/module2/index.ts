import type { Module } from '@/types/course';
import { lesson1HTMLCSSJavaScriptBasics } from './lesson1-html-css-javascript-basics';
import { lesson2UnderstandingResponsiveDesign } from './lesson2-understanding-responsive-design';
import { lesson3AskingAIForCodeSnippetsAndExplanations } from './lesson3-asking-ai-for-code-snippets-and-explanations';
import { lesson4AIAsADebuggingPartner } from './lesson4-ai-as-a-debugging-partner';
import { lesson5HandsOnProjectAIAssistedStaticWebpage } from './lesson5-hands-on-project-ai-assisted-static-webpage';
import { module2Quiz } from './quiz';

const module2: Module = {
  id: 2,
  title: 'Fundamentals of Web Development (AI-Augmented)',
  description: 'This module serves as a comprehensive refresher on core web technologies—HTML, CSS, and JavaScript—along with responsive design principles, tailored for building modern websites. It emphasizes the use of AI tools to accelerate learning and development, covering how to leverage AI for code generation, explanations, and debugging, and includes a hands-on project to create an AI-assisted static webpage. Designed for beginners and intermediate developers, this module equips learners with the skills to create functional, responsive web pages while integrating AI to enhance productivity and understanding. It includes practical applications, best practices, and considerations for ethical and effective use of AI in web development.',
  lessons: [
    lesson1HTMLCSSJavaScriptBasics,
    lesson2UnderstandingResponsiveDesign,
    lesson3AskingAIForCodeSnippetsAndExplanations,
    lesson4AIAsADebuggingPartner,
    lesson5HandsOnProjectAIAssistedStaticWebpage,
    module2Quiz
  ]
};

export default module2;
