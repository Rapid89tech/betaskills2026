import type { Quiz } from '@/types/course';

export const module8Quiz: Quiz = {
  id: 8,
  title: 'Module 8 Quiz: Capstone Project',
  description: 'This quiz tests your understanding of the Capstone Project module, covering project types, AI-assisted planning, building full sites with AI, deployment and presentation, and project-specific considerations. Each question includes four multiple-choice options and the correct answer with an explanation.',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of a portfolio website in the context of AI-assisted web development?',
      options: [
        'To sell products online',
        'To showcase personal or professional work with visual appeal and storytelling',
        'To collect user data for analytics',
        'To host a blog with AI-generated content'
      ],
      correctAnswer: 1,
      explanation: 'A portfolio website serves to showcase personal or professional work, emphasizing visual appeal, intuitive navigation, and storytelling to highlight achievements. It is not primarily for selling products, collecting data, or hosting blogs.'
    },
    {
      id: 2,
      question: 'Which AI tool is best suited for generating wireframes based on text prompts?',
      options: [
        'GitHub Copilot',
        'Uizard',
        'ChatGPT',
        'TensorFlow'
      ],
      correctAnswer: 1,
      explanation: 'Uizard is specifically designed for generating wireframes based on text prompts or design preferences, making it ideal for AI-assisted wireframing. GitHub Copilot is for code generation, ChatGPT for text, and TensorFlow for machine learning models.'
    },
    {
      id: 3,
      question: 'What is a key benefit of using AI in the planning phase of web development?',
      options: [
        'Eliminates the need for human designers',
        'Streamlines the process by generating wireframes, content, and branding suggestions',
        'Guarantees perfect designs without revision',
        'Reduces hosting costs'
      ],
      correctAnswer: 1,
      explanation: 'AI streamlines the planning process by generating wireframes, drafting content, and suggesting branding elements based on project goals and user inputs. It does not eliminate human designers, guarantee perfect designs, or reduce hosting costs.'
    },
    {
      id: 4,
      question: 'Which platform is best suited for creating responsive layouts from wireframes using AI?',
      options: [
        'MongoDB',
        'Webflow with AI features',
        'PostgreSQL',
        'GitHub Pages'
      ],
      correctAnswer: 1,
      explanation: 'Webflow with AI features can create responsive layouts from wireframes or user inputs, making it ideal for AI-assisted design implementation. MongoDB and PostgreSQL are databases, while GitHub Pages is for hosting.'
    },
    {
      id: 5,
      question: 'What is the main challenge when using AI for e-commerce store development?',
      options: [
        'AI cannot generate product images',
        'Handling large-scale data for personalization without latency issues',
        'AI tools are too expensive for e-commerce',
        'AI cannot integrate with payment gateways'
      ],
      correctAnswer: 1,
      explanation: 'The main challenge for e-commerce stores is handling large-scale data for personalization without latency issues. AI can generate content and integrate with systems, but managing performance with large datasets requires careful optimization.'
    },
    {
      id: 6,
      question: 'Which AI tool is recommended for generating SEO-optimized content for business landing pages?',
      options: [
        'Figma',
        'Frase',
        'Dialogflow',
        'Netlify'
      ],
      correctAnswer: 1,
      explanation: 'Frase is specifically designed for SEO content optimization, making it ideal for generating SEO-optimized content for business landing pages. Figma is for design, Dialogflow for chatbots, and Netlify for hosting.'
    },
    {
      id: 7,
      question: 'What is a key consideration when deploying AI-driven features in a web app?',
      options: [
        'AI features are always free to use',
        'Ensuring scalability and security for AI-driven functionalities',
        'AI features work the same on all browsers',
        'AI features require no testing'
      ],
      correctAnswer: 1,
      explanation: 'Ensuring scalability and security for AI-driven functionalities is crucial when deploying web apps with AI features. AI features may have costs, browser compatibility issues, and require thorough testing.'
    },
    {
      id: 8,
      question: 'Which tool is best suited for monitoring AI-driven features post-deployment?',
      options: [
        'GitHub Copilot',
        'Google Analytics or Hotjar',
        'Figma',
        'MongoDB Compass'
      ],
      correctAnswer: 1,
      explanation: 'Google Analytics or Hotjar provide AI-enhanced post-deployment insights for monitoring user interactions and site performance. GitHub Copilot is for code generation, Figma for design, and MongoDB Compass for database management.'
    },
    {
      id: 9,
      question: 'What is the primary purpose of using AI in the presentation phase of a project?',
      options: [
        'To replace human presenters',
        'To generate visualizations and data-driven insights for stakeholders',
        'To automatically deploy the project',
        'To write the project documentation'
      ],
      correctAnswer: 1,
      explanation: 'AI generates visualizations (e.g., heatmaps, user flow diagrams) and data-driven insights to demonstrate the project\'s value to stakeholders during presentations. It does not replace human presenters, deploy projects, or write documentation.'
    },
    {
      id: 10,
      question: 'Which challenge is most relevant when using AI for portfolio website development?',
      options: [
        'AI cannot generate unique designs',
        'Ensuring unique designs to stand out from template-based outputs',
        'AI tools are too complex for portfolios',
        'Portfolio sites cannot use AI features'
      ],
      correctAnswer: 1,
      explanation: 'The main challenge for portfolio websites is ensuring unique designs to stand out from template-based outputs. AI can generate designs, but ensuring uniqueness and personalization requires careful oversight and customization.'
    }
  ]
};
